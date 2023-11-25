import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

export const AccountChooseTable = (props) => {
  const {
    setChooseAccountModalShow,
    accList,
    handleAccountChooseSearch,
    handleAccChoose,
    handleSelectAll,
    accChooseList,
  } = props;

  const [searchedList, setSearchedList] = useState([]);

  useEffect(() => {
    setSearchedList(accList);
  }, [accList]);

  const handleSearch = async (e) => {
    try {
      let tempData,
        tempList = accList;
      if (accList) {
        let value = e.target.value.toLocaleLowerCase();
        if (value != "") {
          if (accList.length > 0) {
            tempData = tempList?.filter((x) => {
              let searchInString = `${
                x.code?.toLocaleLowerCase() +
                " " +
                x.name?.toLocaleLowerCase()
              }`;
              let search = searchInString?.includes(value);
              if (search) {
                return true;
              }
            });
            setSearchedList(tempData);
          }
        } else {
          setSearchedList(accList);
        }
      }
    } catch {}
  };

  return (
    <div className="position-relative">
      <div className="acc-choose-head ps-4 rounded-2 text-light py-3">
        Choose Account
      </div>
        <Form.Group className="row ps-3 mt-1 mx-0 p-1 align-items-center">
          <Form.Label className="col-2 mb-0 px-0">Search</Form.Label>
          <Form.Control
            className="purchase-input-text col-5 col-6"
            size="sm"
            onChange={handleSearch}
            placeholder="Search code or name"
            type="text"
          />
        </Form.Group>
      <div className="acc-choose-body m-3 mt-1">
        <table className="table acc-choose">
          <thead>
            <tr>
              <th className="text-start ps-3">Account Name</th>
              <th>Account Code</th>
              <th>
                <input
                  onChange={handleSelectAll}
                  type="checkbox"
                  checked={
                    accChooseList?.length > 0 &&
                    accChooseList?.length == accList?.length
                      ? true
                      : false
                  }
                />{" "}
                Select All
              </th>
            </tr>
          </thead>
          <tbody>
            {searchedList?.length > 0 &&
              searchedList.map((data, i) => (
                <tr key={i}>
                  <td className="text-start ps-3">{data.name}</td>
                  <td>{data.code}</td>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      checked={
                        accChooseList?.length > 0 &&
                        accChooseList?.findIndex((x) => x == data.code) >= 0
                          ? true
                          : false
                      }
                      onChange={(e) => handleAccChoose(data.code, e)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="row mx-0 pb-2">
        <div className="col-9" />
        <div className="mx-0 px-1 pe-0 col-1 col-2 pb-0 d-flex">
          <button
            onClick={() => setChooseAccountModalShow(false)}
            className="btn btn-sm btn-dark me-2"
          >
            Close
          </button>
          <button
            onClick={() => handleAccountChooseSearch()}
            className="btn btn-sm btn-dark"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};
