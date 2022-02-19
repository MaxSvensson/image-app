import React, { useState } from "react";
import "./App.css";
import ImageInput from "./components/ImageInput/ImageInput";
import NameInput from "./components/NameInput/NameInput";

const API_ROOT_URL = process.env.API_ROOT_URL || "http://localhost:3002";

function App() {


  const [values, setValues] = useState({
    name: "",
    photo: null
  })

  const [status, setStatus] = useState(undefined)



  const onInputChange = (value, field) => {
    setStatus(undefined)
    let Values = { ...values }
    
    Values[field] = value
    setValues(Values)
  }

  const clearValues = () => {
    setValues(prev => ({
      ...prev,
      name: ""
    }))
  }

  const onSubmitForm = (e) => {
    e.preventDefault()


    const data = new FormData()
    data.append('name', values.name)
    data.append('photo', values.photo)
    
      fetch(`${API_ROOT_URL}/images`, {
        method: "POST",
        body: data
      }).then(res => {
        if(!res.ok) throw new Error("Upload unsuccessful")
        return res;
      }).then(res => {
        clearValues()
        setStatus("SUCCESS")
      }).catch(e => {
        setStatus("ERROR")
      })

  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="input-box">
          <h1>Ladda upp bild</h1>
          {status && <p className={`status ${status === "SUCCESS" ? "success" : "error"}`}>{status === "SUCCESS" ? "Bild uppladdad.." : "Något gick fel.."}</p>}
          <form onSubmit={onSubmitForm}>
            <NameInput value={values.name} onChange={onInputChange} />
            <ImageInput value={values.photo} onChange={onInputChange} />  
            <button>Ladda upp</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
