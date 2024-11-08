import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom'; // react-router-dom에서 Link를 import
import './ContentsLeft.css';

export default function Practice() {
  const [practices, setPractices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newPractice, setNewPractice] = useState('');

  useEffect(() => {
    // Initial practices list setup
    setPractices(['실습1', '실습2', '실습3', '실습4', '실습5']);
  }, []);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setNewPractice(''); // 변경된 변수명으로 수정
  };

  const handleAddPractice = async () => {
    if (newPractice.trim()) {
      try {
        // API로 새로운 practice 데이터 POST 요청
        // await axios.post("/api/practice", { name: newPractice });

        // practices 리스트 업데이트
        setPractices((prevPractices) => [...prevPractices, newPractice]);

        // 모달 닫기 및 상태 초기화
        setNewPractice(''); // 변경된 변수명으로 수정
        setShowModal(false);
      } catch (error) {
        console.error('Failed to add practice data:', error);
      }
    }
  };

  return (
    <div className="detail-container">
      <div className="header">
        <h1>실습</h1>
        <button className="add-button" onClick={handleShowModal}>
          +
        </button>
      </div>
      <div className="til-list">
        {practices.map((practice, index) => (
          <div key={index} className="til-item">
            {/* 각 실습 항목을 클릭 시 해당 링크로 이동 */}
            <Link
              to={`/practice/${index + 1}/assignment`}
              className="practice-link"
            >
              {practice}
            </Link>
          </div>
        ))}
      </div>

      {/* 모달창 */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Practice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formPractice">
              <Form.Label>New Practice</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new practice"
                value={newPractice} // 변경된 변수명으로 수정
                onChange={(e) => setNewPractice(e.target.value)} // 변경된 변수명으로 수정
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddPractice}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
