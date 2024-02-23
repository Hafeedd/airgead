import React from 'react'
import { GrRefresh } from "react-icons/gr";
import searchIcon from "../../../../assets/icons/search.png";
const BalanceSheetTables = (props) => {
    const { balanceSheetData } = props
    console.log(balanceSheetData)
    var total_bal=0;
    var countAsset = 0;
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
                            className="item_search_bar rounded-2 border-0 py-1"
                            placeholder="Search"
                            type="text"
                        />
                    </div>
                </div>

            </div>
            <div className='d-flex'>
                <div className='w-100' style={{ height: '31rem', overflow: 'hidden', overflowY: 'scroll' }}>

                    <table className='table table-striped border border-5 border-dark'>
                        <thead>
                            <tr className='bal-sheet-table-head '>
                                {/* <th>Sn</th> */}
                                <th>Assets</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {
                                balanceSheetData?.length > 0 &&
                                balanceSheetData?.map((data, i) => {
                                    
                                    total_bal= total_bal+data?.closing_balance
                                    
                                    countAsset = countAsset+1
                                    return data?.acc_group == "ASSET" && (
                                        <>
                                            <tr className='bg-asset-color'>
                                                {/* <td>{countAsset}</td> */}
                                                <td>{data?.account_name}</td>
                                                <td>{data?.closing_balance.toFixed(2)}</td>
                                                
                                            </tr>
                                        </>
                                    )
                                })
                            }
                            <tr className='balance-sheet-btm-field'>
                                <td colSpan={1}></td>
                                <td><span>{total_bal.toFixed(2)}</span></td>
                            </tr>

                        </tbody>
                    </table>
                </div>

                <div className='w-100' style={{ height: '31rem', overflow: 'hidden', overflowY: 'scroll' }}>


                    <table className='table table-striped border border-5 border-dark '>
                        <thead>
                            <tr className='bal-sheet-table-head mb-1'>
                                {/* <th>Sn</th> */}
                                <th>Liability</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                balanceSheetData?.length > 0 &&
                                balanceSheetData?.map((data, i) => {
                                    total_bal= total_bal+data?.closing_balance
                                    return data?.acc_group == "LIABILITY" && (
                                        <>
                                            <tr className='bg-liability-color'>
                                                {/* <td>{i}</td> */}
                                                <td>{data.account_name}</td>
                                                <td>{data.closing_balance.toFixed(2)}</td>
                                            </tr>
                                        </>
                                    )
                                })
                            }

                            <tr className='balance-sheet-btm-field'>
                                <td colSpan={1}></td>
                                <td><span>{total_bal.toFixed(2)}</span></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>

        </>

    )
}

export default BalanceSheetTables