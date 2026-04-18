fetch("/posts.json")
  .then(res => res.json())
  .then(posts => {
    const container = document.getElementById("posts");

    // newest first
    posts.reverse().forEach(post => {
      const li = document.createElement("li");

      li.innerHTML = `
        <a href="/post.html?post=${post.slug}">
          ${post.title}
        </a>
        <span> · ${post.tag} · ${post.date}</span>
      `;

      container.appendChild(li);
    });
  });