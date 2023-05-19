import React, { useState } from "react";
import "./chatpopup.css";
import { Button, Popover, Space, List } from "antd";

const ChatPopup = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [headerHidden, setheaderHidden] = useState(false);
  const [chatBox, setchatBox] = useState(false);
  const [chattername, setchattername] = useState();
  const [chatterprofile, setchatterprofile] = useState();

  const togglePopup = () => {
    setIsOpen(!isOpen);
    setheaderHidden(!headerHidden);
    setchatBox(false);
    setchattername("");
    setchatterprofile("");
  };

  const userClicked = (user) => {
    console.log("User", user);
    setchatBox(true);
    setchattername(user.name, user.profilepicture);
    setchatterprofile(user.profilepicture);
  };

  return (
    <div className="flex justify-end">
      {chatBox && (
        <div className="chatter-popup rounded overflow-auto">
          <div
            className="chatter-header-inside text-start text-white rounded grid grid-cols-12"
            style={{ backgroundColor: "blueviolet" }}
            onClick={togglePopup}
          >
            <img
              src={chatterprofile}
              alt="pp"
              width="30px"
              className="rounded-full col-span-2"
            />
            <p className="col-span-9" onClick={togglePopup}>
              {chattername}
            </p>
          </div>
          <div className="chat-body"></div>
          <div className="grid grid-cols-12">
          <input className="chat-footer cursor-text w-full col-span-10" placeholder="Message"></input>
          <button className="text-blue-500 col-span-2 pt-2">Send</button>
          {/* <img src="../../assets/icons_send.png" alt="a" className="col-span-1" width="30px"/> */}
          </div>
        </div>
      )}

      {headerHidden == false && (
        <div
          onClick={togglePopup}
          className="chat-header text-start text-white rounded cursor-pointer"
          style={{ backgroundColor: "blueviolet" }}
        >
          <p>Chats</p>
        </div>
      )}
      {isOpen && (
        <div className="chat-popup rounded overflow-auto">
          <div
            className="chat-header-inside text-start text-white rounded"
            style={{ backgroundColor: "blueviolet" }}
            onClick={togglePopup}
          >
            <button onClick={togglePopup}>Chats</button>
          </div>
          <div>
            <List
              dataSource={props.users}
              renderItem={(otheruser) => (
                <List.Item
                  className="text-left cursor-pointer"
                  key={otheruser.id}
                  onClick={() => userClicked(otheruser)}
                >
                  <div className="grid grid-cols-6 px-2">
                    <img
                      src={otheruser.profilepicture}
                      alt="pp"
                      width="30px"
                      className="col-span-1 rounded-full"
                    />
                    <span className="text-xm col-span-5 ml-2">
                      {otheruser.name}
                    </span>
                  </div>
                </List.Item>
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPopup;
