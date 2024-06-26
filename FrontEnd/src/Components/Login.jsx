import { useContext } from 'react'
import '../Css/Login.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import toast from 'react-hot-toast'


const Login = () => {

  const initialSrc = 'https://img.icons8.com/ios/50/FFFFFF/visible--v1.png';
  // Other image source
  const otherSrc = 'https://img.icons8.com/ios/50/FFFFFF/hide.png';

  const [imageSrc, setImageSrc] = useState(initialSrc);
  const [myinputype, setInputType] = useState('password');

  const [inputs, setInputs] = useState({
    Username: "",
    Password: ""
  })
  const [err, setErr] = useState(null);

  const { login } = useContext(AuthContext)

  const Navigate = useNavigate();


  // Function to handle image click and change the source
  const handleImageClick = () => {
    // Change the image source when clicked
    if (imageSrc === initialSrc) {
      setImageSrc(otherSrc);
      setInputType('text');

    }
    else {
      setImageSrc(initialSrc);
      setInputType('password');
    }
  };

  const handleChange = e => {
    setInputs((prev) => ({
      ...prev, [e.target.name]: e.target.value

    }))
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(inputs);
      Navigate("/");
    }

    catch (err) {
      setErr(err.response.data);
      toast.error(err.response.data);
      return;
    }

    toast.success("User Login Successful")

  }


  return (
    <>
      <div className='Login'>
        <div className='start-line'>
          <h3 >Welcome Back We missed you</h3>
        </div>
        <div className="wrapper">
          <form action="">
            <h1>Login</h1>
            <div className="input-box">
              <input type="text" placeholder='Username ' required name='Username' onChange={handleChange} />
              <img width="25" height="25" src="https://img.icons8.com/pastel-glyph/64/FFFFFF/user-male-circle.png" alt="user-male-circle" />
            </div>

            <div className="input-box">
              <input type={myinputype} placeholder='Password' name='Password' onChange={handleChange} />
              <img width="25" onClick={handleImageClick} height="25" src={imageSrc} alt="visible--v1" />
            </div>

            <div className="remember-forgot">

              <label >
                <input type="checkbox" /> Remember Me
              </label>
              <label className='hoverLabel1'>
                <Link to="/" />Forgot Password?
              </label>
            </div>
            <button onClick={handleLogin} type='submit' className='btn'>Login</button>

            <div className="register-link">
              <p>Dont have an account?<Link to="/Signup" > <span>Register</span> </Link></p>

            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
