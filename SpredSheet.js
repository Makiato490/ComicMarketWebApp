/*========================================
            スプシのデータ取得
========================================*/
function getSheetData(type){
  var url =【"スプレッドシートのURL"】;
  var sh = SpreadsheetApp.openByUrl(url);
  var data = sh.getDataRange().getValues();

  if(type == "sh"){
    return sh;
  }

  if(type == "data"){
    return data;
  }
}

/*========================================
                データ登録
========================================*/
function registerData(e,sh,data){
  // --- サークル名重複チェック用
  var isOnlyCircleName = true;
  // --- フォームに入力されたデータを取得
  var inDay = String(e.parameters.inDay);
  var inDow = String(e.parameters.inDow);
  var inHole = String(e.parameters.inHole);
  var inSymbol = String(e.parameters.inSymbol);
  var inNo = String(e.parameters.inNo);
  var inAorB = String(e.parameters.inAorB);
  var inCircleName = String(e.parameters.inCircleName);
  var inCircleMaster = String(e.parameters.inCircleMaster);
  var inTwtId = String(e.parameters.inTwtId);
  var inMemo = String(e.parameters.inMemo);
  var inItem = String(e.parameters.inItem);
  var inPrice = String(e.parameters.inPrice);
  var isComp = "false";

  // --- 重複チェック
  for(var i=1; i<data.length; i++){
    if(inCircleName == data[i][6].toString())
      isOnlyCircleName = false;
  }

  // --- 重複してなくてサークル名が空白じゃなければ登録
  if(isOnlyCircleName && inCircleName != ""){
    var array = [inDay,inDow,inHole,inSymbol,inNo,inAorB,inCircleName,inCircleMaster,inTwtId,inMemo,inItem,inPrice,isComp];
    sh.appendRow(array);
  }
}

/*========================================
                データ編集
========================================*/
function editData(e,sh){
  var editCircleNo = Number(e.parameters.editCircleNo); // 編集するスプレッドシート上の行番号
  var isMemo = Boolean(e.parameters.isMemo);            // 「メモ」の編集の有効無効
  var editMemo = String(e.parameters.editMemo);         // 「メモ」の編集内容
  var isItem = Boolean(e.parameters.isItem);            // 「買うもの」の編集の有効無効
  var editItem = String(e.parameters.editItem);         // 「買うもの」の編集内容
  var isPrice = Boolean(e.parameters.isPrice);          // 「金額」の編集有効無効
  var editPrice = String(e.parameters.editPrice);       // 「金額」の編集内容

  // 「メモ」の編集が有効なら「メモ」を編集
  if (isMemo == true){
    var memoRange = "j" + editCircleNo;
    sh.getRange(memoRange).setValue(editMemo);
  }

  // 「買うもの」の編集が有効なら「買うもの」を編集
  if (isItem == true){
    var itemRange = "K" + editCircleNo;
    sh.getRange(itemRange).setValue(editItem);
  }

  // 「金額」の編集が有効なら「金額」を編集
  if (isPrice == true){
    var priceRange = "L" + editCircleNo;
    sh.getRange(priceRange).setValue(editPrice);
  }
}

/*========================================
                データ削除
========================================*/
function deleteData(e,sh) {
  var deleteNo = Number(e.parameters.deleteNo);
  sh.deleteRow(deleteNo);
}

/*========================================
                完了未完了
========================================*/
/*
function compData(e,sh,data) {
  var compNo = Number(e.parameters.compNo);
  isComp = data[compNo][12].toString();

  var retCompData = "false";

  var place = "M" + compNo;

  if (isComp == "false"){
    retCompData = "true";
  }else if (isComp == "true"){
    retCompData = "false";
  } else{
    retCompData = "true";
  }

  sh.getRange(place).setValue("");

  sh.getRange(place).setValue(retCompData);
}
*/

