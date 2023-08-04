document.addEventListener('DOMContentLoaded', function () {
    let likeButtons = document.querySelectorAll('.like-button');
  
    likeButtons.forEach((button) => {
      button.addEventListener('click', function () {
        let projectId = this.getAttribute('data-project-id');
  
        axios.post('/likes/' + projectId + '/like')

          .then(response => {
            if (response.data.liked) {
              alert('You liked the project!');
            } else {
              alert('You unliked the project!');
            }
  
            // Update likes count dynamically after the server response
            document.querySelector("#likes-count-" + projectId).textContent = response.data.likesCount;
          })
          .catch(error => {
            if (error.response && error.response.status === 401) {
              alert('You must be logged in to like a project.');
            } else if (error.response && error.response.status === 400) {
              alert(error.response.data.message);
            } else {
              console.error('Error:', error);
            }
          });
      });
    });
  });