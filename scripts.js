
function IdeaObj(id,ideaTitle,ideaBody) {
  this.id = id
  this.title = ideaTitle
  this.body = ideaBody
  this.quality = 'swill'
}

function newIdea(ideaObj) {
$('.idea-card-container').prepend(
  `<div class="idea-card" id="${ideaObj.id}">
    <div class="card-title-box">
      <h1 class="card-title">${ideaObj.title}</h1>
      <button class="delete-btn" type="button" name="button"><img class="quality-image" src="./images/delete.svg" alt="delete button"></img></button>
    </div>
    <p class="card-body">${ideaObj.body}</p>
    <div class="quality-box">
      <button class="quality-btns up-vote" type="button" name="button"><img class="quality-image" src="./images/upvote.svg" alt="up vote button"></button>
      <button class="quality-btns down-vote" type="button" name="button"><img class="quality-image" src="./images/downvote.svg" alt="down vote button"></button>
      <p class="quality-result">Quality: ${ideaObj.quality}</p>
    </div>
  </div>`)
}


$('.idea-card-container').on('click', '.delete-btn', function() {
  $(this).parents().remove('.idea-card')
})

$('.save-button').click(function() {
  var id = $.now()
  var ideaTitle = $('.idea-title').val()
  var ideaBody = $('.idea-body').val()
  var ideaObj = new IdeaObj(id,ideaTitle,ideaBody)
  newIdea(ideaObj)
  $('.idea-title').val("")
  $('.idea-body').val("")
})

$('.up-vote').on('click', '.quality-result', function() {
  console.log("mutha fuckin' Jones")

  if ($(this).hasClass('swill')) {
      $(this).removeClass('swill')
      $(this).addClass('plausible')
  } else if ($(this).hasClass('plausible')) {
      $(this).removeClass('plausible')
      $(this).addClass('genius')
  }

})

$('.down-vote').on('click', function() {
  console.log("muther fucker")
  if ($('.quality-result').hasClass('genius')) {
    $('.quality-result').removeClass('genius')
    $('.quality-result').addClass('plausible')
  } else if ($('.quality-result').hasClass('plausible')) {
    $('.quality-result').removeClass('plausible')
    $('.quality-result').addClass('swill')
  }
})



// console.log(ideaTitle,'ideaTitle')
