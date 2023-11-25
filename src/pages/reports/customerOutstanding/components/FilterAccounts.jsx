import React, { useEffect, useState } from 'react'
import minus from '../../../../assets/icons/minus.png'
import { useLocation } from 'react-router'
import useItemServices from '../../../../services/master/itemServices'

const FilterAccounts = () => {

    const location = useLocation().pathname
    const [dropSelect, SetDropSelect] = useState()
    const { getProperty } = useItemServices()
    const [property, setProperty] = useState([])
    const [arrayProperty, setArrayProperty] = useState([])
    const [filterbySelect,setFilterBySelect]=useState()

    useEffect(() => {
        location === '/supplier-outstandings' ? SetDropSelect('company') : location === '/staff-outstandings' ? SetDropSelect('designation') : SetDropSelect('route')
        getpro()
    }, [])

    const getpro = async () => {
        try {
            const response = await getProperty()
            if (response?.success) {
                setProperty(response.data)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const removeRow = (i) => {
        let a = [...arrayProperty]
        a.splice(i,1)
        setArrayProperty(a)
    }

    const handleAdd = () => {
        let a = [...arrayProperty]
        a.push({property_type:dropSelect,property_value:filterbySelect})
        setArrayProperty(a)
    }
    console.log('array',arrayProperty)

    const CustOption = () => {
        const filteredOptions = property
            .filter(data => data.property_type === dropSelect)
            .map(data => (
                <option key={data.property_value} value={data.property_value}>
                    {data.property_value}
                </option>
            ));

        return [<option key={null} value={null}>Select</option>, ...filteredOptions];
    };

    return (
        <div>
            <label className='row bg-dark text-light mx-0 p-3 rounded-top-2' style={{ position: 'sticky', top: 0 }}>Filter Accounts</label>
            <div style={{ height: '24rem', overflow: 'hidden', overflowY: 'scroll' }} className='rounded-bottom-2 border m-3'>
                <table className='w-100 mx-0' >
                    <thead style={{ position: 'sticky', top: 0 }}>
                        <tr className='text-light bg-secondary '>
                            <th>Parameters</th>
                            <th>Filter By</th>
                            <th><button className='btn btn-sm btn-dark' onClick={handleAdd}>ADD</button></th>
                        </tr>
                    </thead>
                    <tbody>

                        {arrayProperty.length>0&&
                        arrayProperty.map((data,i)=>
                        {
                            return location === '/customer-outstandings' ?
                                <tr className='text-dark bg-light '>
                                    <td> <select value={dropSelect} className='btn btn-md rounded-2 border border-dark' onChange={(e) => SetDropSelect(e.target.value)}>
                                        <option value="route">Route</option>
                                        <option value="city">City</option>
                                        <option value="town">Town</option>
                                        <option value="district">District</option>
                                        <option value="care_of">Care of</option>
                                        <option value="company">Company</option>
                                        <option value="blocked">Blocked</option>
                                    </select></td>
                                    <td>
                                        <select  value={filterbySelect} className='btn btn-md rounded-2 border border-dark bg-secondary text-light' onChange={(e)=>setFilterBySelect(e.target.value)}>
                                            <CustOption />
                                        </select>
                                    </td>
                                    <td><img src={minus} alt="" onClick={()=>removeRow(i)} /></td>
                                </tr>
                            :location === '/supplier-outstandings' ?
                                <tr className='text-dark bg-light '>
                                    <td>
                                        <span value='company'>Company</span>
                                    </td>
                                    <td>
                                        <select value={filterbySelect} className='btn btn-md rounded-2 border border-dark bg-secondary text-light'>
                                            <CustOption />
                                        </select>
                                    </td>
                                    <td><img src={minus} alt="" onClick={()=>removeRow(i)} /></td>
                                </tr>

                            :

                                <tr className='text-dark bg-light '>
                                    <td>
                                        <span value='designation'>Designation</span>
                                    </td>
                                    <td>
                                        <select value={filterbySelect} className='btn btn-md rounded-2 border border-dark bg-secondary text-light'>
                                            <CustOption />
                                        </select>
                                    </td>
                                    <td><img src={minus} alt="" onClick={()=>removeRow(i)} /></td>
                                </tr>
                        })}

                        {location === '/customer-outstandings' ?
                                <tr className='text-dark bg-light '>
                                    <td> <select  className='btn btn-md rounded-2 border border-dark' onChange={(e) => SetDropSelect(e.target.value)}>
                                        <option value="route">Route</option>
                                        <option value="city">City</option>
                                        <option value="town">Town</option>
                                        <option value="district">District</option>
                                        <option value="care_of">Care of</option>
                                        <option value="company">Company</option>
                                        <option value="blocked">Blocked</option>
                                    </select></td>
                                    <td>
                                        <select  className='btn btn-md rounded-2 border border-dark bg-secondary text-light' onChange={(e)=>setFilterBySelect(e.target.value)}>
                                            <CustOption />
                                        </select>
                                    </td>
                                    {/* <td><img src={minus} alt="" onClick={()=>removeRow(i)} /></td> */}
                                </tr>
                            : location === '/supplier-outstandings' ?
                                <tr className='text-dark bg-light '>
                                    <td>
                                        <span value='company'>Company</span>
                                    </td>
                                    <td>
                                        <select  className='btn btn-md rounded-2 border border-dark bg-secondary text-light'>
                                            <CustOption />
                                        </select>
                                    </td>
                                    {/* <td><img src={minus} alt="" onClick={()=>removeRow(i)} /></td> */}
                                </tr>

                            :

                                <tr className='text-dark bg-light '>
                                    <td>
                                        <span value='designation'>Designation</span>
                                    </td>
                                    <td>
                                        <select  className='btn btn-md rounded-2 border border-dark bg-secondary text-light'>
                                            <CustOption />
                                        </select>
                                    </td>
                                    {/* <td><img src={minus} alt="" onClick={()=>removeRow(i)} /></td> */}
                                </tr>
                        }

                    </tbody>
                    <tfoot></tfoot>
                </table>
            </div>
        </div >
    )
}

export default FilterAccounts

// import React, { useEffect, useState } from "react";
// import minus from "../../../../assets/icons/minus.png";
// import { useLocation } from "react-router";
// import useItemServices from "../../../../services/master/itemServices";

// const FilterAccounts = () => {
//   const location = useLocation().pathname;
//   const { getProperty } = useItemServices();
//   const [property, setProperty] = useState([]);
//   const [arrayProperty, setArrayProperty] = useState([]);

//   // Separate state variables for each dropdown
//   const [dropSelectCompany, setDropSelectCompany] = useState();
//   const [dropSelectSupplier, setDropSelectSupplier] = useState();
//   const [dropSelectStaff, setDropSelectStaff] = useState();

//   // Separate state variables for each filterBySelect
//   const [filterBySelectCompany, setFilterBySelectCompany] = useState();
//   const [filterBySelectSupplier, setFilterBySelectSupplier] = useState();
//   const [filterBySelectStaff, setFilterBySelectStaff] = useState();

//   useEffect(() => {
//     // Choose the correct dropSelect state based on the current location
//     if (location === "/supplier-outstandings") {
//       setDropSelectSupplier("company");
//     } else if (location === "/staff-outstandings") {
//       setDropSelectStaff("designation");
//     } else {
//       setDropSelectCompany("route");
//     }

//     getPro();
//   }, []);

//   const getPro = async () => {
//     try {
//       const response = await getProperty();
//       if (response?.success) {
//         setProperty(response.data);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const removeRow = (i) => {
//     let a = [...arrayProperty];
//     a.splice(i, 1);
//     setArrayProperty(a);
//   };

//   const handleAdd = () => {
//     let a = [...arrayProperty];
//     // Choose the correct dropSelect state based on the current location
//     if (location === "/supplier-outstandings") {
//       a.push({
//         property_type: dropSelectSupplier,
//         property_value: filterBySelectSupplier,
//       });
//     } else if (location === "/staff-outstandings") {
//       a.push({
//         property_type: dropSelectStaff,
//         property_value: filterBySelectStaff,
//       });
//     } else {
//       a.push({
//         property_type: dropSelectCompany,
//         property_value: filterBySelectCompany,
//       });
//     }
//     setArrayProperty(a);
//   };

//   const CustOption = () => {
//     const dropSelect = determineDropSelect();

//     const filteredOptions = property
//       .filter((data) => data.property_type === dropSelect)
//       .map((data) => (
//         <option key={data.property_value} value={data.property_value}>
//           {data.property_value}
//         </option>
//       ));

//     return [
//       <option key={null} value={null}>
//         Select
//       </option>,
//       ...filteredOptions,
//     ];
//   };

//   const determineDropSelect = () => {
//     // Choose the correct dropSelect state based on the current location
//     if (location === "/supplier-outstandings") {
//       return dropSelectSupplier;
//     } else if (location === "/staff-outstandings") {
//       return dropSelectStaff;
//     } else {
//       return dropSelectCompany;
//     }
//   };

//   return (
//     <div>
//       <label
//         className="row bg-dark text-light mx-0 p-3 rounded-top-2"
//         style={{ position: "sticky", top: 0 }}
//       >
//         Filter Accounts
//       </label>
//       <div
//         style={{ height: "24rem", overflow: "hidden", overflowY: "scroll" }}
//         className="rounded-bottom-2 border m-3"
//       >
//         <table className="w-100 mx-0">
//           <thead style={{ position: "sticky", top: 0 }}>
//             <tr className="text-light bg-secondary ">
//               <th>Parameters</th>
//               <th>Filter By</th>
//               <th>
//                 <button className="btn btn-sm btn-dark" onClick={handleAdd}>
//                   ADD
//                 </button>
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {arrayProperty.length > 0 &&
//               arrayProperty.map((data, i) => {
//                 return location === "/customer-outstandings" ? (
//                   <tr className="text-dark bg-light ">
//                     <td>
//                       <select
//                         value={dropSelectCompany}
//                         className="btn btn-md rounded-2 border border-dark"
//                         onChange={(e) => setDropSelectCompany(e.target.value)}
//                       >
//                         {/* ... Options for Company */}
//                       </select>
//                     </td>
//                     <td>
//                       <select
//                         value={filterBySelectCompany}
//                         className="btn btn-md rounded-2 border border-dark bg-secondary text-light"
//                         onChange={(e) =>
//                           setFilterBySelectCompany(e.target.value)
//                         }
//                       >
//                         <CustOption />
//                       </select>
//                     </td>
//                     <td>
//                       <img src={minus} alt="" onClick={() => removeRow(i)} />
//                     </td>
//                   </tr>
//                 ) : location === "/supplier-outstandings" ? (
//                   <tr className="text-dark bg-light ">
//                     <td>
//                       <span value="company">Company</span>
//                     </td>
//                     <td>
//                       <select
//                         value={filterBySelectSupplier}
//                         className="btn btn-md rounded-2 border border-dark bg-secondary text-light"
//                         onChange={(e) =>
//                           setFilterBySelectSupplier(e.target.value)
//                         }
//                       >
//                         <CustOption />
//                       </select>
//                     </td>
//                     <td>
//                       <img src={minus} alt="" onClick={() => removeRow(i)} />
//                     </td>
//                   </tr>
//                 ) : (
//                   <tr className="text-dark bg-light ">
//                     <td>
//                       <span value="designation">Designation</span>
//                     </td>
//                     <td>
//                       <select
//                         value={filterBySelectStaff}
//                         className="btn btn-md rounded-2 border border-dark bg-secondary text-light"
//                         onChange={(e) => setFilterBySelectStaff(e.target.value)}
//                       >
//                         <CustOption />
//                       </select>
//                     </td>
//                     <td>
//                       <img src={minus} alt="" onClick={() => removeRow(i)} />
//                     </td>
//                   </tr>
//                 );
//               })}
//           </tbody>
//           <tfoot></tfoot>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default FilterAccounts;
