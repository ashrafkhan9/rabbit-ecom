import { Link } from "react-router-dom";
import heroImg from "../../assets/rabbit-hero.png";

const Hero = () => {
  return (
    <section className="relative">
      <div className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] xl:h-[600px] max-h-[75vh] overflow-hidden">
        <img
          src={heroImg}
          alt="Rabbit"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-5 flex items-center justify-center">
        <div className="text-center text-white p-6">
          <h1 className="text-4xl md:text-8xl font-bold tracking-tighter uppercase mb-4">
            Vacation <br /> Ready
          </h1>
          <p className="text-sm tracking-tighter md:text-lg mb-6">
            Explore our vaction-ready outfits with fast worlwide shipping
          </p>
          <Link
            to="#"
            className="bg-white text-gray-950 px-6 py-2 rounded-sm text-lg"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
