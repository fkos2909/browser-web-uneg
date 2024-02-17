import React from 'react'
import { Link } from 'react-router-dom'

export const CardLink = ({ item }) => {
    return (
        <Link to={item.url} className='card' >
            <div className="card-info">
                <h3>{item.title}</h3>
                <h6>autores</h6>
                <h6>fuente</h6>
            </div>
            
        </Link>
    )
}
