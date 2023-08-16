"use client";
import Navbar from "@/component/navbar";
import React, { useState } from "react";
// import { useDispatch } from "react-redux";
import { Button, Card, FormControl } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import ListRoomChat from "@/component/listRoomChat";
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import FieldChat from "@/component/fieldChat";

export const socket = io.connect("http://localhost:8000");

function Chats() {
  const [fetchAgain, setFetchAgain] = useState(false);
  const [fetchListRoom, setFetchListRoom] = useState(false);
  return (
    <>
      <div className="main-chat">
        <Navbar
          fetchAgain={fetchAgain}
          setFetchAgain={setFetchAgain}
          fetchListRoom={fetchListRoom}
          setFetchListRoom={setFetchListRoom}
        />
        <div className="d-flex h-100">
          <ListRoomChat
            fetchAgain={fetchAgain}
            setFetchAgain={setFetchAgain}
            fetchListRoom={fetchListRoom}
            setFetchListRoom={setFetchListRoom}
          />
          <FieldChat
            fetchAgain={fetchAgain}
            setFetchAgain={setFetchAgain}
            fetchListRoom={fetchListRoom}
            setFetchListRoom={setFetchListRoom}
          />
        </div>
      </div>
    </>
  );
}

export default Chats;
