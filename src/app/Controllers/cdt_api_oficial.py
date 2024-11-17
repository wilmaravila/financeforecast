import requests
from bs4 import BeautifulSoup
import pandas as pd
import schedule
import time
from datetime import datetime

def obtener_tasas_interes():
    url = "https://www.superfinanciera.gov.co/publicaciones/61300"
    
    # Realizar la solicitud GET a la página
    response = requests.get(url)
    
    # Analizar el contenido HTML con BeautifulSoup
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Encontrar la tabla de tasas de interés
    tabla = soup.find('body', {'class': 'ui-panel'})
    
    if tabla:
        # Extraer los datos de la tabla
        datos = []
        for fila in tabla.find_all('tr')[1:]:  # Ignorar la fila de encabezado
            columnas = fila.find_all('td')
            if len(columnas) >= 3:
                entidad = columnas[0].text.strip()
                cdt = columnas[1].text.strip()
                ahorros = columnas[2].text.strip()
                datos.append([entidad, cdt, ahorros])
        
        # Crear un DataFrame con los datos
        df = pd.DataFrame(datos, columns=['Entidad', 'CDT', 'Ahorros'])
        
        # Guardar los datos en un archivo CSV
        fecha_actual = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
        nombre_archivo = f"tasas_interes_{fecha_actual}.csv"
        df.to_csv(nombre_archivo, index=False)
        print(f"Datos guardados en {nombre_archivo}")
    else:
        print("No se pudo encontrar la tabla de tasas de interés")

def ejecutar_tarea():
    print("Ejecutando tarea de obtención de tasas de interés...")
    obtener_tasas_interes()

# Programar la tarea para que se ejecute cada día a las 9:00 AM
schedule.every().day.at("16:48").do(ejecutar_tarea)

# Bucle principal
while True:
    schedule.run_pending()
    time.sleep(60)  # Esperar 60 segundos antes de verificar nuevamente