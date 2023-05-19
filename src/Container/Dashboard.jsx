import React, { useEffect, useState } from "react";
import { Button, Popover, Space, List } from "antd";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Map from "./Map";
import "./dash.css";
import ChatPopup from "./ChatPopup";

const url = "https://panorbit.in/api/users.json";

const Dashboard = () => {
  const [userData, setuserData] = useState();
  const [activePage, setActivePage] = useState(1); // Default active page is 1
  const [otherUsers, setotherUsers] = useState();

  const navigate = useNavigate();

  const location = useLocation();
  const id = location.state?.id;
  const name = location.state?.name;

  const nameClicked = (user) => {
    const name = user.name;
    const key = user.id;
    navigate("/dashboard", { state: { id: key, name: name } });
  };

  const toLogin = () => {
    navigate("/login");
  };

  const content = (
    <div className="text-center h-56 overflow-auto">
      <center>
        <img
          src={userData && userData.profilepicture}
          alt="pp"
          width="80px"
          className="rounded-full"
        />
      </center>
      <p className="text-base">{userData && userData.name}</p>
      <p className="text-sm">{userData && userData.email}</p>
      <List
        dataSource={otherUsers}
        renderItem={(otheruser) => (
          <List.Item
            className="text-left cursor-pointer"
            key={otheruser.id}
            onClick={() => nameClicked(otheruser)}
          >
            <div className="grid grid-cols-6">
              <img
                src={otheruser.profilepicture}
                alt="pp"
                width="30px"
                className=" col-span-1 rounded-full"
              />
              <span className="text-lg col-span-5 ml-2">{otheruser.name}</span>
            </div>
          </List.Item>
        )}
      />
      <Button type="primary" danger onClick={toLogin}>
        Sign out
      </Button>
    </div>
  );

  const handleItemClick = (page) => {
    setActivePage(page);
    if (page == 2) {
      navigate("/dummypage", { state: { id: id, name: name, page: "Posts" } });
    } else if (page == 3) {
      navigate("/dummypage", {
        state: { id: id, name: name, page: "Gallery" },
      });
    } else if (page == 4) {
      navigate("/dummypage", { state: { id: id, name: name, page: "ToDo" } });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setotherUsers(response.data.users);
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
        className="basis-2/12 p-7 rounded-2xl h-screen text-white text-left"
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
            <p id="mygrey">Profile</p>
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
            <Popover content={content} title="" trigger="click">
              <p id="mygrey">{userData && userData.name}</p>
            </Popover>
          </div>
        </div>
        <hr />
        <div className="grid grid-cols-12 mt-10">
          <div className="col-span-4">
            <center>
              <img
                src={userData && userData.profilepicture}
                alt="pp"
                width="180"
                style={{ borderRadius: "50%", marginBottom: "20px" }}
              />
            </center>
            <p id="mygrey">{userData && userData.name}</p>
            <div className="grid grid-cols-3">
              <div className="text-right col-span-1 text-gray-400">
                <p>Username :</p>
                <p>Email :</p>
                <p>Phone :</p>
                <p>Website :</p>
              </div>
              <div className="text-left col-span-2 ml-2" id="mygrey">
                <p>{userData && userData.username}</p>
                <p>{userData && userData.email}</p>
                <p>{userData && userData.phone}</p>
                <p>{userData && userData.website}</p>
              </div>
            </div>
            <hr className="mt-4 mb-4" />
            <p className="text-gray-400">Company</p>
            <div className="grid grid-cols-3">
              <div className="text-right col-span-1 text-gray-400">
                <p>Name:</p>
                <p>Catchphrase:</p>
                <p>bs:</p>
              </div>
              <div className="text-left col-span-2 ml-2" id="mygrey">
                <p>{userData && userData.company.name}</p>
                <p>{userData && userData.company.catchPhrase}</p>
                <p>{userData && userData.company.bs}</p>
              </div>
            </div>
          </div>
          <div
            style={{
              borderLeft: "1px solid #9CA3AF",
              height: "100%",
              margin: "20px",
              backgroundColor: "gray",
              width: "0.5px",
            }}
          ></div>
          <div className="col-span-3">
            <p className="text-left text-gray-400 ml-1">Address:</p>
            <div className="grid grid-cols-3">
              <div className="text-right col-span-1 text-gray-400">
                <p>Street :</p>
                <p>Suite :</p>
                <p>City :</p>
                <p>Zipcode :</p>
              </div>
              <div className="text-left col-span-2 ml-2" id="mygrey">
                <p>{userData && userData.address.street}</p>
                <p>{userData && userData.address.suite}</p>
                <p>{userData && userData.address.city}</p>
                <p>{userData && userData.address.zipcode}</p>
              </div>
            </div>
            <Map
              latitude={userData && userData.address.geo.lat}
              longitude={userData && userData.address.geo.lng}
            />
          </div>
        </div>
        <ChatPopup users={otherUsers} />
      </div>
    </div>
  );
};

export default Dashboard;
