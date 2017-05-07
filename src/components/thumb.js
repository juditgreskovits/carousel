import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledThumbContainer = styled.div`
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  margin: 5px;
  padding: 0;
  width: 102px;
  height: 70px;
  overflow: hidden;
  border: 5px solid white;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
  transition: border-width 0.1s ease-out;
  cursor: pointer;

  &:hover {
    border: 10px solid white;
  }
`;

const ActiveStyledThumbContainer = styled(StyledThumbContainer)`
  border: 10px solid white;
`;

const StyledThumb = styled.img`
  width: 100%;
  height: 100%;
`;

class Thumb extends Component {

  handleClick(evt) {

    const {
      index,
      onClick
    } = this.props;

    onClick(index);
  }

  render() {

    const {
      path,
      active
    } = this.props;

    return active ? (
      <ActiveStyledThumbContainer>
        <StyledThumb src={path} />
      </ActiveStyledThumbContainer>
    ) : (
      <StyledThumbContainer onClick={this.handleClick.bind(this)}>
        <StyledThumb src={path} />
      </StyledThumbContainer>
    );
  }
}

Thumb.propTypes = {
  path: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Thumb;
