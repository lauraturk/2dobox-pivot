getIdeas();
toggleSaveButton();

function IdeaObj(id, ideaTitle, ideaBody) {
  this.id = id;
  this.title = ideaTitle;
  this.body = ideaBody;
  this.quality = 'swill';
  this.completed = false;
}

function newIdea(idea) {
  $('.idea-card-container').prepend(
  `<section class="idea-card" id="${idea.id}">
    <article class="card-title-box">
      <h1 class="card-title" contenteditable="true">${idea.title}</h1>
      <button class="delete-btn"><img class="quality-image" src="./images/delete.svg" alt="delete button"></img></button>
    </article>
      <p class="card-body" contenteditable="true">${idea.body}</p>
    <article class="quality-box">
      <button class="quality-btns up-vote"><img class="quality-image" src="./images/upvote.svg" alt="upvote button"></button>
      <button class="quality-btns down-vote"><img class="quality-image" src="./images/downvote.svg" alt="downvote button"></button>
      <h3 class="quality-result">Quality: <h4 class="current-quality">${idea.quality}</h4></h3>
      <button class="completed-task">Completed</button>
    </article>
  </section>`);
}

$('.idea-card-container').on('click', '.completed-task', function (){
  $(this).closest('.idea-card').addClass('completed hidden');
  var id = $(this).parents('.idea-card').attr('id');
  var completedValue = JSON.parse(localStorage.getItem(id));
  completedValue.completed = true;
  localStorage.setItem(id, JSON.stringify(completedValue));
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
    var id = $(idea).prop('completed');
    if (id === true) {
    $('.idea-card').closest(id).addClass('completed');
    } else {
      newIdea(idea);
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
  changeThisQuality.quality = quality.text();
  localStorage.setItem(changeQuality, JSON.stringify(changeThisQuality));
}

$('.idea-card-container').on('click', '.down-vote', function() {
  var newQual = $(this).siblings('.current-quality');
  newQual.text() === 'genius' ? newQual.text('plausible') : newQual.text('swill');
  changeQuality(this, newQual);
});

$('.idea-card-container').on('click', '.up-vote', function() {
  var newQual = $(this).siblings('.current-quality');
  newQual.text() === 'swill' ? newQual.text('plausible') : newQual.text('genius');
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
