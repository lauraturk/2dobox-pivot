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

// function persistMofo() {
//   $(localStorage.key(n)).map(function(i) {
//   var persistIdea = JSON.parse(i)
//   console.log(i, 'stagger')
//   })
// }

function persistMofo() {
for(var i =0; i < localStorage.length; i++){
  var jellyBean = JSON.parse(localStorage.getItem(localStorage.key(i)))
  newIdea(jellyBean)
   console.log(jellyBean);
 }
}

// function persistMofo() {
//   //what can we pass into key() to have it find all keys?
//   $(localStorage.key).each(function(i) {
//     console.log(i, 'stagger')
//     var persistIdea = JSON.parse(i)
//     newIdea(persistIdea)
//   })
// }
persistMofo()

$('.idea-card-container').on('click', '.delete-btn', function() {
  $(this).parents().remove('.idea-card')
  var beaner = JSON.parse(localStorage.getItem($(this).parents('.idea-card').attr('id')))
  console.log(beaner, 'beaner')
  localStorage.removeItem()
  // console.log(localStorage, 'localStorage')
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
