import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className='border-top py-4 bg-gray'>
            <div className='container'>
                <div className='row justify-content-between align-items-start'>
                    <div className='col-md-2'>
                        <div className='row'>
                            <div className='col-12'>
                                <p className='m-0 fs-5'>Contact</p>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-12'>
                                <div className='row'>
                                    <div className='col-1'>
                                        <i className='bi bi-instagram'></i>
                                    </div>
                                    <div className='col'>
                                        <p className='m-0'>Instagram</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-1'>
                                        <i className='bi bi-telephone'></i>
                                    </div>
                                    <div className='col'>
                                        <p className='m-0'>Telefono</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-1'>
                                        <i className='bi bi-envelope'></i>
                                    </div>
                                    <div className='col'>
                                        <p className='m-0'>Email</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className='row mb-2'>
                            <p className='m-0 fs-5 text-center'>Newsletter</p>
                        </div>
                        <form className='row gx-2 align-items-center'>
                            <div className='col-9'>
                                <input
                                    className='form-control'
                                    type='text'
                                    placeholder='email'
                                />
                            </div>
                            <div className='col-3'>
                                <button className='btn btn-primary'>
                                    Enviar
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className='col-md-2'>
                        <div className='row'>
                            <div className='col-12'>
                                <p className='m-0 fs-5 text-start'>Secciones</p>
                            </div>
                        </div>
                        <div className='row ps-2'>
                            <Link
                                to='/'
                                className='col-12 text-decoration-none'
                            >
                                <p className='m-0 fs-6 text-start text-dark'>
                                    Home
                                </p>
                            </Link>
                            <Link
                                to='/Shop/1'
                                className='col-12 text-decoration-none'
                            >
                                <p className='m-0 fs-6 text-start text-dark'>
                                    Mac
                                </p>
                            </Link>
                            <Link
                                to='/Shop/2'
                                className='col-12 text-decoration-none'
                            >
                                <p className='m-0 fs-6 text-start text-dark'>
                                    iPad
                                </p>
                            </Link>
                            <Link
                                to='/Shop/3'
                                className='col-12 text-decoration-none'
                            >
                                <p className='m-0 fs-6 text-start text-dark'>
                                    iPhone
                                </p>
                            </Link>
                            <Link
                                to='/Shop/4'
                                className='col-12 text-decoration-none'
                            >
                                <p className='m-0 fs-6 text-start text-dark'>
                                    Accesorios
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
