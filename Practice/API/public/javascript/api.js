function displayUsers() {
  $.ajax({
    url: "https://localhost:4000/api/users",
    method: "GET",
    dataType: "json",
    success: (data) => {
      let usersList = $("#users");

      for (const user in usersList) {
        usersList.append(
          `<div class="user">
                    <h3>${user.username}</h3>
                    <div class="story-content">${user.email}</div>
                    <div class="story-btns">
                        <button class="edit-btn" data-id="${story.id}">Edit</button>
                        <button class="btn btn-danger btn-sm mr-2 btn-del" data-id="${story.id}">Delete</button>
                    </div>
                </div>`
        );
      }
    },
  });
}

$(document).ready(()=>{
  displayUsers()
})
