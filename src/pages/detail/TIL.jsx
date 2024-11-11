import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './detail.css';

export default function TIL() {
  const { boardId } = useParams();
  const [TILs, setTILs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newTIL, setNewTIL] = useState({ title: '', link: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const accessToken = localStorage.getItem('accessToken');

  // TILs 데이터를 fetch하는 함수
  const fetchTILs = async () => {
    try {
      const response = await axios.get(`/api/boards/${boardId}/TILs`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setTILs(response.data);
    } catch (error) {
      console.error('Failed to fetch TILs:', error);
    }
  };

  // 초기 데이터 로딩
  useEffect(() => {
    fetchTILs();
  }, [boardId, accessToken]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setNewTIL({ title: '', link: '' });
    setIsEditing(false);
    setEditIndex(null);
  };

  const handleAddTIL = async () => {
    if (newTIL.title.trim() && newTIL.link.trim()) {
      try {
        await axios.post(
          `/api/boards/${boardId}/TILs`,
          { title: newTIL.title, link: newTIL.link },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        fetchTILs(); // TILs 목록을 새로 고침
        handleCloseModal();
      } catch (error) {
        console.error('Failed to add TIL:', error);
      }
    }
  };

  const handleEditTIL = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    setNewTIL({ title: TILs[index].title, link: TILs[index].link });
    setShowModal(true);
  };

  const handleSaveEdit = async () => {
    if (newTIL.title.trim() && newTIL.link.trim() && editIndex !== null) {
      try {
        const id = TILs[editIndex].id;
        await axios.put(
          `/api/TILs/${id}`,
          { title: newTIL.title, link: newTIL.link },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        fetchTILs(); // TILs 목록을 새로 고침
        handleCloseModal();
      } catch (error) {
        console.error('Failed to edit TIL:', error);
      }
    }
  };

  const handleDeleteTIL = async () => {
    if (deleteIndex !== null) {
      try {
        const id = TILs[deleteIndex].id;
        await axios.delete(`/api/TILs/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        fetchTILs(); // TILs 목록을 새로 고침
        setShowDeleteModal(false);
        setDeleteIndex(null);
      } catch (error) {
        console.error('Failed to delete TIL:', error);
      }
    }
  };

  const handleShowDeleteModal = (index) => {
    setDeleteIndex(index);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteIndex(null);
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
          <div key={til.id} className="detail-contents-item">
            <a
              className="detail-contents-link"
              href={til.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {til.title}
            </a>
            <div>
              <button
                className="detail-modify-button"
                onClick={() => handleEditTIL(index)}
              >
                수정
              </button>
              <button
                className="detail-delete-button"
                onClick={() => handleShowDeleteModal(index)}
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 추가 및 수정 모달창 */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'TIL 수정' : '새 TIL 추가'}</Modal.Title>
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
            취소
          </Button>
          {isEditing ? (
            <Button variant="warning" onClick={handleSaveEdit}>
              완료
            </Button>
          ) : (
            <Button variant="warning" onClick={handleAddTIL}>
              완료
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {/* 삭제 확인 모달창 */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>삭제 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>정말로 삭제하시겠습니까?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            취소
          </Button>
          <Button variant="danger" onClick={handleDeleteTIL}>
            삭제
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
