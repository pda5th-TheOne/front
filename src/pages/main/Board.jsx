import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Alert } from 'react-bootstrap';
import EditButton from './EditButton';
import { useNavigate } from 'react-router-dom';

export default function Board({ board }) {
  const navigate = useNavigate();

  if (!board) {
    return <p>데이터를 불러오는 중입니다...</p>;
  }

  const handleBoardClick = () => {
    navigate(`/detail/${board.id}`);
  };

  const handleEditClick = (event) => {
    event.stopPropagation();
  };

  return (
    <Container className="py-4 d-flex justify-content-center">
      <Card className="shadow-sm" style={{ width: '85%', borderRadius: '3rem', cursor: 'pointer' }} onClick={handleBoardClick}>
        <Card.Body>
          <div className="d-flex justify-content-center align-items-center mb-4 position-relative">
            <h1 className="h3 mx-auto text-center" style={{ color: '#5c4033' }}>
              {new Date(board.createdAt).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })} {board.topic}
            </h1>
            <div className="position-absolute" style={{ right: '1rem' }}>
              <EditButton onClick={handleEditClick} boardId={board.id} />
            </div>
          </div>

          <div className="mb-3">
            <h2 className="h5 mb-3" style={{ color: '#5c4033' }}>{'<실습>'}</h2>
            <Card className="h-100 rounded" style={{ minHeight: '200px' }}>
              <Card.Body>
                {(board.practices || []).slice(0, 3).map((practice, index) => (
                  <Alert key={index} variant="warning" className="mb-2">
                    <h4 className="h6 mb-0">{practice.title}</h4>
                  </Alert>
                ))}
              </Card.Body>
            </Card>
          </div>

          <div className="mb-3">
            <h2 className="h5 mb-3" style={{ color: '#5c4033' }}>{'<TIL>'}</h2>
            <Card className="h-100 rounded" style={{ minHeight: '200px' }}>
              <Card.Body>
                {(board.tils || []).slice(0, 3).map((til, index) => (
                  <Alert key={index} variant="warning" className="mb-2">
                    <h4 className="h6 mb-1">{til.title}</h4>
                    <a href={til.link} className="text-decoration-none">{til.link}</a>
                  </Alert>
                ))}
              </Card.Body>
            </Card>
          </div>

          <div>
            <h2 className="h5 mb-3" style={{ color: '#5c4033' }}>{'<질문 게시판>'}</h2>
            <Card className="h-100 rounded" style={{ minHeight: '200px' }}>
              <Card.Body>
                {(board.questions || []).slice(0, 3).map((question, index) => (
                  <Alert key={index} variant="warning" className="mb-2">
                    <p className="mb-0">{question.content}</p>
                  </Alert>
                ))}
              </Card.Body>
            </Card>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
