import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/sidebar/Sidebar'
import { useCompanyServices } from '../../../services/controller/companyServices'
import Swal from 'sweetalert2'
import { permissions } from '../data/initialData'
import { useNavigate } from 'react-router'

export const CompanyPermission = (props) => {
    const { moduleCodeList, setModuleCodeList, companyId, edit, setEdit, setCompanyId, setActive, } = props
    const [page, setPage] = useState({ main: 'transaction', sub: 'Sales' })
    const [permCodes, setpermCodes] = useState({})

    const { postCompanyPermission } = useCompanyServices()
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let resp
            var companyPermissions = []
            Object.keys(permCodes).forEach(x =>
                permCodes[x].forEach(y => companyPermissions.push({ code: y, is_active: 'false' }))
            )
            let tempCompanyModuleList = moduleCodeList.map(data => ({ code: data, "is_active": true }))
            if (!edit) resp = await postCompanyPermission(companyId,
                {
                    activity_permissions: companyPermissions,
                    module_permissions: tempCompanyModuleList
                })
            if (resp?.success) {
                Swal.fire('Success', '', 'success')
                setCompanyId(false)
                setEdit(false)
                setModuleCodeList([])
                setpermCodes([])
                setActive(1)
                navigate('/')
            }
        } catch (err) {
            console.log(err)
            var message = err?.response?.data?.message || "Something went wrong pls try again later !"
            if (err?.response?.data?.errors) {
                message = Object.values(err.response.data?.errors)[0]
            }
            Swal.fire('Error', message, 'error')
        }
    }

    return (
        <div className='h-100'>
            <div className='action-bar'>
                <div className="action-bar-item active">View</div>
                {/* <div className="action-bar-item">Action</div> */}
                <div className="action-bar-item">Rules</div>
            </div>
            <div className='permission-cont rounded-start'>
                <Sidebar perm="true" setPage={setPage} />
                <div className='w-100 ps-4 pt-2 permission-list1'>
                    <h3>{page?.sub && page?.sub?.split('-').join(' ')}</h3>
                    <div className='permission-list2'>
                        {Object.keys(permissions[page.sub] || {})?.map((data, key1) => {
                            let checkedAll = permCodes[data]?.filter(x => permissions[page.sub][data].filter(y => y.code == x).length > 0).length > 0 ? false : true
                            const handleCheckAll = () => {
                                let listToAdd = []
                                if (checkedAll) {
                                    listToAdd = permissions[page.sub][data]?.map(x => x.code)
                                }
                                setpermCodes({ ...permCodes, [data]: listToAdd })

                            }
                            return (
                                <div className='permission-list3'>
                                    <div className='d-flex align-items-center'>{data} &emsp;
                                        <div className='check-all-permission'>
                                            <input
                                                // checked={flag}
                                                checked={checkedAll}
                                                onClick={handleCheckAll}
                                                className='permission-checkbox' type='checkbox' />
                                        </div>
                                    </div>
                                    <div className='permission-list4'>
                                        {permissions[page.sub][data].map((items, key) => {
                                            const handleCheckPerm = () => {
                                                let tempPermCodes = []
                                                if (permCodes[data]?.length > 0)
                                                    tempPermCodes = [...permCodes[data]]
                                                let ind = tempPermCodes.findIndex(x => x === items.code)
                                                if (ind > -1) {
                                                    tempPermCodes.splice(ind, 1)
                                                } else tempPermCodes.push(items.code)
                                                setpermCodes({ ...permCodes, [data]: [...tempPermCodes] })
                                            }
                                            return (
                                                <div className='permission-list5'>
                                                    <label htmlFor={'perm-check' + key1 + key}
                                                        className="permission-checkbox-cont">
                                                        <input checked={permCodes[data]?.findIndex(x => x === items.code) < 0 ? true : !permCodes[data] && true}
                                                            onClick={handleCheckPerm} id={'perm-check' + key1 + key}
                                                            className='permission-checkbox' type='checkbox' />
                                                        <div className='permission-checkbox-text'>
                                                            {items.name}
                                                        </div>
                                                    </label>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            </div>
            <div className='w-100 d-flex justify-content-end mt-1'>
                <div onClick={() => setActive(2)} className="btn comp-module-btn previous px-5 m-1 fs-5 py-1">Previous</div>
                <div onClick={handleSubmit} className="btn comp-module-btn px-5 m-1 fs-5 py-1">Done</div>
            </div>
        </div>
    )
}