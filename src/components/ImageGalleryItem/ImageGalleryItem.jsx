import { Image, Item } from "./ImageGalleryItem.styled";
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({images, onClick}) => {
    return images.map(({ id, webformatURL, largeImageURL }) => (
        <Item key={id}>
            <Image src={webformatURL} alt={largeImageURL} onClick={onClick} />
        </Item>
    ))
}

ImageGalleryItem.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            webformatURL: PropTypes.string.isRequired,
            largeImageURL: PropTypes.string.isRequired
      })
    ).isRequired,
    onClick: PropTypes.func.isRequired
};