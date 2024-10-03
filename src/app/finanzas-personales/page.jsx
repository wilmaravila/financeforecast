
import Navegar from './LayoutF'

import React from 'react';
import { Button } from '../Button';

export default  function finanzasPersonales() {
  return (
    <>
    <Navegar></Navegar>
    <main className="mt-8 m-16">
    <section className="mb-12">
    <h1 className="text-3xl font-bold mb-4">En tus finanzas</h1>
    <p className="text-xl mb-8">Para que gestionar y organizar los recursos de tu dia a dia deje de ser un reto</p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {['IMAGEN', 'IMAGEN', 'IMAGEN'].map((img, index) => (
        <div key={index} className="bg-gray-200 p-4 rounded">
            <div className="bg-gray-300 h-40 mb-4"></div>
            <h3 className="font-semibold mb-2">
            {index === 0 && 'La Jubilación Activa, en detalle: qué es, cómo funciona…'}
            {index === 1 && 'La Regla del 72: una forma fácil de controlar inversiones Regla del 55: una forma fácil de controlar Inversiones'}
            {index === 2 && 'Inversiones Éticas: cómo hacer que tu dinero trabaje para el bien'}
            </h3>
            <p className="text-sm mb-4">
            {index === 0 && 'Afrontar la jubilación puede convertirse en todo un reto, especialmente en el ámbito financiero. Dejar de trabajar para…'}
            {index === 1 && 'Ahorrar es clave para la vida. Pero no importa que nuestra hucha sea grande o pequeña, el dinero poco a poco va perdiendo su valor...'}
            {index === 2 && 'En un mundo cada vez más consciente de los desafíos sociales y ambientales, las inversiones éticas han emergido como una poderosa herramienta...'}
            </p>
            <button variant="outline">Ver Más</button>
        </div>
        ))}
    </div>
    </section>

    <section className="mb-12">
    <h2 className="text-2xl font-bold mb-4">Manejo tus Finanzas</h2>
    <p className="mb-4">
    Si necesitas ese último empujón para empezar a
    ahorrar dinero, aquí tienes recomendaciones y trucos que te ayudarán a mejorar tus finanzas personales. En esta sección podrás aprender a ahorrar dinero
    y sacarle más beneficio a tu economía personal con sencillas acciones e ideas que podrás integrar en tu día a día para vivir más y con mayor tranquilidad.
    </p>
    <p className="mb-4">
    Una correcta gestión económica personal de tu capital es vital para tener una vida financiera saneada. Por ello te asesoramos de la mano de expertos financieros, para ofrecerte todos aquellos conocimientos y herramientas que te ayudarán a administrar tu dinero y moverte con más libertad. Conocer cómo 
    reducir deudas,cancelar préstamos o todo lo que pueden hacer por ti los minicréditos te ayudará a tomar decisiones para seguir avanzando.
    </p>
    <p>
       
    No hay que olvidar lo importante que es tener nociones de economía o disponer de un lugar donde resolver todas tus dudas. Aquí encontrarás todos los conceptos económicos
    y definiciones de la forma más sencilla y con ejemplos fáciles para que veas que los temas relacionados con los préstamos, créditos, métodos de pago no solo es cosa de economistas.
    </p>
    </section>

    <section>
    <h2 className="text-2xl font-bold mb-4">¿Cómo empezar en finanzas personales?</h2>
    <p className="mb-4">
    Para comenzar en finanzas personales, lo primero que debemos hacer es tomar conciencia de nuestra situación financiera actual. Esto implica conocer nuestros ingresos, gastos, deudas y ahorros. Luego,
    debemos establecer objetivos financieros claros y alcanzables. Una vez que tengamos claros nuestros objetivos, podemos empezar a desarrollar un plan financiero.
    </p>
    <p>Algunas formas en las que podemos aplicar las finanzas personales son:</p>
    <ul className="list-disc pl-6 mb-4">
        <li>Crear un presupuesto: Es importante que sepamos en qué estamos gastando nuestro dinero, para poder reducir gastos y destinar presupuesto a nuestros objetivos financieros.</li>
        <li>Ahorrar con frecuencia: Establecer un hábito de ahorro es fundamental. Podemos empezar por destinar un porcentaje a una cuenta de ahorro.</li>
        <li>¿Qué hacemos con las deudas?: Si tenemos deudas, debemos enfocarnos en pagarlas lo antes posible.</li>
        <li>Invertir ¿Por dónde empezar?: Con las deudas bajo control y un ahorro regular, podemos empezar a invertir para generar ingresos pasivos y hacer crecer nuestro patrimonio.</li>
        
    </ul>
    <p>
        Recuerda que la gestión de las finanzas personales es un proceso continuo que requiere disciplina y constancia.
        Con el tiempo, verás cómo tus esfuerzos dan frutos y tu situación financiera mejora, permitiéndote alcanzar tus
        metas y tener una vida financiera más estable y satisfactoria.
    </p>
    </section>
    </main>

    <footer className="mt-12 py-4 text-center text-sm text-gray-600">
    © 2024 FinanceForecast. Todos los derechos reservados.
    </footer>
    </>
    )
}

