import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);

  const { cart } = useSelector((state) => state.cart);
  const cartItemCount =
    cart?.products?.reduce((total, product) => total + product.quantity, 0) ||
    0;

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  // Extract common classes for both active and inactive states
  const commonClasses =
    "text-sm font-medium uppercase transition-all duration-200";
  const activeStyle =
    commonClasses +
    " text-black underline decoration-red-500 underline-offset-4";
  const inactiveStyle =
    commonClasses +
    " text-gray-700 hover:text-black hover:underline hover:decoration-red-500 hover:underline-offset-4";

  // Parse query parameters using URLSearchParams
  const params = new URLSearchParams(location.search);
  const currentGender = params.get("gender");
  const currentCategory = params.get("category");

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-2 sm:px-5">
        <div>
          <NavLink to="/" className="text-2xl font-medium">
            Rabbit
          </NavLink>
        </div>
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <NavLink
            to="/collections/all?gender=Men"
            className={() =>
              currentGender === "Men" ? activeStyle : inactiveStyle
            }
          >
            Men
          </NavLink>
          <NavLink
            to="/collections/all?gender=Women"
            className={() =>
              currentGender === "Women" ? activeStyle : inactiveStyle
            }
          >
            Women
          </NavLink>
          <NavLink
            to="/collections/all?category=Top Wear"
            className={() =>
              currentCategory === "Top Wear" ? activeStyle : inactiveStyle
            }
          >
            Top Wear
          </NavLink>
          <NavLink
            to="/collections/all?category=Bottom Wear"
            className={() =>
              currentCategory === "Bottom Wear" ? activeStyle : inactiveStyle
            }
          >
            Bottom Wear
          </NavLink>
        </div>
        {/* Right Icons */}
        <div className="flex items-center space-x-4">
          {user && user.role === "admin" && (
            <NavLink
              to="/admin"
              className="block bg-black py-1 px-1 rounded text-sm text-white"
            >
              Admin
            </NavLink>
          )}

          <NavLink to="/profile" className="hover:text-black">
            <HiOutlineUser className="h-6 w-6 text-gray-700" />
          </NavLink>
          <button
            onClick={toggleCartDrawer}
            className="relative hover:text-black"
          >
            <HiOutlineShoppingBag className="h-7 w-6 text-gray-700" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 bg-rabbit-red text-white text-xs rounded-full px-2 py-0.5">
                {cartItemCount}
              </span>
            )}
          </button>
          <div className="overflow-hidden">
            <SearchBar />
          </div>
          <button onClick={toggleNavDrawer} className="md:hidden">
            <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </nav>
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <nav>
            <NavLink
              to="/collections/all?gender=Men"
              onClick={toggleNavDrawer}
              className={() =>
                currentGender === "Men"
                  ? "block " + activeStyle
                  : "block " + inactiveStyle
              }
            >
              Men
            </NavLink>
            <NavLink
              to="/collections/all?gender=Women"
              onClick={toggleNavDrawer}
              className={() =>
                currentGender === "Women"
                  ? "block " + activeStyle
                  : "block " + inactiveStyle
              }
            >
              Women
            </NavLink>
            <NavLink
              to="/collections/all?category=Top Wear"
              onClick={toggleNavDrawer}
              className={() =>
                currentCategory === "Top Wear"
                  ? "block " + activeStyle
                  : "block " + inactiveStyle
              }
            >
              Top Wear
            </NavLink>
            <NavLink
              to="/collections/all?category=Bottom Wear"
              onClick={toggleNavDrawer}
              className={() =>
                currentCategory === "Bottom Wear"
                  ? "block " + activeStyle
                  : "block " + inactiveStyle
              }
            >
              Bottom Wear
            </NavLink>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
