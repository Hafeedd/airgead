import React, { useEffect, useState } from 'react'
import './profile.css'
import User from '../../assets/icons/prof.jpeg'
import { FaUser } from "react-icons/fa";
import { BsBuildings } from "react-icons/bs";
import { MdPhone } from "react-icons/md";
import { GrMail } from "react-icons/gr";
import { GrEdit } from "react-icons/gr";
import { Form } from 'react-bootstrap';
import { PiLockKeyBold } from "react-icons/pi";


export const Profile = () => {
    const [user, setUser] = useState({})
    const [passActive, setPassActive] = useState(false)
    const [activeProfTab, setActiveProfTab] = useState('additional')

    // const getData = async () =>{
    //     try{
    //         var resp = await 
    //     }catch(err){}
    // }

    useEffect(()=>{
        if(activeProfTab){
            document.getElementById(activeProfTab)
            .scrollIntoView({ behavior: "smooth" });
        }
    },[activeProfTab])

    return (
        <div className='p-3 px-4'>
            <div className="profile gap-3 rounded-3">
                <div className="prof-top rounded-top-3">
                </div>
                <div className='prof-cont1 rounded-3'>
                    <div className='prof-cont1-top'></div>
                    <img className='rounded-3 prof-user-icon' src={User} alt='prof' />
                    <h4 className='my-1'>Davis Doopli</h4>
                    <div>Admin</div>
                    <div className='d-flex gap-3 mt-4 flex-column mb-4'>
                        <div className='d-flex gap-3'><FaUser size='1.5rem' />@Davis Doop</div>
                        <div className='d-flex gap-3'><BsBuildings size='1.5rem' />Company Name</div>
                        <div className='d-flex gap-3'><MdPhone size='1.5rem' />+54782343</div>
                        <div className='d-flex gap-3'><GrMail size='1.5rem' />Davis@gmail.com</div>
                    </div>
                </div>
                <div className="prof-cont2 rounded-3 p-1 pt-0 position-relative">
                    <div className='border-bottom prof-tab-cont pt-3 pb-1 px-3 d-flex gap-4'>
                        <div onClick={() => setActiveProfTab('additional')}
                            className={`prof-tab ${activeProfTab === 'additional' && 'active'}`}>
                            Account Details
                        </div>
                        <div onClick={() => setActiveProfTab('security')}
                            className={`prof-tab ${activeProfTab === 'security' && 'active'}`}>
                            Security
                        </div>
                    </div>
                    <div id='additional'  className='px-4 pt-5'>
                        <div className='d-flex gap-3'>
                            <div className='prof-pill-buttons'>
                                <div>Renewal Date</div>
                                <div>15/06/2023</div>
                            </div>
                            <div className='prof-pill-buttons'>
                                <div>Renewal Time</div>
                                <div>15/06/2023</div>
                            </div>
                            <div className='prof-pill-buttons'>
                                <div>Staff Limit</div>
                                <div>10 P</div>
                            </div>
                        </div>
                        <div className='pt-4 w-100 d-flex align-items-end'>
                            <h3 className='m-0'>Additional</h3>
                            <hr className='w-100 m-0 mb-1 mx-2' />
                            <div className='prof-edit-btn'><GrEdit size='1.7rem' /> Edit</div>
                        </div>
                        <div className='w-100'>
                            <div className='prof-det-field1 d-flex w-100'>
                                <Form.Group className='code-conf-input-cont w-100'>
                                    <Form.Label>Address Line1</Form.Label>
                                    <Form.Control
                                        className='purchase-select code-conf'
                                        as="textarea" rows={3}
                                    />
                                </Form.Group>
                                <Form.Group className='code-conf-input-cont w-100'>
                                    <Form.Label>Address Line2</Form.Label>
                                    <Form.Control
                                        className='purchase-select code-conf'
                                        as="textarea" rows={3}
                                    />
                                </Form.Group>
                            </div>
                            <div className='prof-det-field1 pt-0'>
                                <Form.Group className='code-conf-input-cont w-100'>
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control
                                        className='purchase-select code-conf'
                                        type='text'
                                    />
                                </Form.Group>
                                <Form.Group className='code-conf-input-cont w-100'>
                                    <Form.Label>State</Form.Label>
                                    <Form.Control
                                        className='purchase-select code-conf'
                                        type='text'
                                    />
                                </Form.Group>
                                <Form.Group className='code-conf-input-cont w-100'>
                                    <Form.Label>District</Form.Label>
                                    <Form.Control
                                        className='purchase-select code-conf'
                                        type='text'
                                    />
                                </Form.Group>
                            </div>
                            <div className="prof-det-field1 pt-0">
                                <Form.Group className='code-conf-input-cont w-100'>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        className='purchase-select code-conf'
                                        type='text'
                                    />
                                </Form.Group>
                                <Form.Group className='code-conf-input-cont w-100'>
                                    <Form.Label>PIN Code</Form.Label>
                                    <Form.Control
                                        className='purchase-select code-conf'
                                        type='text'
                                    />
                                </Form.Group>
                                <Form.Group className='code-conf-input-cont w-100'>
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control
                                        className='purchase-select code-conf'
                                        type='text'
                                    />
                                </Form.Group>
                            </div>
                            <div className='pt-4 w-100 d-flex align-items-end'>
                                <h3 id='security' className='m-0'>Security</h3>
                                <hr className='w-100 m-0 mb-1 mx-2' />
                            </div>
                            <h3 className='fw-500'>Password Change</h3>
                            <div className='px-3'>
                                <div className={`prof-pass-cont ${passActive && 'active'} row mx-0 align-items-end`}>
                                    <Form.Group className='code-conf-input-cont col-8 mb-0'>
                                        <Form.Label>Current Password</Form.Label>
                                        <Form.Control
                                            className='purchase-select code-conf'
                                            type='text'
                                        />
                                    </Form.Group>
                                    <div className='prof-pass-change-btn col-3' onClick={() => setPassActive(!passActive)}>
                                        <PiLockKeyBold size='1.5rem' />
                                        Change Password
                                    </div>
                                    <Form.Group className='code-conf-input-cont col-8 mb-0 pt-2'>
                                        <Form.Label>New Password</Form.Label>
                                        <Form.Control
                                            className='purchase-select code-conf'
                                            type='text'
                                        />
                                    </Form.Group>
                                    <Form.Group className='code-conf-input-cont col-8 mb-2 pt-2'>
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control
                                            className='purchase-select code-conf'
                                            type='text'
                                        />
                                    </Form.Group>
                                    <div className='col-6 ms-4' />
                                    <button className='prof-pass-change-submit-btn'>Set Password</button>
                                </div>
                                <div className='pt-4 row mx-0'>
                                    <h3>Security Questions</h3>
                                    <Form.Group className='code-conf-input-cont col-8 mb-2 pt-2'>
                                        <Form.Label className='fs-5'>Question1 & Answers</Form.Label>
                                        <Form.Control
                                            className='purchase-select code-conf'
                                            type='text'
                                        />
                                    </Form.Group>
                                    <div className='col-6 ms-4' />
                                    <Form.Group className='code-conf-input-cont col-8 mb-2 pt-1'>
                                        <Form.Control
                                            className='purchase-select code-conf'
                                            as='textarea' rows={3}
                                        />
                                    </Form.Group>
                                    <div className='col-6 ms-4' />
                                    <Form.Group className='code-conf-input-cont col-8 mb-2 pt-3'>
                                        <Form.Label className='fs-5'>Question1 & Answers</Form.Label>
                                        <Form.Control
                                            className='purchase-select code-conf'
                                            type='text'
                                        />
                                    </Form.Group>
                                    <div className='col-6 ms-4' />
                                    <Form.Group className='code-conf-input-cont col-8 mb-2 pt-1'>
                                        <Form.Control
                                            className='purchase-select code-conf'
                                            as='textarea' rows={3}
                                        />
                                    </Form.Group>
                                    <div className='col-6 ms-4' />
                                    <Form.Group className='code-conf-input-cont col-8 mb-2 pt-3'>
                                        <Form.Label className='fs-5'>Question1 & Answers</Form.Label>
                                        <Form.Control
                                            className='purchase-select code-conf'
                                            type='text'
                                        />
                                    </Form.Group>
                                    <div className='col-6 ms-4' />
                                    <Form.Group className='code-conf-input-cont col-8 mb-0 pt-1'>
                                        <Form.Control
                                            className='purchase-select code-conf'
                                            as='textarea' rows={3}
                                        />
                                    </Form.Group>
                                    <div className='col-3 col-4 gap-4 ms-1 d-flex align-items-end'>
                                        <div className='prof-edit-btn'><GrEdit size='1.7rem' /> Edit</div>
                                        <div className='prof-pass-change-submit-btn'>Add More</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}