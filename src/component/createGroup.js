import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useSearchUsersMutation } from "@/app/store/apis/authentication";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import Link from "next/link";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useCreateGroupMutation } from "@/app/store/apis/chat";
import { addSelectedRoom } from "@/app/store/slices/chatSlice";
function CreateGroup({
  showModal,
  setShowModal,
  setFetchAgain,
  setFetchListRoom,
}) {
  const dispatch = useDispatch();
  const [searchName, setSearchName] = useState("");
  const [member, setMember] = useState([]);
  const [nameGroup, setNameGroup] = useState("");
  const [dataResult, setDataResult] = useState([]);
  const [error, setError] = useState({});
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const formRef = useRef({ member: [], uuidMember: [`${user.uuid}`] });
  const [payloadUuid, setPayloadUuid] = useState([user.uuid]);

  const [searchUsersHit, { isLoading, isError, error: err, isSuccess, data }] =
    useSearchUsersMutation();

  const [
    createGroupHit,
    {
      isLoading: isLoadingCreate,
      isError: isErrorCreate,
      error: errCreate,
      isSuccess: isSuccessCreate,
      data: dataCreate,
    },
  ] = useCreateGroupMutation();
  const handleSearch = (e) => {
    // setDataResult({});
    e.preventDefault();
    setError({});
    const searchNameP = formRef.current.search;
    if (searchNameP.value === "") {
      setError((error) => ({
        ...error,
        searchName: "pencarian tidak boleh kosong!",
      }));
      setDataResult([]);
      return;
    }
    searchUsersHit({ token: token, nameSearch: searchNameP.value });
  };

  const handleAddMember = ({ uuid, name }) => {
    // console.log(`addMember`);
    // console.log(`${name}`);
    // console.log(formRef.current.uuidMember.includes(uuid));
    // console.log(member);
    if (payloadUuid.includes(uuid)) {
      setError((error) => ({
        ...error,
        added: "user telah ditambahkan",
      }));
      return;
    }
    // formRef.current.uuidMember.push(uuid);
    setPayloadUuid((item) => [...item, uuid]);
    setMember((item) => [...item, { uuid, name }]);
  };

  const deleteMember = (delUser) => {
    setPayloadUuid(payloadUuid.filter((sel) => sel !== delUser.uuid));
    setMember(member.filter((sel) => sel.uuid !== delUser.uuid));
  };
  const onHideModals = () => {
    // e.preventDefault();
    setMember([]);
    setPayloadUuid([user.uuid]);
    setSearchName("");
    setDataResult([]);
    setError({});
    setNameGroup("");
    setShowModal(false);
  };

  const handleCreateGroup = (e) => {
    e.preventDefault();
    if (nameGroup === "") {
      setError((error) => ({
        ...error,
        nameGroup: "nama group tidak boleh kosong",
      }));
      return;
    }
    if (payloadUuid.length < 2) {
      setError((error) => ({
        ...error,
        member: "Member group minmal 2 user",
      }));
      return;
    }
    const body = {
      member: payloadUuid.filter((uuid) => uuid !== user.uuid),
      nameGroup: nameGroup,
    };
    console.log(body);
    createGroupHit({ body: body, token: token });
  };

  useEffect(() => {
    if (isSuccess) {
      // console.log(data.data);
      setDataResult(data.data);
      if (data.data.length === 0) {
        setError((error) => ({
          ...error,
          notFound: "pencarian tidak ditemukan",
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

  useEffect(() => {
    if (isSuccessCreate) {
      // console.log(dataCreate);
      if (dataCreate) {
        dispatch(addSelectedRoom(dataCreate.data.id));
        setFetchAgain((item) => !item);
        setFetchListRoom((item) => !item);
        onHideModals();
      }
    }

    if (isErrorCreate) {
      console.log(errCreate);
      setError((error) => ({
        ...error,
        error: errCreate.data.message,
      }));
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingCreate]);

  return (
    <>
      <Modal
        show={showModal}
        size="lg"
        fullscreen={"sm-down"}
        onHide={onHideModals}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name Group</Form.Label>
              <Form.Control
                type="text"
                placeholder="nameGroup"
                value={nameGroup}
                onChange={(e) => setNameGroup(e.target.value)}
                required
              />
              {error.hasOwnProperty("nameGroup") && error.nameGroup !== "" ? (
                <Form.Text className="text-center text-danger">
                  {error.nameGroup}
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Member</Form.Label>
              <Form.Control
                type="text"
                placeholder="name member"
                value={searchName}
                onChange={(e) => {
                  setSearchName(e.target.value);
                  handleSearch(e);
                }}
                ref={(ref) => (formRef.current.search = ref)}
              />
              {error.hasOwnProperty("member") && error.member !== "" ? (
                <Form.Text className="text-center text-danger">
                  {error.member}
                </Form.Text>
              ) : (
                ""
              )}
              {error.hasOwnProperty("added") && error.added !== "" ? (
                <Form.Text className="text-center text-danger">
                  {error.added}
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>
            <div className="d-flex flex-row">
              <ButtonGroup size="sm" className="me-1 d-flex align-items-center">
                <Button variant="info" disabled>
                  Anda
                </Button>
              </ButtonGroup>
              {member.map((item) => {
                return (
                  <ButtonGroup
                    size="sm"
                    className="me-1 d-flex align-items-center"
                    key={item.uuid}
                  >
                    <Button variant="info" disabled>
                      {item.name}
                    </Button>
                    <Button
                      variant="info"
                      // className="btn-close bg-info"
                      // // aria-label="Close"
                      onClick={() => deleteMember({ uuid: item.uuid })}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-x-lg"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                      </svg>
                    </Button>
                  </ButtonGroup>
                );
              })}
            </div>
            <div className="d-flex flex-column mt-2">
              {isLoading ? (
                <div className="d-flex justify-content-center">
                  <Spinner
                    animation="border "
                    className="text-center"
                    style={{ height: "20px", width: "20px" }}
                  />
                </div>
              ) : (
                <>
                  {isSuccess && dataResult.length !== 0 ? (
                    dataResult.map((item, index) => {
                      return (
                        <Link
                          href={"#"}
                          className="text-decoration-none "
                          key={item.uuid}
                          onClick={(data) =>
                            handleAddMember({
                              uuid: item.uuid,
                              name: item.name,
                            })
                          }
                        >
                          <Card className="card-list p-2  d-flex flex-row align-items-center mb-2">
                            <div>
                              <Image
                                src={item.avatar}
                                width={32}
                                height={32}
                                alt="s"
                              />
                            </div>
                            <h6 className="mb-0 ms-1">{item.name}</h6>
                            {/* <Card.Body>This is some text within a card body.</Card.Body> */}
                          </Card>
                        </Link>
                      );
                    })
                  ) : (
                    <>
                      {error.hasOwnProperty("notFound") &&
                      error.notFound !== "" ? (
                        <Form.Text className="text-center">
                          {error.notFound}
                        </Form.Text>
                      ) : (
                        ""
                      )}
                    </>
                  )}
                </>
              )}
            </div>
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => handleCreateGroup(e)}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreateGroup;
