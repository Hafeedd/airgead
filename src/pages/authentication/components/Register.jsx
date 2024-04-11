import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import userProfileIcon from '../../../assets/images/iconamoon_profile-circle-fill.png'
import uploadImage from '../../../assets/images/upload-image.svg'
import TextField from '@mui/material/TextField';
import uploadIcon from '../../../assets/images/upload-icon.png'
import { useAuthServices } from '../../../services/controller/authServices';
import Swal from 'sweetalert2'
import PasswordField from './PasswordField'

const initalUser = {
    first_name: null,
    last_name: null,
    username: null,
    password: null,
    mobile: null,
    email: null,
    image: null,
    image_url: null,
    group_name: null,
    password_conf: null,
}

const Register = () => {
    const [user, setUser] = useState(initalUser)
    const [passwordNotEqual, setPasswordNotEqual] = useState(false)

    const { register } = useAuthServices()
    const navigate = useNavigate()

    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        let tempUser = { ...user }
        if (e.target.type === "file" && e.target?.files?.length > 0) {
            let imageUrl = window.URL.createObjectURL(e.target.files[0])
            tempUser = { ...tempUser, image: e.target.files[0], image_url: imageUrl }
        }
        if (e.target.value === '')
            tempUser = { ...tempUser, [name]: null }
        else
            tempUser = { ...tempUser, [name]: value }
        if (name.match(/pass/) && tempUser?.password && tempUser?.password_conf) {
            if (tempUser.password_conf !== tempUser.password) {
                setPasswordNotEqual(true)
            } else setPasswordNotEqual(false)
        } else setPasswordNotEqual(false)
        setUser({ ...tempUser })
    }

    // const validatePassword = (password) => {
    //     // at least 8 characters
    //     if (password.length < 8) return false;
    
    //     // at least one numeric character
    //     if (!/\d/.test(password)) return false;
    
    //     // at least one alphabetical character
    //     if (!/[a-zA-Z]/.test(password)) return false;
    
    //     // at least one punctuation character
    //     if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return false;
    
    //     return true;
    //   };

    // validatePassword()
    const handleSubmit = async (e) => {
        e.preventDefault()
        // if(!user.image){
        //     Swal.fire({
        //         title:Error,
        //         text:"Please Select an image",
        //         icon:'error',
        //         timer:null,
        //     })
        //     return 0
        // }
        try {
            const form = new FormData()
            form.append('first_name', user.first_name)
            form.append('last_name', user.last_name)
            form.append('username', user.username)
            form.append('email', user.email)
            if(user.image){
                form.append('image', user.image)
            }
            form.append('password', user.password)
            form.append('mobile', user.mobile)
            form.append('group_name', user.group_name)

            const response = await register(form)
            if (response?.success) {
                navigate('/login')
                Swal.fire({
                    title: "Success",
                    text: 'Registration successfull.',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                Swal.fire({
                    title: "Error",
                    text: response?.message || 'Registration failed.',
                    icon: 'error',
                })
            }
        } catch (err) {
            console.log(err)
            Swal.fire({
                title: "Failed",
                text: err?.response?.data?.message || 'Registration Failed.',
                icon: 'error',
                showConfirmButton: true,
                timer: 3500
            })
        }
    }

    return (
        <form onSubmit={handleSubmit} className='d-flex flex-column align-items-center' style={{ width: "70%", height: "fit-content" }}>
            <div className='d-flex'>
                <div className='d-flex flex-column justify-content-center mt-2'>
                    <img width={'100%'} src={userProfileIcon} alt="" />
                </div>
                <div className='p-2'>
                    <h1 className='p-0 m-0 railway-font' style={{ font: "27px" }}>Register</h1>
                    <p className='railway-font'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. itiis dicta non is labore fugiat voluptates assumenda iste!</p>
                </div>
            </div>

            <div className='row p-0 justify-content-between w-100'>
                <div className="col-4 p-0 ">
                    <img className='mt-0' width={'100%'} style={{ aspectRatio: "1/1" }} src={user.image_url || uploadImage} alt="" />
                    <input onChange={handleChange} className='d-none' type='file' id="user-prof" />
                    <label for="user-prof" className='btn btn-login rounded mt-0 py-2 ' ><span><img src={uploadIcon} alt="" /></span>Upload Image</label>
                </div>
                <div className="col-6 p-0 ">
                    <TextField required onChange={handleChange} value={user.username} name='username' size={window.innerWidth < 1500 ? 'small' : 'normal'} className='auth-input-field my-3' id="outlined-basic" label="User Name" variant="outlined" />
                    <TextField required onChange={handleChange} value={user.first_name} name='first_name' size={window.innerWidth < 1500 ? 'small' : 'normal'} className='auth-input-field my-3  ' id="outlined-basic" label="First Name" variant="outlined" />
                    <TextField required onChange={handleChange} value={user.last_name} name='last_name' size={window.innerWidth < 1500 ? 'small' : 'normal'} className='auth-input-field my-2' id="outlined-basic" label="Last Name" variant="outlined" />
                </div>
            </div>
            <div>
                <TextField required onChange={handleChange} value={user.email} name='email' size={window.innerWidth < 1500 ? 'small' : 'normal'} className='auth-input-field my-2' id="outlined-basic" label="Email" variant="outlined" />
                <TextField required onChange={handleChange} value={user.mobile} name='mobile' size={window.innerWidth < 1500 ? 'small' : 'normal'} className='auth-input-field my-3' id="outlined-basic" label="Phone" variant="outlined" />
                <PasswordField name={"password"} state={user} {...{ handleChange }} />
                <TextField required type="password" onChange={handleChange} value={user.password_conf} name='password_conf' size={window.innerWidth < 1500 ? 'small' : 'normal'} className='auth-input-field my-3' id="outlined-basic" label="Confirm Password" variant="outlined" />
                {passwordNotEqual && <span className="danger fs-6">Password not matching</span>}
            </div>

            <div style={{ width: "100%" }}>
                <button type="submit" disabled={passwordNotEqual} className='btn-login rounded py-3 mt-3 railway-font' style={{ letterSpacing: "0.1rem" }} ><b>Register</b></button>
            </div>
        </form>
    )
}

export default Register