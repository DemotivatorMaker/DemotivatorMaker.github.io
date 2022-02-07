function checkDevice() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {

        if(window.location.pathname == "/" || window.location.pathname == "/index.html"){
            document.getElementById("defaultstyle").remove();
            let elem = document.createElement( 'link' );
            elem.rel = 'stylesheet';
            elem.type = 'text/css';
            document.body.appendChild( elem );
            elem.href = '../styles/styleMobile.css';
        } else if(window.location.pathname == "/defaultdemotivator.html" || window.location.pathname == "/tuneldemotivator.html") {
            document.getElementById("defaultstyle").remove();
            let elem = document.createElement( 'link' );
            elem.rel = 'stylesheet';
            elem.type = 'text/css';
            document.body.appendChild( elem );
            elem.href = '../styles/style2Mobile.css';
        }
    
    }
}

checkDevice()