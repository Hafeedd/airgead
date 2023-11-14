import searchIcon from "../../../../assets/icons/search.png";
import {GrRefresh} from 'react-icons/gr'

export const StockTable = (props) => {
  const {stockList, setStockList,
    paramsToReport, setParamsToReport,} = props
    
  const AdjustTableHeight = () =>{
    let a = []
    for(let i = 0 ; i<6 - stockList?.length ; i++){
      a.push(
        <tr>
          <td className="text-start">{'...'}</td>
          <td width="110" className="text-start">{'...'}</td>
          <td className="prple_td">{'...'}</td>
          <td className="grn_td">{'...'}</td>
          <td className="grn_td">{'...'}</td>
          <td className="grn_td">{'...'}</td>
          <td className="brn_td">{'...'}</td>
          <td className="brn_td">{'...'}</td>
          <td className="brn_td">{'...'}</td>
          <td className="brn_td">{'...'}</td>
          <td className="grey_td">{'...'}</td>
          <td className="prple_td" width="70">{'...'}</td>
      </tr>
      )
    }
    return a
  }

  return (
    <div className="mt-3">
      <div style={{background:"#000"}} className="w-100 d-flex justify-content-end">
        <div className="col-3 p-2 stock-ledger-search d-flex align-items-center">
            <div className="col-1 me-2"><GrRefresh className="bg-light m-1 p-1 rounded-1" size={20}/></div>
          <div className="item_seach_bar_cont rounded-2 col-11 col-10">
            <img src={searchIcon} className="search_img me-3 ms-2 py-2" />
            <input
              // value={search}
              // onChange={(e)=>setSearch(e.target.value)}
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
            <th><div className="prple_th rounded-top-2">Op.stock</div></th>
            <th><div className="grn_th rounded-top-2 rounded-end-0">Purchase</div></th>
            <th><div className="grn_th">S.return</div></th>
            <th><div className="grn_th rounded-top-2 rounded-start-0">Production</div></th>
            <th><div className="brn_th rounded-top-2 rounded-end-0">P.return</div></th>
            <th><div className="brn_th">R.return</div></th>
            <th><div className="brn_th">Sales</div></th>
            <th><div className="brn_th rounded-top-2 rounded-start-0">Service</div></th>
            <th><div className="grey_th rounded-top-2">S.journal</div></th>
            <th width="70"><div className="prple_th rounded-top-2">Cl.stock</div></th>
        </thead>
        <tbody>
        {stockList?.length>0 &&
          stockList.map((data,i)=>(
          <tr key={i}>
            <td className="text-start">{data?.item_code||"..."}</td>
            <td width="110" className="text-start">{data?.item_name||"..."}</td>
            <td className="prple_td">{data?.opening_stack||'0'}</td>
            <td className="grn_td">{data?.total_purchase_quantity||'0'}</td>
            <td className="grn_td">{data?.total_purchase_quantity||'0'}</td>
            <td className="grn_td">{data?.total_purchase_quantity||'0'}</td>
            <td className="brn_td">{data?.total_purchase_quantity||'0'}</td>
            <td className="brn_td">{data?.total_purchase_quantity||'0'}</td>
            <td className="brn_td">{data?.total_sold_quantity||'0'}</td>
            <td className="brn_td">{data?.total_stock_journal_quantity||'0'}</td>
            <td className="grey_td">{data?.total_stock_journal_quantity||'0'}</td>
            <td className="prple_td" width="70">{data?.closing_stock||'0'}</td>
        </tr>))}
            <AdjustTableHeight/>
        </tbody>
      </table>
      </div>
      <div className="row">
        <div className="w-100 d-flex justify-content-end mb-3">
            <div className="btn btn-dark col-1 col-2 py-0 me-3">Edit</div>
            <div className="btn btn-dark col-1 col-2 py-0">Save</div>
      </div>
      </div>
    </div>
  );
};
