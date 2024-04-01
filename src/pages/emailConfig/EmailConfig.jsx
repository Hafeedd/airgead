import React, { useEffect, useState } from "react";
import "./emailConfig.css";
import { Form } from "react-bootstrap";
import { useAuthServices } from "../../services/controller/authServices";
import Swal from "sweetalert2";

export const EmailConfig = (props) => {
    const [email, setEmail] = useState({
        smtp_email:null,
        smtp_password:null,
        smtp_port:null,
        smtp_host:null,
    })

    const {postEmailConfig,getEmailConfig} = useAuthServices()

    useEffect(()=>{
        getData()
    },[])

    const getData = async () =>{
        try{
            let response = await getEmailConfig()
            if(response.success){
                setEmail({...response.data})
            }
        }catch(err){}
    }

    const handleChange = (e) =>{
        var name = e.target.name
        var value = e.target.value || null
        console.log(value)
        setEmail(data=>({...data,[name]:value}))
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            let resp = await postEmailConfig(email)
            if(resp.success){
                Swal.fire('','','success')
            }
        }catch(err){
            let message = err?.response?.message || "Something went wrong"
            if(err?.response?.errors?.length>0){
                message = Object.values(err?.response?.errors[0])[0]
            }
            Swal.fire(message,'','error')
        }
    }

  return (
    <form onSubmit={handleSubmit} className="id-code-config email-config pt-4">
      <div className="px-4">
        Email Configuration
        <div className="row email-conf-cont mx-0 mt-3">
          <Form.Group className="code-conf-input-cont col-5 col-6 row mx-0 align-items-center">
            <Form.Label>SMTP Email</Form.Label>
            <div className="col-9">
              <Form.Control
                type="email"
                name="smtp_email"
                value={email.smtp_email}            
                onChange={handleChange}
                placeholder="eg : abcd@mail.in"
                //   value={codeId.next_code || ""}
                className="purchase-select text-lowercase code-conf d-flex align-items-center py-0 form-control"
              />
            </div>
          </Form.Group>
          <Form.Group className="code-conf-input-cont col-5 col-6 row mx-0 align-items-center">
            <Form.Label>SMTP Password</Form.Label>
            <div className="col-9">
              <Form.Control
                name="smtp_password"
                value={email.smtp_password}
                onChange={handleChange}
                type="password"
                placeholder="*********"
                //   value={codeId.next_code || ""}
                className="purchase-select text-lowercase code-conf d-flex align-items-center py-0 form-control"
              />
            </div>
          </Form.Group>
          <Form.Group className="code-conf-input-cont col-5 col-6 row mx-0 align-items-center mt-3">
            <Form.Label>SMTP HOST</Form.Label>
            <div className="col-9">
              <Form.Control
                name="smtp_host"
                value={email.smtp_host}
                onChange={handleChange}
                placeholder="eg : smtp.abcd.com"
                //   value={codeId.next_code || ""}
                className="purchase-select text-lowercase code-conf d-flex align-items-center py-0 form-control"
              />
            </div>
          </Form.Group>
          <Form.Group className="code-conf-input-cont col-5 col-6 row mx-0 align-items-center mt-3">
            <Form.Label>SMPT PORT</Form.Label>
            <div className="col-9">
              <Form.Control
                name='smtp_port'
                value={email.smtp_port}
                onChange={handleChange}
                placeholder="eg : 587"
                //   value={codeId.next_code || ""}
                className="purchase-select text-lowercase code-conf d-flex align-items-center py-0 form-control"
              />
            </div>
          </Form.Group>
        </div>
      </div>
      <div
        style={{ background: "white" }}
        className="row justify-content-end gap-3 py-3 px-5 mx-0"
      >
        <div
          type="clear"
          //   onClick={handleResetAll}
          className="company-add-btn clear btn col-1 col-2"
        >
          {/* {popup ? "Close" : "Clear"} */}
          Clear
        </div>
        <button type="submit" className="company-add-btn next btn col-1 col-2">
          {/* {edit ? "Update" : "Save"} */}
          Submit
        </button>
      </div>
    </form>
  );
};
