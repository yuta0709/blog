---
title: "ModelSim(GUI)を使わないVHDL開発環境"
date: "2022-12-23"
---

## はじめに

ModelSim の GUI を使わずに

1. VHDL を記述
1. コンパイル
1. シミュレーション実行
1. シミュレーション結果の波形を確認

する方法を調べてみました。

## インストールするもの

- VSCode 拡張機能
  - [VHDL LS](https://marketplace.visualstudio.com/items?itemName=hbohlin.vhdl-ls "VHDL LS")  
    VHDL の Language Server です。
  - [Wave Trace](https://marketplace.visualstudio.com/items?itemName=wavetrace.wavetrace "Wave Trace")  
    シミュレーション結果の波形を確認するための波形ビューアです。
  - ModelSim

## 手順

以下のリポジトリのプロジェクトを例に進めます。  
[vhdl-sample](https://github.com/yuta0709/vhdl-sample "vhdl-sample")  
まずは手元に clone してください

```
git clone https://github.com/yuta0709/vhdl-sample.git
cd vhdl-sample
```

### ライブラリの作成

```
vlib work
```

でライブラリを作成します。`vlib <ライブラリ名>`の形式です。ModelSim のデフォルトのライブラリ名が work なのでそれを採用しました。

### コンパイル

```
vcom dff.vhd test_dff.vhd
```

でコンパイルします。vcom に渡す引数の順番通りにコンパイルされます。オプションとして`-l <ファイル名>`とすることでログをファイルに出力できます。

### シミュレーション実行

コンパイルが正常に終了してから

```
vsim -c -do vsim.do work.testbench
```

を実行すると、wave.vcd というファイルが生成されます。これがシミュレーション結果の波形が記録されたファイルです。
vsim コマンドの主要なオプションは以下のようになっています。

- `-c`　　
  GUI 無しでシミュレーションを実行
- `-do <ファイル名>`
  指定したファイルのスクリプトを実行

ここで、vsim.do は以下のようになっています。

```
vcd file wave.vcd
vcd add -r /*
run 100 ns
quit -f
```

1 行目から順に、

```
vcd file wave.vcd
```

シミュレーション波形のデータを wave.vcd という名前のファイルに保存するということを設定しています。

```
vcd add -r /*
```

vcd ファイルに記録する信号を指定しています。オプションの`-r`で信号の選択を再帰的に行うことを指定しています。`-r`をつけると testbench が使用しているコンポーネントの内部信号まで遡って記録されますが、つけないと testbench の内部信号のみ記録されます。　　
詳しいことは[ModelSim Command Reference Manual](https://www.microsemi.com/document-portal/doc_view/136364-modelsim-me-10-4c-command-reference-manual-for-libero-soc-v11-7 "ModelSim Command Reference Manual")282 ページに記載されています。

```
run 100 ns
```

100ns のシミュレーションを行います。

```
quit -f
```

シミュレーションを終了します。`-f`は確認を求めずに終了することを意味します。このタイミングでシミュレーション結果が vcd ファイルに書き出されます。

こんな感じで Makefile を書けばもっと簡単にコンパイルやシミュレーションが実行できます。

```
compile:
    vcom dff.vhd test_dff.vhd
simulate:
    make compile
    vsim -c -do vsim.do work.testbench
```

### 波形の確認

VSCode で生成された`wave.vcd`を開くと次のように表示されます。
![](https://user-images.githubusercontent.com/58354812/209172224-a1773e31-fd4c-4d51-83a6-fe4404cd2bfd.png)
Add Signals をクリックして
![](https://user-images.githubusercontent.com/58354812/209172593-1518d0f4-9e89-4feb-918d-238e0291ad3d.png)
見たい信号をダブルクリックして追加して
![](https://user-images.githubusercontent.com/58354812/209172687-99a2f340-c5b1-4a47-b2b6-c138e07b5fba.png)
サイズを調整
![](https://user-images.githubusercontent.com/58354812/209172887-2b7d9270-14f6-4564-bbce-7c67aa57728c.png)

以上が ModelSim の GUI をできるだけ使わずに VHDL を開発する手順です。

## まとめ

VSCode と VSCode のターミナルだけで完結するようになってかなり快適になりました。

よき VHDL Life を
