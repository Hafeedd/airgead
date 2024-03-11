import React from 'react'
import { useLocation } from 'react-router'
import { CompanyList } from './components/CompanyList'
import './companyMain.css'

export const CompanyMain = () =>{
    const location = useLocation()

    return (
        <div className='m-5 company-cont'>
            {location.pathname === "/company-list"&& <CompanyList/>}
        </div>
    )
}