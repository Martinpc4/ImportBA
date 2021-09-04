// ! Imports
// * Libraries
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// * Types
import { ErrorInterface } from '../interfaces/ComponentsInterfaces';

// ! Error React Function Component
interface ErrorParams {
    ErrorId: string;
}
const Error: React.FC = () => {
    const { ErrorId } = useParams<ErrorParams>();

    useEffect(() => {}, [ErrorId]);

    let error: ErrorInterface = {
        id: Number(ErrorId),
        title: undefined,
        description: undefined,
    };

    if (error.id === 1) {
        error.title = 'Producto no encontrado';
        error.description = 'El codigo del producto solicitado no es valido';
    } else {
        error.title = 'Codigo de error no valido';
        error.description = undefined;
    }

    return (
        <div className='container'>
            <div className='row h-100 gy-2 align-items-center align-content-center'>
                <div className='col-12'>
                    <p className='text-center m-0 text-dark fs-3'>
                        {error.title}
                    </p>
                </div>
                <div className='col-12'>
                    <p className='text-center lead m-0 text-dark fs-5'>
                        {error.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Error;
