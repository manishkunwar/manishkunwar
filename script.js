/* Shared script for index, blog, admin pages.
   Uses localStorage key "k_blog_posts".
   If empty, tries to fetch 'blogs.json' to seed initial posts.
*/
const STORAGE_KEY = "k_blog_posts";

async function seedIfEmpty(){
  if(localStorage.getItem(STORAGE_KEY)) return;
  try {
    const res = await fetch("blogs.json");
    if(!res.ok) return;
    const data = await res.json();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch(e){
    console.warn("No seed data:", e);
  }
}

function loadPosts(){
  const raw = localStorage.getItem(STORAGE_KEY) || "[]";
  try {
    const arr = JSON.parse(raw);
    // ensure newest first
    arr.sort((a,b)=> (b.dateCreated||0) - (a.dateCreated||0));
    return arr;
  } catch(e){ return [];}
}

function savePosts(posts){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

/* helper: generate id */
function genId(){ return Date.now().toString() + Math.floor(Math.random()*999).toString(); }

/* helper to format date string like "Nov 10, 2025" */
function prettyDate(ts){
  try{
    const d = new Date(Number(ts));
    const opts = { year:"numeric", month:"short", day:"numeric" };
    return d.toLocaleDateString(undefined, opts);
  }catch(e){ return ""; }
}

/* get query param */
function qParam(name){
  const params = new URLSearchParams(location.search);
  return params.get(name);
}

/* Expose utilities */
window.KBlog = {
  seedIfEmpty, loadPosts, savePosts, genId, prettyDate, qParam
};
