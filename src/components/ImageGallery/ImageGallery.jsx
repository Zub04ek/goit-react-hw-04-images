import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { List } from "./ImageGallery.styled";
import PropTypes from 'prop-types';

export const ImageGallery = ({pictures, openModal}) => {
    return (
        <List>
            <ImageGalleryItem images={pictures} onClick={openModal} />
        </List>
    )
}

ImageGallery.propTypes = {
    pictures: PropTypes.array.isRequired,
    openModal: PropTypes.func.isRequired,
};