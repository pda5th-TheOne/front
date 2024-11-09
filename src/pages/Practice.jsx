import React from 'react';
import { useParams } from 'react-router-dom';
import Main from './practice/Main';

export default function Practice() {
  const { id } = useParams(); 

  return (
    <Main practiceId={id} />
  );
}