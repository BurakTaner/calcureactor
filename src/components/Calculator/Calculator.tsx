import { useState } from "react";
import "./calculator.css";

export default function Calculator() {
  const nums: number[] = Array.from(Array(10).keys()).reverse();
  const operators: string[] = ["+", "-", "x", "/"];
  const [calculation, setCalculation] = useState({
    firstNum: "",
    operator: "",
    secondNum: "",
    result: ""
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { innerText, className } = event.target as HTMLButtonElement;
    if (className === "operator")
      setCalculation((prevCalculation) => {
        return {
          ...prevCalculation,
          operator: innerText,
          result: innerText
        }
      });

    else
      setCalculation((prevCalculation) => {
        let number = "";
        const isFirstNum = prevCalculation.operator === "";
        if (isFirstNum) number = prevCalculation.firstNum;
        else number = prevCalculation.secondNum;
        const result = number + innerText;
        return {
          ...prevCalculation,
          [isFirstNum ? "firstNum" : "secondNum"]: result,
          result: result.toString()
        }
      });
  }
  const calculateResult = () => {
    if(calculation.firstNum && calculation.secondNum)
    setCalculation((prevCalculation) => {
      let result = 0;
      switch (prevCalculation.operator) {
        case "+":
          result = parseInt(prevCalculation.firstNum) + parseInt(prevCalculation.secondNum);
          break;
        case "/":
          result = parseInt(prevCalculation.firstNum) / parseInt(prevCalculation.secondNum);
          break;
        case "x":
          result = parseInt(prevCalculation.firstNum) * parseInt(prevCalculation.secondNum);
          break;
        case "-":
          result = parseInt(prevCalculation.firstNum) - parseInt(prevCalculation.secondNum);
          break;
      }
      return {
        firstNum: "",
        secondNum: "",
        operator: "",
        result: result.toString()
      }
    });
  }
  const resetCalculation = () => {
    setCalculation(() => {
      return {
        firstNum: "",
        secondNum: "",
        operator: "",
        result: ""
      }
    });
  }

  const deleteLastEntry = () => {
    if (calculation.operator === "")
      setCalculation(prevCalculation => {
        return {
          ...prevCalculation,
          firstNum: "",
          result: ""
        }
      });
    else setCalculation(prevCalculation => {
      return {
        ...prevCalculation,
        secondNum: "",
        result: ""
      }
    });
  }

  return (
    <section className="calc-sec">
      <div className="result-box">
        <h2 className="result-screen">{calculation.result === "Infinity" ? "Divided by zero" : calculation.result}</h2>
      </div>
      <article className="calc-body">
        <ol className="nums-list list">
          {nums.map((num: number, i: number) => <li key={i}><button className="num" onClick={handleClick}>{num}</button></li>)}
          <li><button className="resetters" onClick={deleteLastEntry}>CE</button></li>
          <li><button className="resetters" onClick={resetCalculation}>C</button></li>
        </ol>
        <ol className="operators-list list">
          {operators.map((operator: string, i: number) => <li key={i}><button className="operator" onClick={handleClick}>{operator}</button></li>)}
        </ol>
      </article>
      <button className="equal" onClick={calculateResult}>Calculate</button>
    </section>
  );
}
