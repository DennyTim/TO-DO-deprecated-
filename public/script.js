console.log("script is working");

let postData = () => {
  event.preventDefault();
  let noteId = document.getElementById("noteId").value;
  let noteTitle = document.getElementById("nameNote").value;
  let noteDescription = document.getElementById("descriptionNote").value;

  axios
    .put(`/notes/${noteId}`, {
      title: noteTitle,
      description: noteDescription
    })
    .then(response => {
      window.location.replace('/');
      console.log(response.status);
    })
    .catch(error => {
      console.log(error);
    });
}

let deleteData = () => {
  event.preventDefault();
  let noteId = document.getElementById("noteId").value;

  axios
    .delete(`/notes/${noteId}`, {
      _id: noteId
    })
    .then(response => {
      window.location.replace('/');
      console.log(response.status);
    })
    .catch(error => {
      console.log(error);
    });
}
function closeData() {
    event.preventDefault();
    document.location.href = "http://localhost:8000";
}
