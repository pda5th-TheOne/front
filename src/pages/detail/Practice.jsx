import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate 추가
import './ContentsLeft.css';

export default function Practice({ id }) {
  const [practices, setPractices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newPractice, setNewPractice] = useState('');
  const navigate = useNavigate(); // navigate 훅 사용

  const accessToken = localStorage.getItem('accessToken'); // Fetch access token from local storage

  useEffect(() => {
    const fetchPractices = async () => {
      try {
        const response = await axios.get(`/api/board/${id}/practices`, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Include access token in header
          },
        });
        setPractices(Array.isArray(response.data) ? response.data : []); // Ensure data is an array
      } catch (error) {
        console.error('Error fetching practices:', error);
      }
    };

    fetchPractices();
  }, [accessToken, id]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setNewPractice(''); // Clear the input field
  };

  const handleAddPractice = async () => {
    if (newPractice.trim()) {
      try {
        // POST 요청을 통해 새로운 practice 생성
        const response = await axios.post(
          `/api/board/${id}/practices`,
          { name: newPractice },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // access token 포함
            },
          }
        );

        // 서버에서 받은 생성된 practice 데이터로 상태 업데이트
        const createdPractice = response.data;
        const updatedPractices = [...practices, createdPractice];
        setPractices(updatedPractices);

        // 입력 필드와 모달 초기화
        setNewPractice('');
        setShowModal(false);

        // 생성된 practice 페이지로 이동
        navigate(`/practice/${createdPractice.id}`);
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
            {/* Each practice item links to the respective practice page */}
            <Link to={`/practice/${practice.id}`} className="practice-link">
              {practice.name}
            </Link>
          </div>
        ))}
      </div>

      {/* Modal for adding a new practice */}
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
                value={newPractice}
                onChange={(e) => setNewPractice(e.target.value)}
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
