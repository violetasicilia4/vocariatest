// AUTO-GENERATED from datos_universidades.xlsx
export interface UniversidadEntry {
  nombre: string;
  provincia: string;
  web?: string;
  duracion?: string;
}

export interface CarreraEntry {
  id: string;
  titulo: string;
  macroArea: string;
  familia: string;
  universidades: UniversidadEntry[];
}

export const CARRERAS_DB: CarreraEntry[] = [
  {
    id: "abogado",
    titulo: "Abogado",
    macroArea: "Derecho y Ciencias Jurídicas",
    familia: "Derecho, notariado y bienes",
    universidades: [
    { nombre: "Instituto Universitario de la Policía Federal Argentina", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.iupfa.edu.ar", duracion: "5 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uca.edu.ar", duracion: "5 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Santa Fé", web: "www.uca.edu.ar", duracion: "5 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Entre Ríos", web: "www.uca.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Abierta Interamericana", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uai.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Abierta Interamericana", provincia: "Santa Fé", web: "www.uai.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Argentina de la Empresa", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uade.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Argentina de la Empresa", provincia: "Buenos Aires", web: "www.uade.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Argentina John F. Kennedy", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://www.kennedy.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Atlántida Argentina", provincia: "Buenos Aires", web: "http://www.atlantida.edu.ar/", duracion: "4 años" }
    ],
  },
  {
    id: "contador_p_blico",
    titulo: "Contador Público",
    macroArea: "Contabilidad e Impuestos",
    familia: "Contabilidad, auditoría e impuestos",
    universidades: [
    { nombre: "Instituto Universitario Escuela Argentina de Negocios", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://www.iuean.edu.ar", duracion: "4 años" },
    { nombre: "Instituto Universitario Escuela Argentina de Negocios", provincia: "Buenos Aires", web: "http://www.ean.edu.ar", duracion: "4 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uca.edu.ar", duracion: "4 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Santa Fé", web: "www.uca.edu.ar", duracion: "4 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Mendoza", web: "http://uca.edu.ar/es/facultades/facultad-de-humanidades-y-ciencias-economicas", duracion: "4 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Entre Ríos", web: "www.uca.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Abierta Interamericana", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uai.edu.ar", duracion: "4.5 años" },
    { nombre: "Universidad Abierta Interamericana", provincia: "Santa Fé", web: "www.uai.edu.ar", duracion: "4.5 años" },
    { nombre: "Universidad Adventista del Plata", provincia: "Entre Ríos", web: "https://uap.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Argentina de la Empresa", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uade.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "m_dico",
    titulo: "Médico",
    macroArea: "Medicina y Salud",
    familia: "Medicina y atención clínica",
    universidades: [
    { nombre: "Instituto Universitario CEMIC", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.iuc.edu.ar", duracion: "6 años" },
    { nombre: "Instituto Universitario de Ciencias Biomédicas de Córdoba", provincia: "Córdoba", web: "http://iucbc.edu.ar/", duracion: "6 años" },
    { nombre: "Instituto Universitario de Ciencias de la Salud de la Fundación Barceló", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.barcelo.edu.ar", duracion: "6 años" },
    { nombre: "Instituto Universitario de Ciencias de la Salud de la Fundación Barceló", provincia: "La Rioja", web: "www.barcelo.edu.ar", duracion: "6 años" },
    { nombre: "Instituto Universitario de Ciencias de la Salud de la Fundación Barceló", provincia: "Corrientes", web: "www.barcelo.edu.ar", duracion: "6 años" },
    { nombre: "Instituto Universitario Italiano de Rosario", provincia: "Santa Fé", web: "https://www.iunir.edu.ar/grado/medicina/fmedi.asp", duracion: "6 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Santa Fé", web: "www.uca.edu.ar", duracion: "6 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uca.edu.ar", duracion: "6 años" },
    { nombre: "Universidad Abierta Interamericana", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uai.edu.ar", duracion: "6 años" },
    { nombre: "Universidad Abierta Interamericana", provincia: "Santa Fé", web: "www.uai.edu.ar", duracion: "6 años" }
    ],
  },
  {
    id: "licenciado_en_enfermer_a",
    titulo: "Licenciado en Enfermería",
    macroArea: "Medicina y Salud",
    familia: "Enfermería",
    universidades: [
    { nombre: "Instituto Universitario CEMIC", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.iuc.edu.ar", duracion: "5 años" },
    { nombre: "Instituto Universitario Italiano de Rosario", provincia: "Santa Fé", web: "www.iunir.edu.ar", duracion: "5 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uca.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Abierta Interamericana", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uai.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Abierta Interamericana", provincia: "Santa Fé", web: "www.uai.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Adventista del Plata", provincia: "Entre Ríos", web: "https://uap.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Austral", provincia: "Buenos Aires", web: "http://www.austral.edu.ar/cienciasbiomedicas", duracion: "5 años" },
    { nombre: "Universidad Autónoma de Entre Ríos", provincia: "Entre Ríos", web: "http://fcvs.uader.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Católica de Cuyo", provincia: "San Juan", web: "www.uccuyo.edu.ar", duracion: "5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.fmed.uba.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_administraci_n",
    titulo: "Licenciado en Administración",
    macroArea: "Administración y Negocios",
    familia: "Administración, gestión y negocios",
    universidades: [
    { nombre: "Universidad Abierta Interamericana", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uai.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Abierta Interamericana", provincia: "Santa Fé", web: "www.uai.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Adventista del Plata", provincia: "Entre Ríos", web: "https://uap.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Argentina John F. Kennedy", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://www.kennedy.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Atlántida Argentina", provincia: "Buenos Aires", web: "https://www.atlantida.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Católica de Santa Fe", provincia: "Santa Fé", web: "http://www.ucsf.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Católica de Santiago del Estero", provincia: "Santa Fé", web: "http://www.ucse.edu.ar/web/rafaela/sede_rafaela.htm", duracion: "4 años" },
    { nombre: "Universidad Católica de Santiago del Estero", provincia: "Jujuy", web: "http://www.ucse.edu.ar/web/jujuy/sede_jujuy.htm", duracion: "4 años" },
    { nombre: "Universidad Católica de Santiago del Estero", provincia: "Santiago Del Estero", web: "http://www.ucse.edu.ar/web/sede_sgo/fce/sc%20fce.htm", duracion: "4 años" },
    { nombre: "Universidad de Belgrano", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.ub.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_nutrici_n",
    titulo: "Licenciado en Nutrición",
    macroArea: "Medicina y Salud",
    familia: "Nutrición",
    universidades: [
    { nombre: "Instituto Universitario CEMIC", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.iuc.edu.ar", duracion: "5 años" },
    { nombre: "Instituto Universitario de Ciencias de la Salud de la Fundación Barceló", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.barcelo.edu.ar", duracion: "4 años" },
    { nombre: "Instituto Universitario de Ciencias de la Salud de la Fundación Barceló", provincia: "La Rioja", web: "www.barcelo.edu.ar", duracion: "4 años" },
    { nombre: "Instituto Universitario de Ciencias de la Salud de la Fundación Barceló", provincia: "Corrientes", web: "www.barcelo.edu.ar", duracion: "4 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uca.edu.ar", duracion: "4.5 años" },
    { nombre: "Universidad Abierta Interamericana", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uai.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Abierta Interamericana", provincia: "Santa Fé", web: "www.uai.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Adventista del Plata", provincia: "Entre Ríos", web: "https://uap.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Argentina de la Empresa", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uade.edu.ar", duracion: "4.5 años" },
    { nombre: "Universidad Austral", provincia: "Buenos Aires", web: "http://www.austral.edu.ar/cienciasbiomedicas", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_psicolog_a",
    titulo: "Licenciado en Psicología",
    macroArea: "Psicología y Comportamiento Humano",
    familia: "Psicología",
    universidades: [
    { nombre: "Instituto Universitario Italiano de Rosario", provincia: "Santa Fé", web: "www.iunir.edu.ar", duracion: "5 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Mendoza", web: "http://uca.edu.ar/es/facultades/facultad-de-humanidades-y-ciencias-economicas", duracion: "5 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Entre Ríos", web: "www.uca.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Abierta Interamericana", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uai.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Abierta Interamericana", provincia: "Santa Fé", web: "www.uai.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Adventista del Plata", provincia: "Entre Ríos", web: "https://uap.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Argentina de la Empresa", provincia: "Buenos Aires", web: "www.uade.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Argentina John F. Kennedy", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://www.kennedy.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Atlántida Argentina", provincia: "Buenos Aires", web: "http://www.atlantida.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Autónoma de Entre Ríos", provincia: "Entre Ríos", web: "http://fhaycs-uader.edu.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "ingeniero_industrial",
    titulo: "Ingeniero Industrial",
    macroArea: "Ingeniería Industrial y Producción",
    familia: "Industrial, procesos y logística",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://uca.edu.ar/es/facultades/facultad-de-ingenieria-y-ciencias-agrarias", duracion: "5 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Santa Fé", web: "www.uca.edu.ar/quimicarosario", duracion: "5 años" },
    { nombre: "Universidad Argentina de la Empresa", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uade.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Austral", provincia: "Buenos Aires", web: "http://www.austral.edu.ar/ingenieria/", duracion: "5 años" },
    { nombre: "Universidad Católica de Córdoba", provincia: "Córdoba", web: "www.ucc.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Católica de Salta", provincia: "Salta", web: "http://www.ucasal.net", duracion: "5 años" },
    { nombre: "Universidad de la Marina Mercante", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.udemm.edu.ar", duracion: "5 años" },
    { nombre: "Universidad del Norte Santo Tomás de Aquino", provincia: "Tucumán", web: "http://www.unsta.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad del Salvador", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.usal.edu.ar", duracion: "5 años" },
    { nombre: "Universidad de Mendoza", provincia: "Mendoza", web: "http://www.um.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_econom_a",
    titulo: "Licenciado en Economía",
    macroArea: "Economía y Finanzas",
    familia: "Economía, finanzas y banca",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uca.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Abierta Interamericana", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uai.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Abierta Interamericana", provincia: "Santa Fé", web: "www.uai.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Argentina de la Empresa", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uade.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Autónoma de Entre Ríos", provincia: "Entre Ríos", web: "http://fcg.uader.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Católica de Cuyo", provincia: "San Juan", web: "www.uccuyo.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Católica de Salta", provincia: "Salta", web: "http://www.ucasal.net", duracion: "4 años" },
    { nombre: "Universidad de Belgrano", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.ub.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Ciencias Empresariales y Sociales", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uces.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Concepción del Uruguay", provincia: "Entre Ríos", web: "www.ucu.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_kinesiolog_a_y_fisiatr_a",
    titulo: "Licenciado en Kinesiología y Fisiatría",
    macroArea: "Medicina y Salud",
    familia: "Rehabilitación y terapias",
    universidades: [
    { nombre: "Instituto Universitario de Ciencias de la Salud de la Fundación Barceló", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.barcelo.edu.ar", duracion: "5 años" },
    { nombre: "Instituto Universitario de Ciencias de la Salud de la Fundación Barceló", provincia: "La Rioja", web: "www.barcelo.edu.ar", duracion: "5 años" },
    { nombre: "Instituto Universitario de Ciencias de la Salud de la Fundación Barceló", provincia: "Corrientes", web: "www.barcelo.edu.ar", duracion: "5 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uca.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Abierta Interamericana", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uai.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Abierta Interamericana", provincia: "Santa Fé", web: "www.uai.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Adventista del Plata", provincia: "Entre Ríos", web: "https://uap.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Católica de Córdoba", provincia: "Córdoba", web: "www.ucc.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Católica de Cuyo", provincia: "San Juan", web: "www.uccuyo.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Católica de Santa Fe", provincia: "Santa Fé", web: "www.ucsf.edu.ar/sedes/reconquista/", duracion: "4.5 años" }
    ],
  },
  {
    id: "arquitecto",
    titulo: "Arquitecto",
    macroArea: "Arquitectura, Urbanismo y Construcción",
    familia: "Arquitectura, urbanismo y obra",
    universidades: [
    { nombre: "Universidad Abierta Interamericana", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uai.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Abierta Interamericana", provincia: "Santa Fé", web: "www.uai.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Argentina de la Empresa", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uade.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Argentina de la Empresa", provincia: "Buenos Aires", web: "www.uade.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Argentina John F. Kennedy", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://www.kennedy.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Blas Pascal", provincia: "Córdoba", web: "http://www.ubp.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Católica de Córdoba", provincia: "Córdoba", web: "www.ucc.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Católica de Salta", provincia: "Salta", web: "http://www.ucasal.net", duracion: "5 años" },
    { nombre: "Universidad Católica de Santa Fe", provincia: "Santa Fé", web: "http://www.ucsf.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Católica de Santa Fe", provincia: "Misiones", web: "http://www.ucsf.edu.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_psicopedagog_a",
    titulo: "Licenciado en Psicopedagogía",
    macroArea: "Psicología y Comportamiento Humano",
    familia: "Psicopedagogía",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Mendoza", web: "http://uca.edu.ar/es/facultades/facultad-de-humanidades-y-ciencias-economicas", duracion: "4 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uca.edu.ar", duracion: "4 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Entre Ríos", web: "www.uca.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Abierta Interamericana", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uai.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Abierta Interamericana", provincia: "Santa Fé", web: "www.uai.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Argentina John F. Kennedy", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://www.kennedy.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Atlántida Argentina", provincia: "Buenos Aires", web: "https://www.atlantida.edu.ar/", duracion: "4.5 años" },
    { nombre: "Universidad Blas Pascal", provincia: "Córdoba", web: "http://www.ubp.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad CAECE", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.ucaece.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Católica de Córdoba", provincia: "Córdoba", web: "www.ucc.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_comunicaci_n_social",
    titulo: "Licenciado en Comunicación Social",
    macroArea: "Comunicación y Medios",
    familia: "Comunicación y medios digitales",
    universidades: [
    { nombre: "Universidad de Ciencias Empresariales y Sociales", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uces.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Ciencias Empresariales y Sociales", provincia: "Buenos Aires", web: "www.uces.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Ciencias Empresariales y Sociales", provincia: "Santa Fé", web: "www.uces.edu.ar", duracion: "4 años" },
    { nombre: "Universidad del Centro Educativo Latinoamericano", provincia: "Santa Fé", web: "www.ucel.edu.ar", duracion: "4 años" },
    { nombre: "Universidad del Norte Santo Tomás de Aquino", provincia: "Tucumán", web: "http://www.unsta.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad de San Isidro \"Dr. Plácido Marín\"", provincia: "Buenos Aires", web: "www.usi.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Juan Agustín Maza", provincia: "Mendoza", web: "https://www.umaza.edu.ar/facultad-de-CSC", duracion: "4 años" },
    { nombre: "Universidad Metropolitana para la Educación y el Trabajo", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.umet.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de Chilecito", provincia: "La Rioja", web: "https://www.undec.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.fcc.unc.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "ingeniero_qu_mico",
    titulo: "Ingeniero Químico",
    macroArea: "Ingeniería Química y de Alimentos",
    familia: "Química, alimentos y procesos",
    universidades: [
    { nombre: "Instituto Tecnológico de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.itba.edu.ar/", duracion: "5 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Santa Fé", web: "www.uca.edu.ar/quimicarosario", duracion: "5 años" },
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.efn.uncor.edu", duracion: "5 años" },
    { nombre: "Universidad Nacional de Cuyo", provincia: "Mendoza", web: "www.fcai.uncuyo.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de General Sarmiento", provincia: "Buenos Aires", web: "www.ungs.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Jujuy", provincia: "Jujuy", web: "https://www.fi.unju.edu.ar/extensiones-aulicas/", duracion: "5 años" },
    { nombre: "Universidad Nacional de la Patagonia San Juan Bosco", provincia: "Chubut", web: "www.unp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de La Plata", provincia: "Buenos Aires", web: "www.ing.unlp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Centro de la Provincia de Buenos Aires", provincia: "Buenos Aires", web: "http://www.fio.unicen.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Chaco Austral", provincia: "Chaco", web: "www.uncaus.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "ingeniero_electr_nico",
    titulo: "Ingeniero Electrónico",
    macroArea: "Ingeniería Eléctrica, Electrónica y Telecomunicaciones",
    familia: "Electrónica, electricidad y telecomunicaciones",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://uca.edu.ar/es/facultades/facultad-de-ingenieria-y-ciencias-agrarias", duracion: "5 años" },
    { nombre: "Universidad Argentina de la Empresa", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uade.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Católica de Córdoba", provincia: "Córdoba", web: "www.ucc.edu.ar", duracion: "5 años" },
    { nombre: "Universidad de la Marina Mercante", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.udemm.edu.ar", duracion: "5 años" },
    { nombre: "Universidad de Mendoza", provincia: "Mendoza", web: "http://www.um.edu.ar", duracion: "5 años" },
    { nombre: "Universidad de Palermo", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.palermo.edu", duracion: "5 años" },
    { nombre: "Universidad Nacional de Catamarca", provincia: "Catamarca", web: "http://tecno.unca.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de la Patagonia San Juan Bosco", provincia: "Chubut", web: "www.unp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de La Plata", provincia: "Buenos Aires", web: "www.ing.unlp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Comahue", provincia: "Río Negro", web: "http://app.crub.uncoma.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "ingeniero_agr_nomo",
    titulo: "Ingeniero Agrónomo",
    macroArea: "Ingeniería y Tecnología",
    familia: "Ingenierías generales",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://uca.edu.ar/es/facultades/facultad-de-ingenieria-y-ciencias-agrarias", duracion: "5 años" },
    { nombre: "Universidad Católica de Córdoba", provincia: "Córdoba", web: "www.ucc.edu.ar", duracion: "5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5.5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5.5 años" },
    { nombre: "Universidad de Concepción del Uruguay", provincia: "Entre Ríos", web: "www.ucu.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Catamarca", provincia: "Catamarca", web: "http://www.unca.edu.ar/", duracion: "6 años" },
    { nombre: "Universidad Nacional de Cuyo", provincia: "Mendoza", web: "www.fca.uncuyo.edu.ar", duracion: "5.5 años" },
    { nombre: "Universidad Nacional de Entre Ríos", provincia: "Entre Ríos", web: "http://www.fca.uner.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Jujuy", provincia: "Jujuy", web: "http://www.fca.unju.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de La Pampa", provincia: "La Pampa", web: "www.agro.unlpam.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "ingeniero_civil",
    titulo: "Ingeniero Civil",
    macroArea: "Ingeniería Civil, Construcción e Infraestructura",
    familia: "Civil, obras e infraestructura",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://uca.edu.ar/es/facultades/facultad-de-ingenieria-y-ciencias-agrarias", duracion: "5 años" },
    { nombre: "Universidad Católica de Córdoba", provincia: "Córdoba", web: "www.ucc.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Católica de Salta", provincia: "Salta", web: "http://www.ucasal.net", duracion: "5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "6 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "6 años" },
    { nombre: "Universidad Nacional de Formosa", provincia: "Formosa", web: "www.unf.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de La Matanza", provincia: "Buenos Aires", web: "http://www.unlam.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de La Plata", provincia: "Buenos Aires", web: "www.ing.unlp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Centro de la Provincia de Buenos Aires", provincia: "Buenos Aires", web: "http://www.fio.unicen.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Comahue", provincia: "Río Negro", web: "http://app.crub.uncoma.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_administraci_n_de_empresas",
    titulo: "Licenciado en Administración de Empresas",
    macroArea: "Administración y Negocios",
    familia: "Administración, gestión y negocios",
    universidades: [
    { nombre: "Instituto Universitario Escuela Argentina de Negocios", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://www.iuean.edu.ar", duracion: "4 años" },
    { nombre: "Instituto Universitario Escuela Argentina de Negocios", provincia: "Buenos Aires", web: "http://www.ean.edu.ar", duracion: "4 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uca.edu.ar", duracion: "4 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Santa Fé", web: "www.uca.edu.ar", duracion: "4 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Mendoza", web: "http://uca.edu.ar/es/facultades/facultad-de-humanidades-y-ciencias-economicas", duracion: "4 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Entre Ríos", web: "www.uca.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Argentina de la Empresa", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uade.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Argentina de la Empresa", provincia: "Buenos Aires", web: "www.uade.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Austral", provincia: "Santa Fé", web: "http://web.austral.edu.ar/cienciasEmpresariales-home.asp", duracion: "4 años" },
    { nombre: "Universidad Autónoma de Entre Ríos", provincia: "Entre Ríos", web: "http://fcg.uader.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "ingeniero_mec_nico",
    titulo: "Ingeniero Mecánico",
    macroArea: "Ingeniería Mecánica, Electromecánica y Mecatrónica",
    familia: "Mecánica, electromecánica y mecatrónica",
    universidades: [
    { nombre: "Instituto Tecnológico de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.itba.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Católica de Córdoba", provincia: "Córdoba", web: "www.ucc.edu.ar", duracion: "5 años" },
    { nombre: "Universidad de la Marina Mercante", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.udemm.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.efn.uncor.edu", duracion: "5 años" },
    { nombre: "Universidad Nacional de Cuyo", provincia: "Mendoza", web: "www.fcai.uncuyo.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Cuyo", provincia: "Río Negro", web: "www.ib.edu.ar", duracion: "5.5 años" },
    { nombre: "Universidad Nacional de La Matanza", provincia: "Buenos Aires", web: "http://www.unlam.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de la Patagonia San Juan Bosco", provincia: "Chubut", web: "www.unp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de La Plata", provincia: "Buenos Aires", web: "www.ing.unlp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Comahue", provincia: "Río Negro", web: "http://app.crub.uncoma.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_historia",
    titulo: "Licenciado en Historia",
    macroArea: "Humanidades, Filosofía y Religión",
    familia: "Filosofía, historia y humanidades",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uca.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Católica de Córdoba", provincia: "Córdoba", web: "www.ucc.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Catamarca", provincia: "Catamarca", web: "http://www.unca.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.ffyh.unc.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Cuyo", provincia: "Mendoza", web: "www.ffyl.uncuyo.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Jujuy", provincia: "Jujuy", web: "http://www.fhycs.unju.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de La Pampa", provincia: "La Pampa", web: "www.fchst.unlpam.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de la Patagonia San Juan Bosco", provincia: "Chubut", web: "www.unp.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "ingeniero_electromec_nico",
    titulo: "Ingeniero Electromecánico",
    macroArea: "Ingeniería Mecánica, Electromecánica y Mecatrónica",
    familia: "Mecánica, electromecánica y mecatrónica",
    universidades: [
    { nombre: "Universidad Argentina de la Empresa", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uade.edu.ar", duracion: "5 años" },
    { nombre: "Universidad de la Marina Mercante", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.udemm.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.efn.uncor.edu", duracion: "5 años" },
    { nombre: "Universidad Nacional de La Pampa", provincia: "La Pampa", web: "www.ing.unlpam.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de la Patagonia Austral", provincia: "Santa Cruz", web: "http://www.uaco.unpa.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de La Plata", provincia: "Buenos Aires", web: "www.ing.unlp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Centro de la Provincia de Buenos Aires", provincia: "Buenos Aires", web: "http://www.fio.unicen.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Nordeste", provincia: "Chaco", web: "http://ing.unne.edu.ar/", duracion: "6 años" },
    { nombre: "Universidad Nacional de Mar del Plata", provincia: "Buenos Aires", web: "http://www.fi.mdp.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Misiones", provincia: "Misiones", web: "http://www.fio.unam.edu.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_ciencias_de_la_educaci_n",
    titulo: "Licenciado en Ciencias de la Educación",
    macroArea: "Educación y Docencia",
    familia: "Profesorados, pedagogía y gestión educativa",
    universidades: [
    { nombre: "Universidad Católica de Córdoba", provincia: "Córdoba", web: "www.ucc.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Católica de Santa Fe", provincia: "Santa Fé", web: "www.ucsf.edu.ar/facultades/filosofia-y-humanidades/", duracion: "5 años" },
    { nombre: "Universidad de Congreso", provincia: "Córdoba", web: "http://www.ucongreso.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad de Congreso", provincia: "Mendoza", web: "http://www.ucongreso.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad de Morón", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.unimoron.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de San Andrés", provincia: "Buenos Aires", web: "www.udesa.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de San Isidro \"Dr. Plácido Marín\"", provincia: "Buenos Aires", web: "www.usi.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de Catamarca", provincia: "Catamarca", web: "http://www.unca.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.ffyh.unc.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Cuyo", provincia: "Mendoza", web: "www.ffyl.uncuyo.edu.ar", duracion: "5.5 años" }
    ],
  },
  {
    id: "licenciado_en_marketing",
    titulo: "Licenciado en Marketing",
    macroArea: "Marketing, Publicidad y Comercialización",
    familia: "Marketing, publicidad y ventas",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uca.edu.ar", duracion: "4 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Santa Fé", web: "www.uca.edu.ar", duracion: "4 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Mendoza", web: "http://uca.edu.ar/es/facultades/facultad-de-humanidades-y-ciencias-economicas", duracion: "4 años" },
    { nombre: "Universidad Autónoma de Entre Ríos", provincia: "Entre Ríos", web: "http://fcg.uader.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Blas Pascal", provincia: "Córdoba", web: "http://www.ubp.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad CAECE", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.ucaece.edu.ar", duracion: "4 años" },
    { nombre: "Universidad CAECE", provincia: "Buenos Aires", web: "www.ucaece.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Católica de Santiago del Estero", provincia: "Buenos Aires", web: "https://www.ucse.edu.ar/buenos-aires/", duracion: "4 años" },
    { nombre: "Universidad Católica de Santiago del Estero", provincia: "Jujuy", web: "http://www.ucse.edu.ar/web/jujuy/sede_jujuy.htm", duracion: "4 años" },
    { nombre: "Universidad Católica de Santiago del Estero", provincia: "Santiago Del Estero", web: "http://www.ucse.edu.ar/web/sede_sgo/fce/sc%20fce.htm", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_turismo",
    titulo: "Licenciado en Turismo",
    macroArea: "Turismo, Gastronomía y Hospitalidad",
    familia: "Turismo, hotelería, eventos y gastronomía",
    universidades: [
    { nombre: "Universidad Abierta Interamericana", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uai.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Abierta Interamericana", provincia: "Santa Fé", web: "www.uai.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Argentina John F. Kennedy", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://www.kennedy.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Blas Pascal", provincia: "Córdoba", web: "http://www.ubp.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Católica de Salta", provincia: "Salta", web: "http://www.ucasal.net", duracion: "4 años" },
    { nombre: "Universidad Católica de Santiago del Estero", provincia: "Santa Fé", web: "http://www.ucse.edu.ar/web/rafaela/sede_rafaela.htm", duracion: "5 años" },
    { nombre: "Universidad Católica de Santiago del Estero", provincia: "Jujuy", web: "http://www.ucse.edu.ar/web/jujuy/sede_jujuy.htm", duracion: "4 años" },
    { nombre: "Universidad Católica de Santiago del Estero", provincia: "Santiago Del Estero", web: "http://www.ucse.edu.ar/web/sede_sgo/fce/sc%20fce.htm", duracion: "4 años" },
    { nombre: "Universidad de Ciencias Empresariales y Sociales", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uces.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Ciencias Empresariales y Sociales", provincia: "Buenos Aires", web: "www.uces.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "ingeniero_en_inform_tica",
    titulo: "Ingeniero en Informática",
    macroArea: "Ingeniería Informática y Sistemas",
    familia: "Software, sistemas e informática",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://uca.edu.ar/es/facultades/facultad-de-ingenieria-y-ciencias-agrarias", duracion: "5 años" },
    { nombre: "Universidad Argentina de la Empresa", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uade.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Atlántida Argentina", provincia: "Buenos Aires", web: "https://www.atlantida.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Austral", provincia: "Buenos Aires", web: "http://www.austral.edu.ar/ingenieria/", duracion: "5 años" },
    { nombre: "Universidad Católica de Salta", provincia: "Salta", web: "http://www.ucasal.net", duracion: "5 años" },
    { nombre: "Universidad Católica de Santiago del Estero", provincia: "Jujuy", web: "http://www.ucse.edu.ar/web/jujuy/sede_jujuy.htm", duracion: "5 años" },
    { nombre: "Universidad de Belgrano", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.ub.edu.ar", duracion: "5 años" },
    { nombre: "Universidad de la Fraternidad de Agrupaciones Santo Tomás de Aquino", provincia: "Buenos Aires", web: "http://www.ufasta.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad del Norte Santo Tomás de Aquino", provincia: "Tucumán", web: "http://www.unsta.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad del Salvador", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.usal.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "farmac_utico",
    titulo: "Farmacéutico",
    macroArea: "Química, Farmacia y Bioquímica",
    familia: "Laboratorio, farmacia y bioquímica",
    universidades: [
    { nombre: "Universidad Argentina John F. Kennedy", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://www.kennedy.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Católica de Córdoba", provincia: "Córdoba", web: "www.ucc.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Católica de Cuyo", provincia: "San Juan", web: "www.uccuyo.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Católica de Santa Fe", provincia: "Santa Fé", web: "http://www.ucsf.edu.ar/", duracion: "6 años" },
    { nombre: "Universidad de Belgrano", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.ub.edu.ar", duracion: "4.5 años" },
    { nombre: "Universidad de Morón", provincia: "Buenos Aires", web: "www.unimoron.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Hospital Italiano de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.hospitalitaliano.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Juan Agustín Maza", provincia: "Mendoza", web: "http://www.umaza.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Maimónides", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.maimonides.edu", duracion: "5 años" },
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.fcq.unc.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_filosof_a",
    titulo: "Licenciado en Filosofía",
    macroArea: "Humanidades, Filosofía y Religión",
    familia: "Filosofía, historia y humanidades",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uca.edu.ar", duracion: "4.5 años" },
    { nombre: "Universidad Católica de Córdoba", provincia: "Córdoba", web: "www.ucc.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Católica de Cuyo", provincia: "San Juan", web: "www.uccuyo.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Católica de las Misiones", provincia: "Misiones", web: "www.ucami.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Católica de Santa Fe", provincia: "Santa Fé", web: "www.ucsf.edu.ar/facultades/filosofia-y-humanidades/", duracion: "5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "6 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "6 años" },
    { nombre: "Universidad del Norte Santo Tomás de Aquino", provincia: "Tucumán", web: "http://www.unsta.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Catamarca", provincia: "Catamarca", web: "http://www.unca.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.ffyh.unc.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "profesor_en_ciencias_de_la_educaci_n",
    titulo: "Profesor en Ciencias de la Educación",
    macroArea: "Educación y Docencia",
    familia: "Profesorados, pedagogía y gestión educativa",
    universidades: [
    { nombre: "Universidad Católica de Córdoba", provincia: "Córdoba", web: "www.ucc.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Católica de Santa Fe", provincia: "Santa Fé", web: "www.ucsf.edu.ar/facultades/filosofia-y-humanidades/", duracion: "4 años" },
    { nombre: "Universidad Católica de Santiago del Estero", provincia: "Santiago Del Estero", web: "http://newsite.ucse.edu.ar/index.php/ucse-sedes/santiago-del-estero", duracion: "4 años" },
    { nombre: "Universidad de Congreso", provincia: "Mendoza", web: "http://www.ucongreso.edu.ar/", duracion: "4.5 años" },
    { nombre: "Universidad de Congreso", provincia: "San Juan", web: "http://www.ucongreso.edu.ar/", duracion: "4.5 años" },
    { nombre: "Universidad de San Andrés", provincia: "Buenos Aires", web: "www.udesa.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de Catamarca", provincia: "Catamarca", web: "http://www.unca.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.ffyh.unc.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Entre Ríos", provincia: "Entre Ríos", web: "www.uner.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Jujuy", provincia: "Jujuy", web: "http://www.fhycs.unju.edu.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_letras",
    titulo: "Licenciado en Letras",
    macroArea: "Humanidades, Filosofía y Religión",
    familia: "Filosofía, historia y humanidades",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uca.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Católica de Córdoba", provincia: "Córdoba", web: "www.ucc.edu.ar", duracion: "5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Catamarca", provincia: "Catamarca", web: "http://www.unca.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Cuyo", provincia: "Mendoza", web: "www.ffyl.uncuyo.edu.ar", duracion: "4.5 años" },
    { nombre: "Universidad Nacional de Jujuy", provincia: "Jujuy", web: "http://www.fhycs.unju.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de La Pampa", provincia: "La Pampa", web: "www.fchst.unlpam.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de la Patagonia Austral", provincia: "Santa Cruz", web: "http://www.uarg.unpa.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de la Patagonia San Juan Bosco", provincia: "Chubut", web: "www.unp.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_matem_tica",
    titulo: "Licenciado en Matemática",
    macroArea: "Datos, IA y Matemática",
    familia: "Datos, IA, estadística y matemática",
    universidades: [
    { nombre: "Universidad Abierta Interamericana", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uai.edu.ar", duracion: "4 años" },
    { nombre: "Universidad CAECE", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.ucaece.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Empresarial Siglo 21", provincia: "Córdoba", web: "http://www.21.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de Catamarca", provincia: "Catamarca", web: "http://www.unca.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.famaf.unc.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de La Pampa", provincia: "La Pampa", web: "www.exactas.unlpam.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de la Patagonia San Juan Bosco", provincia: "Chubut", web: "www.unp.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de La Plata", provincia: "Buenos Aires", web: "www.exactas.unlp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Comahue", provincia: "Río Negro", web: "http://app.crub.uncoma.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional del Comahue", provincia: "Neuquén", web: "http://faeaweb.uncoma.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "odont_logo",
    titulo: "Odontólogo",
    macroArea: "Medicina y Salud",
    familia: "Odontología",
    universidades: [
    { nombre: "Instituto Universitario Italiano de Rosario", provincia: "Santa Fé", web: "https://www.iunir.edu.ar/grado/odontologia/fodonto.asp", duracion: "5.5 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uca.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Abierta Interamericana", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uai.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Adventista del Plata", provincia: "Entre Ríos", web: "https://uap.edu.ar/", duracion: "5.5 años" },
    { nombre: "Universidad Argentina John F. Kennedy", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://www.kennedy.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Católica de Córdoba", provincia: "Córdoba", web: "www.ucc.edu.ar", duracion: "5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "6 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "6 años" },
    { nombre: "Universidad de la Fraternidad de Agrupaciones Santo Tomás de Aquino", provincia: "Buenos Aires", web: "http://www.ufasta.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad del Salvador", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.usal.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_terapia_ocupacional",
    titulo: "Licenciado en Terapia Ocupacional",
    macroArea: "Medicina y Salud",
    familia: "Rehabilitación y terapias",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uca.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Abierta Interamericana", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uai.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Abierta Interamericana", provincia: "Santa Fé", web: "www.uai.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Católica de Córdoba", provincia: "Córdoba", web: "www.ucc.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Católica de Salta", provincia: "Salta", web: "https://www.ucasal.edu.ar/general/alumno-m-f-equipo-a-tu-lado-escuela-de-ciencias-de-la-salud/", duracion: "5 años" },
    { nombre: "Universidad Católica de Santa Fe", provincia: "Santa Fé", web: "http://www.ucsf.edu.ar/", duracion: "4.5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "4 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "4 años" },
    { nombre: "Universidad del Norte Santo Tomás de Aquino", provincia: "Tucumán", web: "http://www.unsta.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad del Salvador", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.usal.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "profesor_en_filosof_a",
    titulo: "Profesor en Filosofía",
    macroArea: "Educación y Docencia",
    familia: "Profesorados, pedagogía y gestión educativa",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uca.edu.ar", duracion: "4.5 años" },
    { nombre: "Universidad Católica de Córdoba", provincia: "Córdoba", web: "www.ucc.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Católica de Cuyo", provincia: "San Juan", web: "www.uccuyo.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Católica de Salta", provincia: "Salta", web: "https://ucasal.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Católica de Santa Fe", provincia: "Santa Fé", web: "www.ucsf.edu.ar/facultades/filosofia-y-humanidades/", duracion: "4 años" },
    { nombre: "Universidad del Norte Santo Tomás de Aquino", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://www.unsta.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad del Norte Santo Tomás de Aquino", provincia: "Tucumán", web: "http://www.unsta.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Catamarca", provincia: "Catamarca", web: "http://www.unca.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.ffyh.unc.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Jujuy", provincia: "Jujuy", web: "http://www.fhycs.unju.edu.ar/", duracion: "4 años" }
    ],
  },
  {
    id: "ingeniero_en_alimentos",
    titulo: "Ingeniero en Alimentos",
    macroArea: "Ingeniería Química y de Alimentos",
    familia: "Química, alimentos y procesos",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://uca.edu.ar/es/facultades/facultad-de-ingenieria-y-ciencias-agrarias", duracion: "5 años" },
    { nombre: "Universidad Argentina de la Empresa", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uade.edu.ar", duracion: "5 años" },
    { nombre: "Universidad de la Cuenca del Plata", provincia: "Corrientes", web: "www.ucp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Cuyo", provincia: "Mendoza", web: "www.fcai.uncuyo.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Entre Ríos", provincia: "Entre Ríos", web: "http://www.fcal.uner.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de La Rioja", provincia: "La Rioja", web: "www.unlar.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Chaco Austral", provincia: "Chaco", web: "www.uncaus.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Noroeste de la Provincia de Buenos Aires", provincia: "Buenos Aires", web: "www.unnoba.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Sur", provincia: "Buenos Aires", web: "www.uns.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Luján", provincia: "Buenos Aires", web: "http://www.unlu.edu.ar/", duracion: "6 años" }
    ],
  },
  {
    id: "profesor_en_matem_tica",
    titulo: "Profesor en Matemática",
    macroArea: "Datos, IA y Matemática",
    familia: "Datos, IA, estadística y matemática",
    universidades: [
    { nombre: "Universidad Autónoma de Entre Ríos", provincia: "Entre Ríos", web: "http://fcyt.uader.edu.ar/web", duracion: "4 años" },
    { nombre: "Universidad Nacional de Catamarca", provincia: "Catamarca", web: "http://www.unca.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.famaf.unc.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de Formosa", provincia: "Formosa", web: "www.unf.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de La Pampa", provincia: "La Pampa", web: "www.exactas.unlpam.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de la Patagonia Austral", provincia: "Santa Cruz", web: "http://www.uaco.unpa.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional del Chaco Austral", provincia: "Chaco", web: "www.uncaus.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional del Nordeste", provincia: "Corrientes", web: "http://www.exa.unne.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional del Sur", provincia: "Buenos Aires", web: "www.uns.edu.ar", duracion: "4.5 años" },
    { nombre: "Universidad Nacional de Mar del Plata", provincia: "Buenos Aires", web: "http://www.mdp.edu.ar/exactas/", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_a_en_enfermer_a",
    titulo: "Licenciado/a en Enfermería",
    macroArea: "Medicina y Salud",
    familia: "Enfermería",
    universidades: [
    { nombre: "Instituto Universitario de Ciencias Biomédicas de Córdoba", provincia: "Córdoba", web: "http://iucbc.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Autónoma de Entre Ríos", provincia: "Entre Ríos", web: "http://fcvs.uader.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Católica de Córdoba", provincia: "Córdoba", web: "www.ucc.edu.ar", duracion: "4 años" },
    { nombre: "Universidad del Chubut", provincia: "Chubut", web: "http://www.udc.edu.ar/", duracion: "4.5 años" },
    { nombre: "Universidad Nacional Arturo Jauretche", provincia: "Buenos Aires", web: "http://www.unaj.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.fcm.unc.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Hurlingham", provincia: "Buenos Aires", web: "http://www.unahur.edu.ar/es/instituto-salud-comunitaria", duracion: "5 años" },
    { nombre: "Universidad Nacional de la Patagonia Austral", provincia: "Santa Cruz", web: "https://www.portal.uasj.unpa.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de la Patagonia San Juan Bosco", provincia: "Chubut", web: "www.fcn.unp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Comahue", provincia: "Río Negro", web: "https://web.curza.net/", duracion: "5 años" }
    ],
  },
  {
    id: "profesor_en_historia",
    titulo: "Profesor en Historia",
    macroArea: "Educación y Docencia",
    familia: "Profesorados, pedagogía y gestión educativa",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uca.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de Catamarca", provincia: "Catamarca", web: "http://www.unca.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de Jujuy", provincia: "Jujuy", web: "http://www.fhycs.unju.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de La Pampa", provincia: "La Pampa", web: "www.fchst.unlpam.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de la Patagonia Austral", provincia: "Santa Cruz", web: "http://www.uarg.unpa.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de la Patagonia San Juan Bosco", provincia: "Chubut", web: "www.unp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de La Plata", provincia: "Buenos Aires", web: "www.fahce.unlp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Centro de la Provincia de Buenos Aires", provincia: "Buenos Aires", web: "http://www.fch.unicen.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Comahue", provincia: "Río Negro", web: "http://app.crub.uncoma.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Comahue", provincia: "Neuquén", web: "http://fahuweb.uncoma.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_recursos_humanos",
    titulo: "Licenciado en Recursos Humanos",
    macroArea: "Recursos Humanos y Organizaciones",
    familia: "RRHH y desarrollo organizacional",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uca.edu.ar", duracion: "4 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Santa Fé", web: "www.uca.edu.ar", duracion: "4 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Mendoza", web: "http://uca.edu.ar/es/facultades/facultad-de-humanidades-y-ciencias-economicas", duracion: "4 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Entre Ríos", web: "www.uca.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Argentina de la Empresa", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uade.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Católica de Cuyo", provincia: "San Juan", web: "www.uccuyo.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Católica de Santiago del Estero", provincia: "Santiago Del Estero", web: "http://www.ucse.edu.ar/web/sede_sgo/fce/sc%20fce.htm", duracion: "4 años" },
    { nombre: "Universidad de Ciencias Empresariales y Sociales", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uces.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Ciencias Empresariales y Sociales", provincia: "Buenos Aires", web: "www.uces.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Ciencias Empresariales y Sociales", provincia: "Santa Fé", web: "www.uces.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "bioqu_mico",
    titulo: "Bioquímico",
    macroArea: "Química, Farmacia y Bioquímica",
    familia: "Laboratorio, farmacia y bioquímica",
    universidades: [
    { nombre: "Universidad Argentina John F. Kennedy", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://www.kennedy.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Católica de Córdoba", provincia: "Córdoba", web: "www.ucc.edu.ar", duracion: "5 años" },
    { nombre: "Universidad de Morón", provincia: "Buenos Aires", web: "www.unimoron.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Hospital Italiano de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.hospitalitaliano.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Juan Agustín Maza", provincia: "Mendoza", web: "http://www.umaza.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Maimónides", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.maimonides.edu", duracion: "5 años" },
    { nombre: "Universidad Nacional Arturo Jauretche", provincia: "Buenos Aires", web: "http://www.unaj.edu.ar/", duracion: "5.5 años" },
    { nombre: "Universidad Nacional de Entre Ríos", provincia: "Entre Ríos", web: "https://www.fb.uner.edu.ar/", duracion: "4.5 años" },
    { nombre: "Universidad Nacional de la Patagonia San Juan Bosco", provincia: "Chubut", web: "www.fcn.unp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de La Rioja", provincia: "La Rioja", web: "www.unlar.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_relaciones_internacionales",
    titulo: "Licenciado en Relaciones Internacionales",
    macroArea: "Gobierno, Política y Relaciones Internacionales",
    familia: "Gobierno, política y RRII",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uca.edu.ar", duracion: "4 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Entre Ríos", web: "www.uca.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Blas Pascal", provincia: "Córdoba", web: "http://www.ubp.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Católica de Córdoba", provincia: "Córdoba", web: "www.ucc.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Católica de Salta", provincia: "Salta", web: "http://www.ucasal.net", duracion: "4 años" },
    { nombre: "Universidad de Congreso", provincia: "Mendoza", web: "http://www.ucongreso.edu.ar/", duracion: "4.3 años" },
    { nombre: "Universidad de Congreso", provincia: "San Luis", web: "http://www.ucongreso.edu.ar/", duracion: "4.3 años" },
    { nombre: "Universidad del CEMA", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.ucema.edu.ar", duracion: "4 años" },
    { nombre: "Universidad del Salvador", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.usal.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Palermo", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.palermo.edu", duracion: "4 años" }
    ],
  },
  {
    id: "ingeniero_en_sistemas_de_informaci_n",
    titulo: "Ingeniero en Sistemas de Información",
    macroArea: "Ingeniería Informática y Sistemas",
    familia: "Software, sistemas e informática",
    universidades: [
    { nombre: "Universidad Adventista del Plata", provincia: "Entre Ríos", web: "https://uap.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad de la Cuenca del Plata", provincia: "Corrientes", web: "www.ucp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad del Centro Educativo Latinoamericano", provincia: "Santa Fé", web: "www.ucel.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de La Rioja", provincia: "La Rioja", web: "www.unlar.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Chaco Austral", provincia: "Chaco", web: "www.uncaus.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Sur", provincia: "Buenos Aires", web: "www.uns.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Villa Mercedes", provincia: "San Luis", web: "www.unvime.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Tecnológica Nacional", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.frba.utn.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Tecnológica Nacional", provincia: "Entre Ríos", web: "www.frcu.utn.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Tecnológica Nacional", provincia: "Córdoba", web: "www.frc.utn.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_trabajo_social",
    titulo: "Licenciado en Trabajo Social",
    macroArea: "Ciencias Sociales y Comunitarias",
    familia: "Sociología, trabajo social y comunidad",
    universidades: [
    { nombre: "Universidad Católica de Salta", provincia: "Salta", web: "http://www.ucasal.net", duracion: "5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5 años" },
    { nombre: "Universidad de Congreso", provincia: "Mendoza", web: "http://www.ucongreso.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad de Congreso", provincia: "Córdoba", web: "https://www.ucongreso.edu.ar/sedes/localizacion-villa-dolores/", duracion: "4 años" },
    { nombre: "Universidad de Morón", provincia: "Buenos Aires", web: "www.unimoron.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.trabajosocial.unc.edu.ar-www.cea.unc.edu.ar-www.iifap.unc.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Entre Ríos", provincia: "Entre Ríos", web: "http://www.fts.uner.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de La Plata", provincia: "Buenos Aires", web: "www.trabajosocial.unlp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de La Rioja", provincia: "La Rioja", web: "www.unlar.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "m_dico_veterinario",
    titulo: "Médico Veterinario",
    macroArea: "Veterinaria",
    familia: "Veterinaria y salud animal",
    universidades: [
    { nombre: "Universidad Católica de Córdoba", provincia: "Córdoba", web: "www.ucc.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Católica de Cuyo", provincia: "San Luis", web: "www.uccuyo.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Católica de Salta", provincia: "Salta", web: "http://www.ucasal.net", duracion: "5.5 años" },
    { nombre: "Universidad Nacional de Entre Ríos", provincia: "Entre Ríos", web: "https://www.fb.uner.edu.ar/", duracion: "6 años" },
    { nombre: "Universidad Nacional de La Pampa", provincia: "La Pampa", web: "www.vet.unlpam.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de La Plata", provincia: "Buenos Aires", web: "www.fcv.unlp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Centro de la Provincia de Buenos Aires", provincia: "Buenos Aires", web: "www.vet.unicen.edu.ar", duracion: "6 años" },
    { nombre: "Universidad Nacional del Chaco Austral", provincia: "Chaco", web: "www.uncaus.edu.ar", duracion: "6 años" },
    { nombre: "Universidad Nacional del Nordeste", provincia: "Corrientes", web: "http://www.vet.unne.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Río Cuarto", provincia: "Córdoba", web: "www.unrc.edu.ar, www.ayv.unrc.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_comercializaci_n",
    titulo: "Licenciado en Comercialización",
    macroArea: "Marketing, Publicidad y Comercialización",
    familia: "Marketing, publicidad y ventas",
    universidades: [
    { nombre: "Instituto Universitario Escuela Argentina de Negocios", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://www.iuean.edu.ar", duracion: "4 años" },
    { nombre: "Instituto Universitario Escuela Argentina de Negocios", provincia: "Buenos Aires", web: "http://www.ean.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Abierta Interamericana", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uai.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Abierta Interamericana", provincia: "Santa Fé", web: "www.uai.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Argentina de la Empresa", provincia: "Buenos Aires", web: "www.uade.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Argentina John F. Kennedy", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://www.kennedy.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad de Belgrano", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.ub.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Congreso", provincia: "Córdoba", web: "http://www.ucongreso.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad de Congreso", provincia: "Mendoza", web: "https://www.ucongreso.edu.ar/educacion-a-distancia/", duracion: "4 años" },
    { nombre: "Universidad del Centro Educativo Latinoamericano", provincia: "Santa Fé", web: "www.ucel.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_gesti_n_ambiental",
    titulo: "Licenciado en Gestión Ambiental",
    macroArea: "Administración y Negocios",
    familia: "Administración, gestión y negocios",
    universidades: [
    { nombre: "Universidad Autónoma de Entre Ríos", provincia: "Entre Ríos", web: "http://fcyt.uader.edu.ar/web", duracion: "4 años" },
    { nombre: "Universidad Blas Pascal", provincia: "Córdoba", web: "http://www.ubp.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad CAECE", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.ucaece.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Congreso", provincia: "San Juan", web: "http://www.ucongreso.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad de Congreso", provincia: "Mendoza", web: "http://www.ucongreso.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad de la Marina Mercante", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.udemm.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Empresarial Siglo 21", provincia: "Córdoba", web: "http://www.21.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional Arturo Jauretche", provincia: "Buenos Aires", web: "http://www.unaj.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Hurlingham", provincia: "Buenos Aires", web: "http://www.unahur.edu.ar/es/instituto-biotecnologia", duracion: "5 años" },
    { nombre: "Universidad Nacional de Jujuy", provincia: "Jujuy", web: "http://www.fca.unju.edu.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_ciencias_biol_gicas",
    titulo: "Licenciado en Ciencias Biológicas",
    macroArea: "Ciencias Biológicas y Biotecnología",
    familia: "Biología, genética y biotecnología",
    universidades: [
    { nombre: "Universidad de Belgrano", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.ub.edu.ar", duracion: "4.5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "6 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "6 años" },
    { nombre: "Universidad Nacional de Jujuy", provincia: "Jujuy", web: "http://www.fca.unju.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de La Pampa", provincia: "La Pampa", web: "www.exactas.unlpam.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de La Rioja", provincia: "La Rioja", web: "www.unlar.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Comahue", provincia: "Río Negro", web: "http://app.crub.uncoma.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Nordeste", provincia: "Corrientes", web: "http://www.exa.unne.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional del Sur", provincia: "Buenos Aires", web: "www.uns.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Luján", provincia: "Buenos Aires", web: "http://www.unlu.edu.ar/", duracion: "5.5 años" }
    ],
  },
  {
    id: "profesor_en_letras",
    titulo: "Profesor en Letras",
    macroArea: "Educación y Docencia",
    familia: "Profesorados, pedagogía y gestión educativa",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uca.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de Catamarca", provincia: "Catamarca", web: "http://www.unca.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de Formosa", provincia: "Formosa", web: "www.unf.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de Jujuy", provincia: "Jujuy", web: "http://www.fhycs.unju.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de la Patagonia San Juan Bosco", provincia: "Chubut", web: "www.fhcs.unp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de La Plata", provincia: "Buenos Aires", web: "www.fahce.unlp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Comahue", provincia: "Neuquén", web: "http://fahuweb.uncoma.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de Lomas de Zamora", provincia: "Buenos Aires", web: "http://www.sociales.unlz.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Sur", provincia: "Buenos Aires", web: "www.uns.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Mar del Plata", provincia: "Buenos Aires", web: "http://www.mdp.edu.ar/humanidades/", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_criminal_stica",
    titulo: "Licenciado en Criminalística",
    macroArea: "Seguridad, Criminalística y Defensa",
    familia: "Seguridad, criminalística y fuerzas",
    universidades: [
    { nombre: "Instituto Universitario de Gendarmería Nacional", provincia: "Buenos Aires", web: "http://www.gendarmeria.gov.ar/", duracion: "4 años" },
    { nombre: "Instituto Universitario de la Policía Federal Argentina", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.iupfa.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Autónoma de Entre Ríos", provincia: "Entre Ríos", web: "http://fcyt.uader.edu.ar/web", duracion: "4 años" },
    { nombre: "Universidad Católica de Cuyo", provincia: "San Juan", web: "www.uccuyo.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Católica de Salta", provincia: "Salta", web: "http://www.ucasal.net", duracion: "4 años" },
    { nombre: "Universidad del Aconcagua", provincia: "Mendoza", web: "www.uda.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de la Cuenca del Plata", provincia: "Corrientes", web: "http://www.ucp.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de la Fraternidad de Agrupaciones Santo Tomás de Aquino", provincia: "Buenos Aires", web: "http://www.ufasta.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad de Morón", provincia: "Buenos Aires", web: "www.unimoron.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Morón", provincia: "Misiones", web: "www.unimoron.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_geograf_a",
    titulo: "Licenciado en Geografía",
    macroArea: "Humanidades, Filosofía y Religión",
    familia: "Filosofía, historia y humanidades",
    universidades: [
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.filo.uba.ar", duracion: "6 años" },
    { nombre: "Universidad Nacional de Catamarca", provincia: "Catamarca", web: "http://www.unca.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.ffyh.unc.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Cuyo", provincia: "Mendoza", web: "www.ffyl.uncuyo.edu.ar", duracion: "4.5 años" },
    { nombre: "Universidad Nacional de Formosa", provincia: "Formosa", web: "www.unf.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de La Pampa", provincia: "La Pampa", web: "www.fchst.unlpam.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de la Patagonia San Juan Bosco", provincia: "Chubut", web: "www.unp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Centro de la Provincia de Buenos Aires", provincia: "Buenos Aires", web: "http://www.fch.unicen.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional del Comahue", provincia: "Neuquén", web: "http://fahuweb.uncoma.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Nordeste", provincia: "Chaco", web: "http://hum.unne.edu.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "profesor_en_geograf_a",
    titulo: "Profesor en Geografía",
    macroArea: "Educación y Docencia",
    familia: "Profesorados, pedagogía y gestión educativa",
    universidades: [
    { nombre: "Universidad Nacional de Catamarca", provincia: "Catamarca", web: "http://www.unca.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de Formosa", provincia: "Formosa", web: "www.unf.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de La Pampa", provincia: "La Pampa", web: "www.fchst.unlpam.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de la Patagonia Austral", provincia: "Santa Cruz", web: "http://www.uarg.unpa.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de la Patagonia San Juan Bosco", provincia: "Chubut", web: "www.fhcs.unp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Comahue", provincia: "Neuquén", web: "http://fahuweb.uncoma.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional del Nordeste", provincia: "Chaco", web: "http://hum.unne.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional del Sur", provincia: "Buenos Aires", web: "www.uns.edu.ar", duracion: "4.5 años" },
    { nombre: "Universidad Nacional de Luján", provincia: "Buenos Aires", web: "http://www.unlu.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de Mar del Plata", provincia: "Buenos Aires", web: "http://www.mdp.edu.ar/humanidades/", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_sistemas_de_informaci_n",
    titulo: "Licenciado en Sistemas de Información",
    macroArea: "Ingeniería Informática y Sistemas",
    familia: "Software, sistemas e informática",
    universidades: [
    { nombre: "Universidad Autónoma de Entre Ríos", provincia: "Entre Ríos", web: "http://fcyt.uader.edu.ar/web/", duracion: "5 años" },
    { nombre: "Universidad Champagnat", provincia: "Mendoza", web: "www.uch.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Belgrano", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.ub.edu.ar", duracion: "5 años" },
    { nombre: "Universidad de la Cuenca del Plata", provincia: "Corrientes", web: "www.ucp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad del Salvador", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.usal.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de La Rioja", provincia: "La Rioja", web: "www.unlar.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Comahue", provincia: "Neuquén", web: "http://www.fi.uncoma.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Nordeste", provincia: "Corrientes", web: "http://www.exa.unne.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Luján", provincia: "Buenos Aires", web: "http://www.unlu.edu.ar/", duracion: "5.5 años" },
    { nombre: "Universidad Nacional de Misiones", provincia: "Misiones", web: "http://www.fceqyn.unam.edu.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "dise_ador_industrial",
    titulo: "Diseñador Industrial",
    macroArea: "Ingeniería Industrial y Producción",
    familia: "Industrial, procesos y logística",
    universidades: [
    { nombre: "Universidad Católica de Salta", provincia: "Salta", web: "http://www.ucasal.net", duracion: "4 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "6 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "6 años" },
    { nombre: "Universidad de Palermo", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.palermo.edu", duracion: "4 años" },
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.faudi.unc.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Cuyo", provincia: "Mendoza", web: "www.fad.uncuyo.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de La Plata", provincia: "Buenos Aires", web: "www.fba.unlp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Mar del Plata", provincia: "Buenos Aires", web: "http://faud.mdp.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Misiones", provincia: "Misiones", web: "http://www.unam.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Río Negro", provincia: "Río Negro", web: "www.unrn.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "ingeniero_a_en_energ_a_el_ctrica",
    titulo: "Ingeniero/a en Energía Eléctrica",
    macroArea: "Ingeniería Eléctrica, Electrónica y Telecomunicaciones",
    familia: "Electrónica, electricidad y telecomunicaciones",
    universidades: [
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Hurlingham", provincia: "Buenos Aires", web: "http://www.unahur.edu.ar/es/instituto-tecnologia-e-ingenieria", duracion: "5 años" },
    { nombre: "Universidad Nacional de La Plata", provincia: "Buenos Aires", web: "www.ing.unlp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Río Cuarto", provincia: "Córdoba", web: "www.unrc.edu.ar, www.ing.unrc.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de San Juan", provincia: "San Juan", web: "http://www.fi.unsj.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Tecnológica Nacional", provincia: "Buenos Aires", web: "www.fra.utn.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Tecnológica Nacional", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.frba.utn.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Tecnológica Nacional", provincia: "Entre Ríos", web: "www.frcon.utn.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Tecnológica Nacional", provincia: "Córdoba", web: "www.frc.utn.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "profesor_en_f_sica",
    titulo: "Profesor en Física",
    macroArea: "Educación y Docencia",
    familia: "Profesorados, pedagogía y gestión educativa",
    universidades: [
    { nombre: "Universidad Autónoma de Entre Ríos", provincia: "Entre Ríos", web: "http://fcyt.uader.edu.ar/web", duracion: "4 años" },
    { nombre: "Universidad Nacional de Catamarca", provincia: "Catamarca", web: "http://www.unca.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de Formosa", provincia: "Formosa", web: "www.unf.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional del Chaco Austral", provincia: "Chaco", web: "www.uncaus.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional del Nordeste", provincia: "Corrientes", web: "http://www.exa.unne.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional del Sur", provincia: "Buenos Aires", web: "www.uns.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de Luján", provincia: "Buenos Aires", web: "http://www.unlu.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de Mar del Plata", provincia: "Buenos Aires", web: "http://www.mdp.edu.ar/exactas/", duracion: "4 años" },
    { nombre: "Universidad Nacional de Misiones", provincia: "Misiones", web: "http://www.fceqyn.unam.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de Río Cuarto", provincia: "Córdoba", web: "www.unrc.edu.ar, www.exa.unrc.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_fonoaudiolog_a",
    titulo: "Licenciado en Fonoaudiología",
    macroArea: "Medicina y Salud",
    familia: "Rehabilitación y terapias",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Entre Ríos", web: "www.uca.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Católica de La Plata", provincia: "Buenos Aires", web: "www.ucalp.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Católica de Salta", provincia: "Salta", web: "https://www.ucasal.edu.ar/general/alumno-m-f-equipo-a-tu-lado-escuela-de-ciencias-de-la-salud/", duracion: "5 años" },
    { nombre: "Universidad Católica de Santa Fe", provincia: "Santa Fé", web: "http://www.ucsf.edu.ar/", duracion: "4.5 años" },
    { nombre: "Universidad Católica de Santiago del Estero", provincia: "Santiago Del Estero", web: "http://newsite.ucse.edu.ar/index.php/ucse-sedes/santiago-del-estero", duracion: "4.5 años" },
    { nombre: "Universidad de la Fraternidad de Agrupaciones Santo Tomás de Aquino", provincia: "Buenos Aires", web: "http://www.ufasta.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad del Museo Social Argentino", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.umsa.edu.ar", duracion: "4.5 años" },
    { nombre: "Universidad del Salvador", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.usal.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.fono.fcm.unc.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de La Plata", provincia: "Buenos Aires", web: "www.trabajosocial.unlp.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_obstetricia",
    titulo: "Licenciado en Obstetricia",
    macroArea: "Medicina y Salud",
    familia: "Medicina y atención clínica",
    universidades: [
    { nombre: "Universidad Católica de Cuyo", provincia: "San Juan", web: "www.uccuyo.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Católica de Cuyo", provincia: "San Luis", web: "www.uccuyo.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Católica de La Plata", provincia: "Buenos Aires", web: "www.ucalp.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Católica de las Misiones", provincia: "Misiones", web: "www.ucami.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.fmed.uba.ar", duracion: "5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5 años" },
    { nombre: "Universidad de Morón", provincia: "Buenos Aires", web: "www.unimoron.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de Entre Ríos", provincia: "Entre Ríos", web: "http://www.fcs.uner.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de Hurlingham", provincia: "Buenos Aires", web: "http://www.unahur.edu.ar/es/instituto-salud-comunitaria", duracion: "5 años" },
    { nombre: "Universidad Nacional de La Plata", provincia: "Buenos Aires", web: "www.med.unlp.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "t_cnico_universitario_en_acompa_amiento",
    titulo: "Técnico Universitario en Acompañamiento Terapéutico",
    macroArea: "Psicología y Comportamiento Humano",
    familia: "Acompañamiento terapéutico",
    universidades: [
    { nombre: "Universidad Abierta Interamericana", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uai.edu.ar", duracion: "2.5 años" },
    { nombre: "Universidad Abierta Interamericana", provincia: "Santa Fé", web: "www.uai.edu.ar", duracion: "2.5 años" },
    { nombre: "Universidad Católica de Santiago del Estero", provincia: "Santa Fé", web: "http://www.ucse.edu.ar/web/rafaela/sede_rafaela.htm", duracion: "3 años" },
    { nombre: "Universidad de Congreso", provincia: "Córdoba", web: "http://www.ucongreso.edu.ar/", duracion: "3 años" },
    { nombre: "Universidad de Congreso", provincia: "San Juan", web: "http://www.ucongreso.edu.ar/", duracion: "3 años" },
    { nombre: "Universidad de Congreso", provincia: "Mendoza", web: "http://www.ucongreso.edu.ar/", duracion: "3 años" },
    { nombre: "Universidad del Aconcagua", provincia: "Mendoza", web: "www.uda.edu.ar", duracion: "3 años" },
    { nombre: "Universidad del Chubut", provincia: "Chubut", web: "http://udc.edu.ar/", duracion: "3 años" },
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.psyche.unc.edu.ar", duracion: "3 años" },
    { nombre: "Universidad Nacional de la Patagonia Austral", provincia: "Santa Cruz", web: "http://www.uarg.unpa.edu.ar/", duracion: "2.5 años" }
    ],
  },
  {
    id: "licenciado_en_publicidad",
    titulo: "Licenciado en Publicidad",
    macroArea: "Marketing, Publicidad y Comercialización",
    familia: "Marketing, publicidad y ventas",
    universidades: [
    { nombre: "Universidad Abierta Interamericana", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uai.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Abierta Interamericana", provincia: "Santa Fé", web: "www.uai.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Argentina de la Empresa", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uade.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Argentina John F. Kennedy", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://www.kennedy.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Blas Pascal", provincia: "Córdoba", web: "http://www.ubp.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad CAECE", provincia: "Buenos Aires", web: "www.ucaece.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Ciencias Empresariales y Sociales", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uces.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Ciencias Empresariales y Sociales", provincia: "Buenos Aires", web: "www.uces.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de la Cuenca del Plata", provincia: "Corrientes", web: "www.ucp.edu.ar", duracion: "4 años" },
    { nombre: "Universidad del Salvador", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.usal.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "contador_p_blico_md",
    titulo: "Contador Público - MD",
    macroArea: "Contabilidad e Impuestos",
    familia: "Contabilidad, auditoría e impuestos",
    universidades: [
    { nombre: "Universidad Argentina John F. Kennedy", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://www.kennedy.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Blas Pascal", provincia: "Córdoba", web: "http://www.ubp.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Católica de Cuyo", provincia: "San Juan", web: "www.uccuyo.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Católica de Salta", provincia: "Salta", web: "http://www.ucasal.net", duracion: "4 años" },
    { nombre: "Universidad de Ciencias Empresariales y Sociales", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uces.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de la Fraternidad de Agrupaciones Santo Tomás de Aquino", provincia: "Buenos Aires", web: "http://www.ufasta.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad de Palermo", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.palermo.edu", duracion: "4 años" },
    { nombre: "Universidad Empresarial Siglo 21", provincia: "Córdoba", web: "http://www.21.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional del Chaco Austral", provincia: "Chaco", web: "www.uncaus.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Quilmes", provincia: "Buenos Aires", web: "http://www.unq.edu.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "abogado_a",
    titulo: "Abogado/a",
    macroArea: "Derecho y Ciencias Jurídicas",
    familia: "Derecho, notariado y bienes",
    universidades: [
    { nombre: "Universidad Católica de La Plata", provincia: "Buenos Aires", web: "www.ucalp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad del CEMA", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.ucema.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de Catamarca", provincia: "Catamarca", web: "http://www.unca.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.derecho.unc.edu.ar", duracion: "6 años" },
    { nombre: "Universidad Nacional de Jujuy", provincia: "Jujuy", web: "http://www.unju.edu.ar/escuela_superior_ciencias_juridicas_politicas", duracion: "5 años" },
    { nombre: "Universidad Nacional de La Pampa", provincia: "La Pampa", web: "www.eco.unlpam.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Comahue", provincia: "Río Negro", web: "http://fadeweb.uncoma.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Litoral", provincia: "Santa Fé", web: "www.fcjs.unl.edu.ar", duracion: "6 años" },
    { nombre: "Universidad Nacional del Nordeste", provincia: "Corrientes", web: "http://dch.unne.edu.ar/", duracion: "6 años" },
    { nombre: "Universidad Nacional del Oeste", provincia: "Buenos Aires", web: "www.uno.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_dise_o_industrial",
    titulo: "Licenciado en Diseño Industrial",
    macroArea: "Ingeniería Industrial y Producción",
    familia: "Industrial, procesos y logística",
    universidades: [
    { nombre: "Universidad Argentina de la Empresa", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uade.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Católica de Santa Fe", provincia: "Santa Fé", web: "http://www.ucsf.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad de San Pablo - T", provincia: "Tucumán", web: "www.uspt.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Empresarial Siglo 21", provincia: "Córdoba", web: "http://www.21.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de Avellaneda", provincia: "Buenos Aires", web: "http://www.undav.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de Hurlingham", provincia: "Buenos Aires", web: "http://www.unahur.edu.ar/es/instituto-tecnologia-e-ingenieria", duracion: "5 años" },
    { nombre: "Universidad Nacional de Lanús", provincia: "Buenos Aires", web: "www.unla.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Nordeste", provincia: "Chaco", web: "http://www.arq.unne.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional del Noroeste de la Provincia de Buenos Aires", provincia: "Buenos Aires", web: "www.unnoba.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de Rafaela", provincia: "Santa Fé", web: "www.unraf.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_sistemas",
    titulo: "Licenciado en Sistemas",
    macroArea: "Ingeniería Informática y Sistemas",
    familia: "Software, sistemas e informática",
    universidades: [
    { nombre: "Universidad CAECE", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.ucaece.edu.ar", duracion: "5 años" },
    { nombre: "Universidad CAECE", provincia: "Buenos Aires", web: "www.ucaecemdp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad de Morón", provincia: "Buenos Aires", web: "www.unimoron.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Entre Ríos", provincia: "Entre Ríos", web: "https://www.fcad.uner.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de General Sarmiento", provincia: "Buenos Aires", web: "www.ungs.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Jujuy", provincia: "Jujuy", web: "http://www.fi.unju.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Lanús", provincia: "Buenos Aires", web: "www.unla.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de la Patagonia San Juan Bosco", provincia: "Chubut", web: "www.unp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de La Plata", provincia: "Buenos Aires", web: "www.info.unlp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Noroeste de la Provincia de Buenos Aires", provincia: "Buenos Aires", web: "www.unnoba.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_periodismo",
    titulo: "Licenciado en Periodismo",
    macroArea: "Comunicación y Medios",
    familia: "Periodismo y redacción",
    universidades: [
    { nombre: "Universidad Abierta Interamericana", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uai.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Abierta Interamericana", provincia: "Santa Fé", web: "www.uai.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Ciencias Empresariales y Sociales", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uces.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Ciencias Empresariales y Sociales", provincia: "Chaco", web: "www.uces.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Concepción del Uruguay", provincia: "Entre Ríos", web: "www.ucu.edu.ar", duracion: "4 años" },
    { nombre: "Universidad del Salvador", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.usal.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Morón", provincia: "Buenos Aires", web: "www.unimoron.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Palermo", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.palermo.edu", duracion: "4 años" },
    { nombre: "Universidad de San Pablo - T", provincia: "Tucumán", web: "www.uspt.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Empresarial Siglo 21", provincia: "Córdoba", web: "http://www.21.edu.ar/", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_ciencia_pol_tica",
    titulo: "Licenciado en Ciencia Política",
    macroArea: "Ciencias Sociales y Comunitarias",
    familia: "Sociología, trabajo social y comunidad",
    universidades: [
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5 años" },
    { nombre: "Universidad del Salvador", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.usal.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Palermo", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.palermo.edu", duracion: "4 años" },
    { nombre: "Universidad de San Andrés", provincia: "Buenos Aires", web: "www.udesa.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de San Pablo - T", provincia: "Tucumán", web: "www.uspt.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Empresarial Siglo 21", provincia: "Córdoba", web: "http://www.21.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.trabajosocial.unc.edu.ar-www.cea.unc.edu.ar-www.iifap.unc.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Entre Ríos", provincia: "Entre Ríos", web: "http://www.fts.uner.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de La Rioja", provincia: "La Rioja", web: "www.unlar.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "ingeniero_en_telecomunicaciones",
    titulo: "Ingeniero en Telecomunicaciones",
    macroArea: "Ingeniería Eléctrica, Electrónica y Telecomunicaciones",
    familia: "Electrónica, electricidad y telecomunicaciones",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://uca.edu.ar/es/facultades/facultad-de-ingenieria-y-ciencias-agrarias", duracion: "5 años" },
    { nombre: "Universidad Autónoma de Entre Ríos", provincia: "Entre Ríos", web: "http://fcyt.uader.edu.ar/web", duracion: "5 años" },
    { nombre: "Universidad Blas Pascal", provincia: "Córdoba", web: "http://www.ubp.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Católica de Salta", provincia: "Salta", web: "http://www.ucasal.net", duracion: "5 años" },
    { nombre: "Universidad de Palermo", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.palermo.edu", duracion: "5 años" },
    { nombre: "Universidad Nacional de Cuyo", provincia: "Río Negro", web: "www.ib.edu.ar", duracion: "5.5 años" },
    { nombre: "Universidad Nacional de La Plata", provincia: "Buenos Aires", web: "www.ing.unlp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Río Cuarto", provincia: "Córdoba", web: "www.unrc.edu.ar, www.ing.unrc.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Río Negro", provincia: "Río Negro", web: "https://www.unrn.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de San Martín", provincia: "Buenos Aires", web: "www.unsam.edu.ar", duracion: "5.5 años" }
    ],
  },
  {
    id: "arquitecto_a",
    titulo: "Arquitecto/a",
    macroArea: "Arquitectura, Urbanismo y Construcción",
    familia: "Arquitectura, urbanismo y obra",
    universidades: [
    { nombre: "Universidad Atlántida Argentina", provincia: "Buenos Aires", web: "https://www.atlantida.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Católica de La Plata", provincia: "Buenos Aires", web: "www.ucalp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Católica de Santiago del Estero", provincia: "Jujuy", web: "http://www.ucse.edu.ar/web/jujuy/sede_jujuy.htm", duracion: "5.5 años" },
    { nombre: "Universidad Católica de Santiago del Estero", provincia: "Santiago Del Estero", web: "http://newsite.ucse.edu.ar/index.php/ucse-sedes/santiago-del-estero", duracion: "5.5 años" },
    { nombre: "Universidad de Concepción del Uruguay", provincia: "Entre Ríos", web: "www.ucu.edu.ar", duracion: "5 años" },
    { nombre: "Universidad de Palermo", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.palermo.edu", duracion: "5 años" },
    { nombre: "Universidad Gastón Dachary", provincia: "Misiones", web: "http://www.ugd.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.faudi.unc.edu.ar", duracion: "6 años" },
    { nombre: "Universidad Nacional del Litoral", provincia: "Santa Fé", web: "www.fadu.unl.edu.ar", duracion: "6 años" },
    { nombre: "Universidad Nacional de Misiones", provincia: "Misiones", web: "http://www.unam.edu.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_inform_tica",
    titulo: "Licenciado en Informática",
    macroArea: "Ingeniería Informática y Sistemas",
    familia: "Software, sistemas e informática",
    universidades: [
    { nombre: "Universidad Atlántida Argentina", provincia: "Buenos Aires", web: "https://www.atlantida.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad de Palermo", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.palermo.edu", duracion: "4.5 años" },
    { nombre: "Universidad Metropolitana para la Educación y el Trabajo", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.umet.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Hurlingham", provincia: "Buenos Aires", web: "http://www.unahur.edu.ar/es/instituto-tecnologia-e-ingenieria", duracion: "5 años" },
    { nombre: "Universidad Nacional de la Patagonia San Juan Bosco", provincia: "Chubut", web: "www.unp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de La Plata", provincia: "Buenos Aires", web: "www.info.unlp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Oeste", provincia: "Buenos Aires", web: "http://www.uno.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Quilmes", provincia: "Buenos Aires", web: "http://www.unq.edu.ar/", duracion: "5.5 años" },
    { nombre: "Universidad Nacional de San Antonio de Areco", provincia: "Buenos Aires", web: "https://www.unsada.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Tucumán", provincia: "Tucumán", web: "www.herrera.unt.edu.ar/facet", duracion: "5 años" }
    ],
  },
  {
    id: "ingeniero_agrimensor",
    titulo: "Ingeniero Agrimensor",
    macroArea: "Ingeniería y Tecnología",
    familia: "Ingenierías generales",
    universidades: [
    { nombre: "Universidad Juan Agustín Maza", provincia: "Mendoza", web: "https://www.umaza.edu.ar/facultad-de-INE", duracion: "4 años" },
    { nombre: "Universidad Nacional de Catamarca", provincia: "Catamarca", web: "http://tecno.unca.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de La Plata", provincia: "Buenos Aires", web: "www.ing.unlp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Centro de la Provincia de Buenos Aires", provincia: "Buenos Aires", web: "http://www.fio.unicen.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Nordeste", provincia: "Corrientes", web: "http://www.exa.unne.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional del Sur", provincia: "Buenos Aires", web: "www.uns.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Rosario", provincia: "Santa Fé", web: "www.fceia.unr.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de San Juan", provincia: "San Juan", web: "http://www.fi.unsj.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Santiago del Estero", provincia: "Santiago Del Estero", web: "http://fce.unse.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Tucumán", provincia: "Tucumán", web: "www.herrera.unt.edu.ar/facet", duracion: "5 años" }
    ],
  },
  {
    id: "profesor_en_ciencias_biol_gicas",
    titulo: "Profesor en Ciencias Biológicas",
    macroArea: "Educación y Docencia",
    familia: "Profesorados, pedagogía y gestión educativa",
    universidades: [
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.efn.uncor.edu", duracion: "4 años" },
    { nombre: "Universidad Nacional de La Pampa", provincia: "La Pampa", web: "www.exactas.unlpam.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional del Centro de la Provincia de Buenos Aires", provincia: "Buenos Aires", web: "http://www.faa.unicen.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional del Comahue", provincia: "Río Negro", web: "http://app.crub.uncoma.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional del Sur", provincia: "Buenos Aires", web: "www.uns.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de Luján", provincia: "Buenos Aires", web: "http://www.unlu.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de Mar del Plata", provincia: "Buenos Aires", web: "http://www.mdp.edu.ar/exactas/", duracion: "4 años" },
    { nombre: "Universidad Nacional de Río Cuarto", provincia: "Córdoba", web: "www.unrc.edu.ar, www.exa.unrc.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de Salta", provincia: "Salta", web: "http://www.unsa.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Tucumán", provincia: "Tucumán", web: "www.csnat.unt.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_trabajo_social_2",
    titulo: "Licenciado en Trabajo Social",
    macroArea: "Humanidades, Filosofía y Religión",
    familia: "Filosofía, historia y humanidades",
    universidades: [
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.filo.uba.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Catamarca", provincia: "Catamarca", web: "http://www.unca.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Jujuy", provincia: "Jujuy", web: "http://www.fhycs.unju.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de La Matanza", provincia: "Buenos Aires", web: "http://www.unlam.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de la Patagonia San Juan Bosco", provincia: "Chubut", web: "www.unp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Centro de la Provincia de Buenos Aires", provincia: "Buenos Aires", web: "http://www.fch.unicen.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Misiones", provincia: "Misiones", web: "http://www.fhycs.unam.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Moreno", provincia: "Buenos Aires", web: "www.unm.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Río Cuarto", provincia: "Córdoba", web: "www.unrc.edu.ar; www.hum.unrc.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Tucumán", provincia: "Tucumán", web: "www.filo.unt.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "ingeniero_ambiental",
    titulo: "Ingeniero Ambiental",
    macroArea: "Ingeniería y Tecnología",
    familia: "Ingenierías generales",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://uca.edu.ar/es/facultades/facultad-de-ingenieria-y-ciencias-agrarias", duracion: "5 años" },
    { nombre: "Universidad Católica de La Plata", provincia: "Buenos Aires", web: "www.ucalp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad de Flores", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uflo.edu.ar", duracion: "5 años" },
    { nombre: "Universidad de la Fraternidad de Agrupaciones Santo Tomás de Aquino", provincia: "Buenos Aires", web: "http://www.ufasta.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.efn.uncor.edu", duracion: "5 años" },
    { nombre: "Universidad Nacional del Oeste", provincia: "Buenos Aires", web: "http://www.uno.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Río Negro", provincia: "Río Negro", web: "https://www.unrn.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de San Martín", provincia: "Buenos Aires", web: "www.unsam.edu.ar", duracion: "5.5 años" },
    { nombre: "Universidad Nacional de Tres de Febrero", provincia: "Buenos Aires", web: "http://www.untref.edu.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "ingeniero_a_en_inform_tica",
    titulo: "Ingeniero/a en Informática",
    macroArea: "Ingeniería Informática y Sistemas",
    familia: "Software, sistemas e informática",
    universidades: [
    { nombre: "Universidad Atlántida Argentina", provincia: "Buenos Aires", web: "https://www.atlantida.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Católica de Córdoba", provincia: "Córdoba", web: "www.ucc.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Católica de Santiago del Estero", provincia: "Santa Fé", web: "http://www.ucse.edu.ar/web/rafaela/sede_rafaela.htm", duracion: "5 años" },
    { nombre: "Universidad Católica de Santiago del Estero", provincia: "Jujuy", web: "http://www.ucse.edu.ar/web/jujuy/sede_jujuy.htm", duracion: "5 años" },
    { nombre: "Universidad Católica de Santiago del Estero", provincia: "Santiago Del Estero", web: "http://newsite.ucse.edu.ar/index.php/ucse-sedes/santiago-del-estero", duracion: "5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "6 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "6 años" },
    { nombre: "Universidad Nacional Arturo Jauretche", provincia: "Buenos Aires", web: "http://www.unaj.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional José C. Paz", provincia: "Buenos Aires", web: "www.unpaz.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "dise_ador_gr_fico",
    titulo: "Diseñador Gráfico",
    macroArea: "Diseño y Creatividad",
    familia: "Diseño gráfico, industrial y digital",
    universidades: [
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5 años" },
    { nombre: "Universidad de Flores", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uflo.edu.ar", duracion: "3 años" },
    { nombre: "Universidad de Flores", provincia: "Río Negro", web: "www.uflo.edu.ar", duracion: "3 años" },
    { nombre: "Universidad de Mendoza", provincia: "Córdoba", web: "http://www.um.edu.ar/", duracion: "3 años" },
    { nombre: "Universidad de Mendoza", provincia: "Mendoza", web: "http://www.um.edu.ar", duracion: "3 años" },
    { nombre: "Universidad Nacional de Cuyo", provincia: "Mendoza", web: "www.fad.uncuyo.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Misiones", provincia: "Misiones", web: "http://www.unam.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de San Juan", provincia: "San Juan", web: "www.vallessanjuaninos.unsj.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "profesor_en_qu_mica",
    titulo: "Profesor en Química",
    macroArea: "Educación y Docencia",
    familia: "Profesorados, pedagogía y gestión educativa",
    universidades: [
    { nombre: "Universidad Autónoma de Entre Ríos", provincia: "Entre Ríos", web: "http://fcyt.uader.edu.ar/web/", duracion: "4 años" },
    { nombre: "Universidad Nacional de Catamarca", provincia: "Catamarca", web: "http://www.unca.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de Formosa", provincia: "Formosa", web: "www.unf.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de La Pampa", provincia: "La Pampa", web: "www.exactas.unlpam.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional del Sur", provincia: "Buenos Aires", web: "www.uns.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Mar del Plata", provincia: "Buenos Aires", web: "http://www.mdp.edu.ar/exactas/", duracion: "4 años" },
    { nombre: "Universidad Nacional de Río Cuarto", provincia: "Córdoba", web: "www.unrc.edu.ar, www.exa.unrc.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de Salta", provincia: "Salta", web: "http://www.unsa.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de Tucumán", provincia: "Tucumán", web: "www.filo.unt.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_relaciones_internacionales_2",
    titulo: "Licenciado en Relaciones Internacionales",
    macroArea: "Derecho y Ciencias Jurídicas",
    familia: "Derecho, notariado y bienes",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Santa Fé", web: "www.uca.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Abierta Interamericana", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uai.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Abierta Interamericana", provincia: "Santa Fé", web: "www.uai.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Austral", provincia: "Buenos Aires", web: "http://www.austral.edu.ar/derecho/", duracion: "4 años" },
    { nombre: "Universidad Católica de Cuyo", provincia: "San Juan", web: "www.uccuyo.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Católica de Santa Fe", provincia: "Santa Fé", web: "http://www.ucsf.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Católica de Santa Fe", provincia: "Misiones", web: "http://www.ucsf.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Champagnat", provincia: "Mendoza", web: "https://www.uch.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Belgrano", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.ub.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_administraci_n_md",
    titulo: "Licenciado en Administración - MD",
    macroArea: "Administración y Negocios",
    familia: "Administración, gestión y negocios",
    universidades: [
    { nombre: "Universidad Abierta Interamericana", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uai.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Argentina John F. Kennedy", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://www.kennedy.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Blas Pascal", provincia: "Córdoba", web: "http://www.ubp.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Católica de Cuyo", provincia: "San Luis", web: "www.uccuyo.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Católica de Santiago del Estero", provincia: "Santiago Del Estero", web: "http://www.ucse.edu.ar/web/sede_sgo/fce/sc%20fce.htm", duracion: "4 años" },
    { nombre: "Universidad de Palermo", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.palermo.edu", duracion: "4 años" },
    { nombre: "Universidad Nacional del Chaco Austral", provincia: "Chaco", web: "www.uncaus.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Río Cuarto", provincia: "Córdoba", web: "www.unrc.edu.ar, www.eco.unrc.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Tres de Febrero", provincia: "Buenos Aires", web: "http://www.untrefvirtual.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "abogado_md",
    titulo: "Abogado - MD",
    macroArea: "Derecho y Ciencias Jurídicas",
    familia: "Derecho, notariado y bienes",
    universidades: [
    { nombre: "Universidad Argentina John F. Kennedy", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://www.kennedy.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Blas Pascal", provincia: "Córdoba", web: "http://www.ubp.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Católica de Salta", provincia: "Salta", web: "http://www.ucasal.net", duracion: "5 años" },
    { nombre: "Universidad de Ciencias Empresariales y Sociales", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uces.edu.ar", duracion: "5 años" },
    { nombre: "Universidad de la Cuenca del Plata", provincia: "Corrientes", web: "http://www.ucp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad de la Fraternidad de Agrupaciones Santo Tomás de Aquino", provincia: "Buenos Aires", web: "http://www.ufasta.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad de Palermo", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.palermo.edu", duracion: "5 años" },
    { nombre: "Universidad Empresarial Siglo 21", provincia: "Córdoba", web: "http://www.21.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional del Chaco Austral", provincia: "Chaco", web: "www.uncaus.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "contador_a_p_blico_a",
    titulo: "Contador/a Público/a",
    macroArea: "Contabilidad e Impuestos",
    familia: "Contabilidad, auditoría e impuestos",
    universidades: [
    { nombre: "Universidad Católica de La Plata", provincia: "Buenos Aires", web: "www.ucalp.edu.ar", duracion: "4 años" },
    { nombre: "Universidad del Aconcagua", provincia: "Mendoza", web: "www.uda.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de la Cuenca del Plata", provincia: "Corrientes", web: "www.ucp.edu.ar", duracion: "4.5 años" },
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.eco.unc.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Comahue", provincia: "Neuquén", web: "http://faeaweb.uncoma.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Litoral", provincia: "Santa Fé", web: "www.fce.unl.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Nordeste", provincia: "Chaco", web: "http://www.eco.unne.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional del Oeste", provincia: "Buenos Aires", web: "http://www.uno.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Salta", provincia: "Salta", web: "http://www.unsa.edu.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_sociolog_a",
    titulo: "Licenciado en Sociología",
    macroArea: "Ciencias Sociales y Comunitarias",
    familia: "Sociología, trabajo social y comunidad",
    universidades: [
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5 años" },
    { nombre: "Universidad del Salvador", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.usal.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Empresarial Siglo 21", provincia: "Córdoba", web: "http://www.21.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.trabajosocial.unc.edu.ar-www.cea.unc.edu.ar-www.iifap.unc.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de San Juan", provincia: "San Juan", web: "www.vallessanjuaninos.unsj.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de San Martín", provincia: "Buenos Aires", web: "http://www.unsam.edu.ar/escuelas/idaes/", duracion: "4 años" },
    { nombre: "Universidad Nacional de Santiago del Estero", provincia: "Santiago Del Estero", web: "https://www.unse.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Tierra del Fuego, Antártida e Islas del Atlántico Sur", provincia: "Tierra Del Fuego", web: "www.untdf.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "contador_p_blico_nacional",
    titulo: "Contador Público Nacional",
    macroArea: "Contabilidad e Impuestos",
    familia: "Contabilidad, auditoría e impuestos",
    universidades: [
    { nombre: "Universidad de Flores", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uflo.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de San Pablo - T", provincia: "Tucumán", web: "www.uspt.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Gastón Dachary", provincia: "Misiones", web: "http://www.ugd.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Gastón Dachary", provincia: "Chaco", web: "ww.ugd.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Juan Agustín Maza", provincia: "Mendoza", web: "https://www.umaza.edu.ar/facultad-de-CSC", duracion: "4 años" },
    { nombre: "Universidad Nacional de Moreno", provincia: "Buenos Aires", web: "www.unm.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Salta", provincia: "Salta", web: "http://www.unsa.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de San Luis", provincia: "San Luis", web: "https://carreras.unsl.edu.ar/facultades/fcejs/1", duracion: "5 años" },
    { nombre: "Universidad Nacional de Santiago del Estero", provincia: "Santiago Del Estero", web: "https://www.unse.edu.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "bioqu_mico_a",
    titulo: "Bioquímico/a",
    macroArea: "Química, Farmacia y Bioquímica",
    familia: "Laboratorio, farmacia y bioquímica",
    universidades: [
    { nombre: "Instituto Universitario de Ciencias Biomédicas de Córdoba", provincia: "Córdoba", web: "http://iucbc.edu.ar/", duracion: "5 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uca.edu.ar", duracion: "5.5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5.5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5.5 años" },
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.fcq.unc.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Litoral", provincia: "Santa Fé", web: "www.fbcb.unl.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Nordeste", provincia: "Corrientes", web: "http://www.exa.unne.edu.ar/", duracion: "6 años" },
    { nombre: "Universidad Nacional de Tucumán", provincia: "Tucumán", web: "www.unt.edu.ar/facbioq", duracion: "6 años" }
    ],
  },
  {
    id: "licenciado_en_higiene_y_seguridad_en_el",
    titulo: "Licenciado en Higiene y Seguridad en el Trabajo",
    macroArea: "Seguridad, Criminalística y Defensa",
    familia: "Seguridad, criminalística y fuerzas",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Mendoza", web: "http://uca.edu.ar/es/facultades/facultad-de-humanidades-y-ciencias-economicas", duracion: "4 años" },
    { nombre: "Universidad Católica de Salta", provincia: "Salta", web: "http://www.ucasal.net", duracion: "4 años" },
    { nombre: "Universidad de la Marina Mercante", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.udemm.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Morón", provincia: "Buenos Aires", web: "www.unimoron.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Morón", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.unimoron.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Morón", provincia: "Córdoba", web: "www.unimoron.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de la Patagonia San Juan Bosco", provincia: "Chubut", web: "www.unp.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de Misiones", provincia: "Misiones", web: "http://www.fio.unam.edu.ar/", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_dise_o_de_interiores",
    titulo: "Licenciado en Diseño de Interiores",
    macroArea: "Arquitectura, Urbanismo y Construcción",
    familia: "Arquitectura, urbanismo y obra",
    universidades: [
    { nombre: "Universidad Abierta Interamericana", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uai.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Abierta Interamericana", provincia: "Santa Fé", web: "www.uai.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Argentina de la Empresa", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uade.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Católica de Salta", provincia: "Salta", web: "http://www.ucasal.net", duracion: "4 años" },
    { nombre: "Universidad de Belgrano", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.ub.edu.ar", duracion: "4 años" },
    { nombre: "Universidad del Este", provincia: "Buenos Aires", web: "www.ude.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Morón", provincia: "Buenos Aires", web: "www.unimoron.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Morón", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.unimoron.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_dise_o_gr_fico",
    titulo: "Licenciado en Diseño Gráfico",
    macroArea: "Diseño y Creatividad",
    familia: "Diseño gráfico, industrial y digital",
    universidades: [
    { nombre: "Universidad Abierta Interamericana", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uai.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Abierta Interamericana", provincia: "Santa Fé", web: "www.uai.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Argentina John F. Kennedy", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://www.kennedy.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Blas Pascal", provincia: "Córdoba", web: "http://www.ubp.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Católica de Salta", provincia: "Salta", web: "http://www.ucasal.net", duracion: "4 años" },
    { nombre: "Universidad de Flores", provincia: "Río Negro", web: "www.uflo.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Empresarial Siglo 21", provincia: "Córdoba", web: "http://www.21.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional del Noroeste de la Provincia de Buenos Aires", provincia: "Buenos Aires", web: "www.unnoba.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "ingeniero_en_computaci_n",
    titulo: "Ingeniero en Computación",
    macroArea: "Ingeniería Informática y Sistemas",
    familia: "Software, sistemas e informática",
    universidades: [
    { nombre: "Universidad Católica de Córdoba", provincia: "Córdoba", web: "www.ucc.edu.ar", duracion: "5 años" },
    { nombre: "Universidad de Mendoza", provincia: "Mendoza", web: "http://www.um.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.efn.uncor.edu", duracion: "5 años" },
    { nombre: "Universidad Nacional de La Pampa", provincia: "La Pampa", web: "www.ing.unlpam.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de La Plata", provincia: "Buenos Aires", web: "www.ing.unlp.edu.ar / www.info.unlp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Sur", provincia: "Buenos Aires", web: "www.uns.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Mar del Plata", provincia: "Buenos Aires", web: "http://www.fi.mdp.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Tres de Febrero", provincia: "Buenos Aires", web: "http://www.untref.edu.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_ciencias_de_la_computaci_n",
    titulo: "Licenciado en Ciencias de la Computación",
    macroArea: "Ingeniería Informática y Sistemas",
    familia: "Software, sistemas e informática",
    universidades: [
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Cuyo", provincia: "Mendoza", web: "ingenieria.uncuyo.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Comahue", provincia: "Neuquén", web: "http://www.fi.uncoma.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Sur", provincia: "Buenos Aires", web: "www.uns.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Río Cuarto", provincia: "Córdoba", web: "www.unrc.edu.ar, www.exa.unrc.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Rosario", provincia: "Santa Fé", web: "www.fceia.unr.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de San Juan", provincia: "San Juan", web: "www.vallessanjuaninos.unsj.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_psicolog_a_2",
    titulo: "Licenciado en Psicología",
    macroArea: "Medicina y Salud",
    familia: "Técnicas y servicios de salud",
    universidades: [
    { nombre: "Universidad Argentina de la Empresa", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uade.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Católica de Córdoba", provincia: "Córdoba", web: "www.ucc.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Católica de las Misiones", provincia: "Misiones", web: "www.ucami.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Católica de Santiago del Estero", provincia: "Santiago Del Estero", web: "http://newsite.ucse.edu.ar/index.php/ucse-sedes/santiago-del-estero", duracion: "5 años" },
    { nombre: "Universidad de Congreso", provincia: "Mendoza", web: "http://www.ucongreso.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad del Norte Santo Tomás de Aquino", provincia: "Tucumán", web: "http://www.unsta.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad de Mendoza", provincia: "Mendoza", web: "http://www.um.edu.ar", duracion: "5 años" },
    { nombre: "Universidad ISALUD", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.isalud.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "procurador",
    titulo: "Procurador",
    macroArea: "Derecho y Ciencias Jurídicas",
    familia: "Derecho, notariado y bienes",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uca.edu.ar", duracion: "3.5 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Santa Fé", web: "www.uca.edu.ar", duracion: "3.5 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Entre Ríos", web: "www.uca.edu.ar", duracion: "3.5 años" },
    { nombre: "Universidad de Mendoza", provincia: "Mendoza", web: "http://www.um.edu.ar", duracion: "3 años" },
    { nombre: "Universidad Gastón Dachary", provincia: "Misiones", web: "http://www.ugd.edu.ar", duracion: "2 años" },
    { nombre: "Universidad Nacional de La Pampa", provincia: "La Pampa", web: "www.eco.unlpam.edu.ar", duracion: "3 años" },
    { nombre: "Universidad Nacional de La Rioja", provincia: "La Rioja", web: "www.unlar.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Tucumán", provincia: "Tucumán", web: "www.derecho.unt.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_relaciones_p_blicas",
    titulo: "Licenciado en Relaciones Públicas",
    macroArea: "Marketing, Publicidad y Comercialización",
    familia: "Marketing, publicidad y ventas",
    universidades: [
    { nombre: "Universidad Abierta Interamericana", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uai.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Abierta Interamericana", provincia: "Santa Fé", web: "www.uai.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Argentina John F. Kennedy", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://www.kennedy.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Blas Pascal", provincia: "Córdoba", web: "http://www.ubp.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Champagnat", provincia: "Mendoza", web: "www.uch.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de la Marina Mercante", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.udemm.edu.ar", duracion: "4 años" },
    { nombre: "Universidad del Salvador", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.usal.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de La Matanza", provincia: "Buenos Aires", web: "http://www.unlam.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_a_en_administraci_n",
    titulo: "Licenciado/a en Administración",
    macroArea: "Administración y Negocios",
    familia: "Administración, gestión y negocios",
    universidades: [
    { nombre: "Universidad Atlántida Argentina", provincia: "Buenos Aires", web: "http://www.atlantida.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Católica de Cuyo", provincia: "San Luis", web: "www.uccuyo.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "4.5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "4.5 años" },
    { nombre: "Universidad Nacional de Catamarca", provincia: "Catamarca", web: "http://www.unca.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional del Litoral", provincia: "Santa Fé", web: "www.fce.unl.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Nordeste", provincia: "Chaco", web: "http://www.eco.unne.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional Guillermo Brown", provincia: "Buenos Aires", web: "www.unab.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_gesti_n_de_recursos_humano",
    titulo: "Licenciado en Gestión de Recursos Humanos",
    macroArea: "Recursos Humanos y Organizaciones",
    familia: "RRHH y desarrollo organizacional",
    universidades: [
    { nombre: "Universidad Blas Pascal", provincia: "Córdoba", web: "http://www.ubp.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Católica de La Plata", provincia: "Buenos Aires", web: "www.ucalp.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Congreso", provincia: "Córdoba", web: "http://www.ucongreso.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad de Congreso", provincia: "Mendoza", web: "https://www.ucongreso.edu.ar/educacion-a-distancia/", duracion: "4 años" },
    { nombre: "Universidad de Congreso", provincia: "San Juan", web: "http://www.ucongreso.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad de Congreso", provincia: "San Luis", web: "http://www.ucongreso.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Empresarial Siglo 21", provincia: "Córdoba", web: "http://www.21.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Maimónides", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.maimonides.edu", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_ciencias_de_la_comunicaci",
    titulo: "Licenciado en Ciencias de la Comunicación",
    macroArea: "Comunicación y Medios",
    familia: "Comunicación y medios digitales",
    universidades: [
    { nombre: "Universidad Católica de Santa Fe", provincia: "Santa Fé", web: "www.ucsf.edu.ar/facultades/filosofia-y-humanidades/", duracion: "4 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5 años" },
    { nombre: "Universidad de la Marina Mercante", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.udemm.edu.ar", duracion: "4 años" },
    { nombre: "Universidad del Salvador", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.usal.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Morón", provincia: "Buenos Aires", web: "www.unimoron.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de Salta", provincia: "Salta", web: "http://www.unsa.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de Tucumán", provincia: "Tucumán", web: "www.filo.unt.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_a_en_ciencias_de_datos",
    titulo: "Licenciado/a en Ciencias de Datos",
    macroArea: "Datos, IA y Matemática",
    familia: "Datos, IA, estadística y matemática",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://uca.edu.ar/es/facultades/facultad-de-ingenieria-y-ciencias-agrarias", duracion: "4 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Santa Fé", web: "www.uca.edu.ar/quimicarosario", duracion: "4 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5.5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5.5 años" },
    { nombre: "Universidad Empresarial Siglo 21", provincia: "Córdoba", web: "http://www.21.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de Catamarca", provincia: "Catamarca", web: "http://www.unca.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional Guillermo Brown", provincia: "Buenos Aires", web: "www.unab.edu.ar", duracion: "4.5 años" }
    ],
  },
  {
    id: "licenciado_en_tecnolog_a_de_los_alimento",
    titulo: "Licenciado en Tecnología de los Alimentos",
    macroArea: "Ingeniería Química y de Alimentos",
    familia: "Química, alimentos y procesos",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://uca.edu.ar/es/facultades/facultad-de-ingenieria-y-ciencias-agrarias", duracion: "4 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Santa Fé", web: "www.uca.edu.ar/quimicarosario", duracion: "5 años" },
    { nombre: "Universidad Católica de Cuyo", provincia: "San Juan", web: "www.uccuyo.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Católica de Cuyo", provincia: "Mendoza", web: "www.uccuyo.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Empresarial Siglo 21", provincia: "Córdoba", web: "http://www.21.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de Hurlingham", provincia: "Buenos Aires", web: "http://www.unahur.edu.ar/es/instituto-biotecnologia", duracion: "5 años" },
    { nombre: "Universidad Nacional de Jujuy", provincia: "Jujuy", web: "http://www.fi.unju.edu.ar/", duracion: "4 años" }
    ],
  },
  {
    id: "ingeniero_biom_dico",
    titulo: "Ingeniero Biomédico",
    macroArea: "Medicina y Salud",
    familia: "Medicina y atención clínica",
    universidades: [
    { nombre: "Universidad Austral", provincia: "Buenos Aires", web: "http://www.austral.edu.ar/ingenieria/", duracion: "4 años" },
    { nombre: "Universidad Favaloro", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.favaloro.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Hospital Italiano de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.hospitalitaliano.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.efn.uncor.edu", duracion: "5 años" },
    { nombre: "Universidad Nacional de San Martín", provincia: "Buenos Aires", web: "www.unsam.edu.ar", duracion: "5.5 años" },
    { nombre: "Universidad Nacional de Tucumán", provincia: "Tucumán", web: "www.herrera.unt.edu.ar/facet", duracion: "5 años" },
    { nombre: "", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www1.hospitalitaliano.org.ar/#!/edu/home/principal/inicio", duracion: "5 años" }
    ],
  },
  {
    id: "ingeniero_a_agr_nomo_a",
    titulo: "Ingeniero/a Agrónomo/a",
    macroArea: "Ingeniería y Tecnología",
    familia: "Ingenierías generales",
    universidades: [
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.agro.uba.ar", duracion: "5.5 años" },
    { nombre: "Universidad Nacional de Chilecito", provincia: "La Rioja", web: "https://www.undec.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.agro.unc.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Jujuy", provincia: "Jujuy", web: "http://www.fca.unju.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional del Litoral", provincia: "Santa Fé", web: "www.cu-ra.unl.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Nordeste", provincia: "Corrientes", web: "http://www.agr.unne.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Santiago del Estero", provincia: "Santiago Del Estero", web: "http://faa.unse.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_ciencias_ambientales",
    titulo: "Licenciado en Ciencias Ambientales",
    macroArea: "Ambiente y Recursos Naturales",
    familia: "Ambiente, biodiversidad y recursos naturales",
    universidades: [
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5.5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5.5 años" },
    { nombre: "Universidad Nacional de Avellaneda", provincia: "Buenos Aires", web: "http://www.undav.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de Catamarca", provincia: "Catamarca", web: "http://www.unca.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de los Comechingones", provincia: "San Luis", web: "www.unlc.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional del Sur", provincia: "Buenos Aires", web: "www.uns.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Tierra del Fuego, Antártida e Islas del Atlántico Sur", provincia: "Tierra Del Fuego", web: "www.untdf.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_a_en_fonoaudiolog_a",
    titulo: "Licenciado/a en Fonoaudiología",
    macroArea: "Medicina y Salud",
    familia: "Rehabilitación y terapias",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Santa Fé", web: "www.uca.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Católica de Cuyo", provincia: "San Juan", web: "www.uccuyo.edu.ar", duracion: "4 años" },
    { nombre: "Universidad del Aconcagua", provincia: "Mendoza", web: "www.uda.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de la Cuenca del Plata", provincia: "Corrientes", web: "www.ucp.edu.ar", duracion: "4.5 años" },
    { nombre: "Universidad Empresarial Siglo 21", provincia: "Córdoba", web: "http://www.21.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.fcm.unc.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de San Antonio de Areco", provincia: "Buenos Aires", web: "https://www.unsada.edu.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_producci_n_de_bioim_genes",
    titulo: "Licenciado en Producción de Bioimágenes",
    macroArea: "Medicina y Salud",
    familia: "Técnicas y servicios de salud",
    universidades: [
    { nombre: "Universidad Autónoma de Entre Ríos", provincia: "Entre Ríos", web: "http://fcvs.uader.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.fmed.uba.ar", duracion: "6 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "6 años" },
    { nombre: "Universidad de la Marina Mercante", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.udemm.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Hospital Italiano de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.hospitalitaliano.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de La Rioja", provincia: "La Rioja", web: "www.unlar.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional José C. Paz", provincia: "Buenos Aires", web: "www.unpaz.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "odont_logo_a",
    titulo: "Odontólogo/a",
    macroArea: "Medicina y Salud",
    familia: "Odontología",
    universidades: [
    { nombre: "Universidad Católica de La Plata", provincia: "Buenos Aires", web: "www.ucalp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Católica de las Misiones", provincia: "Misiones", web: "www.ucami.edu.ar", duracion: "6 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.odon.uba.ar", duracion: "6 años" },
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.odo.unc.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de La Matanza", provincia: "Buenos Aires", web: "http://www.unlam.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Oeste", provincia: "Buenos Aires", web: "http://www.uno.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Tucumán", provincia: "Tucumán", web: "www.odontologia.unt.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_a_en_obstetricia",
    titulo: "Licenciado/a en Obstetricia",
    macroArea: "Medicina y Salud",
    familia: "Medicina y atención clínica",
    universidades: [
    { nombre: "Universidad Católica de Santa Fe", provincia: "Santa Fé", web: "http://www.ucsf.edu.ar/", duracion: "4.5 años" },
    { nombre: "Universidad del Aconcagua", provincia: "Mendoza", web: "www.uda.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional Arturo Jauretche", provincia: "Buenos Aires", web: "http://www.unaj.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional del Litoral", provincia: "Santa Fé", web: "http://www.fcm.unl.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional del Nordeste", provincia: "Corrientes", web: "http://med.unne.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional del Sur", provincia: "Buenos Aires", web: "www.uns.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Santiago del Estero", provincia: "Santiago Del Estero", web: "http://fhu.unse.edu.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_a_en_psicopedagog_a",
    titulo: "Licenciado/a en Psicopedagogía",
    macroArea: "Psicología y Comportamiento Humano",
    familia: "Psicopedagogía",
    universidades: [
    { nombre: "Universidad Adventista del Plata", provincia: "Entre Ríos", web: "https://uap.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Católica de La Plata", provincia: "Buenos Aires", web: "www.ucalp.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Concepción del Uruguay", provincia: "Entre Ríos", web: "www.ucu.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de la Marina Mercante", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.udemm.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional Raúl Scalabrini Ortiz", provincia: "Buenos Aires", web: "https://unso.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Pedagógica Nacional", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://unipe.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Provincial de Córdoba", provincia: "Córdoba", web: "www.upc.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "profesor_en_psicolog_a",
    titulo: "Profesor en Psicología",
    macroArea: "Psicología y Comportamiento Humano",
    familia: "Psicología",
    universidades: [
    { nombre: "Universidad Autónoma de Entre Ríos", provincia: "Entre Ríos", web: "http://fhaycs-uader.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Católica de Salta", provincia: "Salta", web: "http://www.ucasal.net", duracion: "4 años" },
    { nombre: "Universidad del Aconcagua", provincia: "Mendoza", web: "www.uda.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.psyche.unc.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de La Plata", provincia: "Buenos Aires", web: "www.psico.unlp.edu.ar", duracion: "6 años" },
    { nombre: "Universidad Nacional de Rosario", provincia: "Santa Fé", web: "www.fpsico.unr.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de San Luis", provincia: "San Luis", web: "https://carreras.unsl.edu.ar/facultades/fapsi/1", duracion: "4.5 años" }
    ],
  },
  {
    id: "licenciado_en_comunicaci_n",
    titulo: "Licenciado en Comunicación",
    macroArea: "Comunicación y Medios",
    familia: "Comunicación y medios digitales",
    universidades: [
    { nombre: "Universidad Adventista del Plata", provincia: "Entre Ríos", web: "https://uap.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Austral", provincia: "Buenos Aires", web: "http://web.austral.edu.ar/comunicacion-home.asp", duracion: "4 años" },
    { nombre: "Universidad de Congreso", provincia: "Mendoza", web: "https://www.ucongreso.edu.ar/educacion-a-distancia/", duracion: "4 años" },
    { nombre: "Universidad de Congreso", provincia: "San Juan", web: "http://www.ucongreso.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad de Congreso", provincia: "San Luis", web: "http://www.ucongreso.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad de San Andrés", provincia: "Buenos Aires", web: "www.udesa.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de General Sarmiento", provincia: "Buenos Aires", web: "www.ungs.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_administraci_n_p_blica",
    titulo: "Licenciado en Administración Pública",
    macroArea: "Administración y Negocios",
    familia: "Administración, gestión y negocios",
    universidades: [
    { nombre: "Universidad Autónoma de Entre Ríos", provincia: "Entre Ríos", web: "http://fcg.uader.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Empresarial Siglo 21", provincia: "Córdoba", web: "http://www.21.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de General Sarmiento", provincia: "Buenos Aires", web: "www.ungs.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Comahue", provincia: "Río Negro", web: "https://web.curza.net/", duracion: "4 años" },
    { nombre: "Universidad Nacional del Oeste", provincia: "Buenos Aires", web: "http://www.uno.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de San Martín", provincia: "Buenos Aires", web: "www.unsam.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de Tres de Febrero", provincia: "Buenos Aires", web: "http://www.untref.edu.ar/", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_relaciones_p_blicas_e_inst",
    titulo: "Licenciado en Relaciones Públicas e Institucionales",
    macroArea: "Marketing, Publicidad y Comercialización",
    familia: "Marketing, publicidad y ventas",
    universidades: [
    { nombre: "Universidad CAECE", provincia: "Buenos Aires", web: "www.ucaece.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Belgrano", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.ub.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Ciencias Empresariales y Sociales", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uces.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Ciencias Empresariales y Sociales", provincia: "Buenos Aires", web: "www.uces.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Ciencias Empresariales y Sociales", provincia: "Chaco", web: "www.uces.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Ciencias Empresariales y Sociales", provincia: "Santa Fé", web: "www.uces.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Empresarial Siglo 21", provincia: "Córdoba", web: "http://www.21.edu.ar/", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_a_en_econom_a",
    titulo: "Licenciado/a en Economía",
    macroArea: "Economía y Finanzas",
    familia: "Economía, finanzas y banca",
    universidades: [
    { nombre: "Universidad Católica de La Plata", provincia: "Buenos Aires", web: "www.ucalp.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "4.5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "4.5 años" },
    { nombre: "Universidad Nacional del Litoral", provincia: "Santa Fé", web: "www.fce.unl.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Nordeste", provincia: "Chaco", web: "http://www.eco.unne.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional del Oeste", provincia: "Buenos Aires", web: "http://www.uno.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de Villa María", provincia: "Córdoba", web: "http://www.unvm.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "procurador_a",
    titulo: "Procurador/a",
    macroArea: "Derecho y Ciencias Jurídicas",
    familia: "Derecho, notariado y bienes",
    universidades: [
    { nombre: "Universidad Católica de Salta", provincia: "Salta", web: "http://www.ucasal.net", duracion: "3 años" },
    { nombre: "Universidad Católica de Santiago del Estero", provincia: "Santiago Del Estero", web: "http://www.ucse.edu.ar/web/sede_sgo/fcpsj/sc%20fcpsj.htm", duracion: "3 años" },
    { nombre: "Universidad del Centro Educativo Latinoamericano", provincia: "Santa Fé", web: "www.ucel.edu.ar", duracion: "3 años" },
    { nombre: "Universidad de San Pablo - T", provincia: "Tucumán", web: "www.uspt.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de La Matanza", provincia: "Buenos Aires", web: "http://www.unlam.edu.ar", duracion: "2 años" },
    { nombre: "Universidad Nacional del Nordeste", provincia: "Corrientes", web: "http://dch.unne.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de San Luis", provincia: "San Luis", web: "https://carreras.unsl.edu.ar/facultades/fcejs/1", duracion: "4 años" }
    ],
  },
  {
    id: "ingeniero_electricista",
    titulo: "Ingeniero Electricista",
    macroArea: "Ingeniería Eléctrica, Electrónica y Telecomunicaciones",
    familia: "Electrónica, electricidad y telecomunicaciones",
    universidades: [
    { nombre: "Universidad de Mendoza", provincia: "Mendoza", web: "http://www.um.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Nordeste", provincia: "Corrientes", web: "http://www.exa.unne.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional del Sur", provincia: "Buenos Aires", web: "www.uns.edu.ar", duracion: "5.5 años" },
    { nombre: "Universidad Nacional de Mar del Plata", provincia: "Buenos Aires", web: "http://www.fi.mdp.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Tucumán", provincia: "Tucumán", web: "www.herrera.unt.edu.ar/facet", duracion: "5 años" },
    { nombre: "Universidad Tecnológica Nacional", provincia: "Buenos Aires", web: "www.fra.utn.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "ingeniero_el_ctrico",
    titulo: "Ingeniero Eléctrico",
    macroArea: "Ingeniería Eléctrica, Electrónica y Telecomunicaciones",
    familia: "Electrónica, electricidad y telecomunicaciones",
    universidades: [
    { nombre: "Universidad Nacional de Hurlingham", provincia: "Buenos Aires", web: "http://www.unahur.edu.ar/es/instituto-tecnologia-e-ingenieria", duracion: "5 años" },
    { nombre: "Universidad Nacional del Comahue", provincia: "Río Negro", web: "http://app.crub.uncoma.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Comahue", provincia: "Neuquén", web: "http://fainweb.uncoma.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Rosario", provincia: "Santa Fé", web: "www.fceia.unr.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de San Juan", provincia: "San Juan", web: "http://www.fi.unsj.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Santiago del Estero", provincia: "Santiago Del Estero", web: "http://fce.unse.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_f_sica",
    titulo: "Licenciado en Física",
    macroArea: "Ciencias Exactas y Naturales",
    familia: "Física, ciencias básicas y aplicadas",
    universidades: [
    { nombre: "Universidad Nacional de Catamarca", provincia: "Catamarca", web: "http://www.unca.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de La Pampa", provincia: "La Pampa", web: "www.exactas.unlpam.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de La Plata", provincia: "Buenos Aires", web: "www.exactas.unlp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Sur", provincia: "Buenos Aires", web: "www.uns.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Mar del Plata", provincia: "Buenos Aires", web: "http://www.mdp.edu.ar/exactas/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Salta", provincia: "Salta", web: "http://www.unsa.edu.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_qu_mica",
    titulo: "Licenciado en Química",
    macroArea: "Química, Farmacia y Bioquímica",
    familia: "Química",
    universidades: [
    { nombre: "Universidad Nacional de La Pampa", provincia: "La Pampa", web: "www.exactas.unlpam.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de La Plata", provincia: "Buenos Aires", web: "www.exactas.unlp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Sur", provincia: "Buenos Aires", web: "www.uns.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Mar del Plata", provincia: "Buenos Aires", web: "http://www.mdp.edu.ar/exactas/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Río Cuarto", provincia: "Córdoba", web: "www.unrc.edu.ar, www.exa.unrc.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Salta", provincia: "Salta", web: "http://www.unsa.edu.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "veterinario",
    titulo: "Veterinario",
    macroArea: "Veterinaria",
    familia: "Veterinaria y salud animal",
    universidades: [
    { nombre: "Universidad Católica de Santa Fe", provincia: "Santa Fé", web: "www.ucsf.edu.ar", duracion: "5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "7 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "7 años" },
    { nombre: "Universidad de Ciencias Empresariales y Sociales", provincia: "Buenos Aires", web: "www.uces.edu.ar", duracion: "5.5 años" },
    { nombre: "Universidad Juan Agustín Maza", provincia: "Mendoza", web: "http://www.umaza.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de La Rioja", provincia: "La Rioja", web: "www.unlar.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_artes_visuales",
    titulo: "Licenciado en Artes Visuales",
    macroArea: "Arte, Música y Audiovisual",
    familia: "Arte, música, teatro y audiovisual",
    universidades: [
    { nombre: "Instituto Universitario Patagónico de las Artes", provincia: "Río Negro", web: "www.iupa.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Autónoma de Entre Ríos", provincia: "Entre Ríos", web: "http://fhaycs-uader.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad del Museo Social Argentino", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.umsa.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.artes.unc.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Río Negro", provincia: "Río Negro", web: "www.unrn.edu.ar", duracion: "4.5 años" },
    { nombre: "Universidad Nacional de San Juan", provincia: "San Juan", web: "http://www.ffha.unsj.edu.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_educaci_n_f_sica",
    titulo: "Licenciado en Educación Física",
    macroArea: "Deportes y Actividad Física",
    familia: "Educación física y deporte",
    universidades: [
    { nombre: "Instituto Universitario River Plate", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.iuriverplate.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Atlántida Argentina", provincia: "Buenos Aires", web: "http://www.atlantida.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Juan Agustín Maza", provincia: "Mendoza", web: "http://www.umaza.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de La Matanza", provincia: "Buenos Aires", web: "http://www.unlam.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de La Plata", provincia: "Buenos Aires", web: "www.fahce.unlp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Tucumán", provincia: "Tucumán", web: "www.facdef.unt.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "profesor_universitario_en_educaci_n_f_si",
    titulo: "Profesor Universitario en Educación Física",
    macroArea: "Deportes y Actividad Física",
    familia: "Educación física y deporte",
    universidades: [
    { nombre: "Instituto Universitario River Plate", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.iuriverplate.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Atlántida Argentina", provincia: "Buenos Aires", web: "http://www.atlantida.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Católica de Salta", provincia: "Salta", web: "http://www.ucasal.net", duracion: "4 años" },
    { nombre: "Universidad de Flores", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uflo.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Flores", provincia: "Río Negro", web: "www.uflo.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de Hurlingham", provincia: "Buenos Aires", web: "http://www.unahur.edu.ar/es/instituto-educacion", duracion: "4 años" }
    ],
  },
  {
    id: "profesor_en_educaci_n_inicial",
    titulo: "Profesor en Educación Inicial",
    macroArea: "Educación y Docencia",
    familia: "Profesorados, pedagogía y gestión educativa",
    universidades: [
    { nombre: "Universidad de la Fraternidad de Agrupaciones Santo Tomás de Aquino", provincia: "Buenos Aires", web: "http://www.ufasta.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de La Pampa", provincia: "La Pampa", web: "www.fchst.unlpam.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional del Centro de la Provincia de Buenos Aires", provincia: "Buenos Aires", web: "http://www.fch.unicen.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional del Nordeste", provincia: "Chaco", web: "http://hum.unne.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Río Cuarto", provincia: "Córdoba", web: "www.unrc.edu.ar; www.hum.unrc.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de San Luis", provincia: "San Luis", web: "http://humanas.unsl.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_administraci_n_hotelera",
    titulo: "Licenciado en Administración Hotelera",
    macroArea: "Turismo, Gastronomía y Hospitalidad",
    familia: "Turismo, hotelería y gastronomía",
    universidades: [
    { nombre: "Instituto Universitario Escuela Argentina de Negocios", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://www.iuean.edu.ar", duracion: "4 años" },
    { nombre: "Instituto Universitario Escuela Argentina de Negocios", provincia: "Buenos Aires", web: "http://www.ean.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Argentina John F. Kennedy", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://www.kennedy.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad CAECE", provincia: "Buenos Aires", web: "www.ucaece.edu.ar", duracion: "4 años" },
    { nombre: "Universidad del Centro Educativo Latinoamericano", provincia: "Santa Fé", web: "www.ucel.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Empresarial Siglo 21", provincia: "Córdoba", web: "http://www.21.edu.ar/", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_finanzas",
    titulo: "Licenciado en Finanzas",
    macroArea: "Economía y Finanzas",
    familia: "Economía, finanzas y banca",
    universidades: [
    { nombre: "Universidad Argentina de la Empresa", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uade.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Católica de Santiago del Estero", provincia: "Santa Fé", web: "http://www.ucse.edu.ar/web/rafaela/sede_rafaela.htm", duracion: "4 años" },
    { nombre: "Universidad Católica de Santiago del Estero", provincia: "Santiago Del Estero", web: "http://www.ucse.edu.ar/web/sede_sgo/fce/sc%20fce.htm", duracion: "4 años" },
    { nombre: "Universidad del CEMA", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.ucema.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de San Andrés", provincia: "Buenos Aires", web: "www.udesa.edu.ar", duracion: "4.5 años" },
    { nombre: "Universidad de San Pablo - T", provincia: "Tucumán", web: "www.uspt.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "bioingeniero",
    titulo: "Bioingeniero",
    macroArea: "Ingeniería y Tecnología",
    familia: "Bioingeniería",
    universidades: [
    { nombre: "Instituto Tecnológico de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.itba.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad de Mendoza", provincia: "Mendoza", web: "http://www.um.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Entre Ríos", provincia: "Entre Ríos", web: "http://ingenieria.uner.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de San Juan", provincia: "San Juan", web: "http://www.fi.unsj.edu.ar/", duracion: "5.5 años" },
    { nombre: "Universidad Nacional de Villa Mercedes", provincia: "San Luis", web: "www.unvime.edu.ar", duracion: "5.5 años" }
    ],
  },
  {
    id: "bioingeniero_a",
    titulo: "Bioingeniero/a",
    macroArea: "Ingeniería y Tecnología",
    familia: "Bioingeniería",
    universidades: [
    { nombre: "Instituto Universitario para el Desarrollo Productivo y Tecnológico Empresarial de la Argentina", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.iudpt.edu.ar", duracion: "5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.fi.uba.ar", duracion: "6 años" },
    { nombre: "Universidad del Norte Santo Tomás de Aquino", provincia: "Tucumán", web: "http://www.unsta.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional Arturo Jauretche", provincia: "Buenos Aires", web: "http://www.unaj.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Tecnológica Nacional", provincia: "Buenos Aires", web: "www.frh.utn.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "ingeniero_a_en_inteligencia_artificial",
    titulo: "Ingeniero/a en Inteligencia Artificial",
    macroArea: "Datos, IA y Matemática",
    familia: "Datos, IA, estadística y matemática",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://uca.edu.ar/es/facultades/facultad-de-ingenieria-y-ciencias-agrarias", duracion: "5 años" },
    { nombre: "Universidad del Norte Santo Tomás de Aquino", provincia: "Tucumán", web: "http://www.unsta.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad de Palermo", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.palermo.edu", duracion: "5 años" },
    { nombre: "Universidad de San Andrés", provincia: "Buenos Aires", web: "www.udesa.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Litoral", provincia: "Santa Fé", web: "www.fich.unl.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "t_cnico_universitario_en_desarrollo_de_s",
    titulo: "Técnico Universitario en Desarrollo de Software",
    macroArea: "Ingeniería Informática y Sistemas",
    familia: "Software, sistemas e informática",
    universidades: [
    { nombre: "Universidad Argentina de la Empresa", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uade.edu.ar", duracion: "3 años" },
    { nombre: "Universidad Argentina de la Empresa", provincia: "Buenos Aires", web: "www.uade.edu.ar", duracion: "3 años" },
    { nombre: "Universidad Católica de Cuyo", provincia: "San Juan", web: "www.uccuyo.edu.ar", duracion: "2.5 años" },
    { nombre: "Universidad del Chubut", provincia: "Chubut", web: "http://udc.edu.ar/", duracion: "3.5 años" },
    { nombre: "Universidad Provincial de Ezeiza", provincia: "Buenos Aires", web: "www.upe.edu.ar", duracion: "3 años" }
    ],
  },
  {
    id: "ingeniero_en_sistemas",
    titulo: "Ingeniero en Sistemas",
    macroArea: "Ingeniería Informática y Sistemas",
    familia: "Software, sistemas e informática",
    universidades: [
    { nombre: "Universidad CAECE", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.ucaece.edu.ar", duracion: "5 años" },
    { nombre: "Universidad CAECE", provincia: "Buenos Aires", web: "www.ucaecemdp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad de la Marina Mercante", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.udemm.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de La Pampa", provincia: "La Pampa", web: "www.ing.unlpam.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de la Patagonia Austral", provincia: "Santa Cruz", web: "http://www.uaco.unpa.edu.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "ingeniero_a_agrimensor_a",
    titulo: "Ingeniero/a Agrimensor/a",
    macroArea: "Ingeniería y Tecnología",
    familia: "Ingenierías generales",
    universidades: [
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5.5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5.5 años" },
    { nombre: "Universidad Nacional de Chilecito", provincia: "La Rioja", web: "www.undec.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.efn.uncor.edu", duracion: "5 años" },
    { nombre: "Universidad Nacional del Comahue", provincia: "Neuquén", web: "https://creuzaweb.uncoma.edu.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "ingeniero_a_qu_mico_a",
    titulo: "Ingeniero/a Químico/a",
    macroArea: "Ingeniería Química y de Alimentos",
    familia: "Química, alimentos y procesos",
    universidades: [
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "6 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "6 años" },
    { nombre: "Universidad Nacional de General Sarmiento", provincia: "Buenos Aires", web: "www.ungs.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de la Patagonia Austral", provincia: "Santa Cruz", web: "http://www.uarg.unpa.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional del Litoral", provincia: "Santa Fé", web: "www.fiq.unl.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_ciencia_y_tecnolog_a_de_al",
    titulo: "Licenciado en Ciencia y Tecnología de Alimentos",
    macroArea: "Ingeniería Química y de Alimentos",
    familia: "Química, alimentos y procesos",
    universidades: [
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.exactas.uba.ar", duracion: "5 años" },
    { nombre: "Universidad de San Pablo - T", provincia: "Tucumán", web: "www.uspt.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de La Plata", provincia: "Buenos Aires", web: "www.exactas.unlp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Mar del Plata", provincia: "Buenos Aires", web: "http://fca.mdp.edu.ar/sitio/", duracion: "5 años" }
    ],
  },
  {
    id: "dise_ador_gr_fico_2",
    titulo: "Diseñador Gráfico",
    macroArea: "Arquitectura, Urbanismo y Construcción",
    familia: "Arquitectura, urbanismo y obra",
    universidades: [
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.fadu.uba.ar", duracion: "5 años" },
    { nombre: "Universidad de Mendoza", provincia: "Mendoza", web: "http://www.um.edu.ar", duracion: "3 años" },
    { nombre: "Universidad de Morón", provincia: "Buenos Aires", web: "www.unimoron.edu.ar", duracion: "3 años" },
    { nombre: "Universidad Nacional del Nordeste", provincia: "Chaco", web: "http://www.arq.unne.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de San Juan", provincia: "San Juan", web: "http://www.faud.unsj.edu.ar/", duracion: "4 años" }
    ],
  },
  {
    id: "ingeniero_forestal",
    titulo: "Ingeniero Forestal",
    macroArea: "Ingeniería y Tecnología",
    familia: "Ingenierías generales",
    universidades: [
    { nombre: "Universidad Nacional de Formosa", provincia: "Formosa", web: "www.unf.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de la Patagonia San Juan Bosco", provincia: "Chubut", web: "www.unp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de La Plata", provincia: "Buenos Aires", web: "www.agro.unlp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Misiones", provincia: "Misiones", web: "http://www.unam.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de Santiago del Estero", provincia: "Santiago Del Estero", web: "http://fcf.unse.edu.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_biotecnolog_a",
    titulo: "Licenciado en Biotecnología",
    macroArea: "Ciencias Biológicas y Biotecnología",
    familia: "Biología, genética y biotecnología",
    universidades: [
    { nombre: "Universidad Nacional de Hurlingham", provincia: "Buenos Aires", web: "http://www.unahur.edu.ar/es/instituto-biotecnologia", duracion: "5 años" },
    { nombre: "Universidad Nacional del Chaco Austral", provincia: "Chaco", web: "www.uncaus.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Moreno", provincia: "Buenos Aires", web: "www.unm.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Quilmes", provincia: "Buenos Aires", web: "http://www.unq.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de San Martín", provincia: "Buenos Aires", web: "https://www.unsam.edu.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_organizaci_n_industrial",
    titulo: "Licenciado en Organización Industrial",
    macroArea: "Ingeniería Industrial y Producción",
    familia: "Industrial, procesos y logística",
    universidades: [
    { nombre: "Universidad Tecnológica Nacional", provincia: "Buenos Aires", web: "www.frbb.utn.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Tecnológica Nacional", provincia: "Chubut", web: "www.frch.utn.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Tecnológica Nacional", provincia: "Entre Ríos", web: "www.frcu.utn.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Tecnológica Nacional", provincia: "Santa Fé", web: "www.frra.utn.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Tecnológica Nacional", provincia: "Córdoba", web: "www.frsfco.utn.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_administraci_n_rural",
    titulo: "Licenciado en Administración Rural",
    macroArea: "Administración y Negocios",
    familia: "Administración, gestión y negocios",
    universidades: [
    { nombre: "Universidad Tecnológica Nacional", provincia: "Entre Ríos", web: "www.frcon.utn.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Tecnológica Nacional", provincia: "Santa Fé", web: "www.frra.utn.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Tecnológica Nacional", provincia: "Chaco", web: "www.frre.utn.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Tecnológica Nacional", provincia: "Córdoba", web: "www.frsfco.utn.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Tecnológica Nacional", provincia: "Buenos Aires", web: "www.frsn.utn.edu.ar/frsn/", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_bioinform_tica",
    titulo: "Licenciado en Bioinformática",
    macroArea: "Ingeniería Informática y Sistemas",
    familia: "Software, sistemas e informática",
    universidades: [
    { nombre: "Universidad Argentina de la Empresa", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uade.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Católica de Córdoba", provincia: "Córdoba", web: "www.ucc.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de Entre Ríos", provincia: "Entre Ríos", web: "http://ingenieria.uner.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Quilmes", provincia: "Buenos Aires", web: "http://www.unq.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Rafaela", provincia: "Santa Fé", web: "www.unraf.edu.ar", duracion: "4.5 años" }
    ],
  },
  {
    id: "profesor_en_biolog_a",
    titulo: "Profesor en Biología",
    macroArea: "Educación y Docencia",
    familia: "Profesorados, pedagogía y gestión educativa",
    universidades: [
    { nombre: "Universidad Autónoma de Entre Ríos", provincia: "Entre Ríos", web: "http://fcyt.uader.edu.ar/web", duracion: "4 años" },
    { nombre: "Universidad Nacional de Catamarca", provincia: "Catamarca", web: "http://www.unca.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de Formosa", provincia: "Formosa", web: "www.unf.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional del Nordeste", provincia: "Corrientes", web: "http://www.exa.unne.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de Misiones", provincia: "Misiones", web: "http://www.fceqyn.unam.edu.ar/", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_ciencias_matem_ticas",
    titulo: "Licenciado en Ciencias Matemáticas",
    macroArea: "Datos, IA y Matemática",
    familia: "Datos, IA, estadística y matemática",
    universidades: [
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "6 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "6 años" },
    { nombre: "Universidad Nacional del Centro de la Provincia de Buenos Aires", provincia: "Buenos Aires", web: "www.exa.unicen.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Mar del Plata", provincia: "Buenos Aires", web: "http://www.mdp.edu.ar/exactas/", duracion: "5 años" },
    { nombre: "Universidad Nacional de San Luis", provincia: "San Luis", web: "http://webfcfmyn.unsl.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "profesor_de_matem_tica",
    titulo: "Profesor de Matemática",
    macroArea: "Datos, IA y Matemática",
    familia: "Datos, IA, estadística y matemática",
    universidades: [
    { nombre: "Universidad Juan Agustín Maza", provincia: "Mendoza", web: "http://www.umaza.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de La Plata", provincia: "Buenos Aires", web: "www.fahce.unlp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Centro de la Provincia de Buenos Aires", provincia: "Buenos Aires", web: "www.exa.unicen.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de San Juan", provincia: "San Juan", web: "http://www.ffha.unsj.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de San Luis", provincia: "San Luis", web: "http://webfcfmyn.unsl.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_teolog_a",
    titulo: "Licenciado en Teología",
    macroArea: "Humanidades, Filosofía y Religión",
    familia: "Teología y religión",
    universidades: [
    { nombre: "Escuela Universitaria de Teología", provincia: "Buenos Aires", web: "http://www.cedier.org.ar/", duracion: "4 años" },
    { nombre: "Universidad Adventista del Plata", provincia: "Entre Ríos", web: "https://uap.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Católica de Córdoba", provincia: "Córdoba", web: "www.ucc.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Católica de Salta", provincia: "Salta", web: "https://ucasal.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad del Norte Santo Tomás de Aquino", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://www.unsta.edu.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_a_en_letras",
    titulo: "Licenciado/a en Letras",
    macroArea: "Humanidades, Filosofía y Religión",
    familia: "Filosofía, historia y humanidades",
    universidades: [
    { nombre: "Universidad Católica de La Plata", provincia: "Buenos Aires", web: "www.ucalp.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.filo.uba.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Litoral", provincia: "Santa Fé", web: "www.fhuc.unl.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de San Martín", provincia: "Buenos Aires", web: "www.unsam.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Tres de Febrero", provincia: "Buenos Aires", web: "http://www.untref.edu.ar/", duracion: "4.5 años" }
    ],
  },
  {
    id: "profesor_en_educaci_n_f_sica",
    titulo: "Profesor en Educación Física",
    macroArea: "Deportes y Actividad Física",
    familia: "Educación física y deporte",
    universidades: [
    { nombre: "Universidad Nacional de La Plata", provincia: "Buenos Aires", web: "www.fahce.unlp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Comahue", provincia: "Río Negro", web: "http://app.crub.uncoma.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de Luján", provincia: "Buenos Aires", web: "http://www.unlu.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de Río Cuarto", provincia: "Córdoba", web: "www.unrc.edu.ar; www.hum.unrc.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Pedagógica Nacional", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://unipe.edu.ar/", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_econom_a_empresarial",
    titulo: "Licenciado en Economía Empresarial",
    macroArea: "Economía y Finanzas",
    familia: "Economía, finanzas y banca",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uca.edu.ar", duracion: "4 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Santa Fé", web: "www.uca.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Austral", provincia: "Santa Fé", web: "http://web.austral.edu.ar/cienciasEmpresariales-home.asp", duracion: "4 años" },
    { nombre: "Universidad del CEMA", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.ucema.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional del Centro de la Provincia de Buenos Aires", provincia: "Buenos Aires", web: "http://www.econ.unicen.edu.ar", duracion: "4.5 años" }
    ],
  },
  {
    id: "licenciado_en_ciencias_pol_ticas",
    titulo: "Licenciado en Ciencias Políticas",
    macroArea: "Gobierno, Política y Relaciones Internacionales",
    familia: "Gobierno, política y RRII",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uca.edu.ar", duracion: "4 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Entre Ríos", web: "www.uca.edu.ar", duracion: "4 años" },
    { nombre: "Universidad del CEMA", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.ucema.edu.ar", duracion: "4 años" },
    { nombre: "Universidad del Norte Santo Tomás de Aquino", provincia: "Tucumán", web: "http://www.unsta.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de San Juan", provincia: "San Juan", web: "www.vallessanjuaninos.unsj.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_turismo_2",
    titulo: "Licenciado en Turismo",
    macroArea: "Turismo, Gastronomía y Hospitalidad",
    familia: "Turismo, hotelería y gastronomía",
    universidades: [
    { nombre: "Universidad Autónoma de Entre Ríos", provincia: "Entre Ríos", web: "http://fcg.uader.edu.ar", duracion: "4 años" },
    { nombre: "Universidad CAECE", provincia: "Buenos Aires", web: "www.ucaece.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Champagnat", provincia: "Mendoza", web: "www.uch.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Congreso", provincia: "Mendoza", web: "http://www.ucongreso.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de Entre Ríos", provincia: "Entre Ríos", web: "https://www.fcad.uner.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_administraci_n_de_negocios",
    titulo: "Licenciado en Administración de Negocios",
    macroArea: "Administración y Negocios",
    familia: "Administración, gestión y negocios",
    universidades: [
    { nombre: "Universidad CAECE", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.ucaece.edu.ar", duracion: "4 años" },
    { nombre: "Universidad CAECE", provincia: "Buenos Aires", web: "www.ucaece.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Mendoza", provincia: "Mendoza", web: "http://www.um.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de San Isidro \"Dr. Plácido Marín\"", provincia: "Buenos Aires", web: "www.usi.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional del Alto Uruguay", provincia: "Misiones", web: "www.unau.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_direcci_n_de_negocios",
    titulo: "Licenciado en Dirección de Negocios",
    macroArea: "Administración y Negocios",
    familia: "Administración, gestión y negocios",
    universidades: [
    { nombre: "Universidad de Ciencias Empresariales y Sociales", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uces.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Ciencias Empresariales y Sociales", provincia: "Buenos Aires", web: "www.uces.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Ciencias Empresariales y Sociales", provincia: "Santa Fé", web: "www.uces.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Ciencias Empresariales y Sociales", provincia: "Chaco", web: "www.uces.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Ciencias Empresariales y Sociales", provincia: "Jujuy", web: "www.uces.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "martillero_p_blico_y_corredor_de_comerci",
    titulo: "Martillero Público y Corredor de Comercio",
    macroArea: "Derecho y Ciencias Jurídicas",
    familia: "Derecho, notariado y bienes",
    universidades: [
    { nombre: "Universidad del Museo Social Argentino", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.umsa.edu.ar", duracion: "2 años" },
    { nombre: "Universidad Nacional del Nordeste", provincia: "Corrientes", web: "http://dch.unne.edu.ar/", duracion: "2 años" },
    { nombre: "Universidad Nacional del Nordeste", provincia: "Chaco", web: "http://dch.unne.edu.ar/Carreras_martillero.htm", duracion: "2 años" },
    { nombre: "Universidad Nacional del Nordeste", provincia: "Formosa", web: "http://dch.unne.edu.ar/eclorinda.htm", duracion: "2 años" },
    { nombre: "Universidad Nacional del Nordeste", provincia: "Misiones", web: "http://dch.unne.edu.ar/eaposadas.htm", duracion: "2 años" }
    ],
  },
  {
    id: "licenciado_en_turismo_3",
    titulo: "Licenciado en Turismo",
    macroArea: "Humanidades, Filosofía y Religión",
    familia: "Filosofía, historia y humanidades",
    universidades: [
    { nombre: "Universidad Nacional de Cuyo", provincia: "Mendoza", web: "www.ffyl.uncuyo.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de Jujuy", provincia: "Jujuy", web: "http://www.fhycs.unju.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de la Patagonia San Juan Bosco", provincia: "Chubut", web: "www.unp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Centro de la Provincia de Buenos Aires", provincia: "Buenos Aires", web: "http://www.fch.unicen.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de Misiones", provincia: "Misiones", web: "http://www.fhycs.unam.edu.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "ingeniero_a_civil",
    titulo: "Ingeniero/a Civil",
    macroArea: "Ingeniería Civil, Construcción e Infraestructura",
    familia: "Civil, obras e infraestructura",
    universidades: [
    { nombre: "Instituto Tecnológico de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.itba.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "6 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.fi.uba.ar", duracion: "6 años" },
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.efn.uncor.edu", duracion: "6 años" }
    ],
  },
  {
    id: "farmac_utico_a",
    titulo: "Farmacéutico/a",
    macroArea: "Química, Farmacia y Bioquímica",
    familia: "Laboratorio, farmacia y bioquímica",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uca.edu.ar", duracion: "5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Tucumán", provincia: "Tucumán", web: "www.unt.edu.ar/facbioq", duracion: "6 años" }
    ],
  },
  {
    id: "licenciado_en_dise_o",
    titulo: "Licenciado en Diseño",
    macroArea: "Diseño y Creatividad",
    familia: "Diseño gráfico, industrial y digital",
    universidades: [
    { nombre: "Universidad Austral", provincia: "Buenos Aires", web: "http://web.austral.edu.ar/comunicacion-home.asp", duracion: "4 años" },
    { nombre: "Universidad de Mendoza", provincia: "Córdoba", web: "http://www.um.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad de Mendoza", provincia: "Mendoza", web: "http://www.um.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de San Andrés", provincia: "Buenos Aires", web: "www.udesa.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_a_en_higiene_y_seguridad_en_e",
    titulo: "Licenciado/a en Higiene y Seguridad en el Trabajo",
    macroArea: "Seguridad, Criminalística y Defensa",
    familia: "Seguridad, criminalística y fuerzas",
    universidades: [
    { nombre: "Universidad Católica de La Plata", provincia: "Buenos Aires", web: "www.ucalp.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de la Patagonia Austral", provincia: "Santa Cruz", web: "http://www.uaco.unpa.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional del Litoral", provincia: "Santa Fé", web: "www.fbcb.unl.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Provincial de Córdoba", provincia: "Córdoba", web: "https://www.upc.edu.ar/igtp/", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_a_en_sistemas",
    titulo: "Licenciado/a en Sistemas",
    macroArea: "Ingeniería Informática y Sistemas",
    familia: "Software, sistemas e informática",
    universidades: [
    { nombre: "Universidad Católica de La Plata", provincia: "Buenos Aires", web: "www.ucalp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Chilecito", provincia: "La Rioja", web: "www.undec.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de la Patagonia Austral", provincia: "Santa Cruz", web: "http://www.uarg.unpa.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Tierra del Fuego, Antártida e Islas del Atlántico Sur", provincia: "Tierra Del Fuego", web: "www.untdf.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "ingeniero_en_electr_nica",
    titulo: "Ingeniero en Electrónica",
    macroArea: "Ingeniería Eléctrica, Electrónica y Telecomunicaciones",
    familia: "Electrónica, electricidad y telecomunicaciones",
    universidades: [
    { nombre: "Universidad Católica de Santiago del Estero", provincia: "Santiago Del Estero", web: "http://newsite.ucse.edu.ar/index.php/ucse-sedes/santiago-del-estero", duracion: "5 años" },
    { nombre: "Universidad Nacional de La Matanza", provincia: "Buenos Aires", web: "http://www.unlam.edu.ar", duracion: "6 años" },
    { nombre: "Universidad Nacional del Nordeste", provincia: "Corrientes", web: "http://www.exa.unne.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Moreno", provincia: "Buenos Aires", web: "www.unm.edu.ar", duracion: "5.5 años" }
    ],
  },
  {
    id: "ingeniero_a_en_alimentos",
    titulo: "Ingeniero/a en Alimentos",
    macroArea: "Ingeniería Química y de Alimentos",
    familia: "Química, alimentos y procesos",
    universidades: [
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5.5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5.5 años" },
    { nombre: "Universidad Nacional del Litoral", provincia: "Santa Fé", web: "www.fiq.unl.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Santiago del Estero", provincia: "Santiago Del Estero", web: "http://faa.unse.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "ingeniero_a_industrial",
    titulo: "Ingeniero/a Industrial",
    macroArea: "Ingeniería Industrial y Producción",
    familia: "Industrial, procesos y logística",
    universidades: [
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional Arturo Jauretche", provincia: "Buenos Aires", web: "http://www.unaj.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional del Litoral", provincia: "Santa Fé", web: "www.fiq.unl.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "ingeniero_en_materiales",
    titulo: "Ingeniero en Materiales",
    macroArea: "Ingeniería y Tecnología",
    familia: "Ingenierías generales",
    universidades: [
    { nombre: "Universidad Nacional de Avellaneda", provincia: "Buenos Aires", web: "http://www.undav.edu.ar", duracion: "6 años" },
    { nombre: "Universidad Nacional de La Plata", provincia: "Buenos Aires", web: "www.ing.unlp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Mar del Plata", provincia: "Buenos Aires", web: "http://www.fi.mdp.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de San Martín", provincia: "Buenos Aires", web: "www.isabato.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "ingeniero_mecatr_nico",
    titulo: "Ingeniero Mecatrónico",
    macroArea: "Ingeniería Mecánica, Electromecánica y Mecatrónica",
    familia: "Mecánica, electromecánica y mecatrónica",
    universidades: [
    { nombre: "Universidad Nacional de Chilecito", provincia: "La Rioja", web: "www.undec.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de La Rioja", provincia: "La Rioja", web: "www.unlar.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Lomas de Zamora", provincia: "Buenos Aires", web: "http://ingenieria.unlz.edu,ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de San Luis", provincia: "San Luis", web: "https://carreras.unsl.edu.ar/facultades/fica/1", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_bromatolog_a",
    titulo: "Licenciado en Bromatología",
    macroArea: "Agropecuarias y Producción Alimentaria",
    familia: "Agronomía, agro y producción",
    universidades: [
    { nombre: "Universidad Nacional de Cuyo", provincia: "Mendoza", web: "www.fca.uncuyo.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Entre Ríos", provincia: "Entre Ríos", web: "https://www.fb.uner.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Jujuy", provincia: "Jujuy", web: "http://www.fca.unju.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de Salta", provincia: "Salta", web: "http://www.unsa.edu.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_log_stica",
    titulo: "Licenciado en Logística",
    macroArea: "Administración y Negocios",
    familia: "Logística y operaciones",
    universidades: [
    { nombre: "Universidad Nacional de Cuyo", provincia: "Mendoza", web: "www.fce.uncuyo.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de Tres de Febrero", provincia: "Buenos Aires", web: "http://www.untref.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Provincial de Ezeiza", provincia: "Buenos Aires", web: "www.upe.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Provincial del Sudoeste", provincia: "Buenos Aires", web: "www.upso.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "ingeniero_zootecnista",
    titulo: "Ingeniero Zootecnista",
    macroArea: "Ingeniería y Tecnología",
    familia: "Ingenierías generales",
    universidades: [
    { nombre: "Universidad Nacional de Formosa", provincia: "Formosa", web: "www.unf.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Chaco Austral", provincia: "Chaco", web: "www.uncaus.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Lomas de Zamora", provincia: "Buenos Aires", web: "http://www.agrarias.unlz.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de San Antonio de Areco", provincia: "Buenos Aires", web: "https://www.unsada.edu.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "profesor_en_inform_tica",
    titulo: "Profesor en Informática",
    macroArea: "Ingeniería Informática y Sistemas",
    familia: "Software, sistemas e informática",
    universidades: [
    { nombre: "Universidad Nacional del Centro de la Provincia de Buenos Aires", provincia: "Buenos Aires", web: "www.exa.unicen.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional del Comahue", provincia: "Neuquén", web: "http://www.fi.uncoma.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de Santiago del Estero", provincia: "Santiago Del Estero", web: "http://fce.unse.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Pedagógica Nacional", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://unipe.edu.ar/", duracion: "4 años" }
    ],
  },
  {
    id: "ingeniero_a_en_computaci_n",
    titulo: "Ingeniero/a en Computación",
    macroArea: "Ingeniería Informática y Sistemas",
    familia: "Software, sistemas e informática",
    universidades: [
    { nombre: "Universidad Nacional de Misiones", provincia: "Misiones", web: "http://www.fio.unam.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Rafaela", provincia: "Santa Fé", web: "www.unraf.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Río Negro", provincia: "Río Negro", web: "https://www.unrn.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Tucumán", provincia: "Tucumán", web: "www.herrera.unt.edu.ar/facet", duracion: "5 años" }
    ],
  },
  {
    id: "profesor_universitario_en_matem_tica",
    titulo: "Profesor Universitario en Matemática",
    macroArea: "Datos, IA y Matemática",
    familia: "Datos, IA, estadística y matemática",
    universidades: [
    { nombre: "Universidad Abierta Interamericana", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uai.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de la Patagonia San Juan Bosco", provincia: "Chubut", web: "www.unp.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional del Comahue", provincia: "Río Negro", web: "http://app.crub.uncoma.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional del Comahue", provincia: "Neuquén", web: "http://faeaweb.uncoma.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_gesti_n_ambiental_md",
    titulo: "Licenciado en Gestión Ambiental - MD",
    macroArea: "Administración y Negocios",
    familia: "Administración, gestión y negocios",
    universidades: [
    { nombre: "Universidad Blas Pascal", provincia: "Córdoba", web: "http://www.ubp.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad CAECE", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.ucaece.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Católica de Cuyo", provincia: "San Juan", web: "www.uccuyo.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Empresarial Siglo 21", provincia: "Córdoba", web: "http://www.21.edu.ar/", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_ciencias_qu_micas",
    titulo: "Licenciado en Ciencias Químicas",
    macroArea: "Química, Farmacia y Bioquímica",
    familia: "Química",
    universidades: [
    { nombre: "Universidad de Belgrano", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.ub.edu.ar", duracion: "5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "6 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "6 años" },
    { nombre: "Universidad Nacional del Nordeste", provincia: "Corrientes", web: "http://www.exa.unne.edu.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_ciencias_f_sicas",
    titulo: "Licenciado en Ciencias Físicas",
    macroArea: "Ciencias Exactas y Naturales",
    familia: "Física, ciencias básicas y aplicadas",
    universidades: [
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "6 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "6 años" },
    { nombre: "Universidad Nacional del Centro de la Provincia de Buenos Aires", provincia: "Buenos Aires", web: "www.exa.unicen.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Nordeste", provincia: "Corrientes", web: "http://www.exa.unne.edu.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_a_en_ciencias_biol_gicas",
    titulo: "Licenciado/a en Ciencias Biológicas",
    macroArea: "Ciencias Biológicas y Biotecnología",
    familia: "Biología, genética y biotecnología",
    universidades: [
    { nombre: "Universidad Nacional de Catamarca", provincia: "Catamarca", web: "http://www.unca.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Chilecito", provincia: "La Rioja", web: "https://www.undec.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional del Nordeste", provincia: "Corrientes", web: "http://www.exa.unne.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de Tucumán", provincia: "Tucumán", web: "www.csnat.unt.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_a_en_matem_tica_aplicada",
    titulo: "Licenciado/a en Matemática Aplicada",
    macroArea: "Datos, IA y Matemática",
    familia: "Datos, IA, estadística y matemática",
    universidades: [
    { nombre: "Universidad Nacional de Catamarca", provincia: "Catamarca", web: "http://www.unca.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.famaf.unc.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Litoral", provincia: "Santa Fé", web: "www.fiq.unl.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional del Sur", provincia: "Buenos Aires", web: "www.uns.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "profesor_universitario_de_educaci_n_prim",
    titulo: "Profesor Universitario de Educación Primaria",
    macroArea: "Educación y Docencia",
    familia: "Profesorados, pedagogía y gestión educativa",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uca.edu.ar", duracion: "4 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Mendoza", web: "http://uca.edu.ar/es/facultades/facultad-de-humanidades-y-ciencias-economicas", duracion: "4 años" },
    { nombre: "Universidad del Este", provincia: "Buenos Aires", web: "www.ude.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de Cuyo", provincia: "Mendoza", web: "educacion.uncuyo.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_ingl_s",
    titulo: "Licenciado en Inglés",
    macroArea: "Lenguas, Traducción y Letras",
    familia: "Idiomas, traducción y letras",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uca.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de Catamarca", provincia: "Catamarca", web: "http://www.unca.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Río Cuarto", provincia: "Córdoba", web: "www.unrc.edu.ar; www.hum.unrc.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Tucumán", provincia: "Tucumán", web: "www.filo.unt.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_musicoterapia",
    titulo: "Licenciado en Musicoterapia",
    macroArea: "Psicología y Comportamiento Humano",
    familia: "Psicología",
    universidades: [
    { nombre: "Universidad Abierta Interamericana", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uai.edu.ar", duracion: "5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5 años" },
    { nombre: "Universidad Maimónides", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.maimonides.edu", duracion: "4 años" }
    ],
  },
  {
    id: "profesor_de_educaci_n_f_sica",
    titulo: "Profesor de Educación Física",
    macroArea: "Deportes y Actividad Física",
    familia: "Educación física y deporte",
    universidades: [
    { nombre: "Universidad Adventista del Plata", provincia: "Entre Ríos", web: "https://uap.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Juan Agustín Maza", provincia: "Mendoza", web: "http://www.umaza.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de La Matanza", provincia: "Buenos Aires", web: "http://www.unlam.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de Tucumán", provincia: "Tucumán", web: "www.facdef.unt.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "profesor_de_ingl_s",
    titulo: "Profesor de Inglés",
    macroArea: "Educación y Docencia",
    familia: "Profesorados, pedagogía y gestión educativa",
    universidades: [
    { nombre: "Universidad Adventista del Plata", provincia: "Entre Ríos", web: "https://uap.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional del Comahue", provincia: "Río Negro", web: "http://fadelweb.uncoma.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de Mar del Plata", provincia: "Buenos Aires", web: "http://www.mdp.edu.ar/humanidades/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Río Cuarto", provincia: "Córdoba", web: "www.unrc.edu.ar; www.hum.unrc.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_a_en_psicopedagog_a_md",
    titulo: "Licenciado/a en Psicopedagogía - MD",
    macroArea: "Psicología y Comportamiento Humano",
    familia: "Psicopedagogía",
    universidades: [
    { nombre: "Universidad Argentina John F. Kennedy", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://www.kennedy.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Católica de Santiago del Estero", provincia: "Buenos Aires", web: "https://www.ucse.edu.ar/buenos-aires/", duracion: "4 años" },
    { nombre: "Universidad de Concepción del Uruguay", provincia: "Entre Ríos", web: "www.ucu.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de la Cuenca del Plata", provincia: "Corrientes", web: "www.ucp.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_a_en_psicolog_a_md",
    titulo: "Licenciado/a en Psicología - MD",
    macroArea: "Psicología y Comportamiento Humano",
    familia: "Psicología",
    universidades: [
    { nombre: "Universidad Atlántida Argentina", provincia: "Buenos Aires", web: "http://www.atlantida.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad de Ciencias Empresariales y Sociales", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uces.edu.ar", duracion: "4.5 años" },
    { nombre: "Universidad de la Cuenca del Plata", provincia: "Corrientes", web: "www.ucp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad de Palermo", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.palermo.edu", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_a_en_historia",
    titulo: "Licenciado/a en Historia",
    macroArea: "Humanidades, Filosofía y Religión",
    familia: "Filosofía, historia y humanidades",
    universidades: [
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.filo.uba.ar", duracion: "6 años" },
    { nombre: "Universidad Nacional de la Patagonia Austral", provincia: "Santa Cruz", web: "http://www.uarg.unpa.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional del Litoral", provincia: "Santa Fé", web: "www.fhuc.unl.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Tucumán", provincia: "Tucumán", web: "www.filo.unt.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "profesor_de_educaci_n_inicial",
    titulo: "Profesor de Educación Inicial",
    macroArea: "Educación y Docencia",
    familia: "Profesorados, pedagogía y gestión educativa",
    universidades: [
    { nombre: "Universidad de Ciencias Empresariales y Sociales", provincia: "Buenos Aires", web: "www.uces.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional del Sur", provincia: "Buenos Aires", web: "www.uns.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de Villa Mercedes", provincia: "San Luis", web: "www.unvime.edu.ar/escuela-ciencias-sociales-y-educacion/", duracion: "4 años" },
    { nombre: "Universidad Pedagógica Nacional", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://unipe.edu.ar/", duracion: "4.5 años" }
    ],
  },
  {
    id: "profesor_en_psicopedagog_a",
    titulo: "Profesor en Psicopedagogía",
    macroArea: "Psicología y Comportamiento Humano",
    familia: "Psicopedagogía",
    universidades: [
    { nombre: "Universidad de la Fraternidad de Agrupaciones Santo Tomás de Aquino", provincia: "Buenos Aires", web: "http://www.ufasta.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad de Morón", provincia: "Buenos Aires", web: "www.unimoron.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de La Rioja", provincia: "La Rioja", web: "www.unlar.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional del Comahue", provincia: "Río Negro", web: "https://web.curza.net/", duracion: "5 años" }
    ],
  },
  {
    id: "profesor_a_universitario_a_en_ciencias_d",
    titulo: "Profesor/a Universitario/a en Ciencias de la Educación",
    macroArea: "Educación y Docencia",
    familia: "Profesorados, pedagogía y gestión educativa",
    universidades: [
    { nombre: "Universidad Nacional de Cuyo", provincia: "Mendoza", web: "www.ffyl.uncuyo.edu.ar", duracion: "4.5 años" },
    { nombre: "Universidad Nacional de la Patagonia Austral", provincia: "Santa Cruz", web: "http://www.uaco.unpa.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de Mar del Plata", provincia: "Buenos Aires", web: "http://www.mdp.edu.ar/humanidades/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Misiones", provincia: "Misiones", web: "http://www.fhycs.unam.edu.ar/", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_a_en_comercializaci_n_md",
    titulo: "Licenciado/a en Comercialización - MD",
    macroArea: "Marketing, Publicidad y Comercialización",
    familia: "Marketing, publicidad y ventas",
    universidades: [
    { nombre: "Instituto Universitario Escuela Argentina de Negocios", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://www.iuean.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Católica de La Plata", provincia: "Buenos Aires", web: "www.ucalp.edu.ar", duracion: "4 años" },
    { nombre: "Universidad del Este", provincia: "Buenos Aires", web: "www.ude.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Palermo", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.palermo.edu", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_administraci_n_2",
    titulo: "Licenciado en Administración",
    macroArea: "Economía y Finanzas",
    familia: "Economía, finanzas y banca",
    universidades: [
    { nombre: "Instituto Universitario River Plate", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.iuriverplate.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de la Marina Mercante", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.udemm.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Morón", provincia: "Buenos Aires", web: "www.unimoron.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional del Comahue", provincia: "Neuquén", web: "http://faeaweb.uncoma.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "martillero_p_blico_corredor_inmobiliario",
    titulo: "Martillero Público, Corredor ( Inmobiliario y Mobiliario ), Administrador de Consorcios y Tasador",
    macroArea: "Derecho y Ciencias Jurídicas",
    familia: "Derecho, notariado y bienes",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uca.edu.ar", duracion: "2 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Santa Fé", web: "www.uca.edu.ar", duracion: "2 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Mendoza", web: "http://uca.edu.ar/es/facultades/facultad-de-humanidades-y-ciencias-economicas", duracion: "2 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Entre Ríos", web: "www.uca.edu.ar", duracion: "2 años" }
    ],
  },
  {
    id: "licenciado_en_ciencia_pol_tica_2",
    titulo: "Licenciado en Ciencia Política",
    macroArea: "Derecho y Ciencias Jurídicas",
    familia: "Derecho, notariado y bienes",
    universidades: [
    { nombre: "Universidad Abierta Interamericana", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uai.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Abierta Interamericana", provincia: "Santa Fé", web: "www.uai.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Austral", provincia: "Buenos Aires", web: "http://www.austral.edu.ar/derecho/", duracion: "4 años" },
    { nombre: "Universidad Nacional de La Matanza", provincia: "Buenos Aires", web: "http://www.unlam.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "martillero_p_blico_corredor_y_administra",
    titulo: "Martillero Público, Corredor y Administrador de Consorcio",
    macroArea: "Derecho y Ciencias Jurídicas",
    familia: "Derecho, notariado y bienes",
    universidades: [
    { nombre: "Universidad Abierta Interamericana", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uai.edu.ar", duracion: "2.5 años" },
    { nombre: "Universidad Abierta Interamericana", provincia: "Santa Fé", web: "www.uai.edu.ar", duracion: "2.5 años" },
    { nombre: "Universidad Argentina de la Empresa", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uade.edu.ar", duracion: "2.5 años" },
    { nombre: "Universidad Argentina de la Empresa", provincia: "Buenos Aires", web: "www.uade.edu.ar", duracion: "2.5 años" }
    ],
  },
  {
    id: "licenciado_en_hoteler_a",
    titulo: "Licenciado en Hotelería",
    macroArea: "Turismo, Gastronomía y Hospitalidad",
    familia: "Turismo, hotelería, eventos y gastronomía",
    universidades: [
    { nombre: "Universidad Abierta Interamericana", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uai.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Abierta Interamericana", provincia: "Santa Fé", web: "www.uai.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Belgrano", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.ub.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de Río Negro", provincia: "Río Negro", web: "https://www.unrn.edu.ar/", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_a_en_marketing",
    titulo: "Licenciado/a en Marketing",
    macroArea: "Marketing, Publicidad y Comercialización",
    familia: "Marketing, publicidad y ventas",
    universidades: [
    { nombre: "Universidad Argentina de la Empresa", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uade.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Argentina de la Empresa", provincia: "Buenos Aires", web: "www.uade.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Católica de Cuyo", provincia: "San Juan", web: "www.uccuyo.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de Misiones", provincia: "Misiones", web: "http://www.unam.edu.ar/", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_turismo_md",
    titulo: "Licenciado en Turismo - MD",
    macroArea: "Turismo, Gastronomía y Hospitalidad",
    familia: "Turismo, hotelería, eventos y gastronomía",
    universidades: [
    { nombre: "Universidad Argentina John F. Kennedy", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://www.kennedy.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Blas Pascal", provincia: "Córdoba", web: "http://www.ubp.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Católica de Santiago del Estero", provincia: "Santiago Del Estero", web: "http://www.ucse.edu.ar/web/sede_sgo/fce/sc%20fce.htm", duracion: "4 años" },
    { nombre: "Universidad Nacional de Tres de Febrero", provincia: "Buenos Aires", web: "http://www.untrefvirtual.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "t_cnico_universitario_en_administraci_n",
    titulo: "Técnico Universitario en Administración",
    macroArea: "Administración y Negocios",
    familia: "Administración, gestión y negocios",
    universidades: [
    { nombre: "Universidad Atlántida Argentina", provincia: "Buenos Aires", web: "http://www.atlantida.edu.ar/", duracion: "2 años" },
    { nombre: "Universidad Nacional de Chilecito", provincia: "La Rioja", web: "https://www.undec.edu.ar/", duracion: "3 años" },
    { nombre: "Universidad Nacional de Salta", provincia: "Salta", web: "http://www.unsa.edu.ar/", duracion: "3 años" },
    { nombre: "Universidad Nacional de Villa María", provincia: "Córdoba", web: "http://www.unvm.edu.ar", duracion: "3 años" }
    ],
  },
  {
    id: "licenciado_en_comercio_internacional",
    titulo: "Licenciado en Comercio Internacional",
    macroArea: "Administración y Negocios",
    familia: "Administración, gestión y negocios",
    universidades: [
    { nombre: "Universidad Autónoma de Entre Ríos", provincia: "Entre Ríos", web: "http://fcg.uader.edu.ar", duracion: "5 años" },
    { nombre: "Universidad CAECE", provincia: "Buenos Aires", web: "www.ucaece.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Champagnat", provincia: "Mendoza", web: "www.uch.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Palermo", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.palermo.edu", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_marketing_md",
    titulo: "Licenciado en Marketing - MD",
    macroArea: "Marketing, Publicidad y Comercialización",
    familia: "Marketing, publicidad y ventas",
    universidades: [
    { nombre: "Universidad Blas Pascal", provincia: "Córdoba", web: "http://www.ubp.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Católica de Santiago del Estero", provincia: "Santiago Del Estero", web: "http://www.ucse.edu.ar/web/sede_sgo/fce/sc%20fce.htm", duracion: "4 años" },
    { nombre: "Universidad de Palermo", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.palermo.edu", duracion: "4 años" },
    { nombre: "Universidad Nacional de Tres de Febrero", provincia: "Buenos Aires", web: "http://www.untrefvirtual.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_administraci_n_de_recursos",
    titulo: "Licenciado en Administración de Recursos Humanos",
    macroArea: "Recursos Humanos y Organizaciones",
    familia: "RRHH y desarrollo organizacional",
    universidades: [
    { nombre: "Universidad CAECE", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.ucaece.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Belgrano", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.ub.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de la Marina Mercante", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.udemm.edu.ar", duracion: "4 años" },
    { nombre: "Universidad del Salvador", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.usal.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_comercio_internacional_2",
    titulo: "Licenciado en Comercio Internacional",
    macroArea: "Economía y Finanzas",
    familia: "Economía, finanzas y banca",
    universidades: [
    { nombre: "Universidad Católica de Salta", provincia: "Salta", web: "http://www.ucasal.net", duracion: "4 años" },
    { nombre: "Universidad de la Marina Mercante", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.udemm.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Morón", provincia: "Buenos Aires", web: "www.unimoron.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de Quilmes", provincia: "Buenos Aires", web: "http://www.unq.edu.ar/", duracion: "4.5 años" }
    ],
  },
  {
    id: "licenciado_a_en_comunicaci_n_social",
    titulo: "Licenciado/a en Comunicación Social",
    macroArea: "Comunicación y Medios",
    familia: "Comunicación y medios digitales",
    universidades: [
    { nombre: "Universidad Católica de Santiago del Estero", provincia: "Santa Fé", web: "http://www.ucse.edu.ar/web/rafaela/sede_rafaela.htm", duracion: "4 años" },
    { nombre: "Universidad Católica de Santiago del Estero", provincia: "Jujuy", web: "http://www.ucse.edu.ar/web/jujuy/sede_jujuy.htm", duracion: "4 años" },
    { nombre: "Universidad Católica de Santiago del Estero", provincia: "Santiago Del Estero", web: "http://newsite.ucse.edu.ar/index.php/ucse-sedes/santiago-del-estero", duracion: "4 años" },
    { nombre: "Universidad Nacional de San Juan", provincia: "San Juan", web: "http://www.facso.unsj.edu.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_recursos_humanos_md",
    titulo: "Licenciado en Recursos Humanos - MD",
    macroArea: "Recursos Humanos y Organizaciones",
    familia: "RRHH y desarrollo organizacional",
    universidades: [
    { nombre: "Universidad Católica de Santiago del Estero", provincia: "Santiago Del Estero", web: "http://www.ucse.edu.ar/web/sede_sgo/fce/sc%20fce.htm", duracion: "4 años" },
    { nombre: "Universidad de Ciencias Empresariales y Sociales", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uces.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de la Fraternidad de Agrupaciones Santo Tomás de Aquino", provincia: "Buenos Aires", web: "http://www.ufasta.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad de Palermo", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.palermo.edu", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_a_en_trabajo_social",
    titulo: "Licenciado/a en Trabajo Social",
    macroArea: "Ciencias Sociales y Comunitarias",
    familia: "Sociología, trabajo social y comunidad",
    universidades: [
    { nombre: "Universidad del Museo Social Argentino", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.umsa.edu.ar", duracion: "4 años" },
    { nombre: "Universidad del Salvador", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.usal.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de la Patagonia Austral", provincia: "Santa Cruz", web: "http://www.uaco.unpa.edu.ar/", duracion: "4.5 años" },
    { nombre: "Universidad Nacional del Litoral", provincia: "Santa Fé", web: "www.fcjs.unl.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_a_en_gesti_n_universitaria",
    titulo: "Licenciado/a en Gestión Universitaria",
    macroArea: "Administración y Negocios",
    familia: "Administración, gestión y negocios",
    universidades: [
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.eco.unc.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Hurlingham", provincia: "Buenos Aires", web: "http://www.unahur.edu.ar/es/instituto-educacion", duracion: "4 años" },
    { nombre: "Universidad Nacional de San Juan", provincia: "San Juan", web: "http://www.facso.unsj.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional José C. Paz", provincia: "Buenos Aires", web: "www.unpaz.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "t_cnico_a_en_gesti_n_judicial",
    titulo: "Técnico/a en Gestión Judicial",
    macroArea: "Derecho y Ciencias Jurídicas",
    familia: "Derecho, notariado y bienes",
    universidades: [
    { nombre: "Universidad Nacional del Nordeste", provincia: "Corrientes", web: "http://dch.unne.edu.ar/", duracion: "2 años" },
    { nombre: "Universidad Nacional del Nordeste", provincia: "Formosa", web: "http://www.dch.unne.edu.ar/index.php/extension", duracion: "2 años" },
    { nombre: "Universidad Nacional del Nordeste", provincia: "Chaco", web: "http://dch.unne.edu.ar/eacastelli.htm", duracion: "2 años" },
    { nombre: "Universidad Nacional del Nordeste", provincia: "Misiones", web: "http://dch.unne.edu.ar/eaposadas.htm", duracion: "2 años" }
    ],
  },
  {
    id: "t_cnico_a_en_gesti_n_parlamentaria",
    titulo: "Técnico/a en Gestión Parlamentaria",
    macroArea: "Derecho y Ciencias Jurídicas",
    familia: "Derecho, notariado y bienes",
    universidades: [
    { nombre: "Universidad Nacional del Nordeste", provincia: "Corrientes", web: "http://dch.unne.edu.ar/", duracion: "2 años" },
    { nombre: "Universidad Nacional del Nordeste", provincia: "Formosa", web: "http://www.dch.unne.edu.ar/index.php/extension", duracion: "2 años" },
    { nombre: "Universidad Nacional del Nordeste", provincia: "Misiones", web: "http://dch.unne.edu.ar/eaposadas.htm", duracion: "2 años" },
    { nombre: "Universidad Nacional del Nordeste", provincia: "Chaco", web: "http://dch.unne.edu.ar/Carreras_martillero.htm", duracion: "2 años" }
    ],
  },
  {
    id: "ingeniero_naval",
    titulo: "Ingeniero Naval",
    macroArea: "Ingeniería y Tecnología",
    familia: "Energía, petróleo y naval",
    universidades: [
    { nombre: "Instituto Tecnológico de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.itba.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Tecnológica Nacional", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.frba.utn.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Tecnológica Nacional", provincia: "Buenos Aires", web: "www.mdp.utn.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "ingeniero_en_inform_tica_2",
    titulo: "Ingeniero en Informática",
    macroArea: "Datos, IA y Matemática",
    familia: "Datos, IA, estadística y matemática",
    universidades: [
    { nombre: "Instituto Tecnológico de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.itba.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad del CEMA", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.ucema.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de San Luis", provincia: "San Luis", web: "http://webfcfmyn.unsl.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_a_en_ciberseguridad",
    titulo: "Licenciado/a en Ciberseguridad",
    macroArea: "Seguridad, Criminalística y Defensa",
    familia: "Seguridad, criminalística y fuerzas",
    universidades: [
    { nombre: "Instituto Universitario de la Policía Federal Argentina", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.iupfa.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Palermo", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.palermo.edu", duracion: "4 años" },
    { nombre: "Universidad Nacional de Catamarca", provincia: "Catamarca", web: "http://www.unca.edu.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "t_cnico_universitario_en_desarrollo_de_v",
    titulo: "Técnico Universitario en Desarrollo de Videojuegos",
    macroArea: "Ingeniería Informática y Sistemas",
    familia: "Videojuegos y simulación",
    universidades: [
    { nombre: "Universidad Abierta Interamericana", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uai.edu.ar", duracion: "2.5 años" },
    { nombre: "Universidad Abierta Interamericana", provincia: "Santa Fé", web: "www.uai.edu.ar", duracion: "2.5 años" },
    { nombre: "Universidad Argentina de la Empresa", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uade.edu.ar", duracion: "3 años" }
    ],
  },
  {
    id: "licenciado_en_dise_o_gr_fico_2",
    titulo: "Licenciado en Diseño Gráfico",
    macroArea: "Arquitectura, Urbanismo y Construcción",
    familia: "Arquitectura, urbanismo y obra",
    universidades: [
    { nombre: "Universidad Argentina de la Empresa", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uade.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Belgrano", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.ub.edu.ar", duracion: "4 años" },
    { nombre: "Universidad del Salvador", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.usal.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "t_cnico_universitario_en_mecatr_nica",
    titulo: "Técnico Universitario en Mecatrónica",
    macroArea: "Ingeniería Mecánica, Electromecánica y Mecatrónica",
    familia: "Mecánica, electromecánica y mecatrónica",
    universidades: [
    { nombre: "Universidad Atlántida Argentina", provincia: "Buenos Aires", web: "https://www.atlantida.edu.ar/", duracion: "2.5 años" },
    { nombre: "Universidad Nacional de Entre Ríos", provincia: "Entre Ríos", web: "http://www.fcal.uner.edu.ar", duracion: "3 años" },
    { nombre: "Universidad Nacional de Rafaela", provincia: "Santa Fé", web: "www.unraf.edu.ar", duracion: "3 años" }
    ],
  },
  {
    id: "licenciado_en_higiene_y_seguridad_labora",
    titulo: "Licenciado en Higiene y Seguridad Laboral",
    macroArea: "Seguridad, Criminalística y Defensa",
    familia: "Seguridad, criminalística y fuerzas",
    universidades: [
    { nombre: "Universidad Autónoma de Entre Ríos", provincia: "Entre Ríos", web: "http://fcvs.uader.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Blas Pascal", provincia: "Córdoba", web: "http://www.ubp.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad del Norte Santo Tomás de Aquino", provincia: "Tucumán", web: "http://www.unsta.edu.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_a_en_ciencia_de_datos_md",
    titulo: "Licenciado/a en Ciencia de Datos - MD",
    macroArea: "Datos, IA y Matemática",
    familia: "Datos, IA, estadística y matemática",
    universidades: [
    { nombre: "Universidad CAECE", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.ucaece.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Católica de Salta", provincia: "Salta", web: "http://www.ucasal.net", duracion: "4 años" },
    { nombre: "Universidad Empresarial Siglo 21", provincia: "Córdoba", web: "http://www.21.edu.ar/", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_bioqu_mica",
    titulo: "Licenciado en Bioquímica",
    macroArea: "Química, Farmacia y Bioquímica",
    familia: "Laboratorio, farmacia y bioquímica",
    universidades: [
    { nombre: "Universidad Católica de Cuyo", provincia: "San Juan", web: "www.uccuyo.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de La Plata", provincia: "Buenos Aires", web: "www.exactas.unlp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de San Luis", provincia: "San Luis", web: "https://carreras.unsl.edu.ar/facultades/fqbyf/1", duracion: "5 años" }
    ],
  },
  {
    id: "t_cnico_universitario_en_producci_n_agro",
    titulo: "Técnico Universitario en Producción Agropecuaria",
    macroArea: "Agropecuarias y Producción Alimentaria",
    familia: "Agronomía, agro y producción",
    universidades: [
    { nombre: "Universidad Católica de Santa Fe", provincia: "Santa Fé", web: "www.ucsf.edu.ar/facultades/cienciasagropecuarias", duracion: "2.5 años" },
    { nombre: "Universidad Nacional de Misiones", provincia: "Misiones", web: "http://www.unam.edu.ar/", duracion: "3 años" },
    { nombre: "Universidad Nacional de San Antonio de Areco", provincia: "Buenos Aires", web: "https://www.unsada.edu.ar/", duracion: "3 años" }
    ],
  },
  {
    id: "t_cnico_a_universitario_a_en_automatizac",
    titulo: "Técnico/a Universitario/a en Automatización y Robótica",
    macroArea: "Ingeniería Eléctrica, Electrónica y Telecomunicaciones",
    familia: "Electrónica, electricidad y telecomunicaciones",
    universidades: [
    { nombre: "Universidad Católica de Santiago del Estero", provincia: "Jujuy", web: "http://www.ucse.edu.ar/web/jujuy/sede_jujuy.htm", duracion: "3 años" },
    { nombre: "Universidad del Norte Santo Tomás de Aquino", provincia: "Tucumán", web: "http://www.unsta.edu.ar/", duracion: "2.5 años" },
    { nombre: "Universidad Nacional del Litoral", provincia: "Santa Fé", web: "www.fich.unl.edu.ar", duracion: "3 años" }
    ],
  },
  {
    id: "t_cnico_universitario_en_higiene_y_segur",
    titulo: "Técnico Universitario en Higiene y Seguridad en el Trabajo",
    macroArea: "Seguridad, Criminalística y Defensa",
    familia: "Seguridad, criminalística y fuerzas",
    universidades: [
    { nombre: "Universidad Católica de Santiago del Estero", provincia: "Santiago Del Estero", web: "http://newsite.ucse.edu.ar/index.php/ucse-sedes/santiago-del-estero", duracion: "3 años" },
    { nombre: "Universidad Nacional de Cuyo", provincia: "Mendoza", web: "www.ituuncuyo.edu.ar", duracion: "2.5 años" },
    { nombre: "Universidad Nacional de San Luis", provincia: "San Luis", web: "https://carreras.unsl.edu.ar/facultades/fqbyf/1", duracion: "3 años" }
    ],
  },
  {
    id: "ingeniero_a_electr_nico_a",
    titulo: "Ingeniero/a Electrónico/a",
    macroArea: "Ingeniería Eléctrica, Electrónica y Telecomunicaciones",
    familia: "Electrónica, electricidad y telecomunicaciones",
    universidades: [
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "6 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "6 años" },
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.efn.uncor.edu", duracion: "5 años" }
    ],
  },
  {
    id: "ingeniero_a_mec_nico_a",
    titulo: "Ingeniero/a Mecánico/a",
    macroArea: "Ingeniería Mecánica, Electromecánica y Mecatrónica",
    familia: "Mecánica, electromecánica y mecatrónica",
    universidades: [
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5.5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5.5 años" },
    { nombre: "Universidad Nacional del Nordeste", provincia: "Chaco", web: "http://ing.unne.edu.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_a_en_dise_o_gr_fico",
    titulo: "Licenciado/a en Diseño Gráfico",
    macroArea: "Diseño y Creatividad",
    familia: "Diseño gráfico, industrial y digital",
    universidades: [
    { nombre: "Universidad de Flores", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uflo.edu.ar", duracion: "4 años" },
    { nombre: "Universidad del Cine", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.ucine.edu.ar", duracion: "5 años" },
    { nombre: "Universidad de San Isidro \"Dr. Plácido Marín\"", provincia: "Buenos Aires", web: "www.usi.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_dise_o_de_indumentaria",
    titulo: "Licenciado en Diseño de Indumentaria",
    macroArea: "Diseño y Creatividad",
    familia: "Diseño gráfico, industrial y digital",
    universidades: [
    { nombre: "Universidad del Este", provincia: "Buenos Aires", web: "www.ude.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Morón", provincia: "Córdoba", web: "www.unimoron.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Morón", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.unimoron.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "ingeniero_en_transporte",
    titulo: "Ingeniero en Transporte",
    macroArea: "Ingeniería y Tecnología",
    familia: "Ingenierías generales",
    universidades: [
    { nombre: "Universidad Nacional Arturo Jauretche", provincia: "Buenos Aires", web: "http://www.unaj.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Entre Ríos", provincia: "Entre Ríos", web: "http://ingenieria.uner.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de San Martín", provincia: "Buenos Aires", web: "www.unsam.edu.ar", duracion: "5.5 años" }
    ],
  },
  {
    id: "ingeniero_de_minas",
    titulo: "Ingeniero de Minas",
    macroArea: "Ingeniería y Tecnología",
    familia: "Ingenierías generales",
    universidades: [
    { nombre: "Universidad Nacional de Catamarca", provincia: "Catamarca", web: "http://tecno.unca.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Jujuy", provincia: "Jujuy", web: "https://www.fi.unju.edu.ar/extensiones-aulicas/", duracion: "5 años" },
    { nombre: "Universidad Nacional de San Juan", provincia: "San Juan", web: "http://www.fi.unsj.edu.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_geolog_a",
    titulo: "Licenciado en Geología",
    macroArea: "Ciencias Exactas y Naturales",
    familia: "Física, ciencias básicas y aplicadas",
    universidades: [
    { nombre: "Universidad Nacional de Catamarca", provincia: "Catamarca", web: "http://tecno.unca.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Cuyo", provincia: "Mendoza", web: "www.fcen.uncuyo.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de La Pampa", provincia: "La Pampa", web: "www.exactas.unlpam.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "ingeniero_a_mecatr_nico_a",
    titulo: "Ingeniero/a Mecatrónico/a",
    macroArea: "Ingeniería Mecánica, Electromecánica y Mecatrónica",
    familia: "Mecánica, electromecánica y mecatrónica",
    universidades: [
    { nombre: "Universidad Nacional de Cuyo", provincia: "Mendoza", web: "ingenieria.uncuyo.edu.ar", duracion: "5.5 años" },
    { nombre: "Universidad Nacional de La Pampa", provincia: "La Pampa", web: "www.ing.unlpam.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Misiones", provincia: "Misiones", web: "http://www.fio.unam.edu.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "t_cnico_universitario_en_mantenimiento_i",
    titulo: "Técnico Universitario en Mantenimiento Industrial",
    macroArea: "Ingeniería Industrial y Producción",
    familia: "Industrial, procesos y logística",
    universidades: [
    { nombre: "Universidad Nacional de Entre Ríos", provincia: "Entre Ríos", web: "http://www.fcal.uner.edu.ar", duracion: "3 años" },
    { nombre: "Universidad Nacional de San Antonio de Areco", provincia: "Buenos Aires", web: "https://www.unsada.edu.ar/", duracion: "2.5 años" },
    { nombre: "Universidad Nacional de San Luis", provincia: "San Luis", web: "https://carreras.unsl.edu.ar/facultades/fica/1", duracion: "3 años" }
    ],
  },
  {
    id: "licenciada_o_en_ciencia_de_datos",
    titulo: "Licenciada/o en Ciencia de Datos",
    macroArea: "Datos, IA y Matemática",
    familia: "Datos, IA, estadística y matemática",
    universidades: [
    { nombre: "Universidad Nacional de Entre Ríos", provincia: "Entre Ríos", web: "http://ingenieria.uner.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional del Litoral", provincia: "Santa Fé", web: "www.fiq.unl.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de San Martín", provincia: "Buenos Aires", web: "www.unsam.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "ingeniero_metal_rgico",
    titulo: "Ingeniero Metalúrgico",
    macroArea: "Ingeniería y Tecnología",
    familia: "Ingenierías generales",
    universidades: [
    { nombre: "Universidad Nacional de Hurlingham", provincia: "Buenos Aires", web: "http://www.unahur.edu.ar/es/instituto-tecnologia-e-ingenieria", duracion: "5 años" },
    { nombre: "Universidad Tecnológica Nacional", provincia: "Córdoba", web: "www.frc.utn.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Tecnológica Nacional", provincia: "Buenos Aires", web: "www.frsn.utn.edu.ar/frsn/", duracion: "5 años" }
    ],
  },
  {
    id: "ingeniero_en_petr_leo",
    titulo: "Ingeniero en Petróleo",
    macroArea: "Ingeniería y Tecnología",
    familia: "Energía, petróleo y naval",
    universidades: [
    { nombre: "Universidad Nacional de la Patagonia San Juan Bosco", provincia: "Chubut", web: "www.unp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Comahue", provincia: "Río Negro", web: "http://app.crub.uncoma.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Comahue", provincia: "Neuquén", web: "http://fainweb.uncoma.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_biotecnolog_a_2",
    titulo: "Licenciado en Biotecnología",
    macroArea: "Química, Farmacia y Bioquímica",
    familia: "Laboratorio, farmacia y bioquímica",
    universidades: [
    { nombre: "Universidad Nacional de Rosario", provincia: "Santa Fé", web: "www.fbioyf.unr.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de San Luis", provincia: "San Luis", web: "https://carreras.unsl.edu.ar/facultades/fqbyf/1", duracion: "5 años" },
    { nombre: "Universidad Nacional de Tucumán", provincia: "Tucumán", web: "www.unt.edu.ar/facbioq", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_biolog_a",
    titulo: "Licenciado en Biología",
    macroArea: "Ciencias Biológicas y Biotecnología",
    familia: "Biología, genética y biotecnología",
    universidades: [
    { nombre: "Universidad Autónoma de Entre Ríos", provincia: "Entre Ríos", web: "http://fcyt.uader.edu.ar/web/", duracion: "4 años" },
    { nombre: "Universidad Nacional de San Juan", provincia: "San Juan", web: "www.vallessanjuaninos.unsj.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Tierra del Fuego, Antártida e Islas del Atlántico Sur", provincia: "Tierra Del Fuego", web: "www.untdf.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_a_en_f_sica",
    titulo: "Licenciado/a en Física",
    macroArea: "Ciencias Exactas y Naturales",
    familia: "Física, ciencias básicas y aplicadas",
    universidades: [
    { nombre: "Universidad Nacional de Cuyo", provincia: "Río Negro", web: "www.ib.edu.ar", duracion: "5.5 años" },
    { nombre: "Universidad Nacional de San Juan", provincia: "San Juan", web: "http://www.exactas.unsj.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Tucumán", provincia: "Tucumán", web: "www.herrera.unt.edu.ar/facet", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_a_en_enfermer_a_2",
    titulo: "Licenciado/a en Enfermería",
    macroArea: "Seguridad, Criminalística y Defensa",
    familia: "Seguridad, criminalística y fuerzas",
    universidades: [
    { nombre: "Instituto Universitario de la Policía Federal Argentina", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.iupfa.edu.ar", duracion: "5 años" },
    { nombre: "Universidad de la Defensa Nacional", provincia: "Buenos Aires", web: "https://fe.undef.edu.ar/cmn-colegio-militar-de-la-nacion/", duracion: "4 años" },
    { nombre: "Universidad de la Defensa Nacional", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://fe.undef.edu.ar/", duracion: "4 años" }
    ],
  },
  {
    id: "profesor_universitario_en_psicopedagog_a",
    titulo: "Profesor Universitario en Psicopedagogía",
    macroArea: "Psicología y Comportamiento Humano",
    familia: "Psicopedagogía",
    universidades: [
    { nombre: "Universidad Abierta Interamericana", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uai.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Abierta Interamericana", provincia: "Santa Fé", web: "www.uai.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Lomas de Zamora", provincia: "Buenos Aires", web: "http://www.sociales.unlz.edu.ar", duracion: "4.5 años" }
    ],
  },
  {
    id: "licenciado_en_actividad_f_sica_y_deporte",
    titulo: "Licenciado en Actividad Física y Deporte",
    macroArea: "Ciencias Exactas y Naturales",
    familia: "Física, ciencias básicas y aplicadas",
    universidades: [
    { nombre: "Universidad Abierta Interamericana", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uai.edu.ar", duracion: "5 años" },
    { nombre: "Universidad de Flores", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uflo.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Flores", provincia: "Río Negro", web: "www.uflo.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "profesor_de_teatro",
    titulo: "Profesor de Teatro",
    macroArea: "Arte, Música y Audiovisual",
    familia: "Arte, música, teatro y audiovisual",
    universidades: [
    { nombre: "Universidad Autónoma de Entre Ríos", provincia: "Entre Ríos", web: "http://fhaycs-uader.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional del Centro de la Provincia de Buenos Aires", provincia: "Buenos Aires", web: "www.arte.unicen.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de San Juan", provincia: "San Juan", web: "http://www.ffha.unsj.edu.ar/", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_filosof_a_2",
    titulo: "Licenciado en Filosofía",
    macroArea: "Arte, Música y Audiovisual",
    familia: "Arte, música, teatro y audiovisual",
    universidades: [
    { nombre: "Universidad Autónoma de Entre Ríos", provincia: "Entre Ríos", web: "http://fhaycs-uader.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de Rosario", provincia: "Santa Fé", web: "www.fhumyar.unr.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de San Juan", provincia: "San Juan", web: "http://www.ffha.unsj.edu.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_historia_2",
    titulo: "Licenciado en Historia",
    macroArea: "Arte, Música y Audiovisual",
    familia: "Arte, música, teatro y audiovisual",
    universidades: [
    { nombre: "Universidad Autónoma de Entre Ríos", provincia: "Entre Ríos", web: "http://fhaycs-uader.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Rosario", provincia: "Santa Fé", web: "www.fhumyar.unr.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de San Juan", provincia: "San Juan", web: "http://www.ffha.unsj.edu.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "profesor_en_filosof_a_2",
    titulo: "Profesor en Filosofía",
    macroArea: "Arte, Música y Audiovisual",
    familia: "Arte, música, teatro y audiovisual",
    universidades: [
    { nombre: "Universidad Autónoma de Entre Ríos", provincia: "Entre Ríos", web: "http://fhaycs-uader.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de Rosario", provincia: "Santa Fé", web: "www.fhumyar.unr.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de San Juan", provincia: "San Juan", web: "http://www.ffha.unsj.edu.ar/", duracion: "4.5 años" }
    ],
  },
  {
    id: "licenciado_a_en_psicolog_a",
    titulo: "Licenciado/a en Psicología",
    macroArea: "Psicología y Comportamiento Humano",
    familia: "Psicología",
    universidades: [
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.psi.uba.ar", duracion: "6 años" },
    { nombre: "Universidad de la Cuenca del Plata", provincia: "Corrientes", web: "www.ucp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad de San Isidro \"Dr. Plácido Marín\"", provincia: "Buenos Aires", web: "www.usi.edu.ar", duracion: "4.5 años" }
    ],
  },
  {
    id: "licenciado_en_ciencias_de_la_educaci_n_c",
    titulo: "Licenciado en Ciencias de la Educación con orientación en Gestión de Instituciones Educativas",
    macroArea: "Administración y Negocios",
    familia: "Administración, gestión y negocios",
    universidades: [
    { nombre: "Universidad de Congreso", provincia: "Córdoba", web: "http://www.ucongreso.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad de Congreso", provincia: "Mendoza", web: "http://www.ucongreso.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad de Congreso", provincia: "San Juan", web: "http://www.ucongreso.edu.ar/", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_a_en_ciencias_del_comportamie",
    titulo: "Licenciado/a en Ciencias del Comportamiento",
    macroArea: "Psicología y Comportamiento Humano",
    familia: "Psicología",
    universidades: [
    { nombre: "Universidad de Palermo", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.palermo.edu", duracion: "4 años" },
    { nombre: "Universidad de San Andrés", provincia: "Buenos Aires", web: "www.udesa.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Torcuato Di Tella", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.utdt.edu", duracion: "4 años" }
    ],
  },
  {
    id: "psic_logo",
    titulo: "Psicólogo",
    macroArea: "Psicología y Comportamiento Humano",
    familia: "Psicología",
    universidades: [
    { nombre: "Universidad Nacional del Comahue", provincia: "Río Negro", web: "http://faceweb.uncoma.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Rosario", provincia: "Santa Fé", web: "www.fpsico.unr.edu.ar", duracion: "6 años" },
    { nombre: "Universidad Nacional de Tucumán", provincia: "Tucumán", web: "www.psicologia.unt.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_seguridad_p_blica",
    titulo: "Licenciado en Seguridad Pública",
    macroArea: "Seguridad, Criminalística y Defensa",
    familia: "Seguridad, criminalística y fuerzas",
    universidades: [
    { nombre: "Instituto Universitario de Gendarmería Nacional", provincia: "Buenos Aires", web: "http://www.gendarmeria.gov.ar/", duracion: "4 años" },
    { nombre: "Universidad Autónoma de Entre Ríos", provincia: "Entre Ríos", web: "www.fcytcdelu.uader.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de Cuyo", provincia: "Mendoza", web: "www.iusp.uncuyo.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "t_cnico_a_universitario_a_en_investigaci",
    titulo: "Técnico/a Universitario/a en Investigación Criminal",
    macroArea: "Seguridad, Criminalística y Defensa",
    familia: "Seguridad, criminalística y fuerzas",
    universidades: [
    { nombre: "Instituto Universitario de la Policía Federal Argentina", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.iupfa.edu.ar", duracion: "3 años" },
    { nombre: "Instituto Universitario de Seguridad", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://iuse.edu.ar/", duracion: "2.5 años" },
    { nombre: "Universidad Nacional del Oeste", provincia: "Buenos Aires", web: "www.uno.edu.ar", duracion: "2.5 años" }
    ],
  },
  {
    id: "licenciado_a_en_relaciones_p_blicas",
    titulo: "Licenciado/a en Relaciones Públicas",
    macroArea: "Marketing, Publicidad y Comercialización",
    familia: "Marketing, publicidad y ventas",
    universidades: [
    { nombre: "Instituto Universitario Escuela Argentina de Negocios", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://www.iuean.edu.ar", duracion: "4 años" },
    { nombre: "Instituto Universitario Escuela Argentina de Negocios", provincia: "Buenos Aires", web: "http://www.ean.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Católica de La Plata", provincia: "Buenos Aires", web: "www.ucalp.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_administraci_n_de_empresas_2",
    titulo: "Licenciado en Administración de Empresas",
    macroArea: "Economía y Finanzas",
    familia: "Economía, finanzas y banca",
    universidades: [
    { nombre: "Instituto Universitario Escuela Superior de Economía y Administración de Empresas", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.eseade.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Católica de Salta", provincia: "Salta", web: "http://www.ucasal.net", duracion: "4 años" },
    { nombre: "Universidad del Norte Santo Tomás de Aquino", provincia: "Tucumán", web: "http://www.unsta.edu.ar/", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_comunicaci_n_digital_e_int",
    titulo: "Licenciado en Comunicación Digital e Interactiva",
    macroArea: "Comunicación y Medios",
    familia: "Comunicación y medios digitales",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uca.edu.ar", duracion: "4 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Mendoza", web: "http://uca.edu.ar/es/facultades/facultad-de-humanidades-y-ciencias-economicas", duracion: "4 años" },
    { nombre: "Universidad Argentina de la Empresa", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uade.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "t_cnico_universitario_en_derecho",
    titulo: "Técnico Universitario en Derecho",
    macroArea: "Derecho y Ciencias Jurídicas",
    familia: "Derecho, notariado y bienes",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uca.edu.ar", duracion: "3 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Santa Fé", web: "www.uca.edu.ar", duracion: "3 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Entre Ríos", web: "www.uca.edu.ar", duracion: "3 años" }
    ],
  },
  {
    id: "t_cnico_universitario_en_periodismo_depo",
    titulo: "Técnico Universitario en Periodismo Deportivo",
    macroArea: "Comunicación y Medios",
    familia: "Periodismo y redacción",
    universidades: [
    { nombre: "Universidad Abierta Interamericana", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uai.edu.ar", duracion: "1.5 años" },
    { nombre: "Universidad Abierta Interamericana", provincia: "Santa Fé", web: "www.uai.edu.ar", duracion: "3 años" },
    { nombre: "Universidad Argentina de la Empresa", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uade.edu.ar", duracion: "2.5 años" }
    ],
  },
  {
    id: "licenciado_en_turismo_y_hoteler_a",
    titulo: "Licenciado en Turismo y Hotelería",
    macroArea: "Turismo, Gastronomía y Hospitalidad",
    familia: "Turismo, hotelería, eventos y gastronomía",
    universidades: [
    { nombre: "Universidad Argentina de la Empresa", provincia: "Buenos Aires", web: "www.uade.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Católica de Cuyo", provincia: "San Juan", web: "www.uccuyo.edu.ar", duracion: "4 años" },
    { nombre: "Universidad del Aconcagua", provincia: "Mendoza", web: "www.uda.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_publicidad_md",
    titulo: "Licenciado en Publicidad - MD",
    macroArea: "Marketing, Publicidad y Comercialización",
    familia: "Marketing, publicidad y ventas",
    universidades: [
    { nombre: "Universidad Argentina John F. Kennedy", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://www.kennedy.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Blas Pascal", provincia: "Córdoba", web: "http://www.ubp.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Empresarial Siglo 21", provincia: "Córdoba", web: "http://www.21.edu.ar/", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_relaciones_internacionales_3",
    titulo: "Licenciado en Relaciones Internacionales - MD",
    macroArea: "Gobierno, Política y Relaciones Internacionales",
    familia: "Gobierno, política y RRII",
    universidades: [
    { nombre: "Universidad Blas Pascal", provincia: "Córdoba", web: "http://www.ubp.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Católica de Salta", provincia: "Salta", web: "http://www.ucasal.net", duracion: "4 años" },
    { nombre: "Universidad Empresarial Siglo 21", provincia: "Córdoba", web: "http://www.21.edu.ar/", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_seguridad",
    titulo: "Licenciado en Seguridad",
    macroArea: "Seguridad, Criminalística y Defensa",
    familia: "Seguridad, criminalística y fuerzas",
    universidades: [
    { nombre: "Universidad Blas Pascal", provincia: "Córdoba", web: "http://www.ubp.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad de Morón", provincia: "Buenos Aires", web: "www.unimoron.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Morón", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.unimoron.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_ciencia_pol_tica_3",
    titulo: "Licenciado en Ciencia Política",
    macroArea: "Gobierno, Política y Relaciones Internacionales",
    familia: "Gobierno, política y RRII",
    universidades: [
    { nombre: "Universidad Católica de Córdoba", provincia: "Córdoba", web: "www.ucc.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de Rosario", provincia: "Santa Fé", web: "www.fcpolit.unr.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de San Martín", provincia: "Buenos Aires", web: "www.unsam.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_comercializaci_n_2",
    titulo: "Licenciado en Comercialización",
    macroArea: "Economía y Finanzas",
    familia: "Economía, finanzas y banca",
    universidades: [
    { nombre: "Universidad Católica de Salta", provincia: "Salta", web: "http://www.ucasal.net", duracion: "4 años" },
    { nombre: "Universidad del Norte Santo Tomás de Aquino", provincia: "Tucumán", web: "http://www.unsta.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad de Morón", provincia: "Buenos Aires", web: "www.unimoron.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_recursos_humanos_2",
    titulo: "Licenciado en Recursos Humanos",
    macroArea: "Economía y Finanzas",
    familia: "Economía, finanzas y banca",
    universidades: [
    { nombre: "Universidad Católica de Salta", provincia: "Salta", web: "http://www.ucasal.net", duracion: "4 años" },
    { nombre: "Universidad del Norte Santo Tomás de Aquino", provincia: "Tucumán", web: "http://www.unsta.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad de Morón", provincia: "Buenos Aires", web: "www.unimoron.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_a_en_relaciones_internacional",
    titulo: "Licenciado/a en Relaciones Internacionales",
    macroArea: "Gobierno, Política y Relaciones Internacionales",
    familia: "Gobierno, política y RRII",
    universidades: [
    { nombre: "Universidad Católica de Santiago del Estero", provincia: "Jujuy", web: "http://www.ucse.edu.ar/web/jujuy/sede_jujuy.htm", duracion: "4 años" },
    { nombre: "Universidad Católica de Santiago del Estero", provincia: "Santiago Del Estero", web: "http://www.ucse.edu.ar/web/sede_sgo/fcpsj/sc%20fcpsj.htm", duracion: "4 años" },
    { nombre: "Universidad Nacional de Entre Ríos", provincia: "Entre Ríos", web: "http://www.fts.uner.edu.ar/", duracion: "4 años" }
    ],
  },
  {
    id: "procurador_a_md",
    titulo: "Procurador/a - MD",
    macroArea: "Derecho y Ciencias Jurídicas",
    familia: "Derecho, notariado y bienes",
    universidades: [
    { nombre: "Universidad Champagnat", provincia: "Mendoza", web: "https://www.uch.edu.ar", duracion: "3 años" },
    { nombre: "Universidad de Concepción del Uruguay", provincia: "Entre Ríos", web: "www.ucu.edu.ar", duracion: "3 años" },
    { nombre: "Universidad de la Cuenca del Plata", provincia: "Corrientes", web: "http://www.ucp.edu.ar", duracion: "45 años" }
    ],
  },
  {
    id: "licenciado_en_ciencia_pol_tica_4",
    titulo: "Licenciado en Ciencia Política",
    macroArea: "Humanidades, Filosofía y Religión",
    familia: "Filosofía, historia y humanidades",
    universidades: [
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.filo.uba.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Mar del Plata", provincia: "Buenos Aires", web: "http://www.mdp.edu.ar/humanidades/", duracion: "4.5 años" },
    { nombre: "Universidad Nacional de Río Cuarto", provincia: "Córdoba", web: "www.unrc.edu.ar; www.hum.unrc.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "actuario",
    titulo: "Actuario",
    macroArea: "Economía y Finanzas",
    familia: "Economía, finanzas y banca",
    universidades: [
    { nombre: "Universidad del CEMA", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.ucema.edu.ar", duracion: "4 años" },
    { nombre: "Universidad del Salvador", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.usal.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Empresarial Siglo 21", provincia: "Córdoba", web: "http://www.21.edu.ar/", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_sociolog_a_md",
    titulo: "Licenciado en Sociología - MD",
    macroArea: "Ciencias Sociales y Comunitarias",
    familia: "Sociología, trabajo social y comunidad",
    universidades: [
    { nombre: "Universidad Empresarial Siglo 21", provincia: "Córdoba", web: "http://www.21.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional del Chaco Austral", provincia: "Chaco", web: "www.uncaus.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de Tres de Febrero", provincia: "Buenos Aires", web: "http://www.untrefvirtual.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "martillero_y_corredor_p_blico",
    titulo: "Martillero y Corredor Público",
    macroArea: "Derecho y Ciencias Jurídicas",
    familia: "Derecho, notariado y bienes",
    universidades: [
    { nombre: "Universidad Empresarial Siglo 21", provincia: "Córdoba", web: "www.21.edu.ar", duracion: "2 años" },
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.cnm.unc.edu.ar", duracion: "3 años" },
    { nombre: "Universidad Nacional de San Luis", provincia: "San Luis", web: "https://carreras.unsl.edu.ar/facultades/fcejs/1", duracion: "3 años" }
    ],
  },
  {
    id: "t_cnico_a_universitario_a_en_contabilida",
    titulo: "Técnico/a Universitario/a en Contabilidad",
    macroArea: "Contabilidad e Impuestos",
    familia: "Contabilidad, auditoría e impuestos",
    universidades: [
    { nombre: "Universidad Nacional de Catamarca", provincia: "Catamarca", web: "http://www.unca.edu.ar/", duracion: "3 años" },
    { nombre: "Universidad Nacional de Salta", provincia: "Salta", web: "http://www.unsa.edu.ar/", duracion: "3 años" },
    { nombre: "Universidad Nacional de Villa María", provincia: "Córdoba", web: "http://www.unvm.edu.ar", duracion: "3 años" }
    ],
  },
  {
    id: "licenciado_en_econom_a_pol_tica",
    titulo: "Licenciado en Economía Política",
    macroArea: "Economía y Finanzas",
    familia: "Economía, finanzas y banca",
    universidades: [
    { nombre: "Universidad Nacional de General Sarmiento", provincia: "Buenos Aires", web: "www.ungs.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Jujuy", provincia: "Jujuy", web: "https://www.fce.unju.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de Lanús", provincia: "Buenos Aires", web: "www.unla.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_a_en_biotecnolog_a",
    titulo: "Licenciado/a en Biotecnología",
    macroArea: "Ciencias Biológicas y Biotecnología",
    familia: "Biología, genética y biotecnología",
    universidades: [
    { nombre: "Instituto Universitario para el Desarrollo Productivo y Tecnológico Empresarial de la Argentina", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.iudpt.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.fcq.unc.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "t_cnico_a_universitario_a_en_biotecnolog",
    titulo: "Técnico/a Universitario/a en Biotecnología",
    macroArea: "Ciencias Biológicas y Biotecnología",
    familia: "Biología, genética y biotecnología",
    universidades: [
    { nombre: "Instituto Universitario para el Desarrollo Productivo y Tecnológico Empresarial de la Argentina", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.iudpt.edu.ar", duracion: "3 años" },
    { nombre: "Universidad Nacional de Rafaela", provincia: "Santa Fé", web: "www.unraf.edu.ar", duracion: "2.5 años" }
    ],
  },
  {
    id: "t_cnico_a_universitario_a_en_ciencia_de",
    titulo: "Técnico/a Universitario/a en Ciencia de Datos",
    macroArea: "Datos, IA y Matemática",
    familia: "Datos, IA, estadística y matemática",
    universidades: [
    { nombre: "Universidad Atlántida Argentina", provincia: "Buenos Aires", web: "https://www.atlantida.edu.ar/", duracion: "3 años" },
    { nombre: "Universidad Nacional de Mar del Plata", provincia: "Buenos Aires", web: "http://www.mdp.edu.ar/exactas/", duracion: "3 años" }
    ],
  },
  {
    id: "licenciado_a_en_ciencia_de_datos",
    titulo: "Licenciado/a en Ciencia de Datos",
    macroArea: "Datos, IA y Matemática",
    familia: "Datos, IA, estadística y matemática",
    universidades: [
    { nombre: "Universidad Austral", provincia: "Buenos Aires", web: "http://www.austral.edu.ar/ingenieria/", duracion: "4 años" },
    { nombre: "Universidad Nacional de Rosario", provincia: "Santa Fé", web: "www.fcecon.unr.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_enolog_a",
    titulo: "Licenciado en Enología",
    macroArea: "Agropecuarias y Producción Alimentaria",
    familia: "Agronomía, agro y producción",
    universidades: [
    { nombre: "Universidad Católica de Cuyo", provincia: "San Juan", web: "www.uccuyo.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Católica de Cuyo", provincia: "Mendoza", web: "www.uccuyo.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_dise_o_de_la_comunicaci_n",
    titulo: "Licenciado en Diseño de la Comunicación Visual",
    macroArea: "Diseño y Creatividad",
    familia: "Diseño gráfico, industrial y digital",
    universidades: [
    { nombre: "Universidad Católica de Santiago del Estero", provincia: "Santa Fé", web: "http://www.ucse.edu.ar/web/rafaela/sede_rafaela.htm", duracion: "4 años" },
    { nombre: "Universidad Católica de Santiago del Estero", provincia: "Jujuy", web: "http://www.ucse.edu.ar/web/jujuy/sede_jujuy.htm", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_tecnolog_a_de_alimentos",
    titulo: "Licenciado en Tecnología de Alimentos",
    macroArea: "Ingeniería Química y de Alimentos",
    familia: "Química, alimentos y procesos",
    universidades: [
    { nombre: "Universidad de Belgrano", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.ub.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional del Comahue", provincia: "Río Negro", web: "http://factaweb.uncoma.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "dise_ador_de_imagen_y_sonido",
    titulo: "Diseñador de Imagen y Sonido",
    macroArea: "Arte, Música y Audiovisual",
    familia: "Arte, música, teatro y audiovisual",
    universidades: [
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "dise_ador_de_indumentaria",
    titulo: "Diseñador de Indumentaria",
    macroArea: "Diseño y Creatividad",
    familia: "Diseño gráfico, industrial y digital",
    universidades: [
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "dise_ador_textil",
    titulo: "Diseñador Textil",
    macroArea: "Diseño y Creatividad",
    familia: "Diseño gráfico, industrial y digital",
    universidades: [
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "ingeniero_de_alimentos",
    titulo: "Ingeniero de Alimentos",
    macroArea: "Ingeniería Química y de Alimentos",
    familia: "Química, alimentos y procesos",
    universidades: [
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "6 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "6 años" }
    ],
  },
  {
    id: "licenciado_en_ciencias_de_la_atm_sfera",
    titulo: "Licenciado en Ciencias de la Atmósfera",
    macroArea: "Ambiente y Recursos Naturales",
    familia: "Ambiente, biodiversidad y recursos naturales",
    universidades: [
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_planificaci_n_y_dise_o_del",
    titulo: "Licenciado en Planificación y Diseño del Paisaje",
    macroArea: "Diseño y Creatividad",
    familia: "Diseño gráfico, industrial y digital",
    universidades: [
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_ciencias_geol_gicas",
    titulo: "Licenciado en Ciencias Geológicas",
    macroArea: "Ciencias Exactas y Naturales",
    familia: "Física, ciencias básicas y aplicadas",
    universidades: [
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.exactas.uba.ar", duracion: "6 años" },
    { nombre: "Universidad Nacional de San Juan", provincia: "San Juan", web: "http://www.exactas.unsj.edu.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "ingeniero_agr_nomo_2",
    titulo: "Ingeniero Agrónomo",
    macroArea: "Veterinaria",
    familia: "Veterinaria y salud animal",
    universidades: [
    { nombre: "Universidad de Ciencias Empresariales y Sociales", provincia: "Buenos Aires", web: "www.uces.edu.ar", duracion: "4.5 años" },
    { nombre: "Universidad Nacional de Río Cuarto", provincia: "Córdoba", web: "www.unrc.edu.ar, www.ayv.unrc.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_a_en_dise_o_y_comunicaci_n",
    titulo: "Licenciado/a en Diseño y Comunicación",
    macroArea: "Diseño y Creatividad",
    familia: "Diseño gráfico, industrial y digital",
    universidades: [
    { nombre: "Universidad de Ciencias Empresariales y Sociales", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uces.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Ciencias Empresariales y Sociales", provincia: "Buenos Aires", web: "www.uces.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_seguridad_higiene_y_contro",
    titulo: "Licenciado en Seguridad, Higiene y Control Ambiental Laboral",
    macroArea: "Seguridad, Criminalística y Defensa",
    familia: "Seguridad, criminalística y fuerzas",
    universidades: [
    { nombre: "Universidad de Flores", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uflo.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Flores", provincia: "Río Negro", web: "www.uflo.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "ingeniero_aeron_utico",
    titulo: "Ingeniero Aeronáutico",
    macroArea: "Seguridad, Criminalística y Defensa",
    familia: "Seguridad, criminalística y fuerzas",
    universidades: [
    { nombre: "Universidad de la Defensa Nacional", provincia: "Córdoba", web: "https://www.iua.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Tecnológica Nacional", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.frba.utn.edu.ar/", duracion: "5.5 años" }
    ],
  },
  {
    id: "ingeniero_electr_nico_2",
    titulo: "Ingeniero Electrónico",
    macroArea: "Seguridad, Criminalística y Defensa",
    familia: "Seguridad, criminalística y fuerzas",
    universidades: [
    { nombre: "Universidad de la Defensa Nacional", provincia: "Córdoba", web: "https://www.iua.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad de la Defensa Nacional", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://www.fie.undef.edu.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "ingeniero_en_inform_tica_3",
    titulo: "Ingeniero en Informática",
    macroArea: "Seguridad, Criminalística y Defensa",
    familia: "Seguridad, criminalística y fuerzas",
    universidades: [
    { nombre: "Universidad de la Defensa Nacional", provincia: "Córdoba", web: "https://www.iua.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad de la Defensa Nacional", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://www.fie.undef.edu.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_cartograf_a",
    titulo: "Licenciado en Cartografía",
    macroArea: "Seguridad, Criminalística y Defensa",
    familia: "Seguridad, criminalística y fuerzas",
    universidades: [
    { nombre: "Universidad de la Defensa Nacional", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.undef.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad de la Defensa Nacional", provincia: "Buenos Aires", web: "https://fadara.armada.mil.ar/", duracion: "4 años" }
    ],
  },
  {
    id: "t_cnico_a_universitario_a_en_ciencia_de_2",
    titulo: "Técnico/a Universitario/a en Ciencia de Datos - MD",
    macroArea: "Datos, IA y Matemática",
    familia: "Datos, IA, estadística y matemática",
    universidades: [
    { nombre: "Universidad del Gran Rosario", provincia: "Santa Fé", web: "http://www.ugr.edu.ar/", duracion: "2.5 años" },
    { nombre: "Universidad Nacional de Chilecito", provincia: "La Rioja", web: "www.undec.edu.ar", duracion: "2 años" }
    ],
  },
  {
    id: "dise_ador_de_interiores",
    titulo: "Diseñador de Interiores",
    macroArea: "Arquitectura, Urbanismo y Construcción",
    familia: "Arquitectura, urbanismo y obra",
    universidades: [
    { nombre: "Universidad de Mendoza", provincia: "Mendoza", web: "http://www.um.edu.ar", duracion: "3 años" },
    { nombre: "Universidad de Palermo", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.palermo.edu", duracion: "4 años" }
    ],
  },
  {
    id: "dise_ador_de_indumentaria_y_textil",
    titulo: "Diseñador de Indumentaria y Textil",
    macroArea: "Diseño y Creatividad",
    familia: "Diseño gráfico, industrial y digital",
    universidades: [
    { nombre: "Universidad de Mendoza", provincia: "Córdoba", web: "http://www.um.edu.ar/", duracion: "3 años" },
    { nombre: "Universidad de Mendoza", provincia: "Mendoza", web: "http://www.um.edu.ar", duracion: "3 años" }
    ],
  },
  {
    id: "licenciado_en_dise_o_de_indumentaria_y_t",
    titulo: "Licenciado en Diseño de Indumentaria y Textil",
    macroArea: "Diseño y Creatividad",
    familia: "Diseño gráfico, industrial y digital",
    universidades: [
    { nombre: "Universidad Empresarial Siglo 21", provincia: "Córdoba", web: "http://www.21.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional del Noroeste de la Provincia de Buenos Aires", provincia: "Buenos Aires", web: "www.unnoba.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "t_cnico_universitario_en_dise_o_de_indum",
    titulo: "Técnico Universitario en Diseño de Indumentaria y Textil",
    macroArea: "Diseño y Creatividad",
    familia: "Diseño gráfico, industrial y digital",
    universidades: [
    { nombre: "Universidad Empresarial Siglo 21", provincia: "Córdoba", web: "www.21.edu.ar", duracion: "3 años" },
    { nombre: "Universidad Nacional de San Juan", provincia: "San Juan", web: "www.vallessanjuaninos.unsj.edu.ar", duracion: "2.5 años" }
    ],
  },
  {
    id: "ingeniero_a_electromec_nico_a",
    titulo: "Ingeniero/a Electromecánico/a",
    macroArea: "Ingeniería Mecánica, Electromecánica y Mecatrónica",
    familia: "Mecánica, electromecánica y mecatrónica",
    universidades: [
    { nombre: "Universidad Nacional Arturo Jauretche", provincia: "Buenos Aires", web: "http://www.unaj.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de General Sarmiento", provincia: "Buenos Aires", web: "www.ungs.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_bromatolog_a_2",
    titulo: "Licenciado en Bromatología",
    macroArea: "Química, Farmacia y Bioquímica",
    familia: "Laboratorio, farmacia y bioquímica",
    universidades: [
    { nombre: "Universidad Nacional de Catamarca", provincia: "Catamarca", web: "http://www.unca.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Formosa", provincia: "Formosa", web: "www.unf.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_ciencias_de_la_computaci_n_2",
    titulo: "Licenciado en Ciencias de la Computación",
    macroArea: "Datos, IA y Matemática",
    familia: "Datos, IA, estadística y matemática",
    universidades: [
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.famaf.unc.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de San Luis", provincia: "San Luis", web: "http://webfcfmyn.unsl.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_astronom_a",
    titulo: "Licenciado en Astronomía",
    macroArea: "Ciencias Exactas y Naturales",
    familia: "Física, ciencias básicas y aplicadas",
    universidades: [
    { nombre: "Universidad Nacional de La Plata", provincia: "Buenos Aires", web: "www.fcaglp.unlp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de San Juan", provincia: "San Juan", web: "http://www.exactas.unsj.edu.ar/", duracion: "4 años" }
    ],
  },
  {
    id: "ingeniero_en_alimentos_2",
    titulo: "Ingeniero en Alimentos",
    macroArea: "Ingeniería Industrial y Producción",
    familia: "Industrial, procesos y logística",
    universidades: [
    { nombre: "Universidad Nacional de La Rioja", provincia: "La Rioja", web: "www.unlar.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de San Martín", provincia: "Buenos Aires", web: "http://www.inti.gov.ar/incalin/", duracion: "5.5 años" }
    ],
  },
  {
    id: "t_cnico_a_universitario_a_en_equipamient",
    titulo: "Técnico/a Universitario/a en Equipamiento Agroindustrial",
    macroArea: "Ingeniería Industrial y Producción",
    familia: "Industrial, procesos y logística",
    universidades: [
    { nombre: "Universidad Nacional del Centro de la Provincia de Buenos Aires", provincia: "Buenos Aires", web: "http://www.quequen.unicen.edu.ar", duracion: "3 años" },
    { nombre: "Universidad Nacional de Misiones", provincia: "Misiones", web: "http://www.fio.unam.edu.ar/", duracion: "3 años" }
    ],
  },
  {
    id: "licenciado_a_en_dise_o_industrial",
    titulo: "Licenciado/a en Diseño Industrial",
    macroArea: "Ingeniería Industrial y Producción",
    familia: "Industrial, procesos y logística",
    universidades: [
    { nombre: "Universidad Nacional del Litoral", provincia: "Santa Fé", web: "www.fadu.unl.edu.ar", duracion: "4.5 años" },
    { nombre: "Universidad Nacional de Rosario", provincia: "Santa Fé", web: "www.fapyd.unr.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_geof_sica",
    titulo: "Licenciado en Geofísica",
    macroArea: "Ciencias Exactas y Naturales",
    familia: "Física, ciencias básicas y aplicadas",
    universidades: [
    { nombre: "Universidad Nacional del Sur", provincia: "Buenos Aires", web: "www.uns.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de San Juan", provincia: "San Juan", web: "www.vallessanjuaninos.unsj.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_ciencia_y_tecnolog_a_de_lo",
    titulo: "Licenciado en Ciencia y Tecnología de los Alimentos",
    macroArea: "Química, Farmacia y Bioquímica",
    familia: "Laboratorio, farmacia y bioquímica",
    universidades: [
    { nombre: "Universidad Nacional de Rosario", provincia: "Santa Fé", web: "www.fbioyf.unr.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de San Luis", provincia: "San Luis", web: "https://carreras.unsl.edu.ar/facultades/fqbyf/1", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_a_en_dise_o",
    titulo: "Licenciado/a en Diseño",
    macroArea: "Diseño y Creatividad",
    familia: "Diseño gráfico, industrial y digital",
    universidades: [
    { nombre: "Universidad Provincial de Córdoba", provincia: "Córdoba", web: "http://www.upc.edu.ar/fad/", duracion: "4 años" },
    { nombre: "Universidad Torcuato Di Tella", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.utdt.edu//listado_contenidos.php?id_item_menu=26550", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_ciencias_oceanogr_ficas",
    titulo: "Licenciado en Ciencias Oceanográficas",
    macroArea: "Ambiente y Recursos Naturales",
    familia: "Ambiente, biodiversidad y recursos naturales",
    universidades: [
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "t_cnico_a_universitario_a_en_guardaparqu",
    titulo: "Técnico/a Universitario/a en Guardaparque",
    macroArea: "Ambiente y Recursos Naturales",
    familia: "Ambiente, biodiversidad y recursos naturales",
    universidades: [
    { nombre: "Universidad del Chubut", provincia: "Chubut", web: "http://udc.edu.ar/", duracion: "3 años" },
    { nombre: "Universidad Provincial de Córdoba", provincia: "Córdoba", web: "https://fta.upc.edu.ar/", duracion: "3 años" }
    ],
  },
  {
    id: "licenciado_a_en_qu_mica",
    titulo: "Licenciado/a en Química",
    macroArea: "Química, Farmacia y Bioquímica",
    familia: "Química",
    universidades: [
    { nombre: "Universidad Nacional de Catamarca", provincia: "Catamarca", web: "http://www.unca.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.fcq.unc.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "t_cnico_universitario_en_qu_mica",
    titulo: "Técnico Universitario en Química",
    macroArea: "Química, Farmacia y Bioquímica",
    familia: "Química",
    universidades: [
    { nombre: "Universidad Nacional de General Sarmiento", provincia: "Buenos Aires", web: "www.ungs.edu.ar", duracion: "3 años" },
    { nombre: "Universidad Nacional de Quilmes", provincia: "Buenos Aires", web: "http://www.unq.edu.ar/", duracion: "3 años" }
    ],
  },
  {
    id: "licenciado_a_en_ciencias_ambientales",
    titulo: "Licenciado/a en Ciencias Ambientales",
    macroArea: "Ambiente y Recursos Naturales",
    familia: "Ambiente, biodiversidad y recursos naturales",
    universidades: [
    { nombre: "Universidad Nacional del Alto Uruguay", provincia: "Misiones", web: "www.unau.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Provincial de Laguna Blanca", provincia: "Formosa", web: "https://www.uplab.edu.ar/", duracion: "4 años" }
    ],
  },
  {
    id: "profesor_en_qu_mica_2",
    titulo: "Profesor en Química",
    macroArea: "Ingeniería Química y de Alimentos",
    familia: "Química, alimentos y procesos",
    universidades: [
    { nombre: "Universidad Nacional del Centro de la Provincia de Buenos Aires", provincia: "Buenos Aires", web: "http://www.fio.unicen.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional del Comahue", provincia: "Neuquén", web: "http://fainweb.uncoma.edu.ar", duracion: "4.5 años" }
    ],
  },
  {
    id: "licenciado_en_ciencias_biol_gicas_2",
    titulo: "Licenciado en Ciencias Biológicas",
    macroArea: "Química, Farmacia y Bioquímica",
    familia: "Laboratorio, farmacia y bioquímica",
    universidades: [
    { nombre: "Universidad Nacional del Sur", provincia: "Buenos Aires", web: "www.uns.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de San Luis", provincia: "San Luis", web: "https://carreras.unsl.edu.ar/facultades/fqbyf/1", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_qu_mica_2",
    titulo: "Licenciado en Química",
    macroArea: "Química, Farmacia y Bioquímica",
    familia: "Laboratorio, farmacia y bioquímica",
    universidades: [
    { nombre: "Universidad Nacional de Rosario", provincia: "Santa Fé", web: "www.fbioyf.unr.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de San Luis", provincia: "San Luis", web: "https://carreras.unsl.edu.ar/facultades/fqbyf/1", duracion: "5 años" }
    ],
  },
  {
    id: "profesor_en_qu_mica_3",
    titulo: "Profesor en Química",
    macroArea: "Química, Farmacia y Bioquímica",
    familia: "Laboratorio, farmacia y bioquímica",
    universidades: [
    { nombre: "Universidad Nacional de Rosario", provincia: "Santa Fé", web: "www.fbioyf.unr.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de San Luis", provincia: "San Luis", web: "https://carreras.unsl.edu.ar/facultades/fqbyf/1", duracion: "4 años" }
    ],
  },
  {
    id: "m_dico_a_veterinario_a",
    titulo: "Médico/a Veterinario/a",
    macroArea: "Veterinaria",
    familia: "Veterinaria y salud animal",
    universidades: [
    { nombre: "Universidad Nacional del Litoral", provincia: "Santa Fé", web: "www.fcv.unl.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Nordeste", provincia: "Corrientes", web: "http://www.vet.unne.edu.ar/", duracion: "6 años" }
    ],
  },
  {
    id: "licenciado_en_arte_dram_tico",
    titulo: "Licenciado en Arte Dramático",
    macroArea: "Arte, Música y Audiovisual",
    familia: "Arte, música, teatro y audiovisual",
    universidades: [
    { nombre: "Instituto Universitario Patagónico de las Artes", provincia: "Río Negro", web: "www.iupa.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Río Negro", provincia: "Río Negro", web: "https://www.unrn.edu.ar/", duracion: "4 años" }
    ],
  },
  {
    id: "t_cnico_universitario_en_fotograf_a",
    titulo: "Técnico Universitario en Fotografía",
    macroArea: "Arte, Música y Audiovisual",
    familia: "Arte, música, teatro y audiovisual",
    universidades: [
    { nombre: "Instituto Universitario Patagónico de las Artes", provincia: "Río Negro", web: "www.iupa.edu.ar", duracion: "3 años" },
    { nombre: "Universidad Nacional de Tucumán", provincia: "Tucumán", web: "www.unt.edu.ar/fartes", duracion: "3 años" }
    ],
  },
  {
    id: "licenciado_a_en_direcci_n_coral",
    titulo: "Licenciado/a en Dirección Coral",
    macroArea: "Arte, Música y Audiovisual",
    familia: "Arte, música, teatro y audiovisual",
    universidades: [
    { nombre: "Instituto Universitario Patagónico de las Artes", provincia: "Río Negro", web: "www.iupa.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.artes.unc.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_m_sica_popular",
    titulo: "Licenciado en Música Popular",
    macroArea: "Arte, Música y Audiovisual",
    familia: "Arte, música, teatro y audiovisual",
    universidades: [
    { nombre: "Instituto Universitario Patagónico de las Artes", provincia: "Río Negro", web: "www.iupa.edu.ar", duracion: "4 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uca.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_composici_n",
    titulo: "Licenciado en Composición",
    macroArea: "Arte, Música y Audiovisual",
    familia: "Arte, música, teatro y audiovisual",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uca.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Rosario", provincia: "Santa Fé", web: "www.fhumyar.unr.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_piano",
    titulo: "Licenciado en Piano",
    macroArea: "Arte, Música y Audiovisual",
    familia: "Arte, música, teatro y audiovisual",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uca.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Rosario", provincia: "Santa Fé", web: "www.fhumyar.unr.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "traductor_p_blico_en_ingl_s",
    titulo: "Traductor Público en Inglés",
    macroArea: "Lenguas, Traducción y Letras",
    familia: "Idiomas, traducción y letras",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uca.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de Cuyo", provincia: "Mendoza", web: "www.ffyl.uncuyo.edu.ar", duracion: "4.5 años" }
    ],
  },
  {
    id: "licenciado_en_psicolog_a_3",
    titulo: "Licenciado en Psicología",
    macroArea: "Psicología y Comportamiento Humano",
    familia: "Psicopedagogía",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uca.edu.ar", duracion: "5 años" },
    { nombre: "Universidad del Salvador", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.usal.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_producci_n_y_realizaci_n_a",
    titulo: "Licenciado en Producción y Realización Audiovisual",
    macroArea: "Arte, Música y Audiovisual",
    familia: "Arte, música, teatro y audiovisual",
    universidades: [
    { nombre: "Universidad Abierta Interamericana", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uai.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Abierta Interamericana", provincia: "Santa Fé", web: "www.uai.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_a_en_actividad_f_sica_y_depor",
    titulo: "Licenciado/a en Actividad Física y Deportes",
    macroArea: "Ciencias Exactas y Naturales",
    familia: "Física, ciencias básicas y aplicadas",
    universidades: [
    { nombre: "Universidad Abierta Interamericana", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uai.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Abierta Interamericana", provincia: "Santa Fé", web: "www.uai.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "profesor_universitario_de_educaci_n_f_si",
    titulo: "Profesor Universitario de Educación Física y Deportes",
    macroArea: "Deportes y Actividad Física",
    familia: "Educación física y deporte",
    universidades: [
    { nombre: "Universidad Abierta Interamericana", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uai.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Abierta Interamericana", provincia: "Santa Fé", web: "www.uai.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_artes_esc_nicas",
    titulo: "Licenciado en Artes Escénicas",
    macroArea: "Arte, Música y Audiovisual",
    familia: "Arte, música, teatro y audiovisual",
    universidades: [
    { nombre: "Universidad Argentina de la Empresa", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uade.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de San Martín", provincia: "Buenos Aires", web: "https://www.unsam.edu.ar/escuelas/arte/", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_interpretaci_n_instrumenta",
    titulo: "Licenciado en Interpretación Instrumental",
    macroArea: "Arte, Música y Audiovisual",
    familia: "Arte, música, teatro y audiovisual",
    universidades: [
    { nombre: "Universidad Autónoma de Entre Ríos", provincia: "Entre Ríos", web: "http://fhaycs-uader.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.artes.unc.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_psicomotricidad",
    titulo: "Licenciado en Psicomotricidad",
    macroArea: "Psicología y Comportamiento Humano",
    familia: "Psicología",
    universidades: [
    { nombre: "Universidad CAECE", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.ucaece.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de San Luis", provincia: "San Luis", web: "https://carreras.unsl.edu.ar/facultades/fapsi/1", duracion: "4 años" }
    ],
  },
  {
    id: "profesor_a_de_educaci_n_f_sica",
    titulo: "Profesor/a de Educación Física",
    macroArea: "Deportes y Actividad Física",
    familia: "Educación física y deporte",
    universidades: [
    { nombre: "Universidad Católica de La Plata", provincia: "Buenos Aires", web: "www.ucalp.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Provincial de Córdoba", provincia: "Córdoba", web: "https://fef.upc.edu.ar/", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_filosof_a_3",
    titulo: "Licenciado en Filosofía",
    macroArea: "Humanidades, Filosofía y Religión",
    familia: "Teología y religión",
    universidades: [
    { nombre: "Universidad Católica de Salta", provincia: "Salta", web: "https://ucasal.edu.ar/", duracion: "5 años" },
    { nombre: "Universidad del Norte Santo Tomás de Aquino", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://www.unsta.edu.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "profesor_de_ense_anza_media_y_superior_e",
    titulo: "Profesor de Enseñanza Media y Superior en Ciencias de la Comunicación Social",
    macroArea: "Comunicación y Medios",
    familia: "Comunicación y medios digitales",
    universidades: [
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "6 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "6 años" }
    ],
  },
  {
    id: "licenciado_en_paleontolog_a",
    titulo: "Licenciado en Paleontología",
    macroArea: "Arquitectura, Urbanismo y Construcción",
    familia: "Arquitectura, urbanismo y obra",
    universidades: [
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.fadu.uba.ar", duracion: "6 años" },
    { nombre: "Universidad Nacional de los Comechingones", provincia: "San Luis", web: "www.unlc.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_a_en_filosof_a",
    titulo: "Licenciado/a en Filosofía",
    macroArea: "Humanidades, Filosofía y Religión",
    familia: "Filosofía, historia y humanidades",
    universidades: [
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.filo.uba.ar", duracion: "6 años" },
    { nombre: "Universidad Nacional del Litoral", provincia: "Santa Fé", web: "www.fhuc.unl.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "profesor_universitario_de_educaci_n_f_si_2",
    titulo: "Profesor Universitario de Educación Física",
    macroArea: "Deportes y Actividad Física",
    familia: "Educación física y deporte",
    universidades: [
    { nombre: "Universidad de Concepción del Uruguay", provincia: "Entre Ríos", web: "http://gualeguaychu.ucu.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de La Rioja", provincia: "La Rioja", web: "www.unlar.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "traductor_p_blico_de_ingl_s",
    titulo: "Traductor Público de Inglés",
    macroArea: "Lenguas, Traducción y Letras",
    familia: "Idiomas, traducción y letras",
    universidades: [
    { nombre: "Universidad del Salvador", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.usal.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional del Comahue", provincia: "Río Negro", web: "http://fadelweb.uncoma.edu.ar/", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_historia_md",
    titulo: "Licenciado en Historia - MD",
    macroArea: "Humanidades, Filosofía y Religión",
    familia: "Filosofía, historia y humanidades",
    universidades: [
    { nombre: "Universidad Maimónides", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.maimonides.edu", duracion: "4 años" },
    { nombre: "Universidad Nacional de Tres de Febrero", provincia: "Buenos Aires", web: "http://www.untrefvirtual.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_artes_pl_sticas",
    titulo: "Licenciado en Artes Plásticas",
    macroArea: "Diseño y Creatividad",
    familia: "Diseño gráfico, industrial y digital",
    universidades: [
    { nombre: "Universidad Nacional de Cuyo", provincia: "Mendoza", web: "www.fad.uncuyo.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Misiones", provincia: "Misiones", web: "http://www.unam.edu.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_franc_s",
    titulo: "Licenciado en Francés",
    macroArea: "Humanidades, Filosofía y Religión",
    familia: "Filosofía, historia y humanidades",
    universidades: [
    { nombre: "Universidad Nacional de Cuyo", provincia: "Mendoza", web: "www.ffyl.uncuyo.edu.ar", duracion: "4.5 años" },
    { nombre: "Universidad Nacional de Tucumán", provincia: "Tucumán", web: "www.filo.unt.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_a_en_publicidad",
    titulo: "Licenciado/a en Publicidad",
    macroArea: "Marketing, Publicidad y Comercialización",
    familia: "Marketing, publicidad y ventas",
    universidades: [
    { nombre: "Instituto Universitario Escuela Argentina de Negocios", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://www.iuean.edu.ar", duracion: "4 años" },
    { nombre: "Instituto Universitario Escuela Argentina de Negocios", provincia: "Buenos Aires", web: "http://www.ean.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_a_en_relaciones_p_blicas_md",
    titulo: "Licenciado/a en Relaciones Públicas - MD",
    macroArea: "Marketing, Publicidad y Comercialización",
    familia: "Marketing, publicidad y ventas",
    universidades: [
    { nombre: "Instituto Universitario Escuela Argentina de Negocios", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://www.iuean.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Católica de La Plata", provincia: "Buenos Aires", web: "www.ucalp.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_direcci_n_del_factor_human",
    titulo: "Licenciado en Dirección del Factor Humano",
    macroArea: "Recursos Humanos y Organizaciones",
    familia: "RRHH y desarrollo organizacional",
    universidades: [
    { nombre: "Instituto Universitario Escuela Argentina de Negocios", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://www.iuean.edu.ar", duracion: "4 años" },
    { nombre: "Instituto Universitario Escuela Argentina de Negocios", provincia: "Buenos Aires", web: "http://www.ean.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_a_en_gesti_n_del_liderazgo_y",
    titulo: "Licenciado/a en Gestión del Liderazgo y Desarrollo Organizacional",
    macroArea: "Recursos Humanos y Organizaciones",
    familia: "RRHH y desarrollo organizacional",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uca.edu.ar", duracion: "4 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Mendoza", web: "http://uca.edu.ar/es/facultades/facultad-de-humanidades-y-ciencias-economicas", duracion: "4 años" }
    ],
  },
  {
    id: "t_cnico_a_en_marketing_digital",
    titulo: "Técnico/a en Marketing Digital",
    macroArea: "Marketing, Publicidad y Comercialización",
    familia: "Marketing, publicidad y ventas",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Santa Fé", web: "www.uca.edu.ar", duracion: "2.5 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Mendoza", web: "http://uca.edu.ar/es/facultades/facultad-de-humanidades-y-ciencias-economicas", duracion: "2.5 años" }
    ],
  },
  {
    id: "licenciado_en_comunicaci_n_period_stica",
    titulo: "Licenciado en Comunicación Periodística",
    macroArea: "Comunicación y Medios",
    familia: "Comunicación y medios digitales",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uca.edu.ar", duracion: "4 años" },
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Entre Ríos", web: "www.uca.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_a_en_econom_a_empresarial",
    titulo: "Licenciado/a en Economía Empresarial",
    macroArea: "Economía y Finanzas",
    familia: "Economía, finanzas y banca",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Mendoza", web: "http://uca.edu.ar/es/facultades/facultad-de-humanidades-y-ciencias-economicas", duracion: "4 años" },
    { nombre: "Universidad de San Andrés", provincia: "Buenos Aires", web: "www.udesa.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_comercializaci_n_md",
    titulo: "Licenciado en Comercialización - MD",
    macroArea: "Marketing, Publicidad y Comercialización",
    familia: "Marketing, publicidad y ventas",
    universidades: [
    { nombre: "Universidad Abierta Interamericana", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uai.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Argentina John F. Kennedy", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://www.kennedy.edu.ar/", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_a_en_gastronom_a",
    titulo: "Licenciado/a en Gastronomía",
    macroArea: "Turismo, Gastronomía y Hospitalidad",
    familia: "Turismo, hotelería, eventos y gastronomía",
    universidades: [
    { nombre: "Universidad Abierta Interamericana", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uai.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Belgrano", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.ub.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "t_cnico_universitario_en_gesti_n_y_organ",
    titulo: "Técnico Universitario en Gestión y Organización de Eventos",
    macroArea: "Turismo, Gastronomía y Hospitalidad",
    familia: "Turismo, hotelería y gastronomía",
    universidades: [
    { nombre: "Universidad Abierta Interamericana", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uai.edu.ar", duracion: "2 años" },
    { nombre: "Universidad Abierta Interamericana", provincia: "Santa Fé", web: "www.uai.edu.ar", duracion: "2 años" }
    ],
  },
  {
    id: "t_cnico_universitario_en_hoteler_a",
    titulo: "Técnico Universitario en Hotelería",
    macroArea: "Turismo, Gastronomía y Hospitalidad",
    familia: "Turismo, hotelería, eventos y gastronomía",
    universidades: [
    { nombre: "Universidad Argentina de la Empresa", provincia: "Buenos Aires", web: "www.uade.edu.ar", duracion: "2.5 años" },
    { nombre: "Universidad Atlántida Argentina", provincia: "Buenos Aires", web: "http://www.atlantida.edu.ar/", duracion: "3 años" }
    ],
  },
  {
    id: "licenciado_en_administraci_n_hotelera_md",
    titulo: "Licenciado en Administración Hotelera - MD",
    macroArea: "Turismo, Gastronomía y Hospitalidad",
    familia: "Turismo, hotelería y gastronomía",
    universidades: [
    { nombre: "Universidad Argentina John F. Kennedy", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://www.kennedy.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Empresarial Siglo 21", provincia: "Córdoba", web: "http://www.21.edu.ar/", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_a_en_trabajo_social_2",
    titulo: "Licenciado/a en Trabajo Social",
    macroArea: "Humanidades, Filosofía y Religión",
    familia: "Filosofía, historia y humanidades",
    universidades: [
    { nombre: "Universidad Argentina John F. Kennedy", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://www.kennedy.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad de San Isidro \"Dr. Plácido Marín\"", provincia: "Buenos Aires", web: "www.usi.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_relaciones_p_blicas_md",
    titulo: "Licenciado en Relaciones Públicas - MD",
    macroArea: "Marketing, Publicidad y Comercialización",
    familia: "Marketing, publicidad y ventas",
    universidades: [
    { nombre: "Universidad Argentina John F. Kennedy", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://www.kennedy.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Blas Pascal", provincia: "Córdoba", web: "http://www.ubp.edu.ar/", duracion: "4 años" }
    ],
  },
  {
    id: "profesor_en_econom_a",
    titulo: "Profesor en Economía",
    macroArea: "Economía y Finanzas",
    familia: "Economía, finanzas y banca",
    universidades: [
    { nombre: "Universidad Autónoma de Entre Ríos", provincia: "Entre Ríos", web: "http://fcg.uader.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional del Sur", provincia: "Buenos Aires", web: "www.uns.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_gesti_n_de_recursos_humano_2",
    titulo: "Licenciado en Gestión de Recursos Humanos - MD",
    macroArea: "Recursos Humanos y Organizaciones",
    familia: "RRHH y desarrollo organizacional",
    universidades: [
    { nombre: "Universidad Blas Pascal", provincia: "Córdoba", web: "http://www.ubp.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Empresarial Siglo 21", provincia: "Córdoba", web: "http://www.21.edu.ar/", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_a_en_periodismo",
    titulo: "Licenciado/a en Periodismo",
    macroArea: "Comunicación y Medios",
    familia: "Periodismo y redacción",
    universidades: [
    { nombre: "Universidad Católica de La Plata", provincia: "Buenos Aires", web: "www.ucalp.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de Río Cuarto", provincia: "Córdoba", web: "www.unrc.edu.ar; www.hum.unrc.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "t_cnico_a_universitario_a_en_periodismo",
    titulo: "Técnico/a Universitario/a en Periodismo Deportivo - MD",
    macroArea: "Comunicación y Medios",
    familia: "Periodismo y redacción",
    universidades: [
    { nombre: "Universidad Católica de La Plata", provincia: "Buenos Aires", web: "www.ucalp.edu.ar", duracion: "2 años" },
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.fcc.unc.edu.ar", duracion: "2.5 años" }
    ],
  },
  {
    id: "licenciado_en_comercializaci_n_md_2",
    titulo: "Licenciado en Comercialización - MD",
    macroArea: "Economía y Finanzas",
    familia: "Economía, finanzas y banca",
    universidades: [
    { nombre: "Universidad Católica de Salta", provincia: "Salta", web: "http://www.ucasal.net", duracion: "4 años" },
    { nombre: "Universidad de Morón", provincia: "Buenos Aires", web: "www.unimoron.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_econom_a_md",
    titulo: "Licenciado en Economía - MD",
    macroArea: "Economía y Finanzas",
    familia: "Economía, finanzas y banca",
    universidades: [
    { nombre: "Universidad Católica de Salta", provincia: "Salta", web: "http://www.ucasal.net", duracion: "4 años" },
    { nombre: "Universidad Nacional de Río Cuarto", provincia: "Córdoba", web: "www.unrc.edu.ar, www.eco.unrc.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "t_cnico_universitario_en_gesti_n_de_recu",
    titulo: "Técnico Universitario en Gestión de Recursos Humanos",
    macroArea: "Recursos Humanos y Organizaciones",
    familia: "RRHH y desarrollo organizacional",
    universidades: [
    { nombre: "Universidad Católica de Santiago del Estero", provincia: "Santiago Del Estero", web: "http://www.ucse.edu.ar/web/sede_sgo/fce/sc%20fce.htm", duracion: "3 años" },
    { nombre: "Universidad Nacional de Entre Ríos", provincia: "Entre Ríos", web: "http://www.fceco.uner.edu.ar", duracion: "2 años" }
    ],
  },
  {
    id: "t_cnico_en_turismo_rural",
    titulo: "Técnico en Turismo Rural",
    macroArea: "Agropecuarias y Producción Alimentaria",
    familia: "Agronomía, agro y producción",
    universidades: [
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "3 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "3 años" }
    ],
  },
  {
    id: "licenciado_en_ciencias_antropol_gicas_or",
    titulo: "Licenciado en Ciencias Antropológicas (Orientación Arqueológica)",
    macroArea: "Ciencias Sociales y Comunitarias",
    familia: "Sociología, trabajo social y comunidad",
    universidades: [
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_ciencias_antropol_gicas_or_2",
    titulo: "Licenciado en Ciencias Antropológicas (Orientación Sociocultural)",
    macroArea: "Ciencias Sociales y Comunitarias",
    familia: "Sociología, trabajo social y comunidad",
    universidades: [
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_gesti_n_de_agroalimentos",
    titulo: "Licenciado en Gestión de Agroalimentos",
    macroArea: "Ingeniería Química y de Alimentos",
    familia: "Química, alimentos y procesos",
    universidades: [
    { nombre: "Universidad de Buenos Aires", provincia: "Buenos Aires", web: "https://www.cbc.uba.ar/", duracion: "5 años" },
    { nombre: "Universidad de Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.agro.uba.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_ciencia_pol_tica_y_de_gobi",
    titulo: "Licenciado en Ciencia Política y de Gobierno",
    macroArea: "Gobierno, Política y Relaciones Internacionales",
    familia: "Gobierno, política y RRII",
    universidades: [
    { nombre: "Universidad de Ciencias Empresariales y Sociales", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uces.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Ciencias Empresariales y Sociales", provincia: "Chaco", web: "www.uces.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_a_en_ciencia_pol_tica_y_gobie",
    titulo: "Licenciado/a en Ciencia Política y Gobierno - MD",
    macroArea: "Gobierno, Política y Relaciones Internacionales",
    familia: "Gobierno, política y RRII",
    universidades: [
    { nombre: "Universidad de Concepción del Uruguay", provincia: "Entre Ríos", web: "www.ucu.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Empresarial Siglo 21", provincia: "Córdoba", web: "http://www.21.edu.ar/", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_a_en_relaciones_internacional_2",
    titulo: "Licenciado/a en Relaciones Internacionales y Gobernanza Global",
    macroArea: "Gobierno, Política y Relaciones Internacionales",
    familia: "Gobierno, política y RRII",
    universidades: [
    { nombre: "Universidad de Congreso", provincia: "Mendoza", web: "http://www.ucongreso.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad de Congreso", provincia: "San Juan", web: "http://www.ucongreso.edu.ar/", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_administraci_n_3",
    titulo: "Licenciado en Administración",
    macroArea: "Recursos Humanos y Organizaciones",
    familia: "RRHH y desarrollo organizacional",
    universidades: [
    { nombre: "Universidad de Flores", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uflo.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Flores", provincia: "Río Negro", web: "www.uflo.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_turismo_4",
    titulo: "Licenciado en Turismo",
    macroArea: "Comunicación y Medios",
    familia: "Comunicación y medios digitales",
    universidades: [
    { nombre: "Universidad de la Marina Mercante", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.udemm.edu.ar", duracion: "4 años" },
    { nombre: "Universidad de Morón", provincia: "Buenos Aires", web: "www.unimoron.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_ciencia_pol_tica_y_gobiern",
    titulo: "Licenciado en Ciencia Política y Gobierno",
    macroArea: "Gobierno, Política y Relaciones Internacionales",
    familia: "Gobierno, política y RRII",
    universidades: [
    { nombre: "Universidad de San Andrés", provincia: "Buenos Aires", web: "www.udesa.edu.ar", duracion: "4 años" },
    { nombre: "Universidad Nacional de Lanús", provincia: "Buenos Aires", web: "www.unla.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_periodismo_md",
    titulo: "Licenciado en Periodismo - MD",
    macroArea: "Comunicación y Medios",
    familia: "Periodismo y redacción",
    universidades: [
    { nombre: "Universidad Empresarial Siglo 21", provincia: "Córdoba", web: "http://www.21.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Maimónides", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.maimonides.edu", duracion: "4 años" }
    ],
  },
  {
    id: "t_cnico_a_universitario_a_en_periodismo_2",
    titulo: "Técnico/a Universitario/a en Periodismo",
    macroArea: "Comunicación y Medios",
    familia: "Periodismo y redacción",
    universidades: [
    { nombre: "Universidad Juan Agustín Maza", provincia: "Mendoza", web: "https://www.umaza.edu.ar/facultad-de-CSC", duracion: "3 años" },
    { nombre: "Universidad Nacional de la Patagonia San Juan Bosco", provincia: "Chubut", web: "www.unp.edu.ar", duracion: "3 años" }
    ],
  },
  {
    id: "licenciado_en_antropolog_a_social_y_cult",
    titulo: "Licenciado en Antropología Social y Cultural",
    macroArea: "Ciencias Sociales y Comunitarias",
    familia: "Sociología, trabajo social y comunidad",
    universidades: [
    { nombre: "Universidad Nacional de Catamarca", provincia: "Catamarca", web: "http://www.unca.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de San Martín", provincia: "Buenos Aires", web: "http://www.unsam.edu.ar/escuelas/idaes/", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_comunicaci_n_social_orient",
    titulo: "Licenciado en Comunicación Social Orientación Periodismo",
    macroArea: "Comunicación y Medios",
    familia: "Periodismo y redacción",
    universidades: [
    { nombre: "Universidad Nacional de Chilecito", provincia: "La Rioja", web: "https://www.undec.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de La Rioja", provincia: "La Rioja", web: "www.unlar.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_trabajo_social_3",
    titulo: "Licenciado en Trabajo Social",
    macroArea: "Gobierno, Política y Relaciones Internacionales",
    familia: "Gobierno, política y RRII",
    universidades: [
    { nombre: "Universidad Nacional de Cuyo", provincia: "Mendoza", web: "fcp.uncuyo.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional de Rosario", provincia: "Santa Fé", web: "www.fcpolit.unr.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_a_en_sociolog_a",
    titulo: "Licenciado/a en Sociología",
    macroArea: "Ciencias Sociales y Comunitarias",
    familia: "Sociología, trabajo social y comunidad",
    universidades: [
    { nombre: "Universidad Nacional de Entre Ríos", provincia: "Entre Ríos", web: "http://www.fts.uner.edu.ar/", duracion: "4 años" },
    { nombre: "Universidad Nacional de General Sarmiento", provincia: "Buenos Aires", web: "www.ungs.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "t_cnico_universitario_administrativo_con",
    titulo: "Técnico Universitario Administrativo Contable",
    macroArea: "Contabilidad e Impuestos",
    familia: "Contabilidad, auditoría e impuestos",
    universidades: [
    { nombre: "Universidad Nacional de la Patagonia San Juan Bosco", provincia: "Chubut", web: "www.unp.edu.ar", duracion: "3 años" },
    { nombre: "Universidad Nacional de los Comechingones", provincia: "San Luis", web: "www.unlc.edu.ar", duracion: "2.5 años" }
    ],
  },
  {
    id: "t_cnico_universitario_contable",
    titulo: "Técnico Universitario Contable",
    macroArea: "Contabilidad e Impuestos",
    familia: "Contabilidad, auditoría e impuestos",
    universidades: [
    { nombre: "Universidad Nacional de la Patagonia San Juan Bosco", provincia: "Chubut", web: "www.unp.edu.ar", duracion: "3 años" },
    { nombre: "Universidad Nacional de Tierra del Fuego, Antártida e Islas del Atlántico Sur", provincia: "Tierra Del Fuego", web: "www.untdf.edu.ar", duracion: "3 años" }
    ],
  },
  {
    id: "licenciado_en_antropolog_a",
    titulo: "Licenciado en Antropología",
    macroArea: "Ciencias Sociales y Comunitarias",
    familia: "Sociología, trabajo social y comunidad",
    universidades: [
    { nombre: "Universidad Nacional de La Plata", provincia: "Buenos Aires", web: "www.fcnym.unlp.edu.ar", duracion: "5 años" },
    { nombre: "Universidad Nacional del Centro de la Provincia de Buenos Aires", provincia: "Buenos Aires", web: "http://www.soc.unicen.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_a_en_ciencia_pol_tica",
    titulo: "Licenciado/a en Ciencia Política",
    macroArea: "Ciencias Sociales y Comunitarias",
    familia: "Sociología, trabajo social y comunidad",
    universidades: [
    { nombre: "Universidad Nacional del Comahue", provincia: "Río Negro", web: "https://web.curza.net/", duracion: "5 años" },
    { nombre: "Universidad Nacional Guillermo Brown", provincia: "Buenos Aires", web: "www.unab.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "t_cnico_universitario_en_producci_n_agro_2",
    titulo: "Técnico Universitario en Producción Agropecuaria",
    macroArea: "Ingeniería Industrial y Producción",
    familia: "Industrial, procesos y logística",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://uca.edu.ar/es/facultades/facultad-de-ingenieria-y-ciencias-agrarias", duracion: "2 años" }
    ],
  },
  {
    id: "bioingeniero_a_2",
    titulo: "Bioingeniero/a",
    macroArea: "Ingeniería Química y de Alimentos",
    familia: "Química, alimentos y procesos",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Santa Fé", web: "www.uca.edu.ar/quimicarosario", duracion: "5 años" }
    ],
  },
  {
    id: "ingeniero_ambiental_2",
    titulo: "Ingeniero Ambiental",
    macroArea: "Ingeniería Química y de Alimentos",
    familia: "Química, alimentos y procesos",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Santa Fé", web: "www.uca.edu.ar/quimicarosario", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_a_en_dise_o_2",
    titulo: "Licenciado/a en Diseño",
    macroArea: "Ingeniería Química y de Alimentos",
    familia: "Química, alimentos y procesos",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Santa Fé", web: "www.uca.edu.ar/quimicarosario", duracion: "4 años" }
    ],
  },
  {
    id: "t_cnico_universitario_industrial",
    titulo: "Técnico Universitario Industrial",
    macroArea: "Ingeniería Industrial y Producción",
    familia: "Industrial, procesos y logística",
    universidades: [
    { nombre: "Pontificia Universidad Católica Argentina Santa María de los Buenos Aires", provincia: "Santa Fé", web: "www.uca.edu.ar/quimicarosario", duracion: "3 años" }
    ],
  },
  {
    id: "licenciado_a_en_dise_o_de_productos_inte",
    titulo: "Licenciado/a en Diseño de Productos Interactivos y Realidad Virtual",
    macroArea: "Arquitectura, Urbanismo y Construcción",
    familia: "Arquitectura, urbanismo y obra",
    universidades: [
    { nombre: "Universidad Argentina de la Empresa", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uade.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_a_en_dise_o_estrat_gico",
    titulo: "Licenciado/a en Diseño Estratégico",
    macroArea: "Arquitectura, Urbanismo y Construcción",
    familia: "Arquitectura, urbanismo y obra",
    universidades: [
    { nombre: "Universidad Argentina de la Empresa", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uade.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_dise_o_multimedia_y_de_int",
    titulo: "Licenciado en Diseño Multimedia y de Interacción",
    macroArea: "Arquitectura, Urbanismo y Construcción",
    familia: "Arquitectura, urbanismo y obra",
    universidades: [
    { nombre: "Universidad Argentina de la Empresa", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uade.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_dise_o_textil_e_indumentar",
    titulo: "Licenciado en Diseño Textil e Indumentaria",
    macroArea: "Arquitectura, Urbanismo y Construcción",
    familia: "Arquitectura, urbanismo y obra",
    universidades: [
    { nombre: "Universidad Argentina de la Empresa", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uade.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_dise_o_y_gesti_n_de_est_ti",
    titulo: "Licenciado en Diseño y Gestión de Estéticas para la Moda",
    macroArea: "Arquitectura, Urbanismo y Construcción",
    familia: "Arquitectura, urbanismo y obra",
    universidades: [
    { nombre: "Universidad Argentina de la Empresa", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uade.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_producci_n_y_gesti_n_agrop",
    titulo: "Licenciado en Producción y Gestión Agropecuaria",
    macroArea: "Ingeniería Industrial y Producción",
    familia: "Industrial, procesos y logística",
    universidades: [
    { nombre: "Universidad Argentina de la Empresa", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uade.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_tecnolog_a_industrial_de_l",
    titulo: "Licenciado en Tecnología Industrial de los Alimentos",
    macroArea: "Ingeniería Industrial y Producción",
    familia: "Industrial, procesos y logística",
    universidades: [
    { nombre: "Universidad Argentina de la Empresa", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uade.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "asistente_universitario_a_en_representac",
    titulo: "Asistente Universitario/a en Representación y Documentación de Obra",
    macroArea: "Arquitectura, Urbanismo y Construcción",
    familia: "Arquitectura, urbanismo y obra",
    universidades: [
    { nombre: "Universidad Atlántida Argentina", provincia: "Buenos Aires", web: "https://www.atlantida.edu.ar/", duracion: "2 años" }
    ],
  },
  {
    id: "t_cnico_a_universitario_a_en_proyectos_d",
    titulo: "Técnico/a Universitario/a en Proyectos de Espacios para Eventos",
    macroArea: "Turismo, Gastronomía y Hospitalidad",
    familia: "Turismo, hotelería, eventos y gastronomía",
    universidades: [
    { nombre: "Universidad Atlántida Argentina", provincia: "Buenos Aires", web: "https://www.atlantida.edu.ar/", duracion: "3 años" }
    ],
  },
  {
    id: "t_cnico_a_universitario_a_en_proyectos_d_2",
    titulo: "Técnico/a Universitario/a en Proyectos de Espacios para Eventos",
    macroArea: "Arquitectura, Urbanismo y Construcción",
    familia: "Arquitectura, urbanismo y obra",
    universidades: [
    { nombre: "Universidad Atlántida Argentina", provincia: "Buenos Aires", web: "www.atlantida.edu.ar", duracion: "3 años" }
    ],
  },
  {
    id: "licenciado_en_automatizaci_n_y_control_d",
    titulo: "Licenciado en Automatización y Control de Procesos Industriales",
    macroArea: "Ingeniería Industrial y Producción",
    familia: "Industrial, procesos y logística",
    universidades: [
    { nombre: "Universidad Autónoma de Entre Ríos", provincia: "Entre Ríos", web: "http://fcyt.uader.edu.ar/web", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_a_en_dise_o_3",
    titulo: "Licenciado/a en Diseño",
    macroArea: "Arquitectura, Urbanismo y Construcción",
    familia: "Arquitectura, urbanismo y obra",
    universidades: [
    { nombre: "Universidad Católica de Córdoba", provincia: "Córdoba", web: "www.ucc.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "bromat_logo",
    titulo: "Bromatólogo",
    macroArea: "Agropecuarias y Producción Alimentaria",
    familia: "Agronomía, agro y producción",
    universidades: [
    { nombre: "Universidad Católica de Cuyo", provincia: "San Juan", web: "www.uccuyo.edu.ar", duracion: "3 años" }
    ],
  },
  {
    id: "licenciado_en_enolog_a_e_industria_fruti",
    titulo: "Licenciado en Enología e Industria Frutihortícola",
    macroArea: "Agropecuarias y Producción Alimentaria",
    familia: "Agronomía, agro y producción",
    universidades: [
    { nombre: "Universidad Católica de Cuyo", provincia: "Mendoza", web: "www.uccuyo.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_producci_n_animal",
    titulo: "Licenciado en Producción Animal",
    macroArea: "Veterinaria",
    familia: "Veterinaria y salud animal",
    universidades: [
    { nombre: "Universidad Católica de Salta", provincia: "Salta", web: "http://www.ucasal.net", duracion: "4.5 años" }
    ],
  },
  {
    id: "t_cnico_a_universitario_a_en_produccione",
    titulo: "Técnico/a Universitario/a en Producciones Agroecológicas y Orgánicas",
    macroArea: "Agropecuarias y Producción Alimentaria",
    familia: "Agronomía, agro y producción",
    universidades: [
    { nombre: "Universidad Católica de Santiago del Estero", provincia: "Santa Fé", web: "http://www.ucse.edu.ar/web/rafaela/sede_rafaela.htm", duracion: "3 años" }
    ],
  },
  {
    id: "licenciado_a_en_ciencias_aplicadas",
    titulo: "Licenciado/a en Ciencias Aplicadas",
    macroArea: "Ciencias Exactas y Naturales",
    familia: "Física, ciencias básicas y aplicadas",
    universidades: [
    { nombre: "Universidad Católica de Santiago del Estero", provincia: "Santiago Del Estero", web: "http://www.ucse.edu.ar/web/sede_sgo/fce/sc%20fce.htm", duracion: "4 años" }
    ],
  },
  {
    id: "t_cnico_a_universitario_a_en_electr_nica",
    titulo: "Técnico/a Universitario/a en Electrónica",
    macroArea: "Ingeniería Eléctrica, Electrónica y Telecomunicaciones",
    familia: "Electrónica, electricidad y telecomunicaciones",
    universidades: [
    { nombre: "Universidad Católica de Santiago del Estero", provincia: "Santiago Del Estero", web: "http://newsite.ucse.edu.ar/index.php/ucse-sedes/santiago-del-estero", duracion: "3 años" }
    ],
  },
  {
    id: "licenciado_en_telecomunicaciones",
    titulo: "Licenciado en Telecomunicaciones",
    macroArea: "Ingeniería Eléctrica, Electrónica y Telecomunicaciones",
    familia: "Electrónica, electricidad y telecomunicaciones",
    universidades: [
    { nombre: "Universidad del Aconcagua", provincia: "Mendoza", web: "www.uda.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "t_cnico_a_universitario_a_en_an_lisis_de",
    titulo: "Técnico/a Universitario/a en Análisis de Alimentos",
    macroArea: "Ingeniería Química y de Alimentos",
    familia: "Química, alimentos y procesos",
    universidades: [
    { nombre: "Universidad de la Cuenca del Plata", provincia: "Corrientes", web: "www.ucp.edu.ar", duracion: "3 años" }
    ],
  },
  {
    id: "ingeniero_en_tecnolog_a_de_los_alimentos",
    titulo: "Ingeniero en Tecnología de los Alimentos",
    macroArea: "Ingeniería Química y de Alimentos",
    familia: "Química, alimentos y procesos",
    universidades: [
    { nombre: "Universidad del Centro Educativo Latinoamericano", provincia: "Santa Fé", web: "www.ucel.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_redes_y_telecomunicaciones",
    titulo: "Licenciado en Redes y Telecomunicaciones",
    macroArea: "Ingeniería Industrial y Producción",
    familia: "Industrial, procesos y logística",
    universidades: [
    { nombre: "Universidad del Chubut", provincia: "Chubut", web: "http://udc.edu.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "t_cnico_universitario_en_energ_as_renova",
    titulo: "Técnico Universitario en Energías Renovables",
    macroArea: "Ambiente y Recursos Naturales",
    familia: "Ambiente, biodiversidad y recursos naturales",
    universidades: [
    { nombre: "Universidad del Chubut", provincia: "Chubut", web: "http://udc.edu.ar/", duracion: "2.5 años" }
    ],
  },
  {
    id: "licenciado_en_redes_y_telecomunicaciones_2",
    titulo: "Licenciado en Redes y Telecomunicaciones",
    macroArea: "Ingeniería Eléctrica, Electrónica y Telecomunicaciones",
    familia: "Electrónica, electricidad y telecomunicaciones",
    universidades: [
    { nombre: "Universidad del Chubut", provincia: "Chubut", web: "http://udc.edu.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "t_cnico_universitario_en_redes_y_telecom",
    titulo: "Técnico Universitario en Redes y Telecomunicaciones",
    macroArea: "Ingeniería Eléctrica, Electrónica y Telecomunicaciones",
    familia: "Electrónica, electricidad y telecomunicaciones",
    universidades: [
    { nombre: "Universidad del Chubut", provincia: "Chubut", web: "http://udc.edu.ar/", duracion: "3 años" }
    ],
  },
  {
    id: "ingeniero_a_electr_nico_a_md",
    titulo: "Ingeniero/a Electrónico/a - MD",
    macroArea: "Ingeniería Eléctrica, Electrónica y Telecomunicaciones",
    familia: "Electrónica, electricidad y telecomunicaciones",
    universidades: [
    { nombre: "Universidad de Palermo", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.palermo.edu", duracion: "5 años" }
    ],
  },
  {
    id: "ingeniero_a_en_telecomunicaciones_md",
    titulo: "Ingeniero/a en Telecomunicaciones - MD",
    macroArea: "Ingeniería Eléctrica, Electrónica y Telecomunicaciones",
    familia: "Electrónica, electricidad y telecomunicaciones",
    universidades: [
    { nombre: "Universidad de Palermo", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.palermo.edu", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_tecnolog_a_de_los_alimento_2",
    titulo: "Licenciado en Tecnología de los Alimentos",
    macroArea: "Veterinaria",
    familia: "Veterinaria y salud animal",
    universidades: [
    { nombre: "Universidad Juan Agustín Maza", provincia: "Mendoza", web: "http://www.umaza.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_a_en_energ_as_renovables",
    titulo: "Licenciado/a en Energías Renovables",
    macroArea: "Ciencias Exactas y Naturales",
    familia: "Física, ciencias básicas y aplicadas",
    universidades: [
    { nombre: "Universidad Nacional de Catamarca", provincia: "Catamarca", web: "http://www.unca.edu.ar/", duracion: "5 años" }
    ],
  },
  {
    id: "t_cnico_universitario_en_enolog_a",
    titulo: "Técnico Universitario en Enología",
    macroArea: "Agropecuarias y Producción Alimentaria",
    familia: "Agronomía, agro y producción",
    universidades: [
    { nombre: "Universidad Nacional de Catamarca", provincia: "Catamarca", web: "http://www.unca.edu.ar/", duracion: "3 años" }
    ],
  },
  {
    id: "licenciado_a_en_enolog_a",
    titulo: "Licenciado/a en Enología",
    macroArea: "Agropecuarias y Producción Alimentaria",
    familia: "Agronomía, agro y producción",
    universidades: [
    { nombre: "Universidad Nacional de Chilecito", provincia: "La Rioja", web: "https://www.undec.edu.ar/", duracion: "4 años" }
    ],
  },
  {
    id: "t_cnico_a_universitario_a_en_jardiner_a",
    titulo: "Técnico/a Universitario/a en Jardinería y Floricultura",
    macroArea: "Agropecuarias y Producción Alimentaria",
    familia: "Agronomía, agro y producción",
    universidades: [
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.agro.unc.edu.ar", duracion: "3 años" }
    ],
  },
  {
    id: "constructor",
    titulo: "Constructor",
    macroArea: "Ciencias Exactas y Naturales",
    familia: "Física, ciencias básicas y aplicadas",
    universidades: [
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.efn.uncor.edu", duracion: "4 años" }
    ],
  },
  {
    id: "ge_logo_a",
    titulo: "Geólogo/a",
    macroArea: "Ciencias Exactas y Naturales",
    familia: "Física, ciencias básicas y aplicadas",
    universidades: [
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.efn.uncor.edu", duracion: "5 años" }
    ],
  },
  {
    id: "t_cnico_mec_nico_electricista",
    titulo: "Técnico Mecánico Electricista",
    macroArea: "Ingeniería Eléctrica, Electrónica y Telecomunicaciones",
    familia: "Electrónica, electricidad y telecomunicaciones",
    universidades: [
    { nombre: "Universidad Nacional de Córdoba", provincia: "Córdoba", web: "www.efn.uncor.edu", duracion: "3 años" }
    ],
  },
  {
    id: "ingeniera_o_civil",
    titulo: "Ingeniera/o Civil",
    macroArea: "Ingeniería Civil, Construcción e Infraestructura",
    familia: "Civil, obras e infraestructura",
    universidades: [
    { nombre: "Universidad Nacional de Cuyo", provincia: "Mendoza", web: "ingenieria.uncuyo.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "t_cnico_a_universitario_a_en_jardiner_a_2",
    titulo: "Técnico/a Universitario/a en Jardinería - MD",
    macroArea: "Agropecuarias y Producción Alimentaria",
    familia: "Agronomía, agro y producción",
    universidades: [
    { nombre: "Universidad Nacional de Entre Ríos", provincia: "Entre Ríos", web: "http://www.fca.uner.edu.ar", duracion: "2 años" }
    ],
  },
  {
    id: "t_cnico_universitario_en_manejo_de_grano",
    titulo: "Técnico Universitario en Manejo de Granos y Semillas",
    macroArea: "Agropecuarias y Producción Alimentaria",
    familia: "Agronomía, agro y producción",
    universidades: [
    { nombre: "Universidad Nacional de Entre Ríos", provincia: "Entre Ríos", web: "http://www.fca.uner.edu.ar", duracion: "2.5 años" }
    ],
  },
  {
    id: "ingeniero_en_mecatr_nica",
    titulo: "Ingeniero en Mecatrónica",
    macroArea: "Ingeniería Mecánica, Electromecánica y Mecatrónica",
    familia: "Mecánica, electromecánica y mecatrónica",
    universidades: [
    { nombre: "Universidad Nacional de Entre Ríos", provincia: "Entre Ríos", web: "http://www.fcal.uner.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_a_en_desarrollo_agrario",
    titulo: "Licenciado/a en Desarrollo Agrario",
    macroArea: "Ciencias Biológicas y Biotecnología",
    familia: "Biología, genética y biotecnología",
    universidades: [
    { nombre: "Universidad Nacional de Hurlingham", provincia: "Buenos Aires", web: "http://www.unahur.edu.ar/es/instituto-biotecnologia", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_desarrollo_rural",
    titulo: "Licenciado en Desarrollo Rural",
    macroArea: "Agropecuarias y Producción Alimentaria",
    familia: "Agronomía, agro y producción",
    universidades: [
    { nombre: "Universidad Nacional de Jujuy", provincia: "Jujuy", web: "http://www.fca.unju.edu.ar/", duracion: "4 años" }
    ],
  },
  {
    id: "t_cnico_universitario_en_producci_n_de_a",
    titulo: "Técnico Universitario en Producción de Animales de Granja",
    macroArea: "Agropecuarias y Producción Alimentaria",
    familia: "Agronomía, agro y producción",
    universidades: [
    { nombre: "Universidad Nacional de Jujuy", provincia: "Jujuy", web: "http://www.fca.unju.edu.ar/", duracion: "3 años" }
    ],
  },
  {
    id: "t_cnico_universitario_en_transformaci_n",
    titulo: "Técnico Universitario en Transformación de la Producción Agropecuaria",
    macroArea: "Agropecuarias y Producción Alimentaria",
    familia: "Agronomía, agro y producción",
    universidades: [
    { nombre: "Universidad Nacional de Jujuy", provincia: "Jujuy", web: "http://www.fca.unju.edu.ar/", duracion: "3 años" }
    ],
  },
  {
    id: "t_cnico_a_universitario_a_en_gesti_n_y_t",
    titulo: "Técnico/a Universitario/a en Gestión y Tecnología de Alimentos",
    macroArea: "Veterinaria",
    familia: "Veterinaria y salud animal",
    universidades: [
    { nombre: "Universidad Nacional de La Pampa", provincia: "La Pampa", web: "www.vet.unlpam.edu.ar", duracion: "3 años" }
    ],
  },
  {
    id: "t_cnico_universitario_en_recursos_natura",
    titulo: "Técnico Universitario en Recursos Naturales Renovables con Orientación en Producción Frutihortícola",
    macroArea: "Ambiente y Recursos Naturales",
    familia: "Ambiente, biodiversidad y recursos naturales",
    universidades: [
    { nombre: "Universidad Nacional de la Patagonia Austral", provincia: "Santa Cruz", web: "http://www.uaco.unpa.edu.ar/", duracion: "3 años" }
    ],
  },
  {
    id: "t_cnico_universitario_en_recursos_natura_2",
    titulo: "Técnico Universitario en Recursos Naturales Renovables con Orientación en Producción Acuícola",
    macroArea: "Ambiente y Recursos Naturales",
    familia: "Ambiente, biodiversidad y recursos naturales",
    universidades: [
    { nombre: "Universidad Nacional de la Patagonia Austral", provincia: "Santa Cruz", web: "https://www.portal.uasj.unpa.edu.ar", duracion: "3 años" }
    ],
  },
  {
    id: "t_cnico_universitario_en_recursos_natura_3",
    titulo: "Técnico Universitario en Recursos Naturales Renovables con Orientación en Producción Agropecuaria",
    macroArea: "Ambiente y Recursos Naturales",
    familia: "Ambiente, biodiversidad y recursos naturales",
    universidades: [
    { nombre: "Universidad Nacional de la Patagonia Austral", provincia: "Santa Cruz", web: "http://www.uart.unpa.edu.ar", duracion: "3 años" }
    ],
  },
  {
    id: "ingeniero_civil_orientaci_n_construccion",
    titulo: "Ingeniero Civil orientación Construcciones",
    macroArea: "Ingeniería Civil, Construcción e Infraestructura",
    familia: "Civil, obras e infraestructura",
    universidades: [
    { nombre: "Universidad Nacional de la Patagonia San Juan Bosco", provincia: "Chubut", web: "www.unp.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "ingeniero_civil_orientaci_n_hidr_ulica",
    titulo: "Ingeniero Civil orientación Hidráulica",
    macroArea: "Ingeniería Civil, Construcción e Infraestructura",
    familia: "Civil, obras e infraestructura",
    universidades: [
    { nombre: "Universidad Nacional de la Patagonia San Juan Bosco", provincia: "Chubut", web: "www.unp.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "geof_sico",
    titulo: "Geofísico",
    macroArea: "Ciencias Exactas y Naturales",
    familia: "Física, ciencias básicas y aplicadas",
    universidades: [
    { nombre: "Universidad Nacional de La Plata", provincia: "Buenos Aires", web: "www.fcaglp.unlp.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_meteorolog_a_y_ciencias_de",
    titulo: "Licenciado en Meteorología y Ciencias de la Atmósfera",
    macroArea: "Ambiente y Recursos Naturales",
    familia: "Ambiente, biodiversidad y recursos naturales",
    universidades: [
    { nombre: "Universidad Nacional de La Plata", provincia: "Buenos Aires", web: "www.fcaglp.unlp.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_ptica_ocular_y_optometr_a",
    titulo: "Licenciado en Óptica Ocular y Optometría",
    macroArea: "Ciencias Exactas y Naturales",
    familia: "Física, ciencias básicas y aplicadas",
    universidades: [
    { nombre: "Universidad Nacional de La Plata", provincia: "Buenos Aires", web: "www.exactas.unlp.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "t_cnico_superior_universitario_en_produc",
    titulo: "Técnico Superior Universitario en Producción Agropecuaria",
    macroArea: "Veterinaria",
    familia: "Veterinaria y salud animal",
    universidades: [
    { nombre: "Universidad Nacional de La Plata", provincia: "Buenos Aires", web: "www.fcv.unlp.edu.ar", duracion: "3 años" }
    ],
  },
  {
    id: "licenciado_en_tecnolog_a_de_los_alimento_3",
    titulo: "Licenciado en Tecnología de los Alimentos - Mención Tecnología de los Alimentos de Origen Animal",
    macroArea: "Veterinaria",
    familia: "Veterinaria y salud animal",
    universidades: [
    { nombre: "Universidad Nacional del Centro de la Provincia de Buenos Aires", provincia: "Buenos Aires", web: "www.vet.unicen.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "t_cnico_a_en_alimentaci_n_de_ganado_vacu",
    titulo: "Técnico/a en Alimentación de Ganado Vacuno - MD",
    macroArea: "Veterinaria",
    familia: "Veterinaria y salud animal",
    universidades: [
    { nombre: "Universidad Nacional del Litoral", provincia: "Santa Fé", web: "www.fcv.unl.edu.ar", duracion: "2 años" }
    ],
  },
  {
    id: "t_cnico_a_en_producci_n_primaria_de_lech",
    titulo: "Técnico/a en Producción Primaria de Leche - MD",
    macroArea: "Veterinaria",
    familia: "Veterinaria y salud animal",
    universidades: [
    { nombre: "Universidad Nacional del Litoral", provincia: "Santa Fé", web: "www.fcv.unl.edu.ar", duracion: "2.5 años" }
    ],
  },
  {
    id: "t_cnico_universitario_en_tecnolog_a_de_a",
    titulo: "Técnico Universitario en Tecnología de Alimentos",
    macroArea: "Veterinaria",
    familia: "Veterinaria y salud animal",
    universidades: [
    { nombre: "Universidad Nacional del Litoral", provincia: "Santa Fé", web: "www.fcv.unl.edu.ar", duracion: "3 años" }
    ],
  },
  {
    id: "t_cnico_universitario_en_biotecnolog_a",
    titulo: "Técnico Universitario en Biotecnología",
    macroArea: "Ciencias Biológicas y Biotecnología",
    familia: "Biología, genética y biotecnología",
    universidades: [
    { nombre: "Universidad Nacional de Quilmes", provincia: "Buenos Aires", web: "http://www.unq.edu.ar/", duracion: "3 años" }
    ],
  },
  {
    id: "licenciado_en_geolog_a_2",
    titulo: "Licenciado en Geología",
    macroArea: "Ambiente y Recursos Naturales",
    familia: "Ambiente, biodiversidad y recursos naturales",
    universidades: [
    { nombre: "Universidad Nacional de Tierra del Fuego, Antártida e Islas del Atlántico Sur", provincia: "Tierra Del Fuego", web: "www.untdf.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "ingeniero_a_agr_nomo_a_2",
    titulo: "Ingeniero/a Agrónomo/a",
    macroArea: "Veterinaria",
    familia: "Veterinaria y salud animal",
    universidades: [
    { nombre: "Universidad Nacional de Tucumán", provincia: "Tucumán", web: "faz.unt.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "ingeniero_a_zootecnista",
    titulo: "Ingeniero/a Zootecnista",
    macroArea: "Veterinaria",
    familia: "Veterinaria y salud animal",
    universidades: [
    { nombre: "Universidad Nacional de Tucumán", provincia: "Tucumán", web: "faz.unt.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_a_en_biolog_a",
    titulo: "Licenciado/a en Biología",
    macroArea: "Ciencias Biológicas y Biotecnología",
    familia: "Biología, genética y biotecnología",
    universidades: [
    { nombre: "Universidad Autónoma de Entre Ríos", provincia: "Entre Ríos", web: "http://fcyt.uader.edu.ar/web", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_ciencias_biol_gicas_3",
    titulo: "Licenciado en Ciencias Biológicas",
    macroArea: "Ambiente y Recursos Naturales",
    familia: "Ambiente, biodiversidad y recursos naturales",
    universidades: [
    { nombre: "Universidad CAECE", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.ucaece.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_ambiente_y_energ_as_renova",
    titulo: "Licenciado en Ambiente y Energías Renovables",
    macroArea: "Ambiente y Recursos Naturales",
    familia: "Ambiente, biodiversidad y recursos naturales",
    universidades: [
    { nombre: "Universidad Empresarial Siglo 21", provincia: "Córdoba", web: "http://www.21.edu.ar/", duracion: "4 años" }
    ],
  },
  {
    id: "t_cnico_universitario_en_gesti_n_y_audit",
    titulo: "Técnico Universitario en Gestión y Auditorías Ambientales - MD",
    macroArea: "Contabilidad e Impuestos",
    familia: "Contabilidad, auditoría e impuestos",
    universidades: [
    { nombre: "Universidad Empresarial Siglo 21", provincia: "Córdoba", web: "www.21.edu.ar", duracion: "2.5 años" }
    ],
  },
  {
    id: "licenciado_en_ciencias_ambientales_2",
    titulo: "Licenciado en Ciencias Ambientales",
    macroArea: "Veterinaria",
    familia: "Veterinaria y salud animal",
    universidades: [
    { nombre: "Universidad Juan Agustín Maza", provincia: "Mendoza", web: "http://www.umaza.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "t_cnico_universitario_en_conservaci_n_de",
    titulo: "Técnico Universitario en Conservación de la Naturaleza y Areas Naturales Protegidas",
    macroArea: "Ambiente y Recursos Naturales",
    familia: "Ambiente, biodiversidad y recursos naturales",
    universidades: [
    { nombre: "Universidad Nacional de Avellaneda", provincia: "Buenos Aires", web: "http://www.undav.edu.ar", duracion: "3 años" }
    ],
  },
  {
    id: "licenciado_en_ciencias_b_sicas_con_orien",
    titulo: "Licenciado en Ciencias Básicas con orientación en Biología",
    macroArea: "Ciencias Biológicas y Biotecnología",
    familia: "Biología, genética y biotecnología",
    universidades: [
    { nombre: "Universidad Nacional de Cuyo", provincia: "Mendoza", web: "www.fcen.uncuyo.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_biotecnolog_a_y_biolog_a_m",
    titulo: "Licenciado en Biotecnología y Biología Molecular",
    macroArea: "Ciencias Biológicas y Biotecnología",
    familia: "Biología, genética y biotecnología",
    universidades: [
    { nombre: "Universidad Nacional de La Plata", provincia: "Buenos Aires", web: "www.exactas.unlp.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_qu_mica_y_tecnolog_a_ambie",
    titulo: "Licenciado en Química y Tecnología Ambiental",
    macroArea: "Ambiente y Recursos Naturales",
    familia: "Ambiente, biodiversidad y recursos naturales",
    universidades: [
    { nombre: "Universidad Nacional de La Plata", provincia: "Buenos Aires", web: "www.exactas.unlp.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_biolog_a_orientaci_n_bot_n",
    titulo: "Licenciado en Biología orientación Botánica",
    macroArea: "Ciencias Biológicas y Biotecnología",
    familia: "Biología, genética y biotecnología",
    universidades: [
    { nombre: "Universidad Nacional de La Plata", provincia: "Buenos Aires", web: "www.fcnym.unlp.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_biolog_a_orientaci_n_ecolo",
    titulo: "Licenciado en Biología orientación Ecología",
    macroArea: "Ciencias Biológicas y Biotecnología",
    familia: "Biología, genética y biotecnología",
    universidades: [
    { nombre: "Universidad Nacional de La Plata", provincia: "Buenos Aires", web: "www.fcnym.unlp.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_biolog_a_orientaci_n_paleo",
    titulo: "Licenciado en Biología orientación Paleontología",
    macroArea: "Ciencias Biológicas y Biotecnología",
    familia: "Biología, genética y biotecnología",
    universidades: [
    { nombre: "Universidad Nacional de La Plata", provincia: "Buenos Aires", web: "www.fcnym.unlp.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_biolog_a_orientaci_n_zoolo",
    titulo: "Licenciado en Biología orientación Zoología",
    macroArea: "Ciencias Biológicas y Biotecnología",
    familia: "Biología, genética y biotecnología",
    universidades: [
    { nombre: "Universidad Nacional de La Plata", provincia: "Buenos Aires", web: "www.fcnym.unlp.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_a_en_educaci_n_f_sica_md",
    titulo: "Licenciado/a en Educación Física- MD",
    macroArea: "Deportes y Actividad Física",
    familia: "Educación física y deporte",
    universidades: [
    { nombre: "Instituto Universitario River Plate", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.iuriverplate.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "profesor_a_universitario_a_en_educaci_n",
    titulo: "Profesor/a Universitario/a en Educación Física - MD",
    macroArea: "Deportes y Actividad Física",
    familia: "Educación física y deporte",
    universidades: [
    { nombre: "Instituto Universitario River Plate", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.iuriverplate.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "int_rprete_simult_neo_de_idioma_ingl_s",
    titulo: "Intérprete Simultáneo de Idioma Inglés",
    macroArea: "Lenguas, Traducción y Letras",
    familia: "Idiomas, traducción y letras",
    universidades: [
    { nombre: "Universidad Argentina de la Empresa", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uade.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "traductor_cient_fico_t_cnico_de_idioma_i",
    titulo: "Traductor Científico-Técnico de Idioma Inglés",
    macroArea: "Lenguas, Traducción y Letras",
    familia: "Idiomas, traducción y letras",
    universidades: [
    { nombre: "Universidad Argentina de la Empresa", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uade.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "traductor_p_blico_en_idioma_ingl_s",
    titulo: "Traductor Público en Idioma Inglés",
    macroArea: "Lenguas, Traducción y Letras",
    familia: "Idiomas, traducción y letras",
    universidades: [
    { nombre: "Universidad Argentina de la Empresa", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uade.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "traductor_a_p_blico_a_de_ingl_s",
    titulo: "Traductor/a Público/a de Inglés",
    macroArea: "Lenguas, Traducción y Letras",
    familia: "Idiomas, traducción y letras",
    universidades: [
    { nombre: "Universidad CAECE", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.ucaece.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_lengua_y_literatura_ingles",
    titulo: "Licenciado en Lengua y Literatura Inglesas",
    macroArea: "Lenguas, Traducción y Letras",
    familia: "Idiomas, traducción y letras",
    universidades: [
    { nombre: "Universidad Católica de las Misiones", provincia: "Misiones", web: "www.ucami.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "t_cnico_universitario_en_traducci_n_e_in",
    titulo: "Técnico Universitario en Traducción e Interpretación en Inglés",
    macroArea: "Lenguas, Traducción y Letras",
    familia: "Idiomas, traducción y letras",
    universidades: [
    { nombre: "Universidad Católica de las Misiones", provincia: "Misiones", web: "www.ucami.edu.ar", duracion: "3 años" }
    ],
  },
  {
    id: "traductor_a_p_blico_a_literario_a_y_cien",
    titulo: "Traductor/a Público/a, Literario/a y Científico/a Técnico/a de Inglés",
    macroArea: "Lenguas, Traducción y Letras",
    familia: "Idiomas, traducción y letras",
    universidades: [
    { nombre: "Universidad de Belgrano", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.ub.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "traductor_a_p_blico_a_literario_a_y_t_cn",
    titulo: "Traductor/a Público/a, Literario/a y Técnico/a Científico/a de Inglés",
    macroArea: "Lenguas, Traducción y Letras",
    familia: "Idiomas, traducción y letras",
    universidades: [
    { nombre: "Universidad de Belgrano", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.ub.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "int_rprete_de_conferencias_en_idioma_ing",
    titulo: "Intérprete de Conferencias en Idioma Inglés",
    macroArea: "Lenguas, Traducción y Letras",
    familia: "Idiomas, traducción y letras",
    universidades: [
    { nombre: "Universidad del Museo Social Argentino", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.umsa.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "traductor_a_p_blico_a_en_idioma_ingl_s_m",
    titulo: "Traductor/a Público/a en Idioma Inglés - MD",
    macroArea: "Lenguas, Traducción y Letras",
    familia: "Idiomas, traducción y letras",
    universidades: [
    { nombre: "Universidad del Museo Social Argentino", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.umsa.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "traductor_p_blico_idioma_ingl_s",
    titulo: "Traductor Público (Idioma Inglés)",
    macroArea: "Lenguas, Traducción y Letras",
    familia: "Idiomas, traducción y letras",
    universidades: [
    { nombre: "Universidad del Museo Social Argentino", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.umsa.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_interpretaci_n_de_conferen",
    titulo: "Licenciado en Interpretación de Conferencias en Inglés",
    macroArea: "Lenguas, Traducción y Letras",
    familia: "Idiomas, traducción y letras",
    universidades: [
    { nombre: "Universidad del Salvador", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.usal.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_educaci_n_f_sica_y_deporte",
    titulo: "Licenciado en Educación Física y Deporte",
    macroArea: "Deportes y Actividad Física",
    familia: "Educación física y deporte",
    universidades: [
    { nombre: "Universidad Maimónides", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.maimonides.edu", duracion: "5 años" }
    ],
  },
  {
    id: "profesor_universitario_de_educaci_n_f_si_3",
    titulo: "Profesor Universitario de Educación Física y Deporte",
    macroArea: "Deportes y Actividad Física",
    familia: "Educación física y deporte",
    universidades: [
    { nombre: "Universidad Maimónides", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.maimonides.edu", duracion: "4 años" }
    ],
  },
  {
    id: "profesor_en_educaci_n_f_sica_y_deportes",
    titulo: "Profesor en Educación Física y Deportes",
    macroArea: "Deportes y Actividad Física",
    familia: "Educación física y deporte",
    universidades: [
    { nombre: "Universidad Metropolitana para la Educación y el Trabajo", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.umet.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "t_cnico_a_universitario_a_en_actividad_f",
    titulo: "Técnico/a Universitario/a en Actividad Física",
    macroArea: "Deportes y Actividad Física",
    familia: "Educación física y deporte",
    universidades: [
    { nombre: "Universidad Provincial de Córdoba", provincia: "Córdoba", web: "https://fef.upc.edu.ar/", duracion: "3 años" }
    ],
  },
  {
    id: "licenciado_a_en_administraci_n_hotelera",
    titulo: "Licenciado/a en Administración Hotelera - MD",
    macroArea: "Turismo, Gastronomía y Hospitalidad",
    familia: "Turismo, hotelería y gastronomía",
    universidades: [
    { nombre: "Instituto Universitario Escuela Argentina de Negocios", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://www.iuean.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_a_en_direcci_n_del_factor_hum",
    titulo: "Licenciado/a en Dirección del Factor Humano - MD",
    macroArea: "Recursos Humanos y Organizaciones",
    familia: "RRHH y desarrollo organizacional",
    universidades: [
    { nombre: "Instituto Universitario Escuela Argentina de Negocios", provincia: "Ciudad Autonoma de Buenos Aires", web: "http://www.iuean.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "gu_a_universitario_en_turismo",
    titulo: "Guía Universitario en Turismo",
    macroArea: "Turismo, Gastronomía y Hospitalidad",
    familia: "Turismo, hotelería, eventos y gastronomía",
    universidades: [
    { nombre: "Universidad Abierta Interamericana", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uai.edu.ar", duracion: "3 años" }
    ],
  },
  {
    id: "t_cnico_universitario_en_gesti_n_y_organ_2",
    titulo: "Técnico Universitario en Gestión y Organización de Eventos - MD",
    macroArea: "Turismo, Gastronomía y Hospitalidad",
    familia: "Turismo, hotelería y gastronomía",
    universidades: [
    { nombre: "Universidad Abierta Interamericana", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uai.edu.ar", duracion: "2.5 años" }
    ],
  },
  {
    id: "licenciado_en_gobierno_y_relaciones_inte",
    titulo: "Licenciado en Gobierno y Relaciones Internacionales",
    macroArea: "Gobierno, Política y Relaciones Internacionales",
    familia: "Gobierno, política y RRII",
    universidades: [
    { nombre: "Universidad Argentina de la Empresa", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uade.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "t_cnico_a_universitario_a_en_gesti_n_de",
    titulo: "Técnico/a Universitario/a en Gestión de Agencias de Viajes y Turismo - MD",
    macroArea: "Turismo, Gastronomía y Hospitalidad",
    familia: "Turismo, hotelería y gastronomía",
    universidades: [
    { nombre: "Universidad Atlántida Argentina", provincia: "Buenos Aires", web: "http://www.atlantida.edu.ar/", duracion: "2.5 años" }
    ],
  },
  {
    id: "contador_p_blico_4a",
    titulo: "Contador Público - 4a",
    macroArea: "Contabilidad e Impuestos",
    familia: "Contabilidad, auditoría e impuestos",
    universidades: [
    { nombre: "Universidad Blas Pascal", provincia: "Córdoba", web: "http://www.ubp.edu.ar/", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_a_en_administraci_n_de_recurs",
    titulo: "Licenciado/a en Administración de Recursos Humanos - MD",
    macroArea: "Recursos Humanos y Organizaciones",
    familia: "RRHH y desarrollo organizacional",
    universidades: [
    { nombre: "Universidad CAECE", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.ucaece.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "t_cnico_universitario_en_recursos_humano",
    titulo: "Técnico Universitario en Recursos Humanos y Relaciones Laborales - MD",
    macroArea: "Recursos Humanos y Organizaciones",
    familia: "RRHH y desarrollo organizacional",
    universidades: [
    { nombre: "Universidad Católica de Cuyo", provincia: "San Juan", web: "www.uccuyo.edu.ar", duracion: "3 años" }
    ],
  },
  {
    id: "t_cnico_universitario_contable_impositiv",
    titulo: "Técnico Universitario Contable Impositivo",
    macroArea: "Contabilidad e Impuestos",
    familia: "Contabilidad, auditoría e impuestos",
    universidades: [
    { nombre: "Universidad Católica de Santiago del Estero", provincia: "Santiago Del Estero", web: "http://www.ucse.edu.ar/web/sede_sgo/fce/sc%20fce.htm", duracion: "3 años" }
    ],
  },
  {
    id: "escribano",
    titulo: "Escribano",
    macroArea: "Gobierno, Política y Relaciones Internacionales",
    familia: "Gobierno, política y RRII",
    universidades: [
    { nombre: "Universidad Católica de Santiago del Estero", provincia: "Santiago Del Estero", web: "http://www.ucse.edu.ar/web/sede_sgo/fcpsj/sc%20fcpsj.htm", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_a_en_ciencias_pol_ticas",
    titulo: "Licenciado/a en Ciencias Políticas",
    macroArea: "Gobierno, Política y Relaciones Internacionales",
    familia: "Gobierno, política y RRII",
    universidades: [
    { nombre: "Universidad Católica de Santiago del Estero", provincia: "Santiago Del Estero", web: "http://www.ucse.edu.ar/web/sede_sgo/fcpsj/sc%20fcpsj.htm", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_a_en_ciencia_pol_tica_y_de_go",
    titulo: "Licenciado/a en Ciencia Política y de Gobierno - MD",
    macroArea: "Gobierno, Política y Relaciones Internacionales",
    familia: "Gobierno, política y RRII",
    universidades: [
    { nombre: "Universidad de Ciencias Empresariales y Sociales", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.uces.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_a_en_gesti_n_de_recursos_huma",
    titulo: "Licenciado/a en Gestión de Recursos Humanos",
    macroArea: "Recursos Humanos y Organizaciones",
    familia: "RRHH y desarrollo organizacional",
    universidades: [
    { nombre: "Universidad de Flores", provincia: "Río Negro", web: "www.uflo.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "analista_universitario_a_contable",
    titulo: "Analista Universitario/a Contable",
    macroArea: "Contabilidad e Impuestos",
    familia: "Contabilidad, auditoría e impuestos",
    universidades: [
    { nombre: "Universidad de la Cuenca del Plata", provincia: "Corrientes", web: "www.ucp.edu.ar", duracion: "3 años" }
    ],
  },
  {
    id: "analista_universitario_a_contable_md",
    titulo: "Analista Universitario/a Contable - MD",
    macroArea: "Contabilidad e Impuestos",
    familia: "Contabilidad, auditoría e impuestos",
    universidades: [
    { nombre: "Universidad de la Cuenca del Plata", provincia: "Corrientes", web: "www.ucp.edu.ar", duracion: "3 años" }
    ],
  },
  {
    id: "contador_a_p_blico_a_md",
    titulo: "Contador/a Público/a - MD",
    macroArea: "Contabilidad e Impuestos",
    familia: "Contabilidad, auditoría e impuestos",
    universidades: [
    { nombre: "Universidad de la Cuenca del Plata", provincia: "Corrientes", web: "www.ucp.edu.ar", duracion: "4.5 años" }
    ],
  },
  {
    id: "analista_administrativo_a_contable_md",
    titulo: "Analista Administrativo/a Contable - MD",
    macroArea: "Contabilidad e Impuestos",
    familia: "Contabilidad, auditoría e impuestos",
    universidades: [
    { nombre: "Universidad de la Marina Mercante", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.udemm.edu.ar", duracion: "3 años" }
    ],
  },
  {
    id: "licenciado_a_en_relaciones_internacional_3",
    titulo: "Licenciado/a en Relaciones Internacionales - MD",
    macroArea: "Gobierno, Política y Relaciones Internacionales",
    familia: "Gobierno, política y RRII",
    universidades: [
    { nombre: "Universidad de Palermo", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.palermo.edu", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_ciencia_pol_tica_md",
    titulo: "Licenciado en Ciencia Política - MD",
    macroArea: "Ciencias Sociales y Comunitarias",
    familia: "Sociología, trabajo social y comunidad",
    universidades: [
    { nombre: "Universidad de Palermo", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.palermo.edu", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_a_en_antropolog_a_organizacio",
    titulo: "Licenciado/a en Antropología Organizacional",
    macroArea: "Recursos Humanos y Organizaciones",
    familia: "RRHH y desarrollo organizacional",
    universidades: [
    { nombre: "Universidad Empresarial Siglo 21", provincia: "Córdoba", web: "http://www.21.edu.ar/", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_a_en_antropolog_a_organizacio_2",
    titulo: "Licenciado/a en Antropología Organizacional - MD",
    macroArea: "Recursos Humanos y Organizaciones",
    familia: "RRHH y desarrollo organizacional",
    universidades: [
    { nombre: "Universidad Empresarial Siglo 21", provincia: "Córdoba", web: "http://www.21.edu.ar/", duracion: "4 años" }
    ],
  },
  {
    id: "t_cnico_en_administraci_n_y_gesti_n_trib",
    titulo: "Técnico en Administración y Gestión Tributaria - MD",
    macroArea: "Contabilidad e Impuestos",
    familia: "Contabilidad, auditoría e impuestos",
    universidades: [
    { nombre: "Universidad Empresarial Siglo 21", provincia: "Córdoba", web: "www.21.edu.ar", duracion: "2.5 años" }
    ],
  },
  {
    id: "licenciado_en_turismo_5",
    titulo: "Licenciado en Turismo",
    macroArea: "Deportes y Actividad Física",
    familia: "Educación física y deporte",
    universidades: [
    { nombre: "Universidad Metropolitana para la Educación y el Trabajo", provincia: "Ciudad Autonoma de Buenos Aires", web: "www.umet.edu.ar", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_pol_tica_social",
    titulo: "Licenciado en Política Social",
    macroArea: "Ciencias Sociales y Comunitarias",
    familia: "Sociología, trabajo social y comunidad",
    universidades: [
    { nombre: "Universidad Nacional de General Sarmiento", provincia: "Buenos Aires", web: "www.ungs.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_antropolog_a_orientaci_n_a",
    titulo: "Licenciado en Antropología orientación Arqueología",
    macroArea: "Ciencias Sociales y Comunitarias",
    familia: "Sociología, trabajo social y comunidad",
    universidades: [
    { nombre: "Universidad Nacional del Centro de la Provincia de Buenos Aires", provincia: "Buenos Aires", web: "http://www.soc.unicen.edu.ar", duracion: "5 años" }
    ],
  },
  {
    id: "licenciado_en_ciencias_antropol_gicas_co",
    titulo: "Licenciado en Ciencias Antropológicas con Orientación Sociocultural",
    macroArea: "Ciencias Sociales y Comunitarias",
    familia: "Sociología, trabajo social y comunidad",
    universidades: [
    { nombre: "Universidad Nacional de Río Negro", provincia: "Río Negro", web: "https://www.unrn.edu.ar/", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_protecci_n_civil_y_emergen",
    titulo: "Licenciado en Protección Civil y Emergencias",
    macroArea: "Ingeniería Civil, Construcción e Infraestructura",
    familia: "Civil, obras e infraestructura",
    universidades: [
    { nombre: "Universidad Nacional de Tres de Febrero", provincia: "Buenos Aires", web: "http://www.untref.edu.ar/", duracion: "4 años" }
    ],
  },
  {
    id: "licenciado_en_protecci_n_civil_y_emergen_2",
    titulo: "Licenciado en Protección Civil y Emergencias - MD",
    macroArea: "Ingeniería Civil, Construcción e Infraestructura",
    familia: "Civil, obras e infraestructura",
    universidades: [
    { nombre: "Universidad Nacional de Tres de Febrero", provincia: "Buenos Aires", web: "http://www.untrefvirtual.edu.ar", duracion: "4 años" }
    ],
  },
];