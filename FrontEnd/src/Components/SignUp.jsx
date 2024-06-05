import '../Css/Signup.scss';
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';

const SignUp = () => {

  const navigate = useNavigate();
  const gradientColors = 'linear-gradient(45deg, #000036, #003087)';
  const initialSrc = 'https://img.icons8.com/ios/50/FFFFFF/visible--v1.png';
  // Other image source
  const otherSrc = 'https://img.icons8.com/ios/50/FFFFFF/hide.png';

  const [imageSrc, setImageSrc] = useState(initialSrc);

  const [myinputype, setInputType] = useState('password');

  const [Inputs, setInputs] = useState({
    Username: "",
    Password: "",
    Birthdate: "",
    Email: "",
  })

  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handelSignup = async e => {

    e.preventDefault();
    if (Inputs.Username.length && Inputs.Email.length && Inputs.Password.length && Inputs.Birthdate.length) {

      try {
        await axios.post(`${import.meta.env.VITE_Backend_Url}/api/auth/signup`, Inputs, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://socialsparks.netlify.app',
          },
        });
        navigate("/login");
      }

      catch (err) {
        setErr(err.response.data);
        toast.error(err.response.data);
        return;
      }
      toast.success("User creation successful");
    }

    else {
      toast.error("Please fill all the fields")
    }
  }

  // Function to handle image click and change the source
  const handleImageClick = () => {
    // Change the image source when clicked
    console.log(imageSrc);
    if (imageSrc === initialSrc) {
      setImageSrc(otherSrc);
      setInputType('text');

    }
    else {
      setImageSrc(initialSrc);
      setInputType('password');
    }
  };

  // Function to give CSS to main heading 
  const textStyle = {

    backgroundImage: gradientColors,
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    fontWeight: 'bold',
    textDecoration: 'underline',
    fontFamily: 'YourStylishFont, sans-serif',
    fontSize: '40px', // Adjust the font size as needed
    textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)', // Add a subtle text-shadow effect
  };


  return (
    <>
      <div className='SignUp'>
        <div className='start-line'>
          <h3 style={textStyle}>Social Sparks</h3>
        </div>
        <div className="wrapper">
          <form action="">
            <h1>Sign Up</h1>
            <div className="input-box">
              <input type="text" placeholder='Username ' required name='Username' onChange={handleChange} />
              <img width="25" height="25" src="https://img.icons8.com/pastel-glyph/64/FFFFFF/user-male-circle.png" alt="user-male-circle" />
            </div>
            <div className="input-box">
              <input type="email" placeholder='Email ' required name='Email' onChange={handleChange} />
              <img width="25" height="25" src="https://img.icons8.com/ios/50/FFFFFF/new-post--v1.png" alt="new-post--v1" />
            </div>

            <div className="input-box">
              <input type={myinputype} placeholder='Password' name='Password' onChange={handleChange} />
              <img width="25" height="25" onClick={handleImageClick} src={imageSrc} alt="visible--v1" />
            </div>

            <div className="date-box">
              <input type="date" placeholder='Birthday' name='Birthdate' onChange={handleChange} />
            </div>

            <button onClick={handelSignup} type='submit' className='btn'>Sign Up</button>

            <div className="register-link">
              <p>Already have an account <Link to="/Login"> <label>Login</label></Link> </p>

            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp
