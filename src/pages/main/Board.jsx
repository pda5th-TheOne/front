import './main.css';

export default function Board() {
  return (
    <div className="board-container">
      <h1 className="date-header">11월 5일</h1>

      <section className="section">
        <h2 className="section-title">{'<실습>'}</h2>
        <div className="item-container">
          <div className="item">EXPRESS 실습1</div>
          <div className="item">EXPRESS 실습2</div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">{'<TIL>'}</h2>
        <div className="item-container">
          <div className="item">TIL 작성자: 장우진</div>
          <div className="item">TIL 작성자: 이하늘</div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">{'<질문 게시판>'}</h2>
        <div className="item-container">
          <div className="item">EXPRESS 실습1 질문 있습니다! </div>
          <div className="item">EXPRESS 실습2 질문 있습니다!</div>
        </div>
      </section>
    </div>
  );
}
