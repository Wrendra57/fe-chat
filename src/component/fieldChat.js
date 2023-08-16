import React, { useEffect, useRef, useState } from "react";
import { Button, Card, FormControl, Spinner } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";

import ScrollToBottom from "react-scroll-to-bottom";
import { useSelector } from "react-redux";
import {
  useGetAllChatMutation,
  useGetHeaderChatMutation,
  useSendChatMutation,
} from "@/app/store/apis/chat";
import { socket } from "@/app/chats/page";

function FieldChat({
  fetchAgain,
  setFetchAgain,
  fetchListRoom,
  setFetchListRoom,
}) {
  const selectedRoom = useSelector((state) => state.chat.selectedRoom);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const [header, setHeader] = useState({});
  const [allChat, setAllChat] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const chatRef = useRef({});
  const [
    getHeaderChatHit,
    {
      isLoading: isLoadingHeader,
      isError: isErrorHeader,
      error: errorHeader,
      isSuccess: isSuccessHeader,
      data: dataHeader,
    },
  ] = useGetHeaderChatMutation();

  const [
    getAllChatHit,
    {
      isLoading: isLoadingChat,
      isError: isErrorChat,
      error: errorChat,
      isSuccess: isSuccessChat,
      data: dataChat,
    },
  ] = useGetAllChatMutation();

  const [
    sendChatHit,
    {
      isLoading: isLoadingSendChat,
      isError: isErrorSendChat,
      error: errorSendChat,
      isSuccess: isSuccessSendChat,
      data: dataSendChat,
    },
  ] = useSendChatMutation();

  useEffect(() => {
    if (selectedRoom) {
      getHeaderChatHit({ token: token, roomId: selectedRoom });
      getAllChatHit({ token: token, roomId: selectedRoom });
      // console.log("lkj");
    }
  }, [fetchAgain]);

  const handleSendMessage = async () => {
    // console.log("sendMessage");
    // console.log(currentMessage);
    // console.log(user);
    if (currentMessage !== "") {
      const messageDataSend = {
        sender_id: user.uuid,
        User: {
          name: user.name,
        },
        content: currentMessage,
        roomId: selectedRoom,
        created_at: Date.now(),
      };
      await socket.emit("send-message", messageDataSend);

      const payload = {
        room_id: selectedRoom,
        content: currentMessage,
      };
      await sendChatHit({ body: payload, token: token });
      setAllChat((list) => [...list, messageDataSend]);
      chatRef.current = messageDataSend;
      setFetchListRoom(!fetchListRoom);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive-message", (data) => {
      // console.log(data);
      // console.log(chatRef);
      if (!chatRef.current.created_at) {
        chatRef.current = data;
        setAllChat((list) => [...list, data]);
      }
      if (chatRef.current.created_at) {
        if (chatRef.current.created_at !== data.created_at) {
          chatRef.current = data;
          setAllChat((list) => [...list, data]);
        }
      }
    });
  }, [socket]);

  useEffect(() => {
    if (isSuccessHeader) {
      console.log(dataHeader.data[0]);

      setHeader(dataHeader.data[0]);
    }

    if (isErrorHeader) {
      console.log(errorHeader);
    }
  }, [isLoadingHeader]);
  useEffect(() => {
    if (isSuccessChat) {
      // console.log(dataChat.data);

      setAllChat((data) => dataChat.data);
    }

    if (isErrorChat) {
      console.log(errorChat);
    }
  }, [isLoadingChat]);
  useEffect(() => {
    if (isSuccessSendChat) {
      // console.log(dataChat.data);
      // setAllChat((data) => dataChat.data);
    }

    if (isErrorSendChat) {
      console.log(errorSendChat);
    }
  }, [isLoadingSendChat]);
  return (
    <>
      {selectedRoom !== "" ? (
        <>
          {isLoadingChat && isLoadingHeader ? (
            <>
              <div className="p-2 w-100 bg-white h-100 me-2 mb-2 mt-2 rounded d-flex justify-content-center align-items-center">
                <Spinner animation="border" size="lg" />
              </div>
            </>
          ) : (
            <>
              <div className="p-2 w-100 bg-white h-100 me-2 mb-2 mt-2 rounded ">
                <div
                  className=" p-3 d-flex align-items-center mb-3 "
                  key={header.uuid}
                >
                  <Image
                    src={
                      header.avatar === null
                        ? "https://res.cloudinary.com/dhtypvjsk/image/upload/v1691732035/nopicture_u5efnz.png"
                        : header.avatar
                    }
                    className="rounded-circle"
                    width={45}
                    height={45}
                    alt="avatar profil"
                  />

                  <h2 className="flex-grow-1 ms-2">{header.title}</h2>
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
                          {allChat.length !== 0 ? (
                            <>
                              {allChat.map((item, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="message"
                                    id={
                                      item.sender_id === user.uuid
                                        ? "you"
                                        : "other"
                                    }
                                  >
                                    <div>
                                      <div className="message-content d-flex flex-column justify-content-start">
                                        {item.sender_id === user.uuid ? (
                                          ""
                                        ) : (
                                          <div className="sender-name fw-bold text-info-emphasis">
                                            {item.User.name}
                                          </div>
                                        )}
                                        <p>{item.content}</p>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </>
                          ) : (
                            <>
                              <p className="text-center">Belum ada pesan</p>
                            </>
                          )}
                        </ScrollToBottom>
                      </div>
                    </div>
                    <div className="p-2 flex-shrink-1 mb-2">
                      <FormControl
                        // onKeyDown={handleSendMessage}
                        onKeyPress={(event) => {
                          if (event.key === "Enter") {
                            handleSendMessage();
                          }
                        }}
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        size="lg"
                        type="text"
                        placeholder="Large text"
                      ></FormControl>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="p-2 w-100 bg-white h-100 me-2 mb-2 mt-2 rounded d-flex justify-content-center align-items-center">
          <h1>Click on a user to start chatting</h1>
        </div>
      )}
    </>
  );
}

export default FieldChat;
