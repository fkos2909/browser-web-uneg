import React, { useContext } from 'react'
import { SearchContext } from '../context/SearchContext';
import { CardLink } from './CardLink';

export const LinksList = () => {

    // const { allLinks } = useContext(SearchContext);
    const { showLinks } = useContext(SearchContext);

    return (
        <>
            <div className="card-list container">
                {showLinks.map( item => <CardLink item={item} key={item.id} />)}
            </div>
        </>
        
    )
}
