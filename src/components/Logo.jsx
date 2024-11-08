import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅을 사용하여 리디렉션
import './components.css';

export default function Logo() {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 리디렉션

  const handleLogout = () => {
    // 로컬 스토리지에서 'accessToken' 삭제
    localStorage.removeItem('accessToken');

    // 로그아웃 후, 로그인 페이지로 리디렉션
    navigate('/');
  };

  return (
    <nav id="logo-bar" className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <img
          src="../../../images/main_logo.png"
          alt="Logo"
          width="180"
          height="55"
        />
        {/* 로그아웃 버튼 클릭 시 handleLogout 호출 */}
        <button
          id="logo-button"
          className="logout-button ms-auto"
          onClick={handleLogout}
        >
          로그아웃
        </button>
      </div>
    </nav>
  );
}
