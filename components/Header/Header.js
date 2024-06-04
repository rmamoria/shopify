import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faSearch,
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";
import style from "./Header.module.css";
import { useRouter } from "next/router";
import { useStateContext } from "@/contexts/StateContext";
import { useSession, signOut } from "next-auth/react";
import { Menu, MenuItem, Button } from "@mui/material";

export default function MainHeader() {
  const { data: session } = useSession();
  const { user, setLoggedIn, loggedIn } = useStateContext();
  const router = useRouter();
  const [activeLink, setActiveLink] = useState(router.pathname);
  const { cartItems } = useStateContext();
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    setActiveLink(router.pathname);
  }, [router.pathname]);

  const handleSearch = (event) => {
    console.log("Search query:", event.target.value);
  };

  const goToHome = () => {
    router.push("/");
  };

  const goToCartItems = () => {
    router.push("/cart-items");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
    handleClose();
    console.log("after logout :", session)
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
              passHref
              className={activeLink === "/about" ? style.active : null}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              passHref
              className={activeLink === "/contact" ? style.active : null}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="/sell-product"
              passHref
              className={activeLink === "/sell-product" ? style.active : null}
            >
              Sell Products
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
        <div className={style.cart_icon} onClick={goToCartItems}>
          <FontAwesomeIcon icon={faCartShopping} />
          {cartItems.length > 0 && (
            <span className={style.cart_badge}>{cartItems.length}</span>
          )}
        </div>
      </div>
      <div>
        {loggedIn ? (
          <>
            <div onClick={handleClick} className={style.login_details}>
              <img
                className={style.user_image}
                src={session.user.image}
                alt="user image"
              />
              <p>{session?.user.name.split(" ")[0]}</p>
              <p>
                {" "}
                <FontAwesomeIcon icon={faChevronDown} />
              </p>
            </div>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              getContentAnchorEl={null}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              transformOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <MenuItem className={style.menuItem}>
                {session.user.name}
              </MenuItem>
              <MenuItem className={style.menuItem}>
                {session.user.email}
              </MenuItem>
              <MenuItem className={style.logoutButton}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Link href="/login">
            <Button variant="contained" color="primary" onClick={handleLogout}>
              login
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}
