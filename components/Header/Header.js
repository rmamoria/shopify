import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faSearch,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import style from "./Header.module.css";
import { useRouter } from "next/router";

export default function MainHeader() {
  const router = useRouter();
  const [activeLink, setActiveLink] = useState(router.pathname);

  useEffect(() => {
    setActiveLink(router.pathname);
  }, [router.pathname]);

  const handleSearch = (event) => {
    console.log("Search query:", event.target.value);
  };

  const goToHome = () => {
    router.push("/");
  };

  return (
    <header className={style.header}>
      <div className={style.logo}>
        <h2 onClick={goToHome}>Shopify</h2>
      </div>
      <nav className={style.navbar}>
        <ul className={style.navbar_items}>
          <li>
            <Link
              href="/"
              passHref
              className={activeLink === "/" ? style.active : null}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              passH
              className={activeLink === "/about" ? style.active : null}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              passH
              className={activeLink === "/contact" ? style.active : null}
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      <div className={style.search}>
        <input
          type="text"
          placeholder="What are you looking for?"
          onChange={handleSearch}
          className={style.search_input}
        />
        <button className={style.search_button}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <div className={style.cart}>
        <div className={style.cart_icon}>
          <FontAwesomeIcon icon={faCartShopping} />
        </div>
      </div>
      <div>
        <Link href="/signup" passHref>

            <FontAwesomeIcon icon={faUser} /> <span>SignUp</span>

        </Link>
      </div>
    </header>
  );
}
