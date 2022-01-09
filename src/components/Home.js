import React, { useState } from "react";
import "../App.css";

let output = "";
let history = "";
let symbols = ["*", "-", "+", "/"];
function Home() {
  const [state, setState] = useState({
    history: "",
    displayValue: "",
  });
  const updateState = () => {
    setState({ history: history.toString(), displayValue: output.toString() });
  };

  const onClick = (id, keyType, value) => {
    output = output.toString();

    let lastInput = output.slice(-1);

    switch (keyType) {
      case "function":
        functionKey(id, lastInput);
        break;
      case "operator":
        operatorKey(value, lastInput);
        break;
      case "number":
        numberKey(value, lastInput);
        break;
      default:
        return;
    }
  };
  const functionKey = (id, lastInput) => {
    const resetOutput = (display) => {
      history = "";
      output = "";

      display && updateState();
    };
    const calculate = (lastInput) => {
      if (!symbols.includes(lastInput) && output) {
        try {
          history = output;
          output = eval(output.replace(/%/g, "*0.01"));
          output = Number.isInteger(output) ? output : output.toFixed(3);
          updateState();

          history = output;
          output = "";
        } catch (error) {
          output = "Error";
          updateState();
          resetOutput();
        }
      }
    };

    switch (id) {
      case "clear":
        resetOutput(true);
        break;
      case "clearBack":
        output = output.slice(0, -1);
        updateState();
        break;
      case "calc":
        calculate(lastInput);
        break;
      default:
        return;
    }
  };
  const operatorKey = (value, lastInput) => {
    if (output === "" && value !== "-") {
      return;
    } else {
      symbols.includes(lastInput)
        ? (output = output.slice(0, -1) + value)
        : (output += value);
    }
    updateState();
  };
  const numberKey = (value, lastInput) => {
    if (value === "." || value === "%") {
      if (output === "" && value === "%") return;
      lastInput === "." || lastInput === "%" || (output += value);
    } else {
      output += value;
    }
    updateState();
  };
  return (
    <div className="main">
      <div className="container">
        <p className="title">Calculator After Dark</p>
      </div>

      <div className="numbers">
        <Keyboard onClick={onClick} />
      </div>
      <ResultView />
    </div>
  );
}

export default Home;

function Keyboard({ onClick }) {
  const numArr = [
    { id: "0", class: "number", value: "0" },
    { id: "1", class: "number", value: "1" },
    { id: "2", class: "number", value: "2" },
    { id: "3", class: "number", value: "3" },
    { id: "4", class: "number", value: "4" },
    { id: "5", class: "number", value: "5" },
    { id: "6", class: "number", value: "6" },
    { id: "7", class: "number", value: "7" },
    { id: "8", class: "number", value: "8" },
    { id: "9", class: "number", value: "9" },
    { id: "decimal", class: "number", value: "." },
    { id: "add", class: "operator", value: "+" },
    { id: "subtract", class: "operator", value: "-" },
    { id: "divide", class: "operator", value: "/" },
    { id: "multiply", class: "operator", value: "*" },
    { id: "calc", class: "function", value: "=" },
    { id: "clear", class: "function", value: "C" },
    { id: "clearBack", class: "function", value: "CE" },
  ];

  return (
    <div className="calc-body">
      {numArr.map((item) => {
        return (
          <div>
            <button
              id={item.id}
              key={item.id}
              className="button"
              onClick={() => onClick(item.id, item.class, item.value)}
            >
              {item.value}
            </button>
          </div>
        );
      })}
    </div>
  );
}

function ResultView() {
  return (
    <div className="results">
      <h1>{history}</h1>
      <h1>{output}</h1>
    </div>
  );
}
