import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

document.addEventListener("click", function(e) {
    if(e.target.dataset.reply) {
        handleReplyClick(e.target.dataset.reply)
    }
    else if(e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like)
    }
    else if(e.target.dataset.retweet) {
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if(e.target.id === "tweet-btn") {
        handleBtnClick()
    }
    else if(e.target.dataset.delete) {
        handleDeleteClick(e.target.dataset.delete)
    }
    else if(e.target.id === "send-reply-btn") {
        handleSendReplyBtn(e.target.dataset.send)
    }
    
    // console.log(e)
})

function handleReplyClick(tweetId) {
    const tweetIDObj = tweetsData.filter(function(tweet) {
        return tweet.uuid === tweetId
    })[0]
    console.log(tweetId)
    document.getElementById(`replies-${tweetIDObj.uuid}`).classList.toggle("hidden")
}

function handleLikeClick(tweetId) {
    const tweetIdObj = tweetsData.filter(function(tweet) {
        return tweet.uuid === tweetId
    })
    if(tweetIdObj[0].isLiked) {
       tweetIdObj[0].likes--
       tweetIdObj[0].isLiked = false
       
    }
    else{
        tweetIdObj[0].likes++
        tweetIdObj[0].isLiked = true
    }
    render()
}

function handleRetweetClick(tweetId) {
    const tweetIdObj = tweetsData.filter(function(tweet) {
        return tweet.uuid === tweetId
    })
    if(tweetIdObj[0].isRetweeted) {
       tweetIdObj[0].retweets--
       tweetIdObj[0].isRetweeted = false
    }
    else{
        tweetIdObj[0].retweets++
        tweetIdObj[0].isRetweeted = true
    }
    render()
}

function handleBtnClick() {

    const tweetInput = document.getElementById("tweet-input")

    if(tweetInput.value) {
        tweetsData.unshift({
            handle: `@Test_User`,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4() 
        })
        tweetInput.value = ""
        render()
    }
}

function handleDeleteClick(tweetId, index) {
    tweetsData.forEach(function(tweet) {
        if(tweet.uuid === tweetId) {
            tweetsData.splice(index, 1)
        }
    })

    render()
}

function handleSendReplyBtn(tweetId) {
    const tweetReplyText = document.getElementById("send-reply-text").value

    let tweetIDObj = tweetsData.filter(function(tweet) {
        return tweet.uuid === tweetId
    })[0]

    if(tweetReplyText) {
        tweetIDObj.replies.unshift({
            handle: `@Test_User`,
            profilePic: `images/scrimbalogo.png`,
            tweetText: tweetReplyText
        },) 
        
        render()
    }   
}

function getFeedHtml() {
    let feedHtml = ``

    tweetsData.forEach(function(tweet){

        /* we have made these two variables to store the class that contains  the styling of clicked icons. So when a user click an icon we call render method to render the number of counts. So then we will append the class for the particular tweet*/
        let iconLikeClass = ""
        let iconRetweetClass = ""
        let iconDeleteClass = "delete"

        if(tweet.isLiked) {
            iconLikeClass = "liked"
        }

        if(tweet.isRetweeted) {
            iconRetweetClass = "retweeted"
        }

        if(tweet.handle === "@Test_User") {
            iconDeleteClass = ""
        }

        let repliesHtml = `<div class="tweet-reply">
        <div class="tweet-inner">
            <img src="images/scrimbalogo.png" class="profile-pic">
                <div class="tweet-reply-area">
                    <textarea id="send-reply-text"></textarea>
                    <button id="send-reply-btn" data-send="${tweet.uuid}">Send</button>
                </div>
            </div>
    </div>`

        if(tweet.replies.length > 0) {
            tweet.replies.forEach(function(reply) {
                repliesHtml += `<div class="tweet-reply">
                <div class="tweet-inner">
                    <img src="${reply.profilePic}" class="profile-pic">
                        <div>
                            <p class="handle">${reply.handle}</p>
                            <p class="tweet-text">${reply.tweetText}</p>
                        </div>
                    </div>
            </div>`
            })
        }

        feedHtml += `<div class="tweet">
        <div class="tweet-inner">
            <img src="${tweet.profilePic}" class="profile-pic">
            <div>
                <p class="handle">${tweet.handle}</p>
                <p class="tweet-text">${tweet.tweetText}</p>
                <div class="tweet-details">
                    <span class="tweet-detail">
                        <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                        ${tweet.replies.length}
                    </span>
                    <span class="tweet-detail">
                        <i class="fa-solid fa-heart ${iconLikeClass}" data-like="${tweet.uuid}"></i>
                        ${tweet.likes}
                    </span>
                    <span class="tweet-detail">
                        <i class="fa-solid fa-retweet ${iconRetweetClass}" data-retweet="${tweet.uuid}"></i>
                        ${tweet.retweets}
                    </span>
                    <span class="tweet-detail ${iconDeleteClass}">
                        <i class="fa-solid fa-trash-can" data-delete="${tweet.uuid}"></i>
                    </span>
                </div>   
            </div>            
        </div>
        <div class="hidden" id="replies-${tweet.uuid}">
            ${repliesHtml}
        </div>
    </div>`
    })

    return feedHtml
}

function render() {
    document.getElementById("feed").innerHTML = getFeedHtml()
}

render()