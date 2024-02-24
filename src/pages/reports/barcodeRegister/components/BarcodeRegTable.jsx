import React, { useEffect, useState } from "react";
import { GrRefresh } from "react-icons/gr";
import searchIcon from "../../../../assets/icons/search.png";
import { useReportsServices } from "../../../../services/reports/reports";
import { Checkbox } from "semantic-ui-react";
import { Modal } from "react-bootstrap";
import BarcodePDF from "./BarcodePrint";
import Swal from "sweetalert2";

export const BarcodeRegTable = (props) => {
  const { params } = props;
  const [list, setList] = useState([]);
  const [showPrint, setShowPrint] = useState(false);
  const [searchedList, setSearchedList] = useState([]);
  const { getBarcodeRegReport } = useReportsServices();
  const [totalNumberOfBarcode, setTotalNumberOfBarcode] = useState(0)

  useEffect(()=>{
    let totalNum = 0
    if(searchedList?.length>0){
      totalNum = searchedList.reduce((a,b)=>{
        return b?.number||0 + a
      },0)
    }
    setTotalNumberOfBarcode(totalNum)
  },[searchedList,])

  useEffect(() => {
    setSearchedList(list);
  }, [list]);

  const handleSearch = async (e) => {
    console.log(list);
    try {
      let tempData,
        tempList = list;
      if (list) {
        let value = e.target.value.toLocaleLowerCase();
        if (value != "") {
          if (list.length > 0) {
            tempData = tempList?.filter((x) => {
              let searchInString = `${
                x.document_number?.toLocaleLowerCase() +
                " " +
                x.barcode?.toLocaleLowerCase() +
                " " +
                x.date?.toLocaleLowerCase()
              }`;
              let search = searchInString?.includes(value);
              if (search) {
                return true;
              }
            });
            setSearchedList(tempData);
          }
        } else {
          setSearchedList(list);
        }
      }
    } catch {}
  };

  useEffect(() => {
    getData();
  }, [params]);

  const getData = async () => {
    try {
      const response = await getBarcodeRegReport(params);
      if (response.success) {
        setList(response.data);
      }
    } catch (err) {}
  };

  const handleBarcodeSelect = (checked, data) => {
    let tempList = [...searchedList];
    let index = tempList.findIndex((x) => x.barcode == data.barcode);
    if (checked) {
      tempList.splice(index, 1, { ...data, number: data?.qty||1 });
    } else {
      tempList.splice(index,1, { ...data, number: null });
    }
    setSearchedList([...tempList]);
  };

  const handleChangeNumber = (e, data) => {
    let tempList = [...searchedList];
    let index = tempList.findIndex((x) => x.barcode == data.barcode);
    if (e.target.value !== "")
      tempList.splice(index, 1, { ...data, number: e.target.value });
    else tempList.splice(index, 1, { ...data, number: null });
    setSearchedList([...tempList]);
  };

  const handleShowPrint = ()=>{
    if(totalNumberOfBarcode>0)
      setShowPrint(true)
    else
      Swal.fire({
        title:'Warning',
        text:'Please select at least one barcode',
        icon:'warning',
        showConfirmButton:false,
        timer:1500,
      })
  }

  return (
    <div>
      <div className="mt-3">
        <div
          style={{ background: "#000" }}
          className="w-100 d-flex justify-content-end align-items-center rounded-top-2"
        >
          <div className="col-3 p-2 stock-ledger-search d-flex align-items-center">
            <div className="col-1 me-2" onClick={() => setSearchedList(list)}>
              <GrRefresh className="bg-light m-1 p-1 rounded-1" size={20} />
            </div>
            <div className="item_seach_bar_cont rounded-2 col-11 col-10">
              <img src={searchIcon} className="search_img me-3 ms-2 py-2" />
              <input
                // value={search}
                onChange={handleSearch}
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
              <th className="text-start ps-3">Date</th>
              <th>Doc No</th>
              <th>QTY</th>
              <th>Company</th>
              <th>Size</th>
              <th>Barcode</th>
              {/* <th>Syc. Bc</th> */}
              <th>Com. Bc</th>
              <th>P. Rate</th>
              <th>cost</th>
              <th>S. Rate</th>
              <th>WS. Rate</th>
              <th>MRP</th>
              <th width="90">Print Cpy</th>
              <th>Print</th>
            </tr>
          </thead>
          <tbody>
            {searchedList?.length > 0 ? (
              searchedList?.map((data, i) => {
                return (
                  <tr key={i}>
                    {/* <td>
                      {data?.date?.slice(0, 10).split("-").reverse().join("-")}
                    </td> */}
                    <td>{new Date(data?.date).toLocaleDateString()}</td>
                    <td>{data?.document_number || ""}</td>
                    <td>{data?.qty || 0}</td>
                    <td>{data?.company || ""}</td>
                    <td>{data?.size || ""}</td>
                    <td>{data?.barcode || ""}</td>
                    {/* <td>{data?.syc_bc || ""}</td> */}
                    <td>{data?.com_bc || ""}</td>
                    <td>{data?.p_rate || 0}</td>
                    <td>{data?.cost || 0}</td>
                    <td>{data?.sale || 0}</td>
                    <td>{data?.wholesale_rate || 0}</td>
                    <td>{data?.mrp}</td>
                    <td className="px-4">
                      <input
                        type="number"
                        value={data?.number || ""}
                        onChange={(e) => handleChangeNumber(e, data)}
                        className="w-100"
                      />
                    </td>
                    <td>
                      <Checkbox
                        checked={data?.number > 0 || data?.number}
                        onChange={(e, { checked }) =>
                          handleBarcodeSelect(checked, data)
                        }
                      ></Checkbox>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={15} className="fs-5 p-3">
                  There is no Barcode register report to show
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <br />
      <div className="row">
        <div className="w-100 d-flex justify-content-end mb-0">
          <div className="btn btn-dark col-1 col-2 py-0 me-3">Clear</div>
          <div
            onClick={handleShowPrint}
            className="btn btn-dark col-1 col-2 py-0"
          >
            Preview
          </div>
        </div>
      </div>
      <Modal
        show={showPrint}
        centered
        size="lg"
        onHide={() => setShowPrint(false)}
      >
      <BarcodePDF barcodeList={ searchedList } {...{totalNumberOfBarcode}}/>
      </Modal>
    </div>
  );
};
