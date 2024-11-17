'use client'
import useAuth from '../../Controllers/controller'
import Navegar from '../../Layauts/layoutEmulador'
import { useState } from 'react'
import DynamicTable from './tabla'

export default function Emulador() {
    const { DateTable } = useAuth();
    
    const [inversionValue, setInversionValue] = useState('') // Para la cantidad a invertir
    const [inversionDuration, setInversionDuration] = useState('1') // Para la duración de la inversión
    const [seleccion, setSeleccion] = useState('Mensual')
    const [headers, setHeaders] = useState([]) // Para el tipo de selección (Mensual, Trimestral, Anual)
    const [results, setResults] = useState([]);
    const [formattedValue, setFormattedValue] = useState('');

    const convertidor = (e) => {
        const inputValue = e.target.value;
        // Permitir solo números, puntos o comas
        const numericValue = inputValue.replace(/[^0-9.,]/g, '');
        // Reemplazar comas por puntos para manejar decimales
        const normalizedValue = numericValue.replace(',', '.');

        setInversionValue(normalizedValue); // Guardar el valor bruto sin formato
        setFormattedValue(numericValue); // Guardar el valor para mostrar el formato sin aplicar aún como moneda
    };

    const calcularGanancia = (ctd, inversion, tiempo) => {
        let porcentaje = parseFloat(ctd.replace('%', '')) / 100;
        const resultado = inversion * (porcentaje * tiempo + 1);
        const resultadoRedondeado = Math.round(resultado * 100) / 100;
        let valor = resultadoRedondeado+''
        console.log(`El cdt es ${ctd}, inversión: ${inversion}, tiempo: ${tiempo}, ganancia: ${resultadoRedondeado}`);
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
      }).format(parseFloat(valor));
        return formatted;
        
    }

    const handleBlur = () => {
        if (!inversionValue) return;
        // Convertir el valor en número y formatearlo como moneda
        const formatted = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
        }).format(parseFloat(inversionValue));
        setInversionValue(formatted); // Mostrar como moneda al salir del campo
    };

    const handleFocus = () => {
        setInversionValue(inversionValue.replace(/[^0-9.]/g, '')); // Quitar formato al enfocar el campo
    };

    const handleSelectChange = (event) => {
        const value = event.target.value;
        setSeleccion(value);
    };

    const handleEmulate = async () => {
        // Lógica de emulación
        setHeaders([])
        setResults([]);
        const data = await DateTable(seleccion);
        if (data && data.length > 0) {
            if (seleccion === 'Mensual') {
                const headers = ['Entidad', 'Tase de Interes', 'Ganancia Total'];
                const newResults = data.filter(item => item.dias_30 !== '-' && item.dias_30 !== '0.00%').map(item => ({
                        Entidad: item.entidad || 'Sin entidad',
                        'Tase de Interes': item.dias_30 || 'No disponible',
                        'Ganancia Total': calcularGanancia(item.dias_30, parseFloat(formattedValue), parseFloat(inversionDuration)),
                    }));
                setResults(newResults); // Actualizar resultados
                setHeaders(headers); // Actualizar encabezados
            } else if (seleccion === 'Trimestral') {
                const headers = ['Entidad', 'Tase de Interes', 'Ganancia Total'];

                  const newResults = data.filter(item => item.dias_90 !== '-' && item.dias_90 !== '0.00%').map(item => ({
                        Entidad: item.entidad || 'Sin entidad',
                        'Tase de Interes': item.dias_90 || 'No disponible',
                        'Ganancia Total': calcularGanancia(item.dias_90, parseFloat(formattedValue), parseFloat(inversionDuration)),
                    }));
                setResults(newResults); // Actualizar resultados
                setHeaders(headers);
                // Lógica de cálculo para Trimestral
            } else if (seleccion === 'Anual') {
                const headers = ['Entidad', 'Tase de Interes', 'Ganancia Total'];
                const newResults = data.filter(item => item.dias_360 !== '-' && item.dias_360 !== '0.00%').map(item => ({
                  Entidad: item.entidad || 'Sin entidad',
                  'Tase de Interes': item.dias_360 || 'No disponible',
                  'Ganancia Total': calcularGanancia(item.dias_360, parseFloat(formattedValue), parseFloat(inversionDuration)),
              }));
          setResults(newResults); // Actualizar resultados
          setHeaders(headers);
                // Lógica de cálculo para Anual
            }
        }
    };

    return (
        <div className="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden" style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}>
            <Navegar />
            <div className="layout-container flex h-full grow flex-col">
                <div className="px-40 flex flex-1 justify-center py-5">
                    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                        <div className="flex flex-wrap justify-between gap-3 p-4">
                            <p className="text-[#0e141b] tracking-light text-[32px] font-bold leading-tight min-w-72">Averigüe cuál es el banco con el mejor CTD para ti</p>
                        </div>
                        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                            <label className="flex flex-col min-w-40 flex-1">
                                <span className="text-[#0e141b] text-base font-medium leading-normal pb-2">Ingrese el valor a invertir</span>
                                <input
                                    placeholder="Enter a value"
                                    value={inversionValue}
                                    onChange={convertidor}
                                    onBlur={handleBlur}
                                    onFocus={handleFocus}
                                    className="h-14 placeholder:text-[#4e7397]"
                                />
                            </label>
                        </div>
                        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                            <label className="flex flex-col min-w-40 flex-1">
                                <span className="text-[#0e141b] text-base font-medium leading-normal pb-2">Tiempo de inversión</span>
                                <select name="opciones_tiempo" value={seleccion} onChange={handleSelectChange}>
                                    <option value="Mensual">Mensual</option>
                                    <option value="Trimestral">Trimestral</option>
                                    <option value="Anual">Anual</option>
                                </select>
                            </label>
                        </div>
                        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                            <label className="flex flex-col min-w-40 flex-1">
                                <span className="text-[#0e141b] text-base font-medium leading-normal pb-2">Ingrese la duración de la inversión</span>
                                <input
                                    placeholder="Enter a value"
                                    value={inversionDuration}
                                    onChange={(e) => setInversionDuration(e.target.value)}
                                    className="h-14 placeholder:text-[#4e7397]"
                                />
                            </label>
                        </div>
                        <div className="flex px-4 py-3 justify-end">
                            <button onClick={handleEmulate} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#1980e6] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em]">
                                Emular
                            </button>
                        </div>
                        <h3 className="text-[#0e141b] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Resultados</h3>
                        <DynamicTable headers={headers} data={results} />
                    </div>
                </div>
            </div>
        </div>
    );
}
