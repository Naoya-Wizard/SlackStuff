/**
 * SlackのユーザーIDをメールアドレスを利用して取得する関数
 *
 * @param {string} email - Slackユーザーのメールアドレス
 * @return {string} - 対応するSlackユーザーのID
 */
function getSlackUserIdByEmail(email) {
  
  // Slack APIを利用するためのトークン。実際の使用時には、正しいトークンに置き換える必要があります。
  var SLACK_TOKEN = 'YOUR-API-TOKEN';

  // SlackのAPIエンドポイントのURL
  var lookupUrl = 'https://slack.com/api/users.lookupByEmail';

  // APIリクエストのためのオプションを設定
  var lookupOptions = {
    'method': 'post',
    'headers': {
      'Authorization': 'Bearer ' + SLACK_TOKEN, // トークンを用いた認証ヘッダー
      'Content-Type': 'application/x-www-form-urlencoded' // リクエストの内容タイプを指定
    },
    'payload': 'email=' + encodeURIComponent(email)  // メールアドレスをエンコードしてペイロードに設定
  };

  // Slack APIエンドポイントにリクエストを送信し、レスポンスを取得
  var lookupResponse = UrlFetchApp.fetch(lookupUrl, lookupOptions);
  
  // レスポンスの内容をJSONとして解析
  var lookupData = JSON.parse(lookupResponse.getContentText());

  // レスポンスの内容をログに出力
  Logger.log(lookupResponse.getContentText());

  // Slack APIからのレスポンスがエラーの場合、例外を投げる
  if (!lookupData.ok) {
    throw new Error('Error looking up Slack user: ' + lookupData.error);
  }

  // 正常にユーザーIDを取得した場合、そのIDを返す
  return lookupData.user.id;
}
