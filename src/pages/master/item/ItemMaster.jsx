import React, { useEffect, useState } from "react";
import useItemServices from "../../../services/master/itemServices";
import "./ItemMaster.css";
import { useNavigate, useLocation } from "react-router";
import ItemList from "./components/ItemList";
import { ItemAddForm } from "./components/AddForm";

const ItemMaster = () => {
  const [loading, setLoading] = useState(false)
  const [toEdit, setToEdit] = useState(false);
  const [listItem, setListItem] = useState();
  const [search, setSearch] = useState();
  // const [showAddItem, setShowAddItem] = useState(false)
  const { getItemList } = useItemServices();
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const location = useLocation();


  const getData = async () => {
    try {
      let params;
      if (search) {
        params = { code: search, name: search };
      }
      setLoading(true)
      const res = await getItemList();
      if (res.success) {
        setListItem(res.data);
      }
      setLoading(false)
    } catch (err) {
      setLoading(false)      
    }
  };

  const handleEdit = (data) => {
    navigate("/add");
    setToEdit(data);
  };

  return (
    <div className="item_add">
      <div className="itemList_header row mx-0">
        <div className="page_head px-4 d-flex justify-content-between my-1">
          <div>
            <div className="fw-600 fs-5">Master Item</div>
            <div className="page_head_items mb-2">
              <div
                onClick={() => {
                  navigate("/list");
                }}
                className={`page_head_item active`}
              >
                Item List
              </div>
            </div>
          </div>
          {location.pathname !== "/add" && (
            <div className="d-flex align-items-center">
              <div
                onClick={() => {
                  navigate("/add");
                  setToEdit(false);
                }}
                className="btn btn-primary add-btn px-0 w-auto px-2"
                // style={{width:'fit-content'}}
              >
                + &nbsp; Add Item
              </div>
            </div>
          )}
        </div>
      </div>
      {
        /* toEdit||showAddItem */ location.pathname === "/add" ? (
          <ItemAddForm refresh={getData} edit={toEdit} setToEdit={setToEdit} />
        ) : (
          <ItemList
            list={listItem}
            {...{
              search,
              setSearch,
              loading,
              getData,
              handleEdit,
              // handleDelete,
              toEdit,
            }}
          />
        )
      }
    </div>
  );
};

export default ItemMaster;
