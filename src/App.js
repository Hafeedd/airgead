import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import './App.css';
import { Layout } from "./components/layout/Layout";
import ItemAdd from "./pages/itemAdd/ItemAdd";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}> 
          <Route element={<Outlet/>}>
            <Route index element={<ItemAdd/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
