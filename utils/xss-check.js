export default function (text) {
    if (text.match(/^<script>(.*)<\/script>$/ig)) {
        if (text.match(/[‘"'](.*)[’"']/) && text.match(/[‘"'](.*)[’"']/)[0]) {
            return text.match(/[‘"'](.*)[’"']/)[1];
        }
        return "";
    }
    return text;
}



