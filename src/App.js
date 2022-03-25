import './App.css';
import { Component } from 'react';
import Layout from './components/Layout';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';


class App extends Component {
  state = {
    name: '',
  };

  handleFormSubmit = name => {
    this.setState({ name: name });
  };

  render() {
    return (
      <Layout>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery name={this.state.name} />
      </Layout>
    );
  }
}

export default App;
