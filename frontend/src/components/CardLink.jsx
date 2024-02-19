import React from 'react'
import { Link } from 'react-router-dom'

export const CardLink = ({ item }) => {
    return (
        <Link to={item.url} className='card' >
            <div className="card-info">
                <span className="link-num">N°{item.num}.</span>
                <div className="title-info">
                    <h3>{item.title}</h3>
                    <h6>{item.author}</h6>
                </div>
                    
            </div>
            
        </Link>
    )
}