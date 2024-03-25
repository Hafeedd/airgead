import React, { useEffect , useState} from "react";
import "./idCodeConfig.css";
import searchIcon from "../../assets/icons/search.png";
import { TbEdit } from "react-icons/tb";
import { IdCodeConfigAdd } from "./components/IdCodeConfigAdd";
import useItemServices from "../../services/master/itemServices";

export const IdCodeConfig = () => {
    const [edit, setEdit] = useState(false);
    const [codeList, setCodeList] = useState([]);

    const { getCode } = useItemServices();

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            let resp2 = await getCode();           
            if (resp2?.success) setCodeList(resp2.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleEdit = (data) => {
        setEdit(data)
    }

    return (
        <div className="id-code-config">
            <IdCodeConfigAdd {...{edit, setEdit }} />
            {/* <form onSubmit={handleSubmit}>
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
                                <Form.Label className="col-2 m-0">FULL ID</Form.Label>
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
                        Clear
                    </div>
                    <button
                        type="submit"
                        className="company-add-btn next btn col-1 col-2"
                    >
                        {edit?"Update":'Save'}
                    </button>
                </div>
            </form> */}
            <div className="p-3">
                <div className="code-conf-table-cont row mx-0 gap-3">
                    <div className="item_seach_bar_cont rounded-2 col-3">
                        <img src={searchIcon} className="search_img me-3 ms-2 py-2" />
                        <input
                            // onChange={handleChange}
                            // value={search}
                            // onChange={handleSearch}
                            className="item_search_bar rounded-2 border-0 py-1"
                            placeholder="Search"
                            type="text"
                        />
                    </div>
                    <div className="company-add-btn next btn col-1 col-2">Search</div>
                    <table className="table code-conf">
                        <thead>
                            <tr>
                                <th className="rounded-top-3 rounded-end-0">No</th>
                                <th>Code Types</th>
                                <th>Suffix</th>
                                <th>
                                    Post/
                                    <br />
                                    Prefix
                                </th>
                                <th>Next Value</th>
                                <th>Full ID</th>
                                <th className="rounded-top-3 rounded-start-0"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {codeList?.length > 0 &&
                                codeList.map((data, key) => {
                                    return (<tr>
                                        <td className="ps-2">
                                            <div className="code-conf-td rounded-start-4">{key + 1}</div>
                                        </td>
                                        <td>
                                            <div className="code-conf-td">{data.types}</div>
                                        </td>
                                        <td>
                                            <div className="code-conf-td">{data.sub_id}</div>
                                        </td>
                                        <td>
                                            <div className="code-conf-td">{data?.next_code?.match(/^[a-zA-Z]+/) ? "Prefix" : "Postfix"}</div>
                                        </td>
                                        <td>
                                            <div className="code-conf-td">{data.next_value}</div>
                                        </td>
                                        <td>
                                            <div className="code-conf-td">{data.next_code}</div>
                                        </td>
                                        <td className="pe-2">
                                            <div className="code-conf-td rounded-end-4 gap-3">
                                                <div className="d-flex cursor gap-3"
                                                    onClick={() => handleEdit(data)}>
                                                    <TbEdit className="p-0 m-0" size={'1.5rem'} />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>)
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
