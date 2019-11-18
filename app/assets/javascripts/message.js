$(function(){ 
  function buildHTML(message){
    
    var html =
    `<div class="message" data-message-id=${message.id}>
        <div class="message__upper-info">
          <div class="message__upper-info__talker">
            ${message.user_name}
          </div>
          <div class="message__upper-info__date">
            ${message.date}
          </div>
        </div>
        <div class="lower-message">
          <p class="lower-message__text">
            ${message.content}
          </p>
        </div>
        <script>
          var image = message.image ? <img /> : "";
        </script>
      </div>`
    return html;
 }
$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    var html = buildHTML(data);
    $('.messages').append(html);
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    $('form')[0].reset();
  })
  .fail(function(){
     alert("メッセージ送信に失敗しました");
   })
   .always(function(){
     $('.submit-btn').prop('disabled', false);
   })
   return false;
 });
});