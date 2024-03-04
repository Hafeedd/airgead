import React, { useState } from 'react'
import { GrRefresh } from "react-icons/gr";
import searchIcon from "../../../../assets/icons/search.png";
import { Sticky } from 'semantic-ui-react';

const GroupTrialBalTable = (props) => {
    const { groupTrialBal } = props

    console.log(groupTrialBal)
    // const [dataList,setDataList] = useState([])
    var diff_amount = 0;
    var all_acc_debit_total = 0
    var all_acc_credit_total = 0
    return (
        <>
            <div className='bg-black mt-3 d-flex justify-content-end rounded-top'>
                <div className="col-3 p-2 stock-ledger-search d-flex align-items-center">
                    <div className="col-1 me-2">
                        <GrRefresh className="bg-light m-1 p-1 rounded-1" size={20} />
                    </div>
                    <div className="item_seach_bar_cont rounded-2 col-11 col-10">
                        <img src={searchIcon} className="search_img me-3 ms-2 py-2" />
                        <input
                            // onChange={handleSearch}
                            className="item_search_bar rounded-2 border-0 py-1"
                            placeholder="Search"
                            type="text"
                        />
                    </div>
                </div>
            </div>

            <div style={{ height: '34rem', overflow: 'hidden', overflowY: 'scroll' }}>
                <table className='table table-hover'>
                    <thead>
                        <tr style={{zIndex:"1000"}} className='trial-bal-table-head'>
                            <td>Sn</td>
                            <td>Acc Code</td>
                            <td>Acc Name</td>
                            <td className='text-center p-0'>Debit</td>
                            <td className='text-center p-0'>Credit</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            groupTrialBal?.ser?.length > 0 ?
                            groupTrialBal?.ser.map((data, i) => {
                                    console.log(data)
                                    var total_debit = 0;
                                    var total_credit = 0;
                                    
                                    return (data?.account?.length>0) && (
                                        <>
                                            <tr style={{boxShadow:"0px 0px 10px black"}}>
                                                <td style={{ backgroundColor: "rgb(106, 60, 78)" , position: "sticky", top: "36px" }} className='text-start text-white' colSpan={5}>{data?.name || ""}</td>
                                            </tr>


                                            {
                                                data.account?.length > 0 ?
                                                    data.account.map((acc, i) => {
                                                        total_debit = total_debit + (acc?.closing_balance > 0 ? acc?.closing_balance:0.0)
                                                        total_credit = total_credit + (acc?.closing_balance < 0 ? acc?.closing_balance:0.0)
                                                        all_acc_credit_total = all_acc_credit_total + (acc?.closing_balance < 0 ? acc?.closing_balance:0.0)
                                                        all_acc_debit_total = all_acc_debit_total + (acc?.closing_balance > 0 ? acc?.closing_balance:0.0)
                                                        return (
                                                            <>
                                                                <tr className='group-trial-table-td'>
                                                                    <td>{i + 1}</td>
                                                                    <td className='text-start'>{acc?.code}</td>
                                                                    <td className='text-start'>{acc?.name}</td>
                                                                    <td className='text-success text-center'>{acc?.closing_balance > 0 ? acc?.closing_balance.toFixed(2) : ""}</td>
                                                                    <td className='text-danger text-center'>{acc?.closing_balance < 0 ? acc?.closing_balance.toFixed(2) : ""}</td>

                                                                </tr>

                                                            </>
                                                        )
                                                    }) :
                                                    <tr>
                                                        <td>no data</td>
                                                    </tr>

                                            }
                                            <tr className='gp-trial-bal-gp-total'>
                                                <td >

                                                    <div className={`${data?.total_closing_balance?.toString().includes("-") ? "bg-white text-danger text-center  py-1 rounded font-weight-bold" : "bg-white text-success text-bold font-weight-bold  py-1 text-center rounded"}`}>
                                                        <span>{data?.total_closing_balance?.toFixed(2)>0? `${Math.abs(data?.total_closing_balance?.toFixed(2))} Debit`: `${Math.abs(data?.total_closing_balance?.toFixed(2))} ,Credit`} </span>
                                                    </div>
                                                </td>
                                                <td  className='p-0' colSpan={2}></td>
                                                <td><div style={{width:"90%"}} className=' bg-white text-center rounded py-1 '>{total_debit.toFixed(2)} Debit</div></td>
                                                <td><div style={{width:"80%"}} className=' bg-white text-center rounded py-1'>{Math.abs(total_credit.toFixed(2))} Credit</div></td>
                                            </tr>
                                            
                                            <tr>
                                                <td className='' colSpan={5}></td>
                                            </tr>
                                        </>
                                    )
                                }
                                ) :
                                <tr>
                                    <td colSpan={5}>No Data</td>
                                </tr>
                        }
                        <tr className='group-trial-bt-row'>
                            <td className='text-end' colSpan={3}>
                                <p className={`${all_acc_debit_total-Math.abs(all_acc_credit_total)?.toString().includes("-")?"bg-danger text-white w-50 text-center rounded py-2 ms-3":"bg-success w-50 text-center rounded py-2 ms-3"}`}>
                                    Difference Amount: {all_acc_debit_total-Math.abs(all_acc_credit_total)>0?`${Math.abs(all_acc_debit_total-Math.abs(all_acc_credit_total)).toFixed(2)} Debit` : `${Math.abs(all_acc_debit_total-Math.abs(all_acc_credit_total)).toFixed(2)} Credit`}
                                    </p>
                            </td>
                            <td><p className='bg-success py-2 text-white rounded'>{all_acc_debit_total.toFixed(2)} Debit</p></td>
                            <td><p className='bg-danger py-2 text-white rounded'>{all_acc_credit_total.toFixed(2)} Credit</p></td>
                        </tr>
                    </tbody>    
                </table>
            </div>
        </>
    )
}

export default GroupTrialBalTable