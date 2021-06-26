google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);
google.charts.setOnLoadCallback(drawChart2);

function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ["Year", "Sales", "Site Statistics"],
        ["2018", 1000, 400],
        ["2019", 1170, 460],
        ["2020", 660, 1120],
        ["2021", 1030, 540],
    ]);

    var options = {
        title: "Site Statistics",
        // width: "100%",
        height: 534,
        hAxis: { title: "Year", titleTextStyle: { color: "#333" } },
        vAxis: { minValue: 0 },
    };

    var chart = new google.visualization.AreaChart(
        document.getElementById("chart_div")
    );
    chart.draw(data, options);
}

function drawChart2() {
    var data = google.visualization.arrayToDataTable([
        ["Year", "Users", "Admins"],
        ["2018", 1000, 400],
        ["2019", 1170, 460],
        ["2020", 660, 1120],
        ["2021", 1030, 540],
    ]);

    var options = {
        title: "Company Performance",
        curveType: "function",
        legend: { position: "bottom" },
        height: 300,
    };

    var chart = new google.visualization.LineChart(
        document.getElementById("curve_chart")
    );

    chart.draw(data, options);
}

window.addEventListener("resize", () => {
    location.reload();
});
