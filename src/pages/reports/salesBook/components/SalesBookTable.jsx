import React from 'react'
import searchIcon from "../../../../assets/icons/search.png"
import { GrRefresh } from 'react-icons/gr'

const SalesBookTable = (props) => {
    const { salesBookList } = props
    // const AdjustTableHeight = () => {
    //     let a = []
    //     for (let i = 0; i < 7 - salesBookList?.length; i++) {
    //         a.push(
    //             <tr>
    //                 <td colSpan={13}></td>
    //             </tr>
    //         )
    //     }
    //     return a
    // }

    return (
        <div className="row mx-0 mt-3">
            <div className="daybook-cont">
                <div
                    style={{ background: "#000" }}
                    className="w-100 d-flex justify-content-end rounded-top-1"
                >
                    <div className="col-3 p-2 stock-ledger-search d-flex align-items-center">
                        <div className="col-1 me-2">
                            <GrRefresh className="bg-light m-1 p-1 rounded-1" size={20} />
                        </div>
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
                <table className="table daybook-table">
                    <thead>
                        <tr>
                            <th>Doc No</th>
                            <th>Date</th>
                            <th>Party</th>
                            <th>Gross</th>
                            <th>CGST</th>
                            <th>SGST</th>
                            <th>Cess1</th>
                            <th>Cess2</th>
                            <th>Total</th>
                            <th>Returnn</th>
                            <th>Netamt</th>
                            <th>Rcvdamt</th>
                            <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salesBookList?.length > 0 ?
                            salesBookList.map((data, i) => (

                                <tr key={i}>
                                    <td>{data?.documents_no || "..."}</td>
                                    <td>{(data.created_at).slice(0, 10) || "..."}</td>
                                    <td>{data?.fk_customer?.name || "..."}</td>
                                    <td>{data.gross || "0"}</td>
                                    <td>{data.total_cgst || "0"}</td>
                                    <td>{data.total_sgst || "0"}</td>
                                    <td>{data.total_cess1 || "0"}</td>
                                    <td>{data.total_cess2 || "0"}</td>
                                    <td>{data.total_amount || "0"}</td>
                                    <td>{data.sales_return || "0"}</td>
                                    <td>{data.net_amount || "0"}</td>
                                    <td>{data.received_amount || "0"}</td>
                                    <td>{(data.net_amount) - (data.received_amount) || "0"}</td>
                                </tr>
                                
                                )
                            ):
                            <tr>
                                <td colSpan={13} className='fs-4 text-center'> No Reports yet</td>
                            </tr>
                            }

                        
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SalesBookTable