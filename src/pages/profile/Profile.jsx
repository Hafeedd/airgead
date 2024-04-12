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

    const {getUserProfile,postSetPassword,postSecurityQuestions,getSecurityQuestions,putUserProfile,putCompanyDetails}=useUserServices()

    const getData = async () =>{
        try{
            const resp = await getUserProfile ()
            if (resp.success === true) {
                // console.log("Look",resp.data)
                const userData = resp?.data
                let tempUser = {
                    first_name: userData.first_name,
                    last_name: userData.last_name,
                    mobile: userData.mobile,
                    email: userData.email,
                    image: userData.image,
                    fk_role: userData.fk_role,
                    full_name: userData.full_name,
                    username: userData.username,
                }
                setUser(tempUser)

                const profileData = resp?.data?.user_profile
                let tempProfile = {
                    address_line_1: profileData.address_line_1,
                    address_line_2: profileData.address_line_2,
                    country: profileData.country,
                    state: profileData.state,
                    district: profileData.district,
                    city: profileData.city,
                    pincode: profileData.pincode,
                }
                setUserProfile(tempProfile);
                
                const compData = resp?.data?.company_details
                let tempComp = {
                    address_line_1: compData.address_line_1,
                    address_line_2: compData.address_line_2,
                    country: compData.country,
                    state: compData.state,
                    district: compData.district,
                    city: compData.city,
                    pincode: compData.pincode,
                    logo: compData.logo,
                    location: compData.location,
                    group_name: compData.group_name,
                    renewal_date:compData?.plan_details?.renewal_date,
                    renewal_time:compData?.plan_details?.renewal_time,
                    staff_limit: compData?.plan_details?.staff_limit,
                };   
                setCompanyDetails(tempComp);
                
            }
        }catch(err){ console.log(err) }
    }

    // console.log('user',user)
    // console.log('user_profile',userProfile)
    // console.log('company_details',companyDetails)

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
                
                // console.log(resp.data,'security')
                if (resp.data.length<1){
                    setQAPairs(initialQAPairs)
                }else{
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
                }
        }catch(err){ console.log(err) }
    }

    // console.log(qaPairs,'questions')
    useEffect (()=>{
        getData()
        getSecurity()
    },[])

    // console.log("data loaded",user)

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
                getSecurity()
            }
        }catch(e){
            Swal.fire({
                title: 'Error',
                text: e.response.data.message,
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

    const handleCompanyDetailSubmit = async(e)=>{
        e.preventDefault()
        try{
            let tempCompanyDetails = {...companyDetails}
            for (const [key, value] of Object.entries(companyDetails)) {
              if (value === 0 || value === null || value === undefined) {
                delete tempCompanyDetails[key];
              }
            }
            const CompanyData = new FormData();
            // Object.keys(tempUserProfile).map((data) =>
            // CompanyData.append(data, companyDetails[data])
            // );
            Object.keys(tempCompanyDetails).forEach((data) => {
                if (data !== 'logo') {
                    CompanyData.append(data, companyDetails[data]);
                }
            });
    
            // Check if logo has been changed
            if (companyDetails.logo && companyDetails.logo_url) {
                CompanyData.append('logo', companyDetails.logo);
                CompanyData.append('logo_url', companyDetails.logo_url);
            }
            const resp= await putCompanyDetails(CompanyData)
            if (resp?.success){
                Swal.fire({
                    title: "Success",
                    text: resp?.message,
                    icon: "success",
                    timer: 1000,
                    showConfirmButton: false,
                });
                getData() 
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
       

    }
    const handleMyDetailsSubmit = async(e) =>{
        e.preventDefault()
        try{
            let tempUserProfile = {...user}
            for (const [key, value] of Object.entries(user)) {
              if (value === 0 || value === null || value === undefined) {
                delete tempUserProfile[key];
              }
            }
            const UserProfileData = new FormData();
            // Object.keys(tempUserProfile).map((data) =>
            // UserProfileData.append(data, user[data])
            // );
            Object.keys(tempUserProfile).forEach((data) => {
                if (data !== 'image') {
                    UserProfileData.append(data, user[data]);
                }
            });
    
            // Check if logo has been changed
            if (user.image && user.image_url) {
                UserProfileData.append('image', user.image);
                UserProfileData.append('image_url', user.image_url);
            }
            UserProfileData.append('address_line_1',userProfile.address_line_1)
            UserProfileData.append('address_line_2',userProfile?.address_line_2)
            UserProfileData.append('country',userProfile?.country)
            UserProfileData.append('state',userProfile?.state)
            UserProfileData.append('district',userProfile?.district)
            UserProfileData.append('city',userProfile?.city)
            UserProfileData.append('pincode',userProfile?.pincode)
    
            const resp = await putUserProfile(UserProfileData)
            if (resp?.success){
                Swal.fire({
                    title: "Success",
                    text: resp?.message,
                    icon: "success",
                    timer: 1000,
                    showConfirmButton: false,
                });
                getData() 
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
    }

    const handleUserChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const files = e.target?.files || null;
        if (name === 'image' && files?.length > 0) {
            const imageUrl = URL.createObjectURL(files[0]);
            console.log("hoi",imageUrl,files[0])
            setUser((data) => ({ ...data, image: files[0], image_url: imageUrl }))
        }else if (value === " ") setUser((data) => ({ ...data, [name]: null }));
        else setUser((data) => ({ ...data, [name]: value }));
    };

    const handleCompDchange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const files = e.target?.files || null;
        if (name === 'logo' && files?.length > 0) {
          const imageUrl = URL.createObjectURL(files[0]);
        //   console.log("hoi",imageUrl,files[0])
          setCompanyDetails((data) => ({ ...data, logo: files[0], logo_url: imageUrl }))
        }else if (value === " ") setCompanyDetails((data) => ({ ...data, [name]: null }));
        else setCompanyDetails((data) => ({ ...data, [name]: value }));
    };
        
    const handleUserPchange =(e) =>{
        const name = e.target.name;
        const value = e.target.value;
        if (value === " ") setUserProfile((data) => ({ ...data, [name]: null }));
        else setUserProfile((data) => ({ ...data, [name]: value }));
    };

    return (
        <div className='p-3 px-4'>
            <div className="profile gap-3 rounded-3">
                <div className="prof-top rounded-top-3">
                </div>
                <div className='prof-cont1 rounded-3'>
                    <div className='prof-cont1-top'></div>
                    <img className='rounded-3 prof-user-icon' src={user?.image?MEDIA_URL+user?.image:User} alt='prof' />
                    <h4 className='my-1'>{user?.full_name}</h4>
                    <div>{"Admin"||user.fk_role.role}</div>
                    <div className='d-flex gap-3 mt-4 flex-column mb-4'>
                        <div className='d-flex gap-3'><FaUser size='1.5rem' />@{user?.username}</div>
                        <div className='d-flex gap-3'><BsBuildings size='1.5rem' />{companyDetails?.group_name}</div>
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
                                <div>{new Date(companyDetails?.renewal_date) && new Date(companyDetails?.renewal_date).getDate() +'-'+ (new Date(companyDetails?.renewal_date).getMonth()+1) +'-'+ new Date(companyDetails?.renewal_date).getFullYear()}</div>
                            </div>
                            <div className='prof-pill-buttons'>
                                <div>Renewal Time</div>
                                <div>{companyDetails?.renewal_time||''}</div>
                            </div>
                            <div className='prof-pill-buttons'>
                                <div>Staff Limit</div>
                                <div>{companyDetails?.staff_limit||''}</div>
                            </div>
                        </div>
                        <div className='pt-4 w-100 d-flex align-items-end'>
                            <h3 className='m-0'>Account Details</h3>
                            <hr className='w-100 m-0 mb-1 mx-2' />
                            <div className='prof-edit-btn' onClick={toggleVisibility}><GrEdit size='1.4rem' /> Edit</div>
                        </div>
                        <div className='w-100'>
                        <form onSubmit={handleMyDetailsSubmit}>
                        {isVisible==false && <>
                        <div className='d-flex'>
                                <div className='d-flex w-50 justify-content-start align-items-center ps-5'>
                                    <div className="image-cont">
                                        <img
                                            className="company-details-company-logo"
                                            src={user?.image ? MEDIA_URL+user.image:uploadImage}
                                            // alt="upload-image"
                                            width='100'
                                            height='100'
                                        />
                                    </div>
                                    <input
                                        onChange={handleUserChange}
                                        name="image"
                                        type="file"
                                        className='d-none'
                                        id="company-logo"
                                    />
                                    <label htmlFor="company-logo" className="image-upload-btn profile border-2">
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
                                            value={user?.first_name||''}
                                            name='first_name'
                                            onChange={handleUserChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className='code-conf-input-cont w-100 ps-4'>
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            className='purchase-select code-conf'
                                            type='text'
                                            value={user?.last_name||''}
                                            name='last_name'
                                            onChange={handleUserChange}
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
                                        value={user?.mobile||''}
                                        name='mobile'
                                        onChange={handleUserChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className='code-conf-input-cont w-100'>
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        className='purchase-select code-conf'
                                        type='text'
                                        value={user?.email||''}
                                        name='email'
                                        onChange={handleUserChange}
                                        required
                                    />
                                </Form.Group>
                            </div> </>}
                            <div className='prof-det-field1 d-flex w-100'>
                                <Form.Group className='code-conf-input-cont w-100'>
                                    <Form.Label>Address Line1</Form.Label>
                                    <Form.Control
                                        className='purchase-select code-conf'
                                        as="textarea" rows={3}
                                        value={userProfile?.address_line_1||''}
                                        name='address_line_1'
                                        onChange={handleUserPchange}
                                    />
                                </Form.Group>
                                <Form.Group className='code-conf-input-cont w-100'>
                                    <Form.Label>Address Line2</Form.Label>
                                    <Form.Control
                                        className='purchase-select code-conf'
                                        as="textarea" rows={3}
                                        value={userProfile?.address_line_2||''}
                                        name='address_line_2'
                                        onChange={handleUserPchange}
                                    />
                                </Form.Group>
                            </div>
                            <div className='prof-det-field1 pt-0'>
                                <Form.Group className='code-conf-input-cont w-100'>
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control
                                        className='purchase-select code-conf'
                                        type='text'
                                        value={userProfile?.country||''}
                                        name='country'
                                        onChange={handleUserPchange}
                                    />
                                </Form.Group>
                                <Form.Group className='code-conf-input-cont w-100'>
                                    <Form.Label>State</Form.Label>
                                    <Form.Control
                                        className='purchase-select code-conf'
                                        type='text'
                                        value={userProfile?.state||''}
                                        name='state'
                                        onChange={handleUserPchange}
                                    />
                                </Form.Group>
                                <Form.Group className='code-conf-input-cont w-100'>
                                    <Form.Label>District</Form.Label>
                                    <Form.Control
                                        className='purchase-select code-conf'
                                        type='text'
                                        value={userProfile?.district||''}
                                        name='district'
                                        onChange={handleUserPchange}
                                    />
                                </Form.Group>
                            </div>
                            <div className="prof-det-field1 pt-0">
                                <Form.Group className='code-conf-input-cont w-100'>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        className='purchase-select code-conf'
                                        type='text'
                                        value={userProfile?.city||''}
                                        name='city'
                                        onChange={handleUserPchange}
                                    />
                                </Form.Group>
                                <Form.Group className='code-conf-input-cont w-100'>
                                    <Form.Label>PIN Code</Form.Label>
                                    <Form.Control
                                        className='purchase-select code-conf'
                                        type='text'
                                        value={userProfile?.pincode||''}
                                        name='pincode'
                                        onChange={handleUserPchange}
                                        
                                    />
                                </Form.Group>
                                <Form.Group className='code-conf-input-cont w-100'></Form.Group>
                            
                            </div>
                            {isVisible==false && <div className="prof-det-field1 pt-0 d-flex justify-content-end align-items-center">
                                <div className='can-btn'>Cancel</div>
                                <button className='save-btn border-0' type='submit'>Save</button>                            
                            </div>}
                            </form>

                            <div className='pt-4 w-100 d-flex align-items-end'>
                                <h3 id='companydetails' className='m-0'>Company Details</h3>
                                <hr className='w-100 m-0 mb-1 mx-2' />
                                <div className='prof-edit-btn' onClick={toggleVisibility2}><GrEdit size='1.4rem' /> Edit</div>
                            </div>
                            <form onSubmit={handleCompanyDetailSubmit}>
                            {isVisible2==false && <>
                            <div className='d-flex'>
                                <div className='d-flex w-50 justify-content-start align-items-center ps-5'>
                                    <div className="image-cont">
                                        <img
                                            className="company-details-company-logo"
                                            src={companyDetails?.logo ? MEDIA_URL+companyDetails.logo: uploadImage}
                                            // alt="upload-image"
                                            width='100'
                                            height='100'
                                        />
                                    </div>
                                    <input
                                        onChange={handleCompDchange}
                                        name="logo"
                                        type="file"
                                        className='d-none'
                                        id="company-logo"
                                    />
                                    <label htmlFor="company-logo" className="image-upload-btn profile border-2">
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
                                            value={companyDetails?.group_name||''}
                                            name='group_name'
                                            onChange={handleCompDchange}
                                        />
                                    </Form.Group>
                                    <Form.Group className='code-conf-input-cont w-100 ps-4'>
                                        <Form.Label>Location</Form.Label>
                                        <Form.Control
                                            className='purchase-select code-conf'
                                            type='text'
                                            value={companyDetails?.location||''}
                                            name ='location'
                                            onChange={handleCompDchange}
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
                                        value={companyDetails?.address_line_1||''}
                                        name='address_line_1'
                                        onChange={handleCompDchange}
                                    />
                                </Form.Group>
                                <Form.Group className='code-conf-input-cont w-100'>
                                    <Form.Label>Address Line2</Form.Label>
                                    <Form.Control
                                        className='purchase-select code-conf'
                                        as="textarea" rows={3}
                                        value={companyDetails?.address_line_2||''}
                                        name='address_line_2'
                                        onChange={handleCompDchange}
                                    />
                                </Form.Group>
                            </div>
                            <div className='prof-det-field1 pt-0'>
                                <Form.Group className='code-conf-input-cont w-100'>
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control
                                        className='purchase-select code-conf'
                                        type='text'
                                        value={companyDetails?.country||''}
                                        name='country'
                                        onChange={handleCompDchange}
                                    />
                                </Form.Group>
                                <Form.Group className='code-conf-input-cont w-100'>
                                    <Form.Label>State</Form.Label>
                                    <Form.Control
                                        className='purchase-select code-conf'
                                        type='text'
                                        value={companyDetails?.state||''}
                                        name='state'
                                        onChange={handleCompDchange}
                                    />
                                </Form.Group>
                                <Form.Group className='code-conf-input-cont w-100'>
                                    <Form.Label>District</Form.Label>
                                    <Form.Control
                                        className='purchase-select code-conf'
                                        type='text'
                                        value={companyDetails?.district||''}
                                        name='district'
                                        onChange={handleCompDchange}
                                    />
                                </Form.Group>
                            </div>
                            <div className="prof-det-field1 pt-0">
                                <Form.Group className='code-conf-input-cont w-100'>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        className='purchase-select code-conf'
                                        type='text'
                                        value={companyDetails?.city||''}
                                        name='city'
                                        onChange={handleCompDchange}
                                    />
                                </Form.Group>
                                <Form.Group className='code-conf-input-cont w-100'>
                                    <Form.Label>PIN Code</Form.Label>
                                    <Form.Control
                                        className='purchase-select code-conf'
                                        type='text'
                                        value={companyDetails?.pincode||''}
                                        name='pincode'
                                        onChange={handleCompDchange}
                                        
                                    />
                                </Form.Group>
                                <Form.Group className='code-conf-input-cont w-100'></Form.Group>
                        
                            </div>
                            {isVisible2==false && 
                            <div className="prof-det-field1 pt-0 d-flex justify-content-end align-items-center">
                                <div className='can-btn'>Cancel</div>
                                <button className='save-btn border-0' type='submit'>Save</button>                            
                            </div>}
                            </form>
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