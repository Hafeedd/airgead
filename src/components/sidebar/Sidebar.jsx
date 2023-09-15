import './sidebar.css'
import Transaction from '../../assets/icons/transaction.svg'
import Reports from '../../assets/icons/reports.svg'
import User from '../../assets/icons/user.svg'
import { useState } from 'react'
import { useNavigate } from 'react-router'

const Sidebar = () => {
    const [masterActive, setMasterActive] = useState(false)
    const [ArrowActive, setArrowActive] = useState(false)
    const [ReportsActive, setReportsActive] = useState(false)

    const navigate = useNavigate()
    return(
        <div className="sidebar pt-2">
            <div className="CompanyLogo rounded-5 py-2 mb-5">
                
            </div>
            <div className='SidebarItems mt-0 mt-5'>
                <div onClick={()=>setMasterActive(!masterActive)} className={`SidebarItem mb-1 ${masterActive && "active"}`}>
                    <img src={User} className='sidebar_icon' width={"25px"}/>Master</div>
                <div className={`sidebar_span_cont ${!masterActive && "d-none"}`}>
                    <span className='SidebarSpan d-flex ms-5 ps-3'>
                        <div className='SidebarItemText'>Accounts</div>
                    </span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'>
                        <div className='SidebarItemText' onClick={()=>navigate('/customer-master')}>Customer</div>
                    </span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'>
                        <div className='SidebarItemText' onClick={()=>navigate('/supplier-master')}>Supplier</div>
                    </span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'>
                        <div className='SidebarItemText'>Staff</div>
                    </span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'>
                        <div className='SidebarItemText'>Vehichle</div>
                    </span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'>
                        <div className='SidebarItemText' onClick={()=>navigate('/')}>Items</div>
                    </span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'>
                        <div className='SidebarItemText'>Route</div>
                    </span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'>
                        <div className='SidebarItemText'>City</div>
                    </span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'>
                        <div className='SidebarItemText'>Town</div>
                    </span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'>
                        <div className='SidebarItemText'>District</div>
                    </span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'>
                        <div className='SidebarItemText'>Bill Payment</div>
                    </span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'>
                        <div className='SidebarItemText'>Counter</div>
                    </span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'>
                        <div className='SidebarItemText'>User</div>
                    </span>
                </div>
             
                <div onClick={()=>setReportsActive(!ReportsActive)} className={`SidebarItem mt-3 mb-1 ${ReportsActive && "active"}`}>
                    <img className='sidebar_icon' src={Transaction} width={"20px"}/>Transactions</div>
                <div className={`sidebar_span_cont ${!ReportsActive && "d-none"}`}>
                    <span className='SidebarSpan d-flex ms-5 ps-3'>
                        <div className='SidebarItemText'>Accounts</div>
                    </span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'>
                        <div className='SidebarItemText' onClick={()=>navigate('/purchase-transaction')}>Purchase</div>
                    </span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'>
                        <div className='SidebarItemText' onClick={()=>navigate('/staff-transaction')}>Staff</div>
                    </span>
                    {/* <span className='SidebarSpan d-flex ms-5 ps-3'>
                        <div className='SidebarItemText'>Supplier</div>
                    </span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'>
                        <div className='SidebarItemText'>Staff</div>
                    </span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'>
                        <div className='SidebarItemText'>Vehichle</div>
                    </span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'>
                        <div className='SidebarItemText'>Items</div>
                    </span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'>
                        <div className='SidebarItemText'>Route</div>
                    </span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'>
                        <div className='SidebarItemText'>City</div>
                    </span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'>
                        <div className='SidebarItemText'>Town</div>
                    </span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'>
                        <div className='SidebarItemText'>District</div>
                    </span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'>
                        <div className='SidebarItemText'>Bill Payment</div>
                    </span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'>
                        <div className='SidebarItemText'>Counter</div>
                    </span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'>
                        <div className='SidebarItemText'>User</div>
                    </span> */}
                </div>
                
                <div onClick={()=>setArrowActive(!ArrowActive)} className={`SidebarItem mt-3 mb-3 ${ArrowActive && "active"}`}>
                    <img src={Reports} width={"18px"}/>Reports</div>
                <div className={`sidebar_span_cont ${!ArrowActive && "d-none"}`}>
                    <span className='SidebarSpan d-flex ms-5 ps-3'>
                        <div className='SidebarItemText'>Accounts</div>
                    </span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'>
                        <div className='SidebarItemText'>Customer</div>
                    </span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'>
                        <div className='SidebarItemText'>Supplier</div>
                    </span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'>
                        <div className='SidebarItemText'>Staff</div>
                    </span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'>
                        <div className='SidebarItemText'>Vehichle</div>
                    </span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'>
                        <div className='SidebarItemText'>Items</div>
                    </span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'>
                        <div className='SidebarItemText'>Route</div>
                    </span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'>
                        <div className='SidebarItemText'>City</div>
                    </span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'>
                        <div className='SidebarItemText'>Town</div>
                    </span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'>
                        <div className='SidebarItemText'>District</div>
                    </span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'>
                        <div className='SidebarItemText'>Bill Payment</div>
                    </span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'>
                        <div className='SidebarItemText'>Counter</div>
                    </span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'>
                        <div className='SidebarItemText'>User</div>
                    </span>
                </div>

            </div>
        </div>
    )
}

export default Sidebar