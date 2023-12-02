from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError
import os

def fetch_slack_message_and_thread(channel_id, message_ts):
    """
    Slackの特定のチャンネルから特定のメッセージとそれに続くスレッドの内容を取得する関数

    :param channel_id: チャンネルのID
    :param message_ts: スレッドの親メッセージのタイムスタンプ
    :return: 親メッセージとスレッド内の全てのメッセージのリスト
    """
    # SlackのAPIトークンを環境変数から取得
    slack_token = os.getenv("SLACK_API_TOKEN")
    client = WebClient(token=slack_token)

    try:
        # スレッドのメッセージを取得
        result = client.conversations_replies(
            channel=channel_id,
            ts=message_ts
        )

        messages = result["messages"]
        return messages

    except SlackApiError as e:
        print(f"Error fetching message and thread: {e}")
        return []

# 使用例
# SLACK_API_TOKEN環境変数にAPIトークンを設定してください。
# channel_idとmessage_tsを適宜変更してください。
messages = fetch_slack_message_and_thread("YOUR_CHANNEL_ID", "YOUR_MESSAGE_TS")
for message in messages:
    print(message)
