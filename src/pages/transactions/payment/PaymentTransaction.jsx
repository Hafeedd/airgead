import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import PaymentDetail from './components/PaymentDetail'
import './PaymentTransaction.css'
import PaymentListSection from './components/PaymentListSection'
import Swal from 'sweetalert2'
import { toWords } from 'number-to-words'

const PaymentTransaction = () => {
    const [pageHeadItem, setPageHeadItem] = useState(1)

    const [paymentAdd, setPaymentAdd] = useState({
        type: 'Payment',
        voucher: null,
        account_detail: null,
        account_code: null,
        narration: null,
        cash_type: 'INHAND',
        amount: 0,
        amount_word: null,
        date: null,
        project: null,
        cheque_no: null,
        cheque_drawn: null,
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

    const navigate = useNavigate()

    const location = useLocation()

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

    const handleChange = (e) => {
        if (typeof e.target.value === 'string' && e.target.type !== 'select-one')
            e.target.value = e.target.value.toUpperCase()

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
        console.log(paymentAdd)
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
                        <div className='fw-600 fs-5'>Transaction {paymentAdd?.type}</div>
                        <div className='page_head_items mb-3'>
                            <div onClick={() => navigate('/account-master')} className={`page_head_item ${pageHeadItem === 1 && "active"}`}>{paymentAdd?.type} Details</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="item_add">
                <div className="item_add_cont">
                    <PaymentDetail
                        {...{
                            setPaymentAdd,
                            paymentAdd,
                            handleChange,
                            handleNumber,
                            handleReset,
                            handleSubmit
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
