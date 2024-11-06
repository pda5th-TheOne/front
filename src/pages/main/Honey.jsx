import './main.css';

// 꿀모으기 Bar 구현
// eslint-disable-next-line react/prop-types
export default function Honey({ progress = 70 }) {
  return (
    <div className="honey-container">
      <h2 className="honey-title">꿀 모으기</h2>
      <div className="honey-progress-wrapper">
        <div
          className="honey-progress-bar"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
        <span className="honey-percentage">{progress}%</span>
      </div>
    </div>
  );
}
