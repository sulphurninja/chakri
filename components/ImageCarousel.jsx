import { useState, useEffect } from 'react';

const images = [
  '/BLACK 1.png',
  '/BLACK 2.png',
  '/BLACK 3.png',
  '/BLACK 4.png',
];

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStopped, setIsStopped] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isStopped) {
        setCurrentIndex((currentIndex) =>
          currentIndex === images.length - 1 ? 0 : currentIndex + 1
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isStopped]);

  const handleStop = () => {
    setIsStopped(true);
  };

  return (
    <div className="relative ">
      {images.map((image, index) => (
        <img
          key={image}
          src={image}
          alt={`Image ${index}`}
          className={`absolute w-full h-full transition-all duration-500 ${
            currentIndex === index ? 'opacity-100' : 'opacity-0'
          }`}
          onAnimationEnd={() => handleStop()}
        />
      ))}
    </div>
  );
}