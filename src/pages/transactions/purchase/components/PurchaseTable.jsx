import React, { useCallback, useEffect, useState } from 'react'
import PurchaseTableItemList from './PurchaseTableItemList'
import useItemServices from '../../../../services/master/itemServices'
import useOnKey from '../../../../onKeyFunct/onKeyFunct'
import { Dropdown } from 'semantic-ui-react'
import { FiEdit } from 'react-icons/fi'
import Swal from 'sweetalert2'

const PurchaseTable = (props) => {
    const {setPurchaseItemModal,tableItem,
        handleChangeTableItem,setTableItem,edit,
        setPurchaseItemSerielModal,cstm_id,purchaseAdd,
        setCstm_id,tableItemList,setTableItemList,
        tableItemBatchList, setTableItemBatchList,
        tableEdit, setTableEdit,setEdit,
        purchaseList, setPurchaseList,
        handlePurchaseAllReset,handleResetTable,
    } = props

    const [ref, setRef] = useState()
    const [itemNameList, setItemNameList] = useState([])
    const [unitList, setUnitList] = useState()

    useEffect(()=>{
        getData()
    },[])

    const {handleKeyDown,  formRef } = useOnKey(ref, setRef);

    const {getItemNameList,getProperty} = useItemServices()

    const handleTableItemEdit = (data) =>{
        if(data?.batches){
            let {batches,...others} = data
            setTableItemBatchList([...data?.batches])
            setTableItem(others)
        }
        setTableEdit(data.id)
    }

    // const setItemNameListState = (data) => {
    //     let tempList = []
    //     data.map(item=>{
    //         item['value'] = item.id
    //         delete item.id
    //         item['text'] = item.name
    //         delete item.name
    //         tempList.push(item)
    //     })
    //     setItemNameList(tempList)
    // }

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
        const handleDataNameList= (data) => {
            let tempList = []
            data?.map((x)=>{
                tempList.push({text:x.name,description:x.code,value:x.id})
            })
            setItemNameList([...tempList])
        }
        try{
            let res2 = await getProperty()
            let res = await getItemNameList()
            if(res2?.success) minFunct(res2.data)
            if(res?.success) handleDataNameList(res.data)

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

    const handleAddBatchOpen = (e) =>{
        if( !tableEdit && (!tableItem.item_name || !tableItem.quantity || !tableItem.rate)){
            Swal.fire('please enter Essential details firs',
            'Enter Rate , Quantity and Select Item First', 'warning' )
            return 0
        }
        if(!tableEdit){
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
    setPurchaseItemSerielModal(tableEdit||true)
    }

    const handlePrev = () => {
        if(!edit){
            setEdit(purchaseList[0])
        }else{
            let ind = purchaseList?.findIndex((x)=>edit.id == x.id)
            if(ind !== purchaseList?.length-1){
                setEdit(purchaseList[ind+1])
            }else{
                Swal.fire("No more purchase to edit",'go for next','warning')
            }
        }
    }
    const handleNext = () => {
        let i = purchaseList?.length -1
        if(!edit){
            Swal.fire("No more purchase to edit",'go for prev','warning')
        }else if(edit?.id == purchaseList[0].id){
            handlePurchaseAllReset()
        }else{
            let ind = purchaseList?.findIndex((x)=>edit.id == x.id)
            if(ind !== purchaseList[0]){
                setEdit(purchaseList[ind-1])
            }else{
                Swal.fire("No more purchase to edit",'go for prev','warning')
            }
        }
    }

    const AdjustHeightOfTable = () =>{
        console.log("fdsf")
        let a = []
        for(let i = 0;i<6-purchaseAdd.total_items;i++){
            a.push(<tr><td style={{ height: "",display: "" }} colSpan={17}></td></tr>)
        }
        return a
    }

    return (
        <>
            <div className='mx-2 mt-1 purchase-table-item-container px-0'>
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
                                <div className='btn btn-primary purchase-add-btn my-0'
                                onClick={()=>setPurchaseItemModal(true)}>
                                    +
                                </div>
                            </th>
                            <th className='py-1 text-end'>
                            </th>
                        </tr>
                    </thead>
                    <tbody className='purchase-table-body' ref={formRef}>
                        <tr>
                            <td className='purchase_search_drop_td text-start ps-3' colSpan={2}>
                                <Dropdown
                                clearable
                                selection
                                required
                                search
                                placeholder='SELECT'
                                className='purchase_search_drop border-0 w-100 ps-2'
                                onKeyDown={handleKeyDown} name={'name'}
                                onChange={handleChangeTableItem}
                                value={(tableItem.fk_items==''||tableItem.fk_items)?tableItem.fk_items:''} 
                                options={itemNameList}
                                />
                                </td>
                            <td>
                                <input onKeyDown={handleKeyDown} name={'quantity'} onChange={handleChangeTableItem} 
                                onFocus={handleFocus} onBlur={handleBlur} value={(tableItem.quantity==''||tableItem.quantity||tableItem.quantity=='0')?tableItem.quantity:''}
                                type='number' className='purchase_input border-0 w-100 text-center' /></td>
                            <td>
                                <select onKeyDown={handleKeyDown} name={'unit'} onChange={handleChangeTableItem} value={(tableItem.unit==''||tableItem.unit)?tableItem.unit:''} 
                                style={{"-webkit-appearance":"none",fontSize:'10px',padding:'3.5px 1px'}} 
                                className='purchase_input border-0 w-100 text-center'>
                                {unitList&&unitList.map((x,i)=>
                                <option key={i} value={x.value}>{x.text}</option>)}
                                </select></td>
                            <td>
                                <input onKeyDown={handleKeyDown} name={'rate'} onChange={handleChangeTableItem}
                                 value={(tableItem.rate==''||tableItem.rate)?tableItem.rate:''}
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
                                <input disabled onKeyDown={handleKeyDown} name={'cgst_or_igst'} onChange={handleChangeTableItem}
                                 value={(tableItem.cgst_or_igst==''||tableItem.cgst_or_igst)?tableItem.cgst_or_igst:''}
                                onFocus={handleFocus} onBlur={handleBlur} type='number' 
                                className='purchase_input border-0 w-100 text-center' /></td>
                            <td>
                                <input disabled onKeyDown={handleKeyDown} name={'sgst'} onChange={handleChangeTableItem}
                                 value={(tableItem.sgst==''||tableItem.sgst)?tableItem.sgst:''}
                                onFocus={handleFocus} onBlur={handleBlur} type='number' 
                                className='purchase_input border-0 w-100 text-center' /></td>
                            <td>
                                <input disabled onKeyDown={handleKeyDown} name={'total'} onChange={handleChangeTableItem}
                                 value={(tableItem.total==''||tableItem.total)?tableItem.total:''}
                                onFocus={handleFocus} onBlur={handleBlur} type='number' 
                                className='purchase_input border-0 w-100 text-center' /></td>
                            <td>
                                <input disabled onKeyDown={handleKeyDown} name={'cost'} onChange={handleChangeTableItem}
                                 value={(tableItem.cost==''||tableItem.cost)?tableItem.cost:''}
                                onFocus={handleFocus} onBlur={handleBlur} type='number' 
                                className='purchase_input border-0 w-100 text-center' /></td>
                            <td>
                                <input onKeyDown={handleKeyDown} name={'margin'} onChange={handleChangeTableItem}
                                 value={(tableItem.margin==''||tableItem.margin)?tableItem.margin:''}
                                onFocus={handleFocus} onBlur={handleBlur} type='number' 
                                className='purchase_input border-0 w-100 text-center' /></td>
                            <td>
                                <input onKeyDown={handleKeyDown} name={'sale_rate'} onChange={handleChangeTableItem}
                                 value={(tableItem.sale_rate==''||tableItem.sale_rate)?tableItem.sale_rate:''}
                                onFocus={handleFocus} onBlur={handleBlur} type='number' 
                                className='purchase_input border-0 w-100 text-center' /></td>
                            <td>
                                {tableEdit?
                                <div onClick={handleAddBatchOpen}
                                className='text-center'>
                                    <FiEdit className='mb-1 btn p-0' size={"16px"}/>
                                </div>:
                                <input onKeyDown={handleAddBatchOpen} type='button' onClick={handleAddBatchOpen}
                                className='table-item-add-btn' value={"+"}/>}
                            </td>
                            <td className='p-0 text-start'>
                                {tableEdit&&
                                <input type='button' 
                                onClick={()=>{setTableEdit(false);handleResetTable()}}
                                className='table-item-add-btn2 text-start' value={"+"}/>}
                            </td>
                        </tr>
                        {tableItemList?.length>0&&
                        tableItemList.map(data=>(

                                <tr>
                                    <td className='text-start ps-3' colSpan={2}>
                                        <select disabled
                                            value={data.fk_items}
                                            className='purchase_input border-0 w-100'>
                                            <option value={null}>Select</option>
                                            {itemNameList?.length>0&&
                                            itemNameList.map((item,index)=>
                                            <option key={index} value={item.value}>{item.text}</option>)}
                                        </select>
                                    </td>
                                    <td>
                                        {data.quantity}
                                    </td>
                                    <td>
                                            <select value={data.unit} 
                                                style={{"-webkit-appearance":"none",fontSize:'10px',padding:'3.5px 1px'}} 
                                                className='purchase_input border-0 w-100 text-center'>
                                                {unitList&&unitList.map((x,i)=>
                                                <option key={i} value={x.value}>{x.text}</option>)}
                                            </select></td>
                                    <td>
                                        {data.rate}</td>
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
                                        {data.sale_rate}</td>
                                    <td>
                                        <div onClick={()=>handleTableItemEdit(data)} 
                                        className='text-center'>
                                            <FiEdit className='mb-1 btn p-0' size={"16px"}/>
                                        </div>
                                    </td>
                                    <td className=''>
                                    </td>
                                </tr>
                                ))
                            }
                        {
                            <AdjustHeightOfTable/>
                        }
                        <tr className='purchase-table-green'>
                            <td className='item2 col-1'>
                            <div className='btn bg-none outline-none text-light border-none' onClick={handlePrev}>{'<'} Previous</div>
                            </td>
                            <td className='item3 px-3 col-1'>
                                <div className='btn bg-none outline-none text-light border-none' onClick={handleNext}>Next {'>'}</div>
                            </td>
                            <td className='item'><div className='purch-green-table-item'>{purchaseAdd.total_qty||0}</div></td>
                            <td>

                            </td>
                            <td>

                            </td>
                            <td>

                            </td>
                            <td className='item'><div className='purch-green-table-item'>{purchaseAdd.total_disc||0}%</div></td>
                            <td className='item'><div className='purch-green-table-item'>{purchaseAdd.total_value||0}</div></td>
                            <td>

                            </td>
                            <td className='item'><div className='purch-green-table-item'>{purchaseAdd.total_scGst||0}%</div></td>
                            <td className='item'><div className='purch-green-table-item'>{purchaseAdd.total_scGst||0}%</div></td>
                            <td className='item'><div className='purch-green-table-item'>{purchaseAdd.total_total||0}</div></td>
                            <td>

                            </td>
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
            <div className="purchase-detail-container px-3 py-0 mx-2 mt-1">
                <div className="col-3 col-4 row mx-0">
                    <div className="col-5 text-end">Total Item :</div>
                    <div className="col-7">{purchaseAdd.total_items || 0}</div>
                </div>
                <div className="col-3 col-4 row mx-0">
                    <div className="col-5 text-end">Item :</div>
                    <div className="col-7">{purchaseAdd.total_qty || 0}</div>
                    <div className="col-5 text-end">HSN :</div>
                    <div className="col-7">323</div>
                </div>
                <div className="col-2 row mx-0">
                    <div className="col-5 text-end">CTC :</div>
                    <div className="col-7">{purchaseAdd.total_CTC || 0}</div>
                </div>
                <div className="col-2 row mx-0">
                    <div className="col-5 text-end">Godown :</div>
                    <div className="col-7"></div>
                </div>
                <div className="col-1">M : {purchaseAdd.total_margin || 0 }%</div>
            </div>
        </>
    )
}

export default PurchaseTable
