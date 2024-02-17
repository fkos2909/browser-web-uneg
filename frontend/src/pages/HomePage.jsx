import React, { useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchContext } from '../context/SearchContext';
import logo from '../assets/logo.png';


export const HomePage = () => {

    const { onInputChange, valueSearch, onResetForm } = useContext(SearchContext);
    const navigate = useNavigate();
    const onSearchSumit = (e) => {
        e.preventDefault();
        navigate('/search', {
            state: valueSearch
        })
        onResetForm();
    }

    return (
        <>
            <div className='container-loader home-search'>
                <Link to='/' className='logo'>
                    <img
                        src={logo}
                        alt='Logo WebBrowser'
                    />
                </Link>

                <form onSubmit={onSearchSumit}>
                    <div className='form-group'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='icon-search'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                            />
                        </svg>
                        <input
                            type='search'
                            name='valueSearch'
                            id=''
                            value={valueSearch}
                            onChange={onInputChange}
                            placeholder='Buscar'
                        />
                    </div>
                    <div className="btn-form">
                        <button className='btn-search'>Buscar</button>
                    </div>
                </form>
            </div>
        </>
    )
}
