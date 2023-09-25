import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import AccountList from './components/AccountList'
import AccountAdd from './components/AccountAdd'
import './AccountMaster.css'

const AccountMaster = () => {
    const [pageHeadItem, setPageHeadItem] = useState(1)
    const [toEdit, setToEdit] = useState(false)
    const [listItem, setListItem] = useState([])
    const navigate = useNavigate()

    const location = useLocation()

    const handleEdit = (data) => {
        navigate('/account-add')
        setToEdit(data)
    }
    return (
        <div className='item_add'>
            <div className="itemList_header row mx-0">
                <div className="page_head my-1 ps-4 d-flex justify-content-between">
                    <div>
                        <div className='fw-600 fs-5'>Master Account</div>
                        <div className='page_head_items mb-3'>
                            <div onClick={() => navigate('/account-master')} className={`page_head_item ${pageHeadItem === 1 && "active"}`}>Master List</div>
                        </div>
                    </div>
                    <div className="col-1 col-2 d-flex px-1 align-items-center">
                        <div onClick={() => { setToEdit(false); navigate('/account-add') }} className="btn btn-primary add-btn px-0">+ &nbsp; Add Account</div>
                    </div>
                </div>
            </div>

            {
                /* toEdit||showAddItem */ location.pathname === "/account-add" ?
                    <AccountAdd edit={toEdit} /> :
                    <AccountList list={listItem} {...{ handleEdit, toEdit }} />
            }
        </div>
    )
}

export default AccountMaster
