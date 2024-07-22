import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import DynamicInput from "../../Components/DynamicInput";
import download from 'downloadjs';

export default function Edit() {

  const params = useParams();

  const navigate = useNavigate();

  const [job, updateJob] = useState();

  let [title, updateTitle] = useState('');
  let [description, updateDescription] = useState('');
  let [skills, updateSkills] = useState([]);
  let [salary, updateSalary] = useState('');
  let [location, updateLocation] = useState('');
  let [type, updateType] = useState([]);
  let [filesPath, updateFilesPath] = useState([]);
  let [serverFilesPath, updateServerFilesPath] = useState([]);

  let [titleIsValid, setTitleIsValid] = useState(true);
  let [descriptionIsValid, setDescriptionIsValid] = useState(true);
  let [skillsIsValid, setSkillsIsValid] = useState(true);
  let [salaryIsValid, setSalaryIsValid] = useState(true);
  let [locationIsValid, setLocationIsValid] = useState(true);
  let [typeIsValid, setTypeIsValid] = useState(true);



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
        updateTitle(res.data.data.job.title);
        updateDescription(res.data.data.job.description);
        updateSkills(res.data.data.job.skills);
        updateSalary(res.data.data.job.salary);
        updateLocation(res.data.data.job.location);
        updateType(res.data.data.job.type);
        updateServerFilesPath(res.data.data.job.filesPath);
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


  let files = [];
  serverFilesPath.forEach((path) => {
    let newPath = path.replace(/\\/g, "/");
    let fileName = newPath.replace("public/files/", "");
    files.push({ path: newPath, name: fileName });
  });


  function receiveSkills(sklls) {
    skills = sklls;
  }

  function submitEditedJob(e) {
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

    let updatedJob = {
      title: title,
      description: description,
      skills: skills,
      salary: salary,
      location: location,
      type: type,
      userId: user,
      filesPath: filesPath

    }

    patchJob(updatedJob)
  }

  function patchJob(job) {
    axios.patch(
      'http://localhost:5000/api/jobs/' + params.id,
      job,
      {
        headers: {
          'authorization': localStorage.getItem('token'),
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => {
        Swal.fire({
          icon: "success",
          title: res.data.message,
          showConfirmButton: true,
        });
        navigate('/jobs/view/' + params.id);
      })
      .catch(err => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.error.message
        });
      })
  }

  function deleteSingleFile(fileName, jobID) {
    axios.delete('http://localhost:5000/api/jobs/delete/single/' + fileName + '/' + jobID)
      .then(res => {
        Swal.fire({
          icon: "success",
          title: res.data.message,
          showConfirmButton: true,
        });
        navigate('/jobs/view/' + jobID);
      })
      .catch(err => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.error.message
        });
      })

  }

  function downloadSingleFile(fileName, jobID) {
    axios.get(
      'http://localhost:5000/api/jobs/download/single/' + fileName + '/' + jobID, { responseType: 'blob' }
    )
      .then(res => {
        download(res.data, fileName, res.data.type);
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
            text: err.response.data.error.message
          });
        }
      })
  }


  if (job) {
    return (
      <div className='mt-2'>
        <form onSubmit={submitEditedJob}>
          <div className="mt-8 flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                Update the Job {job._id}
              </h1>

            </div>
            <div className="w-4/5 flex-1 mt-8">
              <div className="flex flex-col gap-3">
                <div className='grid grid-col-1 text-left text-sm'>
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    defaultValue={job.title}
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
                    defaultValue={job.description}
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

                  <DynamicInput sendedSkills={job.skills} recSkills={receiveSkills} />
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
                    defaultValue={job.salary}
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
                    defaultValue={job.location}
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
                    defaultValue={job.type}
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


              {files && (
                <div className="mt-4 flex justify-between text-sm bg-pink-50 m-2 p-2 rounded-xl gap-4">
                  {files.map((file, index) => (
                    <div key={index}>
                      {file.name}
                      <div className="flex justify-between">
                        <span
                          className="text-blue-400 font-bold hover:underline hover:cursor-pointer"
                          onClick={e => downloadSingleFile(file.name, job._id)}
                        >
                          Download
                        </span>
                        <span
                          className="text-red-400 font-bold hover:underline hover:cursor-pointer"
                          onClick={e => deleteSingleFile(file.name, job._id)}
                        >
                          Delete
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}


              <button type="submit" className="mt-5 tracking-wide font-semibold bg-blue-700 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-500 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                Update
              </button>
            </div>
          </div>
        </form >
      </div >
    );
  } else {
    return (
      <>
        <Header />
        <Footer />
      </>
    )
  }
}
