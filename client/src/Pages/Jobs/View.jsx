import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import download from 'downloadjs';


export default function View(props) {

  const params = useParams();

  const navigate = useNavigate();

  const [job, updateJob] = useState();

  const fetchJob = async () => {
    await axios.get(
      'http://localhost:5000/api/jobs/' + params.id,
      {
        headers: {
          'authorization': localStorage.getItem('token')
        }
      })
      .then(res => {
        updateJob(res.data.data.job);
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
    fetchJob();
  }, []);


  function downloadAttachments() {
    axios.get('http://localhost:5000/api/jobs/download/' + params.id, { responseType: 'blob' })
      .then(res => {
        download(res.data, 'attachments.zip', 'application/x-zip');
        Swal.fire({
          icon: "success",
          title: "Download Successful",
          showConfirmButton: true,
        });
      })
      .catch(err => {
        if (err.response) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "There is no Files to download"
          });
        }
      })
  }

  function editJob() {
    navigate('/jobs/edit/' + params.id);
  }

  function deleteJob() {

    confirm('Are you sure you want to delete the job ?');

    axios.delete('http://localhost:5000/api/jobs/' + params.id, {
      headers: {
        'authorization': localStorage.getItem('token')
      }
    })
      .then(res => {
        Swal.fire({
          icon: "success",
          title: res.data.message,
          showConfirmButton: true,
        });

        navigate('/jobs');
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

  function checkAuthorization(userId) {
    if (userId !== localStorage.getItem('id')) {
      return false;
    }

    if (!props.isLogged) {
      return false;
    }

    return true;
  }

  if (job) {
    return (
      <>
        <div className="flex justify-start">
          <div className="shadow-xl m-2 p-2 rounded-3xl">
            <span className="font-extrabold font-sans text-gray-600 text-nowrap">Job ID :</span> <span className="font-bold font-sans text-cyan-600">{job._id}</span>
          </div>
        </div>


        <div className="flex justify-start m-2 gap-3">

          {checkAuthorization(job.userId.id) && (
            <>
              <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-900 hover:border-blue-500 rounded-xl" onClick={e => editJob(job)}>
                Edit
              </button>

              <button className="bg-orange-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded-xl" onClick={deleteJob}>
                Delete
              </button>
            </>
          )}

        </div>


        <div className="mt-4 flex flex-row items-center justify-between  p-2 border-b-2 bg-pink-50 rounded-xl shadow-2xl">
          <div className="m-2 p-2 text-left grid grid-cols-2 gap-[3rem]">

            <div className="space-x-5">
              <span className="font-extrabold font-sans text-gray-600 text-nowrap">
                Job Title:
              </span>
              <span className="font-bold font-sans text-cyan-600">{job.title}</span>
            </div>

            <div className="space-x-5">
              <span className="font-extrabold font-sans text-gray-600 text-nowrap">
                Job Description:
              </span>
              <span className="font-bold font-sans text-cyan-600">{job.description}</span>
            </div>



            <div className="space-x-5">
              <span className="font-extrabold font-sans text-gray-600 text-nowrap">
                Skills Required:
              </span>
              {
                job.skills.map((skill) => (
                  <span key={skill + job.id} className="font-bold font-sans text-cyan-600">{skill}</span>
                ))
              }
            </div>

            <div className="space-x-5">
              <span className="font-extrabold font-sans text-gray-600 text-nowrap">
                Job Salary:
              </span>
              <span className="font-bold font-sans text-cyan-600">{job.salary}</span>
            </div>


            <div className="space-x-5">
              <span className="font-extrabold font-sans text-gray-600 text-nowrap">
                Job Location:
              </span>
              <span className="font-bold font-sans text-cyan-600">{job.location}</span>
            </div>

            <div className="space-x-5">
              <span className="font-extrabold font-sans text-gray-600 text-nowrap">
                Job Type:
              </span>
              <span className="font-bold font-sans text-cyan-600">{job.type}</span>
            </div>


            <div className="space-x-5">
              <span className="font-extrabold font-sans text-gray-600 text-nowrap">
                Job Posted By:
              </span>
              <span className="font-bold font-sans text-cyan-600">{job.userId.username.toUpperCase()}</span>
            </div>

            <div className="space-x-5">
              <span className="font-extrabold font-sans text-gray-600 text-nowrap">
                Job Created At:
              </span>
              <span className="font-bold font-sans text-cyan-600">{new Date(job.createdAt).toUTCString()}</span>
            </div>

            <div className="flex justify-start gap-5 items-center">
              <span className="font-extrabold font-sans text-gray-600 text-nowrap">Files Attached :</span>
              <span>
                <button className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded-xl" onClick={downloadAttachments}>
                  Download
                </button>
              </span>
            </div>


          </div>
        </div>
      </>
    )
  } else
    return (
      <>
        <Header />
        <Footer />
      </>
    )

}
