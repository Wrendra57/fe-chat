import React, { useEffect, useRef, useState } from "react";
import { Button, Card } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import Link from "next/link";
import Image from "next/image";
import { useSearchUsersMutation } from "@/app/store/apis/authentication";
import { useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import Skeleton from "react-loading-skeleton";


function SearchUsers({ show, setShow }) {
  const formRef = useRef({});

  const [error, setError] = useState({});
  const token = useSelector((state) => state.auth.token);
  const [searchUsersHit, { isLoading, isError, error: err, isSuccess, data }] =
    useSearchUsersMutation();
  const [dataResult, setDataResult] = useState([]);

  const handleClose = () => {
    setShow(false);
    setDataResult([]);
    setError({});
  };

  const handleSearch = (e) => {
    // setDataResult({});
    e.preventDefault();
    setError({});
    const searchName = formRef.current.search;
    if (searchName.value === "") {
      setError((error) => ({
        ...error,
        searchName: "pencarian tidak boleh kosong!",
      }));
      return;
    }
    searchUsersHit({ token: token, nameSearch: searchName.value });
  };

  const createChat = (e)=>{
    
  }
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
  return (
    <Offcanvas show={show} onHide={handleClose} scroll={false} backdrop={true}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Search Users</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Form.Group className="w-100 me-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="enter name"
                ref={(ref) => (formRef.current.search = ref)}
                onChange={handleSearch}
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSearch}>
              Go
            </Button>
          </div>
          {error.hasOwnProperty("searchName") && error.searchName !== "" ? (
            <Form.Text className="text-danger text-center">
              {error.searchName}
            </Form.Text>
          ) : (
            ""
          )}
        </Form>
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
                  {error.hasOwnProperty("notFound") && error.notFound !== "" ? (
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
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default SearchUsers;
