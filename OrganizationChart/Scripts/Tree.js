
var tree = function (opt) {

    var exMsg = "Option must be provided as constructor argument and must be json array with minimum field(s) \nEg. {chartDiv: 'Div id to display chart', \nurl: 'page url for node DML Operation',\n select: 'method name to get data to create chart',\n insert: 'method name to add data in db',\n update: 'method name to update data in db',\n del: 'method name to delete data from db' }";
    if (opt == undefined && typeof (opt) != "object")
        throw exMsg

    //var mustBe = ["chartDiv", "url", "insert", "select", "update", "del"];
    var mustBe = ["chartDiv", "getTree", "addNode", "updateNode", "deleteNode"];
    var optArr = Object.keys(opt);
    for (var i = 0; i < mustBe.length; i++) {
        if (optArr.indexOf(mustBe[i]) == -1) {
            throw "Field {" + mustBe[i] + "} is missing in option array\n";// + exMsg;
        }
    }

    if (!document.getElementById(conf.chartDiv))
        "Div " + conf.chartDiv + " not found in page";

    if (!document.getElementById(conf.chartManager))
        "Div " + conf.chartDiv + " not found in page";

    this.treeId = "tree_" + Math.floor((new Date().getTime()) / Math.floor(Math.random() * 1000));
    this.chartSetting = opt;
};

tree.prototype.getSetting = function () {
    return this.chartSetting;
}

tree.prototype.getChartId = function () {
    return this.treeId;
}

tree.prototype.makeTree = function (jsonString) {

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'node');
    data.addColumn('string', 'parentNode');
    data.addColumn('string', 'ToolTip');

    var conf = this.getSetting();

    if (jsonString == undefined || jsonString == null || jsonString == "")
        jsonString = tree.prototype.execAjax(conf.getTree,{});

    var jsonData = eval(jsonString);

    for (var i = 0; i < jsonData.length; i++) {

        var hiddenData = "[{NodeId:'" + jsonData[i].NodeId + "',ParentNodeId:'" + jsonData[i].ParentNodeId + "', IsLeaf:" + jsonData[i].IsLeaf + ", chartId:'" + this.getChartId() + "'}]";
        data.addRows([[{
            v: jsonData[i].NodeId,
            f: jsonData[i].NodeText + "<input type=\"hidden\" id=\"hdn_" + i + "\" name=\"hdn_tree_node\" value=\"" + hiddenData + "\">"
        }, jsonData[i].ParentNodeId, jsonData[i].Tooltip]]);
    }

    // Create the chart.
    var chart = new google.visualization.OrgChart(document.getElementById(conf.chartDiv));

    // Draw the chart, setting the allowHtml option to true for the tooltips.
    chart.draw(data, { allowHtml: true, allowCollapse: true });
    //

//    google.visualization.events.addListener(chart, 'onmouseout', function (e) {
//        $(".tree_nodeAddRemoveOptContainer").remove();
//    });

    google.visualization.events.addListener(chart, 'onmouseover', function (e) {
        var rowId = e.row;
        var elm = document.getElementById("hdn_" + rowId);

        $(".tree_nodeAddRemoveOptContainer").remove();

        var obj = eval(elm.value);
        //console.log(obj);
        var addBtn = document.createElement("input");
        addBtn.setAttribute("type", "button");
        addBtn.setAttribute("value", "+");
        addBtn.setAttribute("class", "tree_nodeAddRemoveOpt");
        addBtn.setAttribute("id", "btnAdd_" + rowId);
        addBtn.addEventListener("click", function (e) {
            alert("Add Node");            
            obj[0]["url"] = conf.addNode;
            tree.prototype.MakepopUp(obj);
        }, false);

        var removeBtn = null;
        if (obj[0].IsLeaf == true) {
            removeBtn = document.createElement("input");
            removeBtn.setAttribute("type", "button");
            removeBtn.setAttribute("value", "-");
            removeBtn.setAttribute("class", "tree_nodeAddRemoveOpt");
            removeBtn.setAttribute("id", "btnDell" + rowId);
            removeBtn.addEventListener("click", function (e) {
                if (confirm("Are you sure to delete this node?")) {
                    console.lo(obj);
                    //alert("Delete Node");
                    //obj[0]["MethodName"] = conf.del;
                   // var delRes = tree.prototype.execAjax(conf.deleteNode, obj[0]);
                }
                else {
                    $(".tree_nodeAddRemoveOptContainer").remove();
                }

            }, false);
        }

        var btnContainer = document.createElement("div");
        btnContainer.setAttribute("class", "tree_nodeAddRemoveOptContainer");
        btnContainer.setAttribute("id", "tree_nodeAddRemoveOptContainer_" + rowId);
        $(btnContainer).append(addBtn);

        if (obj[0].IsLeaf == true) {
            $(btnContainer).append(removeBtn);
        }
        // $(btnContainer).append(clearAction);
        elm.parentNode.insertBefore(btnContainer, elm.nextSibling);
    });
};

tree.prototype.execAjax = function (pageUrl, dataToSend) {
    //console.log(dataToSend);
    var dataToReturn;
    $.ajax({
        type: "POST",
        url: pageUrl,
        async: false,
        data: dataToSend,
        success: function (response, status, xhr) {
            dataToReturn = response;
        },
        error: function (request, error) {
            dataToReturn = { "errorCode": "101", "errorMsg": error };
        }
    });
    return dataToReturn;
}

tree.prototype.MakepopUp = function (arg) {

    $("#treeManager_" + arg[0].chartId).remove();

    /*Pop-up control list*/
    var cl = [{ label: 'Node Text', id: 'NodeText', class: 'form-ctrl tree-manager-ctrl' }
                        , { label: 'Tool tip', id: 'toolTip', class: 'form-ctrl  tree-manager-ctrl'}];

    var popBody = document.createElement("div");
    popBody.setAttribute("class", "pop-body");

    for (var i = 0; i < cl.length; i++) {
        var treeManagerLabel = document.createElement("label");
        treeManagerLabel.appendChild(document.createTextNode(cl[i].label));

        var  treeManagerCtrl = null;
        treeManagerCtrl = document.createElement("input");
        treeManagerCtrl.setAttribute("type", "text");
        treeManagerCtrl.setAttribute("class", cl[i].class);
        treeManagerCtrl.setAttribute("id", cl[i].id);
        
        var formElement = document.createElement("div");
        formElement.setAttribute("class", "form-element");

        $(formElement).append(treeManagerLabel);
        $(formElement).append(treeManagerCtrl);
        $(popBody).append(formElement);
    }

    var popupForm = document.createElement("div");
    popupForm.setAttribute("class", "popup-form");
    var h1 = document.createElement("h1");
    h1.appendChild(document.createTextNode("Manage Tree"));

    popupForm.appendChild(h1);
    popupForm.appendChild(popBody);

    var popupInner = document.createElement("div");
    popupInner.setAttribute("class", "popup-inner");

    var saveAction = document.createElement("input");
    saveAction.setAttribute("data-popup-close", "popup-area");
    saveAction.setAttribute("type", "button");
    saveAction.setAttribute("value", " Save ");
    saveAction.addEventListener("click", function (e) {

        var dataToSend = {};

        var kl = Object.keys(arg[0]);

        for (var i = 0; i < kl.length; i++) {
            if (kl[i] != "url") {
                dataToSend[kl[i]] = arg[0][kl[i]];
            }
        }

        for (var i = 0; i < cl.length; i++) {
            dataToSend[cl[i].id] = document.getElementById(cl[i].id).value;
        }

        var res = tree.prototype.execAjax(arg[0].url, dataToSend);

    }, false);

    var closePopup = document.createElement("a");
    closePopup.setAttribute("class", "popup-close");
    closePopup.setAttribute("data-popup-close", "popup-area");
    closePopup.setAttribute("title", " Close ");
    closePopup.setAttribute("id", "Close_treeManager_" + arg[0].chartId);
    closePopup.setAttribute("href", "javascript:void(0);");
    closePopup.appendChild(document.createTextNode("X"));
    closePopup.addEventListener("click", function (e) {
        $("#treeManager_" + arg[0].chartId).remove();
    }, false);

    popupInner.appendChild(popupForm);
    popupInner.appendChild(saveAction);
    popupInner.appendChild(closePopup);

    var popup = document.createElement("div");
    popup.setAttribute("class", "popup");
    popup.setAttribute("data-popup", "popup-area");
    popup.setAttribute("id", "treeManager_" + arg[0].chartId);
    popup.appendChild(popupInner);
    (document.getElementsByTagName('body'))[0].appendChild(popup);
}