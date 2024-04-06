import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiChevronUp, HiChevronDown,HiOutlineSwitchVertical} from "react-icons/hi";
import { useNavigate } from "react-router";
import { usePayrollTransactionServices } from "../../../../services/transactions/payrollTransactionServices";
import "sweetalert2";
import Swal from "sweetalert2";
import searchIcon from "../../../../assets/icons/search.png";
const PayrollTransactionEdit = (props) => {
  const {
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    getFullData,
    fullPayRoll,
    setParamsToReportFull,
    setEdit,
    setPayrollCode,
    setPayrollData,
    setFullPayroll,
    permissions
  } = props;
  const navigate = useNavigate();
  useEffect(() => {
    setParamsToReportFull({ start_date: fromDate, end_date: toDate });
  }, [fromDate, toDate]);
  const { getPayRollList, delPayRollList } = usePayrollTransactionServices();
  
  const handleEdit = async (doc) => {
    try {
      const response = await getPayRollList(doc);
      setEdit(response?.data);
      navigate("/pay-roll");
    } catch (err) {
      console.log("handleEdit", err);
    }
  };
  const handleDelete = async (doc) => {
    try {
      const response = await delPayRollList(doc);
      console.log(response?.data);
      if (response?.success) {
        Swal.fire("Success", "Payroll Data Deleted Successfully");
        getFullData();
      }
    } catch (err) {
      console.log("handleDelete", err);
    }
  };
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortCodeOrder, setSortCodeOrder] = useState('asc');
  const [searchedArrayList,setSearchedArrayList] = useState([]);
  const handleDateSort = () => {
    const sortedPayRoll = [...fullPayRoll];
    
    sortedPayRoll.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
  
      if (sortOrder === 'asc') {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
    setSortOrder(sortOrder === 'asc' ? 'desc' :'asc' );
    setSortCodeOrder('')
    setFullPayroll(sortedPayRoll);
  };
  
  const handleCodeSort = () => {
    const sortedPayRollData = [...fullPayRoll];
    
    sortedPayRollData.sort((a, b) => {
      const codeA = a.daybook_part_ref
      const codeB = b.daybook_part_ref
  
      if (sortCodeOrder === 'asc') {
        return codeA.localeCompare(codeB);
      } else {
        return codeB.localeCompare(codeA);
      }
    });
    setSortCodeOrder(sortCodeOrder === 'asc' ? 'desc':'asc' );
    setSortOrder('')
    setFullPayroll(sortedPayRollData);
  };
  useEffect(()=>{
    if(fullPayRoll?.length > 0)
        setSearchedArrayList(fullPayRoll)
},[fullPayRoll])

  const handleSearch = async (e) => {
    try {
      let tempData,
        tempList = fullPayRoll;
      if (fullPayRoll) {
        let value = e.target.value.toLocaleLowerCase();
        if (value !== "") {
          if (fullPayRoll.length > 0) {
            tempData = tempList?.filter((x) => {
              let searchInString = `${
                x.daybook_part_ref?.toLocaleLowerCase() +
                " " +
                x.amount.toLocaleLowerCase()+
                x.date?.toLocaleLowerCase()
              }`;
              let search = searchInString?.includes(value);
              if (search) {
                return true;
              }
            });
            setSearchedArrayList(tempData);
          }
        } else {
            setSearchedArrayList(fullPayRoll);
        }
      }
    } catch {}
  };

  return (
    <div>
      <div>Payroll</div>
      <div className="d-flex justify-content-start align-items-center mt-2 ">
        <Form.Group className="col-3 pe-4 ps-0 mx-0 d-flex align-items-start mt-1">
          <Form.Label className="col-2 purchase-input-label align-middle">
            From
          </Form.Label>
          <Form.Control
            onChange={(e) => setFromDate(e.target.value)}
            required
            name="from_date"
            value={fromDate}
            className="purchase-input-text me-2"
            placeholder="Document number"
            type="date"
          />
        </Form.Group>
        <Form.Group className="col-3 pe-4 ps-0 mx-0 d-flex align-items-start mt-1">
          <Form.Label className="col-2 purchase-input-label align-middle">
            To
          </Form.Label>
          <Form.Control
            onChange={(e) => setToDate(e.target.value)}
            required
            name="to_date"
            value={toDate}
            className="purchase-input-text me-2"
            placeholder="Document number"
            type="date"
          />
        </Form.Group>
        <div className="col-3 mx-0 px-0 px-2 mt-1">
          <div
            className="col-4 col-5 p-0 rounded-1 btn py-0 text-light w-100"
            style={{ backgroundColor: "#4A00A8" }}
            onClick={() => {
              getFullData();
            }}
          >
            Apply
          </div>
        </div>
        <div className="col-3">
        <div className='col-11 col-12 mx-1 d-flex justify-content-end'>
                <div className="p-2 mt-2 stock-ledger-search d-flex align-items-center me-1">
                    <div className="item_seach_bar_cont rounded-2 col-12">
                        <img src={searchIcon} className="search_img me-3 ms-2 py-2" />
                        <input
                            onChange={handleSearch}
                            className="item_search_bar rounded-2 border-0 py-1"
                            placeholder="Search"
                            type="text"
                        />
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div
        style={{
          height: "28.8rem",
          // width: "85rem",
          overflowX: "hidden",
          overflowY: "scroll",
        }}
        className="mt-3"
      >
        <table className="PayrollTable w-100">
          <thead>
            <tr>
              <th onClick={handleCodeSort}>Doc.No {sortCodeOrder === 'asc' ? <HiChevronUp />:sortCodeOrder === 'desc' ? <HiChevronDown />:<HiOutlineSwitchVertical />}</th>
              <th onClick={handleDateSort}>Date {sortOrder === 'asc' ? <HiChevronUp />: sortOrder === 'desc'? <HiChevronDown />:<HiOutlineSwitchVertical />}</th>
              <th>A/C Name</th>
              <th>Amount</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {searchedArrayList.length > 0 &&
              searchedArrayList.map((data, i) => {
                return (
                  <tr key={i}>
                    <td>{data.daybook_part_ref}</td>
                    <td>{data.date.slice(0, 10)}</td>
                    <td>{data.account_name}</td>
                    <td>{data.amount || 0}</td>
                    <td>
                      {(permissions.includes(1423)) && 
                        <GrEdit
                          size={18}
                          onClick={() => handleEdit(data.daybook_part_ref)}
                        />
                      }
                    </td>
                    <td>
                      {(permissions.includes(1424)) && 
                        <RiDeleteBin6Line
                          size={18}
                          className="text-danger"
                          onClick={() => handleDelete(data.daybook_part_ref)}
                        />
                      }
                    </td>
                  </tr>
                  // <tr>hoi</tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-end align-items-center mt-4">
        <div
          className="col-1 col-2 btn py-0 my-0 bg-dark text-light"
          onClick={() => navigate(-1)}
        >
          Exit
        </div>
      </div>
    </div>
  );
};

export default PayrollTransactionEdit;
