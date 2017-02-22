var importance = ['none', 'low', 'normal', 'high', 'critical'];
var counter = 2;

$(document).ready(function() {
  getToDos();
  showTen();
  toggleSaveButton();
});

function ToDoObj(id, toDoTitle, toDoBody) {
  this.id = id;
  this.title = toDoTitle;
  this.body = toDoBody;
  this.importance = importance[2];
  this.completedClass;
}

function newToDo(toDo) {
  $('.toDo-card-container').prepend(
    `<section class="toDo-card ${toDo.completedClass}" id="${toDo.id}">
    <article class="card-title-box">
    <h1 class="card-title" contenteditable="true">${toDo.title}</h1>
    <button class="delete-btn"><img class="importance-image" src="./images/delete.svg" alt="delete button"></img></button>
    </article>
    <p class="card-body" contenteditable="true">${toDo.body}</p>
    <article class="importance-box">
    <button class="importance-btns up-vote"><img class="importance-image" src="./images/upvote.svg" alt="upvote button"></button>
    <button class="importance-btns down-vote"><img class="importance-image" src="./images/downvote.svg" alt="downvote button"></button>
    <h3 class="importance-result">Importance: <h4 class="current-importance">${toDo.importance}</h4></h3>
    <button class="completed-task">Completed</button>
    </article>
    </section>`);
  }

function prependtoDos() {
  var id = $.now();
  var toDoTitle = $('.toDo-title').val();
  var toDoBody = $('.toDo-body').val();
  var toDoObj = new ToDoObj(id, toDoTitle, toDoBody);
  settoDo(id, toDoObj);
}

function settoDo(id, toDo) {
  localStorage.setItem(id, JSON.stringify(toDo));
  getToDos();
}

function getToDos() {
  $('.toDo-card').remove();
  for (var i in localStorage) {
    var toDo = JSON.parse(localStorage[i]);
    newToDo(toDo);
  }
}

function showTen() {
  if ($('.toDo-card-container').children().length <=10) {
    $('.show-more-items').prop('disabled', true);
  }
  $('.toDo-card-container').children().slice(10).css('display', 'none');
}

function toggleSaveButton() {
  var title = $('.toDo-title').val();
  var body = $('.toDo-body').val();
  if (title.length > 0 && body.length > 0) {
    $('.save-button').prop('disabled', false);
  } else {
    $('.save-button').prop('disabled', true);
  }
}

$('.toDo-title, .toDo-body').on('keyup', function() {
  toggleSaveButton();
});

$('.toDo-title').on('keypress', function(e) {
  if (e.which === 13) {
    e.preventDefault();
    $('.save-button').click();
  }
});

$('.toDo-body').on('keypress', function(e) {
  if (e.which === 13) {
    e.preventDefault();
    $('.save-button').click();
  }
});

$('.save-button').click(function() {
  prependtoDos();
  $('.toDo-title').val("");
  $('.toDo-body').val("");
  toggleSaveButton();
});

$('.search-toDo').on('keyup', function(){
  var lookFor = $(this).val().toLowerCase();
  $('.toDo-card').each(function(index, element){
    var text = $(element).children().text().toLowerCase();
    var match = !!text.match(lookFor);
    $(element).toggle(match);
  });
});

function editFields(field, property) {
  var updateField = $(field).parents('.toDo-card').attr('id');
  var newFieldValue = JSON.parse(localStorage.getItem(updateField));
  newFieldValue[property] = $(field).text();
  localStorage.setItem(updateField, JSON.stringify(newFieldValue));
}

$('.toDo-card-container').on('blur', '.card-title', function() {
  editFields(this, 'title');
});

$('.toDo-card-container').on('blur', '.card-body', function() {
  editFields(this, 'body');
});

$('.toDo-card-container').on('keypress','.card-title, .card-body', function(e){
  if (e.which === 13){
    e.preventDefault();
    $('.card-title, .card-body').blur();
  }
});

$('.toDo-card-container').on('click', '.delete-btn', function() {
  $(this).parents().remove('.toDo-card');
  var id = $(this).parents('.toDo-card').attr('id');
  localStorage.removeItem(id);
});

function changeimportance(button, importance) {
  var changeimportance = $(button).parents('.toDo-card').attr('id');
  var changeThisimportance = JSON.parse(localStorage.getItem(changeimportance));
  changeThisimportance.importance = importance.text();
  localStorage.setItem(changeimportance, JSON.stringify(changeThisimportance));
}

$('.toDo-card-container').on('click', '.down-vote', function() {
  var newImportance = $(this).siblings('.current-importance');
  counter--;
  newImportance.text(importance[counter]);
  changeimportance(this, newImportance);
});

$('.toDo-card-container').on('click', '.up-vote', function() {
  var newImportance = $(this).siblings('.current-importance');
  counter++;
  newImportance.text(importance[counter]);
  changeimportance(this, newImportance);
});

$('.toDo-card-container').on('click', '.completed-task', function (){
  $(this).closest('.toDo-card').addClass('completed hidden');
  var id = $(this).parents('.toDo-card').attr('id');
  var completedValue = JSON.parse(localStorage.getItem(id));
  completedValue.completedClass = 'completed hidden';
  localStorage.setItem(id, JSON.stringify(completedValue));
});

$('.show-completed').on('click', function (){
  $('.toDo-card-container').children('.hidden').removeClass('hidden');
});

function showMore() {
  $('.toDo-card-container').children().css('display', 'block');
}

$('.show-more-items').on('click', function() {
  showMore();
});

function importanceMatch(importance){
  $('.toDo-card').each(function(){
    var newImportance = $(this).find('.current-importance').text();
    var match = newImportance.match(importance);
    if(!match){
      $(this).toggle('hidden');
    } else {
      $(this).show();
    }
  });
}

$('#critical-button').on('click', function(){
  $(this).toggleClass('button-active');
  importanceMatch('critical');
});

$('#high-button').on('click', function(){
  $(this).toggleClass('button-active');
  importanceMatch('high');
});

$('#normal-button').on('click', function(){
  $(this).toggleClass('button-active');
  importanceMatch('normal');
});

$('#low-button').on('click', function(){
  $(this).toggleClass('button-active');
  importanceMatch('low');
});

$('#none-button').on('click', function(){
  $(this).toggleClass('button-active');
  importanceMatch('none');
});
