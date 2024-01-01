import React, { useEffect, useState } from 'react'

const StockValueTable = (props) => {
    const { setStockValueList, stockValueList,
        rateType } = props;

        const [searchedList, setSearchedList] = useState([])

        useEffect(()=>{
            if(stockValueList?.length>0)
                setSearchedList(stockValueList)
        },[stockValueList])

   
    return (
        <div className='mt-4'>
            <table className='table'>
                <thead>
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
                                            <td>{data?.p_rate}</td>
                                            <td>{data?.mrp}</td>
                                            <td>{data?.ret_rate}</td>
                                            <td>{data?.wholesale_rate}</td>
                                            <td>{data?.super_wholesale_rate}</td>
                                            <td>{data?.cost}</td>
                                            <td>{
                                            rateType=="r_rate"?
                                            data?.stock*data?.ret_rate:
                                            rateType=="p_rate"?
                                            data?.stock*data?.p_rate:
                                            data?.stoke_value.toFixed(2)}</td>
                                        </tr>
                                    </>
                                )
                            }) :
                            <tr>
                                <td className='py-3' style={{ fontSize: "30px" }} colSpan={13}>No Reports yet</td>
                            </tr>
                            
                    }

                    <tr className='stock-value-table-bottom'>
                        <td>1</td>
                        <td></td>
                        <td>2</td>
                        <td colSpan={7}>2</td>
                        <td>2</td>
                    
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default StockValueTable