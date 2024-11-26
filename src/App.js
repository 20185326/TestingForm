import React from 'react';
import ProgramaForm from './ProgramaForm';

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <main className="w-full max-w-4xl h-[90vh] p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Formulario de Programa</h1>
        <ProgramaForm />
      </main>
    </div>
  );
}
