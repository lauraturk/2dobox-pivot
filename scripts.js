var deleteBtn = $('.delete-btn')
var upVote = $('.up-vote')
var downVote = $('.down-vote')
var cardTitle = $('.card-title')
var cardBody = $('.card-body')

$('.save-button').click(function() {
  var ideaTitle = $('.idea-title').val()
  var ideaBody = $('.idea-body').val()
  IdeaObj(ideaTitle,ideaBody)
})

function IdeaObj(id,title,body) {
  this.id = id
  this.title = title
  this.body = body
}



console.log(ideaTitle,'ideaTitle')
