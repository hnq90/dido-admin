function browser() {
    function i(e) {
        return e in document.documentElement.style
    }

    var e = !!window.opera && !!window.opera.version, t = i("MozBoxSizing"), n = Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") > 0, r = !n && i("WebkitTransform");
    return e ? !1 : n || r ? !0 : !1
}

function retina() {
    retinaMode = window.devicePixelRatio > 1;
    return retinaMode
}

function hexToRgb(e) {
    var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
    return t ? {r: parseInt(t[1], 16), g: parseInt(t[2], 16), b: parseInt(t[3], 16)} : null
}

function rgbToRgba(e, t) {
    if (jQuery.browser.version <= 8) {
        e = hexToRgb(e);
        rgba = "rgba(" + e.r + "," + e.g + "," + e.b + "," + t + ")"
    } else {
        e = e.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        rgba = "rgba(" + e[1] + "," + e[2] + "," + e[3] + "," + t + ")"
    }
    return rgba
}

/* 1 chart */
function draw_one_chart(elem, label, data) {
    if (elem.length) {
        elem.each(function () {
            var chartColor = $(this).parent().parent().css("color");
            var plot = $.plot(elem,
                [
                    { data: data,
                        label: label,
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
                                item.series.label + " of " + (31 - x) + " days ago: " + y);
                    }
                }
                else {
                    $("#tooltip").remove();
                    previousPoint = null;
                }
            });
        });
    }
}

function draw_two_chart(elem, data1, data2, label1, label2) {
    if (elem.length) {
        elem.each(function () {
            var chartColor = $(this).parent().parent().css("color");
            var plot = $.plot(elem,
                [
                    { data: data1,
                        label: label1,
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
                    },
                    {
                        data: data2,
                        label: label2,
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
                                item.series.label + " of " + (31 - x) + " days ago: " + y);
                    }
                }
                else {
                    $("#tooltip").remove();
                    previousPoint = null;
                }
            });
        });
    }
}

/* Draw donut */
function draw_donutChart(element, datax) {
    if (element.length) {
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

//var datax = [
//    { label: "Male", data: 45},
//    { label: "Female", data: 55}
//];
