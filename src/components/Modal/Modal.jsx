import { Component } from "react";
import { createPortal } from "react-dom";
import { Backdrop, Content } from "./Modal.styled";
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown)
    }

    handleKeyDown = e => {
        e.code === 'Escape' && this.props.onClose();
    }

    handleBackdropClick = e => {
        e.currentTarget === e.target && this.props.onClose();
    }

    render() {
        return createPortal(
            <Backdrop onClick={this.handleBackdropClick}>
                <Content>
                    {this.props.children}
                </Content>
            </Backdrop>,
            modalRoot,
        )
    }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};