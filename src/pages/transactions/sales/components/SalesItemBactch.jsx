
const SalesItemBactch = (props) => {
    const {salesBatchShow, setSalesBatchShow} = props

  return (
    <div className="sales-batch-table-cont rounded-2 row">
    <table className="table sales-batch-table col-12">
        <thead>
            <tr>
                <th width="170"><div className="theadth">Batch/Serial</div></th>
                <th width="150"><div className="theadth text-center">Company Barcode</div></th>
                <th><div className="theadth text-center">Rate</div></th>
                <th><div className="theadth text-center">Cost</div></th>
                <th><div className="theadth text-center">MRP</div></th>
                <th><div className="theadth text-center">P.Rate</div></th>
                <th><div className="theadth text-center">RAC</div></th>
                <th><div className="theadth text-center">.....</div></th>
                <th><div className="theadth text-center">.....</div></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><div className="tbodytd"><input value={"324324"}/></div></td>
                <td><div className="tbodytd"><input value={"asdfgh"}/></div></td>
                <td><div className="tbodytd"><input value={"asdfgh"}/></div></td>
                <td><div className="tbodytd"><input value={"asdfgh"}/></div></td>
                <td><div className="tbodytd"><input value={"asdfgh"}/></div></td>
                <td><div className="tbodytd"><input value={"asdfgh"}/></div></td>
                <td><div className="tbodytd"><input value={"asdfgh"}/></div></td>
                <td><div className="tbodytd"><input value={"asdfgh"}/></div></td>
                <td width={70}><div className="tbodytd"><input value={"asdfgh"}/></div></td>
            </tr>
            <tr>
                <td><div className="tbodytd"><input value={"324324"}/></div></td>
                <td><div className="tbodytd"><input value={"asdfgh"}/></div></td>
                <td><div className="tbodytd"><input value={"asdfgh"}/></div></td>
                <td><div className="tbodytd"><input value={"asdfgh"}/></div></td>
                <td><div className="tbodytd"><input value={"asdfgh"}/></div></td>
                <td><div className="tbodytd"><input value={"asdfgh"}/></div></td>
                <td><div className="tbodytd"><input value={"asdfgh"}/></div></td>
                <td><div className="tbodytd"><input value={"asdfgh"}/></div></td>
                <td width={70}><div className="tbodytd"><input value={"asdfgh"}/></div></td>
            </tr>
            <tr>
                <td><div className="tbodytd"><input value={"324324"}/></div></td>
                <td><div className="tbodytd"><input value={"asdfgh"}/></div></td>
                <td><div className="tbodytd"><input value={"asdfgh"}/></div></td>
                <td><div className="tbodytd"><input value={"asdfgh"}/></div></td>
                <td><div className="tbodytd"><input value={"asdfgh"}/></div></td>
                <td><div className="tbodytd"><input value={"asdfgh"}/></div></td>
                <td><div className="tbodytd"><input value={"asdfgh"}/></div></td>
                <td><div className="tbodytd"><input value={"asdfgh"}/></div></td>
                <td width={70}><div className="tbodytd"><input value={"asdfgh"}/></div></td>
            </tr>
        </tbody>
    </table>
        <div className="sales-batch-footer row align-items-center">
        <span className="col-8 col-9"/>
        <button onClick={()=>setSalesBatchShow(false)} className="btn sales-batch-cbtn col-1 col-2 me-2">Close</button>
        <button className="btn sales-batch-sbtn col-1 col-2">Save</button>
        </div>
    </div>
  )
}

export default SalesItemBactch