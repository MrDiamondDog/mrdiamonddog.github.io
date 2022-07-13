var coll = document.getElementsByClassName("collapsible");
var i;

start();

async function start(){
    await sleep(1000);
    for (i = 0; i < coll.length; i++) {
        console.log(coll[i]);
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = document.getElementsByName(this.name + "content")[0];
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    }
}