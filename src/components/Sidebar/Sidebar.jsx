import "./Sidebar.css"

const Sidebar = () => {
  return (
    <>
      <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0">
        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2  min-vh-100 sticky-top">
          <a
            href="/"
            className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-decoration-none margin-top"
          >
            <span className="fs-5 d-none d-sm-inline">Home</span>
          </a>
          <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
            id="menu"
          >
            {/* menu que se expande */}
            <li>
              <a
                href="#submenu1"
                data-bs-toggle="collapse"
                className="nav-link px-0 align-middle"
              >
                <i className="fs-4 bi-speedometer2"></i>{" "}
                <span className="ms-1 d-none d-sm-inline">Dashboard</span>{" "}
              </a>
              <ul
                className="collapse show nav flex-column ms-1"
                id="submenu1"
                data-bs-parent="#menu"
              >
                <li className="w-100">
                  <a href="#" className="nav-link px-0">
                    {" "}
                    <span className="d-none d-sm-inline">Item</span> 5{" "}
                  </a>
                </li>
                <li>
                  <a href="#" className="nav-link px-0">
                    {" "}
                    <span className="d-none d-sm-inline">Item</span> 6{" "}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Sidebar
