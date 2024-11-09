import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Question() {
  const [queue, setQueue] = useState([]); // 질문 큐 상태
  const [isInQueue, setIsInQueue] = useState(false); // 사용자가 큐에 있는지 여부
  const [userInfo, setUserInfo] = useState(null); // 사용자 정보 (id, name)

  // 유저 정보 가져오기 (JWT 토큰 검증 후 사용자 정보 반환)
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('/api/auth/validate-token', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          },
        });
        console.log('User Info:', response.data); // 디버깅용
        setUserInfo(response.data);
      } catch (error) {
        console.error('Failed to fetch user info', error);
      }
    };

    fetchUserInfo();
  }, []);

  // 질문 큐 상태 가져오기 및 SSE 설정
  useEffect(() => {
    if (!userInfo) return;

    const fetchInitialQueue = async () => {
      try {
        const response = await axios.get('/api/questions', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          },
        });
        setQueue(response.data); // 질문 큐 상태 업데이트
      } catch (error) {
        console.error('Failed to fetch initial queue', error);
      }
    };

    fetchInitialQueue();

    // SSE 연결 설정
    const eventSource = new EventSource('/api/questions/stream');
    eventSource.addEventListener('questionQueueUpdate', (event) => {
      const updatedQueue = JSON.parse(event.data);
      console.log('Updated Queue from SSE:', updatedQueue); // SSE로 받은 데이터 확인
      setQueue(updatedQueue); // SSE로 업데이트된 큐 상태 반영
    });

    return () => {
      eventSource.close(); // 컴포넌트 언마운트 시 SSE 닫기
    };
  }, [userInfo]);

  // queue 상태가 변경될 때마다 자신이 큐에 있는지 확인
  useEffect(() => {
    if (!userInfo) return;

    const userInQueue = queue.some((q) => Number(q.id) === Number(userInfo.id));
    console.log('Checking if user is in queue:', {
      userInfo,
      queue,
      userInQueue,
    }); // 상태 확인 로그 추가
    setIsInQueue(userInQueue);
  }, [queue, userInfo]); // queue와 userInfo가 변경될 때 실행

  // 손들기 요청 (POST 요청으로 큐에 사용자 추가)
  const handleHandUp = async () => {
    try {
      await axios.post(
        '/api/questions',
        {},
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          },
        }
      );

      console.log('Hand up success');
    } catch (error) {
      console.error('손들기 실패', error);
    }
  };

  // 손내리기 요청 (DELETE 요청으로 큐에서 사용자 제거)
  const handleHandDown = async () => {
    try {
      await axios.delete('/api/questions', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
      });

      console.log('Hand down success');
    } catch (error) {
      console.error('손내리기 실패', error);
    }
  };

  return (
    <div className="queue-container">
      <h2 className="queue-title">질문 큐</h2>
      <div
        className="button-content"
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '10px',
        }}
      >
        <button
          className="hand-button"
          onClick={isInQueue ? handleHandDown : handleHandUp}
          style={{ minWidth: '50px' }}
        >
          {isInQueue ? '👇' : '✋'}
        </button>

        <div className="queue-list">
          {queue.map((q) => (
            <button
              key={q.id}
              className="queue-button"
              style={{ marginRight: '10px' }}
            >
              {q.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
