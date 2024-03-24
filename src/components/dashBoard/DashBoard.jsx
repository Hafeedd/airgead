import "./dashboard.css";
import { IoMdAdd } from "react-icons/io";
import Dropdown from "react-bootstrap/Dropdown";
import sale from "../../assets/images/grid1.svg";
import sale1 from "../../assets/images/grid2.svg";
import sale2 from "../../assets/images/grid3.svg";
import sale3 from "../../assets/images/grid4.svg";
import reciept from "../../assets/images/reciept.svg";
import payment from "../../assets/images/payment.svg";
import purchase from "../../assets/images/purchase.svg";
import sales from "../../assets/images/sales.svg";
import { LineAxisSharp } from "@mui/icons-material";
import LineGraph from './LineGraph'
import { useBaseServices } from "../../services/base/baseServices";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

export const DashBoard = () => {
   const [params, setParams] = useState()
   const [dataObject, setDataObject] = useState()
   const [totalChequePayment, setTotalChequePayment] = useState()

   const { getDashBoard } = useBaseServices()



   const getData = async () => {
      try {
         const response = await getDashBoard(params)
         if (response.success) {
            setDataObject(response.data)
         }
      }
      catch (err) { }
   }
   // const totalAsset = newValue.account_details.reduce((a, b) => b.acc_group === "ASSET" ? a + b.closing_balance : a, 0) + (value > 0 ? value : 0.0)

   useEffect(() => {
      if (dataObject?.upcoming_pdc) {
         const totalPay = dataObject?.upcoming_pdc.reduce((a, b) => a + b.amount, 0)
         console.log("totalPay")
         setTotalChequePayment(totalPay)
      }
      getData()
   }, [])

   console.log(dataObject?.total_sales)

   return (
      <>

         <div className="dashboard p-3">
            {/* top */}
            <div className="row p-0 mb-2">
               <div className="text-end   row justify-content-end">
                  <Button className="btn col-2 dash-reciept-color me-2 d-flex align-items-center gap-2 justify-content-center p-0 m-0 ">
                     <img src={reciept} alt="" /> Reciept
                  </Button>
                  <Button className="btn col-2 dash-payment-color me-2 d-flex align-items-center gap-2 justify-content-center p-0 m-0">
                     <img src={payment} alt="" /> Payment
                  </Button>
                  <Button className="btn col-2 dash-purchase-color me-2 srounded d-flex align-items-center gap-2 justify-content-center p-0 m-0">
                     <img src={purchase} alt="" /> Purchase Invoice
                  </Button>
                  <Button className="btn py-1 col-2 dash-sales-color me-2 d-flex align-items-center gap-2 justify-content-center p-0 m-0">
                     <img src={sales} alt="" /> Sales Invoice
                  </Button>
               </div>
            </div>
            {/* center */}
            <div className="row dashboard-center p-2 gap-2 rounded-4 mb-3">
               <div className="col-4 dashboard-center-left p-0 m-0 rounded-4">
                  <div>
                     <div className="d-flex justify-content-between gap-3 mx-0">
                        <p className="px-0 text-light mb-0 fs-5">Overview</p>
                        <Dropdown className="px-0">
                           <Dropdown.Toggle
                              className="w-100 d-flex align-items-center gap-5 px-4 h-100 bg-white text-dark"
                              variant="success"
                              id="dropdown-basic"
                           >
                              Today
                           </Dropdown.Toggle>

                           <Dropdown.Menu>
                              <Dropdown.Item href="#/action-1" className="px-1">
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
                        </Dropdown>
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
                  <div style={{ backgroundColor: "#9d6cb1" }} className="m-2 rounded-2 p-2">
                     <h3 className="col-12 px-4">Need To Collect</h3>

                     <div className="w-100 px-4 mt-2">

                        <div className="div-scroll w-100 d-flex flex-column px-2 py-2 gap-2 rounded-2">
                           <div className="bg-dark text-white w-100  py-1 px-3 d-flex align-items-center justify-content-between py-0 my-0">
                              <h6 className="py-0 my-0"> Customer Name</h6>
                              <h6 className="me-1 pt-2"> Due Date</h6>
                              <h6 className="me-2 mt-2">Amount</h6>
                           </div>
                           {
                              dataObject?.pending_collection_amount?.length > 0 ?
                                 dataObject?.pending_collection_amount.map((data) => {
                                    console.log("hello")
                                    return (
                                       <>
                                          <div className="bg-white w-100 rounded-2 py-1 px-3 d-flex align-items-center justify-content-between py-0 my-0">
                                             <p className="py-0 my-0">{data?.customer_name}</p>
                                             <h6 className="pt-2">{data?.due_date}</h6>
                                             <h4 className="py-0 my-0 pe-4">₹{data?.amount.toFixed(2)}</h4>
                                          </div>
                                       </>
                                    )
                                 }) : console.log("error")
                           }


                        </div>
                     </div>
                  </div>
               </div>
               <div className=" col-4 px-0 mx-0">
                  <div style={{ backgroundColor: "#4286a9" }} className="m-2 rounded-2 p-2 ">
                     <h3 className="col-12 px-4 ">Need To Pay</h3>
                     {/* <div className="m-0 p-0 d-flex w-100 justify-content-center pe-5">

                        
                     </div> */}
                     <div className="w-100 px-4 mt-2">
                        <div className="div-scroll  flex-column px-2 py-2 gap-2 rounded-2">
                           <div className="bg-dark text-white w-100  py-1 px-3 d-flex align-items-center justify-content-between mb-2">
                              <h6 className="py-0 my-0"> Supplier Name</h6>
                              <h6 className="me-1 pt-2"> Due Date</h6>
                              <h6 className="me-4 mt-2">Amount</h6>
                           </div>
                           {
                              dataObject?.pending_paying_amount?.length > 0 ?
                                 dataObject?.pending_paying_amount.map((data) => {

                                    return (
                                       <>
                                          <div className="bg-white w-100 rounded-2 py-1 px-3 d-flex align-items-center justify-content-between py-0 my-0">
                                             <p className="py-0 my-0">{data?.supplier_name}</p>
                                             <h6 className="pt-2">{data?.due_date}</h6>
                                             <h4 className="py-0 my-0 pe-4">₹{data?.amount.toFixed(2)}</h4>
                                          </div>
                                       </>
                                    )
                                 }) : console.log("error")
                           }

                        </div>
                     </div>
                  </div>
               </div>
               <div className=" col-4 px-0 mx-0">
                  <div style={{ backgroundColor: "#7f7bb6" }} className="m-2 rounded-2 p-2">
                     <div className="d-flex justify-content-between">
                        <h3 className="me-5 px-4">Upcoming PDC</h3>
                        <div>
                           <select className=" p-1 mt-1" name="" id="">
                              <option value="all">All</option>
                              <option value="res">Receipt</option>
                              <option value="pay">Payment</option>
                           </select>
                        </div>
                     </div>

                     <div className="w-100 d-flex align-items-center justify-content-center flex-column px-2 py-1 gap-2 rounded-2 px-4">

                        {
                           dataObject?.upcoming_pdc?.length > 0 ?
                              dataObject?.upcoming_pdc.map((data, i) => {

                                 return (
                                    <>

                                       <div className="dashboard-bottom-box3 w-100 rounded-2 py-2 px-3 d-flex justify-content-between align-items-center">

                                          <div className="div m-0 p-0 d-flex gap-3 ">
                                             <div className="bg-white rounded-circle px-2 py-1 text-center">
                                                {i + 1} <br /><small>{data?.type}</small>
                                             </div>
                                             <div className="d-flex flex-column align-items-start gap-1">
                                                <h4 className="py-0 my-0">{data?.name}</h4>
                                                <small className="py-0 my-0 mx-0">{data?.bank}</small>
                                             </div>
                                          </div>
                                          <div>
                                             <h4 className="py-0 my-0 pe-4">₹{data?.amount?.toFixed(2) || "0.00"}</h4>
                                             <small>{data?.date}</small>
                                          </div>

                                       </div>

                                    </>
                                 )
                              }) : console.log("error")
                        }

                        <div className="dashboard-bottom-box3-bottom w-100 rounded-2 py-2 d-flex align-items-end justify-content-end px-4">
                           <h4 className="text-white">₹{totalChequePayment?.toFixed(2) || "0.00"}</h4>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};
