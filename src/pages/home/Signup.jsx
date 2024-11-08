import React, { useState } from 'react';
import { Form, Button, Container, Alert, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

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

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await axios.post('/api/users/signup', formData);
      navigate('/', { state: { successMessage: '회원가입이 성공적으로 완료되었습니다!' } });
    } catch (error) {
      setErrorMessage('회원가입에 실패했습니다. 다시 시도해주세요.');
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
            <h4 className="fw-bold mb-2" style={{ color: '#F2A900' }}>회원가입</h4>
          </div>
          {errorMessage && (
            <Alert variant="danger">{errorMessage}</Alert>
          )}
          {successMessage && (
            <Alert variant="success">{successMessage}</Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>이름</Form.Label>
              <Form.Control
                type="text"
                placeholder="이름을 입력하세요"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border-warning"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>이메일</Form.Label>
              <Form.Control
                type="email"
                placeholder="이메일을 입력하세요"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border-warning"
              />
            </Form.Group>

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

            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>비밀번호 확인</Form.Label>
              <Form.Control
                type="password"
                placeholder="비밀번호를 다시 입력하세요"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="border-warning"
              />
            </Form.Group>

            <div className="d-grid gap-2">
            <Button variant="warning" type="submit" className="mt-3 text-white fw-bold">
              회원가입
            </Button>
              <Form.Text 
                className="text-center d-block mt-2" 
                as="a" 
                style={{ 
                  fontSize: '0.875rem', 
                  color: '#F2A900', 
                  textDecoration: 'none', 
                  cursor: 'pointer' 
                }}
                onClick={() => navigate('/')}
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
              >
                로그인 페이지로 돌아가기
              </Form.Text>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}