import { useLoginMutation } from "@/app/store/apis/authentication";
import { addEmail, addToken } from "@/app/store/slices/authSlice";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const dispatch = useDispatch();
  const formRef = useRef({});
  const router = useRouter();

  const [error, setError] = useState({});
  const [
    loginHit,
    { isLoading, isError, error: errorLogin, isSuccess, data: dataLogin },
  ] = useLoginMutation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError({});
    const email = formRef.current.email;
    const password = formRef.current.password;

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
    toast.success(`Loging`, {
      position: toast.POSITION.TOP_RIGHT,
    });

    const payload = {
      email: email.value,
      password: password.value,
    };

    loginHit({ body: payload });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(`${dataLogin.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });

      dispatch(addEmail(formRef.current.email.value));
      dispatch(addToken(dataLogin.data.token));
      if (formRef.current.ingatSaya.checked) {
        localStorage.setItem("token", dataLogin.data.token);
        localStorage.setItem("uuid", dataLogin.data.uuid);
        localStorage.setItem("email", formRef.current.email.value);
      }
      router.push("/chats");
    }
    // console.log(email);

    if (isError) {
      toast.error(`${errorLogin.data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setError((error) => ({
        ...error,
        errorLogin: errorLogin.data.message,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <>
      <Form bg={"light"}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
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
            ref={(ref) => (formRef.current.password = ref)}
          />
          {error.hasOwnProperty("password") && error.password !== "" ? (
            <Form.Text className="text-danger">{error.password}</Form.Text>
          ) : (
            ""
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="ingat saya"
            ref={(ref) => (formRef.current.ingatSaya = ref)}
          />
          {error.hasOwnProperty("errorLogin") && error.errorLogin !== "" ? (
            <Form.Text className="text-danger text-center">
              {error.errorLogin}
            </Form.Text>
          ) : (
            ""
          )}
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="w-100"
          onClick={handleLogin}
        >
          Submit
        </Button>
      </Form>
      <ToastContainer />
    </>
  );
}

export default Login;
