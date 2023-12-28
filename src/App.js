import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [personas, setPersonas] = useState([]);
  const [nombrePersona, setNombrePersona] = useState('');

  useEffect(() => {
    // Recuperar datos del localStorage al cargar la página
    const storedPersonas = JSON.parse(localStorage.getItem('personas')) || [];
    setPersonas(storedPersonas);
  }, []);

  useEffect(() => {
    // Guardar datos en localStorage cada vez que cambien las personas
    localStorage.setItem('personas', JSON.stringify(personas));
  }, [personas]);

  const agregarPersona = () => {
    if (nombrePersona.trim() !== '') {
      setPersonas([...personas, { nombre: nombrePersona, cervezas: 0 }]);
      setNombrePersona('');
    }
  };

  const modificarCervezas = (index, cantidad) => {
    const nuevasPersonas = [...personas];
    nuevasPersonas[index].cervezas += cantidad;
    setPersonas(nuevasPersonas);
  };

  const agregarCerveza = (index) => {
    modificarCervezas(index, 1);
  };

  const restarCerveza = (index) => {
    if (personas[index].cervezas > 0) {
      modificarCervezas(index, -1);
    }
  };

  return (
    <div className="App">
      <h1>Go Team Beer</h1>
      <div id="personas">
        {personas.map((persona, index) => (
          <div key={index} className="persona">
            <strong>{persona.nombre}</strong>
            <p>Chelitas: {persona.cervezas}</p>
            <div>
              <button onClick={() => agregarCerveza(index)}>+ Beer</button>
              <button onClick={() => restarCerveza(index)}>- Beer</button>
            </div>
          </div>
        ))}
      </div>
      <div id="agregarPersona">
        <input
          type="text"
          value={nombrePersona}
          onChange={(e) => setNombrePersona(e.target.value)}
          placeholder="Nombre de la persona"
        />
        <button onClick={agregarPersona}>Agregar Persona</button>
      </div>
    </div>
  );
};

export default App;
