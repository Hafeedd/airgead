import React from "react";
import html2pdf from "html2pdf.js";
import { GenerateDynamicHtml } from "../../../../components/print/Print";

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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

  const handleConvertToPdf = async () => {
    // const dynamicHtml = GenerateDynamicHtml();

    // Create a temporary container element to hold the dynamic HTML
    const tempContainer = document.getElementById("new");
    // tempContainer.innerHTML = dynamicHtml;
    // const options = {
    //   margin: 5,
    //   image: { type: "jpeg", quality: 1 }, // Adjust quality (1.0 is maximum)
    //   html2canvas: {
    //     scale: 9,
    //     // width: printStyle == "thermal" ? tempContainer.offsetWidth*2 : null,
    //     // height: printStyle == "thermal" ? tempContainer.offsetHeight*2 : null,
    //   },
    //   jsPDF: {
    //     unit: "mm",
    //     format: printStyle == "thermal" ? "a7" : "a4",
    //     orientation: printStyle == "thermal" ? "portrait" : "landscape",
    //   },
    // };

    const options = {
      margin: 10,
      filename: 'output.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    // Pass the temporary container element to html2pdf for conversion
    // if (printStyle != "thermal") 
    // await html2pdf(tempContainer, options);

    html2canvas(tempContainer, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/jpeg');
      const pdf = new jsPDF(options.jsPDF);
      if(printStyle == 'thermal'){
        // Use Courier font
      pdf.setFont('courier');

      // Set font size
      pdf.setFontSize(12);

      // Add black and white image
      pdf.addImage(imgData, 'JPEG', options.margin, options.margin, 210 - 2 * options.margin, 297 - 2 * options.margin);

      // Save PDF file
      pdf.save(options.filename);

      }
      pdf.addImage(imgData, 'JPEG', options.margin, options.margin, 210 - 2 * options.margin, 297 - 2 * options.margin);
      pdf.autoPrint();
    });
    // else
    //   await html2pdf(tempContainer)
    //     .set(options)
    //     .outputPdf((pdf) => {
    //       // Here, you can handle the generated PDF (e.g., save or print it)
    //       // For example, you can open the PDF in a new tab
    //       const blob = new Blob([pdf], { type: "application/pdf" });
    //       const url = URL.createObjectURL(blob);
    //       window.open(url, "_blank");
    //     });
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
