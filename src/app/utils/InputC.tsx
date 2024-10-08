import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// Función para evaluar la fuerza de la contraseña

type comps ={
  className? : string,
  id?:string,
  value?:string,
  required?:boolean,
  onChange:(e)=>void,
  placeholder:string,
  name?:string,
  type?:string;

      
  
}

// Determinar el color de la barra según la fuerza


const PasswordField:React.FC<comps> = ({id,value,name,required ,onChange}) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  

  // Actualizar la fuerza de la contraseña cuando cambie
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    
  };

  // Alternar visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      
      <input
        type={showPassword ? "text" : "password"}
        id={id}
        value={value}
        name={name}
        onChange={onChange}
        style={{ paddingRight: "40px", width: "100%" }} // espacio para el icono
        className="  flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 block w-full"
        required={required}
       placeholder="******"  
      />
      {/* Botón para mostrar/ocultar contraseña */}
      <span
        onClick={togglePasswordVisibility}
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          cursor: "pointer"
        }}
      >
        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
      </span>
    </>
    
  );
};

export default PasswordField;




        
  