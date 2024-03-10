import React from 'react'
import compnayIcon from '../../../assets/images/mdi_company.png'
import userIcon from '../../../assets/images/profile-company-icon.svg'

const CompanyList = () => {
    return (
        <div className='d-flex flex-column align-items-center' style={{ width: "70%", height: "fit-content" }}>
            <div className='d-flex mt-5'>
                <div className='d-flex flex-column justify-content-center mt-2'>
                    <img src={compnayIcon} alt="" />
                </div>
                <div className='p-2'>
                    <h1 className='p-0 m-0 railway-font' style={{ font: "27px" }}>Company List</h1>
                    <p className='railway-font'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. itiis dicta non is labore fugiat voluptates assumenda iste!</p>
                </div>
            </div>

            <div style={{ backgroundColor: "#F5F5F5", width: "100%" }} className='row py-3 mt-3 rounded shadow-sm railway-font'>
                <div className="col-4 d-flex justify-content-center railway-font">
                    <img src={userIcon} alt="" />
                </div>
                <div className="col-8 railway-font">
                    <p>#ID45856</p>
                    <h3 className='p-0 m-0 railway-font'>Company Name</h3>
                </div>
            </div>

            <div style={{ backgroundColor: "#F5F5F5", width: "100%" }} className='row py-3 mt-3 rounded shadow-sm'>
                <div className="col-4 d-flex justify-content-center">
                    <img src={userIcon} alt="" />
                </div>
                <div className="col-8 railway-font">
                    <p>#ID45856</p>
                    <h3 className='p-0 m-0'>Company Name</h3>
                </div>
            </div>

            <div style={{ backgroundColor: "#F5F5F5", width: "100%" }} className='row py-3 mt-3 rounded shadow-sm'>
                <div className="col-4 d-flex justify-content-center">
                    <img src={userIcon} alt="" />
                </div>
                <div className="col-8 railway-font">
                    <p>#ID45856</p>
                    <h3 className='p-0 m-0'>Company Name</h3>
                </div>
            </div>
        </div>
    )
}

export default CompanyList