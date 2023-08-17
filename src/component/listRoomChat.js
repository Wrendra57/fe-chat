import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/component/navbar";
import Badge from "react-bootstrap/Badge";
// import { useDispatch } from "react-redux";
import { Button, Card } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { useGetListRoomMutation } from "@/app/store/apis/chat";
import { useDispatch, useSelector } from "react-redux";
import {
  addSelectedRoom,
  emptySelectedRoom,
} from "@/app/store/slices/chatSlice";
import { socket } from "@/app/chats/page";
import CreateGroup from "./createGroup";
function ListRoomChat({
  fetchAgain,
  setFetchAgain,
  fetchListRoom,
  setFetchListRoom,
}) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const selectedRoom = useSelector((state) => state.chat.selectedRoom);
  const [error, setError] = useState({});
  const [getListRoomHit, { isLoading, isError, error: err, isSuccess, data }] =
    useGetListRoomMutation();
  const [dataResult, setDataResult] = useState([]);
  const [selectedChat, setSelectedChat] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getListRoomHit({ token: token });
    dispatch(emptySelectedRoom());
  }, []);

  useEffect(() => {
    console.log("jalanlistroom terima pesan");
    getListRoomHit({ token: token });
  }, [fetchListRoom]);

  useEffect(() => {
    if (isSuccess) {
      setDataResult(data.data);
      // console.log("123");
      // console.log(data.data);
      if (data.data.length === 0) {
        setError((error) => ({
          ...error,
          listRoom: "Belum ada Pesan",
        }));
        return;
      }
    }

    if (isError) {
      console.log(err);
      setError((error) => ({
        ...error,
        error: err.data.message,
      }));
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const handleSelectedChat = async (uuidRoom) => {
    // console.log(uuidRoom);
    if (selectedRoom !== "") {
      socket.emit("leave-room", { roomId: selectedRoom });
    }
    dispatch(addSelectedRoom(uuidRoom));
    const roomId = uuidRoom;
    socket.emit("join-room", { roomId });
    setSelectedChat(uuidRoom);
    setFetchAgain(!fetchAgain);
  };

  const handleShowModal = async (e) => {
    e.preventDefault();
    setShowModal(true);
  };
  return (
    <div className="p-3 flex-shrink-1 w-25 bg-white  ms-2 mb-2 mt-2 me-2 h-100 rounded">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>My Chats</h2>
        <Button
          type="submit"
          variant="outline-secondary"
          onClick={handleShowModal}
        >
          New Group Chat
        </Button>
      </div>
      <div>
        {isLoading ? (
          <p>Sedang mengambil pesan</p>
        ) : (
          <>
            {dataResult.length > 0 ? (
              <>
                {dataResult.map((item, index) => {
                  return (
                    <Link
                      href={"#"}
                      className="text-decoration-none mb-3"
                      key={item.id}
                      onClick={() => handleSelectedChat(item.id)}
                    >
                      <Card
                        className={
                          "p-2  d-flex flex-row align-items-center mb-2 card-list"
                        }
                        bg={selectedRoom === item.id ? "info " : "light"}
                      >
                        <div>
                          {item.isGroup === false ? (
                            <Image
                              src={
                                item.profilUser
                                  ? item.profilUser
                                  : "https://res.cloudinary.com/dhtypvjsk/image/upload/v1691732035/nopicture_u5efnz.png"
                              }
                              width={32}
                              height={32}
                              alt="avatar"
                            />
                          ) : (
                            <Image
                              src={
                                item.avatar
                                  ? item.avatar
                                  : "https://res.cloudinary.com/dhtypvjsk/image/upload/v1692083201/group-profile-users_icon-icons.com_73540_syhixc.png"
                              }
                              width={32}
                              height={32}
                              alt="profil"
                            />
                          )}
                        </div>
                        {item.isGroup === false ? (
                          <div className="d-flex flex-column  ms-1 flex-grow-1">
                            <h6 className="mb-0">{item.name}</h6>
                            <span style={{ fontSize: "12px" }}>
                              {item.messages
                                ? item.messages
                                : "belum ada pesan masuk"}
                            </span>
                          </div>
                        ) : (
                          <div className="d-flex flex-column  ms-1 flex-grow-1">
                            <h6 className="mb-0">{item.nameGroup}</h6>
                            <span style={{ fontSize: "12px" }}>
                              {item.messages
                                ? item.messages
                                : "belum ada pesan masuk"}
                            </span>
                          </div>
                        )}
                      </Card>
                    </Link>
                  );
                })}
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
      <CreateGroup
        showModal={showModal}
        setShowModal={setShowModal}
        setFetchAgain={setFetchAgain}
        setFetchListRoom={setFetchListRoom}
      />
    </div>
  );
}

export default ListRoomChat;
