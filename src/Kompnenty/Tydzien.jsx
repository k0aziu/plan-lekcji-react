import React from "react";
import ".././Style/Tydzien.css";

const Tydzien = (props) => {

    return(
        <div className="tydzien">
            <button onClick={props.poprzedniDzien()}>Poprzedni dzień</button>
            <h3>{props.dzien}</h3>
            <button onClick={props.nastepnyDzien()}>Następny dzień</button>
        </div>
    )
}

export default Tydzien;