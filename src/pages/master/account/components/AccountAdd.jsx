import React, { useState } from 'react'

const AccountAdd = ({edit}) => {
    const [accountAdd, setAccountAdd] = useState({
        code:null,
        name:null,
        account_group:null,
        opening_balance:null,
        payment_type:'TO_RECIEVE',
        account_type:'INCOME',
        cash_type:'UPI',
        reserved:false,
        blocked:false,
        position_pl:null,
        position_bs:null,
        transaction:true,
        hsn:null,
        tax:null,
    })

    const handleChange = (e) => {
        if(typeof e.target.value === 'string')
            e.target.value = e.target.value.toUpperCase()
        if(e.target.type === "checkbox")
            setAccountAdd(data=> ( {...data,[e.target.name] : e.target.checked}))
        else if(e.target.value === '')
            setAccountAdd(data => ( {...data,[e.target.name] : null} ))
        else
            setAccountAdd(data => ( {...data,[e.target.name] : e.target.value} ))
        if(e.target.name==='transaction'&&e.target.checked===false){
            setAccountAdd(data=>({...data,['hsn'] : null, ['tax'] : null}))
        }
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        console.log(accountAdd)
    }

    const handleReset = () =>{
        let key = Object.keys(accountAdd)
        key.map((data)=>{
                setAccountAdd(val=>({...val,[data]:''}))
            })
    }

    return (
        <div className='item_add'>
            <div className='item_add_cont'>
                {edit ? "Edit Supplier" : "Add New Supplier"}
                <form onSubmit={handleSubmit} className='item_add_form pt-1 row mt-1'>

                    {/* account details --------------------------------------------------------------------------------------- */}

                    <div className='item_add_form_part1 col-7 row mx-0 px-0'>

                        <div className="d-flex align-items-center px-0 row mx-0 my-2">
                            <div className='mx-0 px-0 col-5 col-6'>
                                Code
                            </div>
                            <div className='mx-0 px-0 col-6 col-7'>
                                <input onChange={handleChange} name='code' value={accountAdd.code ? accountAdd.code : ''} type='text' className='item_input names' />
                            </div>
                        </div>
                        <div className="d-flex align-items-center px-0 row mx-0 my-2">
                            <div className='mx-0 px-0 col-5 col-6'>
                                Name
                            </div>
                            <div className='mx-0 px-0 col-6 col-7'>
                                <input onChange={handleChange} name='name' value={accountAdd.name ? accountAdd.name : ''} type='text' className='item_input names' />
                            </div>
                        </div>
                        <div className="d-flex align-items-center px-0 row mx-0 my-2">
                            <div className='mx-0 px-0 col-5 col-6'>
                                A/c Group
                            </div>
                            <div className='mx-0 px-0 col-4 col-5'>
                                <input onChange={handleChange} name='account_group' value={accountAdd.account_group ? accountAdd.account_group : ''} type='text' className='item_input names' />
                            </div>
                            <div className="col-2 pe-0 d-flex align-items-center">
                                <div className="btn btn-sm btn-dark w-100 py-0">
                                    Add
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center px-0 row mx-0 my-2">
                            <div className='mx-0 px-0 col-5 col-6'>
                            Op Balance
                            </div>
                            <div className='mx-0 px-0 col-6 col-7'>
                                <div className='item_input_with_drop row d-flex rounded-2 align-items-center p-0 m-0'>
                                <div className='col-6 col-7 mx-0 px-0 me-0'>
                                <input name="opening_balance" type='number' className='item_input names border-0 ' />
                                </div>
                                <div className='col-6 col-5 mx-0 px-0 d-flex align-items-center h-100'>
                                <select name='payment_type'  placeholder='To Recieve' className='pay-type-select ms-0 pe-0'>
                                    <option value="TO_GIVE">To Give</option>
                                    <option value="TO_RECEIVE">To Receive</option>
                                </select>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center px-0 row mx-0 my-2">
                            <div className="col-5 col-6 row mx-0 px-0">
                                <div className='mx-0 px-0 col-5'>
                                    A/c Type
                                </div>
                                <div className='mx-0 px-0 col-7'>
                                    <select onChange={handleChange} name='account_type' value={accountAdd.account_type?accountAdd.account_type:''} className='account-select-dropdown ms-0 pe-0'>
                                        <option value="INCOME">Income</option>
                                        <option value="LEDGER">Ledger</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-6 col-7 row ps-4 mx-0 px-0">
                                <div className='mx-0 px-0 col-5'>
                                    Cash/Bank
                                </div>
                                <div className='mx-0 px-0 col-7'>
                                    <select onChange={handleChange} name='cash_type' value={accountAdd.cash_type?accountAdd.cash_type:''} className='account-select-dropdown ms-0 pe-0'>
                                        <option value="UPI">upi</option>
                                        <option value="CHECK">check</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center px-0 row mx-0 my-2">
                            <span className="col-7" />
                            <div className="col-5 d-flex align-items-center row mx-0 my-0 px-0 justify-content-end">
                                <div className='mx-0 px-0 col-6 d-flex align-items-center justify-content-end'>
                                    <input type='checkbox' onChange={handleChange} name='reserved' checked={accountAdd.reserved} />
                                    <label htmlFor='Reserved' className='ps-2'>Reserved</label>
                                </div>
                                <div className='mx-0 px-0 col-6 d-flex align-items-center justify-content-end'>
                                    <input type='checkbox' onChange={handleChange} name='blocked' checked={accountAdd.blocked} />
                                    <label htmlFor='Blocked' className='ps-2'>Blocked</label>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center px-0 row mx-0 my-2">
                            <div className="col-5 col-6 row mx-0 px-0">
                                <div className='mx-0 px-0 col-5'>
                                    Position in P/L
                                </div>
                                <div className='mx-0 px-0 col-7'>
                                    <input onChange={handleChange} name='position_pl' value={accountAdd.position_pl ? accountAdd.position_pl : ''} type='text' className='item_input names' />
                                </div>
                            </div>
                            <div className="col-6 col-7 row ps-4 mx-0 px-0">
                                <div className='mx-0 px-0 col-5'>
                                    Position in BS
                                </div>
                                <div className='mx-0 px-0 col-7'>
                                    <input onChange={handleChange} name='position_bs' value={accountAdd.position_bs ? accountAdd.position_bs : ''} type='text' className='item_input names' />
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center px-0 row mx-0 my-2">
                            <div className="col-12 d-flex align-items-center row mx-0 my-0 px-0 justify-content-start">
                                <div className='mx-0 px-0 col-12 d-flex align-items-center justify-content-start'>
                                    <input type='checkbox' onChange={handleChange} name='transaction' checked={accountAdd.transaction} />
                                    <label htmlFor='Reserved' className='ps-2'>Transaction A/c</label>
                                </div>
                            </div>
                        </div>
                        {accountAdd.transaction&&<div className="d-flex align-items-center px-5 row mx-0 my-2">
                            <div className="col-5 col-6 row mx-0 px-0">
                                <div className='mx-0 px-0 col-5'>
                                    HSN
                                </div>
                                <div className='mx-0 px-0 col-7'>
                                    <input onChange={handleChange} name='hsn' value={accountAdd.hsn ? accountAdd.hsn : ''} type='text' className='item_input names' />
                                </div>
                            </div>
                            <div className="col-6 col-7 row ps-4 mx-0 px-0">
                                <div className='mx-0 px-0 col-5'>
                                    Tax %
                                </div>
                                <div className='mx-0 px-0 col-7'>
                                    <input onChange={handleChange} name='tax' value={accountAdd.tax ? accountAdd.tax : ''} type='text' className='item_input names' />
                                </div>
                            </div>
                        </div>}

                    </div>

                    {/* account list ----------------------------------------------------------------------------------------------------------- */}

                    <div className='item_add_form_part2 row mx-0 ps-4 pe-0 me-0 col-5 border-0'>
                        <div className="account-table-container ps">
                            <table className="table table-hover account-group-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>A/c Type</th>
                                        <th className='text-center'>Position</th>
                                        <th>Reserve</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan={4}></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="content">Current Asset</div>
                                        </td>
                                        <td>
                                            <div className="content">Asset</div>
                                        </td>
                                        <td>
                                            <div className="content justify-content-center">0</div>
                                        </td>
                                        <td>
                                            <div className="content">
                                                <div className="col-4">Yes</div>
                                                <div className="col-4">
                                                   <div className="btn btn-sm btn-dark sq-btn">-</div>
                                                </div>
                                                <div className="col-4">
                                                   <div className="btn btn-sm btn-dark sq-btn">+</div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="content">Capital A/C</div>
                                        </td>
                                        <td>
                                            <div className="content">LIABI</div>
                                        </td>
                                        <td>
                                            <div className="content justify-content-center">0</div>
                                        </td>
                                        <td>
                                            <div className="content">
                                                <div className="col-4">Yes</div>
                                                <div className="col-4">
                                                   <div className="btn btn-sm btn-dark sq-btn">-</div>
                                                </div>
                                                <div className="col-4">
                                                   <div className="btn btn-sm btn-dark sq-btn">+</div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-12 row mt-5 px-0 mx-1">
                        <div className='mx-0 px-0 col-9' />
                        <div className='mx-0 px-1 col-1 col-2'>
                            <button onClick={handleReset} type='reset' className='btn btn-sm btn-outline-dark w-100'>Clear</button>
                        </div>
                        <div className='mx-0 ps-1 pe-0 col-1 col-2'>
                            <button type='submit' className='btn btn-sm btn-dark w-100'>{edit?"Edit":"Save"}</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default AccountAdd
