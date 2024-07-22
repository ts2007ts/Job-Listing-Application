import Swal from "sweetalert2";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";


const Jobs = () => {
  const navigate = useNavigate();

  let [jobs, updateJobs] = useState();

  const fetchJobs = async () => {
    await axios.get(
      'http://localhost:5000/api/jobs')
      .then(res => {
        updateJobs(res.data.data.jobs);
      })
      .catch(err => {
        if (err.response) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.response.data.error.message
          });
        }
      })
  }

  useEffect(() => {
    fetchJobs();
  }, []);


  function fetchAllJobs() {
    axios.get('http://localhost:5000/api/jobs')
      .then(res => {
        updateJobs(res.data.data.jobs);
      })
      .catch(err => {
        if (err.response) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.response.data.error.message
          });
        }
      })
  }

  const viewDetails = (id) => {
    navigate('/jobs/view/' + id);
  }

  function timeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) return `${interval} Ys ago`;
    if (interval === 1) return `1 Y ago`;

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return `${interval} Ms ago`;
    if (interval === 1) return `1 M ago`;

    interval = Math.floor(seconds / 86400);
    if (interval > 1) return `${interval} ds ago`;
    if (interval === 1) return `1 d ago`;

    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `${interval} hs ago`;
    if (interval === 1) return `1 h ago`;

    interval = Math.floor(seconds / 60);
    if (interval > 1) return `${interval} ms ago`;
    if (interval === 1) return `1 m ago`;

    return 'just now';
  }

  function createJob() {
    navigate('/jobs/create');
  }

  function checkLogging() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }



  return (
    <div >
      <div className="mt-4">
        <div className="flex justify-between gap-4">

          {checkLogging() && (
            <button className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded-xl" onClick={createJob}>Post a new Job</button>
          )}

        </div>

        {jobs && (
          <>
            {jobs.map((job) => (
              <div
                key={job._id}
                className="flex flex-col text-left mt-4 space-y-4 bg-pink-50 p-4 rounded-xl cursor-pointer shadow-lg"
                onClick={e => viewDetails(job._id)}
              >
                <div className="flex justify-start gap-4">
                  <p className="font-bold text-blue-400">User {job.userId.username} Posted</p>
                </div>

                <div className="flex justify-between gap-4">
                  <p className="font-bold text-nowrap text-gray-600">{job.title}</p>
                  <p>{timeAgo(job.createdAt)}</p>
                </div>

              </div>
            ))}
          </>
        )}



      </div>
    </div>
  );
};

export default Jobs;
