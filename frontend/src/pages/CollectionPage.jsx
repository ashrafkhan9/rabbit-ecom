import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slice/productsSlice";

import { useLocation } from "react-router-dom";

const CollectionPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const { collection } = useParams();
  // const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  // const queryParams = Object.fromEntries([...searchParams]);
  const location = useLocation();
  const queryParams = React.useMemo(() => {
    return Object.fromEntries(new URLSearchParams(location.search));
  }, [location.search]);

  useEffect(() => {
    dispatch(fetchProductsByFilters({ collection, ...queryParams }));
  }, [dispatch, collection, location.search]);

  // useEffect(() => {
  //   dispatch(fetchProductsByFilters({ collection, ...queryParams }));
  // }, [dispatch, collection, searchParams]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener when sidebar is open

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile Filter Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex items-center justify-center rounded-md shadow-md bg-gray-100 hover:bg-gray-200 transition-all duration-300"
      >
        <FaFilter className="mr-2 text-gray-600" /> Filter
      </button>

      {/* Filter Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 w-80 bg-white shadow-lg transition-transform duration-300 z-50 overflow-y-auto
          ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:static lg:translate-x-0`}
      >
        <FilterSidebar />
      </div>

      <div className="flex-grow p-4">
        <h2 className="text-2xl font-semibold uppercase mb-4">
          All Collection
        </h2>

        {/* Sort Options */}
        <SortOptions />

        {/* Product Grid */}
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default CollectionPage;
