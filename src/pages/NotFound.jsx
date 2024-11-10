import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100 text-center">
      <div className="mb-4">
        <img
          src="/images/bee_logo.png"
          alt="Bee Logo"
          width="100"
          height="100"
          className="mb-3"
        />
        <h1 className="display-4 fw-bold" style={{ color: '#F4C430' }}>
          THE ONE
        </h1>
      </div>

      <h2 className="mb-4">페이지를 찾을 수 없습니다</h2>
      <p className="text-muted mb-4">
        요청하신 페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.
      </p>

      <Button
        onClick={() => navigate('/main')}
        className="px-4 py-2"
        style={{
          backgroundColor: '#F4C430',
          border: 'none',
          borderRadius: '4px',
          fontSize: '1rem',
          width: '200px',
        }}
      >
        메인으로 이동
      </Button>
    </Container>
  );
}
