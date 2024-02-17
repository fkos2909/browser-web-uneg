import React, { useContext, useState, useEffect } from 'react'
import { LinksList, Loader, NavigateBar } from '../components';
import { SearchContext } from '../context/SearchContext';
import { useLocation } from 'react-router-dom';

export const SearchPage = () => {

    const { getLinks, allLinks, onClickLoadMore, offset } = useContext(SearchContext);
    const [loading, setLoading] = useState(true); 
    // const [links, setLinks] = useState([]);

    const location = useLocation();

    const feacthLinks = async () => {
        
        await getLinks();
        setLoading(false);
    }

    useEffect(() => {
        feacthLinks();
    }, [offset])
    

    return (
        <>  {
            loading ? (
                <Loader />
            ) : (
                <>
                    <NavigateBar />
                    <div className="container">
                        <p className="p-search">
                            Se encontraron <span>{allLinks.length}</span> resultados:
                        </p>
                    </div>
                    <LinksList />
                    <div className="container-btn-load-more container">
                        <button className="btn-load-more" onClick={onClickLoadMore}>
                            Cargar más
                        </button>
                    </div>
                </>
            )
        }
        </>
    )
}
