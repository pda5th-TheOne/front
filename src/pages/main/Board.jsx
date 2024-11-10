import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Alert } from 'react-bootstrap';
import EditButton from './EditButton';
import { useNavigate } from 'react-router-dom';

export default function Board({ boardData }) {
  const navigate = useNavigate();

  if (!boardData) {
    return <p>데이터를 불러오는 중입니다...</p>;
  }

  const handleBoardClick = () => {
    navigate(`/detail/${boardData.dailyBoard.id}`);
  };

  const handleEditClick = (event) => {
    event.stopPropagation();
  };

  const { dailyBoard, top3Practices, top3TILs, top3Questions } = boardData;
  
  return (
    <Container className="py-4 d-flex justify-content-center">
      <Card className="shadow-sm" style={{ width: '85%', borderRadius: '3rem', cursor: 'pointer' }} onClick={handleBoardClick}>
        <Card.Body>
          <div className="d-flex justify-content-center align-items-center mb-4 position-relative">
            <h1 className="h3 mx-auto text-center" style={{ color: '#5c4033' }}>
              {new Date(dailyBoard.createdAt).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })} {dailyBoard.topic}
            </h1>
            <div className="position-absolute" style={{ right: '1rem' }}>
              <EditButton onClick={handleEditClick} boardId={dailyBoard.id} />
            </div>
          </div>

          <div className="mb-3">
            <h2 className="h5 mb-3" style={{ color: '#5c4033' }}>{'<실습>'}</h2>
            <Card className="h-100 rounded" style={{ minHeight: '200px' }}>
              <Card.Body>
                {(top3Practices || []).length > 0 ? (
                  top3Practices.map((practice, index) => (
                    <Alert key={index} variant="warning" className="mb-2">
                      <h4 className="h6 mb-0">{practice.title}</h4>
                    </Alert>
                  ))
                ) : (
                  <p className="text-muted">실습 항목이 없습니다.</p>
                )}
              </Card.Body>
            </Card>
          </div>

          <div className="mb-3">
            <h2 className="h5 mb-3" style={{ color: '#5c4033' }}>{'<TIL>'}</h2>
            <Card className="h-100 rounded" style={{ minHeight: '200px' }}>
              <Card.Body>
                {(top3TILs || []).length > 0 ? (
                  top3TILs.map((til, index) => (
                    <Alert key={index} variant="warning" className="mb-2">
                      <h4 className="h6 mb-1">{til.title}</h4>
                      {/* <a href={til.link} className="text-decoration-none">{til.link}</a> */}
                    </Alert>
                  ))
                ) : (
                  <p className="text-muted">TIL 항목이 없습니다.</p>
                )}
              </Card.Body>
            </Card>
          </div>

          <div>
            <h2 className="h5 mb-3" style={{ color: '#5c4033' }}>{'<질문 게시판>'}</h2>
            <Card className="h-100 rounded" style={{ minHeight: '200px' }}>
              <Card.Body>
                {(top3Questions || []).length > 0 ? (
                  top3Questions.map((question, index) => (
                    <Alert key={index} variant="warning" className="mb-2">
                      <p className="mb-0">{question.content}</p>
                    </Alert>
                  ))
                ) : (
                  <p className="text-muted">질문 항목이 없습니다.</p>
                )}
              </Card.Body>
            </Card>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
