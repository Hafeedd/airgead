import { useEffect, useState } from "react";
import searchIcon from "../../../../assets/icons/search.png";
import {GrRefresh} from 'react-icons/gr'
import { useNavigate } from "react-router";

export const StockTable = (props) => {
  const {stockList} = props

  // console.log(stockList)

    const [searchedList , setSearchedList] = useState([])

    const navigate = useNavigate()

    useEffect(()=>{
      setSearchedList(stockList)
    },[stockList,])
    
  const AdjustTableHeight = () =>{
    let a = []
    for(let i = 0 ; i< 7- stockList?.length ; i++){
      a.push(
        <tr>
          <td className="border-bottom-0"><div className="border-0 text-start"></div></td>
          <td className="border-bottom-0"><div width="110" className="border-0 text-start"></div></td>
          <td className="border-bottom-0"><div className="border-0 prple_td margin-r"></div></td>
          <td className="border-bottom-0"><div className="border-0 grn_td"></div></td>
          <td className="border-bottom-0"><div className="border-0 grn_td"></div></td>
          <td className="border-bottom-0"><div className="border-0 grn_td margin-r"></div></td>
          <td className="border-bottom-0"><div className="border-0 brn_td"></div></td>
          <td className="border-bottom-0"><div className="border-0 brn_td"></div></td>
          <td className="border-bottom-0"><div className="border-0 brn_td"></div></td>
          <td className="border-bottom-0"><div className="border-0 brn_td margin-r"></div></td>
          <td className="border-bottom-0"><div className="border-0 grey_td margin-r"></div></td>
          <td className="border-bottom-0"><div className="border-0 prple_td" width="70"></div></td>
      </tr>
      )
    }
    return a
  }

  const handleSearch = async (e) => {
    try {
      let tempData,
        tempList = stockList;
      if (stockList) {
        let value = e.target.value.toLocaleLowerCase();
        if (value != "") {
          if (stockList.length > 0) {
            tempData = tempList?.filter((x) => {
              console.log(x)
              let searchInString = `${
                x.item_code?.toLocaleLowerCase() +
                " " +
                x.item_name?.toLocaleLowerCase()
              }`;
              let search = searchInString?.includes(value);
              if (search) {
                return true;
              }
            });
            setSearchedList(tempData);
          }
        } else {
          setSearchedList(stockList);
        }
      }
    } catch {}
  };

  return (
    <div className="mt-3">
      <div style={{background:"#000"}} className="w-100 d-flex justify-content-end">
        <div className="col-3 p-2 stock-ledger-search d-flex align-items-center">
            <div className="col-1 me-2">
              <GrRefresh onClick={()=>setSearchedList(stockList)} className="bg-light m-1 p-1 rounded-1" size={20}/></div>
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
      <div className="stock-ledger-cont">

      <table className="stock-ledger table w-100">
        <thead>
            <th><div className="text-start">Code</div></th>
            <th width="140"><div className="text-start">Name</div></th>
            <th><div className="prple_th rounded-top-2 margin-r">Op.stock</div></th>
            <th><div className="grn_th rounded-top-2 rounded-end-0">Purchase</div></th>
            <th><div className="grn_th">S.return</div></th>
            <th><div className="grn_th rounded-top-2 rounded-start-0 margin-r">Production</div></th>
            <th><div className="brn_th rounded-top-2 rounded-end-0">P.return</div></th>
            <th><div className="brn_th">R.return</div></th>
            <th><div className="brn_th">Sales</div></th>
            <th><div className="brn_th rounded-top-2 rounded-start-0 margin-r">Service</div></th>
            <th><div className="grey_th rounded-top-2 margin-r">S.journal</div></th>
            <th width="70"><div className="prple_th rounded-top-2">Cl.stock</div></th>
        </thead>
        <tbody>
        {searchedList?.length>0 &&
          searchedList.map((data,i)=>(
          <tr key={i}>
            <td><div style={{height:'2.9rem'}} className="text-start d-flex align-items-center">{data?.item_code||"..."}</div></td>
            <td><div style={{height:'2.9rem'}} width="110" className="text-start d-flex align-items-center">{data?.item_name||"..."}</div></td>
            <td><div className="prple_td margin-r">{data?.opening_stack||'0'}</div></td>
            <td><div className="grn_td">{data?.total_purchase_quantity||'0'}</div></td>
            <td><div className="grn_td">{data?.total_purchase_quantity||'0'}</div></td>
            <td><div className="grn_td margin-r">{data?.total_purchase_quantity||'0'}</div></td>
            <td><div className="brn_td">{data?.total_purchase_quantity||'0'}</div></td>
            <td><div className="brn_td">{data?.total_purchase_quantity||'0'}</div></td>
            <td><div className="brn_td">{data?.total_sold_quantity||'0'}</div></td>
            <td><div className="brn_td margin-r">{data?.total_stock_journal_quantity||'0'}</div></td>
            <td><div className="grey_td margin-r">{data?.total_stock_journal_quantity||'0'}</div></td>
            <td><div className="prple_td" width="70">{data?.closing_stock||'0'}</div></td>
        </tr>))}
            <AdjustTableHeight/>
        </tbody>
      </table>
      </div>
      <div className="row">
        <div className="w-100 d-flex justify-content-end mb-1">
            <div onClick={()=>navigate(-1)} className="btn btn-dark col-1 col-2 py-0">Exit</div>
      </div>
      </div>
    </div>
  );
};
