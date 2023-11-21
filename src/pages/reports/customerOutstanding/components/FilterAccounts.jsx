import React from 'react'
import minus from '../../../../assets/icons/minus.png'
import { useLocation } from 'react-router'

const FilterAccounts = () => {

    const location = useLocation().pathname
    const removeRow = () => {

    }
    
    return (
        <div>
            <label className='row bg-dark text-light mx-0 p-3 rounded-top-2' style={{ position: 'sticky', top: 0 }}>Filter Accounts</label>
            <div style={{ height: '24rem', overflow: 'hidden', overflowY: 'scroll'}} className='rounded-bottom-2 border m-3'>
                <table className='w-100 mx-0' >
                    <thead style={{ position: 'sticky', top: 0}}>
                        <tr className='text-light bg-secondary '>
                            <th>Parameters</th>
                            <th>Filter By</th>
                            <th><button className='btn btn-sm btn-dark'>ADD</button></th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr className='text-dark bg-light '>
                            {location === '/customer-outstandings' ?
                                < td > <select name="" id="" className='btn btn-md rounded-2 border border-dark'>
                                    <option value="">Route</option>
                                    <option value="">City</option>
                                    <option value="">Town</option>
                                    <option value="">District</option>
                                    <option value="">Care of</option>
                                    <option value="">Company</option>
                                </select></td>
                                : location === '/supplier-outstandings' ? <td>
                                    <span value='company'>Company</span>
                                </td> : <td>
                                    <span value='company'>Designation</span>
                                </td>}

                            <td>
                                <select name="" id="" className='btn btn-md rounded-2 border border-dark bg-secondary text-light'>
                                    <option value="">check1</option>
                                    <option value="">check2</option>
                                </select>
                            </td>
                            <td><img src={minus} alt="" onClick={removeRow} /></td>
                        </tr>


                        <tr className='text-dark bg-light '>
                            {location  === '/customer-outstandings' ?
                                < td > <select name="" id="" className='btn btn-md rounded-2 border border-dark'>
                                    <option value="">Route</option>
                                    <option value="">City</option>
                                    <option value="">Town</option>
                                    <option value="">District</option>
                                    <option value="">Care of</option>
                                    <option value="">Company</option>
                                </select></td>
                                : location === '/supplier-outstandings' ? <td>
                                    <span value='company'>Company</span>
                                </td> : <td>
                                    <span value='company'>Designation</span>
                                </td>}

                            <td>
                                <select name="" id="" className='btn btn-md rounded-2 border border-dark bg-secondary text-light'>
                                    <option value="">check1</option>
                                    <option value="">check2</option>
                                </select>
                            </td>
                            <td><img src={minus} alt="" onClick={removeRow} /></td>
                        </tr>


                        <tr className='text-dark bg-light '>
                            {location === '/customer-outstandings' ?
                                < td > <select name="" id="" className='btn btn-md rounded-2 border border-dark'>
                                    <option value="">Route</option>
                                    <option value="">City</option>
                                    <option value="">Town</option>
                                    <option value="">District</option>
                                    <option value="">Care of</option>
                                    <option value="">Company</option>
                                </select></td>
                                : location === '/supplier-outstandings' ? <td>
                                    <span value='company'>Company</span>
                                </td> : <td>
                                    <span value='company'>Designation</span>
                                </td>}

                            <td>
                                <select name="" id="" className='btn btn-md rounded-2 border border-dark bg-secondary text-light'>
                                    <option value="">check1</option>
                                    <option value="">check2</option>
                                </select>
                            </td>
                            <td><img src={minus} alt="" onClick={removeRow} /></td>
                        </tr>
                    </tbody>
                    <tfoot></tfoot>
                </table>
            </div>
        </div >
    )
}

export default FilterAccounts