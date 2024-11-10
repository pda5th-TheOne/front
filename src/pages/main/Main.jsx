import Logo from '../../components/Logo';
import Question from './Question';
import Honey from './Honey';
import BoardList from './BoardList';
import BoardPlusButton from './BoardPlusButton';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import PageButton from './PageButton';

import './main.css';
import { Col, Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';

export default function Main() {
  const navigate = useNavigate();

  // 인증되지 않았을 경우 로그인 페이지로 리디렉션
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      navigate('/');
    }
  }, [navigate]);

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
      <BoardList></BoardList>
      <BoardPlusButton></BoardPlusButton>
    </div>
  );
}
