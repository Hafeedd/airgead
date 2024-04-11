export const initialItemData = {
  code: null,
  hsn: null,
  name: null,
  second_name: null,
  types: "PRODUCT",
  category: null,
  sub_category: null,
  company: null,
  size: null,
  color: null,
  group: null,
  tax_group: null,
  rack: null,
  unit: null,
  transaction_unit: null,
  mrp_rate: null,
  retail_rate: null,
  wholesale_rate: null,
  super_wholesale_rate: null,
  quotation_rate: null,
  rent: null,
  rent_type: null,
  purchase_rate: null,
  cost: null,
  margin: null,
  tax_gst: null,
  cess_1: null,
  cess_2: null,
  purchase_discount: null,
  sale_discount: null,
  unload_charge: null,
  load_charge: null,
  point: null,
  commission: null,
  damage: null,
  qty_in_box: null,
  open_stock: null,
  role: null,
  damage_cost: null,
  blocked: false,
  tax_inclusive: false,
  manuel_qty_in_bc: false,
  rent_item: false,
  gate_pass: false,
  barcode: null,
};

export const initTableHeadList = {
  unit: [
    { title: "Qty", state: "u_qty" },
    { title: "Unit", state: "q_unit" },
    { title: "Rate", state: "u_rate" },
    { title: "Expiry", state: "u_expiry", type:"date" },
  ],
  barcode: [
    { title: "C.Barcode", state: "b_code" },
    { title: "MRP", state: "b_mrp" },
    { title: "S.Rate", state: "b_rate" },
    { title: "Expiry", state: "b_expiry" , type:"date"},
  ],
  batch: [
    {
      title: "Batch No",
      state: "batch_no",
      type:"text"
    },
    {
      title: "Expiry Date",
      state: "expiry_date",
      type: "date"
    },
    {
      title: "Opening Stock",
      state: "quantity",
      type:"number"
    },
    {
      title: "MFG Date",
      state: "mfg_date",
      type: "date"
    },
  ],
};
