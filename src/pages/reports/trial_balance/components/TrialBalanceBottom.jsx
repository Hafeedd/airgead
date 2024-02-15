import React, { useEffect, useState } from 'react'
import { GrRefresh } from "react-icons/gr";
import searchIcon from "../../../../assets/icons/search.png";
import { useNavigate } from 'react-router';

const TrialBalanceBottom = (props) => {
    const navigate = useNavigate()
    const { trialBalance } = props
    const [searchedList, setSearchedList] = useState([]);
    const [totalBal, setTotalBal] = useState({ debit: null, credit: null, diffAmount: null, debitOrCredit:null })

    useEffect(()=>{
        setSearchedList(trialBalance)
    },[trialBalance])

    useEffect(() => {
  
        setSearchedList(searchedList)
        if (searchedList?.length > 0) {
           
            let debit = searchedList.reduce((a, b) => b.closing_balance > 0 ? a + b.closing_balance : a, 0)
            let credit = searchedList.reduce((a, b) => b.closing_balance < 0 ? a + b.closing_balance : a, 0)
            console.log(debit+credit)
            let diffAmount = (Math.abs(debit) - Math.abs(credit)).toFixed(2)
            let debitOrCredit = diffAmount > 0?" Debit": " Credit"
            setTotalBal({ debit: debit, credit: credit, diffAmount: diffAmount, debitOrCredit: debitOrCredit })
        }else
        setTotalBal({ debit: null, credit: null, diffAmount: null, debitOrCredit: null})
  
    }, [searchedList])

    const handleSearch = async (e) => {
        console.log(trialBalance)
		try {
			let tempData,
				tempList = trialBalance;
			if (trialBalance) {
				let value = e.target.value.toLocaleLowerCase();
				if (value != "") {
					if (trialBalance.length > 0) {
                        console.log('function work is done')
						tempData = tempList?.filter((x) => {
                            console.log(x.account_code)
							let searchInString = `${x.account_code?.toLocaleLowerCase() +
								" " +
								x.account_name?.toLocaleLowerCase() 
								}`;
							let search = searchInString?.includes(value);
							if (search) {
								return true;
							}
						});
						setSearchedList(tempData);
					}
				} else {
					setSearchedList(trialBalance);
				}
			}
		} catch { }
	}
    return (
        <>
            <div className='bg-black mt-3 d-flex justify-content-end rounded-top'>
                <div className="col-3 p-2 stock-ledger-search d-flex align-items-center">
                    <div className="col-1 me-2">
                        <GrRefresh className="bg-light m-1 p-1 rounded-1" size={20} />
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
            <div style={{ height: '34rem', overflow: 'hidden', overflowY: 'scroll' }}>
                <table className='table table-hover'>
                    <thead >
                        <tr className='trial-bal-table-head'>
                            <td>Sn</td>
                            <td>Acc Code</td>
                            <td>Acc Name</td>
                            <td>Debit</td>
                            <td>Credit</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            searchedList?.length > 0 ?
                                searchedList.map((data, i) => {
                                    // debit = debit+(data.closing_balance > 0 ? data.closing_balance:0)||0
                                    // setDebits(debit+(data.closing_balance > 0 ? data.closing_balance:0))
                                    // setDebits(debit+(data.closing_balance > 0 ? data.closing_balance:0))
                                    // credit = credit+(data.closing_balance < 0 ? data.closing_balance:0)||0
                                    return (

                                        <>
                                            {/* {data.length>0 &&
                                    data.map((item,i)=>( */}
                                            <tr onDoubleClick={() => navigate("/account-reports")} className='trial-balance-data'>
                                                <td>{i + 1}</td>
                                                <td>{data?.account_code}</td>
                                                <td>{data?.account_name}</td>
                                                <td>{(data.closing_balance > 0 ? data.closing_balance.toFixed(2) : "")}</td>
                                                <td>{(data.closing_balance < 0 ? Math.abs(data.closing_balance.toFixed(2)) : "")}</td>
                                            </tr>


                                        </>
                                    )
                                }) :
                                <tr>
                                    <td colSpan={5}>No Data</td>
                                </tr>

                        }

                        {
                            (
                                <tr className='trial-table-head-btm-row'>

                                    <td className={`${totalBal?.diffAmount?.toString().includes("-") ? "bg-danger text-white rounded-start" : "bg-success text-white rounded-start" || 0}`} colSpan={3} style={{}} >
                                        Difference Amount : {totalBal?.diffAmount}{totalBal?.debitOrCredit}
                                    </td>
                                    <td className='bg-primary text-start'>
                                        <span className='bg-white rounded p-2 px-3'>{Math.abs(totalBal.debit?.toFixed(2)) || ''}</span>
                                    </td>
                                    <td className='bg-primary text-start rounded-end'>
                                        <span className='bg-white rounded p-2 px-3'>{Math.abs(totalBal.credit?.toFixed(2)) || ''}</span>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>

                </table>
            </div>

        </>
    )
}

export default TrialBalanceBottom