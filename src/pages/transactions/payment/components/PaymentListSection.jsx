import React from "react";
import search from "../../../../assets/icons/search.png";
import editBtn from '../../../../assets/icons/edit-black.svg'
import { MdDeleteForever } from "react-icons/md";

const PaymentListSection = (props) => {
  const {
    list,
    handleEdit,
    handleDelete,
    confirmDelete,
    payReciptList,
    setPayRecieptList,
    toEdit,
    paymentAdd,
    getData2,
    method,
    getPaymentReciept,
    formatList,
    permissions,
  } = props;

  const handleSearch = async (e) => {
    try {
      let tempData, tempList;
      if (payReciptList) {
        let value = e.target.value.toLocaleLowerCase();
        if (value != "") {
          let response;
          const param = { params: { method: paymentAdd.method } };
          response = await getPaymentReciept(param);
          if (response.success) {
            tempList = formatList(response.data);
          }
          if (tempList.length > 0) {
            tempData = tempList?.filter((x) => {
              let searchInString = `${
                x.voucher_number?.toLocaleLowerCase() +
                " " +
                x.account_name?.toLocaleLowerCase()
              }`;
              let search = searchInString?.includes(value);
              if (search) {
                return true;
              }
            });
            setPayRecieptList(tempData);
          }
        } else {
          getData2();
        }
      }
    } catch {}
  };

  return (
    <div
      className="payment-table-container p-0 mt-1"
      style={{ borderRadius: "0.3125rem 0.3125rem 0rem 0rem" }}
    >
      <div className="payment-table-card">
        <table className="table table-light table-hover payment-table">
          <thead>
            <tr>
              <th>SL</th>
              <th style={{ width: "10rem" }}>Voucher</th>
              <th style={{ width: "18rem" }}>A/C Name</th>
              <th>Type</th>
              <th style={{ width: "15rem" }}>Naration</th>
              <th></th>
              <th width="310" className="ps-1 pe-0 text-end">
                <div className="w-100 d-flex justify-content-end pe-3 align-items-center">
                  <div
                    className="item_seach_bar_cont rounded-2 px-0 pe-1 mx-0"
                    style={{ height: "2.0625rem", width: "fit-content" }}
                  >
                    <img src={search} className="search_img ms-3 py-2" />
                    <input
                      className="item_search_bar rounded-2 border-0 py-1 px-1"
                      style={{ height: "2rem" }}
                      placeholder="Search"
                      type="text"
                      onChange={handleSearch}
                    />
                  </div>
                </div>
              </th>
              <th style={{ borderRight: "0px", width: "5rem" }} className="end">
                <div className="btn btn-sm btn-secondary filter-btn px-3">
                  Filter
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {payReciptList?.length > 0 ? (
              payReciptList.map((data, i) => {
                return (
                  <tr>
                    <td>{i + 1}</td>
                    <td className="text-center">{data?.voucher_number}</td>
                    <td className="text-center">{data?.account_name}</td>
                    <td className="text-center">
                      {method}
                    </td>
                    <td>{data?.narration}</td>
                    <td></td>
                    <td>
                    {(method==='Payment'&& !permissions.includes(1279)||method==='Receipt'&& !permissions.includes(1284)) &&
                      <div
                        className="button text-end pe-3"
                        onClick={(e) => handleEdit(data)}
                      >
                        <img src={editBtn} alt="edit_btn" />
                      </div>
                    }
                    </td>
                    <td>
                      {(method==='Payment'&& !permissions.includes(1280)||method==='Receipt'&& !permissions.includes(1285)) &&
                      <div
                        className="button"
                        onClick={(e) => confirmDelete(data.id)}
                      >
                        {<MdDeleteForever size={26} className="p-0" />}
                      </div>
                      }
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="fs-5 text-center" colspan={8}>
                  No Purchase Added Yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentListSection;
