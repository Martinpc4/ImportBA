import CartWidget from './CartWidget';
import { NavLink } from 'react-router-dom';

export default function NavBar () {
    return(
        <header>
            <div className="navBar-ctr">
                <div className="navBar-ctr__banner">
                    <img src="/assets/brand/Logo.svg" alt="" />
                </div>
                <div className="navBar-ctr__menu">
                        <NavLink to="/Home" activeClassName="activeItem" className="navBar-ctr__menu__item">
                            <p>Home</p>
                        </NavLink>
                        <NavLink to="/Category/01" activeClassName="activeItem" className="navBar-ctr__menu__item">
                            <p>Mac</p>
                        </NavLink>
                        <NavLink to="/Category/02" activeClassName="activeItem" className="navBar-ctr__menu__item">
                            <p>IPad</p>
                        </NavLink>
                        <NavLink to="/Category/03" activeClassName="activeItem" className="navBar-ctr__menu__item">
                            <p>IPhone</p>
                        </NavLink>
                        <NavLink to="/Category/04" activeClassName="activeItem" className="navBar-ctr__menu__item">
                            <p>Accesorios</p>
                        </NavLink>
                        <div className="navBar-ctr__menu__item">
                            <CartWidget />
                        </div>
                </div>
            </div>
        </header>
    );
}