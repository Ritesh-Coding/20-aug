import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { SidebarData } from "./SideBarData";
import logo from "../../../assets/hrms.png";
import { IconContext } from "react-icons/lib";
import SubMenu from "./SubMenu";
import { useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import useAxios from "../../../hooks/useAxios";
import notification from "../../../assets/notificationIcon.png";
import { NotificationType } from "../../../types/sideBar/sideBar";
import { RootState } from "../../../types/types";
import "./SideBar.css";
const Nav = styled.div`
  background: #ffffff;
  height: 80px;
  display: flex;
  justify-content: end;
  align-items: center;  
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;



const SidebarNav = styled.nav`
  background: #112f4b;
  width: 250px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  transition: 350ms;
  z-index: 10;
  border-top-right-radius: 25px;
`;
const SidebarWrap = styled.div`
  width: 100%;
`;

const formatDate = (dateString : string): string => {
  if (dateString === "-") return "-";
  const options: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit" };
  return new Date(dateString).toLocaleString(undefined, options);
};
const Sidebar : React.FC = () => {
  const axiosInstance = useAxios();
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [notificationData, setNotification] = useState<NotificationType[]>([]);
  const { firstName,navTitle,profile} = useSelector((state : RootState) => state.auth);
  

  const handleNotification = () => {
    axiosInstance.patch(`notification/`);
    setShowUpdateModal(true);
  };
  useEffect(() => {
    axiosInstance.get(`notification/`).then((res) => {
      setNotification(res.data);     
    });
  }, []);
  return (
    <>
      <IconContext.Provider value={{ color: "#FFFFFF" }}>
        <header>
          <Nav>
            <div>
              <h1 style={{position:"relative",right:"500px"}}>{navTitle}</h1>
            </div>
            <div className="navbar">
              <img
                src={notification}
                onClick={handleNotification}
                width="35px"
                alt="Notification Icon" 
              ></img>
              <p>
                {notificationData.length > 0 &&
                  notificationData[0]["total_notification"]}
              </p>
              <Link to="#home">News</Link>
              <Link to="/calender">Calender</Link>
              <div className="dropdown">
                <button className="dropbtn">
                  <img className="navBarProfile" src={`http://127.0.0.1:8000/media/${profile}`} width={40} alt="profile"/>
          
                  {firstName}
                  <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content">
                  <Link to="/profile">Profile</Link>
                  <Link to="/change-password">Change Password</Link>
                  <Link to="/logout">Logout</Link>
                </div>
              </div>
            </div>
          </Nav>
          <Modal
            show={showUpdateModal}
            onHide={() => setShowUpdateModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Notifications</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body">
              {notificationData.length > 0 ? (
                notificationData.map((notification) => (
                  <div key={notification.id}>
                    <pre>
                      {notification.employee_id.first_name}{" "}
                      {notification.message} {formatDate(notification.status)}
                    </pre>
                  </div>
                ))) : 
                <h2>Notification Not Found</h2>
              }
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowUpdateModal(false)}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </header>
        <SidebarNav>
          <SidebarWrap>
          <div style={{padding:`10px`}}>
              <img src={logo} alt="Logo" width={60} />
              <a style={{color: "#FFFFFF",fontSize:`30px`,textAlign:`center`}}>eSparkBiz</a>
            </div>           
            {SidebarData.map((item, index) => (
              <SubMenu item={item} key={index} />
            ))}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
