const url = "https://jsonplaceholder.typicode.com/posts";

const loadingElement = document.querySelector('#loading');
const postsContainer = document.querySelector('#posts-container');


// função que pega todos os posts
async function getAllPosts(){

    const response = await fetch(url);
    console.log(response);

    const data = await response.json();
    console.log(data);

    //quando os dados são carregados o "carregando.." some da página
    loadingElement.classList.add('hide');

    data.map((post) =>{
        const div = document.createElement("div");
        const title = document.createElement("h2");
        const body = document.createElement("p");
        const link = document.createElement("a");

        title.innerText = post.title;
        body.innerText = post.body;
        link.innerText = "Ler";
        link.setAttribute("href", `post.html?=${post.id}`);//rota da post

        div.appendChild(title);
        div.appendChild(body);
        div.appendChild(link);

        postsContainer.appendChild(div)
    })

}

getAllPosts();








