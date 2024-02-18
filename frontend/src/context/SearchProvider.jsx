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
            console.log(line);
            // Initial consult by sending line to search
            await axios.post(
                'http://localhost:3001/api/search', {line: line}
            )
            .then(r => console.log(r.data) )
            .catch(function (error) {
                if (error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                // console.log(error.config);
            })
            .finally( setLoading(false) )

            // Retrieve the data found
            await axios.get(
                'http://localhost:3001/api/results'
            )
            .then(r => {
                setAllLinks(r.data);
                setShowLinks(r.data.slice(offset, offset+15));
            })
            .catch(function (error) {
                if (error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                // console.log(error.config);
            })
            .finally( setLoading(false) )

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