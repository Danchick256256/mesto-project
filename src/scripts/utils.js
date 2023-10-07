export const getMeta = (url, callback) => {
    const img = new Image();
    img.src = url;
    img.onload = function() { callback(this.width, this.height); }
}