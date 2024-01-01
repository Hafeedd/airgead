import React, { useEffect, useState } from 'react'

const StaffAttendanceReport = (params) => {
    const{staffAttendance,searchedList,setShow}=params;
    return (
            <div>
                <div style={{
                    height: "24.9rem",
                    width: "85rem",
                    overflowX: "hidden",
                    overflowY: "scroll",
                    }}>
                    <table className="StaffTables w-100">
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Leave</th>
                            </tr>
                        </thead>
                        <tbody>
                        {(staffAttendance === undefined ||
                            staffAttendance === null ||
                            staffAttendance.length === 0) && (
                            <tr>
                                <td>--</td>
                                <td>--</td>
                                <td>--</td>
                                <td>--</td>
                                <td>--</td>
                                <td>--</td>
                            </tr>
                            )}
                                 {searchedList?.length > 0 &&
                                searchedList?.map((data, i) => {
                                return (
                                    <tr key={i} onClick={()=>setShow(data)}>
                                        <td>{data.staff_code}</td>
                                        <td>{data.staff_name}</td>
                                        <td>{data.address}</td>
                                        <td>{data.phone}</td>
                                        <td>{data.email}</td>
                                        <td>{parseFloat(((data?.leave?.Before_Noon?.entries.length)/2)||0)+parseFloat(((data?.leave?.After_Noon?.entries.length)/2)||0)+parseFloat(data?.leave?.Full_Day?.entries.length||0)}</td>
                                    </tr>
                                )})}
                            </tbody>
                    </table>
                </div>
            </div>
    )
}

export default StaffAttendanceReport