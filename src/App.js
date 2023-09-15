import './App.css';
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import SupplierAdd from "./pages/master/supplier/components/SupplierAdd";
import ItemMaster from "./pages/master/item/ItemMaster";
import CustomerMaster from './pages/master/customer/CustomerMaster';
import SupplierMaster from './pages/master/supplier/SupplierMaster';
import PurchaseTransaction from './pages/transactions/purchase/PurchaseTransaction';
import StaffTransaction from './pages/transactions/staff/StaffTransaction';

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
            <Route path="/purchase-transaction" element={<PurchaseTransaction/>}/>
            <Route path="/staff-transaction" element={<StaffTransaction/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
