import Image from "next/image";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
function ProfilUser({ showProfil, setShowProfil }) {
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  return (
    <Modal
      show={showProfil}
      size="lg"
      fullscreen={"sm-down"}
      onHide={() => setShowProfil(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>My Profil</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column ">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <Image
              src={user.avatar}
              width={125}
              height={125}
              alt="adsdsa"
              className="text-center rounded-circle"
            />
            <Button variant="link">ganti foto</Button>
          </div>
          <div className="d-flex flex-column">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="nama"
                  value={user.name}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>No Hp</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="nohp"
                  value={user.no_hp ? user.no_hp : ""}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="email"
                  value={user.email ? user.email : ""}
                  disabled
                />
              </Form.Group>
              <div className="d-flex justify-content-center">
                <Button variant="primary" type="submit" className="" disabled>
                  Update Profile
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ProfilUser;
