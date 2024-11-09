import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';

export default function Assignment({
  content: initialContent,
  practiceId,
  onRefresh,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(initialContent);

  const handleSave = async () => {
    const token = localStorage.getItem('accessToken');
    try {
      await axios.put(
        `/api/practices/${practiceId}/assignment`,
        JSON.stringify(content),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setIsEditing(false);
      if (onRefresh) onRefresh(); // 변경사항 반영을 위해 데이터 재요청
    } catch (error) {
      console.error('Error updating assignment:', error);
      alert('실습 내용을 저장하는 데 문제가 발생했습니다.');
    }
  };

  const handleEdit = () => {
    if (isEditing) {
      handleSave(); // 편집 모드 종료 시 저장
    } else {
      setIsEditing(true); // 편집 모드 시작
    }
  };

  return (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Card.Title>실습</Card.Title>
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
