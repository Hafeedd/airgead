import React, { useEffect, useState } from 'react'
import PurchaseTableItemList from './PurchaseTableItemList'
import useItemServices from '../../../../services/master/itemServices'

const PurchaseTable = ({setPurchaseItemModal ,handleChange}) => {
    const [itemNameList, setItemNameList] = useState([])

    useEffect(()=>{
        getData()
    },[])

    const {getItemNameList} = useItemServices()

    const setItemNameListState = (data) => {
        let tempList = []
        data.map(item=>{
            item['value'] = item.id
            delete item.id
            item['text'] = item.name
            delete item.name
            tempList.push(item)
        })
        setItemNameList(tempList)
    }

    const getData = async () => {
        try{
            let res = await getItemNameList()
            if(res?.success) setItemNameListState(res.data)
        }catch(err){
            console.log(err)
        }
    } 

    return (
        <>
            <div className='px-2'>
                <table className='table table-secondary purchase-table mb-0'>
                    <thead className='purchase-table-header'>
                        <tr>
                            <th className='text-start' colSpan={2}>Item Name</th>
                            <th>Qty</th>
                            <th>Ut</th>
                            <th>Rate</th>
                            <th>Disc%</th>
                            <th>Disc</th>
                            <th>Value</th>
                            <th>Tax</th>
                            <th>CGST/IGST</th>
                            <th>SGST</th>
                            <th>Total</th>
                            <th>Cost</th>
                            <th>Margin%</th>
                            <th>S.Rate</th>
                            <th className='py-1 text-end'>
                                <div className='btn btn-primary purchase-add-btn my-0' onClick={()=>setPurchaseItemModal(true)}>
                                    +
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className='purchase-table-body'>
                        <tr>
                            <td className='text-start ps-3' colSpan={2}>
                                <select type='number' className='purchase_input border-0 w-100'>
                                <option value={null}>Select</option>
                                {itemNameList?.length>0&&
                                itemNameList.map((item,index)=><option key={index} value={item.value}>{item.text}</option>)}
                                </select>
                                </td>
                            <td><input type='number' className='purchase_input border-0 w-100 text-center' onChange={handleChange} name='' /></td>
                            <td><input type='number' className='purchase_input border-0 w-100 text-center' onChange={handleChange} name='' /></td>
                            <td><input type='number' className='purchase_input border-0 w-100 text-center' onChange={handleChange} name='' /></td>
                            <td><input type='number' className='purchase_input border-0 w-100 text-center' onChange={handleChange} name='' /></td>
                            <td><input type='number' className='purchase_input border-0 w-100 text-center' onChange={handleChange} name='' /></td>
                            <td><input type='number' className='purchase_input border-0 w-100 text-center' onChange={handleChange} name='' /></td>
                            <td><input type='number' className='purchase_input border-0 w-100 text-center' onChange={handleChange} name='' /></td>
                            <td><input type='number' className='purchase_input border-0 w-100 text-center' onChange={handleChange} name='' /></td>
                            <td><input type='number' className='purchase_input border-0 w-100 text-center' onChange={handleChange} name='' /></td>
                            <td><input type='number' className='purchase_input border-0 w-100 text-center' onChange={handleChange} name='' /></td>
                            <td><input type='number' className='purchase_input border-0 w-100 text-center' onChange={handleChange} name='' /></td>
                            <td><input type='number' className='purchase_input border-0 w-100 text-center' onChange={handleChange} name='' /></td>
                            <td><input type='number' className='purchase_input border-0 w-100 text-center' onChange={handleChange} name='' /></td>
                            <td><input type='number' className='purchase_input border-0 w-100 text-center' onChange={handleChange} name='' /></td>
                        </tr>
                        <tr>
                            <td className='text-start ps-3' colSpan={2}>Item Number 1</td>
                            <td>01.0</td>
                            <td>0.0</td>
                            <td>102.</td>
                            <td>10%</td>
                            <td>10%</td>
                            <td>00.0</td>
                            <td>12.0</td>
                            <td>5.0</td>
                            <td>2.0</td>
                            <td>01.0</td>
                            <td>545</td>
                            <td>540</td>
                            <td>540</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td className='text-start ps-3' colSpan={2}>Item Number 1</td>
                            <td>01.0</td>
                            <td>0.0</td>
                            <td>102.</td>
                            <td>10%</td>
                            <td>10%</td>
                            <td>00.0</td>
                            <td>12.0</td>
                            <td>5.0</td>
                            <td>2.0</td>
                            <td>01.0</td>
                            <td>545</td>
                            <td>540</td>
                            <td>540</td>
                            <td></td>
                        </tr>
                        <tr><td style={{ height: "2.5rem" }} colSpan={16}></td></tr>
                        <tr className='purchase-table-green'>
                            <td className='item2 col-1'>
                                {'<'} Previous
                            </td>
                            <td className='item3 px-3 col-1'>
                                Next {'>'}
                            </td>
                            <td className='item'>01.0</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className='item'>10%</td>
                            <td className='item'>00.0</td>
                            <td></td>
                            <td className='item'>5.0</td>
                            <td className='item'>2.0</td>
                            <td className='item'>01.0</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="purchase-detail-container px-3 py-1 mx-2 mt-1">
                <div className="col-3 col-4 row mx-0">
                    <div className="col-5 text-end">Total Item :</div>
                    <div className="col-7">03</div>
                </div>
                <div className="col-3 col-4 row mx-0">
                    <div className="col-5 text-end">Item :</div>
                    <div className="col-7">323</div>
                    <div className="col-5 text-end">HSN :</div>
                    <div className="col-7">323</div>
                </div>
                <div className="col-2 row mx-0">
                    <div className="col-5 text-end">CTC :</div>
                    <div className="col-7">0.22</div>
                </div>
                <div className="col-2 row mx-0">
                    <div className="col-5 text-end">Godown :</div>
                    <div className="col-7"></div>
                </div>
                <div className="col-1">M %</div>
            </div>
        </>
    )
}

export default PurchaseTable
