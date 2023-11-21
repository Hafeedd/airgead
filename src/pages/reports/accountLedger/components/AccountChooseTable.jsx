
export const AccountChooseTable = (props) => {
  const {setChooseAccountModalShow,accList,handleAccountChooseSearch,
    handleAccChoose,handleSelectAll,accChooseList} = props
    
  return (
    <div className='position-relative'>
        <div className="acc-choose-head ps-4 rounded-2 text-light py-3">Choose Account</div>
        <div className="acc-choose-body m-3">
          <table className="table acc-choose">
            <thead>
              <tr>
                <th>Account Code</th>
                <th>Accounts</th>
                <th>
                  <input 
                  onChange={handleSelectAll} type="checkbox"
                  checked={
                    accChooseList?.length > 0 &&
                    accChooseList?.length == accList?.length
                      ? true
                      : false
                  }
                /> Select All</th>
              </tr>
            </thead>
            <tbody>
              {accList?.length>0&&
              accList.map((data,i)=>
              (<tr key={i}>
                <td>{data.name}</td>
                <td>{data.code}</td>
                <td className='text-center'>
                  <input type="checkbox" 
                  checked={
                    accChooseList?.length > 0 &&
                    accChooseList?.findIndex((x) => x == data.code) >= 0
                      ? true
                      : false
                  }
                  onChange={(e)=>handleAccChoose(data.code,e)} />
                </td>
              </tr>))}
            </tbody>
          </table>
        </div>
        <div className='row mx-0 pb-2'>
        <div className='col-9'/>
        <div className='mx-0 px-1 pe-0 col-1 col-2 pb-0 d-flex'>
            <button onClick={()=>setChooseAccountModalShow(false)} 
            className='btn btn-sm btn-dark me-2'>Close</button>
            <button onClick={()=>handleAccountChooseSearch()} 
            className='btn btn-sm btn-dark'>Apply</button>
          </div>
        </div>
    </div>
  )
}
