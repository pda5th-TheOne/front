import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import UserName from '../../components/UserName';
import { useNavigate } from 'react-router-dom';
import Timer from './Timer';
import axios from 'axios';

export default function Submit({ usersPractices, practiceId, onRefresh }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [userInfo, setUserInfo] = useState(null); // 로그인 사용자 정보
  const navigate = useNavigate();

  // 사용자 정보 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('/api/auth/validate-token', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        setUserInfo(response.data);
      } catch (error) {
        console.error('Failed to fetch user info', error);
      }
    };

    fetchUserInfo();
  }, []);

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
      navigate(0);
    } catch (error) {
      console.error('Error completing practice:', error);
      alert('완료 요청에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = async () => {
    if (!userInfo) return; // 사용자 정보가 없으면 실행 중단
    setIsCancelling(true);
    const token = localStorage.getItem('accessToken');
    try {
      await axios.delete(`/api/practices/${practiceId}/users_practices`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('완료 기록이 취소되었습니다!');
      navigate(0);
    } catch (error) {
      console.error('Error cancelling completion:', error);
      alert('취소 요청에 실패했습니다.');
    } finally {
      setIsCancelling(false);
    }
  };

  // 본인이 완료한 기록이 있는지 확인
  const hasCompleted = usersPractices.some(
    (user) => userInfo && user.userId === userInfo.id
  );

  return (
    <Card className="shadow-sm mb-4">
      <Card.Body>
        <Row className="mb-3">
          <Col className="d-flex align-items-center justify-content-between">
            <Card.Title>시간안에 완료한 사람</Card.Title>
            {hasCompleted && (
              <Button
                variant="danger"
                onClick={handleCancel}
                disabled={isCancelling}
              >
                제출 취소
              </Button>
            )}
          </Col>
        </Row>

        <div className="d-flex flex-wrap gap-2 mb-4">
          {usersPractices.map((user, index) => (
            <UserName
              key={index}
              name={user.userName}
              style={{
                color: user.userId === userInfo?.id ? 'blue' : 'black',
              }}
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
