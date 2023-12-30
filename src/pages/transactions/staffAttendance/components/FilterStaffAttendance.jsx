import React, { useEffect, useState } from "react";
import useItemServices from "../../../../services/master/itemServices";

const FilterStaffAttendance = (props) => {
  const { property, setProperty, setSelectedProperty, selectedProperty ,handleFilterStaff} =
    props;
  const { getProperty } = useItemServices();

  const getpro = async () => {
    try {
      const response = await getProperty();
      if (response?.success) {
        setProperty(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    getpro();
  }, []);
  return (
    <>
      <div className="m-4 ">
        <div className="col-12 mx-5 my-3">
          <select
            onChange={(e) => setSelectedProperty(e.target.value)}
            className="bg-white border border-dark btn px-5"
          >
            <option value="all">All Staff</option>
            {property.length > 0 &&
              property.map(
                (item) =>
                  item?.property_type === "designation" &&
                  item?.property_value && (
                    <option value={item?.id}>{item?.property_value}</option>
                  )
              )}
          </select>
        </div>
        <div className="d-flex justify-content-center">
          <div className="col-3 col-4 btn btn-dark" onClick={handleFilterStaff}>
            Filter
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterStaffAttendance;
