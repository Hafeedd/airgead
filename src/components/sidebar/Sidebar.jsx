
import './sidebar.css'
import Transaction from '../../assets/icons/transaction.svg'
import Reports from '../../assets/icons/reports.svg'
import User from '../../assets/icons/user.svg'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import userProf from "../../assets/icons/prof.jpeg";
import companyList from "../../assets/icons/company-list.png";

const Sidebar = ({perm}) => {
  const [masterActive, setMasterActive] = useState(false)
  const [ArrowActive, setArrowActive] = useState(false)
  const [ReportsActive, setReportsActive] = useState(false)

  const userDetails = useSelector(state => state.auth.userDetails)

  const master = [
    { text: 'Accounts', navigate: '/account-master' },
    { text: 'Customer', navigate: '/customer-master' },
    { text: 'Supplier', navigate: '/supplier-master' },
    { text: 'Staff', navigate: '/staff-list' },
    { text: 'Items', navigate: '/' },
    { text: 'Opening Stock', navigate: '/opening-stock' },
    { text: 'Material Composition', navigate: '/material-composition-product' },
  ]

  const transaction = [
    { text: 'Purchase', navigate: '/purchase-transaction' },
    { text: 'Purchase Return', navigate: '/purchase-return' },
    { text: 'Purchase Order', navigate: '/purchase-order' },
    { text: 'Sales', navigate: '/sales-transaction' },
    { text: 'Sales Return', navigate: '/sales-return' },
    { text: 'Sales order', navigate: '/sales-order' },
    { text: 'Payment', navigate: '/payment-transaction' },
    { text: 'Reciept', navigate: '/receipt-transaction' },
    { text: 'Stock Journal', navigate: '/stock-journal' },
    { text: 'Account Journal', navigate: '/account-journal' },
    { text: 'Staff Attendance', navigate: '/staff-attendance' },
    { text: 'Pay Roll', navigate: '/pay-roll' },
    { text: 'Cheque Register', navigate: '/cheque-register' },
    { text: 'Production', navigate: '/production-transaction' },
  ]

  const reports = [
    { text: 'Stock Ledger', navigate: '/stock-reports' },
    { text: 'Account Ledger', navigate: '/account-reports' },
    { text: 'Day Book', navigate: '/day-book' },
    { text: 'Cust Outstanding', navigate: '/customer-outstandings' },
    { text: 'Sup Outstanding', navigate: '/supplier-outstandings' },
    { text: 'Sales Report', navigate: '/sales-book' },
    { text: 'Staff Outstanding', navigate: '/staff-outstandings' },
    { text: 'Tax Reports', navigate: '/tax-report' },
    { text: 'Cash Book', navigate: '/cashbook-report' },
    { text: 'Stock Journal', navigate: '/Stock-journal-report' },
    { text: 'Item Wise Profit', navigate: '/profit-report' },
    { text: 'Purchase Report', navigate: '/purchase-book' },
    { text: 'Barcode Register', navigate: '/barcode-register' },
    { text: 'Item History', navigate: '/item-history' },
    { text: 'Bill Wise Ledger', navigate: '/bill-wise-ledger' },
    { text: 'Bill Wise Profit', navigate: '/bill-wise-profit' },
    { text: 'Cheque Register', navigate: '/cheque-register-report' },
    { text: 'Stock Value Report', navigate: '/stock-value-report' },
    { text: 'Staff Salary & Attendance', navigate: '/StaffAttendance' },
    { text: 'Production report', navigate: '/production-report' },
    { text: 'Trial balance', navigate: '/trial-balance' },
    { text: 'Group Wise Trial balance', navigate: '/group-trial-balance' },
    { text: 'Balance Sheet', navigate: '/balance-sheet' },
    { text: 'Traid Profit And Loss', navigate: '/traid-profit-loss' },
    { text: 'Chart Of Account', navigate: '/chart-of/account' },
  ]

  const navigate = useNavigate()

  return (
    <div className={`sidebar pb-5 ${userDetails.fk_role === "Admin" && "company"} ${perm&& 'h-100 pt-2 permission'}`}>
      {!perm && <div className="company-logo-cont mb-3">
        {userDetails.fk_role === "Admin" && <div className="company-logo pb-5 h-100 pt-4">
          <div className='d-flex text-light gap-3'>
            <img className="header-user-prof-img company" src={userProf} alt="user" />
            <span><h3>{userDetails.username}</h3>
              {userDetails.fk_role}</span>
          </div>
        </div>
        }
      </div>}
      <div
        style={{ userSelect: "none" }}
        className={`SidebarItems mt-0 mt-5 mx-0 px-0`}
      >
        {(userDetails.fk_role === "Admin"&& !perm) && <>
        <div
          onClick={() => navigate('/company-list')}
          className={`SidebarItem mb-1 admin ${masterActive && "active"}`}
        >
          <img src={companyList} className="sidebar_icon" width={"25px"} />
          Company
        </div>
        </>}

        {(userDetails.fk_role === "User"||perm) && <><div
          onClick={() => setMasterActive(!masterActive)}
          className={`SidebarItem mb-1 ${masterActive && "active"}`}
        >
          <img src={User} className="sidebar_icon" width={"25px"} />
          Master
        </div>
          <div className={`sidebar_span_cont ${!masterActive && "d-none"}`}>
            {master.map(data => <span className="SidebarSpan d-flex ms-5 ps-3">
              <div
                className="SidebarItemText"
                onClick={() =>{if(!perm) navigate(data.navigate)}}
              >
                {data.text}
              </div>
            </span>)}
          </div>

          <div
            onClick={() => setReportsActive(!ReportsActive)}
            className={`SidebarItem mt-3 mb-1 ${ReportsActive && "active"}`}
          >
            <img className="sidebar_icon" src={Transaction} width={"20px"} />
            Transactions
          </div>
          <div className={`sidebar_span_cont ${!ReportsActive && "d-none"}`}>
            {transaction.map(data => <span className="SidebarSpan d-flex ms-5 ps-3">
              <div
                className="SidebarItemText"
                onClick={() =>{if(!perm) navigate(data.navigate)}}
              >
                {data.text}
              </div>
            </span>)}
          </div>

          <div
            onClick={() => setArrowActive(!ArrowActive)}
            className={`SidebarItem mt-3 mb-1 ${ArrowActive && "active"}`}
          >
            <img className='sidebar_icon' src={Reports} width={"18px"} />
            Reports
          </div>
          <div className={`sidebar_span_cont ${!ArrowActive && "d-none"}`}>
            {reports.map(data => <span className="SidebarSpan d-flex ms-5 ps-3">
              <div
                className="SidebarItemText"
                onClick={() =>{if(!perm) navigate(data.navigate)}}
              >
                {data.text}
              </div>
            </span>)}
          </div>
        </>}
      </div>
    </div>
  );
}

export default Sidebar