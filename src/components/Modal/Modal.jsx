import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Backdrop, Content } from "./Modal.styled";
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({onClose, children}) => {
    useEffect(() => {
        const handleKeyDown = e => {
            e.code === 'Escape' && onClose();
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        };
    }, [onClose])
    
    const handleBackdropClick = e => {
        e.currentTarget === e.target && onClose();
    }

        return createPortal(
            <Backdrop onClick={handleBackdropClick}>
                <Content>
                    {children}
                </Content>
            </Backdrop>,
            modalRoot,
        )
    
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node,
};