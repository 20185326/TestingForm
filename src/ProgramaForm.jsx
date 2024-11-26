import React, { useState } from 'react';
import { PlusIcon, MinusIcon, CalendarIcon } from 'lucide-react';
import { format, setDate } from 'date-fns';

const programasData = [
  { id: "300000001", fechaInicio: new Date(2023, 0, 15),nombre:"Diplomatura de Estudio en Supply Chain Management + Componente Internacional TEC XXXVI 2024 - OPE"},
  { id: "300000002", fechaInicio: new Date(2023, 3, 1), nombre:"Diplomatura de Estudio en Operaciones XXXVIII 2024 - OPE"},
  { id: "300000003", fechaInicio: new Date(2023, 6, 10),nombre: "Diplomatura de Estudio en Gestión Avanzada de Compras IX 2024 - OPE"},
  { id: "300000004", fechaInicio: new Date(2023, 8, 5), nombre:"Programa de Especialización en Gestión del Mantenimiento X 2024 - OPE"},
  { id: "300000005", fechaInicio: new Date(2023, 11, 1),nombre:"EdEX Regiones 2024 - 2 | Gerencia de Marketing y Ventas X 2024 - Regiones"},
  { id: "300000006", fechaInicio: new Date(2024, 1, 15) ,nombre:"Diplomatura de Estudio en Gestión de Proyectos X 2024 - OPE"},
];

const portafoliosData = [
  { id: "multiportafolio", nombre: "Multiportafolio" },
  { id: "EE_ESP_AD_EDEX", nombre: "EE Especialización Alta dirección y EdEx" },
  { id: "EE_EST_LID_INN", nombre: "EE Estrategia, Liderazgo e Innovación" },
  { id: "EE_OPE_LOG_SCM", nombre: "EE Operaciones, Logística, Supply" },
  { id: "EE_FNZ_MKT_COM", nombre: "EE Finanzas, Marketing y Comercial" },
  { id: "EE_FUERA_LIMA", nombre: "EE Fuera de Lima" },
];
function ProgramaForm() {
  const [programasSeleccionados, setProgramasSeleccionados] = useState(['']);
  const [fechasPropuestas, setFechasPropuestas] = useState([]);
  const [esPortafolio, setEsPortafolio] = useState(false);
  const [portafolioSeleccionado, setPortafolioSeleccionado] = useState('');

  const seleccionarPrograma = (valor, index) => {
    const nuevosProgamas = [...programasSeleccionados];
    nuevosProgamas[index] = valor;
    setProgramasSeleccionados(nuevosProgamas);
  };

  const agregarSelectorPrograma = () => {
    setProgramasSeleccionados([...programasSeleccionados, '']);
  };

  const eliminarPrograma = (index) => {
    const nuevosProgamas = programasSeleccionados.filter((_, i) => i !== index);
    setProgramasSeleccionados(nuevosProgamas);
  };

  const agregarFecha = () => {
    setFechasPropuestas([...fechasPropuestas, new Date()]);
  };

  const eliminarFecha = (index) => {
    const nuevasFechas = fechasPropuestas.filter((_, i) => i !== index);
    setFechasPropuestas(nuevasFechas);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold text-black">Formulario de Programa</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm">¿Es un envío a nivel portafolio?</span>
          <button
            onClick={() => setEsPortafolio(!esPortafolio)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              esPortafolio ? 'bg-black' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                esPortafolio ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {esPortafolio ? (
        <div className="space-y-4">
          <label className="block text-sm mb-1">Seleccionar Portafolio</label>
          <select
            value={portafolioSeleccionado}
            onChange={(e) => setPortafolioSeleccionado(e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black"
          >
            <option value="">Seleccionar portafolio</option>
            {portafoliosData.map((portafolio) => (
              <option key={portafolio.id} value={portafolio.id}>
                {portafolio.nombre}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <>
          {programasSeleccionados.map((programaId, index) => (
            <div key={index} className="mb-6">
              <div className="flex gap-1 mb-1">
                <span className="text-sm w-[70%]">Programa {index + 1}</span>
                <span className="text-sm w-[20%]">Fecha</span>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={programaId}
                  onChange={(e) => seleccionarPrograma(e.target.value, index)}
                  className="w-[70%] px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black"
                >
                  <option value="">Seleccionar programa</option>
                  {programasData.map((programa) => (
                    <option key={programa.id} value={programa.id}>
                      {programa.nombre}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={programaId ? format(programasData.find(p => p.id === programaId)?.fechaInicio || new Date(), "dd/MM/yyyy") : ''}
                  readOnly
                  className="w-[20%] px-3 py-2 border rounded-md text-sm bg-gray-100 focus:outline-none focus:ring-1 focus:ring-black"
                />
                <button
                  onClick={() => eliminarPrograma(index)}
                  className="w-[10%] h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
                  aria-label="Eliminar programa"
                >
                  <MinusIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={agregarSelectorPrograma}
            className="w-full py-2 mb-6 border rounded-md text-sm flex items-center justify-center gap-2 hover:bg-gray-50"
          >
            <span className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300">
              <PlusIcon className="h-4 w-4" />
            </span>
            Agregar Nuevo Programa
          </button>
        </>
      )}

      <div className="mb-6">
        <div className="text-sm font-medium mb-2">Fechas Propuestas</div>
        <div className="grid grid-cols-2 gap-4">
          {fechasPropuestas.map((fecha, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="date"
                value={format(fecha, "yyyy-MM-dd")}
                onChange={(e) => {
                  const newDate = new Date(e.target.value);
                  const newFechas = [...fechasPropuestas];
                  newFechas[index] = newDate;
                  setFechasPropuestas(newFechas);
                }}
                className="flex-1 px-3 py-2 border rounded-md text-sm bg-white focus:outline-none focus:ring-1 focus:ring-black"
              />
              <button
                onClick={() => eliminarFecha(index)}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
                aria-label="Eliminar fecha"
              >
                <MinusIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={agregarFecha}
          className="w-full py-2 mt-4 border rounded-md text-sm flex items-center justify-center gap-2 hover:bg-gray-50"
        >
          <span className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300">
            <PlusIcon className="h-4 w-4" />
          </span>
          Agregar Fecha Propuesta
        </button>
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-black text-white rounded-md text-sm hover:bg-gray-900"
      >
        Guardar
      </button>
    </div>
  );
}

export default ProgramaForm;

