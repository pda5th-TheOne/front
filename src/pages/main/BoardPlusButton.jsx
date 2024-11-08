import 'bootstrap/dist/css/bootstrap.min.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import axios from 'axios';

export default function BoardPlusButton() {
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [topic, setTopic] = useState('');

  // API 인스턴스 생성 및 인터셉터 설정
  const api = axios.create({
    baseURL: '/api', // REST API 기본 URL 설정
  });

  // 요청에 JWT 토큰을 자동으로 추가하는 인터셉터 설정
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken'); // JWT 토큰 가져오기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Authorization 헤더 추가
    }
    return config;
  });

  // 게시판 추가 버튼 눌렀을 경우
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 날짜 형식 변환 (예: 'yyyy-MM-dd')
    const formattedDate = date.toISOString().split('T')[0];

    const requestBody = {
      createdAt: formattedDate,
      topic: topic,
    };

    try {
      // 게시판 생성 POST 요청
      const response = await api.post('/boards', requestBody);
      if (response.status === 201) {
        // 성공적인 생성 응답 확인
        console.log('Board created successfully');
        setShowModal(false); // 모달 닫기
        setTopic(''); // 입력 필드 초기화
      } else {
        console.error('Failed to create board');
      }
    } catch (error) {
      console.error('Error creating board:', error);
    }
  };

  return (
    <>
      {/* Plus Button */}
      <button
        className="btn rounded-circle position-fixed bottom-0 end-0 m-4"
        style={{
          width: '60px',
          height: '60px',
          backgroundColor: '#ffd43b',
          border: 'none',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        }}
        onClick={() => setShowModal(true)}
      >
        <span className="fs-2">+</span>
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
              <h5 className="modal-title">새로운 항목 추가</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
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
                    추가하기
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
