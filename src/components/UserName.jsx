import React from 'react';
import { Badge } from 'react-bootstrap';

export default function UserName({ name }) {
  return (
    <Badge bg="warning" text="dark">
      {name}
    </Badge>
  );
}