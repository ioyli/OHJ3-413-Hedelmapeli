// hedelmäpeli

let rahaa = 100;
let panos = 1; // minimi 1€
let kierrokset = 0;
let voitot = 0;

let voitto = 0;

let lukkoArray = [false, false, false, false]
let imgArray = ["img/apple.png", "img/pear.png", "img/cherry.png", "img/melon.png", "img/seven.png"]
let rullaSisalto = ["null", "null", "null", "null"]

function arvoRullat() {

    for (let i = 1; i <= 4; i++) {

        let rulla = "rulla" + i;

        // rulla arvotaan vain jos lukko on auki
        if (lukkoArray[i] == false) {
            let nro = Math.floor(Math.random() * (imgArray.length));
            document.getElementById(rulla).innerHTML = `<img src="${imgArray[nro]}">`;
            rullaSisalto[i - 1] = `${imgArray[nro]}`;
        }

        // kierroksen jälkeen lukko avataan
        lukkoArray[i] = false;
        document.getElementById(`lukko${i}`).style.background = "#af805e";
    }
}

function setPanos(nro) {
    panos = nro;
    document.getElementById("panosNro").innerHTML = panos;

    document.getElementById("appleVoitto").innerHTML = panos * 6;
    document.getElementById("melonVoitto").innerHTML = panos * 5;
    document.getElementById("pearVoitto").innerHTML = panos * 4;
    document.getElementById("cherryVoitto").innerHTML = panos * 3;
    document.getElementById("sevenVoitto").innerHTML = panos * 10;
    document.getElementById("sevenKolmeVoitto").innerHTML = panos * 5;
}

function lukitse(nro) {
    // jos ensimmäisellä kierroksella ei tullut voittoa
    // voi käyttäjä lukita yhden rullan
    if (kierrokset == 1 && voitot == 1) {
        lukkoArray[nro] = false;
    } else if (kierrokset == 0) {
        lukkoArray[nro] = false;
    } else {
        lukkoArray[nro] = true;
        document.getElementById(`lukko${nro}`).style.background = "#8b5d3c";
    }
}

function pelaa() {

    if (rahaa >= panos) {
        kierrokset++;
        rahaa = rahaa - panos;
        document.getElementById("rahaaNro").innerHTML = `${rahaa}`;

        document.getElementById("alert").innerHTML = " ";

        arvoRullat();
        tarkistaVoitot();

        if (voitto > 0) {
            document.getElementById("alert").innerHTML = `Voitit ${voitto}€!`
        }

    } else {
        document.getElementById("alert").innerHTML = "Sinulla ei ole tarpeeksi rahaa.";
    }
}

function tarkistaVoitot() {

    voitto = 0;

    // 4 x apple => voitto = 6 x panos
    if (rullaSisalto.every(sisalto => sisalto == "img/apple.png")) {
        voitto = 6 * panos;
        rahaa = rahaa + voitto;
        voitot++;
    }

    // 4 x melon => voitto = 5 x panos
    if (rullaSisalto.every(sisalto => sisalto == "img/melon.png")) {
        voitto = 5 * panos;
        rahaa = rahaa + voitto;
        voitot++;
    }

    // 4 x pear => voitto = 4 x panos
    if (rullaSisalto.every(sisalto => sisalto == "img/pear.png")) {
        voitto = 4 * panos;
        rahaa = rahaa + voitto;
        voitot++;
    }

    // 4 x cherry => voitto = 3 x panos
    if (rullaSisalto.every(sisalto => sisalto == "img/cherry.png")) {
        voitto = 3 * panos;
        rahaa = rahaa + voitto;
        voitot++;
    }

    // 4 x 7 => voitto = 10 x panos
    if (rullaSisalto.every(sisalto => sisalto == "img/seven.png")) {
        voitto = 10 * panos;
        rahaa = rahaa + voitto;
        voitot++;
    }

    // 3 x 7 => voitto = 5 x panos
    let sevenMaara = 0;
    for (let i = 0; i < 4; i++) {
        if (rullaSisalto[i] == "img/seven.png") {
            sevenMaara++;
        }
    }
    if (sevenMaara == 3) {
        voitto = 5 * panos;
        rahaa = rahaa + voitto;
        voitot++;
    }
}