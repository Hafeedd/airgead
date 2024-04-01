import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import AccountList from "./components/AccountList";
import AccountAdd from "./components/AccountAdd";
import "./AccountMaster.css";
import useAccountServices from "../../../services/master/accountServices";
import { FiPlus } from "react-icons/fi";
import { useSelector } from "react-redux";

const AccountMaster = () => {
  const [toEdit, setToEdit] = useState(false);
  const [listItem, setListItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const permissions = useSelector((state) => state.auth.permissions);
  const navigate = useNavigate();

  const location = useLocation()

  const { getAccountList } = useAccountServices();

  const loadAccountList = async () => {
    try{

      setLoading(true)
      const response = await getAccountList();
      if (response?.success) {
        setListItem(response?.data);
        // console.log(response?.data)
      }
      setLoading(false)
    }catch(err){
      setLoading(false)
      console.log(err)
    }
  };

  useEffect(() => {
    loadAccountList();
  }, []);

  useEffect(()=>{
    if(location?.state?.account){
      setToEdit(location?.state?.account)
    }
  },[location.pathname])

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
              location.pathname === "/account-add" && "d-none"
            }`}
          >
           {permissions.includes(1083) && <div
              onClick={() => {
                navigate("/account-add");
                setToEdit(false);
              }}
              className="h-auto add-btn px-2 btn w-auto"
            >
              <FiPlus size={'1.4rem'}/>&nbsp; Add Account
            </div>}
          </div>
        </div>
      </div>

      {location.pathname === "/account-add" ? (
        <AccountAdd
          edit={toEdit}
          refresh={loadAccountList}
          setEdit={setToEdit}
        />
      ) : (
        <AccountList {...{loadAccountList,loading, handleEdit, toEdit, listItem, permissions }} />
      )}
    </div>
  );
};

export default AccountMaster;
