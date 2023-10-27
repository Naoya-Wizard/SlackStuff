# SlackStuff

function getSlackUserIdByEmail(email) {
  var SLACK_TOKEN = ''; // Slack OAuth Tokenを設定

  // メールアドレスを使用してユーザーIDを取得
  var lookupUrl = 'https://slack.com/api/users.lookupByEmail';
  
  var lookupOptions = {
    'method': 'post',
    'headers': {
      'Authorization': 'Bearer ' + SLACK_TOKEN,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    'payload': 'email=' + encodeURIComponent(email)
  };

  var lookupResponse = UrlFetchApp.fetch(lookupUrl, lookupOptions);
  var lookupData = JSON.parse(lookupResponse.getContentText());
Logger.log(lookupResponse.getContentText());  // ここでレスポンス全体をログに出力
//var lookupData = JSON.parse(lookupResponse.getContentText());
  if (!lookupData.ok) {
    throw new Error('Error looking up Slack user: ' + lookupData.error);
  }

  return lookupData.user.id;
}

function test() {
  var email = ''; // IDを取得したいユーザーのメールアドレス
  var userId = getSlackUserIdByEmail(email);
  Logger.log(userId);
}
