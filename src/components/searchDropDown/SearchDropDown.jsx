import React, { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import editBtn from "../../assets/icons/edit-black.svg";
import { Dropdown } from "semantic-ui-react";
import "./searchDropDown.css";
import { BsFillPlusSquareFill } from "react-icons/bs";

const SearchDropDown = ({
  containerClass,
  setShowDropdown,
  handleKeyDown,
  noAdd,
  id,
  setDataValue,
  selectedValue,
  options,
  setNew,
}) => {
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [tempList, setTempList] = useState(options[id] ? options[id] : null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (options[id]?.length > 0) setTempList([...options[id]]);
    if (selectedValue[id]) {
      options[id]?.map((item) => {
        if (item.value == selectedValue[id]) {
          setSearch(item?.text);
        }
      });
    } else {
      handleReset();
    }
  }, [selectedValue, options]);

  const handleSearch = (e) => {
    if (e.target.value !== "") e.target.value = e.target.value.toUpperCase();
    setSearch(e.target.value);
    setShow(true);
    var filteredList = options[id]?.filter(
      (item) =>
        item?.text?.toLowerCase().search(e.target.value.toLowerCase()) > -1
    );
    setTempList(filteredList);
  };

  const handleNewOption = (e) => {
    const data = { value: search, label: search };
    if (edit) {
      setNew(e, search, id, edit);
    } else {
      setNew(e, data, id);
    }
    setShow(false);
    setDataValue((data) => ({ ...data, [id]: search }));
    setShowDropdown("");
  };

  const handleReset = () => {
    setShowDropdown("");
    setShow(false);
    setSearch("");
  };

  const handleChange = (e, data) => {
    let value = data.value;
    if (value === "") {
      setDataValue((data) => ({ ...data, [id]: null }));
    } else {
      if (value !== "" && typeof value !== "number")
        value = value.toUpperCase();
      setDataValue((data) => ({ ...data, [id]: value }));
    }
  };

  const handleEdit = (data) => {
    setSearch(data.text);
    setEdit(data.value);
  };

  const handleClose = () => {
    setShow(false);
    setSearch(null);
    setEdit(false);
  };

  return (
    <Form.Group
      className={`search_container search-dropdown h-100 ${containerClass}`}
    >
      <Dropdown
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={selectedValue[id] || ""}
        className="drop_input mx-0"
        placeholder="select"
        fluid
        search
        clearable
        selection
        options={tempList}
      />
      {!noAdd && (
        // <div className="dropdown-btn my-0" onClick={() => setShow(!show)}>
          <BsFillPlusSquareFill onClick={() => setShow(!show)} className="dropdown-btn"/>
        // </div>
      )}
      <Modal
        size="md"
        centered
        onHide={handleClose}
        show={show}
        contentClassName="search-dropdown"
      >
        <Modal.Body className="dropdown-body p-0 pb-2">
          <div className="dropdown-header">Add Design</div>
          <div className="px-4 pt-1 w-100">
            <div className="drop-input-cont position-relative align-items-center d-flex mt-2">
              <input
                onChange={handleSearch}
                placeholder="Add category here"
                type="text"
                className="item_input height ms-0 position-relative"
                value={search || ""}
              />
              <div onClick={handleNewOption} className="btn drop-add-btn">
                {edit !== false ? "Edit" : "Add"}
              </div>
            </div>
            <div className="dropdown-add-items rounded-2 p-2 pb-1 mt-4">
              {tempList?.length > 0 ? (
                tempList.map((item, i) => (
                  <div key={i} className="dropdown-add-item ms-0 mb-2 p-1 px-2">
                    {item.text}
                    <img
                      onClick={() => handleEdit(item)}
                      className="cursor"
                      src={editBtn}
                    />
                  </div>
                ))
              ) : (
                <div className="dropdown-add-item ms-0 mb-2 p-1 px-2">
                  No Item Added yet
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Form.Group>
  );
};

export default SearchDropDown;
