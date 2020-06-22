chrome.storage.sync.get({
        countItems: true
    }, function(items, count_items) {
        onStorage(items.countItems);
    });


function onStorage(count_items) {
    var main_table = document.getElementById("oSmallList");
    var games = main_table.getElementsByClassName("game");

    var games_map = new Map();
    var games_text = "";
    var filtered_points = 0;
    var filtered_xp = 0;

    for (i = games.length - 1; i >= 0; i--) {
        games_map.set(games[i].firstChild.textContent, games_map.has(games[i].firstChild.textContent) ? games_map.get(games[i].firstChild.textContent) + 1 : 1 );
        games_text += games[i].firstChild.textContent + " ";
        filtered_points += sanitiseAndParse( games[i].parentElement.children[4].textContent);
        filtered_xp +=  sanitiseAndParse(games[i].parentElement.children[5].firstChild.textContent);
    }

    var filtered_games = games_map.size;
    var filtered_items = games.length;

    var filter_div = document.getElementById("main");
    var tt_todo_div = document.createElement("div");
    tt_todo_div.setAttribute("class", "tt-todo-div");
    filter_div.insertBefore(tt_todo_div, document.getElementsByClassName("information")[0]);

    var horizontal_rule = document.createElement("hr");
    tt_todo_div.appendChild(horizontal_rule);

    var filter_span = document.createElement("span");
    tt_todo_div.appendChild(filter_span);

    var info_span = document.getElementsByClassName("information")[0];
    var filter_info_br = document.createElement("br");
    var filterd_info_span = document.createElement("span");
    info_span.insertBefore(filter_info_br, info_span.firstChild);
    info_span.insertBefore(filterd_info_span, filter_info_br);

    Array.from(games_map.keys()).sort().forEach(function (game) {
        var checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("id", game);
        checkbox.setAttribute("value", game);
        checkbox.setAttribute("checked", "");
        checkbox.addEventListener("change", function (event) {
            var hide;

            if (this.checked) {
                hide = true;
                filtered_games++;
            } else {
                hide = false;
                filtered_games--;
            }

            Array.from(games).forEach(element => {
                if (element.firstChild.textContent == event.target.id) {
                    element.parentElement.style.display = hide ? '' : 'none';
                    if (hide) {
                        filtered_items++;
                        filtered_points += sanitiseAndParse( element.parentElement.children[4].textContent);
                        filtered_xp +=  sanitiseAndParse(element.parentElement.children[5].firstChild.textContent);
                    } else {
                        filtered_items--;
                        filtered_points -= sanitiseAndParse(element.parentElement.children[4].textContent);
                        filtered_xp -=  sanitiseAndParse(element.parentElement.children[5].firstChild.textContent);

                    }
                }
            });

            filterd_info_span.textContent = "There are " + filtered_items + " items from " +
                filtered_games + " filtered games in your To-Do list."
            +" In total, they are worth " + Number(filtered_points).toLocaleString() + " True points (" + Number(filtered_xp).toLocaleString() + " XP)"
        });
        filter_span.appendChild(checkbox);

        var label = document.createElement("span");
        label.setAttribute("id", game);
        label.textContent = game + (count_items ?  " - [" + games_map.get(game) + "]" : "");
        filter_span.appendChild(label);

        var br1 = document.createElement("br");
        filter_span.appendChild(br1);
    });

    // Platform checkboxes
    var platform_hr = document.createElement("hr");
    tt_todo_div.appendChild(platform_hr);

    var platform_span = document.createElement("span");
    tt_todo_div.appendChild(platform_span);

    // PS3
    var ps3_checkbox = document.createElement("input");
    ps3_checkbox.setAttribute("type", "checkbox");
    ps3_checkbox.setAttribute("id", "PS3");
    ps3_checkbox.setAttribute("value", "PS3");
    ps3_checkbox.setAttribute("checked", "");
    ps3_checkbox.addEventListener("change", function(event){
        var all_checkboxes = filter_span.children;

        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("change", false, true);

        Array.from(all_checkboxes).forEach(cb => {
            if(cb.id.includes('PS3')){
                cb.checked = this.checked;
                cb.dispatchEvent(evt);
            }
        });
    }, false);
    platform_span.appendChild(ps3_checkbox);
    
    var ps3_label = document.createElement("span");
    ps3_label.setAttribute("id", "PS3");
    ps3_label.textContent = "PS3";
    platform_span.appendChild(ps3_label);

    var br3 = document.createElement("br");
    platform_span.appendChild(br3);

    // PS4
    var ps4_checkbox = document.createElement("input");
    ps4_checkbox.setAttribute("type", "checkbox");
    ps4_checkbox.setAttribute("id", "PS4");
    ps4_checkbox.setAttribute("value", "PS4");
    ps4_checkbox.setAttribute("checked", "");
    ps4_checkbox.addEventListener("change", function(event){
        var all_checkboxes = filter_span.children;

        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("change", false, true);

        Array.from(all_checkboxes).forEach(cb => {
            if(!cb.id.includes('PS3')){
                cb.checked = this.checked;
                cb.dispatchEvent(evt);
            }
        });
    }, false);
    platform_span.appendChild(ps4_checkbox);
    
    var ps4_label = document.createElement("span");
    ps4_label.setAttribute("id", "PS4");
    ps4_label.textContent = "PS4";
    platform_span.appendChild(ps4_label);


    // Select all and breaks around it
    var hr2 = document.createElement("hr");
    tt_todo_div.appendChild(hr2);

    var select_all_span = document.createElement("span");
    tt_todo_div.appendChild(select_all_span);

    var select_all = document.createElement("input");
    select_all.setAttribute("type", "checkbox");
    select_all.setAttribute("id", "Select All");
    select_all.setAttribute("value", "Select All");
    select_all.setAttribute("checked", "");
    select_all.addEventListener("change", function (event) {
        var all_checkboxes = filter_span.children;

        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("change", false, true);

        Array.from(all_checkboxes).forEach(cb => {
            if (cb.checked != this.checked) {
                cb.checked = this.checked;
                cb.dispatchEvent(evt);
            }
        });
    }, false);
    select_all_span.appendChild(select_all);

    var label = document.createElement("span");
    label.setAttribute("id", "Select All");
    label.textContent = "Select All";
    select_all_span.appendChild(label);
}

function sanitiseAndParse(input) {
    return parseInt(
        input
            .replace("(", "")
            .replace(",", "")
            .replace(")", "")
    );
}