import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import './App.css';
import { Layout } from "./components/layout/Layout";
import ItemAdd from "./pages/itemAdd/ItemAdd";
import CustomerAdd from "./pages/customer-add/CustomerAdd";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}> 
          <Route element={<Outlet/>}>
            <Route index element={<ItemAdd/>}/>
            <Route path="/customer" element={<CustomerAdd/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
