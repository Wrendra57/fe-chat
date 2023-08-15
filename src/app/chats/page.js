"use client";
import Navbar from "@/component/navbar";
import React from "react";
// import { useDispatch } from "react-redux";
import { Button, Card, FormControl } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import ListRoomChat from "@/component/listRoomChat";

import ScrollToBottom from "react-scroll-to-bottom";
function Chats() {
  return (
    <>
      <div className="main-chat">
        <Navbar />
        <div class="d-flex h-100">
          <ListRoomChat />
          <div class="p-2 w-100 bg-white h-100 me-2 mb-2 mt-2 rounded">
            <div className=" p-3 d-flex justify-content-between align-items-center mb-3 ">
              <h2>Wahyu Rendra</h2>
              <Button
                type="submit"
                variant="outline-secondary"
                // onClick={handleShow}
              >
                New
              </Button>
            </div>
            <div className="bg-body-secondary w-100 load-chat">
              <div className="d-flex flex-column h-100">
                <div className="p-2 h-100  messages">
                  <div className="chat-body">
                    <ScrollToBottom className="message-container d-flex flex-column align-items-end">
                      <div
                        // key={index}
                        className="message"
                        // id={
                        //   parseInt(userData.id) !==
                        //   parseInt(messageContent.sender_id)
                        //     ? "you"
                        //     : "other"
                        // }
                        id={"you"}
                        // id={"other"}
                      >
                        <div>
                          <div className="message-content">
                            <p>dasad</p>
                          </div>
                          {/* <p
                            className="align-self-end ms-1 mb-1"
                            style={{ width: "50px" }}
                          >
                            {messageContent.createdat}
                          </p> */}
                        </div>
                      </div>
                      <div
                        // key={index}
                        className="message"
                        // id={
                        //   parseInt(userData.id) !==
                        //   parseInt(messageContent.sender_id)
                        //     ? "you"
                        //     : "other"
                        // }
                        // id={"you"}
                        id={"other"}
                      >
                        <div>
                          <div className="message-content">
                            <p>dasad</p>
                          </div>
                          {/* <p
                            className="align-self-end ms-1 mb-1"
                            style={{ width: "50px" }}
                          >
                            {messageContent.createdat}
                          </p> */}
                        </div>
                      </div>
                      <div
                        // key={index}
                        className="message"
                        // id={
                        //   parseInt(userData.id) !==
                        //   parseInt(messageContent.sender_id)
                        //     ? "you"
                        //     : "other"
                        // }
                        id={"you"}
                        // id={"other"}
                      >
                        <div>
                          <div className="message-content">
                            <p>dasad</p>
                          </div>
                          {/* <p
                            className="align-self-end ms-1 mb-1"
                            style={{ width: "50px" }}
                          >
                            {messageContent.createdat}
                          </p> */}
                        </div>
                      </div>
                      <div
                        // key={index}
                        className="message"
                        // id={
                        //   parseInt(userData.id) !==
                        //   parseInt(messageContent.sender_id)
                        //     ? "you"
                        //     : "other"
                        // }
                        id={"you"}
                        // id={"other"}
                      >
                        <div>
                          <div className="message-content">
                            <p>dasad</p>
                          </div>
                          {/* <p
                            className="align-self-end ms-1 mb-1"
                            style={{ width: "50px" }}
                          >
                            {messageContent.createdat}
                          </p> */}
                        </div>
                      </div>
                      <div
                        // key={index}
                        className="message"
                        // id={
                        //   parseInt(userData.id) !==
                        //   parseInt(messageContent.sender_id)
                        //     ? "you"
                        //     : "other"
                        // }
                        id={"you"}
                        // id={"other"}
                      >
                        <div>
                          <div className="message-content">
                            <p>dasad</p>
                          </div>
                          {/* <p
                            className="align-self-end ms-1 mb-1"
                            style={{ width: "50px" }}
                          >
                            {messageContent.createdat}
                          </p> */}
                        </div>
                      </div>
                      <div
                        // key={index}
                        className="message"
                        // id={
                        //   parseInt(userData.id) !==
                        //   parseInt(messageContent.sender_id)
                        //     ? "you"
                        //     : "other"
                        // }
                        id={"you"}
                        // id={"other"}
                      >
                        <div>
                          <div className="message-content">
                            <p>dasad</p>
                          </div>
                          {/* <p
                            className="align-self-end ms-1 mb-1"
                            style={{ width: "50px" }}
                          >
                            {messageContent.createdat}
                          </p> */}
                        </div>
                      </div>
                      <div
                        // key={index}
                        className="message"
                        // id={
                        //   parseInt(userData.id) !==
                        //   parseInt(messageContent.sender_id)
                        //     ? "you"
                        //     : "other"
                        // }
                        id={"you"}
                        // id={"other"}
                      >
                        <div>
                          <div className="message-content">
                            <p>dasad</p>
                          </div>
                          {/* <p
                            className="align-self-end ms-1 mb-1"
                            style={{ width: "50px" }}
                          >
                            {messageContent.createdat}
                          </p> */}
                        </div>
                      </div>
                      <div
                        // key={index}
                        className="message"
                        // id={
                        //   parseInt(userData.id) !==
                        //   parseInt(messageContent.sender_id)
                        //     ? "you"
                        //     : "other"
                        // }
                        id={"you"}
                        // id={"other"}
                      >
                        <div>
                          <div className="message-content">
                            <p>dasad</p>
                          </div>
                          {/* <p
                            className="align-self-end ms-1 mb-1"
                            style={{ width: "50px" }}
                          >
                            {messageContent.createdat}
                          </p> */}
                        </div>
                      </div>
                      <div
                        // key={index}
                        className="message"
                        // id={
                        //   parseInt(userData.id) !==
                        //   parseInt(messageContent.sender_id)
                        //     ? "you"
                        //     : "other"
                        // }
                        id={"you"}
                        // id={"other"}
                      >
                        <div>
                          <div className="message-content">
                            <p>dasad</p>
                          </div>
                          {/* <p
                            className="align-self-end ms-1 mb-1"
                            style={{ width: "50px" }}
                          >
                            {messageContent.createdat}
                          </p> */}
                        </div>
                      </div>
                      <div
                        // key={index}
                        className="message"
                        // id={
                        //   parseInt(userData.id) !==
                        //   parseInt(messageContent.sender_id)
                        //     ? "you"
                        //     : "other"
                        // }
                        id={"you"}
                        // id={"other"}
                      >
                        <div>
                          <div className="message-content">
                            <p>dasad</p>
                          </div>
                          {/* <p
                            className="align-self-end ms-1 mb-1"
                            style={{ width: "50px" }}
                          >
                            {messageContent.createdat}
                          </p> */}
                        </div>
                      </div>
                      <div
                        // key={index}
                        className="message"
                        // id={
                        //   parseInt(userData.id) !==
                        //   parseInt(messageContent.sender_id)
                        //     ? "you"
                        //     : "other"
                        // }
                        id={"you"}
                        // id={"other"}
                      >
                        <div>
                          <div className="message-content">
                            <p>dasad</p>
                          </div>
                          {/* <p
                            className="align-self-end ms-1 mb-1"
                            style={{ width: "50px" }}
                          >
                            {messageContent.createdat}
                          </p> */}
                        </div>
                      </div>
                      <div
                        // key={index}
                        className="message"
                        // id={
                        //   parseInt(userData.id) !==
                        //   parseInt(messageContent.sender_id)
                        //     ? "you"
                        //     : "other"
                        // }
                        id={"you"}
                        // id={"other"}
                      >
                        <div>
                          <div className="message-content">
                            <p>dasad</p>
                          </div>
                          {/* <p
                            className="align-self-end ms-1 mb-1"
                            style={{ width: "50px" }}
                          >
                            {messageContent.createdat}
                          </p> */}
                        </div>
                      </div>
                      <div
                        // key={index}
                        className="message"
                        // id={
                        //   parseInt(userData.id) !==
                        //   parseInt(messageContent.sender_id)
                        //     ? "you"
                        //     : "other"
                        // }
                        id={"you"}
                        // id={"other"}
                      >
                        <div>
                          <div className="message-content">
                            <p>dasad</p>
                          </div>
                          {/* <p
                            className="align-self-end ms-1 mb-1"
                            style={{ width: "50px" }}
                          >
                            {messageContent.createdat}
                          </p> */}
                        </div>
                      </div>
                      <div
                        // key={index}
                        className="message"
                        // id={
                        //   parseInt(userData.id) !==
                        //   parseInt(messageContent.sender_id)
                        //     ? "you"
                        //     : "other"
                        // }
                        id={"you"}
                        // id={"other"}
                      >
                        <div>
                          <div className="message-content">
                            <p>dasad</p>
                          </div>
                          {/* <p
                            className="align-self-end ms-1 mb-1"
                            style={{ width: "50px" }}
                          >
                            {messageContent.createdat}
                          </p> */}
                        </div>
                      </div>
                      <div
                        // key={index}
                        className="message"
                        // id={
                        //   parseInt(userData.id) !==
                        //   parseInt(messageContent.sender_id)
                        //     ? "you"
                        //     : "other"
                        // }
                        id={"you"}
                        // id={"other"}
                      >
                        <div>
                          <div className="message-content">
                            <p>dasad</p>
                          </div>
                          {/* <p
                            className="align-self-end ms-1 mb-1"
                            style={{ width: "50px" }}
                          >
                            {messageContent.createdat}
                          </p> */}
                        </div>
                      </div>
                      <div
                        // key={index}
                        className="message"
                        // id={
                        //   parseInt(userData.id) !==
                        //   parseInt(messageContent.sender_id)
                        //     ? "you"
                        //     : "other"
                        // }
                        id={"you"}
                        // id={"other"}
                      >
                        <div>
                          <div className="message-content">
                            <p>dasad</p>
                          </div>
                          {/* <p
                            className="align-self-end ms-1 mb-1"
                            style={{ width: "50px" }}
                          >
                            {messageContent.createdat}
                          </p> */}
                        </div>
                      </div>
                    </ScrollToBottom>
                  </div>
                  {/* <ScrollableFeed>
                    <div className="d-flex">
                      <Image
                        src={
                          "https://res.cloudinary.com/dhtypvjsk/image/upload/v1691732035/nopicture_u5efnz.png"
                        }
                        width={20}
                        height={20}
                        alt="profil"
                      />
                      <span
                        style={{
                          backgroundColor: `#BEE3F8`,
                          marginLeft: "33px",
                          marginTop: "3px",
                          borderRadius: "20px",
                          padding: "5px 15px",
                          maxWidth: "75%",
                        }}
                      >
                        dasasd
                      </span>
                    </div>
                    <div className="d-flex">
                      <Image
                        src={
                          "https://res.cloudinary.com/dhtypvjsk/image/upload/v1691732035/nopicture_u5efnz.png"
                        }
                        width={20}
                        height={20}
                        alt="profil"
                      />
                      <span
                        style={{
                          backgroundColor: `#B9F5D0`,
                          marginLeft: "0px",
                          marginTop: "10px",
                          borderRadius: "20px",
                          padding: "5px 15px",
                          maxWidth: "75%",
                        }}
                      >
                        dsa
                      </span>
                    </div>
                  </ScrollableFeed> */}
                </div>
                <div className="p-2 flex-shrink-1 mb-2">
                  <FormControl></FormControl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chats;
