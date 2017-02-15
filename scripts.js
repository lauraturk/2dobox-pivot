
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

// $('.idea-card').on('click', '.up-vote', function() {
//   var retrievedIdea = localStorage.getItem(this.id)
//   var parsedIdea = JSON.parse(retrievedIdea)
//   if quality = "swill" {
//     quality = "plausible"
//   }
//   if quality = "plausible" {
//     quality = "genius"
//   }
//   var strungOut = JSON.stringify(ideaObj)
//   localStorage.setItem(id, strungOut)
//   // parsedIdea.quality = "genius"
// })

$('.save-button').click(function() {
  var id = $.now()
  var ideaTitle = $('.idea-title').val()
  var ideaBody = $('.idea-body').val()
  var ideaObj = new IdeaObj(id,ideaTitle,ideaBody)

  newIdea(ideaObj)
  $('.idea-title').val("")
  $('.idea-body').val("")

  var strungOut = JSON.stringify(ideaObj)
  localStorage.setItem(id, strungOut)
})
