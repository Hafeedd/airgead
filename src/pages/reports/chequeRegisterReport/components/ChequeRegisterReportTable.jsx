import React, { useEffect, useState } from 'react'
import searchIcon from "../../../../assets/icons/search.png";
import { GrRefresh } from "react-icons/gr";
import useChequeRegister from '../../../../services/transactions/chequeRegister';
import { Form } from "react-bootstrap";
import { formValidation } from '../../../../hooks/formValidation/formValidation';
import Swal from 'sweetalert2';

const ChequeRegisterReportTable = (props) => {
	const { chequeRegisterList, setChequeRegisterList } = props
	const { putChequeRegisterReport } = useChequeRegister()

	const [chequeRegisterEdit, setChequeRegisterEdit] = useState({
		status: '',
	})
	const [newDate, setNewDate] = useState()

	const [searchedList, setSearchedList] = useState([]);

	useEffect(() => {
		setSearchedList(chequeRegisterList);
	}, [chequeRegisterList]);

	const handleUpdate = async (i) => {
		try {
			if (chequeRegisterList?.length < 1) return Swal.fire('Error', '', 'error')
			const { isd_date, pst_date, status, id } = chequeRegisterList[i]
			// chequeRegisterList.

			const submitData = {
				...chequeRegisterList[i],
				isd_date: isd_date,
				pst_date: pst_date,
				status: status,

			}
			console.log(chequeRegisterList)
			const response = await putChequeRegisterReport(id, submitData)
			if (response.success) {
				Swal.fire({
					title: "Success",
					text: response.message,
					icon: 'success',
					timer: 1200,
				})
			} else {
				Swal.fire({
					title: "Error",
					text: response.message,
					icon: 'error',
					timer: 1200,
				})

			}
		} catch (err) {
			console.log(err)
			Swal.fire({
				title: "Error",
				text: err?.response?.data?.message || "Failed to update cheque register status and date",
				icon: 'error',
				timer: 1200,
			})
		}
	}


	const countDaysBetweenDates = (fromDate, toDate) => {
		const oneDay = 24 * 60 * 60 * 1000;

		const fromDateObj = new Date(fromDate);
		const toDateObj = new Date(toDate);
		if (isNaN(fromDateObj) || isNaN(toDateObj)) {
			return 'Invalid date format';
		}
		const diffDays = Math.round(Math.abs((fromDateObj - toDateObj) / oneDay));

		return diffDays + 1;
	};

	const handleChange = (e, i) => {

		let tempChequeRegisterList = [...chequeRegisterList]
		let a = { ...tempChequeRegisterList[i] }
		
		console.log(a.status)

		if (e.target.name === 'isd_date') {
			a.status = 'ISSUED'
		}
		else if (e.target.name === 'pst_date') {
			a.status = 'POSTED'
		}

		if (e.target.value === 'ISSUED') {
			let date = new Date().toISOString().slice(0, 10)
			a = { ...a, isd_date: date, pst_date: null }

			Swal.fire({
				icon: 'warning',
				title: "Status change to Issued",
				
			})
		}

		else if (e.target.value === 'POSTED') {
			let date = new Date().toISOString().slice(0, 10)
			a = { ...a, pst_date: date }
			Swal.fire({
				icon: 'warning',
				title: "Status change to Posted",
				
			})
		}

		if (e.target.value && e.target.type) {
			a = { ...a, [e.target.name]: e.target.value }
		}
		tempChequeRegisterList.splice(i, 1, a)
		setChequeRegisterList([...tempChequeRegisterList])
	}

	const handleTOUpperCase = (data) => {
		let keysOfData, tempData = { ...data }
		if (typeof data == 'object')
			keysOfData = Object.keys(data)
		if (!keysOfData?.length > 0) return 0
		keysOfData.map(item => {
			if (typeof data[item] == 'string' && item != 'method') {
				let itemTemp = data[item]?.toUpperCase()
				tempData = { ...tempData, [item]: itemTemp }
			}
		})
		return tempData
	}

	const handleSearch = async (e) => {
		try {
			let tempData,
				tempList = chequeRegisterList;
			if (chequeRegisterList) {
				let value = e.target.value.toLocaleLowerCase();
				if (value != "") {
					if (chequeRegisterList.length > 0) {
						tempData = tempList?.filter((x) => {
							let searchInString = `${x.code?.toLocaleLowerCase() +
								" " +
								x.cheque_no?.toLocaleLowerCase() +
								" " +
								x.account?.toLocaleLowerCase()
								}`;
							let search = searchInString?.includes(value);
							if (search) {
								return true;
							}
						});
						setSearchedList(tempData);
					}
				} else {
					setSearchedList(chequeRegisterList);
				}
			}
		} catch { }
	}

	// const handleUpdate = async (e) => {
	// 	// e.preventDefault()
	// 	try {
	// 		if (!formValidation()) return 0
	// 		const submitData = handleTOUpperCase(chequeRegisterEdit)
	// 		let response = await putChequeRegister(submitData)

	// 		if (response?.success) {
	// 			Swal.fire(`${chequeRegisterEdit ? "Success" : "Error"}`, '', 'success')
	// 		}
	// 		else {
	// 			Swal.fire(response.message, 'Failed! please try again', 'error')
	// 		}
	// 	}
	// 	catch (err) {
	// 		console.log('error')
	// 	}
	// }

	// countDatesInRange((data?.created_at.slice(0, 10).split('-').reverse().join('/')),(data?.cheque_date));
	return (
		<div className=" mx-0 mt-3 tax-report
		
		-cont">
			<div
				style={{ background: "#000" }}
				className="cheque-report-top-entry-sticky w-100 d-flex justify-content-end rounded-top-1"
			>
				<div className="col-3 p-2 stock-ledger-search d-flex align-items-center">
					<div className="col-1 me-2">
						<GrRefresh
							// onClick={() => setSearchedList(reportList)}
							className="bg-light m-1 p-1 rounded-1"
							size={20}
						/>
					</div>
					<div className="item_seach_bar_cont rounded-2 col-11 col-10">
						<img src={searchIcon} className="search_img me-3 ms-2 my-0" />
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
			<div className='table-cheque-report-head'>
			
				<table className='table bg-black text-white'>
					<thead >
						<tr className='table-head-bg'>
							<th >Date</th>
							<th>Doc No</th>
							<th>Type</th>
							<th>Party</th>
							<th>Bank</th>
							<th>Cheque Number</th>
							<th>Cheque Date</th>
							<th>Amt</th>
							<th>Day</th>
							<th>Status</th>
							<th>Issued Date</th>
							<th>Post Date</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{

							searchedList?.length > 0 ?
								searchedList.map((data, i) => {
									const from_date = data?.created_at?.slice(0, 10);
									const to_date = data?.cheque_date;

									const count_date = countDaysBetweenDates(from_date, to_date);

									return (
										<>
											
											<tr className='border'>
												<td >{data?.created_at?.slice(0, 10).split('-').reverse().join('/')}</td>
												<td>{data?.code}</td>
												<td>{data?.type}</td>
												<td style={{ textAlign: "start" }}>{data?.account}</td>
												<td>{data?.bank_name}</td>
												<td>{data?.cheque_no}</td>
												<td>{data?.cheque_date}</td>
												<td>{data?.amount}</td>
												<td>{count_date - 1}</td>
												<td>
													<select className='py-1' onChange={(e) => handleChange(e, i)}
														name='status' value={data.status || "PENDING"}
													>

														<option value="PENDING">Pending</option>
														<option value="ISSUED">Issued</option>
														<option value="POSTED">Posted</option>
														<option value="REJECTED">Rejected</option>
													</select>
												</td>
												<td name="isd_date" >
													<Form.Group>
														<Form.Control
															className='cheque-report-date-sel py-1'
															type='date'
															name="isd_date"
															value={data?.isd_date || ''}
															onChange={(e) => handleChange(e, i)}
														>
														</Form.Control>
													</Form.Group>

												</td>

												<td>
													<Form.Group>
														<Form.Control
															className='cheque-report-date-sel py-1'
															type='date'
															name="pst_date"
															value={data?.pst_date || ''}
															onChange={(e) => handleChange(e, i)}
														>
														</Form.Control>
													</Form.Group>
												</td>
												<td>
													<div className='btn btn-sm bg-secondary text-white' onClick={() => handleUpdate(i)}>
														UPDATE

													</div>
												</td>
											</tr>
										</>
									)
								}) :
								<tr>
									<td className='py-3' style={{ fontSize: "30px" }} colSpan={13}>No Reports yet</td>
								</tr>
						}

					</tbody>
				</table>
			</div>
		</div>
	)
}

export default ChequeRegisterReportTable