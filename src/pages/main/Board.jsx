import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container } from 'react-bootstrap';
import EditButton from './EditButton';
import { useNavigate } from 'react-router-dom';

export default function Board({ board }) {
  const navigate = useNavigate();

  if (!board) {
    return <p>데이터를 불러오는 중입니다...</p>;
  }

  // 게시판 클릭 시 해당 페이지로 이동
  const handleBoardClick = () => {
    navigate(`/detail/${board.id}`);
  };

  // EditButton 클릭 시 이벤트 버블링 방지
  const handleEditClick = (event) => {
    event.stopPropagation(); // 이벤트 버블링 방지
  };

  return (
    <Container
      className="py-4"
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      <Card
        className="shadow-sm"
        style={{ width: '85%', borderRadius: '3rem', cursor: 'pointer' }}
        onClick={handleBoardClick}
      >
        <Card.Body>
          <div className="d-flex justify-content-center align-items-center mb-4">
            <h1
              className="h3 mx-auto"
              style={{ color: '#5c4033', textAlign: 'center' }}
            >
              {new Date(board.createdAt).toLocaleDateString('ko-KR', {
                month: 'long',
                day: 'numeric',
              })}{' '}
              {board.topic}
            </h1>
            <div style={{ position: 'absolute', right: '1rem' }}>
              <EditButton onClick={handleEditClick} boardId={board.id} />
            </div>
          </div>

          <div className="mb-3">
            <h2 className="h5 mb-3" style={{ color: '#5c4033' }}>
              {'<실습>'}
            </h2>
            <Card className="h-100 rounded" style={{ minHeight: '200px' }}>
              <Card.Body>
                {(board.practices || []).map((practice, index) => (
                  <div key={index} className="mb-3">
                    <h4 className="h6">{practice.title}</h4>
                    <p className="mb-1 text-muted small">
                      과제: {practice.assignment}
                    </p>
                    <p className="mb-0">{practice.answer}</p>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </div>

          <div className="mb-3">
            <h2 className="h5 mb-3" style={{ color: '#5c4033' }}>
              {'<TIL>'}
            </h2>
            <Card className="h-100 rounded" style={{ minHeight: '200px' }}>
              <Card.Body>
                {(board.tils || []).map((til, index) => (
                  <div key={index} className="mb-2">
                    <h4 className="h6">{til.title}</h4>
                    <a href={til.link} className="text-decoration-none">
                      {til.link}
                    </a>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </div>

          <div>
            <h2 className="h5 mb-3" style={{ color: '#5c4033' }}>
              {'<질문 게시판>'}
            </h2>
            <Card className="h-100 rounded" style={{ minHeight: '200px' }}>
              <Card.Body>
                {(board.questions || []).map((question, index) => (
                  <div key={index} className="mb-2">
                    <p className="mb-0">{question.content}</p>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
