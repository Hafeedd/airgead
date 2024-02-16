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

const DashBoard = () => {
  return (
    <>
      <div className="dashboard container p-3">
        {/* top */}
        <div className="row mb-0">
          <div className="text-end row justify-content-end">
            <button className="btn col-1 col-2 btn-dark me-2 d-flex align-items-center gap-2 justify-content-center h-75 shadow-sm">
              <img src={reciept} alt="" /> Reciept
            </button>
            <button className="btn col-1 col-2 btn-dark me-2 d-flex align-items-center gap-2 justify-content-center h-75 shadow-sm">
              <img src={payment} alt="" /> Payment
            </button>
            <button className="btn col-1 py-3 col-2 btn-light me-2 d-flex align-items-center gap-2 justify-content-center h-75 px-2 py-4 shadow-sm">
              <img src={purchase} alt="" /> Purchase Invoice
            </button>
            <button className="btn col-1 py-3 col-2 btn-light me-2 d-flex align-items-center gap-2 justify-content-center h-75 shadow-sm">
              <img src={sales} alt="" /> Sales Invoice
            </button>
          </div>
        </div>
        {/* center */}
        <div className="dashboard-center col-12 p-2 d-flex gap-2 rounded-4 mb-3">
          <div className="dashboard-center-left p-2 rounded-4">
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
                    <div className="grid-small-text2 p-0">5654</div>
                  </div>
                </div>
                <div className="col-12 mb-3">
                  <div className="text-light">Total Sale</div>
                  <h2 className="fs-4 fw-600 text-light py-0 my-0">$26,585</h2>
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
                    <div className="grid-small-text my-0 p-0">S.Return</div>
                    <div className="grid-small-text2 p-0">5654</div>
                  </div>
                </div>
                <div className="col-12 mb-3">
                  <div className="text-light">Total Purchase</div>
                  <h2 className="fs-4 fw-600 text-light py-0 my-0">25.16</h2>
                </div>
              </div>
              <div className="dashboard-grid-radius3 align-items-start row mx-0 col-6 flex-row d-flex ">
                <img
                  height={"70px"}
                  className="col-6 p-0 mt-3 me-4"
                  src={sale2}
                  alt=""
                />
                <div className="px-2 py-1 col-4">
                  <div className="bg-white rounded-2 align-items-center mt-3">
                    <div className="grid-small-text my-0 p-0">S.Return</div>
                    <div className="grid-small-text2 p-0">5654</div>
                  </div>
                </div>
                <div className="col-12 mb-3">
                  <div className="text-light">Total Profit</div>
                  <h2 className="fs-4 fw-600 text-light py-0 my-0">$9,465</h2>
                </div>
              </div>
              <div className="dashboard-grid-radius4 align-items-start row mx-0 col-6 flex-row d-flex ">
                <img
                  height={"70px"}
                  className="col-6 p-0 mt-3 me-4"
                  src={sale3}
                  alt=""
                />
                <div className="px-2 py-1 col-4">
                  <div className="bg-white rounded-2 align-items-center mt-3">
                    <div className="grid-small-text my-0 p-0">S.Return</div>
                    <div className="grid-small-text2 p-0">5654</div>
                  </div>
                </div>
                <div className="col-12 mb-3">
                  <div className="text-light">Total Expenses</div>
                  <h2 className="fs-4 fw-600 text-light py-0 my-0">-650.22</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="dashboard-center-right p-2 rounded-4 w-75">
            Right Content
          </div>
        </div>
        {/* bottom */}
        <div className="dashboard-bottom row d-flex justify-content-between mx-0 w-100">
          <div className=" col-4 px-0">
            <div className="m-2 bg-light rounded-2 p-2">
              <h3 className="col-12 px-4">Need To Collect</h3>
              <div className="m-0 p-0 d-flex w-100 justify-content-center pe-5">
                <div className="d-flex flex-row w-100">
                  <h6 className="col-6 m-0 p-0 text-center"> Customer Name</h6>
                  <h6 className="col-6 m-0 p-0 text-end pe-4">Amount</h6>
                </div>
              </div>
              <div className="w-100 px-4 mt-2">
                <div className="div-scroll w-100 d-flex align-items-center justify-content-center flex-column px-2 py-2 gap-2 rounded-2">
                  <div className="bg-white w-100 rounded-2 py-3 px-3 d-flex align-items-center justify-content-between py-0 my-0 mt-5">
                    <h5 className="py-0 my-0">Demo Name0</h5>
                    <h4 className="py-0 my-0 pe-4">₹2,626</h4>
                  </div>
                  <div className="bg-white w-100 rounded-2 py-3 px-3 d-flex align-items-center justify-content-between py-0 my-0">
                    <h5 className="py-0 my-0">Demo Name1</h5>
                    <h4 className="py-0 my-0 pe-4">₹2,626</h4>
                  </div>
                  <div className="bg-white w-100 rounded-2 py-3 px-3 d-flex align-items-center justify-content-between py-0 my-0">
                    <h5 className="py-0 my-0">Demo Name1</h5>
                    <h4 className="py-0 my-0 pe-4">₹2,627</h4>
                  </div>
                  <div className="bg-white w-100 rounded-2 py-3 px-3 d-flex align-items-center justify-content-between py-0 my-0">
                    <h5 className="py-0 my-0">Demo Name1</h5>
                    <h4 className="py-0 my-0 pe-4">₹2,626</h4>
                  </div>
                  <div className="bg-white w-100 rounded-2 py-3 px-3 d-flex align-items-center justify-content-between py-0 my-0">
                    <h5 className="py-0 my-0">Demo Name1</h5>
                    <h4 className="py-0 my-0 pe-4">₹2,626</h4>
                  </div>
                  <div className="bg-white w-100 rounded-2 py-3 px-3 d-flex align-items-center justify-content-between py-0 my-0">
                    <h5 className="py-0 my-0">Demo Name1</h5>
                    <h4 className="py-0 my-0 pe-4">₹2,626</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" col-4 px-0 mx-0">
            <div className="m-2 bg-light rounded-2 p-2">
              <h3 className="col-12 px-4">Need To Pay</h3>
              <div className="m-0 p-0 d-flex w-100 justify-content-center pe-5">
                <div className="d-flex flex-row w-100">
                  <h6 className="col-6 m-0 p-0 text-center"> Customer Name</h6>
                  <h6 className="col-6 m-0 p-0 text-end pe-4">Amount</h6>
                </div>
              </div>
              <div className="w-100 px-4 mt-2">
                <div className="div-scroll w-100 d-flex align-items-center justify-content-center flex-column px-2 py-2 gap-2 rounded-2">
                  <div className="bg-white w-100 rounded-2 py-3 px-3 d-flex align-items-center justify-content-between py-0 my-0 mt-5">
                    <h5 className="py-0 my-0">Demo Name0</h5>
                    <h4 className="py-0 my-0 pe-4">₹2,626</h4>
                  </div>
                  <div className="bg-white w-100 rounded-2 py-3 px-3 d-flex align-items-center justify-content-between py-0 my-0">
                    <h5 className="py-0 my-0">Demo Name1</h5>
                    <h4 className="py-0 my-0 pe-4">₹2,626</h4>
                  </div>
                  <div className="bg-white w-100 rounded-2 py-3 px-3 d-flex align-items-center justify-content-between py-0 my-0">
                    <h5 className="py-0 my-0">Demo Name1</h5>
                    <h4 className="py-0 my-0 pe-4">₹2,626</h4>
                  </div>
                  <div className="bg-white w-100 rounded-2 py-3 px-3 d-flex align-items-center justify-content-between py-0 my-0">
                    <h5 className="py-0 my-0">Demo Name1</h5>
                    <h4 className="py-0 my-0 pe-4">₹2,626</h4>
                  </div>
                  <div className="bg-white w-100 rounded-2 py-3 px-3 d-flex align-items-center justify-content-between py-0 my-0">
                    <h5 className="py-0 my-0">Demo Name1</h5>
                    <h4 className="py-0 my-0 pe-4">₹2,626</h4>
                  </div>
                  <div className="bg-white w-100 rounded-2 py-3 px-3 d-flex align-items-center justify-content-between py-0 my-0">
                    <h5 className="py-0 my-0">Demo Name1</h5>
                    <h4 className="py-0 my-0 pe-4">₹2,626</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" col-4 px-0 mx-0">
            <div className="m-2 bg-light rounded-2 p-2">
              <h3 className="col-12 px-4">Upcoming PDC</h3>
              <div className="w-100 d-flex align-items-center justify-content-center flex-column px-2 py-1 gap-2 rounded-2 px-4">
                <div className="dashboard-bottom-box3 w-100 rounded-2 py-3 px-3 d-flex justify-content-between align-items-center">
                  <div className="div m-0 p-0 d-flex gap-3 align-items-center">
                    <div className="bg-white rounded-circle px-4 py-3">1</div>
                    <div className="d-flex flex-column align-items-start gap-1">
                      <h4 className="py-0 my-0">Party Name</h4>
                      <h5 className="py-0 my-0 mx-0">HDFC Bank</h5>
                    </div>
                  </div>
                  <h4 className="py-0 my-0 pe-4">₹2,626</h4>
                </div>
                <div className="dashboard-bottom-box3 w-100 rounded-2 py-3 px-3 d-flex justify-content-between align-items-center">
                  <div className="div m-0 p-0 d-flex gap-3 align-items-center">
                    <div className="bg-white rounded-circle px-4 py-3">1</div>
                    <div className="d-flex flex-column align-items-start gap-1">
                      <h4 className="py-0 my-0">Party Name</h4>
                      <h5 className="py-0 my-0 mx-0">HDFC Bank</h5>
                    </div>
                  </div>
                  <h4 className="py-0 my-0 pe-4">₹2,626</h4>
                </div>
                <div className="dashboard-bottom-box3 w-100 rounded-2 py-3 px-3 d-flex justify-content-between align-items-center">
                  <div className="div m-0 p-0 d-flex gap-3 align-items-center">
                    <div className="bg-white rounded-circle px-4 py-3">1</div>
                    <div className="d-flex flex-column align-items-start gap-1">
                      <h4 className="py-0 my-0">Party Name</h4>
                      <h5 className="py-0 my-0 mx-0">HDFC Bank</h5>
                    </div>
                  </div>
                  <h4 className="py-0 my-0 pe-4">₹2,626</h4>
                </div>
                <div className="dashboard-bottom-box3-bottom w-100 rounded-2 py-3 d-flex align-items-end justify-content-end px-4">
                  <h4 className="text-white">₹10,5000</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
