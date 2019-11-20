json.(@message, :content, :image)
json.date @message.created_at.strftime("%Y年%m月%d日 %H時%M分")
json.user_name @message.user.name
#idもデータとして渡す
json.id @message.id