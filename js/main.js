const params = new URLSearchParams(window.location.search);
const post = params.get("post");

if (!post) {
  document.getElementById("content").innerHTML = "No post specified.";
} else {
  fetch(`/posts/${post}.md`)
    .then(res => res.text())
    .then(md => {
      document.getElementById("content").innerHTML =
        marked.parse(md);
    })
    .catch(() => {
      document.getElementById("content").innerHTML = "Post not found.";
    });
}