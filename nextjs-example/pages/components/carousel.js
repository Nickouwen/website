import React from 'react';
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';

export default function App() {
  const images = [1,2,3,4,5,6,7].map((number) => ({
    src: `/jacs${number}.jpg`,
    style: { objectFit: 'contain' }
  }));

  return (
    <Carousel images={images} style={{ height: '100%', width: '100%' }} canAutoPlay={false} />
  );
};
