// Function to get hours difference
// y1 start date, y2 end date
function getHours(y1,m1,d1,h1,m1,s1,y2,m2,d2,h2,m2,s2){
    let startDt = new Date(y1, m1, d1, h1, m1, s1);
    let endDt = new Date(y2, m2, d2, h2, m2, s2);
    let diff = endDt - startDt;
    let secs = parseInt( diff /1000);
    let mins = secs / 60;
    let hours = mins / 60;
    return hours;
}

// Function to get mins difference
// y1 start date, y2 end date
function getMins(y1,m1,d1,h1,m1,s1,y2,m2,d2,h2,m2,s2){
    let startDt = new Date(y1, m1, d1, h1, m1, s1);
    let endDt = new Date(y2, m2, d2, h2, m2, s2);
    let diff = endDt - startDt;
    let secs = parseInt( diff /1000);
    let mins = secs / 60;
    let hours = mins / 60;
    return mins;
}