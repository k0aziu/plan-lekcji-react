import React from 'react';
import PropTypes from 'prop-types';
import './Style/Odliczanie.css';
import deleteImg from './Zdjecia/delete.png';
import { liczenieCzasu, odliczanieColor } from './Utilities/utilsy';


const Odliczanie = props => {
    const czas = liczenieCzasu(props.czasG, props.czasM, props.obecnyCzas.godzina, props.obecnyCzas.minuta, props.obecnyCzas.sekunda)
    const color = odliczanieColor(props.czasG, props.czasM, props.obecnyCzas.godzina, props.obecnyCzas.minuta)

    return (
        <div className='odliczanie' style={color}>
            <div>
                <div className='class_title'>{props.name}</div> {(props.czasG).toString().padStart(2, 0)}:{(props.czasM).toString().padStart(2, 0)}<br />
                {czas}
            </div>
            <div className='operacje'>
                <b className='edycja' onClick={() => props.edytujLekcje(props.id)} title="Edytuj lekcję">Edytuj</b>
                <b className='iks' onClick={() => props.Usun(props.id)}><img id="delete_img" src={deleteImg} alt="Usuń lekcję" title="Usuń lekcję" /></b>
            </div>
        </div>
    )
};

Odliczanie.propTypes = {
    name: PropTypes.string,
    czasG: PropTypes.number,
    czasM: PropTypes.number,
    onSave: PropTypes.func,
    czyPoprawnaLiczba: PropTypes.func,
    czyszczenieEdycji: PropTypes.func,
    obecnyCzas: PropTypes.shape(
        {
            godzina: PropTypes.number,
            minuta: PropTypes.number,
            sekunda: PropTypes.number,
        }
    ),
    currentDay: PropTypes.number,
};

export default Odliczanie