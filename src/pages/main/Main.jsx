import Logo from '../../components/Logo';
import Question from './Question';
import Honey from './Honey';
import BoardList from './BoardList';

import './main.css';
import { Col, Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';

export default function Main() {
  return (
    <div className="content">
      <Logo></Logo>
      <div className="main-content">
        <Container fluid>
          <Row className="justify-content-between">
            <Col xs={12} md={6}>
              <Question></Question>
            </Col>

            <Col xs={12} md={6} lg={5} xl={4}>
              <Honey></Honey>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="board-list-content">
        <BoardList></BoardList>
      </div>
    </div>
  );
}
