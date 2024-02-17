import React, { useContext } from 'react'
import { SearchContext } from '../context/SearchContext';
import { CardLink } from './CardLink';

export const LinksList = () => {

    const { allLinks } = useContext(SearchContext);

    return (
        <>
            <div className="card-list-pokemon container">
                {allLinks.map( item => <CardLink item={item} key={item.title} />)}
            </div>
        </>
        
    )
}
