var main_table = document.getElementById("oSmallList");
var games = main_table.getElementsByClassName("game");

var games_set = new Set();
var games_text = "";

for(i = games.length - 1; i >= 0; i--) {
    games_set.add(games[i].firstChild.textContent);
    games_text += games[i].firstChild.textContent + " ";
}

var filter_div = document.getElementsByClassName("filter")[0]; 

var horizontal_rule = document.createElement("hr");
filter_div.appendChild(horizontal_rule);

var filter_span = document.createElement("span");
filter_div.appendChild(filter_span);

Array.from(games_set).sort().forEach(function(game) {
    var checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", game);
    checkbox.setAttribute("value", game);
    checkbox.setAttribute("checked", "");
    checkbox.addEventListener("change", function(event){    
        var hide;
    
        if (this.checked) {
            hide = true;
        } else {
            hide = false;
        }
    
        Array.from(games).forEach(element => {
            if(element.firstChild.textContent == event.target.id) {
                element.parentElement.style.display = hide ? '' : 'none';
            }
        });
    });
    filter_span.appendChild(checkbox);
    
    var label = document.createElement("span");
    label.setAttribute("id", game);
    label.textContent = game;
    filter_span.appendChild(label);
    
    var br1 = document.createElement("br");
    filter_span.appendChild(br1);
});

var select_all_span = document.createElement("span");
filter_div.appendChild(select_all_span);

var br1 = document.createElement("br");
select_all_span.appendChild(br1);

var select_all = document.createElement("input");
select_all.setAttribute("type", "checkbox");
select_all.setAttribute("id", "Select All");
select_all.setAttribute("value", "Select All");
select_all.setAttribute("checked", "");
select_all.addEventListener("change", function(event) {
    var all_checkboxes = filter_span.children;

    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("change", false, true);

    Array.from(all_checkboxes).forEach(cb =>{
       cb.checked = this.checked;
       cb.dispatchEvent(evt);
    });
}, false);
select_all_span.appendChild(select_all);

var label = document.createElement("span");
label.setAttribute("id", "Select All");
label.textContent = "Select All";
select_all_span.appendChild(label);
