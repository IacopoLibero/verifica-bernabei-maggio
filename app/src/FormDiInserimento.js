import {useState} from 'react';


export default function FormDiInserimento({id,setLoading,setTentativi,setVitt}) {
    const [stato, setStato] = useState();
    const [inviato,setInviato]=useState(false);
    const [tent,setTent]=useState();
    const [n,setN]=useState();

    /*
        PUT -  http://localhost:8080/partita/:id
        body: {"numero": 63}
        ramite questa chiamata è possibile tentare di indovinare il numero per la partita identificata da id. Il server risponderà con un JSON di questo tipo:
        {"risultato":-1,"tentativi":6}
    */

    async function invia()
    {
        setInviato(true);
        const response = await fetch(`http://localhost:8080/partita/${id}`,
        {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({numero:n})
        });
        const risposta = await response.json();
        setStato(risposta.risultato);
        setTent(risposta.tentativi);
        setTentativi(risposta.tentativi);
        
        
    }
    function gestisciN(e){
        setN(e.target.value);
    }
   
    return(
        <div>
            <div>
                <div>
                    <input type="number" value={n} onChange={gestisciN}></input>
                </div>
                <div>
                    <button onClick={invia}>Invia</button>
                </div>
            </div>

            {inviato && stato === 0 &&
                
                <> 
                    {
                        setVitt(true)
                    }
                    <p>hai indovinato il numero in {tent} tentativi</p>
                </>
            }
            {inviato && stato === -1 &&
                <> 
                    <p>numero troppo piccolo</p>
                </>
            }
            {inviato && stato === 1 &&
                <> 
                    <p>numero troppo grande</p>
                </>
            }
        </div>
    )
}
