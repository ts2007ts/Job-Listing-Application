import { useState } from "react";
import { GrClose } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Header(props) {

  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();

  let logged = localStorage.getItem('token');

  let auth = false;
  let guest = true;

  if (logged) {
    auth = true;
    guest = false;
  }

  function logout() {
    localStorage.removeItem('token');

    const id = localStorage.getItem('id');

    localStorage.removeItem('id');
    localStorage.removeItem('username');
    localStorage.removeItem('email');

    axios.post('http://localhost:5000/api/logout', { id: id })
      .then(res => {
        Swal.fire({
          icon: "success",
          title: res.data.message,
          showConfirmButton: true,
        });
        props.updateStatus(false);
        navigate('/login');
      })
      .catch(err => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.error.message
        });
        navigate('/jobs');
      })
  }

  return (
    <header className="flex flex-row items-center justify-between mb-10 p-4 border-b-2 bg-gray-100 rounded-xl shadow-2xl">
      <Link
        to={'/jobs'}
        className="flex items-center h-10 px-10 bg-gradient-to-r from-pink-500 via-pink-300 to-pink-100 rounded-tl-full rounded-br-full font-bold uppercase italic text-gray-600 hover:opacity-90 shadow-2xl"
      >
        Job Listing Application
      </Link>
      <nav className="hidden sm:flex justify-between items-center gap-4 font-semibold">
        <Link to={'/jobs'} className="hover:text-gray-500">
          Jobs
        </Link>
        {
          guest && (
            <>
              <Link to={'/register'} className="hover:text-gray-500">
                Register
              </Link>
              <Link
                to={'/login'}
                className="hover:text-gray-500"
              >
                Login
              </Link>
            </>
          )
        }
        {
          auth && (
            <>
              <button className="hover:text-gray-500" onClick={logout}>
                Logout
              </button>
            </>
          )
        }
      </nav>
      <nav className="sm:hidden flex flex-col items-end gap-1 font-semibold">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="sm:hidden font-bold text-xl hover:text-gray-500"
        >
          {showMenu ? <GrClose /> : <GiHamburgerMenu />}
        </button>
        {showMenu && (
          <>
            <Link to={'/jobs'} className="hover:text-gray-500">
              Jobs
            </Link>
            {
              guest && (
                <>
                  <Link to={'/register'} className="hover:text-gray-500">
                    Register
                  </Link>
                  <Link
                    to={'/login'}
                    className="hover:text-gray-500"
                  >
                    Login
                  </Link>
                </>
              )
            }
            {
              auth && (
                <>
                  <button className="hover:text-gray-500" onClick={logout}>
                    Logout
                  </button>
                </>
              )
            }
          </>
        )}
      </nav>
    </header>
  );
}


