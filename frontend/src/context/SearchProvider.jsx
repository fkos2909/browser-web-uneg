import { SearchContext } from "./SearchContext"
import { useState } from "react";
import axios from 'axios'
import { useForm } from "../hook/useForm";


export const SearchProvider = ({children}) => {
    const [allLinks, setAllLinks] = useState([]);
    const [showLinks, setShowLinks] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(true);

    // hook
    const { valueSearch, onInputChange, onResetForm } = useForm({
        valueSearch: ''
    })

    //Llamar al API
    const getLinks = async (line = '') => {
        try{
            console.log(line);
            await axios.post(
                'http://localhost:3001/api/search', {line: line}
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
            await axios.get(
                'http://localhost:3001/api/results'
            )
            .then(r => {
                const results = r.data.slice(offset, offset+15);
                setAllLinks(r.data);
                setShowLinks([...showLinks, ...results]);
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
                getLinks,
                onClickLoadMore,
                offset
            }}
        >
            {children}
        </SearchContext.Provider>
    )
}