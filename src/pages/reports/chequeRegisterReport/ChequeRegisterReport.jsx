import React, { useEffect, useState } from 'react'
import './chequeRegisterReport.css'
import ChequeRegisterReportEntry from './components/ChequeRegisterReportEntry'
import ChequeRegisterReportTable from './components/ChequeRegisterReportTable'
import useChequeRegister from '../../../services/transactions/chequeRegister'

const ChequeRegisterReport = () => {

	const [chequeRegisterList, setChequeRegisterList] = useState([])

	const [params, setParams] = useState({
		from_date: new Date()?.toISOString()?.slice(0, 10),
		to_date: new Date()?.toISOString()?.slice(0, 10),
	})

	const { getChequeRegister, putChequeRegister } = useChequeRegister()

	useEffect(() => {
		getData()
		// getData1()
	}, [params])

	const getData = async () => {
		const response = await getChequeRegister(params)
		let tempList = []
		if (response?.success) {
			response.data.map(item => {
				tempList.push(item)
			})
			setChequeRegisterList(tempList)

		}
		return response.data
	}

	// const getData1 = async () =>{
	//   try{
	//     const response = await getChequeRegister(params) 
	//     if(response.success){
	//       setChequeRegisterList(response.data)
	//     }
	//   }catch(err){
	//     console.log(err)
	//   }
	// }


	return (
		<div className="item_add">
			<div className="itemList_header row mx-0">
				<div className="page_head ps-4 d-flex justify-content-between">
					<div>
						<div className="fw-600 fs-5">Cheque Status Report</div>
						<div className="page_head_items mb-2 mt-2">
							<div
                /* onClick={()=>navigate("/stock-reports")}  */ className={`page_head_customer active`}
							>
								Cheque Status Report
							</div>
						</div>
					</div>
					<div className="d-flex px-0 align-items-center customer-add-btn">
						{/* <div onClick={()=>{navigate("/customer-add");setToEdit(false)}} className="btn btn-primary add-btn px-0">+ &nbsp; Add Customer</div> */}
					</div>
				</div>
			</div>
			<div className="p-3">
				<div className="p-2 bg-light rounded-1 px-3">
					<ChequeRegisterReportEntry
						{
						...{
							params,
							setParams,
						}
						}
					/>
					<ChequeRegisterReportTable
						{
						...{
							chequeRegisterList,
							setChequeRegisterList,
							params,
							setParams,
						}
						}
					/>
				</div>
			</div>
		</div>
	)
}

export default ChequeRegisterReport
