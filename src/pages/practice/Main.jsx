import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../components/Logo';
import Assignment from './Assignment';
import Answer from './Answer';
import Submit from './Submit';

export default function Main({ practiceId }) {
  const [practiceData, setPracticeData] = useState(null);
  const navigate = useNavigate();

  const fetchPracticeData = async () => {
    const token = localStorage.getItem('accessToken');
    try {
      if (!token) {
        // 인증되지 않았을 경우 로그인 페이지로 리디렉션
        navigate('/');
      } else {
        const response = await axios.get(`/api/practices/${practiceId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPracticeData(response.data);
      }
    } catch (error) {
      console.error('Error fetching practice data:', error);
      alert('해당하는 실습이 없습니다!');
      navigate('/main');
    }
  };

  useEffect(() => {
    fetchPracticeData();
  }, [practiceId]);

  if (!practiceData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-vh-100 bg-light">
      <header className="border-bottom">
        <Logo text={practiceData.title} />
      </header>
      <main>
        <Container className="py-4">
          <Row className="gy-4">
            <Col xs={12}>
              <Assignment
                content={practiceData.assignment}
                practiceId={practiceId}
              />
            </Col>
            <Col xs={12}>
              <Answer code={practiceData.answer} practiceId={practiceId} />
            </Col>
            <Col xs={12}>
              <Submit
                usersPractices={practiceData.usersPractices}
                practiceId={practiceId}
              />
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}
