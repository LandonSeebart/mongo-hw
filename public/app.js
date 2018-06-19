$(document).on("click", "#comment", function() {
  const thisId = $(this).attr("data-id");
  window.location.assign(`/articles/${thisId}`)
});