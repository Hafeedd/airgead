import React, { useState } from 'react'
import { Dropdown } from 'semantic-ui-react';
import useOnKey from '../../../../onKeyFunct/onKeyFunct';
import { FiEdit } from 'react-icons/fi'
import { BsTrashFill } from 'react-icons/bs'

const SalesTable = (props) => {
    const {tableItem,setSalesItemModal,
        setSalesBatchShow,setTableEdit,
        setTableItem,tableEdit,} = props
    const [ref, setRef] = useState(null)
    const search = () =>{}
    
    const {formRef , handleKeyDown} = useOnKey(ref, setRef)
    const handleChangeTableItem = () =>{}
    let itemNameList

    const handleFocus = (e) =>{
        // if(!tableItem?[e.target.name])
        //     setTableItem(data=>({...data,[e.target.name]:""}))
    }
    
    const handleBlur = (e) =>{
        // if(!tableItem?[e.target.name] || tableItem?[e.target.name] == '' || tableItem?[e.target.name] == '0'){
        //     setTableItem(data=>({...data,[e.target.name]:0}))
        // }
    }

    const handleAddBatchOpen = () =>{
        setSalesBatchShow(true)
    }
    const handleResetTable = () =>{}

    let unitList

    const AdjustHeightOfTable = () =>{
        let a = []
        for(let i = 0;i<7||0;i++){
            a.push(<tr><td style={{ height: "",display: "" }} colSpan={17}></td></tr>)
        }
        return a
    }

    return (
        <>
            <div className='px-2'>
                <table ref={formRef} className='table table-secondary purchase-table mb-0'>
                    <thead className='purchase-table-header'>
                        <tr>
                            <th className='text-start' width="200">Item Name</th>
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
                                <div className='btn btn-primary purchase-add-btn my-0' onClick={() => setSalesItemModal(true)}>
                                    +
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className='purchase-table-body'>
                        {/* <tr>
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
                        </tr> */}
                        <tr>
                         <td className='purchase_search_drop_td text-start ps-3'>
                                <Dropdown
                                clearable
                                selection
                                required
                                search={search}
                                placeholder='SELECT'
                                className='purchase_search_drop border-0 w-100 ps-2'
                                onKeyDown={handleKeyDown} name={'name'}
                                onChange={handleChangeTableItem}
                                value={(tableItem?.fk_items==''||tableItem?.fk_items)?tableItem?.fk_items:''} 
                                options={itemNameList}
                                />
                                </td>
                            <td>
                                <input onKeyDown={handleKeyDown} name={'quantity'} onChange={handleChangeTableItem} 
                                onFocus={handleFocus} onBlur={handleBlur} value={(tableItem?.quantity==''||tableItem?.quantity||tableItem?.quantity=='0')?tableItem?.quantity:''}
                                type='number' className='purchase_input border-0 w-100 text-center' /></td>
                            <td>
                                <select onKeyDown={handleKeyDown} name={'unit'} onChange={handleChangeTableItem} value={(tableItem?.unit==''||tableItem?.unit)?tableItem?.unit:''} 
                                style={{"-webkit-appearance":"none",fontSize:'10px',padding:'3.5px 1px'}} 
                                className='purchase_input border-0 w-100 text-center'>
                                {unitList&&unitList.map((x,i)=>
                                <option key={i} value={x.value}>{x.text}</option>)}
                                </select></td>
                            <td>
                                <input onKeyDown={handleKeyDown} name={'rate'} onChange={handleChangeTableItem}
                                 value={(tableItem?.rate==''||tableItem?.rate)?tableItem?.rate:''}
                                onFocus={handleFocus} onBlur={handleBlur} type='number' 
                                className='purchase_input border-0 w-100 text-center' /></td>
                            <td>
                                <input onKeyDown={handleKeyDown} name={'discount_1_percentage'} onChange={handleChangeTableItem}
                                 value={(tableItem?.discount_1_percentage==''||tableItem?.discount_1_percentage)?tableItem?.discount_1_percentage:''}
                                onFocus={handleFocus} onBlur={handleBlur} type='number' 
                                className='purchase_input border-0 w-100 text-center' /></td>
                            <td>
                                <input onKeyDown={handleKeyDown} name={'discount_1_amount'} onChange={handleChangeTableItem}
                                 value={(tableItem?.discount_1_amount==''||tableItem?.discount_1_amount)?tableItem?.discount_1_amount:''}
                                onFocus={handleFocus} onBlur={handleBlur} type='number' 
                                className='purchase_input border-0 w-100 text-center' /></td>
                            <td>
                                <input disabled onKeyDown={handleKeyDown} name={'value'} onChange={handleChangeTableItem}
                                 value={(tableItem?.value==''||tableItem?.value)?tableItem?.value:''}
                                onFocus={handleFocus} onBlur={handleBlur} type='number' 
                                className='purchase_input border-0 w-100 text-center' /></td>
                            <td>
                                <input onKeyDown={handleKeyDown} name={'tax_gst'} onChange={handleChangeTableItem}
                                 value={(tableItem?.tax_gst==''||tableItem?.tax_gst)?tableItem?.tax_gst:''}
                                onFocus={handleFocus} onBlur={handleBlur} type='number' 
                                className='purchase_input border-0 w-100 text-center' /></td>
                            <td>
                                <input disabled onKeyDown={handleKeyDown} name={'cgst_or_igst'} onChange={handleChangeTableItem}
                                 value={(tableItem?.cgst_or_igst==''||tableItem?.cgst_or_igst)?tableItem?.cgst_or_igst:''}
                                onFocus={handleFocus} onBlur={handleBlur} type='number' 
                                className='purchase_input border-0 w-100 text-center' /></td>
                            <td>
                                <input disabled onKeyDown={handleKeyDown} name={'sgst'} onChange={handleChangeTableItem}
                                 value={(tableItem?.sgst==''||tableItem?.sgst)?tableItem?.sgst:''}
                                onFocus={handleFocus} onBlur={handleBlur} type='number' 
                                className='purchase_input border-0 w-100 text-center' /></td>
                            <td>
                                <input disabled onKeyDown={handleKeyDown} name={'total'} onChange={handleChangeTableItem}
                                 value={(tableItem?.total==''||tableItem?.total)?tableItem?.total:''}
                                onFocus={handleFocus} onBlur={handleBlur} type='number' 
                                className='purchase_input border-0 w-100 text-center' /></td>
                            <td>
                                <input disabled onKeyDown={handleKeyDown} name={'cost'} onChange={handleChangeTableItem}
                                 value={(tableItem?.cost==''||tableItem?.cost)?tableItem?.cost:''}
                                onFocus={handleFocus} onBlur={handleBlur} type='number' 
                                className='purchase_input border-0 w-100 text-center' /></td>
                            <td>
                                <input onKeyDown={handleKeyDown} name={'margin'} onChange={handleChangeTableItem}
                                 value={(tableItem?.margin==''||tableItem?.margin)?tableItem?.margin:''}
                                onFocus={handleFocus} onBlur={handleBlur} type='number' 
                                className='purchase_input border-0 w-100 text-center' /></td>
                            <td>
                                <input onKeyDown={handleKeyDown} name={'sales_rate'} onChange={handleChangeTableItem}
                                 value={(tableItem?.sales_rate==''||tableItem?.sales_rate)?tableItem?.sales_rate:''}
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
                        <AdjustHeightOfTable/>
                    </tbody>
                </table>
            </div>
            <div className="sales-detail-container mx-2 mt-1">
                <div className="col-2 col-3 mx-0 item">
                    <div className="col-4">Total Item</div>
                    <div className="col-1">:</div>
                    <div className="col-7">03</div>
                </div>
                <div className="col-1 col-2 mx-0 item">
                    <div className="col-4">PR</div>
                    <div className="col-1">:</div>
                    <div className="col-7">323</div>
                </div>
                <div className="col-1 col-2 mx-0 item">
                    <div className="col-4">CT</div>
                    <div className="col-1">:</div>
                    <div className="col-7">234.1</div>
                </div>
                <div className="col-1 col-2 mx-0 item">
                    <div className="col-4">MIN</div>
                    <div className="col-1">:</div>
                    <div className="col-7">0</div>
                </div>
                <div className="col-1 col-2 mx-0 item">
                    <div className="col-4">SR</div>
                    <div className="col-1">:</div>
                    <div className="col-7">500</div>
                </div>
                <div className="col-2 mx-0 item">
                    <div className="col-4">MRP</div>
                    <div className="col-1">:</div>
                    <div className="col-7">600</div>
                </div>
                <div className="col-1 col-2 mx-0 item">
                    <div className="col-4">IM</div>
                    <div className="col-1">:</div>
                    <div className="col-7">.00</div>
                </div>
            </div>
        </>
    )
}

export default SalesTable
