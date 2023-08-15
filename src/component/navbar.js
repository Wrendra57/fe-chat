"use client";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useRouter } from "next/navigation";
import SearchUsers from "./searchUsers";
import { useDispatch, useSelector } from "react-redux";
import { useAuthenticationMutation } from "@/app/store/apis/authentication";
import {
  addUser,
  emptyEmail,
  emptyToken,
  emptyUser,
} from "@/app/store/slices/authSlice";
import { toast, ToastContainer } from "react-toastify";

function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const [
    authenticationsHit,
    {
      isLoading,
      isError,
      error: errorAuthentication,
      isSuccess,
      data: dataAuthentication,
    },
  ] = useAuthenticationMutation();

  useEffect(() => {
    if (!token) {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      router.push(`/`);
    }
    if (token) {
      authenticationsHit({ token: token });
    }
  }, []);
  useEffect(() => {
    if (isSuccess) {
      dispatch(addUser(dataAuthentication.data));
      // dispatch(addToken(localStorage.getItem("token")));
      // dispatch(addEmail(dataAuthentication.data.email));
    }

    if (isError) {
      console.log(errorAuthentication);
      toast.error(`${errorAuthentication.data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(emptyToken({}));
      dispatch(emptyEmail(""));
      dispatch(emptyUser({}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const handleLogout = () => {
    dispatch(emptyToken({}));
    dispatch(emptyEmail(""));
    dispatch(emptyUser({}));
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("uuid");
    router.push(`/`);
  };
  return (
    <>
      <div className="bg-white d-flex justify-content-between align-items-center px-3">
        <div>
          <Button
            type="submit"
            variant="outline-secondary"
            onClick={handleShow}
          >
            Search
          </Button>
          <SearchUsers show={show} setShow={setShow} />
        </div>
        <h1>Chat App</h1>
        <div>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle id="dropdown-custom-1">
              {user.name}
            </Dropdown.Toggle>
            <Dropdown.Menu className="super-colors">
              <Dropdown.Item eventKey="1">Profile</Dropdown.Item>

              <Dropdown.Divider />
              <Dropdown.Item eventKey="4" onClick={handleLogout}>
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>{" "}
        </div>
      </div>
    </>
  );
}

export default Navbar;
