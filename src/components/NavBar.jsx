import CartWidget from "./CartWidget";
import { NavLink, Link } from "react-router-dom";

export default function NavBar() {
    return (
        <header>
            <div className="navBar-ctr">
                <div className="navBar-ctr__banner">
                    <Link to={`/Home`}>
                        <img src="/assets/brand/Logo.svg" alt="" />
                    </Link>
                </div>
                <div className="navBar-ctr__menu">
                    <NavLink
                        to="/Home"
                        activeClassName="activeItem"
                        className="navBar-ctr__menu__item"
                    >
                        <p>Home</p>
                    </NavLink>
                    <NavLink
                        to="/Shop/1"
                        activeClassName="activeItem"
                        className="navBar-ctr__menu__item"
                    >
                        <p>Mac</p>
                    </NavLink>
                    <NavLink
                        to="/Shop/2"
                        activeClassName="activeItem"
                        className="navBar-ctr__menu__item"
                    >
                        <p>IPad</p>
                    </NavLink>
                    <NavLink
                        to="/Shop/3"
                        activeClassName="activeItem"
                        className="navBar-ctr__menu__item"
                    >
                        <p>IPhone</p>
                    </NavLink>
                    <NavLink
                        to="/Shop/4"
                        activeClassName="activeItem"
                        className="navBar-ctr__menu__item"
                    >
                        <p>Accesorios</p>
                    </NavLink>
                </div>
                <div className="navBar-ctr__actions">
                    <div className="navBar-ctr__actions__item">
                        <CartWidget />
                    </div>
                </div>
            </div>
        </header>
    );
}
