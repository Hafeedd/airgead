
import './sidebar.css'
import Transaction from '../../assets/icons/transaction.svg'
import Reports from '../../assets/icons/reports.svg'
import Dashboard from '../../assets/icons/dashboard-icon.svg'
import User from '../../assets/icons/user.svg'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import userProf from "../../assets/icons/prof.jpeg";
import companyList from "../../assets/icons/company-list.png";

export const navigationList = [
  { text: 'Dashboard', code: 175, navigate: '/', main: 'master', sub: 'Account' },
  { text: 'Accounts', code: 125, navigate: '/account-master', main: 'master', sub: 'Account' },
  { text: 'Customer', code: 127, navigate: '/customer-master', main: 'master', sub: 'Customer' },
  { text: 'Supplier', code: 128, navigate: '/supplier-master', main: 'master', sub: 'Supplier' },
  { text: 'Staff', code: 137, navigate: '/staff-list', main: 'master', sub: 'Staff' },
  { text: 'Items', code: 148, navigate: '/list', main: 'master', sub: 'Item' },
  { text: 'Opening Stock', code: 149, navigate: '/opening-stock', main: 'master', sub: 'Opening-Stock' },
  { text: 'Material Composition', code: 168, navigate: '/material-composition-product', main: 'master', sub: 'Material-Composition' },
  { text: 'Purchase', code: 100, navigate: '/purchase-transaction', main: 'transaction', sub: 'Purchase' },
  { text: 'Purchase Return', code: 102, navigate: '/purchase-return', main: 'transaction', sub: 'Purchase-Return' },
  { text: 'Purchase Order', code: 106, navigate: '/purchase-order', main: 'transaction', sub: 'Purchase-Order' },
  { text: 'Sales', code: 101, navigate: '/sales-transaction', main: "transaction", sub: "Sales" },
  { text: 'Sales Return', code: 103, navigate: '/sales-return', main: 'transaction', sub: 'Sales-Return' },
  { text: 'Sales order', code: 115, navigate: '/sales-order', main: 'transaction', sub: 'Sales-Order' },
  { text: 'Payment', code: 104, navigate: '/payment-transaction', main: 'transaction', sub: 'Payment' },
  { text: 'Reciept', code: 105, navigate: '/receipt-transaction', main: 'transaction', sub: 'Reciept' },
  { text: 'Stock Journal', code: 106, navigate: '/stock-journal', main: 'transaction', sub: 'Stock-Journal' },
  { text: 'Account Journal', code: 107, navigate: '/account-journal', main: 'transaction', sub: 'Account-Journal' },
  { text: 'Staff Attendance', code: 109, navigate: '/staff-attendance', main: 'transaction', sub: 'Staff-Attendance' },
  { text: 'Pay Roll', code: 110, navigate: '/pay-roll', main: 'transaction', sub: 'Pay-Roll' },
  { text: 'Cheque Register', code: 111, navigate: '/cheque-register', main: 'transaction', sub: 'Cheque-Register' },
  { text: 'Production', code: 112, navigate: '/production-transaction', main: 'transaction', sub: 'Production' },
  { text: 'Stock Ledger', navigate: '/stock-reports', main: 'report', sub: 'Stock-Ledger' },
  { text: 'Account Ledger', navigate: '/account-reports', main: 'report', sub: 'Account-Ledger' },
  { text: 'Day Book', navigate: '/day-book', main: 'report', sub: 'Day-Book' },
  { text: 'Cust Outstanding', navigate: '/customer-outstandings', main: 'report', sub: 'Cust-Outstanding' },
  { text: 'Sup Outstanding', navigate: '/supplier-outstandings', main: 'report', sub: 'Sup-Outstanding' },
  { text: 'Sales Report', navigate: '/sales-book', main: 'report', sub: 'Sales-Report' },
  { text: 'Staff Outstanding', navigate: '/staff-outstandings', main: 'report', sub: 'Staff-Outstanding' },
  { text: 'Tax Reports', navigate: '/tax-report', main: 'report', sub: 'Tax-Reports' },
  { text: 'Cash Book', navigate: '/cashbook-report', main: 'report', sub: 'Cash-Book' },
  { text: 'Stock Journal', navigate: '/Stock-journal-report', main: 'report', sub: 'Stock-Journal-Report' },
  { text: 'Item Wise Profit', navigate: '/profit-report', main: 'report', sub: 'Item-Wise-Profit' },
  { text: 'Purchase Report', navigate: '/purchase-book', main: 'report', sub: 'Purchase-Report' },
  { text: 'Barcode Register', navigate: '/barcode-register', main: 'report', sub: 'Barcode-Register' },
  { text: 'Item History', navigate: '/item-history', main: 'report', sub: 'Item-History' },
  { text: 'Bill Wise Ledger', navigate: '/bill-wise-ledger', main: 'report', sub: 'Bill-Wise-Ledger' },
  { text: 'Bill Wise Profit', navigate: '/bill-wise-profit', main: 'report', sub: 'Bill-Wise-Profit' },
  { text: 'Cheque Register', navigate: '/cheque-register-report', main: 'report', sub: 'Cheque-Register-Report' },
  { text: 'Stock Value Report', navigate: '/stock-value-report', main: 'report', sub: 'Stock-Value-Report' },
  { text: 'Staff Salary & Attendance', navigate: '/StaffAttendance', main: 'report', sub: 'Staff-Salary-&-Attendance' },
  { text: 'Production report', navigate: '/production-report', main: 'report', sub: 'Production-Report' },
  { text: 'Trial balance', navigate: '/trial-balance', main: 'report', sub: 'Trial-Balance' },
  { text: 'Group Wise Trial balance', navigate: '/group-trial-balance', main: 'report', sub: 'Group-Wise-Trial-Balance' },
  { text: 'Balance Sheet', navigate: '/balance-sheet', main: 'report', sub: 'Balance-Sheet' },
  { text: 'Trade Profit And Loss', navigate: '/traid-profit-loss', main: 'report', sub: 'Traid-Profit-And-Loss' },
  { text: 'Chart Of Account', navigate: '/chart-of/account', main: 'report', sub: 'Chart-Of-Account' },
]


const Sidebar = ({ perm, setPage }) => {
  const [masterActive, setMasterActive] = useState(false)
  const [ArrowActive, setArrowActive] = useState(false)
  const [ReportsActive, setReportsActive] = useState(false)

  const auth = useSelector(state => state.auth)

  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className={`sidebar pb-5 ${auth?.userDetails?.fk_group === "Controller" && "company"} ${perm && 'h-100 pt-2 permission'}`}>
      {!perm && <div className="company-logo-cont mb-3">
        {auth?.userDetails?.fk_group === "Controller" && <div className="company-logo pb-5 h-100 pt-4">
          <div className='d-flex text-light gap-3'>
            <img className="header-user-prof-img company" src={userProf} alt="user" />
            <span><h3>{auth?.userDetails?.username}</h3>
              {auth?.userDetails?.fk_role}</span>
          </div>
        </div>
        }
      </div>}
      <div
        style={{ userSelect: "none" }}
        className={`SidebarItems mt-0 mt-5 mx-0 px-0`}
      >
        {(auth?.userDetails?.fk_group === "Controller" && !perm) && <>
          <div
            onClick={() => navigate('/')}
            className={`SidebarItem mb-1 admin ${masterActive && "active"}`}
          >
            <img src={companyList} className="sidebar_icon" width={"25px"} />
            Company
          </div>
        </>}

        {("Company Agency".includes(auth?.userDetails?.fk_group) || perm) && <>
        <div
            onClick={() =>{navigate('/')}}
            className={`SidebarItem mb-1 ${location.pathname==='/' && "active"}`}
          >
            <img src={Dashboard} className="sidebar_icon" width={"22px"} />
            Dashboard
          </div>
          {navigationList.filter(data=>data.main==="master"&&auth?.permissions?.findIndex(x=>x==data.code)>-1).length>0&&<><div
            onClick={() => setMasterActive(!masterActive)}
            className={`SidebarItem mt-3 mb-1 ${masterActive && "active"}`}
          >
            <img src={User} className="sidebar_icon" width={"25px"} />
            Master
          </div>
            <div className={`sidebar_span_cont ${!masterActive && "d-none"}`}>
              {navigationList.map(data =>
              (auth?.permissions?.findIndex(x => x === data.code) > -1 && data.main === "master") && <span className="SidebarSpan d-flex ms-5 ps-3">
                <div
                  className="SidebarItemText"
                  onClick={() => { if (!perm) navigate(data.navigate); else setPage({ main: data.main, sub: data.sub }) }}
                >
                  {data.text}
                </div>
              </span>)}
            </div></>}

          {navigationList.filter(data=>data.main==="transaction"&&auth?.permissions?.findIndex(x=>x==data.code)>-1).length>0&&<><div
            onClick={() => setReportsActive(!ReportsActive)}
            className={`SidebarItem mt-3 mb-1 ${ReportsActive && "active"}`}
          >
            <img className="sidebar_icon" src={Transaction} width={"20px"} />
            Transactions
          </div>
          <div className={`sidebar_span_cont ${!ReportsActive && "d-none"}`}>
            {navigationList.map(data =>
            (auth?.permissions?.findIndex(x => x === data.code) > -1 && data.main === "transaction" && <span className="SidebarSpan d-flex ms-5 ps-3">
              <div
                className="SidebarItemText"
                onClick={() => { if (!perm) navigate(data.navigate); else setPage({ main: data.main, sub: data.sub }) }}
              >
                {data.text}
              </div>
            </span>))}
          </div></>}

          <div
            onClick={() => setArrowActive(!ArrowActive)}
            className={`SidebarItem mt-3 mb-1 ${ArrowActive && "active"}`}
          >
            <img className='sidebar_icon' src={Reports} width={"18px"} />
            Reports
          </div>
          <div className={`sidebar_span_cont ${!ArrowActive && "d-none"}`}>
            {navigationList.map(data =>
            (/* auth?.permissions?.findIndex(x=>x===data.code)>-1&&  */data.main === "report" && <span className="SidebarSpan d-flex ms-5 ps-3">
              <div
                className="SidebarItemText"
                onClick={() => { if (!perm) navigate(data.navigate); else setPage({ main: data.main, sub: data.sub }) }}
              >
                {data.text}
              </div>
            </span>))}
          </div>
        </>}
      </div>
    </div>
  );
}


export default Sidebar