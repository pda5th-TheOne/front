import Board from './Board';
import { Col, Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';

export default function BoardList() {
  return (
    <div className="board-list-content">
      <Row className="justify-content-between">
        <Col xs={12} md={3}>
          <Board></Board>
        </Col>

        <Col xs={12} md={3}>
          <Board></Board>
        </Col>
        <Col xs={12} md={3}>
          <Board></Board>
        </Col>
      </Row>
    </div>
  );
}
