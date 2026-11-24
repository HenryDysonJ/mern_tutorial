import Google from '../assets/google.png'
import Git from "../assets/git.png";
import Fb from "../assets/fb.png";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { login, reset } from '../feature/auth/authSlice'


const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, isLoading, isSuccess, message } = useSelector((state) => state.auth);

  const [loginState, setLoginState] = useState({
    email: "",
    password: ""
  })

  const { email, password } = loginState


  const handleChange = (key, value) => {
    setLoginState((prev) => ({
      ...prev, [key]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email || !password) {
      return toast.warning('All feilds are required.')
    }

    if (email && !emailRegex.test(email)) {
      return toast.error('Invalid Email')
    }

    const payload = {
      email, password
    }

    dispatch(login(payload))
  }

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess && user) {
      toast.success(message)
      navigate('/')
    }

    dispatch(reset())

  }, [user, isError, isSuccess, message, navigate, dispatch])

  return (
    <div className="register-container">
      <div className="card-container">

        {/* Login Form */}
        <div className="card-form">
          <h1>Login</h1>

          <label>Email</label>
          <input value={loginState.email} onChange={(e) => handleChange('email', e.target.value)} type="email" placeholder="username@gmail.com" />

          <label>Password</label>
          <input value={loginState.password} onChange={(e) => handleChange('password', e.target.value)} type="password" placeholder="Password" />

          <p className="forgot">Forgot Password?</p>

          <button onClick={handleSubmit}> {isLoading ? "Login.." : "Login"}</button>

          <p className="continue">Or Continue With</p>
          <div className='img-log'>
            <img src={Google} className="" alt="google" />
            <img src={Git} className="" alt="github" />
            <img src={Fb} className="" alt="facebook" />
          </div>

          <p className="continue">Don't have an account? Register for free</p>
        </div>

        {/* Image */}
        <div className="card-img"></div>

      </div>
    </div>
  )
}

export default Login