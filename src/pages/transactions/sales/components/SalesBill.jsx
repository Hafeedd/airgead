import React from "react";
import html2pdf from "html2pdf.js";
import { GenerateDynamicHtml } from "../../../../components/print/Print";

export const PrintFIle = (props) => {
    const {
        handleSalesAllReset,SalesTable
    } = props
  const options = {
    margin: 5,
    image: { type: "jpeg", quality: 1.0 }, // Adjust quality (1.0 is maximum)
    html2canvas: { scale: 1 },
    jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
  };

  const handleConvertToPdf = () => {
    // const dynamicHtml = GenerateDynamicHtml();

    // Create a temporary container element to hold the dynamic HTML
    const tempContainer = document.getElementById("new");
    // tempContainer.innerHTML = dynamicHtml;

    // Pass the temporary container element to html2pdf for conversion
    html2pdf(tempContainer, options);

  };

  return (
    <div className="w-100">
      <div className="w-100">
        <GenerateDynamicHtml/>
      </div>
      <div className="w-100 d-flex justify-content-center pb-3">
      <button onClick={handleSalesAllReset}className="btn btn-sm btn-dark me-4">Close</button>
      <button className="btn btn-sm btn-dark" onClick={handleConvertToPdf}>Print</button>
      </div>
    </div>
  );
};
