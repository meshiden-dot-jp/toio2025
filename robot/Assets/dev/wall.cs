using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class wall : MonoBehaviour
{
    List<(Vector2Int from, Vector2Int to)> verticalWalls = new()
    {
        // 1列目
        (new Vector2Int(141, 358), new Vector2Int(141, 315)),
        (new Vector2Int(141, 229), new Vector2Int(141, 186)),
        (new Vector2Int(141, 186), new Vector2Int(141, 142)),
        // 2列目
        (new Vector2Int(184, 272), new Vector2Int(184, 229)),
        (new Vector2Int(184, 186), new Vector2Int(184, 142)),
        // 3列目
        (new Vector2Int(227, 358), new Vector2Int(227, 315)),
        (new Vector2Int(227, 315), new Vector2Int(227, 272)),
        // 4列目
        (new Vector2Int(270, 315), new Vector2Int(270, 272)),
        (new Vector2Int(270, 229), new Vector2Int(270, 186)),
        (new Vector2Int(270, 186), new Vector2Int(270, 142)),
        // 5列目
        (new Vector2Int(313, 358), new Vector2Int(313, 315)),
        (new Vector2Int(313, 272), new Vector2Int(313, 229)),
        // 6列目
        (new Vector2Int(356, 315), new Vector2Int(356, 272)),
        (new Vector2Int(356, 229), new Vector2Int(356, 186)),
        (new Vector2Int(356, 186), new Vector2Int(356, 142)),
    };

    List<(Vector2Int from, Vector2Int to)> horizontalWalls = new()
    {
        // 1行目
        (new Vector2Int(141, 315), new Vector2Int(184, 315)),
        (new Vector2Int(270, 315), new Vector2Int(313, 315)),
        // 2行目
        (new Vector2Int( 98, 272), new Vector2Int(141, 272)),
        (new Vector2Int(141, 272), new Vector2Int(184, 272)),
        (new Vector2Int(313, 272), new Vector2Int(356, 272)),
        (new Vector2Int(356, 272), new Vector2Int(402, 272)),
        // 3行目
        (new Vector2Int(227, 229), new Vector2Int(270, 229)),
        // 4行目
        (new Vector2Int(184, 186), new Vector2Int(227, 186)),
        (new Vector2Int(313, 186), new Vector2Int(356, 186)),
    };

    // 壁全部配列にしたほうが汎用性高そう。動的にも処理しやすくなる。
    List<(Vector2Int from, Vector2Int to)> verticalAllWalls = new()
    {
        // 1列目
        (new Vector2Int(141, 358), new Vector2Int(141, 315)),
        (new Vector2Int(141, 315), new Vector2Int(141, 272)),
        (new Vector2Int(141, 272), new Vector2Int(141, 229)),
        (new Vector2Int(141, 229), new Vector2Int(141, 186)),
        (new Vector2Int(141, 186), new Vector2Int(141, 142)),
        // 2列目
        (new Vector2Int(184, 358), new Vector2Int(184, 315)),
        (new Vector2Int(184, 315), new Vector2Int(184, 272)),
        (new Vector2Int(184, 272), new Vector2Int(184, 229)),
        (new Vector2Int(184, 229), new Vector2Int(184, 186)),
        (new Vector2Int(184, 186), new Vector2Int(184, 142)),
        // 3列目
        (new Vector2Int(227, 358), new Vector2Int(227, 315)),
        (new Vector2Int(227, 315), new Vector2Int(227, 272)),
        (new Vector2Int(227, 272), new Vector2Int(227, 229)),
        (new Vector2Int(227, 229), new Vector2Int(227, 186)),
        (new Vector2Int(227, 186), new Vector2Int(227, 142)),
        // 4列目
        (new Vector2Int(270, 358), new Vector2Int(270, 315)),
        (new Vector2Int(270, 315), new Vector2Int(270, 272)),
        (new Vector2Int(270, 272), new Vector2Int(270, 229)),
        (new Vector2Int(270, 229), new Vector2Int(270, 186)),
        (new Vector2Int(270, 186), new Vector2Int(270, 142)),
        // 5列目
        (new Vector2Int(313, 358), new Vector2Int(313, 315)),
        (new Vector2Int(313, 315), new Vector2Int(313, 272)),
        (new Vector2Int(313, 272), new Vector2Int(313, 229)),
        (new Vector2Int(313, 229), new Vector2Int(313, 186)),
        (new Vector2Int(313, 186), new Vector2Int(313, 142)),
        // 6列目
        (new Vector2Int(356, 358), new Vector2Int(356, 315)),
        (new Vector2Int(356, 315), new Vector2Int(356, 272)),
        (new Vector2Int(356, 272), new Vector2Int(356, 229)),
        (new Vector2Int(356, 229), new Vector2Int(356, 186)),
        (new Vector2Int(356, 186), new Vector2Int(356, 142)),
    };

    List<(Vector2Int from, Vector2Int to)> horizontalAllWalls = new()
    {
        // 1行目
        (new Vector2Int( 98, 315), new Vector2Int(141, 315)),
        (new Vector2Int(141, 315), new Vector2Int(184, 315)),
        (new Vector2Int(184, 315), new Vector2Int(227, 315)),
        (new Vector2Int(227, 315), new Vector2Int(270, 315)),
        (new Vector2Int(270, 315), new Vector2Int(313, 315)),
        (new Vector2Int(313, 315), new Vector2Int(356, 315)),
        (new Vector2Int(356, 315), new Vector2Int(402, 315)),
        // 2行目
        (new Vector2Int( 98, 272), new Vector2Int(141, 272)),
        (new Vector2Int(141, 272), new Vector2Int(184, 272)),
        (new Vector2Int(184, 272), new Vector2Int(227, 272)),
        (new Vector2Int(227, 272), new Vector2Int(270, 272)),
        (new Vector2Int(270, 272), new Vector2Int(313, 272)),
        (new Vector2Int(313, 272), new Vector2Int(356, 272)),
        (new Vector2Int(356, 272), new Vector2Int(402, 272)),
        // 3行目
        (new Vector2Int( 98, 229), new Vector2Int(141, 229)),
        (new Vector2Int(141, 229), new Vector2Int(184, 229)),
        (new Vector2Int(184, 229), new Vector2Int(227, 229)),
        (new Vector2Int(227, 229), new Vector2Int(270, 229)),
        (new Vector2Int(270, 229), new Vector2Int(313, 229)),
        (new Vector2Int(313, 229), new Vector2Int(356, 229)),
        (new Vector2Int(356, 229), new Vector2Int(402, 229)),
        // 4行目
        (new Vector2Int( 98, 186), new Vector2Int(141, 186)),
        (new Vector2Int(141, 186), new Vector2Int(184, 186)),
        (new Vector2Int(184, 186), new Vector2Int(227, 186)),
        (new Vector2Int(227, 186), new Vector2Int(270, 186)),
        (new Vector2Int(270, 186), new Vector2Int(313, 186)),
        (new Vector2Int(313, 186), new Vector2Int(356, 186)),
        (new Vector2Int(356, 186), new Vector2Int(402, 186)),
    };

    // Start is called before the first frame update
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {

    }
}
