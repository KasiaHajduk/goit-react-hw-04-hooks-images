import { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const ImageLi = styled.li({
  width: '400px',
});

const ImageImg = styled.img({
  //display: 'block',
  height: '100%',
  width: '100%',
  objectFit: 'cover',
  cursor: 'pointer',
});

class ImageGalleryItem extends Component {
  // state = {
  //   isClicked: false,
  // };

  handleClick = () => {
    this.props.modalImageOn(this.props.largeUrl);
  };

  render() {
    return (
      <ImageLi onClick={this.handleClick}>
        <ImageImg src={this.props.url} alt='image' />
      </ImageLi>
    );
  }
}

ImageGalleryItem.propTypes = {
  url: PropTypes.string,
  largeUrl: PropTypes.string,
  modalImageOn: PropTypes.func,
};

export default ImageGalleryItem;
