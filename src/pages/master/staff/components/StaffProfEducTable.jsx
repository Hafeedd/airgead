import { useEffect, useState } from "react";
import useOnKey from "../../../../hooks/onKeyFunct/onKeyFunct";
import Swal from "sweetalert2";
import useStaffServices from "../../../../services/master/staffServices";

export const StaffProfEducTable = (props) => {
  const {
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
    edit,
    handleClearAll,
    handleSubmit,
  } = props;

  const [list, setList] = useState([]);
  const [ref, setRef] = useState(null);
  const [tableEdit, setTableEdit] = useState(false);

  const { formRef, handleKeyDown } = useOnKey(ref, setRef);
  const {
    postStaffEducation,
    putStaffEducation,
    postStaffProfession,
    putStaffProfession,
  } = useStaffServices();

  useEffect(() => {
    if (staffTableTab == 1) {
      setList(staffEducList);
    } else {
      setList(staffProfList);
    }
  }, [
    staffTableTab,
    staffEducTable,
    staffProfTable,
    staffEducList,
    staffProfList,
  ]);

  const handleResetTable = () => {
    if (staffTableTab == 1) {
      setStaffEducTable({
        course: null,
        conducted: null,
        institution: null,
        score: null,
        year_pass: null,
      });
    } else {
      setStaffProfTable({
        profession: null,
        department: null,
        experience: null,
        from_date: null,
        to_date: null,
      });
    }
  };

  const handleKeySubmit = (e) => {
    if (e.type == "keydown")
      if (e.key == "Enter") {
        handleKeyDown(e);
        handleListAdd();
        handleResetTable();
      }
  };

  const handleEdit = (data, i) => {
    setTableEdit(data);
    let tempList;
    if (staffTableTab == 1) {
      setStaffEducTable(data);
      // tempList = staffEducList
      // tempList.splice(i,1)
      // setstaffEducList(tempList)
    } else {
      setStaffProfTable(data);
      // tempList = staffProfList
      // tempList.splice(i,1)
      // setstaffProfList(tempList)
    }
  };

  const handleToUpperCase = (data) => {
    let keysOfData,
      tempData = { ...data };
    if (typeof data == "object") keysOfData = Object.keys(data);
    if (!keysOfData?.length > 0) return 0;
    keysOfData.map((item) => {
      if (
        typeof data[item] == "string" &&
        !item.match(/email|year_pass|score|id|from_date|to_date/)
      ) {
        let itemTemp = data[item]?.toUpperCase();
        tempData = { ...tempData, [item]: itemTemp };
      }
    });
    return tempData;
  };

  const handleChange = (e) => {
    let value;
    if (e.target.value === "") {
      value = null;
    } else {
      value = e.target.value;
    }
    if (staffTableTab == 1) {
      setStaffEducTable((data) => ({ ...data, [e.target.name]: value }));
    } else {
      setStaffProfTable((data) => ({ ...data, [e.target.name]: value }));
    }
  };

  const handleListAdd = async () => {
    let values;
    if (staffTableTab == 1) {
      values = staffEducTable
    } else {
      values = staffProfTable
    }
    try {
      if (values.course || values.profession) {
        let tempList, response;
        if (staffTableTab == 1) {
          const submitData = handleToUpperCase(staffEducTable);
          if (!tableEdit) {
            response = await postStaffEducation(submitData);
          } else {
            response = await putStaffEducation(tableEdit.id, submitData);
          }
          if (response?.success) {
            tempList = [...staffEducList];
            if (tableEdit) {
              const ind = staffEducList.findIndex(
                (x) => staffEducTable.course == x.course
              );
              tempList.splice(ind, 1);
            }
            tempList.unshift({ ...staffEducTable, id: response.data.id });
            setstaffEducList(tempList);
            if(!tableEdit){
                let tempIdList = [...educIdList]
                tempIdList.push({id:response.data.id})
                setEducIdList(tempIdList)}
          }
        } else if (staffTableTab == 2) {
          const submitData = handleToUpperCase(staffProfTable);
          if (!tableEdit) {
            response = await postStaffProfession(submitData);
          } else {
            response = await putStaffProfession(tableEdit.id, submitData);
          }
          if (response?.success) {
            tempList = [...staffProfList];
            if (tableEdit) {
              const ind = staffProfList.findIndex(
                (x) => staffProfTable.course == x.course
              );
              tempList.splice(ind, 1);
            }
            tempList.unshift({ ...staffProfTable, id: response.data.id });
            setstaffProfList(tempList);
            if(!tableEdit){
                let tempIdList = [...profIdList]
                tempIdList.push({id:response.data.id})
                setProfIdList(tempIdList)
            } 
          }
        }
      } else {
        Swal.fire({
          title: "Please Enter all details",
          icon: "warning",
          showCancelButton: false,
          timer: "1000",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const AdjustTableHeight = () => {
    let tr = [];
    for (let i = 0; i < 4 - list?.length; i++)
      tr.push(
        <tr className='border-0'>
          <td>
            <div className="tbodytd">{"..."}</div>
          </td>
          <td>
            <div className="tbodytd">{"..."}</div>
          </td>
          <td>
            <div className="tbodytd">{"..."}</div>
          </td>
          <td>
            <div className="tbodytd">{"..."}</div>
          </td>
          <td>
            <div className="tbodytd">{"..."}</div>
          </td>
        </tr>
      );
    return tr;
  };

  return (
    <div>
      <div className="staff-table-cont d-flex justify-content-between rounded-top-3 px-3 pt-1 pb-0">
        <div className="d-flex">
          <div
            onClick={() => setStaffTableTab(1)}
            className={`${
              staffTableTab == 1
                ? "px-3 bg-dark text-light pb-2 rounded-top-3 pt-1"
                : "d-flex align-items-end pb-1 px-3"
            }`}
          >
            Education
          </div>
          <div
            onClick={() => setStaffTableTab(2)}
            className={`${
              staffTableTab == 2
                ? "px-3 bg-dark text-light pb-2 rounded-top-3 pt-1"
                : "d-flex align-items-end pb-1 px-3"
            }`}
          >
            Profession
          </div>
        </div>
        <button
          onClick={handleListAdd}
          className="bg-dark text-light px-3 rounded-2 py-1 border-0 mt-1 mb-2"
        >
          {tableEdit ? "Edit" : "Add"}
        </button>
      </div>
      <div className="staff-table-container">
        <table className="staff-table table">
          <thead className="bg-dark text-light">
            <th className="text-center">
              {staffTableTab == 1 ? "Course" : "Profession"}
            </th>
            <th className="text-center">
              {staffTableTab == 1 ? "Conducted" : "Department"}
            </th>
            <th className="text-center">
              {staffTableTab == 1 ? "Institution" : "Experience"}
            </th>
            <th className="text-center">
              {staffTableTab == 1 ? "Score" : "From Date"}
            </th>
            <th className="text-center">
              {staffTableTab == 1 ? "Yr/Pass" : "To Date"}
            </th>
          </thead>
          <tbody>
            <tr ref={formRef}>
              <td className="text-center">
                <input
                  placeholder="Enter"
                  className="tbodytd"
                  value={
                    staffTableTab == 1
                      ? staffEducTable.course || ""
                      : staffProfTable.profession || ""
                  }
                  name={staffTableTab == 1 ? "course" : "profession"}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
              </td>
              <td className="text-center">
                <input
                  placeholder="Enter"
                  className="tbodytd"
                  value={
                    staffTableTab == 1
                      ? staffEducTable.conducted || ""
                      : staffProfTable.department || ""
                  }
                  name={staffTableTab == 1 ? "conducted" : "department"}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
              </td>
              <td className="text-center">
                <input
                  placeholder="Enter"
                  className="tbodytd"
                  value={
                    staffTableTab == 1
                      ? staffEducTable.institution || ""
                      : staffProfTable.experience || ""
                  }
                  name={staffTableTab == 1 ? "institution" : "experience"}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
              </td>
              <td className="text-center">
                <input
                  type={staffTableTab == 2 ? "date" : "text"}
                  placeholder="Enter"
                  className="tbodytd"
                  value={
                    staffTableTab == 1
                      ? staffEducTable.score || "" || ""
                      : staffProfTable.from_date || ""
                  }
                  name={staffTableTab == 1 ? "score" : "from_date"}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
              </td>
              <td className="text-center">
                <input
                  type="date"
                  placeholder="Enter"
                  className="tbodytd"
                  value={
                    staffTableTab == 1
                      ? staffEducTable.year_pass || ""
                      : staffProfTable.to_date || ""
                  }
                  name={staffTableTab == 1 ? "year_pass" : "to_date"}
                  onChange={handleChange}
                  onKeyDown={handleKeySubmit}
                />
              </td>
            </tr>
            {list?.length > 0 &&
              list?.map((item, i) => (
                <tr key={i} onClick={() => handleEdit(item, i)}>
                  <td className="text-center">
                    <div className="tbodytd">
                      {staffTableTab == 1
                        ? item?.course || "..."
                        : item?.profession || "..."}
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="tbodytd">
                      {staffTableTab == 1
                        ? item?.conducted || "..."
                        : item?.department || "..."}
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="tbodytd">
                      {staffTableTab == 1
                        ? item?.institution || "..."
                        : item?.experience || "..."}
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="tbodytd">
                      {staffTableTab == 1
                        ? item?.score || "..."
                        : item?.from_date || "..."}
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="tbodytd">
                      {staffTableTab == 1
                        ? item?.year_pass || "..."
                        : item?.to_date || "..."}
                    </div>
                  </td>
                </tr>
              ))}
            {<AdjustTableHeight />}
          </tbody>
        </table>
      </div>
      <div className="row mx-0 pb-2">
        <div className="col-9 col-10" />
        <div onClick={handleClearAll} className="col-1 btn btn-dark py-0 me-2">Clear</div>
        <button className="col-1 btn btn-dark py-0">{edit?"Update":"Save"}</button>
      </div>
    </div>
  );
};

export default StaffProfEducTable;
