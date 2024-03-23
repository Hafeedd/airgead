import useAxiosPrivate from "../../hooks/axios/useAxiosPrivate";

const useItemServices = () => {
  const axios = useAxiosPrivate()
  // api for adding new options and post req -----------------------------------------------

  // item add
  const postItemAdd = async (data) => {
    const response = await axios.post("master/item/created/?activity_code=1002", data);
    return response.data;
  };

  // get properties
  const getProperty = async () => {
    const response = await axios.get("master/property_type/created/?activity_code=1461");
    return response.data;
  };

  // post properties
  const postProperty = async (data) => {
    const response = await axios.post(
      "master/property_type/created/?activity_code=1462",
      { property_value: data.property_value },
      { params: { property_type: data.property_type } }
    );
    return response.data;
  };

  // put properties
  const putProperty = async (data, id) => {
    const response = await axios.put(
      "master/property_type/updated/" + id + "/?activity_code=1464",
      data
    );
    return response.data;
  };

  // second name
  const postSecondName = async (data) => {
    const response = await axios.post(
      "master/second_name/created/",
      data
    );
    return response.data;
  };

  //  type
  const postType = async (data) => {
    const response = await axios.post("master/types/created/", data);
    return response.data;
  };

  // category
  const postCategory = async (data) => {
    const response = await axios.post("master/category/created/", data);
    return response.data;
  };

  // subCategory
  const postSubCategory = async (data) => {
    const response = await axios.post(
      "master/sub_category/created/",
      data
    );
    return response.data;
  };

  // Company
  const postCompany = async (data) => {
    const response = await axios.post("master/company/created/", data);
    return response.data;
  };

  // size
  const postSize = async (data) => {
    const response = await axios.post("master/size/created/", data);
    return response.data;
  };

  // color
  const postColor = async (data) => {
    const response = await axios.post("master/color/created/", data);
    return response.data;
  };

  // group
  const postGroup = async (data) => {
    const response = await axios.post("master/group/created/", data);
    return response.data;
  };

  // tax group
  const postTaxGroup = async (data) => {
    const response = await axios.post("master/tax_group/created/", data);
    return response.data;
  };

  // rack
  const postRack = async (data) => {
    const response = await axios.post("master/rack/created/", data);
    return response.data;
  };

  // unit
  const postUnit = async (data) => {
    const response = await axios.post("master/unit/created/", data);
    return response.data;
  };

  // code
  const postBarcode = async (id, data) => {
    const response = await axios.post(
      "master/barcode/created/" + id + "/",
      data
    );
    return response.data;
  };

  // unit adding
  const postUnitConvertion = async (id, data) => {
    const response = await axios.post(
      "master/unit_conversion/created/" + id + "/",
      data
    );
    return response.data;
  };

  //code
  const getCode = async () => {
    const response = await axios.get("master/code/created/?activity_code=1444");
    return response.data;
  };

  // api for listing options and get request -----------------------------------------------------------

  // second name
  const getSecondName = async () => {
    const response = await axios.get("master/second_name/created/");
    return response.data;
  };

  // type
  const getType = async () => {
    const response = await axios.get("master/types/created/");
    return response.data;
  };

  // category
  const getCategory = async () => {
    const response = await axios.get("master/category/created/");
    return response.data;
  };

  // sub category
  const getSubCategory = async () => {
    const response = await axios.get("master/sub_category/created/");
    return response.data;
  };

  // company
  const getCompany = async () => {
    const response = await axios.get("master/company/created/");
    return response.data;
  };

  // size
  const getSize = async () => {
    const response = await axios.get("master/size/created/");
    return response.data;
  };

  // color
  const getColor = async () => {
    const response = await axios.get("master/color/created/");
    return response.data;
  };

  // group
  const getGroup = async () => {
    const response = await axios.get("master/group/created/");
    return response.data;
  };

  // tax group
  const getTaxGroup = async () => {
    const response = await axios.get("master/tax_group/created/");
    return response.data;
  };

  // rack
  const getRack = async () => {
    const response = await axios.get("master/rack/created/");
    return response.data;
  };

  // unit
  const getUnit = async () => {
    const response = await axios.get("master/unit/created/");
    return response.data;
  };

  // barcode
  const getBarcode = async () => {
    const response = await axios.get("master/barcode/created/");
    return response.data;
  };

  // item list
  const getItemList = async (data) => {
    const response = await axios.get("master/item/created/?activity_code=1000", {
      params: { data },
    });
    return response.data;
  };

  // item name only list
  const getItemNameList = async () => {
    const response = await axios.get("master/item_list/created/?activity_code=1000");
    return response.data;
  };

  //update options and put request ----------------------------------------------------------

  // barcode
  const putBarcode = async (id, data) => {
    const response = await axios.put(
      "master/barcode/updated/" + id + "/",
      data
    );
    return response.data;
  };

  // unit update
  const putUnitConvertion = async (id, data) => {
    const response = await axios.put(
      "master/unit_conversion/updated/" + id + "/",
      data
    );
    return response.data;
  };

  //item
  const putItemAdd = async (id, data) => {
    const response = await axios.put(
      "master/item/updated/" + id + "/?activity_code=1003",
      data
    );
    return response.data;
  };

  //delete request

  // item delete
  const deleteItem = async (id) => {
    const response = await axios.delete(
      "master/item/updated/" + id + "/?activity_code=1004"
    );
    return response.data;
  };

  // item delete
  const deleteItemList = async (id) => {
    const response = await axios.delete(
      "master/item/updated/" + id + "/?activity_code=1004"
    );
    return response.data;
  };

  // unit update
  const deleteUnitConvertion = async (id) => {
    const response = await axios.delete(
      "master/unit_conversion/updated/" + id + "/"
    );
    return response.data;
  };
  

  return {
    // post
    postProperty,
    postUnitConvertion,
    postItemAdd,
    postBarcode,
    postUnit,
    postRack,
    postTaxGroup,
    postGroup,
    postColor,
    postSize,
    postCompany,
    postSubCategory,
    postCategory,
    postType,
    postSecondName,

    // get
    getCode,
    getProperty,
    getItemNameList,
    getBarcode,
    getUnit,
    getRack,
    getTaxGroup,
    getGroup,
    getColor,
    getSize,
    getCompany,
    getSubCategory,
    getCategory,
    getType,
    getSecondName,
    getItemList,

    // put
    putProperty,
    putBarcode,
    putUnitConvertion,
    putItemAdd,

    //delete
    deleteUnitConvertion,
    deleteItemList,
    deleteItem,
  };
};

export default useItemServices;
