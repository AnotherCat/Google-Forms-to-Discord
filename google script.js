const POST_URL = "WEBHOOK URL";
const FORM_NAME = "FORM NAME";


function onSubmit(e) {
    var response = e.response.getItemResponses();
    var items = [];

    for (var i = 0; i < response.length; i++) {
        var question = response[i].getItem().getTitle();
        var answer = response[i].getResponse();

        if (answer == "") {
            continue;
        }
        /* NOTE: this script cannot handle checkboxes. (anything that'll return more than one 'answer')*/
        if (answer.length > 150){
          substring = answer.substring(0, 150);
          answer = substring.concat("--- continued.");
        }

        items.push({
          "name": question,
          "value": answer,
          "inline": false
        });
    }  

    var options = {
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
        },
        "payload": JSON.stringify({
            "content": "‌",
            "embeds": [{
                "title": `${FORM_NAME} form received`,
              "color": 33023, // This is optional, you can look for decimal colour codes at https://www.webtoolkitonline.com/hexadecimal-decimal-color-converter.html
                "fields": items,
            }]
        })
    };

    UrlFetchApp.fetch(POST_URL, options);
};
