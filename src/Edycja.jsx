import React from 'react';
import './Style/Edycja.css';
import { czyCancelAktywny, czyPoprawnaLiczba, czyPoprawnaLekcja, textToNumber, czyNazwaIstnieje, czyPoprawnyZakresGodzin, czyPoprawnyZakresMinut } from "./Utilities/utilsy";

const EdycjaLekcji = props => {
    return(
        <div className='EdycjaLekcji'>
            <div className='EdycjaLekcji_input-grupa'>
                <label htmlFor='poleTekstowe'>
                    Podaj Nazwę
                </label>

                <input type='text' id='name' name='name' value={props.name} 
                onKeyPress= {e => czyPoprawnaLekcja(e)} 
                onChange={(e) => props.onInputChange({[e.target.name]: e.target.value})} />

            </div>
            
            <div className='EdycjaLekcji_input-grupa'>
                <label htmlFor='czasG'>
                    Podaj Godzinę
                </label>

                <input type='text' id='czasG' name='czasG' value={props.czasG === -1 ? "" :props.czasG} 
                onKeyPress= {e => czyPoprawnaLiczba(e)} 
                onChange={(e) => props.onInputChange({[e.target.name]: textToNumber(e.target.value)})} />

            </div>
                    
            <div className='EdycjaLekcji_input-grupa'>
                <label htmlFor='czasM'>
                    Podaj Minutę
                </label>

                <input type='text' id='czasM' name='czasM' value={props.czasM === -1 ? "" :props.czasM} 
                onKeyPress= {e => czyPoprawnaLiczba(e)} 
                onChange={(e) => props.onInputChange({[e.target.name]: textToNumber(e.target.value)})} />

            </div>
            <button disabled={!(czyNazwaIstnieje(props.name)) || !(czyPoprawnyZakresGodzin(props.czasG)) || !(czyPoprawnyZakresMinut(props.czasM))} onClick={()=> props.onSave()}>Wprowadź</button>
            <button disabled={czyCancelAktywny(props.name, props.czasG, props.czasM)} onClick={() => props.czyszczenieEdycji()}>Wyczyść</button>
        </div>
    );
}

export default EdycjaLekcji;