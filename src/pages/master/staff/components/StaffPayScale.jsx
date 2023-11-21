import { Hidden } from "@mui/material";
import SearchDropDown from "../../../../components/searchDropDown/SearchDropDown";
import { StaffTable } from "./StaffTable";
import { useEffect, useState } from "react";
import useStaffServices from "../../../../services/master/staffServices";
import Swal from "sweetalert2";
import useItemServices from "../../../../services/master/itemServices";
import useOnKey from "../../../../hooks/onKeyFunct/onKeyFunct";

export const StaffPayScale = (props) => {
  const { search, setSearch, staffList,
     setStaffList, handleEdit, getData } = props;

  const [staffPayList, setStaffPayList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [showDropdown, setShowDropdown] = useState("");
  const [ref, setRef] = useState(null);
  const [payScaleAdd, setPayScaleAdd] = useState({
    salary: null,
    salary_date: null,
    allowed_leave: null,
    leave_cut: null,
    pf: null,
    esi: null,
    insurance: null,
    other: 0,
  });

  const [filter, setFilter] = useState({
    designation: null,
    staff_grade: null,
  });
  const [listItem, setListItem] = useState({
    designation: [],
    staff_grade: [],
  });

  const { getProperty } = useItemServices();
  const { postStaffPayScale } = useStaffServices();
  const { formRef, handleKeyDown } = useOnKey(ref, setRef);

  useEffect(() => {
    getDataOfProperty();
  }, []);

  const handleStaffSelection = (id, e) => {
    let tempList = staffPayList;
    let check = tempList.findIndex((x) => x == id);
    if (check >= 0) {
      tempList.splice(check, 1);
    } else {
      tempList.push(id);
    }
    setStaffPayList([...tempList]);
  };

  const handleChange = (e) => {
    if (e.target.value === "") {
      setPayScaleAdd({ ...payScaleAdd, [e.target.name]: null });
    } else {
      setPayScaleAdd({ ...payScaleAdd, [e.target.name]: e.target.value });
    }
    if (e.target.value === "" && e.target.name == "other") {
      setPayScaleAdd({ ...payScaleAdd, [e.target.name]: 0 });
    }
  };

  const getDataOfProperty = async () => {
    let list = {};
    const miniFunct = (data) => {
      const keys = Object.keys(listItem);
      data.map((x) => {
        if (keys.indexOf(x.property_type) > -1) {
          if (!list[x.property_type]?.length > 0) list[x.property_type] = [];
          list[x?.property_type].push({
            value: x["id"],
            text: x["property_value"],
          });
        }
      });
    };
    try {
      let res = await getProperty();
      if (res.success) miniFunct(res?.data);
      setListItem(list);
    } catch (err) {}
  };

  const handleSelectAll = () => {
    const staffListLength = searchList.length;
    if (staffPayList.length < 0 || staffPayList.length !== staffListLength) {
      setStaffPayList(searchList.map((x) => x.id));
    } else {
      setStaffPayList([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let submitData = { ...payScaleAdd, staff: staffPayList };
      let response = await postStaffPayScale(submitData);
      if (response.success) {
        Swal.fire("Success", "Staff payscale added successfully", "succes");
        handleClearAllPayScale();
        getData()
      } else {
        Swal.fire("Failed", "failed to add staff payscale", "error");
      }
    } catch (err) {
      Swal.fire("Failed", "failed to add staff payscale", "error");
    }
  };

  const handleClearAllPayScale = () => {
    setPayScaleAdd({
      salary: null,
      salary_date: null,
      allowed_leave: null,
      leave_cut: null,
      pf: null,
      esi: null,
      insurance: null,
      other: 0,
    });
    setStaffPayList([]);
  };

  return (
    <div className="supplier-add-cont pt-0">
      <form ref={formRef} onSubmit={handleSubmit} className="item_add_form pt-1 mt-1">
        <div className="d-flex w-100">
          <div className="supplier-add-form-part1 d-block col-6 row mx-0 px-0 pb-2 me-5">
            <div className="d-flex align-items-center ps-0 row mx-0 sup-input-cont my-1">
              <div className="col-11 row mx-0 ps-0 pe-1">
                <div className="mx-0 px-0 col-3 col-3">Designation</div>
                <div className="mx-0 px-0 col-8 col-9">
                  <SearchDropDown
                    containerClass="large"
                    id="designation"
                    noAdd={"true"}
                    options={listItem}
                    {...{ showDropdown, setShowDropdown, handleKeyDown }}
                    setDataValue={setFilter}
                    selectedValue={filter || ""}
                  />
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center ps-0 row mx-0 sup-input-cont my-1">
              <div className="col-11 row mx-0 ps-0 pe-1">
                <div className="mx-0 px-0 col-3 col-3">Staff Grades</div>
                <div className="mx-0 px-0 col-8 col-9">
                  <SearchDropDown
                    containerClass="large"
                    id="staff_grade"
                    noAdd={"true"}
                    options={listItem}
                    {...{ showDropdown, setShowDropdown, handleKeyDown }}
                    setDataValue={setFilter}
                    selectedValue={filter || ""}
                  />
                </div>
              </div>
            </div>

            <div className="ps-0 fs-5 py-3">Salary</div>

            <div className="d-flex align-items-center ps-0 row mx-0 sup-input-cont my-1">
              <div className="col-11 row mx-0 ps-0 pe-1">
                <div className="mx-0 px-0 col-3 col-3">Salary</div>
                <div className="mx-0 px-0 col-8 col-9">
                  <input
                    required
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    name="salary"
                    value={payScaleAdd?.salary || ""}
                    type="number"
                    className="item_input ms-0"
                  />
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center ps-0 row mx-0 sup-input-cont my-1">
              <div className="col-11 row mx-0 ps-0 pe-1">
                <div className="mx-0 px-0 col-3 col-3">Salary Date</div>
                <div className="mx-0 px-0 col-8 col-9">
                  <input
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    name="salary_date"
                    value={payScaleAdd?.salary_date || ""}
                    type="date"
                    className="item_input ms-0"
                  />
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center ps-0 row mx-0 sup-input-cont my-1">
              <div className="col-11 row mx-0 ps-0 pe-1">
                <div className="mx-0 px-0 col-3 col-3">Allowed Leave</div>
                <div className="mx-0 px-0 col-8 col-9">
                  <input
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    name="allowed_leave"
                    value={payScaleAdd?.allowed_leave || ""}
                    type="number"
                    className="item_input ms-0"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* ----------------------------------------Right Side ----------------------------------- */}
          <div className="supplier-add-form-part2 row mx-0 px-0 ps-5 me-0 col-5 col-6 border-0">
            <div className="fs-5 ps-0 mb-3 mt-2">Cutting</div>

            <div className="d-flex align-items-center ps-0 row mx-0 sup-input-cont my-1">
              <div className="col-12 row mx-0 ps-0 pe-1">
                <div className="mx-0 px-0 col-3">Leave Cut</div>
                <div className="mx-0 px-0 col-9">
                  <input
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    name="leave_cut"
                    value={payScaleAdd?.leave_cut || ""}
                    type="number"
                    className="item_input ms-0"
                  />
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center ps-0 row mx-0 sup-input-cont my-1">
              <div className="col-12 row mx-0 ps-0 pe-1">
                <div className="mx-0 px-0 col-3">PF</div>
                <div className="mx-0 px-0 col-9">
                  <input
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    name="pf"
                    value={payScaleAdd?.pf || ""}
                    type="number"
                    className="item_input ms-0"
                  />
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center ps-0 row mx-0 sup-input-cont my-1">
              <div className="col-12 row mx-0 ps-0 pe-1">
                <div className="mx-0 px-0 col-3">Esi</div>
                <div className="mx-0 px-0 col-9">
                  <input
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    name="esi"
                    value={payScaleAdd?.esi || ""}
                    type="number"
                    className="item_input ms-0"
                  />
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center ps-0 row mx-0 sup-input-cont my-1">
              <div className="col-12 row mx-0 ps-0 pe-1">
                <div className="mx-0 px-0 col-3">Insurance</div>
                <div className="mx-0 px-0 col-9">
                  <input
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    name="insurance"
                    value={payScaleAdd?.insurance || ""}
                    type="number"
                    className="item_input ms-0"
                  />
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center ps-0 row mx-0 sup-input-cont my-1">
              <div className="col-12 row mx-0 ps-0 pe-1">
                <div className="mx-0 px-0 col-3">Other</div>
                <div className="mx-0 px-0 col-9">
                  <input
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    name="other"
                    value={payScaleAdd?.other || ""}
                    type="number"
                    className="item_input ms-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      {/* <div className="d-flex"> */}

        <StaffTable
          payscale={true}
          {...{
            handleStaffSelection,
            search,
            setSearch,
            staffList,
            setStaffList,
            handleEdit,
            staffPayList,
            searchList,
            setSearchList,
            handleSelectAll,
            handleSubmit,
            filter,
            setFilter,
          }}
          />
        {/* </div> */}
      </form>
    </div>
  );
};
