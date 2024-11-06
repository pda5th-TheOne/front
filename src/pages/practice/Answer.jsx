import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';

export default function Answer() {
  const [isEditing, setIsEditing] = useState(false);
  const [code, setCode] = useState(
    `import React from 'react';

export default function BoardDetailPage() {
  return (
    <>
      <h1>BOARDDETAIL</h1>
      <div>THIS IS BOARDDETAILPAGE</div>
    </>
  );
}`
  );

  const handleEdit = () => {
    setIsEditing(!isEditing);
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