"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [position, setPosition] = useState({ x: 0, y: 0, angle: 0 });
  const [dice, setDice] = useState<number | null>(null);
  const [remain, setRemain] = useState<number | null>(null);

  useEffect(() => {
    // ネイティブWebSocketクライアントで接続
    const ws = new WebSocket("ws://localhost:8080");

    // バイナリを受け取る際は "arraybuffer" にする
    ws.binaryType = "arraybuffer";

    ws.onmessage = (event) => {
      // バイナリデータとして来た場合
      if (event.data instanceof ArrayBuffer) {
        const floatArray = new Float32Array(event.data);
        if (floatArray.length >= 3) {
          setPosition({
            x: floatArray[0],
            y: floatArray[1],
            angle: floatArray[2],
          });

          if (floatArray.length >= 5) {
            setDice(Math.floor(floatArray[3]));
            setRemain(Math.floor(floatArray[4]));
          }
        } else {
          console.warn("想定外の長さの配列:", floatArray);
        }
      } else {
        console.warn("非バイナリデータを受信:", event.data);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="flex items-center justify-center w-[70%] h-full mt-[2%] m-auto mb-[0%]">
      <div className="absolute top-[3%] left-12">
        <h2>toioの情報</h2>
        <div className="grid grid-cols-1 gap-16">
          <div>
            <h3>座標</h3>
            <div className="grid grid-cols-2 gap-0">
              <p>X:{position.x.toFixed(0)}</p>
              <p>Y:{position.y.toFixed(0)}</p>
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
      <div className="grid grid-cols-7 gap-0 w-full m-auto px-4">
        <div className="flex justify-center items-center border w-full aspect-square text-center leading-[3rem]">29</div>
        <div className="flex justify-center items-center border w-full aspect-square text-center leading-[3rem]">30</div>
        <div className="flex justify-center items-center border w-full aspect-square text-center leading-[3rem]">31</div>
        <div className="flex justify-center items-center border w-full aspect-square text-center leading-[3rem]">32</div>
        <div className="flex justify-center items-center border w-full aspect-square text-center leading-[3rem]">33</div>
        <div className="flex justify-center items-center border w-full aspect-square text-center leading-[3rem]">34</div>
        <div className="flex justify-center items-center border w-full aspect-square text-center leading-[3rem]">Goal</div>
        <div className="flex justify-center items-center border w-full aspect-square text-center leading-[3rem]">22</div>
        <div className="flex justify-center items-center border w-full aspect-square text-center leading-[3rem]">23</div>
        <div className="flex justify-center items-center border w-full aspect-square text-center leading-[3rem]">24</div>
        <div className="flex justify-center items-center border w-full aspect-square text-center leading-[3rem]">25</div>
        <div className="flex justify-center items-center border w-full aspect-square text-center leading-[3rem]">26</div>
        <div className="flex justify-center items-center border w-full aspect-square text-center leading-[3rem]">27</div>
        <div className="flex justify-center items-center border w-full aspect-square text-center leading-[3rem]">28</div>
        <div className="flex justify-center items-center border w-full aspect-square text-center leading-[3rem]">15</div>
        <div className="flex justify-center items-center border w-full aspect-square text-center leading-[3rem]">16</div>
        <div className="flex justify-center items-center border w-full aspect-square text-center leading-[3rem]">17</div>
        <div className="flex justify-center items-center border w-full aspect-square text-center leading-[3rem]">18</div>
        <div className="flex justify-center items-center border w-full aspect-square text-center leading-[3rem]">19</div>
        <div className="flex justify-center items-center border w-full aspect-square text-center leading-[3rem]">20</div>
        <div className="flex justify-center items-center border w-full aspect-square text-center leading-[3rem]">21</div>
        <div className="flex justify-center items-center border w-full aspect-square text-center leading-[3rem]">8</div>
        <div className="flex justify-center items-center border w-full aspect-square text-center leading-[3rem]">9</div>
        <div className="flex justify-center items-center border w-full aspect-square text-center leading-[3rem]">10</div>
        <div className="flex justify-center items-center border w-full aspect-square text-center leading-[3rem]">11</div>
        <div className="flex justify-center items-center border w-full aspect-square text-center leading-[3rem]">12</div>
        <div className="flex justify-center items-center border w-full aspect-square text-center leading-[3rem]">13</div>
        <div className="flex justify-center items-center border w-full aspect-square text-center leading-[3rem]">14</div>
        <div className="flex justify-center items-center border w-full aspect-square text-center leading-[3rem]">Start</div>
        <div className="flex justify-center items-center border w-full aspect-square text-center leading-[3rem]">2</div>
        <div className="flex justify-center items-center border w-full aspect-square text-center leading-[3rem]">3</div>
        <div className="flex justify-center items-center border w-full aspect-square text-center leading-[3rem]">4</div>
        <div className="flex justify-center items-center border w-full aspect-square text-center leading-[3rem]">5</div>
        <div className="flex justify-center items-center border w-full aspect-square text-center leading-[3rem]">6</div>
        <div className="flex justify-center items-center border w-full aspect-square text-center leading-[3rem]">7</div>
      </div>

      <div className="absolute top-[3%] right-12 text-right">
        <h2>1Pの情報</h2>
        <div className="grid grid-cols-1 gap-16">
          <div>
            <h3>順番</h3>
            <p>-</p>
          </div>
          <div>
            <h3>出目と残り</h3>
             <p>{dice !== null && remain !== null ? `${dice} / ${remain}` : "- / -"}</p>
          </div>
          <div>
            <h3>スコア</h3>
            <p>-</p>
          </div>
        </div>
      </div>
    </div>
  );
}
