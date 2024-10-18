-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-10-2024 a las 04:19:11
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `financeforecast`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `credenciales`
--

CREATE TABLE `credenciales` (
  `id` int(11) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `credenciales`
--

INSERT INTO `credenciales` (`id`, `correo`, `usuario_id`, `password`) VALUES
(1, 'juan.perez@example.com', 1, 'passJu@123'),
(2, 'maria.gomez@example.com', 2, 'passM@456'),
(3, 'carlos.lopez@example.com', 3, 'passC@789'),
(4, 'ana.martinez@example.com', 4, 'passA@123'),
(5, 'luis.fernandez@example.com', 5, 'passL@456'),
(6, 'Wil@gmail.com', 6, 'Wa123.'),
(11, 'tatorres2005@gmail.com', 7, 'aqW23.Tt'),
(12, 'wavilaga@uninpahu.edu.co', 8, 'dffdf12L1.'),
(13, 'sdfsdfsdafafda', 9, 'ddd12S.j'),
(14, 'tatorres2005@gmail.com', 10, '12Aw..12');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entidad_bancaria`
--

CREATE TABLE `entidad_bancaria` (
  `id_banco` int(11) NOT NULL,
  `banco_nombre` varchar(100) DEFAULT NULL,
  `banco_pais` varchar(50) DEFAULT NULL,
  `calificacion` varchar(50) DEFAULT NULL,
  `inf_adicional` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto_financiero`
--

CREATE TABLE `producto_financiero` (
  `id_producto` int(11) NOT NULL,
  `prd_tipo` varchar(50) DEFAULT NULL,
  `tasa_interes` double DEFAULT NULL,
  `entidad_bancaria` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `terminos_condiciones` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recomendacion_inv`
--

CREATE TABLE `recomendacion_inv` (
  `id_recomendacion` int(11) NOT NULL,
  `inv_tipo` varchar(50) DEFAULT NULL,
  `inv_riesgo` varchar(50) DEFAULT NULL,
  `inv_plazo` varchar(50) DEFAULT NULL,
  `retorno_estimado` double DEFAULT NULL,
  `inv_fecha` datetime DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro_financiero`
--

CREATE TABLE `registro_financiero` (
  `id_registro` int(11) NOT NULL,
  `rf_tipo` varchar(50) DEFAULT NULL,
  `rf_categoria` varchar(50) DEFAULT NULL,
  `rf_monto` double DEFAULT NULL,
  `rf_fecha` datetime DEFAULT NULL,
  `re_descripcion` text DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tendencia_mercado`
--

CREATE TABLE `tendencia_mercado` (
  `id_tendencia` int(11) NOT NULL,
  `ted_tipo` varchar(50) DEFAULT NULL,
  `ted_analisis` text DEFAULT NULL,
  `ted_fecha` datetime DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `fecha_registro` date NOT NULL DEFAULT current_timestamp(),
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `fecha_nacimiento` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `fecha_registro`, `nombre`, `apellido`, `fecha_nacimiento`) VALUES
(1, '2023-01-01', 'Juan', 'Pérez', '1990-05-15'),
(2, '2023-01-01', 'María', 'Gómez', '1985-11-20'),
(3, '2023-01-01', 'Carlos', 'López', '1992-02-10'),
(4, '2023-01-01', 'Ana', 'Martínez', '1988-09-30'),
(5, '2023-01-01', 'Luis', 'Fernández', '1995-07-12'),
(6, '2023-01-01', 'Wilmar', 'Avila', '2003-10-24'),
(7, '2023-01-01', 'aass', 'eeeee', '2024-10-09'),
(8, '2023-01-01', 'f', 'd', '2024-10-09'),
(9, '2023-01-01', 'w', 't', '2024-10-15'),
(10, '2024-10-17', 'q', 'w', '2024-10-10');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `credenciales`
--
ALTER TABLE `credenciales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `persona_id` (`usuario_id`);

--
-- Indices de la tabla `entidad_bancaria`
--
ALTER TABLE `entidad_bancaria`
  ADD PRIMARY KEY (`id_banco`);

--
-- Indices de la tabla `producto_financiero`
--
ALTER TABLE `producto_financiero`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `entidad_bancaria` (`entidad_bancaria`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `recomendacion_inv`
--
ALTER TABLE `recomendacion_inv`
  ADD PRIMARY KEY (`id_recomendacion`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `registro_financiero`
--
ALTER TABLE `registro_financiero`
  ADD PRIMARY KEY (`id_registro`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `tendencia_mercado`
--
ALTER TABLE `tendencia_mercado`
  ADD PRIMARY KEY (`id_tendencia`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `credenciales`
--
ALTER TABLE `credenciales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `entidad_bancaria`
--
ALTER TABLE `entidad_bancaria`
  MODIFY `id_banco` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `producto_financiero`
--
ALTER TABLE `producto_financiero`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `recomendacion_inv`
--
ALTER TABLE `recomendacion_inv`
  MODIFY `id_recomendacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `registro_financiero`
--
ALTER TABLE `registro_financiero`
  MODIFY `id_registro` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tendencia_mercado`
--
ALTER TABLE `tendencia_mercado`
  MODIFY `id_tendencia` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `credenciales`
--
ALTER TABLE `credenciales`
  ADD CONSTRAINT `credenciales_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `producto_financiero`
--
ALTER TABLE `producto_financiero`
  ADD CONSTRAINT `producto_financiero_ibfk_1` FOREIGN KEY (`entidad_bancaria`) REFERENCES `entidad_bancaria` (`id_banco`) ON DELETE SET NULL,
  ADD CONSTRAINT `producto_financiero_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `recomendacion_inv`
--
ALTER TABLE `recomendacion_inv`
  ADD CONSTRAINT `recomendacion_inv_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `registro_financiero`
--
ALTER TABLE `registro_financiero`
  ADD CONSTRAINT `registro_financiero_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `tendencia_mercado`
--
ALTER TABLE `tendencia_mercado`
  ADD CONSTRAINT `tendencia_mercado_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
