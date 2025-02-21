import React from "react";
import { Link } from "react-router-dom";

const ProductGrid = ({ products, loading, error }) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map((product, index) => (
        <Link key={index} to={`/product/${product._id}`} className="block">
          <div className="bg-white p-4 rounded-lg mt-4">
            <div className="w-full h-[330px] mb-4 overflow-hidden rounded-lg">
              <img
                src={product.images[0].url}
                alt={product.images[0].altText || product.name}
                className="w-full h-full object-cover rounded-lg transition-transform duration-300 ease-in-out hover:scale-105"
              />
            </div>
            <h3 className="text-sm mb-2">{product.name}</h3>
            <p className="text-gray-500 font-medium text-sm tracking-tighter">
              $ {product.price}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
