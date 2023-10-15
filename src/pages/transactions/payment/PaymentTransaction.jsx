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

const PaymentTransaction = ({types}) => {
    const [pageHeadItem, setPageHeadItem] = useState(1)
    const [accountList, setAccountList] = useState([])
    const [payReciptList, setPayRecieptList] = useState([])
    // account chash and bank payment filtered list
    const [accountPayList, setAccountPayList] = useState([]) 
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

    useEffect(()=>{
        getData()
    },[])

    useEffect(()=>{
        if(types){
            let data = {...paymentAdd,type:types}
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
            const response2 = await getPaymentReciept()
            if(response2.success){
                console.log(response2.data)
            }
            let tempList = []
            let tempListPayment = []
            if(response?.success){
                response.data.map(item=>{
                    let b , a
                    // console.log(item.name)
                    if(item.name == "CASH IN BANK" || item.name == "CASH IN HAND"){
                        b = {id:item.id,text:item.name,value:item.code}
                        tempListPayment.push(b)
                    }
                    if(item.name && item.code){
                        a = {key:item.id,value:item.name,text:item.name,description:item.code}
                        tempList.push(a)
                    }
                })
                setAccountPayList(tempListPayment)
                setAccountList(tempList)
                if(tempListPayment?.length>0)
                    setPaymentAdd({...paymentAdd,cash_bank_account:tempListPayment[0]?.value})
            }
        }catch(err){
            throw err   
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
            setPaymentAdd(data=>({...data,['cash_bank_account_name']:payment_data?.text,
            ['cash_bank_account']:payment_data?.value}))
        }
    }

    const handleToUpperCase = (data) =>{
        let keysOfData , tempData = {...data}
        if(typeof data == 'object')
            keysOfData = Object.keys(data)
        if(!keysOfData?.length>0) return 0
        keysOfData.map(item=>{
            if(typeof data[item] == 'string'){
            let itemTemp = data[item]?.toUpperCase()
            tempData = {...tempData,[item]:itemTemp}}
        })
        return tempData
    }

    const handleChange = (e,data) => {
        if(data){
            let payment_data = data.options.filter(x=>x.value===data.value)[0]
            setPaymentAdd(data=>({...data,['account_detail']:payment_data?.text,
            ['account_code']:payment_data?.description,['account_id']:payment_data?.key}))
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
            let response = await postPaymentReciept(submitData)
            if(response?.success){
                Swal.fire(`${paymentAdd.types === "Payment"? "Payment" :"Reciept"} added successfully`,'success')
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
        }
    }

    const handleReset = () => {
        let key = Object.keys(paymentAdd)
        key.map((data) => {
            setPaymentAdd(val => ({ ...val, [data]: '' }))
        })
    }

    return (
        <div className='item_add'>
            <div className="itemList_header row mx-0">
                <div className="page_head my-1 ps-4">
                    <div>
                        <div className='fw-600 fs-5'>Transaction {paymentAdd?.method}</div>
                        <div className='page_head_items mb-3'>
                            <div onClick={() => navigate('/account-master')} className={`page_head_item ${pageHeadItem === 1 && "active"}`}>{paymentAdd?.method} Details</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="item_add">
                <div className="item_add_cont">
                    <PaymentDetail
                        {...{
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
                            paymentAdd
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default PaymentTransaction
