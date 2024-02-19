import { SearchContext } from "./SearchContext"
import { useState } from "react";
import axios from 'axios'
import { useForm } from "../hook/useForm";
import { useLocation } from 'react-router-dom';


export const SearchProvider = ({children}) => {
    const [allLinks, setAllLinks] = useState([]);
    const [showLinks, setShowLinks] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(true);

    // Hook
    const { valueSearch, onInputChange, onResetForm } = useForm({
        valueSearch: ''
    })

    //Call the API
    const getLinks = async (line = '') => {
        try{
            // Send the line to search up for
            await axios.post(
                'http://localhost:3001/api/search', {line: line}
            )
            .then(r => {
                setAllLinks(r.data);
                setShowLinks(r.data.slice(0, 15));
            })
            .catch(error => {
                if (error.response) {
                    alert('Error data: ' + error.response.data + ' Error Status: '+ error.response.status + ' Error Headers: ' + error.response.headers)
                } else if (error.request) {
                    alert('Error request: ' + error.request);
                } else {
                    alert('Error message: ', error.message);
                }
            })
            .finally( f => { setLoading(false); 
            setOffset(0); } )
        }catch(e){
            console.log(e);
        }
        
    }

    // Show 15 more links of the total results
    const onLoadMoreLinks = () =>{
        const moreLinks = allLinks.slice(offset, offset+15);
        setShowLinks([...showLinks, ...moreLinks]);
    }

    // Set the offset to show more links of the total results
    const onClickLoadMore = () => {
        setOffset(offset + 15);
    }

    return (
        <SearchContext.Provider 
            value={{
                valueSearch,
                onInputChange,
                onResetForm,
                allLinks,
                showLinks,
                offset,
                getLinks,
                onClickLoadMore,
                onLoadMoreLinks,
            }}
        >
            {children}
        </SearchContext.Provider>
    )
}