export interface Subsection {
  id: string;
  title: string;
  description: string;
  images?: string[]; // Array de imágenes (por defecto usa id.png)
}

export interface Section {
  id: string;
  title: string;
  icon: string;
  subsections: Subsection[];
}

export const sectionsData: Section[] = [
  {
    id: "section-1",
    title: "Alta en Badgie",
    icon: "Download",
    subsections: [
      {
        id: "1.1",
        title: "Descarga la app \"Badgie\"",
        description: "Busca \"Badgie\" en la App Store (iOS) o Google Play Store (Android) y descarga la aplicación gratuita.",
      },
      {
        id: "1.2",
        title: "Recibe tus credenciales",
        description: "Tu administrador te enviará un email o mensaje con tu usuario y contraseña temporal para acceder.",
        images: ["1.2.png", "1.2.1.png"], // Dos opciones de recibir credenciales
      },
      {
        id: "1.3",
        title: "Entra en la app",
        description: "Abre la app Badgie e introduce tus credenciales para iniciar sesión por primera vez.",
      },
      {
        id: "1.4",
        title: "Click \"Tengo mis credenciales\"",
        description: "En la pantalla inicial, pulsa el botón \"Tengo mis credenciales\" para acceder al formulario de login.",
      },
      {
        id: "1.5",
        title: "Introducir Credenciales",
        description: "Introduce tu usuario y contraseña proporcionados para acceder a tu cuenta.",
      },
    ],
  },
  {
    id: "section-2",
    title: "Crea Alumnos",
    icon: "Users",
    subsections: [
      {
        id: "2.1",
        title: "Deslizar hacia abajo",
        description: "En la pantalla principal, desliza hacia abajo para ver todas las opciones disponibles.",
      },
      {
        id: "2.2",
        title: "Click \"Crear Alumno Express\"",
        description: "Pulsa el botón \"Crear Alumno Express\" para añadir un nuevo alumno de forma rápida.",
      },
      {
        id: "2.3",
        title: "Generar QR",
        description: "Genera un código QR único que el alumno puede escanear para registrarse automáticamente.",
      },
      {
        id: "2.4",
        title: "Registro Manual",
        description: "Introduce manualmente los datos del alumno: nombre, email y otros datos opcionales.",
      },
      {
        id: "2.5",
        title: "Enviar Whatsapp",
        description: "Envía una invitación directa por WhatsApp al alumno con el enlace de registro.",
      },
    ],
  },
  {
    id: "section-3",
    title: "Envía Insignias",
    icon: "Award",
    subsections: [
      {
        id: "3.1",
        title: "Click \"Enviar Nueva Insignia\"",
        description: "Desde la pantalla principal, pulsa el botón \"Enviar Nueva Insignia\" para comenzar.",
      },
      {
        id: "3.2",
        title: "Observar parámetros",
        description: "Elige la opción de crear y enviar una nueva insignia a tus alumnos.",
      },
      {
        id: "3.3",
        title: "Elegir alumno/alumnos",
        description: "Selecciona uno o varios alumnos de tu lista para enviarles la insignia.",
      },
      {
        id: "3.4",
        title: "Confirmar selección",
        description: "Revisa los alumnos seleccionados y confirma tu elección antes de continuar.",
      },
      {
        id: "3.5",
        title: "Elegir colección",
        description: "Selecciona la colección de insignias donde se encuentra la que quieres enviar.",
      },
      {
        id: "3.6",
        title: "Elegir insignia a enviar",
        description: "Elige la insignia específica que quieres otorgar al alumno.",
      },
      {
        id: "3.7",
        title: "Enviar foto o video adjunto",
        description: "Opcionalmente, adjunta una foto o video del momento en que el alumno logró la insignia.",
      },
      {
        id: "3.8",
        title: "Añadir comentario",
        description: "Escribe un mensaje personalizado para acompañar la insignia enviada.",
      },
      {
        id: "3.9",
        title: "Elegir plataforma e idioma",
        description: "Selecciona por qué plataforma enviar la notificación y en qué idioma.",
      },
    ],
  },
  {
    id: "section-4",
    title: "Usar el Calendario",
    icon: "Calendar",
    subsections: [
      {
        id: "4.1",
        title: "Navegar a página Calendario",
        description: "Pulsa el icono de calendario en la barra inferior para acceder a tu agenda.",
      },
      {
        id: "4.2",
        title: "Ver clases programadas para ti",
        description: "Visualiza todas las clases y sesiones que tienes programadas en tu calendario.",
      },
    ],
  },
  {
    id: "section-5",
    title: "Ver Insignias Enviadas",
    icon: "Trophy",
    subsections: [
      {
        id: "5.1",
        title: "Navegar a página Trofeo",
        description: "Pulsa el icono de trofeo en la barra inferior para ver el historial de insignias.",
      },
      {
        id: "5.2",
        title: "Pedir feedback a tu alumno",
        description: "Solicita a tus alumnos que valoren las insignias recibidas para mejorar.",
      },
      {
        id: "5.3",
        title: "Buscar alumnos con insignia",
        description: "Usa el buscador para encontrar qué alumnos tienen una insignia específica.",
      },
    ],
  },
];

export const getTotalSubsections = (): number => {
  return sectionsData.reduce((acc, section) => acc + section.subsections.length, 0);
};
