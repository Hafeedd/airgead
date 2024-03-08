import React, { useEffect, useState } from 'react'
import searchIcon from "../../../../assets/icons/search.png";
import { GrRefresh } from "react-icons/gr";
import useAccountServices from '../../../../services/master/accountServices';
import { Dropdown } from "semantic-ui-react";
import { Navigate, useNavigate } from 'react-router';

const ChartOfAccTable = (props) => {
    const { getAccountGroup } = useAccountServices();
    const { accountChart, params, setParams } = props
    const [accGroupList, setAccGroupList] = useState()
    const [tempGroupList, setTempGroupList] = useState([]);
    const [accountGroupListForDrop, setAccountGroupListForDrop] = useState([]);

    const navigate = useNavigate()

    const getAccGroup = async()=>{
        try{
            const response = await getAccountGroup()
            if (response.success){
                setAccGroupList(response?.data);
                setTempGroupList(response?.data);
                let tempListForDrop =[];
                response?.data?.map((x)=>{
                    tempListForDrop.push({
                        ...x,
                        key: x.id,
                        text: x.name,
                        value: x.id,
                        
                    });
                })
                setAccountGroupListForDrop([...tempListForDrop]);
            }
        }
        catch(err){}
    }
    useEffect(()=>{
        getAccGroup()
    },[])
    
    console.log(accGroupList)

    const handleChange = (e,data) => {
        let name = data?.name|| e.target.name
        let value = data?.value|| e.target.value
        setParams(({ ...params, [name]: value }))
    }
 
    const search = (options, searchValue) => {
        searchValue = searchValue.toUpperCase();
        return options.filter((option) => {
            return (
                option?.description?.includes(searchValue) ||
                option?.text?.includes(searchValue)
            );
        });
    };
    return (

        <>

            <div>
                <div className='bg-black mt-3 d-flex justify-content-between rounded-top'>
                    <div className='col-6 d-flex'>
                        <p className='mt-2 ms-3 text-white'>Type: </p>
                        <div className='px-5 mt-2'>
                            <select value={params?.types} onChange={handleChange} name="types" id="">
                                <option value="">All</option>
                                <option value="ASSET">ASSET</option>
                                <option value="LIABILITY">LIABILITY</option>
                                <option value="INCOME">INCOME</option>
                                <option value="EXPENSE">EXPENSE</option>
                            </select>
                        </div>

                        <div className="d-flex align-items-center px-0 row mx-0 my-2">
                            <div className="mx-0 px-0 col-5 col-6">A/c Group</div>
                            <div className="mx-0 px-0 col-4 col-5  ">
                                {/* <input
                                    onChange={handleChange}
                                    onKeyDown={handleKeyDown}
                                    name="account_group"
                                    value={
                                        accountAdd.account_group ? accountAdd.account_group : ""
                                    }
                                    type="text"
                                    className="item_input names"
                                    /> */}
                                <Dropdown
                                    clearable
                                    selection
                                    required
                                    search={search}
                                  
                                    onChange={handleChange}
                                    className="purchase-input-text account-add-group-drop 
                                    d-flex align-items-center py-0 form-control z-index-99999"
                                    name="groups"
                                    placeholder="select"
                                    value={params.groups}
                                    options={accountGroupListForDrop}
                                />
                            </div>
                            {/* <div className="col-2 pe-0 d-flex align-items-center">
                                <div
                                    className="btn btn-md btn-dark w-100 py-0"
                                    onClick={() => setShowAccountGroup(!showAccountGroup)}
                                >
                                    {showAccountGroup/ ? "Hide" : "Add"}
                                </div>
                            </div> */}
                        </div>
                    </div>

                    <div className="col-3 p-2 stock-ledger-search d-flex align-items-center">
                        <div className="col-1 me-2">
                            <GrRefresh className="bg-light m-1 p-1 rounded-1" size={20} />
                        </div>
                        <div className="item_seach_bar_cont rounded-2 col-11 col-10">
                            <img src={searchIcon} className="search_img me-3 ms-2 py-2" />
                            <input

                                className="item_search_bar rounded-2 border-0 py-1"
                                placeholder="Search"
                                type="text"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ height: '34rem', overflow: 'hidden', overflowY: 'scroll' }}>
                <table className='table table-hover'>
                    <thead>
                        <tr className='bal-sheet-table-head'>
                            <th>Sn</th>
                            <th>A/c Code</th>
                            <th>A/c Name</th>
                            <th>A/c Type</th>
                            <th>A/c Group</th>
                            <th>Closing Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            accountChart?.length > 0 &&
                            accountChart?.map((data, i) => {
                                return (
                                    <>
                                        <tr onDoubleClick={()=> navigate("/account-reports",{state:{code:data.code}})} className='chart-acc-table-data'>
                                            <td>{i + 1}</td>
                                            <td>{data.code}</td>
                                            <td>{data.name}</td>
                                            <td>{data.account_type_one}</td>
                                            <td>{data.fk_account_group__name}</td>
                                            <td>{data.closing_balance.toFixed(2)}</td>
                                        </tr>
                                    </>
                                )
                            })

                        }

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ChartOfAccTable