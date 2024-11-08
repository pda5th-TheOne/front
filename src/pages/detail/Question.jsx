import { useState, useEffect } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';

export default function Question({ id }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [activeQuestion, setActiveQuestion] = useState(null);

  const accessToken = localStorage.getItem('accessToken'); // Fetch access token from local storage

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`/api/board/${id}/questions`, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Include access token in header
          },
        });
        setQuestions(Array.isArray(response.data) ? response.data : []); // Ensure data is an array
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [accessToken, id]);

  // Submit a new question to the API
  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    if (newQuestion.trim() !== '') {
      try {
        const response = await axios.post(
          `/api/board/${id}/questions`,
          { question: newQuestion },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Include access token in header
            },
          }
        );
        setQuestions([...questions, response.data]); // Update state with new question
        setNewQuestion(''); // Clear input field
      } catch (error) {
        console.error('Error adding question:', error);
      }
    }
  };

  const handleAnswerSubmit = (e, questionIndex) => {
    e.preventDefault();
    if (newAnswer.trim() !== '') {
      const updatedAnswers = { ...answers };
      if (!updatedAnswers[questionIndex]) updatedAnswers[questionIndex] = [];
      updatedAnswers[questionIndex].push(newAnswer);
      setAnswers(updatedAnswers);
      setNewAnswer('');
      setActiveQuestion(null);
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
              <Card.Text>{question}</Card.Text>
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

          {/* Render answers for each question */}
          {answers[questionIndex]?.map((answer, index) => (
            <Card key={index} className="mb-2 ms-4">
              <Card.Body>
                <Card.Text>{answer}</Card.Text>
              </Card.Body>
            </Card>
          ))}

          {/* Show answer input field only for active question */}
          {activeQuestion === questionIndex && (
            <Form
              onSubmit={(e) => handleAnswerSubmit(e, questionIndex)}
              className="mt-4"
            >
              <Form.Group>
                <Form.Label>답변 작성하기</Form.Label>
                <div className="d-flex">
                  <Form.Control
                    type="text"
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
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
