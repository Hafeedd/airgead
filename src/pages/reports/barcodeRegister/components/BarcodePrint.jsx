import React, { useRef, useState } from "react";
import Barcode from "react-barcode";
// import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toPng } from "dom-to-image";
import "jspdf-autotable";
import ReactToPrint from "react-to-print";

const BarcodePdf = ({ barcodeList, totalNumberOfBarcode }) => {
  const barcodeRef = useRef(null)
  let rowCount = 1
  let barcodeCount = 0

const handleConvertToPdf = async (status) => {

  const container = document.getElementById("new");
  const barcodeData = [...container.childNodes];

  let currentLine = 1;
  let currentPage = 1;

  let pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  let bList = [];

  for (let i = 0; i < barcodeData.length; i++) {
    let b = await toPng(barcodeData[i]).then(
      (image)=> {
        return image
      }
    )
    bList.push(b);
  }

    bList?.forEach((barcode, index) => {
    const column = (index % 5) + 1;
    const row = Math.ceil((index + 1) / 5);

    const x = (column - 1) * 43;
    const y = (row - 1) * 20;

    if (row > 13) {
      pdf.addPage();
      currentLine = 1;
      currentPage += 1;
    }

    if (currentPage > 1 && currentPage % 13 === 0) {
      pdf.addPage();
      currentLine = 1;
    }

    // pdf.text(`Barcode ${index + 1}`, x, y - 5);
    pdf.addImage(barcode, "JPEG", x, y, 38, 21);

    currentLine += 1;
  });

  if (status == "print") {
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
  } else if (status == "pdf") {
    pdf.save("barcode.pdf");
  }
};

  return (
    <div>
      <div
        id="new"
        className="barcode-container"
        ref={barcodeRef}
      >
        {
        barcodeList &&
          barcodeList?.map((data) => {            
            let a = [];
            for (let i = 0; i < data.number; i++) {
              a.push(
                <div key={i} className={`text-center barcode-item ${rowCount<1&& "next-line"}`}>
                  <Barcode
                    value={data?.barcode}
                    width={1.0178}
                    height={15.8}
                    margin={0}
                    textMargin={0}
                    fontSize={10.5}
                  />
                    <div className="d-flex flex-column h-auto text-start">
                      <div style={{fontSize:"10px"}} className="py-0 my-0">{data?.item_name}</div>
                      <div style={{fontSize:"12px"}} className="py-0 my-0">₹{data?.cost}</div>
                    </div>
                </div>
              );
              barcodeCount++          
              if(parseFloat(barcodeCount % 65) < 5 && barcodeCount>5){
                rowCount = 0
              }
              else rowCount = 1
            }
            return [...a];
          })}
      </div>
      <div
        className="col-12 d-flex justify-content-center position-absolute gap-2"
        style={{ bottom: "5px" }}
      >
        {/* <div
          className="btn btn-sm btn-dark"
          onClick={() => handleConvertToPdf("pdf")}
        >
          Pdf
        </div> */}
        <ReactToPrint
          trigger={() => <button className="btn btn-sm btn-dark">Print</button>}
          content={()=>barcodeRef.current}
          style={{margin:"41.57480315px"}}
        />
      </div>
    </div>
  );
};

export default BarcodePdf;

// ---------------------------------------------------------------------------

// const handleConvertToPdf = async (status) => {

//   const container = document.getElementById("new");
//   const barcodeData = [...container.childNodes];

//   let currentLine = 1;
//   let currentPage = 1;

//   let pdf = new jsPDF({
//     orientation: "portrait",
//     unit: "mm",
//     format: "a4",
//   });

//   let bList = [];

//   for (let i = 0; i < barcodeData.length; i++) {
//     let b = await toPng(barcodeData[i]).then(
//       (image)=> {
//         return image
//       }
//     )
//     bList.push(b);
//   }

//     bList?.forEach((barcode, index) => {
//     const column = (index % 5) + 1;
//     const row = Math.ceil((index + 1) / 5);

//     const x = (column - 1) * 43;
//     const y = (row - 1) * 20;

//     if (row > 13) {
//       pdf.addPage();
//       currentLine = 1;
//       currentPage += 1;
//     }

//     if (currentPage > 1 && currentPage % 13 === 0) {
//       pdf.addPage();
//       currentLine = 1;
//     }

//     // pdf.text(`Barcode ${index + 1}`, x, y - 5);
//     pdf.addImage(barcode, "JPEG", x, y, 38, 21);

//     currentLine += 1;
//   });

//   if (status == "print") {
//     // Generate a Blob from the PDF content
//     const pdfBlob = pdf.output("blob");

//     // Create an object URL from the Blob
//     const pdfObjectURL = URL.createObjectURL(pdfBlob);

//     // Create an invisible iframe
//     const iframe = document.createElement("iframe");
//     iframe.style.display = "none";
//     document.body.appendChild(iframe);

//     // Set the iframe content to the PDF object URL
//     iframe.src = pdfObjectURL;

//     // Wait for the PDF to load in the iframe, then trigger print
//     iframe.onload = () => {
//       iframe.contentWindow.print();
//       // Release the object URL when done printing
//       URL.revokeObjectURL(pdfObjectURL);
//     };
//   } else if (status == "pdf") {
//     pdf.save("barcode.pdf");
//   }
// };


{/* <ReactToPrint
          trigger={() => <button className="btn btn-sm btn-dark">Print</button>}
          content={()=>barcodeRef.current}
        /> */}