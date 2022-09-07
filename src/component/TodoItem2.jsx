import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
// import Badge from "react-bootstrap/Badge";

function TodoItem2(props) {
  return (
    <ListGroup as="ol" numbered>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">{props.item}</div>
          {props.item}
        </div>
        {/* <Badge bg="danger" pill> */}
        <Button
          variant="danger"
          onClick={() => {
            props.onChanged(props.id);
          }}
        >
          삭제
        </Button>
        {/* </Badge> */}
      </ListGroup.Item>
    </ListGroup>
    // <ListGroup>
    //   <ListGroup.Item variant="info">
    //     {props.item}
    //     <Button
    //       onClick={() => {
    //         props.onChanged(props.id);
    //       }}
    //     >
    //       삭제
    //     </Button>
    //   </ListGroup.Item>
    // </ListGroup>
  );
}
export default TodoItem2;
