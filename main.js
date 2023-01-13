let dataJson = JSON.parse(
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
let ultimoId = 4;

console.log(dataJson.comments)
handleRenderFeed();

function handleRenderFeed(){
    const Main = document.querySelector('.feed');
    Main.innerHTML = '';

    for(let comment of dataJson.comments){
        Main.innerHTML += handleRenderCard(comment);
        
        if(comment.replies.length > 0){
            Main.innerHTML += handleRenderContainerReplies(comment.id);
            for(let replie of comment.replies){
                const ContainerReplies = document.querySelector(`.sub-comments-${comment.id}`);
                ContainerReplies.innerHTML += handleRenderCard(replie, true);
            }
        }
    }
}

function handleRenderCard(commentData, replie = false){
    const {user, score, createdAt, content} = commentData;
    return `
    <article class="container-card-${commentData.id}">
        <div class="card-comment">
        
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
                            <div class="btn-comment btn-delete" onClick="handleDeleteComment(${commentData.id})">
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
                        <div class="btn-comment btn-reply" onClick="handleNewReplie(${commentData.id}, ${replie})">
                            <img src="./images/icon-reply.svg" alt="icon reply">
                            <p>Reply</p>
                        </div>
                        `
                    }
                </header>
                
                <p class="comment">
                    ${replie ? `<span class="nameReplyingTo">@${commentData.replyingTo}</span>` : ''} ${content}
                </p>
            </div>
        </div>
    </article>
    `;
    
}

function handleRenderContainerReplies(id){
    return `
        <section class="container-sub-comments">
            <hr>

            <section class="sub-comments-${id}">
            </section>
        </section>
    `;
}

function handleNewComment(){
    const input = document.querySelector('.container-send > textarea');
    ultimoId += 1;
    const commentData = {
        id: ultimoId,
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

function handleNewReplie(id, isReplie){

    for(let element of dataJson.comments){
        if(element.id === id){
            const sla = document.querySelector(`.container-card-${id}`);
            sla.innerHTML += `
                <section class="container-reply">
                    <img src="./images/avatars/image-juliusomo.png" alt="photo profile">
                    <textarea placeholder="Add a comment..."></textarea>
                    <!-- <button id="btn-send" onClick="handleRegisterReplie(${id}, ${isReplie}, ${element})">REPLY</button> -->
                    <button id="btn-send" onClick="handleRegisterReplie(${id}, ${isReplie}, '${element.user.username}')">REPLY</button>
                </section>
            `;
            return;
        }

        if(isReplie){
            for(let elementReplie of element.replies){
                if(elementReplie.id === id){
                    const sla = document.querySelector(`.container-card-${id}`);
                    sla.innerHTML += `
                        <section class="container-reply">
                            <img src="./images/avatars/image-juliusomo.png" alt="photo profile">
                            <textarea placeholder="Add a comment..."></textarea>
                            <!-- <button id="btn-send" onClick="handleRegisterReplie(${id}, ${isReplie}, ${element})">REPLY</button> -->
                            <button id="btn-send" onClick="handleRegisterReplie(${id}, ${isReplie}, '${elementReplie.user.username}')">REPLY</button>
                        </section>
                    `;
                    return;
                }
            }
        }
    };
}

function handleRegisterReplie( id, isReplie, replyingTo) {
    ultimoId += 1;
    const ContentReplie = document.querySelector('.container-reply > textarea');

    const newReplieData = {
        id: ultimoId,
        content: ContentReplie.value,
        createdAt: "10 sec ago",
        score: 0,
        replyingTo: replyingTo,
        user: {
            image: { 
            png: dataJson.currentUser.image.png,
            webp: dataJson.currentUser.image.webp
            },
            username: dataJson.currentUser.username
        }
    }

    let newDataJsonComments = handleSearchCommentForIdAndAddNewCommentOrReplie(id, isReplie, newReplieData);
    
    document.querySelector('.container-reply').remove();
    dataJson.comments = newDataJsonComments;
    console.log(dataJson.comments);
    handleRenderFeed();
}

function handleSearchCommentForIdAndAddNewCommentOrReplie(id, isReplie, newReplieData) {
    let newDataJsonComments = dataJson.comments;

    for(let i in newDataJsonComments){
        if(newDataJsonComments[i].id === id){
            newDataJsonComments[i].replies.push(newReplieData);
            return newDataJsonComments;
        }

        if(isReplie){
            for(let elementReplie of newDataJsonComments[i].replies){
                if(elementReplie.id === id){
                    newDataJsonComments[i].replies.push(newReplieData);
                    return newDataJsonComments;
                }
            }
        }
    };
}

function handleDeleteComment(id){
    for(let i in dataJson.comments){
        if(dataJson.comments[i].id === id){
            dataJson.comments.splice(i, 1);
            handleRenderFeed();
            return;
        }


        if(dataJson.comments[i].replies.length > 0){    
            for(let z in dataJson.comments[i].replies){
                if(dataJson.comments[i].replies[z].id === id){
                    dataJson.comments[i].replies.splice(z, 1);
                    handleRenderFeed();
                    return;
                }
            }
        }
    }
}