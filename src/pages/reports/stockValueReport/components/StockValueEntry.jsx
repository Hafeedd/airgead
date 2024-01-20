import React, { useEffect, useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import { Form } from 'react-bootstrap';
import useItemServices from '../../../../services/master/itemServices'


const StockValueEntry = (props) => {

    const { params, setParams, selectionChange,
        rateType, setRateType, stockType, setStockType } = props
    const { getProperty } = useItemServices()

    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [company, setCompany] = useState([])
    const [color, setColor] = useState([])
    const [size, setSize] = useState([])
    const [godown, setGodown] = useState([])
    const [date, setDate] = useState([])

    const handleChange = (e, data) => {
        console.log(e.target.value)

        if (data) {
            if (e.target.value === "") {
                setParams({ ...params, [data?.name]: null })
            } else {
                setParams({ ...params, [data?.name]: data?.value })
            }
        }
        else if (e.target.value !== "") {
            console.log(e.target.name)
            setParams({ ...params, [e.target.name]: e.target.value })
        }else
            setParams({ ...params, [e.target.name]: null })
         
        // if (e.target.value === "ALL") {
        //     console.log(e.target.value)
        // }
    }



    const getDropDownData = async () => {
        const response = await getProperty()
        let tempCategory = []
        let tempSubCategory = []
        let tempCompany = []
        let tempColor = []
        let tempSize = []
        let tempGodown = []
        let tempDate = []

        if (response?.success) {
            response.data.map(item => {
                let a, b, c, d, e, f, g;
                if (item.property_type == "category") {
                    a = { value: item.property_value, text: item.property_value }
                    tempCategory.push(a)
                }
                else if (item.property_type == "sub_category") {
                    b = { value: item.property_value, text: item.property_value }
                    tempSubCategory.push(b)
                }
                else if (item.property_type == "company") {
                    c = { value: item.property_value, text: item.property_value }
                    tempCompany.push(c)
                }
                else if (item.property_type == "color") {
                    d = { value: item.property_value, text: item.property_value }
                    tempColor.push(d)
                }
                else if (item.property_type == "size") {
                    e = { value: item.property_value, text: item.property_value }
                    tempSize.push(e)
                }
                else if (item.property_type == "rack") {
                    f = { value: item.property_value, text: item.property_value }
                    tempGodown.push(f)
                }
            })
            setCategories(tempCategory)
            setSubCategories(tempSubCategory)
            setCompany(tempCompany)
            setColor(tempColor)
            setSize(tempSize)
            setGodown(tempGodown)
            setDate(tempDate)
        }
        return response.data
    }
    useEffect(() => {
        getDropDownData()
    }, [])

    return (
        <div>
            <p className='stock-value-heading'>Branch Transfer</p>
            <div className='row'>
                <div className='col-1 ps-3'>Category</div>
                <div className='col-3'>
                    <Dropdown
                        name='category'
                        selection
                        clearable
                        className='cheque-reg-select item d-flex align-items-center py-0 form-control text-black'
                        placeholder="Select"
                        options={categories}
                        onChange={handleChange}
                        value={params?.category || ""}

                    >
                    </Dropdown>
                </div>
                <div className='col-1 ps-5'>Color</div>
                <div className='col-3'>
                    <Dropdown
                        name='color'
                        selection
                        clearable
                        className='cheque-reg-select item d-flex align-items-center py-0 form-control text-black'
                        placeholder="Select"
                        options={color}
                        onChange={handleChange}
                        value={params?.color || ""}
                    >
                    </Dropdown>
                </div>
                <div className='col-2'>
                    <select onChange={selectionChange} name="" id="" className='item_input'>
                        <option value="">Last P.Cost</option>
                        <option value="">Avg of P.Cost</option>
                        <option value="">FIFO Method</option>
                    </select>
                </div>
                <div className='col-2'>
                    <select value={rateType} onChange={(e) => setRateType(e.target.value)} name="" id="" className='item_input'>
                        <option value="cost">Cost</option>
                        <option value="r_rate">R.Rate</option>
                        <option value="p_rate">P.Rate</option>
                    </select>
                </div>

            </div>
            <div className='row mt-3'>
                <div className='col-1 ps-3'>Sub Cat</div>
                <div className='col-3'>
                    <Dropdown
                        name='sub_category'
                        selection
                        clearable
                        className='cheque-reg-select item d-flex align-items-center py-0 form-control text-black'
                        placeholder="Select"
                        options={subCategories}
                        onChange={handleChange}
                        value={params?.sub_category || ""}
                    >
                    </Dropdown>
                </div>
                <div className='col-1 ps-5'>Godown</div>
                <div className='col-3'>
                    <Dropdown
                        name='rack'
                        selection
                        clearable
                        className='cheque-reg-select item d-flex align-items-center py-0 form-control text-black'
                        placeholder="Select"
                        options={godown}
                        onChange={handleChange}
                        value={params?.rack || ""}
                    >
                    </Dropdown>
                </div>
                <div className='row col-2 m-0 p-0'>
                    <div className='col p-0 ps-5 m-0'>Tax %</div>
                    <div className='col'>
                        <input type="text" onChange={handleChange} className='item_input' name='tax' />
                    </div>

                </div>
                <div className='col-2'>
                    <input className='item_input' type="button" value='Barcode' />
                </div>

            </div>
            <div className='row mt-3'>
                <div className='col-1 ps-3'>Company</div>
                <div className='col-3'>
                    <Dropdown
                        name='company'
                        selection
                        className='cheque-reg-select item d-flex align-items-center py-0 form-control text-black'
                        placeholder="Select"
                        options={company}
                        onChange={handleChange}
                        value={params?.company || ""}
                    >
                    </Dropdown>
                </div>
                <div className='col-1 ps-5'></div>
                <div className='col-3'>
                    <select value={stockType} id="" className='item_input' onChange={(e) => setStockType(e.target.value)}>
                        <option value="ALL">All</option>
                        <option value="POSITIVE_STOCK">With Stock Only</option>
                        <option value="NEGATIVE_STOCK">With -ve Stock</option>
                        <option value="ZERO_STOCK">with Zero Stock</option>
                    </select>
                </div>
                <div className='col-4'></div>
            </div>
            <div className='row mt-3'>
                <div className='col-1 ps-3'>Size</div>
                <div className='col-3'>
                    <Dropdown
                        name='size'
                        selection
                        className='cheque-reg-select item d-flex align-items-center py-0 form-control text-black'
                        placeholder="Select"
                        options={size}
                        onChange={handleChange}
                        value={params?.size || ""}
                    >
                    </Dropdown>
                </div>
                <div className='col-1 ps-5'>Up To</div>
                <div className='col-3'>
                    <input
                        className='item_input'
                        type="date"
                        name="to_date"
                        onChange={handleChange}
                        value={params?.to_date && new Date(params?.to_date)?.toISOString().slice(0, 10) || new Date().toISOString().slice(0, 10)}
                    />
                    {/* <Form.Group>
                        <Form.Control
                            name="to_date"
                            onChange={handleChange}
                            value={params.to_date || new Date().toISOString(0, 10)}
                            className='cashbook-input col-5 ms-4 '
                            type="date">
                        </Form.Control>
                    </Form.Group> */}

                </div>
                <div className='col-4'></div>
            </div>
        </div>
    )
}

export default StockValueEntry