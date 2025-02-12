export const initialPurchaseAdd = {
    cstm_id: null,
    fk_supplier: null,
    supplier_name: null,
    documents_no: null,
    payment_type: "CASH",
    order_no: null,
    bank_amount: null,
    fk_bank: null,
    bill_no: null,
    date:new Date().toISOString(),
    created_at: null,
    bill_date: new Date().toISOString(),
    interstate: false,
    reverse_charge: false,
    tax_bill: false,
    total_item: null,
    total_amount: null,
    total_amount2: null,
    item: null,
    discount: null,
    roundoff: null,
    paid_cash: null,
    due_date: null,
    change_due: null,
    vehicle_no: null,
    isBatch: false,
    total_margin: null,
    total_items: null,
    total_disc: null,
    total_value: null,
    total_qty: null,
    driver: null,
    poject: null,
    address: null,
    bank: null,
    transfer_account: null,
  };
  
  export const initialTableItem = {
    cstm_id: null,
    item_name: null,
    fk_items: null,
    code: null,
    quantity: 0.0,
    fk_unit: null,
    transaction_unit: null,
    rate: 0.0,
    sales_rate: 0.0,
    margin: 0.0,
    cost: 0.0,
    total: 0.0,
    sgst: 0.0,
    expiry_date:null,
    cgst_or_igst: 0.0,
    tax_gst: 0.0,
    vat_perc: 0.0,
    value: 0.0,
    sale_discount: 0.0,
    discount_1_percentage: 0.0,
    discount_1_amount: 0.0,
  };
  
  export const initialPurchaseTableStatePositionLocal = JSON.parse(
    localStorage.getItem("initialPurchaseTableStatePositionLocal")
  );
  
  export const initialPurchaseSalesTableStatePosition = [
    {
      title: "Item Name",
      state: "item_name",
      position: 1,
      visible: true,
      skipping: false,
      readOnly: false,
      saleShow: true,
      purchaseShow: true,
    },
    {
      title: "Qty",
      state: "quantity",
      position: 2,
      visible: true,
      skipping: false,
      readOnly: false,
      saleShow: true,
      purchaseShow: true,
    },
    {
      title: "Ut",
      state: "fk_unit",
      position: 3,
      visible: true,
      skipping: false,
      readOnly: false,
      saleShow: true,
      purchaseShow: true,
    },
    {
      title: "P.Rate",
      state: "rate",
      position: 4,
      visible: true,
      skipping: false,
      readOnly: false,
      saleShow: false,
      purchaseShow: true,
    },
    {
      title: "S.Rate",
      state: "rate",
      position: 4,
      visible: true,
      skipping: false,
      readOnly: false,
      saleShow: true,
      purchaseShow: false,
    },
    {
      title: "Net Rate",
      state: "gross",
      position: 5,
      visible: true,
      skipping: false,
      readOnly: false,
      saleShow: true,
      purchaseShow: false,
    },
    {
      title: "Disc%",
      state: "discount_1_percentage",
      position: 6,
      visible: true,
      skipping: false,
      readOnly: false,
      saleShow: true,
      purchaseShow: true,
    },
    {
      title: "Disc",
      state: "discount_1_amount",
      position: 7,
      visible: true,
      skipping: false,
      readOnly: false,
      saleShow: true,
      purchaseShow: true,
    },
    {
      title: "Value",
      state: "value",
      position: 8,
      visible: true,
      skipping: false,
      readOnly: true,
      saleShow: true,
      purchaseShow: true,
    },
    {
      title: "Vat",
      state: "vat",
      position: 9,
      visible: false,
      skipping: false,
      readOnly: false,
      saleShow: true,
      purchaseShow: true,
    },
    {
      title: "Vat%",
      state: "vat_perc",
      position: 10,
      visible: false,
      skipping: true,
      readOnly: true,
      saleShow: true,
      purchaseShow: true,
    },
    {
      title: "Tax",
      state: "tax_gst",
      position: 11,
      visible: true,
      skipping: false,
      readOnly: false,
      saleShow: true,
      purchaseShow: true,
    },
    {
      title: "CGST,IGST",
      state: "cgst_or_igst",
      position: 12,
      visible: true,
      skipping: false,
      readOnly: true,
      saleShow: true,
      purchaseShow: true,
    },
    {
      title: "SGST",
      state: "sgst",
      position: 13,
      visible: true,
      skipping: false,
      readOnly: true,
      saleShow: true,
      purchaseShow: true,
    },
    {
      title: "Total",
      state: "total",
      position: 14,
      visible: true,
      skipping: false,
      readOnly: true,
      saleShow: true,
      purchaseShow: true,
    },
    {
      title: "Cost",
      state: "cost",
      position: 15,
      visible: true,
      skipping: false,
      readOnly: true,
      saleShow: false,
      purchaseShow: true,
    },
    {
      title: "Margin",
      state: "margin",
      position: 16,
      visible: true,
      skipping: false,
      readOnly: false,
      saleShow: false,
      purchaseShow: true,
    },
    {
      title: "S.Rate",
      state: "sales_rate",
      position: 17,
      visible: true,
      skipping: false,
      readOnly: false,
      saleShow: false,
      purchaseShow: true,
    },
    {
      title: "Batch",
      state: "batch_no",
      position: 18,
      visible: true,
      skipping: false,
      readOnly: false,
      saleShow: false,
      purchaseShow: true,
    },
    {
      title: "Exp Date",
      state: "expiry_date",
      position: 19,
      visible: true,
      skipping: false,
      readOnly: false,
      saleShow: false,
      purchaseShow: true,
    },
  ];
  

  // export const handleCalculationInTable = (tempItem, e, data) =>{
  //   let name = e.target.name;


  // }