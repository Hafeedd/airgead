import React from 'react'
import searchIcon from "../../../../assets/icons/search.png";
import { GrRefresh } from "react-icons/gr";
import '../cashbook.css'


const CashBookTable = (props) => {

    const { cashBookList, params} = props

    // const AdjustTableHeight = () => {
    //     let a = []
    //     for (let i = 0; i < 7 - cashBookList?.length; i++) {
    //         a.push(
    //             <tr>
    //                 <td colSpan={7}></td>
    //             </tr>
    //         )
    //     }
    // }

    return (
        <div className='table-head-scroll  mt-2 p-0'>
            {/* <div className='cash-table-head  mx-4 mt-3'> */}
                <div className='d-flex cash-table-head   justify-content-end '>
                    <div className='p-1 bg-light rounded-1 px-2'>
                        <GrRefresh size={18} />
                    </div>
                    <div className='d-flex ms-2' px-5>
                        <img src={searchIcon} className='cashbook-ser-img ms-3 mt-2' />
                        <input
                            className='cash-search-input rounded-2  ps-5'
                            placeholder='Search'
                            type="text" />
                    </div>
                </div>

                <div className='cashbook-table-main   p-0' >
                    <table className='cash-table-top   mt-1' >
                        <thead>
                            <tr className='cashbook-table-thead-th p-5  '  >
                                <th className='p-3'>Date</th>
                                <th>Doc No</th>
                                <th>Ac Name</th>
                                <th>Narration</th>
                                <th>Debit</th>
                                <th>Credit</th>
                                <th>Balance</th>
                            </tr>

                        </thead>
                        
                        <tbody >
                        
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

                                        <tr className='cashbook-table-row  '>
                                            {/* <td className='cashbook-table-row m-0 p-0 pt-3 ' colSpan={7}> */}

                                            <td  className='text-primary p-2   ' colSpan={1}>{params.from_date.split('-').reverse().join('/')}</td>
                                            <td colSpan={2}></td>
                                            <td className='text-primary '>Opening Balance</td>
                                            <td colSpan={2}></td>
                                            <td className='text-success fw-bolder ' colSpan={1}>{data?.total_opening_balance >=0? `Debit ${data?.total_opening_balance.toFixed(2)}` : `Credit ${data?.total_opening_balance.toFixed(2)}`}</td>

                                            {/* </td> */}

                                        </tr>

                                        {data.cashbook.length > 0 &&
                                            data.cashbook.map((item, i) => {
                                                const formattedBalance = parseFloat(item?.balance).toFixed(2);
                                                const debitOrCredit = item?.balance >= 0 ? ' Debit' : ' Credit';
                                                return(
                                                <tr key={i} className='cashbook-table-row text-black'>
                                                    <td className='p-2'>{item?.created_date?.slice(0,10).split('-').reverse().join('/')}</td>
                                                    <td>{item?.voucher_no}</td>
                                                    <td>{item?.account_name}</td>
                                                    <td>{item?.narration }</td>
                                                    <td>{item?.debit || ""}</td>
                                                    <td>{item?.credit || "" }</td>
                                                    <td>{formattedBalance}{debitOrCredit}</td>
                                                </tr>
                                            )})
                                        }

                                        <tr className='cashbook-table-row '>
                                            {/* <td className='cashbook-table-row m-0 p-0 pt-3 ' colSpan={7}> */}

                                            <td  className='text-primary p-2' colSpan={1}>{params.to_date.split('-').reverse().join('/')}</td>
                                            <td colSpan={2}></td>
                                            <td className='text-primary'>Closing Balance</td>
                                            <td colSpan={2}></td>
                                            <td  className={`${data?.total_closing_balance.toString().includes('-')?"text-danger":"text-success fw-bolder"}`} colSpan={1}>{data?.total_closing_balance >0? `Debit ${data?.total_closing_balance.toFixed(2)}`:`Credit ${data?.total_closing_balance.toFixed(2)}`}</td>

                                            {/* </td> */}

                                        </tr>

                                        <tr className='bg-secondary py-5 '>
                                            <td colSpan={4}></td>
                                            <td><div className='cashbook-down-box text-black p-3 d-flex align-items-center justify-content-center'><p>{data?.total_debit}</p></div></td>
                                            <td><div className='cashbook-down-box text-black p-3 d-flex align-items-center justify-content-center'>{data?.total_credit}</div></td>
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

            {/* </div> */}


        </div>
    )
}

export default CashBookTable