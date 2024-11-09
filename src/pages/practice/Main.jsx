import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Logo from '../../components/Logo';
import Assignment from './Assignment';
import Answer from './Answer';
import Submit from './Submit';

export default function Main({ practiceId }) {
  return (
    <div className="min-vh-100 bg-light">
      <header className="border-bottom">
        <Logo />
      </header>
      <main>
        <Container className="py-4">
          <Row className="gy-4">
            <Col xs={12}>
              <Assignment practiceId={practiceId} />
            </Col>
            <Col xs={12}>
              <Answer practiceId={practiceId} />
            </Col>
            <Col xs={12}>
              <Submit practiceId={practiceId} />
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}