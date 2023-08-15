import { useVerificationMutation } from "@/app/store/apis/authentication";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import VerificationInput from "react-verification-input";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addEmail } from "@/app/store/slices/authSlice";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "react-bootstrap/Spinner";

function Verifikasi({ setKey, verif, setVerif }) {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState({});
  const dispatch = useDispatch();

  const [
    verificationHit,
    { isLoading, isError, error: errorSendOTP, isSuccess, data: dataSendOTP },
  ] = useVerificationMutation();

  const email = useSelector((state) => state.auth.email);
  useEffect(() => {
    setMinutes(1);
    setSeconds(30);
    if (email === "") {
      setVerif(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError({});
    console.log(otp);
    if (otp === "") {
      setError((error) => ({
        ...error,
        otp: "kode otp tidak boleh kosong!",
      }));
      return;
    }
    if (otp.length < 6) {
      setError((error) => ({
        ...error,
        otp: "kode otp tidak boleh kurang dari 6!",
      }));
      return;
    }
    if (otp.length === 6) {
      const payload = {
        email: email,
      };
      verificationHit({ body: payload, otp: otp });
    }
  };
  useEffect(() => {
    // console.log(otp);
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(`${dataSendOTP.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(addEmail(""));
      toast.success(`Silahkan Login`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        setKey("login");
        setVerif(false);
      }, 1000);
    }
    // console.log(email);

    if (isError) {
      console.log("gagal");
      console.log(errorSendOTP);
      toast.error(`${errorSendOTP.data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setError((error) => ({
        ...error,
        otp: errorSendOTP.data.message,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
  return (
    <>
      <div className="d-flex flex-column w-25 bg-white justify-content-center mx-auto  mt-5 rounded-3 p-3 ">
        <h4>Verifikasi email</h4>
        <p>
          Silahkan masukkan kode otp yang telah dikirimakan melalui email{" "}
          {email}
        </p>
        <div className="d-flex justify-content-center mt-3 align-items-center">
          <VerificationInput
            validChars="0-9"
            inputProps={{ inputMode: "numeric" }}
            placeholder="_"
            length={6}
            // value={otp}
            onChange={(e) => setOtp(e)}
          />
        </div>
        {error.hasOwnProperty("otp") && error.otp !== "" ? (
          <p className="text-danger mt-1 fs-6 text-center">{error.otp}</p>
        ) : (
          ""
        )}
        <p className="mt-3">
          Kirim ulang kode?
          {seconds > 0 || minutes > 0 ? (
            <span className="ms-1">
              {minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </span>
          ) : (
            <Button variant="link">Klik disini</Button>
          )}
        </p>
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
          <Button variant="primary" onClick={handleSendOTP}>
            Kirim
          </Button>
        )}
      </div>
      <ToastContainer />
    </>
  );
}

export default Verifikasi;
