import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function Register(props) {


  let [usernameState, updateUsername] = useState('');
  let [emailState, updateEmail] = useState('');
  let [passwordState, updatePassword] = useState('');
  let [confirmPasswordState, updateConfirmPassword] = useState('');

  let [usernameIsValid, setUsernameIsValid] = useState(false);
  let [emailIsValid, setEmailIsValid] = useState(true);
  let [emailIsValidEmail, setEmailIsValidEmail] = useState(true);
  let [passwordIsValid, setPasswordIsValid] = useState(true);
  let [passwordMinLength, setPasswordMinLength] = useState(true);
  let [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState(true);
  let [passwordMatch, setPasswordMatch] = useState(true);

  const navigate = useNavigate();

  function usernameValidity(username) {
    if (username.trim() === '') {
      setUsernameIsValid(false);
      return;
    }
    setUsernameIsValid(true);
  }

  function emailValidity(email) {
    if (email.trim() === '') {
      setEmailIsValid(false);
      return;
    }
    setEmailIsValid(true);

    if (!email.toLowerCase().match(EMAIL_REGEX)) {
      setEmailIsValidEmail(false);
      return;
    }
    setEmailIsValidEmail(true);
  }

  function passwordValidity(password) {
    if (password.trim() === '') {
      setPasswordIsValid(false);
      return;
    }
    setPasswordIsValid(true);

    if (password.length < 8) {
      setPasswordMinLength(false);
      return;
    }
    setPasswordMinLength(true);
  }

  function confirmPasswordValidity(password, passwordConfirmation) {
    if (passwordConfirmation.trim() === '') {
      setConfirmPasswordIsValid(false);
      return;
    }
    setConfirmPasswordIsValid(true);

    if (password !== passwordConfirmation) {
      setPasswordMatch(false);
      return;
    }
    setPasswordMatch(true);
  }

  function checkValidationForAllInputs() {
    if (
      usernameIsValid
      && emailIsValid
      && emailIsValidEmail
      && passwordIsValid
      && passwordMinLength
      && confirmPasswordIsValid
      && passwordMatch
    ) {
      return true;
    } else {
      return false
    }
  }



  function register(e) {
    e.preventDefault();

    usernameValidity(usernameState);
    emailValidity(emailState);
    passwordValidity(passwordState);
    confirmPasswordValidity(passwordState, confirmPasswordState);

    let user = {
      username: usernameState,
      email: emailState,
      password: passwordState,
      confirmPassword: confirmPasswordState,
    }

    if (checkValidationForAllInputs()) {
      createUser(user);
    } else {
      return;
    }

  }

  function createUser(user) {
    axios.post('http://localhost:5000/api/register', user)
      .then(res => {
        Swal.fire({
          icon: "success",
          title: res.data.message + ' ... Login to your account please',
          showConfirmButton: true,
        });
        navigate('/login');
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
    <div className='mt-2'>
      <form onSubmit={register}>
        <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
          <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
            <div className="flex-1 bg-pink-50 text-center hidden md:flex">
              <div
                className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
                }}
              ></div>
            </div>
            <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
              <div className=" flex flex-col items-center">
                <div className="text-center">
                  <h1 className="text-2xl xl:text-4xl font-extrabold text-pink-600">
                    SIGN UP
                  </h1>
                  <p className="text-[12px] text-gray-500">
                    Hey enter your details to create your account
                  </p>
                </div>
                <div className="w-full flex-1 mt-8">
                  <div className="mx-auto max-w-xs flex flex-col gap-3">
                    <div className='grid grid-col-1 text-left text-sm'>
                      <input
                        className="w-full px-5 py-3 rounded-lg font-medium bg-pink-50 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white shadow-md"
                        type="text"
                        placeholder="Enter your username"
                        onChange={e => updateUsername(e.target.value)}
                      />
                      {
                        !usernameIsValid &&
                        <div className='text-red-500 mt-2'>
                          <p>Username is a required field</p>
                        </div>
                      }
                    </div>

                    <div className='grid grid-col-1 text-left text-sm'>
                      <input
                        className="w-full px-5 py-3 rounded-lg font-medium bg-pink-50 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white shadow-md"
                        type="email"
                        placeholder="Enter your email"
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

                    <div className='grid grid-col-1 text-left text-sm'>
                      <input
                        className="w-full px-5 py-3 rounded-lg font-medium bg-pink-50 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white shadow-md"
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

                    <div className='grid grid-col-1 text-left text-sm'>
                      <input
                        className="w-full px-5 py-3 rounded-lg font-medium bg-pink-50 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white shadow-md"
                        type="password"
                        placeholder="Confirm Your password"
                        onChange={e => updateConfirmPassword(e.target.value)}
                      />
                      {
                        !confirmPasswordIsValid &&
                        <div className='text-red-500 mt-2'>
                          <p>Password is a required field</p>
                        </div>
                      }
                      {
                        !passwordMatch &&
                        <div className='text-red-500 mt-2'>
                          <p>Passwords do not match</p>
                        </div>
                      }
                    </div>

                    <button type="submit" className="mt-5 tracking-wide font-semibold bg-pink-700 text-gray-100 w-full py-4 rounded-lg hover:bg-pink-500 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                      <svg
                        className="w-6 h-6 -ml-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <path d="M20 8v6M23 11h-6" />
                      </svg>
                      <span className="ml-3">Sign Up</span>
                    </button>
                    <p className="mt-6 text-xs text-gray-600 text-center">
                      Already have an account?{" "}
                      <Link to={'/login'}>
                        <span className="text-blue-900 font-semibold">Sign in</span>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <Footer />
    </div>
  );
}
