import React, { useEffect } from 'react'
import './accountInitialize.css'
import useBaseServices from '../../services/master/baseServices'

const AccountInitializes = () => {


   return (
      <div className='main-page'>
         <h4 className='p-3'>Account Initialize</h4>
         <span className='px-4'>Initialize</span> <span className=''>|</span>
         <button className='ms-4 p-2 rounded'>Select All</button>
         <div className='border border border-3 black rounded m-3'>
            <div className="row mt-3 m-4">
               <div className="col radio-box me-3">
                  <div className='d-flex align-item-center'>
                     <input className='me-2' type="radio" />
                     <span className=''> Accounts</span>
                  </div>
               </div>
               <div className="col radio-box me-3">
                  <div className='d-flex align-item-center'>
                     <input className='me-2' type="radio" />
                     <span className=''> Customer</span>
                  </div>
               </div>
               <div className="col radio-box me-3">
                  <div className='d-flex align-item-center'>
                     <input className='me-2' type="radio" />
                     <span className=''> Supplier</span>
                  </div>
               </div>
               <div className="col radio-box me-3">
                  <div className='d-flex align-item-center'>
                     <input className='me-2' type="radio" />
                     <span className=''> Staff</span>
                  </div>
               </div>
               <div className="col radio-box me-3">
                  <div className='d-flex align-item-center'>
                     <input className='me-2' type="radio" />
                     <span className=''> Items</span>
                  </div>
               </div>
               <div className="col radio-box me-3">
                  <div className='d-flex align-item-center'>
                     <input className='me-2' type="radio" />
                     <span className=''> Purchase</span>
                  </div>
               </div>
               <div className="col radio-box me-3">
                  <div className='d-flex align-item-center'>
                     <input className='me-2' type="radio" />
                     <span className=''> Purchase Return </span>
                  </div>
               </div>
            </div>

            <div className="row mt-3 m-4">
               <div className="col radio-box me-3">
                  <div className='d-flex align-item-center'>
                     <input className='me-2' type="radio" />
                     <span className=''> Purchase Order</span>
                  </div>
               </div>
               <div className="col radio-box me-3">
                  <div className='d-flex align-item-center'>
                     <input className='me-2' type="radio" />
                     <span className=''> Sales</span>
                  </div>
               </div>
               <div className="col radio-box me-3">
                  <div className='d-flex align-item-center'>
                     <input className='me-2' type="radio" />
                     <span className=''> Sales Return</span>
                  </div>
               </div>
               <div className="col radio-box me-3">
                  <div className='d-flex align-item-center'>
                     <input className='me-2' type="radio" />
                     <span className=''> Sales Order</span>
                  </div>
               </div>
               <div className="col radio-box me-3">
                  <div className='d-flex align-item-center'>
                     <input className='me-2' type="radio" />
                     <span className=''> Production</span>
                  </div>
               </div>
               <div className="col radio-box me-3">
                  <div className='d-flex align-item-center'>
                     <input className='me-2' type="radio" />
                     <span className=''> Accounts Journal</span>
                  </div>
               </div>
               <div className="col radio-box me-3">
                  <div className='d-flex align-item-center'>
                     <input className='me-2' type="radio" />
                     <span className=''> Stock Journal</span>
                  </div>
               </div>
            </div>

            <div className="row mt-3 m-4 mb-5">
               <div className="col radio-box me-3">
                  <div className='d-flex align-item-center'>
                     <input className='me-2' type="radio" />
                     <span className=''> Cheque Register</span>
                  </div>
               </div>
               <div className="col radio-box me-3">
                  <div className='d-flex align-item-center'>
                     <input className='me-2' type="radio" />
                     <span className=''> Receipt</span>
                  </div>
               </div>
               <div className="col radio-box me-3">
                  <div className='d-flex align-item-center'>
                     <input className='me-2' type="radio" />
                     <span className=''> Payment</span>
                  </div>
               </div>
               <div className="col radio-box me-3">
                  <div className='d-flex align-item-center'>
                     <input className='me-2' type="radio" />
                     <span className=''> Pay Roll</span>
                  </div>
               </div>
               <div className="col radio-box me-3">
                  <div className='d-flex align-item-center'>
                     <input className='me-2' type="radio" />
                     <span className=''> Daybook</span>
                  </div>
               </div>
               <div className="col radio-box me-3">
                  <div className='d-flex align-item-center'>
                     <input className='me-2' type="radio" />
                     <span className=''> Barcode</span>
                  </div>
               </div>
               <div className="col radio-box me-3">
                  <div className='d-flex align-item-center'>
                     <input className='me-2' type="radio" />
                     <span className=''> Batch</span>
                  </div>
               </div>
            </div>

         </div>
         <div className='m-5 d-flex justify-content-end'>
            <button style={{ background: "rgba(112, 112, 112, 1)" }} className='btn text-white px-5 me-3 mb-3'>Cancel</button>
            <button style={{ background: "rgba(74, 0, 168, 1)" }} className='btn text-white px-5 mb-3'>Submit</button>
         </div>

      </div>
   )
}

export default AccountInitializes