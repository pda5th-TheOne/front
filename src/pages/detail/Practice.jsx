import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';

import './detail.css';

export default function Practice() {
  const { boardId } = useParams(); // URL에서 boardId 추출
  const navigate = useNavigate(); // useNavigate 훅 사용

  // 상태: 실습 목록, 모달 표시 여부, 새 실습 제목
  const [practices, setPractices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newPractice, setNewPractice] = useState('');

  // 액세스 토큰: 로컬스토리지에서 가져오기
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchPractices = async () => {
      try {
        const response = await axios.get(`/api/boards/${boardId}/practices`, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // 액세스 토큰 포함
          },
        });
        setPractices([...response.data]);
      } catch (error) {
        console.error('Error fetching practices:', error);
      }
    };

    fetchPractices();
  }, [accessToken, boardId]);

  const handleShowModal = () => setShowModal(true);

  const handleCloseModal = () => {
    setShowModal(false);
    setNewPractice(''); // 입력 필드 초기화
  };

  const handleAddPractice = async () => {
    if (newPractice.trim()) {
      try {
        const response = await axios.post(
          `/api/boards/${boardId}/practices`,
          newPractice,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'text/plain',
            },
          }
        );
        const createdPractice = response.data;
        setPractices((prevPractices) => [...prevPractices, createdPractice]); // 새 실습 추가

        setNewPractice('');
        setShowModal(false);

        navigate(0); // 페이지 새로 고침
      } catch (error) {
        console.error('Failed to add practice data:', error);
      }
    }
  };

  return (
    <div className="detail-contents-container">
      <div className="detail-contents-header">
        <h1>실습</h1>
        <button className="detail-add-button" onClick={handleShowModal}>
          +
        </button>
      </div>
      <div className="detail-contents-list">
        {practices.map((practice, index) => (
          <div key={index} className="detail-contents-item">
            <Link to={`/practices/${practice.id}`} className="practice-link">
              {practice.title}
            </Link>
          </div>
        ))}
      </div>

      {/* 새 실습 추가 모달 */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>새 실습 추가</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formPractice">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="새 실습 제목을 입력하세요"
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
          <Button variant="warning" onClick={handleAddPractice}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
