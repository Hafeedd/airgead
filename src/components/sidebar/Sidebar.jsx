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
    return (
      <div className="sidebar pb-5">
        <div className="company-logo-cont mb-4">
          <div className="company-logo rounded-5 py-2 mb-5"></div>
        </div>
        <div
          style={{ userSelect: "none" }}
          className="SidebarItems mt-0 mt-5 mx-0 px-0"
        >
          <div
            onClick={() => setMasterActive(!masterActive)}
            className={`SidebarItem mb-1 ${masterActive && "active"}`}
          >
            <img src={User} className="sidebar_icon" width={"25px"} />
            Master
          </div>
          <div className={`sidebar_span_cont ${!masterActive && "d-none"}`}>
            <span className="SidebarSpan d-flex ms-5 ps-3">
              <div
                className="SidebarItemText"
                onClick={() => navigate("/account-master")}
              >
                Accounts
              </div>
            </span>
            <span className="SidebarSpan d-flex ms-5 ps-3">
              <div
                className="SidebarItemText"
                onClick={() => navigate("/customer-master")}
              >
                Customer
              </div>
            </span>
            <span className="SidebarSpan d-flex ms-5 ps-3">
              <div
                className="SidebarItemText"
                onClick={() => navigate("/supplier-master")}
              >
                Supplier
              </div>
            </span>
            <span className="SidebarSpan d-flex ms-5 ps-3">
              <div
                className="SidebarItemText"
                onClick={() => navigate("/staff-list")}
              >
                Staff
              </div>
            </span>
            <span className="SidebarSpan d-flex ms-5 ps-3">
              <div className="SidebarItemText" onClick={() => navigate("/")}>
                Items
              </div>
            </span>
            <span className="SidebarSpan d-flex ms-5 ps-3">
              <div
                className="SidebarItemText"
                onClick={() => navigate("/opening-stock")}
              >
                Opening Stock
              </div>
            </span>
            <span className="SidebarSpan d-flex ms-5 ps-3">
              <div
                className="SidebarItemText"
                onClick={() => navigate("/material-composition-product")}
              >
                Material Composition
              </div>
            </span>
          </div>

          <div
            onClick={() => setReportsActive(!ReportsActive)}
            className={`SidebarItem mt-3 mb-1 ${ReportsActive && "active"}`}
          >
            <img className="sidebar_icon" src={Transaction} width={"20px"} />
            Transactions
          </div>
          <div className={`sidebar_span_cont ${!ReportsActive && "d-none"}`}>
            <span className="SidebarSpan d-flex ms-5 ps-3">
              <div
                className="SidebarItemText"
                onClick={() => navigate("/purchase-transaction")}
              >
                Purchase
              </div>
            </span>
            <span className="SidebarSpan d-flex ms-5 ps-3">
              <div
                className="SidebarItemText"
                onClick={() => navigate("/sales-transaction")}
              >
                Sales
              </div>
            </span>
            <span className="SidebarSpan d-flex ms-5 ps-3">
              <div
                className="SidebarItemText"
                onClick={() => navigate("/payment-transaction")}
              >
                Payment
              </div>
            </span>
            <span className="SidebarSpan d-flex ms-5 ps-3">
              <div
                className="SidebarItemText"
                onClick={() => navigate("/receipt-transaction")}
              >
                Receipt
              </div>
            </span>
            <span className="SidebarSpan d-flex ms-5 ps-3">
              <div
                className="SidebarItemText"
                onClick={() => navigate("/stock-journal")}
              >
                Stock Journal
              </div>
            </span>
            <span className="SidebarSpan d-flex ms-5 ps-3">
              <div
                className="SidebarItemText"
                onClick={() => navigate("/account-journal")}
              >
                Account Journal
              </div>
            </span>
            <span className="SidebarSpan d-flex ms-5 ps-3">
              <div
                className="SidebarItemText"
                onClick={() => navigate("/staff-attendance")}
              >
                Staff Attendance
              </div>
            </span>
            <span className="SidebarSpan d-flex ms-5 ps-3">
              <div
                className="SidebarItemText"
                onClick={() => navigate("/pay-roll")}
              >
                Pay Roll
              </div>
            </span>
            <span className="SidebarSpan d-flex ms-5 ps-3">
              <div
                className="SidebarItemText"
                onClick={() => navigate("/cheque-register")}
              >
                Cheque Register
              </div>
            </span>
            <span className="SidebarSpan d-flex ms-5 ps-3">
              <div
                className="SidebarItemText"
                onClick={() => navigate("/production-transaction")}
              >
                Production
              </div>
            </span>
          </div>

          <div
            onClick={() => setArrowActive(!ArrowActive)}
            className={`SidebarItem mt-3 mb-1 ${ArrowActive && "active"}`}
          >
            <img className='sidebar_icon' src={Reports} width={"18px"} />
            Reports
          </div>
          <div className={`sidebar_span_cont ${!ArrowActive && "d-none"}`}>
            <span className="SidebarSpan d-flex ms-5 ps-3">
              <div
                className="SidebarItemText"
                onClick={() => navigate("/stock-reports")}
              >
                Stock Ledger
              </div>
            </span>
            <span className="SidebarSpan d-flex ms-5 ps-3">
              <div
                className="SidebarItemText"
                onClick={() => navigate("/account-reports")}
              >
                Account Ledger
              </div>
            </span>
            <span className="SidebarSpan d-flex ms-5 ps-3">
              <div
                className="SidebarItemText"
                onClick={() => navigate("/day-book")}
              >
                Day Book
              </div>
            </span>
            <span className="SidebarSpan d-flex ms-5 ps-3">
              <div
                className="SidebarItemText"
                onClick={() => navigate("/customer-outstandings")}
              >
                Cust Outstanding
              </div>
            </span>
            <span className="SidebarSpan d-flex ms-5 ps-3">
              <div
                className="SidebarItemText"
                onClick={() => navigate("/supplier-outstandings")}
              >
                Sup Outstanding
              </div>
            </span>
            <span className="SidebarSpan d-flex ms-5 ps-3">
              <div
                className="SidebarItemText"
                onClick={() => navigate("/sales-book")}
              >
                Sales Report
              </div>
            </span>
            <span className="SidebarSpan d-flex ms-5 ps-3">
              <div
                className="SidebarItemText"
                onClick={() => navigate("/staff-outstandings")}
              >
                Staff Outstanding
              </div>
            </span>
            <span className="SidebarSpan d-flex ms-5 ps-3">
              <div
                className="SidebarItemText"
                onClick={() => navigate("/tax-report")}
              >
                Tax Reports
              </div>
            </span>
            <span className="SidebarSpan d-flex ms-5 ps-3">
              <div
                className="SidebarItemText"
                onClick={() => navigate("/cashbook-report")}
              >
                Cash Book
              </div>
            </span>
            <span className="SidebarSpan d-flex ms-5 ps-3">
              <div
                className="SidebarItemText"
                onClick={() => navigate("/Stock-journal-report")}
              >
                Stock Journal
              </div>
            </span>
            <span className="SidebarSpan d-flex ms-5 ps-3">
              <div
                className="SidebarItemText"
                onClick={() => navigate("/profit-report")}
              >
                Item Wise Profit
              </div>
            </span>
            <span className="SidebarSpan d-flex ms-5 ps-3">
              <div
                className="SidebarItemText"
                onClick={() => navigate("/purchase-book")}
              >
                Purchase Report
              </div>
            </span>
            <span className="SidebarSpan d-flex ms-5 ps-3">
              <div
                className="SidebarItemText"
                onClick={() => navigate("/barcode-register")}
              >
                Barcode Register
              </div>
            </span>
            <span className="SidebarSpan d-flex ms-5 ps-3">
              <div
                className="SidebarItemText"
                onClick={() => navigate("/item-history")}
              >
                Item History
              </div>
            </span>
            <span className="SidebarSpan d-flex ms-5 ps-3">
              <div
                className="SidebarItemText"
                onClick={() => navigate("/bill-wise-ledger")}
              >
                Bill Wise Ledger
              </div>
            </span>{" "}
            <span className="SidebarSpan d-flex ms-5 ps-3">
              <div
                className="SidebarItemText"
                onClick={() => navigate("/bill-wise-profit")}
              >
                Bill Wise Profit
              </div>
            </span>
            <span className="SidebarSpan d-flex ms-5 ps-3">
              <div
                className="SidebarItemText"
                onClick={() => navigate("/cheque-register-report")}
              >
                Cheque Register
              </div>
            </span>
            <span className="SidebarSpan d-flex ms-5 ps-3">
              <div
                className="SidebarItemText"
                onClick={() => navigate("/stock-value-report")}
              >
                Stock Value Report
              </div>
            </span>
            <span className="SidebarSpan d-flex ms-5 ps-3">
              <div
                className="SidebarItemText"
                onClick={() => navigate("/StaffAttendance")}
              >
                Staff Salary & Attendance
              </div>
            </span>
            <span className="SidebarSpan d-flex ms-5 ps-3">
              <div
                className="SidebarItemText"
                onClick={() => navigate("/production-report")}
              >
                Production report
              </div>
            </span>
          </div>
        </div>
      </div>
    );
}

export default Sidebar