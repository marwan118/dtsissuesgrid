onRowClicked = function(rowInfo) {
    item = rowInfo.item;
    index = rowInfo.itemIndex;
    event = rowInfo.event;
    console.log("Row Clicked.")
};


onIssueButtonClick = function(event, item) {
    operateIssue(event.target);
};


bindClickHandler = function() {
    for (var i = 0; i < $("input[class^='passButton']").length; i++) {
        $($("input[class^='passButton']")[i]).bind("click", onIssueButtonClick);
        $($("input[class^='failButton']")[i]).bind("click", onIssueButtonClick);
    }
    for (var i = 0; i < $("input[class^='testButton']").length; i++) {
        $($("input[class^='testButton']")[i]).bind("click", onIssueButtonClick);
    }
};

$("#dtsIssueGrid").jsGrid({
    width: "100%",
    height: "80%",
    inserting: false,
    editing: false,
    sorting: true,
    paging: true,
    confirmDeleting: false,
    onRefreshed:bindClickHandler,
    data: issues,
    fields: [{
        name: "Ticket No",
        type: "text",
        width: "150",
        itemTemplate: function(value, item) {
            return $("<a href='" + item['Link'] + "' target='_blank'>").addClass("divwarpper").text(value);
        }
    }, {
        name: "Brief",
        type: "text",
        width: 800,
        itemTemplate: function(value, item) {
            return $("<div title='" + item.Brief + "''>").addClass("divwarpper").text(value);
        }
    }, {
        name: "Feature",
        type: "text",
        width: "auto",
        itemTemplate: function(value) {
            return $("<div>").addClass("divwarpper").text(value);
        }
    }, {
        name: "Created Time",
        type: "text",
        width: "auto",
        itemTemplate: function(value) {
            return $("<div>").addClass("divwarpper").text(value);
        }
    }, {
        name: "Creator",
        type: "text",
        width: "auto",
        itemTemplate: function(value) {
            return $("<div>").addClass("divwarpper").text(value);
        }
    }, {
        name: "Severity",
        type: "text",
        width: "auto",
        itemTemplate: function(value) {
            return $("<div>").addClass("divwarpper").text(value);
        }
    }, {
        name: "Current Status",
        type: "text",
        width: "auto",
        itemTemplate: function(value) {
            return $("<div>").addClass("divwarpper").text(value);
        }
    }, {
        name: "Current Handler",
        type: "text",
        width: "auto",
        itemTemplate: function(value) {
            return $("<div>").addClass("divwarpper").text(value);
        }
    }, {
        name: "operation",
        type: "control",
        width: 250,
        itemTemplate: function(value, item) {
            switch (item["Current Status"]) {
                case "Close":
                    return $("<input type='button' value='Cross Test' class='testButton_" + item["Ticket No"] + "'>");
                    break;
                case "Solution Implementation":
                    return $("<input type='button' value='Test Passed' class='passButton_" + item["Ticket No"] + "'><input type='button' value='Test Failed' class='failButton_" + item["Ticket No"] + "'>");
                    break;
                default:
                    break;
            }
        }
    }]
});

$(document).ready(function() {
    bindClickHandler();
});
operateIssue = function(elem) {
    issueButton = elem;
    easyDialog.open({
        container: {
            content: '是否确定进行操作？',
            yesFn: function() {
                $("#dtsIssueGrid").jsGrid("deleteItem", issueButton.parentNode.parentNode);
                if ($(issueButton).attr("class").indexOf("passButton_") != -1) {
                    console.log("单号：" + $(issueButton).attr("class").replace("passButton_", "") + " 交叉验证通过")
                }
                if ($(issueButton).attr("class").indexOf("failButton_") != -1) {
                    console.log("单号：" + $(issueButton).attr("class").replace("failButton_", "") + " 交叉验证失败")
                }
                if ($(issueButton).attr("class").indexOf("testButton_") != -1) {
                    console.log("单号：" + $(issueButton).attr("class").replace("testButton_", "") + " 提交交叉验证")
                }
                // bindClickHandler();
            },
            noFn: true
        }
    });
};
