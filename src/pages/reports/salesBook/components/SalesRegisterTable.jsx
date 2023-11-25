import React from 'react'
import searchIcon from "../../../../assets/icons/search.png"
import { GrRefresh } from 'react-icons/gr'
import './salesRegisterTable.css'


const SalesRegisterTable = (props) => {

    const {saleRegisterList} = props


    return (
        <div className="row mx-0 mt-3">
            <div className="daybook-cont">
                <div
                    style={{ background: "#000" }}
                    className="w-100 d-flex justify-content-end rounded-top-1"
                >
                    <div className="col-3 p-2 stock-ledger-search d-flex align-items-center">
                        <div className="col-1 me-2">
                            <GrRefresh className="bg-light m-1 p-1 rounded-1" size={20} />
                        </div>
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
                <table className="table daybook-table">
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Qty</th>
                            <th>Unit</th>
                            <th>Free</th>
                            <th>Rate</th>
                            <th>G.Rate</th>
                            <th>Gross</th>
                            <th>Disc Amt</th>
                            <th>Disc %</th>
                            <th>Tax%</th>
                            <th>Tax</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        { saleRegisterList?.length>0 ? 
                        saleRegisterList.map((data, i) => (
                        <>
                        <tr>
                            <th colSpan={12} className='w-100 m-0 p-0 border-0'>
                                <div className='table-hd p-2 border-0'>
                                    <div className=' d-flex ms-4 py-1 px-0 justify-content-between align-items-center'>
                                        &emsp;Deatils : B2B/000002 &emsp;&emsp;&emsp; &emsp;&emsp; &emsp;Date : 07/10/2023 &emsp;&emsp; &emsp;&emsp; &emsp;&emsp; &emsp;&emsp; &emsp;&emsp; &emsp;&emsp; &emsp;&emsp; &emsp;&emsp; &emsp; Customer : Benison NET : 144500.00 (3 Items)
                                    </div>
                                </div>
                            </th>
                        </tr>
                        <tr key={i}>
                            <td>{data?.created_at}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td colSpan={8} className='w-100 m-0 p-0 py-4 bg-secondary'>
                            </td>
                            <td className='bg-secondary'>
                                <div className='py-2 px-3 bg-white rounded'>
                                   %%
                                </div>
                            </td>
                            <td colSpan={2} className='w-100 m-0 p-0 bg-secondary'></td>
                            <td className='bg-secondary'>
                                <div className='py-2 px-3 bg-white rounded'>
                                    0000
                                </div>
                            </td>
                        </tr>
                        </>
                        ))
    :
    <tr>
        <td colSpan={12} className='fs-4 text-center'> No Reports yet</td>
    </tr>
    
    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SalesRegisterTable
