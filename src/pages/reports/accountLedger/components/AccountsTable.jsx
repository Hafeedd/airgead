import searchIcon from "../../../../assets/icons/search.png";
import {MdRefresh} from 'react-icons/md'

export const AccountsTable = (props) => {
    const {reportList} = props

  let account = "CASH IN HAND";
  let quantity = 15;

  const AdjustTableHeight = () =>{
    let a = []
    for(let i = 0 ; i<7 - reportList?.length ; i++){
      a.push(
        <tr>
            <td className="text-start">{'...'}</td>
            <td className="text-center">{'...'}</td>
            <td className="text-center">{'...'}</td>
            <td className="text-center">{'...'}</td>
            <td className="text-center">{'...'}</td>
            <td className="text-center">{'...'}</td>
            <td className="text-end">{'...'}</td>
        </tr>
      )
    }
    return a
  }

  return (
    <div className="mt-3 acc-ledger-cont">
      <table className="table acc-ledger">
        <thead>
          <tr>
            <th className="text-start">Date</th>
            <th className="text-center">Doc No.</th>
            <th className="text-center">A/C Name</th>
            <th className="text-center">Narration</th>
            <th className="text-center">Debit</th>
            <th className="text-center">Credit</th>
            <th className="text-end">Balance</th>
          </tr>
          <tr>

          </tr>
        </thead>
        <tbody>
            {reportList?.length>0 ?
            reportList.map((data,i)=>{
              let tempBalance = data?.opening_balance
            return(<>
            <tr key={i}>
            <th colSpan={7} className="w-100">
              <div className="">
                <div className="text-light ms-3 py-1 d-flex align-items-center justify-content-between">
                  Ledger Name : {"(" + data.account_name + ")"} &nbsp;{" "}
                  {"(" + data?.opening_balance + ": Op. Balance) " + "(" + data?.closing_balance +": Cl. Balance)"}
                    <div className="col-3 p-2 stock-ledger-search d-flex align-items-center">
                      <div className="col-1 me-2">
                        <MdRefresh
                          className="bg-dark m-1 p-0 rounded-1"
                          size={21}
                        />
                      </div>
                      <div className="item_seach_bar_cont rounded-2 col-11 col-10">
                        <img
                          src={searchIcon}
                          className="search_img me-3 ms-2 py-2"
                        />
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
              </div>
            </th>
            </tr>
           {data.ledger_report.length>0?
           data.ledger_report.map((item,i)=>{
             let balance
             if(!item.debit)
              balance = tempBalance - item?.credit||0
            else balance = tempBalance - item?.debit||0
             tempBalance = balance
            return(
             <tr key={i}>
                <td className="text-start">{new Date(item.date).toLocaleDateString()}</td>
                <td className="text-center">{item.opp_code}</td>
                <td className="text-center">{item.opp_account}</td>
                <td className="text-center">{item.narration}</td>
                <td className="text-center">{item?.debit||0}</td>
                <td className="text-center">{item?.credit||0}</td>
                <td className="text-end">{balance}</td>
            </tr>
              )}):
              <tr><td className="fs-4 text-center" colSpan={7}>No reports yet</td></tr>
            }
            <tr>
              <td style={{background:"#CECECE"}} className="" colSpan={1}>Closing balance</td>
              <td style={{background:"#CECECE"}} className="text-end" colSpan={6}>{data.closing_balance}</td>
            </tr>
            </>)})
            :
            <tr><td className="fs-4 text-center" colSpan={7}>No reports yet</td></tr>
            }
        {/* <AdjustTableHeight/> */}
        </tbody>
      </table>
    </div>
  );
};
