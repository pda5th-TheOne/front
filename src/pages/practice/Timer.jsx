import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Button, Form, Modal, Row, Col } from 'react-bootstrap';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default function Timer({ practiceId, onCompleteClick, isSubmitting }) {
  const [timeLeft, setTimeLeft] = useState(0); // 남은 시간 상태
  const [timerState, setTimerState] = useState('stopped'); // 타이머 상태 (running, stopped)
  const [showTimerModal, setShowTimerModal] = useState(false); // 타이머 설정 모달 표시 상태
  const [timerInput, setTimerInput] = useState('10'); // 타이머 입력값
  const eventSourceRef = useRef(null); // SSE 연결을 위한 ref

  // practiceId가 변경될 때마다 SSE 연결
  useEffect(() => {
    connectSSE(); // SSE 연결 함수 호출
    return () => {
      disconnectSSE(); // 컴포넌트 언마운트 시 SSE 연결 해제
    };
  }, [practiceId]);

  // SSE 연결 함수
  const connectSSE = () => {
    disconnectSSE(); // 기존 연결 해제

    const eventSource = new EventSource(`/api/timer/${practiceId}/events`);
    eventSourceRef.current = eventSource; // 현재 연결을 ref에 저장

    // 서버에서 타이머 업데이트 이벤트 수신
    eventSource.addEventListener('timer-update', (event) => {
      const data = JSON.parse(event.data); // 이벤트 데이터 파싱
      setTimeLeft(data.timeLeft); // 남은 시간 업데이트
      setTimerState(data.isRunning ? 'running' : 'stopped'); // 타이머 상태 업데이트
    });

    // SSE 연결 오류 처리
    eventSource.onerror = () => {
      console.error('SSE connection error');
      disconnectSSE(); // 오류 발생 시 연결 해제
    };
  };

  // SSE 연결 해제 함수
  const disconnectSSE = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close(); // 연결 닫기
      eventSourceRef.current = null; // ref 초기화
    }
  };

  // 타이머 리셋 함수
  const resetTimer = () => {
    setTimeLeft(0); // 남은 시간 초기화
    setTimerState('stopped'); // 타이머 상태를 stopped로 설정
    disconnectSSE(); // 리셋 시 SSE 연결 해제
  };

  // 타이머 시작 함수
  const startTimer = async (minutes) => {
    try {
      await api.post(`/timer/${practiceId}/start`, { minutes }); // 서버에 타이머 시작 요청
      setShowTimerModal(false); // 모달 닫기
      connectSSE(); // 타이머 시작 후 SSE 연결
    } catch (error) {
      console.error('Failed to start timer:', error); // 오류 처리
    }
  };

  // 타이머 일시정지 함수
  const pauseTimer = async () => {
    try {
      await api.patch(`/timer/${practiceId}/pause`); // 서버에 타이머 일시정지 요청
    } catch (error) {
      console.error('Failed to pause timer:', error); // 오류 처리
    }
  };

  // 타이머 재개 함수
  const resumeTimer = async () => {
    try {
      await api.patch(`/timer/${practiceId}/resume`); // 서버에 타이머 재개 요청
    } catch (error) {
      console.error('Failed to resume timer:', error); // 오류 처리
    }
  };

  // 타이머 중지 함수
  const stopTimer = async () => {
    try {
      await api.delete(`/timer/${practiceId}/reset`); // 서버에 타이머 리셋 요청
      resetTimer(); // 상태 초기화
      connectSSE(); // 리셋 후 SSE 연결
    } catch (error) {
      console.error('Failed to stop timer:', error); // 오류 처리
    }
  };

  // 시간 포맷팅 함수 (초를 분:초 형식으로 변환)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`; // 2자리로 포맷팅
  };

  return (
    <div className="text-center">
      <Row className="mb-3">
        <Col>
          <h4>남은 시간</h4>
          <h1>{formatTime(timeLeft)}</h1>
        </Col>
      </Row>
      <Row className="justify-content-center gap-2">
        {timerState === 'stopped' && timeLeft === 0 ? (
          <Col xs="auto">
            <Button
              variant="success"
              onClick={() => setShowTimerModal(true)}
              size="sm"
              className="text-white fw-bold"
            >
              시작
            </Button>
          </Col>
        ) : timerState === 'running' ? (
          <>
            <Col xs="auto">
              <Button
                variant="secondary"
                onClick={pauseTimer}
                size="sm"
                className="text-white fw-bold"
              >
                일시정지
              </Button>
            </Col>
            <Col xs="auto">
              <Button
                variant="danger"
                onClick={stopTimer}
                size="sm"
                className="text-white fw-bold"
              >
                중지
              </Button>
            </Col>
            <Col xs="auto">
              <Button
                variant="warning"
                onClick={onCompleteClick} // props로 받은 함수 호출
                disabled={isSubmitting} // 요청 중일 때 비활성화
                className="text-white fw-bold"
              >
                완료
              </Button>
            </Col>
          </>
        ) : (
          <>
            <Col xs="auto">
              <Button
                variant="success"
                onClick={resumeTimer}
                size="sm"
                className="text-white fw-bold"
              >
                재개
              </Button>
            </Col>
            <Col xs="auto">
              <Button
                variant="danger"
                onClick={stopTimer}
                size="sm"
                className="text-white fw-bold"
              >
                중지
              </Button>
            </Col>
          </>
        )}
      </Row>

      {/* 타이머 설정 모달 */}
      <Modal
        show={showTimerModal}
        onHide={() => setShowTimerModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>타이머 설정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>시간 설정 (분)</Form.Label>
            <Form.Control
              type="number"
              value={timerInput}
              onChange={(e) => setTimerInput(e.target.value)}
              min="1"
              max="60"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTimerModal(false)}>
            취소
          </Button>
          <Button
            variant="primary"
            onClick={() => startTimer(parseInt(timerInput))}
          >
            시작
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
