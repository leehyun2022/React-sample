import React from "react";
import Accordion from "react-bootstrap/Accordion";

const tag = "LifeCycleTest";
class LifeCycleTest extends React.Component {
  constructor(props) {
    console.log(tag + ":constructor()");
    super(props);
    this.state = { gender: "man", age: props.age, tall: 180 };
  }

  render() {
    console.log(tag + ":render()");
    return (
      <>
        <Accordion defaultActiveKey="1">
          <Accordion.Item eventKey="0">
            <Accordion.Header>기본 설명</Accordion.Header>
            <Accordion.Body>
              * 내용무 <br />
              <a
                href="https://react.vlpt.us/basic/11-render-array.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                전체 내용 보기
              </a>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>소스코드 설명</Accordion.Header>
            <Accordion.Body></Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <div>
          <p>My tall is {this.state.tall}cm</p>
          <p>I am a {this.state.gender}.</p>
          <p>I am {this.state.age} years old.</p>
        </div>
      </>
    );
  }

  static getDerivedStateFromProps(props, state) {
    console.log(tag + ":getDerivedStateFromProps()");
    return { age: state.age + 10 };
  }

  componentDidMount() {
    console.log(tag + ":componentDidMount()");
    setTimeout(() => {
      this.setState({ age: this.state.age + 10 });
    }, 1000);
  }
}

export default LifeCycleTest;
