import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import useAccountServices from '../../../../services/master/accountServices'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router'
import useOnKey from '../../../../onKeyFunct/onKeyFunct'

const AccountAdd = ({ edit, refresh, setEdit }) => {
    const [showAccountGroup, setShowAccountGroup] = useState(false)
    const [accountGroupList, setAccountGroupList] = useState([])
    const [tempGroupList, setTempGroupList] = useState([])
    const [ref, setRef] = useState()

    const [accountAdd, setAccountAdd] = useState({
        code: null,
        name: null,
        fk_account_group: null,
        account_group: null,
        opening_balance: '0',
        debit_credit: 'DEBIT',
        account_type_one: 'INCOME',
        cash_bank: 'CASH',
        position_in_profit_loss: null,
        position_in_balance_sheet: null,
        hsn: null,
        tax: null,
        reserved: false,
        blocked: false,
        transaction: true,
    })
    const [groupAdd, setGroupAdd] = useState({
        code: null,
        name: null,
        account_type: 'INCOME',
        position: null,
        reserve: 'YES'
    })

    const {formRef, handleKeyDown} = useOnKey(ref,setRef)

    const {
        postAccountGroup,
        postAccountCreate,
        putAccountEdit,
        getAccountGroup,
        deleteAccountGroup,
    } = useAccountServices()

    const navigate = useNavigate()

    const getAccountGroupData = async () => {
        try {
            const response = await getAccountGroup()
            if (response?.success) {
                setAccountGroupList(response?.data)
                setTempGroupList(response?.data)
            }
        } catch { }
    }

    useEffect(() => {
        getAccountGroupData()
    }, [])

    useEffect(()=>{
        if(edit){
            setAccountAdd(data=>({
                ...data,
                code: edit?.code,
                name: edit?.name,
                fk_account_group: edit?.fk_account_group?.id,
                account_group: edit?.fk_account_group?.name,
                opening_balance: edit?.opening_balance,
                debit_credit: edit?.debit_credit,
                account_type_one: edit?.account_type_one,
                cash_bank: edit?.cash_bank,
                position_in_profit_loss: edit?.position_in_profit_loss,
                position_in_balance_sheet: edit?.position_in_balance_sheet,
                hsn: edit?.hsn,
                tax: edit?.tax,
                reserved: edit?.reserved,
                blocked: edit?.blocked,
                transaction: edit?.edit||edit?.tax?true:false,
            }))
        }
        else{
            handleReset()
        }
    },[edit])

    useEffect(()=>{
        var search = groupAdd.name
        if(search!==''&&search!==null){
            var temp = tempGroupList.filter((data)=>data.name.includes(search)||data.code.includes(search))
            setTempGroupList(temp)
        }
        else{
            setTempGroupList(accountGroupList)
        }
        
    },[groupAdd.name])

    const handleChange = (e) => {
        if (e.target.name === "opening_balance" || e.target.name === "tax"){
            if(isNaN(parseFloat(e.target.value))){
                Swal.fire({
                    text:'Enter a valid integer',
                    icon:'info',
                    timer:1000,
                    showConfirmButton:false
                })
                e.target.value = '0'
            }
            else if(e.target.value[0]==='0' && e.target.value[1]!=='.'){
                e.target.value = e.target.value.slice(1,)
            }   
        }
        else if (typeof e.target.value === 'string')
            e.target.value = e.target.value.toUpperCase()

        if (e.target.type === "checkbox")
            setAccountAdd(data => ({ ...data, [e.target.name]: e.target.checked }))
        else if (e.target.value === '')
            setAccountAdd(data => ({ ...data, [e.target.name]: null }))
        else
            setAccountAdd(data => ({ ...data, [e.target.name]: e.target.value }))
        if (e.target.name === 'transaction' && e.target.checked === false) {
            setAccountAdd(data => ({ ...data, ['hsn']: null, ['tax']: null }))
        }
    }

    const handleChangeGroup = (e)=> {
        if (e.target.name === "position"){
            if(isNaN(parseInt(e.target.value))){
                Swal.fire({
                    text:'Enter a valid integer',
                    icon:'info',
                    timer:1000,
                    showConfirmButton:false
                })
                e.target.value = '0'
            }
            else if(e.target.value[0]==='0'){
                e.target.value = e.target.value.slice(1,)
            }       
        }
        else if (typeof e.target.value === 'string')
            e.target.value = e.target.value.toUpperCase()
        if (e.target.value === '' || e.target.value === ' ')
            setGroupAdd(data => ({ ...data, [e.target.name]: null }))
        else
            setGroupAdd(data => ({ ...data, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            var response;
            if(edit){
                response = await putAccountEdit(edit?.id, accountAdd)
            }
            else{
                response = await postAccountCreate(accountAdd)
            }
            if(response?.success){
                Swal.fire({
                    title:'Success',
                    text:response?.message,
                    icon:'success',
                    timer:1000,
                    showConfirmButton:false
                })
                handleReset()
                setEdit(false)
                refresh()
                navigate('/account-master')
            }
        }catch(err){
            let data = err?.response?.data?.error
            let index = Object.keys(data)[0]
            let error = data[index][0]
            Swal.fire({
                title:index.toUpperCase(),
                text:error,
                icon:'error',
                timer:1000,
                showConfirmButton:false
            })
        }
    }

    const handleReset = () => {
            setAccountAdd(val => ({ 
                ...val,
                code: null,
                name: null,
                fk_account_group: null,
                account_group: null,
                opening_balance: '0',
                debit_credit: 'DEBIT',
                account_type_one: 'INCOME',
                cash_bank: 'CASH',
                position_in_profit_loss: null,
                position_in_balance_sheet: null,
                hsn: null,
                tax: null,
                reserved: false,
                blocked: false,
                transaction: true,
            }))
        setEdit(false)
    }

    const handleGroupSubmit = async (e) =>{
        e.preventDefault()
        try{
            const response = await postAccountGroup(groupAdd)
            if(response?.success){
                Swal.fire({
                    title:'Success',
                    text:'Account Group Created',
                    icon:'success',
                    timer:1000,
                    showConfirmButton:false
                })
                handleGroupReset()                  
                getAccountGroupData()
            }
        }catch(err){
            let data = err?.response?.data?.error
            let index = Object.keys(data)[0]
            let error = data[index][0]
            Swal.fire({
                title:index.toUpperCase(),
                text:error,
                icon:'error',
                timer:1000,
                showConfirmButton:false
            })
        }
    }

    const deleteGroup = async (id) =>{
        try{
            const response = await deleteAccountGroup(id)
            if(response?.success){
                Swal.fire({
                    title:'Success',
                    text:'Account group deleted successfully',
                    icon:'success',
                    timer:1000,
                    showConfirmButton:false
                })
                getAccountGroupData()
            }
        }catch(err){
            console.log(err?.response?.data?.error)
        }
    }

    const handleGroupReset = () => {
        setGroupAdd(data=>({
            ...data,
            code: null,
            name: null,
            account_type: 'INCOME',
            position: null,
            reserve: 'YES'
        }))
    }

    return (
        <div className='item_add'>
            <div className='item_add_cont'>
                {edit ? "Edit Account" : "Add New Account"}
                <form ref={formRef} onSubmit={handleSubmit} className='item_add_form pt-1 row mt-1'>

                    {/* account details --------------------------------------------------------------------------------------- */}

                    <div className='item_add_form_part1 col-5 col-6 row mx-0 px-0'>

                        <div className="d-flex align-items-center px-0 row mx-0 my-2">
                            <div className='mx-0 px-0 col-5 col-6'>
                                Code
                            </div>
                            <div className='mx-0 px-0 col-6 col-7'>
                                <input onChange={handleChange} onKeyDown={handleKeyDown}
                                 name='code' value={accountAdd.code ? accountAdd.code : ''} type='text' className='item_input names' />
                            </div>
                        </div>
                        <div className="d-flex align-items-center px-0 row mx-0 my-2">
                            <div className='mx-0 px-0 col-5 col-6'>
                                Name
                            </div>
                            <div className='mx-0 px-0 col-6 col-7'>
                                <input onChange={handleChange} onKeyDown={handleKeyDown}
                                 name='name' value={accountAdd.name ? accountAdd.name : ''} type='text' className='item_input names' />
                            </div>
                        </div>
                        <div className="d-flex align-items-center px-0 row mx-0 my-2">
                            <div className='mx-0 px-0 col-5 col-6'>
                                A/c Group
                            </div>
                            <div className='mx-0 px-0 col-4 col-5'>
                                <input onChange={handleChange} onKeyDown={handleKeyDown}
                                 name='account_group' value={accountAdd.account_group ? accountAdd.account_group : ''} type='text' className='item_input names' />
                            </div>
                            <div className="col-2 pe-0 d-flex align-items-center">
                                <div 
                                    className="btn btn-md btn-dark w-100 py-0"
                                    onClick={()=>setShowAccountGroup(!showAccountGroup)}
                                >
                                    {showAccountGroup?'Hide':'Add'}
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center px-0 row mx-0 my-2">
                            <div className='mx-0 px-0 col-5 col-6'>
                                Op Balance
                            </div>
                            <div className='mx-0 px-0 col-6 col-7'>
                                <div className='item_input_with_drop row rounded-2 p-0 m-0 align-items-center'>
                                    <div className='col-6 col-7 mx-0 px-0 me-0'>
                                        <input onChange={handleChange} onKeyDown={handleKeyDown}
                                         name='opening_balance' value={accountAdd.opening_balance ? accountAdd.opening_balance : ''} type='text' className='item_input names border-0' />
                                    </div>
                                    <div className='col-6 col-5 mx-0 px-0 d-flex align-items-center dropdown-btn-cont'>
                                        <select onChange={handleChange} onKeyDown={handleKeyDown}
                                         name='debit_credit' value={accountAdd.debit_credit ? accountAdd.debit_credit : ''} className='pay-type-select ms-0 pe-0'>
                                            <option value="DEBIT">DEBIT</option>
                                            <option value="CREDIT">CREDIT</option>
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
                                    <select onChange={handleChange} onKeyDown={handleKeyDown}
                                     name='account_type_one' value={accountAdd.account_type_one ? accountAdd.account_type_one : ''} className='account-select-dropdown ms-0 pe-0'>
                                        <option value="INCOME">INCOME</option>
                                        <option value="EXPENSE">EXPENSE</option>
                                        <option value="ASSET">ASSET</option>
                                        <option value="LIABILITY">LIABILITY</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-6 col-7 row ps-4 mx-0 px-0">
                                <div className='mx-0 px-0 col-5'>
                                    Cash/Bank
                                </div>
                                <div className='mx-0 px-0 col-7'>
                                    <select onChange={handleChange} onKeyDown={handleKeyDown}
                                     name='cash_bank' value={accountAdd.cash_bank ? accountAdd.cash_bank : ''} className='account-select-dropdown ms-0 pe-0'>
                                        <option value="CASH">CASH</option>
                                        <option value="BANK">BANK</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center px-0 row mx-0 my-2">
                            <span className="col-7" />
                            <div className="col-5 d-flex align-items-center row mx-0 my-0 px-0 justify-content-end">
                                <div className='mx-0 px-0 col-6 d-flex align-items-center justify-content-end'>
                                    <input type='checkbox' onChange={handleChange} onKeyDown={handleKeyDown}
                                     name='reserved' checked={accountAdd.reserved} />
                                    <label htmlFor='reserved' className='ps-2'>Reserved</label>
                                </div>
                                <div className='mx-0 px-0 col-6 d-flex align-items-center justify-content-end'>
                                    <input type='checkbox' onChange={handleChange} onKeyDown={handleKeyDown}
                                     name='blocked' checked={accountAdd.blocked} />
                                    <label htmlFor='blocked' className='ps-2'>Blocked</label>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center px-0 row mx-0 my-2">
                            <div className="col-5 col-6 row mx-0 px-0">
                                <div className='mx-0 px-0 col-5'>
                                    Position in P/L
                                </div>
                                <div className='mx-0 px-0 col-7'>
                                    <input onChange={handleChange} onKeyDown={handleKeyDown}
                                     name='position_in_profit_loss' value={accountAdd.position_in_profit_loss ? accountAdd.position_in_profit_loss : ''} type='text' className='item_input names' />
                                </div>
                            </div>
                            <div className="col-6 col-7 row ps-4 mx-0 px-0">
                                <div className='mx-0 px-0 col-5'>
                                    Position in BS
                                </div>
                                <div className='mx-0 px-0 col-7'>
                                    <input onChange={handleChange} onKeyDown={handleKeyDown}
                                     name='position_in_balance_sheet' value={accountAdd.position_in_balance_sheet ? accountAdd.position_in_balance_sheet : ''} type='text' className='item_input names' />
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center px-0 row mx-0 my-2">
                            <div className="col-12 d-flex align-items-center row mx-0 my-0 px-0 justify-content-start">
                                <div className='mx-0 px-0 col-12 d-flex align-items-center justify-content-start'>
                                    <input type='checkbox' onChange={handleChange} onKeyDown={handleKeyDown}
                                     name='transaction' checked={accountAdd.transaction} />
                                    <label htmlFor='transaction' className='ps-2'>Transaction A/c</label>
                                </div>
                            </div>
                        </div>
                        {accountAdd.transaction && <div className="d-flex align-items-center px-5 row mx-0 my-2">
                            <div className="col-5 col-6 row mx-0 px-0">
                                <div className='mx-0 px-0 col-5'>
                                    HSN
                                </div>
                                <div className='mx-0 px-0 col-7'>
                                    <input disabled={accountAdd.transaction==false&&true} onChange={handleChange} onKeyDown={handleKeyDown}
                                     name='hsn' value={accountAdd.hsn ? accountAdd.hsn : ''} type='text' className='item_input names' />
                                </div>
                            </div>
                            <div className="col-6 col-7 row ps-4 mx-0 px-0">
                                <div className='mx-0 px-0 col-5'>
                                    Tax %
                                </div>
                                <div className='mx-0 px-0 col-7'>
                                    <input disabled={accountAdd.transaction==false&&true} onChange={handleChange} onKeyDown={handleKeyDown}
                                     name='tax' value={accountAdd.tax ? accountAdd.tax : ''} type='text' className='item_input names' />
                                </div>
                            </div>
                        </div>}

                    </div>

                    {/* account list ----------------------------------------------------------------------------------------------------------- */}

                    <div className='item_add_form_part2 row mx-0 ps-4 pe-0 me-0 col-6 col-7 border-0'>
                        <div className="account-table-container ps">
                            <table className="table table-hover account-group-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th className='ps-2'>Code</th>
                                        <th style={{ width: '15%' }}>A/c Type</th>
                                        <th className='text-center' style={{ width: '10%' }}>Position</th>
                                        <th>Reserve</th>
                                    </tr>
                                </thead>
                                {showAccountGroup&&<tbody>
                                    <tr>
                                        <td colSpan={5}></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="content">
                                                <Form.Control
                                                    type='text'
                                                    size='sm'
                                                    className='border-0'
                                                    name='name'
                                                    value={groupAdd?.name||''}
                                                    onChange={handleChangeGroup}
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="content">
                                                <Form.Control
                                                    type='text'
                                                    size='sm'
                                                    className='border-0'
                                                    name='code'
                                                    value={groupAdd?.code||''}
                                                    onChange={handleChangeGroup}
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="content">
                                                <Form.Select
                                                    size='sm'
                                                    className='border-0'
                                                    name='account_type'
                                                    value={groupAdd?.account_type||''}
                                                    onChange={handleChangeGroup}
                                                >
                                                    <option value="INCOME">INCOME</option>
                                                    <option value="EXPENSE">EXPENSE</option>
                                                    <option value="ASSET">ASSET</option>
                                                    <option value="LIABILITY">LIABILITY</option>
                                                </Form.Select>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="content justify-content-center">
                                                <Form.Control
                                                    type='text'
                                                    size='sm'
                                                    className='border-0 text-center'
                                                    name='position'
                                                    value={groupAdd?.position||''}
                                                    onChange={handleChangeGroup}
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="content">
                                                <div className="col-6 pe-2">
                                                    <Form.Select
                                                        size='sm'
                                                        className='border-0'
                                                        name='reserve'
                                                        value={groupAdd?.reserve||''}
                                                        onChange={handleChangeGroup}
                                                    >
                                                        <option value="YES">Yes</option>
                                                        <option value="NO">No</option>
                                                    </Form.Select>
                                                </div>
                                                <div className="col-6 d-flex justify-content-end">
                                                    <button 
                                                        className="btn btn-sm btn-dark sq-btn"
                                                        onClick={handleGroupSubmit}
                                                    >+</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    {tempGroupList && tempGroupList.map((data, index) => {
                                        const handleDelete = async (e) => {
                                            Swal.fire({
                                            title: 'Delete',
                                            text: `Are you sure, you want to delete ${data.name}?`,
                                            icon: "question",
                                            showDenyButton: true,
                                            showCancelButton: false,
                                            confirmButtonText: "Yes",
                                            denyButtonText: "Cancel",
                                            showLoaderOnConfirm: true,
                                            preConfirm: async () => {
                                                await deleteGroup(data?.id)
                                            },
                                            preDeny: () => {
                                                Swal.fire({
                                                    title:'Cancelled',
                                                    icon:'info',
                                                    timer:1000,
                                                    showConfirmButton:false
                                                })
                                            }
                                            })
                                        }

                                        const handleSelect = (e)=>{
                                            setAccountAdd(item=>({
                                                ...item,
                                                fk_account_group:data?.id,
                                                account_group:data?.name,
                                                account_type_one:data?.account_type,
                                                reserved:data?.reserve==='YES'?true:false
                                            }))
                                            setGroupAdd(item=>({
                                                ...item,
                                                name:null
                                            }))
                                        }

                                        return (
                                            <tr key={index} onClick={handleSelect}>
                                                <td>
                                                    <div className="content ps-2">{data?.name}</div>
                                                </td>
                                                <td>
                                                    <div className="content ps-2">{data?.code}</div>
                                                </td>
                                                <td>
                                                    <div className="content ps-2">{data?.account_type}</div>
                                                </td>
                                                <td>
                                                    <div className="content justify-content-center">{data?.position}</div>
                                                </td>
                                                <td>
                                                    <div className="content">
                                                        <div className="col-6 ps-2">{data?.reserve}</div>
                                                        <div className="col-6 d-flex justify-content-end">
                                                            <div 
                                                                className="btn btn-sm btn-dark sq-btn"
                                                                // onClick={handleDelete}
                                                            >-</div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>

                                        )
                                    })}
                                </tbody>}
                            </table>
                        </div>
                    </div>
                    <div className="col-12 row mt-5 px-0 mx-1">
                        <div className='mx-0 px-0 col-9' />
                        <div className='mx-0 px-1 col-1 col-2'>
                            <button onClick={handleReset} type='reset' className='btn btn-sm btn-outline-dark w-100'>Clear</button>
                        </div>
                        <div className='mx-0 ps-1 pe-0 col-1 col-2'>
                            <button type='submit' className='btn btn-sm btn-dark w-100'>{edit ? "Edit" : "Save"}</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default AccountAdd
