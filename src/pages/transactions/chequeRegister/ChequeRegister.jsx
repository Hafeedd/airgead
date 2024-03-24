import { useEffect, useState } from 'react'
import './chequeRegister.css'
import { useLocation, useNavigate } from 'react-router'
import ChequeRegisterBtmEdit from './components/ChequeRegisterBtmEdit'
import { toWords } from 'number-to-words'
import ChequeRegisterForm from './components/ChequeRegisterForm'
import useChequeRegister from '../../../services/transactions/chequeRegister'
import { formValidation } from '../../../hooks/formValidation/formValidation'
import Swal from 'sweetalert2'
import useAccountServices from '../../../services/master/accountServices'
import useItemServices from '../../../services/master/itemServices'

const ChequeRegister = () => {

	const [edit, setEdit] = useState(false)
	const location = useLocation()
	const [accountList, setAccountList] = useState([])
	const [bankAccList, setBankAccList] = useState([])
	const [chequeRegisterList, setChequeRegisterList] = useState([])
	const [chequeRegisterAdd, setChequeRegisterAdd] = useState({
		code: null,
		date: (new Date().toISOString().slice(0, 10)),
		type: 'RECEIPT',
		fk_account: '',
		account_code: '',
		fk_bank: '',
		narration: null,
		cheque_no: null,
		cheque_date: null,
		amount: null,
		fk_daybook_part: null,
		isd_date: null,
		post_date: null,
		status: 'PENDING',
		day: null,
	})

	const { getChequeRegister } = useChequeRegister()

	const { getAccountList } = useAccountServices()

	const { getCode } = useItemServices()

	const {
		postChequeRegister,
		putChequeRegister,
		delChequeRegister,
	} = useChequeRegister()


	const handleEdit = (data) => {
		let tempPayRecAdd, tempMethod
		if (location.pathname === '/cheque-register')
			tempMethod = "Payment"
		else
			tempMethod = "Receipt"
		if (data) {
			tempPayRecAdd = {
				...data,
				method: tempMethod
			}
			setChequeRegisterAdd(tempPayRecAdd)
			setEdit(data.id)
			getData1()
		}
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

	useEffect(() => {
		getData()
		handleReset()
		getCodeData()
	}, [])

	const handleReset = () => {
		setChequeRegisterAdd({
			code: null,
			date: null,
			type: 'RECEIPT',
			fk_account: null,
			fk_bank: null,
			narration: null,
			cheque_no: null,
			cheque_date: null,
			amount: null,
			fk_daybook_part: null,
			isd_date: null,
			post_date: null,
			status: 'PENDING',
			day: null
		})
		getData()
		getCodeData()
	}

	const getCodeData = async () => {
		const response = await getCode()
		let tempCode = []
		if (response?.success) {
			let a = response.data?.filter(code =>
				code.types === "CHEQUE_REGISTER_CODE"
			)[0].next_code
			setChequeRegisterAdd(data => ({ ...data, code: a }))
		}

	}

	const getData = async () => {
		const response = await getAccountList()
		let tempList1 = []
		let tempList2 = []

		if (response?.success) {
			response.data.map(item => {
				let a, b
				if (item.name && item.code) {
					a = { key: item.code, value: item.id, text: item.name, description: item.code }
					tempList1.push(a)
				}
				if (item.name && item.code && item.bank_account === true) {
					b = { key: item.code, value: item.id, text: item.name, description: item.code }
					tempList2.push(b)
				}
			})
			// setChequeRegisterAdd(data=>({...data,
			//     fk_bank:tempList2[0]?.value,
			//     fk_account:tempList1[0]?.value,
			//     account_code:tempList1[0]?.key}))
			setAccountList(tempList1)
			setBankAccList(tempList2)
		}
		return response.data
	}

	const search = (options, searchValue) => {
		searchValue = searchValue.toUpperCase();
		return options?.filter((option) => {
			console.log(option)
			return (
				option?.value?.toString()?.includes(searchValue) ||
				option?.text?.includes(searchValue)
			);
		});
	};

	const confirmDelete = async (id) => {
		Swal.fire({
			title: "Delete Cheque Register",
			text: "Do you want to delete Cheque Register ?",
			showDenyButton: true,
			showCancelButton: false,
			denyButtonText: "Cancel",
			showLoaderOnConfirm: true,
			preConfirm: async () => { await handleDelete(id) },
			preDeny: () => Swal.fire({
				title: "Canceled",
				showConfirmButton: false,
				timer: 1500
			})

		})


	}

	const handleDelete = async (id) => {
		try {
			let response
			if (id) {
				response = await delChequeRegister(id)
				if (response.success) {
					Swal.fire({
						title: "Cheque Register Deleted Successfully",
						timer: 1500,
						showConfirmButton: false
					})
				}
			}
			getData1()
		} catch (err) {

		}
	}

	const handleChange = (e, data) => {
		if (data) {
			let acc_data = data.options.filter((x) => x.value === data.value)[0];
			const values = accountList.map(account => account.value);
			if (data.name.includes('fk_account')) {
				setChequeRegisterAdd({
					...chequeRegisterAdd,
					[data.name]: acc_data.value, account_code: acc_data.key
				})
			} else {
				setChequeRegisterAdd({
					...chequeRegisterAdd,
					[data.name]: acc_data.value
				})
			}
		}
		else if (e.target.type === "number") {
			var temp_value = e.target.value
			if (isNaN(parseInt(temp_value))) {
				Swal.fire({
					icon: 'info',
					text: "Enter a valid number",
					showConfirmButton: false,
					timer: 1000,
					toast: true,
				})
				temp_value = ''
			}
			else if (parseInt(e.target.value) < 0) {
				temp_value = ''
			}

			if (e.target.name === 'amount') {
				if (e.target.value > 999999999999999) {
					temp_value = ''
					Swal.fire({
						icon: 'info',
						text: 'Max Amount Limit Reached!!!',
						showConfirmButton: false,
						timer: 1000,
						toast: true,
					})
				}
				else {
					var temp = ''
					if (temp_value !== '') {
						temp = toWords(temp_value)
					}
					console.log(temp_value)
					setChequeRegisterAdd(data => ({ ...data, 'amount_word': temp, 'amount': temp_value }))
				}
			}
			else {
				setChequeRegisterAdd(data => ({ ...data, [e.target.name]: e.target.value }))
			}
		}
		else if (!data) {
			setChequeRegisterAdd({ ...chequeRegisterAdd, [e.target.name]: e.target.value })
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			if (!formValidation()) return 0
			const submitData = handleTOUpperCase(chequeRegisterAdd)
			let response
			console.log(edit)
			if (!edit) {
				response = await postChequeRegister(submitData)
			}
			else {
				response = await putChequeRegister(edit, submitData)
			}

			if (response?.success) {
				Swal.fire(`${chequeRegisterAdd?.type === "PAYMENT" ? "PAYMENT" : "RECEIPT"} ${edit ? "edited" : "added"} successfullly`, '', 'success')
			}
			else {
				Swal.fire(response.message, 'Failed! please try again', 'error')
			}
		}
		catch (err) {
			Swal.fire(`Failed to Add ${chequeRegisterAdd?.method === "PAYMENT" ? "PAYMENT" : "RECEIPT"}`, '', 'error')
		}
		handleReset()
		getData1()
	}

	const getData1 = async () => {
		const response = await getChequeRegister()
		let tempList = []
		if (response?.success) {
			response.data.map(item => {

				tempList.push(item)
			})
			setChequeRegisterList(tempList)
		}
		return response.data
	}


	return (
		<div className="item_add">
			<div className="itemList_header row mx-0">
				<div className="page_head ps-4 d-flex justify-content-between">
					<div>
						<div className="fw-600 fs-5">Cheque Register</div>
						<div className="page_head_items mb-2 mt-2">
							<div
                /* onClick={()=>navigate("/stock-reports")}  */ className={`page_head_customer active`}
							>
								Cheque Register
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
					<ChequeRegisterForm
						{
						...{
							edit,
							handleSubmit,
							handleChange,
							chequeRegisterAdd,
							setChequeRegisterAdd,
							accountList,
							bankAccList,
							handleReset,
							getCodeData,
							search,
						}
						}

					/>
					<ChequeRegisterBtmEdit
						{
						...{
							handleEdit,
							confirmDelete,
							getData1,
							chequeRegisterList
						}
						}

					/>
				</div>
			</div>
		</div>
	)
}

export default ChequeRegister
