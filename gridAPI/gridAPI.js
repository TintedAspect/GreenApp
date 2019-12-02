
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

    if(d < 10){
        d = "0" + date.getDate();
    }

    var total = 0;
    var maxVal = 0;
    var from = "";
    var to = "";

function searchResult() {
        index = 0
        total = 0;
        maxVal = 0;
        from = "";
        to = "";

        search = document.getElementById('searchInfo').value
        url = "https://api.carbonintensity.org.uk/regional/intensity/" + y + "-" + m + "-" + d + "T00:00Z/fw24h/postcode/" + search;
        console.log(url);
        fetch(url)
            .then((resp) => resp.json())
            .then(function(info) {
                let powerGen = info.data.data;
                console.log(powerGen);
                return powerGen.map(function(power) {
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
                    if(total > maxVal){
                        maxVal = total;
                        from = power.from;
                        to = power.to;
                    }
                    if(index > 48){
                       createMedia(search, maxVal, from, to);
                    }
                })
            })
            .catch(function(error) {
                console.log(error);
            });
    }
    function clearResult(){
        document.getElementById("results").innerHTML = "";
    }
