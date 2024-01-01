import "./App.css";
import "./App.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import ItemMaster from "./pages/master/item/ItemMaster";
import CustomerMaster from "./pages/master/customer/CustomerMaster";
import SupplierMaster from "./pages/master/supplier/SupplierMaster";
import PurchaseTransaction from "./pages/transactions/purchase/PurchaseTransaction";
import StaffMaster from "./pages/master/staff/StaffMaster";
import AccountMaster from "./pages/master/account/AccountMaster";
import PaymentTransaction from "./pages/transactions/payment/PaymentTransaction";
import SalesTransaction from "./pages/transactions/sales/SalesTransaction";
import { StockJournal } from "./pages/transactions/stockjurnal/StockJournal";
import { StockLedger } from "./pages/reports/stockLedger/StockLedger";
import { AccountLedger } from "./pages/reports/accountLedger/AccountLedger";
import { OpStock } from "./pages/master/opStock/OpStock";
import { AccJournal } from "./pages/transactions/accJournal/AccJournal";
import CustomerOutstanding from "./pages/reports/customerOutstanding/CustomerOutstanding";
import SupplierOutstanding from "./pages/reports/supplierOutstanding/SupplierOutstanding";
import { Daybook } from "./pages/reports/daybook/Daybook";
import SalesBook from "./pages/reports/salesBook/SalesBook";
import { TaxReport } from "./pages/reports/taxReport/TaxReport";
import CashBook from "./pages/reports/cashbook/CashBook";
import { StockJournalReport } from "./pages/reports/stockJournalReport/StockJournalReport";
import StaffAttendance from "./pages/transactions/staffAttendance/StaffAttendance";
import PayrollTransaction from "./pages/transactions/payroll/PayrollTransaction";
import ItemProfitWise from "./pages/reports/profitReport/ItemProfitWise";
import PurchaseBook from "./pages/reports/purchaseBook/PurchaseBook";
import { BarcodeRegister } from "./pages/reports/barcodeRegister/BarcodeRegister";
import BillWiseLedger from "./pages/reports/billlwiseLedger/BillWiseLedger";
import { ItemHistory } from "./pages/reports/ItemHistory/ItemHistory";
import BillWiseProfit from './pages/reports/billWiseProfitReport/BillWiseProfit';
import ChequeRegister from './pages/transactions/chequeRegister/ChequeRegister';
import ChequeRegisterReport from './pages/reports/chequeRegisterReport/ChequeRegisterReport';
import StockValueReport from "./pages/reports/stockValueReport/StockValueReport";

import StaffSalaryAttendance from './pages/reports/staffSalaryAttendance/StaffSalaryAttendance';
import MaterialComposition from './pages/master/material composition/MaterialComposition';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}> 
          <Route element={<Outlet/>}>
            <Route index element={<ItemMaster/>}/>
            <Route path='/add' element={<ItemMaster/>}/>
            <Route path="/customer-master" element={<CustomerMaster/>}/>
            <Route path="/customer-add" element={<CustomerMaster/>}/>
            <Route path="/supplier-master" element={<SupplierMaster/>}/>
            <Route path="/supplier-add" element={<SupplierMaster/>}/>
            <Route path="/account-master" element={<AccountMaster/>}/>
            <Route path="/account-add" element={<AccountMaster/>}/>
            <Route path="/staff-list" element={<StaffMaster/>}/>
            <Route path="/staff-pay-scale" element={<StaffMaster/>}/>
            <Route path="/staff-master" element={<StaffMaster/>}/>
            <Route path="/purchase-transaction" element={<PurchaseTransaction/>}/>
            <Route path="/sales-transaction" element={<SalesTransaction/>}/>
            <Route path="/payment-transaction" element={<PaymentTransaction types={'Payment'} />}/>
            <Route path="/receipt-transaction" element={<PaymentTransaction types={'Receipt'} />}/>
            <Route path="/staff-attendance" element={<StaffAttendance/>}/>
            <Route path="/pay-roll" element={<PayrollTransaction/>}/>
            <Route path='/pay-roll-edit' element={<PayrollTransaction/>}/>
            <Route path="/stock-journal" element={<StockJournal/>}/>
            <Route path="/stock-reports" element={<StockLedger/>}/>
            <Route path="/account-reports" element={<AccountLedger/>}/>
            <Route path="/customer-outstandings" element={<CustomerOutstanding/>}/>
            <Route path="/supplier-outstandings" element={<SupplierOutstanding/>}/>
            <Route path="/staff-outstandings" element={<SupplierOutstanding/>}/>
            <Route path="/opening-stock" element={<OpStock/>}/>
            <Route path="/account-journal" element={<AccJournal/>}/>
            <Route path="/day-book" element={<Daybook/>}/>
            <Route path="/sales-book" element={<SalesBook/>}/>
            <Route path="/sale-register" element={<SalesBook/>}/>
            <Route path="/tax-report" element={<TaxReport/>}/>
            <Route path="/cashbook-report" element={<CashBook/>}/>
            <Route path="/consolidate-cashbook" element={<CashBook />} />
            <Route path="/Stock-journal-report" element={<StockJournalReport />} />
            <Route path="/purchase-book" element={<PurchaseBook />} />
            <Route path="/profit-report" element={<ItemProfitWise />} />
            <Route path="/purchase-register" element={<PurchaseBook />} />
            <Route path="/barcode-register" element={<BarcodeRegister />} />
            <Route path="/item-history" element={<ItemHistory />} />
            <Route path="/bill-wise-ledger" element={<BillWiseLedger />} />
            <Route path="/bill-wise-profit" element={<BillWiseProfit/>}/>
            <Route path="/cheque-register" element={<ChequeRegister/>}/>
            <Route path="/cheque-register-report" element={<ChequeRegisterReport/>}/>
            <Route path="/stock-value-report" element={<StockValueReport/>}/>
            
            <Route path="/Stock-journal-report" element={<StockJournalReport/>}/>
            <Route path="/StaffAttendance" element={<StaffSalaryAttendance/>}/>
            <Route path="/StaffSalary" element={<StaffSalaryAttendance/>}/>
            <Route path="/material-composition-product" element={<MaterialComposition/>}/>
            <Route path="/material-composition-list" element={<MaterialComposition/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
