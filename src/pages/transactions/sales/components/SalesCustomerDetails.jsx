import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { Dropdown } from 'semantic-ui-react'
import useOnKey from '../../../../hooks/onKeyFunct/onKeyFunct'

const SalesCustomerDetails = (props) => {
    const {customerList, setCustomerList, 
        getCustomer,salesAdd ,setSalesAdd,
        getAllUserAc,billType} = props

    const [ref, setRef] = useState()
    const [careOfList, setCareOfList] = useState()

    useEffect(()=>{
        getDataOfCustomer()
    },[])

    const {handleKeyDown, formRef } = useOnKey(ref, setRef);

    const formatCustomer =  (data) =>{
        let tempList = []
        data.map(item=>{
            let a = {value:item?.id,text:item?.code,description:item?.name,
                name:item?.fk_bill_types,rate_types:item?.rate_types}
            tempList.push(a)
        })
        return tempList
    }
    const formatCareOf =  (data) =>{
        let tempList = []
        data.map(item=>{
            let a = {value:item?.code,text:item?.name,description:item?.code}
            tempList.push(a)
        })
        return tempList
    }
    
    const getDataOfCustomer = async () =>{
        try{
            const response = await getCustomer()
            const response2 = await getAllUserAc()
            if(response2.success){
                const tempList = formatCareOf([...response2.data.customer,
                    ...response2.data.supplier,...response2.data.staff])
                setCareOfList(tempList)
            }
            if(response.success){
                const tempList = formatCustomer(response.data)
                setCustomerList(tempList)
            }
        }catch(err){console.log(err)
        }
    }

    const search = (options, searchValue) => {
        searchValue = searchValue.toString().toUpperCase()
        return options.filter((option) => {return(option?.text?.toString().includes(searchValue)
            ||option.description.toString().includes(searchValue)
            ||option.value.toString().includes(searchValue)
            )
        });
      };

    const handleChange = (e,data) =>{
        if(data && data?.name == "fk_supplier"){
            let customer_data = data.options.filter(x=>x.value===data.value)[0]
            let bill_types
            if(customer_data?.name){
                bill_types = customer_data?.name
            }else{
                console.log(billType[0])
                bill_types = billType[0]?.value
            }
            setSalesAdd(data=>({...data,['customer_name']:customer_data?.description,
            ['fk_customer']:customer_data?.value,['fk_bill_type']:bill_types,
            ['rate_types']:customer_data?.rate_types}))
        }if(data && data?.name == "careof_user"){
            let careof_data = data.options.filter(x=>x.value===data.value)[0]
            setSalesAdd(data=>({...data,['careof_user']:careof_data?.value}))
        }else
        if(e.target.value === "") setSalesAdd(data=>({...data,[e.target.name]:null}))
        else setSalesAdd(data=>({...data,[e.target.name]:e.target.value}))
    }

    return (
        < div ref={formRef} className="col-8 col-9 mx-0 ps-4 pe-0 row" >
            <div className="col-7 mx-0 pe-0 row">
                <Form.Group className='col-5 mx-0 d-flex align-items-center ps-0'>
                    <Form.Label className='col-3 purchase-input-label'>Code</Form.Label>
                    <Dropdown
                    clearable
                    selection
                    required
                    search={search}
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                    className='pruchase-select d-flex align-items-center sales_customer py-0 form-control'
                    name="fk_supplier"
                    placeholder='select'
                    value={salesAdd?.fk_customer||''}
                    options={customerList}
                    />
                </Form.Group>
                <Form.Group className='col-7 mx-0 d-flex align-items-center pe-0'>
                    <Form.Label className='col-3 purchase-input-label'>Customer</Form.Label>
                    <Form.Control
                        onKeyDown={handleKeyDown}
                        onChange={handleChange}
                        className='purchase-input-text'
                        placeholder='Agencies'
                        type='text'
                        name="customer_name"
                        value={salesAdd?.customer_name||''}
                    />
                </Form.Group>
                <div className="col-12 sales-customer-container text-start row mx-0 my-1 p-0">
                    <Form.Control
                    className='sales-customer-container text-start align-items-start p-0 px-3'
                    placeholder='Address'
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                    as="textarea"
                    name="customer_address"
                    value={salesAdd?.customer_address||''}>
                    </Form.Control>
                </div>

            </div>
            {/* Row 2 -------------------------------------------------------------------------------------------------------- */}
            <div className="col-5 ps-5 mx-0 pe-2 row">
                <Form.Group className='col-12 mx-0 d-flex align-items-center px-0 mt-1'>
                    <Form.Label className='col-3 purchase-input-label'>Mobile</Form.Label>
                    <Form.Control
                        onKeyDown={handleKeyDown}
                        onChange={handleChange}
                        className='purchase-input-text mobile'
                        type='number'
                        name="customer_mobile"
                        value={salesAdd?.customer_mobile||''}

                    />
                </Form.Group>
                <Form.Group className='col-12 mx-0 d-flex align-items-center px-0 mt-1 mb-0'>
                    <Form.Label className='col-3 purchase-input-label'>GSTin</Form.Label>
                    <Form.Control
                        onKeyDown={handleKeyDown}
                        onChange={handleChange}
                        className='purchase-input-text'
                        type='text'
                        name="gst_in"
                        value={salesAdd?.gst_in||''}
                    />
                </Form.Group>
                <Form.Group className='col-12 mx-0 d-flex align-items-center px-0 mt-1 mb-0'>
                    <Form.Label className='col-3 purchase-input-label'>C/O A/C</Form.Label>
                    <Dropdown
                    clearable
                    selection
                    // scrolling
                    required
                    search={search}
                    options={careOfList}
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                    className='pruchase-select d-flex sales_customer align-items-center py-0 form-control'
                    placeholder='select'
                    name="careof_user"
                    value={salesAdd?.careof_user||''}
                    />
                </Form.Group>
                <Form.Group className='col-5 mx-0 d-flex align-items-center px-0 mt-1'>
                    <Form.Label className='col-5 purchase-input-label'>Cash/ Credit</Form.Label>
                    <div className='mx-0 col px-0'>
                        <select name='payment_type' className='customer-select w-100'
                            onKeyDown={handleKeyDown}
                            onChange={handleChange}
                            value={salesAdd?.payment_type||''}>
                            <option value="CASH">CASH</option>
                            <option value="CREDIT">CREDIT</option>
                        </select>
                    </div>
                </Form.Group>
                <Form.Group className='col-7 mx-0 d-flex align-items-center mt-1 pe-0'>
                    <Form.Label className='col-3 purchase-input-label'>Due Date</Form.Label>
                    <Form.Control
                        onKeyDown={handleKeyDown}
                        onChange={handleChange}
                        className='purchase-input-date'
                        type='date'
                        name="due_date"
                        value={salesAdd?.due_date||''}
                    />
                </Form.Group>
            </div>
        </div >
    )
}

export default SalesCustomerDetails
