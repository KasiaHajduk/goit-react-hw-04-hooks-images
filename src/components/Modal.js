import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Overlay = styled.div({
  top: 0,
  left: 0,
  position: 'fixed',
  backgroundColor: 'rgba(0, 0, 0, 0.9)',
  width: '100%',
  height: '100%',
});

const ImageModal = styled.div({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
});


function Modal({ largeUrl, onClick }) {
  return (
    <Overlay onClick={onClick}>
      <ImageModal>
        <img src={largeUrl} alt='large' onClick={event => event.stopPropagation()}/>
      </ImageModal>
    </Overlay>
  );
}

Modal.propTypes = {
  largeUrl: PropTypes.string,
  onClick: PropTypes.func,
};

export default Modal;
