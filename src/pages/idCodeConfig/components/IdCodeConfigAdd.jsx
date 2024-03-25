import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import { Dropdown } from 'semantic-ui-react';
import useBaseServices from "../../../services/master/baseServices";
import Swal from "sweetalert2";

const initCodeId = {
    next_value: null,
    sub_id: null,
    types: null,
    postfix: false,
    prefix: true,
    next_code: null,
};

export const IdCodeConfigAdd = (props) => {
    const {edit,setEdit,popup,setShow} = props
    const [idList, setIdList] = useState([]);
    const [codeId, setCodeId] = useState(initCodeId);

    const { getCodeIdList, postCode, updateCode } = useBaseServices();

    useEffect(() => {
        getData();
    }, []);

    useEffect(()=>{
        setCodeId({
            ...edit,
            postfix: edit?.next_code?.match(/^[a-zA-Z]+/) ? false : true,
            prefix: edit?.next_code?.match(/^[a-zA-Z]+/) ? true : false,
        })
    },[edit])

    const getData = async () => {
        try {
            let resp = await getCodeIdList();
            if (resp?.success) {
                setIdList(() => resp.data.map((data) => ({ value: data, text: data })));
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleToUpperCase = (data) => {
        let keysOfData,
            tempData = { ...data };
        if (typeof data == "object") keysOfData = Object.keys(data);
        if (!keysOfData?.length > 0) return 0;
        keysOfData.map((item) => {
            if (typeof data[item] == "string" && item != "method") {
                let itemTemp = data[item]?.toUpperCase();
                tempData = { ...tempData, [item]: itemTemp };
            }
        });
        return tempData;
    };

    const handleChange = (e, data) => {
        var name = e.target.name;
        var value = e.target.value || null;
        let tempCodeId = { ...codeId };
        if (data) {
            name = data.name;
            value = data.value;
        }
        if (name?.match(/postfix|prefix/g)) {
            tempCodeId = {
                ...tempCodeId,
                postfix: !codeId.postfix,
                prefix: !codeId.prefix,
            };
        } else tempCodeId = { ...tempCodeId, [name]: value };

        if (tempCodeId.postfix) {
            tempCodeId = {
                ...tempCodeId,
                next_code: `${tempCodeId.next_value || ""}${tempCodeId.sub_id || ""}`,
            };
        } else
            tempCodeId = {
                ...tempCodeId,
                next_code: `${tempCodeId.sub_id || ""}${tempCodeId.next_value || ""}`,
            };

        setCodeId({ ...tempCodeId });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!codeId.types) {
                Swal.fire('Please select type', '', 'warning')
            }
            let tempData = handleToUpperCase(codeId)
            let resp
            if (edit) {
                resp = await updateCode(edit.id, tempData)
            } else
                resp = await postCode(tempData);
            if (resp.success) {
                Swal.fire("", "", "success");
                setCodeId(initCodeId);
                if(!popup)
                setEdit(false)
                getData();
            }
        } catch (err) { }
    };

    const handleResetAll = () => {
        setCodeId(initCodeId)
        if(!popup)
        setEdit(false)
        else setShow(false)
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="p-3">
                <h5>Add Code Configuration</h5>
                <div className="row mx-0 mt-3">
                    <div className="col-5 ps-4">
                        <Form.Group className="code-conf-input-cont row mx-0">
                            <Form.Label>Select Type</Form.Label>
                            <div className="col-10">
                                <Dropdown
                                    clearable
                                    selection
                                    search
                                    // onKeyDown={handleKeyDown}
                                    onChange={handleChange}
                                    className="purchase-select code-conf d-flex align-items-center py-0 form-control"
                                    name="types"
                                    placeholder="select"
                                    value={codeId.types || ""}
                                    options={idList}
                                />
                            </div>
                        </Form.Group>
                        <Form.Group className="code-conf-input-cont row mx-0">
                            <Form.Label>Prefix/PostFix</Form.Label>
                            <div className="col-10 px-0 d-flex gap-4 ps-2">
                                <label
                                    htmlFor="prefix-checkbox"
                                    className="code-conf-checkbox-cont"
                                >
                                    <input
                                        checked={codeId.prefix}
                                        name="prefix"
                                        onChange={handleChange}
                                        id="prefix-checkbox"
                                        type="checkbox"
                                        className="permission-checkbox"
                                    />
                                    Prefix
                                </label>
                                <label
                                    htmlFor="postfix-checkbox"
                                    className="code-conf-checkbox-cont"
                                >
                                    <input
                                        checked={codeId.postfix}
                                        name="postfix"
                                        onChange={handleChange}
                                        id="postfix-checkbox"
                                        type="checkbox"
                                        className="permission-checkbox"
                                    />
                                    Postfix
                                </label>
                            </div>
                        </Form.Group>
                        <Form.Group className="code-conf-input-cont row mx-0 align-items-center">
                            <Form.Label className={`col-2 m-0 ${popup && 'col-4'}`}>FULL ID</Form.Label>
                            <div className="col-9">
                                <Form.Control
                                    disabled
                                    value={codeId.next_code || ""}
                                    className="purchase-select code-conf d-flex align-items-center py-0 form-control"
                                />
                            </div>
                        </Form.Group>
                    </div>
                    <span className="col-1" />
                    <div className="col-5">
                        <Form.Group className="code-conf-input-cont row mx-0 align-items-center">
                            <Form.Label>Suffix</Form.Label>
                            <div className="col-12">
                                <Form.Control
                                    required
                                    onChange={handleChange}
                                    name="sub_id"
                                    value={codeId.sub_id || ''}
                                    placeholder="#DC"
                                    className="purchase-select code-conf d-flex align-items-center py-0 form-control"
                                />
                            </div>
                        </Form.Group>
                        <Form.Group className="code-conf-input-cont row mx-0 align-items-center">
                            <Form.Label>Next Value</Form.Label>
                            <div className="col-12">
                                <Form.Control
                                    required
                                    onChange={handleChange}
                                    type="number"
                                    name="next_value"
                                    value={codeId.next_value || ''}
                                    placeholder="#DC"
                                    className="purchase-select code-conf d-flex align-items-center py-0 form-control"
                                />
                            </div>
                        </Form.Group>
                    </div>
                </div>
            </div>
            <div
                style={{ background: "white" }}
                className="row justify-content-end gap-3 py-3 px-5 mx-0"
            >
                <div
                    type="clear"
                    onClick={handleResetAll}
                    className="company-add-btn clear btn col-1 col-2"
                >
                    {popup?'Close':'Clear'}
                </div>
                <button
                    type="submit"
                    className="company-add-btn next btn col-1 col-2"
                >
                    {edit ? "Update" : 'Save'}
                </button>
            </div>
        </form>
    )
}