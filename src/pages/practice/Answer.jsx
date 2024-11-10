import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Answer({ code: initialCode, practiceId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [code, setCode] = useState(initialCode);
  const navigate = useNavigate();

  const handleSave = async () => {
    const token = localStorage.getItem('accessToken');
    try {
      await axios.put(
        `/api/practices/${practiceId}/answer`,
        { newContent: code },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setIsEditing(false);
      navigate(0);
    } catch (error) {
      console.error('Error updating answer:', error);
      alert('모범답안을 저장하는 데 문제가 발생했습니다.');
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
          <Card.Title>모범답안</Card.Title>
          <Button variant="warning" size="sm" onClick={handleEdit}>
            {isEditing ? '저장' : '편집'}
          </Button>
        </div>
        {isEditing ? (
          <Form.Control
            as="textarea"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{ minHeight: '200px', fontFamily: 'monospace' }}
          />
        ) : (
          <pre className="bg-light p-3 rounded">
            <code>{code}</code>
          </pre>
        )}
      </Card.Body>
    </Card>
  );
}
