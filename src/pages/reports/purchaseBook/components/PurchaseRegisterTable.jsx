import React from 'react'
import { GrRefresh } from 'react-icons/gr'
import searchIcon from "../../../../assets/icons/search.png";

const PurchaseRegisterTable = () => {
  return (
    <div className="row mx-0 mt-3">
      <div className="daybook-cont">
        <div
          style={{ background: "#000" }}
          className="w-100 d-flex justify-content-end rounded-top-1"
        >
          <div className="col-3 p-2 stock-ledger-search d-flex align-items-center">
            <div className="col-1 me-2">
              <GrRefresh className="bg-light m-1 p-1 rounded-1" size={20} />
            </div>
            <div className="item_seach_bar_cont rounded-2 col-11 col-10">
              <img src={searchIcon} className="search_img me-3 ms-2 py-2" />
              <input
                className="item_search_bar rounded-2 border-0 py-1"
                placeholder="Search"
                type="text"
              />
            </div>
          </div>
        </div>
        <div className="stick-table table-scroll">
          <table className="table daybook-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Qty</th>
                <th>Ut</th>
                <th>Free</th>
                <th>Rate</th>
                <th>Gross</th>
                <th>Disc</th>
                <th>Disc Tax%</th>
                <th>Tax</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={10} className="w-100 m-0 p-0 border-0">
                  <div className="table-hd p-2 border-0">
                    <div className="d-flex ms-4 py-1 px-0 justify-content-between align-items-center">
                      Deatils : B2B/000002 &emsp;&emsp;&emsp;&emsp; Date :
                      07/10/2023 Sales (5 items) 
                      <div>
                        {">"}
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Item Name</td>
                <td>Qty</td>
                <td>Ut</td>
                <td>Free</td>
                <td>Rate</td>
                <td>Gross</td>
                <td>Disc</td>
                <td>Disc Tax%</td>
                <td>Tax</td>
                <td>Total</td>
              </tr>
              <tr>
                <td>Item Name</td>
                <td>Qty</td>
                <td>Ut</td>
                <td>Free</td>
                <td>Rate</td>
                <td>Gross</td>
                <td>Disc</td>
                <td>Disc Tax%</td>
                <td>Tax</td>
                <td>Total</td>
              </tr>
              <tr>
                <td>Item Name</td>
                <td>Qty</td>
                <td>Ut</td>
                <td>Free</td>
                <td>Rate</td>
                <td>Gross</td>
                <td>Disc</td>
                <td>Disc Tax%</td>
                <td>Tax</td>
                <td>Total</td>
              </tr>
              <tr>
                <td>Item Name</td>
                <td>Qty</td>
                <td>Ut</td>
                <td>Free</td>
                <td>Rate</td>
                <td>Gross</td>
                <td>Disc</td>
                <td>Disc Tax%</td>
                <td>Tax</td>
                <td>Total</td>
              </tr>
              <tr>
                <td>Item Name</td>
                <td>Qty</td>
                <td>Ut</td>
                <td>Free</td>
                <td>Rate</td>
                <td>Gross</td>
                <td>Disc</td>
                <td>Disc Tax%</td>
                <td>Tax</td>
                <td>Total</td>
              </tr>
              <tr>
                <td>Item Name</td>
                <td>Qty</td>
                <td>Ut</td>
                <td>Free</td>
                <td>Rate</td>
                <td>Gross</td>
                <td>Disc</td>
                <td>Disc Tax%</td>
                <td>Tax</td>
                <td>Total</td>
              </tr>
              <tr>
                <td>Item Name</td>
                <td>Qty</td>
                <td>Ut</td>
                <td>Free</td>
                <td>Rate</td>
                <td>Gross</td>
                <td>Disc</td>
                <td>Disc Tax%</td>
                <td>Tax</td>
                <td>Total</td>
              </tr>
              <tr>
                <td>Item Name</td>
                <td>Qty</td>
                <td>Ut</td>
                <td>Free</td>
                <td>Rate</td>
                <td>Gross</td>
                <td>Disc</td>
                <td>Disc Tax%</td>
                <td>Tax</td>
                <td>Total</td>
              </tr>
              <tr>
                <td>Item Name</td>
                <td>Qty</td>
                <td>Ut</td>
                <td>Free</td>
                <td>Rate</td>
                <td>Gross</td>
                <td>Disc</td>
                <td>Disc Tax%</td>
                <td>Tax</td>
                <td>Total</td>
              </tr>
              <tr>
                <td>Item Name</td>
                <td>Qty</td>
                <td>Ut</td>
                <td>Free</td>
                <td>Rate</td>
                <td>Gross</td>
                <td>Disc</td>
                <td>Disc Tax%</td>
                <td>Tax</td>
                <td>Total</td>
              </tr>
              <tr>
                <td>Item Name</td>
                <td>Qty</td>
                <td>Ut</td>
                <td>Free</td>
                <td>Rate</td>
                <td>Gross</td>
                <td>Disc</td>
                <td>Disc Tax%</td>
                <td>Tax</td>
                <td>Total</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PurchaseRegisterTable