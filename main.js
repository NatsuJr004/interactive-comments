const dataJson = JSON.parse(
    JSON.stringify({
        "currentUser": {
        "image": { 
            "png": "./images/avatars/image-juliusomo.png",
            "webp": "./images/avatars/image-juliusomo.webp"
        },
        "username": "juliusomo"
        },
        "comments": [
            {
                "id": 1,
                "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
                "createdAt": "1 month ago",
                "score": 12,
                "user": {
                "image": { 
                    "png": "./images/avatars/image-amyrobson.png",
                    "webp": "./images/avatars/image-amyrobson.webp"
                },
                "username": "amyrobson"
                },
                "replies": []
            },
            {
                "id": 2,
                "content": "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
                "createdAt": "2 weeks ago",
                "score": 5,
                "user": {
                "image": { 
                    "png": "./images/avatars/image-maxblagun.png",
                    "webp": "./images/avatars/image-maxblagun.webp"
                },
                "username": "maxblagun"
                },
                "replies": [
                {
                    "id": 3,
                    "content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
                    "createdAt": "1 week ago",
                    "score": 4,
                    "replyingTo": "maxblagun",
                    "user": {
                    "image": { 
                        "png": "./images/avatars/image-ramsesmiron.png",
                        "webp": "./images/avatars/image-ramsesmiron.webp"
                    },
                    "username": "ramsesmiron"
                    }
                },
                {
                    "id": 4,
                    "content": "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
                    "createdAt": "2 days ago",
                    "score": 2,
                    "replyingTo": "ramsesmiron",
                    "user": {
                    "image": { 
                        "png": "./images/avatars/image-juliusomo.png",
                        "webp": "./images/avatars/image-juliusomo.webp"
                    },
                    "username": "juliusomo"
                    }
                }
                ]
            }
        ]
  })
);

const myUserName = dataJson.currentUser.username;

console.log(dataJson.comments)
handleRenderFeed();

function handleRenderFeed(){
    const Main = document.querySelector('.feed');
    Main.innerHTML = '';

    for(let comment of dataJson.comments){
        Main.innerHTML += handleRenderCard(comment);
        
        if(comment.replies.length > 0){
            Main.innerHTML += handleRenderContainerReplies();
            for(let replie of comment.replies){
                const ContainerReplies = document.querySelector('.sub-comments');
                ContainerReplies.innerHTML += handleRenderCard(replie, true);
            }
        }
    }
}

function handleRenderCard(commentData, replie = false){
    const {user, score, createdAt, content} = commentData;
    return `<article class="card-comment">
    
    <div class="box-plus-minus">
      <img class="icon-plus" src="./images/icon-plus.svg" alt="plus">
      <p>${score}</p>
      <img class="icon-minus" src="./images/icon-minus.svg" alt="minus">
    </div>
    
    <div class="main-comment">
      <header class="header-comment">
        <div class="container-profile-comment">
          <img src="${user.image.png}" alt="photo profile">
          <p class="username-comment">${user.username}</p>
          ${(myUserName === user.username) ? '<p class="tag-you">you</p>' : ''}
          <p class="time-commented">${createdAt}</p>
        </div>
        ${
            (myUserName === user.username) ?
            `
            <div class="box-edit-delete">
                <div class="btn-comment btn-delete">
                <img src="./images/icon-delete.svg" alt="icon reply">
                <p>Delete</p>
                </div>

                <div class="btn-comment btn-edit">
                <img src="./images/icon-edit.svg" alt="icon reply">
                <p>Edit</p>
                </div>
            </div>
            `:
            `
            <div class="btn-comment btn-reply">
                <img src="./images/icon-reply.svg" alt="icon reply">
                <p>Reply</p>
            </div>
            `
        }
      </header>
    
      <p class="comment">
        ${replie && `<span class="nameReplyingTo">@${commentData.replyingTo}</span>`} ${content}
      </p>
    </div>
    </article>`;
    
}

function handleRenderContainerReplies(){
    return `
    <section class="container-sub-comments">
        <hr>

        <section class="sub-comments">
        </section>
    </section>
    `;
}

function handleNewComment(){
    const input = document.querySelector('.container-send > textarea');
    
    const commentData = {
        id: dataJson.comments.length,
        createdAt: "10 sec ago",
        score: 0,
        content: input.value,
        user: {
            image: { 
                png: "./images/avatars/image-juliusomo.png",
                webp: "./images/avatars/image-juliusomo.webp"
            },
            username: "juliusomo"
        },
        replies: []
    }
    
    if(input.value.length > 1){
        dataJson.comments.push(commentData);
        handleRenderFeed();
    }
    input.value = '';
}