INSERT INTO students (
    id,
    name,
    email,
    phone,
    address,
    birthdate,
    semester,
    status
) VALUES
(1001, 'Juan Perez', 'juan.perez@gmail.com', '3001234567', 'Calle 10 # 15-20', '2002-05-15', 3, TRUE),

(1002, 'Maria Gomez', 'maria.gomez@gmail.com', '3012345678', 'Carrera 20 # 10-30', '2001-08-22', 5, TRUE),

(1003, 'Carlos Rodriguez', 'carlos.rodriguez@gmail.com', '3023456789', 'Calle 25 # 12-40', '2003-01-10', 2, TRUE),

(1004, 'Laura Martinez', 'laura.martinez@gmail.com', '3034567890', 'Carrera 15 # 8-25', '2000-11-30', 7, TRUE),

(1005, 'Andres Lopez', 'andres.lopez@gmail.com', '3045678901', 'Calle 30 # 20-15', '2002-03-18', 4, TRUE),

(1006, 'Daniela Ramirez', 'daniela.ramirez@gmail.com', '3056789012', 'Carrera 12 # 5-18', '2001-06-25', 6, TRUE),

(1007, 'Santiago Torres', 'santiago.torres@gmail.com', '3107890123', 'Calle 18 # 22-10', '2003-09-12', 1, TRUE),

(1008, 'Valentina Hernandez', 'valentina.hernandez@gmail.com', '3118901234', 'Carrera 8 # 14-32', '2002-12-05', 8, TRUE),

(1009, 'Sebastian Castro', 'sebastian.castro@gmail.com', '3129012345', 'Calle 40 # 18-22', '2001-04-14', 9, TRUE),

(1010, 'Camila Moreno', 'camila.moreno@gmail.com', '3130123456', 'Carrera 25 # 30-12', '2000-07-20', 10, TRUE);

INSERT INTO courses (
    name,
    description,
    credits,
    semester,
    status
) VALUES
('Programación I', 'Fundamentos de programación, algoritmos y lógica computacional.', 3, 1, TRUE),

('Matemáticas I', 'Fundamentos de álgebra, ecuaciones, funciones y operaciones matemáticas.', 4, 1, TRUE),

('Bases de Datos', 'Modelado de datos, lenguaje SQL y sistemas gestores de bases de datos.', 3, 3, TRUE),

('Programación Web I', 'Desarrollo de aplicaciones web utilizando HTML, CSS, JavaScript y TypeScript.', 3, 4, TRUE),

('Arquitectura de Software', 'Principios, patrones y estilos arquitectónicos para el desarrollo de software.', 3, 6, TRUE),

('Ingeniería de Software', 'Procesos, metodologías ágiles y buenas prácticas para el desarrollo de software.', 3, 5, TRUE),

('Redes de Computadores', 'Fundamentos de redes, protocolos de comunicación y modelos de referencia.', 3, 4, TRUE),

('Sistemas Operativos', 'Administración de procesos, gestión de memoria y sistemas de archivos.', 3, 3, TRUE),

('Desarrollo de Aplicaciones Móviles', 'Fundamentos y desarrollo de aplicaciones para dispositivos móviles.', 3, 7, TRUE),

('Inteligencia Artificial', 'Fundamentos de inteligencia artificial, aprendizaje automático y algoritmos inteligentes.', 4, 8, TRUE);

INSERT INTO professors (
    name,
    email,
    phone,
    specialty,
    department,
    status
) VALUES
('Jesus David Mejia Vergara', 'jesus.mejia@uceva.edu.co', '3157894512', 'Programación Web y Cloud Computing', 'Ingeniería de Sistemas', TRUE),
('Diana Patricia Ospina', 'diana.ospina@uceva.edu.co', '3168945213', 'Arquitectura de Software y DevOps', 'Ingeniería de Sistemas', TRUE),
('Javier Albeiro Gomez', 'javier.gomez@uceva.edu.co', '3179056324', 'Bases de Datos Relacionales y NoSQL', 'Ingeniería de Sistemas', TRUE),
('Claudia Milena Salazar', 'claudia.salazar@uceva.edu.co', '3180167435', 'Inteligencia Artificial y Machine Learning', 'Ingeniería de Sistemas', TRUE),
('Hector Fabio Morales', 'hector.morales@uceva.edu.co', '3191278546', 'Redes y Seguridad Informática', 'Ingeniería de Sistemas', TRUE),
('Patricia Eugenia Valencia', 'patricia.valencia@uceva.edu.co', '3202389657', 'Estructuras de Datos y Algoritmos', 'Ciencias Básicas', TRUE),
('Alvaro Hernan Ortiz', 'alvaro.ortiz@uceva.edu.co', '3213490768', 'Gestión de Proyectos de Software', 'Ingeniería de Sistemas', TRUE),
('Gloria Ines Tabares', 'gloria.tabares@uceva.edu.co', '3224501879', 'Cálculo Diferencial e Integral', 'Ciencias Básicas', TRUE),
('Mauricio Alejandro Rios', 'mauricio.rios@uceva.edu.co', '3235612980', 'Desarrollo de Aplicaciones Móviles', 'Ingeniería de Sistemas', TRUE),
('Lina Marcela Cardenas', 'lina.cardenas@uceva.edu.co', '3246723091', 'Interacción Humano-Computador y UX', 'Diseño y Comunicación', TRUE)
ON CONFLICT (email) DO NOTHING;

INSERT INTO classrooms (
    code,
    building,
    capacity,
    floor,
    status
) VALUES
('LAB-SIS-101', 'Bloque C - Facultad de Ingeniería', 35, 1, TRUE),
('LAB-SIS-102', 'Bloque C - Facultad de Ingeniería', 40, 1, TRUE),
('AULA-201', 'Bloque A - Aulas Generales', 45, 2, TRUE),
('AULA-202', 'Bloque A - Aulas Generales', 45, 2, TRUE),
('LAB-REDES-301', 'Bloque C - Facultad de Ingeniería', 30, 3, TRUE),
('AUDITORIO-1', 'Edificio Central UCEVA', 150, 1, TRUE),
('AULA-305', 'Bloque B - Ciencias Básicas', 50, 3, TRUE),
('LAB-MOVIL-204', 'Bloque C - Facultad de Ingeniería', 28, 2, TRUE),
('AULA-108', 'Bloque A - Aulas Generales', 35, 1, TRUE),
('LAB-HARDWARE', 'Bloque C - Facultad de Ingeniería', 25, 2, TRUE)
ON CONFLICT (code) DO NOTHING;
