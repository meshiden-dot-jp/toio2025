using WebSocketSharp;
using System;
using toio;
using toio.Simulator;
using UnityEngine;
using System.Text;
using Newtonsoft.Json;

//簡易マットの座標:(40,40,200,280)?
public class one_player : MonoBehaviour
{
    WebSocket ws;
    public ConnectType connectType;
    CubeManager cubeManager;
    Cube cube;
    float intervalTime = 0.2f;
    float elapsedTime = 0;
    bool i = true;
    Vector2 startPos;


    async void Start()
    {
        ws = new WebSocket("ws://localhost:8080");
        ws.OnMessage += (sender, e) =>
        {
            Debug.Log("Message received from " + ((WebSocket)sender).Url + ", Data : " + e.Data);
        };
        ws.Connect();
        cubeManager = new CubeManager(connectType);
        cube = await cubeManager.SingleConnect();
        cubeManager.handles[0].borderRect = new RectInt(98, 142, 402, 358);
        startPos = new Vector2(cube.x, cube.y);
    }

    void Update()
    {
        Console.WriteLine("Update called");
        elapsedTime += Time.deltaTime;

        if (ws == null)
        {
            Debug.LogError("WebSocket is not initialized.");
            return;
        }
        if (Input.GetKeyDown(KeyCode.Space))
        {
            ws.Send("Space key pressed");
        }

        if (cubeManager.IsControllable(cube) && cubeManager.synced)
        {
            //Move2Target
            if (intervalTime < elapsedTime) // 0.2s
            {
                // Debug.Log("x : " + cube.x + ", y : " + cube.y + ", angle : " + cube.angle);
                float[] floatArray = new float[] { cube.x, cube.y, cube.angle };

                // float[] → byte[] に変換（1 float = 4 bytes）
                byte[] byteArray = new byte[floatArray.Length * 4];
                Buffer.BlockCopy(floatArray, 0, byteArray, 0, byteArray.Length);

                ws.Send(byteArray);  // バイナリ送信
                elapsedTime = 0.0f;
            }
            //cube.Move(50, -50, 200);
            Movement mv = cubeManager.handles[0].Move2Target(98, 142).Exec();
            if (mv.reached && i)
            {
                Debug.Log("Reached the target position.");
                i = false;
            }

            //back to start
            if (cube.x > 200 && cube.y > 220)
            {
                Movement rst = cubeManager.handles[0].Move2Target(startPos.x, startPos.y).Exec();
                if (rst.reached && i)
                {
                    Debug.Log("back to start position.");
                    i = false;
                }
            }

        }
    }
}