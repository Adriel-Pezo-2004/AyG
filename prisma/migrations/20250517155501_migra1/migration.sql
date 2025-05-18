-- CreateTable
CREATE TABLE `agenda` (
    `id_agenda` INTEGER NOT NULL AUTO_INCREMENT,
    `tarea` VARCHAR(200) NOT NULL,
    `fecha` DATE NOT NULL,
    `hora` TIME NOT NULL,
    `imagen` LONGBLOB NOT NULL,

    PRIMARY KEY (`id_agenda`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `eventos` (
    `id_evento` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(200) NOT NULL,
    `tipo` VARCHAR(40) NOT NULL,
    `fecha` DATE NOT NULL,
    `hora` TIME NOT NULL,
    `estado` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id_evento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contacto` (
    `id_contacto` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(200) NOT NULL,
    `genero` CHAR(1) NOT NULL,
    `celular` CHAR(9) NOT NULL,
    `documento` VARCHAR(22) NOT NULL,
    `nrodocumento` INTEGER NOT NULL,
    `correo` VARCHAR(200) NULL,
    `departamento` VARCHAR(100) NOT NULL,
    `provincia` VARCHAR(100) NOT NULL,
    `distrito` VARCHAR(100) NOT NULL,
    `urbanizacion` VARCHAR(100) NULL,
    `direccion` VARCHAR(100) NULL,
    `usuario_insertor` VARCHAR(255) NULL,

    PRIMARY KEY (`id_contacto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contrato` (
    `id_contrato` INTEGER NOT NULL AUTO_INCREMENT,
    `id_contacto` INTEGER NOT NULL,
    `id_propiedad` INTEGER NOT NULL,
    `departamento` VARCHAR(100) NOT NULL,
    `provincia` VARCHAR(100) NOT NULL,
    `distrito` VARCHAR(100) NOT NULL,
    `direccion` VARCHAR(100) NOT NULL,
    `exclusividad` VARCHAR(100) NOT NULL,
    `usuario_insertor` VARCHAR(255) NULL,

    PRIMARY KEY (`id_contrato`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cp` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_propiedad` INTEGER NOT NULL,
    `nombre` VARCHAR(255) NOT NULL,
    `archivo` LONGBLOB NOT NULL,
    `tipo_archivo` VARCHAR(100) NOT NULL,
    `fecha_subida` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dni` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_propiedad` INTEGER NULL,
    `nombre` VARCHAR(255) NULL,
    `archivo` LONGBLOB NULL,
    `tipo_archivo` VARCHAR(100) NULL,
    `fecha_subida` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hr` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_propiedad` INTEGER NULL,
    `nombre` VARCHAR(255) NULL,
    `archivo` LONGBLOB NULL,
    `tipo_archivo` VARCHAR(100) NULL,
    `fecha_subida` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `images` (
    `id_imagen` INTEGER NOT NULL AUTO_INCREMENT,
    `id_propiedad` INTEGER NOT NULL,
    `image_data` LONGBLOB NOT NULL,

    PRIMARY KEY (`id_imagen`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `propiedades` (
    `id_propiedad` INTEGER NOT NULL AUTO_INCREMENT,
    `id_contacto` INTEGER NOT NULL,
    `titulo` VARCHAR(500) NOT NULL,
    `descripcion` VARCHAR(2000) NOT NULL,
    `tipo_pro` VARCHAR(200) NOT NULL,
    `subtipo` VARCHAR(200) NOT NULL,
    `antiguedad` INTEGER NOT NULL,
    `area_terreno` DECIMAL(8, 2) NOT NULL,
    `area_construida` DECIMAL(8, 2) NOT NULL,
    `tipo_negocio` VARCHAR(200) NOT NULL,
    `precio` DECIMAL(10, 2) NOT NULL,
    `departamento` VARCHAR(200) NOT NULL,
    `provincia` VARCHAR(200) NOT NULL,
    `distrito` VARCHAR(200) NOT NULL,
    `urbanizacion` VARCHAR(200) NOT NULL,
    `direccion` VARCHAR(200) NOT NULL,
    `pisos` INTEGER NOT NULL,
    `dormitorios` INTEGER NOT NULL,
    `baños` INTEGER NOT NULL,
    `cocheras` INTEGER NOT NULL,
    `mantenimiento` INTEGER NOT NULL,
    `cocinas` INTEGER NOT NULL,
    `medbaños` INTEGER NOT NULL,
    `ascensor` VARCHAR(3) NOT NULL,
    `terrazas` INTEGER NOT NULL,
    `estado` VARCHAR(200) NOT NULL,
    `usuario_insertor` VARCHAR(255) NOT NULL,
    `fecha_creacion` DATETIME NULL,

    PRIMARY KEY (`id_propiedad`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_propiedad` INTEGER NULL,
    `nombre` VARCHAR(255) NULL,
    `archivo` LONGBLOB NULL,
    `tipo_archivo` VARCHAR(100) NULL,
    `fecha_subida` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario` VARCHAR(200) NOT NULL,
    `contraseña` VARCHAR(255) NOT NULL,
    `nombres` VARCHAR(100) NOT NULL,
    `apellidos` VARCHAR(100) NOT NULL,
    `tipo_documento` VARCHAR(21) NOT NULL,
    `numero_documento` VARCHAR(20) NOT NULL,
    `ruc` VARCHAR(20) NOT NULL,
    `genero` CHAR(1) NOT NULL,
    `imagen` LONGBLOB NULL,
    `celular` VARCHAR(9) NOT NULL,
    `departamento` VARCHAR(50) NOT NULL,
    `provincia` VARCHAR(50) NOT NULL,
    `distrito` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `contrato` ADD CONSTRAINT `contrato_id_contacto_fkey` FOREIGN KEY (`id_contacto`) REFERENCES `contacto`(`id_contacto`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contrato` ADD CONSTRAINT `contrato_id_propiedad_fkey` FOREIGN KEY (`id_propiedad`) REFERENCES `propiedades`(`id_propiedad`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cp` ADD CONSTRAINT `cp_id_propiedad_fkey` FOREIGN KEY (`id_propiedad`) REFERENCES `propiedades`(`id_propiedad`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dni` ADD CONSTRAINT `dni_id_propiedad_fkey` FOREIGN KEY (`id_propiedad`) REFERENCES `propiedades`(`id_propiedad`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hr` ADD CONSTRAINT `hr_id_propiedad_fkey` FOREIGN KEY (`id_propiedad`) REFERENCES `propiedades`(`id_propiedad`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `images` ADD CONSTRAINT `images_id_propiedad_fkey` FOREIGN KEY (`id_propiedad`) REFERENCES `propiedades`(`id_propiedad`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `propiedades` ADD CONSTRAINT `propiedades_id_contacto_fkey` FOREIGN KEY (`id_contacto`) REFERENCES `contacto`(`id_contacto`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pu` ADD CONSTRAINT `pu_id_propiedad_fkey` FOREIGN KEY (`id_propiedad`) REFERENCES `propiedades`(`id_propiedad`) ON DELETE SET NULL ON UPDATE CASCADE;
