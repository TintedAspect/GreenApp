
    function createNode(element) {
        return document.createElement(element);
    }

    function append(parent, el) {
        return parent.appendChild(el);
    }

    function createCard(img, title, perc) {
        div = createNode('div');
        div.setAttribute('class', 'card col')
        div.innerHTML = "<img class='card-img-top' src='" + img + "'><div class='card-body'><h5 class='card-title'>" + title + "</h5><div class='progress card-text'><div class='progress-bar bg-success text-dark' role='progressbar' style='width: " + perc + "%;' aria-valuenow='" + perc + "' aria-valuemin='0' aria-valuemax='100'><p>" + perc + "%</p></div></div>";
        append(info, div);
    }


    function createMedia(search, maxVal, from, to){
        div2 = createNode('div');
        div2.setAttribute('class', 'media');
        div2.innerHTML = "<div class='media-body'><h5 class='mt-0'>"+search+"</h5>The best time to use your electricity is between <span>"+from.slice(11,16)+" and "+to.slice(11,16)+"</span> as this is when the most sutainable energy is being produced: <span>"+maxVal+"%</span></div>";
        append(results, div2);
    }

    window.onload = function info() {
        url = "https://api.carbonintensity.org.uk/regional/scotland";
        fetch(url)
            .then((resp) => resp.json())
            .then(function(info) {
                console.log(info);
                let powerGen = info.data;
                return powerGen.map(function(power) {

                    i = 0;
                    while (i < 9) {
                        switch (power.data[0].generationmix[i].fuel) {
                            case "wind":
                                img = "Images/wind.jpg";
                                powerTitle = "Wind";
                                powerPercentage = power.data[0].generationmix[i].perc;
                                console.log(powerTitle + " " + powerPercentage);
                                createCard(img, powerTitle, powerPercentage);
                                break;

                            case "hydro":
                                img = "Images/hydro.jpg";
                                powerTitle = "Hydro";
                                powerPercentage = power.data[0].generationmix[i].perc;
                                createCard(img, powerTitle, powerPercentage);
                                console.log(powerTitle + " " + powerPercentage);

                                break;

                            case "solar":
                                img = "Images/solar.jpg";
                                powerTitle = "Solar";
                                powerPercentage = power.data[0].generationmix[i].perc;
                                createCard(img, powerTitle, powerPercentage);
                                console.log(powerTitle + " " + powerPercentage);
                                break;

                        }
                        i++;
                    }

                })
            })
            .catch(function(error) {
                console.log(error);
            });
    }

var date = new Date();
var d = date.getDate();
var m = date.getMonth() + 1;
var y = date.getFullYear();

if (d < 10) {
    d = "0" + date.getDate();
}

var total = 0;
var value = new Array();
var from = new Array();
var holder = "";
var maxVal = 0;
var maxFrom = "";
var maxTo = "";

function searchResult() {
    index = 0;
    total = 0;
    maxVal = 0;
    from = [];
    value = [];

    search = document.getElementById('searchInfo').value
    url = "https://api.carbonintensity.org.uk/regional/intensity/" + y + "-" + m + "-" + d + "T00:00Z/fw24h/postcode/" + search;
    console.log(url);
    fetch(url)
        .then((resp) => resp.json())
        .then(function (info) {
            let powerGen = info.data.data;
            console.log(powerGen);
            return powerGen.map(function (power) {
                console.log(power);
                i = 0;
                total = 0;
                while (i < 9) {
                    switch (power.generationmix[i].fuel) {
                        case "wind":
                            total += power.generationmix[i].perc;
                            break;

                        case "hydro":
                            total += power.generationmix[i].perc;
                            break;

                        case "solar":
                            total += power.generationmix[i].perc;
                            break;
                    }
                    i++;
                }
                index++;
                holder = power.from
                value.push(total);
                from.push(holder.slice(11, 16));
                if (total > maxVal) {
                    maxVal = total;
                    maxFrom = power.from;
                    maxTo = power.to;
                }
                if (index > 48) {
                    createMedia(search, maxVal, maxFrom, maxTo);
                }

            })

        })
        .catch(function (error) {
            console.log(error);
        });
}

function clearResult() {
    document.getElementById("results").innerHTML = "";
}

google.charts.load('current', {
    'packages': ['corechart']
});

function drawChart() {
    console.log(value.length);
    var data = google.visualization.arrayToDataTable([

                ['Time', 'Generation (%)'],
                [from[0], value[0]],
        [from[1], value[1]],
        [from[2], value[2]],
        [from[3], value[3]],
        [from[4], value[4]],
        [from[5], value[5]],
        [from[6], value[6]],
        [from[7], value[7]],
        [from[8], value[8]],
        [from[9], value[9]],
        [from[10], value[10]],
        [from[11], value[11]],
        [from[12], value[12]],
        [from[13], value[13]],
        [from[14], value[14]],
        [from[15], value[15]],
        [from[16], value[16]],
        [from[17], value[17]],
        [from[18], value[18]],
        [from[19], value[19]],
        [from[20], value[20]],
        [from[21], value[21]],
        [from[22], value[22]],
        [from[23], value[23]],
        [from[24], value[24]],
        [from[25], value[25]],
        [from[26], value[26]],
        [from[27], value[27]],
        [from[28], value[28]],
        [from[29], value[29]],
        [from[30], value[30]],
        [from[31], value[31]],
        [from[32], value[32]],
        [from[33], value[33]],
        [from[34], value[34]],
        [from[35], value[35]],
        [from[36], value[36]],
        [from[37], value[37]],
        [from[38], value[38]],
        [from[39], value[39]],
        [from[40], value[40]],
        [from[41], value[41]],
        [from[42], value[42]],
        [from[43], value[43]],
        [from[44], value[44]],
        [from[45], value[45]],
        [from[46], value[46]],
        [from[47], value[47]],
        [from[48], value[48]]


        ]);

    var options = {
        title: '',
        hAxis: {
            title: 'Half Hour',
            titleTextStyle: {
                color: '#333'
            }
        },
        vAxis: {
            minValue: 0
        }
    };

    var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}
