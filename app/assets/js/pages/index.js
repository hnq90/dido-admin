/* ---------- functions used to demonsatration ---------- */

function randNum() {
    return ((Math.floor(Math.random() * (1 + 40 - 20)) ) + 20) * 1200;
}

function randNum2() {
    return ((Math.floor(Math.random() * (1 + 40 - 20)) ) + 20) * 500;
}

function randNum3() {
    return ((Math.floor(Math.random() * (1 + 40 - 20)) ) + 20) * 300;
}

function randNum4() {
    return ((Math.floor(Math.random() * (1 + 40 - 20)) ) + 20) * 100;
}

function randNum5() {
    return ((Math.floor(Math.random() * (1 + 40 - 20)) ) + 1) * 1;
}

$(document).ready(function () {
    //GET DATA FROM API
    var headers = {
        "X-Dido-Client-Version": "v1.0",
        "X-Dido-Client-Type": "Android",
        "Accept": "application/json",
        "Content-Type": "application/json"
    };
    var base = 'http://dido.energeeks.com',
        dashboard_info = '/api/admin/dashboard_info';

    $.ajax({
        url: base + dashboard_info,
        type: "GET",
        dataType: "json",
        headers: headers
    }).done(function (msg) {
        var total_user = msg.data.user["num_user"],
            new_user_7_days = msg.data.user["num_user_7_days"],
            new_user_30_days = msg.data.user["num_user_30_days"],
            total_place = msg.data.place["num_place"],
            new_place_7_days = msg.data.place["num_place_7_days"],
            new_place_30_days = msg.data.place["num_place_30_days"],
            total_question = msg.data.question["num_question"],
            new_question_7_days = msg.data.question["num_question_7_days"],
            new_question_30_days = msg.data.question["num_question_30_days"],
            total_answer = msg.data.answer["num_answer"],
            new_answer_7_days = msg.data.answer["num_answer_7_days"],
            new_answer_30_days = msg.data.answer["num_answer_30_days"],
            user_box = $("#user"),
            place_box = $("#place"),
            question_box = $("#question"),
            answer_box = $("#answer"),
            box_chart = $(".boxchart");

        user_box.find(".boxchart").text(new_user_7_days);
        user_box.find(".value").html(total_user);
        place_box.find(".boxchart").text(new_place_7_days);
        place_box.find(".value").html(total_place);
        question_box.find(".boxchart").text(new_question_7_days);
        question_box.find(".value").html(total_question);
        answer_box.find(".boxchart").text(new_answer_7_days);
        answer_box.find(".value").html(total_answer);

        if (box_chart.length) {
            if (retina()) {
                box_chart.sparkline("html",
                    {type: "bar", height: "60", barWidth: "8", barSpacing: "2", barColor: "#ffffff", negBarColor: "#eeeeee"});
                if (jQuery.browser.mozilla)if (!navigator.userAgent.match(/Trident\/7\./)) {
                    box_chart.css("MozTransform", "scale(0.5,0.5)").css("height", "30px;");
                    box_chart.css("height", "30px;").css("margin", "-15px 15px -15px -15px")
                } else box_chart.css("zoom", .5); else box_chart.css("zoom", .5)
            } else
                box_chart.sparkline("html", {type: "bar", height: "30", barWidth: "4", barSpacing: "1", barColor: "#ffffff", negBarColor: "#eeeeee"});
        }

        /* ---------- Placeholder Fix for IE ---------- */
        $('input, textarea').placeholder();

        /* ---------- Auto Height texarea ---------- */
        $('textarea').autosize();

        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();

        if ($(".multi-stat-box-chart").length) {

            $('.multi-stat-box-chart').each(function () {

                var data2 = [
                    [1111, 5 + randNum5()],
                    [1112, 10 + randNum5()],
                    [1113, 15 + randNum5()],
                    [1114, 20 + randNum5()],
                    [1115, 25 + randNum5()],
                    [1116, 30 + randNum5()],
                    [1117, 25 + randNum5()]
                ];

                var data = [
                    [gd(2013, 1, 7), 5 + randNum5()],
                    [gd(2013, 1, 8), 10 + randNum5()],
                    [gd(2013, 1, 9), 15 + randNum5()],
                    [gd(2013, 1, 10), 20 + randNum5()],
                    [gd(2013, 1, 11), 25 + randNum5()],
                    [gd(2013, 1, 12), 30 + randNum5()],
                    [gd(2013, 1, 13), 25 + randNum5()]
                ];

                var chartColor = $(this).parent().parent().css("color");

                var dayOfWeek = ["SUN", "MON", "TUE", "WED", "THR", "FRI", "SAT"];

                function gd(year, month, day) {
                    return new Date(year, month - 1, day).getTime();
                }

                var plot = $.plot($(".multi-stat-box-chart"),
                    [
                        { data: data }
                    ], {
                        series: {
                            lines: { show: true,
                                lineWidth: 3,
                                fill: false
                            },
                            points: { show: true,
                                lineWidth: 3,
                                fill: true,
                                fillColor: '#fff'
                            },
                            shadowSize: 0
                        },
                        grid: { hoverable: true,
                            clickable: true,
                            tickColor: "#fff",
                            borderColor: false
                        },
                        colors: ["#c7cbd5"],
                        xaxis: {
                            mode: "time",
                            tickFormatter: function (val, axis) {
                                return dayOfWeek[new Date(val).getDay()];
                            },
                            color: "#c7cbd5",
                            autoscaleMargin: 0.000000000000000001
                        },
                        yaxis: {
                            ticks: 4,
                            tickDecimals: 0,
                            color: "#fff"
                        }
                    });

                function showTooltip(x, y, contents) {
                    $('<div id="tooltip">' + contents + '</div>').css({
                        position: 'absolute',
                        display: 'none',
                        top: y + 5,
                        left: x + 5,
                        border: '1px solid #fdd',
                        padding: '2px',
                        'background-color': '#dfeffc',
                        opacity: 0.80
                    }).appendTo("body").fadeIn(200);
                }

                var previousPoint = null;
                $(".multi-stat-box-chart").bind("plothover", function (event, pos, item) {
                    $("#x").text(pos.x.toFixed(2));
                    $("#y").text(pos.y.toFixed(2));

                    if (item) {
                        if (previousPoint != item.dataIndex) {
                            previousPoint = item.dataIndex;

                            $("#tooltip").remove();
                            var x = item.datapoint[0].toFixed(2),
                                y = item.datapoint[1].toFixed(2);

                            showTooltip(item.pageX, item.pageY,
                                    item.series.label + " of " + x + " = " + y);
                        }
                    }
                    else {
                        $("#tooltip").remove();
                        previousPoint = null;
                    }
                });

            });

        }

        /* ---------- Chart with points ---------- */
        if ($('.chart-type1').length) {

            $('.chart-type1').each(function () {

                var chartColor = $(this).parent().parent().css("color");

                var plot = $.plot($(".chart-type1"),
                    [
                        { data: new_user_30_days,
                            label: "New Users",
                            lines: {
                                show: true,
                                fill: true,
                                fillColor: rgbToRgba(chartColor, 0.25),
                                lineWidth: 3
                            },
                            points: {
                                show: true,
                                lineWidth: 3,
                                fill: true
                            },
                            shadowSize: 0
                        }
                    ], {

                        grid: {
                            hoverable: true,
                            clickable: true,
                            tickColor: "#eee",
                            borderWidth: 0
                        },
                        legend: {
                            show: false
                        },
                        colors: [chartColor, rgbToRgba(chartColor, 0.25)],
                        xaxis: {ticks: 5, tickDecimals: 0 },
                        yaxis: {ticks: 5, tickDecimals: 0 }
                    }
                );

                function showTooltip(x, y, contents) {
                    $('<div id="tooltip">' + contents + '</div>').css({
                        position: 'absolute',
                        display: 'none',
                        top: y + 5,
                        left: x + 5,
                        border: '1px solid #fdd',
                        padding: '2px',
                        'background-color': '#dfeffc',
                        opacity: 0.80
                    }).appendTo("body").fadeIn(200);
                }

                var previousPoint = null;
                $(this).bind("plothover", function (event, pos, item) {
                    $("#x").text(pos.x);
                    $("#y").text(pos.y);

                    if (item) {
                        if (previousPoint != item.dataIndex) {
                            previousPoint = item.dataIndex;

                            $("#tooltip").remove();
                            var x = item.datapoint[0],
                                y = item.datapoint[1];

                            showTooltip(item.pageX, item.pageY,
                                    item.series.label + " of " + (31-x) + " days ago: " + y );
                        }
                    }
                    else {
                        $("#tooltip").remove();
                        previousPoint = null;
                    }
                });
            });
        }

        if ($('.chart-type11').length) {

            $('.chart-type11').each(function () {

                var chartColor = $(this).parent().parent().css("color");

                var plot = $.plot($(".chart-type11"),
                    [
                        { data: new_place_30_days,
                            label: "New Places",
                            lines: {
                                show: true,
                                fill: true,
                                fillColor: rgbToRgba(chartColor, 0.25),
                                lineWidth: 3
                            },
                            points: {
                                show: true,
                                lineWidth: 3,
                                fill: true
                            },
                            shadowSize: 0
                        }
                    ], {

                        grid: {
                            hoverable: true,
                            clickable: true,
                            tickColor: "#eee",
                            borderWidth: 0
                        },
                        legend: {
                            show: false
                        },
                        colors: [chartColor, rgbToRgba(chartColor, 0.25)],
                        xaxis: {ticks: 5, tickDecimals: 0 },
                        yaxis: {ticks: 5, tickDecimals: 0 }
                    }
                );

                function showTooltip(x, y, contents) {
                    $('<div id="tooltip">' + contents + '</div>').css({
                        position: 'absolute',
                        display: 'none',
                        top: y + 5,
                        left: x + 5,
                        border: '1px solid #fdd',
                        padding: '2px',
                        'background-color': '#dfeffc',
                        opacity: 0.80
                    }).appendTo("body").fadeIn(200);
                }

                var previousPoint = null;
                $(this).bind("plothover", function (event, pos, item) {
                    $("#x").text(pos.x);
                    $("#y").text(pos.y);

                    if (item) {
                        if (previousPoint != item.dataIndex) {
                            previousPoint = item.dataIndex;

                            $("#tooltip").remove();
                            var x = item.datapoint[0],
                                y = item.datapoint[1];

                            showTooltip(item.pageX, item.pageY,
                                    item.series.label + " of " + (31-x) + " days ago: " + y );
                        }
                    }
                    else {
                        $("#tooltip").remove();
                        previousPoint = null;
                    }
                });
            });
        }

        /* ---------- Chart with points ---------- */
        if($('.chart-type111').length) {

            $('.chart-type111').each(function(){

                var data1 = new_question_30_days;
                var data2 = new_answer_30_days;


                var chartColor = $(this).parent().parent().css("color");


                var plot = $.plot($(".chart-type111"),

                    [ { data: data1,
                        label: "Number Questions",
                        lines: {
                            show: true,
                            fill: true,
                            fillColor: rgbToRgba(chartColor,0.25),
                            lineWidth: 3
                        },
                        points: {
                            show: true,
                            lineWidth: 3,
                            fill: true
                        },
                        shadowSize: 0
                    }, {
                        data: data2,
                        label: "Number Answers",
                        bars: {
                            show: true,
                            fill: false,
                            barWidth: 0.1,
                            align: "center",
                            lineWidth: 8
                        }
                    }
                    ], {

                        grid: {
                            hoverable: true,
                            clickable: true,
                            tickColor: "#eee",
                            borderWidth: 0
                        },
                        legend: {
                            show: false
                        },
                        colors: [chartColor, rgbToRgba(chartColor,0.25)],
                        xaxis: {ticks:5, tickDecimals: 0 },
                        yaxis: {ticks:5, tickDecimals: 0 },
                    }
                );

                function showTooltip(x, y, contents) {
                    $('<div id="tooltip">' + contents + '</div>').css( {
                        position: 'absolute',
                        display: 'none',
                        top: y + 5,
                        left: x + 5,
                        border: '1px solid #fdd',
                        padding: '2px',
                        'background-color': '#dfeffc',
                        opacity: 0.80
                    }).appendTo("body").fadeIn(200);
                }

                var previousPoint = null;
                $(this).bind("plothover", function (event, pos, item) {
                    $("#x").text(pos.x);
                    $("#y").text(pos.y);

                    if (item) {
                        if (previousPoint != item.dataIndex) {
                            previousPoint = item.dataIndex;

                            $("#tooltip").remove();
                            var x = item.datapoint[0],
                                y = item.datapoint[1];

                            showTooltip(item.pageX, item.pageY,
                                    item.series.label + " of " + (31-x) + " days ago: " + y );
                        }
                    }
                    else {
                        $("#tooltip").remove();
                        previousPoint = null;
                    }
                });

            });

        }

        if ($(".chart-type2").length) {

            $('.chart-type2').each(function () {

                var likes = [
                    [1, 5 + randNum()],
                    [2, 10 + randNum()],
                    [3, 15 + randNum()],
                    [4, 20 + randNum()],
                    [5, 25 + randNum()],
                    [6, 30 + randNum()],
                    [7, 35 + randNum()],
                    [8, 40 + randNum()],
                    [9, 45 + randNum()],
                    [10, 50 + randNum()],
                    [11, 55 + randNum()],
                    [12, 60 + randNum()]
                ];

                var chartColor = $(this).parent().parent().css("color");

                var plot = $.plot($(".chart-type2"),
                    [
                        { data: likes}
                    ], {
                        series: {
                            lines: {
                                show: true,
                                lineWidth: 3,
                                fill: false
                            },
                            points: {
                                show: true,
                                lineWidth: 3,
                                fill: true,
                                fillColor: chartColor
                            },
                            shadowSize: 0
                        },
                        grid: { hoverable: true,
                            clickable: true,
                            tickColor: "rgba(255,255,255,.15)",
                            borderColor: "rgba(255,255,255,0)"
                        },
                        colors: ["#fff"],
                        xaxis: {
                            font: {
                                color: "#fff"
                            },
                            ticks: 6,
                            tickDecimals: 0,
                            tickColor: chartColor
                        },
                        yaxis: {
                            font: {
                                color: "#fff"
                            },
                            ticks: 4,
                            tickDecimals: 0,
                            autoscaleMargin: 0.000001
                        }
                    });

                function showTooltip(x, y, contents) {
                    $('<div id="tooltip">' + contents + '</div>').css({
                        position: 'absolute',
                        display: 'none',
                        top: y + 5,
                        left: x + 5,
                        border: '1px solid #fdd',
                        padding: '2px',
                        'background-color': '#dfeffc',
                        opacity: 0.80
                    }).appendTo("body").fadeIn(200);
                }

                var previousPoint = null;
                $(".chart-type2").bind("plothover", function (event, pos, item) {
                    $("#x").text(pos.x.toFixed(2));
                    $("#y").text(pos.y.toFixed(2));

                    if (item) {
                        if (previousPoint != item.dataIndex) {
                            previousPoint = item.dataIndex;

                            $("#tooltip").remove();
                            var x = item.datapoint[0].toFixed(2),
                                y = item.datapoint[1].toFixed(2);

                            showTooltip(item.pageX, item.pageY,
                                    item.series.label + " of " + x + " = " + y);
                        }
                    }
                    else {
                        $("#tooltip").remove();
                        previousPoint = null;
                    }
                });

            });

        }

        function draw_donutChart(element, data) {
            if(element.length)
            {
                $.plot(element, datax,
                    {
                        series: {
                            pie: {
                                innerRadius: 0.5,
                                show: true
                            }
                        },
                        legend: {
                            show: false
                        },
                        colors: ["#FA5833", "#2FABE9", "#FABB3D", "#78CD51"]
                    });
            }
        }

        var datax = [
            { label: "Male",  data: 45},
            { label: "Female",  data: 55}
        ];

        draw_donutChart($("#donutchart1"), datax);
        draw_donutChart($("#donutchart2"), datax);
        draw_donutChart($("#donutchart3"), datax);
        draw_donutChart($("#donutchart4"), datax);

    });
});