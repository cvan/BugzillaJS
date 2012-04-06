var $shortcuts = $('<div>', {'class': 'shortcuts'}).hide(),
    $shortcuts_table = $('<table>'),
    kbCallback = {},
    is_focused = false;

var kbMap = {',': '188'};

$shortcuts.append($shortcuts_table);

function addShortcut(key, title, callback) {
    /* Do something */
    var keycode =  "";
    for(var i=0;i<key.length;i++) {
        keycode += (key[i] in kbMap ? kbMap[key[i]] : key.charCodeAt(i)) + "_";
    }
    keycode = keycode.slice(0,-1);

    if(typeof callback == "string") {
        var url = callback;
        callback = function() { unsafeWindow.location = url };
    }

    kbCallback[keycode] = callback;

    /* Add to menu */
    var $tr = $('<tr>'),
        $td1 = $('<td>', {'class': 'left'}),
        $td2 = $('<td>', {'text': title});

    if(key[0] == "g") {
        $td1.append($('<strong>', {'text': key[0]}));
        $td1.append($('<em>', {'text': 'then'}));
        $td1.append($('<strong>', {'text': key[1]}));
    } else {
        $td1.append($('<strong>', {'text': key}));
    }

    $td1.append($('<span>', {'text': ':'}));

    $shortcuts_table.append($tr);
    $tr.append($td1);
    $tr.append($td2);

}

var last_g = "";
$(unsafeWindow).keypress(function(e) {
    if($(e.target).is('input, textarea, select') || e.ctrlKey || e.metaKey || e.altKey) return;

    var keycode = last_g + e.which;

    if(keycode in kbCallback) {
        e.preventDefault();
        kbCallback[keycode]();
    }
    last_g = e.which == 103 ? "103_" : "";
});

setTimeout(function() {
    $('html').focus(); // Some fields auto-focus, which ruins this.
}, 200);

$('body').append($shortcuts);




/* ======================
 * Shortcuts
 * ====================== */
addShortcut('?', 'View shortcuts', function() {
    $shortcuts.toggle();
});

addShortcut('n', 'File a new bug', function() {
    alert('This will soon be a "file it" box!');
    unsafeWindow.location = './enter_bug.cgi';
});

addShortcut('r', 'Reply to bug', function() {
    $('#comment').focus();
});

addShortcut('s', 'Search', function() {
    var qs = $('#quicksearch_main');
    if(!qs.length) {
        qs = $('#quicksearch_top');
    }
    qs.val("").focus();
});

addShortcut('gh', 'Go Home', './');

addShortcut('gn', 'Go to new bug page', './enter_bug.cgi');

addShortcut('gb', 'Go to bug #___', function() {
    var bug = prompt("What is the bug number?");
    if(bug) {
        unsafeWindow.location = './show_bug.cgi?id=' + bug;
    }
});

addShortcut('gs', 'Go to advanced search', './query.cgi?format=advanced');

addShortcut('gp', 'Go to preferences', './userprefs.cgi');

addShortcut('g,', 'Go to BugzillaJS prefs', function() {
    alert('BugzillaJS prefs!');
});