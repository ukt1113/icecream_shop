//モデル：アイスクリーム一覧
var icecreamModel = {
	list: [
		{id:'t1', name:"バニラ"},
		{id:'t2', name:"チョコレートチップ"},
		{id:'t3', name:"オレンジチョコレート"},
		{id:'t4', name:"チョコミント"},
		{id:'t5', name:"ストロベリー"},
		{id:'t6', name:"抹茶"}
	],

	//アイスクリーム一覧をかえすメソッド
	getAll: function() {
		return this.list;
	},

	//IDで指定したアイスクリームオブジェクトを返す
	findById: function(icecream_id) {
		return $.grep(this.list,function(val){
			return icecream_id == val.id;
		})[0];
	}
};

//モデル：選択されているアイスクリームの管理
var selectionModel = {
	//選択されているアイスクリームが入る
	list:[{id:'t6', name:"抹茶"}],

	//アイスクリームの個数
	icecreamNumber:3,

	//アイスクリームを追加する
	add:function (item) {
		var list = this.list;
		list.push(item);
		if (list.length > this.icecreamNumber) {
			list.shift();//0番目を捨てる
		}
		this.updateView();
	},

	//指定したアイスクリームが選択されていればtrueが返る
	contain: function(icecream) {
		return this.list.indexOf(icecream) >= 0;
	},

	//IDで指定したアイスクリームが選択されていればtrueが返る
	containById: function(icecream_index) {
		return this.contain(icecreamModel.findById(icecream_index));
	},

	//選択されているアイスクリームを返す
	getIcecreams: function(){
		return this.list;
	},
	
	//選択されているアイスクリームをリセットする
	clear: function() {
		this.list = [];
		this.updateView();
	},

	//ビューを更新する
	updateView: function() {
		updateSelection();
		updateIcecreamList();
	}

};

//ビュー：チェックボックスを更新するビュー
function updateSelection() {
	$('#icecreams input[type="checkbox"]').each(function(i, elm){
		elm.checked = selectionModel.containById(elm.name);
	})
}
//ビュー；選択順序を更新するビュー
function updateIcecreamList() {
	//選択されたアイスクリーム一覧から
	//アイスクリーム名を集めて'>'で連結し表示する
	$('#icecream-list').text(
		$.map(selectionModel.getIcecreams(), function(val){
			return val.name;
		}).join(">")
	);
}

//コントローラ：GUIのイベントからモデルの処理に変換
function onclickIcecream(event){
	var checkbox = $(event.currentTarget).find("input[type='checkbox']");
	//モデルに選択されたアイスクリームを追加して選択された選択順序を更新する
	if(checkbox){
		selectionModel.add(
			icecreamModel.findById(checkbox.attr("name")));
	}
}

//初期状態の作成
$(function() {
	var els = $('#icecreams');
	$.each(icecreamModel.getAll(),function(index,val){
		els.append(
			$("<li>")
				.append($("<input type='checkbox'>").attr('name', val.id))
				.append($('<span>').text(val.name))
				.click(function(event){
					onclickIcecream(event);
				})
		);	
	});
	$('#clear')
		.append($("<input type='button'>").attr('value', 'クリア'))
		.click(function(event) {
			selectionModel.clear();
		});
	selectionModel.updateView();
});

//テスト用のalert
function ok(title, value, expect) {
	if(expect === value) {
		alert("OK : " + title);
	} else {
		alert("NG : " + title + "結果[" + value + "]" + "　想定[" + expect + "]");
	}
}

//テスト：モデルのテスト
//function testModels() {
//	var all = icecreamModel.getAll();

	//初期状態のチェック
//	ok("icecreamModel:個数",all.length,6);
//	ok("icecreamModel.findById",icecreamModel.findById("t4"),all[3]);

//	ok("selectionModel:最初の個数", selectionModel.getIcecreams().length,0);
//	ok("selectionModel:空の場合", selectionModel.contain(all[0]),false);

	//一つ目のアイスを選択した際のチェック
//	selectionModel.add(all[0]);
//	ok("一つ目を追加した時の個数", selectionModel.getIcecreams().length,1);
//	ok("一つ目を追加した時のチェック",selectionModel.contain(all[0]),true);

	//二つ目のアイスを選択した際のチェック
//	selectionModel.add(all[3]);
//	ok("二つ目を追加した時の個数", selectionModel.getIcecreams().length,2);
//	ok("二つ目を追加した時のチェック",selectionModel.contain(all[3]),true);

	//三つ目のアイスを選択した際のチェック
//	selectionModel.add(all[1]);
//	ok("三つ目を追加した時の個数", selectionModel.getIcecreams().length,2);
//	ok("三つ目を追加した時のチェック（追加分が存在するか）",selectionModel.contain(all[1]),true);
//	ok("三つ目を追加した時のチェック（一つ目が存在しないか）",selectionModel.contain(all[0]),false);	
//}

//window.onload = testModels();