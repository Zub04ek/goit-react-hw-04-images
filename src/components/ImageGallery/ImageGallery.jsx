import { useState } from "react";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { List } from "./ImageGallery.styled";
import { Modal } from "components/Modal/Modal";
import PropTypes from 'prop-types';

export const ImageGallery = ({ pictures }) => {
    const [showModal, setShowModal] = useState(false);
    const [largeImg, setLargeImg] = useState('');

    const openModal = (e) => {
        setShowModal(showModal => !showModal);
        setLargeImg(e.currentTarget.alt);
    }

    const closeModal = () => {
        setShowModal(showModal => !showModal);
    }

    return (
        <List>
            <ImageGalleryItem images={pictures} onClick={openModal} />
            {showModal && <Modal onClose={closeModal} largeImg={largeImg} />}
        </List>
    )
}

ImageGallery.propTypes = {
    pictures: PropTypes.array.isRequired,
};