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
  const [editingQuestion, setEditingQuestion] = useState(null); // 수정 중인 질문 ID
  const [editedQuestionContent, setEditedQuestionContent] = useState(''); // 수정된 질문 내용
  const [editingReplyId, setEditingReplyId] = useState(null); // 현재 수정 중인 답글 ID
  const [editingContent, setEditingContent] = useState(''); // 수정 중인 답글 내용

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

        // 질문데이터 저장
        const questionsData = Array.isArray(response.data) ? response.data : [];
        setQuestions(questionsData);

        // 질문 당 답변 가져오기 (reply.id로 관리해서 삭제할 때 사용)
        const repliesData = {};
        for (const question of response.data) {
          const repliesResponse = await axios.get(`/api/questions/${question.id}/replies`, {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Include access token in header
            },
          });

          // reply.id로 관리해서 삭제할 때 사용
          repliesData[question.id] = repliesResponse.data.reduce((acc, reply) => {
            acc[reply.id] = reply;
            return acc;
          }, {});
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


  // 질문 생성
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

      // 답변 등록완료 하면 새로고침 한번하기
      navigate(0);
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

  // 답변 버튼 눌렀을 때 핸들링
  const handleReplyClick = (questionIndex) => {
    setActiveQuestion(questionIndex);
  };

  // 질문 수정 함수
  const handleEditQuestion = async (questionId, content) => {
    try {
      await axios.put(
        `/api/questions/${questionId}`,
        content,
        {
          headers: {
            'Content-Type': 'text/plain',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } catch (error) {
      console.error('Error editing question:', error);
    }
  };

  // 질문 수정 제출 핸들러
  const handleQuestionUpdateSubmit = async (e, questionId) => {
    e.preventDefault();
    if (editedQuestionContent.trim() !== '') {
      try {
        // 서버에 수정된 질문 전송
        await handleEditQuestion(questionId, editedQuestionContent);

        // 서버에서 최신 질문 목록 가져오기
        const updatedQuestions = questions.map((question) =>
          question.id === questionId
            ? { ...question, content: editedQuestionContent }
            : question
        );

        setQuestions(updatedQuestions);
        setEditingQuestion(null); // 수정 모드 종료
        setEditedQuestionContent(''); // 입력 필드 초기화
      } catch (error) {
        console.error('Error updating question:', error);
      }
    }
  };
  
  const handleQuestionEditClick = (question) => {
    setEditingQuestion(question.id);
    setEditedQuestionContent(question.content);
  };

  const handleQuestionCancelEdit = () => {
    setEditingQuestion(null);
    setEditedQuestionContent('');
  };


  // 질문 삭제 함수 (본인이 등록한 것만 삭제 가능: accessToken의 userId로 검사함 Back 단에서)
  const handleDeleteQuestion = async (questionId) => {
    // 삭제 확인 alert
    const isConfirmed = window.confirm('정말로 이 질문을 삭제하시겠습니까?');

    if(isConfirmed) {
      try {
        // 질문을 삭제하는 API 요청
        await axios.delete(`/api/questions/${questionId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // 인증 토큰 포함
          },
        });

        // 삭제 후 상태 업데이트 (삭제된 질문 제외한 새 리스트로 업데이트)
        setQuestions(questions.filter((question) => question.id !== questionId));
      } catch (error) {
        console.error('Error deleting question:', error);
      }
    }
  };

  // 답글 수정 함수
  const updateReply = async (replyId, updatedContent) => {
    try {
      await axios.put(
        `/api/replies/${replyId}`,
        updatedContent,
        {
          headers: {
            'Content-Type': 'text/plain',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // 상태 업데이트
      setReplies((prevReplies) => {
        const updatedReplies = { ...prevReplies };
        for (const questionId in updatedReplies) {
          if (updatedReplies[questionId][replyId]) {
            updatedReplies[questionId][replyId].content = updatedContent;
          }
        }
        return updatedReplies;
      });

      setEditingReplyId(null); // 수정 모드 종료
    } catch (error) {
      console.error('Error updating reply:', error);
    }
  };

  // 답글 수정 핸들러
  const handleReplyEditClick = (replyId, currentContent) => {
    setEditingReplyId(replyId);
    setEditingContent(currentContent);
  };

  // 답글 수정 취소 핸들러
  const cancelReplyEdit = () => {
    setEditingReplyId(null);
    setEditingContent('');
  };

  // 답글 삭제 함수 (본인이 등록한 것만 삭제 가능: accessToken의 userId로 검사함 Back 단에서)
  const deleteReply = async (questionId, replyId) => {
    // 삭제 확인 alert
    const isConfirmed = window.confirm('정말로 이 답변을 삭제하시겠습니까?');

    if (isConfirmed) {
      try {
        // 답변을 삭제하는 API 요청
        await axios.delete(`/api/replies/${replyId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // 인증 토큰 포함
          },
        });

        // 삭제 후 상태 업데이트 (삭제된 답변 제외한 새 리스트로 업데이트)
        setReplies((prevReplies) => {
          const updatedReplies = { ...prevReplies };
          const updatedQuestionReplies = { ...updatedReplies[questionId] };
          delete updatedQuestionReplies[replyId]; // 삭제된 답글을 제거
          updatedReplies[questionId] = updatedQuestionReplies;
          return updatedReplies;
        });
      } catch (error) {
        console.error('Error deleting reply:', error);
      }
    }
  };

  return (
    <>
      <h2 className="mb-4">질문</h2>

      {/* 질문 카드 전체 관련 */}
      {questions.map((question, questionIndex) => (
        <div key={questionIndex} className="mb-4">
          <Card className="mb-3">
          <Card.Body>
              {/* 수정 모드일 때와 아닐 때를 구분하여 렌더링 */}
              {/* 수정 모드 */}
              {editingQuestion === question.id ? (
                <Form
                  onSubmit={(e) => handleQuestionUpdateSubmit(e, question.id)}
                >
                  <Form.Control
                    type="text"
                    value={editedQuestionContent}
                    onChange={(e) => setEditedQuestionContent(e.target.value)}
                  />
                  <div className="d-flex justify-content-end mt-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleQuestionCancelEdit}
                    >
                      취소
                    </Button>
                    <Button type="submit" variant="success" size="sm" className="ms-2" onClick={()=>{navigate(0)}}>
                      수정완료
                    </Button>
                  </div>
                </Form>
              ) : (
                <>
                  {/* 수정모드 아닌경우 */}
                  <Card.Text>{question.content}</Card.Text>

                  <div className="d-flex justify-content-end">
                    <Button
                      variant="warning"
                      size="sm"
                      style={{ fontSize: '0.875rem' }}
                      onClick={() => handleReplyClick(questionIndex)}
                    >
                      답변
                    </Button>

                    <Button
                      variant="primary"
                      size="sm"
                      className="ms-2"
                      onClick={() => handleQuestionEditClick(question)}
                    >
                      수정
                    </Button>

                    <Button
                      variant="danger"
                      size="sm"
                      className="ms-2"
                      onClick={() => handleDeleteQuestion(question.id)}
                    >
                      삭제
                    </Button>
                  </div>
                </>
              )}
            </Card.Body>
          </Card>

          {/* Render replies for each question */}
          {replies[question.id] &&
            Object.values(replies[question.id]).map((reply) => (
              <Card key={reply.id} className="mb-2 ms-4">
                <Card.Body>
                  {editingReplyId === reply.id ? (
                    <>
                      <Form.Control
                        type="text"
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                      />
                      <Button
                        variant="success"
                        size="sm"
                        className="mt-2"
                        onClick={() => updateReply(reply.id, editingContent)}
                      >
                        수정 완료
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="mt-2 ms-2"
                        onClick={cancelReplyEdit}
                      >
                        취소
                      </Button>
                    </>
                  ) : (
                    <>
                      <Card.Text>{reply.content}</Card.Text>
                        <div className="d-flex justify-content-end">
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleReplyEditClick(reply.id, reply.content)}
                          >
                            수정
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            className="ms-2"
                            onClick={() => deleteReply(question.id, reply.id)}
                          >
                            삭제
                          </Button>
                        </div>
                    </>
                  )}
                </Card.Body>
              </Card>
            ))}

          {/* 답변 등록에 대한 Form */}
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

      {/* 질문 등록에 대한 Form */}
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
