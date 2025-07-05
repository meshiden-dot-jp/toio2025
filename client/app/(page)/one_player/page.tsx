"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function Home() {
  const [position, setPosition] = useState({ x: 0, y: 0, angle: 0, battery: 0 });
  const [highlightedCell, setHighlightedCell] = useState(0);
  const [passedCells, setPassedCells] = useState<number[]>([]);
  const [isCounting, setIsCounting] = useState(false);
  const [isGoal, setIsGoal] = useState(false);
  let score = 630 - passedCells.reduce((sum, val) => sum + val, 0);
  const START  = 1;
  const GOAL = 35;
  const NONE = 0;

  const router = useRouter();

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
        if (floatArray.length === 4) {
          const x = floatArray[0];
          const y = floatArray[1];
          const angle = floatArray[2];
          const battery = floatArray[3];

          setPosition({ x, y, angle, battery });

          // 座標 → マス番号算出
          const X = Math.floor(1 + ((x - 98) / 42));
          const Y = Math.floor(5 - ((y - 142) / 42));
          const add = X + Y * 7;
          // console.log("add:", add, "r", X, "c", Y, "xy", x, y, "highlightedCell:", highlightedCell);

          if (cells.includes(add)) {
            setHighlightedCell(add);

            if (!isCounting && add === START && passedCells.length === NONE) {
              setIsCounting(true);
            }

            if (isCounting && add === GOAL) {
              setIsCounting(false);
              setIsGoal(true);
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
            <h3>充電</h3>
            <p>{position.battery.toFixed(0)}</p>
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
            <p>あなたの番です</p>
          </div>
          <div>
            <h3>出目と残り</h3>
            <p>-/-</p>
          </div>
          <div>
            <h3>スコア</h3>
            <p>{score}</p>
          </div>
        </div>
      </div>
      {/* ゲーム終了ダイアログ */}
      {isGoal && (
        <AlertDialog open={true} onOpenChange={() => (setIsGoal(false))}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="p-0 text-center text-base">ゲーム終了</AlertDialogTitle>
              <AlertDialogDescription asChild className="text-black">
                <div className="text-black font-bold text-center space-y-2">
                  <div className="text-2xl pt-4">マイスコア</div>
                  <div className="text-6xl pt-2 pb-8">
                    {score}
                  </div>
                  <table className="table-auto text-left text-sm w-full border border-gray-300 rounded-md overflow-hidden pb-6">
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <th className="px-4 py-2 text-base font-semibold w-32">マス数</th>
                        <td className="px-4 py-2">{passedCells.length} / 35</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <th className="px-4 py-2 text-base font-semibold">通過マス</th>
                        <td className="px-4 py-2">
                          {passedCells.length === START
                            ? "なし"
                            : passedCells.join(", ")}
                        </td>
                      </tr>
                      <tr>
                        <th className="px-4 py-2 text-base font-semibold">残りマス</th>
                        <td className="px-4 py-2 pb-4">
                          {passedCells.length === GOAL
                            ? "なし"
                            : cells.filter(cell => !passedCells.includes(cell)).join(", ")}
                        </td>
                      </tr>
                      {/* <tr>
                        <th className="px-4 py-2 text-base font-semibold">チート</th>
                        <td className="px-4 py-2">
                          {passedCells.length <= 12
                            ? "チートの疑いがあります"
                            : "-"}
                        </td>
                      </tr> */}
                    </tbody>
                  </table>

                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => {
                  setIsGoal(false);
                  router.push("/");
                }}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg hover:text-white w-full"
              >
                トップへ戻る
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div >
  );
}
