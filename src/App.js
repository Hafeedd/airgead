import './App.css';
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import CustomerAdd from "./pages/master/customer/customer-add/CustomerAdd";
import SupplierAdd from "./pages/master/supplier/supplier-add/SupplierAdd";
import ItemMaster from "./pages/master/item/ItemMaster";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}> 
          <Route element={<Outlet/>}>
            <Route index element={<ItemMaster/>}/>
            <Route path="/customer-master" element={<CustomerAdd/>}/>
            <Route path="/supplier-add" element={<SupplierAdd/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
