import React from 'react'
import PurchaseTableItemList from './PurchaseTableItemList'

const PurchaseTable = () => {
    return (
        <>
            <div className='px-2'>
                <table className='table table-secondary purchase-table mb-0'>
                    <thead className='purchase-table-header'>
                        <tr>
                            <th className='text-start'>Item Name</th>
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
                            <th >+</th>
                        </tr>
                    </thead>
                    <tbody className='purchase-table-body'>
                        <tr>
                            <td className='text-start ps-3'>Item Number 1</td>
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
                            <td><PurchaseTableItemList/></td>
                        </tr>
                        <tr>
                            <td className='text-start ps-3'>Item Number 1</td>
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
                            <td className='text-start ps-3'>Item Number 1</td>
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
                        <tr><td style={{ height: "2.5rem" }} colSpan={15}></td></tr>
                        <tr className='purchase-table-green'>
                            <td></td>
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
            <div className="purchase-detail-container px-3 py-1 mx-2 mt-1">
                <div className="col-3 col-4 row mx-0">
                    <div className="col-5 text-end">Total Item :</div>
                    <div className="col-7">03</div>
                </div>
                <div className="col-3 col-4 row mx-0">
                    <div className="col-5 text-end">Item :</div>
                    <div className="col-7">323</div>
                    <div className="col-5 text-end">HSN :</div>
                    <div className="col-7">323</div>
                </div>
                <div className="col-2 row mx-0">
                    <div className="col-5 text-end">CTC :</div>
                    <div className="col-7">0.22</div>
                </div>
                <div className="col-2 row mx-0">
                    <div className="col-5 text-end">Godown :</div>
                    <div className="col-7"></div>
                </div>
                <div className="col-1">M %</div>
            </div>
        </>
    )
}

export default PurchaseTable
