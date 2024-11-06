import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Modal } from 'react-bootstrap';
import UserName from '../../components/UserName';

export default function Submit() {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showTimerModal, setShowTimerModal] = useState(false);
  const [timerInput, setTimerInput] = useState('10');
  const [completedUsers, setCompletedUsers] = useState([
    "조인우", "장우진", "이하늘", "이민선"
  ]);

  // 타이머 모달 열기
  const openTimerModal = () => {
    setShowTimerModal(true);
  };

  // 타이머 시작
  const startTimer = () => {
    const minutes = parseInt(timerInput);
    if (minutes > 0) {
      setTimeLeft(minutes * 60);
      setIsTimerRunning(true);
      setShowTimerModal(false);
    } else {
      alert('유효한 시간을 입력해주세요.');
    }
  };

  // 타이머 취소
  const cancelTimer = () => {
    setIsTimerRunning(false);
    setTimeLeft(0);
  };

  // 완료 처리
  const handleComplete = () => {
    alert('과제가 완료되었습니다!');
  };

  useEffect(() => {
    let timer;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
    }

    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft]);

  // 시간을 mm:ss 형식으로 변환
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Card.Title>시간안에 완료한 사람</Card.Title>
          <div className="d-flex align-items-center gap-2">
            {!isTimerRunning && timeLeft === 0 ? (
              <Button variant="primary" size="sm" onClick={openTimerModal}>
                타이머 시작
              </Button>
            ) : (
              <>
                <span className="text-muted">
                  타이머 {formatTime(timeLeft)}
                </span>
                <Button 
                  variant="danger" 
                  size="sm" 
                  onClick={cancelTimer}
                >
                  타이머 중지
                </Button>
              </>
            )}
          </div>
        </div>
        <div className="d-flex flex-wrap gap-2 mb-3">
          {completedUsers.map((user, index) => (
            <UserName key={index} name={user} />
          ))}
        </div>
        {isTimerRunning && (
          <div className="text-center">
            <Button 
              variant="success" 
              onClick={handleComplete}
              disabled={!isTimerRunning}
            >
              완료
            </Button>
          </div>
        )}
      </Card.Body>

      {/* 타이머 설정 모달 */}
      <Modal show={showTimerModal} onHide={() => setShowTimerModal(false)}>
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
          <Button variant="primary" onClick={startTimer}>
            시작
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
}