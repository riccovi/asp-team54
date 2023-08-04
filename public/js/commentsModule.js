document.addEventListener('DOMContentLoaded', function () {
    const deleteCommentButtons = document.querySelectorAll('.delete-comment-button');
  
    deleteCommentButtons.forEach((button) => {
        button.addEventListener('click', handleDeleteCommentButtonClick);
    });
  });
  
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
  