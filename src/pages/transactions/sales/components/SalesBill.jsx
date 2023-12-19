import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "jspdf-autotable";
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

  const printStyle = localStorage.getItem("printType");

  const handleConvertToPdf = async (status) => {
    // const dynamicHtml = GenerateDynamicHtml();

    // Create a temporary container element to hold the dynamic HTML
    const content = document.getElementById("new");
    // tempContainer.innerHTML = dynamicHtml;
    const pdfOptions = {
      margin: 10,
      filename: "output.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
        autoPrint: { variant: "non-conform" },
      },
    };

    html2canvas(content, { scale: 2 }).then(async (canvas) => {
      const imgData = canvas.toDataURL("image/jpeg");
      const pdf = new jsPDF(pdfOptions.jsPDF);

      pdf.addImage(
        imgData,
        "JPEG",
        pdfOptions.margin,
        pdfOptions.margin,
        210 - 2 * pdfOptions.margin,
        297 - 2 * pdfOptions.margin
      );

      if (printStyle == "thermal") {
        // Use Courier font
        pdf.setFont("courier");

        // Set font size
        pdf.setFontSize(12);

        // Add black and white image
        pdf.addImage(
          imgData,
          "JPEG",
          pdfOptions.margin,
          pdfOptions.margin,
          210 - 2 * pdfOptions.margin,
          297 - 2 * pdfOptions.margin
        );
      }
      if(status == "print"){

        // Generate a Blob from the PDF content
        const pdfBlob = pdf.output("blob");
        
        // Create an object URL from the Blob
      const pdfObjectURL = URL.createObjectURL(pdfBlob);

      // Create an invisible iframe
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      document.body.appendChild(iframe);

      // Set the iframe content to the PDF object URL
      iframe.src = pdfObjectURL;

      // Wait for the PDF to load in the iframe, then trigger print
      iframe.onload = () => {
        iframe.contentWindow.print();
        // Release the object URL when done printing
        URL.revokeObjectURL(pdfObjectURL);
      };
    }else if(status == "pdf"){
      pdf.save(pdfOptions.filename)
    }
    });
  };

  return (
    <div className="w-100 d-flex justify-content-center flex-column">
      <div className="w-100 d-flex justify-content-center flex-column p-2">
        <GenerateDynamicHtml
          {...{
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
          }}
        />
      </div>
      <div className="w-100 d-flex justify-content-center gap-4 pb-3">
        <button
          onClick={handleSalesAllReset}
          className="btn btn-sm btn-dark"
        >
          Close
        </button>
        <button className="btn btn-sm btn-dark" onClick={()=>handleConvertToPdf("print")}>
          Print
        </button>
        <button className="btn btn-sm btn-dark" onClick={()=>handleConvertToPdf("pdf")}>
          Pdf
        </button>
      </div>
    </div>
  );
};
