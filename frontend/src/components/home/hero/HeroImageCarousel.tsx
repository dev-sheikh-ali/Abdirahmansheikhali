import { ImageData } from '../../../api/home/heroApi';

interface HeroImageCarouselProps {
  images: ImageData[];
}

export const HeroImageCarousel = ({ images }: HeroImageCarouselProps) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="grid grid-cols-2 gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="relative overflow-hidden rounded-lg shadow-lg 
              h-[200px] w-[200px] md:h-[250px] md:w-[250px]
              hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
          >
            <img
              src={image.formats.large.url}
              alt={image.alternativeText || image.name}
              className="w-full h-full object-cover transform hover:scale-110 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
