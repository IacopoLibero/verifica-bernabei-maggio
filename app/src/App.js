import logo from './logo.svg';
import './App.css';
import FormDiInserimento from './FormDiInserimento.js';
import {useState} from 'react';

function App() {

  /*
    POST - http://localhost:8080/partita
    Tramite questa chiamata è possibile iniziare una nuova partita. Il server risponderà con un JSON di questo tipo:
    {"id":"ZbsCmhPOfY","numero":89}

    dove
    "id" - rappresenta il codice univoco della partita in corso
    "numero" - rappresenta il numero da indovinare (dovrebbe essere non visibile ma è abilitato solo per semplificare lo sviluppo)
  */
  
  const [ingioco, setIngioco]=useState(false);

  const [loading, setLoading] = useState(false);

  const [id,setId]=useState();
  const [tentativi, setTentativi]=useState(0);
  const [vittoria, setVitt]=useState(false);

  async function start()
  {
    setLoading(true);
    const response = await fetch("http://localhost:8080/partita", {method: "POST"});
    const risposta = await response.json();
    setId(risposta.id);
    setLoading(false);
    setIngioco(true);
  }

  function gestisciTentetivi(e){
    setTentativi(e.target.value);
  }

  return (
    <div className="App">
      <h1>Indovina Numero</h1>
        <button onClick={start}>Inizia partita</button>
      {
        loading ?
          <div>in caricamento...</div>
        :
        <>
          <p>ID: {id}</p>
          <p>Tentativi: {tentativi}</p>
          <p>inserisci un numero tra 1 e 100:</p>
          {
            <FormDiInserimento id={id} setLoading={setLoading} setTentativi={setTentativi} setVitt={setVitt}/>
          }
        </>
      }
      {vittoria &&
        <>
          <div></div>
        </>
      }
    </div>
  );
}

export default App;
