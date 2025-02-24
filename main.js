// Irodalmi adatok tömbje: az első elem a fejléc adatait tartalmazza, a többi az adatsorokat.
const array = [
    {
        column1: 'Szerző neve',     // Fejléc – az első oszlop címe: "Szerző neve"
        column2: 'Korszak',         // Fejléc – a második oszlop címe: "Korszak"
        column3: 'Szerelmek'         // Fejléc – a harmadik oszlop címe: "Szerelmek"
    },
    {
        column1: 'Balassi Bálint',   // Adatsor – szerző neve
        column2: 'reformáció',       // Adatsor – korszak
        column3: 'Losonczy Anna',     // Adatsor – első szerelem
        column4: 'Dobó Krisztina'     // Adatsor – második szerelem
    },
    {
        column1: 'Csokonai Vitéz Mihály', // Adatsor – szerző neve
        column2: 'felvilágosodás',         // Adatsor – korszak
        column3: 'Vajda Juliána'           // Adatsor – szerelem; itt nincs második szerelem, így egy cella lesz használva
    },
    {
        column1: 'Petőfi Sándor',         // Adatsor – szerző neve
        column2: 'magyar romantika',      // Adatsor – korszak
        column3: 'Mednyánszky Berta',       // Adatsor – első szerelem
        column4: 'Szendrey Júlia'          // Adatsor – második szerelem
    },
    {
        column1: 'Ady Endre',             // Adatsor – szerző neve
        column2: '20. század',            // Adatsor – korszak
        column3: 'Léda',                  // Adatsor – első szerelem
        column4: 'Csinszka'               // Adatsor – második szerelem
    }
];

const table = document.createElement('table'); // Létrehoz egy új <table> elemet
document.body.appendChild(table);              // Hozzáadja a táblázatot a HTML dokumentum <body> részéhez

// Táblázat fejlécének létrehozása
const tableHeader = document.createElement('thead'); // Létrehoz egy <thead> elemet a táblázat fejlécéhez
const headerRow = document.createElement('tr');      // Létrehoz egy <tr> sort a fejléc számára
table.appendChild(tableHeader);                      // Hozzáfűzi a fejlécet a táblázathoz
tableHeader.appendChild(headerRow);                  // A fejléc sorát hozzáfűzi a <thead> elemhez

// Első fejléc cella létrehozása, mely a "Szerző neve" szöveget tartalmazza
const headerCell1 = document.createElement('th');    
headerCell1.innerHTML = array[0].column1;            // Beállítja a cella tartalmát az első elem "column1" értékére
headerRow.appendChild(headerCell1);                  // Hozzáfűzi a cellát a fejléc sorhoz

// Második fejléc cella létrehozása, mely a "Korszak" szöveget tartalmazza
const headerCell2 = document.createElement('th');
headerCell2.innerHTML = array[0].column2;            // Beállítja a cella tartalmát az első elem "column2" értékére
headerRow.appendChild(headerCell2);                  // Hozzáfűzi a cellát a fejléc sorhoz

// Harmadik fejléc cella létrehozása, mely a "Szerelmek" szöveget tartalmazza
const headerCell3 = document.createElement('th');
headerCell3.innerHTML = array[0].column3;            // Beállítja a cella tartalmát az első elem "column3" értékére
headerCell3.colSpan = 2;                             // Megadja, hogy ez a cella két oszlopot foglal el
headerRow.appendChild(headerCell3);                  // Hozzáfűzi a cellát a fejléc sorhoz

// Táblázat törzsének generálása: függvény, amely újragenerálja a táblázat tartalmát
function generateTable() {
    table.innerHTML = '';                          // Törli a táblázat korábbi tartalmát
    table.appendChild(tableHeader);                // Újra hozzáadja a fejlécet a táblázathoz

    const tbody = document.createElement('tbody'); // Létrehoz egy <tbody> elemet a táblázat adatsorainak
    table.appendChild(tbody);                        // Hozzáfűzi a <tbody>-t a táblázathoz

    // Az első tömb elem a fejléc, így az adatsorok indexe 1-től indul
    for (let i = 1; i < array.length; i++) {
        const currentElement = array[i];           // Lekéri az aktuális adatsor objektumot
        const row = document.createElement('tr');  // Létrehoz egy új sort (<tr>) az adatsorhoz
        tbody.appendChild(row);                      // Hozzáfűzi az új sort a táblázat törzséhez

        // Szerző neve: első oszlop cella létrehozása
        const rowColumn1 = document.createElement('td');
        rowColumn1.innerHTML = currentElement.column1;  // Beállítja a cella tartalmát a szerző nevére
        row.appendChild(rowColumn1);                      // Hozzáfűzi a cellát a sorhoz

        // Korszak: második oszlop cella létrehozása
        const rowColumn2 = document.createElement('td');
        rowColumn2.innerHTML = currentElement.column2;  // Beállítja a cella tartalmát a korszakra
        row.appendChild(rowColumn2);                     // Hozzáfűzi a cellát a sorhoz

        // Szerelmek: ellenőrzi, hogy van-e column4 érték, hogy két külön cellát vagy egy összevont cellát kell-e létrehozni
        if (!currentElement.column4) {
            // Ha nincs második szerelmi adat, akkor egy cella, két oszlopot lefedő cella készül
            const rowColumn3 = document.createElement('td');
            // Ha a column3 üres, akkor "-" jelenik meg, egyébként a column3 értéke
            rowColumn3.innerHTML = (currentElement.column3 === "" ? "-" : currentElement.column3);
            rowColumn3.colSpan = 2;                    // A cella két oszlopot foglal el
            row.appendChild(rowColumn3);               // Hozzáfűzi a cellát a sorhoz
        } else {
            // Ha van második szerelmi adat, akkor két külön cellát hoz létre
            const rowColumn3 = document.createElement('td');
            rowColumn3.innerHTML = (currentElement.column3 === "" ? "-" : currentElement.column3);
            row.appendChild(rowColumn3);               // Hozzáfűzi az első szerelmi adatot tartalmazó cellát a sorhoz

            const rowColumn4 = document.createElement('td');
            rowColumn4.innerHTML = (currentElement.column4 === "" ? "-" : currentElement.column4);
            row.appendChild(rowColumn4);               // Hozzáfűzi a második szerelmi adatot tartalmazó cellát a sorhoz
        }
    }
}

// Kezdeti táblázat kirajzolása a generateTable függvény meghívásával
generateTable();

// Eseménykezelő beállítása az űrlap submit eseményéhez (amikor az űrlapot elküldik)
const form = document.getElementById("form");     // Lekéri az űrlap elemet azonosító alapján
form.addEventListener('submit', function(e) {
    e.preventDefault();                             // Megszakítja az űrlap alapértelmezett elküldési műveletét

    // Űrlapmezők lekérése a megfelelő id-k alapján
    const koltoNev = document.getElementById('kolto_nev');
    const korszak = document.getElementById('korszak');
    const szerelem1 = document.getElementById('szerelem1');
    const szerelem2 = document.getElementById('szerelem2');
    const checkbox = document.getElementById('masodik');

    // Hibaüzenet elemek lekérése
    const koltoNevError = document.getElementById('error-kolto-nev');
    const korszakError = document.getElementById('error-korszak');

    // Hibaüzenetek elrejtése alapértelmezettként
    koltoNevError.style.display = 'none';
    korszakError.style.display = 'none';

    let valid = true;                               // Validációs állapot inicializálása

    // Kötelező mezők ellenőrzése: ha a szerző neve üres, megjelenik a hibaüzenet
    if (koltoNev.value === "") {
        koltoNevError.style.display = "block";
        valid = false;
    }
    // Kötelező mezők ellenőrzése: ha a korszak üres, megjelenik a hibaüzenet
    if (korszak.value === "") {
        korszakError.style.display = "block";
        valid = false;
    }
    if (!valid) {
        return;                                   // Ha a validáció sikertelen, kilép a függvényből és nem folytatja a további lépéseket
    }

    // Értékek lekérése és esetlegesen felesleges szóközök levágása (trim-elés)
    const koltoNevValue = koltoNev.value;        
    const korszakValue = korszak.value;
    const szerelem1Value = szerelem1.value;
    const szerelem2Value = szerelem2.value;
    const checkboxChecked = checkbox.checked;     // Lekéri, hogy be van-e jelölve a checkbox

    // Szerelmek értékének beállítása a checkbox alapján:
    // Ha a checkbox nincs bejelölve, akkor csak az első szerelmi adat kerül megjelenítésre, külön cellában
    let column3 = "";
    let column4 = undefined;

    if (!checkboxChecked) {
        column3 = (szerelem1Value === "" ? "-" : szerelem1Value);
        // column4 marad undefined, így a generateTable() függvény összevonja a cellákat, ha nincs második adat
    } else {
        // Ha a checkbox be van jelölve, akkor mindkét szerelmi adat külön cellában jelenik meg
        column3 = (szerelem1Value === "" ? "-" : szerelem1Value);
        column4 = (szerelem2Value === "" ? "-" : szerelem2Value);
    }

    // Új táblázatsor objektumának létrehozása az űrlap mezőinek értékeivel
    const newElement = {
        column1: koltoNevValue,    // Szerző neve
        column2: korszakValue,     // Korszak
        column3: column3,          // Első szerelmi adat (vagy "-" ha üres)
        column4: column4           // Második szerelmi adat (vagy undefined ha nincs)
    };

    // Új sor hozzáfűzése a tömbhöz és a táblázat újragenerálása a friss adatokkal
    array.push(newElement);
    generateTable();

    // Űrlap mezők alaphelyzetbe állítása a reset metódussal
    form.reset();
});
