$(window).on('load', function () {

    var login = 'bilel';
    var password = 'bilel';

    httpPost("http://localhost/ServeurWebApi/Api/Authentification/GetToken", { login, password }, function (token) {
        if (typeof (Storage) !== "undefined") {
            // Store
            sessionStorage.setItem("token", token);
            $("#txtToken").val(token);
        }
    });

    httpGet("http://localhost/ServeurWebApi/Api/Facture/GetListFacture", {}, function (listFactures) {

        $("#jsGrid").jsGrid({
            width: "100%",
            height: "400px",
            inserting: true,
            editing: true,
            sorting: true,
            paging: true,
            data: listFactures,
            fields: [
                { name: "IdFacture", type: "number", visible: false, },
                { name: "NoPiece", type: "text", width: 150, validate: "required" },
                { name: "Client", type: "text", width: 150 },
                { name: "DateFacture", type: "date", width: 150 },
                { name: "MontantTTC", type: "number", width: 50 },
                { type: "control" }
            ]
        });


        $("#jsGrid").jsGrid({

            onItemEditing: function (args) {
                // cancel editing of the row of item with field 'ID' = 0
                args.cancel = true;

                if (typeof (Storage) !== "undefined") {
                    // Store
                    sessionStorage.setItem("IdFacture", args.item.IdFacture);
                }
                    document.location.href = 'Facture.html';
              
            }
        });
    });
});

function httpPost(url, payload, cb) {
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(payload),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            cb(data);
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
    return false;
}

function httpGet(url, payload, cb) {
    $.ajax({
        type: "GET",
        url: url + "?" + serialize(payload),// url.com?x=1&y=2
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem("token"));
        },
        success: function (data) {
            cb(data);
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
    return false;
}

var serialize = function (obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
};