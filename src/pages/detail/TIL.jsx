import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./ContentsLeft.css";

export default function TIL() {
  const [TILs, setTILs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTIL, setNewTIL] = useState("");

  useEffect(() => {
    // Initial TIL list setup
    setTILs([
      "장우진의 블로그",
      "이민선의 학습기록",
      "이하늘의 블로그",
      "조인후의 학습일기",
      "멘토님의 추천 자료",
    ]);
  }, []);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setNewTIL("");
  };

  const handleAddTIL = () => {
    if (newTIL.trim()) {
      setTILs([...TILs, newTIL]);
      setNewTIL("");
      setShowModal(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>TIL</h1>
        <button className="add-button" onClick={handleShowModal}>
          +
        </button>
      </div>
      <div className="til-list">
        {TILs.map((til, index) => (
          <div key={index} className="til-item">
            {til}
          </div>
        ))}
      </div>

      {/* 모달창 */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New TIL</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTIL">
              <Form.Label>New TIL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new TIL"
                value={newTIL}
                onChange={(e) => setNewTIL(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddTIL}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
