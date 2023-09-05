import './sidebar.css'
import userBlue from '../../assets/icons/userBlue.png'
import arrowBlue from '../../assets/icons/arrowBlue.png'
import reports from '../../assets/icons/reports.png'
import { useState } from 'react'

const Sidebar = () => {
    const [masterActive, setMasterActive] = useState(false)
    const [ArrowActive, setArrowActive] = useState(false)
    const [ReportsActive, setReportsActive] = useState(false)
    return(
        <div className="sidebar pt-4">
            <div className="CompanyLogo rounded-5 py-3 mb-5">
                
            </div>
            <div className='SidebarItems mt-0 mt-5'>
                <div onClick={()=>setMasterActive(!masterActive)} className={`SidebarItem mb-1 ${masterActive && "active"}`}><img src={userBlue} width={"21px"}/>Master</div>
                <div className={`sidebar_span_cont ${!masterActive && "d-none"}`}>
                    <span className='SidebarSpan d-flex ms-5 ps-3'><div className='SidebarItemText'>Accounts</div></span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'><div className='SidebarItemText'>Customer</div></span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'><div className='SidebarItemText'>Supplier</div></span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'><div className='SidebarItemText'>Staff</div></span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'><div className='SidebarItemText'>Vehichle</div></span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'><div className='SidebarItemText'>Items</div></span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'><div className='SidebarItemText'>Route</div></span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'><div className='SidebarItemText'>City</div></span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'><div className='SidebarItemText'>Town</div></span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'><div className='SidebarItemText'>District</div></span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'><div className='SidebarItemText'>Bill Payment</div></span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'><div className='SidebarItemText'>Counter</div></span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'><div className='SidebarItemText'>User</div></span>
                </div>
             
                <div onClick={()=>setReportsActive(!ReportsActive)} className={`SidebarItem mb-1 ${ReportsActive && "active"}`}><img src={arrowBlue} width={"20px"}/>Transactions</div>
                <div className={`sidebar_span_cont ${!ReportsActive && "d-none"}`}>
                    <span className='SidebarSpan d-flex ms-5 ps-3'><div className='SidebarItemText'>Accounts</div></span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'><div className='SidebarItemText'>Customer</div></span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'><div className='SidebarItemText'>Supplier</div></span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'><div className='SidebarItemText'>Staff</div></span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'><div className='SidebarItemText'>Vehichle</div></span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'><div className='SidebarItemText'>Items</div></span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'><div className='SidebarItemText'>Route</div></span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'><div className='SidebarItemText'>City</div></span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'><div className='SidebarItemText'>Town</div></span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'><div className='SidebarItemText'>District</div></span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'><div className='SidebarItemText'>Bill Payment</div></span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'><div className='SidebarItemText'>Counter</div></span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'><div className='SidebarItemText'>User</div></span>
                </div>
                
                <div onClick={()=>setArrowActive(!ArrowActive)} className={`SidebarItem  mb-3 ${ArrowActive && "active"}`}><img className='me-1' src={reports} width={"18px"}/>Reports</div>
                <div className={`sidebar_span_cont ${!ArrowActive && "d-none"}`}>
                    <span className='SidebarSpan d-flex ms-5 ps-3'><div className='SidebarItemText'>Accounts</div></span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'><div className='SidebarItemText'>Customer</div></span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'><div className='SidebarItemText'>Supplier</div></span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'><div className='SidebarItemText'>Staff</div></span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'><div className='SidebarItemText'>Vehichle</div></span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'><div className='SidebarItemText'>Items</div></span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'><div className='SidebarItemText'>Route</div></span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'><div className='SidebarItemText'>City</div></span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'><div className='SidebarItemText'>Town</div></span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'><div className='SidebarItemText'>District</div></span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'><div className='SidebarItemText'>Bill Payment</div></span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'><div className='SidebarItemText'>Counter</div></span>
                    <span className='SidebarSpan d-flex ms-5 ps-3'><div className='SidebarItemText'>User</div></span>
                </div>

            </div>
        </div>
    )
}

export default Sidebar