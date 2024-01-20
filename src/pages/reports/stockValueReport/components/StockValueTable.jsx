import React, { useEffect, useState } from 'react'

const StockValueTable = (props) => {
    const { setStockValueList, stockValueList,
        rateType, stockType } = props;

        const [searchedList, setSearchedList] = useState([])

        useEffect(()=>{
            if(stockValueList?.length>0)
                setSearchedList(stockValueList)
                stockValueType()
        },[stockValueList,stockType])
        
        const stockValueType = ()=>{
            
            let stockQty = stockValueList.filter((data) =>{

                if (stockType === "POSITIVE_STOCK" && data.stock>0){
                    // stockQty.push(data?.stock > 0 ?data : {})
                    return true
                }
                else if (stockType === "NEGATIVE_STOCK" && data?.stock < 0){
                    // stockQty.push(data?.stock < 0 ?data : {})
                    return true
                }
                else if (stockType === "ZERO_STOCK" && data?.stock == 0){
                    // stockQty.push(data?.stock === 0 ?data : {})
                    return true
                }
                // else{
                //     stockQty = searchedList
                // }
            })
            if(stockType == "ALL"){
                stockQty = stockValueList
            }
            setSearchedList(stockQty)
        }
        let total_item;
        let stock = 0;
        let array = []
        let tot_p_rate = 0;
        let mrp = 0;
        let s_rate = 0;
        let w_rate = 0;
        let cost = 0;
        let sup_w_rate = 0;
        let total_cost = 0;
        let total_p_rate = 0;
        let total_s_rate = 0;
        searchedList.map((data)=>{
            array.push(data)
            stock = stock+data.stock
            tot_p_rate = tot_p_rate+data.p_rate
            mrp = mrp + data.mrp
            s_rate = s_rate + data.ret_rate
            w_rate = w_rate + data.wholesale_rate
            cost = cost + data.cost
            sup_w_rate = sup_w_rate + data.super_wholesale_rate
            total_cost = total_cost + (data.stock + data.cost)
            total_p_rate = total_cost + (data.stock + data.p_rate)
            total_s_rate = total_cost + (data.stock + data.ret_rate)
        })
        total_item = array.length
        
    return (
        <div className='mt-4 table-head-scrolls'>
            <table className='table'>
                <thead className='stock_value_register_head'>
                    <tr className='stock-value-table-head '>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Stock</th>
                        <th>Unit</th>
                        <th>P.Rate</th>
                        <th>MRP</th>
                        <th>S.Rate</th>
                        <th>Ws.Rate</th>
                        <th>Sw.Rate</th>
                        <th>Cost</th>
                        <th>Stock Value</th>
                    </tr>
                </thead>
                <tbody>
                    {   
                        searchedList?.length > 0 ?
                            searchedList.map((data, i) => {
                               
                                return (
                                    <>
                                        <tr>
                                            <td>{data?.item_code}</td>
                                            <td style={{textAlign:"left"}} >{data?.item_name}</td>
                                            <td>{data?.stock}</td>
                                            <td>{data?.unit}</td>
                                            <td>{data?.p_rate?.toFixed(2)}</td>
                                            <td>{data?.mrp?.toFixed(2) || 0.00}</td>
                                            <td>{data?.ret_rate?.toFixed(2)}</td>
                                            <td>{data?.wholesale_rate?.toFixed(2)}</td>
                                            <td>{data?.super_wholesale_rate?.toFixed(2)}</td>
                                            <td>{data?.cost?.toFixed(2)}</td>
                                            <td>{
                                            rateType=="r_rate"?
                                            data?.(stock*data?.ret_rate).toFixed(2):
                                            rateType=="p_rate"?
                                            data?.(stock*data?.p_rate).toFixed(2):
                                            data?.stoke_value.toFixed(2)}</td>
                                        </tr>
                                    </>
                                )
                            }) :
                            <tr>
                                <td className='py-3' style={{ fontSize: "30px" }} colSpan={13}>No Reports yet</td>
                            </tr>
                            
                    }

                        <tr className='stock-value-table-bottom '>
                            <td><span>{total_item}</span></td>
                            <td></td>
                            <td><span>{stock.toFixed(2)}</span></td>
                            <td></td>
                            <td ><span>{tot_p_rate.toFixed(2)}</span></td>
                            <td><span>{mrp.toFixed(2)}</span></td>
                            <td><span>{s_rate.toFixed(2)}</span></td>
                            <td><span>{w_rate.toFixed(2)}</span></td>
                            <td><span>{sup_w_rate.toFixed(2)}</span></td>
                            <td><span>{cost.toFixed(2)}</span></td>
                            <td>
                                <span>
                                {
                                    rateType=="r_rate"?total_s_rate.toFixed(2):
                                    rateType=="p_rate"?total_p_rate.toFixed(2):
                                    total_cost.toFixed(2)
                                }
                                </span>
                            </td>
                        </tr>
                </tbody>
            </table>
        </div>
    )
}

export default StockValueTable