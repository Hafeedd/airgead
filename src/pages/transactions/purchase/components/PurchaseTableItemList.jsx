import React from 'react'
import { Modal } from 'react-bootstrap'

const PurchaseTableItemList = () => {
  return (
    <div>
        <Modal
        contentClassName=""
        dialogClassName=''
        show={''}
        size='lg'
        centered
        onHide={''}
        >
            <Modal.Body>
                <div>
                  <table className="table"> 
                        <thead>
                          <tr>
                            <th className='text-start'>Column Name</th>
                            <th>Visible</th>
                            <th>Readonly</th>
                            <th>Skipping</th>
                            <th>Breakpoint</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className='text-start ps-3'>Item Number 1</td>
                            <td className='clr'>No</td>
                            <td className='clr'>No</td>
                            <td className='clr'>No</td>
                            <td className='clr'>No</td>
                            <td>^</td>
                          </tr>
                          <tr>
                            <td className='text-start ps-3'>Item Number 1</td>
                            <td>No</td>
                            <td>No</td>
                            <td>No</td>
                            <td>No</td>
                            <td>^</td>
                          </tr>
                          <tr>
                            <td className='text-start ps-3'>Item Number 1</td>
                            <td>No</td>
                            <td>No</td>
                            <td>No</td>
                            <td>No</td>
                            <td>^</td>
                          </tr>
                          <tr>
                            <td className='text-start ps-3'>Item Number 1</td>
                            <td>No</td>
                            <td>No</td>
                            <td>No</td>
                            <td>No</td>
                            <td>^</td>
                          </tr>
                          <tr>
                            <td className='text-start ps-3'>Item Number 1</td>
                            <td>No</td>
                            <td>No</td>
                            <td>No</td>
                            <td>No</td>
                            <td>^</td>
                          </tr>
                          <tr>
                            <td className='text-start ps-3'>Item Number 1</td>
                            <td>No</td>
                            <td>No</td>
                            <td>No</td>
                            <td>No</td>
                            <td>^</td>
                          </tr>
                          <tr>
                            <td className='text-start ps-3'>Item Number 1</td>
                            <td>No</td>
                            <td>No</td>
                            <td>No</td>
                            <td>No</td>
                            <td>^</td>
                          </tr>
                          
                        </tbody>
                    </table>
                </div>
            </Modal.Body>

        </Modal>
    </div>
  )
}

export default PurchaseTableItemList