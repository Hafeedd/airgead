import React from "react";
import tempImg from "../../../assets/images/image.jpg";
import { toWords } from "number-to-words";

export const Thermal = (props) => {
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
    TableHeigth,
    tableHead,
    tableTrBody,
    hsnCalc,
  } = props;

  return (
    <div
      className="p-3 d-flex justify-content-center flex-column border"
      style={{ width: "fit-content" }}
      id="new"
    >
      <div className="text-center row gap-2">
        <img src={tempImg} alt="logoComp" width={500} height={50} />
        <b>5435435435/ 5435435435/ 543543543</b>
        <b>TAX INVOICE</b>
      </div>
      <div className="border-bottom p-2 border-top border-dark d-flex justify-content-between">
        <div>
          Date:
          <br />
          20/12/2023
        </div>
        <div>
          Invoice:
          <br /> 4354535
        </div>
      </div>
      <div className="border-bottom p-2 border-dark d-flex justify-content-between">
        <div>
          Customer:
          <br />
          Arjun
        </div>
      </div>
      <div className="border-bottom py-2 border-dark d-flex justify-content-between">
        <table className="table">
          <thead>
            <tr className="border-bottom border-dark">
              <td>S/L</td>
              {tableHead.length > 0 &&
                tableHead.map((data) => {
                  if (data.match(/item|qty|^rate|total/gi))
                    return <td>{data}</td>;
                })}
            </tr>
          </thead>
          <tbody>
            {tableTrBody?.length > 0 &&
              tableTrBody.map((data, i) => {
                let b;
                b = data?.map((item, i) => {
                  let a = [];
                  let index = tableHead.findIndex((x) => x.match(/^item/gi));
                  if (index == i)
                    a.push(
                      <td className="border-top border-bottom-dark">{item}</td>
                    );
                  index = tableHead.findIndex((x) => x.match(/^qty/gi));
                  if (index == i) a.push(<td>{item}</td>);
                  index = tableHead.findIndex((x) => x.match(/^rate/gi));
                  if (index == i) a.push(<td>{item}</td>);
                  index = tableHead.findIndex((x) => x.match(/^total/gi));
                  if (index == i) a.push(<td>{item}</td>);
                  return a;
                });
                return (
                  <tr className="border-top border-secondary">
                    <td>{i + 1}</td>
                    {b}
                  </tr>
                );
              })}
          </tbody>
          <tfoot>
            <tr className="border-top border-bottom border-dark">
              <td colSpan={2}></td>
              <td>{total_qty}</td>
              <td></td>
              <td>{total}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="border-bottom p-2 border-dark d-flex justify-content-end">
        <div className="px-4 text-end">
          {Math.round(total)}
          <br />
          <b className="pe-4">Recieved : </b>
          {Math.round(total)}
        </div>
      </div>
      <div className="border-bottom p-2 border-dark w-100 text-center">
        <b>
          {total && toWords(Math.round(total)).slice(0, 1).toUpperCase() +
            toWords(Math.round(total)).slice(1) +
            " Rupees only"}
        </b><br/>
      <div className="mt-5 text-start">
        <br/>*നനർമമണ പപപകനയയനൽ എനനങനലലല തകരമരലകളളനണങനൽ വസപതങൾ ഉപയയമഗനകമനത 10
        ദനവസതനനകല ബനൽ സഹനതല നകമണണ വനല മമറന വമയങണതമണ <br/><br/><br/>* മടകണ നനവർതനയതലല ഫനനനഷനങ
        നഷനപടതലമമയ വസപതങൾ യമനതമരല കരണവശമലലല മമറന നൽകലനതലല. ചനല ഡമർകണ കളറലകൾ
        വനയർപനൽ ശരരരതനൽ പനടന കലവമൻ സമധധതയലണണ, ഇവയകണ ഗധമരണന ഇലല <br/><br/><br/>* ഡപഡകരൻ നനർയദശനച
        വസപതങൾ ഡമയമജ വനമൽ തനരനനചടലകലനതലല. <br/><br/><br/>*ഡമർകണ നഷയയ വസപതങളളനട യമൽ ചമയല ഇളകമൻ
        സമധധതയലണണ. ഡലറണ വമഷ നചയയ തണലനൽ ഉണകലക <br/><br/><br/>*ആൾയപടഷൻ നചയത വസപതങൾ
        തനരനനചടലകലനകലനതലല. <br/><br/><br/>*തയചള കഴനഞ ഷർടണ ബനറളകൾ തനരനനചടലകലനതലല. <br/><br/><br/>*അടനവസപതങൾ
        യമനതമരല കമരണവശമലലല മമറനനകമടലകലനയതമ തനരനനച ടലകലനയതമ അലല <br/><br/><br/>*വനറ സമധനതനനനറ
        വനല പണമമയന തനരനചള നൽകലനതല
      </div>
      </div>
    </div>
  );
};
