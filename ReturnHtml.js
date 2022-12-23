/*========================================
              htmlページを返す
========================================*/
function retHtmlPage(){
  const htmlOutput = HtmlService.createTemplateFromFile("index").evaluate();
  htmlOutput
    .setTitle('サークルまとめ ver:C.100.1')
    .setFaviconUrl(【'faviconのURL'】)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
  return htmlOutput;
}