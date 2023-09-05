
let userCardTemplate = `
<div class="container">

<% users.forEach(function(user, index) { %>
    <div class="card user-card my-4 shadow p-3">
        <!-- User Info -->
        <div class="row no-gutters align-items-center">
            <div class="col-md-4 col-lg-3">
                <div class="profile-image-wrapper p-3">
                    <img src="<%= user.profile_picture || '/default-profile-picture.png' %>" class="img-fluid rounded-circle profile-image" alt="<%= user.username %>'s profile picture" style="object-fit: cover; height: 100px; width: 100px;">    
                </div>
            </div>
            <div class="col-md-8 col-lg-9">
                <div class="card-body">
                    <!-- Link to Public Profile -->
                    <h2 class="card-title"><a class="text-decoration-none text-dark" href="/public-profile/<%= user.username %>"><%= user.username %></a></h2>
                    <h6 class="card-subtitle mb-2 text-muted"><%= user.email %></h6>
                    <span class="badge badge-primary"><%= user.role %></span>
                </div>
            </div>
        </div>
        <!-- User's Projects -->
        <div class="row mt-4">
            <% if (user.projects.length > 0) { %>
                <% for (let i = 0; i < Math.min(user.projects.length, 3); i++) { %>
                    <% const project = user.projects[i]; %>
                    <div class="col-md-4 mb-4">
                        <div class="card h-100 project-card shadow">
                            <img src="<%= project.project_picture %>" class="card-img-top rounded" alt="Project image">
                            <div class="card-body">
                                <h5 class="card-title truncate text-truncate"><%= project.title %></h5> <!-- Title -->
                                <p class="card-text project-description text-muted"><%= project.description %></p> <!-- Description -->

                                <!-- Display Likes count for all users -->
                                <p class="card-text">
                                    <small class="text-muted">
                                        <i class="fas fa-thumbs-up"></i> <span id="likes-count-<%= project.id %>"><%= project.likes %></span> Likes
                                    </small>
                                </p>

                                <% if (project.comments.length > 0) { %>
                                  <% const lastTwoComments = project.comments.slice(-2); %>
                                  <% lastTwoComments.forEach(comment => { %>
                                    <div class="media mb-3">
                                        <img src="<%= comment.profile_picture || '/default-profile-picture.png' %>" class="mr-3 rounded-circle" alt="<%= comment.username %>'s profile picture" style="object-fit: cover; height: 40px; width: 40px;">
                                        <div class="media-body">
                                            <h5 class="mt-0"><%= comment.username %>:</h5>
                                            <p><%= comment.content %></p>
                                
                                            <% if (currentUser && currentUser.id === comment.user_id) { %>
                                              <button class="btn btn-outline-danger btn-sm delete-comment-button" data-comment-id="<%= comment.id %>" data-project-id="<%= project.id %>">Delete</button>
                                            <% } %>
                                        </div>
                                    </div>
                                <% }) %>
                                
                              <% } else { %>
                                  <p>No comments yet.</p>
                              <% } %>
                              
                              <% if (currentUser) { %>
                                  <!-- Button to Open the Modal -->
                                  <button type="button" class="boton" data-toggle="modal" data-project-id="<%= project.id %>" data-target="#commentModal">
                                      Leave a comment
                                  </button>

                                  <!-- The Modal -->
                                  <div class="modal" id="commentModal">
                                      <div class="modal-dialog">
                                      <div class="modal-content">
                                  
                                          <!-- Modal Header -->
                                          <div class="modal-header">
                                          <h4 class="modal-title">Leave a comment</h4>
                                          <button type="button" class="close" data-dismiss="modal">&times;</button>
                                          </div>
                                  
                                          <!-- Modal body -->
                                          <div class="modal-body">
                                              <form method="post" action="/comments/<%= project.id %>/comment" id="commentForm">

                                              <div class="form-group">
                                              <textarea class="form-control" placeholder="Share your thoughts about this project..." name="content" required></textarea>
                                              </div>
                                              <div class="form-group">
                                              <button type="submit" class="btn btn-primary">Post</button>
                                              </div>
                                          </form>
                                          </div>
                                  
                                      </div>
                                      </div>
                                  </div>
                              <% } %>

                                <!-- Add Like and View Project buttons -->
                                <div class="d-flex justify-content-between mt-3">
                                  <% if (currentUser) { %>
                                    <button type="button" data-project-id="<%= project.id %>" class="btn btn-outline-primary like-button"><i class="fas fa-heart"></i> Like</button>
                                  <% } %>
                                  <a href="/project/<%= project.id %>" class="btn btn-primary"><i class="fas fa-eye"></i> View Project</a>
                                </div>
                          </div>
                      </div>
                  </div>
              <% } %>
          <% } else { %>
              <p class="no-projects-text text-center w-100">This user doesn't have any projects yet.</p>
          <% } %>
      </div>
    </div>
<% }); %>
</div>

<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="/js/userCard.js"></script>
<!-- jQuery first, then Popper.js, then Bootstrap JS -->
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<!-- Include jQuery -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js"></script>

`;
// $(document).on('submit', '#searchForm', function(e) {
//         e.preventDefault();
        
//         let query = $('#searchInput').val();
//         console.log('submit detected')
//         // Send the search query to the server
//         $.ajax({
//             method: 'GET',
//             url: '/search',
//             data: {
//                 searchTerm: query
//             },
//             success: function(data) {
                
                
//                 const renderedHTML = ejs.render(userCardTemplate, { users: data.users, currentUser: data.currentUser });
        
// //         // Replace content of the user card section with new rendered HTML
//                 document.querySelector(".displayProject").innerHTML = renderedHTML;
//                 console.log('submit successful')
//             }
//         });
//     });
$(document).ready(function() {
        $("#searchInput").on("input", function() {
            let query = $(this).val();
            
            // Send the search query to the server
            $.ajax({
                method: 'GET',
                url: '/search',
                data: {
                    searchTerm: query
                },
                success: function(data) {
                    
                    
                    const renderedHTML = ejs.render(userCardTemplate, { users: data.users, currentUser: data.currentUser });
            
    //         // Replace content of the user card section with new rendered HTML
                    document.querySelector(".displayProject").innerHTML = renderedHTML;
                    
                }
            });
        });
    });
    
