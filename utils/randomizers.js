exports.getRandomString = function (len, addtime, charSet) {
    len =  typeof len == 'number' ? len : 5;
    addtime = typeof addtime == 'boolean' ? addtime : false;
    charSet = typeof charSet == 'string' ? charSet : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    var text = "";

    for (var i = 0; i < len; i++)
        text += charSet.charAt(Math.floor(Math.random() * charSet.length));

    return text + (addtime ? new Date().getTime() : '');
};