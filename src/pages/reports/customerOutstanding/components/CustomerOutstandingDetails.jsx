import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { BsFiletypePdf, BsWhatsapp } from 'react-icons/bs'
import { RiFileExcel2Line } from 'react-icons/ri'
import { TfiEmail, TfiPrinter } from 'react-icons/tfi'
import searchIcon from "../../../../assets/icons/search.png"
import { GrRefresh } from 'react-icons/gr'
const CustomerOutstandingDetails = (props) => {

    const { custOutstanding, setCustOutstanding,
        paramsToReport, setParamsToReport,columnVisibility } = props


    const handleChange = (e) => {
        if (e.target.value === "") {
            setParamsToReport({ ...paramsToReport, [e.target.name]: null })
        } else {
            setParamsToReport({ ...paramsToReport, [e.target.name]: e.target.value })
        }
    }



    return (
        <>
            <div className='mb-2'>
                <div style={{ background: '#4B4B4B' }}
                    className="btn rounded-1 text-light col-1 col-2 py-0 mt-3 me-4">
                    <BsFiletypePdf className="me-2 mb-1" size={18} />PDF</div>
                <div style={{ background: '#4B4B4B' }}
                    className="btn rounded-1 text-light col-1 col-2 py-0 mt-3 me-4">
                    <TfiEmail size={18} className="me-2 mb-1" />Email</div>
                <div style={{ background: '#4B4B4B' }}
                    className="btn rounded-1 text-light col-1 col-2 py-0 mt-3 me-4">
                    <RiFileExcel2Line size={18} className="me-2 mb-1" />Excel</div>
                <div style={{ background: '#4B4B4B' }}
                    className="btn rounded-1 text-light col-1 col-2 py-0 mt-3 me-4">
                    <BsWhatsapp size={18} className="me-2 mb-1" />Whatsapp</div>
                <div style={{ background: '#4B4B4B' }}
                    className="btn rounded-1 text-light col-1 col-2 py-0 mt-3">
                    <TfiPrinter size={18} className="me-2 mb-1" />Print</div>
            </div>

            <div className='d-flex justify-content-start align-items-center'>
                <Form.Group className='col-4 pe-4 ps-0 mx-0 d-flex align-items-start mt-1'>
                    <Form.Label className='col-2 purchase-input-label align-middle'>From</Form.Label>
                    <Form.Control
                        onChange={handleChange}
                        required
                        name="from_date"
                        value={paramsToReport.from_date || (new Date().toISOString.slice(0, 10))}
                        className='purchase-input-text me-2'
                        placeholder='Document number'
                        type='date'
                    />
                </Form.Group>
                <Form.Group className='col-4 pe-4 ps-0 mx-0 d-flex align-items-start mt-1'>
                    <Form.Label className='col-2 purchase-input-label align-middle'>Upto</Form.Label>
                    <Form.Control
                        onChange={handleChange}
                        required
                        name="to_date"
                        value={paramsToReport.to_date || (new Date().toISOString.slice(0, 10))}
                        className='purchase-input-text me-2'
                        placeholder='Document number'
                        type='date'
                    />
                </Form.Group>

            </div>

            <div>
                <div className="mt-3">
                    <div style={{ background: "#000" }} className="w-100 d-flex justify-content-between align-items-center">
                        <div className="mx-0 px-0 col-2 ps-3">
                            <select name="payment_type" value={paramsToReport.payment_type || ''} className="account-select-dropdown bg-light text-dark ms-0 pe-0"
                                onChange={handleChange}>
                                <option value=''>All</option>
                                <option value="to_receive">Receivable Only</option>
                                <option value="to_give">Payable Only</option>
                                <option value=''>With Balance Only</option>
                            </select>
                        </div>
                        <div className="col-3 p-2 stock-ledger-search d-flex align-items-center me-1">
                            <div className="col-1 me-2"><GrRefresh className="bg-light m-1 p-1 rounded-1" size={20} /></div>
                            <div className="item_seach_bar_cont rounded-2 col-11 col-10">
                                <img src={searchIcon} className="search_img me-3 ms-2 py-2" />
                                <input
                                    // value={search}
                                    // onChange={(e)=>setSearch(e.target.value)}
                                    className="item_search_bar rounded-2 border-0 py-1"
                                    placeholder="Search"
                                    type="text"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ height: '24rem', overflowY: 'scroll' }}>
                    <table className='col-12 px-0 mx-0 outstanding-table' style={{ background: "#000" }}>
                        <thead className='text-light' >
                            <tr>
                                {columnVisibility?.code &&<th>Code</th>}
                                {columnVisibility?.customer &&<th>Customer</th>}
                                {columnVisibility?.address &&<th>Address</th>}
                                {columnVisibility?.mobile &&<th>Mobile</th>}
                                {columnVisibility?.opbal &&<th>Op.Balance</th>}
                                {columnVisibility?.debit &&<th>Debit</th>}
                                {columnVisibility?.credit &&<th>Credit</th>}
                                {columnVisibility?.clbal &&<th>Cl.Balance</th>}
                            </tr>
                        </thead>
                        <tbody className='bg-light'>
                            {custOutstanding?.length > 0 &&
                                custOutstanding?.user_array?.map((data, i) => (
                                    <tr key={i} >
                                        {columnVisibility?.code &&<td>{data?.data1.user_code}</td>}
                                        {columnVisibility?.customer &&<td>{data?.data1.user_name}</td>}
                                        {columnVisibility?.address &&<td>{data?.data1.user_address}</td>}
                                        {columnVisibility?.mobile &&<td>{data?.data1.user_mobile}</td>}
                                        {columnVisibility?.opbal &&<td>{data?.opening_balance_new}</td>}
                                        {columnVisibility?.debit &&<td>{data?.sum_debit}</td>}
                                        {columnVisibility?.credit &&<td>{data?.sum_credit}</td>}
                                        {columnVisibility?.clbal &&<td>{data?.closing_balance}</td>}
                                    </tr>))}
                        </tbody>

                        <tfoot style={{ position: 'sticky', bottom: '0', zIndex: 4, background: "#CECECE" }}>
                            <tr>
                                {columnVisibility?.code &&<td>Cl Bal</td>}
                                {columnVisibility?.customer &&<td></td>}
                                {columnVisibility?.address &&<td></td>}
                                {columnVisibility?.mobile &&<td></td>}
                                {columnVisibility?.opbal &&<td>{custOutstanding?.total_user_debit}</td>}
                                {columnVisibility?.debit &&<td>{custOutstanding?.total_user_credit}</td>}
                                {columnVisibility?.credit &&<td>{custOutstanding?.total_opening_balance}</td>}
                                {columnVisibility?.clbal &&<td>{custOutstanding?.total_closing_balance}</td>}
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <br />
                <div className="row">
                    <div className="w-100 d-flex justify-content-end mb-3">
                        <div className="btn btn-dark col-1 col-2 py-0">Exit</div>
                    </div>
                </div>
            </div>


        </>

    )
}

export default CustomerOutstandingDetails