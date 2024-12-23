import AjouterAnnonce from "../ajouter-annonce/AjouterAnnonce.tsx";


const Header = () => {

    const dataStorage = localStorage.getItem("data");
    const nom = dataStorage ? JSON.parse(dataStorage).nom : null;
    const prenom = dataStorage ? JSON.parse(dataStorage).prenom : null;

    return (
      <>
          <div className="navbar h-[80px] padding-container">
              <div className="navbar-start">
                  <div className="navbar-start">
                      <a className="btn btn-ghost h-[70px] text-xl">
                          <img src="./logo.png"
                               className="h-[70px] flex relative bottom-1 "
                             alt=""/>
                      </a>
                  </div>

              </div>
              <div className="navbar-center flex items-center gap-14 text-lg text-white">
                  <label className="input input-bordered flex items-center gap-2">
                      <input type="text" className="grow" placeholder="Search"/>
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="h-4 w-4 opacity-70">
                          <path
                              fillRule="evenodd"
                              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                              clipRule="evenodd"/>
                      </svg>
                  </label>

                  <AjouterAnnonce/>


              </div>

              <div className="navbar-end">
                  <button className="btn btn-ghost btn-circle">
                          <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                          </svg>
                      </button>
                  <button className="btn btn-ghost btn-circle dropdown dropdown-end">
                      <div tabIndex={1} className="indicator">
                          <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                          </svg>
                          <span className="badge badge-xs badge-primary indicator-item"></span>
                      </div>
                      <ul
                          tabIndex={1}
                          className="menu menu-sm dropdown-content text-xs w-[300px] bg-base-100 rounded-box z-[1] mt-3  p-2 shadow"
                      >
                          {/* Notifications statiques */}
                          <li>
                              <a>New message from John</a>
                          </li>
                          <li>
                              <a>New comment on your post</a>
                          </li>
                          <li>
                              <a>Sarah liked your photo</a>
                          </li>
                          <li>
                              <a>Update available for your app</a>
                          </li>
                      </ul>
                  </button>
                  <div className="dropdown dropdown-end">
                      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                          <div className="w-10 rounded-full">
                              <img
                                  alt="Tailwind CSS Navbar component"
                                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"/>
                          </div>
                      </div>
                      <ul
                          tabIndex={0}
                              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                              <li>
                                  <a className="justify-between">
                                      Profile
                                      <span className="badge">New</span>
                                  </a>
                              </li>
                              <li><a>Settings</a></li>
                              <li><a>Logout</a></li>
                          </ul>
                      </div>
                  </div>
                  <div className="flex flex-col">
                      <div><p>{nom}</p></div>
                      <div><p>{prenom}</p></div>
                  </div>
          </div>
      </>
  )
};
export default Header;