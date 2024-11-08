import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './Main.css';

import Logo from '../../components/Logo';
import TIL from './TIL';
import Practice from './Practice';
import Question from './Question';

export default function Main() {
  const navigate = useNavigate();
  const { id } = useParams(); // URL에서 'id'를 가져옴

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      // 인증되지 않았을 경우 로그인 페이지로 리디렉션
      navigate('/');
    }
  }, [navigate]);

  return (
    <Container fluid>
      <Logo />
      <Row id="contents">
        <Col id="contents-left" xs={4} className="d-flex flex-column">
          <div id="TIL">
            <TIL id={id} className="flex-fill" />{' '}
            {/* 'id'를 TIL 컴포넌트로 전달 */}
          </div>
          <div id="practice">
            <Practice id={id} className="flex-fill" />{' '}
            {/* 'id'를 Practice 컴포넌트로 전달 */}
          </div>
        </Col>
        <Col id="contents-right" xs={8}>
          <div id="question">
            <Question id={id} /> {/* 'id'를 Question 컴포넌트로 전달 */}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
