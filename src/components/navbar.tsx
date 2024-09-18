import React, { useState, useEffect } from "react";
import { MdMenu } from "react-icons/md";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import logo from "../assets/navlogo.svg";
import Sidebar from "./sidebar";
import AddToCartSidebar from "./addtocartsidebar";

const Navbar: React.FC = (): JSX.Element => {
  const [sidebar, setSidebar] = useState<boolean>(false);
  const [hideNavbar, setHideNavbar] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const toggleSidebar = (): void => {
    setSidebar(!sidebar);
  };

  const toggleCartSidebar = (): void => {
    setIsCartOpen(!isCartOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setHideNavbar(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavigate = (path: string): void => {
    navigate(path);
    setSidebar(false); // Close the sidebar before navigating
  };

  return (
    <>
      <nav
        className={`navbar top-0 left-0 w-full flex items-center justify-between pl-4 pr-4 pb-2 bg-black z-50 transition-opacity duration-300 ease-in-out ${
          hideNavbar ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="hidden md:flex h-24 flex-col w-full">
          {/* For Large Screens */}
          <div className="hidden h-20 md:flex items-center justify-between w-full pl-16 pr-16 text-white border-b-2 border-white">
            <div className="flex items-center space-x-4">
              <MdMenu
                className="text-4xl cursor-pointer"
                onClick={toggleSidebar} // Toggle sidebar on click
              />
              <FaSearch className="text-2xl" />
            </div>

            <img
              onClick={() => handleNavigate("/")} // Navigate to home on click
              src={logo}
              alt="BlackWilbur"
              className="h-18 w-40 mx-auto text-white"
              style={{ filter: "invert(1)" }} // Inverts the colors
            />
            <div className="flex items-center space-x-4">
              <FaCircleUser
                onClick={() => handleNavigate("/Login")} // Navigate to login
                className="text-2xl cursor-pointer"
              />
              <FaShoppingCart
                onClick={toggleCartSidebar} // Toggle cart sidebar on click
                className="text-2xl cursor-pointer"
              />
            </div>
          </div>

          {/* Mini Navbar */}
          <div className="hidden h-8 md:flex items-center justify-center w-full pl-16 pr-10 space-x-4 text-white">
            {["Collection", "Oversize", "Round Neck", "Polo", "Knitted"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => handleNavigate("/collection")} // Navigate to collection
                  className="relative text-sm font-semibold px-4 py-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-white after:transform after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300"
                >
                  {item}
                </button>
              )
            )}
          </div>
        </div>

        {/* For Medium and Small Screens */}
        <div className="flex md:hidden items-center justify-between w-full h-12 p-2 text-white">
          <img
            src={logo}
            alt="BlackWilbur"
            className="h-6"
            style={{ filter: "invert(1)" }} // Inverts the colors
          />
          <div className="flex items-center space-x-4">
            <FaSearch className="text-xl" />
            <FaShoppingCart
              onClick={toggleCartSidebar} // Toggle cart sidebar on click
              className="text-xl cursor-pointer"
            />
            <FaCircleUser
              onClick={() => handleNavigate("/Login")} // Navigate to login
              className="text-xl cursor-pointer"
            />
            <MdMenu
              className="text-2xl cursor-pointer pr-2"
              onClick={toggleSidebar} // Toggle sidebar on click
            />
          </div>
        </div>
      </nav>

      {/* Sidebar component */}
      <Sidebar isOpen={sidebar} onClose={() => setSidebar(false)} />

      {/* Add to Cart Sidebar */}
      <div className="text-black">
        <AddToCartSidebar isOpen={isCartOpen} onClose={toggleCartSidebar} />
      </div>
    </>
  );
};

export default Navbar;
