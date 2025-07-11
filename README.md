# toio2025 - 対戦迷路ゲームプロジェクト

このプロジェクトは、toio™ を使った 1対1の対戦型迷路ゲームの開発です。見えない壁や不確定な操作、シェイクを活用したダイス機能などを取り入れ、物理的なインタラクションを活かした体験を目指しています。

## プロジェクト概要

- **ジャンル**：迷路脱出・対戦ゲーム
- **プレイ人数**：2人（ターン制）
- **使用ハードウェア**：toio™（キューブ）
- **開発環境**：Unity 2022.3.44f1 LTS + toio SDK

## ゲームアイデア

- 見えない壁のあるフィールドで、ゴール（中央）を目指す。
- サイコロ代わりに toio を振って操作回数を決定。
- 壁に当たるとフィードバック（振動または音）。
- 相手と衝突したら振り出しに戻る？
- 操作はチョロQ方式 or タップ処理で方向と距離を指定。
- ターン外の操作や進みすぎたときはエラーやブレーキ処理。
- 正しい位置に置かれない場合にもエラー検出。

## 環境構築

- `git clone git@github.com:meshiden-dot-jp/toio2025.git`で任意の場所にクローンする
- `Unity ver.2022.3.44f1 LTS`をインストールする
- https://github.com/morikatron/toio-sdk-for-unity/blob/main/docs/download_sdk.md を参照してtoio SDK for Unity をインストールする
- https://github.com/GlitchEnzo/NuGetForUnity/releases/tag/v4.4.0 から`NuGetForUnity.4.4.0.unitypackage`をダウンロードして、Assetsにドラックする
- `NuGet` -> `NuGetManeger`を立ち上げ、検索欄に`websocket sharp netstandard`と入力し、インストールする
- `server`ディレクトリで`npm start`を実行する
- `Unity`でプロジェクトを実行する
- `client`ディレクトリで`npm run dev`を実行する

## ソースコードの編集

- `toio2025`ディレクトリで`git pull`を実行する
- ソースコードを編集する
- `git checkout -b origin (任意の名前)`でブランチを切る
- `git add .`でステージングする
- `git commit -m "（作業内容）"`でコミットメッセージを書く
- `git push origin (任意の名前)`を実行する

## プルリクエストがついていたら

- プルリクエストを確認
- 問題なければ`LGTM`を記入し`main`ブランチにマージする

## ディレクトリ構成（予定）
```
toio2025/
├─ client/ # Webフロントエンド（必要な場合）
├─ server/ # WebSocketサーバなど（Node.jsなど）
├─ robot/ # Unityプロジェクト（toio制御）
│ ├─ Assets/
│ └─ ProjectSettings/
├─ README.md
└─ .gitignore
```

## 開発進捗

### ステップ1：Unity環境の整備
- [x] Unityプロジェクト作成
- [x] toio SDK 導入
- [x] 実機接続テスト
- [x] シミュレータ確認

### ステップ2：1人プレイヤー版（基礎）
- [x] 座標の認識
- [x] 5*7 グリッドの迷路
- [x] 壁の座標検知＆出力
- [x] toioの移動と制限処理

### ステップ3：2プレイヤー版（基本）
- [ ] 対戦ルールの追加
- [ ] ターン制処理
- [ ] 衝突処理・ふりだし処理
- [ ] フィードバック（振動/音）

### ステップ4：拡張機能（余裕があれば）
- [ ] 壁の自動生成パターン
- [ ] サイコロモーションの判定（シェイクセンサー）
- [ ] 音声フィードバックの強化
- [ ] 難易度調整オプション（マス数など）

## 関連リンク

| タイトル | URL |
|---------|-----|
| 技術仕様 | https://toio.github.io/toio-spec/docs/ble_high_precision_tilt_sensor/ |
| toio SDK for Unity | https://morikatron.com/t4u/ |
| Unity 推奨バージョン | https://unity.com/releases/editor/archive |
| 実機との接続方法 | https://qiita.com/Teach/items/7bfd47060da4d4aab852 |
| toio簡単接続 | https://toio.io/do/connect/ |
| Zadig（Bluetooth） | https://zadig.akeo.ie/#google_vignette |
| Git for Windows | https://gitforwindows.org/ |
| UniTask | https://github.com/Cysharp/UniTask.git?path=src/UniTask/Assets/Plugins/UniTask |
| Position ID 一覧 | https://toio.github.io/toio-spec/docs/hardware_position_id/ |
| 勇者用紙 | https://toio.io/blog/img/dungeon_yusha.pdf |
| YT-Websocket(b2s) | https://youtu.be/13HnJPstnDM?si=CD8Q8BcD24aP92bi|
| YT-Websocket(s2c) | https://youtu.be/dSllP4TRJls?si=LU-OIeABzjTeSnwa|
| FigJam | https://www.figma.com/board/YCiYz0lZdrbkJHFZu2bzKO/toio?node-id=0-1&t=yXRAdM9hlhgMKvSG-1 |
| 発表スライド | https://docs.google.com/presentation/d/1z3gPs3PFOygyzIpvb_uftH4R1i8mLMdtUQya2otLKoI/edit?usp=sharing |

## 開発チーム向け Tips

- `.gitignore` を適切に設定し、`Library/`, `Temp/`, `.next/`, `node_modules/` などは除外すること。
- GitHub プロジェクトにマージルールを設定して、プルリクエストベースの運用を推奨。
- サードパーティとの Bluetooth 接続には Zadig の導入が必要になる場合があります。

## ライセンス

このプロジェクトは教育目的で運用されています。商用利用・転載は事前にご連絡ください。
