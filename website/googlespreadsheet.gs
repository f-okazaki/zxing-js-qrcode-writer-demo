function doGet(e) {
  //Logger.log(e);
  let param = "k";
  if (e != null && e.parameter != undefined && e.parameter.param != undefined) {
    param = e.parameter.param;
  }

  const data = getSpreadsheetData(param);
  const response = ContentService.createTextOutput();
  response.setMimeType(ContentService.MimeType.JSON);
  response.setContent(JSON.stringify(data));

  Logger.log(data);

  return response;

}

function getSpreadsheetData(param) {
  //const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const spreadsheet = SpreadsheetApp.openById("1deUYoJ5vgEZNEETbQqvbudyhIoxr6wP4kdCqhZpiB2M");
  const sheet = spreadsheet.getSheetByName('シート1');
  const dataRange = sheet.getRange('A2:M42');
  const dataValues = dataRange.getValues();
  Logger.log(dataValues[0][0]);

  let data2 = [];

  for (let i = 1; i < dataValues.length; i++) {
    if (param == "f") {
      if (dataValues[i][0] == "普通自動車") {
        data2.push({
          // 
          ft_2_2: dataValues[i][1], // 登録番号
          ft_3_7: dataValues[i][2], // 初度登録年月
          ft_3_3: dataValues[i][3]+dataValues[4],//　型式指定番号・類別区分番号
          ft_text: "【" + dataValues[i][0] + "】" + dataValues[i][2] + "(" + dataValues[i][8] + ")" + dataValues[i][11] + "：" + dataValues[i][12],
        });
      }
    } else if (param == "k") {
      if (dataValues[i][0] == "軽自動車") {
        data2.push({
          // 
          kei_2_3: dataValues[i][2], // 登録番号
          kei_3_6: dataValues[i][8], // 初度登録年月
          kei_3_4: dataValues[i][9],//　型式指定番号・類別区分番号
          kei_text: "【" + dataValues[i][0] + "】" + dataValues[i][2] + "(" + dataValues[i][8] + ")" + dataValues[i][11] + "：" + dataValues[i][12],
        });
      }
    }
  }
  Logger.log(data2);
  return data2;
}



