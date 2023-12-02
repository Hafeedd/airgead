import React, { useEffect, useState } from "react";
import { GrRefresh } from "react-icons/gr";
import searchIcon from "../../../../assets/icons/search.png";
import { useReportsServices } from "../../../../services/reports/reports";
import { useNavigate } from "react-router";

export const StockJournalReportTable = (props) => {
  const { params } = props;
  const [list, setList] = useState([]);
  const navigate = useNavigate()
  const { getStockJournalReport } = useReportsServices();

  useEffect(() => {
    getData();
  }, [params]);

  const getData = async () => {
    try {
      const response = await getStockJournalReport(params);
      if (response.success) {
        setList(response.data.stock_journal_report);
      }
    } catch (err) {}
  };

  console.log(list);

  return (
    <div>
      <div className="mt-3">
        <div
          style={{ background: "#000" }}
          className="w-100 d-flex justify-content-end align-items-center rounded-top-2"
        >
          <div className="col-3 p-2 stock-ledger-search d-flex align-items-center">
            <div className="col-1 me-2">
              <GrRefresh className="bg-light m-1 p-1 rounded-1" size={20} />
            </div>
            <div className="item_seach_bar_cont rounded-2 col-11 col-10">
              <img src={searchIcon} className="search_img me-3 ms-2 py-2" />
              <input
                // value={search}
                //   onChange={handleSearch}
                className="item_search_bar rounded-2 border-0 py-1"
                placeholder="Search"
                type="text"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="stock-journal-report-table-cont">
        <table className="table">
          <thead className="text-light">
            <tr>
              <th width="210" className="text-start ps-3">
                Item Name
              </th>
              <th width="180" className="">
                QTY
              </th>
              <th className="text-start ps-3">UT</th>
              <th width="40">Add/Less</th>
              <th width="150">Cost</th>
              <th>Gross</th>
              <th>Net Amnt</th>
            </tr>
          </thead>
          <tbody>
            {list?.length > 0 ?
              list?.map((data, i) => 
              {
                let total_qty = 0
                let total_gross = 0
              return(
                <>
                  <tr key={i}>
                    <td className="top-tr text-start ps-3 py-3" colSpan={7}>
                      Doc Number : {data.document_number} {" ( Date "}{" "}
                      {data.date?.slice(0, 10)?.split("-").reverse().join("-")}{" "}
                      {") ( "}
                      {data?.items?.length} {" Items )"}
                    </td>
                  </tr>
                  {data?.items?.length > 0 ? (
                    data.items.map((item, i) => 
                    {
                      total_qty = total_qty+parseInt(item?.qty||0)||0
                      total_gross = total_gross + parseInt(item?.gross||0)||0
                    return (
                      <tr>
                        <td className="py-4">{item.item_name || ""}</td>
                        <td className="py-4">{item.qty || ""}</td>
                        <td className="py-4 text-start ps-3">
                          {item.unit || ""}
                        </td>
                        <td className="py-4">
                          {item.add_qty > 0 ? "ADD" : "LESS"}
                        </td>
                        <td className="py-4">{item.cost || ""}</td>
                        <td className="py-4">{item.gross || ""}</td>
                        <td className="py-4">{item.qty * item.cost || 0}</td>
                      </tr>
                    )})
                  ) : (
                    <tr>
                      <td className="fs-5 text-center" colSpan={7}>
                        No items
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td className="bottom-tr py-4" colSpan={1}></td>
                    <td className="bottom-tr align-middle px-2">
                      <div className="input rounded-2">{total_qty}</div>
                    </td>
                    <td className="bottom-tr py-4" colSpan={3}></td>
                    <td className="bottom-tr align-middle px-2">
                      <div className="input rounded-2">{total_gross}</div>
                    </td>
                    <td className="bottom-tr py-4"></td>
                  </tr>
                </>
              )}):
              <tr><td colSpan={7} className="fs-5 p-3">There is no Stock report to show</td></tr>}
          </tbody>
        </table>
      </div>
      <br />
      <div className="row">
        <div className="w-100 d-flex justify-content-end mb-0">
          <div onClick={()=>navigate(-1)} className="btn btn-dark col-1 col-2 py-0">Exit</div>
        </div>
      </div>
    </div>
  );
};
