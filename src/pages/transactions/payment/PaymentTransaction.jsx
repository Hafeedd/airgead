import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import PaymentDetail from './components/PaymentDetail'
import './PaymentTransaction.css'
import PaymentListSection from './components/PaymentListSection'
import Swal from 'sweetalert2'
import { toWords } from 'number-to-words'
import usePaymentRecieptServices from '../../../services/transactions/paymentRecieptServices'
import useAccountServices from '../../../services/master/accountServices'
import { formValidation } from '../../../formValidation/formValidation'
import useItemServices from '../../../services/master/itemServices'

const PaymentTransaction = ({types}) => {
    const [pageHeadItem, setPageHeadItem] = useState(1)
    const [accountList, setAccountList] = useState([])
    const [payReciptList, setPayRecieptList] = useState([])
    const [pathOfPage, setPathOfPage] = useState()
    const [edit, setEdit] = useState(false)
    const [accountPayList, setAccountPayList] = useState([]) // account chash and bank payment filtered list 
    const [paymentAdd, setPaymentAdd] = useState({
        method:'Payment',
        voucher: null,
        account_id: null,
        account_detail: null,
        account_code: null,
        narration: null,
        cash_bank_account_name: null,
        cash_bank_account: null,
        amount: 0,
        amount_word: null,
        date: null,
        project: null,
        cheque_no: null,
        draw_no: null,
        cheque_date: null,
        salesman: null,
        commision: null,
        discount: null,
        tax_percent: null,
        taxable: null,
        tax_type: 'GST',
        cgst: null,
        sgst: null,
        tax_amount: null,
        print_style: null,
        printer: null,
        print_copies: null,
        print_preview: false,
        print: false,
        op_balance: null,
        cl_balance: null,
    })

    const location = useLocation()

    const {getCode} = useItemServices()

    useEffect(()=>{
        const path = location.pathname
        if(path !== setPathOfPage){
            setPathOfPage(path)
        }
    },[paymentAdd])
    
    useEffect(()=>{
        getData()
    },[])
    useEffect(()=>{
        getData2()
    },[pathOfPage])

    useEffect(()=>{
        if(types){
            let data = {...paymentAdd,method:types}
            setPaymentAdd(data)
        }
    },[types])

    const navigate = useNavigate()

    const {postPaymentReciept,
            putPaymentReciept,
            delPaymentReciept,
            getPaymentReciept} = usePaymentRecieptServices()

    const {getAccountList} = useAccountServices()

    const getData = async () =>{
        try{
            const response = await getAccountList()
            let tempList = []
            let tempListPayment = []
            if(response?.success){
                response.data.map(item=>{
                    let b , a
                    if(item.name == "CASH IN BANK" || item.name == "CASH IN HAND"){
                        b = {id:item.id,text:item.name,value:item.code}
                        tempListPayment.push(b)
                    }
                    if(item.name && item.code){
                        a = {key:item.id,value:item.code,text:item.name,description:item.code}
                        tempList.push(a)
                    }
                })
                setAccountPayList(tempListPayment)
                setAccountList(tempList)
                if(tempListPayment?.length>0)
                    setPaymentAdd({...paymentAdd,cash_bank_account_name:tempListPayment[0]?.value,
                        cash_bank_account:tempListPayment[0]?.text})
            }
        }catch(err){
            throw err   
        }
    }

    const getData2 = async () =>{
        try{
            let a, response, response2
            if(location.pathname.match('receipt')) a = "Receipt"
            else a = "Payment"
            const param = {params:{method:a}}
            response = await getPaymentReciept(param)
            response2 = await getCode()
            if(response.success){
                setPayRecieptList(response.data)
            }
            if(response2.success && !edit){
                let code
                if(pathOfPage){
                    for(let i of response2.data){
                        let type
                        if(pathOfPage == '/payment-transaction'){
                            type = "VPC"
                        }else{
                            type = "VRC"
                        }
                        if(i.sub_id == type){
                            code = i.next_code
                        }
                    }
                }
                setTimeout(()=>{
                    setPaymentAdd(data=>({...data,voucher_number:code}))
                },300)
            }
        }catch(err){
            // console.log(err)
        }
    }
    
    const handleNumber = (e) => {
        if (e.code.includes('Numpad') || e.code.includes('Digit') || e.code.includes('Key')) {
            if (isNaN(parseInt(e.key))) {
                Swal.fire({
                    icon: 'info',
                    text: "Enter a valid number",
                    showConfirmButton: false,
                    timer: 1000,
                    toast: true,
                })
                e.target.value = ''
                setPaymentAdd(data => ({ ...data, [e.target.name]: 0 }))
            }
        }
    }

    const handleChangePaymentCash = (e,data) =>{
        if(data){
            let payment_data = data.options.filter(x=>x.value===data.value)[0]
            setPaymentAdd(data=>({...data,cash_bank_account_name:payment_data?.value,
            cash_bank_account:payment_data?.text}))
        }
    }

    const handleToUpperCase = (data) =>{
        let keysOfData , tempData = {...data}
        if(typeof data == 'object')
            keysOfData = Object.keys(data)
        if(!keysOfData?.length>0) return 0
        keysOfData.map(item=>{
            if(typeof data[item] == 'string' && item != 'method'){
            let itemTemp = data[item]?.toUpperCase()
            tempData = {...tempData,[item]:itemTemp}}
        })
        return tempData
    }

    const handleChange = (e,data) => {
        if(data){
            let payment_data = data.options.filter(x=>x.value===data.value)[0]
            setPaymentAdd(data=>({...data,account_detail:payment_data?.text,
            account_code:payment_data?.description,account_id:payment_data?.key}))
        }
        // if (typeof e.target.value === 'string' && e.target.type !== 'select-one')
            // e.target.value = e.target.value.toUpperCase()

        if (e.target.type === "number") {
            var temp_value = e.target.value

            if (isNaN(parseInt(temp_value))) {
                Swal.fire({
                    icon: 'info',
                    text: "Enter a valid number",
                    showConfirmButton: false,
                    timer: 1000,
                    toast: true,
                })
                temp_value = ''
            }

            else if (parseInt(e.target.value) < 0) {
                temp_value = ''
            }

            if (e.target.name === 'amount') {
                if (e.target.value > 99999999999999) {
                    Swal.fire({
                        icon: 'info',
                        text: 'Max Amount Limit Reached!!!',
                        showConfirmButton: false,
                        timer: 1000,
                        toast: true,
                    })
                }
                else {
                    var temp = ''
                    if (temp_value !== '') {
                        temp = toWords(temp_value)
                    }
                    setPaymentAdd(data => ({ ...data, 'amount': temp_value }))
                    setPaymentAdd(data => ({ ...data, 'amount_word': temp }))
                }
            }
            else {
                setPaymentAdd(data => ({ ...data, [e.target.name]: temp_value }))
            }
        }

        else if (e.target.type === "checkbox")
            setPaymentAdd(data => ({ ...data, [e.target.name]: e.target.checked }))

        else if (e.target.value === '')
            setPaymentAdd(data => ({ ...data, [e.target.name]: null }))

        else if(e.target.name === 'method'){
            navigate(`/${e.target.value.toLowerCase()}-transaction`)
        }
        else
            setPaymentAdd(data => ({ ...data, [e.target.name]: e.target.value }))

        if (e.target.name === 'tax_type') {

            if (e.target.value === 'GST') {
                setPaymentAdd(data => ({ ...data, 'tax_amount': null }))
            }
            else {
                setPaymentAdd(data => ({ ...data, 'cgst': null, 'sgst': null }))
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            if(!formValidation()) return 0
            const submitData = handleToUpperCase(paymentAdd)
            let response
            if(!edit){
                response = await postPaymentReciept(submitData)
            }else{
                response = await putPaymentReciept(edit,submitData)
            }
            if(response?.success){
                Swal.fire(`${paymentAdd?.method === "Payment"? "Payment" :"Reciept"} ${edit? "edited" : "added"} successfully`,'','success')
                handleReset()
            }else{
                Swal.fire(response.message,'Failed! please try again','error')
            }
        }catch(err){
            // let data = err?.response?.data?.error
            // let index = Object.keys(data)[0]
            // let error = data[index][0]
            // Swal.fire({
            //     title:index.toUpperCase(),
            //     text:error,
            //     icon:'error',
            //     timer:1000,
            //     showConfirmButton:false
            // })
            Swal.fire(`Failed to add ${paymentAdd?.method === "Payment"? "Payment" :"Reciept"}`,'','error')
        }
    }

    const handleReset = () => {
        getData2()
        const {voucher_number,method,...others} = paymentAdd
        let key = Object.keys(others)
        let tempData = {...paymentAdd}
        key.map((data) => {
            tempData = { ...tempData, [data]: null }
        })
        tempData = {...tempData,tax_type:'GST',amount:0,
        cash_bank_account_name:accountPayList[0]?.value,
        cash_bank_account:accountPayList[0]?.text}
        setPaymentAdd(tempData)
        setEdit(false)
    }
    
    const handleEdit = (data) =>{
        let tempPayRecAdd 
        if(data){
            const {updated_at,created_at,daybook_part,account,...others} = data
            tempPayRecAdd = {...others,...daybook_part,...account}
            console.log(tempPayRecAdd)
            setPaymentAdd(tempPayRecAdd)
            setEdit(tempPayRecAdd.id)
        }
    }

    return (
        <div className='item_add'>
            <div className="itemList_header row mx-0">
                <div className="page_head my-1 ps-4">
                    <div>
                        <div className='fw-600 fs-5'>Transaction {pathOfPage=="/payment-transaction"?'payment':'receipt'}</div>
                        <div className='page_head_items mb-3'>
                            <div onClick={() => navigate('/account-master')} className={`page_head_item ${pageHeadItem === 1 && "active"}`}>
                                {pathOfPage=="/payment-transaction"?'payment':'receipt'} Details</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="item_add">
                <div className="item_add_cont">
                    <PaymentDetail
                        {...{
                            edit,
                            accountList,
                            setPaymentAdd,
                            paymentAdd,
                            handleChange,
                            handleNumber,
                            handleReset,
                            handleSubmit,
                            accountPayList,
                            setAccountPayList,
                            handleChangePaymentCash,                
                        }}
                    />
                    <PaymentListSection 
                        {...{
                            payReciptList,
                            paymentAdd,
                            handleEdit
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default PaymentTransaction
