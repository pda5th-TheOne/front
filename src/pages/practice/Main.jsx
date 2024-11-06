import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Logo from '../../components/logo';
import Assignment from './Assignment';
import Answer from './Answer';
import Submit from './Submit';

export default function Main() {
  return (
    <div className="min-vh-100 bg-light">
      <header className="border-bottom">
        <Container className="d-flex justify-content-between align-items-center py-3">
          <Logo />
          <Button variant="warning">로그아웃</Button>
        </Container>
      </header>
      <main>
        <Container className="py-4">
          <Row className="gy-4">
            <Col xs={12}>
              <Assignment />
            </Col>
            <Col xs={12}>
              <Answer />
            </Col>
            <Col xs={12}>
              <Submit />
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}