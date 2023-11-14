import React from "react";

export const AccJournalTable = (props) => {
    const {handleKeyDown,accJnlTable,setAccJnlTable} = props
  return (
    <div className="mt-2 acc-journal-table-cont" style={{ paddingRight: "2.4rem" }}>
      <table className="table acc-journal">
        <thead>
          <tr>
            <th width="270" className="text-start ps-4">
              Item Name
            </th>
            <th width="300">Description</th>
            <th width="180">Debit</th>
            <th width="180">Credit</th>
            <th width="90"><div className="btn btn-sm py-1 px-4 text-dark bg-light">Add</div></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="ps-3"><input className="text-start ps-2"/></td>
            <td><input/></td>
            <td><input/></td>
            <td><input/></td>
            <td><input/></td>
          </tr>
          <tr>
            <td className="ps-4 text-start">{"..."}</td>
            <td>{"..."}</td>
            <td>{"..."}</td>
            <td>{"..."}</td>
            <td>{"..."}</td>
          </tr>
          <tr>
            <td className="ps-4 text-start">{"..."}</td>
            <td>{"..."}</td>
            <td>{"..."}</td>
            <td>{"..."}</td>
            <td>{"..."}</td>
          </tr>
          <tr>
            <td className="ps-4 text-start">{"..."}</td>
            <td>{"..."}</td>
            <td>{"..."}</td>
            <td>{"..."}</td>
            <td>{"..."}</td>
          </tr>
          <tr>
            <td className="ps-4 text-start">{"..."}</td>
            <td>{"..."}</td>
            <td>{"..."}</td>
            <td>{"..."}</td>
            <td>{"..."}</td>
          </tr>
          <tr>
            <td className="ps-4 text-start">{"..."}</td>
            <td>{"..."}</td>
            <td>{"..."}</td>
            <td>{"..."}</td>
            <td>{"..."}</td>
          </tr>
          <tr>
            <td className="ps-4 text-start">{"..."}</td>
            <td>{"..."}</td>
            <td>{"..."}</td>
            <td>{"..."}</td>
            <td>{"..."}</td>
          </tr>
          <tr>
            <td className="text-start p-1 ps-4">
                <div style={{background: "#4A00A8"}} className="col-4 col-3 text-light cursor text-center px-2 py-1">{"< " +" Previous"}</div>
            </td>
            <td>
            </td>
            <td className="py-1 align-middle">
                Total <input disabled className="acc-journal-input m-0 ms-3"/>
            </td>
            <td className="py-1 align-middle">
             <input disabled className="acc-journal-input m-0 ms-3"/>
            </td>
            <td className="py-1 align-middle">
                <div style={{background: "#4A00A8"}} className="col-10 text-light cursor text-center px-2 py-1">{"Next " +" >"}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
