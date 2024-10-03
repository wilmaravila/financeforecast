import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// Función para evaluar la fuerza de la contraseña
const evaluatePasswordStrength = (password) => {
  let strength = 0;

  if (password.length >= 8) strength += 1; // Longitud mínima de 8 caracteres
  if (/[A-Z]/.test(password)) strength += 1; // Al menos una mayúscula
  if (/[a-z]/.test(password)) strength += 1; // Al menos una minúscula
  if (/[0-9]/.test(password)) strength += 1; // Al menos un número
  if (/[^A-Za-z0-9]/.test(password)) strength += 1; // Al menos un carácter especial

  return strength;
};

// Determinar el color de la barra según la fuerza
const getStrengthColor = (strength) => {
  switch (strength) {
    case 0:
    case 1:
      return "red"; // Muy débil
    case 2:
      return "orange"; // Débil
    case 3:
      return "yellow"; // Medio
    case 4:
      return "lightgreen"; // Fuerte
    case 5:
      return "green"; // Muy fuerte
    default:
      return "transparent";
  }
};

const PasswordField = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);

  // Actualizar la fuerza de la contraseña cuando cambie
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setStrength(evaluatePasswordStrength(newPassword));
  };

  // Alternar visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div >
      
      <input
        type={showPassword ? "text" : "password"}
        id="password"
        value={password}
        onChange={handlePasswordChange}
        style={{ paddingRight: "40px", width: "100%" }} // espacio para el icono
        className=" flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      />
      {/* Botón para mostrar/ocultar contraseña */}
      <span
        onClick={togglePasswordVisibility}
        style={{
          position: "absolute",
          right: "10px",
          top: "25%",
          transform: "translateY(-50%)",
          cursor: "pointer"
        }}
      >
        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
      </span>

      {/* Barra de fuerza de contraseña */}
      <div style={{ marginTop: "10px" }}>
        <div
          style={{
            height: "10px",
            width: "100%",
            backgroundColor: "#e0e0e0",
            borderRadius: "5px",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${(strength / 5) * 100}%`,
              backgroundColor: getStrengthColor(strength),
              borderRadius: "5px",
              transition: "width 0.3s ease-in-out",
            }}
          ></div>
        </div>
        <p>
          Su contraseña:{" "}
          {strength === 0
            ? "Muy débil"
            : strength === 1
            ? "Débil"
            : strength === 2
            ? "Aceptable"
            : strength === 3
            ? "Buena"
            : strength === 4
            ? "Fuerte"
            : "Muy fuerte"}
        </p>
      </div>
    </div>
  );
};

export default PasswordField;




        
  