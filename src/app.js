import React, { Component } from 'react';
import styled from 'styled-components';
import { TweenLite, Sine } from 'gsap';
import data from './images.json';
import { Image, Thumb } from './components';

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledImages = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const StyledThumbs = styled.div`
  position: absolute;
  bottom: 10%;
  width: 100%;
  text-align: center;
`;

class App extends Component {

  componentWillMount() {

    this.animation = {
      x: 0
    };

    this.setState({
      imgs: data.images,
      index: 0,
      windowSize: this.getWindowSize()
    });

    window.addEventListener(
      'resize',
      this.handleResize.bind(this)
    );
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

  handleResize() {

    TweenLite.killTweensOf(this.animation);

    const windowSize = this.getWindowSize();
    this.animation.x = -this.state.index*windowSize.width;

    this.setState({
      windowSize
    });
  }

  handleThumbClick(thumbIndex) {

    const targetX = -thumbIndex*window.innerWidth;
    const diff = Math.abs(this.animation.x - targetX);
    const duration = 0.5*diff/window.innerWidth;

    TweenLite.to(this.animation, duration, {
      x: targetX,
      ease: Sine.easeOut,
      onUpdate: () => {
        this.forceUpdate();
    }});

    this.setState({
      index: thumbIndex
    })
  }

  renderImages(imgs, windowSize) {

    const animationIndex = Math.floor(Math.abs(this.animation.x) / window.innerWidth);
    const animating = Boolean(this.animation.x%window.innerWidth);

    return imgs.reduce((images, img, i) => {
      const renderImage = i === animationIndex || (animating && i === animationIndex + 1);

      if(renderImage) {

        const x = this.animation.x + window.innerWidth*i;
        const image = (
          <Image
            key={i}
            path={img.imagePath}
            x={x}
            windowSize={windowSize}
          />
        );
        images.push(image);
      }

      return images;
    }, []);
  }

  renderThumbs(imgs, index) {

    return imgs.map((img, i) => (
      <Thumb
        key={i}
        path={img.thumbPath}
        active={i===index}
        index={i}
        onClick={this.handleThumbClick.bind(this)}
      />
    ));
  }

  render() {

    const {
      imgs,
      index,
      windowSize
    } = this.state;

    const images = this.renderImages(imgs, windowSize);
    const thumbs = this.renderThumbs(imgs, index);

    return (
      <StyledContainer>
        <StyledImages>
          {images}
        </StyledImages>
        <StyledThumbs>
          {thumbs}
        </StyledThumbs>
      </StyledContainer>
    );
  }
}

export default App;
