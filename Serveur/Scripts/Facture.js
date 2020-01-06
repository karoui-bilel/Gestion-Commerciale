var listProduits;
var IdFacture;

$(window).on('load', function () {

    IdFacture = sessionStorage.getItem("IdFacture");

    httpGet("http://localhost/ServeurWebApi/Api/Facture/GetListContacts", {}, function (listContacts) {
        $('#txtClients').empty();
        $.each(listContacts, function (index, client) {
            $('#txtClients').append('<option value="' + client.IdClient + '">' + client.Client + '</option>');
        });
    });

    function formatDate(dateString) {
        var date = new Date(dateString);
        var formatted = date.getFullYear();
        formatted += "-";
        var month = date.getMonth() + 1;
        formatted += month < 10 ? "0" + month : month;
        formatted += "-";
        var day = date.getDate();
        formatted += day < 10 ? "0" + day : day;
        return formatted;
    }

    httpGet("http://localhost/ServeurWebApi/Api/Facture/GetFacture", { IdFacture }, function (facture) {
        $("#txtNoPiece").val(facture.NoPiece);
        $("#txtDateFacture").val(formatDate(facture.DateFacture));
        $('#txtClients').val(facture.IdClient);
    });

    httpGet("http://localhost/ServeurWebApi/Api/Facture/GetListProduits", {}, function (result) {
        listProduits = result;

        $('#txtProduits').empty();
        $.each(listProduits, function (index, produit) {
            $('#txtProduits').append('<option value="' + produit.IdProduit + '">' + produit.Designation + '</option>');
        });

        remplirGrid();
    });
});

function remplirGrid() {

    httpGet("http://localhost/ServeurWebApi/Api/Facture/GetLignesFacture", { IdFacture }, function (listLignesFacture) {

        $("#gridLignesFacture").jsGrid({
            width: "100%",
            height: "200px",
            editing: true,
            autoload: true,
            paging: true,
            data: listLignesFacture,
            fields: [
                { name: "IdLigne", type: "number", visible: false, validate: "required" },
                { name: "IdProduit", type: "select", title: "Designation", items: listProduits, valueField: "IdProduit", textField: "Designation" },
                {
                    name: "Prix", type: "number", width: 50, validate: "required",
                    itemTemplate: function (value) {
                        return value.toFixed(2);
                    }
                },
                {
                    name: "Qte", type: "number", width: 50, validate: "required",
                    itemTemplate: function (value) {
                        return value.toFixed(2);
                    }
                },
                {
                    name: "MontantHT", type: "number", width: 50,
                    itemTemplate: function (value) {
                        return value.toFixed(2);
                    }
                },
                {
                    name: "TVA", type: "number", width: 50,
                    itemTemplate: function (value) {
                        return value.toFixed(2);
                    }
                },
                {
                    name: "MontantTTC", type: "number", width: 50,
                    itemTemplate: function (value) {
                        return value.toFixed(2);
                    }
                },
                { type: "control" }
            ]
        });

        $("#gridLignesFacture").jsGrid({

            onItemDeleting: function (args) {
                httpDelete("http://localhost/ServeurWebApi/Api/Facture/DeleteLigneDetailsFacutre", { IdLigne: args.item.IdLigne }, function (result) {

                    if (result) {
                        remplirGrid();
                    }
                });
            }
        });

        $("#gridLignesFacture").jsGrid({

            onItemEditing: function (args) {
                // cancel editing of the row of item with field 'ID' = 0
                args.cancel = true;

                $('.hover_bkgr_fricc').show();
                $('#txtIdLigne').val(args.item.IdLigne);
                $('#txtProduits').val(args.item.IdProduit);
                $('#txtDesignationProduit').val(args.item.Designation);
                $('#txtPrixProduit').val(args.item.Prix);
                $('#txtQteProduit').val(args.item.Qte);
                $('#txtTvaProduit').val(args.item.TVA);
                $('#btnUpdate').val("Modifier");

            }
        });
    });
}

function httpPost(url, payload, cb) {
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(payload),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            "Authorization": "Basic " + sessionStorage.getItem("token")
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

function httpGet(url, payload, cb) {
    $.ajax({
        type: "GET",
        url: url + "?" + serialize(payload),// url.com?x=1&y=2
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            "Authorization": "Basic " + sessionStorage.getItem("token")
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

function httpDelete(url, payload, cb) {
    $.ajax({
        type: "DELETE",
        url: url + "?" + serialize(payload),// url.com?x=1&y=2
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

var serialize = function (obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
};

$(function () {
    $("[id*=btnUpdate]").click(function () {

        //IdFacture = sessionStorage.getItem("IdFacture");

        var ligne = {

            IdFacture: IdFacture,
            IdLigne: $("#txtIdLigne").val(),
            IdProduit: $("#txtProduits").val(),
            Prix: $("#txtPrixProduit").val(),
            Qte: $("#txtQteProduit").val(),
            TVA: $("#txtTvaProduit").val(),
            Designation: $("#txtDesignationProduit").val()
        };


        httpPost("http://localhost/ServeurWebApi/Api/Facture/SetLigneDetailsFacutre", ligne, function (result) {

            if (result) {
                $('.hover_bkgr_fricc').hide();

                $('#txtIdLigne').empty();
                $('#txtPrixProduit').empty();
                $('#txtQteProduit').empty();
                $('#txtTvaProduit').empty();
                $('#btnUpdate').val("Ajouter");

                remplirGrid();
            }
        });
    });
});


$(function () {
    $("[id*=btnAjouter]").click(function () {


        $('.hover_bkgr_fricc').show();

        $('#txtIdLigne').val("0");
        $('#txtDesignationProduit').val("");
        $('#txtPrixProduit').val("0");
        $('#txtQteProduit').val("0");
        $('#txtTvaProduit').val("0");
        $('#btnUpdate').val("Ajouter");

    });
});

$(function () {
    $("[id*=txtProduits]").change(function () {

        var IdProduit= $("#txtProduits").val();
            httpGet("http://localhost/ServeurWebApi/Api/Facture/GetProduit", { IdProduit }, function (produit) {

                $('#txtDesignationProduit').val(produit.Designation);
                $('#txtPrixProduit').val(produit.Prix);
                $('#txtQteProduit').val("1");
                $('#txtTvaProduit').val(produit.TVA);

                $('#btnUpdate').val("Modifier");

            });
    });
});

$('#txtDesignationProduit').on('input', function () {
    var input = $(this);
    var is_name = input.val();
    if (is_name) { input.removeClass("has-error"); }
    else { input.removeClass("has-error"); }
});