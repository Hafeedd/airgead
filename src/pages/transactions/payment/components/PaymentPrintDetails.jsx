import React from 'react'

const PaymentPrintDetails = ({handleChange, paymentAdd}) => {
  return (
    <div className="col-12 row mx-0 p-5 py-3 payment-detail-container">
        <div className="col-12 row mx-0 mb-1 px-0">
            <div className='mx-0 px-0 col-3'>
                Style
            </div>
            <div className='mx-0 px-0 col-9'>
                <input onChange={handleChange} name='print_style' value={paymentAdd.print_style ? paymentAdd.print_style : ''} type='text' className='item_input names' />
            </div>
        </div>
        <div className="col-12 row mx-0 my-1 px-0">
            <div className='mx-0 px-0 col-3'>
                Printer
            </div>
            <div className='mx-0 px-0 col-9'>
                <input onChange={handleChange} name='printer' value={paymentAdd.printer ? paymentAdd.printer : ''} type='text' className='item_input names' />
            </div>
        </div>
        <div className="col-12 row mx-0 my-1 px-0">
            <div className='mx-0 px-0 col-3'>
                Print Copies
            </div>
            <div className='mx-0 px-0 col-2'>
                <input onChange={handleChange} name='print_copies' value={paymentAdd.print_copies ? paymentAdd.print_copies : ''} type='number' className='item_input arrow names' />
            </div>
            <span className="col-2" />            
            <div className="col-5 d-flex align-items-center row mx-0 px-0">
                <div className='mx-0 px-0 col-6 d-flex align-items-center justify-content-end'>
                    <input type='checkbox' onChange={handleChange} name='Preview' checked={paymentAdd.print_preview}/>
                    <label htmlFor='Preview' className='ps-2'>Preview</label>
                </div>
                <div className='mx-0 px-0 col-6 d-flex align-items-center justify-content-end'>
                    <input type='checkbox' onChange={handleChange} name='Print' checked={paymentAdd.print}/>
                    <label htmlFor='Print' className='ps-2'>Print</label>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PaymentPrintDetails
