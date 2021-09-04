// ! Imports
// * Libraries
import CartWidget from './CartWidget';
import { NavLink, Link } from 'react-router-dom';

// ! NavBar React Function Component
const NavBar: React.FC = () => {
    return (
        <header className='border-bottom py-3 bg-light'>
            <div className='container'>
                <div className='row align-items-center justify-content-between'>
                    <div className='col-3'>
                        <Link to={`/`}>
                            <img
                                src='/assets/brand/Logo.svg'
                                className='w-75'
                                alt=''
                            />
                        </Link>
                    </div>
                    <div className='col-6'>
                        <div className='row d-flex flex-row'>
                            <Link to='/' className='col text-decoration-none'>
                                <p className='m-0 fs-5 text-center text-dark'>
                                    Home
                                </p>
                            </Link>
                            <NavLink
                                to='/Shop/1'
                                activeClassName='hdr-active-item'
                                className='col text-decoration-none'
                            >
                                <p className='m-0 fs-5 text-center text-dark'>
                                    Mac
                                </p>
                            </NavLink>
                            <NavLink
                                to='/Shop/2'
                                activeClassName='hdr-active-item'
                                className='col text-decoration-none'
                            >
                                <p className='m-0 fs-5 text-center text-dark'>
                                    IPad
                                </p>
                            </NavLink>
                            <NavLink
                                to='/Shop/3'
                                activeClassName='hdr-active-item'
                                className='col text-decoration-none'
                            >
                                <p className='m-0 fs-5 text-center text-dark'>
                                    IPhone
                                </p>
                            </NavLink>
                            <NavLink
                                to='/Shop/4'
                                activeClassName='hdr-active-item'
                                className='col text-decoration-none'
                            >
                                <p className='m-0 fs-5 text-center text-dark'>
                                    Accesorios
                                </p>
                            </NavLink>
                        </div>
                    </div>
                    <div className='col-3'>
                        <div className='row'>
                            <CartWidget />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default NavBar;
