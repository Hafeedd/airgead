import React, { useEffect, useState } from "react";
import searchIcon from "../../../../assets/icons/search.png";
import { GrRefresh } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import useProductionServices from "../../../../services/master/productionServices";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
const MaterialCompositionList = (props) => {
  const { materialList,
    allMaterialComposition,
    setEditComposition } = props;
  const [searchedArrayList, setSearchedArrayList] = useState([]);
  const navigate = useNavigate();
  const handleEditComposition =(data)=>{
    setEditComposition(data)
    navigate('/material-composition-product')
  }
  const {delMaterialComposition} = useProductionServices()
 
  const handleDeleteComposition =async(id)=>{
    const response =await delMaterialComposition(id)
    if (response?.success){
      Swal.fire(response?.message,'','success')
    }else{
      Swal.fire(response?.message,'','error')
    }
  }
  useEffect(() => {
    if (materialList?.length > 0) setSearchedArrayList(materialList);
  }, [materialList]);

  const handleSearch = async (e) => {
    try {
      let tempData,
        tempList = materialList;
      if (materialList) {
        let value = e.target.value.toLowerCase();
        if (value !== "") {
          if (materialList.length > 0) {
            tempData = tempList?.filter((x) => {
              let searchInString = `${
                x.item_details?.name.toLocaleLowerCase() +
                " " +
                x.type_details?.property_value.toLocaleLowerCase()
              }`;
              let search = searchInString?.includes(value);
              if (search) {
                return true;
              }
            });
            setSearchedArrayList(tempData);
          }
        } else {
          setSearchedArrayList(materialList);
        }
      }
    } catch {}
  };
  return (
    <div className="d-flex justify-content-center">
      <div style={{ width: "800px" ,height: "440px", overflowY: "scroll"  }} className="mt-3">
        <div className="mx-0 TabHead py-2  text-center rounded-top d-flex justify-content-end ">
          <div className="col-3 p-1 stock-ledger-search d-flex align-items-center me-3">
            <div className="col-1 me-3">
              <GrRefresh className="bg-dark m-1 p-1 rounded-1" size={20} />
            </div>
            <div className="item_seach_bar_cont rounded-2 col-11 col-10">
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
        <table className="material-list w-100 rounded-top">
          <thead className="text-light">
            <tr>
              <th>Sl.No</th>
              <th>Item Name</th>
              <th>Qty</th>
              <th>Unit</th>
              <th>Type</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {searchedArrayList?.length > 0 ? (
              searchedArrayList?.map((data, key) => {
                return (
                  <tr key={key}>
                    <td>
                      <div>{key + 1}</div>
                    </td>
                    <td>
                      <div>{data.item_details.name}</div>
                    </td>
                    <td>
                      <div>{data.qty}</div>
                    </td>
                    <td>
                      <div>{data.unit_details.property_value}</div>
                    </td>
                    <td>
                      <div>{data.type_details.property_value}</div>
                    </td>
                    <td>
                      <div><FiEdit size={18} className="p-0" onClick={() => handleEditComposition(data)} /></div> 
                   
                    </td>
                    <td>
                      <div><MdDelete size={18} className="p-0" onClick={() => handleDeleteComposition(data.id)} /></div>
                     </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7}><div>No Reports Found !!!</div></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MaterialCompositionList;
