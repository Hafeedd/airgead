import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import styled from 'styled-components';

const CashBookAccordion = () => {

    const CustomAccordionHeader = styled(Accordion.Header)`
  background-color: lightblue; 
`;

const CustomAccordionBody = styled(Accordion.Body)`
  background-color: lightgreen; /* Change this color to your desired body background color */
  /* Add more styles for the body as needed */
`;
    return (
        <>
            <Accordion defaultActiveKey="0" flush className=' m-0 p-0'>
                <Accordion.Item eventKey="0" className='m-0 p-0'  >
                    <CustomAccordionHeader  className='cashbook-accordion-header bg-info'>Ledger Name : CASH IN HAND</CustomAccordionHeader>
                    <Accordion.Body className='m-0 p-0'>
                        <tr className='cashbook-accordion-tr' >
                            <td className='cashbook-table-row cashbook-accordion-tr m-0 p-0 pt-3'>
                                <ul className='d-flex justify-content-between mx-4 ' >
                                    <li className='m' >24/11/2023</li>
                                    <li className='ms-5'>Opening Balance</li>
                                    <li className='me-5 pe-3' >100056</li>
                                </ul>
                            </td>
                        </tr>

                        <tr className='cashbook-table-data cashbook-accordion-tr text-black'>
                            <td className='cashbook-accordion-tr m-0 p-0 pt-3'>
                                <ul className='d-flex justify-content-between '>
                                    <li>Date</li>
                                    <li>Doc No</li>
                                    <li>Ac Name</li>
                                    <li>Narration</li>
                                    <li>Debit</li>
                                    <li>Credit</li>
                                    <li>Balance</li>
                                </ul>
                            </td>
                        </tr>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Accordion Item #2</Accordion.Header>
                    <Accordion.Body>
                        hai
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

        </>
    )
}

export default CashBookAccordion