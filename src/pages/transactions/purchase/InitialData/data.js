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
    created_at: null,
    bill_date: null,
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
    // cstm_id: null,
    // fk_supplier: null,
    // supplier_name: null,
    // documents_no: null,
    // payment_type: "CASH",
    // order_no: null,
    // bank_amount: null,
    // fk_bank: null,
    // bill_no: null,
    // created_at: null,
    // bill_date: null,
    // interstate: false,
    // reverse_charge: false,
    // tax_bill: false,
    // total_item: null,
    // total_amount: null,
    // total_amount2: null,
    // item: null,
    // discount: null,
    // roundoff: null,
    // paid_cash: null,
    // change_due: null,
    // fk_supplier: null,
    // vehicle_no: null,
    // isBatch: false,
    // total_margin: null,
    // total_items: null,
    // total_disc: null,
    // total_value: null,
    // total_qty: null,
    // driver: null,
    // poject: null,
    // address: null,
    // bank: null,
    // transfer_account: null,
  };
  
  export const initialTableItem = {
    cstm_id: null,
    item_name: null,
    fk_items: null,
    code: null,
    quantity: 0.0,
    unit: null,
    transaction_unit: null,
    rate: 0.0,
    sales_rate: 0.0,
    margin: 0.0,
    cost: 0.0,
    total: 0.0,
    sgst: 0.0,
    cgst_or_igst: 0.0,
    tax_gst: 0.0,
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
      state: "unit",
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
      title: "Tax",
      state: "tax_gst",
      position: 9,
      visible: true,
      skipping: false,
      readOnly: false,
      saleShow: true,
      purchaseShow: true,
    },
    {
      title: "CGST,IGST",
      state: "cgst_or_igst",
      position: 10,
      visible: true,
      skipping: false,
      readOnly: true,
      saleShow: true,
      purchaseShow: true,
    },
    {
      title: "SGST",
      state: "sgst",
      position: 11,
      visible: true,
      skipping: false,
      readOnly: true,
      saleShow: true,
      purchaseShow: true,
    },
    {
      title: "Total",
      state: "total",
      position: 12,
      visible: true,
      skipping: false,
      readOnly: true,
      saleShow: true,
      purchaseShow: true,
    },
    {
      title: "Cost",
      state: "cost",
      position: 13,
      visible: true,
      skipping: false,
      readOnly: true,
      saleShow: false,
      purchaseShow: true,
    },
    {
      title: "Margin",
      state: "margin",
      position: 14,
      visible: true,
      skipping: false,
      readOnly: false,
      saleShow: false,
      purchaseShow: true,
    },
    {
      title: "S.Rate",
      state: "sales_rate",
      position: 15,
      visible: true,
      skipping: false,
      readOnly: false,
      saleShow: false,
      purchaseShow: true,
    },
  ];
  