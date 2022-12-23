/*========================================
    サイトの公開、タイトル、faviconのセット
========================================*/
function doGet() {
  htmlOutput = retHtmlPage();
  return htmlOutput;
}

/*========================================
        各処理を行いhtmlページを返す
========================================*/
function doPost(e){
  htmlOutput = taskMain(e);
  return htmlOutput;
}

/*========================================
              表出力処理
========================================*/
function outputSheet(){	
  var sh = getSheetData("sh");
  // 出力前に並び替える
  sh.getSheets()[0].sort(3);  // 名前順
  sh.getSheets()[0].sort(4);  // 名前順
  sh.getSheets()[0].sort(1);  // ホール順
  var data = getSheetData("data");
  var result; // 出力HTML

  // --- 編集
  result = '<form action=【"GASで作成したサイトのURL"】 method="post">'
          +   '<input type="hidden" name="inType" value="3">'
          +   '<table id="editTable">'
          +     '<tr>'
          +       '<td>'
          +         '<select name="editCircleNo">';
  for (var i=1; i<data.length; i++){
    result  +=      '<option value="' + (i+1) + '">' + data[i][6].toString() + '</option>';
  }
  result  +=      '</td>'
          +       '<td><input type="checkbox" name="isMemo"></td>'
          +       '<td><input type="text" placeholder="メモ" name="editMemo"></td>'
          +       '<td><input type="checkbox" name="isItem"></td>'
          +       '<td><input type="text" placeholder="買うもの" name="editItem"></td>'
          +       '<td><input type="checkbox" name="isPrice"></td>'
          +       '<td><input type="text" placeholder="金額" name="editPrice"></td>'
          +       '<td><input type="submit" value="編集"></td>'
          +     '</tr>'
          +   '</table>'
          +'</form>';

  // --- リスト出力
  result +=   '<table id="circleList">';
/*
  result +=         '<th id="day">日程</th><th id="dow">曜日</th><th id="hole">ホール</th><th id="symbol">記号</th><th id="no">番号</th><th id="aorb">AorB</th>'
            +       '<th id="circleName">サークル名</th><th id="circleMaster">サークル主</th>'
            +       '<th id="twtid">TwitterID</th><th id="memo">メモ</th><th id="item">買うもの</th><th id="price">金額</th>'
            +       '<th id="delete">削除<br></th><th id="">未/済</th>';
*/
  result +=         '<th id="day">日程</th><th id="dow">曜日</th><th id="hole">ホール</th><th id="symbol">記号</th><th id="no">番号</th><th id="aorb">AorB</th>'
          +       '<th id="circleName">サークル名</th><th id="circleMaster">サークル主</th>'
          +       '<th id="twtid">TwitterID</th><th id="memo">メモ</th><th id="item">買うもの</th><th id="price">金額</th>'
          +       '<th id="delete">削除<br></th>';
  for(var i=1; i<data.length; i++){
/*
    isComp = data[i][12].toString();
    if (isComp == "true"){
      result +=       '<tr class="comp">'; //style="background-color: blue"
    }else{
      result +=       '<tr>';
    }
*/
    result +=       '<tr>';
    for(var j=0; j<12; j++){
      if(j == 8){
        result +=     "<td id='outdata'>" + "<a href='https://twitter.com/" + data[i][j].toString() +  "'" + "target='_blank'>" + "@" + data[i][j].toString() + "</a></td>";
      }else{
        result +=     "<td id='outdata'>" + data[i][j].toString() + "</td>";
      }
    }
    result +=           '<td>'
                      +   '<form action=【"GASで作成したサイトのURL"】 method="post">'
                      +     '<input type="hidden" name="inType" value="2"><input type="hidden" name="deleteNo" value="' + (i+1) + '">'
                      +     '<input type="submit" value="削除">'
                      +   '</form>'
                      + '</td>';
/*
    result +=           '<td>'
                      +   '<form action=【"GASで作成したサイトのURL"】 method="post">'
                      +     '<input type="hidden" name="inType" value="4">'+(i+1) + data[i][12].toString() +'<input type="hidden" name="compNo" value="' + (i+1) + '">'
                      +     '<input type="submit" value="未/済">'
                      +   '</form>'
                      + '</td>';
*/
    result +=        '</tr>';
  }
  result +=       '</table>';

  return result;
}



