import React from 'react'
import searchIcon from "../../../../assets/icons/search.png";
import { GrRefresh } from "react-icons/gr";

const BillWiseProfitTable = (props) => {

    const { billWiseProfit } = props
    return (
        <div className="row mx-0 mt-3">
            <div className="daybook-cont px-0">
                <div
                    style={{ background: "#000" }}
                    className="w-100 d-flex justify-content-end rounded-top-1"
                >
                    <div className="col-3 p-2 stock-ledger-search d-flex align-items-center">
                        <div className="col-1 me-2">
                            <GrRefresh
                                // onClick={() => setSearchedList(dayBookList)}
                                className="bg-light m-1 p-1 rounded-1"
                                size={20}
                            />
                        </div>
                        <div className="item_seach_bar_cont rounded-2 col-11 col-10">
                            <img src={searchIcon} className="search_img me-3 ms-2 py-2" />
                            <input
                                // value={search}
                                // onChange={handleSearch}
                                className="item_search_bar rounded-2 border-0 py-1"
                                placeholder="Search"
                                type="text"
                            />
                        </div>
                    </div>
                </div>
                <div className="day-book-table-cont">
                    <table className="table daybook-table bill-wise">
                        <thead>
                            <tr>
                                <th>Doc No</th>
                                <th>Party Sales</th>
                                <th>Sales</th>
                                <th>S.Return</th>
                                <th>Cost</th>
                                <th>Profit</th>
                                <th>Profit%</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                billWiseProfit[0]?.billwise_data?.length > 0 ?
                                    billWiseProfit[0].billwise_data.map((data, i) => {
                                        
                                        let profit_percentage = 0
                                        profit_percentage = (((data?.profit)/(data?.total_cost))*100)||0.00
                                        return (
                                            <tr
                                                className='cashbook-table-row text-black'>
                                                <td className='ps-3'>{data?.document_no}</td>
                                                <td>{data?.name}</td>
                                                <td>{data?.total_sales}</td>
                                                {/* <td>{data?.sales}</td> */}
                                                <td>0</td>
                                                <td>{data?.total_cost}</td>
                                                <td>{data?.profit}</td>
                                                <td>{profit_percentage.toFixed(2)}</td>

                                            </tr>
                                        )
                                    }):
                                    <tr>
                                        <td colSpan={7} className='text-center'>No report Yet</td>
                                    </tr>
                            }

                            
                                <tr className='' style={{ backgroundColor: "#CECECE" }}>
                                <td></td>
                                <td></td>
                                <td>{billWiseProfit[0]?.grand_total?.total_sales}</td>
                                <td>0</td>
                                <td>{billWiseProfit[0]?.grand_total?.total_cost}</td>
                                <td>{billWiseProfit[0]?.grand_total?.total_profit}</td>
                                <td></td>
                                </tr>
                                
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default BillWiseProfitTable
