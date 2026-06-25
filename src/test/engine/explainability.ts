import type { CareerPreferences } from './preferences';

export interface CarreraExplicacion {
  razon: string;          // Why this career appears. 1 sentence. Specific.
  alerta: string | null;  // Warning if relevant. null if none.
}

// ---------------------------------------------------------------------------
// Template definitions
// ---------------------------------------------------------------------------

interface ExplicacionTemplate {
  razon: (primario: string, secundario: string | null) => string;
  // Algunos templates no tienen alerta: aceptamos `null` además de la función
  // y de `undefined` para no obligar a escribir una función que siempre devuelve null.
  alerta?: ((antipatrones: string[], preferences: CareerPreferences, provinceAvailable: boolean) => string | null) | null;
}

const TEMPLATES: Record<string, ExplicacionTemplate> = {
  "Software sistemas e informática": {
    razon: (p) =>
      `Aparece porque tu perfil de ${p} prioriza resolver problemas complejos construyendo sistemas — esta carrera es el centro de ese mundo.`,
    alerta: (anti) =>
      anti.includes('matematica')
        ? 'Requiere fundamentos matemáticos. Si el rechazo es por el estilo pedagógico, muchos programadores describen la matemática aplicada como muy diferente a la escolar.'
        : null,
  },

  "Datos IA estadística y matemática": {
    razon: (p) =>
      `Aparece porque tu perfil de ${p} tiene una orientación fuerte hacia encontrar patrones y traducir complejidad en decisiones concretas.`,
    alerta: (anti) =>
      anti.includes('matematica')
        ? 'Esta carrera tiene alta carga matemática. Si el rechazo es puntual (cálculo escolar), vale evaluar qué ramas específicas resuenan más con vos.'
        : null,
  },

  "Psicología": {
    razon: () =>
      `Aparece porque combinás orientación genuina hacia el bienestar de personas con tu capacidad de escucha — dos pilares centrales de la práctica clínica.`,
    alerta: (anti, prefs) =>
      anti.includes('soledad') && prefs.personas < 50
        ? null
        : anti.includes('exposicion')
        ? 'Algunas orientaciones clínicas implican mucha interacción sostenida. La psicología organizacional o de investigación puede encajar mejor si preferís menos exposición.'
        : null,
  },

  "Medicina y atención clínica": {
    razon: (p) =>
      `Aparece porque tu orientación de ${p} hacia el cuidado integral de las personas coincide directamente con el propósito central de la práctica médica.`,
    alerta: (anti) =>
      anti.includes('sangre')
        ? 'Esta carrera incluye trabajo directo con pacientes y situaciones clínicas. Si el rechazo a situaciones médicas es fuerte, considerá las otras opciones del área.'
        : null,
  },

  "Enfermería": {
    razon: (p) =>
      `Aparece porque el perfil de ${p} tiene una orientación constante hacia el acompañamiento en momentos vulnerables — terreno central de la enfermería.`,
    alerta: (anti) =>
      anti.includes('sangre')
        ? 'La enfermería requiere trabajo clínico directo con pacientes. Si el rechazo es genuino, explorá roles más administrativos dentro del sector salud.'
        : null,
  },

  "Educación física y deporte": {
    razon: () =>
      `Aparece porque combinás energía interpersonal con motivación por el bienestar físico — el corazón de las carreras deportivas y de actividad física.`,
    alerta: (anti) =>
      anti.includes('exposicion')
        ? 'Muchos roles en deporte implican visibilidad pública (entrenamiento, competición). El área de gestión deportiva puede encajar mejor.'
        : null,
  },

  "Arquitectura urbanismo y obra": {
    razon: (p) =>
      `Aparece porque el perfil de ${p} combina pensamiento espacial y creativo con la necesidad de materializar ideas en algo tangible y duradero.`,
    alerta: (anti, prefs) =>
      anti.includes('matematica') && prefs.creatividad < 50
        ? 'Arquitectura combina diseño con cálculo estructural. Si las matemáticas son un punto de bloqueo, explorar diseño de interiores puede ser una entrada más suave.'
        : null,
  },

  "Administración gestión y negocios": {
    razon: (p) =>
      `Aparece porque tu perfil de ${p} tiene orientación natural a coordinar recursos, personas y objetivos — la base de cualquier carrera de gestión.`,
    alerta: (anti) =>
      anti.includes('ventas')
        ? 'Algunas orientaciones de administración tienen fuerte componente comercial. Elegí especializaciones en operaciones, finanzas o estrategia si preferís evitar eso.'
        : null,
  },

  "Marketing publicidad y ventas": {
    razon: (p) =>
      `Aparece porque el perfil de ${p} combina creatividad comunicativa con orientación a resultados — el núcleo de las carreras de marketing y publicidad.`,
    alerta: (anti) =>
      anti.includes('ventas')
        ? 'El área de marketing tiene intersección con ventas. Podés especializarte en branding, contenido o estrategia para distanciarte del rol comercial puro.'
        : anti.includes('exposicion')
        ? 'Algunos roles de publicidad implican mucha exposición. El marketing digital o analítico requiere menos presencia pública.'
        : null,
  },

  "Economía finanzas y banca": {
    razon: (p) =>
      `Aparece porque tu perfil de ${p} tiene una orientación fuerte hacia el análisis cuantitativo y la toma de decisiones basada en datos.`,
    alerta: (anti) =>
      anti.includes('matematica')
        ? 'Economía y finanzas tienen carga cuantitativa significativa. Si el rechazo es puntual, explorá orientaciones más cualitativas como economía política o finanzas de impacto.'
        : null,
  },

  "Derecho notariado y bienes": {
    razon: (p) =>
      `Aparece porque el perfil de ${p} combina un fuerte sentido de la justicia con capacidad argumentativa — los dos pilares de la práctica jurídica.`,
    alerta: (anti) =>
      anti.includes('rutina')
        ? 'Ciertas especialidades del derecho (notariado, administrativo) tienen mucha rutina documental. El derecho penal, de familia o internacional puede ser más dinámico.'
        : null,
  },

  "Arte música teatro y audiovisual": {
    razon: (p) =>
      `Aparece porque tu perfil de ${p} prioriza la expresión personal y la creación de obra con sello propio — lo que define las carreras artísticas.`,
    alerta: (_anti, prefs) =>
      prefs.ingresos > 70
        ? 'Las carreras artísticas tienen trayectorias económicas más variables. El informe completo te muestra qué especializaciones tienen mayor empleabilidad.'
        : null,
  },

  "Diseño gráfico industrial y digital": {
    razon: (p) =>
      `Aparece porque el perfil de ${p} combina sensibilidad estética con pensamiento funcional — la base del diseño aplicado.`,
    alerta: (_anti, _prefs, provinceAvailable) =>
      !provinceAvailable
        ? 'La mayoría de las instituciones con esta carrera están en grandes centros urbanos. Hay opciones en modalidad mixta o virtual que vale la pena explorar.'
        : null,
  },

  "Comunicación y medios digitales": {
    razon: (p) =>
      `Aparece porque tu perfil de ${p} tiene orientación a construir narrativas y llegar a audiencias — el corazón de las carreras de comunicación.`,
    alerta: (anti) =>
      anti.includes('exposicion')
        ? 'Periodismo y producción audiovisual implican exposición pública. Community management, comunicación interna o edición pueden ser alternativas con menos visibilidad.'
        : null,
  },

  "Contabilidad auditoría e impuestos": {
    razon: (p) =>
      `Aparece porque tu perfil de ${p} tiene orientación hacia la precisión, la estructura normativa y el análisis financiero aplicado.`,
    alerta: (anti) =>
      anti.includes('rutina')
        ? 'La contabilidad tiene ciclos rutinarios (cierres, declaraciones). La auditoría y la consultoría tributaria tienen más variedad de proyectos.'
        : null,
  },

  "Ambiente biodiversidad y recursos naturales": {
    razon: (p) =>
      `Aparece porque tu perfil de ${p} combina curiosidad científica con una orientación hacia la protección de los sistemas naturales.`,
    alerta: null,
  },

  "Biología genética y biotecnología": {
    razon: (p) =>
      `Aparece porque el perfil de ${p} tiene una curiosidad profunda por los sistemas vivos y la investigación experimental — el núcleo de la biología moderna.`,
    alerta: (anti) =>
      anti.includes('matematica')
        ? 'La biotecnología moderna tiene componentes estadísticos y computacionales fuertes. Las ramas más orientadas al laboratorio reducen esa carga.'
        : null,
  },

  "Química": {
    razon: (p) =>
      `Aparece porque tu perfil de ${p} tiene orientación hacia la investigación experimental y el entendimiento profundo de los procesos materiales.`,
    alerta: (anti) =>
      anti.includes('matematica')
        ? 'Química requiere matemática aplicada. Si el bloqueo es conceptual, la práctica de laboratorio puede abrirte una relación diferente con los números.'
        : null,
  },

  "Laboratorio farmacia y bioquímica": {
    razon: (p) =>
      `Aparece porque el perfil de ${p} tiene una combinación de rigor analítico y orientación al impacto en salud — lo que define las carreras de ciencias del laboratorio.`,
    alerta: (anti) =>
      anti.includes('sangre')
        ? 'Las carreras de laboratorio clínico incluyen muestras biológicas. Farmacia industrial o bioquímica de procesos tienen menos contacto con ese tipo de material.'
        : null,
  },

  "Civil obras e infraestructura": {
    razon: (p) =>
      `Aparece porque el perfil de ${p} tiene orientación hacia la materialización de proyectos de escala grande y el trabajo en entornos físicos complejos.`,
    alerta: null,
  },

  "Mecánica electromecánica y mecatrónica": {
    razon: (p) =>
      `Aparece porque tu perfil de ${p} tiene una orientación práctica hacia sistemas físicos que combinan mecánica, electrónica y control.`,
    alerta: (anti) =>
      anti.includes('matematica')
        ? 'Estas ingenierías tienen carga matemática importante. Explorá si el rechazo es al cálculo abstracto o al trabajo técnico en general — son cosas distintas.'
        : null,
  },

  "RRHH y desarrollo organizacional": {
    razon: (p) =>
      `Aparece porque tu perfil de ${p} prioriza el desarrollo de las personas dentro de las organizaciones — el núcleo de las carreras de recursos humanos.`,
    alerta: (anti) =>
      anti.includes('ventas')
        ? 'Algunas áreas de RRHH tienen función comercial (reclutamiento externo, consultoría). Desarrollo organizacional interno o capacitación son alternativas sin ese componente.'
        : null,
  },

  "Sociología trabajo social y comunidad": {
    razon: (p) =>
      `Aparece porque el perfil de ${p} tiene orientación hacia el entendimiento y la transformación de los sistemas sociales — lo que define las ciencias sociales aplicadas.`,
    alerta: null,
  },

  "Turismo hotelería y gastronomía": {
    razon: (p) =>
      `Aparece porque tu perfil de ${p} tiene energía natural para crear experiencias que hacen que otros la pasen bien — el corazón de la hospitalidad.`,
    alerta: (anti) =>
      anti.includes('exposicion')
        ? 'Turismo y gastronomía implican alta interacción con público. La gestión hotelera o eventos corporativos tienen perfiles más de coordinación que de exposición directa.'
        : anti.includes('rutina')
        ? 'En realidad las carreras de turismo y gastronomía tienen poca rutina — cada día, cliente o evento es diferente.'
        : null,
  },

  "Turismo hotelería eventos y gastronomía": {
    razon: (p) =>
      `Aparece porque tu perfil de ${p} tiene energía natural para crear experiencias memorables — el corazón de la hospitalidad y los eventos.`,
    alerta: (anti) =>
      anti.includes('exposicion')
        ? 'Turismo y gastronomía implican alta interacción con público. La gestión hotelera o eventos corporativos tienen perfiles más de coordinación que de exposición directa.'
        : null,
  },

  "Veterinaria y salud animal": {
    razon: (p) =>
      `Aparece porque tu perfil de ${p} combina orientación al cuidado con conexión con los sistemas vivos no humanos — el territorio de la veterinaria.`,
    alerta: (anti) =>
      anti.includes('sangre')
        ? 'La veterinaria clínica incluye trabajo con situaciones médicas y quirúrgicas en animales. Bromatología, zootecnia o sanidad animal tienen menos carga de ese tipo.'
        : null,
  },

  "Agronomía agro y producción": {
    razon: (p) =>
      `Aparece porque el perfil de ${p} tiene una orientación de largo plazo hacia los sistemas productivos y el territorio — lo que define la agronomía moderna.`,
    alerta: null,
  },

  "Filosofía historia y humanidades": {
    razon: (p) =>
      `Aparece porque tu perfil de ${p} tiene una orientación profunda hacia el pensamiento crítico y la comprensión de los sistemas culturales e históricos.`,
    alerta: (_anti, prefs) =>
      prefs.ingresos > 65
        ? 'Las humanidades tienen salidas laborales menos directas que otras áreas. El informe completo muestra cómo se combinan con especializaciones de mayor empleabilidad.'
        : null,
  },

  "Idiomas traducción y letras": {
    razon: (p) =>
      `Aparece porque el perfil de ${p} tiene sensibilidad hacia el lenguaje como herramienta de pensamiento y comunicación — el núcleo de las letras y la traducción.`,
    alerta: null,
  },

  "Periodismo y redacción": {
    razon: (p) =>
      `Aparece porque tu perfil de ${p} combina orientación narrativa con curiosidad por los sistemas sociales y la comunicación de ideas con impacto.`,
    alerta: (anti) =>
      anti.includes('exposicion')
        ? 'El periodismo tradicional tiene exposición pública. El periodismo de datos, la redacción digital o la edición editorial son alternativas con menos visibilidad personal.'
        : null,
  },

  "Psicopedagogía": {
    razon: (p) =>
      `Aparece porque combinás la orientación de ${p} hacia el desarrollo de personas con sensibilidad hacia los procesos de aprendizaje — el corazón de la psicopedagogía.`,
    alerta: null,
  },

  "Acompañamiento terapéutico": {
    razon: (p) =>
      `Aparece porque tu perfil de ${p} tiene una orientación genuina hacia el acompañamiento en momentos de vulnerabilidad — lo que define esta práctica.`,
    alerta: null,
  },

  "Rehabilitación y terapias": {
    razon: (p) =>
      `Aparece porque el perfil de ${p} combina orientación al cuidado con interés en los procesos de recuperación y bienestar funcional.`,
    alerta: (anti) =>
      anti.includes('sangre')
        ? 'La rehabilitación incluye trabajo con el cuerpo humano. Si el rechazo es a situaciones de urgencia médica, la rehabilitación cognitiva o educativa puede ser una mejor entrada.'
        : null,
  },

  "Profesorados pedagogía y gestión educativa": {
    razon: (p) =>
      `Aparece porque el perfil de ${p} tiene una orientación natural a multiplicar capacidades en otros — el motor central de la docencia y la pedagogía.`,
    alerta: (anti) =>
      anti.includes('exposicion')
        ? 'La docencia implica exposición ante grupos. La gestión educativa o la formación corporativa tienen perfiles con menos exposición sostenida.'
        : null,
  },

  "Seguridad criminalística y fuerzas": {
    razon: (p) =>
      `Aparece porque el perfil de ${p} tiene orientación hacia el orden, la justicia aplicada y la protección de la comunidad.`,
    alerta: null,
  },

  "Gobierno política y RRII": {
    razon: (p) =>
      `Aparece porque el perfil de ${p} combina comprensión de los sistemas normativos con orientación a liderar procesos de bien público.`,
    alerta: (anti) =>
      anti.includes('exposicion')
        ? 'La política tiene alta exposición pública. Las relaciones internacionales, la gestión gubernamental técnica o la diplomacia tienen perfiles más de análisis que de visibilidad mediática.'
        : null,
  },

  "Nutrición": {
    razon: (p) =>
      `Aparece porque tu perfil de ${p} combina orientación al cuidado de la salud con interés en los procesos biológicos aplicados al bienestar cotidiano.`,
    alerta: null,
  },

  "Odontología": {
    razon: (p) =>
      `Aparece porque el perfil de ${p} combina habilidad técnica de precisión con orientación al cuidado de personas — lo que define la práctica odontológica.`,
    alerta: (anti) =>
      anti.includes('sangre')
        ? 'La odontología clínica incluye procedimientos invasivos. Si el rechazo es fuerte, explorá otras carreras del área de salud con menor componente quirúrgico.'
        : null,
  },

  "Electrónica electricidad y telecomunicaciones": {
    razon: (p) =>
      `Aparece porque el perfil de ${p} tiene orientación hacia los sistemas técnicos que conectan y controlan — el núcleo de la electrónica y las telecomunicaciones.`,
    alerta: (anti) =>
      anti.includes('matematica')
        ? 'Electrónica y telecomunicaciones tienen carga matemática y de física aplicada. Técnicaturas o especializaciones en instalaciones pueden ser una entrada más gradual.'
        : null,
  },

  "Industrial procesos y logística": {
    razon: (p) =>
      `Aparece porque tu perfil de ${p} tiene orientación hacia la optimización de procesos complejos y la coordinación de sistemas productivos a escala.`,
    alerta: null,
  },

  "Videojuegos y simulación": {
    razon: (p, s) =>
      `Aparece porque tu perfil de ${p}${s ? ` con componente de ${s}` : ''} combina pensamiento sistémico y creatividad — los dos pilares del diseño y desarrollo de videojuegos.`,
    alerta: (anti) =>
      anti.includes('matematica')
        ? 'El desarrollo de videojuegos tiene componentes matemáticos (física, álgebra lineal). El diseño de juego o producción artística tienen menos carga en esa área.'
        : null,
  },

  "Bioingeniería": {
    razon: (p) =>
      `Aparece porque el perfil de ${p} tiene la intersección entre rigor técnico y orientación a la salud — exactamente el territorio de la bioingeniería.`,
    alerta: null,
  },

  "Logística y operaciones": {
    razon: (p) =>
      `Aparece porque tu perfil de ${p} tiene orientación hacia la coordinación eficiente de recursos y procesos — la esencia de la logística moderna.`,
    alerta: null,
  },

  "Energía petróleo y naval": {
    razon: (p) =>
      `Aparece porque el perfil de ${p} tiene orientación hacia la gestión de sistemas técnicos complejos en entornos de alta demanda operativa.`,
    alerta: null,
  },

  "Física ciencias básicas y aplicadas": {
    razon: (p) =>
      `Aparece porque el perfil de ${p} tiene una curiosidad profunda por los fundamentos que explican cómo funciona el mundo — el territorio de la física.`,
    alerta: (anti) =>
      anti.includes('matematica')
        ? 'Física tiene alta carga matemática. Si el rechazo es al estilo escolar, la física experimental o aplicada puede tener una experiencia muy diferente.'
        : null,
  },

  "Teología y religión": {
    razon: (p) =>
      `Aparece porque tu perfil de ${p} tiene orientación hacia las preguntas profundas de sentido y hacia el acompañamiento espiritual de comunidades.`,
    alerta: null,
  },

  "Técnicas y servicios de salud": {
    razon: (p) =>
      `Aparece porque el perfil de ${p} tiene orientación al cuidado técnico de la salud en roles de alta precisión y responsabilidad clínica.`,
    alerta: (anti) =>
      anti.includes('sangre')
        ? 'Algunas técnicas de salud (radiología, instrumentación quirúrgica) implican situaciones clínicas directas. Servicios de salud no clínicos como gestión o informática médica son alternativas.'
        : null,
  },

  "Química alimentos y procesos": {
    razon: (p) =>
      `Aparece porque el perfil de ${p} combina rigor científico con orientación hacia procesos productivos — el núcleo de la química aplicada a alimentos.`,
    alerta: null,
  },

  "Ingenierías generales": {
    razon: (p) =>
      `Aparece porque tu perfil de ${p} tiene una base técnica fuerte y versatilidad para especializarte en el área de ingeniería que más resuene con tu interés.`,
    alerta: (anti) =>
      anti.includes('matematica')
        ? 'Las ingenierías generales tienen carga matemática significativa en los primeros años. Evaluá si el rechazo es al cálculo abstracto o al trabajo técnico aplicado.'
        : null,
  },
};

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export function explicarCarrera(
  career: { titulo: string; familia: string; macroArea: string },
  primario: { id: string; nombre: string },
  secundario: { id: string; nombre: string } | null,
  preferences: CareerPreferences,
  antipatrones: string[],
  provinceAvailable: boolean,
): CarreraExplicacion {
  // Las claves de TEMPLATES no llevan comas; la DB sí ("Software, sistemas e
  // informática"). Sin esta normalización ningún template personalizado aplicaba.
  const template = TEMPLATES[career.familia.replace(/,/g, '')];

  const razon = template
    ? template.razon(primario.nombre, secundario?.nombre ?? null)
    : `Aparece por la combinación de tu orientación hacia ${career.macroArea} y el perfil de ${primario.nombre}.`;

  const alerta = template?.alerta
    ? template.alerta(antipatrones, preferences, provinceAvailable)
    : null;

  return { razon, alerta: alerta ?? null };
}
