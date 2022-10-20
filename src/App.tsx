import React, { useState } from "react";
import {
  RiDivideLine,
  RiCloseLine,
  RiAddLine,
  RiSubtractLine,
} from "react-icons/ri";
import { TbEqual } from "react-icons/tb";
import type { IconType } from "react-icons";
import Pad from "./Pad";
import PadGray from "./PadGray";
import PadOrange from "./PadOrange";
import { formatNum, range } from "./utils";
import PadLightGray from "./PadLightGray";

type Operator = "divide" | "multiply" | "subtract" | "add";
const operatorToIcon: { [op in Operator]: IconType } = {
  divide: RiDivideLine,
  multiply: RiCloseLine,
  subtract: RiSubtractLine,
  add: RiAddLine,
} as const;

function App() {
  const [displayedNum, setDisplayedNum] = React.useState("0");
  const [bufferNum, setBufferNum] = React.useState(0);
  const [selectedOp, setSelectedOp] = React.useState<Operator | null>(null);
  const [operator, setOperator] = React.useState<Operator | null>(null);

  const handlePressNumPad = (input: number | string) => {
    setDisplayedNum((curr) => {
      const inputStr = input.toString();
      if ((curr === "0" || !!selectedOp) && input !== ".") return inputStr;
      return curr + inputStr;
    });
    if (selectedOp) {
      setSelectedOp(null);
      setOperator(selectedOp);
    }
  };

  const calculate = () => {
    const rightNum = Number(displayedNum);
    let result: number;

    switch (operator) {
      case "divide":
        result = bufferNum / rightNum;
        break;
      case "multiply":
        result = bufferNum * rightNum;
        break;
      case "subtract":
        result = bufferNum - rightNum;
        break;
      case "add":
        result = bufferNum + rightNum;
        break;
      default:
        return;
    }

    setDisplayedNum(result.toString());
    setBufferNum(result);
    setOperator(null);
    return result;
  };

  const handlePressOperator = (op: Operator) => {
    const result = calculate();
    setSelectedOp(op);
    setBufferNum(result ?? Number(displayedNum));
  };

  const clear = () => {
    setDisplayedNum("0");
    setBufferNum(0);
  };

  const buildNumPads = (start: number, end: number) => {
    return range(start, end).map((num) => (
      <PadGray
        key={num}
        onClick={() => void handlePressNumPad(num)}
        className="bg-gray-400 p-3"
      >
        {num}
      </PadGray>
    ));
  };

  const buildOperatorPad = (operator: Operator, selected: boolean) => {
    const Icon = operatorToIcon[operator];
    return (
      <PadOrange
        selected={selected}
        onClick={() => void handlePressOperator(operator)}
      >
        <Icon />
      </PadOrange>
    );
  };

  return (
    <div className="bg-black grid place-content-center p-4 h-screen">
      <div className="grid gap-y-8 shadow-lg shadow-cyan-800/100 max-w-full">
        <div className="text-white text-7xl text-end font-light shadow-cyan-500/50">
          {formatNum(Number(displayedNum))}
        </div>
        <div className="grid grid-cols-calculator auto-rows-calculator gap-3">
          <PadLightGray className="col-span-3" onClick={clear}>
            AC
          </PadLightGray>
          {buildOperatorPad("divide", selectedOp === "divide")}

          {buildNumPads(7, 9)}
          {buildOperatorPad("multiply", selectedOp === "multiply")}

          {buildNumPads(4, 6)}
          {buildOperatorPad("subtract", selectedOp === "subtract")}

          {buildNumPads(1, 3)}
          {buildOperatorPad("add", selectedOp === "add")}

          <PadGray
            className="col-span-2"
            onClick={() => void handlePressNumPad(0)}
          >
            0
          </PadGray>
          <PadGray
            onClick={() => void handlePressNumPad(".")}
            disabled={!!displayedNum.match(/\./)}
          >
            .
          </PadGray>

          <PadOrange onClick={calculate}>
            <TbEqual />
          </PadOrange>
        </div>
      </div>
    </div>
  );
}

export default App;
