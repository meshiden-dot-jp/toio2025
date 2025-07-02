using System.Collections.Generic;
using UnityEngine;


//new Vector2(x, y, 0:vertical 1:horizontal)


public static class WallData
{
	public static List<Vector3> walls = new List<Vector3>()
	{
		//vertical
		// 1列目
		new Vector3(141, 358, 0),
		new Vector3(141, 229, 0),
		new Vector3(141, 186, 0),
		// 2列目
		new Vector3(184, 272, 0),
		new Vector3(184, 186, 0), 
		// 3列目
		new Vector3(227, 358, 0),
		new Vector3(227, 315, 0),
		// 4列目
		new Vector3(270, 315, 0),
		new Vector3(270, 229, 0),
		new Vector3(270, 186, 0),
		// 5列目
		new Vector3(313, 358, 0),
		new Vector3(313, 272, 0),
		// 6列目
		new Vector3(356, 315, 0),
		new Vector3(356, 229, 0),
		new Vector3(356, 186, 0),
		
		//horizontal
		// 1行目
		new Vector3(141, 315, 1),
		new Vector3(270, 315, 1),
		// 2行目
		new Vector3( 98, 272, 1),
		new Vector3(141, 272, 1),
		new Vector3(313, 272, 1),
		new Vector3(356, 272, 1),
		// 3行目
		new Vector3(227, 229, 1),
		// 4行目
		new Vector3(184, 186, 1),
		new Vector3(313, 186, 1)
	};
}