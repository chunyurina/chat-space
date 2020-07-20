$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html = 
        `<div class="message" data-message-id=${message.id}>
          <div class="messages__top-box">
            <div class="messages__top-box__user">
              ${message.user_name}
            </div>
            <div class="messages__top-box__date">
              ${message.created_at}
            </div>
          </div>
          <div class="messages__comment">
            <p class="message__content">
              ${message.content}
            </p>
            <img class= "message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
        `<div class="message" data-message-id=${message.id}>
            <div class="messages__top-box">
              <div class="messages__top-box__user">
                ${message.user_name}
              </div>
              <div class="messages__top-box__date">
                ${message.created_at}
              </div>
            </div>
            <div class="messages__comment">
              <p class="message__content">
                ${message.content}
              </p>
            </div>
          </div>`
      return html;
    };
  }
  
  $('.form__box').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('form')[0].reset();
      $('.form__box__submit').prop('disabled', false)
    })
    .fail(function(){
      alert('メッセージの送信に失敗しました');
      $('.form__box__submit').prop("disabled", false);
    });
  });
}); 