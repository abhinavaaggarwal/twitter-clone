import { tweetsData } from "./data.js";

const tweetInput = document.getElementById("tweet-input")
const tweetBtn = document.getElementById("tweet-btn")

document.addEventListener("click", function(e) {
    if(e.target.dataset.reply) {
        console.log(e.target.dataset.reply)
    }
    else if(e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like)
    }
    else if(e.target.dataset.retweet) {
        handleRetweetClick(e.target.dataset.retweet)
    }
})

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

function getFeedHtml() {
    let feedHtml = ``

    tweetsData.forEach(function(tweet){

        /* we have made these two variables to store the class that contains  the styling of clicked icons. So when a user click an icon we call render method to render the number of counts. So then we will append the class for the particular tweet*/
        let iconLikeClass = ""
        let iconRetweetClass = ""

        if(tweet.isLiked) {
            iconLikeClass = "liked"
        }

        if(tweet.isRetweeted) {
            iconRetweetClass = "retweeted"
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
                </div>   
            </div>            
        </div>
    </div>`
    })

    return feedHtml
}

function render() {
    document.getElementById("feed").innerHTML = getFeedHtml()
}

render()