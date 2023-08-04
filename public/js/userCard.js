document.addEventListener('DOMContentLoaded', function () {
  const likeButtons = document.querySelectorAll('.like-button');
  const deleteCommentButtons = document.querySelectorAll('.delete-comment-button');
  const commentButtons = document.querySelectorAll('.boton'); // Add this line

  likeButtons.forEach((button) => {
      button.addEventListener('click', handleLikeButtonClick);
  });

  deleteCommentButtons.forEach((button) => {
      button.addEventListener('click', handleDeleteCommentButtonClick);
  });

 
  commentButtons.forEach((button) => {
      button.addEventListener('click', function() {
          const projectId = this.getAttribute('data-project-id');
          const commentForm = document.querySelector("#commentForm");
          commentForm.setAttribute("action", "/comments/" + projectId + "/comment");
      });
  });
});
function handleLikeButtonClick() {
  const projectId = this.getAttribute('data-project-id');
  axios.post('/likes/' + projectId + '/like')
      .then(handleLikeButtonResponse.bind(this, projectId))
      .catch(handleError);
}

function handleLikeButtonResponse(projectId, response) {
  alert(response.data.liked ? 'You liked the project!' : 'You unliked the project!');
  document.querySelector("#likes-count-" + projectId).textContent = response.data.likesCount;
}

function handleDeleteCommentButtonClick() {
  const commentId = this.getAttribute('data-comment-id');
  axios.delete('/comments/comment/' + commentId)
      .then(handleDeleteCommentResponse.bind(this))
      .catch(handleError);
}

function handleDeleteCommentResponse(response) {
  alert('You deleted the comment!');
  this.parentElement.parentElement.remove();
}

function handleError(error) {
  const errorResponse = error.response;
  const errorStatus = errorResponse && errorResponse.status;
  let message;

  if (errorStatus === 401) {
      message = 'You must be logged in to perform this action.';
  } else if (errorStatus === 403) {
      message = 'You are not authorized to perform this action.';
  } else if (errorStatus === 404) {
      message = 'Resource not found.';
  } else if (errorStatus === 400 && errorResponse.data) {
      message = errorResponse.data.message;
  } else {
      message = 'An error occurred.';
      console.error('Error:', error);
  }

  alert(message);
}
