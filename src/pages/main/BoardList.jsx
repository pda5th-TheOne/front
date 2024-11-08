import { useEffect, useState } from 'react';
import axios from 'axios';
import Board from './Board';
import { Col, Container, Row } from 'react-bootstrap';
import PageButton from './PageButton';

export default function BoardList() {
  const [boardData, setBoardData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  // API 인스턴스 생성 및 인터셉터 설정
  const api = axios.create({
    baseURL: '/api', // REST API 기본 URL 설정
  });

  // 요청에 JWT 토큰을 자동으로 추가하는 인터셉터 설정
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken'); // JWT 토큰 가져오기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Authorization 헤더 추가
    }
    return config;
  });

  // 페이지 데이터 가져오는 함수
  const fetchData = async (page = 0) => {
    try {
      const response = await api.get(`/boards?page=${page}`); // api 인스턴스 사용
      setBoardData(response.data);
    } catch (error) {
      console.error('Error fetching board data:', error);
    }
  };

  // 컴포넌트가 마운트될 때와 currentPage가 변경될 때 fetchData 호출
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  return (
    <Container fluid className="px-3">
      <Row className="g-1 justify-content-center">
        {boardData.map((board, index) => (
          <Col key={index} xs={12} md={5} lg={4} className="p-0">
            <Board board={board.dailyBoard} />
          </Col>
        ))}
      </Row>
      <PageButton setCurrentPage={setCurrentPage} />
    </Container>
  );
}
