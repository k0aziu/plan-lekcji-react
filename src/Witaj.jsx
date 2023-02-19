import React, { Component } from "react";
import EdycjaLekcji from "./Edycja";
import Odliczanie from "./Odliczanie";
import Tydzien from "./Kompnenty/Tydzien";
import './Style/Witaj.css';
import uniqid from 'uniqid'
import { textToNumber, nachodzenieGodzin } from "./Utilities/utilsy";

class Powitanie extends Component {
    constructor() {
        super();
        this.state = {
            currentDay: 1,
            Lekcje:
                [
                    // {id:0, name:"Lekcja 1", czasG:"07", czasM:"45"},
                    // {id:1, name:"Lekcja 2", czasG:"08", czasM:"35"},
                    // {id:2, name:"Lekcja 3", czasG:"09", czasM:"25"},
                    // {id:3, name:"Lekcja 4", czasG:"10", czasM:"15"},
                    // {id:4, name:"Lekcja 5", czasG:"11", czasM:"15"},
                    // {id:5, name:"Lekcja 6", czasG:"12", czasM:"15"},
                ],
            edytowaneLekcje: {
                id: uniqid(),
                name: "",
                czasG: -1,
                czasM: -1,
                currentDay: 0,
            },
            Czas:
            {
                dzien: new Date().getDay(),
                godzina: new Date().getHours(),
                minuta: new Date().getMinutes(),
                sekunda: new Date().getSeconds(),
            },
        };
        this.dodanieLekcji = this.dodanieLekcji.bind(this);
        this.zapisanieLekcji = this.zapisanieLekcji.bind(this);
        this.usuwanieLekcji = this.usuwanieLekcji.bind(this);
        this.edycjaLekcji = this.edycjaLekcji.bind(this);
        this.czyscEdycje = this.czyscEdycje.bind(this);
        this.odswiezanieCzasu = this.odswiezanieCzasu.bind(this);
        this.nextDay = this.nextDay.bind(this);
        this.prevDay = this.prevDay.bind(this);
    }

    dodanieLekcji(val) {
        this.setState(prevState => {
            return {
                edytowaneLekcje: Object.assign(prevState.edytowaneLekcje, val)
            };
        })
    }

    edycjaLekcji(id) {
        this.setState(prevState => ({
            edytowaneLekcje: prevState.Lekcje.find(element => element.id === id)
        }))
    }

    zapisanieLekcji() {
        this.setState(prevState => {
            const czyLekcjaJuzIstnieje = prevState.Lekcje.find(
                element => element.id === prevState.edytowaneLekcje.id
            );
            let aktualizowanieLekcji;
            if (czyLekcjaJuzIstnieje) {
                aktualizowanieLekcji = prevState.Lekcje.map(element => {
                    if (element.id === prevState.edytowaneLekcje.id) {
                        return prevState.edytowaneLekcje;
                    }
                    else {
                        return element;
                    }
                })
            }
            else {
                aktualizowanieLekcji = [...prevState.Lekcje, prevState.edytowaneLekcje]
            }
            return {
                Lekcje: aktualizowanieLekcji,
                edytowaneLekcje: {
                    id: uniqid(),
                    name: "",
                    czasG: -1,
                    czasM: -1,
                }
            }

        }, () => localStorage.setItem("Lekcje", JSON.stringify(this.state.Lekcje)
        ));
    }

    usuwanieLekcji(id) {
        this.setState(prevState => ({
            Lekcje: prevState.Lekcje.filter(element => element.id !== id)
        }), () => localStorage.setItem("Lekcje", JSON.stringify(this.state.Lekcje))
        )
    }

    czyscEdycje() {
        this.setState({
            edytowaneLekcje: {
                id: uniqid(),
                name: "",
                czasG: -1,
                czasM: -1,
            }
        })
    }

    odswiezanieCzasu() {
        this.setState({
            Czas: {
                dzien: new Date().getDay(),
                godzina: new Date().getHours(),
                minuta: new Date().getMinutes(),
                sekunda: new Date().getSeconds(),
            }
        })
    }

    nextDay() {
        if (this.state.currentDay === 5) {
            this.setState({ currentDay: 1 })
        }
        else {
            this.setState((st) => ({ currentDay: st.currentDay + 1 }))
        }
    }

    prevDay() {
        if (this.state.currentDay === 1) {
            this.setState({ currentDay: 5 })
        }
        else {
            this.setState((st) => ({ currentDay: st.currentDay - 1 }))
        }
    }

    componentDidMount() {
        const listaLekcji = JSON.parse(localStorage.getItem("Lekcje")) || []

        this.setState({ Lekcje: listaLekcji })
        const d = new Date()
        if (d.getDay() > 5 || d.getDay() === 0) {
            this.setState({ currentDay: 1 })
        }
        else {
            this.setState({ currentDay: d.getDay() })
        }
        setInterval(this.odswiezanieCzasu, 250)
    }

    render() {
        const Lekcje = this.state.Lekcje.map(element => {
            return <Odliczanie
                key={element.id}
                id={element.id}
                name={element.name}
                czasG={textToNumber(element.czasG)}
                czasM={textToNumber(element.czasM)}
                obecnyCzas={this.state.Czas}
                Usun={id => this.usuwanieLekcji(id)}
                edytujLekcje={id => this.edycjaLekcji(id)}
                currentDay={element.currentDay} />
        })

        return (
            <div className="Lekcje">
                <Tydzien
                    dzien={this.state.currentDay}
                    nastepnyDzien={() => this.nextDay}
                    poprzedniDzien={() => this.prevDay}
                />
                {Lekcje}
                <br />
                <EdycjaLekcji
                    name={this.state.edytowaneLekcje.name}
                    czasG={this.state.edytowaneLekcje.czasG}
                    czasM={this.state.edytowaneLekcje.czasM}
                    onInputChange={val => this.dodanieLekcji(val)}
                    onSave={() => this.zapisanieLekcji()}
                    czyszczenieEdycji={() => this.czyscEdycje()}
                    currentDay={this.props.dzien}
                />
                <br />
                <b> {nachodzenieGodzin()} </b>
            </div>
        )
    }
}

export default Powitanie;