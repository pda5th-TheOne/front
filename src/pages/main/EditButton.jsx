import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';

export default function EditButton({ boardId, onClick }) {
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [topic, setTopic] = useState('');
  const navigate = useNavigate();

  // Fetch access token from local storage
  const accessToken = localStorage.getItem('accessToken');

  // 수정 함수
  const handleEdit = (e) => {
    e.preventDefault();
    console.log('handleEdit 함수 호출됨');
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const requestBody = { createdAt: formattedDate, topic };

    fetch(`/api/boards/${boardId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Board updated successfully');
          setShowModal(false);
          navigate(0);
        } else {
          console.error('Failed to update board');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  // 삭제 함수
  const handleDelete = (e) => {
    e.preventDefault();
    console.log('handleDelete 함수 호출됨');
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      fetch(`/api/boards/${boardId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log('Board deleted successfully');
            setShowModal(false);
            navigate(0);
          } else {
            console.error('Failed to delete board');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  return (
    <>
      {/* Edit Button */}
      <button
        className="btn"
        style={{
          backgroundColor: '#FFD43B',
          border: 'none',
          padding: '6px 16px',
          borderRadius: '4px',
        }}
        onClick={(e) => {
          onClick(e); // 이벤트 버블링 방지
          setShowModal(true);
        }}
      >
        편집
      </button>

      {/* Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="modalTitle"
          aria-hidden={!showModal}
          onClick={() => setShowModal(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content" style={{ width: '500px' }}>
              <div className="modal-header">
                <h5 className="modal-title" id="modalTitle">항목 수정</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleEdit}>
                  <div className="mb-3">
                    <label className="form-label">날짜 선택</label>
                    <Calendar onChange={setDate} value={date} className="w-100 border rounded" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">주제</label>
                    <input
                      type="text"
                      className="form-control"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="주제를 입력하세요"
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-danger me-auto"
                      onClick={(e) => handleDelete(e)}
                      style={{ backgroundColor: '#F48882', fontWeight: 'bold' }}
                    >
                      삭제하기
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                      취소
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ backgroundColor: '#FFD60A', color: '#614416', fontWeight: 'bold' }}
                    >
                      수정하기
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
