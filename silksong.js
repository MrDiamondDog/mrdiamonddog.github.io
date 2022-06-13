// DATES SUCK
// https://stackoverflow.com/questions/14764029/javascript-time-until
//
// Convert string in ISO8601 format to date object
// e.g. 2013-02-08T02:40:00Z
//

const ReleaseDate = "2023-06-12T00:00:00Z";

function isoToObj(s) {
    var b = s.split(/[-TZ:]/i);

    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5]));
}

function timeToGo(s) {
    function z(n) {
        return (n < 10? '0' : '') + n;
    }

    var d = isoToObj(s);
    var now = new Date();
    var diff = d.getTime() - now.getTime();

    if (diff < 0) {
        return 'Now!';
    }
    
    // get how many days, hours, and minutes there are left. NOT THE TOTAL AMOUNT
    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var secs = Math.floor((diff % (1000 * 60)) / 1000);

    // Return formatted string
    return days + ":" + z(hours) + ':' + z(mins) + ':' + z(secs);   
}

async function onload(){
    document.getElementById("time-left").innerHTML = "Time left until window closes: " + timeToGo(ReleaseDate);
    await sleep(50);
    onload();
}

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    });
}