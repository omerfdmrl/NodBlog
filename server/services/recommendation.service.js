const raccoon = require('raccoon');
raccoon.config.className = 'yue';

const like = (slug,user,data) => {
    if(!user || !data) return false;
    raccoon.liked(user.toString(),slug + '-' + data.toString())
}

const unlike = (slug,user,data) => {
    if(!user || !data) return false;
    raccoon.liked(user.toString(),slug + '-' + data.toString())
}

const dislike = (slug,user,data) => {
    if(!user || !data) return false;
    raccoon.disliked(user.toString(),slug + '-' + data.toString())
}

const undislike = (slug,user,data) => {
    if(!user || !data) return false;
    raccoon.undisliked(user.toString(),slug + '-' + data.toString())
}

const recommend = async (user, skip = 0, take = 5) => {
    if(!user) return false;
    return await raccoon.recommendFor(user.toString(), skip,take);
}

const mostLiked = async (skip = 0, take = 5) => {
    return await raccoon.mostLiked(skip,take);
}

const bestRated = async (skip = 0, take = 5) => {
    return await raccoon.bestRated(skip,take);
}

const mostSimilarUsers = async (user, skip = 0, take = 5) => {
    if(!user) return false;
    return await raccoon.mostSimilarUsers(skip,take);
}

module.exports = {
    like,
    unlike,
    dislike,
    undislike,
    recommend,
    mostLiked,
    bestRated,
    mostSimilarUsers
}