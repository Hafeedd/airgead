import { useEffect, useState } from "react";
import { NormaA4 } from "./printStyles/NormaA4";
import { NormalA42 } from "./printStyles/NormalA42";
import { Thermal } from "./printStyles/Thermal";
import './printStyles.css'

export const GenerateDynamicHtml = (props) => {
  const {
    c_address,
    c_name,
    c_number,
    delivery_add,
    c_gstin,
    vehicle_no,
    driver,
    taxPerc,
    total_qty,
    total_disc,
    total_value,
    total_cgst,
    total_sgst,
    total,
    roundOff,
    hsn,
    hsnCalc,
  } = props;
  const [tableHead, setTableHead] = useState([]);
  const [tableBodyLength, setTableBodyLength] = useState(0);
  const [tableTrBody, setTableTrBody] = useState([]);

  useEffect(() => {
    GetContent();
  }, []);

  const GetContent = () => {
    const contentDiv = document.getElementById("TableToPrint");
    const m = [...contentDiv.querySelectorAll("thead th")];
    let a = [];
    m?.map((data) => {
      if (
        data.innerText !== "" &&
        data.innerText &&
        data.innerText.match(/^[a-z]+/i)
      ) {
        a.push(data.innerText);
      }
    });

    let tbodytr = [...contentDiv?.querySelectorAll("tbody tr:not(:empty)")];
    // console.log(tbodytr)
    let targetTr = [];
    for (const tr of tbodytr) {
      if (tr.getAttribute("id")) {
        targetTr.push([...tr.querySelectorAll('input:not(empty), select:not(empty)')]);
      }
    }
    let trData = [];
    targetTr.map((list) => {
      let tdData = [];
      if (list.length > 0) {
        let i = 0
        for (let b of list) {
          let textContent;
          if(i == 0 ){
            textContent = b?.parentElement?.innerText?.trim()
            i++
          }
          else if (b?.tagName.toLowerCase() === "select") {      
            // If the innermost child is a <select>, get the selected option text
            const selectedOption =
              b?.options[b?.selectedIndex];
            textContent = selectedOption
              ? selectedOption.textContent.trim()
              : "";
          } else {
            // For other elements, get the general text content
            // console.log(b)
            textContent = b?.textContent?.trim()|| b.defaultValue.trim() || b.placeholder?.trim();
          }
          if (textContent && textContent != "")
            tdData.push(textContent)
        }
      }
      trData.push(tdData);
    });
    if (targetTr.length > 0) setTableBodyLength(trData[0].length);
    setTableTrBody(trData);
    if (a.length > 0) setTableHead(a);
    let divContent = contentDiv ? contentDiv.innerHTML : "";
    if (divContent !== "") {
      return <div dangerouslySetInnerHTML={{ __html: divContent }} />;
    }
  };
  // Replace this with your logic to generate dynamic HTML

  const TableHeigth = () => {
    let a = [];
    for (let i = 0; i < 8 - tableTrBody.length; i++) {
      let s = [];
      for (let i = 0; i < tableBodyLength + 1; i++) {
        s.push(
          <td
            key={i}
            className={`p-3 border-0 border-start border-secondary ${i== 0 && "border-start-0"}`}
          ></td>
        );
      }
      a.push(<tr>{s}</tr>);
    }
    
    return a;
  };

  const printType = localStorage.getItem('printType')|| "A4_normal"

  return (
    <div className="d-flex justify-content-center" style={{width:'fit-content'}}>
      {printType == "A4_normal" ? (
        <NormaA4
          {...{
            c_address,
            c_name,
            c_number,
            delivery_add,
            c_gstin,
            vehicle_no,
            driver,
            taxPerc,
            total_qty,
            total_disc,
            total_value,
            total_cgst,
            total_sgst,
            total,
            roundOff,
            hsn,
            TableHeigth,
            tableHead,
            tableTrBody,
            hsnCalc,
          }}
        />
      ) : printType == "A4_normal_2" ? (
        <NormalA42
          {...{
            TableHeigth,
            c_address,
            c_name,
            c_number,
            delivery_add,
            c_gstin,
            vehicle_no,
            driver,
            taxPerc,
            total_qty,
            total_disc,
            total_value,
            total_cgst,
            total_sgst,
            total,
            roundOff,
            hsn,
            TableHeigth,
            tableHead,
            tableTrBody,
            hsnCalc,
          }}
        />
      ) : (
        printType == "thermal" && (
          <Thermal
            {...{
              TableHeigth,
              c_address,
              c_name,
              c_number,
              delivery_add,
              c_gstin,
              vehicle_no,
              driver,
              taxPerc,
              total_qty,
              total_disc,
              total_value,
              total_cgst,
              total_sgst,
              total,
              roundOff,
              hsn,
              TableHeigth,
              tableHead,
              tableTrBody,
              hsnCalc,
            }}
          />
        )
      )}
    </div>
  );
};
