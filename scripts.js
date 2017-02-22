getIdeas();
toggleSaveButton();

var importance = ['none', 'low', 'normal', 'high', 'critical'];
var counter = 2;

function IdeaObj(id, ideaTitle, ideaBody) {
  this.id = id;
  this.title = ideaTitle;
  this.body = ideaBody;
  this.importance = importance[2];
  this.completedClass;
}

function newIdea(idea) {
  $('.idea-card-container').prepend(
  `<section class="idea-card ${idea.completedClass}" id="${idea.id}">
    <article class="card-title-box">
      <h1 class="card-title" contenteditable="true">${idea.title}</h1>
      <button class="delete-btn"><img class="quality-image" src="./images/delete.svg" alt="delete button"></img></button>
    </article>
      <p class="card-body" contenteditable="true">${idea.body}</p>
    <article class="quality-box">
      <button class="quality-btns up-vote"><img class="quality-image" src="./images/upvote.svg" alt="upvote button"></button>
      <button class="quality-btns down-vote"><img class="quality-image" src="./images/downvote.svg" alt="downvote button"></button>
      <h3 class="quality-result">Importance: <h4 class="current-quality">${idea.importance}</h4></h3>
      <button class="completed-task">Completed</button>
    </article>
  </section>`);
}

$('.idea-card-container').on('click', '.completed-task', function (){
  $(this).closest('.idea-card').addClass('completed hidden');
  var id = $(this).parents('.idea-card').attr('id');
  var completedValue = JSON.parse(localStorage.getItem(id));
  completedValue.completedClass = 'completed hidden';
  localStorage.setItem(id, JSON.stringify(completedValue));
})

$('.show-completed').on('click', function (){
  $('.idea-card-container').children('.hidden').removeClass('hidden');
})


function prependIdeas() {
  var id = $.now();
  var ideaTitle = $('.idea-title').val();
  var ideaBody = $('.idea-body').val();
  var ideaObj = new IdeaObj(id, ideaTitle, ideaBody);
  setIdea(id, ideaObj);
}

function setIdea(id, idea) {
  localStorage.setItem(id, JSON.stringify(idea));
  getIdeas();
}

function getIdeas() {
  $('.idea-card').remove();
  for (var i in localStorage) {
    var idea = JSON.parse(localStorage[i]);
    newIdea(idea);
  }
    if ($('.idea-card-container').children().length > 10) {
      for (var i = 10; i < $('.idea-card-container').children().length; i++) {
        var todos = $('.idea-card-container').children()[i];

    }
  }
}

$('.save-button').click(function() {
  prependIdeas();
  $('.idea-title').val("");
  $('.idea-body').val("");
  toggleSaveButton();
});

$('.idea-card-container').on('click', '.delete-btn', function() {
  $(this).parents().remove('.idea-card');
  var id = $(this).parents('.idea-card').attr('id');
  localStorage.removeItem(id);
});

function changeQuality(button, quality) {
  var changeQuality = $(button).parents('.idea-card').attr('id');
  var changeThisQuality = JSON.parse(localStorage.getItem(changeQuality));
  changeThisQuality.importance = quality.text();
  localStorage.setItem(changeQuality, JSON.stringify(changeThisQuality));
}

$('.idea-card-container').on('click', '.down-vote', function() {
  var newQual = $(this).siblings('.current-quality');
  counter--;
  newQual.text(importance[counter]);
  changeQuality(this, newQual);
});

$('.idea-card-container').on('click', '.up-vote', function() {
  var newQual = $(this).siblings('.current-quality');
  counter++;
  newQual.text(importance[counter]);
  changeQuality(this, newQual);
});

function editFields(field, text) {
  var updateField = $(field).parents('.idea-card').attr('id');
  var newFieldValue = JSON.parse(localStorage.getItem(updateField));
  newFieldValue[text] = $(field).text();
  localStorage.setItem(updateField, JSON.stringify(newFieldValue));
}

$('.idea-card-container').on('blur', '.card-title', function() {
  editFields(this, 'title');
});

$('.idea-card-container').on('blur', '.card-body', function() {
  editFields(this, 'body');
});

$('.search-text').on('keyup', function(){
  var lookFor = $(this).val().toLowerCase();
  $('.idea-card').each(function(index, element){
    var text = $(element).children().text().toLowerCase();
    var match = !!text.match(lookFor);
    $(element).toggle(match);
  });
});

$('.idea-card-container').on('keypress','.card-title, .card-body', function(e){
  if (e.which === 13){
    e.preventDefault();
    $('.card-title, .card-body').blur();
  }
});

function toggleSaveButton() {
  var title = $('.idea-title').val();
  var body = $('.idea-body').val();
  if (title.length > 0 && body.length > 0) {
    $('.save-button').prop('disabled', false);
  } else {
    $('.save-button').prop('disabled', true);
  }
}

$('.idea-title, .idea-body').on('keyup', function() {
  toggleSaveButton();
});

$('.idea-title').on('keypress', function(e) {
  if (e.which === 13) {
    e.preventDefault();
    $('.save-button').click();
  }
});

$('.idea-body').on('keypress', function(e) {
  if (e.which === 13) {
    e.preventDefault();
    $('.save-button').click();
  }
});

$('#critical-button').on('click', function(){
  qualityMatch('critical');
});

$('#high-button').on('click', function(){
  qualityMatch('high');
});

$('#normal-button').on('click', function(){
  qualityMatch('normal');
});

$('#low-button').on('click', function(){
  qualityMatch('low');
});

$('#none-button').on('click', function(){
  qualityMatch('none');
})

function qualityMatch(quality){
  $('.idea-card').each(function(){
    var importance = $(this).find('.current-quality').text()
    var match = importance.match(quality);
    if(!match){
      $(this).hide();
    } else {
      $(this).show();
    }
  })
}
