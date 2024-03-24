import React, { useEffect, useState } from "react";
import "./idCodeConfig.css";
import { Form } from "react-bootstrap";
import { Checkbox, Dropdown } from "semantic-ui-react";
import searchIcon from "../../assets/icons/search.png";
import { HiDotsVertical } from "react-icons/hi";
import pencilIcon from "../../assets/icons/blue_pencil.png";
import deleteBtn from "../../assets/icons/delete.svg";
import useBaseServices from "../../services/master/baseServices";
import Swal from "sweetalert2";
import useItemServices from "../../services/master/itemServices";

const initCodeId = {
  next_value: null,
  sub_id: null,
  types: null,
  postfix: false,
  prefix: true,
  full_id: null,
};

export const IdCodeConfig = () => {
  const [listShow, setListShow] = useState(false);
  const [idList, setIdList] = useState([]);
  const [codeList, setCodeList] = useState([]);
  const [codeId, setCodeId] = useState(initCodeId);

  const { getCodeIdList, postCode } = useBaseServices();
  const { getCode } = useItemServices();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      let resp = await getCodeIdList();
      let resp2 = await getCode();
      if (resp?.success) {
        setIdList(() => resp.data.map((data) => ({ value: data, text: data })));
      }
      if (resp2?.success) setCodeList(resp2.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleToUpperCase = (data) => {
    let keysOfData,
      tempData = { ...data };
    if (typeof data == "object") keysOfData = Object.keys(data);
    if (!keysOfData?.length > 0) return 0;
    keysOfData.map((item) => {
      if (typeof data[item] == "string" && item != "method") {
        let itemTemp = data[item]?.toUpperCase();
        tempData = { ...tempData, [item]: itemTemp };
      }
    });
    return tempData;
  };

  const handleChange = (e, data) => {
    var name = e.target.name;
    var value = e.target.value || null;
    let tempCodeId = { ...codeId };
    if (data) {
      name = data.name;
      value = data.value;
    }
    if (name?.match(/postfix|prefix/g)) {
      tempCodeId = {
        ...tempCodeId,
        postfix: !codeId.postfix,
        prefix: !codeId.prefix,
      };
    } else tempCodeId = { ...tempCodeId, [name]: value };

    if (tempCodeId.postfix) {
      tempCodeId = {
        ...tempCodeId,
        full_id: `${tempCodeId.next_value || ""}${tempCodeId.sub_id || ""}`,
      };
    } else
      tempCodeId = {
        ...tempCodeId,
        full_id: `${tempCodeId.sub_id || ""}${tempCodeId.next_value || ""}`,
      };

    setCodeId({ ...tempCodeId });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(!codeId.types){
        Swal.fire('Please select type','','warning')
      }
      let tempData = handleToUpperCase(codeId)
      const resp = await postCode(tempData);
      if (resp.success) {
        Swal.fire("", "", "success");
        setCodeId(initCodeId);
        getData();
      }
    } catch (err) {}
  };

  return (
    <div className="id-code-config">
      <form onSubmit={handleSubmit}>
        <div className="p-3">
          <h5>Add Code Configuration</h5>
          <div className="row mx-0 mt-3">
            <div className="col-5 ps-4">
              <Form.Group className="code-conf-input-cont row mx-0">
                <Form.Label>Select Type</Form.Label>
                <div className="col-10">
                  <Dropdown
                    clearable
                    selection
                    search
                    // onKeyDown={handleKeyDown}
                    onChange={handleChange}
                    className="purchase-select code-conf d-flex align-items-center py-0 form-control"
                    name="types"
                    placeholder="select"
                    value={codeId.types || ""}
                    options={idList}
                  />
                </div>
              </Form.Group>
              <Form.Group className="code-conf-input-cont row mx-0">
                <Form.Label>Prefix/PostFix</Form.Label>
                <div className="col-10 px-0 d-flex gap-4 ps-2">
                  <label
                    htmlFor="prefix-checkbox"
                    className="code-conf-checkbox-cont"
                  >
                    <input
                      checked={codeId.prefix}
                      name="prefix"
                      onChange={handleChange}
                      id="prefix-checkbox"
                      type="checkbox"
                      className="permission-checkbox"
                    />
                    Prefix
                  </label>
                  <label
                    htmlFor="postfix-checkbox"
                    className="code-conf-checkbox-cont"
                  >
                    <input
                      checked={codeId.postfix}
                      name="postfix"
                      onChange={handleChange}
                      id="postfix-checkbox"
                      type="checkbox"
                      className="permission-checkbox"
                    />
                    Postfix
                  </label>
                </div>
              </Form.Group>
              <Form.Group className="code-conf-input-cont row mx-0 align-items-center">
                <Form.Label className="col-2 m-0">FULL ID</Form.Label>
                <div className="col-9">
                  <Form.Control
                    disabled
                    value={codeId.full_id || ""}
                    className="purchase-select code-conf d-flex align-items-center py-0 form-control"
                  />
                </div>
              </Form.Group>
            </div>
            <span className="col-1" />
            <div className="col-5">
              <Form.Group className="code-conf-input-cont row mx-0 align-items-center">
                <Form.Label>Suffix</Form.Label>
                <div className="col-12">
                  <Form.Control
                    required
                    onChange={handleChange}
                    name="sub_id"
                    value={codeId.sub_id||''}
                    placeholder="#DC"
                    className="purchase-select code-conf d-flex align-items-center py-0 form-control"
                  />
                </div>
              </Form.Group>
              <Form.Group className="code-conf-input-cont row mx-0 align-items-center">
                <Form.Label>Next Value</Form.Label>
                <div className="col-12">
                  <Form.Control
                    required
                    onChange={handleChange}
                    type="number"
                    name="next_value"
                    value={codeId.next_value||''}
                    placeholder="#DC"
                    className="purchase-select code-conf d-flex align-items-center py-0 form-control"
                  />
                </div>
              </Form.Group>
            </div>
          </div>
        </div>
        <div
          style={{ background: "white" }}
          className="row justify-content-end gap-3 py-3 px-5 mx-0"
        >
          <button
            type="clear"
            className="company-add-btn clear btn col-1 col-2"
          >
            Clear
          </button>
          <button
            type="submit"
            className="company-add-btn next btn col-1 col-2"
          >
            Save
          </button>
        </div>
      </form>
      <div className="p-3">
        <div className="code-conf-table-cont row mx-0 gap-3">
          <div className="item_seach_bar_cont rounded-2 col-3">
            <img src={searchIcon} className="search_img me-3 ms-2 py-2" />
            <input
              onChange={handleChange}
              // value={search}
              // onChange={handleSearch}
              className="item_search_bar rounded-2 border-0 py-1"
              placeholder="Search"
              type="text"
            />
          </div>
          <div className="company-add-btn next btn col-1 col-2">Search</div>
          <table className="table code-conf">
            <thead>
              <tr>
                <th className="rounded-top-3 rounded-end-0">No</th>
                <th>Code Types</th>
                <th>Suffix</th>
                <th>
                  Post/
                  <br />
                  Prefix
                </th>
                <th>Next Value</th>
                <th>Full ID</th>
                <th className="rounded-top-3 rounded-start-0"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="ps-2">
                  <div className="code-conf-td rounded-start-4">frerewwf</div>
                </td>
                <td>
                  <div className="code-conf-td">frerewwf</div>
                </td>
                <td>
                  <div className="code-conf-td">frerewwf</div>
                </td>
                <td>
                  <div className="code-conf-td">frerewwf</div>
                </td>
                <td>
                  <div className="code-conf-td">frerewwf</div>
                </td>
                <td>
                  <div className="code-conf-td">frerewwf</div>
                </td>
                <td className="pe-2">
                  <div className="code-conf-td rounded-end-4 gap-3">
                    <Checkbox toggle />
                    <HiDotsVertical size={"1rem"} />
                    {listShow === 1 && (
                      <div className="company-menue-dropdown">
                        <div className="d-flex cursor gap-3">
                          <img src={pencilIcon} alt="edit" /> Edit
                        </div>
                        <div className="d-flex cursor gap-3">
                          <img src={deleteBtn} alt="edit" /> Delete
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="ps-2">
                  <div className="code-conf-td rounded-start-4">frerewwf</div>
                </td>
                <td>
                  <div className="code-conf-td">frerewwf</div>
                </td>
                <td>
                  <div className="code-conf-td">frerewwf</div>
                </td>
                <td>
                  <div className="code-conf-td">frerewwf</div>
                </td>
                <td>
                  <div className="code-conf-td">frerewwf</div>
                </td>
                <td>
                  <div className="code-conf-td">frerewwf</div>
                </td>
                <td className="pe-2">
                  <div className="code-conf-td rounded-end-4 gap-3">
                    <Checkbox toggle />
                    <HiDotsVertical size={"1rem"} />
                    {listShow === 1 && (
                      <div className="company-menue-dropdown">
                        <div className="d-flex cursor gap-3">
                          <img src={pencilIcon} alt="edit" /> Edit
                        </div>
                        <div className="d-flex cursor gap-3">
                          <img src={deleteBtn} alt="edit" /> Delete
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="ps-2">
                  <div className="code-conf-td rounded-start-4">frerewwf</div>
                </td>
                <td>
                  <div className="code-conf-td">frerewwf</div>
                </td>
                <td>
                  <div className="code-conf-td">frerewwf</div>
                </td>
                <td>
                  <div className="code-conf-td">frerewwf</div>
                </td>
                <td>
                  <div className="code-conf-td">frerewwf</div>
                </td>
                <td>
                  <div className="code-conf-td">frerewwf</div>
                </td>
                <td className="pe-2">
                  <div className="code-conf-td rounded-end-4 gap-3">
                    <Checkbox toggle />
                    <HiDotsVertical size={"1rem"} />
                    {listShow === 1 && (
                      <div className="company-menue-dropdown">
                        <div className="d-flex cursor gap-3">
                          <img src={pencilIcon} alt="edit" /> Edit
                        </div>
                        <div className="d-flex cursor gap-3">
                          <img src={deleteBtn} alt="edit" /> Delete
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="ps-2">
                  <div className="code-conf-td rounded-start-4">frerewwf</div>
                </td>
                <td>
                  <div className="code-conf-td">frerewwf</div>
                </td>
                <td>
                  <div className="code-conf-td">frerewwf</div>
                </td>
                <td>
                  <div className="code-conf-td">frerewwf</div>
                </td>
                <td>
                  <div className="code-conf-td">frerewwf</div>
                </td>
                <td>
                  <div className="code-conf-td">frerewwf</div>
                </td>
                <td className="pe-2">
                  <div className="code-conf-td rounded-end-4 gap-3">
                    <Checkbox toggle />
                    <HiDotsVertical size={"1rem"} />
                    {listShow === 1 && (
                      <div className="company-menue-dropdown">
                        <div className="d-flex cursor gap-3">
                          <img src={pencilIcon} alt="edit" /> Edit
                        </div>
                        <div className="d-flex cursor gap-3">
                          <img src={deleteBtn} alt="edit" /> Delete
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="ps-2">
                  <div className="code-conf-td rounded-start-4">frerewwf</div>
                </td>
                <td>
                  <div className="code-conf-td">frerewwf</div>
                </td>
                <td>
                  <div className="code-conf-td">frerewwf</div>
                </td>
                <td>
                  <div className="code-conf-td">frerewwf</div>
                </td>
                <td>
                  <div className="code-conf-td">frerewwf</div>
                </td>
                <td>
                  <div className="code-conf-td">frerewwf</div>
                </td>
                <td className="pe-2">
                  <div className="code-conf-td rounded-end-4 gap-3">
                    <Checkbox toggle />
                    <HiDotsVertical size={"1rem"} />
                    {listShow === 1 && (
                      <div className="company-menue-dropdown">
                        <div className="d-flex cursor gap-3">
                          <img src={pencilIcon} alt="edit" /> Edit
                        </div>
                        <div className="d-flex cursor gap-3">
                          <img src={deleteBtn} alt="edit" /> Delete
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="ps-2">
                  <div className="code-conf-td rounded-start-4">frerewwf</div>
                </td>
                <td>
                  <div className="code-conf-td">frerewwf</div>
                </td>
                <td>
                  <div className="code-conf-td">frerewwf</div>
                </td>
                <td>
                  <div className="code-conf-td">frerewwf</div>
                </td>
                <td>
                  <div className="code-conf-td">frerewwf</div>
                </td>
                <td>
                  <div className="code-conf-td">frerewwf</div>
                </td>
                <td className="pe-2">
                  <div className="code-conf-td rounded-end-4 gap-3">
                    <Checkbox toggle />
                    <HiDotsVertical size={"1rem"} />
                    {listShow === 1 && (
                      <div className="company-menue-dropdown">
                        <div className="d-flex cursor gap-3">
                          <img src={pencilIcon} alt="edit" /> Edit
                        </div>
                        <div className="d-flex cursor gap-3">
                          <img src={deleteBtn} alt="edit" /> Delete
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="ps-2">
                  <div className="code-conf-td rounded-start-4">frerewwf</div>
                </td>
                <td>
                  <div className="code-conf-td">frerewwf</div>
                </td>
                <td>
                  <div className="code-conf-td">frerewwf</div>
                </td>
                <td>
                  <div className="code-conf-td">frerewwf</div>
                </td>
                <td>
                  <div className="code-conf-td">frerewwf</div>
                </td>
                <td>
                  <div className="code-conf-td">frerewwf</div>
                </td>
                <td className="pe-2">
                  <div className="code-conf-td rounded-end-4 gap-3">
                    <Checkbox toggle />
                    <HiDotsVertical size={"1rem"} />
                    {listShow === 1 && (
                      <div className="company-menue-dropdown">
                        <div className="d-flex cursor gap-3">
                          <img src={pencilIcon} alt="edit" /> Edit
                        </div>
                        <div className="d-flex cursor gap-3">
                          <img src={deleteBtn} alt="edit" /> Delete
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
