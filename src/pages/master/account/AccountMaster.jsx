import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import AccountList from "./components/AccountList";
import AccountAdd from "./components/AccountAdd";
import "./AccountMaster.css";
import useAccountServices from "../../../services/master/accountServices";

const AccountMaster = () => {
  const [toEdit, setToEdit] = useState(false);
  const [listItem, setListItem] = useState([]);
  const navigate = useNavigate();

  const location = useLocation().pathname;

  const { getAccountList } = useAccountServices();

  const loadAccountList = async () => {
    const response = await getAccountList();
    if (response?.success) {
      setListItem(response?.data);
      // console.log(response?.data)
    }
  };

  useEffect(() => {
    loadAccountList();
  }, []);

  const handleEdit = (data) => {
    navigate("/account-add");
    setToEdit(data);
  };
  return (
    <div className="item_add ">
      <div className="itemList_header row mx-0">
        <div className="page_head my-1 px-4 d-flex justify-content-between">
          <div>
            <div className="fw-600 fs-5">Master Account</div>
            <div className="page_head_items mb-2">
              <div
                onClick={() => navigate("/account-master")}
                className={`page_head_item active`}
              >
                Master List
              </div>
            </div>
          </div>
          <div
            className={`d-flex align-items-center ${
              location === "/account-add" && "d-none"
            }`}
          >
            <div
              onClick={() => {
                navigate("/account-add");
                setToEdit(false);
              }}
              className="btn btn-primary add-btn px-2 py-1 w-auto"
            >
              + &nbsp; Add Customer
            </div>
          </div>
        </div>
      </div>

      {location === "/account-add" ? (
        <AccountAdd
          edit={toEdit}
          refresh={loadAccountList}
          setEdit={setToEdit}
        />
      ) : (
        <AccountList {...{loadAccountList, handleEdit, toEdit, listItem }} />
      )}
    </div>
  );
};

export default AccountMaster;
