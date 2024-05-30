import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import style from "./Header.module.css";
import { useRouter } from "next/navigation";

export default function MainHeader() {
  const [activeLink, setActiveLink] = useState(0); // Initialize activeLink with 0 for Home
  const router = useRouter();
  const handleSearch = (event) => {
    // Handle search logic here
    console.log("Search query:", event.target.value);
    // Implement your search functionality (e.g., fetch data, filter results, etc.)
  };

  const handleSetActiveLink = (index) => {
    setActiveLink(index);
  };

  const goToHome=()=>{
    router.push("/");
  }
  return (
    <header className={style.header}>
      <div className={style.logo}>
        <h2 onClick={goToHome}> Shopify</h2>
      </div>
      <nav className={style.navbar}>
        <ul className={style.navbar_items}>
          <li>
            <Link
              href="/"
              passHref
              className={activeLink === 0 ? style.active : null}
              onClick={() => handleSetActiveLink(0)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              passHref
              className={activeLink === 1 ? style.active : null}
              onClick={() => handleSetActiveLink(1)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              passHref
              className={activeLink === 2 ? style.active : null}
              onClick={() => handleSetActiveLink(2)}
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      <div className={style.search}>
        <input
          type="text"
          placeholder="What are you looking for ?"
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
