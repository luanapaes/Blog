const url = "https://jsonplaceholder.typicode.com/posts";

// página index
const loadingElement = document.querySelector("#loading");
const postsContainer = document.querySelector("#posts-container");

// página post
const postPage = document.querySelector("#post");
const postContainer = document.querySelector("#post-container");
const commentsContainer = document.querySelector("#comments-container");

// pega o id da URL
const urlSearchParams = new URLSearchParams(window.location.search);
const postId = urlSearchParams.get("id");

// função que pega todos os posts
async function getAllPosts() {
    const response = await fetch(url);

    console.log(response);

    const data = await response.json();

    console.log(data);

    //quando os dados são carregados o "carregando.." some da página
    loadingElement.classList.add("hide");

    data.map((post) => {
        const div = document.createElement("div");
        const title = document.createElement("h2");
        const body = document.createElement("p");
        const link = document.createElement("a");

        title.innerText = post.title;
        body.innerText = post.body;
        link.innerText = "Ler";
        link.setAttribute("href", `/post.html?id=${post.id}`); //rota do post

        div.appendChild(title);
        div.appendChild(body);
        div.appendChild(link);
        postsContainer.appendChild(div);
    });
}

// Pega cada post individualmente
async function getPost(id) {
    const [responsePost, responseComments] = await Promise.all([
        fetch(`${url}/${id}`),
        fetch(`${url}/${id}/comments`),
    ]);

    const dataPost = await responsePost.json();

    const dataComments = await responseComments.json();

    loadingElement.classList.add("hide");
    postPage.classList.remove("hide");

    const title = document.createElement("h1");
    const body = document.createElement("p");

    title.innerText = dataPost.title;
    body.innerText = dataPost.body;

    postContainer.appendChild(title);
    postContainer.appendChild(body);
    
    dataComments.map((comment) => {
        createComment(comment)
    });

}

// recebe o comentário da API e formata
function createComment(comment) {
    const name = document.createElement("h3");
    const email = document.createElement("h4");
    const body = document.createElement("p");

    name.innerText = comment.name;
    email.innerText = comment.email;
    body.innerText = comment.body;

    commentsContainer.appendChild(name);
    commentsContainer.appendChild(email);
    commentsContainer.appendChild(body);
}

if (!postId) {
    getAllPosts();
} else {
    getPost(postId);
}







