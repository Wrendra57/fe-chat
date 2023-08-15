"use client";
import Navbar from "@/component/navbar";
import React from "react";
// import { useDispatch } from "react-redux";
import { Button, Card, FormControl } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import ListRoomChat from "@/component/listRoomChat";

import ScrollToBottom from "react-scroll-to-bottom";
import FieldChat from "@/component/fieldChat";
function Chats() {
  return (
    <>
      <div className="main-chat">
        <Navbar />
        <div class="d-flex h-100">
          <ListRoomChat />
          <FieldChat />
          
        </div>
      </div>
    </>
  );
}

export default Chats;
