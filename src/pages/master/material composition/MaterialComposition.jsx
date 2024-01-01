import React from "react";
import { useNavigate, useLocation } from "react-router";
import MaterialCompositionOfProduct from "./components/MaterialCompositionOfProduct";
import MaterialCompositionList from "./components/MaterialCompositionList";
import "./MaterialComposition.css"

const MaterialComposition = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="item_add">
      <div className="itemList_header row mx-0">
        <div className="page_head ps-4 d-flex justify-content-between">
          <div>
            <div className="fs-5 py-2">Material Composition of Product</div>
            <div className="page_head_items">
              <div
                onClick={() => {
                  navigate("/material-composition-product");
                }}
                className={`page_head_item ${
                  location.pathname == "/material-composition-product" &&
                  "active"
                }`}
              >
                Material Composition of Product
              </div>
              <div
                onClick={() => {
                  navigate("/material-composition-list");
                }}
                className={`page_head_item ${
                  location.pathname == "/material-composition-list" && "active"
                }`}
              >
                Material Composition List
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-3 mt-3">
        <div className="p-2 bg-light rounded-1">
        { location.pathname == "/material-composition-product" && "active" ? 
          <MaterialCompositionOfProduct /> :
          <MaterialCompositionList /> }
        </div>
      </div>
    </div>
  )
};

export default MaterialComposition;
