import { Button } from "components/LoadMoreBtn/LoadMoreBtn";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Loader } from "components/Loader/Loader";
import { Modal } from "components/Modal/Modal";
import { fetchImages, limit } from "helpers/api";
import { Component } from "react";
import toast from 'react-hot-toast';
import { List, Container } from "./ImageGallery.styled";
import PropTypes from 'prop-types';

export class ImageGallery extends Component {
    state = {
        pictures: [],
        page: 1,
        loading: false,
        showModal: false,
        largeImg: '',
        totalImages: 0,
    };

   async componentDidUpdate(prevProps, prevState) { 
       try {
           if (this.state.page !== 1
               && prevProps.searchQuery === this.props.searchQuery
               && prevState.page !== this.state.page) {
               
                this.setState({ loading: true });
               const { hits } = await fetchImages(this.props.searchQuery.trim(), this.state.page);

                this.setState({
                    pictures: [...this.state.pictures, ...hits],
                    loading: false
                });
           };
           if (prevProps.searchQuery !== this.props.searchQuery) {
               
                this.setState({ loading: true });
               const { hits, totalHits } = await fetchImages(this.props.searchQuery.trim());
               
                this.setState({
                    pictures: hits,
                    loading: false,
                    page: 1,
                    totalImages: totalHits,
                });
               
               if (hits.length === 0) {
                    return toast.error(`Nothing found for ${this.props.searchQuery}!`);
               };
               return;
           };
        } catch (err) {
            console.log(err);
       };
    };

    handleLoad = () => {
        this.setState(prev => ({ page: prev.page + 1 }));
    }
    
    openModal = (e) => {
        this.setState(({ showModal }) => ({
            showModal: !showModal,
        }));
        this.setState({ largeImg: e.currentTarget.alt });
    }

    closeModal = () => {
        this.setState(({ showModal }) => ({
            showModal: !showModal,
        }));
    }

    compareTotalPages = () => {
        const totalPages = this.state.totalImages / limit;
        const restTotalPages = this.state.pictures.length / limit;
        return totalPages > restTotalPages;
    }

    render() {
        const { pictures, loading, showModal, largeImg, totalImages } = this.state;
        const hasMorePages = this.compareTotalPages();

        return (
            <Container>
                <List>
                    <ImageGalleryItem images={pictures} onClick={this.openModal} />
                </List>
                {loading && <Loader />}
                {showModal &&
                    <Modal onClose={this.closeModal}>
                        <img src={largeImg} alt={largeImg} width="800" />
                    </Modal>
                }
                {hasMorePages && totalImages > limit && <Button onClick={this.handleLoad}/>}
            </Container>
        )
    }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};