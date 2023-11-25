import React from 'react'
import searchIcon from "../../../../assets/icons/search.png";
import { GrRefresh } from "react-icons/gr";
import '../cashbook.css'


const CashBookTable = (props) => {

    const { cashBookList } = props

    const AdjustTableHeight = () => {
        let a = []
        for (let i = 0; i < 7 - cashBookList?.length; i++) {
            a.push(
                <tr>
                    <td colSpan={7}></td>
                </tr>
            )
        }
    }

    return (
        <div>
            <div className='cash-table-head  mx-4 mt-3'>
                <div className='d-flex  justify-content-end me-5'>
                    <div className='p-1 bg-light rounded-1 px-2 mt-2 '>
                        <GrRefresh className='  ' />
                    </div>
                    <div className='d-flex ms-2' px-5>
                        <img src={searchIcon} className='cashbook-ser-img ms-3  mt-3' />
                        <input
                            className='cash-search-input rounded-2 mt-2  ps-5'
                            placeholder='Search'
                            type="text" />
                    </div>
                </div>

                <div className='p-0'>
                    <table className='cash-table-top mt-1' >
                        <thead >
                            <tr  >
                                <th>Date</th>
                                <th>Doc No</th>
                                <th>Ac Name</th>
                                <th>Narration</th>
                                <th>Debit</th>
                                <th>Credit</th>
                                <th>Balance</th>
                            </tr>

                        </thead>
                        <tbody>
                            {
                                cashBookList?.length > 0 ?
                                    cashBookList.map((data, i) =>
                                    (<>
                                        <tr >
                                            <td className='m-0 p-0' colSpan={7}>

                                                <div className='cashbook-table-bottom m-0 p-4 '>
                                                    <p style={{ textAlign: 'start' }} className=''>Ledger Name : CASH IN HAND </p>
                                                </div>


                                            </td>
                                        </tr>

                                        <tr className='cashbook-table-row '>
                                            {/* <td className='cashbook-table-row m-0 p-0 pt-3 ' colSpan={7}> */}

                                            <td style={{ textAlign: 'center' }} className='text-black  ' colSpan={1}>24/11/2023</td>
                                            <td colSpan={2}></td>
                                            <td className='text-black '>Closing Balance</td>
                                            <td colSpan={2}></td>
                                            <td style={{ textAlign: 'center' }} className='text-black  ' colSpan={1}>100056</td>

                                            {/* </td> */}

                                        </tr>

                                        {data.cashbook.length > 0 &&
                                            data.cashbook.map((item, i) => {
                                                // let date = 
                                                return(
                                                <tr key={i} className='cashbook-table-row text-black'>
                                                    <td>{item?.created_date?.slice(0,10).split('-').reverse().join('/')}</td>
                                                    <td>{item?.voucher_no}</td>
                                                    <td>Ac Name</td>
                                                    <td>Narration</td>
                                                    <td>Debit</td>
                                                    <td>Credit</td>
                                                    <td>Balance</td>
                                                </tr>
                                            )})
                                        }

                                        <tr className='cashbook-table-row '>
                                            {/* <td className='cashbook-table-row m-0 p-0 pt-3 ' colSpan={7}> */}

                                            <td style={{ textAlign: 'center' }} className='text-black  ' colSpan={1}>24/11/2023</td>
                                            <td colSpan={2}></td>
                                            <td className='text-black '>Closing Balance</td>
                                            <td colSpan={2}></td>
                                            <td style={{ textAlign: 'center' }} className='text-black  ' colSpan={1}>100056</td>

                                            {/* </td> */}

                                        </tr>

                                        <tr className='bg-secondary py-5 '>
                                            <td colSpan={4}></td>
                                            <td><div className='cashbook-down-box p-3 ps-1'></div></td>
                                            <td><div className='cashbook-down-box p-3'></div></td>
                                            <td></td>

                                        </tr></>)
                                    ) :
                                    <tr>
                                        <td colSpan={7} className='text-center fs-4 text-black'>No report yet</td>
                                    </tr>

                            }



                            {/* <tr>
                                <td colSpan={7}>
                                    <CashBookAccordion/>
                                </td>
                            </tr> */}



                        </tbody>
                    </table>
                </div>

            </div>


        </div>
    )
}

export default CashBookTable