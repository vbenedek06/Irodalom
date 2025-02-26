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


/**
 * Létrehozza az űrlap elemet és visszaadja azt.
 *
 * Az űrlap tartalmazza a költő nevének, korszakának és szerelmi adatainak megadásához szükséges input mezőket,
 * valamint egy jelölőnégyzetet arra az esetre, ha van második szerelmi adat.
 *
 * @returns {HTMLFormElement} Az elkészített <form> elem.
 */
// A generateForm függvény létrehozza és visszaadja az űrlap elemet.
function generateForm() {
    // Új <form> elem létrehozása.
    const form = document.createElement('form');
    // Az űrlap id attribútumának beállítása "form"-ra.
    form.id = 'form';
    // Az űrlap action attribútumának beállítása "#" értékre (jelenlegi oldal, nincs küldés).
    form.action = '#';

    // Definiálja az űrlap mezőit tartalmazó tömböt, melyben minden objektum egy mezőt reprezentál.
    const columns = [
        { label: 'Költő neve:', type: 'text', id: 'kolto_nev' },      // Szövegmező a költő nevének megadásához.
        { label: 'Korszak:', type: 'text', id: 'korszak' },            // Szövegmező a korszak megadásához.
        { label: 'Szerelme:', type: 'text', id: 'szerelem1' },          // Szövegmező az első szerelmi adat megadásához.
        { label: 'Volt másik szerelme?', type: 'checkbox', id: 'masodik', checked: false }, // Jelölőnégyzet, ha volt még egy szerelme.
        { label: 'Szerelme:', type: 'text', id: 'szerelem2' }           // Szövegmező a második szerelmi adat megadásához.
    ];

    for (let i = 0; i < columns.length; i++) {    // Végigiterál a columns tömb minden elemén.
        const column = columns[i];        // Az aktuális mező objektumának lekérése.
        const div = document.createElement('div');        // Új <div> elem létrehozása, amely az egyes mezőket fogja tartalmazni.
        const label = document.createElement('label');        // Új <label> elem létrehozása a mezőhöz.
        label.htmlFor = column.id;        // A label "for" attribútumának beállítása az aktuális mező id-jére.
        label.innerText = column.label;        // A label szövegének beállítása a column objektumban megadott label értékre.


        div.appendChild(label);// A label hozzáadása a <div>-hez.
        // Új sor beszúrása a <div> elembe.
        div.appendChild(document.createElement('br'));

        const input = document.createElement('input');        // Új <input> elem létrehozása a mezőhöz.
        input.type = column.type;        // Az input típusa a column objektumban megadott type érték szerint.
        input.id = column.id;        // Az input id attribútumának beállítása.
        input.name = column.id;        // Az input name attribútumának beállítása azonos értékre, mint az id.
        if (column.type === 'checkbox' && column.checked !== undefined) {        // Ha az input egy checkbox, és van checked tulajdonság meghatározva, akkor azt beállítjuk.

            input.checked = column.checked;
        }
        div.appendChild(input);        // Az input hozzáadása a <div>-hez.


        const errorDiv = document.createElement('div');        // Új <div> elem létrehozása a hibaüzenetek megjelenítéséhez.

        errorDiv.className = 'error-message';        // A hibaüzenet div osztályának beállítása "error-message"-re a stílusokhoz.
        errorDiv.id = "error-" + column.id.replace("_", "-");        // A hibaüzenet div id-jének beállítása "error-" előtaggal, majd a column id-ből az "_" helyett "-" használatával.

        div.appendChild(errorDiv);        // A hibaüzenet div hozzáadása a <div>-hez.
        div.appendChild(document.createElement('br'));        // Új sor beszúrása a <div> elembe.
        div.appendChild(document.createElement('br'));        // Még egy sor beszúrása az extra tér eléréséhez.
        form.appendChild(div);        // A teljes <div> elem (label, input, hibaüzenet) hozzáadása az űrlaphoz.
    }
    const submit = document.createElement('button');    // Új <button> elem létrehozása, amely az űrlap elküldését szolgálja.
    submit.type = 'submit';    // A gomb típusának beállítása "submit"-re.
    submit.innerText = 'Hozzáadás';    // A gomb szövegének beállítása "Hozzáadás"-ra.
    form.appendChild(submit);    // A gomb hozzáadása az űrlaphoz.
    document.body.appendChild(form);    // Az elkészült űrlap hozzáadása a dokumentum <body> részéhez.
    return form;    // A függvény visszaadja az űrlap elemet.

}
// A generateForm függvény meghívása, és az eredmény tárolása a formElement változóban.
const formElement = generateForm();
/**
 * Létrehozza a táblázat fejlécét.
 *
 * A függvény egy fejléc sort (<tr>) hoz létre a megadott fejléc adatok alapján, és hozzáadja azt a 
 * paraméterként kapott <thead> elemhez. Ha a fejlécben szerepel a "column3" kulcs, akkor annak cellája két oszlopot foglal.
 *
 * @param {Object} headerData - A fejléc adatait tartalmazó objektum, ahol a kulcsok a cellák.
 * @param {HTMLElement} tableHeader - A <thead> HTML elem, amelyhez a fejléc sort hozzá kell adni.
 *  */

function generateTableHeader(headerData, tableHeader) {
    // Létrehozunk egy új sort (<tr>) a fejléc számára
    const headerRow = document.createElement('tr');

    // Végigiterálunk a fejléc objektum kulcsain
    for (const key in headerData) {
        // Létrehozunk egy fejléc cellát (<th>)
        const headerCell = document.createElement('th');
        // Beállítjuk a cella tartalmát a headerData adott kulcsához tartozó értékre
        headerCell.innerHTML = headerData[key];

        // Ha a kulcs 'column3', akkor két oszlopnyi szélességet állítunk be
        if (key === 'column3') {
            headerCell.colSpan = 2;
        }
        // Hozzáadjuk a fejléc cellát a fejléc sorhoz
        headerRow.appendChild(headerCell);
    }
    // A kész fejléc sort hozzáadjuk a megadott <thead> elemhez
    tableHeader.appendChild(headerRow);
}


/**
 * Létrehozza a táblázat törzsét a megadott adatok alapján.
 *
 * A függvény törli a korábbi táblázattartalmat, majd létrehozza a <tbody> elemet, és minden adatsorhoz
 * egy új <tr> sort, ahol a szerző neve, korszak, valamint az első és esetleg második szerelmi adat megjelenítésre kerül.
 *
 * @param {Array<Object>} data - A táblázat adatait tartalmazó tömb, ahol az első elem a fejléc.
 */
// Táblázat törzsének generálása: függvény, amely újragenerálja a táblázat tartalmát

function generateTable(data) {
    table.innerHTML = '';                          // Törli a táblázat korábbi tartalmát
    table.appendChild(tableHeader);                // Újra hozzáadja a fejlécet a táblázathoz

    const tbody = document.createElement('tbody'); // Létrehoz egy <tbody> elemet a táblázat adatsorainak
    table.appendChild(tbody);                        // Hozzáfűzi a <tbody>-t a táblázathoz

    // Az első tömb elem a fejléc, így az adatsorok indexe 1-től indul
    for (let i = 1; i < data.length; i++) {
        const row = document.createElement('tr');  // Létrehoz egy új sort (<tr>) az adatsorhoz
        tbody.appendChild(row);                      // Hozzáfűzi az új sort a táblázat törzséhez

        // Szerző neve: első oszlop cella létrehozása
        const rowColumn1 = document.createElement('td');
        rowColumn1.innerHTML = data[i].column1;  // Beállítja a cella tartalmát a szerző nevére
        row.appendChild(rowColumn1);                      // Hozzáfűzi a cellát a sorhoz

        // Korszak: második oszlop cella létrehozása
        const rowColumn2 = document.createElement('td');
        rowColumn2.innerHTML = data[i].column2;  // Beállítja a cella tartalmát a korszakra
        row.appendChild(rowColumn2);                     // Hozzáfűzi a cellát a sorhoz

        // Szerelmek: ellenőrzi, hogy van-e column4 érték, hogy két külön cellát vagy egy összevont cellát kell-e létrehozni
        if (!data[i].column4) {
            // Ha nincs második szerelmi adat, akkor egy cella, két oszlopot lefedő cella készül
            const rowColumn3 = document.createElement('td');
            // Ha a column3 üres, akkor "-" jelenik meg, egyébként a column3 értéke
            rowColumn3.innerHTML = (data[i].column3 === "" ? "-" : data[i].column3);
            rowColumn3.colSpan = 2;                    // A cella két oszlopot foglal el
            row.appendChild(rowColumn3);               // Hozzáfűzi a cellát a sorhoz
        } else {
            // Ha van második szerelmi adat, akkor két külön cellát hoz létre
            const rowColumn3 = document.createElement('td');
            rowColumn3.innerHTML = (data[i].column3 === "" ? "-" : data[i].column3);
            row.appendChild(rowColumn3);               // Hozzáfűzi az első szerelmi adatot tartalmazó cellát a sorhoz

            const rowColumn4 = document.createElement('td');
            rowColumn4.innerHTML = (data[i].column4 === "" ? "-" : data[i].column4);
            row.appendChild(rowColumn4);               // Hozzáfűzi a második szerelmi adatot tartalmazó cellát a sorhoz
        }
    }
}
// Fejléc létrehozása és az első táblázat kirajzolása
generateTableHeader(array[0], tableHeader);
// Kezdeti táblázat kirajzolása a generateTable függvény meghívásával
generateTable(array);

const form = document.getElementById('form'); // Megkeresi az `form` azonosítójú HTML elemet
const koltoNevError = document.getElementById('error-kolto-nev'); // HTML elem lekérése, amely a szerző nevéhez tartozó hibaüzenetet jeleníti meg
const korszakError = document.getElementById('error-korszak'); // HTML elem lekérése, amely a korszakhoz tartozó 
// Validációs függvény: ellenőrzi, hogy az adott mező nem üres-e
// A validatecolumn függvény ellenőrzi, hogy egy űrlapmező (columnElement) nem üres-e, és ennek megfelelően kezeli a hozzá tartozó hibaüzenet elem (errorElement) láthatóságát.
/**
 * Validálja, hogy egy adott űrlapmező nem üres-e.
 *
 * A függvény ellenőrzi a bemeneti mező (columnElement) értékét, és ha az üres, akkor a hozzá tartozó 
 * hibaüzenet elemben (errorElement) megjeleníti a hibát.
 *
 * @param {HTMLElement} columnElement - Az űrlap input eleme, amelyet validálni kell.
 * @param {HTMLElement} errorElement - Az elem, ahol a hibaüzenetet jelenítjük meg.
 * @returns {boolean} Igaz, ha a mező nem üres, különben hamis.
 */
function validatecolumn(columnElement, errorElement) { // Függvény, amely egy bemeneti mezőt és egy hibaüzenet elemet vár, hogy validálja a bemeneti mezőt
    let valid = true; // A valid változó alapértelmezett értéke igaz, amely azt jelzi, hogy a mező helyes

    if (columnElement.value === "") {
        errorElement.innerText = "Hiba: Ezt a mezőt kötelező kitölteni!";
        errorElement.style.display = "block";
        valid = false;
    } else {
        errorElement.style.display = "none";
    }
    return valid;
}
/**
 * Második szintű validáció a szerelmi adatokra.
 *
 * Ellenőrzi, hogy ha a "Volt másik szerelme?" checkbox be van jelölve, akkor mindkét szerelmi adat mező
 * (szerelem1Element és szerelem2Element) ki van-e töltve. A megfelelő hibaüzeneteket jeleníti meg, ha valamelyik mező üres.
 *
 * @param {HTMLInputElement} checkboxElement - A checkbox elem, amely azt jelzi, hogy van-e második szerelmi adat.
 * @param {HTMLInputElement} szerelem1Element - Az első szerelmi adatot tartalmazó input mező.
 * @param {HTMLInputElement} szerelem2Element - A második szerelmi adatot tartalmazó input mező.
 * @returns {boolean} Igaz, ha a validáció sikeres, különben hamis.
 */
function secondValidation(checkboxElement, szerelem1Element, szerelem2Element) {
    let valid = true; // A valid változó alapértelmezett értéke igaz, amely azt jelzi, hogy a mező helyes
 
    const error1 = document.getElementById('error-szerelem1'); //  Lekérjük az első szerelem hibaüzenet elemét a DOM-ból.
    const error2 = document.getElementById('error-szerelem2'); //  Lekérjük a második szerelem hibaüzenet elemét a DOM-ból.

    if (checkboxElement.checked) { // Ellenőrizzük, hogy a "Volt másik szerelme?" checkbox be van-e jelölve.
        // Ha a jelölőnégyzet be van jelölve, akkor mindkét szerelem mezőt kötelező kitölteni.
        // Ellenőrizzük, hogy az első szerelem mező üres-e VAGY a második szerelem mező üres (a trim() eltávolítja a felesleges szóközöket).
        if (szerelem1Element.value === "" || szerelem2Element.value === "") { 
            error1.innerText = "A költőnek kötelező megadni a szerelemeit"; // Beállítjuk az első hibaüzenet szövegét.
            error2.innerText = "A költőnek kötelező megadni a szerelemeit"; //  Beállítjuk a második hibaüzenet szövegét.
            error1.style.display = "block"; //  Megjelenítjük az első hibaüzenetet.
            error2.style.display = "block"; //  Megjelenítjük a második hibaüzenetet.
            valid = false; // *** Mivel hiányosak az adatok, az űrlap érvényessége false lesz.
        } else {
            error1.style.display = "none"; //  Ha mindkét mező ki van töltve, elrejtjük az első hibaüzenetet.
            error2.style.display = "none"; //  Ha mindkét mező ki van töltve, elrejtjük a második hibaüzenetet.
        }
    } else {
        // Ha a jelölőnégyzet nincs bejelölve, nem kell ellenőrizni a szerelem mezőket, ezért mindkét hibaüzenetet elrejtjük.
        error1.style.display = "none";
        error2.style.display = "none";
    }
    
    return valid; // Visszatérünk a valid értékkel, amely azt jelzi, hogy az űrlap adatai érvényesek-e.
}

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
