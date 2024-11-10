import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './detail.css';

export default function TIL() {
  const { boardId } = useParams(); // URL에서 boardId 추출

  const [TILs, setTILs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTIL, setNewTIL] = useState({ title: '', link: '' });

  const accessToken = localStorage.getItem('accessToken'); // 로컬 스토리지에서 액세스 토큰 가져오기

  // API 호출
  useEffect(() => {
    const fetchTILs = async () => {
      try {
        const response = await axios.get(`/api/boards/${boardId}/TILs`, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // 액세스 토큰을 헤더에 포함
          },
        });
        setTILs([...response.data]); // 받은 데이터를 TILs 상태에 저장
      } catch (error) {
        console.error('Failed to fetch TILs:', error);
      }
    };

    fetchTILs();
  }, [accessToken, boardId]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setNewTIL({ title: '', link: '' });
  };

  const handleAddTIL = async () => {
    if (newTIL.title.trim() && newTIL.link.trim()) {
      try {
        // API로 새로운 TIL 데이터 POST 요청
        await axios.post(
          `/api/boards/${boardId}/TILs`,
          { title: newTIL.title, link: newTIL.link },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // 액세스 토큰을 헤더에 포함
            },
          }
        );

        // TIL 리스트 업데이트
        setTILs([...TILs, newTIL]);

        // 모달 닫기 및 상태 초기화
        setNewTIL({ title: '', link: '' });
        setShowModal(false);
      } catch (error) {
        console.error('Failed to add TIL:', error);
      }
    }
  };

  return (
    <div className="detail-contents-container">
      <div className="detail-contents-header">
        <h1>TIL</h1>
        <button className="detail-add-button" onClick={handleShowModal}>
          +
        </button>
      </div>
      <div className="detail-contents-list">
        {TILs.map((til, index) => (
          <div key={index} className="detail-contents-item">
            <a href={til.link} target="_blank" rel="noopener noreferrer">
              {til.title}
            </a>
          </div>
        ))}
      </div>

      {/* 모달창 */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>새 TIL 추가</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="제목을 입력하세요"
                value={newTIL.title}
                onChange={(e) =>
                  setNewTIL({ ...newTIL, title: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formLink">
              <Form.Label>Link</Form.Label>
              <Form.Control
                type="url"
                placeholder="Enter link"
                value={newTIL.link}
                onChange={(e) => setNewTIL({ ...newTIL, link: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="warning" onClick={handleAddTIL}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
