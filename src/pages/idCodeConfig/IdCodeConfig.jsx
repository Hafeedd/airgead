import React, { useEffect, useState } from "react";
import "./idCodeConfig.css";
import searchIcon from "../../assets/icons/search.png";
import { TbEdit } from "react-icons/tb";
import { IdCodeConfigAdd } from "./components/IdCodeConfigAdd";
import useItemServices from "../../services/master/itemServices";
import { useBaseServices } from "../../services/base/baseServices";
import { useLocation } from "react-router";

export const IdCodeConfig = () => {
  const [edit, setEdit] = useState(false);
  const [codeList, setCodeList] = useState([]);

  const { getCode } = useItemServices();
  const { getIdConfiguration } = useBaseServices();

  const location = useLocation();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      let resp;
      if (location.pathname === "/code-configuration") resp = await getCode();
      else resp = await getIdConfiguration();
      if (resp?.success) setCodeList(resp.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (data) => {
    setEdit(data);
  };

  return (
    <div className="id-code-config">
      <IdCodeConfigAdd refresh={getData} {...{ edit, setEdit }} />
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
                  return (
                    <tr>
                      <td className="ps-2">
                        <div className="code-conf-td rounded-start-4">
                          {key + 1}
                        </div>
                      </td>
                      <td>
                        <div className="code-conf-td">{data.types||data.id_type.split('_')[0]?.toUpperCase()}</div>
                      </td>
                      <td>
                        <div className="code-conf-td">{data.sub_id}</div>
                      </td>
                      <td>
                        <div className="code-conf-td">
                          {location.pathname === "/code-configuration"
                            ? data?.next_code?.match(/^[a-zA-Z]+/)
                              ? "Prefix"
                              : "Postfix"
                            : data.is_prefix
                            ? "Prefix"
                            : "Postfix"}
                        </div>
                      </td>
                      <td>
                        <div className="code-conf-td">{data.next_value}</div>
                      </td>
                      <td>
                        <div className="code-conf-td">{data.next_code||data.is_prefix?data.sub_id+data.next_value:data.next_value+data.sub_id}</div>
                      </td>
                      <td className="pe-2">
                        <div className="code-conf-td rounded-end-4 gap-3">
                          <div
                            className="d-flex cursor gap-3"
                            onClick={() => handleEdit(data)}
                          >
                            <TbEdit className="p-0 m-0" size={"1.5rem"} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
