import React from 'react'

const SalesTable = ({ setSalesItemModal }) => {
    return (
        <>
            <div className='px-2'>
                <table className='table table-secondary purchase-table mb-0'>
                    <thead className='purchase-table-header'>
                        <tr>
                            <th className='text-start' colSpan={2}>Item Name</th>
                            <th>Qty</th>
                            <th>Ut</th>
                            <th>Rate</th>
                            <th>Disc%</th>
                            <th>Disc</th>
                            <th>Value</th>
                            <th>Tax</th>
                            <th>CGST/IGST</th>
                            <th>SGST</th>
                            <th>Total</th>
                            <th>Cost</th>
                            <th>Margin%</th>
                            <th>S.Rate</th>
                            <th className='py-1 text-end'>
                                <div className='btn btn-primary purchase-add-btn my-0' onClick={() => setSalesItemModal(true)}>
                                    +
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className='purchase-table-body'>
                        <tr>
                            <td className='text-start ps-3' colSpan={2}>Item Number 1</td>
                            <td>01.0</td>
                            <td>0.0</td>
                            <td>102.</td>
                            <td>10%</td>
                            <td>10%</td>
                            <td>00.0</td>
                            <td>12.0</td>
                            <td>5.0</td>
                            <td>2.0</td>
                            <td>01.0</td>
                            <td>545</td>
                            <td>540</td>
                            <td>540</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td className='text-start ps-3' colSpan={2}>Item Number 1</td>
                            <td>01.0</td>
                            <td>0.0</td>
                            <td>102.</td>
                            <td>10%</td>
                            <td>10%</td>
                            <td>00.0</td>
                            <td>12.0</td>
                            <td>5.0</td>
                            <td>2.0</td>
                            <td>01.0</td>
                            <td>545</td>
                            <td>540</td>
                            <td>540</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td className='text-start ps-3' colSpan={2}>Item Number 1</td>
                            <td>01.0</td>
                            <td>0.0</td>
                            <td>102.</td>
                            <td>10%</td>
                            <td>10%</td>
                            <td>00.0</td>
                            <td>12.0</td>
                            <td>5.0</td>
                            <td>2.0</td>
                            <td>01.0</td>
                            <td>545</td>
                            <td>540</td>
                            <td>540</td>
                            <td></td>
                        </tr>
                        <tr><td style={{ height: "2.5rem" }} colSpan={16}></td></tr>
                        <tr className='purchase-table-green'>
                            <td className='item2'>
                                {'<'} Previous
                            </td>
                            <td className='item3 px-3'>
                                Next {'>'}
                            </td>
                            <td className='item'>01.0</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className='item'>10%</td>
                            <td className='item'>00.0</td>
                            <td></td>
                            <td className='item'>5.0</td>
                            <td className='item'>2.0</td>
                            <td className='item'>01.0</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="sales-detail-container mx-2 mt-1">
                <div className="col-2 col-3 mx-0 item">
                    <div className="col-4">Total Item</div>
                    <div className="col-1">:</div>
                    <div className="col-7">03</div>
                </div>
                <div className="col-1 col-2 mx-0 item">
                    <div className="col-4">PR</div>
                    <div className="col-1">:</div>
                    <div className="col-7">323</div>
                </div>
                <div className="col-1 col-2 mx-0 item">
                    <div className="col-4">CT</div>
                    <div className="col-1">:</div>
                    <div className="col-7">234.1</div>
                </div>
                <div className="col-1 col-2 mx-0 item">
                    <div className="col-4">MIN</div>
                    <div className="col-1">:</div>
                    <div className="col-7">0</div>
                </div>
                <div className="col-1 col-2 mx-0 item">
                    <div className="col-4">SR</div>
                    <div className="col-1">:</div>
                    <div className="col-7">500</div>
                </div>
                <div className="col-2 mx-0 item">
                    <div className="col-4">MRP</div>
                    <div className="col-1">:</div>
                    <div className="col-7">600</div>
                </div>
                <div className="col-1 col-2 mx-0 item">
                    <div className="col-4">IM</div>
                    <div className="col-1">:</div>
                    <div className="col-7">.00</div>
                </div>
            </div>
        </>
    )
}

export default SalesTable
