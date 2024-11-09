import 'bootstrap/dist/css/bootstrap.min.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function BoardPlusButton() {
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [topic, setTopic] = useState('');
  const navigate = useNavigate();

  // API instance with JWT interceptor
  const api = axios.create({ baseURL: '/api' });
  
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const requestBody = { createdAt: formattedDate, topic };
  
    try {
      const response = await api.post('/boards', requestBody);
      if (response.status === 201) {
        console.log('Board created successfully');
        setShowModal(false);
        setTopic('');
        // Navigate to the current page to refresh
        navigate(0);
      } else {
        console.error('Failed to create board');
      }
    } catch (error) {
      console.error('Error creating board:', error);
    }
  };

  return (
    <>
      <button
        className="btn rounded-circle position-fixed bottom-0 end-0 m-4"
        style={{ width: '60px', height: '60px', backgroundColor: '#ffd43b', border: 'none', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}
        onClick={() => setShowModal(true)}
      >
        <span className="fs-2">+</span>
      </button>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden={!showModal}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content" style={{width: "500px"}}>
              <div className="modal-header">
                <h5 className="modal-title" id="modalTitle">새로운 항목 추가</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">날짜 선택</label>
                    <Calendar onChange={setDate} value={date} className="w-100 border rounded" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">주제</label>
                    <input type="text" className="form-control" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="주제를 입력하세요" />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}  >취소</button>
                    <button type="submit" className="btn btn-primary" style={{backgroundColor:'#FFD60A', color: '#614416',fontWeight: 'bold'}}>추가하기</button>
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
