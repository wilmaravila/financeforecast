import React from 'react';
import Image from 'next/image';// Si usas Next.js
import bienestar from './assets/images/business.jpg'
import Button from './Button';
import presupuesto from './assets/images/presupuesto.png'
import ahorro from './assets/images/ahorro.png'
import deuda from './assets/images/deudas.png'
import banco from './assets/images/bancos.png'
import edufinanciera from './assets/images/edufinanciera.png'
import inversiones from './assets/images/inversiones.png'
// Imagenes locales o desde public
import Navegar from './utils/LayoutInicio'




export default function HomePage() {
  return (
    
    <div className="flex flex-col min-h-screen">
     
      <Navegar/>

     
      <main className=" pl-44 flex flex-col pr-44 items-center  pt-6">
       {/* Contenido de la pagina  donde da la explicacion de esta misma*/ }
       <section className='p-0'>
          <h1 className='text-5xl font-bold	font-mono'>Planifica con inteligencia, disfruta con tranquilidad</h1>

          <p className='pt-10 text-36 '>Gestiona tus cuentas, optimiza tus ahorros y toma decisiones informadas, todo desde una plataforma que reúne la mejor información bancaria en un solo lugar.</p>
          <div className='flex justify-center flex-col items-center'> 
              <a href="./pages/auth/register"><button className='mt-20 flex justify-center items-center rounded w-96 h-11 bg-tahiti bg-indigo-400	'>Regístrate de forma gratuita</button></a>
              <p className='text-bold'>¿Ya tienes una cuenta? <a href="./pages/aunt/login">Inicia sesión</a></p>
            </div> 
        </section>

        <section className='pt-12  pb-28 flex '>
          
            <div className='w-full h-96'>
              <Image src={bienestar} alt="" className='w-full h-full pl-8'/>
            </div>
            <div className='flex flex-col justify-center  pr-8 pl-44  text-wrap w-3/5 h-30 '>
              <h2 className='fond-bold '>TU BIENESTAR DINANCIERO EMPiEZA AQUÍ</h2>
              <p className='pt-2 text-lg font-medium'>Descubre cómo tomar mejores decisiones financieras con las mejores herramientas e información bancaria en un solo lugar. Optimiza tu dinero, ahorra más y alcanza tus metas con confianza. ¡Empieza hoy y transforma tu futuro financiero!</p>
            </div>
          
        </section>

        <hr className=' w-full size-1.5 pr-44 bg-tahiti' />
        {/* modulo organizar y optimiza tus finanzas*/ }
        <section className='pt-12  '>

          <h2 className='text-center pb-12 text-2xl font-bold'>Organiza y Optimiza tus Finanzas</h2>
          <div className='flex'>
            <div className='pl-14 '>
              <div className='flex items-center justify-center'>
                <Image src={presupuesto} alt="una imagen" className='w-12  items-center' />
              </div>
              <div className='pt-8'>
                  <h3 className='font-bold'>Presupuesto</h3>
                  <br/>
                  <p className='text-wrap'>Monitorea tus ingresos y gastos en tiempo real para optimizar cada centavo. Establece un presupuesto personalizado que se ajuste a tus necesidades y mantén tus finanzas bajo control sin esfuerzo.</p> 
              </div>
            </div>
            <div className='pl-14 '>
             <div className='flex items-center justify-center'>
                <Image src={ahorro} alt="" className='w-12   ' />
              </div>
              <div className='pt-8'>
                  <h3 className='font-bold'>Ahorros</h3>
                  <br/>
                  <p className='text-wrap'>Crea un plan de ahorro efectivo y automático. Define tus metas, sigue tu progreso y alcanza tus objetivos financieros más rápido con estrategias inteligentes de ahorro adaptadas a ti.</p> 
              </div>
            </div>
            <div >
              <div className='flex items-center justify-center'>
                
                  <Image src={deuda}  className='w-12 '/>
              </div>
              <div className='pl-14 pt-8'>
                  <h3 className='font-bold'>Deudas</h3>
                  <br/>
                  <p className='text-wrap'>Gestiona y reduce tus deudas de manera eficiente. Organiza tus pagos, prioriza tus obligaciones y recupera tu tranquilidad financiera con un plan claro y a tu medida.</p> 
              </div>
            </div>
            
          </div>
          <div className='flex items-center justify-center pt-12 pb-14'>
            <a href="./pages/finanzasPersonales"><button className='mt-20 flex justify-center items-center rounded w-96 h-11 bg-tahiti bg-indigo-400'>Ingresa al módulo de finanzas</button></a>
          </div>
        </section>
        <hr className=' w-full size-1.5 pr-44 bg-tahiti ' />
        {/* modulo tu guía bancaria*/ }

        <section className='pt-12  '>

          <h2 className='text-center pb-12 text-2xl font-bold'>Tu Guía Bancaria</h2>
          <div className='flex'>
            <div className='pl-14 '>
              <div className='flex items-center justify-center'>
                <Image src={banco} alt="una imagen" className='w-12  items-center' />
              </div>
              <div className='pt-8'>
                  <h3 className='font-bold'>Comparador de bancos</h3>
                  <br/>
                  <p className='text-wrap'>Accede a un completo comparador que reúne las mejores opciones bancarias del mercado en un solo lugar. Compara tasas de interés, comisiones y servicios para encontrar la cuenta o el préstamo que mejor se adapte a tus necesidades. Toma decisiones informadas y aprovecha al máximo tus recursos financieros.</p> 
              </div>
            </div>
            <div className='pl-14 '>
            <div className='flex items-center justify-center'>
                <Image src={edufinanciera} alt="" className='w-12   ' />
              </div>
              <div className='pt-8'>
                  <h3 className='font-bold'>Educación financiera</h3>
                  <br/>
                  <p className='text-wrap'>Empodérate con conocimientos clave sobre finanzas personales a través de recursos y herramientas educativas diseñadas para ti. Desde conceptos básicos hasta estrategias avanzadas, aprende a gestionar tu dinero, a ahorrar, a invertir y a planificar tu futuro financiero. Conviértete en el dueño de tus finanzas y toma decisiones que transformen tu vida.</p> 
              </div>
            </div>
            <div >
              <div className='flex items-center justify-center'>
                
                  <Image src={inversiones}  className='w-12 '/>
              </div>
              <div className='pl-14 pt-8'>
                  <h3 className='font-bold'>Inversiones</h3>
                  <br/>
                  <p className='text-wrap'>Descubre cómo hacer crecer tu dinero invirtiendo de manera inteligente y estratégica. Ya sea que seas un principiante o un inversor experimentado, aquí encontrarás la confianza y los recursos necesarios para maximizar tus rendimientos.</p> 
              </div>
            </div>
            
          </div>
          <div className='flex items-center justify-center pt-12 pb-14'>
           <a href="./pages/banks"> <button className='mt-20 flex justify-center items-center rounded w-96 h-11 bg-tahiti bg-indigo-400'>Ingresa al módulo de finanzas</button> </a>
          </div>
        </section>
        <hr className=' w-full size-1.5 pr-44 bg-tahiti ' />


      </main>

   
  
    </div>
   
  );
}
