import React from 'react';
import Slider from 'react-slick';
import car1 from '../../assets/login/car1.png';
import car2 from '../../assets/login/car2.jpg';
import car3 from '../../assets/login/car3.jpg';
import car4 from '../../assets/login/car4.jpg';
import car5 from '../../assets/login/car5.png';
import car6 from '../../assets/login/car.jpg';
import car7 from '../../assets/login/car7.jpg';

const ImageCarousel: React.FC = () => {
  const images = [car1, car2, car3, car4, car5, car6, car7];

  // Mezcla las imágenes para que se muestren en orden aleatorio
  const shuffledImages = images.sort(() => 0.5 - Math.random());

  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000, 
    arrows: false,
  };

  return (
    <div className="w-1/2 h-screen relative flex items-center justify-center bg-opacity-80 backdrop-blur-lg">
      <Slider {...settings} className="w-full h-full">
        {shuffledImages.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
