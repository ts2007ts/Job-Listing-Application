import { useState } from "react";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import DynamicInput from "../../Components/DynamicInput";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, Link } from "react-router-dom";

export default function Create() {

  const navigate = useNavigate();

  let [title, updateTitle] = useState('');
  let [description, updateDescription] = useState('');
  let [skills, updateSkills] = useState([]);
  let [salary, updateSalary] = useState('');
  let [location, updateLocation] = useState('');
  let [type, updateType] = useState([]);
  let [filesPath, updateFilesPath] = useState([]);

  let [titleIsValid, setTitleIsValid] = useState(true);
  let [descriptionIsValid, setDescriptionIsValid] = useState(true);
  let [skillsIsValid, setSkillsIsValid] = useState(true);
  let [salaryIsValid, setSalaryIsValid] = useState(true);
  let [locationIsValid, setLocationIsValid] = useState(true);
  let [typeIsValid, setTypeIsValid] = useState(true);

  function createJob(e) {
    e.preventDefault();

    if (title.trim() === '') {
      setTitleIsValid(false);
      return;
    }
    setTitleIsValid(true);

    if (description.trim() === '') {
      setDescriptionIsValid(false);
      return;
    }
    setDescriptionIsValid(true);

    if (skills.length === 0 || skills[0].trim() === '') {
      setSkillsIsValid(false);
      return;
    }
    setSkillsIsValid(true);

    if (salary.trim() === '') {
      setSalaryIsValid(false);
      return;
    }
    setSalaryIsValid(true);

    if (location.trim() === '') {
      setLocationIsValid(false);
      return;
    }
    setLocationIsValid(true);

    if (type.length === 0) {
      setTypeIsValid(false);
      return;
    }
    setTypeIsValid(true);

    let user = {
      id: localStorage.getItem('id'),
      username: localStorage.getItem('username'),
      email: localStorage.getItem('email'),
    }

    let job = {
      title: title,
      description: description,
      skills: skills,
      salary: salary,
      location: location,
      type: type,
      userId: user,
      filesPath: filesPath

    }

    sendPost(job);
  }

  function receiveSkills(sklls) {
    skills = sklls;
  }

  function sendPost(job) {
    axios.post(
      'http://localhost:5000/api/jobs',
      job,
      {
        headers: {
          'authorization': localStorage.getItem('token'),
          'Content-Type': 'multipart/form-data'
        }
      }
    )
      .then(res => {
        Swal.fire({
          icon: "success",
          title: res.data.message,
          showConfirmButton: true,
        });
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
    <div className='mt-2'>
      <form onSubmit={createJob}>
        <div className="mt-8 flex flex-col items-center">
          <div className="text-center">
            <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900 uppercase">
              Post a Job
            </h1>

          </div>
          <div className="w-4/5 flex-1 mt-8">
            <div className="flex flex-col gap-3">
              <div className='grid grid-col-1 text-left text-sm'>
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Enter job Title"
                  onChange={e => updateTitle(e.target.value)}
                />
                {
                  !titleIsValid &&
                  <div className='text-red-500 mt-2'>
                    <p>Title is a required field</p>
                  </div>
                }
              </div>

              <div className='grid grid-col-1 text-left text-sm'>
                <textarea
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  placeholder="Enter your Description"
                  rows="10"
                  onChange={e => updateDescription(e.target.value)}
                >

                </textarea>
                {
                  !descriptionIsValid &&
                  <div className='text-red-500 mt-2'>
                    <p>Description is a required field</p>
                  </div>
                }
              </div>

              <div className='grid grid-col-1 text-left text-sm'>
                {/* <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Skill required for the job"
                  onChange={e => updateSkills(e.target.value)}
                />
                {
                  !skillsIsValid &&
                  <div className='text-red-500 mt-2'>
                    <p>On Skill is a required at minimum</p>
                  </div>
                } */}

                <DynamicInput recSkills={receiveSkills} />
                {
                  !skillsIsValid &&
                  <div className='text-red-500 mt-2'>
                    <p>Skills is a required field</p>
                  </div>
                }
              </div>

              <div className='grid grid-col-1 text-left text-sm'>
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Job Salary"
                  onChange={e => updateSalary(e.target.value)}
                />
                {
                  !salaryIsValid &&
                  <div className='text-red-500 mt-2'>
                    <p>Salary is a required field</p>
                  </div>
                }
              </div>

              <div className='grid grid-col-1 text-left text-sm'>
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Job Location"
                  onChange={e => updateLocation(e.target.value)}
                />
                {
                  !locationIsValid &&
                  <div className='text-red-500 mt-2'>
                    <p>Location is a required field</p>
                  </div>
                }
              </div>

              <div className='grid grid-col-1 text-left text-sm'>
                <select
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Job Type"
                  onChange={e => updateType(e.target.value)}
                >
                  <option value=""></option>
                  <option value="On-Site">On-Site</option>
                  <option value="Remote">Remote</option>
                </select>
                {
                  !typeIsValid &&
                  <div className='text-red-500 mt-2'>
                    <p>Job Type is a required field</p>
                  </div>
                }
              </div>

              <input
                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="file"
                placeholder="Job Attachments"
                multiple
                onChange={e => updateFilesPath(e.target.files)}
              />
            </div>



            <button type="submit" className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
              Post
            </button>
          </div>
        </div>
      </form >
    </div >
  );
}
