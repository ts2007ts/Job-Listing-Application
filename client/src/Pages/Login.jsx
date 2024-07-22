import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function Login(props) {

  let [emailState, updateEmail] = useState('');
  let [passwordState, updatePassword] = useState('');

  let [emailIsValid, setEmailIsValid] = useState(true);
  let [emailIsValidEmail, setEmailIsValidEmail] = useState(true);
  let [passwordIsValid, setPasswordIsValid] = useState(true);
  let [passwordMinLength, setPasswordMinLength] = useState(true);

  const navigate = useNavigate();

  function login(e) {
    e.preventDefault();

    if (emailState.trim() === '') {
      setEmailIsValid(false);
      return;
    }
    setEmailIsValid(true);

    if (!emailState.toLowerCase().match(EMAIL_REGEX)) {
      setEmailIsValidEmail(false);
      return;
    }
    setEmailIsValidEmail(true);

    if (passwordState.trim() === '') {
      setPasswordIsValid(false);
      return;
    }
    setPasswordIsValid(true);

    if (passwordState.length < 8) {
      setPasswordMinLength(false);
      return;
    }
    setPasswordMinLength(true);

    let user = {
      email: emailState,
      password: passwordState
    }

    loginUser(user);
  }

  function loginUser(user) {
    axios.post('http://localhost:5000/api/login', user)
      .then(res => {
        Swal.fire({
          icon: "success",
          title: res.data.message,
          showConfirmButton: true,
        });
        localStorage.setItem('token', 'bearer ' + res.data.token);
        localStorage.setItem('id', res.data._id);
        localStorage.setItem('username', res.data.username);
        localStorage.setItem('email', res.data.email);
        props.updateStatus(true);
        navigate('/jobs');
      })
      .catch(err => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.error.message
        });
      })
  }


  return (
    <>
      <form onSubmit={login}>
        <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0">
          <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
            <div
              className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
              style={{
                backgroundImage: `url(https://www.tailwindtap.com//assets/components/form/userlogin/login_tailwindtap.jpg)`,
              }}
            ></div>
            <div className="w-full p-8 lg:w-1/2">
              <p className="text-xl text-pink-600 font-extrabold text-center uppercase">Welcome back!</p>
              <div className="mt-4 grid grid-col-1 text-left text-sm">
                <label className="block text-gray-700 text-sm font-bold mb-2 text-left">
                  Email Address
                </label>
                <input
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700 bg-pink-50 shadow-md"
                  type="email"
                  placeholder="Enter your email address"
                  onChange={e => updateEmail(e.target.value)}

                />
                {
                  !emailIsValid &&
                  <div className='text-red-500 mt-2'>
                    <p>Email is a required field</p>
                  </div>
                }
                {
                  !emailIsValidEmail &&
                  <div className='text-red-500 mt-2'>
                    <p>Email must be a valid email</p>
                  </div>
                }
              </div>
              <div className="mt-4 flex flex-col justify-between">
                <div className="flex justify-between">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                  </label>
                </div>
                <div className='grid grid-col-1 text-left text-sm'>
                  <input
                    className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700 bg-pink-50 shadow-md"
                    type="password"
                    placeholder="Enter your password"
                    onChange={e => updatePassword(e.target.value)}
                  />
                  {
                    !passwordIsValid &&
                    <div className='text-red-500 mt-2'>
                      <p>Password is a required field</p>
                    </div>
                  }
                  {
                    !passwordMinLength &&
                    <div className='text-red-500 mt-2'>
                      <p>Password minlength must be a least 8 chars</p>
                    </div>
                  }
                </div>
              </div>
              <div className="mt-8">
                <button type="submit" className="bg-pink-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-pink-500">
                  Login
                </button>
              </div>
              <a
                href="#"
                className=" flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100"
              >

              </a>
              <div className="mt-4 flex items-center w-full text-center">
                <Link
                  to={'/register'}
                  className="text-xs text-gray-500 capitalize text-center w-full"
                >
                  Don&apos;t have any account yet?
                  <span className="text-blue-700"> Sign Up</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
