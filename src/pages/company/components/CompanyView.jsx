import React, { useState } from 'react'
import { MdEdit } from "react-icons/md";
import deleteBtn from "../../../assets/icons/delete.svg";
import companyProf from "../../../assets/icons/company-view-prof.jpg";
import { companyModules } from '../data/initialData';
import { VscTriangleDown } from "react-icons/vsc";

export const CompanyView = () => {
    const moduleCodeList = [101, 102, 104, 107]
    const [active, setActive] = useState(false)
    return (
        <div>
            <div className='company-edit-bar row mx-0 justify-content-between px-4 position-relative'>
                <div className='bar-text px-0 col-4 col-5'>Company Name</div>
                <div style={{ fontSize: '13px' }} className='col-3 col-4 text-end'>
                    Renewal Date & Time ; 15/12/2020 12:00 PM
                </div>
                <div style={{ fontSize: '13px' }} className='col-2 text-end'>
                    Created By: &nbsp;&nbsp; Admin 1122
                </div>
                <div className='col-1 col-2 d-flex align-items-center justify-content-end'>
                    <div className='bar-button'>
                        <MdEdit size='1.3rem' className="p-0 m-0" />
                        Edit
                    </div>
                    <img className='' src={deleteBtn} width={'4rem'} height={'20rem'} alt="delete" />
                </div>
                <div style={{ width: 'fit-content' }} className='px-0 d-flex justify-content-end'>
                    <div className="circle"></div>
                    <div className="circle animation2"></div>
                    <div className="circle animation3"></div>
                </div>
            </div>
            <div className='company-view-cont px-5 py-4'>
                <div className='p-2 px-3 px-0 company-view row mx-0 pt-4'>
                    <div className='col-4 company-view1'>
                        <div className='col-10 text-center mb-3'><img src={companyProf} alt="comp_prof" /></div>
                        <div className='row mx-0 col-12 px-0 comp-det'>
                            <div className='col-6 px-0 text-secondary'>Company Name</div>
                            <div className='col-6 px-0'>Demo Company 1</div>
                            <div className='col-6 px-0 text-secondary'>Company Name</div>
                            <div className='col-6 px-0'>Demo Company 1</div>
                            <div className='col-6 px-0 text-secondary'>Company Name</div>
                            <div className='col-6 px-0'>Demo Company 1</div>
                            <div className='col-6 px-0 text-secondary'>Company Name</div>
                            <div className='col-6 px-0'>Demo Company 1</div>
                        </div>
                    </div>
                    <div className='col-1 col-2' />
                    <div className='col-6 col-7 comp-view2 h-100'>
                        <div className='d-flex gap-4 pb-3'>
                            <div className='text-secondary'>Extension Date</div>
                            <div style={{ fontFamily: 'Raleway' }}>15/01/2022</div>
                        </div>
                        <div className='d-flex gap-4 pb-4'>
                            <div className='text-secondary'>Staff Limit</div>
                            <div style={{ fontFamily: 'Raleway' }}>5</div>
                        </div>
                        <div className='comp-view-modules bg-light p-3 px-4 rounded-2'>
                            Modules
                            <div className='d-flex gap-3 flex-wrap mt-2'>
                                {companyModules.map(data => {
                                    return moduleCodeList.findIndex(item => item === data.code) > -1 && <div
                                        className={`comp-module-item active`}>
                                        <img src={data.icon} width={'25rem'} alt='module_image' />
                                        {data.name}
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='comp-view-subs pt-3 fs-5'>
                    Subscription History
                    <div className='comp-view-table-cont pt-2'>
                        <table className='table comp-view'>
                            <thead className='main-head'>
                                <tr>
                                    <th className='rounded-top-2 rounded-end-0'>Renewal Date</th>
                                    <th>Expired Date</th>
                                    <th>Extended Count</th>
                                    <th className='rounded-top-2 rounded-start-0'></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className={`main-tr ${active && "active"}`}>
                                    <td><div className='comp-view-td rounded-start-2'>dfdsf</div></td>
                                    <td><div className='comp-view-td'>wdsdsadsad</div></td>
                                    <td><div className='comp-view-td'>wdsdsadsad</div></td>
                                    <td>
                                        <div className='comp-view-td rounded-end-2'>
                                            <VscTriangleDown onClick={() => setActive(!active)}
                                                className={`comp-view-arrow ${active ? "active" : "inactive"}`}
                                                size='1rem' />
                                        </div>
                                    </td>
                                </tr>
                                {/* {active && */} 
                                <tr className={`${active && "active"}`}>
                                    <td className='accordian-anim' colSpan={5}>

                                        <div className='px-4'>
                                            <table className='table inner-table'>
                                                <thead>
                                                    <tr>
                                                        <th>No</th>
                                                        <th>Extended Date</th>
                                                        <th>Previous Date</th>
                                                        <th>Extended By</th>
                                                        <th>Extended Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody className='inner-tbody'>
                                                    <tr>
                                                        <td><div className='comp-view-td rounded-start-2'>fdsfewrewf</div></td>
                                                        <td><div className='comp-view-td'>fdsfewrewf</div></td>
                                                        <td><div className='comp-view-td'>fdsfewrewf</div></td>
                                                        <td><div className='comp-view-td'>fdsfewrewf</div></td>
                                                        <td><div className='comp-view-td rounded-end-2'>fdsfewrewf</div></td>
                                                    </tr>
                                                    <tr>
                                                        <td><div className='comp-view-td rounded-start-2'>fdsfewrewf</div></td>
                                                        <td><div className='comp-view-td'>fdsfewrewf</div></td>
                                                        <td><div className='comp-view-td'>fdsfewrewf</div></td>
                                                        <td><div className='comp-view-td'>fdsfewrewf</div></td>
                                                        <td><div className='comp-view-td rounded-end-2'>fdsfewrewf</div></td>
                                                    </tr>
                                                    <tr>
                                                        <td><div className='comp-view-td rounded-start-2'>fdsfewrewf</div></td>
                                                        <td><div className='comp-view-td'>fdsfewrewf</div></td>
                                                        <td><div className='comp-view-td'>fdsfewrewf</div></td>
                                                        <td><div className='comp-view-td'>fdsfewrewf</div></td>
                                                        <td><div className='comp-view-td rounded-end-2'>fdsfewrewf</div></td>
                                                    </tr>
                                                    <tr>
                                                        <td><div className='comp-view-td rounded-start-2'>fdsfewrewf</div></td>
                                                        <td><div className='comp-view-td'>fdsfewrewf</div></td>
                                                        <td><div className='comp-view-td'>fdsfewrewf</div></td>
                                                        <td><div className='comp-view-td'>fdsfewrewf</div></td>
                                                        <td><div className='comp-view-td rounded-end-2'>fdsfewrewf</div></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                                {/* } */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}