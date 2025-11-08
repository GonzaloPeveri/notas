import { useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from "uuid";

function App() {
  const [notas, setNotas] = useState([
    {
      id: "b54b7b49-9026-44d5-8699-7177069584bb",
      numero: 2,
      nombre: "Nota 1",
      informacion: "Esta es la información de la primera nota.",
      enUso: true
    },
    {
      id: "bd5c98a8-12d1-4a1c-bab6-d983c656f7cb",
      numero: 2,
      nombre: "Nota 2",
      informacion: "Aquí va la información de la segunda nota.",
      enUso: true
    }
  ]);
  const [editar, setEditar] = useState(-1);
  const [notaSeleccionada, setNotaSeleccionada] = useState(0);

  return (
    <>
      <h1>Notas</h1>
      <div className="container">
        <div className="lista-de-notas-container">
          {notas.map((nota, index) => (
            <ManejarNota key={nota.id} index={index} notas={notas} setNotas={setNotas} setNotaSeleccionada={setNotaSeleccionada} editar={editar} setEditar={setEditar} />
          ))}
          <AddButton notas={notas} setNotas={setNotas} setNotaSeleccionada={setNotaSeleccionada} />
        </div>
        <ContenidoDeNotas notas={notas} setNotas={setNotas} editar={editar} notaSeleccionada={notaSeleccionada} />
      </div>
    </>
  )
}

function ContenidoDeNotas({ notas, setNotas, editar, notaSeleccionada }) {
  console.log(notas[notaSeleccionada].informacion.length);
  function handleChange(event) {
    const newValue = event.target.value;
    setNotas((prevNotas) => {
      const updatedNotas = [...prevNotas];
      updatedNotas[notaSeleccionada] = { ...updatedNotas[notaSeleccionada], informacion: newValue };

      return updatedNotas;
    });
  }

  return (
    <div className="contenido-de-notas-container">
      <h2>{notas[notaSeleccionada].nombre}</h2>

      {/* editar = -1 significa que no hay edición. El resto de números apuntan a una de las notas.  */}
      {(editar > -1) ? <textarea className="informacion-textarea" value={notas[notaSeleccionada].informacion} onChange={handleChange} /> :
        <p className="informacion-paragraph">{notas[notaSeleccionada].informacion}</p>
      }
    </div>
  )
}

function ManejarNota({ notas, setNotas, index, setNotaSeleccionada, editar, setEditar }) {

  function handleElegirNota() {
    setNotaSeleccionada(index);
  }

  function handleChange(event) {
    const newValue = event.target.value;

    setNotas((prevNotas) => {
      const updatedNotas = [...prevNotas];
      updatedNotas[index] = { ...updatedNotas[index], nombre: newValue };

      return updatedNotas;
    });
  }

  function handleDelete() {
    setNotas(prevNotas => prevNotas.filter((nota, filter) => filter !== index));
  }



  return (
    <div className="nota-container">
      {(editar === index) ?
        <input className="editar-nota-input" onChange={handleChange} value={notas[index].nombre} />
        :
        <button className="nota" onClick={handleElegirNota}>{notas[index].nombre}</button>
      }
      <button className="editar-nota-toggle" onClick={() => {
        handleElegirNota();
        setEditar((editar === index ? -1 : index))
      }
      }
      >
        {(editar === index) ? 'Cancelar' : 'Editar'}
      </button>
      <button className="eliminar-nota" onClick={handleDelete}>Eliminar</button>
    </div>
  )
}



function AddButton({ notas, setNotas, setNotaSeleccionada }) {
  const notaCreada = "desp arreglar";

  const handleClick = () => {
    // Generamos un nuevo ID único con uuid
    const nuevaNota = {
      id: uuidv4(),  // Generamos un ID único
      nombre: "Nueva Nota " + (notas.length + 1),
      numero: notas.length,
      informacion: "Información de la nueva nota.\n" + uuidv4(),
      enUso: "true"
    };
    // Actualizamos el estado con la nueva nota
    setNotas((prevNotas) => [...prevNotas, nuevaNota]);
    //setNotaSeleccionada(notas.length);
  };

  return (
    <div className="contenedor-de-boton">
      <button className="agregar-nota" onClick={handleClick}>+</button>
    </div>
  )
}

export default App

