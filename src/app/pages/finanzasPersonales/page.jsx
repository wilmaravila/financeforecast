import Navegar from './LayoutF';
import React from 'react';
import Image from 'next/image';
import jubilacion from '../../assets/images/jubilacion.jpg';
import regla from '../../assets/images/regla72.jpeg';
import inv from '../../assets/images/inversion2.png';
import { Button } from '../../Button';


export default  function finanzasPersonales() {
  return (
    <>
    <Navegar></Navegar>
    <main className="container mx-auto py-8">
    <section className="mb-12">
    <h1 className="text-4xl font-bold font-mono mb-10 mt-10 text-center pl-40 pr-40">Gestiona y organiza tus recursos diarios sin complicaciones mejora tus finanzas con facilidad</h1>
    <p className="text-xl mb-6"></p>
    <div className='flex justify-center flex-col items-center'>
        <p className="text-2xl font-semibold mb-10 ">Conoce a Nuestro Asistente Virtual Finance AI</p>
        <a href="./financeAi"><button className='mb-5 px-10 py-3 text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out font-bold'>Finance AI</button></a>
    </div>
    
    <hr className=' w-full size-1.5 mt-8 pr-44 bg-tahiti' />
    <section className='pt-10  '></section>
    <h2 className='text-center pb-10 text-2xl font-semibold'>Tips Para Mejorar tus Finanzas Personales</h2>
      <div className="flex gap-8 overflow-x-auto">
        <div className="bg-gray-200 p-5 rounded-[20px] min-h-[400px] w-[780px] flex flex-col">
          <div className="bg-gray-300 rounded-[10px] h-80">
            <Image 
              src={inv}
              alt="Imagen 1"
              className="w-[600px] h-[340px] object-cover rounded-[10px]" 
            />
          </div>
          <h3 className="font-semibold mb-2 mt-10">Inversiones Éticas: Cómo Hacer Que tu Dinero Trabaje...</h3>
          <p className="text-sm mb-4">En un mundo cada vez más consciente de los desafíos sociales y ambientales, las inversiones éticas han emergido como una poderosa herramienta para generar un impacto positivo, permitiendo que el capital no solo genere rendimientos financieros...</p>
          <a href="../" className="text-x1 font-semibold text-gray-600 hover:text-cyan-600">Ver Más -</a>
        </div>
        <div className="bg-gray-200 p-5 rounded-[20px] min-h-[400px] w-[780px] flex flex-col">
          <div className="bg-gray-300 rounded-[10px] h-80">
            <Image 
              src={jubilacion}
              alt="Imagen 1"
              className="w-[600px] h-[340px] object-cover rounded-[10px]" 
            />
          </div>
          <h3 className="font-semibold mb-2 mt-10">La Jubilación Activa, en Detalle: Qué es, Cómo Funciona…</h3>
          <p className="text-sm mb-4">Afrontar la jubilación puede convertirse en todo un reto, especialmente en el ámbito financiero. Dejar de trabajar para disfrutar de una nueva etapa de vida con tranquilidad requiere una planificación adecuada y estratégica...</p>
          <a href="../" className="text-x1 font-semibold text-gray-600 hover:text-cyan-600">Ver Más -</a>
        </div>
        <div className="bg-gray-200 p-5 rounded-[20px] min-h-[400px] w-[780px] flex flex-col">
          <div className="bg-gray-300 rounded-[10px] h-80">
            <Image 
              src={regla}
              alt="Imagen 1"
              className="w-[600px] h-[340px] object-cover rounded-[10px]" 
            />
          </div>
          <h3 className="font-semibold mb-2 mt-10">La Regla del 72: Una Forma Fácil de Controlar Inversiones</h3>
          <p className="text-sm mb-4">Ahorrar es clave para la vida y la estabilidad financiera. Pero no importa que nuestra hucha sea grande o pequeña, el dinero, con el tiempo, poco a poco va perdiendo su valor debido a factores como la inflación y los cambios en la economía...</p>
          <a href="../" className="text-x1 font-semibold text-gray-600 hover:text-cyan-600">Ver Más -</a>
          </div>

    </div>

    </section>

    <section className="mb-12">
    <h2 className="text-2xl font-bold mb-4">Maneja tus Finanzas</h2>
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

