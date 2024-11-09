import React, { useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import UserName from '../../components/UserName';
import Timer from './Timer';

export default function Submit({ practiceId }) {
  const [completedUsers, setCompletedUsers] = useState([
    "조인우", "장우진", "이하늘", "이민선"
  ]);

  return (
    <Card className="shadow-sm mb-4">
      <Card.Body>
        <Row className="mb-3">
          <Col>
            <Card.Title>시간안에 완료한 사람</Card.Title>
          </Col>
        </Row>

        {/* 완료한 사용자 리스트 */}
        <div className="d-flex flex-wrap gap-2 mb-4">
          {completedUsers.map((user, index) => (
            <UserName key={index} name={user} />
          ))}
        </div>

        {/* Timer 컴포넌트 */}
        <div className="text-center mb-3">
          <Timer practiceId={practiceId} />
        </div>
      </Card.Body>
    </Card>
  );
}