import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { navbarTitle } from "../../../reducers/authReducer";
import appClient from "../../../network/AppClient";
import styled from "styled-components";
const Nav = styled.div`
  background: #ffffff;
  height: 80px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
interface DesignationType {
  designation: string;
  department : string
}
interface ProfileType {
  profile: string;
  bio: string;
}
interface HotlineType {
  id: number;
  first_name: string;
  last_name: string;
  status: string;
  status_time: string;
  profileImage: ProfileType[];
  designation: DesignationType[];
}
const Hotline: React.FC = () => {
  const dispatch = useDispatch();
  dispatch(navbarTitle({ navTitle: "Hotline" }));
  const [employee, setEmployee] = useState<HotlineType[]>([]);
  const [status, setStatus] = useState<string>("Check In");
  const [search, setSearch] = useState<string>("");
  const fetchEmployee = (search: string | undefined, status: string | undefined) => {
    appClient.get("todayEmployeeActivity/",{
      params : {
        search,
        status,
      }
    }       
    ).then((res) => {    
      setEmployee(res.data)        
    })       
  };
  const fetchOfflineEmployee = (search: string | undefined, status: string | undefined)=>{
    appClient.get("hotline/",{
      params : { 
        status,
      }
    }       
    ).then((res) => {    
      setEmployee(res.data)        
    })   
  }

  useEffect(() => { 
    if(status=="offline"){
      fetchOfflineEmployee(search,status)
    }
    else{
      fetchEmployee(search,status);
    }
  }, [status]);
  
  
  console.log("This is my hotline Employee", employee);
  return (
    <div style={{ marginLeft: `260px` }}>
       <Nav>
        <div className="navbar">
          <button
            className="btn btn-success"
            id="calenderBtn"
            onClick={() => setStatus("Check In")}
          >
            Online
          </button>
          <button
            className="btn btn-success"
            id="birthdayBtn"
            onClick={() => setStatus("Break In")}
          >
            On Break
          </button>
          <button
            className="btn btn-success"
            id="birthdayBtn"
            onClick={() => setStatus("offline")}
          >
            Offline
          </button>
        </div>
      </Nav>
      
      {employee.map((emp, index) => (
        <div key={index}>
          <div className="card" style={{ width: `18rem` }}>
           
            <img
              className="card-img-top"
              src={`http://127.0.0.1:8000/media/${emp["profileImage"][0]["profile"]}`}
              alt="No Employees Available"
            />
            <div className="card-body">
            
            <p>{emp && emp["first_name"]} {emp["last_name"]}</p>
            <p>{emp["designation"][0] && emp["designation"][0]["department"]}</p>
            <p>{emp["designation"][0] && emp["designation"][0]["designation"]}</p>
            </div>
          </div>
        </div>
      ))}
    </div> 
  );
};

export default Hotline;
