import React from 'react';
import './Table.css';
import numeral from "numeral";

function Table({countries}) {
    return (
        <div className="table">
            {countries.map(({country, cases}) => (
               <tr>
                   <td>{country}</td>
                   <td>
                       <storng>{numeral(cases).format("0,0")}</storng>
                    </td>
               </tr> 
            ))}
        </div>
    )
}

export default Table;
 