import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const MoreButton = styled.button({
  backgroundColor: '#4056b4',
  color: 'white',
  fontSize: '16px',
  padding: '12px 48px',
  border: 'none',
  borderRadius: 4,
  cursor: 'pointer',
  marginTop: '20px',
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
});

function Button({onClick }) {
  return (
    <MoreButton type="button" onClick={onClick}>
      Load more
    </MoreButton>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
};

export default Button;
