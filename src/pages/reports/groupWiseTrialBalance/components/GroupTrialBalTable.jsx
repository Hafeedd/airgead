import React from 'react'
import { GrRefresh } from "react-icons/gr";
import searchIcon from "../../../../assets/icons/search.png";
import { Sticky } from 'semantic-ui-react';

const GroupTrialBalTable = (props) => {
    const {groupTrialBal} = props

    const listnew = groupTrialBal["ser"]
    console.log(listnew,"arra")
    // for(let i=0, )
    // const newArray = listnew.map((data,i)=>{
    //     console.log(i)
    // })
    // console.log(newArray)

    let newArray = []
    if (Array.isArray(listnew)) {
        newArray = listnew.map((data) => {
            return data // Accessing the 'id' property of each object
        });
        console.log(newArray);
    } else {
        console.log("listnew is not an array or is undefined.");
    
    }

    let accArray = []
    if (Array.isArray(listnew)) {
        accArray = listnew.map((data) => {
            return data.account // Accessing the 'id' property of each object
        });
        console.log(accArray,"ppppppppppppppppppppppppppppp");
    } else {
        console.log("listnew is not an array or is undefined.");
    
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
                            // onChange={handleSearch}
                            className="item_search_bar rounded-2 border-0 py-1"
                            placeholder="Search"
                            type="text"
                        />
                    </div>
                </div>
            </div>

            <div style={{ height: '34rem', overflow: 'hidden', overflowY: 'scroll' }}>
                <table className='table table-hover'>
                    <thead>
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
                        newArray?.length > 0?
                            newArray.map((data,i)=>{
                                return(
                                    <>
                                        <tr>
                                            <td style={{backgroundColor:"lightblue", position:"sticky", top:"36px"}} className='text-start' colSpan={5}>{data?.name||""}</td>
                                            {/* <td>{data?.account[]?.name}</td> */}
                                        </tr>
                                        
                                   
                                        {   
                                            
                                            accArray?.length > 0?
                                            accArray[i].map((acc,i)=>{
                                                console.log(acc,"new")
                                                return(
                                                    <>
                                                        <tr>
                                                            <td>{i+1}</td>
                                                            <td className='text-start'>{acc?.code}</td>
                                                            <td className='text-start'>{acc?.name}</td>
                                                            <td className='text-success text-start'>{acc?.closing_balance > 0 ? acc?.closing_balance.toFixed(2): ""}</td>
                                                            <td className='text-danger text-start'>{acc?.closing_balance < 0 ? acc?.closing_balance.toFixed(2): ""}</td>
                                                            
                                                        </tr>
                                                        
                                                    </>
                                                )
                                            }):
                                            <tr>
                                                <td>no data</td>
                                            </tr>
                                        
                                        }
                                        <tr>
                                            <td className={`${data?.total_closing_balance?.toString().includes("-")? "bg-danger text-white text-end": "bg-success text-white text-end" }`} colSpan={5}>
                                                {data?.total_closing_balance?.toFixed(2)}
                                            </td>
                                        </tr>
                                       
                                    </>
                                )
                            }):
                            <tr>
                                <td colSpan={5}>No Data</td>
                            </tr>
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default GroupTrialBalTable