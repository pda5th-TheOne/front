import { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // 리디렉션을 위한 navigate 훅

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

      // 로그인 성공 시 엑세스 토큰을 로컬 스토리지에 저장
      localStorage.setItem('accessToken', response.data.token);

      setSuccessMessage('로그인 성공!');
      setFormData({ username: '', password: '' }); // 폼 초기화

      // 로그인 성공 후 홈 페이지로 리디렉션
      navigate('/main'); // 또는 다른 리디렉션 경로로 설정
    } catch (error) {
      setErrorMessage('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <Row className="justify-content-center">
        <Col md={6}>
          <img
            src="../../../images/main_logo.png"
            alt="Bootstrap"
            width="100"
            height="55"
          />
          <h2>로그인</h2>
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>이메일</Form.Label>
              <Form.Control
                type="email"
                placeholder="이메일을 입력하세요"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                placeholder="비밀번호를 입력하세요"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              로그인
            </Button>
            <div>
              <Link to="/signup">회원가입</Link>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
}
