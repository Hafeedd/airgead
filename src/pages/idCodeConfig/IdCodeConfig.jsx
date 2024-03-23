import React, { useEffect, useState } from 'react'
import './idCodeConfig.css'
import { Form } from 'react-bootstrap'
import { Checkbox, Dropdown } from 'semantic-ui-react'
import searchIcon from '../../assets/icons/search.png'
import { HiDotsVertical } from "react-icons/hi";
import pencilIcon from '../../assets/icons/blue_pencil.png'
import deleteBtn from '../../assets/icons/delete.svg'
import useBaseServices from '../../services/master/baseServices'

export const IdCodeConfig = () => {
    const [listShow, setListShow] = useState(false)
    const [idList, setIdList ] = useState([])
    const [codeId, setCodeId] = useState({
        next_value:null,
        sub_id:null,
        types:null
    })

    const {getCodeIdList} = useBaseServices()

    useEffect(()=>{
        getData()
    },[])

    const getData = async () =>{
        try{
            let resp = await getCodeIdList()
            if(resp.success){
                setIdList(resp.data)
            }
        }catch(err){console.log(err)}
    }

    console.log(idList)

    return (
        <div className='id-code-config'>
            <div className='p-3'>
                <h5>Add Code Configuration</h5>
                <div className='row mx-0 mt-3'>
                    <div className="col-5 ps-4">
                        <Form.Group className='code-conf-input-cont row mx-0'>
                            <Form.Label>Select Type</Form.Label>
                            <div className='col-10'>
                                <Dropdown
                                    clearable
                                    selection
                                    search
                                    // onKeyDown={handleKeyDown}
                                    // onChange={handleChange}
                                    className="purchase-select code-conf d-flex align-items-center py-0 form-control"
                                    name="fk_supplier"
                                    placeholder="select"
                                // value={purchaseAdd?.fk_supplier || ""}
                                // options={supplierList}
                                />
                            </div>
                        </Form.Group>
                        <Form.Group className='code-conf-input-cont row mx-0'>
                            <Form.Label>Prefix/PostFix</Form.Label>
                            <div className='col-10 px-0 d-flex gap-4 ps-2'>
                                <div className='code-conf-checkbox-cont'>
                                    <input type="checkbox" className='permission-checkbox' />
                                    Prefix
                                </div>
                                <div className='code-conf-checkbox-cont'>
                                    <input type="checkbox" className='permission-checkbox' />
                                    Postfix
                                </div>
                            </div>
                        </Form.Group>
                        <Form.Group className='code-conf-input-cont row mx-0 align-items-center'>
                            <Form.Label className='col-2 m-0'>FULL ID</Form.Label>
                            <div className='col-9'>
                                <Form.Control
                                    className="purchase-select code-conf d-flex align-items-center py-0 form-control" />
                            </div>
                        </Form.Group>
                    </div>
                    <span className='col-1' />
                    <div className='col-5'>
                        <Form.Group className='code-conf-input-cont row mx-0 align-items-center'>
                            <Form.Label>Suffix</Form.Label>
                            <div className='col-12'>
                                <Form.Control
                                    placeholder='#DC'
                                    className="purchase-select code-conf d-flex align-items-center py-0 form-control" />
                            </div>
                        </Form.Group>
                        <Form.Group className='code-conf-input-cont row mx-0 align-items-center'>
                            <Form.Label>Next Value</Form.Label>
                            <div className='col-12'>
                                <Form.Control
                                    placeholder='#DC'
                                    className="purchase-select code-conf d-flex align-items-center py-0 form-control" />
                            </div>
                        </Form.Group>
                    </div>
                </div>
            </div>
            <div style={{ background: 'white' }} className='row justify-content-end gap-3 py-3 px-5 mx-0'>
                <div className='company-add-btn clear btn col-1 col-2'>Clear</div>
                <div className='company-add-btn next btn col-1 col-2'>Save</div>
            </div>
            <div className='p-3'>
                <div className='code-conf-table-cont row mx-0 gap-3'>
                    <div className="item_seach_bar_cont rounded-2 col-3">
                        <img src={searchIcon} className="search_img me-3 ms-2 py-2" />
                        <input
                            // value={search}
                            // onChange={handleSearch}
                            className="item_search_bar rounded-2 border-0 py-1"
                            placeholder="Search"
                            type="text"
                        />
                    </div>
                    <div className='company-add-btn next btn col-1 col-2'>Search</div>
                    <table className='table code-conf'>
                        <thead>
                            <tr>
                                <th className='rounded-top-3 rounded-end-0'>No</th>
                                <th>Code Types</th>
                                <th>Suffix</th>
                                <th>Post/<br />Prefix</th>
                                <th>Next Value</th>
                                <th>Full ID</th>
                                <th className='rounded-top-3 rounded-start-0'></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='ps-2'><div className='code-conf-td rounded-start-4'>frerewwf</div></td>
                                <td><div className='code-conf-td'>frerewwf</div></td>
                                <td><div className='code-conf-td'>frerewwf</div></td>
                                <td><div className='code-conf-td'>frerewwf</div></td>
                                <td><div className='code-conf-td'>frerewwf</div></td>
                                <td><div className='code-conf-td'>frerewwf</div></td>
                                <td className='pe-2'><div className='code-conf-td rounded-end-4 gap-3'>
                                    <Checkbox toggle />
                                    <HiDotsVertical size={"1rem"} />
                                    {listShow === 1 && <div className="company-menue-dropdown">
                                        <div className="d-flex cursor gap-3"><img src={pencilIcon} alt="edit" /> Edit</div>
                                        <div className="d-flex cursor gap-3"><img src={deleteBtn} alt="edit" /> Delete</div>
                                    </div>}
                                </div></td>
                            </tr>
                            <tr>
                                <td className='ps-2'><div className='code-conf-td rounded-start-4'>frerewwf</div></td>
                                <td><div className='code-conf-td'>frerewwf</div></td>
                                <td><div className='code-conf-td'>frerewwf</div></td>
                                <td><div className='code-conf-td'>frerewwf</div></td>
                                <td><div className='code-conf-td'>frerewwf</div></td>
                                <td><div className='code-conf-td'>frerewwf</div></td>
                                <td className='pe-2'><div className='code-conf-td rounded-end-4 gap-3'>
                                    <Checkbox toggle />
                                    <HiDotsVertical size={"1rem"} />
                                    {listShow === 1 && <div className="company-menue-dropdown">
                                        <div className="d-flex cursor gap-3"><img src={pencilIcon} alt="edit" /> Edit</div>
                                        <div className="d-flex cursor gap-3"><img src={deleteBtn} alt="edit" /> Delete</div>
                                    </div>}
                                </div></td>
                            </tr>
                            <tr>
                                <td className='ps-2'><div className='code-conf-td rounded-start-4'>frerewwf</div></td>
                                <td><div className='code-conf-td'>frerewwf</div></td>
                                <td><div className='code-conf-td'>frerewwf</div></td>
                                <td><div className='code-conf-td'>frerewwf</div></td>
                                <td><div className='code-conf-td'>frerewwf</div></td>
                                <td><div className='code-conf-td'>frerewwf</div></td>
                                <td className='pe-2'><div className='code-conf-td rounded-end-4 gap-3'>
                                    <Checkbox toggle />
                                    <HiDotsVertical size={"1rem"} />
                                    {listShow === 1 && <div className="company-menue-dropdown">
                                        <div className="d-flex cursor gap-3"><img src={pencilIcon} alt="edit" /> Edit</div>
                                        <div className="d-flex cursor gap-3"><img src={deleteBtn} alt="edit" /> Delete</div>
                                    </div>}
                                </div></td>
                            </tr>
                            <tr>
                                <td className='ps-2'><div className='code-conf-td rounded-start-4'>frerewwf</div></td>
                                <td><div className='code-conf-td'>frerewwf</div></td>
                                <td><div className='code-conf-td'>frerewwf</div></td>
                                <td><div className='code-conf-td'>frerewwf</div></td>
                                <td><div className='code-conf-td'>frerewwf</div></td>
                                <td><div className='code-conf-td'>frerewwf</div></td>
                                <td className='pe-2'><div className='code-conf-td rounded-end-4 gap-3'>
                                    <Checkbox toggle />
                                    <HiDotsVertical size={"1rem"} />
                                    {listShow === 1 && <div className="company-menue-dropdown">
                                        <div className="d-flex cursor gap-3"><img src={pencilIcon} alt="edit" /> Edit</div>
                                        <div className="d-flex cursor gap-3"><img src={deleteBtn} alt="edit" /> Delete</div>
                                    </div>}
                                </div></td>
                            </tr>
                            <tr>
                                <td className='ps-2'><div className='code-conf-td rounded-start-4'>frerewwf</div></td>
                                <td><div className='code-conf-td'>frerewwf</div></td>
                                <td><div className='code-conf-td'>frerewwf</div></td>
                                <td><div className='code-conf-td'>frerewwf</div></td>
                                <td><div className='code-conf-td'>frerewwf</div></td>
                                <td><div className='code-conf-td'>frerewwf</div></td>
                                <td className='pe-2'><div className='code-conf-td rounded-end-4 gap-3'>
                                    <Checkbox toggle />
                                    <HiDotsVertical size={"1rem"} />
                                    {listShow === 1 && <div className="company-menue-dropdown">
                                        <div className="d-flex cursor gap-3"><img src={pencilIcon} alt="edit" /> Edit</div>
                                        <div className="d-flex cursor gap-3"><img src={deleteBtn} alt="edit" /> Delete</div>
                                    </div>}
                                </div></td>
                            </tr>
                            <tr>
                                <td className='ps-2'><div className='code-conf-td rounded-start-4'>frerewwf</div></td>
                                <td><div className='code-conf-td'>frerewwf</div></td>
                                <td><div className='code-conf-td'>frerewwf</div></td>
                                <td><div className='code-conf-td'>frerewwf</div></td>
                                <td><div className='code-conf-td'>frerewwf</div></td>
                                <td><div className='code-conf-td'>frerewwf</div></td>
                                <td className='pe-2'><div className='code-conf-td rounded-end-4 gap-3'>
                                    <Checkbox toggle />
                                    <HiDotsVertical size={"1rem"} />
                                    {listShow === 1 && <div className="company-menue-dropdown">
                                        <div className="d-flex cursor gap-3"><img src={pencilIcon} alt="edit" /> Edit</div>
                                        <div className="d-flex cursor gap-3"><img src={deleteBtn} alt="edit" /> Delete</div>
                                    </div>}
                                </div></td>
                            </tr>
                            <tr>
                                <td className='ps-2'><div className='code-conf-td rounded-start-4'>frerewwf</div></td>
                                <td><div className='code-conf-td'>frerewwf</div></td>
                                <td><div className='code-conf-td'>frerewwf</div></td>
                                <td><div className='code-conf-td'>frerewwf</div></td>
                                <td><div className='code-conf-td'>frerewwf</div></td>
                                <td><div className='code-conf-td'>frerewwf</div></td>
                                <td className='pe-2'><div className='code-conf-td rounded-end-4 gap-3'>
                                    <Checkbox toggle />
                                    <HiDotsVertical size={"1rem"} />
                                    {listShow === 1 && <div className="company-menue-dropdown">
                                        <div className="d-flex cursor gap-3"><img src={pencilIcon} alt="edit" /> Edit</div>
                                        <div className="d-flex cursor gap-3"><img src={deleteBtn} alt="edit" /> Delete</div>
                                    </div>}
                                </div></td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}