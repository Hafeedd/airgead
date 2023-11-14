import React from 'react'

const PaymentChequeDetails = ({handleChange, paymentAdd}) => {
  return (
    <div className="col-12 row mx-0 p-5 py-3 payment-detail-container">
        <div className="col-12 row mx-0 mb-1 px-0">
            <div className='mx-0 px-0 col-3'>
                Cheque No
            </div>
            <div className='mx-0 px-0 col-9'>
                <input required onChange={handleChange} name='cheque_no' value={paymentAdd.cheque_no ? paymentAdd.cheque_no : ''} type='text' className='item_input names' />
            </div>
        </div>
        <div className="col-12 row mx-0 my-1 px-0">
            <div className='mx-0 px-0 col-3'>
                Drawn No
            </div>
            <div className='mx-0 px-0 col-9'>
                <input onChange={handleChange} name='draw_no' value={paymentAdd.draw_no ? paymentAdd.draw_no : ''} type='text' className='item_input names' />
            </div>
        </div>
        <div className="col-12 row mx-0 my-1 px-0">
            <div className='mx-0 px-0 col-3'>
                Cheque Date
            </div>
            <div className='mx-0 px-0 col-6'>
                <input onChange={handleChange} name='cheque_date' value={paymentAdd.cheque_date ? paymentAdd?.cheque_date?.slice(0,10) : ''} type='date' className='item_input names bg-dark text-light' />
            </div>
            <span className="col-3" />
        </div>
    </div>
  )
}

export default PaymentChequeDetails
