import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { HomePage, SearchPage } from './pages';

export const AppRouter = () =>{
    return <Routes>
        <Route path='/'>
            <Route index element={ <HomePage/> } />
            <Route path='search/' element={ <SearchPage/>} />
        </Route>
        
        <Route path='*' element={ <Navigate to={'/'} />} />
    </Routes>
}