import { Container, Row, Col } from "react-bootstrap";
import "./Main.css";

import TIL from "./TIL";
import Practice from "./Practice";
import Question from "./Question";

export default function Main() {
  return (
    <Container fluid>
      <div>Logo</div>
      <Row id="contents">
        <Col id="contents-left" xs={4} className="d-flex flex-column">
          <div id="TIL">
            <TIL className="flex-fill" />
          </div>
          <div id="practice">
            <Practice className="flex-fill" />
          </div>
        </Col>
        <Col id="contents-right" xs={8}>
          <div id="question">
            <Question />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
