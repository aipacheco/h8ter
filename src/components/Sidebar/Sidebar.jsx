import "./Sidebar.css"
import { 
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem } from "cdbreact";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      className={`app fixed-top`}
      style={{ display: "flex", height: "100%", overflow: "scroll initial" }}
    >
      <CDBSidebar textColor="#2e2e2e" backgroundColor="">
        <CDBSidebarHeader >

        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content ">
          <CDBSidebarMenu>
            <NavLink  to="/" activeclassname="activeClicked">
              <CDBSidebarMenuItem icon="columns">dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink  to="/tables" activeclassname="activeClicked">
              <CDBSidebarMenuItem icon="table">tables</CDBSidebarMenuItem>
            </NavLink>
            <NavLink  to="/profile" activeclassname="activeClicked">
              <CDBSidebarMenuItem icon="user">profile</CDBSidebarMenuItem>
            </NavLink>

          </CDBSidebarMenu>
          <CDBSidebarMenu></CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  )
}

export default Sidebar
