import { useState } from "react";
import { Card, Button, Form, Container } from "react-bootstrap";

export default function Question() {
  const [questions, setQuestions] = useState([
    "실습1 질문 있습니다! 언제 fetch를 사용하고 언제 axios 사용하는 건가요?",
  ]);
  const [answers, setAnswers] = useState({});
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [activeQuestion, setActiveQuestion] = useState(null); // 활성화된 답변 입력 필드를 위한 상태

  const handleQuestionSubmit = (e) => {
    // 질문 등록을 위한 함수
    e.preventDefault();
    if (newQuestion.trim() !== "") {
      setQuestions([...questions, newQuestion]);
      setNewQuestion("");
    }
  };

  const handleAnswerSubmit = (e, questionIndex) => {
    // 답변 등록을 위한 함수
    e.preventDefault();
    if (newAnswer.trim() !== "") {
      const updatedAnswers = { ...answers };
      if (!updatedAnswers[questionIndex]) updatedAnswers[questionIndex] = [];
      updatedAnswers[questionIndex].push(newAnswer);
      setAnswers(updatedAnswers);
      setNewAnswer("");
      setActiveQuestion(null);
    }
  };

  const handleReplyClick = (questionIndex) => {
    setActiveQuestion(questionIndex); // 특정 질문에 대한 답변 입력 필드 표시
  };

  return (
    <Container className="py-4">
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
                style={{ fontSize: "0.875rem" }}
                onClick={() => handleReplyClick(questionIndex)}
              >
                답변
              </Button>
            </Card.Body>
          </Card>

          {/* 해당 질문에 대한 답변 렌더링 */}
          {answers[questionIndex]?.map((answer, index) => (
            <Card key={index} className="mb-2 ms-4">
              <Card.Body>
                <Card.Text>{answer}</Card.Text>
              </Card.Body>
            </Card>
          ))}

          {/* 활성화된 질문에만 답변 입력 필드 표시 */}
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

      {/* 질문 작성 필드 */}
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
    </Container>
  );
}
