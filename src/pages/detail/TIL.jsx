import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './ContentsLeft.css';

export default function TIL() {
  const [TILs, setTILs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTIL, setNewTIL] = useState({ title: '', link: '' });

  useEffect(() => {
    // Initial TIL list setup with title and link
    setTILs([
      { title: '장우진의 블로그', link: 'https://example.com/장우진의블로그' },
      {
        title: '이민선의 학습기록',
        link: 'https://example.com/이민선의학습기록',
      },
      { title: '이하늘의 블로그', link: 'https://example.com/이하늘의블로그' },
      {
        title: '조인후의 학습일기',
        link: 'https://example.com/조인후의학습일기',
      },
      {
        title: '멘토님의 추천 자료',
        link: 'https://example.com/멘토님의추천자료',
      },
    ]);
  }, []);

  // API 호출 예시 (commented out for now)
  // useEffect(() => {
  //   const fetchTILs = async () => {
  //     try {
  //       const response = await axios.get("/api/TILs"); // API 요청
  //       setTILs(response.data); // 받은 데이터를 TILs 상태에 저장
  //     } catch (error) {
  //       console.error("Failed to fetch TILs:", error);
  //     }
  //   };
  //   fetchTILs();
  // }, []);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setNewTIL({ title: '', link: '' });
  };

  const handleAddTIL = async () => {
    if (newTIL.title.trim() && newTIL.link.trim()) {
      try {
        // API로 새로운 TIL 데이터 POST 요청
        await axios.post('/api/TILs', newTIL);

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
