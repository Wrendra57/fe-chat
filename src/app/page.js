"use client";
import Login from "@/component/login";
import SignUp from "@/component/signup";
import Verifikasi from "@/component/verifikasi";
import Image from "next/image";
import { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useDispatch } from "react-redux";
import { addEmail, addToken, addUser } from "./store/slices/authSlice";
import { useAuthenticationMutation } from "./store/apis/authentication";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [key, setKey] = useState("login");
  const [verif, setVerif] = useState(false);
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
    dispatch(addEmail(""));
    if (localStorage.getItem("token")) {
      authenticationsHit({ token: localStorage.getItem("token") });
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      toast.success(`navigate to chat page`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(addUser(dataAuthentication.data));
      dispatch(addToken(localStorage.getItem("token")));
      dispatch(addEmail(dataAuthentication.data.email));

      setTimeout(() => {
        router.push(`/chats`);
        // navigate("/register/verification");
      }, 1000);
    }

    if (isError) {
      console.log(errorAuthentication);
      toast.error(`${errorAuthentication.data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
  return (
    <>
      <div className="d-flex flex-column w-25 bg-white justify-content-center mx-auto text-center mt-5 rounded-3 py-3 ">
        <h1>Chat App</h1>
      </div>
      {verif === false ? (
        <div className="d-flex flex-column w-25 bg-white justify-content-center mx-auto mt-5 rounded-3 p-4">
          <Tabs
            defaultActiveKey="profile"
            id="fill-tab-example"
            className="mb-3"
            onSelect={(k) => setKey(k)}
            transition={false}
            activeKey={key}
            fill
          >
            <Tab eventKey="login" title="Login">
              <Login />
            </Tab>
            <Tab eventKey="singup" title="Sign up">
              <SignUp verif={verif} setVerif={setVerif} />
            </Tab>
          </Tabs>
        </div>
      ) : (
        <Verifikasi setKey={setKey} verif={verif} setVerif={setVerif} />
      )}
      {/* <div className="p-5 w-50 d-flex bg-white justify-content-center mx-auto"></div> */}
    </>
  );
}
