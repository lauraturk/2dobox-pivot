### IdeaBox

### IdeaBox

this is a test to see if anything....
## Selenium testing breakdown

functionality to test:

#### On page load:
* see a list of existing ideas including:
** title
** body
** quality
* text box for entering title
* text box for entering body
* save/submit button for committing ideas

#### On save/submit click
* a new idea'box' pops up including:
** title
** body
** default quality (swill)
* text boxes should be clear

#### On click in text area
* content should be editable
* click away or Enter/Return to save 	edits

#### On click of upvote/downvote buttons
* there should be an upvote and downvote button
* upvote: idea quality should change from swill to plausible to genius
* downvote: idea quality should change from genius to plausible to swill
* incrementing a genius idea has no effect
* decrementing a swill idea has no effect

#### On filtering or search
* there should be a search text field
* should filter in real time based on title or body text
* clearing the search box restores all ideas to the list

#### On click of delete button
* idea should be removed from the page

#### On page reload
* ideas should persist
* edited ideas should remain edited
* deleted items should remain deleted
* idea quality should remain
