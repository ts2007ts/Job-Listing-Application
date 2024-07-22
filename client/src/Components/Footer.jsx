import { Link } from "react-router-dom";

function Footer() {
  return (
    <div >
      <footer className="mt-[60%] flex flex-row items-center justify-between sm:justify-around p-2 border-b-2 bg-gray-100 rounded-xl">

        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://flowbite.com/" className="hover:underline">Job Listing Application™</a>. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <Link to={'/about'} className="hover:underline me-4 md:me-6">About</Link>
          </li>
          <li>
            <Link to={'/privacy'} className="hover:underline me-4 md:me-6">Privacy Policy</Link>
          </li>
          <li>
            <Link to={'/licensing'} className="hover:underline me-4 md:me-6">Licensing</Link>
          </li>
          <li>
            <Link to={'/contact'} className="hover:underline">Contact</Link>
          </li>
        </ul>
      </footer>
    </div>
  )
}

export default Footer;
