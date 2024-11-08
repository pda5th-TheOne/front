import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './ContentsLeft.css';

export default function TIL({ id }) {
  // 'id'를 props로 받음
  const [TILs, setTILs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTIL, setNewTIL] = useState({ title: '', link: '' });

  const accessToken = localStorage.getItem('accessToken'); // 로컬 스토리지에서 액세스 토큰 가져오기

  // API 호출
  useEffect(() => {
    const fetchTILs = async () => {
      try {
        const response = await axios.get(`/api/board/${id}/TILs`, {
          // id 값 포함
          headers: {
            Authorization: `Bearer ${accessToken}`, // 액세스 토큰을 헤더에 포함
          },
        });
        setTILs(response.data); // 받은 데이터를 TILs 상태에 저장
      } catch (error) {
        console.error('Failed to fetch TILs:', error);
      }
    };

    fetchTILs();
  }, [accessToken, id]);

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
          `/api/board/${id}/TILs`, // 템플릿 리터럴을 사용하여 'id' 포함
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
    <div className="detail-container">
      <div className="header">
        <h1>TIL</h1>
        <button className="add-button" onClick={handleShowModal}>
          +
        </button>
      </div>
      <div className="til-list">
        {TILs.map((til, index) => (
          <div key={index} className="til-item">
            <a href={til.link} target="_blank" rel="noopener noreferrer">
              {til.title}
            </a>
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
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
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
          <Button variant="primary" onClick={handleAddTIL}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
