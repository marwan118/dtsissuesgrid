onRowClicked = function(rowInfo) {
    item = rowInfo.item;
    index = rowInfo.itemIndex;
    event = rowInfo.event;
    console.log("Row Clicked.");
    if ($(event.target).attr("type") != "button" && $(event.target)[0].tagName != "A" && $(event.target).text() != "") {
        easyDialog.open({
            container: {
                // header: "信息",
                content: event.target.textContent
            },
            follow: event.target,
            followX: 24,
            followY: 24,
            autoClose: 10000
        });
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
    rowClick: onRowClicked,
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
                case "Solution Implementation":
                    return $("<input>").attr("type", "button").attr("value", "通过").attr("class", "passButton_" + item["Ticket No"]).on("click", function() {
                        easyDialog.open({
                            container: {
                                content: item["Ticket No"] + '<br><hr>' + item.Brief + ' <br><hr>验证通过，确认操作？',
                                yesFn: function() {
                                    //todo 验证通过逻辑
                                    $("#dtsIssueGrid").jsGrid("deleteItem", item);

                                    console.log("“" + item["Ticket No"] + item["Brief"] + "”" + " 验证已通过");
                                },
                                noFn: true
                            }
                        });
                    }).add($("<input>").attr("type", "button").attr("value", "失败").attr("class", "failButton_" + item["Ticket No"]).on("click", function() {
                        easyDialog.open({
                            container: {
                                content: item["Ticket No"] + '<br><hr>' + item.Brief + ' <br><hr>验证失败，确认操作？',
                                yesFn: function() {
                                    //todo 验证不通过
                                    $("#dtsIssueGrid").jsGrid("deleteItem", item);

                                    console.log("“" + item["Ticket No"] + item["Brief"] + "”" + " 验证未通过");
                                },
                                noFn: true
                            }
                        });
                    }));

                case "Close":
                    return $("<input>").
                    attr("type", "button").
                    attr("value", "交叉验证").
                    attr("class", "testButton_" + item["Ticket No"]).
                    on("click", function() {
                        easyDialog.open({
                            container: {
                                content: item["Ticket No"] + '<br><hr>' + item.Brief + ' <br><hr>提交验证，确认操作？',
                                yesFn: function() {
                                    //todo 转测试逻辑
                                    $("#dtsIssueGrid").jsGrid("deleteItem", item);

                                    console.log("“" + item["Ticket No"] + item["Brief"] + "”" + " 转交叉验证");
                                },
                                noFn: true
                            }
                        });
                    });
                default:
                    break;
            }
        }
    }]
});
