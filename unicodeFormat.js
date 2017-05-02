
var str = "\u770b\u5230\u4e86\u5417\uff1f";
console.log(str.toString("UTF-8"));

var str1 = "看到了吗？";


function encode2(s) {
    var i, c, ret = [],
        pad = '000';
    for (i = 0; i < s.length; i++) {
        c = s.charCodeAt(i);
        if (c > 256) {
            c = c.toString(16);
            ret[i] = '\\u' + pad.substr(0, 4 - c.length) + c;
        } else {
            ret[i] = s[i];
        }
    }
    return ret.join('');
}

var str3 = encode2(str1);

function decode(s) {
    return unescape(s.replace(/\\(u[0-9a-fA-F]{4})/gm, '%$1'));
}
console.log(decode(str3));