import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert, Card } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '', // 비밀번호 필드 추가
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.successMessage) {
      setSuccessMessage(location.state.successMessage);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post('/api/auth/login', formData);
      localStorage.setItem('accessToken', response.data.accessToken);
      navigate('/main');
    } catch (error) {
      setErrorMessage('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <Container fluid className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <Card className="shadow-lg border-0" style={{ maxWidth: '400px', width: '100%' }}>
        <Card.Body className="p-5">
          <div className="text-center mb-4">
            <img
              src="/images/bee_logo.png"
              alt="Bee Logo"
              width="100"
              height="100"
              className="mb-3"
            />
            <img
              src="/images/main_logo.png"
              alt="Logo"
              width="180"
              height="55"
            />
            <h4 className="fw-bold mb-2" style={{ color: '#F2A900' }}>로그인</h4>
          </div>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          <Form onSubmit={handleSubmit}>
            {/* 이메일 입력 필드 */}
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>이메일</Form.Label>
              <Form.Control
                type="email"
                placeholder="이메일을 입력하세요"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="border-warning"
              />
            </Form.Group>

            {/* 비밀번호 입력 필드 복구 */}
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                placeholder="비밀번호를 입력하세요"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="border-warning"
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="warning" type="submit" className="mt-3 text-white fw-bold">
                로그인
              </Button>
              <Form.Text
                className="text-center d-block mt-2"
                as="a"
                style={{ fontSize: '0.875rem', color: '#F2A900', textDecoration: 'none', cursor: 'pointer' }}
                onClick={() => navigate('/signup')}
              >
                아이디가 없으신가요?
              </Form.Text>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}