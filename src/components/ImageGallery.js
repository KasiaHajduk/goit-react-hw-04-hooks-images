import { Component } from 'react';
import Notiflix from 'notiflix';
import imageAPI from '../services/pixabay';
import ImageGalleryItem from './ImageGalleryItem.js';
import Button from './Button';
import Loader from './Loader';
import styled from '@emotion/styled';
import Modal from './Modal.js';


const initialState = {
  page: 1,
  current: 'idle',
  images: [],
  totalImages: 0,
  viewImages: 0,
  largeUrl: '',
  modalVisible: false,
}


const Gallery = styled.div({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
});

const ImagesUl = styled.ul({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  padding: '0px 20px',
  rowGap: '20px',
  columnGap: '20px',
  listStyle: 'none',
});

const ImageLoader = styled.div({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
});

class ImageGallery extends Component {
  state = {
    page: 1,
    current: 'idle',
    images: [],
    totalImages: 0,
    viewImages: 0,
    largeUrl: '',
    modalVisible: false,
  };

  apiState = {
    pending: () => this.setState({ current: 'pending' }),
    succes: () => this.setState({ current: 'succes' }),
    error: () => this.setState({ current: 'error' }),
    idle: () => this.setState({ current: 'idle' }),
    isPending: () => this.state.current === 'pending',
    isSucces: () => this.state.current === 'succes',
    isError: () => this.state.current === 'error',
    isIdle: () => this.state.current === 'idle',
  };

  async componentDidUpdate(prevProps) {
    const prevName = prevProps.name;
    const nextName = this.props.name;

    if (prevName !== nextName) {
      try {
        this.apiState.pending();
        let data = await imageAPI.fetchImages(nextName, this.state.page);
        this.setState({ 
          images: data.hits,
          totalImages: data.total, 
          viewImages: data.hits.length,
         });
         if (this.state.totalImages === 0) {
          Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
          this.setState({state: initialState});
        }

        this.apiState.succes();
      } catch (error) {
        this.apiState.error();
      }
    }
  }

  handleClick = async (event, name) => {
    event.preventDefault();
    this.state.page++;
    try {
      this.apiState.pending();
      let newData = await imageAPI.fetchImages(name, this.state.page);
      this.setState({
        images: [...this.state.images, ...newData.hits],
        viewImages: this.state.viewImages + newData.hits.length,
      } );

      this.apiState.succes();
    } catch (error) {
      this.apiState.error();
    }
  };

  modalImageOn = bigImg => {
    this.setState({ modalVisible: true, largeUrl: bigImg });
  };

  modalImageOff = () => {
    this.setState({ modalVisible: false });
  };

  closeEsc = event => {
    if (event.key === "Escape") {
      this.setState({ modalVisible: false });
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.closeEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeEsc);
  }

  render() {
    let images = this.state.images;
    let imagesRender = [];
    if (images) {
      imagesRender = images.map(image => (
        <ImageGalleryItem
          key={image.id}
          url={image.webformatURL}
          largeUrl={image.largeImageURL}
          modalImageOn={this.modalImageOn}
        />
      ));
    }

    if (this.apiState.isError()) {
      Notiflix.Notify.error('There was an error!');
      return;
    }
    return (
      <div>
        {this.apiState.isPending() && (
          <ImageLoader>
            <Loader />
            <ImagesUl>{imagesRender}</ImagesUl>
          </ImageLoader>
        )}
        {this.apiState.isSucces() && this.state.modalVisible === false && (
          <Gallery>
            <ImagesUl>{imagesRender}</ImagesUl>
          </Gallery>
        )}
        {this.state.modalVisible === true && (
          <Gallery>
            <Modal largeUrl={this.state.largeUrl} onClick={this.modalImageOff} />
            <ImagesUl className="gallery">{imagesRender}</ImagesUl>
          </Gallery>
        )}
 
        {this.state.viewImages === this.state.totalImages ? (
          <></>
        ) : (
          <Button onClick={event => this.handleClick(event, this.props.name)} />
        )} 
      </div>
    );
  }
}

export default ImageGallery;

