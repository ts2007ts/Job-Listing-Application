import { useState } from "react";

export default function Filter(props) {

  let [searchText, setSearchText] = useState('');

  function search() {
    props.searchText(searchText);
  }

  return (
    <>
      <div className="flex justify-between mb-10 mt-20 gap-3">
        <input
          type="text"
          className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={e => setSearchText(e.target.value)}
        />
        <button
          onClick={search}
          className="border-2 rounded-xl px-4 py-2 bg-blue-500 text-white "
        >
          Search
        </button>
      </div>
    </>
  )
}
