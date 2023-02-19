export function czyPoprawnyNumer(e) {
    if (isNaN(parseInt(e.key, 10)) === true) return e.preventDefault();
    return true;
}

export function czyPoprawnaLiczba(e) {
    const numberRegEx = /\d/;
    if (!numberRegEx.test(e.key)) {
        return e.preventDefault();
    }
    return true;
}

export function czyPoprawnaLekcja(e) {
    let lekcjaRegEx = /[|!@#$%^&*(){}_+\-=:";',./<>?`~\\[\]]/;
    if (lekcjaRegEx.test(e.key) === true) {
        return e.preventDefault();
    }
    return true;
}

export function textToNumber(val) {
    if (val === "") {
        return -1;
    }
    return parseInt(val, 10);
}

export function czyNazwaIstnieje(val) {
    if (val.length > 0) {
        return true;
    }
    return false;
}

export function czyPoprawnyZakresGodzin(val) {
    if (val >= 0 && val <= 24) {
        return true;
    }
    return false;
}

export function czyPoprawnyZakresMinut(val) {
    if (val >= 0 && val <= 59) {
        return true;
    }
    return false;
}

export function czyCancelAktywny(val1, val2, val3) {
    if (val1.length === 0 && val2 === -1 && val3 === -1) {
        return true;
    }

    return false;
}

export function liczenieCzasu(lekcjaG, lekcjaM, obecnaG, obecnaM, obecnaS) {
    let sekundyLeckja = (lekcjaG * 3600) + (lekcjaM * 60)
    let sekundyObecnyCzas = (obecnaG * 3600) + (obecnaM * 60) + obecnaS

    let roznicaSekund = Math.floor(sekundyObecnyCzas - sekundyLeckja)

    const dateToLesson = new Date(0)

    dateToLesson.setSeconds(sekundyLeckja - sekundyObecnyCzas)

    const hoursToLesson = dateToLesson.getHours() - 1
    const minutesToLesson = dateToLesson.getMinutes()
    const secondsToLesson = dateToLesson.getSeconds()

    const dateToLessonEnd = new Date(0)

    dateToLessonEnd.setSeconds(2700 - roznicaSekund)

    const minutesToLessonEnd = dateToLessonEnd.getMinutes()
    const secondsToLessonEnd = dateToLessonEnd.getSeconds()

    if (roznicaSekund < 0) {
        return `Do lekcji zosatało: ${hoursToLesson === 0 ? "" : `${hoursToLesson} godzin,`} ${minutesToLesson} minut i ${secondsToLesson} sekund.`
    }
    else if (roznicaSekund >= 0 && roznicaSekund < 2700) {
        return `Lekcja trwa, do końca ${minutesToLessonEnd} minut i ${secondsToLessonEnd} sekund.`
    }
    else {
        return "Lekcja się już skończyła!";
    }
}

export function odliczanieColor(lekcjaG, lekcjaM, obecnaG, obecnaM) {

    const czasLekcji = lekcjaG * 60 + lekcjaM;
    const czasObecny = obecnaG * 60 + obecnaM;

    const roznicaCzasu = czasLekcji - czasObecny;


    if (roznicaCzasu > 0 && roznicaCzasu < 15) {
        return { backgroundColor: "#808080" } // dark gray
    }
    else if (roznicaCzasu > 0) {
        return { backgroundColor: "#505050" } //light gray
    }
    else if (roznicaCzasu <= 0 && roznicaCzasu > -45) {
        return { backgroundColor: "#49" + ((Math.ceil((45 - roznicaCzasu % 45) / 15) + 3).toString()) + "040" } //green
    }
    else if (roznicaCzasu < 0) {
        return { backgroundColor: "#904940" } //red
    }
}

export function nachodzenieGodzin(czasG, czasM) {
    const listaLekcji = JSON.parse(localStorage.getItem("Lekcje")) || []

    let nachodzi = false

    listaLekcji.forEach(( e ) => {
        listaLekcji.forEach(( ee ) => {
            if (e.czasG === ee.czasG) {
                if (e.czasM === ee.czasM) {
                    if (e.id !== ee.id) {
                        nachodzi = true
                    }
                }
            }
        })
    })

    if (nachodzi) {
        return "Uważaj! Sprawdź dokładnie wpisane lekcje, ponieważ prawdopodobnie wprowadziłeś błędne godziny, które ze sobą kolidują!"
    }
}