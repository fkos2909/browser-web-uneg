import { SearchContext } from "./SearchContext"
import { useState, useEffect } from "react";
import axios from 'axios'
import { useForm } from "../hook/useForm";


export const SearchProvider = ({children}) => {
    const [allLinks, setAllLinks] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(true);

    // hook
    const { valueSearch, onInputChange, onResetForm } = useForm({
        valueSearch: ''
    })

    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }

    //Llamar al API
    const getLinks = async (line = '') => {
                
        try{
            await axios.post(
                'http://localhost:3001/api', {line: line}
            ).then(r => console.log(r.data) )
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
            await timeout(1000);
            await axios.get(
                'http://localhost:3001/api/web'
            )
            .then(r => setAllLinks(r.data) )
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
            // console.log(e);
            const el = e;
        }
        
    }

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
                getLinks,
                onClickLoadMore,
                offset
            }}
        >
            {children}
        </SearchContext.Provider>
    )
}