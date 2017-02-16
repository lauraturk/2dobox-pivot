function IdeaObj(id,ideaTitle,ideaBody) {
  this.id = id
  this.title = ideaTitle
  this.body = ideaBody
  this.quality = 'swill'
}

function newIdea(parsedOut) {
  $('.idea-card-container').prepend(
      `<div class="idea-card" id="${parsedOut.id}">
        <div class="card-title-box">
          <h1 class="card-title">${parsedOut.title}</h1>
          <button class="delete-btn" type="button" name="button"><img class="quality-image" src="./images/delete.svg" alt="delete button"></img></button>
          </div>
          <p class="card-body">${parsedOut.body}</p>
          <div class="quality-box">
          <button class="quality-btns up-vote" type="button" name="button"><img class="quality-image" src="./images/upvote.svg" alt="up vote button"></button>
          <button class="quality-btns down-vote" type="button" name="button"><img class="quality-image" src="./images/downvote.svg" alt="down vote button"></button>
          <p class="quality-result">Quality: <p class="current-quality">${parsedOut.quality}</p></p>
        </div>
      </div>`)
  }

// function activate() {
//   $('.idea-title').keyup(function() {
//     console.log('meat');
//   })
// }

$('.save-button').click(function() {
  var id = $.now()
  var ideaTitle = $('.idea-title').val()
  var ideaBody = $('.idea-body').val()
  var ideaObj = new IdeaObj(id,ideaTitle,ideaBody)
  var strungOut = JSON.stringify(ideaObj)
  localStorage.setItem(id, strungOut)
  $('.idea-title').val("")
  $('.idea-body').val("")
  persistMafk()
})

function persistMafk() {
  $('.idea-card-container').html('')
  for (var i = 0; i < localStorage.length; i++) {
    var nintendoCartridgeBlow = JSON.parse(localStorage.getItem(localStorage.key(i)))
    newIdea(nintendoCartridgeBlow)
  }
}

$('.idea-card-container').on('click', '.delete-btn', function() {
  $(this).parents().remove('.idea-card')
  var sensitive = $(this).parents('.idea-card').attr('id')
  localStorage.removeItem(sensitive)
})

$('.idea-card-container').on('click', '.down-vote', function() {
  var changeQuality = $(this).parents('.idea-card').attr('id')
  var changeThisQuality = JSON.parse(localStorage.getItem(changeQuality))
  var newQual = $(this).siblings('.current-quality')
  if (newQual.text() == 'genius') {
    newQual.text('plausible')
  } else if (newQual.text() == 'plausible') {
    newQual.text('swill')
  }
  changeThisQuality.quality = newQual.text()
  localStorage.setItem(changeQuality, JSON.stringify(changeThisQuality))
  persistMafk()
})

$('.idea-card-container').on('click', '.up-vote', function() {
  var changeQuality = $(this).parents('.idea-card').attr('id')
  var changeThisQuality = JSON.parse(localStorage.getItem(changeQuality))
  var newQual = $(this).siblings('.current-quality')
  if (newQual.text() == 'swill') {
    newQual.text('plausible')
  } else if (newQual.text() == 'plausible') {
    newQual.text('genius')
  }
  changeThisQuality.quality = newQual.text()
  localStorage.setItem(changeQuality, JSON.stringify(changeThisQuality))
  persistMafk()
})

persistMafk()
