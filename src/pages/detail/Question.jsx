import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';

export default function Question() {
  const { boardId } = useParams(); // URL에서 boardId 추출
  const navigate = useNavigate(); // useNavigate 훅 사용

  const [questions, setQuestions] = useState([]);
  const [replies, setReplies] = useState({});
  const [newQuestion, setNewQuestion] = useState('');
  const [newReplies, setNewReplies] = useState('');
  const [activeQuestion, setActiveQuestion] = useState(null);

  const accessToken = localStorage.getItem('accessToken'); // Fetch access token from local storage

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`/api/boards/${boardId}/questions`, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Include access token in header
          },
        });

        setQuestions(Array.isArray(response.data) ? response.data : []); // Ensure data is an array

        // 질문 당 답변까지 가져오기
        const questionsData = Array.isArray(response.data) ? response.data : [];
        setQuestions(questionsData);

        // Fetch replies for each question
        const repliesData = {};
        for (const [index, question] of questionsData.entries()) {
          const repliesResponse = await axios.get(`/api/questions/${question.id}/replies`, {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Include access token in header
            },
          });

          repliesData[index] = Array.isArray(repliesResponse.data)
            ? repliesResponse.data.map(reply => reply.content)
            : [];
        }

        setReplies(repliesData); // Store the replies
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    if (boardId) {
      fetchQuestions();
    }
  }, [accessToken, boardId]);


  // Submit a new question to the API
  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    if (newQuestion.trim() !== '') {
      try {
        // 새로운 질문을 문자열 형태로 전송
        const response = await axios.post(
          `/api/boards/${boardId}/questions`,
          newQuestion, // 단순 문자열 전송
          {
            headers: {
              'Content-Type': 'text/plain', // 문자열로 전송하도록 설정
              Authorization: `Bearer ${accessToken}`, // Include access token in header
            },
          }
        );
        setQuestions([...questions, response.data]); // Update state with new question
        setNewQuestion(''); // Clear input field

        // post method 완료 후 새로고침
        navigate(0);

      } catch (error) {
        console.error('Error adding question:', error);
      }
    }
  };

  // 답변을 서버에 전송하는 함수 (POST 요청)
  const postReply = async (questionId, content) => {
    try {
      await axios.post(
        `/api/questions/${questionId}/replies`,
        content,
        {
          headers: {
            'Content-Type': 'text/plain',
            Authorization: `Bearer ${accessToken}`, // 인증 토큰 포함
          },
        }
      );
    } catch (error) {
      console.error('Error adding reply:', error);
      throw error;
    }
  };

  // 서버에서 특정 질문의 답변 목록을 가져오는 함수 (GET 요청)
  const fetchReplies = async (questionId) => {
    try {
      const response = await axios.get(`/api/questions/${questionId}/replies`, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // 인증 토큰 포함
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching replies:', error);
      throw error;
    }
  };

// 답변 제출 핸들러 함수
const handleRepliesSubmit = async (e, questionIndex) => {
  e.preventDefault();
  if (newReplies.trim() !== '') {
    try {
      // 1. 답변을 서버에 전송
      await postReply(questions[questionIndex].id, newReplies);

      // 2. 서버에서 최신 답변 목록 가져오기
      const fetchedReplies = await fetchReplies(questions[questionIndex].id);

      // 3. 상태 업데이트
      const updatedReplies = { ...replies };
      updatedReplies[questionIndex] = Array.isArray(fetchedReplies) ? fetchedReplies.map(reply => reply.content) : [];
      setReplies(updatedReplies);

      // 입력 필드 초기화 및 답변 입력창 닫기
      setNewReplies('');
      setActiveQuestion(null);
    } catch (error) {
      console.error('Error handling replies submission:', error);
    }
  }
};

  const handleReplyClick = (questionIndex) => {
    setActiveQuestion(questionIndex);
  };

  return (
    <>
      <h2 className="mb-4">질문</h2>

      {questions.map((question, questionIndex) => (
        <div key={questionIndex} className="mb-4">
          <Card className="mb-3">
            <Card.Body>
              <Card.Text>{question.content}</Card.Text>
              <Button
                variant="warning"
                size="sm"
                className="float-end"
                style={{ fontSize: '0.875rem' }}
                onClick={() => handleReplyClick(questionIndex)}
              >
                답변
              </Button>
            </Card.Body>
          </Card>

          {/* Render replies for each question */}
          {replies[questionIndex]?.map((answer, index) => (
            <Card key={index} className="mb-2 ms-4">
              <Card.Body>
                <Card.Text>{answer}</Card.Text>
              </Card.Body>
            </Card>
          ))}

          {/* Show answer input field only for active question */}
          {activeQuestion === questionIndex && (
            <Form
              onSubmit={(e) => handleRepliesSubmit(e, questionIndex)}
              className="mt-4"
            >
              <Form.Group>
                <Form.Label>답변 작성하기</Form.Label>
                <div className="d-flex">
                  <Form.Control
                    type="text"
                    value={newReplies}
                    onChange={(e) => setNewReplies(e.target.value)}
                    placeholder="답변을 입력하세요"
                  />
                  <Button type="submit" variant="dark" className="ms-2">
                    <span className="rotate-45">✈</span>
                  </Button>
                </div>
              </Form.Group>
            </Form>
          )}
        </div>
      ))}

      {/* Question input field */}
      <Form onSubmit={handleQuestionSubmit} className="mt-4">
        <Form.Group>
          <Form.Label>질문 작성하기</Form.Label>
          <div className="d-flex">
            <Form.Control
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="질문을 입력하세요"
            />
            <Button type="submit" variant="dark" className="ms-2">
              <span className="rotate-45">✈</span>
            </Button>
          </div>
        </Form.Group>
      </Form>
    </>
  );
}
