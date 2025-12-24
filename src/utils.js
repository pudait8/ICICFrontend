var Conf = require('./config').default

exports.setGeoLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            localStorage.setItem("PudaLatitude", position.coords.latitude)
            localStorage.setItem("PudaLongitude", position.coords.longitude)
        })

        navigator.geolocation.watchPosition(position => {
            localStorage.setItem("PudaLatitude", position.coords.latitude)
            localStorage.setItem("PudaLongitude", position.coords.longitude)
        })
    }
}

exports.getGeoLocation = () => {
    const PudaLatitude = localStorage.getItem('PudaLatitude')
    const PudaLongitude = localStorage.getItem('PudaLongitude')

    return { Latitude: PudaLatitude, Longitude: PudaLongitude }
}

exports.getArchitectToken = () => {
    const ArchitectToken = localStorage.getItem('PudaArchitectToken')
    const ArchitectTokenKey = localStorage.getItem('PudaArchitectTokenKey')
    const EnterprenurId = localStorage.getItem('PudaEnterprenurId')

    return { ArchitectToken: ArchitectToken, ArchitectTokenKey: ArchitectTokenKey, EnterprenurId: EnterprenurId }
}


exports.setLang = (lang) => {
    localStorage.setItem("PudaLang", lang)
}

exports.getLang = () => {
    let lang = localStorage.getItem('PudaLang')
    if (lang) {
        return lang
    } else {
        return "en"
    }
}

exports.windowPath = () => {
    var windowPath = window.location.pathname
    var basename = Conf.basename
    if (windowPath.startsWith(basename)) {
        var windowPath = windowPath.replace(basename, "");
    }

    return '/' + windowPath
}

exports.isUserLoggedIn = () => {
    const PudaArchitectToken = localStorage.getItem('PudaArchitectToken')
    if (PudaArchitectToken) {
        return true
    } else {
        return false
    }
}

exports.getAuthUser = () => {
    return JSON.parse(localStorage.getItem('PudaAuthUser'))
}

exports.getOrgId = () => {
    const PudaOrgId = localStorage.getItem('PudaOrgId')
    return PudaOrgId
}

exports.setOrgId = (PudaOrgId) => {
    localStorage.setItem('PudaOrgId', PudaOrgId)
    return true
}

exports.getTollFree = () => {
    const PudaTollFree = localStorage.getItem('PudaTollFree')
    return PudaTollFree
}

exports.setTollFree = (PudaTollFree) => {
    localStorage.setItem('PudaTollFree', PudaTollFree)
    return true
}

exports.getAuthData = () => {
    const PudaAuthId = localStorage.getItem('PudaAuthToken')
    const PudaAuthKey = localStorage.getItem('PudaAuthTokenKey')

    return { AuthId: PudaAuthId, AuthKey: PudaAuthKey }
}

exports.getIsIntroDisplayed = () => {
    const PudaIsIntroDisplayed = localStorage.getItem('PudaIsIntroDisplayed')
    return PudaIsIntroDisplayed
}

exports.setIsIntroDisplayed = () => {
    localStorage.setItem('PudaIsIntroDisplayed', true)
}

exports.inr = (num) => {
    let n = parseFloat(num)
    let negativeNumber = false
    if (n < 0) {
        negativeNumber = true
        n = n * -1
    }
    var x = n.toString();
    var afterPoint = '';
    if (x.indexOf('.') > 0)
        afterPoint = x.substring(x.indexOf('.'), x.length);
    x = Math.floor(x);
    x = x.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers != '')
        lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint

    if (negativeNumber) {
        return "-" + res
    } else {
        return res
    }
}

exports.price_in_words = (price) => {
    var sglDigit = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"],
        dblDigit = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"],
        tensPlace = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"],
        handle_tens = function (dgt, prevDgt) {
            return 0 == dgt ? "" : " " + (1 == dgt ? dblDigit[prevDgt] : tensPlace[dgt])
        },
        handle_utlc = function (dgt, nxtDgt, denom) {
            return (0 != dgt && 1 != nxtDgt ? " " + sglDigit[dgt] : "") + (0 != nxtDgt || dgt > 0 ? " " + denom : "")
        };

    var str = "",
        digitIdx = 0,
        digit = 0,
        nxtDigit = 0,
        words = [];
    if (price += "", isNaN(parseInt(price))) str = "";
    else if (parseInt(price) > 0 && price.length <= 10) {
        for (digitIdx = price.length - 1; digitIdx >= 0; digitIdx--) switch (digit = price[digitIdx] - 0, nxtDigit = digitIdx > 0 ? price[digitIdx - 1] - 0 : 0, price.length - digitIdx - 1) {
            case 0:
                words.push(handle_utlc(digit, nxtDigit, ""));
                break;
            case 1:
                words.push(handle_tens(digit, price[digitIdx + 1]));
                break;
            case 2:
                words.push(0 != digit ? " " + sglDigit[digit] + " Hundred" + (0 != price[digitIdx + 1] && 0 != price[digitIdx + 2] ? " and" : "") : "");
                break;
            case 3:
                words.push(handle_utlc(digit, nxtDigit, "Thousand"));
                break;
            case 4:
                words.push(handle_tens(digit, price[digitIdx + 1]));
                break;
            case 5:
                words.push(handle_utlc(digit, nxtDigit, "Lakh"));
                break;
            case 6:
                words.push(handle_tens(digit, price[digitIdx + 1]));
                break;
            case 7:
                words.push(handle_utlc(digit, nxtDigit, "Crore"));
                break;
            case 8:
                words.push(handle_tens(digit, price[digitIdx + 1]));
                break;
            case 9:
                words.push(0 != digit ? " " + sglDigit[digit] + " Hundred" + (0 != price[digitIdx + 1] || 0 != price[digitIdx + 2] ? " and" : " Crore") : "")
        }
        str = words.reverse().join("")
    } else str = "";
    return str
}