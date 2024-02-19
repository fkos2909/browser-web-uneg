import React, { useContext, useState, useEffect } from 'react'
import { LinksList, Loader, NavigateBar } from '../components';
import { SearchContext } from '../context/SearchContext';
import { useLocation } from 'react-router-dom';

export const SearchPage = () => {

    const { getLinks, setOffset, allLinks, showLinks, onClickLoadMore, offset, onLoadMoreLinks} = useContext(SearchContext);
    const [loading, setLoading] = useState(true);

    const location = useLocation();

    const feacthLinks = async () => {
        await getLinks(location.state);
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        feacthLinks();
    }, [location])

    useEffect(() => {
        onLoadMoreLinks();
    }, [offset])

    return (
        <>  
            <NavigateBar />
        {
            loading ? (
                <Loader />
            ) : (
                <>
                    <div className="container">
                        <p className="p-search">
                            Se encontraron <span>{allLinks.length}</span> resultados:
                        </p>
                    </div>
                    <LinksList />
                    {
                        showLinks.length < allLinks.length ? (
                            <div className="container-btn-load-more container">
                                <button className="btn-load-more" onClick={onClickLoadMore}>
                                    Cargar más
                                </button>
                            </div>
                        ) : (
                            <>
                            </>
                        )
                    }
                </>
            )
        }
        </>
    )
}
