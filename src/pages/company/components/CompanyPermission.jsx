import React, { useState } from 'react'
import { Outlet } from 'react-router'
import Sidebar from '../../../components/sidebar/Sidebar'
import { ItemAddForm } from '../../master/item/components/AddForm'

export const CompanyPermission = () => {
    const [page, setPage] = useState({ main: 'transaction', sub: 'Sales' })
    const permissions =
    {
        Sales: [
            {
                'Main Action': [
                    { key: 1, name: "Sales List", code: 1001, module: 101 },
                    { key: 2, name: "Sales Add", code: 1002, module: 101 },
                    { key: 3, name: "Sales Edit", code: 1003, module: 101 },
                    { key: 4, name: "Sales Delete", code: 1004, module: 101 },
                ]
            },
            {
                'Sales Item Add': [
                    { key: 5, name: "Delete", code: 1005, parent: 1002, module: 101 },
                    { key: 6, name: "Edit", code: 1006, parent: 1002, module: 101 },
                    { key: 7, name: "Add", code: 1007, parent: 1002, module: 101 },
                    { key: 8, name: "customer details", code: 1008, parent: 1002, module: 101 },
                    { key: 9, name: "invoice details", code: 1009, parent: 1002, module: 101 },
                    { key: 10, name: "delivery details", code: 1010, parent: 1002, module: 101 },
                ]
            },
            {
                'On Edit': [
                    { key: 11, name: "Item delete", code: 1011, parent: 1003, module: 101 },
                    { key: 12, name: "Item edit", code: 1012, parent: 1003, module: 101 },
                    { key: 13, name: "Item add", code: 10013, parent: 1003, module: 101 }, ,
                    { key: 14, name: "customer details", code: 1014, parent: 1003, module: 101 },
                    { key: 15, name: "invoice details", code: 1015, parent: 1003, module: 101 },
                    { key: 16, name: "delivery details", code: 1016, parent: 1003, module: 101 },
                ]
            }
        ]
    }

    return (
        <div className='h-100'>
            <div className='action-bar'>
                <div className="action-bar-item active">View</div>
                <div className="action-bar-item">Action</div>
                <div className="action-bar-item">Rules</div>
            </div>
            <div className='permission-cont rounded-start'>
                <Sidebar perm="true" />
                <div className='w-100 ps-4 pt-2 permission-list1'>
                    <h3>{page.sub}</h3>
                    <div className='permission-list2'>

                        {permissions[page.sub].map((data, key1) => {
                            return (
                                <div className='permission-list3'>
                                    <div>{Object.keys(data)[0]}</div>
                                    <div className='permission-list4'>
                                        {Object.values(data)[0].map((items, key) => (
                                            <div className='permission-list5'>
                                                <label htmlFor={'perm-check' + key1 + key}
                                                    className="permission-checkbox-cont">
                                                    <input id={'perm-check' + key1 + key}
                                                        className='permission-checkbox' type='checkbox' />
                                                    <div className='permission-checkbox-text'>
                                                        {items.name}
                                                    </div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            </div>
            <div className='w-100 d-flex justify-content-end mt-1'>
            <div className="btn comp-module-btn previous px-5 m-1 fs-5 py-1">Previous</div>
            <div className="btn comp-module-btn px-5 m-1 fs-5 py-1">Done</div>
            </div>
        </div>
    )
}