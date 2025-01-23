import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

type comps = {
  className?: string;
  id?: string;
  value?: string;
  required?: boolean;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  type?: string;
  onStrengthChange?: (strength: number) => void; // Nueva prop
};

const evaluatePasswordStrength = (password: string) => {
  let strength = 0;
  if (password.length >= 8) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;

  return strength;
};

const getStrengthColor = (strength: number) => {
  switch (strength) {
    case 0:
    case 1:
      return "red";
    case 2:
      return "orange";
    case 3:
      return "yellow";
    case 4:
      return "lightgreen";
    case 5:
      return "green";
    default:
      return "transparent";
  }
};

const PasswordField: React.FC<comps> = ({
  id,
  value,
  name,
  required,
  onChange,
  onStrengthChange, // Nueva prop
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const strength = evaluatePasswordStrength(value || "");

  useEffect(() => {
    if (onStrengthChange) {
      onStrengthChange(strength);
    }
  }, [strength, onStrengthChange]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={{ position: "relative" }}>
      <input
        type={showPassword ? "text" : "password"}
        id={id}
        value={value}
        name={name}
        maxLength={40}
        required={required}
        onChange={onChange}
        style={{ paddingRight: "40px", width: "100%" }}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 block w-full"
      />
      <span
        onClick={togglePasswordVisibility}
        style={{
          position: "absolute",
          right: "10px",
          top: "25%",
          transform: "translateY(-50%)",
          cursor: "pointer",
        }}
      >
        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
      </span>
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