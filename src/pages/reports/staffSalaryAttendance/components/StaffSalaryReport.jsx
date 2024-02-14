import React, { useEffect, useState } from 'react'

const StaffSalaryReport = (params) => {
  const{staffSalary,searchedList}=params;
  return (
          <div>
              <div style={{
                  height: "24.9rem",
                  width: "85rem",
                  overflowX: "hidden",
                  overflowY: "scroll",
                  }}  className='w-100'>
                  <table className="StaffTables w-100">
                      <thead>
                      <tr>
                        <th>Code</th>
                        <th>Staff Name</th>
                        <th>Salary</th>
                        <th>A.Leave</th>
                        <th>Lv.Taken</th>
                        <th>Lv.Cut</th>
                        <th>PF</th>
                        <th>ESI</th>
                        <th>Insurance</th>
                        <th>O.cut</th>
                        <th>Total Salary</th>
                      </tr>
                      </thead>
                      <tbody>
                      {(staffSalary === undefined ||
                          staffSalary === null ||
                          staffSalary.length === 0) && (
                          <tr>
                              <td>--</td>
                              <td>--</td>
                              <td>--</td>
                              <td>--</td>
                              <td>--</td>
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
                              console.log(data);
                              return (
                                  <tr key={i}>
                                      <td>{data.voucher_number}</td>
                                      <td>{data.staff_name}</td>
                                      <td>{data.salary}</td>
                                      <td>{data.allowed_leave}</td>
                                      <td>{data.leave_taken}</td>
                                      <td>{data.leave_cut}</td>
                                      <td>{data.pf}</td>
                                      <td>{data.esi}</td>
                                      <td>{data.insurance}</td>
                                      <td>{data.other}</td>
                                      <td>{data.net_salary}</td>
                                  </tr>
                              )})}
                          </tbody>
                  </table>
              </div>
          </div>
  )
}

export default StaffSalaryReport