/**
 * Slackの特定のチャンネルにユーザーを招待する関数
 *
 * @param {string} channelId - 招待するSlackチャンネルのID
 * @param {Array<string>} userIds - 招待したいユーザーのIDのリスト
 */
function inviteUsersToSlackChannel(channelId, userIds) {
  
  // Slack APIを利用するためのトークン。実際の使用時には、正しいトークンに置き換える必要があります。
  var slackApiToken = 'YOUR-API-TOKEN';
  
  // Slack APIの招待エンドポイントのURL
  var apiUrl = 'https://slack.com/api/conversations.invite';

  // APIリクエストのためのペイロードを設定
  var payload = {
    'channel': channelId,
    'users': userIds.join(',')
  };

  // HTTPリクエストのオプションを設定
  var options = {
    'method': 'post',
    'headers': {
      'Authorization': 'Bearer ' + slackApiToken, // トークンを用いた認証ヘッダー
      'Content-Type': 'application/json; charset=UTF-8' // リクエストの内容タイプを指定
    },
    'payload': JSON.stringify(payload),  // JSON形式でペイロードを送信
    'muteHttpExceptions': true  // HTTP例外をミュートに設定
  };

  // Slack APIエンドポイントにリクエストを送信し、レスポンスを取得
  var response = UrlFetchApp.fetch(apiUrl, options);
  
  // レスポンスの内容をJSONとして解析
  var jsonResponse = JSON.parse(response.getContentText());

  // レスポンスの状態に応じてログにメッセージを記録
  if (jsonResponse.ok) {
    Logger.log('ユーザーが正常に招待されました。');
  } else {
    Logger.log('エラー: ' + jsonResponse.error);
  }
}
