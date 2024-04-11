import { Form } from 'react-bootstrap'
import { Dropdown } from 'semantic-ui-react'
import { useNavigate } from 'react-router'

const ChequeRegisterForm = ({
    edit,
    handleSubmit,
    handleChange,
    chequeRegisterAdd,
    setChequeRegisterAdd,
    accountList,
    bankAccList,
    handleReset,
    getCodeData,
    search,
    permissions,
}) => {

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-6  row border-end border-secondary">
                        <div className=''>

                            <div className='row '>
                                <div className='row col-6'>
                                    <div className="col-1 pt-2">Type</div>
                                    <div className="col-2 ms-4">
                                        <select onChange={handleChange} value={chequeRegisterAdd.type} className='bg-black text-white px-4 mt-2 rounded py-1' name="type">
                                            <option value="PAYMENT">Payment</option>
                                            <option value="RECEIPT">Receipt</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='row col-6  d-flex justify-content-end  '>
                                    <div className="col-1 pt-3  me-4">Date</div>
                                    <div className='cheque-date-date me-4 col-4 rounded pt-2 '>
                                        <input name='date' className='date-cheque-reg py-1 rounded ' type="date" value={chequeRegisterAdd.date} />
                                    </div>
                                </div>
                            </div>

                            <div className='col-12   row mt-2' >
                                <div className='col-3'> Code</div>
                                <div className='col-9 mb-3 '>
                                    <p className='date-cheque-reg-p pt-1 ps-3'>{chequeRegisterAdd.code}</p>
                                </div>
                                <div className='col-3' >A/c Details</div>
                                <div className='col-9' >
                                    <Dropdown
                                        //   disabled={edit}
                                        // clearable
                                        selection
                                        search={search}
                                        onChange={handleChange}
                                        className="cheque-reg-select item d-flex align-items-center py-0 form-control"
                                        name="fk_account"
                                        placeholder="Select Account Details"
                                        value={chequeRegisterAdd.fk_account || ""}
                                        options={accountList}
                                        
                                    />
                                </div>
                            </div>

                            <div className='col-12 row mt-2' >
                                <div className='col-3' >A/c Code</div>
                                <div className='col-9' >
                                    <input name='account_code' onChange={handleChange} type='text' value={chequeRegisterAdd.account_code || ""} className='item_input ' />
                                </div>
                            </div>

                            <div className='col-12 row mt-2' >
                                <div className='col-3' >Narration</div>
                                <div className='col-9' >
                                    <input name='narration' onChange={handleChange} value={chequeRegisterAdd.narration||""} type='text' className='item_input ' />
                                </div>
                            </div>

                            <div className='col-12  row mt-2' >
                                <div className='col-3' >Bank</div>
                                <div className='col-9' >
                                    <Dropdown
                                        //   disabled={edit}
                                        // clearable
                                        selection
                                        search={search}
                                        onChange={handleChange}
                                        className="cheque-reg-select item d-flex align-items-center py-0 form-control"
                                        name="fk_bank"
                                        placeholder="Select Bank Account"
                                        value={chequeRegisterAdd.fk_bank || ""}
                                        options={bankAccList}
                                        
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 row ms-1 ">

                        <div className='cheque-print-btn col-12 mt-2 d-flex justify-content-end ' >
                            <p className='px-5 text-white py-1'>Cheque Print</p>
                        </div>

                        <div className='col-12 m-0 p-0 row d-flex ' >
                            <div className='col-3 p-0' >
                                <p className='check-detail-btn ms-3 mt-4'>Cheque Details</p>
                            </div>
                        </div>
                        <div className='col-12 cheque-input ms-3 row mt-4 p-3 ' >
                            <div className='col-3 mb-3 ' >Cheque No</div>
                            <div className='col-9' >
                                <input name='cheque_no' value={chequeRegisterAdd.cheque_no||""} type='text' onChange={handleChange} className='item_input' />
                            </div>

                            <div className='col-3 pt-2' >Cheque Date</div>
                            <div className='col-9 ' >
                                <Form.Group className=" col-7 pe-4 ps-0 mx-0 d-flex align-items-center mt-1">
                                    <Form.Control
                                        onChange={handleChange}
                                        // required
                                        name="cheque_date"
                                        // value = {chequeRegisterAdd.from_date || (new Date().toISOString(0,10))}
                                        className="bg-black text-white me-2 text-start "
                                        type="date"
                                    />
                                </Form.Group>

                            </div>
                        </div>
                    </div>

                    <div className='row mt-3'>
                        <div className='col-6 row'>
                            <div className="col-3 mt-3">Amount</div>
                            <div className='col-4'>
                                <input
                                    value={chequeRegisterAdd.amount||""}
                                    className='cheque-amt-box p-2 '
                                    name='amount'
                                    placeholder='Enter Amount'
                                    type="number"
                                    min={0}
                                    max={999999999999999}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='col-8 ms-3 mt-3 p-3 border border-2 border-success rounded'>
                                {chequeRegisterAdd.amount_word}
                            </div>
                            <div className="col-2 mt-4 p-2 ">Words</div>
                        </div>

                    </div>

                    <div className='d-flex justify-content-end'>
                        <div className='cheque-exit p-1 px-5 m-0 me-4'>
                            <div onClick={handleReset} className='m-0  px-4 rounded'>Exit</div>
                        </div>
                        <button className='bg-black border border-black text-white px-5   me-4' type='submit' disabled={(permissions.includes(1310))}>
                            <div  className='cheque-save px-4 bg-black text-white'>Save</div>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ChequeRegisterForm
