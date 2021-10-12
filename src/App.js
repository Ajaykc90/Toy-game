
import './App.css';
import { useState } from 'react';

function App() {
  const maxX = 4;
  const maxY = 4;
  const facing = ["NORTH", "SOUTH", "EAST", "WEST"];
  const [inputValue, setInputValue] = useState('');
  const [robotPosition, setRobotPosition] = useState({ x: 0, y: 0, f: "NORTH" });
  const [errorMessage, setErroMessage] = useState("");
  const handleChange = (e) => {
    setInputValue(e.target.value);
    console.log(inputValue);

  }


  const performCommand = (event) => {

    if (event.key === "Enter") {
      error("");
      const command = inputValue;
      const completeCmd = command.split(" ");
      const literalCmd = completeCmd[0].toUpperCase();
      switchLiteralCommand(literalCmd, completeCmd);
    }

  }
  const validX = (axis) => {
    if (isNaN(axis)) {
      error("X must be in Number");
      return false;
    } else if (axis < 0 || axis > maxX) {
      error("ROBOT WILL FALL SO COMMAND IS IGNORED");
    }
    else {
      return true;
    }
  }
  const validY = (axis) => {
    if (isNaN(axis)) {
      error("Y must be in Number");
      return false;
    } else if (axis < 0 || axis > maxY) {
      error("ROBOT WILL FALL SO COMMAND IS IGNORED");
    }
    else {
      return true;
    }
  }
  const validF = (face) => {
    if (facing.indexOf(face) === -1) {
      error("WRONG FACING");
      return false;
    } else {
      return true;
    }
  }
  const place = (posCommand) => {
    const newPosition = posCommand.split(",");
    console.log(newPosition);
    const newX = parseInt(newPosition[0].trim());
    const newY = parseInt(newPosition[1].trim());
    const newF = newPosition[2].trim().toUpperCase();

    if (validX(newX) && validY(newY) && validF(newF)) {
      setRobotPosition(prevState => ({
        ...prevState,
        x: newX,
        y: newY,
        f: newF

      }));

    }

  }
  const switchLiteralCommand = (literalCommand, completeCommand) => {
    switch (literalCommand) {
      case "PLACE":
        const posCommand = completeCommand.slice(1).join("");
        place(posCommand);
        break;
      case "MOVE":
        move();
        break;
      case "LEFT":
        rotate("left");
        break;
      case "RIGHT":
        rotate("right");
        break;
      default:
        error("Invalid Command");
        break;
    }

  }

  const move = () => {
    let nextY, nextX;
    switch (robotPosition.f) {
      case "NORTH":
        nextY = robotPosition.y + 1;
        if (validY(nextY)) {
          setRobotPosition(prevState => ({
            ...prevState,
            y: nextY,
          }))
        }

        break;
      case "SOUTH":
        nextY = robotPosition.y - 1;
        if (validY(nextY)) {
          setRobotPosition(prevState => ({
            ...prevState,
            y: nextY,
          }));

        }

        break;
      case "EAST":
        nextX = robotPosition.x + 1;
        if (validX(nextX)) {
          setRobotPosition(prevState => ({
            ...prevState,
            x: nextX,
          }))
        }

        break;
      case "WEST":
        nextX = robotPosition.x - 1;
        if (validX(nextX)) {
          setRobotPosition(prevState => ({
            ...prevState,
            x: nextX,
          }))
        }

        break;
      default:
        break;
    }

  }
  const rotate = (direction) => {
    if (direction === "left") {
      switch (robotPosition.f) {
        case "NORTH":
          setRobotPosition(prevState => ({
            ...prevState,
            f: "WEST",
          }))
          break;
        case "SOUTH":
          setRobotPosition(prevState => ({
            ...prevState,
            f: "EAST",
          }))
          break;
        case "EAST":
          setRobotPosition(prevState => ({
            ...prevState,
            f: "NORTH"
          }))
          break;
        case "WEST":
          setRobotPosition(prevState => ({
            ...prevState,
            f: "SOUTH"
          }))
          break;
        default:
          break;
      }
    }
    else if (direction === "right") {
      switch (robotPosition.f) {
        case "NORTH":
          setRobotPosition(prevState => ({
            ...prevState,
            f: "EAST",
          }))
          break;
        case "SOUTH":
          setRobotPosition(prevState => ({
            ...prevState,
            f: "WEST",
          }))
          break;
        case "EAST":
          setRobotPosition(prevState => ({
            ...prevState,
            f: "SOUTH",
          }))
          break;
        case "WEST":
          setRobotPosition(prevState => ({
            ...prevState,
            f: "NORTH",
          }))
          break;
        default:
          break;
      }
    }

  }
  const error = (msg) => {
    setErroMessage(msg);
  }

  return (
    <div className="App">
      <h2>Toy Robot Simulator</h2>

      <div> <strong>Command: </strong>
        <input type="text" onChange={handleChange} onKeyPress={performCommand} />
        <span id="error">{errorMessage}</span>

      </div>
      <div> <strong>Report: <span id="report">THE ROBOT POSITION IS X:{robotPosition.x} Y:{robotPosition.y} and facing:{robotPosition.f}</span></strong>

      </div>
    </div>
  );
}

export default App;
