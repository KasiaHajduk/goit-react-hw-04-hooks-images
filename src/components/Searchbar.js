import { Component } from 'react';
import Notiflix from 'notiflix';
import styled from '@emotion/styled';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';

const HeaderSearch = styled.div ({
  top: '0',
  left: '0',
  position: 'sticky',
  margin: '10px',
  backgroundColor: '#4056b4',
  padding: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const FormSearch = styled.form ({
  backgroundColor: '#fff',
  borderRadius: '3px',
//  overflow: 'hidden',
});


const SearchButton = styled.button({
  backgroundColor: '#fff',
  fontSize: '16px',
  padding: '12px 12px',
  color: 'grey',
  border: 'none',
});


const SearchInput = styled.input({
  fontSize: '16px',
  padding: '12px 12px',
  minWidth: '500px',
  border: 'none',
  outline: 'none',
});


class Searchbar extends Component {
  state = {
    name: '',
  };

  handleChange = event => {
    this.setState({ name: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.name.trim() === '') {
      Notiflix.Notify.warning('Please enter a topic to search !');
      return;
    }
    this.props.onSubmit(this.state.name);
    this.setState({ name: '' });
  };



  render() {
    return (
      <HeaderSearch>
        <FormSearch onSubmit={this.handleSubmit}>
          <SearchButton type="submit" >
              <ImSearch />
          </SearchButton>

          <SearchInput
            onChange={this.handleChange}
            value={this.state.name}
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </FormSearch>
      </HeaderSearch>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

export default Searchbar;
