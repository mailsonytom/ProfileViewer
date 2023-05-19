import React, { useEffect, useState } from "react";
import { Input, Button } from "antd";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Map from "./Map";
import "./dash.css";

const url = "https://panorbit.in/api/users.json";

const Dashboard = () => {
  const [userData, setuserData] = useState();
  const [activePage, setActivePage] = useState(2); // Default active page is 1

  const navigate = useNavigate();

  const handleItemClick = (page) => {
    setActivePage(page);
    if (page == 1) {
      navigate("/dashboard", {
        state: { id: id, name: name, page: "Profile" },
      });
    } else if (page == 3) {
      navigate("/dummypage", {
        state: { id: id, name: name, page: "Gallery" },
      });
    } else if (page == 4) {
      navigate("/dummypage", { state: { id: id, name: name, page: "ToDo" } });
    }
  };

  const location = useLocation();
  const id = location.state?.id;
  const name = location.state?.name;
  const page = location.state?.page;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        const filteredData = response.data.users.filter((item) => {
          return item.id === parseInt(id);
        });
        setuserData(filteredData[0]);
        console.log(filteredData);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchData();
  }, [id, name]);

  return (
    <div className="flex fex-row m-10">
      <div
        className="basis-2/12 w-12 p-7 rounded-2xl h-screen text-white text-left"
        style={{ backgroundColor: "#4550C8" }}
      >
        <ul className="mt-36">
          <li
            onClick={() => handleItemClick(1)}
            className={activePage === 1 ? "active" : ""}
          >
            Profile
          </li>
          <hr className="text-gray-400" />
          <li
            onClick={() => handleItemClick(2)}
            className={activePage === 2 ? "active" : ""}
          >
            Posts
          </li>
          <hr className="text-gray-400" />
          <li
            onClick={() => handleItemClick(3)}
            className={activePage === 3 ? "active" : ""}
          >
            Gallery
          </li>
          <hr className="text-gray-400" />
          <li
            onClick={() => handleItemClick(4)}
            className={activePage === 4 ? "active" : ""}
          >
            ToDo
          </li>
        </ul>
      </div>
      <div className="basis-9/12 ml-4" style={{ textcolor: "#545454" }}>
        <div className="grid grid-cols-12 mt-6 mb-4">
          <div className="col-start-1 col-end-2 font-bold">
            <p id="mygrey">{page}</p>
          </div>
          <div className="col-end-11 ml-6" style={{ marginTop: "-6px" }}>
            <img
              src={userData && userData.profilepicture}
              alt="pp"
              width="40"
              style={{ borderRadius: "50%" }}
            />
          </div>
          <div className="col-end-13 col-span-2">
            <p id="mygrey">{userData && userData.name}</p>
          </div>
        </div>
        <hr />
        <div className="text-center text-7xl text-neutral-200 font-extrabold mt-52">
          <p>Coming Soon</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
