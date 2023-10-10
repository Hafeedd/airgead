import React, { useCallback, useEffect, useState } from 'react'
import PurchaseTableItemList from './PurchaseTableItemList'
import useItemServices from '../../../../services/master/itemServices'
import useOnKey from '../../../../onKeyFunct/onKeyFunct'

const PurchaseTable = (props) => {
    const {setPurchaseItemModal,tableItem,
        handleChangeTableItem,setTableItem,
        setPurchaseItemSerielModal,cstm_id,
        setCstm_id,tableItemList,setTableItemList,
    } = props

    const [ref, setRef] = useState()
    const [itemNameList, setItemNameList] = useState([])
    const [unitList, setUnitList] = useState()

    useEffect(()=>{
        getData()
    },[])

    const {handleKeyDown,  formRef } = useOnKey(ref, setRef);

    const {getItemNameList,getProperty} = useItemServices()

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
        const minFunct = (data) => {
            let list = []
            data.map((x)=>{
                if(x.property_type==='unit'){
                    list.push({value:x['id'],text:x['property_value']})
                }
            })
            setUnitList(list)
        }
        try{
            let res2 = await getProperty()
            let res = await getItemNameList()
            if(res2?.success) minFunct(res2.data)
            if(res?.success) setItemNameListState(res.data)

        }catch(err){
            console.log(err)
        }
    } 

    const handleFocus = (e) =>{
        if(!tableItem[e.target.name])
            setTableItem(data=>({...data,[e.target.name]:""}))
    }
    
    const handleBlur = (e) =>{
        if(!tableItem[e.target.name] || tableItem[e.target.name] == '' || tableItem[e.target.name] == '0'){
            setTableItem(data=>({...data,[e.target.name]:0}))
        }
    }

    const handleAddBatch = (e) =>{
        if(e.type === "keydown"){
            if(e.key !== "Enter")
            return 0
        }
        let itemTemp= {...tableItem}
        let itemTempList = [...tableItemList]
        itemTemp = {...itemTemp,['cstm_id']:cstm_id}
        itemTempList.unshift(itemTemp)
        setTableItemList(itemTempList)
        setCstm_id(cstm_id+1)
        setPurchaseItemSerielModal(cstm_id)
    }

    return (
        <>
            <div className='px-2 mt-1'>
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
                            <th>Tax%</th>
                            <th>CGST/IGST%</th>
                            <th>SGST%</th>
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
                    <tbody className='purchase-table-body' ref={formRef}>
                        <tr>
                            <td className='text-start ps-3' colSpan={2}>
                                <select onKeyDown={handleKeyDown} name={'name'} onChange={handleChangeTableItem} value={(tableItem.name==''||tableItem.name)?tableItem.name:''} 
                                type='number' className='purchase_input border-0 w-100 ps-2'>
                                <option value={null}>Select</option>
                                {itemNameList?.length>0&&
                                itemNameList.map((item,index)=>
                                <option key={index} value={item.value}>{item.text}</option>)}
                                </select>
                                </td>
                            <td>
                                <input onKeyDown={handleKeyDown} name={'open_stock'} onChange={handleChangeTableItem} 
                                onFocus={handleFocus} onBlur={handleBlur} value={(tableItem.open_stock==''||tableItem.open_stock||tableItem.open_stock=='0')?tableItem.open_stock:''}
                                type='number' className='purchase_input border-0 w-100 text-center' /></td>
                            <td>
                                <select onKeyDown={handleKeyDown} name={'unit'} onChange={handleChangeTableItem} value={(tableItem.unit==''||tableItem.unit)?tableItem.unit:''} 
                                style={{"-webkit-appearance":"none",fontSize:'10px',padding:'3.5px 1px'}} 
                                className='purchase_input border-0 w-100 text-center'>
                                {/* <option value={null}>{">"}</option> */}
                                {unitList&&unitList.map((x,i)=>
                                <option key={i} value={x.value}>{x.text}</option>)}
                                </select></td>
                            <td>
                                <input onKeyDown={handleKeyDown} name={'purchase_rate'} onChange={handleChangeTableItem}
                                 value={(tableItem.purchase_rate==''||tableItem.purchase_rate)?tableItem.purchase_rate:''}
                                onFocus={handleFocus} onBlur={handleBlur} type='number' 
                                className='purchase_input border-0 w-100 text-center' /></td>
                            <td>
                                <input onKeyDown={handleKeyDown} name={'discount_1_percentage'} onChange={handleChangeTableItem}
                                 value={(tableItem.discount_1_percentage==''||tableItem.discount_1_percentage)?tableItem.discount_1_percentage:''}
                                onFocus={handleFocus} onBlur={handleBlur} type='number' 
                                className='purchase_input border-0 w-100 text-center' /></td>
                            <td>
                                <input onKeyDown={handleKeyDown} name={'discount_1_amount'} onChange={handleChangeTableItem}
                                 value={(tableItem.discount_1_amount==''||tableItem.discount_1_amount)?tableItem.discount_1_amount:''}
                                onFocus={handleFocus} onBlur={handleBlur} type='number' 
                                className='purchase_input border-0 w-100 text-center' /></td>
                            <td>
                                <input disabled onKeyDown={handleKeyDown} name={'value'} onChange={handleChangeTableItem}
                                 value={(tableItem.value==''||tableItem.value)?tableItem.value:''}
                                onFocus={handleFocus} onBlur={handleBlur} type='number' 
                                className='purchase_input border-0 w-100 text-center' /></td>
                            <td>
                                <input onKeyDown={handleKeyDown} name={'tax_gst'} onChange={handleChangeTableItem}
                                 value={(tableItem.tax_gst==''||tableItem.tax_gst)?tableItem.tax_gst:''}
                                onFocus={handleFocus} onBlur={handleBlur} type='number' 
                                className='purchase_input border-0 w-100 text-center' /></td>
                            <td>
                                <input onKeyDown={handleKeyDown} name={'cgst_or_igst'} onChange={handleChangeTableItem}
                                 value={(tableItem.cgst_or_igst==''||tableItem.cgst_or_igst)?tableItem.cgst_or_igst:''}
                                onFocus={handleFocus} onBlur={handleBlur} type='number' 
                                className='purchase_input border-0 w-100 text-center' /></td>
                            <td>
                                <input onKeyDown={handleKeyDown} name={'sgst'} onChange={handleChangeTableItem}
                                 value={(tableItem.sgst==''||tableItem.sgst)?tableItem.sgst:''}
                                onFocus={handleFocus} onBlur={handleBlur} type='number' 
                                className='purchase_input border-0 w-100 text-center' /></td>
                            <td>
                                <input onKeyDown={handleKeyDown} name={'total'} onChange={handleChangeTableItem}
                                 value={(tableItem.total==''||tableItem.total)?tableItem.total:''}
                                onFocus={handleFocus} onBlur={handleBlur} type='number' 
                                className='purchase_input border-0 w-100 text-center' /></td>
                            <td>
                                <input onKeyDown={handleKeyDown} name={'cost'} onChange={handleChangeTableItem}
                                 value={(tableItem.cost==''||tableItem.cost)?tableItem.cost:''}
                                onFocus={handleFocus} onBlur={handleBlur} type='number' 
                                className='purchase_input border-0 w-100 text-center' /></td>
                            <td>
                                <input onKeyDown={handleKeyDown} name={'margin'} onChange={handleChangeTableItem}
                                 value={(tableItem.margin==''||tableItem.margin)?tableItem.margin:''}
                                onFocus={handleFocus} onBlur={handleBlur} type='number' 
                                className='purchase_input border-0 w-100 text-center' /></td>
                            <td>
                                <input onKeyDown={handleKeyDown} name={'retail_rate'} onChange={handleChangeTableItem}
                                 value={(tableItem.retail_rate==''||tableItem.retail_rate)?tableItem.retail_rate:''}
                                onFocus={handleFocus} onBlur={handleBlur} type='number' 
                                className='purchase_input border-0 w-100 text-center' /></td>
                            <td>
                                <input onKeyDown={handleAddBatch} type='button' onClick={handleAddBatch}
                                className='table-item-add-btn' value={"+"}/>
                            </td>
                        </tr>
                        {tableItemList?.length>0&&
                        tableItemList.map(data=>(

                                <tr>
                                    <td className='text-start ps-3' colSpan={2}>
                                    <select disabled 
                                    value={data.name} 
                                    className='purchase_input border-0 w-100'>
                                    <option value={null}>Select</option>
                                    {itemNameList?.length>0&&
                                    itemNameList.map((item,index)=>
                                    <option key={index} value={item.value}>{item.text}</option>)}
                                    </select>
                                    </td>
                                    <td>
                                        {data.open_stock}</td>
                                        <td>
                                        <select value={data.unit} 
                                        style={{"-webkit-appearance":"none",fontSize:'10px',padding:'3.5px 1px'}} 
                                        className='purchase_input border-0 w-100 text-center'>
                                        {unitList&&unitList.map((x,i)=>
                                        <option key={i} value={x.value}>{x.text}</option>)}
                                        </select></td>
                                    <td>
                                        {data.purchase_rate}</td>
                                    <td>
                                        {data.discount_1_percentage}%</td>
                                    <td>
                                        {data.discount_1_amount}</td>
                                    <td>
                                        {data.value}</td>
                                    <td>
                                        {data.tax_gst}%</td>
                                    <td>
                                        {data.cgst_or_igst}%</td>
                                    <td>
                                        {data.sgst}%</td>
                                    <td>
                                        {data.total}</td>
                                    <td>
                                        {data.cost}</td>
                                    <td>
                                        {data.margin}</td>
                                    <td>
                                        {data.retail_rate}</td>
                                    <td>

                                    </td>
                                </tr>
                                ))
                            }
                        <tr><td style={{ height: "2.5rem" }} colSpan={16}></td></tr>
                        <tr className='purchase-table-green'>
                            <td className='item2 col-1'>
                                {'<'} Previous
                            </td>
                            <td className='item3 px-3 col-1'>
                                Next {'>'}
                            </td>
                            <td className='item'>01.0</td>
                            <td>

                            </td>
                            <td>

                            </td>
                            <td>

                            </td>
                            <td className='item'>10%</td>
                            <td className='item'>0''</td>
                            <td>

                            </td>
                            <td className='item'>5.0</td>
                            <td className='item'>2.0</td>
                            <td className='item'>01.0</td>
                            <td>

                            </td>
                            <td>

                            </td>
                            <td>

                            </td>
                            <td>

                            </td>
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
