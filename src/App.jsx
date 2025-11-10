import { useEffect, useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from "uuid";

function App() {
  const [notas, setNotas] = useState([
    {
      id: "a12f4c9d-8b3d-4b90-9f45-7b39a91b1234",
      nombre: "Tesla Model S Plaid",
      informacion: "Sedán eléctrico con más de 1,000 caballos de fuerza, capaz de acelerar de 0 a 100 km/h en apenas 2.1 segundos. Es el resultado de años de innovación de Tesla, que buscaba demostrar que un coche eléctrico puede ser más rápido que casi cualquier deportivo a gasolina. Su interior minimalista y su tecnología futurista lo hacen sentir como un vehículo del mañana, disponible hoy.",
      editandoContenido: "Sedán eléctrico con más de 1,000 caballos de fuerza, acelera de 0 a 100 km/h en 2.1 segundos."
    },
    {
      id: "b72d5f8e-6a14-4a25-8e29-b93d94e527cb",
      nombre: "Toyota GR Supra",
      informacion: "Me encanta su diseño agresivo y cómo suena el motor de seis cilindros en línea. Es puro placer manejarlo.",
      editandoContenido: "Me encanta su diseño agresivo y cómo suena el motor de seis cilindros en línea. Es puro placer manejarlo."
    },
    {
      id: "c91e7a8b-432b-4b1a-82e4-1a0dcb54e6fe",
      nombre: "Porsche Taycan Turbo S",
      informacion: "Sedán eléctrico de alto rendimiento con 761 CV. Me fascina cómo combina lujo con tecnología y brutal aceleración.",
      editandoContenido: "Sedán eléctrico de alto rendimiento con 761 CV. Me fascina cómo combina lujo con tecnología y brutal aceleración."
    },
    {
      id: "d53a6b22-9f47-4d7f-9351-392b70c421af",
      nombre: "BMW M4 Competition",
      informacion: "Cuenta con un motor biturbo de 3.0 litros que entrega 510 caballos de fuerza. Tracción trasera o total según la versión.",
      editandoContenido: "Cuenta con un motor biturbo de 3.0 litros que entrega 510 caballos de fuerza. Tracción trasera o total según la versión."
    },
    {
      id: "e64d9b38-5e82-4b92-9150-1ad1c962a6ce",
      nombre: "Ford Mustang Mach-E GT",
      informacion: "SUV eléctrico inspirado en el Mustang clásico. Me gusta su diseño musculoso y cómo Ford logró mantener el espíritu deportivo.",
      editandoContenido: "SUV eléctrico inspirado en el Mustang clásico. Me gusta su diseño musculoso y cómo Ford logró mantener el espíritu deportivo."
    },
    {
      id: "f12c8a79-8f61-4c2b-94a7-b81d44e9c6bd",
      nombre: "Lamborghini Revuelto",
      informacion: "Híbrido enchufable con motor V12 y tres eléctricos, más de 1,000 CV. Impresionante evolución de la marca italiana.",
      editandoContenido: "Híbrido enchufable con motor V12 y tres eléctricos, más de 1,000 CV. Impresionante evolución de la marca italiana."
    }
  ]);
  const [editar, setEditar] = useState(-1);
  const [notaSeleccionada, setNotaSeleccionada] = useState(0);




  return (
    <>
      <h1>Notas</h1>
      <div className="container">
        <div className="lista-de-notas-container">
          <AddButton notas={notas} setNotas={setNotas} setNotaSeleccionada={setNotaSeleccionada} />
          {notas.map((nota, index) => (
            <ManejarNota key={nota.id} index={index} notas={notas} setNotas={setNotas} notaSeleccionada={notaSeleccionada} setNotaSeleccionada={setNotaSeleccionada} editar={editar} setEditar={setEditar} />
          ))}
        </div>
        <ContenidoDeNotas notas={notas} setNotas={setNotas} editar={editar} notaSeleccionada={notaSeleccionada} />
      </div>
    </>
  )
}

function ContenidoDeNotas({ notas, setNotas, editar, notaSeleccionada }) {
  //const [editandoContenido, setEditandoContenido] = useState(notas[notaSeleccionada].informacion);

  function handleChange(event) {
    const newValue = event.target.value;
    const saltosDeLinea = (newValue.match(/\n/g) || []).length;
    const newValueLength = newValue.length;
    if (saltosDeLinea < 17 && newValueLength < 1000) {
      setNotas((prevNotas) => {
        const updatedNotas = [...prevNotas];
        updatedNotas[notaSeleccionada] = { ...updatedNotas[notaSeleccionada], editandoContenido: newValue };

        return updatedNotas;
      });
    }
  }

  return (
    <div className="contenido-de-notas-container">
      <h2>{notas[notaSeleccionada].nombre}</h2>

      {/* editar = -1 significa que no hay edición. El resto de números apuntan a una de las notas.  */}
      {(editar > -1) ? <textarea className="informacion-textarea" value={notas[notaSeleccionada].editandoContenido} onChange={handleChange} /> :
        <p className="informacion-paragraph">{notas[notaSeleccionada].informacion}</p>
      }
    </div>
  )
}

function ManejarNota({ notas, setNotas, index, notaSeleccionada, setNotaSeleccionada, editar, setEditar }) {
  const [editandoNombre, setEditandoNombre] = useState(notas[index].nombre);
  const notaslength = notas.length;

  function handleEditarAceptar() {
    if (editar === index) {
      setNotas((prevNotas) => {
        const updatedNotas = [...prevNotas];
        updatedNotas[index] = { ...updatedNotas[index], nombre: editandoNombre };

        return updatedNotas;
      });

      const newValue = notas[index].editandoContenido;
      const saltosDeLinea = (newValue.match(/\n/g) || []).length;
      const newValueLength = newValue.length;
      if (saltosDeLinea < 17 && newValueLength < 300) {
        setNotas((prevNotas) => {
          const updatedNotas = [...prevNotas];
          updatedNotas[index] = { ...updatedNotas[index], informacion: newValue };

          return updatedNotas;
        });
      }
    }
    else {
      setNotaSeleccionada(index);
      setEditar(-1);
      const newValue = notas[index].informacion;
      const saltosDeLinea = (newValue.match(/\n/g) || []).length;
      const newValueLength = newValue.length;
      if (saltosDeLinea < 17 && newValueLength < 300) {
        setNotas((prevNotas) => {
          const updatedNotas = [...prevNotas];
          updatedNotas[index] = { ...updatedNotas[index], editandoContenido: newValue };

          return updatedNotas;
        });
      }
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      setEditar(-1);
      handleEditarAceptar();
    }
  }

  function handleChange(event) {
    const newValue = event.target.value;
    if (newValue.length <= 25) {
      setEditandoNombre(newValue);
    }
  }

  function handleCancelar() {
    setEditandoNombre(notas[index].nombre);
    setEditar(-1);
  }

  function handleDelete() {
    if (notaslength > 1) {
      setNotaSeleccionada(0);
      setNotas(prevNotas => prevNotas.filter((nota, filter) => filter !== index));
    }
  }



  return (
    <div className="nota-container">
      {(editar === index) ?
        <input className="editar-nota-input" onChange={handleChange} value={editandoNombre} onKeyDown={handleKeyDown} />
        :
        <button className={(notaSeleccionada === index) ? "nota nota-seleccionada" : "nota"} onClick={handleEditarAceptar}>{notas[index].nombre}</button>
      }
      <button className={(editar === index) ? "editar-nota-toggle-editando" : "editar-nota-toggle"} onClick={() => {
        handleEditarAceptar();
        setEditar((editar === index ? -1 : index))
      }
      }
      >
        {(editar === index) ? 'Aceptar' : 'Editar'}
      </button>

      {(editar === index) && <button className="cancelar" onClick={handleCancelar}>Cancelar</button>}
      <button className={(editar === index) ? "eliminar-nota-editando" : "eliminar-nota"} onClick={handleDelete}>Eliminar</button>
      {/*
      {(notaslength > 1) ?
        <button className={(editar === index) ? "eliminar-nota-editando" : "eliminar-nota"} onClick={handleDelete}>Eliminar</button>
        :
        <button className={(editar === index) ? "eliminar-nota-editando eliminar-nota-vacio" : "eliminar-nota eliminar-nota-vacio"}>&nbsp;</button>
      }
        */}

    </div>
  )
}



function AddButton({ notas, setNotas, setNotaSeleccionada }) {

  const handleClick = () => {
    const nuevaNota = {
      id: uuidv4(),  // Generamos un ID único
      nombre: "Nueva Nota " + (notas.length + 1),
      informacion: "Información de la nueva nota.\n" + uuidv4(),
    };
    setNotas((prevNotas) => [...prevNotas, nuevaNota]);
    setNotaSeleccionada(notas.length);
  };

  return (
    <div className="contenedor-de-boton">
      <button className="agregar-nota" onClick={handleClick}>+</button>
    </div>
  )
}

export default App

