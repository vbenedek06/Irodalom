/**
 * Létrehozza az űrlap elemet és visszaadja azt.
 * Az űrlap tartalmazza a költő nevének, korszakának és szerelmi adatainak megadásához szükséges input mezőket,
 * valamint egy jelölőnégyzetet arra az esetre, ha van második szerelmi adat.
 *
 * @returns {HTMLFormElement} Az elkészített <form> elem.
 */
function generateForm() {
    const form = document.createElement('form'); // Létrehozza az <form> HTML elemet.
    form.id = 'form'; // Beállítja az űrlap id-jét "form"-ra.
    form.action = '#'; // Beállítja az űrlap action attribútumát, így az aktuális oldalra mutat (nem küld adatot).

    // Létrehoz egy tömböt, amely az űrlap mezőinek adatait tartalmazza.
    const columns = [
        { label: 'Költő neve:', type: 'text', id: 'kolto_nev' },     // Szövegmező a költő nevének megadásához.
        { label: 'Korszak:', type: 'text', id: 'korszak' },           // Szövegmező a korszak megadásához.
        { label: 'Szerelme:', type: 'text', id: 'szerelem1' },         // Szövegmező az első szerelmi adat megadásához.
        { label: 'Volt másik szerelme?', type: 'checkbox', id: 'masodik', checked: false }, // Jelölőnégyzet a második szerelmi adat jelzéséhez.
        { label: 'Szerelme:', type: 'text', id: 'szerelem2' }          // Szövegmező a második szerelmi adat megadásához.
    ];

    // Végigiterál a columns tömb elemein, hogy létrehozza az egyes mezőket.
    for (let i = 0; i < columns.length; i++) {
        const column = columns[i]; // Az aktuális mező objektumának tárolása.
        const div = document.createElement('div'); // Létrehoz egy <div> elemet, amely a mező elemeit fogja tartalmazni.
        const label = document.createElement('label'); // Létrehoz egy <label> elemet a mezőhöz.
        label.htmlFor = column.id; // Beállítja a label "for" attribútumát, hogy azonosítsa a hozzá tartozó inputot.
        label.innerText = column.label; // Beállítja a label szövegét a megadott címkére.

        div.appendChild(label); // Hozzáadja a label-t a <div>-hez.
        div.appendChild(document.createElement('br')); // Beszúr egy sortörést a <div>-be.

        const input = document.createElement('input'); // Létrehoz egy <input> elemet a mezőhöz.
        input.type = column.type; // Beállítja az input típusát (például "text" vagy "checkbox").
        input.id = column.id; // Beállítja az input id-jét.
        input.name = column.id; // Beállítja az input name attribútumát, hogy megegyezzen az id-vel.
        // Ha az aktuális mező checkbox típusú és van "checked" értéke, beállítja azt.
        if (column.type === 'checkbox' && column.checked !== undefined) {
            input.checked = column.checked; // Beállítja a checkbox alapértelmezett kijelöltségét.
        }
        div.appendChild(input); // Hozzáadja az input elemet a <div>-hez.

        const errorDiv = document.createElement('div'); // Létrehoz egy <div> elemet a hibaüzenet megjelenítéséhez.
        errorDiv.className = 'error-message'; // Beállítja az errorDiv osztályát a megfelelő CSS stílus alkalmazásához.
        // Beállítja az errorDiv id-jét úgy, hogy "error-" előtaggal kezdődjön, és az input id-jét módosítja.
        errorDiv.id = "error-" + column.id.replace("_", "-");

        div.appendChild(errorDiv); // Hozzáadja a hibaüzenet <div>-et a mező konténeréhez.
        div.appendChild(document.createElement('br')); // Beszúr egy sortörést a <div>-be.
        div.appendChild(document.createElement('br')); // Beszúr még egy sortörést az extra tér érdekében.
        form.appendChild(div); // Hozzáadja a teljes <div>-et (az egyes mezőket tartalmazó konténert) az űrlaphoz.
    }
    const submit = document.createElement('button'); // Létrehoz egy <button> elemet, amely az űrlap beküldését fogja indítani.
    submit.type = 'submit'; // Beállítja a gomb típusát "submit"-re, így az űrlap elküldését végzi.
    submit.innerText = 'Hozzáadás'; // Beállítja a gomb feliratát.
    form.appendChild(submit); // Hozzáadja a beküldés gombot az űrlaphoz.
    document.body.appendChild(form); // Hozzáadja az elkészített űrlapot a dokumentum <body> részéhez.
    return form; // Visszaadja az elkészített <form> elemet.
}

/**
 * Létrehozza a táblázat fejlécét.
 * Egy fejléc sort (<tr>) hoz létre a megadott fejléc adatok alapján, majd hozzáadja azt
 * a paraméterként kapott <thead> elemhez. Ha a fejlécben szerepel a "column3" kulcs,
 * annak cellája két oszlopot foglal.
 *
 * @param {Object} headerData - A fejléc adatait tartalmazó objektum.
 * @param {HTMLElement} tableHeader - A <thead> HTML elem, amelyhez a fejlécet hozzá kell adni.
 */
function generateTableHeader(headerData, tableHeader) {
    const headerRow = document.createElement('tr'); // Létrehoz egy <tr> elemet a fejléc sor számára.
    for (const key in headerData) { // Végigiterál a headerData objektum kulcsain.
        const headerCell = document.createElement('th'); // Létrehoz egy <th> elemet (fejléc cella).
        headerCell.innerHTML = headerData[key]; // Beállítja a cella tartalmát a megfelelő értékre.
        if (key === 'column3') { // Ellenőrzi, hogy a kulcs "column3"-e.
            headerCell.colSpan = 2; // Ha igen, a cella két oszlopot foglal el.
        }
        headerRow.appendChild(headerCell); // Hozzáadja a cellát a fejléc sorhoz.
    }
    tableHeader.appendChild(headerRow); // Hozzáadja a kész fejléc sort a <thead> elemhez.
}

/**
 * Létrehozza a táblázat törzsét a megadott adatok alapján.
 * Törli a korábbi tartalmat, létrehoz egy <tbody> elemet,
 * majd minden adatsorhoz (a fejléc kivételével) egy új sort (<tr>) készít,
 * melyben megjelenik a szerző neve, korszak, valamint az első és esetleges második szerelmi adat.
 *
 * @param {Array<Object>} data - A táblázat adatait tartalmazó tömb (az első elem a fejléc).
 */
function generateTable(data) {
    table.innerHTML = ''; // Törli a táblázat eddigi tartalmát.
    table.appendChild(tableHeader); // Hozzáadja a fejlécet a táblázathoz.

    const tbody = document.createElement('tbody'); // Létrehoz egy <tbody> elemet az adatsorok számára.
    table.appendChild(tbody); // Hozzáadja a <tbody>-t a táblázathoz.

    // Végigiterál az adatsorokon, kihagyva az első elemet (amely a fejléc).
    for (let i = 1; i < data.length; i++) {
        const row = document.createElement('tr'); // Létrehoz egy <tr> elemet az aktuális adatsor számára.
        tbody.appendChild(row); // Hozzáadja a sort a <tbody>-hez.

        const rowColumn1 = document.createElement('td'); // Létrehoz egy cellát a szerző neve számára.
        rowColumn1.innerHTML = data[i].column1; // Beállítja a cella tartalmát a szerző nevével.
        row.appendChild(rowColumn1); // Hozzáadja a cellát a sorhoz.

        const rowColumn2 = document.createElement('td'); // Létrehoz egy cellát a korszak számára.
        rowColumn2.innerHTML = data[i].column2; // Beállítja a cella tartalmát a korszak értékével.
        row.appendChild(rowColumn2); // Hozzáadja a cellát a sorhoz.

        // Ellenőrzi, hogy létezik-e a második szerelmi adat (column4).
        if (!data[i].column4) {
            const rowColumn3 = document.createElement('td'); // Létrehoz egy cellát az első szerelmi adat számára.
            // Ha a column3 üres, "-" jelenik meg, egyébként az adat jelenik meg.
            rowColumn3.innerHTML = (data[i].column3 === "" ? "-" : data[i].column3);
            rowColumn3.colSpan = 2; // A cella két oszlopot foglal el, mivel nincs második adat.
            row.appendChild(rowColumn3); // Hozzáadja a cellát a sorhoz.
        } else {
            // Ha van második szerelmi adat, két külön cellát hoz létre.
            const rowColumn3 = document.createElement('td'); // Létrehoz egy cellát az első szerelmi adat számára.
            rowColumn3.innerHTML = (data[i].column3 === "" ? "-" : data[i].column3); // Beállítja a cella tartalmát.
            row.appendChild(rowColumn3); // Hozzáadja a cellát a sorhoz.

            const rowColumn4 = document.createElement('td'); // Létrehoz egy cellát a második szerelmi adat számára.
            rowColumn4.innerHTML = (data[i].column4 === "" ? "-" : data[i].column4); // Beállítja a cella tartalmát.
            row.appendChild(rowColumn4); // Hozzáadja a cellát a sorhoz.
        }
    }
}

/**
 * Validálja, hogy egy adott űrlapmező nem üres-e.
 * Ha a mező üres, a hozzá tartozó hibaüzenet elemben megjelenik egy hibaüzenet.
 *
 * @param {HTMLElement} columnElement - Az űrlap input eleme.
 * @param {HTMLElement} errorElement - Az elem, ahol a hibaüzenet megjelenik.
 * @returns {boolean} Igaz, ha a mező nem üres, különben hamis.
 */
function validatecolumn(columnElement, errorElement) {
    let valid = true; // Feltételezzük, hogy a mező érvényes.
    if (columnElement.value === "") { // Ellenőrzi, hogy a mező értéke üres-e.
        errorElement.innerText = "Hiba: Ezt a mezőt kötelező kitölteni!"; // Beállítja a hibaüzenetet.
        errorElement.style.display = "block"; // Láthatóvá teszi a hibaüzenetet.
        valid = false; // A mező érvénytelennek minősül.
    } else {
        errorElement.style.display = "none"; // Ha a mező ki van töltve, elrejti a hibaüzenetet.
    }
    return valid; // Visszatér az érvényesség logikai értékével.
}

/**
 * Második szintű validáció a szerelmi adatokra.
 * Ha a "Volt másik szerelme?" checkbox be van jelölve, ellenőrzi, hogy mindkét szerelmi adat mező ki van-e töltve.
 * Hiányzó adatok esetén hibaüzenetet jelenít meg.
 *
 * @param {HTMLInputElement} checkboxElement - A checkbox, amely jelzi, hogy van-e második szerelmi adat.
 * @param {HTMLInputElement} szerelem1Element - Az első szerelmi adatot tartalmazó input.
 * @param {HTMLInputElement} szerelem2Element - A második szerelmi adatot tartalmazó input.
 * @returns {boolean} Igaz, ha a validáció sikeres, különben hamis.
 */
function secondValidation(checkboxElement, szerelem1Element, szerelem2Element) {
    let valid = true; // Feltételezzük, hogy a mezők érvényesek.
    const error1 = document.getElementById('error-szerelem1'); // Lekéri az első szerelmi adat hibaüzenet elemét.
    const error2 = document.getElementById('error-szerelem2'); // Lekéri a második szerelmi adat hibaüzenet elemét.

    if (checkboxElement.checked) { // Ellenőrzi, hogy a checkbox be van-e jelölve.
        // Ha be van jelölve, ellenőrzi, hogy mindkét szerelmi adat mező ki van-e töltve.
        if (szerelem1Element.value === "" || szerelem2Element.value === "") {
            error1.innerText = "A költőnek kötelező megadni a szerelemeit"; // Beállítja az első mező hibaüzenetét.
            error2.innerText = "A költőnek kötelező megadni a szerelemeit"; // Beállítja a második mező hibaüzenetét.
            error1.style.display = "block"; // Megjeleníti az első hibaüzenetet.
            error2.style.display = "block"; // Megjeleníti a második hibaüzenetet.
            valid = false; // Érvénytelennek minősíti a mezőket.
        } else {
            error1.style.display = "none"; // Ha mindkét mező ki van töltve, elrejti az első hibaüzenetet.
            error2.style.display = "none"; // Elrejti a második hibaüzenetet.
        }
    } else {
        // Ha a checkbox nincs bejelölve, mindkét hibaüzenetet elrejti.
        error1.style.display = "none";
        error2.style.display = "none";
    }
    
    return valid; // Visszatér az érvényesség logikai értékével.
}
