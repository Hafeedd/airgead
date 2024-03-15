import React from "react";
import "../productionreport.css";

const ProductionRegisterTable = (params) => {
  const { filteredProductList, accDetails, searchItem, searchType } = params;

  const searchedData = () => {};
  return (
    <div className="mt-4 pro-table-scroller">
      {filteredProductList.length > 0 ? (
        filteredProductList.map((data, i) => {
          return (
            <div className="mx-0 pt-4" key={i}>
              <div className="rounded production-head ms-2 me-2 py-3 d-flex justify-content-between">
                <div className="ms-3">
                  Doc.No : {data.daybook_part.voucher_number}
                </div>
                <div>
                  Date :{" "}
                  {new Date(data.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </div>
                <div>
                  Qty Produced :{" "}
                  {Number(
                    data.produced_items.reduce((x, y) => x + y.qty, 0)
                  ).toFixed(2)}
                </div>
                <div>
                  By Produced :
                  {Number(
                    data.produced_items
                      .flatMap((data) => data?.by_products)
                      ?.reduce((a, b) => a + b.retail_rate, 0)
                  ).toFixed(2)}
                </div>
                <div>
                  Qty Used :{" "}
                  {Number(
                    data.produced_items
                      .flatMap((data) => data?.raw_materials)
                      ?.reduce((a, b) => a + b.qty, 0)
                  ).toFixed(2)}
                </div>
                <div className="me-2">
                  Expense :{" "}
                  {Number(
                    data.produced_items
                      .flatMap((data) => data?.expense_accounts)
                      ?.reduce((a, b) => a + b.amount, 0)
                  ).toFixed(2)}{" "}
                  ({data.produced_items.length} Items)
                </div>
              </div>

              <div className="col-12 d-flex justify-content-between">
                <div className="col-6 mt-2 pe-1">
                  <div className="text-start bg-clr fw-bold fs-6 rounded-top ps-3 ms-2 w-100 py-1">
                    Produced ({data?.produced_items.length} Item )
                  </div>
                  <table className="production-table ms-2 me-2">
                    <thead>
                      <tr>
                        <th className="ps-3 text-start">Item Name</th>
                        <th>QTY</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.produced_items?.length > 0 &&
                        data?.produced_items?.map((x, i) => {
                          return (
                            <tr
                              key={i}
                              style={{
                                color:
                                  x.fk_item === searchItem &&
                                  x.fk_type === searchType
                                    ? "red"
                                    : x.fk_item === searchItem
                                    ? "blue"
                                    : x.fk_type === searchType
                                    ? "blue"
                                    : "black",
                                fontStyle: "bold",
                              }}
                            >
                              <td className="ps-3 text-start">
                                {x?.item_details?.name}
                              </td>
                              <td>{x?.qty}</td>
                            </tr>
                          );
                        })}
                      {/* <tr>
                  <td className="ps-3 text-start">Item Number 1</td>
                  <td>23.5</td>
                </tr> */}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td className="bottom-left"></td>
                        <td className="production-table-fl bottom-right align-middle fw-bold ">
                          {Number(
                            data?.produced_items?.reduce((x, y) => x + y.qty, 0)
                          ).toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <div className="col-6 mt-2 me-2 pe-2 ps-2">
                  <div className="text-start bg-clr fw-bold rounded-top ps-3 py-1">
                    Raw Materials ({" "}
                    {
                      data?.produced_items?.flatMap(
                        (data) => data?.raw_materials
                      ).length
                    }{" "}
                    Items )
                  </div>
                  <table className="production-table">
                    <thead>
                      <tr>
                      <th className="text-start bg-clr ps-3">Item Produced</th>
                        <th className="text-start bg-clr ps-3">
                          Material Name
                        </th>
                        <th>Qty</th>
                        <th>Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.produced_items?.length > 0 &&
                        data?.produced_items?.flatMap((item) =>
                          item?.raw_materials.map((material, i) => (
                            <tr key={i}>
                              <td className="text-start ps-3">
                                 {item?.id == material?.fk_production_item &&
                                      item?.item_details?.name}</td>
                              <td className="ps-3 text-start">
                                {material?.item_details?.name}
                              </td>
                              <td>{Number(material?.qty).toFixed(2)}</td>
                              <td>{Number(material?.cost).toFixed(2)}</td>
                            </tr>
                          ))
                        )}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan={3} className="bottom-left"></td>
                        <td className="bottom-right align-middle fw-bold">
                          {Number(
                            data?.produced_items
                              ?.flatMap((data) => data?.raw_materials)
                              ?.reduce((a, b) => a + b.cost, 0)
                          ).toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              <div>
                <div className="col-12 d-flex mt-2 justify-content-between">
                  <div className="col-5 col-6 mt-2 pe-1">
                    <div className="text-start bg-clr fw-bold fs-6 rounded-top ps-3 ms-2 w-100 py-1">
                      By Product Details
                    </div>
                    <table className="production-table ms-2 me-2 shadow p-3 mb-5 bg-white rounded">
                      <thead>
                        <tr>
                          <th className="ps-3 text-start">Item Name</th>
                          <th>Qty</th>
                          <th>Unit</th>
                          <th>Cost</th>
                          <th>Value</th>
                          <th>Margin</th>
                          <th>MRP</th>
                          <th>S.rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.produced_items.length > 0 &&
                          data?.produced_items?.flatMap((item) =>
                            item?.by_products.map((byproduct, i) => (
                              <tr key={i}>
                                <td className="ps-3 text-start">
                                  {byproduct?.item_details.name}
                                </td>
                                <td>{parseInt(byproduct?.qty || 0)}</td>
                                <td>
                                  {byproduct?.unit_details.property_value}
                                </td>
                                <td>
                                  {Number(byproduct?.cost || 0).toFixed(2)}
                                </td>
                                <td>
                                  {Number(byproduct?.value || 0).toFixed(2)}
                                </td>
                                <td>
                                  {Number(byproduct?.margin || 0).toFixed(2)}
                                </td>
                                <td>
                                  {Number(byproduct?.mrp_rate || 0).toFixed(2)}
                                </td>
                                <td>
                                  {Number(byproduct?.retail_rate || 0).toFixed(
                                    2
                                  )}
                                </td>
                              </tr>
                            ))
                          )}

                        {/* <tr>
                    <td className="ps-3 text-start">Item Number 1</td>
                    <td>01.0</td>
                    <td>0.0</td>
                    <td>102</td>
                    <td>10%</td>
                    <td>10%</td>
                    <td>0.00</td>
                    <td>12.0</td>
                  </tr> */}
                      </tbody>
                    </table>
                  </div>

                  <div className="col-6 col-7 mt-2 ms-2 pe-3 ps-1">
                    <div className="text-start bg-clr-1 fw-bold rounded-top ps-3 py-1">
                      Labour and Expenses
                    </div>
                    <table className="production-table-ls shadow p-3 mb-5 bg-white rounded">
                      <thead>
                        <tr>
                          <th className="text-center ps-1">
                            <div className="rounded me-3">Item Produced</div>
                          </th>
                          <th className="text-center">
                            <div className="rounded px-0 me-3">
                              Debit Account
                            </div>
                          </th>
                          <th className="text-center">
                            <div className="rounded px-0 me-3">Amount</div>
                          </th>
                          <th className="text-center">
                            <div className="rounded px-0 me-3">
                              Credit Account
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.produced_items.length > 0 &&
                          data?.produced_items?.flatMap((item) =>
                            item?.expense_accounts.map((expense, i) => (
                              <tr key={i}>
                                <td className="text-center">
                                  <div className="px-0 me-2 ">
                                    {item?.id == expense?.fk_production_item &&
                                      item?.item_details?.name}
                                  </div>
                                </td>
                                <td className="text-center">
                                  <div className="px-0  me-2">
                                    {
                                      accDetails?.filter(
                                        (x) =>
                                          x.value == expense?.fk_debit_account
                                      )[0].text
                                    }
                                  </div>
                                </td>
                                <td className="text-center">
                                  <div className="px-0  me-2">
                                    {Number(expense?.amount).toFixed(2)}
                                  </div>
                                </td>
                                <td className="text-center">
                                  {
                                    accDetails?.filter(
                                      (x) =>
                                        x.value == expense?.fk_credit_account
                                    )[0].text
                                  }
                                </td>
                              </tr>
                            ))
                          )}
                        {/* <tr>accDetails?.filter(x=>x.value==expense?.fk_debit_account)
                    <td className="text-center">
                      <div className="px-0  me-2">Meterial Number 1 </div>
                    </td>
                    <td className="text-center">
                      <div className="px-0  me-2">50.00</div>
                    </td>
                    <td className="text-center">
                      <div className="px-0  me-2">50.00</div>
                    </td>
                    <td className="text-center">50.00</td>
                  </tr> */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="mx-0 pt-4">
          <div className="rounded production-head ms-2 me-2 py-3 d-flex justify-content-between">
            <div className="ms-3">Doc.No : 00</div>
            <div>Date : 00/00/0000</div>
            <div>Qty Produced : 00</div>
            <div>By Produced : 00</div>
            <div>Qty Used : 00</div>
            <div className="me-2">Expense : 00</div>
          </div>

          <div className="col-12 d-flex justify-content-between">
            <div className="col-6 mt-2 pe-1">
              <div className="text-start bg-clr fw-bold fs-6 rounded-top ps-3 ms-2 w-100 py-1">
                Produced (0 Item )
              </div>
              <table className="production-table ms-2 me-2">
                <thead>
                  <tr>
                    <th className="ps-3 text-start">Item Name</th>
                    <th>QTY</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="ps-3 text-start">Item Name</td>
                    <td>00</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td className="bottom-left"></td>
                    <td className="production-table-fl bottom-right align-middle fw-bold ">
                      00
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="col-6 mt-2 me-2 pe-2 ps-2">
              <div className="text-start bg-clr fw-bold rounded-top ps-3 py-1">
                Raw Materials ( 0 Items )
              </div>
              <table className="production-table">
                <thead>
                  <tr>
                    <th className="text-start bg-clr ps-3">Item Produced</th>
                    <th className="text-start bg-clr ps-3">Material Name</th>
                    <th>Qty</th>
                    <th>Cost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="ps-3 text-start">Item Name</td>
                    <td className="text-start ps-3">Material Name</td>
                    <td>00</td>
                    <td>00</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} className="bottom-left"></td>
                    <td className="bottom-right align-middle fw-bold">00</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div>
            <div className="col-12 d-flex mt-2 justify-content-between">
              <div className="col-5 col-6 mt-2 pe-1">
                <div className="text-start bg-clr fw-bold fs-6 rounded-top ps-3 ms-2 w-100 py-1">
                  By Product Details
                </div>
                <table className="production-table ms-2 me-2 shadow p-3 mb-5 bg-white rounded">
                  <thead>
                    <tr>
                      <th className="ps-3 text-start">Item Name </th>
                      <th>Qty</th>
                      <th>Unit</th>
                      <th>Cost</th>
                      <th>Value</th>
                      <th>Margin</th>
                      <th>MRP</th>
                      <th>S.rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="ps-3 text-start">Item Name</td>
                      <td>00</td>
                      <td>00</td>
                      <td>00</td>
                      <td>00</td>
                      <td>00</td>
                      <td>00</td>
                      <td>00</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="col-6 col-7 mt-2 ms-2 pe-3 ps-1">
                <div className="text-start bg-clr-1 fw-bold rounded-top ps-3 py-1">
                  Labour and Expenses
                </div>
                <table className="production-table-ls shadow p-3 mb-5 bg-white rounded">
                  <thead>
                    <tr>
                      <th className="text-center ps-1">
                        <div className="rounded me-3">Item Produced</div>
                      </th>
                      <th className="text-center">
                        <div className="rounded px-0 me-3">Debit Account</div>
                      </th>
                      <th className="text-center">
                        <div className="rounded px-0 me-3">Amount</div>
                      </th>
                      <th className="text-center">
                        <div className="rounded px-0 me-3">Credit Account</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td className="text-center">
                      <div className="px-0  me-2">Item Name </div>
                    </td>
                    <td className="text-center">
                      <div className="px-0  me-2">00</div>
                    </td>
                    <td className="text-center">
                      <div className="px-0  me-2">00</div>
                    </td>
                    <td className="text-center">00</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductionRegisterTable;
