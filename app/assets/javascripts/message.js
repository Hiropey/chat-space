$(function(){ 

  function buildHTML(message) {
    var img = (message.image.url ? message.image.url : '')
    var html =
      `<div class="message" data-id="${message.id}">
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
        <img src=${img}>
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

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
    last_message_id = $(".message:last").data("id");
    $.ajax({
      url : "api/messages",
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message) {
        insertHTML = buildHTML(message);
        $('.messages').append(insertHTML);
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })
    })
    .fail(function() {
      alert("Error");
    });
    }
  }
  setInterval(reloadMessages, 7000);
});

