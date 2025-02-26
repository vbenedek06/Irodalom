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
const table = document.createElement('table'); // Táblázat HTML elem létrehozása
document.body.appendChild(table); // Hozzáadjuk a táblázatot a dokumentum törzséhez

const tableHeader = document.createElement('thead'); // Táblázat fejléc elem létrehozása
table.appendChild(tableHeader);

// Táblázat fejlécének és törzsének kirajzolása
generateTableHeader(array[0], tableHeader);
generateTable(array);

// Űrlap létrehozása és eseménykezelő felvétele
const formElement = generateForm();

const koltoNevError = document.getElementById('error-kolto-nev');
const korszakError = document.getElementById('error-korszak');


form.addEventListener('submit', function (e) {
    e.preventDefault();                             // Megszakítja az űrlap alapértelmezett elküldési műveletét

    // Űrlapmezők lekérése a megfelelő id-k alapján
    const koltoNev = document.getElementById('kolto_nev');
    const korszak = document.getElementById('korszak');
    const szerelem1 = document.getElementById('szerelem1');
    const szerelem2 = document.getElementById('szerelem2');
    const checkbox = document.getElementById('masodik');


    let valid = true;

    if (!validatecolumn(koltoNev, koltoNevError)) {
        valid = false; // Ha hiba van a szerző neve mezőben, akkor az űrlapot érvénytelennek jelöljük
    }

    if (!validatecolumn(korszak, korszakError)) {
        valid = false; // Ha hiba van a korszak mezőben, akkor az űrlapot érvénytelennek jelöljük
    }

    if (!valid) {
        return; // Ha a form nem valid, nem kell tovább folyamatosan továbbítani
    }

    if (!secondValidation(checkbox, szerelem1, szerelem2)) {
        valid = false; // Ha hiba van a második szerelem mezőkben, akkor az űrlapot érvénytelennek jelöljük
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

    array.push(newElement); // Az új objektum hozzáadása a táblázat adatait tartalmazó tömbhöz
    table.innerHTML = ''; // Törli a táblázat tartalmát
    table.appendChild(tableHeader);  // Újra hozzáadja a fejlécet a táblázathoz
    generateTable(array); // Meghívja a függvényt, amely újra létrehozza a táblázat törzsét a módosított data alapján

    // Hibaüzenetek eltüntetése a sikeres hozzáadás után
    koltoNev.value = "";
    korszak.value = "";
    szerelem1.value = "";
    szerelem2.value = "";
    checkbox.checked = false;
});
