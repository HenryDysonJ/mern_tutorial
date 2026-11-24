import Google from '../assets/google.png'
import Git from "../assets/git.png";
import Fb from "../assets/fb.png";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { register, reset} from '../feature/auth/authSlice'

const Register = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, isLoading, isSuccess, message } = useSelector((state) => state.auth);

  const [registerState, setRegisterState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const { name, email, password, confirmPassword} =  registerState

  const handleChange = (key, value) => {
    setRegisterState((prev) => ({
      ...prev, [key]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!name || !email || !password || !confirmPassword){
     return toast.warning('All feilds are required.')
    }

    if(email && !emailRegex.test(email)){
     return toast.error('Invalid Email')
    }

    if((password && confirmPassword) && password !== confirmPassword){
     return toast.error('Password is mismatch.')
    }

    const payload ={
      name, email, password
    }

    dispatch(register(payload))
  }

  useEffect(()=>{
    if(isError){
      toast.error(message)
    }

    if(isSuccess && user){
      toast.success(message)
      navigate('/login')
    }

    dispatch(reset())

  },[user, isError, isSuccess, message, navigate, dispatch])

  return (
    <div className="register-container">
      <div className="card-container">

        {/* Login Form */}
        <div className="card-form">
          <h1>Register</h1>

          <label>Name</label>
          <input value={registerState.name} onChange={(e) => handleChange('name', e.target.value)} type="name" placeholder="Enter Name" />

          <label>Email</label>
          <input value={registerState.email} onChange={(e) => handleChange('email', e.target.value)} type="email" placeholder="username@gmail.com" />

          <label>Password</label>
          <input value={registerState.password} onChange={(e) => handleChange('password', e.target.value)} type="password" placeholder="Password" />

          <label>Confirm Password</label>
          <input value={registerState.confirmPassword} onChange={(e) => handleChange('confirmPassword', e.target.value)} type="password" placeholder="Confirm Password" />

          <p className="forgot">Forgot Password?</p>

          <button onClick={handleSubmit}>{isLoading ? "Signing.." : "Sign in"}</button>

          <p className="continue">Or Continue With</p>
          <div className='img-log'>
            <img src={Google} className="" alt="google" />
            <img src={Git} className="" alt="github" />
            <img src={Fb} className="" alt="facebook" />
          </div>

          <p className="continue">Don't have an account? <span className='forgot'>Register for free</span></p>
        </div>

        {/* Image */}
        <div className="card-img"></div>

      </div>
    </div>
  );
};

export default Register;