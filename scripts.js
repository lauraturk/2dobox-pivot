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
      <p class="quality-result">Quality: ${parsedOut.quality}</p>
    </div>
  </div>`)
}

function activate() {
  $('.idea-title').keyup(function() {
    console.log('meat');
  })
}

$('.save-button').click(function() {
  var id = $.now()
  var ideaTitle = $('.idea-title').val()
  var ideaBody = $('.idea-body').val()
  var ideaObj = new IdeaObj(id,ideaTitle,ideaBody)
  var strungOut = JSON.stringify(ideaObj)
  localStorage.setItem(id, strungOut)
  var parsedOut = JSON.parse(localStorage.getItem(id))
  $('.idea-title').val("")
  $('.idea-body').val("")
  newIdea(parsedOut)
})

function persistMafk() {
  for (var i = 0; i < localStorage.length; i++) {
    var nintendoCartridgeBlow = JSON.parse(
      localStorage.getItem(
        localStorage.key(i)
      ))
    newIdea(nintendoCartridgeBlow)
  }
}

$('.idea-card-container').on('click', '.delete-btn', function() {
  $(this).parents().remove('.idea-card')
  var sensitive = $(this).parents('.idea-card').attr('id')
  localStorage.removeItem(sensitive)
})

persistMafk()

$('.idea-card-container').on('click', '.up-vote', function() {
  var flawless = JSON.parse(localStorage.getItem($('.idea-card').attr('id')))
  var flawlessId = flawless.id

  if (flawless.quality = "swill") {
    flawless.quality = "plausible"
  } else if (flawless.quality = "plausible") {
    flawless.quality = "genius"
  }

  var strungOutFlawless = JSON.stringify(flawless)
  localStorage.setItem(flawlessId, strungOutFlawless)
  persistMafk()
})
