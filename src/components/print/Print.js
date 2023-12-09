import { useEffect, useState } from "react";

export const GenerateDynamicHtml = () => {
  const [tableHead, setTableHead] = useState([])
  const [tableBody, setTableBody] = useState([])
  useEffect(() => {
    GetContent()
  }, [])
  const GetContent = () => {
    const contentDiv = document.getElementById('TableToPrint');
    const m = [...contentDiv.querySelectorAll('thead th')]
    let a = []
    m?.map(data => {
      if (data.innerText !== '' && data.innerText &&
        data.innerText.match(/^[a-z]+/i)) {
        a.push(data.innerText)
      }
    })

    let tbodytr = [...contentDiv?.querySelectorAll('tbody tr')]
    let targetTr = []
    for (const tr of tbodytr) {
      if (tr.getAttribute('id')) {
        targetTr.push([...tr.querySelectorAll('td:not(:empty)')])
      }
    }
    if (targetTr.length > 0)
      setTableBody(targetTr)
    if (a.length > 0)
      setTableHead(a)
    let divContent = contentDiv ? contentDiv.innerHTML : '';
    if (divContent !== '') {
      return <div dangerouslySetInnerHTML={{ __html: divContent }} />;
    }
  };
  // Replace this with your logic to generate dynamic HTML

  const GetBody = ({list}) => {
    let a = []
    if (list.length > 0) {
      for (let b of list){
      let textContent
    if (b?.lastElementChild?.tagName.toLowerCase() === 'select') {
      console.log(b.lastElementChild.options)
      // If the innermost child is a <select>, get the selected option text
      const selectedOption = b?.lastElementChild?.options[b?.lastElementChild?.selectedIndex];
      textContent = selectedOption ? selectedOption.textContent.trim() : '';
    } else {
      // For other elements, get the general text content
      textContent = b.textContent.trim();
    }
        a.push(<td className="border">{textContent}</td>)
      }}
      a = a.slice(0,tableHead.length)
    return a
  }

  return (
    <div className="w-100 p-3" id="new">
      <div className="border">
        <div className="text-center w-100">
          <h4>Demonstration</h4>
          <p>Near New Bus Stand Nilambur</p>
        </div>
        <div className="row">
          {" "}
          {/* row of sub head */}
          <div className="col-5 row">
            <div className="row">
              <div className="col-2 text-end">Invoice: </div>
              <div className="col-2">A/0000006</div>
            </div>
            <div className="row">
              <div className="col-2 text-end">Invoice: </div>
              <div className="col-2">A/0000006</div>
            </div>
            <div className="col-1 row"></div>
          </div>
          <div className="col-2 text-center ps-5">
            <div>434234g3jh24</div>
            <div className="ps-3">8545485</div>
          </div>
        </div>
        <div className="border-top border-bottom py-1 mt-2 text-center">
          <b>Tax invoice</b>
        </div>
        <div className="row border-bottom mx-0">
          <div className="col-6 text-start ps-5 pt-4 d-flex flex-column">
            <p>
              Customer Details
              <br />
              SR AGENCIES
              <br />
              BYPASS ROAD MALAPURAM
              <br />
              MALAPPURAM-KUNNAMKULAM
              <br />
            </p>
          </div>
          <div className="col-6 text-start ps-5 pt-4 border-start">
            <p className="ps-5">
              <b>Shipped to</b><br />
              MOOCHIKAL ROAD<br />
              VALLUVAMBARAM PO<br />
              KOZHIKODE<br />
            </p>
          </div>
        </div>
        <div className="border mt-3">
          <table className="table">
            <thead>
              <tr>
                {tableHead.length > 0 &&
                  tableHead.map(data =>
                    <th className="border-start">{data}</th>)}
              </tr>
              </thead>
              <tbody>
                {tableBody.length > 0 &&
                  tableBody.map(data => {
                    return (
                    <tr>
                      <GetBody list={data} />
                    </tr>)
                  })}
              </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};