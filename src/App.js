import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import './App.css';
import { Layout } from "./components/layout/Layout";
import ItemAdd from "./pages/master/item/itemAdd/ItemAdd";
import CustomerAdd from "./pages/master/customer/customer-add/CustomerAdd";
import SupplierAdd from "./pages/master/supplier/supplier-add/SupplierAdd";
import ItemList from "./pages/master/item/item-list/ItemList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}> 
          <Route element={<Outlet/>}>
            <Route index element={<ItemAdd/>}/>
            <Route path="/item-list" element={<ItemList/>}/>
            <Route path="/customer-list" element={<ItemList/>}/>
            <Route path="/customer-add" element={<CustomerAdd/>}/>
            <Route path="/supplier-add" element={<SupplierAdd/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
