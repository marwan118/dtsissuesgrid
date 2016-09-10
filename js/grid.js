onRowClicked = function(rowInfo) {
    item = rowInfo.item;
    index = rowInfo.itemIndex;
    event = rowInfo.event;
    console.log("Row Clicked.")
};

$("#dtsIssueGrid").jsGrid({
    width: "100%",
    height: "80%",
    inserting: false,
    editing: false,
    sorting: true,
    paging: true,
    confirmDeleting: false,
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

bindClickHandler = function() {
    for (var i = 0; i < $("input[class^='passButton']").length; i++) {
        $($("input[class^='passButton']")[i]).bind("click", onIssueButtonClick);
        $($("input[class^='failButton']")[i]).bind("click", onIssueButtonClick);
    }

    for (var i = 0; i < $("input[class^='testButton']").length; i++) {
        $($("input[class^='testButton']")[i]).bind("click", onIssueButtonClick);
    }
};

$(document).ready(function() {
    bindClickHandler();
});

operateIssue = function(elem) {
    issueButton = elem;
    easyDialog.open({
        container: {
            content: 'Are you sure?',
            yesFn: function() {

                $("#dtsIssueGrid").jsGrid("deleteItem", issueButton.parentNode.parentNode);

                if ($(issueButton).attr("class").indexOf("passButton_") != -1) {
                    console.log($(issueButton).attr("class").replace("passButton_", "") + " Tested Passed...")
                }

                if ($(issueButton).attr("class").indexOf("failButton_") != -1) {
                    console.log($(issueButton).attr("class").replace("failButton_", "") + " Tested Failed...")
                }

                if ($(issueButton).attr("class").indexOf("testButton_") != -1) {
                    console.log($(issueButton).attr("class").replace("testButton_", "") + " To Cross Test...")
                }

                bindClickHandler();
            },
            noFn: true
        }
    });
};

// doFailClickButton = function(event) {
//     operateIssue(event.target);
//     console.log($(event.target).attr("class").replace("failButton_", "") + " Tested Failed...");
// };

// doPassClickButton = function(event) {
//     operateIssue(event.target);
//     console.log($(event.target).attr("class").replace("passButton_", "") + " Tested Passed...");
// };

// doTestClickButton = function(event) {
//     operateIssue(event.target);
//     console.log($(event.target).attr("class").replace("testButton_", "") + " To Cross Test...");
// };

onIssueButtonClick = function(event, item) {
    operateIssue(event.target);
};
