import React from 'react'
import { GrRefresh } from "react-icons/gr";
import searchIcon from "../../../assets/icons/search.png";

const GroupBalanceTable = () => {
    return (
        <>
            <div className='bg-black mt-3 d-flex justify-content-between rounded-top'>
                <div className='col-4 ms-2 d-flex justify-content-between'>
                    <div className='d-flex align-items-center'>
                        <p className='text-white mt-3'>Opening stock</p>
                        <p className='bg-secondary ms-2 px-3 py-1 rounded'>454545</p>
                    </div>

                    <div className='d-flex align-items-center'>
                        <p className='text-white mt-3'>Closing stock</p>
                        <p className='bg-secondary ms-2 px-3 py-1 rounded'>454545</p>
                    </div>
                </div>
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
            <div className='row'>
                <div className='col pe-1'>
                    <table className='table'>
                        <thead>
                            <tr className='bal-sheet-table-head'>
                                <th>A/c Name</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ backgroundColor: "lightblue", position: "sticky", top: "36px" }} className='text-start' colSpan={5}>Group Name</td>

                            </tr>
                            <tr>
                                <td>acc name 1</td>
                                <td>12000</td>
                            </tr>
                            <tr>
                                <td>acc name 2</td>
                                <td>6552</td>
                            </tr>
                            <tr>
                                <td>acc name 1</td>
                                <td>12000</td>
                            </tr>
                            <tr>
                                <td style={{ backgroundColor: "lightblue", position: "sticky", top: "36px" }} className='text-start' colSpan={5}>Group Name</td>

                            </tr>
                            <tr>
                                <td>acc name 1</td>
                                <td>12000</td>
                            </tr>
                            <tr>
                                <td>acc name 1</td>
                                <td>12000</td>
                            </tr>
                            <tr>
                                <td>acc name 1</td>
                                <td>12000</td>
                            </tr>
                            <tr>
                                <td>acc name 1</td>
                                <td>12000</td>
                            </tr>
                            <tr>
                                <td>acc name 1</td>
                                <td>12000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='col ps-1'>
                    <table className='table'>
                        <thead>
                            <tr className='bal-sheet-table-head'>
                                <th>A/c Name</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ backgroundColor: "lightblue", position: "sticky", top: "36px" }} className='text-start' colSpan={5}>Group Name</td>

                            </tr>
                            <tr>
                                <td>acc name 1</td>
                                <td>12000</td>
                            </tr>
                            <tr>
                                <td>acc name 2</td>
                                <td>6552</td>
                            </tr>
                            <tr>
                                <td>acc name 1</td>
                                <td>12000</td>
                            </tr>
                            <tr>
                                <td>acc name 2</td>
                                <td>6552</td>
                            </tr>
                            <tr>
                                <td>acc name 1</td>
                                <td>12000</td>
                            </tr>
                            <tr>
                                <td>acc name 2</td>
                                <td>6552</td>
                            </tr>
                            <tr>
                                <td style={{ backgroundColor: "lightblue", position: "sticky", top: "36px" }} className='text-start' colSpan={5}>Group Name</td>

                            </tr>
                            <tr>
                                <td>acc name 1</td>
                                <td>12000</td>
                            </tr>
                            <tr>
                                <td>acc name 2</td>
                                <td>6552</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default GroupBalanceTable