import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function EditButton() {
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [topic, setTopic] = useState('');

  const handleEdit = (e) => {
    e.preventDefault();

    const formattedDate = date.toISOString().split('T')[0];

    const requestBody = {
      createdAt: formattedDate,
      topic: topic,
    };

    fetch('/api/boards/1', {
      // Replace '1' with actual board ID
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Board updated successfully');
          setShowModal(false);
        } else {
          console.error('Failed to update board');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleDelete = () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      fetch('/api/boards/1', {
        // Replace '1' with actual board ID
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log('Board deleted successfully');
            setShowModal(false);
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
        onClick={() => setShowModal(true)}
      >
        편집
      </button>

      {/* Modal */}
      <div
        className={`modal fade ${showModal ? 'show' : ''}`}
        style={{ display: showModal ? 'block' : 'none' }}
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">항목 수정</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleEdit}>
                <div className="mb-3">
                  <label className="form-label">날짜 선택</label>
                  <div className="calendar-container">
                    <Calendar
                      onChange={setDate}
                      value={date}
                      className="w-100 border rounded"
                    />
                  </div>
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
                <div className="modal-footer px-0 pb-0">
                  <button
                    type="button"
                    className="btn btn-danger me-auto"
                    onClick={handleDelete}
                  >
                    삭제하기
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!topic.trim()}
                  >
                    수정하기
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Backdrop */}
      {showModal && (
        <div
          className="modal-backdrop fade show"
          onClick={() => setShowModal(false)}
        ></div>
      )}

      <style jsx>{`
        .calendar-container {
          margin: 1rem 0;
        }
        .react-calendar {
          width: 100%;
          max-width: 100%;
          background: white;
          border: 1px solid #ddd;
          font-family: Arial, Helvetica, sans-serif;
          line-height: 1.125em;
        }
        .modal {
          background-color: rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </>
  );
}
