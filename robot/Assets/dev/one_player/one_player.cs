using WebSocketSharp;
using System;
using System.Collections.Generic;
using toio;
using toio.Simulator;
using UnityEngine;


public class test_1_cs : MonoBehaviour
{
    WebSocket ws;
    public ConnectType connectType;
    CubeManager cubeManager;
    Cube cube;
    bool s = true, g = false, gs= true; // s: start, g: goal, gs: goal sound
    //float intervalTime = 0.2f;
    //float elapsedTime = 0;
    int collision_count = 0;
    Vector2 startPos = new Vector2(120, 336); // Start position for the cube
    Vector2 goalPos = new Vector2(356, 180); // Target position for the cube
    Vector2 cubePos; // Another target position for the cube
    bool isColliding;

    /*List<Vector3> walls = new List<Vector3>()
    {
        new Vector3(98, 272, 1),
        new Vector3(141, 315, 0)
    };*/


    bool Collision(Vector2 nowPos)
    {
        for (int i = 0; i < WallData.walls.Count; i++)
        {
            Vector3 wall = WallData.walls[i];
            if (wall.z == 1)//hoizontal
            {
                if (nowPos.x >= wall.x && nowPos.x <= wall.x + 43 && nowPos.y >= wall.y-5 && nowPos.y <= wall.y + 5)
                {
                    Debug.Log("Collision with wall at: " + wall);
                    return true;
                }
            }
            else if (wall.z == 0)//vertical
            {
                if (nowPos.x >= wall.x-5 && nowPos.x <= wall.x + 5 && nowPos.y <= wall.y && nowPos.y >= wall.y - 43)
                {
                    Debug.Log("Collision with wall at: " + wall);
                    return true;
                }
            }
        }
        return false;
    }


    //Goal sound for good score(=low collision count)
    void fanfare(Cube c)
	{
		 List<Cube.SoundOperation> sound = new List<Cube.SoundOperation>();
        sound.Add(new Cube.SoundOperation(durationMs:100, volume:15, note_number:65));
        sound.Add(new Cube.SoundOperation(durationMs:30, volume:15, note_number:Cube.NOTE_NUMBER.NO_SOUND));  
        sound.Add(new Cube.SoundOperation(durationMs:100, volume:15, note_number:65));
        sound.Add(new Cube.SoundOperation(durationMs:30, volume:15, note_number:Cube.NOTE_NUMBER.NO_SOUND));            
        sound.Add(new Cube.SoundOperation(durationMs:100, volume:15, note_number:65));
        sound.Add(new Cube.SoundOperation(durationMs:30, volume:15, note_number:Cube.NOTE_NUMBER.NO_SOUND));      
        sound.Add(new Cube.SoundOperation(durationMs:100, volume:15, note_number:65));  
        sound.Add(new Cube.SoundOperation(durationMs:170, volume:15, note_number:Cube.NOTE_NUMBER.NO_SOUND));
        sound.Add(new Cube.SoundOperation(durationMs:100, volume:15, note_number:63));
        sound.Add(new Cube.SoundOperation(durationMs:130, volume:15, note_number:Cube.NOTE_NUMBER.NO_SOUND));  
        sound.Add(new Cube.SoundOperation(durationMs:100, volume:15, note_number:67));
        sound.Add(new Cube.SoundOperation(durationMs:130, volume:15, note_number:Cube.NOTE_NUMBER.NO_SOUND));            
        sound.Add(new Cube.SoundOperation(durationMs:300, volume:15, note_number:65));
  
            // 楽譜を再生
        c.PlaySound(1, sound.ToArray());
	}


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
    }

    void Update()
    {
        Console.WriteLine("Update called");

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
            // Debug.Log("x : " + cube.x + ", y : " + cube.y + ", angle : " + cube.angle);
            float[] floatArray = new float[] { cube.x, cube.y, cube.angle, cube.battery,cube.isPressed? 1 : 0 };

            // float[] → byte[] に変換（1 float = 4 bytes）
            byte[] byteArray = new byte[floatArray.Length * 4];
            Buffer.BlockCopy(floatArray, 0, byteArray, 0, byteArray.Length);

            ws.Send(byteArray);  // バイナリ送信

            //start
            if (s)
            {
                Movement st = cubeManager.handles[0].Move2Target(startPos.x, startPos.y).Exec();
                if (st.reached)
                {
                    Movement rt = cubeManager.handles[0].Rotate2Deg(-90).Exec();
                    if (rt.reached)
                    {
                        Debug.Log("Start position: " + startPos);
                        cube.PlayPresetSound(8);
                        s = false;
                    }
                }
            }
            //goal
            else if (g)
            {
                //goal sound (once)
                if (gs)
                {
                    Debug.Log("GOAL");
                    fanfare(cube);
                    gs = false;
                }
            }
            //playing
            else
            {
                cubePos = new Vector2(cube.x, cube.y);
                isColliding = Collision(cubePos);
                //collision detection
                if (isColliding)
                {
                    collision_count++;
                    //collision sound
                    if (collision_count % 20 == 0)
                    {
                        cube.PlayPresetSound(0);
                    }
                }
                //goal detection
                else if (cubePos.x >= goalPos.x && cubePos.y <= goalPos.y)
                {
                    g = true;
                }
            }
        }
    }
}

