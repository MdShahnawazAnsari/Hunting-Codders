import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { BiMenu } from "react-icons/bi";
import Image from "next/image";

const menuItem = [
  {
    title: "Home",
    link: "/",
    id: 1,
  },
  {
    title: "Blogs",
    link: "/blogs",
    id: 2,
  },
  {
    title: "About",
    link: "/about",
    id: 3,
  },
  {
    title: "Contact",
    link: "/contact",
    id: 4,
  },
];

const Header = () => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [show, setShow] = useState("translate-y-0");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchQuarry, setSearchQuarry] = useState("");

  const router = useRouter();

  // navbar controll

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if ((window.scrollY > lastScrollY) & !mobileMenu) {
        setShow("-translate-y-[90px]");
      } else {
        setShow("shadow-sm");
      }
    } else {
      setShow("tranlate-y-0");
    }
    setLastScrollY(window.scrollY);
  };

  // search

  const handleSearch = () => {
    router.push(`/search/${searchQuarry}`);
  };
  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <header
      id="header"
      className={`flex w-full h-16 items-center mb-8 top-0 pt-4 justify-between pb-4 border-b-[1px] z-50 sticky transition-transform duration-300 bg-white text-black md:w-[80%] mx-auto font-josefin ${show}`}
    >
      {/* logo starts */}
      {/* <div className="px-12">Logo</div> */}
      <Link href={"/"}>
        <Image
          className="ml-2"
          src="/logo.png"
          width={150}
          height={80}
          alt="logo"
        />
      </Link>
      {/* logo end */}

      {/* pages navigation start */}
      <div className="hidden md:flex items-center">
        {menuItem.map((item) => (
          <Link
            key={item.id}
            href={item.link}
            className={`mx-2 font-bold pb-2 transition-transform duration-300 border-lightBrown hover:text-lightBrown hover:border-b-[2px]`}
          >
            {item.title}
          </Link>
        ))}
      </div>
      {/* pages navigation end

      {/* mobile pages navigation start */}
      {mobileMenu && (
        <div className="flex md:hidden flex-col font-bold absolute top-[50px] left-0 w-full bg-[#f1f1f1] text-black ">
          {menuItem.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              className={`font-bold pl-12 my-2 shadow-sm pb-2 font-playfair `}
              onClick={() => setMobileMenu(false)}
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
      {/* mobile pages navigation end */}

      <div className="flex items-center">
        {/* search box start */}

        <div className="h-7 flex">
          <AiOutlineSearch size={25} className="relative left-7 text-black " />
          <input
            type="text"
            value={searchQuarry}
            name="searchQuarry"
            onChange={(e) => setSearchQuarry(e.target.value)}
            placeholder="Search here"
            className="pl-8 max-w-[9rem] outline-none rounded"
          />
        </div>
        {/* search box end */}

        {/* button start */}
        <button
          className="mr-4 text-[12px] px-4 py-2 bg-lightBrown text-white rounded"
          onClick={handleSearch}
        >
          <span className="opacity-80">Search</span>
        </button>
      </div>
      {/* button end */}
      <div className="md:hidden mr-4">
        {mobileMenu ? (
          <AiOutlineClose onClick={() => setMobileMenu(false)} size={20} />
        ) : (
          <BiMenu size={20} onClick={() => setMobileMenu(true)} />
        )}
      </div>
    </header>
  );
};

export default Header;
