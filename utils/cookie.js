export function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name, value) {

    let date = new Date(Date.now() + 86400e3);
    date = date.toUTCString();

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    let options = `expires=" + ${date}`

    document.cookie = `${updatedCookie}; ${options}`;
}

export function deleteCookie(name) {
    setCookie(name, "", {
        'max-age': -1
    })
}
