import React, { useEffect, useState } from "react";
import { Input, Button } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { List } from "antd";

const url = "https://panorbit.in/api/users.json";

const Login = () => {
  const [users, setusers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setusers(response.data.users);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, []);

  const nameClicked = (user) => {
    const name = user.name;
    const key = user.id;
    navigate("/dashboard", { state: { id: key, name: name } });
  };

  return (
    <div
      style={{
        background: "linear-gradient(to top, #FFFFFF, #94ced1, #322f8f)",
      }}
    >
      <div className="flex justify-center rounded-3xl">
        <List
          className="w-4/12 bg-white mt-4 mb-4  h-96 mt-40 overflow-auto"
          header={
            <div className="bg-gray text-lg text-gray-600 font-bold">
              Select an account
            </div>
          }
          bordered
          dataSource={users}
          renderItem={(user) => (
            <List.Item
              className="text-left cursor-pointer"
              key={user.id}
              onClick={() => nameClicked(user)}
            >
              <div className="grid grid-cols-6">
                <img
                  src={user.profilepicture}
                  alt="pp"
                  width="30px"
                  className=" col-span-1 rounded-full"
                />
                <span className="text-base col-span-5 ml-2">{user.name}</span>
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default Login;
