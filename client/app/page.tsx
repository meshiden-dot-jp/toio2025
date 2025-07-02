"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [position, setPosition] = useState({ x: 0, y: 0, angle: 0 });
  const [highlightedCell, setHighlightedCell] = useState(0);
  const [passedCells, setPassedCells] = useState<number[]>([]);
  const [isCounting, setIsCounting] = useState(false);

  const cells = [
    29, 30, 31, 32, 33, 34, 35,
    22, 23, 24, 25, 26, 27, 28,
    15, 16, 17, 18, 19, 20, 21,
    8, 9, 10, 11, 12, 13, 14,
    1, 2, 3, 4, 5, 6, 7,
  ];

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.binaryType = "arraybuffer";

    ws.onmessage = (event) => {
      if (event.data instanceof ArrayBuffer) {
        const floatArray = new Float32Array(event.data);
        if (floatArray.length === 3) {
          const x = floatArray[0];
          const y = floatArray[1];
          const angle = floatArray[2];

          setPosition({ x, y, angle });

          // 座標 → マス番号算出
          const X = Math.floor(1 + ((x - 98) / 42));
          const Y = Math.floor(5 - ((y - 142) / 42));
          const add = X + Y * 7;


          console.log("add:", add, "r", X, "c", Y, "xy", x, y, "highlightedCell:", highlightedCell);

          if (cells.includes(add)) {
            setHighlightedCell(add);

            if (!isCounting && add === 1) {
              setIsCounting(true); 
            }

            if (isCounting) {
              setPassedCells((prev) => (prev.includes(add) ? prev : [...prev, add]));
            }
          }
        }

      }
    };

    return () => ws.close();
  }, []);

  return (
    <div className="flex items-center justify-center w-[70%] h-full mt-[2%] m-auto mb-[0%]">
      {/* 左側: toio 情報 */}
      <div className="absolute top-[3%] left-12">
        <h2>toioの情報</h2>
        <div className="grid grid-cols-1 gap-16">
          <div>
            <h3>座標</h3>
            <div className="grid grid-cols-2 gap-0">
              <p>X: {position.x.toFixed(0)}</p>
              <p>Y: {position.y.toFixed(0)}</p>
            </div>
          </div>
          <div>
            <h3>角度</h3>
            <p>{position.angle.toFixed(0)}</p>
          </div>
          <div>
            <h3>振動</h3>
            <p>-</p>
          </div>
        </div>
      </div>

      {/* 中央: マス描画 */}
      <div className="grid grid-cols-7 gap-0 w-full m-auto px-4">
        {cells.map((cell, index) => {
          const isHighlighted = cell === highlightedCell;
          return (
            <div
              key={index}
              className={`flex justify-center items-center border w-full aspect-square text-center leading-[3rem] ${isHighlighted ? "bg-yellow-400" : "bg-white"
                }`}
            >
              {cell}
            </div>
          );
        })}
      </div>

      {/* 右側: 1Pの情報 */}
      <div className="absolute top-[3%] right-12 text-right">
        <h2>1Pの情報</h2>
        <div className="grid grid-cols-1 gap-16">
          <div>
            <h3>順番</h3>
            <p>-</p>
          </div>
          <div>
            <h3>出目と残り</h3>
            <p>-/-</p>
          </div>
          <div>
            <h3>スコア</h3>
            <p>{630 - passedCells.reduce((sum, val) => sum + val, 0)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
