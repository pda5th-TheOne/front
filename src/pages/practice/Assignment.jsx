import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';

export default function Assignment() {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(
    `1. routes/board/page.js를 사용흐며 마크업에서 부터시오.
2. 서버와 통신하여 데이터를 조회하시오.
3. 조회하는 함수는 lib/apis/board.js에 위치하여 사용하시오.`
  );

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Card.Title>실습 - BoardList 페이지</Card.Title>
          <Button variant="warning" size="sm" onClick={handleEdit}>
            {isEditing ? '저장' : '편집'}
          </Button>
        </div>
        {isEditing ? (
          <Form.Control
            as="textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ minHeight: '150px' }}
          />
        ) : (
          <div className="ps-3" style={{ whiteSpace: 'pre-line' }}>
            {content}
          </div>
        )}
      </Card.Body>
    </Card>
  );
}