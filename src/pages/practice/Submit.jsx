import React, { useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import UserName from '../../components/UserName';
import Timer from './Timer';
import axios from 'axios';

export default function Submit({ usersPractices, practiceId, onRefresh }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false); // 취소 요청 상태

  const handleComplete = async () => {
    setIsSubmitting(true);
    const token = localStorage.getItem('accessToken');
    try {
      await axios.post(
        `/api/practices/${practiceId}/users_practices`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('완료가 성공적으로 기록되었습니다!');
      if (onRefresh) onRefresh(); // 데이터 갱신
    } catch (error) {
      console.error('Error completing practice:', error);
      alert('완료 요청에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = async (userId) => {
    setIsCancelling(true);
    const token = localStorage.getItem('accessToken');
    try {
      await axios.delete(`/api/practices/${practiceId}/users_practices`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { userId }, // DELETE 요청 본문에 userId 포함
      });
      alert('완료 기록이 취소되었습니다!');
      if (onRefresh) onRefresh(); // 데이터 갱신
    } catch (error) {
      console.error('Error cancelling completion:', error);
      alert('취소 요청에 실패했습니다.');
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <Card className="shadow-sm mb-4">
      <Card.Body>
        <Row className="mb-3">
          <Col>
            <Card.Title>시간안에 완료한 사람</Card.Title>
          </Col>
        </Row>

        <div className="d-flex flex-wrap gap-2 mb-4">
          {usersPractices.map((user, index) => (
            <UserName
              key={index}
              name={user.userName}
              onClick={() => handleCancel(user.userId)} // 사용자 이름 클릭 시 취소 요청
              style={{ cursor: 'pointer', color: 'red' }}
              disabled={isCancelling} // 취소 요청 중이면 비활성화
            />
          ))}
        </div>

        <div className="text-center mb-3">
          <Timer
            practiceId={practiceId}
            onCompleteClick={handleComplete}
            isSubmitting={isSubmitting}
          />
        </div>
      </Card.Body>
    </Card>
  );
}
