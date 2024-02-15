import React from 'react'
import { GrRefresh } from "react-icons/gr";
import searchIcon from "../../../../assets/icons/search.png";

const BalanceSheetTables = (props) => {
    const {balanceSheetData} = props

    
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
                <table className='table border border-5 border-dark'>
                    <thead>
                        <tr className='bal-sheet-table-head'>
                            <th>Sn</th>
                            <th>Assets</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>account one</td>
                            <td>15051</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>account one</td>
                            <td>15051</td>
                        </tr>
                    </tbody>
                </table>

                <table className='table border border-5 border-dark '>
                    <thead>
                        <tr className='bal-sheet-table-head'>
                            <th>Sn</th>
                            <th>Assets</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>account one</td>
                            <td>15051</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>account one</td>
                            <td>15051</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </>

    )
}

export default BalanceSheetTables