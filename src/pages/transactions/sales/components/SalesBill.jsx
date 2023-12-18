import React from "react";
import html2pdf from "html2pdf.js";
import { GenerateDynamicHtml } from "../../../../components/print/Print";

export const PrintFIle = (props) => {
  const {
    handleSalesAllReset,
    SalesTable,
    c_address,
    c_name,
    c_number,
    delivery_add,
    c_gstin,
    vehicle_no,
    driver,
    total_qty,
    total_disc,
    total_value,
    total_cgst,
    total_sgst,
    total,
    taxPerc,
    hsn,
    roundOff,
    hsnCalc,
  } = props;

  const printStyle = localStorage.getItem('printType')

  const handleConvertToPdf =async () => {
    // const dynamicHtml = GenerateDynamicHtml();
    
    // Create a temporary container element to hold the dynamic HTML
    const tempContainer = document.getElementById("new");
    // tempContainer.innerHTML = dynamicHtml;
    const options = {
      margin: 1 ,
      image: { type: "jpeg", quality: 1.0 }, // Adjust quality (1.0 is maximum)
      html2canvas: { scale:2, width:printStyle!=='thermal'? tempContainer.offsetWidth:null,
       height:printStyle!=='thermal'?tempContainer.offsetHeight:null },
      jsPDF: { unit: "mm", format: printStyle=='thermal'?"a7":"a4", orientation: printStyle=='thermal'?"portrait":"landscape" },
    };

    // Pass the temporary container element to html2pdf for conversion
    if(printStyle !== "thermal")
    await html2pdf(tempContainer, options)
    else
    await html2pdf(tempContainer).set(options).outputPdf((pdf) => {
      // Here, you can handle the generated PDF (e.g., save or print it)
      // For example, you can open the PDF in a new tab
      const blob = new Blob([pdf], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    })
  };

  return (
    <div className="w-100 d-flex justify-content-center flex-column">
      <div className="w-100 d-flex justify-content-center flex-column p-2">
        <GenerateDynamicHtml {...{
         c_address,
         c_name,
         c_number,
         delivery_add,
         c_gstin,
         vehicle_no,
         driver,
         total_qty,
         total_disc,
         total_value,
         total_cgst,
         total_sgst,
         total,
         taxPerc,
         hsn,
         roundOff,
         hsnCalc,
        }}/>
      </div>
      <div className="w-100 d-flex justify-content-center pb-3">
        <button
          onClick={handleSalesAllReset}
          className="btn btn-sm btn-dark me-4"
        >
          Close
        </button>
        <button className="btn btn-sm btn-dark" onClick={handleConvertToPdf}>
          Print
        </button>
      </div>
    </div>
  );
};
