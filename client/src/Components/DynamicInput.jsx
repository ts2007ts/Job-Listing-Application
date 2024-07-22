import { useState } from "react"

export default function DynamicInput(props) {

  let skillsFromParent = props.sendedSkills;

  if (skillsFromParent) {

  } else {
    skillsFromParent = [""];
  }


  let [skills, setSkills] = useState(skillsFromParent);
  props.recSkills(skills);

  function addNewSkill() {
    setSkills([...skills, ""]);
  }

  function handleChange(event, index) {
    const value = event.target.value;
    const onChangeValue = [...skills];
    onChangeValue[index] = value;
    setSkills(onChangeValue);
  }

  function deleteNewSkill(index) {
    const deleteVal = [...skills];
    deleteVal.splice(index, 1);
    setSkills(deleteVal);
  }

  return (
    <>
      {skills.map((value, index) => (
        <div key={index} className="flex justify-between items-center mt-2">
          <div>
            <input
              type="text"
              name="skill"
              placeholder="Skill required for the job"
              value={value}
              onChange={e => handleChange(e, index)}
              className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            />
          </div>
          <div>
            <button
              className="h-10 bg-orange-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              onClick={e => deleteNewSkill(index)}
              type="button"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      <div className="flex flex-1">
        <button
          className="mt-4 bg-green-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          onClick={addNewSkill}
          type="button"
        >
          Add Skill
        </button>
      </div>
    </>
  )
}
