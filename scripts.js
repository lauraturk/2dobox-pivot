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

$('.save-button').click(function() {
  var id = $.now()
  var ideaTitle = $('.idea-title').val()
  var ideaBody = $('.idea-body').val()
  var ideaObj = new IdeaObj(id,ideaTitle,ideaBody)

  $('.idea-title').val("")
  $('.idea-body').val("")

  var strungOut = JSON.stringify(ideaObj)
  localStorage.setItem(id, strungOut)

  var retrieveIdea = localStorage.getItem(id)
  var parsedOut = JSON.parse(retrieveIdea)
  newIdea(parsedOut)
})

// for (var i=1; i <= localStorage.length; i++)  {
//    alert(localStorage.getItem(i))
// }

function persistMofo() {
  $(localStorage.length).each(function(index) {
    var jackAss = this.getItem(index)
    var persistIdea = JSON.parse(jackAss)
    console.log(persistIdea)
    newIdea(persistIdea)
  })
}
//
// function persistMofo() {
//   var retrieveIdea = window.localStorage.getItem('*')
//   console.log(retrieveIdea)
// $(retrieveIdea).each(function(index){
//   var persistIdea = JSON.parse(index)
//   newIdea(persistIdea)
// })
// }

persistMofo()


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
