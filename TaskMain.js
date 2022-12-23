/*========================================
              処理分け用定数
========================================*/
const FUNC_REG = 1;   // 登録
const FUNC_DEL = 2;   // 削除
const FUNC_EDI = 3;   // 編集
const FUNC_COMP = 4;   // 完了/未完了

/*========================================
              タスク別処理
========================================*/
function taskMain(e){
    // --- 処理分け番号取得
    var inType = Number(e.parameters.inType);
  
    var sh = getSheetData("sh");
    var data = getSheetData("data");
  
    // --- 処理分岐
    switch(inType){
      case FUNC_REG:  // --- スプシに登録
        registerData(e,sh,data);
        break;
      case FUNC_EDI:  // --- 編集
        editData(e,sh);
        break;
      case FUNC_DEL:  // --- 削除
        deleteData(e,sh);
        break;
      case FUNC_COMP:  // --- 完了/未完了の入れ替え
        compData(e,sh,data);
        break;
    }
  
    //送信後に返されるページ
    htmlOutput = retHtmlPage();
    return htmlOutput;
  }