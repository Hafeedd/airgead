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
import { useUserServices } from '../../services/controller/userServices';
import Swal from 'sweetalert2';
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import uploadImage from "../../assets/icons/image-upload.png";
import { MdOutlineFileUpload } from "react-icons/md";
import { MEDIA_URL } from '../../api/axios';

export const Profile = () => {
    const [user, setUser] = useState({})
    const [userProfile, setUserProfile] = useState({})
    const [companyDetails,setCompanyDetails] = useState({})

    const [passActive, setPassActive] = useState(false)
    const [activeProfTab, setActiveProfTab] = useState('additional')

    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] =useState()

    const initialQAPairs = [{ question: '', answer: '' }, { question: '', answer: '' }, { question: '', answer: '' }];
    const [qaPairs, setQAPairs] = useState(initialQAPairs);

    const {getUserProfile,postSetPassword,postSecurityQuestions,getSecurityQuestions}=useUserServices()

    const getData = async () =>{
        try{
            const resp = await getUserProfile ()
            if (resp.success === true) {
                setUser(resp.data)
                setUserProfile(resp.data.user_profile)
                setCompanyDetails(resp.data.company_details)
            }
        }catch(err){ console.log(err) }
    }
    const [isVisible, setIsVisible] = useState(true);

    const toggleVisibility = () => {
      setIsVisible(!isVisible);
    };
    const [isVisible2, setIsVisible2] = useState(true);

    const toggleVisibility2 = () => {
      setIsVisible2(!isVisible2);
    };
    const getSecurity = async () =>{
        try{
            const resp=await getSecurityQuestions()
            if (resp.success === true) {
                let tempList=[]
                resp.data.map(item=>{
                    let a
                    if (item.question && item.answer){
                        a={'id':item.id,'question':item.question, 'answer':item.answer}
                        tempList.push(a)
                    } 
                })
                setQAPairs(tempList)
                }
        }catch(err){ console.log(err) }
    }
    useEffect (()=>{
        getData()
        getSecurity()
    },[])

    console.log("data loaded",user)

    useEffect(()=>{
        if(activeProfTab){
            document.getElementById(activeProfTab)
            .scrollIntoView({ behavior: "smooth" });
        }
    },[activeProfTab])

    const handleSetPassword = async () =>{
        if (password === confirmPassword){
            try{
                const resp = await postSetPassword({'password':password})
                if (resp.success === true){
                    Swal.fire({
                        title: "Success",
                        text: resp?.message,
                        icon: "success",
                        timer: 1000,
                        showConfirmButton: false,
                    });
                    setPassword()
                    setConfirmPassword()
                }
            } catch(err){
                Swal.fire({
                    title: "Failed",
                    text: err?.response?.data?.error,
                    icon: "error",
                    timer: 1000,
                    showConfirmButton: false,
                });
            }
        } else{
            Swal.fire({
                title: "Password Mismatch",
                text: "please try again",
                icon: "info",
                timer: 1000,
                showConfirmButton: false,
            });
        }
    }

    const handleInputChange = (index, event, field) => {
        const newQAPairs = [...qaPairs];
        newQAPairs[index][field] = event.target.value;
        setQAPairs(newQAPairs);
    };

    const handleAddMore = () => {
        setQAPairs([...qaPairs, { question: '', answer: '' }]);
    };

    const handleSecuritySubmit = async() => {
        // console.log('hoi hoi',qaPairs)
        try{
            const resp = await postSecurityQuestions({'questions':qaPairs})
            if (resp.success === true){
                Swal.fire({
                    title: "Success",
                    text: resp?.message,
                    icon: "success",
                    timer: 1000,
                    showConfirmButton: false,
                });
            }
        }catch(e){
            Swal.fire({
                title: 'Error',
                text: e.error,
                icon: "error",
                timer: 1000,
                showConfirmButton: false,
            });
        }
        // console.log({"questions":qaPairs});
    };

    const handleQaRemove = (index) => {
        const newQAPairs = [...qaPairs];
        newQAPairs.length>3 && newQAPairs.splice(index, 1) 
        setQAPairs(newQAPairs);
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (value === " ") setUser((data) => ({ ...data, [name]: null }));
        else setUser((data) => ({ ...data, [name]: value }));
    };

    const handleCDchange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const files = e.target?.files || null;
        if (name === 'logo' && files?.length > 0) {
          const imageUrl = URL.createObjectURL(files[0]);
          setCompanyDetails((data) => ({ ...data, logo: files[0], logo_url: imageUrl }))
        }else if (value === " ") setCompanyDetails((data) => ({ ...data, [name]: null }));
        else setCompanyDetails((data) => ({ ...data, [name]: value }));
      };
    
    
    const handleUPchange =(e) =>{
        const name = e.target.name;
        const value = e.target.value;
        const files = e.target?.files || null;
        if (name === 'image' && files?.length > 0) {
            const imageUrl = URL.createObjectURL(files[0]);
            setUserProfile((data) => ({ ...data, image: files[0], image_url: imageUrl }))
        }else if (value === " ") setUserProfile((data) => ({ ...data, [name]: null }));
        else setUserProfile((data) => ({ ...data, [name]: value }));
    };

    return (
        <div className='p-3 px-4'>
            <div className="profile gap-3 rounded-3">
                <div className="prof-top rounded-top-3">
                </div>
                <div className='prof-cont1 rounded-3'>
                    <div className='prof-cont1-top'></div>
                    <img className='rounded-3 prof-user-icon' src={user?.image != null?user?.image:User} alt='prof' />
                    <h4 className='my-1'>{user?.full_name}</h4>
                    <div>Admin</div>
                    <div className='d-flex gap-3 mt-4 flex-column mb-4'>
                        <div className='d-flex gap-3'><FaUser size='1.5rem' />@{user?.username}</div>
                        <div className='d-flex gap-3'><BsBuildings size='1.5rem' />{user?.company_details?.group_name}</div>
                        <div className='d-flex gap-3'><MdPhone size='1.5rem' />+{user?.mobile}</div>
                        <div className='d-flex gap-3'><GrMail size='1.5rem' />{user?.email}</div>
                    </div>
                </div>
                <div className="prof-cont2 rounded-3 p-1 pt-0 position-relative">
                    <div className='border-bottom prof-tab-cont pt-3 pb-1 px-3 d-flex gap-4 acs' >
                        <div onClick={() => setActiveProfTab('additional')}
                            className={`prof-tab ${activeProfTab === 'additional' && 'active'}`}>
                            My Account Details
                        </div>
                        <div onClick={() => setActiveProfTab('companydetails')}
                            className={`prof-tab ${activeProfTab === 'companydetails' && 'active'}`}>
                            Company Details
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
                                <div>{new Date(user?.company_details?.plan_details?.renewal_date) && new Date(user?.company_details?.plan_details?.renewal_date).getDate() +'-'+ (new Date(user?.company_details?.plan_details?.renewal_date).getMonth()+1) +'-'+ new Date(user?.company_details?.plan_details?.renewal_date).getFullYear()}</div>
                            </div>
                            <div className='prof-pill-buttons'>
                                <div>Renewal Time</div>
                                <div>{user?.company_details?.plan_details?.renewal_time}</div>
                            </div>
                            <div className='prof-pill-buttons'>
                                <div>Staff Limit</div>
                                <div>{user?.company_details?.plan_details?.staff_limit}</div>
                            </div>
                        </div>
                        <div className='pt-4 w-100 d-flex align-items-end'>
                            <h3 className='m-0'>Account Details</h3>
                            <hr className='w-100 m-0 mb-1 mx-2' />
                            <div className='prof-edit-btn' onClick={toggleVisibility}><GrEdit size='1.4rem' /> Edit</div>
                        </div>
                        <div className='w-100'>
                        {isVisible==false && <>
                        <div className='d-flex'>
                                <div className='d-flex w-50 justify-content-start align-items-center ps-5'>
                                    <div className="image-cont">
                                        <img
                                            className="company-details-company-logo"
                                            src={user?.image ? MEDIA_URL+user.image:uploadImage}
                                            alt="upload-image"
                                        />
                                    </div>
                                    <input
                                        onChange=''
                                        name="image"
                                        type="file"
                                        className='d-none'
                                        id="company-logo"
                                    />
                                    <label htmlFor="company-logo" className="image-upload-btn border-2">
                                    <MdOutlineFileUpload className="me-2 p-0" size={"1.5rem"} />
                                    Upload Image
                                    </label>
                                </div>
                                <div className=' prof-det-field1  d-flex flex-column w-50'>
                                    <Form.Group className='code-conf-input-cont w-100 ps-4'>
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control
                                            className='purchase-select code-conf'
                                            type='text'
                                            value={user?.first_name}
                                        />
                                    </Form.Group>
                                    <Form.Group className='code-conf-input-cont w-100 ps-4'>
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            className='purchase-select code-conf'
                                            type='text'
                                            value={user?.last_name}
                                        />
                                    </Form.Group>
                                </div>
                                
                            </div>
                            <div className='prof-det-field1 d-flex w-100'>
                                <Form.Group className='code-conf-input-cont w-100'>
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        className='purchase-select code-conf'
                                        type='text'
                                        value={user?.mobile}
                                    />
                                </Form.Group>
                                <Form.Group className='code-conf-input-cont w-100'>
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        className='purchase-select code-conf'
                                        type='text'
                                        value={user?.email}
                                    />
                                </Form.Group>
                            </div> </>}
                            <div className='prof-det-field1 d-flex w-100'>
                                <Form.Group className='code-conf-input-cont w-100'>
                                    <Form.Label>Address Line1</Form.Label>
                                    <Form.Control
                                        className='purchase-select code-conf'
                                        as="textarea" rows={3}
                                        value={userProfile?.address_line_1}
                                    />
                                </Form.Group>
                                <Form.Group className='code-conf-input-cont w-100'>
                                    <Form.Label>Address Line2</Form.Label>
                                    <Form.Control
                                        className='purchase-select code-conf'
                                        as="textarea" rows={3}
                                        value={userProfile?.address_line_2}
                                    />
                                </Form.Group>
                            </div>
                            <div className='prof-det-field1 pt-0'>
                                <Form.Group className='code-conf-input-cont w-100'>
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control
                                        className='purchase-select code-conf'
                                        type='text'
                                        value={userProfile?.country}
                                    />
                                </Form.Group>
                                <Form.Group className='code-conf-input-cont w-100'>
                                    <Form.Label>State</Form.Label>
                                    <Form.Control
                                        className='purchase-select code-conf'
                                        type='text'
                                        value={userProfile?.state}
                                    />
                                </Form.Group>
                                <Form.Group className='code-conf-input-cont w-100'>
                                    <Form.Label>District</Form.Label>
                                    <Form.Control
                                        className='purchase-select code-conf'
                                        type='text'
                                        value={userProfile?.district}
                                    />
                                </Form.Group>
                            </div>
                            <div className="prof-det-field1 pt-0">
                                <Form.Group className='code-conf-input-cont w-100'>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        className='purchase-select code-conf'
                                        type='text'
                                        value={userProfile?.city}
                                    />
                                </Form.Group>
                                <Form.Group className='code-conf-input-cont w-100'>
                                    <Form.Label>PIN Code</Form.Label>
                                    <Form.Control
                                        className='purchase-select code-conf'
                                        type='text'
                                        value={userProfile?.pincode}
                                        
                                    />
                                </Form.Group>
                                <Form.Group className='code-conf-input-cont w-100'></Form.Group>
                            
                            </div>
                            {isVisible==false && <div className="prof-det-field1 pt-0 d-flex justify-content-end align-items-center">
                                <div className='can-btn'>Cancel</div>
                                <div className='save-btn'>Save</div>                            
                            </div>}
                            <div className='pt-4 w-100 d-flex align-items-end'>
                                <h3 id='companydetails' className='m-0'>Company Details</h3>
                                <hr className='w-100 m-0 mb-1 mx-2' />
                                <div className='prof-edit-btn' onClick={toggleVisibility2}><GrEdit size='1.4rem' /> Edit</div>
                            </div>
                            {isVisible2==false && <>
                            <div className='d-flex'>
                                <div className='d-flex w-50 justify-content-start align-items-center ps-5'>
                                    <div className="image-cont">
                                        <img
                                            className="company-details-company-logo"
                                            src={companyDetails?.logo ? MEDIA_URL+user.company_details.logo: uploadImage}
                                            alt="upload-image"
                                        />
                                    </div>
                                    <input
                                        onChange=''
                                        name="logo"
                                        type="file"
                                        className='d-none'
                                        id="company-logo"
                                    />
                                    <label htmlFor="company-logo" className="image-upload-btn border-2">
                                    <MdOutlineFileUpload className="me-2 p-0" size={"1.5rem"} />
                                    Upload Image
                                    </label>
                                </div>
                                <div className=' prof-det-field1  d-flex flex-column w-50'>
                                    <Form.Group className='code-conf-input-cont w-100 ps-4'>
                                        <Form.Label>Company Name</Form.Label>
                                        <Form.Control
                                            className='purchase-select code-conf'
                                            type='text'
                                            value={companyDetails?.group_name}
                                        />
                                    </Form.Group>
                                    <Form.Group className='code-conf-input-cont w-100 ps-4'>
                                        <Form.Label>Location</Form.Label>
                                        <Form.Control
                                            className='purchase-select code-conf'
                                            type='text'
                                            value={companyDetails?.location}
                                        />
                                    </Form.Group>
                                </div>
                                
                            </div>
                   
                            </>}
                            <div className='prof-det-field1 d-flex w-100'>
                                <Form.Group className='code-conf-input-cont w-100'>
                                    <Form.Label>Address Line1</Form.Label>
                                    <Form.Control
                                        className='purchase-select code-conf'
                                        as="textarea" rows={3}
                                        value={companyDetails?.address_line_1}
                                    />
                                </Form.Group>
                                <Form.Group className='code-conf-input-cont w-100'>
                                    <Form.Label>Address Line2</Form.Label>
                                    <Form.Control
                                        className='purchase-select code-conf'
                                        as="textarea" rows={3}
                                        value={companyDetails?.address_line_2}
                                    />
                                </Form.Group>
                            </div>
                            <div className='prof-det-field1 pt-0'>
                                <Form.Group className='code-conf-input-cont w-100'>
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control
                                        className='purchase-select code-conf'
                                        type='text'
                                        value={companyDetails?.country}
                                    />
                                </Form.Group>
                                <Form.Group className='code-conf-input-cont w-100'>
                                    <Form.Label>State</Form.Label>
                                    <Form.Control
                                        className='purchase-select code-conf'
                                        type='text'
                                        value={companyDetails?.state}
                                    />
                                </Form.Group>
                                <Form.Group className='code-conf-input-cont w-100'>
                                    <Form.Label>District</Form.Label>
                                    <Form.Control
                                        className='purchase-select code-conf'
                                        type='text'
                                        value={companyDetails?.district}
                                    />
                                </Form.Group>
                            </div>
                            <div className="prof-det-field1 pt-0">
                                <Form.Group className='code-conf-input-cont w-100'>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        className='purchase-select code-conf'
                                        type='text'
                                        value={companyDetails?.city}
                                    />
                                </Form.Group>
                                <Form.Group className='code-conf-input-cont w-100'>
                                    <Form.Label>PIN Code</Form.Label>
                                    <Form.Control
                                        className='purchase-select code-conf'
                                        type='text'
                                        value={companyDetails?.pincode}
                                        
                                    />
                                </Form.Group>
                                <Form.Group className='code-conf-input-cont w-100'></Form.Group>
                        
                            </div>
                            {isVisible2==false && 
                            <div className="prof-det-field1 pt-0 d-flex justify-content-end align-items-center">
                                <div className='can-btn'>Cancel</div>
                                <div className='save-btn'>Save</div>                            
                            </div>}
                            <div className='pt-4 w-100 d-flex align-items-end'>
                                <h3 id='security' className='m-0'>Security</h3>
                                <hr className='w-100 m-0 mb-1 mx-2' />
                            </div>
                            <h3 className='fw-500'>Password Change</h3>
                            <div className='px-3'>
                                <div className={`prof-pass-cont ${passActive && 'active'} row mx-0 align-items-end`}>
                                    <div className='row my-3'>
                                    <div className='prof-pass-change-btn col-3' onClick={() => setPassActive(!passActive)}>
                                        <PiLockKeyBold size='1.5rem' />
                                        Change Password
                                    </div>
                                    
                                    </div>
                                    
                                    <Form.Group className='code-conf-input-cont col-8 mb-0 pt-2'>
                                        <Form.Label>New Password</Form.Label>
                                        <Form.Control
                                            className='purchase-select code-conf'
                                            type='password'
                                            style={{'textTransform':'none'}}
                                            value={password}
                                            onChange={(e)=>setPassword(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group className='code-conf-input-cont col-8 mb-2 pt-2'>
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control
                                            className='purchase-select code-conf'
                                            style={{'textTransform':'none'}}
                                            type='text'
                                            value={confirmPassword}
                                            onChange={(e)=>setConfirmPassword(e.target.value)}
                                        />
                                    </Form.Group>
                                    <div className='col-6 col-7 ms-4' />
                                    <button className='prof-pass-change-submit-btn mt-3' onClick={handleSetPassword}>Set Password</button>
                                </div>
                                <div className='pt-4 row mx-0'>
                                    <h3>Security Questions</h3>
                                        {qaPairs.map((pair, index) => (
                                                        <div key={index} className='row'>
                                                            <div className='col-6 ms-4' />
                                                            <Form.Group className='code-conf-input-cont col-8 mb-2 pt-3'>
                                                                <Form.Label className='fs-5'>Security Question {index +1} </Form.Label> {qaPairs.length>3 && <RiDeleteBin6Line size='1.3rem' className='ms-2 text-danger' onClick={()=>handleQaRemove(index)}/>}
                                                                <Form.Control
                                                                    className='purchase-select code-conf'
                                                                    type='text'
                                                                    style={{'textTransform':'none'}}
                                                                    placeholder='question :'
                                                                    value={pair.question}
                                                                    onChange={(e) => handleInputChange(index, e, 'question')}
                                                                />
                                                            </Form.Group>
                                                            <div className='col-6 ms-4' />
                                                            <Form.Group className='code-conf-input-cont col-8 mb-0 pt-1'>
                                                                <Form.Control
                                                                    className='purchase-select code-conf'
                                                                    type='text'
                                                                    style={{'textTransform':'none'}}
                                                                    placeholder='answer :'
                                                                    value={pair.answer}
                                                                    onChange={(e) => handleInputChange(index, e, 'answer')}
                                                                />
                                                            </Form.Group>
                                                        </div>
                                        ))} 
                                        <div className='col-8 gap-3 mt-3 pe-4 d-flex align-items-center justify-content-end'>
                                            <div className='prof-edit-btn' onClick={handleSecuritySubmit}><IoShieldCheckmarkOutline  size='2rem' />Submit</div>
                                            <div className='prof-pass-change-submit-btn me-1' onClick={handleAddMore}>Add More</div>
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