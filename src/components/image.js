import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledContainer = styled.div`
  position: absolute;
  top: 0;
  left: ${(p) => p.x}px;
  width: ${(p) => p.windowSize.width}px;
  height: ${(p) => p.windowSize.height}px;
  overflow: hidden;
`;

const StyledImage = styled.img`
  position: absolute;
  top: ${(p) => p.imageRect.y}px;
  left: ${(p) => p.imageRect.x}px;
  width: ${(p) => p.imageRect.width}px;
  height: ${(p) => p.imageRect.height}px;
`;

const StyledLoader = styled.img`
  display: none;
`;

class Image extends Component {

  componentWillMount() {
    
    this.setState({
      windowSize: null,
      imageRect: null
    })
  }

  handleLoad(evt) {

    const image = evt.target;
    const width = evt.target.width;
    const height =  evt.target.height;

    const imageSize = {
      width,
      height,
      ratio: width / height
    }

    this.setState({
      imageSize,
      windowSize: this.getWindowSize()
    }, () => this.sizeAndPositionImage());

    window.addEventListener(
      'resize',
      this.sizeAndPositionImage.bind(this)
    );
  }

  sizeAndPositionImage() {

    const windowSize = this.getWindowSize();
    const imageSize = this.state.imageSize;

    let width = windowSize.width, height = windowSize.height;
    let x = 0, y = 0;

    if(windowSize.ratio <= imageSize.ratio) {
      width = imageSize.width*windowSize.height/imageSize.height;
      x = (windowSize.width - width)/2;
    }
    else if(windowSize.ratio > imageSize.ratio) {
      height = imageSize.height*windowSize.width/imageSize.width;
      y = (windowSize.height - height)/2;
    }

    this.setState({
      windowSize: windowSize,
      imageRect: {
        x,
        y,
        width,
        height
      }
    });
  }

  getWindowSize() {
    const width = window.innerWidth;
    const height = window.innerHeight
    return {
      width,
      height,
      ratio: width / height
    }
  }

  render() {

    const {
      path,
      x
    } = this.props;

    const {
      windowSize,
      imageRect
    } = this.state;

    return imageRect ? (
      <StyledContainer windowSize={windowSize} x={x}>
        <StyledImage imageRect={imageRect} src={path} />
      </StyledContainer>
    ) : (
      <StyledLoader onLoad={this.handleLoad.bind(this)} src={path} />
    );
  }
}

Image.propTypes = {
  path: PropTypes.string,
  x: PropTypes.number
}

export default Image;
