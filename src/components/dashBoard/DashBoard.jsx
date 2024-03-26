import "./dashboard.css";
import sale from "../../assets/images/grid1.svg";
import sale1 from "../../assets/images/grid2.svg";
import sale2 from "../../assets/images/grid3.svg";
import sale3 from "../../assets/images/grid4.svg";
import reciept from "../../assets/images/reciept.svg";
import payment from "../../assets/images/payment.svg";
import purchase from "../../assets/images/purchase.svg";
import sales from "../../assets/images/sales.svg";
import LineGraph from './LineGraph'
import { useBaseServices } from "../../services/base/baseServices";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const DashBoard = () => {
   const [params, setParams] = useState()
   const [dataObject, setDataObject] = useState()
   const [totalChequePayment, setTotalChequePayment] = useState()
   const [chequeType, setChequeType] = useState("true")

   const { getDashBoard } = useBaseServices()
   const navigate = useNavigate()
   var total_pdc_amt = 0
   console.log(params, "params")
   const getData = async () => {
      try {
         const response = await getDashBoard(params)
         if (response.success) {
            setDataObject(response.data)
         }
      }
      catch (err) { }
   }

   const handleChange = (data) => {
      if (data.target.name == "filter") {
         setParams(data.target.value)
      }
      if(data.target.name == 'cheque'){
         setChequeType(data.target.value)
      }


   };

   useEffect(() => {
      getData()
   }, [params])
 

   useEffect(()=>{
      console.log(chequeType)
      if (dataObject?.upcoming_pdc) {
         console.log(dataObject?.upcoming_pdc)
         const totalPay = dataObject?.upcoming_pdc.reduce((a, b) =>(b.type == chequeType|| chequeType === 'true') ?   a + b.amount:a, 0)
         console.log(totalPay)
         setTotalChequePayment(totalPay)
      }
   },[dataObject,total_pdc_amt,chequeType])

  

   return (
      <>

         <div className="dashboard p-3">
            {/* top */}
            <div className="row p-0 mb-1 mb-3">
               <div className="text-end   row justify-content-end">
                  <button onClick={()=>navigate("/receipt-transaction")} className="btn col-2 dash-reciept-color me-2 d-flex align-items-center gap-2 justify-content-center py-2 m-0 ">
                     <img src={reciept} alt="" /> Reciept
                  </button>
                  <button onClick={()=> navigate("/payment-transaction")} className="btn col-2 dash-payment-color me-2 d-flex align-items-center gap-2 justify-content-center p-0 m-0">
                     <img src={payment} alt="" /> Payment
                  </button>
                  <button onClick={()=> navigate("/purchase-transaction")} className="btn col-2 dash-purchase-color me-2 srounded d-flex align-items-center gap-2 justify-content-center p-0 m-0">
                     <img src={purchase} alt="" /> Purchase Invoice
                  </button>
                  <button onClick={()=>navigate("/sales-transaction")} className="btn py-1 col-2 dash-sales-color me-2 d-flex align-items-center gap-2 justify-content-center p-0 m-0">
                     <img src={sales} alt="" /> Sales Invoice
                  </button>
               </div>
            </div>
            {/* center */}
            <div className="row dashboard-center mx-2 p-2 gap-2 rounded-4 mb-3">
               <div className="col-4 dashboard-center-left p-0 mx-2 rounded-4">
                  <div>
                     <div className="d-flex justify-content-between gap-3 mx-0">
                        <p className="px-0 text-light mb-0 fs-5">Overview</p>

                        <select onChange={handleChange} className="px-2 bg-white rounded" name="filter" id="">
                           <option value="TODAY">Today</option>
                           <option value="WEEK">Week</option>
                           <option value="MONTH">Month</option>
                           <option value="YEAR">Year</option>
                        </select>
                        {/* <Dropdown className="px-0">
                           <Dropdown.Toggle
                              className="w-100 d-flex align-items-center gap-5 px-4 h-100 bg-white text-dark"
                              variant="success"
                              id="dropdown-basic"
                           >
                              Today
                           </Dropdown.Toggle>

                           <Dropdown.Menu>
                              <Dropdown.Item href="#/action-1" className="px-1 ">
                                 <p className="left-drop py-2 px-1 rounded-2 w-100">
                                    Today
                                 </p>
                              </Dropdown.Item>
                              <Dropdown.Item href="#/action-2" className="px-1">
                                 <p className="left-drop py-2 px-1 rounded-2 w-100">
                                    This Week
                                 </p>
                              </Dropdown.Item>
                              <Dropdown.Item href="#/action-3" className="px-1">
                                 <p className="left-drop py-2 px-1 rounded-2 w-100">
                                    This Month
                                 </p>
                              </Dropdown.Item>
                              <Dropdown.Item href="#/action-3" className="px-1">
                                 <p className="left-drop py-2 px-1 rounded-2 w-100">
                                    Last Year
                                 </p>
                              </Dropdown.Item>
                           </Dropdown.Menu>
                        </Dropdown> */}
                     </div>
                     <div className="row mx-0 mt-2">
                        <div className="dashboard-grid-radius1 align-items-start row mx-0 col-6 flex-row d-flex ">
                           <img
                              height={"70px"}
                              className="col-6 p-0 mt-3 me-4"
                              src={sale}
                              alt=""
                           />
                           <div className="px-2 py-1 col-4">
                              <div className="bg-white rounded-2 align-items-center mt-3">
                                 <div className="grid-small-text my-0 p-0">S.Return</div>
                                 <div className="grid-small-text2 p-0">₹{dataObject?.total_sales_return.toFixed(2)}</div>
                              </div>
                           </div>
                           <div className="col-12 mb-3">
                              <div className="text-light">Total Sale</div>
                              <h2 className="fs-4 fw-600 text-light py-0 my-0">₹{dataObject?.total_sales.toFixed(2)}</h2>
                           </div>
                        </div>
                        <div className="dashboard-grid-radius2 align-items-start row mx-0 col-6 flex-row d-flex ">
                           <img
                              height={"70px"}
                              className="col-6 p-0 mt-3 me-4"
                              src={sale1}
                              alt=""
                           />
                           <div className="px-2 py-1 col-4">
                              <div className="bg-white rounded-2 align-items-center mt-3">
                                 <div className="grid-small-text my-0 p-0">P.Return</div>
                                 <div className="grid-small-text2 p-0">₹{dataObject?.total_purchase_return.toFixed(2)}</div>
                              </div>
                           </div>
                           <div className="col-12 mb-3">
                              <div className="text-light">Total Purchase</div>
                              <h2 className="fs-4 fw-600 text-light py-0 my-0">₹{dataObject?.total_purchase.toFixed(2)}</h2>
                           </div>
                        </div>
                        <div className="dashboard-grid-radius3 align-items-start row mx-0 col-6 flex-row d-flex ">
                           <img
                              height={"70px"}
                              className="col-6 p-0 mt-3 me-4"
                              src={sale2}
                              alt=""
                           />

                           <div className="col-12 mb-3">
                              <div className="text-light">Total Profit</div>
                              <h2 className="fs-4 fw-600 text-light py-0 my-0">₹{dataObject?.total_profit.toFixed(2)}</h2>
                           </div>
                        </div>
                        <div className="dashboard-grid-radius4 align-items-start row mx-0 col-6 flex-row d-flex ">
                           <img
                              height={"70px"}
                              className="col-6 p-0 mt-3 me-4"
                              src={sale3}
                              alt=""
                           />

                           <div className="col-12 mb-3">
                              <div className="text-light">Total Payment</div>
                              <h2 className="fs-4 fw-600 text-light py-0 my-0">₹{dataObject?.total_expanse.toFixed(2)}</h2>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="col  dashboard-center-right  rounded-4">
                  <span className="text-white ms-5" style={{ position: "absolute", fontWeight: "bold" }}>Day Report</span>

                  <LineGraph {...{ dataObject }} />

               </div>
            </div>
            {/* bottom */}
            <div className="dashboard-bottom row d-flex justify-content-between mx-0 w-100">
               <div className="col-4 px-0">
                  <div style={{ boxShadow: "0px 0px 3px rgba(31, 82, 175, 1)" }} className="bg-white m-2 rounded-2 p-2 box">
                     <p style={{ fontSize: "16px", fontWeight: "bold" }} className="col-12 px-4  ">Need To Collect</p>

                     <div className="w-100 px-2 mt-2">
                        <div style={{ background: "rgb(203, 209, 219)" }} className="div-scroll  flex-column px-2 py-2 gap-2 rounded-2">

                           <table className="table">
                              <thead>
                                 <tr className="dash-table-head">
                                    <th>Customer Name</th>
                                    <th>Due Date</th>
                                    <th>Amount</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 {
                                    dataObject?.pending_collection_amount?.length > 0 ?
                                       dataObject?.pending_collection_amount.map((data) => {

                                          return (
                                             <>
                                                <tr className="dash-table-data">
                                                   <td className="rounded-start">{data?.customer_name}</td>
                                                   <td>{data?.due_date}</td>
                                                   <td className="rounded-end">₹{data?.amount.toFixed(2)}</td>
                                                </tr>
                                             </>
                                          )
                                       }) : console.log("error")
                                 }
                              </tbody>
                           </table>
                        </div>
                     </div>
                  </div>
               </div>
               <div className=" col-4 px-0 mx-0">
                  <div style={{ boxShadow: "0px 0px 4px rgba(31, 82, 175, 1)" }} className="bg-white m-2 rounded-2 p-2 ">
                     <p style={{ fontSize: "16px", fontWeight: "bold" }} className="col-12 px-4 ">Need To Pay</p>
                     {/* <div className="m-0 p-0 d-flex w-100 justify-content-center pe-5">

                        
                     </div> */}
                     <div className="w-100 px-2 mt-2">
                        <div style={{ background: "rgb(203, 209, 219)" }} className="div-scroll  flex-column px-2 py-2 gap-2 rounded-2">
                           <table className="table">
                              <thead>
                                 <tr className="dash-table-head">
                                    <th>Supplier Name</th>
                                    <th>Due Date</th>
                                    <th>Amount</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 {
                                    dataObject?.pending_paying_amount?.length > 0 ?
                                       dataObject?.pending_paying_amount.map((data) => {

                                          return (
                                             <>
                                                <tr className="dash-table-data">
                                                   <td className="rounded-start">{data?.supplier_name}</td>
                                                   <td>{data?.due_date}</td>
                                                   <td className="rounded-end">₹{data?.amount.toFixed(2)}</td>
                                                </tr>
                                             </>
                                          )
                                       }) : console.log("error")
                                 }
                              </tbody>
                           </table>

                        </div>
                     </div>
                  </div>
               </div>
               <div className=" col-4 px-0 mx-0">
                  <div style={{ boxShadow: "0px 0px 3px rgba(31, 82, 175, 1)" }} className="m-2 rounded-2 bg-white div-scroll-cheque">
                     <div className="d-flex pdc-heading justify-content-between bg-white m-0 p-2">
                        <p style={{ fontSize: "16px", fontWeight: "bold" }} className="me-5 px-4">Upcoming PDC</p>
                        <div>
                           <select onChange={handleChange} className=" p-1 mt-1" name="cheque" id="" value={chequeType}>
                              <option value={'true'}>All</option>
                              <option value="RECEIPT">Receipt</option>
                              <option value="PAYMENT">Payment</option>
                           </select>
                        </div>
                     </div>


                     <div className="d-flex align-items-center justify-content-center flex-column px- py- gap-2 rounded-2 px-3 ">
                        {  
                           
                           dataObject?.upcoming_pdc?.length > 0 ?
                              dataObject?.upcoming_pdc.map((data, i) => {
                                 total_pdc_amt += data?.amount||0
                                 return(data?.type == chequeType || chequeType === 'true') && (
                                    <>

                                       <div className="dashboard-bottom-box3 w-100 rounded-2 py-2  d-flex justify-content-between align-items-center">

                                          <div className="div m-0 p-0 d-flex gap-3 ">
                                             <div className="bg-white rounded-circle px-3 ms-1 my-1 py-0">
                                                <p className="mt-2">{i + 1}</p>
                                             </div>
                                             
                                             <div className="d-flex flex-column align-items-start gap-1">
                                                <h6 className="py-0 my-0">{data?.name}</h6>
                                                <small className="py-0 my-0 mx-0">{data?.bank}</small>
                                             </div>
                                          </div>
                                          <small>{data?.type}</small>
                                          
                                          <div>
                                             <h6 className="py-0 my-0 pe-4">₹{data?.amount?.toFixed(2) || "0.00"}</h6>
                                             <small>{data?.date}</small>
                                          </div>

                                       </div>

                                    </>
                                 )
                              }) : console.log("error")
                        }

                        <div className="dashboard-bottom-box3-bottom w-100 rounded-2 py-2 d-flex align-items-end justify-content-end px-4">
                           <h4 className="text-white">₹{totalChequePayment && totalChequePayment?.toFixed(2)|| "0.00"}</h4>
                        </div>

                     </div>

                  </div>
               </div>
            </div>
         </div>
      </>
   );
};
