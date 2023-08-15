"use client";
import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "@/app/store/apis/authentication";
import { addEmail } from "@/app/store/slices/authSlice";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "react-bootstrap/Spinner";

function SignUp({ verif, setVerif }) {
  console.log(verif);
  const dispatch = useDispatch();
  const formRef = useRef({});
  const [error, setError] = useState({});
  const [
    registerHit,
    { isLoading, isError, error: errorRegister, isSuccess, data: dataRegister },
  ] = useRegisterMutation();

  const email = useSelector((state) => state.auth.email);

  const handleRegister = (e) => {
    e.preventDefault();
    setError({});
    const name = formRef.current.name;
    const email = formRef.current.email;
    const password = formRef.current.password;

    if (name.value === "") {
      setError((error) => ({
        ...error,
        name: "Nama tidak boleh kosong!",
      }));
     
      return;
    }
    if (email.value === "") {
      setError((error) => ({
        ...error,
        email: "email tidak boleh kosong!",
      }));
      return;
    } else {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email.value)) {
        setError((error) => ({ ...error, email: "Email tidak valid!" }));
        return;
      }
    }

    if (password.value === "") {
      setError((error) => ({
        ...error,
        password: "password depan tidak boleh kosong!",
      }));
      return;
    }
    toast.success(`Mendaftarkan akun`, {
      position: toast.POSITION.TOP_RIGHT,
    });

    const payload = {
      email: email.value,
      password: password.value,
      name: name.value,
    };
   
    registerHit({ body: payload });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(`${dataRegister.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });

      setTimeout(() => {
        toast.success(`navigate to verikasi akun`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setVerif(true);
        dispatch(addEmail(formRef.current.email.value));
      }, 1500);
    }

    if (isError) {
      console.log(errorRegister);
      toast.error(`${errorRegister.data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setError((error) => ({
        ...error,
        email: "email sudah digunakan",
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
  return (
    <>
      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nama</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            // required
            ref={(ref) => (formRef.current.name = ref)}
          />

          {error.hasOwnProperty("name") && error.lastName !== "" ? (
            <Form.Text className="text-danger">{error.name}</Form.Text>
          ) : (
            ""
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            // required
            ref={(ref) => (formRef.current.email = ref)}
          />
          {error.hasOwnProperty("email") && error.email !== "" ? (
            <Form.Text className="text-danger">{error.email}</Form.Text>
          ) : (
            ""
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            // required
            ref={(ref) => (formRef.current.password = ref)}
          />
          {error.hasOwnProperty("password") && error.password !== "" ? (
            <Form.Text className="text-danger">{error.password}</Form.Text>
          ) : (
            ""
          )}
        </Form.Group>

        {isLoading || isSuccess ? (
          <Button
            variant="primary"
            type="submit"
            className="text-center w-100 d-flex flex-row align-item-center justify-content-center"
            disabled
          >
            <Spinner
              animation="border "
              style={{ height: "20px", width: "20px" }}
            />{" "}
            Submit
          </Button>
        ) : (
          <Button variant="primary" type="submit" className="text-center w-100">
            Submit
          </Button>
        )}
      </Form>
      <ToastContainer />
    </>
  );
}

export default SignUp;
