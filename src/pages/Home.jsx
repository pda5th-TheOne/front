import React from 'react';
import { Outlet } from 'react-router-dom'; // Outlet을 추가

export default function Home() {
  return (
    <div>
      {/* 자식 컴포넌트(Login, Signup 등)가 여기 렌더링됩니다. */}
      <Outlet />
    </div>
  );
}
