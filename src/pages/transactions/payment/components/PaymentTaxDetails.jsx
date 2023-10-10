import React from 'react'

const PaymentTaxDetails = ({ handleChange, paymentAdd, setPaymentAdd }) => {
    return (
        <div className="col-12 row mx-0 p-5 py-3 payment-detail-container">
            <div className="d-flex align-items-center px-0 row mx-0 mb-1">
                <div className="col-6 row mx-0 px-0 pe-4">
                    <div className='mx-0 px-0 col-5'>
                        Tax %
                    </div>
                    <div className='mx-0 px-0 col-7'>
                        <input onChange={handleChange} name='tax_percent' value={paymentAdd.tax_percent ? paymentAdd.tax_percent : ''} type='text' className='item_input names' />
                    </div>
                </div>
                <div className="col-6 row ps-4 mx-0 px-0">
                    <div className='mx-0 px-0 col-5'>
                        Taxable
                    </div>
                    <div className='mx-0 px-0 col-7'>
                        <input onChange={handleChange} name='taxable' value={paymentAdd.taxable ? paymentAdd.taxable : ''} type='text' className='item_input names' />
                    </div>
                </div>
            </div>
            <div className="col-12 row mx-0 my-1 px-0">
                <div className='mx-0 px-0 col-2'>
                    <div
                        className={`btn btn-sm btn-secondary py-0 px-4 ${paymentAdd?.tax_type === "GST" && "active"}`}
                        onClick={() => setPaymentAdd(data => ({ ...data, ['tax_type']: 'GST' }))}
                    >GST</div>
                </div>
                <div className='mx-0 px-0 col-2'>
                    <div
                        className={`btn btn-sm btn-secondary py-0 px-4 ${paymentAdd?.tax_type === "VAT" && "active"}`}
                        onClick={() => setPaymentAdd(data => ({ ...data, ['tax_type']: 'VAT' }))}
                    >VAT</div>
                </div>
                <span className='col-8' />
            </div>
            {paymentAdd.tax_type === 'GST' ?
                <div className="d-flex align-items-center px-0 row mx-0 my-1">
                    <div className="col-6 row mx-0 px-0 pe-4">
                        <div className='mx-0 px-0 col-5'>
                            CGST
                        </div>
                        <div className='mx-0 px-0 col-7'>
                            <input onChange={handleChange} name='cgst' value={paymentAdd.cgst ? paymentAdd.cgst : ''} type='text' className='item_input names' />
                        </div>
                    </div>
                    <div className="col-6 row ps-4 mx-0 px-0">
                        <div className='mx-0 px-0 col-5'>
                            SGST
                        </div>
                        <div className='mx-0 px-0 col-7'>
                            <input onChange={handleChange} name='sgst' value={paymentAdd.sgst ? paymentAdd.sgst : ''} type='text' className='item_input names' />
                        </div>
                    </div>
                </div> :
                <div className="d-flex align-items-center px-0 row mx-0 my-1">
                    <div className="col-6 row mx-0 px-0 pe-4">
                        <div className='mx-0 px-0 col-5'>
                            Tax Amount
                        </div>
                        <div className='mx-0 px-0 col-7'>
                            <input onChange={handleChange} name='tax_amount' value={paymentAdd.tax_amount ? paymentAdd.tax_amount : ''} type='text' className='item_input names' />
                        </div>
                    </div>
                    <span className="col-6" />
                </div>
            }
        </div>
    )
}

export default PaymentTaxDetails
