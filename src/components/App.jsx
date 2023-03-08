import { Component } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { Container } from "./Container.styled";
import { GlobalStyles } from "./Global.styled";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Searchbar } from "./Searchbar/Searchbar";
import { Button } from "components/LoadMoreBtn/LoadMoreBtn";
import { Loader } from "components/Loader/Loader";
import { Modal } from "components/Modal/Modal";
import { fetchImages, limit } from "helpers/api";

export class App extends Component {
  state = {
    searchQuery: '',
    pictures: [],
    page: 1,
    loading: false,
    showModal: false,
    largeImg: '',
    totalImages: 0,
  };

  handleSubmit = newSearchQuery => {
    this.state.searchQuery !== newSearchQuery && this.setState({ searchQuery: newSearchQuery, page: 1, pictures: [], totalImages: 0 });
  }

  async componentDidUpdate(prevProps, prevState) { 
       try {
           if (prevState.searchQuery !== this.state.searchQuery
               || prevState.page !== this.state.page) {
               
             this.setState({ loading: true });
             
             const { hits, totalHits } = await fetchImages(this.state.searchQuery.trim(), this.state.page);
             
             if (hits.length === 0) {
                    this.setState({ loading: false, pictures: [], totalImages: 0 });
                    return toast.error(`Nothing found for ${this.state.searchQuery}!`);
               };

                this.setState({
                    pictures: [...this.state.pictures, ...hits],
                    loading: false,
                    totalImages: totalHits,
                });
           };
        } catch (err) {
            console.log(err);
       };
  };
  
  handleLoad = () => {
        this.setState(prev => ({ page: prev.page + 1 }));
  }
  
  compareTotalPages = () => {
    const totalPages = this.state.totalImages / limit;
    const restTotalPages = this.state.pictures.length / limit;
    return totalPages > restTotalPages;
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

  render() {
    const { pictures, loading, showModal, largeImg, totalImages } = this.state;
    const hasMorePages = this.compareTotalPages();

    return (
    <Container>
        <GlobalStyles />
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery pictures={pictures} openModal={this.openModal} />
        {showModal &&
                    <Modal onClose={this.closeModal}>
                        <img src={largeImg} alt={largeImg} width="800" />
                    </Modal>
                }
        {loading && <Loader />}
        {hasMorePages && totalImages > limit && <Button onClick={this.handleLoad}/>}
    </Container>
  );
  }
};
