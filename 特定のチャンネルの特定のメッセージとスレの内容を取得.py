import os
import requests

class SlackMessageFetcher:
    SLACK_TOKEN = os.environ['SLACK_API_REACTIONTRACKER_TOKEN']

    @staticmethod
    def fetch_all_replies(channel_id, timestamp):
        all_messages = []

        while True:
            # Slack APIのURLとパラメータ
            url = "https://slack.com/api/conversations.replies"
            params = {
                'channel': channel_id,
                'ts': timestamp,
                'pretty': 1,
                'inclusive': True
            }

            # HTTPヘッダーの設定
            headers = {
                'Authorization': f'Bearer {SlackMessageFetcher.SLACK_TOKEN}'
            }

            # HTTPリクエストの送信
            response = requests.get(url, headers=headers, params=params)

            # レスポンスの解析
            if response.status_code == 200:
                data = response.json()

                if data['ok']:
                    all_messages.extend(data['messages'])
                    if not data.get('has_more'):
                        break
                    # 次のページのためのタイムスタンプを更新
                    timestamp = data['messages'][-1]['ts']
                else:
                    print(f"Error: {data['error']}")
                    break
            else:
                print(f"HTTP Error: {response.status_code}")
                break

        return all_messages

# メイン処理
if __name__ == "__main__":
    # 例: チャネルIDとタイムスタンプを指定
    channel_id = 'YOUR_CHANNEL_ID'
    timestamp = 'YOUR_TIMESTAMP'
    
    messages = SlackMessageFetcher.fetch_all_replies(channel_id, timestamp)
    print(messages)
    all_messages_text = "\n---\n".join(message['text'] for message in messages)
    print(f"Message text:\n{all_messages_text}")
