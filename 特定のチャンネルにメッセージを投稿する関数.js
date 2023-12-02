/**
 * Slackの特定のチャンネルにメッセージを投稿する関数
 *
 * @param {string} channelid - 投稿先のSlackチャンネルID
 * @param {string} username - メッセージを投稿する際のユーザー名
 * @param {string} message - 投稿するメッセージの内容
 * @param {string} ts - スレッドのタイムスタンプ (オプション。スレッドへの返信の場合に指定)
 * @return {Object} - Slack APIのレスポンス内容
 */
function slackPost(channelid, username, message, ts){

  // Slack APIを利用するためのトークン。実際の使用時には、正しいトークンに置き換える必要があります。
  const SLACK_ACCESS_TOKEN = 'YOUR-API-TOKEN';

  // Slackのchat.postMessage APIエンドポイントに対してリクエストを実行
  var response = UrlFetchApp.fetch('https://slack.com/api/chat.postMessage', {
		method: 'post',  // HTTPメソッドをPOSTとして指定
		payload: {       // APIリクエストのペイロード
			token: SLACK_ACCESS_TOKEN,   // SlackのAPIトークン
			channel: channelid,          // 投稿先のチャンネルID
			username: username,          // メッセージの投稿者名
			text: message,               // 投稿するメッセージ内容
            thread_ts: ts               // スレッドのタイムスタンプ（指定された場合）
		}
	});
  
  // レスポンスの内容をJSONとして解析
  var parsedResult = JSON.parse(response.getContentText());

  // 解析されたレスポンス内容を返す
  return parsedResult;
}
