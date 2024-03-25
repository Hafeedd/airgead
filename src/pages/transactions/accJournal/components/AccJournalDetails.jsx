import React, { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { AccJournalTable } from "./AccJournalTable";
import useOnKey from "../../../../hooks/onKeyFunct/onKeyFunct";
import useItemServices from "../../../../services/master/itemServices";
import useAccountServices from "../../../../services/master/accountServices";
import Swal from "sweetalert2";
import { MdMovieEdit } from "react-icons/md";
import useAccJournalServices from "../../../../services/transactions/accJournalServices";
import { StockJournalEdit } from "../../stockjurnal/components/StockJournalEdit";

export const AccJournalDetails = () => {
  const [ref, setRef] = useState(null);
  const [tableList, setTableList] = useState([]);
  const [accJnlList, setAccJnlList] = useState([]);
  const [accNameList, setAccNameList] = useState([]);
  const [tableEdit, setTableEdit] = useState(false);
  const [showAccJnl, setShowAccJnl] = useState(false);
  const [edit, setEdit] = useState(false);

  const [accJnlAdd, setAccJnlAdd] = useState({
    voucher_number: null,
    date: null,
    narration: null,
    total_debit: null,
    total_credit: null,
  });

  const [accJnlTable, setAccJnlTable] = useState({
    name: null,
    code: null,
    desc: null,
    debit: null,
    credit: null,
  });

  useEffect(() => {
    if (edit) {
      setAccJnlAdd({
        voucher_number: edit.voucher_number,
        narration: edit.narration,
        date: edit.crerated_at,
      });
      let tempList = [];
      if (edit.daybook.length > 0) {
        for (let data of edit.daybook) {
          let a = "";
          if (data?.amount > 0 ) a = "debit";
          if (data?.amount<0) {
            a = "credit";
          }
          tempList.push({
            name: data.account_name,
            code: data.account_code,
            credit:0,
            debit:0,
            [a]: Math.abs(data.amount),
          });
        }
      }
      setTableList([...tempList]);
    }
  }, [edit]);

  useEffect(() => {
    if (tableList?.length > 0) {
            console.log(tableList)
      let totalDebit = tableList?.reduce((a, b) => {
        return (b.debit && b.debit >= 0) ? +a + +b.debit : a;
      }, 0);

      let totalCredit = tableList?.reduce((a, b) => {
        return (b.credit && b.credit > 0) ? +a + +b.credit : a;
      }, 0);

      setAccJnlAdd((data) => ({
        ...data,
        total_credit: totalCredit,
        total_debit: totalDebit,
      }));
    } else {
      setAccJnlAdd((data) => ({
        ...data,
        total_credit: 0,
        total_debit: 0,
      }));
    }
  }, [tableList]);

  useEffect(() => {
    getData();
  }, []);

  const { postAccJournal, getAccJournal, putAccJournal } =
    useAccJournalServices();
  const { getCode } = useItemServices();
  const { getAccountList } = useAccountServices();
  const { handleKeyDown, formRef } = useOnKey(ref, setRef);

  const getData = async () => {
    try {
      const response = await getCode();
      const response2 = await getAccountList();
      const response3 = await getAccJournal();
      if (response.success && !edit) {
        let code = response.data.filter((x) => x.types === "JOURNAL_CODE");
        setAccJnlAdd((data) => ({
          ...data,
          voucher_number: code[0]?.next_code,
        }));
      }

      if (response2.success) {
        let tempList = [];
        response2.data.map((item) => {
          if (item.code) {
            let a = {
              value: item.code,
              text: item.name,
              description: item.code,
            };
            tempList.push(a);
          }
        });
        setAccNameList(tempList);
      }
      if (response3.success) {
        setAccJnlList(response3.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleResetAccTable = () => {
    setAccJnlTable({
      name: null,
      code: null,
      desc: null,
      debit: null,
      credit: null,
    });
  };

  const handleClearAll = () => {
    setAccJnlAdd({
      voucher_number: null,
      date: null,
      narration: null,
      total_debit: null,
      total_credit: null,
    });
    setEdit(false);
    setTableList([]);
    handleResetAccTable();
    getData();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (accJnlAdd.total_credit != accJnlAdd.total_debit) {
        Swal.fire({
          title: "Warning",
          text: "The debit and credit are not balanced !",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        });
        return 0;
      }
      let tempTableList = [...tableList];
      const indexOfCashInHand = tempTableList.findIndex(
        (x) => x.code == "CASH"
      );
      if (indexOfCashInHand > -1) {
        let tempCahsInHandData = tempTableList[indexOfCashInHand];
        tempTableList.splice(indexOfCashInHand, 1);
        tempTableList.push(tempCahsInHandData);
      }
      let data = {
        ...accJnlAdd,
        accounts: [...tempTableList],
      };
      // console.log(data)
      // return 0
      let response;
      if (!edit) {
        response = await postAccJournal(data);
      } else {
        response = await putAccJournal(edit.id, data);
      }
      if (response.success) {
        Swal.fire("Journal created successfully", "", "success");
        handleClearAll();
      } else {
        Swal.fire(response.message, "", "error");
      }
    } catch (err) {
      console.log(err);
      Swal.fire("Journal creation failed", "", "error");
    }
  };

  const handleChange = (e) => {
    if (e.target.value === "") {
      setAccJnlAdd({ ...accJnlAdd, [e.target.name]: null });
    } else {
      setAccJnlAdd({ ...accJnlAdd, [e.target.name]: e.target.value });
    }
  };

  return (
    <form
      ref={formRef}
      className="stock-jdetails-cont ps-4 p-2 rounded-1 mx-0 w-100 bg-light h-100 row"
    >
      <div className="mx-0 col-6 mt-2 justify-content-center">
        <div style={{ paddingLeft: "14rem" }}>Journal Details</div>
        <Form.Group className="col-9 pe-2 me-4 mx-0 d-flex align-items-start mt-2">
          <Form.Label className="col-3 purchase-input-label pb-1">
            Doc no.
          </Form.Label>
          <Form.Control
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            required
            name="voucher_number"
            value={accJnlAdd.voucher_number || ""}
            className="purchase-input-text me-3"
            placeholder="Document number"
            type="text"
          />
          <div
            onClick={() => setShowAccJnl(true)}
            className="col-1 col-2 p-1 bg-dark rounded-1 btn py-0 text-light "
          >
            <MdMovieEdit size={18} className="mb-1" />
          </div>
        </Form.Group>
        <Form.Group className="col-9 pe-2 me-4 mx-0 d-flex align-items-start mt-2">
          <Form.Label className="col-3 purchase-input-label pb-1">
            Date
          </Form.Label>
          <Form.Control
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            required
            name="date"
            value={accJnlAdd.date || new Date()?.toISOString()?.slice(0, 10)}
            className="purchase-input-text"
            placeholder="Date"
            type="date"
          />
        </Form.Group>
      </div>
      <div className="col-2" />
      <div className="mx-0 col-4 mt-1 mb-3 row d-flex justify-content-end">
        <div
          className="col-12 d-flex justify-content-end"
          style={{ paddingRight: "10rem" }}
        >
          Printing Details
        </div>
        <Form.Group className="col-12 pe-2 me-4 ps-0 mx-0 d-flex align-items-start mt-1">
          <Form.Label className="col-3 purchase-input-label pb-1">
            Style
          </Form.Label>
          <Form.Control
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            required
            // name="code"
            // value={accJnlAdd.code||''}
            className="purchase-input-text"
            type="text"
          />
        </Form.Group>
        <Form.Group className="col-12 pe-2 me-4 ps-0 mx-0 d-flex align-items-start mt-2">
          <Form.Label className="col-3 purchase-input-label pb-1">
            Printer
          </Form.Label>
          <Form.Control
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            required
            // name="code"
            // value={accJnlAdd.code||''}
            className="purchase-input-text"
            type="text"
          />
        </Form.Group>

        <div className="row col-10 mx-0 px-0 justify-content-star">
          <Form.Group className="col-5 pe-0 me-0 ps-0 mx-0 d-flex align-items-center mt-2">
            <input
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              required
              // name="code"
              // value={accJnlAdd.code||''}
              className="purchase-input-text"
              type="checkbox"
            />
            <Form.Label className="col-8 col purchase-input-label ps-2">
              Show preview
            </Form.Label>
          </Form.Group>
          <Form.Group className="col-2 ps-0 mx-0 d-flex align-items-center mt-1">
            <input
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              required
              // name="code"
              // value={accJnlAdd.code||''}
              className="purchase-input-text"
              type="checkbox"
            />
            <Form.Label className="col-2 purchase-input-label ps-2">
              Print
            </Form.Label>
          </Form.Group>
        </div>
      </div>

      <AccJournalTable
        {...{
          edit,
          setEdit,
          accJnlList,
          handleKeyDown,
          accJnlTable,
          setAccJnlTable,
          accNameList,
          tableList,
          setTableList,
          handleClearAll,
          accJnlAdd,
          handleResetAccTable,
          tableEdit,
          setTableEdit,
        }}
      />

      <div className="row mx-0 acc-journal-footer">
        <Form.Group className="col-4 pe-2 me-4 ps-0 mx-0 d-flex align-items-start mt-1">
          <Form.Label className="col-3 purchase-input-label pb-1">
            Remark
          </Form.Label>
          <textarea
            rows={4}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            required
            name="narration"
            value={accJnlAdd.narration || ""}
            className="purchase-input-text w-100 select-field"
            type=""
          />
        </Form.Group>
        <span className="col-3 col-4" />
        <div className="text-end col-4 d-flex align-items-end mx-0 justify-content-end">
          <div
            onClick={handleClearAll}
            className="btn col-4 py-1 border-dark me-2"
          >
            Clear
          </div>
          <div onClick={handleSubmit} className="btn col-4 py-1 btn-dark">
            {edit ? "Update" : "Save"}
          </div>
        </div>
      </div>
      <Modal
        show={showAccJnl}
        centered
        size="lg"
        onHide={() => setShowAccJnl(false)}
      >
        <Modal.Body className="p-0 rounded-3">
          <StockJournalEdit
            list={accJnlList}
            from={"acc"}
            title={"Account Journal List"}
            setShow={setShowAccJnl}
            {...{
              edit,
              setEdit,
              getData,
              handleClearAll,
            }}
          />
        </Modal.Body>
      </Modal>
    </form>
  );
};
