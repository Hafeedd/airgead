import './App.css';
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import ItemMaster from "./pages/master/item/ItemMaster";
import CustomerMaster from './pages/master/customer/CustomerMaster';
import SupplierMaster from './pages/master/supplier/SupplierMaster';
import PurchaseTransaction from './pages/transactions/purchase/PurchaseTransaction';
import StaffMaster from './pages/master/staff/StaffMaster';
import AccountMaster from './pages/master/account/AccountMaster';
import PaymentTransaction from './pages/transactions/payment/PaymentTransaction';
import SalesTransaction from './pages/transactions/sales/SalesTransaction';

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
            <Route path="/staff-master" element={<StaffMaster/>}/>
            <Route path="/purchase-transaction" element={<PurchaseTransaction/>}/>
            <Route path="/sales-transaction" element={<SalesTransaction/>}/>
            <Route path="/payment-transaction" element={<PaymentTransaction types={'Payment'} />}/>
            <Route path="/receipt-transaction" element={<PaymentTransaction types={'Receipt'} />}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
