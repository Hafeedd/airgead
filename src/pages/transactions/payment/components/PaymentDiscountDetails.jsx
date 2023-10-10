import React from 'react'

const PaymentDiscountDetails = ({handleChange, paymentAdd}) => {
  return (
    <div className="col-12 row mx-0 p-5 pt-3 payment-detail-container">
        <div className="col-12 row mx-0 mb-1 px-0">
            <div className='mx-0 px-0 col-3'>
                Discount
            </div>
            <div className='mx-0 px-0 col-5 col-6'>
                <input onChange={handleChange} name='discount' value={paymentAdd.discount ? paymentAdd.discount : ''} type='number' className='item_input names bg-dark text-light' />
            </div>
            <span className="col-3 col-4" />
        </div>
        <span className="col-12 my-3" />
    </div>
  )
}

export default PaymentDiscountDetails
