import { Link } from "react-router-dom";
import mensCollectionImage from "../../assets/mens-collection.webp";
import WomensCollectionImage from "../../assets/womens-collection.webp";

const GenderCollectionSection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        {/* Women's Collection */}
        <div className="relative flex-1">
          <img
            src={WomensCollectionImage}
            alt="Women's Collection"
            className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[650px] xl:h-[700px] max-h-[80vh] object-cover"
          />
          <div className="absolute bottom-8 left-4 bg-white bg-opacity-90 p-4 rounded-md shadow-md">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Women's Collection
            </h2>
            <Link
              to="#"
              className="text-gray-900 underline hover:text-gray-700 transition"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Men's Collection */}
        <div className="relative flex-1">
          <img
            src={mensCollectionImage}
            alt="Men's Collection"
            className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[650px] xl:h-[700px] max-h-[80vh] object-cover"
          />
          <div className="absolute bottom-8 left-4 bg-white bg-opacity-90 p-4 rounded-md shadow-md">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Men's Collection
            </h2>
            <Link
              to="#"
              className="text-gray-900 underline hover:text-gray-700 transition"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollectionSection;
