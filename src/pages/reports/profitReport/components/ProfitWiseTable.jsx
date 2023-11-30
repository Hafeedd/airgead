import React from 'react'
import searchIcon from "../../../../assets/icons/search.png";
import { GrRefresh } from "react-icons/gr";

const ProfitWiseTable = (props) => {

    const { itemWiseProfit } = props


    let totalQty = 0
    let totalSales = 0
    let totalSalesR = 0
    let totalCost = 0
    let totalProfit = 0

    return (
        <div className='mx-3 mt-3'>
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

            <div className='cashbook-table-main p-0'>
                <table className='cash-table-top mt-1'>
                    <thead>
                        <tr className='cashbook-table-thead-th p-5'>
                            <th className='ps-3'>Code</th>
                            <th>Name</th>
                            <th>Qty</th>
                            <th>Sales</th>
                            <th>Sales Return</th>
                            <th>Cost</th>
                            <th>Profit</th>
                            <th>Profit%</th>
                        </tr>
                    </thead>

                    <tbody>

                        {
                            
                            itemWiseProfit[0]?.items?.length > 0 ?
                                itemWiseProfit[0].items.map((data, i) =>
                                {
                                    let proPerc = 0
                                    proPerc = (((data?.profit)/(data?.total_cost))*100)||0.00
                                    
                                    totalQty = totalQty+(data?.quantity)
                                    totalSales = totalSales+(data?.total_sales)
                                    totalSalesR = totalSalesR+(data?.sales_return)
                                    totalCost = totalCost+(data?.total_cost)
                                    totalProfit =totalProfit+(data?.profit)
                                    return (
                                        <tr key={i} className='cashbook-table-row text-black'>
                                            <td className='ps-3'>{data?.code}</td>
                                            <td>{data?.name}</td>
                                            <td>{data?.quantity}</td>
                                            {/* <td>{data?.sales}</td> */}
                                            <td>{data?.total_sales}</td>
                                            <td>{data?.sales_return}</td>
                                            <td>{data?.total_cost.toFixed(2)}</td>
                                            <td>{data?.profit.toFixed(2)}</td>
                                            <td>{proPerc.toFixed(2) || 0 } %</td>
                                        </tr>


                                    )    
                                }
                                ) :
                                <tr>
                                    <td colSpan={8} className='text-center fs-4 text-black pe-5'>No report yet</td>
                                </tr>
                        }

                        
                        <tr className='item_profit_table-bottom'>
                        
                                <td colSpan={2} className='py-4'></td>
                                <td style={{textAlign:"start"}} className='' >{totalQty}</td>
                                <td style={{textAlign:"start"}} className='' >{totalSales}</td>
                                <td style={{textAlign:"start"}} className='' >{totalSalesR}</td>
                                <td style={{textAlign:"start"}} className='' >{totalCost}</td>
                                <td style={{textAlign:"start"}} className='' >{totalProfit}</td>
                                <td style={{textAlign:"start"}} className='' ></td>
                            
                            
                        </tr>
                    

                    </tbody>

                </table>


            </div>
        </div>
    )
}

export default ProfitWiseTable