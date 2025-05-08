import React, { useState } from "react";
import closeicon from "../assets/close.png";
function Calculator() {
  const [capital, setCapital] = useState("");
  const [riskPercent, setRisk] = useState("");
  const [entryPrice, setEntryPrice] = useState("");
  const [takeProfit, setTakeProfit] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [result, setResult] = useState(null);

  const [popup, setPopup] = useState(false);

  const openPopup = () => {
    setPopup(true);
  };
  const closePopup = () => {
    setPopup(false);
  };

  const checkResult = () => {
    const capitalValue = parseFloat(capital);
    const risk = parseFloat(riskPercent);
    const entry = parseFloat(entryPrice);
    const stopL = parseFloat(stopLoss);
    const takeP = parseFloat(takeProfit);

    if (
      isNaN(capitalValue) ||
      isNaN(risk) ||
      isNaN(entry) ||
      isNaN(stopL) ||
      isNaN(takeP)
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const riskAmount = (capitalValue * risk) / 100;
    const sl = Math.abs(entry - stopL);
    const positionSize = riskAmount / sl;

    if (sl === 0) {
      alert("Stop loss must be different from entry price.");
    }

    let rrr = null;
    const reward = Math.abs(takeP - entry);
    rrr = reward / sl;

    setResult({
      riskAmount: riskAmount.toFixed(2),
      positionSize: positionSize.toFixed(6),
      rrr: rrr.toFixed(2),
    });
  };

  return (
    <>
      <div className="w-[100%] h-[100vh]  bg-black  flex flex-row gap-3 items-center justify-center overflow-scroll  transition-all">
        <div
          id="hover"
          className="md:w-[30%] w-[90%]  border-gray-200 hover:drop-shadow-xl hover:drop-shadow-teal-400   md:h-[80vh] h-[93vh] fixed   bg-neutral-900 border-4  transform  transition-all duration-700  text-gray-500 hover:border-teal-400  px-10  rounded-md   justify-center flex flex-col gap-2 "
        >
          <div className="flex hover:drop-shadow-teal-400 hover:drop-shadow-xl items-center  transition-all justify-center">
            {" "}
            <h1
              id="hover"
              className="font-bold text-3xl  mb-5 text-teal-400 font-[Poppins]"
            >
              Risk Calculator
            </h1>
          </div>
          <div>
            <p className="text-white font-bold">Total Capital (USD)</p>

            <input
              type="number"
              className="w-[100%] p-2  border rounded-md bg-black "
              placeholder="Enter your capital"
              value={capital}
              onChange={(e) => setCapital(e.target.value)}
              required
            />
          </div>
          <div>
            <p className="text-white">Risk per Trade (%)</p>

            <input
              type="number"
              className=" w-[100%] p-2  border rounded-md bg-black"
              placeholder="Risk percentage"
              value={riskPercent}
              onChange={(e) => setRisk(e.target.value)}
              required
            />
          </div>
          <div>
            <p className="text-white">Entry Price (USD)</p>

            <input
              type="number"
              className="w-[100%] p-2   border rounded-md bg-black"
              placeholder="Entry price"
              value={entryPrice}
              onChange={(e) => setEntryPrice(e.target.value)}
              required
            />
          </div>
          <div>
            <p className="text-white">Stop Loss (SL)</p>

            <input
              type="number"
              className="w-[100%] p-2  border rounded-md bg-black "
              placeholder="Stop loss"
              value={stopLoss}
              onChange={(e) => setStopLoss(e.target.value)}
              required
            />
          </div>
          <div>
            <p className="text-white">Take Profit (TP)</p>

            <input
              type="number"
              className="w-[100%] p-2   border rounded-md bg-black"
              placeholder="Take profit"
              value={takeProfit}
              onChange={(e) => setTakeProfit(e.target.value)}
              required
            />
          </div>

          <button
            id="hover"
            className="w-[100%] mt-3  hover:drop-shadow-teal-400 hover:drop-shadow-lg transition-all hover:scale-101  p-2 rounded-md bg-teal-400 text-white font-bold"
            onClick={() => {
              checkResult();
              openPopup();
            }}
          >
            Submit
          </button>
        </div>

        {popup && result && (
          <div className="   bg-white/40 flex items-center justify-center w-[90%] h-[90vh] absolute md:right-44  ">
            <div className="bg-neutral-900 p-4 px-10 border-teal-400 h-[50vh] flex flex-col items-start  rounded  text-white  font-serif  border-4 ">
              {" "}
              <img
                className="absolute top-5 right-5"
                onClick={closePopup}
                src={closeicon}
                alt=""
              />
              <div className="flex items-center justify-center flex-col ml-3 mt-5 mb-10">
                {" "}
                <h1 className=" font-extrabold text-xl text-teal-400">
                  Risk Riward Ratio
                </h1>
              </div>
              <div className="flex flex-col items-center justify-center">
                {" "}
                <p className="">
                  <strong>Risk Amount: </strong>${result.riskAmount}
                </p>
                <p className="">
                  <strong>Lot Size: </strong>
                  {result.positionSize}
                </p>
                {result.rrr && (
                  <p className="">
                    <strong>Risk Reward Ratio: </strong>
                    {result.rrr}:1
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Calculator;
