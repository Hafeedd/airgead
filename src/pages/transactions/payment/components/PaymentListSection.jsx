import React from 'react'
import search from "../../../../assets/icons/search.png"

const PaymentListSection = (props) => {
    const { list, handleEdit, handleDelete,confirmDelete,
        payReciptList, setPayRecieptList, toEdit, paymentAdd } = props

    const editBtn = (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20.9521 3.04801C20.2811 2.37702 19.371 2.00006 18.4221 2.00006C17.4732 2.00006 16.5631 2.37702 15.8921 3.04801L3.94011 15C3.5339 15.4062 3.24832 15.9172 3.11511 16.476L2.02011 21.078C1.99046 21.2027 1.99324 21.3328 2.02819 21.4561C2.06313 21.5794 2.12907 21.6916 2.21972 21.7822C2.31037 21.8727 2.42271 21.9385 2.54601 21.9734C2.66932 22.0082 2.79949 22.0108 2.92411 21.981L7.52511 20.885C8.0843 20.752 8.5956 20.4664 9.00211 20.06L20.9521 8.11C21.6231 7.439 22.0001 6.52894 22.0001 5.58C22.0001 4.63107 21.6231 3.72101 20.9521 3.05V3.04801ZM16.9521 4.108C17.1452 3.91496 17.3743 3.76183 17.6266 3.65736C17.8788 3.55288 18.1491 3.49911 18.4221 3.49911C18.6951 3.49911 18.9654 3.55288 19.2177 3.65736C19.4699 3.76183 19.6991 3.91496 19.8921 4.108C20.0852 4.30105 20.2383 4.53022 20.3428 4.78245C20.4472 5.03467 20.501 5.305 20.501 5.57801C20.501 5.85101 20.4472 6.12134 20.3428 6.37356C20.2383 6.62579 20.0852 6.85496 19.8921 7.04801L19.0001 7.939L16.0601 5.00001L16.9521 4.10901V4.108ZM15.0001 6.06201L17.9401 9L7.94011 19C7.73011 19.21 7.46611 19.357 7.17711 19.426L3.76111 20.24L4.57411 16.824C4.64311 16.534 4.79111 16.27 5.00111 16.06L15.0001 6.06001V6.06201Z" fill="#4E4E4E" stroke="#4E4E4E" stroke-width="0.5" />
        </svg>
    )

    return (
        <div className='payment-table-container p-0 mt-1' style={{ borderRadius: "0.3125rem 0.3125rem 0rem 0rem" }}>
            <div className="payment-table-card">
                <table className='table table-light table-hover payment-table'>
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th className='ps-4' style={{ width: "10rem" }}>A/C Code</th>
                            <th style={{ width: "18rem" }}>A/C Name</th>
                            <th>Type</th>
                            <th style={{ width: "15rem" }}>Naration</th>
                            <th style={{ borderRight: '0px', width: "10%" }} className='ps-1 pe-0'>
                                <div className='item_seach_bar_cont rounded-2 px-0 pe-1 mx-0' style={{ height: "2.0625rem", width: "fit-content" }}>
                                    <img src={search} className='search_img ms-3 py-2' />
                                    <input
                                        className='item_search_bar rounded-2 border-0 py-1 px-1'
                                        style={{ height: "2rem", }}
                                        placeholder='Search'
                                        type='text'
                                    />
                                </div>
                            </th>
                            <th style={{ borderRight: '0px', width: '5rem' }} className='end'>
                                <div className="btn btn-sm btn-secondary filter-btn px-3">
                                    Filter
                                </div>
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>        
                        {
                        payReciptList?.length > 0 ?
                        payReciptList.map((data, i) => {
                                return (
                                    <tr>
                                        <td>{i + 1}</td>
                                        <td className='text-start'>{data?.account_code}</td>
                                        <td className='text-start'>{data?.account_detail}</td>
                                        <td className='text-start'>{paymentAdd?.method}</td>
                                        <td>{data?.narration}</td>
                                        <td></td>
                                        <td>
                                            <div className='button' onClick={e => handleEdit(data)}>
                                                {editBtn}
                                            </div>
                                        </td>
                                        {/* <td>
                                            <div className='button' onClick={e => confirmDelete(data.id)}>
                                                {editBtn}
                                            </div>
                                        </td> */}
                                    </tr>
                                )
                            }) :
                            <tr>
                                <td className='fs-5 text-center' colspan={6}>No Purchase Added Yet</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PaymentListSection
