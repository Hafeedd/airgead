import useItemServices from "../../../../services/master/itemServices";
import useOnKey from "../../../../hooks/onKeyFunct/onKeyFunct";
import useStaffServices from "../../../../services/master/staffServices";
import { useEffect, useState } from "react";
import SearchDropDown from "../../../../components/searchDropDown/SearchDropDown";
import Swal from "sweetalert2";
import StaffProfEducTable from ".//StaffProfEducTable";

export const AddStaff = (props) => {
  const { setEdit, edit, getMasetData } = props;

  const [ref, setRef] = useState(null);
  const [showDropdown, setShowDropdown] = useState();
  const [staffTableTab, setStaffTableTab] = useState(1);
  const [staffEducList, setstaffEducList] = useState([]);
  const [staffProfList, setstaffProfList] = useState([]);
  const [educIdList, setEducIdList] = useState([]);
  const [profIdList, setProfIdList] = useState([]);
  const [listItem, setListItem] = useState({
    designation: [],
    staff_grade: [],
  });

  const bloodOptions = [
    { label: "A+", value: "A+" },
    { label: "A-", value: "A-" },
    { label: "B+", value: "B-" },
    { label: "AB+", value: "AB-" },
    { label: "O+", value: "O-" },
    { label: "OTHER", value: "OTHER" },
  ];

  const [staffEducTable, setStaffEducTable] = useState({
    id: null,
    course: null,
    conducted: null,
    institution: null,
    score: null,
    year_pass: null,
  });

  const [staffProfTable, setStaffProfTable] = useState({
    id: null,
    profession: null,
    department: null,
    experience: null,
    from_date: null,
    to_date: null,
  });

  const [staffAdd, setStaffAdd] = useState({
    code: null,
    name: null,
    address: null,
    mobile: null,
    email: null,
    gender: "MALE",
    op_balance: null,
    type: "TO_RECEIVE",
    blood_gp: "A+",
    join_date: null,
    dob: null,
    remarks: null,
    blocked: null,
    image: null,
    destination: null,
    staff_grade: null,
    salary: null,
    salary_date: null,
    allowed_leave: null,
    leave_cut: null,
    pf: null,
    esi: null,
    insurance: null,
  });

  //education:[{id:value}],profession:[{id:value}]

  const { getProperty, postProperty, getCode } = useItemServices();
  const { postStaff, putStaff } = useStaffServices();

  const [handleKeyDown, formRef] = useOnKey(ref, setRef);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (edit) {
      const {
        education,
        profession,
        fk_designation,
        fk_staff_grade,
        ...others
      } = edit;
      setStaffAdd({
        ...others,
        designation: fk_designation,
        staff_grade: fk_staff_grade,
      });
      if (profession?.length > 0) {
        setstaffProfList(profession);
      }
      if (education?.length > 0) {
        setstaffEducList(education);
      }
    } else {
      handleClearAll();
    }
  }, [edit]);

  const handleToUpperCase = (data) => {
    let keysOfData,
      tempData = { ...data };
    if (typeof data == "object") keysOfData = Object.keys(data);
    if (!keysOfData?.length > 0) return 0;
    keysOfData.map((item) => {
      if (typeof data[item] == "string" && !item.match(/email/)) {
        let itemTemp = data[item]?.toUpperCase();
        tempData = { ...tempData, [item]: itemTemp };
      }
    });
    return tempData;
  };

  function removeNullValues(obj) {
    return Object.keys(obj).reduce((acc, key) => {
      if (obj[key] !== null) {
        acc[key] = obj[key];
      }
      return acc;
    }, {});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let submitData = { ...staffAdd, profession: [], education: [] };
      if (profIdList?.length > 0)
        submitData = { ...submitData, profession: profIdList };
      if (educIdList?.length > 0)
        submitData = { ...submitData, education: educIdList };

      const dataAfterNullRemove = removeNullValues(submitData);
      let data = handleToUpperCase(dataAfterNullRemove);
      let response;
      if (!edit) {
        response = await postStaff(data);
      } else {
        response = await putStaff(edit.id, data);
      }
      if (response.success) {
        Swal.fire("Staff created successfully", "", "success");
        handleClearAll();
        getData();
        getMasetData();
      } else {
        Swal.fire("Failed to add staff", "", "error");
      }
    } catch (err) {
      Swal.fire("Failed to add staff", "", "error");
    }
  };

  const addNewOption = async (e, data, state) => {
    e.preventDefault();
    let value = data.value;
    try {
      let submitData = { property_value: value, property_type: state };
      let res = await postProperty(submitData);
      if (res?.success) {
        setStaffAdd((data) => ({ ...data, [state]: res.data.id }));
        Swal.fire("Option Added Successfylly", "", "success");
      } else {
        Swal.fire(res?.message, "", "error");
      }
      getData();
    } catch (err) {
      console.log(err);
      Swal.fire(err?.response?.data?.message, "", "error");
    }
  };

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setStaffAdd({ ...staffAdd, [e.target.name]: !e.target.value });
    } else if (e.target.value === "") {
      setStaffAdd({ ...staffAdd, [e.target.name]: null });
    } else {
      setStaffAdd({ ...staffAdd, [e.target.name]: e.target.value });
    }
  };

  const getData = async () => {
    let list = {};
    const miniFunct = (data) => {
      const keys = Object.keys(listItem);
      data.map((x) => {
        if (keys.indexOf(x.property_type) > -1) {
          if (!list[x.property_type]?.length > 0)
            list[x.property_type] = [{ value: null, text: "SELECT" }];
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
      if (!edit) {
        let res2 = await getCode();
        if (res2?.success) {
          let cod = res2?.data?.filter((x) => x.sub_id === "STF");
          setStaffAdd((data) => ({
            ...data,
            ["code"]: cod[0].sub_id + cod[0]?.next_value,
          }));
        }
      }
    } catch (err) {}
  };

  const handleClearAll = () => {
    setStaffAdd({
      code: null,
      name: null,
      address: null,
      mobile: null,
      email: null,
      gender: "MALE",
      op_balance: null,
      type: "TO_RECEIVE",
      blood_gp: "A+",
      join_date: null,
      dob: null,
      remarks: null,
      blocked: null,
      image: null,
      destination: null,
      staff_grade: null,
      salary: null,
      salary_date: null,
      allowed_leave: null,
      leave_cut: null,
      pf: null,
      esi: null,
      insurance: null,
    });
    setStaffEducTable({
      id: null,
      course: null,
      conducted: null,
      institution: null,
      score: null,
      year_pass: null,
    });
    setEdit();
    setEducIdList([]);
    setProfIdList([]);
    setstaffEducList([]);
    setstaffProfList([]);
    getData();
  };

  return (
    <div className="supplier-add-cont">
      Add New Staff
      <form
        onSubmit={handleSubmit}
        ref={formRef}
        className="item_add_form pt-1 mt-1"
      >
        <div className="d-flex">
          <div className="supplier-add-form-part1 col-7 row mx-0 px-0 pb-4">
            <div className="d-flex align-items-center ps-0 row mx-0 sup-input-cont">
              <div className="col-6 row mx-0 ps-0 pe-1">
                <div className="mx-0 px-0 col-3 col-3">Code</div>
                <div className="mx-0 px-0 col-8 col-9">
                  <input
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    name="code"
                    value={staffAdd.code || ""}
                    type="text"
                    className="item_input ms-0"
                  />
                </div>
              </div>
              <div className="col-6 row mx-0 px-2">
                <div className="mx-0 px-0 col-3">Gender</div>
                <div className="mx-0 px-0 col-8">
                  <select
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    name="gender"
                    className="item_input ms-0"
                    value={staffAdd.gender || ""}
                  >
                    <option value="MALE">MALE</option>
                    <option value="FEMALE">FEMALE</option>
                    <option value="OTHER">OTHER</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center ps-0 row mx-0 sup-input-cont">
              <div className="col-6 row mx-0 ps-0 pe-1">
                <div className="mx-0 px-0 col-3 col-3">Name</div>
                <div className="mx-0 px-0 col-8 col-9">
                  <input
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    required
                    name="name"
                    value={staffAdd.name || ""}
                    type="text"
                    className="item_input ms-0"
                  />
                </div>
              </div>
              <div className="col-6 row mx-0 px-2">
                <div className="mx-0 px-0 col-3">mobile</div>
                <div className="mx-0 px-0 col-8">
                  <input
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    name="mobile"
                    value={staffAdd.mobile || ""}
                    type="number"
                    className="item_input ms-0"
                  />
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center ps-0 row mx-0 px-0">
              <div className="col-6 d-flex align-items-center px-0 row pe-1 mx-0 h-100">
                <div className="col-12 row mx-0 px-0 align-items-center h-100">
                  <div className="mx-0 px-0 col-3 col-3">Address</div>
                  <div className="mx-0 px-0 col-8 col-9 h-100 py-1">
                    <textarea
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                      name="address"
                      value={staffAdd.address || ""}
                      className="item_input ms-0 h-100"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
              <div className="col-6 d-flex align-items-center px-2 row mx-0">
                <div className="col-12 row mx-0 px-0 my-1">
                  <div className="mx-0 px-0 col-3">Join Date</div>
                  <div className="mx-0 px-0 col-8">
                    <input
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                      name="join_date"
                      value={staffAdd.join_date || ""}
                      type="date"
                      className="item_input ms-0"
                    />
                  </div>
                </div>
                <div className="col-12 row mx-0 px-0 my-1">
                  <div className="mx-0 px-0 col-3">Dob</div>
                  <div className="mx-0 px-0 col-8">
                    <input
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                      name="dob"
                      value={staffAdd.dob || ""}
                      type="date"
                      className="item_input ms-0"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center ps-0 row mx-0 sup-input-cont">
              <div className="col-6 row mx-0 ps-0 pe-1">
                <div className="mx-0 px-0 col-3 col-3">Email</div>
                <div className="mx-0 px-0 col-8 col-9">
                  <input
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    name="email"
                    value={staffAdd.email || ""}
                    type="text"
                    className="item_input text-lowercase ms-0"
                  />
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center ps-0 row mx-0 sup-input-cont">
              <div className="col-6 row mx-0 ps-0 pe-1">
                <div className="mx-0 px-0 col-3 col-3">Blood</div>
                <div className="mx-0 px-0 col-8 col-9">
                  <select
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    name="blood_gp"
                    value={staffAdd.blood_gp || ""}
                    type="text"
                    className="item_input ms-0"
                  >
                    {bloodOptions.map((data) => (
                      <option value={data.value}>{data?.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center ps-0 row mx-0 sup-input-cont">
              <div className="col-6 row mx-0 ps-0 pe-1">
                <div className="mx-0 px-0 col-3">Op.Bal</div>
                <div className="mx-0 px-0 col-8 col-9">
                  <input
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    name="op_balance"
                    value={staffAdd.op_balance || ""}
                    type="number"
                    className="item_input ms-0 me-0 pe-0"
                  />
                </div>
              </div>
              <div className="mx-0 px-0 col-2">
                <select
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  name="type"
                  value={staffAdd.type || ""}
                  className="staff-select bg-dark border-0 rounded-2 py-1 text-light px-2"
                >
                  <option value="TO_RECIEVE">TO RECIEVE</option>
                  <option value="TO_GIVE">TO GIVE</option>
                </select>
              </div>
            </div>
          </div>
          {/* ----------------------------------------Right Side ----------------------------------- */}
          <div className="supplier-add-form-part2 row mx-0 px-0 ps-3 me-0 col-5 border-0 ps-4">
            <div className="d-flex align-items-center ps-0 row mx-0 sup-input-cont">
              <span className="col-4" />
              <div className="col-2 col-3 d-flex align-items-center">
                <input
                  type="checkbox"
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  id="repeat"
                  name="repeat"
                  checked={staffAdd.repeat || false}
                  className="me-2"
                />
                <label className="pb-1" htmlFor="repeat">
                  Repeat
                </label>
              </div>
              <div className="col-2 d-flex align-items-center">
                <input
                  type="checkbox"
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  id="blocked"
                  name="blocked"
                  value={staffAdd.blocked || ""}
                  className="me-2"
                />
                <label className="pb-1" htmlFor="blocked">
                  Blocked
                </label>
              </div>
            </div>
            <div className="d-flex align-items-center ps-0 row mx-0 sup-input-cont">
              <div className="col-12 row mx-0 px-0 ps-0 align-items-center">
                <div className="mx-0 px-0 col-3 col-2 staff-text">
                  Designation
                </div>
                <div className="mx-0 px-0 col-9 col-10">
                  <SearchDropDown
                    containerClass="large"
                    id="designation"
                    addNew={true}
                    setNew={addNewOption}
                    options={listItem}
                    {...{ showDropdown, setShowDropdown, handleKeyDown }}
                    setDataValue={setStaffAdd}
                    selectedValue={staffAdd || ""}
                  />
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center ps-0 row mx-0 sup-input-cont">
              <div className="col-12 row mx-0 px-0 ps-0 align-items-center">
                <div className="mx-0 px-0 col-3 col-2 staff-text">
                  Staff Grade
                </div>
                <div className="mx-0 px-0 col-9 col-10">
                  <SearchDropDown
                    containerClass="large"
                    id="staff_grade"
                    addNew={true}
                    setNew={addNewOption}
                    options={listItem}
                    {...{ showDropdown, setShowDropdown, handleKeyDown }}
                    setDataValue={setStaffAdd}
                    selectedValue={staffAdd || ""}
                  />
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center ps-0 row mx-0 sup-input-cont">
              <div className="col-12 row mx-0 px-0 ps-0 align-items-center">
                <div className="col-6 row mx-0 px-0">
                  <div className="mx-0 col-5 px-0 staff-text">Salary</div>
                  <div className="mx-0 px-0 col-6">
                    <input
                      type="number"
                      name="salary"
                      value={staffAdd.salary || ""}
                      className="item_input"
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                </div>
                <div className="col-6 row mx-0 px-0">
                  <div className="mx-0 px-0 col-5 staff-text me-1">
                    Leave Cut
                  </div>
                  <div className="mx-0 px-0 col-6 col-7">
                    <input
                      type="number"
                      name="leave_cut"
                      value={staffAdd.leave_cut || ""}
                      className="item_input"
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center ps-0 row mx-0 sup-input-cont">
              <div className="col-12 row mx-0 px-0 ps-0 align-items-center">
              <div className="col-6 row mx-0 px-0">
                <div className="mx-0 col-5 px-0 staff-text">
                  Alwd Leave
                </div>
                <div className="mx-0 px-0 col-6 me-3">
                  <input
                    type="number"
                    name="allowed_leave"
                    value={staffAdd.allowed_leave || ""}
                    className="item_input"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                  />
                </div>
                </div>
                <div className="col-6 row mx-0 px-0">
                <div className="mx-0 px-0 col-5 staff-text me-1">LIC Cut</div>
                <div className="mx-0 px-0 col-6 col-7">
                  <input
                    type="number"
                    name="insurance"
                    value={staffAdd.insurance || ""}
                    className="item_input"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                  />
                </div>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center ps-0 row mx-0 sup-input-cont">
              <div className="col-12 row mx-0 px-0 ps-0 align-items-center">
              <div className="col-6 row mx-0 px-0">
                <div className="mx-0 col-5 px-0 staff-text">PF Cut</div>
                <div className="mx-0 px-0 col-6 me-3">
                  <input
                    type="number"
                    name="pf"
                    value={staffAdd.pf || ""}
                    className="item_input"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                  />
                </div>
                </div>
                <div className="col-6 row mx-0 px-0">
                <div className="mx-0 px-0 col-5 staff-text me-1">ESI Cut</div>
                <div className="mx-0 px-0 col-6 col-7">
                  <input
                    type="number"
                    name="esi"
                    value={staffAdd.esi || ""}
                    className="item_input"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </div>
              </div>
            </div>
            <div className="d-flex align-items-center ps-0 row mx-0 sup-input-cont">
              <div className="col-12 row mx-0 px-0 ps-0 align-items-center">
                <div className="mx-0 px-0 col-2 col-3 staff-text">Remark</div>
                <div className="mx-0 px-0 col-9 col-10 h-100">
                  <textarea
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    name="remarks"
                    value={staffAdd.remarks || ""}
                    className="item_input ms-0 h-100"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <StaffProfEducTable
          {...{
            staffTableTab,
            setStaffTableTab,
            staffEducTable,
            setStaffEducTable,
            staffProfTable,
            setStaffProfTable,
            staffEducList,
            setstaffEducList,
            staffProfList,
            setstaffProfList,
            educIdList,
            setEducIdList,
            profIdList,
            setProfIdList,
            handleSubmit,
            edit,
            handleClearAll,
          }}
        />
      </form>
    </div>
  );
};
