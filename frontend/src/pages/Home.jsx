import React, { useEffect, useState } from "react";
import Hero from "../components/Layout/Hero";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductsDetails from "../components/Products/ProductsDetails";
import ProductGrid from "../components/Products/ProductGrid";
import FeaturesCollection from "../components/Products/FeaturesCollection";
import FeaturedSection from "../components/Products/FeaturedSection";

import { fetchProductsByFilters } from "../redux/slice/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Top Wear",
        limit: 8,
      })
    );
    // Fetch best seller products
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/products/best-seller`
        );
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBestSeller();
  }, [dispatch]);

  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />

      {/* Best Seller */}
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      {bestSellerProduct ? (
        <ProductsDetails productId={bestSellerProduct._id} />
      ) : (
        <p className="text-center">Loading best seller products...</p>
      )}

      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears for Woman
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>

      <FeaturesCollection />
      <FeaturedSection />
    </div>
  );
};

export default Home;
