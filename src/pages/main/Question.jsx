import './main.css';

export default function Question({ onClick }) {
  return (
    <div className="queue-container">
      <h2 className="queue-title">질문 큐</h2>
      <div className="button-content">
        <div className="queue-buttons">
          <button className="hand-button" onClick={onClick}>
            ✋🏻
          </button>
          <button className="queue-button">이하늘</button>
          <button className="queue-button">장우진</button>
          <button className="queue-button">조인후</button>
        </div>
      </div>
    </div>
  );
}
