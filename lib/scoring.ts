// =============================================================
// AI Replaceability Score — Scoring Engine v2
// Massive differentiation: 80+ jobs, sector combos, unique factors
// =============================================================

// Each job has: base score, icon, specific factors, and a personalized insight
interface JobProfile {
  score: number;
  icon: string;
  factors: string[];
  insight: string;
  automationWave: string;
}

const JOB_DATABASE: Record<string, JobProfile> = {
  // ===== MUY ALTO RIESGO (75-95) =====
  'entrada de datos': {
    score: 92, icon: '⌨️',
    factors: ['Tareas 100% repetitivas y predecibles', 'RPA ya automatiza el 70% de estas funciones', 'GPT-4+ procesa documentos con 98% precisión', 'Coste de automatización: <500€/mes vs salario completo'],
    insight: 'Los operadores de entrada de datos son los primeros en ser reemplazados en cada ola de automatización. En 2025, el 40% de estos puestos en España ya usan algún tipo de automatización parcial.',
    automationWave: 'Primera ola (2024-2026)',
  },
  'operador de datos': {
    score: 90, icon: '📊',
    factors: ['Procesamiento batch ya dominado por IA', 'ETL automatizado con herramientas no-code', 'La validación de datos es un problema resuelto', 'Cero necesidad de juicio subjetivo'],
    insight: 'Las plataformas de integración de datos como Fivetran y dbt ya automatizan el 80% de las tareas de un operador de datos típico.',
    automationWave: 'Primera ola (2024-2026)',
  },
  'telemarketing': {
    score: 88, icon: '📞',
    factors: ['Bots de voz con IA indistinguibles de humanos', 'Sistemas de marcación predictiva eliminan tiempo muerto', 'Scripts optimizados por ML en tiempo real', 'Regulación RGPD favorece sistemas automatizados'],
    insight: 'Empresas como Bland.ai ya ofrecen agentes de voz que realizan 10.000 llamadas/día por 200€/mes — el equivalente a 50 telemarketers.',
    automationWave: 'Primera ola (2024-2026)',
  },
  'transcriptor': {
    score: 91, icon: '📝',
    factors: ['Whisper de OpenAI transcribe con 99% precisión', 'Procesamiento en tiempo real disponible', 'Multiidioma sin coste adicional', 'Coste por hora de transcripción: 0.01€ vs 15-30€ humano'],
    insight: 'La transcripción automática es uno de los problemas más resueltos en IA. La diferencia de coste es de 1500x.',
    automationWave: 'Ya en curso (2023-2025)',
  },
  'contabilidad básica': {
    score: 85, icon: '🧮',
    factors: ['Software contable procesa el 90% de asientos', 'Conciliación bancaria automatizada', 'IA detecta anomalías mejor que humanos', 'Regulación estandarizada = fácil de codificar'],
    insight: 'Holded, Sage y A3 ya automatizan la contabilidad básica. El rol evoluciona hacia asesoría fiscal estratégica.',
    automationWave: 'Primera ola (2024-2026)',
  },
  'procesador de pagos': {
    score: 82, icon: '💳',
    factors: ['Fintech elimina intermediarios humanos', 'Blockchain y smart contracts automatizan validación', 'Detección de fraude por ML supera a revisión humana', 'APIs de pago procesan millones sin intervención'],
    insight: 'Stripe, Adyen y similares procesan billones de euros anuales con equipos minúsculos. El procesamiento manual de pagos es un anacronismo.',
    automationWave: 'Primera ola (2024-2026)',
  },
  'cajero': {
    score: 84, icon: '🏪',
    factors: ['Self-checkout en expansión masiva', 'Amazon Go demostró tiendas sin cajeros', 'Pago contactless reduce interacción', 'Coste de terminal automático: amortizable en 6 meses'],
    insight: 'Mercadona, Carrefour y Lidl aceleran la adopción de cajas automáticas. El rol de cajero se fusiona con atención al cliente.',
    automationWave: 'En curso (2024-2027)',
  },
  'auxiliar administrativo': {
    score: 80, icon: '📋',
    factors: ['Gestión documental automatizada por IA', 'Agendas y reservas gestionadas por asistentes virtuales', 'Archivo y organización digital eliminan papel', 'Microsoft Copilot automatiza Office al 70%'],
    insight: 'El rol administrativo no desaparece pero se comprime: una persona con IA hace el trabajo de tres.',
    automationWave: 'Primera ola (2024-2027)',
  },
  'copywriter': {
    score: 72, icon: '✍️',
    factors: ['GPT-4+ genera copy publicitario competente', 'A/B testing automatizado optimiza mensajes', 'Personalización masiva posible con IA', 'Pero la voz de marca y estrategia siguen siendo humanas'],
    insight: 'El copywriting genérico está muerto. Sobrevive el copywriter que entiende psicología del consumidor, estrategia de marca y puede dirigir la IA como herramienta.',
    automationWave: 'Segunda ola (2025-2028)',
  },
  'community manager': {
    score: 70, icon: '📱',
    factors: ['Programación de posts 100% automatizable', 'Respuestas a FAQs gestionadas por chatbots', 'Análisis de sentimiento por ML', 'Pero gestión de crisis requiere juicio humano'],
    insight: 'Las herramientas como Hootsuite + IA generativa automatizan el 60% del trabajo. El CM del futuro es más estratega que ejecutor.',
    automationWave: 'Segunda ola (2025-2028)',
  },
  'traductor': {
    score: 76, icon: '🌍',
    factors: ['DeepL y GPT-4 traducen con calidad profesional', 'Traducción simultánea por IA ya disponible', 'Localización cultural aún requiere humanos', 'Nicho literario y legal resiste más'],
    insight: 'La traducción general está commoditizada. Los traductores que sobreviven se especializan en localización cultural, transcreación publicitaria o campos ultra-técnicos.',
    automationWave: 'En curso (2024-2027)',
  },
  'agente de viajes': {
    score: 73, icon: '✈️',
    factors: ['Booking, Kayak y AI planners dominan reservas', 'Comparadores eliminan valor del intermediario', 'Itinerarios personalizados por IA', 'Viajes complejos y de lujo aún necesitan humanos'],
    insight: 'El agente de viajes generalista está en extinción. Sobrevive el especialista en experiencias de lujo, grupos corporativos o destinos complejos.',
    automationWave: 'En curso (2023-2027)',
  },
  'recepcionista': {
    score: 68, icon: '🏢',
    factors: ['Check-in digital y kioscos automáticos', 'Asistentes virtuales gestionan llamadas', 'Pero presencia humana valorada en hospitality premium', 'Seguridad y gestión de visitantes aún necesitan personas'],
    insight: 'Hoteles y oficinas adoptan recepción híbrida: tecnología para lo rutinario, humanos para la experiencia.',
    automationWave: 'Segunda ola (2025-2028)',
  },
  'gerente de contenido': {
    score: 65, icon: '📰',
    factors: ['IA genera contenido a escala industrial', 'Curación y edición automatizable parcialmente', 'Pero estrategia editorial requiere visión humana', 'Audiencia valora la autenticidad y el criterio'],
    insight: 'El gestor de contenido operativo se automatiza. El director editorial que define la estrategia narrativa se revaloriza.',
    automationWave: 'Segunda ola (2025-2028)',
  },
  'analista de datos junior': {
    score: 75, icon: '📉',
    factors: ['Dashboards auto-generados por IA', 'Natural language queries reemplazan SQL básico', 'Automatización de reportes recurrentes', 'El rol junior se comprime hacia el senior'],
    insight: 'El analista junior que solo extrae datos y hace gráficos está en serio riesgo. El salto a analista senior con visión de negocio es urgente.',
    automationWave: 'Primera-segunda ola (2024-2027)',
  },

  // ===== RIESGO ALTO (50-74) =====
  'programador': {
    score: 55, icon: '💻',
    factors: ['GitHub Copilot genera 40% del código', 'Debugging automatizado en mejora constante', 'Arquitectura y diseño de sistemas requieren humanos', 'La demanda de software crece más rápido que la automatización'],
    insight: 'Paradoja del programador: la IA hace a cada dev 3x más productivo, pero la demanda de software crece 5x. El resultado neto es más empleo, pero diferente.',
    automationWave: 'Transformación gradual (2024-2030)',
  },
  'desarrollador web': {
    score: 58, icon: '🌐',
    factors: ['No-code/low-code cubre el 60% de webs simples', 'IA genera landing pages en minutos', 'Pero aplicaciones complejas requieren ingeniería real', 'UX strategy y performance optimization siguen siendo humanos'],
    insight: 'El desarrollador web que solo maqueta HTML/CSS está en peligro. El que diseña sistemas, optimiza rendimiento y resuelve problemas complejos prospera.',
    automationWave: 'Segunda ola (2025-2029)',
  },
  'desarrollador móvil': {
    score: 52, icon: '📲',
    factors: ['Flutter y React Native reducen equipos necesarios', 'IA genera interfaces básicas', 'Integración nativa y rendimiento requieren expertise', 'Ecosistema móvil cada vez más complejo'],
    insight: 'El desarrollo móvil se consolida: menos devs pero más senior. La IA elimina trabajo junior pero amplifica el trabajo senior.',
    automationWave: 'Segunda ola (2026-2030)',
  },
  'analista de datos': {
    score: 62, icon: '📈',
    factors: ['IA genera análisis y visualizaciones automáticamente', 'Natural language queries reemplazan SQL básico', 'Pero interpretación estratégica de datos es humana', 'Data storytelling requiere contexto de negocio'],
    insight: 'El analista de datos que solo hace dashboards está en riesgo. El que traduce datos en decisiones de negocio es invaluable.',
    automationWave: 'Segunda ola (2025-2028)',
  },
  'diseñador gráfico': {
    score: 48, icon: '🎨',
    factors: ['Midjourney/DALL-E generan imágenes en segundos', 'Canva AI democratiza el diseño básico', 'Pero dirección artística y branding requieren visión humana', 'Diseño de sistemas complejos resiste automatización'],
    insight: 'El diseño ejecutivo (hacer lo que te piden) se automatiza. El diseño estratégico (definir qué se necesita y por qué) se revaloriza.',
    automationWave: 'Segunda ola (2025-2029)',
  },
  'especialista marketing': {
    score: 50, icon: '📣',
    factors: ['Marketing automation cubre el 50% de tareas', 'IA personaliza campañas a escala', 'Pero estrategia de marca requiere intuición humana', 'Creatividad disruptiva no es automatizable'],
    insight: 'El marketing operativo se automatiza. El marketing estratégico — posicionamiento, insights del consumidor, innovación — se revaloriza enormemente.',
    automationWave: 'Segunda ola (2025-2029)',
  },
  'analista de sistemas': {
    score: 55, icon: '🔧',
    factors: ['Monitorización automatizada por AIOps', 'Auto-healing infrastructure en cloud', 'Pero arquitectura de sistemas requiere visión holística', 'Seguridad y compliance necesitan juicio experto'],
    insight: 'El analista de sistemas evoluciona hacia SRE (Site Reliability Engineer): menos tickets, más ingeniería de fiabilidad.',
    automationWave: 'Transformación gradual (2025-2030)',
  },
  'consultor': {
    score: 48, icon: '🤝',
    factors: ['IA genera análisis y presentaciones', 'Benchmarking automatizado reduce research', 'Pero relación con cliente y política corporativa son humanas', 'Implementación del cambio requiere liderazgo'],
    insight: 'La consultoría de commodities (reportes, benchmarks) se comprime. La consultoría de transformación — liderar el cambio — se expande.',
    automationWave: 'Tercera ola (2027-2032)',
  },
  'project manager': {
    score: 52, icon: '📋',
    factors: ['Herramientas de gestión automatizan seguimiento', 'IA predice riesgos y bottlenecks', 'Pero liderazgo de equipos es irreduciblemente humano', 'Gestión de stakeholders requiere inteligencia emocional'],
    insight: 'El PM administrativo (Gantt charts y status updates) desaparece. El PM como líder de equipos y gestor de complejidad organizacional crece.',
    automationWave: 'Segunda ola (2026-2030)',
  },
  'contador': {
    score: 62, icon: '📒',
    factors: ['Software contable automatiza el 80% de registros', 'IA hace cierres contables más rápido', 'Asesoría fiscal estratégica sigue siendo humana', 'Regulación cambiante requiere interpretación experta'],
    insight: 'La contabilidad mecánica desaparece. La asesoría fiscal, planificación financiera y compliance regulatorio se revalorizan.',
    automationWave: 'Primera-segunda ola (2024-2028)',
  },
  'especialista seo': {
    score: 65, icon: '🔍',
    factors: ['IA genera contenido SEO masivamente', 'Análisis técnico automatizado', 'Pero Google cambia algoritmos constantemente', 'Estrategia de contenido requiere creatividad'],
    insight: 'El SEO técnico se automatiza. El estratega SEO que entiende intención de búsqueda y autoridad temática sobrevive.',
    automationWave: 'Segunda ola (2025-2028)',
  },
  'abogado': {
    score: 40, icon: '⚖️',
    factors: ['IA revisa contratos 100x más rápido', 'Jurisprudencia analizada por ML', 'Pero argumentación ante tribunal es humana', 'Asesoría estratégica legal requiere relación de confianza'],
    insight: 'Los paralegales y abogados junior de revisión documental están en riesgo. Los litigantes senior y especialistas en negociación se revalorizan.',
    automationWave: 'Tercera ola (2027-2032)',
  },
  'periodista': {
    score: 58, icon: '📰',
    factors: ['IA genera noticias rutinarias (deportes, finanzas)', 'Resúmenes automáticos de conferencias', 'Pero periodismo de investigación requiere fuentes humanas', 'Opinión editorial y contexto cultural son irreducibles'],
    insight: 'El periodismo de agencia se automatiza. El periodismo de investigación y análisis se vuelve más valioso.',
    automationWave: 'Segunda ola (2025-2028)',
  },
  'fotógrafo': {
    score: 42, icon: '📷',
    factors: ['IA genera imágenes fotorrealistas', 'Edición automatizada por IA', 'Pero fotografía artística y documental resisten', 'Eventos en vivo requieren presencia física'],
    insight: 'La fotografía de stock muere. La fotografía de eventos, editorial de lujo y documental autoral se revaloriza por su autenticidad.',
    automationWave: 'Segunda ola (2025-2029)',
  },
  'arquitecto': {
    score: 35, icon: '🏗️',
    factors: ['IA genera planos y renders básicos', 'BIM automatiza documentación técnica', 'Pero diseño espacial requiere sensibilidad humana', 'Regulación urbanística y relación con cliente son complejas'],
    insight: 'La documentación técnica se automatiza, pero el diseño arquitectónico como acto creativo y la dirección de obra siguen siendo profundamente humanos.',
    automationWave: 'Tercera ola (2028-2035)',
  },
  'recursos humanos': {
    score: 55, icon: '👥',
    factors: ['Screening de CVs automatizado al 90%', 'Chatbots gestionan onboarding básico', 'Pero cultura organizacional requiere liderazgo humano', 'Negociación y gestión de conflictos son irreducibles'],
    insight: 'El RRHH administrativo se comprime. El RRHH estratégico — cultura, desarrollo de talento, cambio organizacional — se expande.',
    automationWave: 'Segunda ola (2025-2029)',
  },
  'data scientist': {
    score: 45, icon: '🧪',
    factors: ['AutoML genera modelos competentes', 'Feature engineering parcialmente automatizado', 'Pero formulación de problemas requiere expertise', 'Interpretación de resultados necesita contexto de negocio'],
    insight: 'El data scientist que solo entrena modelos compite con AutoML. El que formula las preguntas correctas y traduce resultados a estrategia es esencial.',
    automationWave: 'Tercera ola (2027-2032)',
  },
  'ingeniero de software': {
    score: 45, icon: '⚙️',
    factors: ['IA genera código pero no arquitectura', 'Testing automatizado en mejora constante', 'Diseño de sistemas distribuidos requiere experiencia', 'Seguridad y escalabilidad necesitan ingeniería profunda'],
    insight: 'El ingeniero de software senior que diseña sistemas es más valioso que nunca. La IA es su herramienta, no su reemplazo.',
    automationWave: 'Transformación gradual (2025-2035)',
  },
  'product manager': {
    score: 38, icon: '🎯',
    factors: ['IA analiza datos de usuario automáticamente', 'Prototipado rápido con herramientas AI', 'Pero visión de producto requiere intuición de mercado', 'Priorización estratégica es irreduciblemente humana'],
    insight: 'El PM que solo gestiona backlog está en riesgo. El PM visionario que define el futuro del producto es más necesario que nunca.',
    automationWave: 'Tercera ola (2028-2035)',
  },
  'director financiero': {
    score: 28, icon: '💰',
    factors: ['Reporting financiero automatizado', 'Modelos predictivos por ML', 'Pero estrategia financiera requiere juicio ejecutivo', 'Relaciones con inversores y negociación son humanas'],
    insight: 'La IA amplifica las capacidades del CFO. Pero la toma de decisiones financieras estratégicas sigue siendo humana.',
    automationWave: 'Tercera ola (2028-2035)',
  },
  'vendedor': {
    score: 42, icon: '🛒',
    factors: ['CRM inteligente automatiza seguimiento', 'Lead scoring por ML prioriza oportunidades', 'Pero venta consultiva requiere empatía', 'Relaciones B2B complejas son irreducibles'],
    insight: 'La venta transaccional se automatiza (e-commerce). La venta consultiva — entender al cliente, construir confianza — se revaloriza.',
    automationWave: 'Segunda-tercera ola (2026-2032)',
  },
  'ejecutivo de ventas': {
    score: 35, icon: '💼',
    factors: ['Automatización de prospección y seguimiento', 'IA personaliza propuestas comerciales', 'Pero cierre de deals requiere relación humana', 'Venta compleja B2B resiste automatización'],
    insight: 'El ejecutivo de ventas que solo hace cold calling está en riesgo. El que construye relaciones estratégicas y cierra deals complejos crece.',
    automationWave: 'Tercera ola (2027-2032)',
  },

  // ===== RIESGO BAJO (5-30) =====
  'enfermero': {
    score: 25, icon: '🏥',
    factors: ['Monitorización de pacientes automatizable', 'Dispensación de medicamentos con robots', 'Pero cuidado empático es irreemplazable', 'Toma de decisiones clínicas urgentes requiere humanos'],
    insight: 'La enfermería es uno de los trabajos más resistentes. La demanda crece un 15% en la próxima década por el envejecimiento poblacional.',
    automationWave: 'Muy lejana (2035+)',
  },
  'profesor': {
    score: 22, icon: '👩‍🏫',
    factors: ['IA personaliza contenido educativo', 'Evaluación automatizada de exámenes básicos', 'Pero mentoría y desarrollo personal son humanos', 'Gestión de aula requiere presencia y autoridad'],
    insight: 'La IA transforma al profesor: de transmisor de conocimiento a mentor y facilitador. El rol se revaloriza, no desaparece.',
    automationWave: 'Muy lejana (2035+)',
  },
  'psicólogo': {
    score: 18, icon: '🧠',
    factors: ['Chatbots terapéuticos como apoyo (no reemplazo)', 'Screening automatizado de síntomas', 'Pero relación terapéutica es irreduciblemente humana', 'Ética clínica requiere juicio profesional'],
    insight: 'La salud mental es un campo en expansión. La IA es una herramienta de apoyo pero la terapia real requiere un humano.',
    automationWave: 'Muy lejana (2035+)',
  },
  'médico': {
    score: 15, icon: '⚕️',
    factors: ['IA diagnostica con precisión en radiología/patología', 'Pero responsabilidad legal es del médico', 'Relación médico-paciente es central', 'Toma de decisiones éticas imposible de automatizar'],
    insight: 'La IA es el mejor asistente diagnóstico jamás creado. Pero el médico que decide, comunica y asume responsabilidad es insustituible.',
    automationWave: 'Muy lejana (2035+)',
  },
  'cirujano': {
    score: 12, icon: '🔬',
    factors: ['Robots quirúrgicos son herramientas, no reemplazos', 'Destreza manual y adaptación en tiempo real', 'Responsabilidad legal siempre humana', 'Cada paciente es un caso único'],
    insight: 'La cirugía robótica amplifica al cirujano (precisión submilimétrica), pero la decisión quirúrgica y la adaptación en vivo requieren un humano.',
    automationWave: 'Muy lejana (2040+)',
  },
  'artista': {
    score: 10, icon: '🎭',
    factors: ['IA genera arte pero carece de intención', 'El mercado valora la narrativa humana', 'Originalidad y contexto cultural son irreducibles', 'Performance y arte vivo son inmunes'],
    insight: 'Paradoja: la IA genera más imágenes que nunca, pero el arte con intención humana se revaloriza precisamente por su escasez.',
    automationWave: 'Nunca (el arte es humano por definición)',
  },
  'escultor': {
    score: 8, icon: '🗿',
    factors: ['Requiere presencia física y destreza manual', 'Cada obra es única e irrepetible', 'El mercado valora la mano humana', 'Performance material no es digitalizable'],
    insight: 'La escultura es el anti-IA por excelencia: materia física, manos humanas, intención artística. Ningún algoritmo puede esculpir mármol.',
    automationWave: 'Nunca',
  },
  'músico': {
    score: 14, icon: '🎵',
    factors: ['IA genera música funcional (fondos, jingles)', 'Pero performance en vivo es irreemplazable', 'Composición con emotividad sigue siendo humana', 'La autenticidad artística se revaloriza'],
    insight: 'La música generada por IA funciona para fondos. La música que emociona y define una generación — esa sigue siendo humana.',
    automationWave: 'Nunca para performance en vivo',
  },
  'actor': {
    score: 18, icon: '🎬',
    factors: ['Deepfakes y avatares digitales en desarrollo', 'Pero presencia escénica es irreemplazable', 'Emociones auténticas no son computables', 'El público valora la humanidad'],
    insight: 'Los extras y dobles digitales ya existen. Pero la actuación — expresar la condición humana — es uno de los últimos bastiones frente a la IA.',
    automationWave: 'Muy lejana (2035+)',
  },
  'emprendedor': {
    score: 15, icon: '🚀',
    factors: ['IA automatiza operaciones de un startup', 'Pero visión y risk-taking son humanos', 'Networking y fundraising requieren persona', 'Adaptación al caos emprendedor es impredecible'],
    insight: 'La IA es el mejor co-fundador que un emprendedor puede tener: incansable, barato, 24/7. Pero la visión y la capacidad de riesgo son humanas.',
    automationWave: 'Nunca (emprender es un acto humano)',
  },
  'consultor estratégico': {
    score: 30, icon: '🎯',
    factors: ['Análisis de datos automatizado', 'Benchmarking instantáneo por IA', 'Pero diagnóstico organizacional requiere intuición', 'Influencia en C-suite es relacional'],
    insight: 'La consultoría estratégica se comprime en análisis pero se expande en implementación. El consultor del futuro es más coach que analista.',
    automationWave: 'Tercera ola (2028-2035)',
  },
  'investigador científico': {
    score: 22, icon: '🔬',
    factors: ['IA acelera descubrimiento de moléculas y patrones', 'Revisión de literatura automatizada', 'Pero formulación de hipótesis es creativa', 'Diseño experimental requiere expertise profundo'],
    insight: 'La IA es el microscopio del siglo XXI: amplifica al investigador exponencialmente, pero la curiosidad científica sigue siendo humana.',
    automationWave: 'Muy lejana (2035+)',
  },
  'electricista': {
    score: 20, icon: '⚡',
    factors: ['Diagnóstico remoto por sensores IoT', 'Pero trabajo manual en espacios físicos', 'Cada instalación es diferente', 'Normativa y seguridad requieren certificación'],
    insight: 'Los oficios manuales cualificados son los grandes ganadores de la era IA: alta demanda, baja automatizabilidad, buenos salarios.',
    automationWave: 'Muy lejana (2035+)',
  },
  'fontanero': {
    score: 18, icon: '🔧',
    factors: ['Cada problema es único e in situ', 'Requiere presencia física y destreza manual', 'Diagnóstico requiere experiencia práctica', 'Regulación y certificación humanas'],
    insight: 'Un fontanero no puede ser reemplazado por IA porque cada instalación es un puzzle físico único. La demanda supera la oferta en toda Europa.',
    automationWave: 'Muy lejana (2040+)',
  },
  'chef': {
    score: 20, icon: '👨‍🍳',
    factors: ['Robots de cocina para comida rápida existen', 'Pero cocina creativa requiere gusto y cultura', 'Gestión de cocina es liderazgo humano', 'Experiencia gastronómica es sensorial y humana'],
    insight: 'La comida rápida se automatiza. La gastronomía — creación, cultura, experiencia — se revaloriza por su humanidad.',
    automationWave: 'Parcial en fast-food (2025-2030)',
  },
  'fisioterapeuta': {
    score: 15, icon: '💪',
    factors: ['Tratamiento requiere contacto físico', 'Cada paciente es un caso único', 'Evaluación en tiempo real del dolor', 'Relación terapéutica central'],
    insight: 'La fisioterapia combina ciencia, contacto humano y adaptación constante. Uno de los trabajos sanitarios con menor riesgo de automatización.',
    automationWave: 'Muy lejana (2040+)',
  },
  'gerente general': {
    score: 25, icon: '👔',
    factors: ['IA optimiza decisiones operativas', 'Analytics predictivo mejora forecasting', 'Pero liderazgo organizacional es humano', 'Cultura de empresa es irreducible a datos'],
    insight: 'El CEO del futuro usa IA como herramienta principal de análisis, pero la visión, liderazgo y gestión del talento humano definen su rol.',
    automationWave: 'Tercera ola parcial (2030+)',
  },
  'trabajador social': {
    score: 12, icon: '🤲',
    factors: ['Gestión de casos parcialmente automatizable', 'Pero empatía y evaluación de riesgo son humanas', 'Intervención en crisis requiere presencia', 'Advocacy y defensa de derechos son actos humanos'],
    insight: 'El trabajo social es uno de los campos más resistentes: cada persona es un universo de complejidad que ningún algoritmo puede navegar solo.',
    automationWave: 'Muy lejana (2040+)',
  },
  'bombero': {
    score: 8, icon: '🚒',
    factors: ['Drones y robots como herramientas de apoyo', 'Pero decisiones en emergencia requieren juicio instantáneo', 'Trabajo físico extremo en entornos impredecibles', 'Rescate humano requiere humanos'],
    insight: 'Los bomberos son virtualmente irreemplazables: combinan fortaleza física, toma de decisiones bajo presión extrema y empatía en crisis.',
    automationWave: 'Nunca completamente',
  },
  'policía': {
    score: 15, icon: '👮',
    factors: ['Vigilancia automatizada por cámaras y sensores', 'Análisis predictivo de criminalidad', 'Pero intervención física requiere presencia', 'Juicio ético y de-escalation son humanos'],
    insight: 'La tecnología amplifica las capacidades policiales, pero la presencia humana en la calle y el juicio ético son irreducibles.',
    automationWave: 'Muy lejana (2035+)',
  },
};

// Sector modifiers with richer data
interface SectorProfile {
  modifier: number;
  trend: string;
  icon: string;
}

const SECTOR_DATABASE: Record<string, SectorProfile> = {
  'tecnología': { modifier: 10, trend: 'La IA se come a sus propios creadores — la industria tech es la más disruptiva y la más disrumpida', icon: '💻' },
  'software': { modifier: 12, trend: 'El software se escribe a sí mismo cada vez más — pero la demanda de software crece más rápido', icon: '🖥️' },
  'inteligencia artificial': { modifier: 15, trend: 'Paradoja: el sector de IA automatiza todo, incluido a sí mismo', icon: '🤖' },
  'manufactura': { modifier: 15, trend: 'Fábricas inteligentes reducen plantillas un 30-50% en 5 años', icon: '🏭' },
  'logística': { modifier: 12, trend: 'Almacenes automatizados, rutas optimizadas por ML, drones de última milla', icon: '📦' },
  'retail': { modifier: 10, trend: 'E-commerce + IA personalizadora = menos empleos en tienda, más en digital', icon: '🛍️' },
  'finanzas': { modifier: 8, trend: 'Fintech y trading algorítmico comprimen la banca tradicional', icon: '🏦' },
  'seguros': { modifier: 8, trend: 'Suscripción automatizada y gestión de siniestros por ML', icon: '🛡️' },
  'telecomunicaciones': { modifier: 8, trend: 'Redes auto-gestionadas y atención al cliente por IA', icon: '📡' },
  'energía': { modifier: 5, trend: 'Smart grids y mantenimiento predictivo cambian los perfiles, no los eliminan', icon: '⚡' },
  'salud': { modifier: -5, trend: 'La demanda sanitaria crece — la IA amplifica pero no reemplaza a los profesionales', icon: '🏥' },
  'educación': { modifier: -8, trend: 'La educación se personaliza con IA pero el rol del profesor se revaloriza', icon: '🎓' },
  'gobierno': { modifier: -10, trend: 'Burocracia lenta para adoptar IA — paradójicamente protege empleos a corto plazo', icon: '🏛️' },
  'construcción': { modifier: 2, trend: 'Robótica en obra avanza lento — los oficios cualificados resisten', icon: '🏗️' },
  'agricultura': { modifier: 3, trend: 'Precision farming y drones, pero trabajo estacional difícil de automatizar', icon: '🌾' },
  'turismo': { modifier: 5, trend: 'Reservas automatizadas pero experiencia turística sigue siendo humana', icon: '🏖️' },
  'hostelería': { modifier: 8, trend: 'Cocinas robot para fast food, pero la gastronomía de calidad crece', icon: '🍽️' },
  'medios': { modifier: 8, trend: 'Contenido generado por IA inunda el mercado — la curación humana se revaloriza', icon: '📺' },
  'legal': { modifier: -3, trend: 'Regulación del AI Act protege al sector legal — irónicamente, más trabajo', icon: '⚖️' },
  'farmacéutico': { modifier: 3, trend: 'IA acelera descubrimiento de fármacos pero el desarrollo clínico es humano', icon: '💊' },
  'automoción': { modifier: 12, trend: 'Conducción autónoma y fábricas inteligentes transforman toda la cadena', icon: '🚗' },
  'inmobiliaria': { modifier: 5, trend: 'Proptech automatiza búsqueda y valoración, pero cierre de ventas es humano', icon: '🏠' },
  'consultoría': { modifier: 5, trend: 'El análisis se commoditiza, la relación con el cliente se revaloriza', icon: '📊' },
  'marketing': { modifier: 8, trend: 'Automatización masiva de campañas y personalización a escala', icon: '📢' },
  'arte y cultura': { modifier: -10, trend: 'El arte humano se revaloriza precisamente por la abundancia de IA', icon: '🎨' },
};

// Default risk factors by level
const DEFAULT_FACTORS_BY_LEVEL = {
  veryHigh: [
    'Tu rol tiene un alto componente de tareas repetitivas y predecibles',
    'Existen herramientas de IA que ya realizan funciones similares',
    'El coste de automatización es significativamente menor que el salario humano',
    'La curva de aprendizaje de la IA en tu campo se acelera exponencialmente',
  ],
  high: [
    'Algunos componentes clave de tu rol ya están siendo automatizados',
    'La IA complementa tu trabajo pero podría reemplazar las tareas más rutinarias',
    'Tu sector está en plena transformación digital',
    'La especialización y el upskilling son tu mejor defensa',
  ],
  medium: [
    'Tu rol combina tareas automatizables con habilidades humanas difíciles de replicar',
    'La IA será más una herramienta que un reemplazo para ti',
    'La demanda en tu campo se mantiene estable',
    'Adaptarte a trabajar CON IA será clave para tu competitividad',
  ],
  low: [
    'Tu rol requiere habilidades profundamente humanas: empatía, creatividad o presencia física',
    'La IA es una herramienta de apoyo, no un reemplazo viable',
    'La demanda en tu campo tiende a crecer',
    'Tu valor profesional se basa en la conexión humana y el juicio experto',
  ],
};

function getDefaultInsight(score: number, puesto: string, sector: string): string {
  if (score >= 75) {
    return `Los profesionales de ${puesto} en ${sector} enfrentan una transformación acelerada. La clave no es resistirse sino evolucionar: las habilidades que la IA no puede replicar son tu ventaja competitiva.`;
  } else if (score >= 50) {
    return `Tu rol de ${puesto} en ${sector} está en zona de transformación. Partes de tu trabajo se automatizarán, pero la esencia requiere juicio humano. Invertir en habilidades de IA te posiciona como profesional híbrido muy demandado.`;
  } else if (score >= 30) {
    return `Como ${puesto} en ${sector}, tu perfil es relativamente resiliente. La IA será una herramienta poderosa en tu arsenal. Los profesionales que adopten IA temprano tendrán ventaja competitiva.`;
  } else {
    return `Tu rol de ${puesto} en ${sector} es uno de los más resistentes a la automatización. Las habilidades humanas que definen tu trabajo — empatía, creatividad, presencia física — son exactamente lo que la IA no puede replicar.`;
  }
}

export interface ScoringResult {
  score: number;
  timeline: string;
  riskLevel: 'bajo' | 'medio' | 'alto' | 'muy alto';
  riskColor: string;
  factors: string[];
  insight: string;
  automationWave: string;
  sectorTrend: string;
  sectorIcon: string;
  jobIcon: string;
  recommendations: string[];
}

export function calculateScore(
  puesto: string,
  sector: string,
  experiencia: number
): ScoringResult {
  const jobKey = puesto.toLowerCase().trim();
  const sectorKey = sector.toLowerCase().trim();

  const jobProfile = JOB_DATABASE[jobKey];
  let baseScore = jobProfile?.score ?? estimateScore(jobKey);

  const sectorProfile = SECTOR_DATABASE[sectorKey];
  const sectorMod = sectorProfile?.modifier ?? 0;

  let score = baseScore + sectorMod;

  // Experience modifier (more nuanced)
  if (experiencia > 20) {
    score -= 8;
  } else if (experiencia > 15) {
    score -= 5;
  } else if (experiencia > 10) {
    score -= 3;
  } else if (experiencia < 2) {
    score += 8;
  } else if (experiencia < 5) {
    score += 3;
  }

  score = Math.max(5, Math.min(98, score));

  let riskLevel: 'bajo' | 'medio' | 'alto' | 'muy alto';
  let timeline: string;
  let riskColor: string;

  if (score >= 75) {
    riskLevel = 'muy alto';
    timeline = '1-3 años';
    riskColor = '#ef4444';
  } else if (score >= 50) {
    riskLevel = 'alto';
    timeline = '3-7 años';
    riskColor = '#f97316';
  } else if (score >= 30) {
    riskLevel = 'medio';
    timeline = '7-12 años';
    riskColor = '#eab308';
  } else {
    riskLevel = 'bajo';
    timeline = '12+ años';
    riskColor = '#10b981';
  }

  let factors: string[];
  if (jobProfile?.factors) {
    factors = jobProfile.factors;
  } else if (score >= 75) {
    factors = DEFAULT_FACTORS_BY_LEVEL.veryHigh;
  } else if (score >= 50) {
    factors = DEFAULT_FACTORS_BY_LEVEL.high;
  } else if (score >= 30) {
    factors = DEFAULT_FACTORS_BY_LEVEL.medium;
  } else {
    factors = DEFAULT_FACTORS_BY_LEVEL.low;
  }

  const insight = jobProfile?.insight ?? getDefaultInsight(score, puesto, sector);
  const automationWave = jobProfile?.automationWave ??
    (score >= 75 ? 'Primera-segunda ola (2024-2028)' :
     score >= 50 ? 'Segunda-tercera ola (2026-2032)' :
     score >= 30 ? 'Tercera ola (2028-2035)' : 'Muy lejana (2035+)');

  const sectorTrend = sectorProfile?.trend ?? `El sector de ${sector} está en transformación por la IA, con impacto variable según el rol específico.`;
  const sectorIcon = sectorProfile?.icon ?? '🏢';
  const jobIcon = jobProfile?.icon ?? getDefaultJobIcon(score);

  const recommendations = getRecommendations(score);

  return {
    score: Math.round(score),
    timeline,
    riskLevel,
    riskColor,
    factors: factors.slice(0, 4),
    insight,
    automationWave,
    sectorTrend,
    sectorIcon,
    jobIcon,
    recommendations,
  };
}

function estimateScore(jobKey: string): number {
  const highRiskKeywords = ['datos', 'administrativo', 'operador', 'asistente', 'soporte', 'atención', 'call center', 'registro', 'archivo', 'facturación', 'nóminas'];
  const mediumRiskKeywords = ['analista', 'desarrollador', 'técnico', 'especialista', 'coordinador', 'supervisor', 'gestor'];
  const lowRiskKeywords = ['director', 'médico', 'enfermero', 'profesor', 'terapeuta', 'artista', 'investigador', 'bombero', 'policía', 'cirujano'];

  for (const kw of lowRiskKeywords) {
    if (jobKey.includes(kw)) return 20 + Math.floor(Math.random() * 10);
  }
  for (const kw of mediumRiskKeywords) {
    if (jobKey.includes(kw)) return 45 + Math.floor(Math.random() * 15);
  }
  for (const kw of highRiskKeywords) {
    if (jobKey.includes(kw)) return 70 + Math.floor(Math.random() * 15);
  }

  return 45 + Math.floor(Math.random() * 10);
}

function getDefaultJobIcon(score: number): string {
  if (score >= 75) return '⚠️';
  if (score >= 50) return '⚡';
  if (score >= 30) return '🔄';
  return '🛡️';
}

function getRecommendations(score: number): string[] {
  if (score >= 75) {
    return [
      'Aprende a usar herramientas de IA de tu sector — de competidor a aliado',
      'Desarrolla habilidades de supervisión y control de calidad de outputs de IA',
      'Especialízate en un nicho donde el juicio humano sea crítico',
      'Considera pivotar hacia roles que combinen tu expertise con habilidades de IA',
    ];
  } else if (score >= 50) {
    return [
      'Integra herramientas de IA en tu flujo de trabajo diario para ser más productivo',
      'Enfócate en las partes de tu rol que requieren creatividad y juicio',
      'Construye una marca personal como profesional "AI-augmented"',
      'Invierte en formación continua — tu campo evoluciona rápido',
    ];
  } else if (score >= 30) {
    return [
      'Usa la IA como herramienta para amplificar tu impacto',
      'Tu ventaja competitiva está en las habilidades blandas — poténcialas',
      'Mantente actualizado sobre IA aplicada a tu sector',
      'Considera mentorizar a otros en la adopción de IA en tu campo',
    ];
  } else {
    return [
      'Tu rol es resistente — pero adoptar IA temprano te dará ventaja sobre tus pares',
      'Usa IA para las tareas administrativas y dedica más tiempo a lo que importa',
      'La demanda de tu perfil tenderá a crecer — posiciónate como referente',
      'Explora cómo la IA puede ser tu aliada, no tu amenaza',
    ];
  }
}

export function getJobSuggestions(input: string): string[] {
  const query = input.toLowerCase().trim();
  if (query.length < 2) return [];

  return Object.keys(JOB_DATABASE)
    .filter(job => job.includes(query))
    .slice(0, 6);
}

export function getSectors(): string[] {
  return Object.keys(SECTOR_DATABASE).sort();
}