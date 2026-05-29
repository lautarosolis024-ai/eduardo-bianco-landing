/**
 * Centralized service page data for dynamic routes.
 * Each service has its own slug, SEO metadata, long-form content,
 * FAQ items, and JSON-LD schema markup.
 */

import { SITE_URL } from "@/lib/config";

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceContentBlock {
  heading: string;
  body: string;
}

export interface ServiceData {
  slug: string;
  title: string;
  metaDescription: string;
  targetKeyword: string;
  h1: string;
  subtitle: string;
  canonicalUrl: string;
  openGraphImage: string;
  contentBlocks: ServiceContentBlock[];
  faqs: ServiceFAQ[];
  whatsappMessage: string;
  breadcrumbName: string;
  changeFrequency: "monthly" | "weekly";
  priority: number;
}

// Use SITE_URL from config instead of local constant
const BASE_URL = SITE_URL;

export const servicesData: ServiceData[] = [
  // ============================================================
  // 1. /mediacion-patrimonial — Zero-competition keyword
  // ============================================================
  {
    slug: "mediacion-patrimonial",
    title: "Mediación Patrimonial en Buenos Aires | EB Consulting",
    metaDescription:
      "Resolvé conflictos patrimoniales sin juicio. Mediación especializada en herencias, bienes gananciales y disputas entre socios. Consulta gratuita.",
    targetKeyword: "mediación patrimonial Buenos Aires",
    h1: "Mediación Patrimonial en Buenos Aires",
    subtitle: "Resolvé conflictos sin juicio, sin desgaste, sin exposición pública",
    canonicalUrl: `${BASE_URL}/servicios/mediacion-patrimonial`,
    openGraphImage: "/og-image.png",
    changeFrequency: "monthly",
    priority: 0.9,
    breadcrumbName: "Mediación Patrimonial",
    whatsappMessage:
      "Hola Eduardo, necesito una consulta sobre mediación patrimonial.",
    contentBlocks: [
      {
        heading: "Qué es la mediación patrimonial",
        body: "La mediación patrimonial es un proceso voluntario y confidencial en el que un mediador especializado —con formación en economía y derecho— ayuda a las partes en conflicto a alcanzar un acuerdo justo sobre bienes, activos y derechos patrimoniales. A diferencia del litigio judicial, la mediación pone el control en manos de las partes: son ustedes quienes deciden cómo se distribuyen los bienes, no un juez que no conoce las particularidades de su familia o empresa. En Argentina, la mediación es obligatoria previa a la demanda en muchas jurisdicciones, pero incluso cuando no lo es, resulta la vía más eficiente para resolver conflictos patrimoniales complejos.",
      },
      {
        heading: "Cómo funciona el proceso paso a paso",
        body: "El proceso de mediación patrimonial se desarrolla en etapas claras y predecibles. Primero, realizamos una reunión informativa individual donde evaluamos su caso y le explicamos el alcance de la mediación. Segundo, convocamos a todas las partes involucradas a una sesión conjunta donde cada una expone su perspectiva. Tercero, analizamos la documentación patrimonial: títulos de propiedad, balances, valuaciones, cuentas bancarias y cualquier activo relevante. Cuarto, facilitamos la negociación asistida, proponiendo opciones de acuerdo que contemplen los intereses de todas las partes. Quinto, si se alcanza un acuerdo, lo documentamos en un convenio que tiene fuerza ejecutiva. Si no, usted conserva plenamente su derecho a iniciar acciones judiciales. El proceso completo suele durar entre 30 y 90 días, una fracción del tiempo que insume un juicio patrimonial.",
      },
      {
        heading: "Ventajas de la mediación frente al litigio",
        body: "La mediación patrimonial ofrece ventajas concretas y medibles frente al proceso judicial tradicional. En primer lugar, la confidencialidad: nada de lo que se discuta en mediación aparece en registros públicos ni expedientes judiciales, protegiendo la privacidad de su familia y la reputación de su empresa. En segundo lugar, la velocidad: mientras un juicio patrimonial puede extenderse entre 2 y 5 años, la mediación se resuelve en semanas o meses. En tercer lugar, el costo: los honorarios de mediación son significativamente menores que las costas judiciales, y además son predecibles desde el inicio. En cuarto lugar, la preservación de vínculos: la mediación busca acuerdos ganadores, no vencedores y vencidos, lo que permite mantener relaciones familiares o comerciales después del conflicto. Finalmente, la flexibilidad: los acuerdos de mediación pueden incluir condiciones creativas que un juez no podría imponer, como pagos escalonados, compensaciones no monetarias o cláusulas de revisión.",
      },
      {
        heading: "Tipos de conflictos que se resuelven por mediación patrimonial",
        body: "La mediación patrimonial es eficaz para una amplia gama de conflictos donde el patrimonio y las relaciones se entrelazan. Los más frecuentes incluyen: disputas por herencia entre hermanos, sobrinos o cónyuges; conflictos sobre bienes gananciales durante procesos de divorcio; desacuerdos entre socios sobre la valuación y distribución de cuotas o acciones; disputas por propiedad compartida de inmuebles, campos o vehículos; conflictos sobre la administración de bienes en condominio; y desacuerdos sobre la partición de empresas familiares. Cada uno de estos escenarios presenta particularidades que requieren un mediador con formación interdisciplinaria —economía, contabilidad y derecho— para comprender la dimensión financiera del conflicto y facilitar acuerdos sustentables.",
      },
      {
        heading: "Por qué elegir un mediador Economista y Contador",
        body: "La mayoría de los mediadores son exclusivamente abogados, lo que limita su capacidad para comprender la dimensión financiera de un conflicto patrimonial. Como mediador con formación en Economía y Contabilidad —además de Derecho—, puedo analizar balances, valuar activos, identificar inconsistencias financieras y proponer opciones de acuerdo basadas en datos económicos concretos. Esto marca una diferencia fundamental: en lugar de delegar la valuación a un perito externo (con el costo y demora que implica), la integración del análisis económico ocurre desde la primera sesión de mediación. Los resultados hablan por sí mismos: más del 95% de nuestros casos se resuelven sin litigio, con acuerdos que ambas partes consideran justos.",
      },
    ],
    faqs: [
      {
        question: "¿Cuánto dura un proceso de mediación patrimonial?",
        answer:
          "La mayoría de nuestros casos de mediación patrimonial se resuelven entre 30 y 90 días, dependiendo de la complejidad del patrimonio involucrado y la disposición de las partes a negociar. Los casos más simples (un solo inmueble entre dos partes) pueden resolverse en 2-3 sesiones. Los casos complejos (empresas familiares, múltiples activos, varias partes) pueden requerir 6-10 sesiones distribuidas en 2-3 meses.",
      },
      {
        question: "¿Es obligatoria la mediación antes de un juicio patrimonial?",
        answer:
          "En la Ciudad Autónoma de Buenos Aires y en la Provincia de Buenos Aires, la mediación es obligatoria previa a la demanda en la mayoría de los casos patrimoniales. Sin embargo, incluso cuando no es obligatoria, es altamente recomendable: el 95% de nuestros casos se resuelven en mediación, ahorrando años de litigio y miles de dólares en costas judiciales.",
      },
      {
        question: "¿Qué pasa si la otra parte no quiere mediar?",
        answer:
          "Si la mediación es obligatoria en su jurisdicción, la otra parte está obligada a asistir a la primera sesión informativa. Si después de esa sesión decide no continuar, se emite un certificado que le permite iniciar la vía judicial. Si la mediación no es obligatoria y la otra parte rechaza participar, evaluamos conjuntamente las alternativas: negociación directa asistida, arbitraje o, como última opción, la vía judicial.",
      },
      {
        question: "¿El acuerdo de mediación es vinculante?",
        answer:
          "Sí. Una vez que las partes firman el convenio de mediación, este tiene la misma fuerza que una sentencia judicial. Si una de las partes no cumple, la otra puede ejecutarlo judicialmente de forma directa, sin necesidad de iniciar un nuevo juicio. Esto le da al acuerdo de mediación una seguridad jurídica total.",
      },
      {
        question: "¿Cuánto cuesta la mediación patrimonial?",
        answer:
          "La primera consulta es gratuita y sin compromiso. Durante esa reunión evaluamos su caso y le presentamos un plan con costos predecibles. Nuestros honorarios son fijos y transparentes desde el inicio, generalmente entre un 30% y un 50% menos que las costas de un juicio patrimonial equivalente. No hay sorpresas ni costos ocultos.",
      },
      {
        question: "¿La mediación es confidencial?",
        answer:
          "Absolutamente. Todo lo que se discute en las sesiones de mediación es confidencial por ley. Ninguna propuesta, admisión o documento presentado en mediación puede ser utilizado en un eventual juicio posterior. Esto permite que las partes negocien con libertad, sabiendo que nada de lo que digan será usado en su contra.",
      },
      {
        question: "¿Puedo llevar a mi abogado a la mediación?",
        answer:
          "Sí, cada parte puede asistir acompañada de su abogado patrocinante. El rol del abogado en la mediación es asesorarle sobre sus derechos y los alcances legales de las propuestas, mientras que el mediador facilita la comunicación y la búsqueda de acuerdos. Es un trabajo en equipo donde cada profesional cumple su función.",
      },
    ],
  },

  // ============================================================
  // 2. /peritaje-economico
  // ============================================================
  {
    slug: "peritaje-economico",
    title: "Peritaje Económico Patrimonial | EB Consulting",
    metaDescription:
      "Peritaje económico para conflictos patrimoniales. Valuación de bienes, daños patrimoniales y peritaje contable. 500+ casos resueltos. Consulta gratis.",
    targetKeyword: "peritaje económico abogado CABA",
    h1: "Peritaje Económico para Conflictos Patrimoniales",
    subtitle: "Valuación rigurosa de activos para negociar con datos, no con opiniones",
    canonicalUrl: `${BASE_URL}/servicios/peritaje-economico`,
    openGraphImage: "/og-image.png",
    changeFrequency: "monthly",
    priority: 0.8,
    breadcrumbName: "Peritaje Económico",
    whatsappMessage:
      "Hola Eduardo, necesito una consulta sobre peritaje económico patrimonial.",
    contentBlocks: [
      {
        heading: "Qué es el peritaje económico patrimonial",
        body: "El peritaje económico patrimonial es un informe técnico elaborado por un profesional con formación en economía y contabilidad que determina el valor real de activos, pasivos, daños o negocios en el contexto de un conflicto patrimonial. A diferencia de una simple tasación, el peritaje económico analiza el patrimonio de manera integral: considera flujos de ingresos futuros, deudas ocultas, depreciaciones, plusvalías y el contexto económico que afecta el valor de los bienes. Este informe es una pieza clave en mediaciones, arbitrajes y litigios porque transforma opiniones subjetivas en datos objetivos que sustentan la negociación.",
      },
      {
        heading: "Cuándo se necesita un peritaje económico",
        body: "Existen múltiples situaciones donde un peritaje económico es indispensable para resolver un conflicto patrimonial. La más frecuente es la valuación de empresas familiares en procesos de divorcio o disolución societaria: ¿cuánto vale realmente la empresa? ¿Cómo se distribuyen los activos intangibles? Otra situación común es la detección de activos ocultos o subvaluados: cuando una parte sospecha que la otra está omitiendo bienes o presentando balances incorrectos. También se requiere peritaje en casos de daños patrimoniales: cuantificación del daño económico sufrido por incumplimientos contractuales, mala administración o fraude. Finalmente, el peritaje es esencial en sucesiones complejas con activos de difícil valuación como campos, propiedades en el exterior, participaciones societarias o derechos de autor.",
      },
      {
        heading: "La ventaja del Abogado + Contador + Economista",
        body: "La mayoría de los peritajes económicos son realizados por contadores que no tienen formación jurídica, lo que genera informes técnicamente correctos pero jurídicamente frágiles. En nuestro caso, la formación triple —Abogado, Contador Público y Economista— permite elaborar peritajes que son simultáneamente rigurosos en su análisis financiero y sólidos en su fundamentación legal. Esto significa que nuestros informes resisten la impugnación en sede judicial y, al mismo tiempo, son herramientas persuasivas en la negociación extrajudicial. No necesita contratar un contador y un abogado por separado: en un solo profesional tiene ambas perspectivas integradas.",
      },
      {
        heading: "Metodología de trabajo",
        body: "Nuestra metodología de peritaje económico sigue estándares internacionales y se adapta a las particularidades del derecho argentino. El proceso comienza con una reunión inicial donde definimos el alcance del peritaje y los activos a valuar. Luego, recopilamos y analizamos la documentación: balances, declaraciones impositivas, contratos, títulos de propiedad, cuentas bancarias y cualquier información relevante. En tercer lugar, aplicamos los métodos de valuación apropiados para cada tipo de activo: flujo de fondos descontado para empresas, comparables de mercado para inmuebles, métodos mixtos para participaciones societarias. Cuarto, elaboramos el informe pericial con conclusiones claras y fundamentadas. Finalmente, si es necesario, defendemos el informe ante las partes, en mediación o en sede judicial. El proceso completo se documentó en más de 500 casos con resultados comprobables.",
      },
    ],
    faqs: [
      {
        question: "¿Cuánto tarda un peritaje económico patrimonial?",
        answer:
          "El plazo depende de la complejidad y la disponibilidad de documentación. Un peritaje simple (valuación de un inmueble o un conjunto de activos líquidos) puede estar listo en 10-15 días hábiles. Un peritaje complejo (valuación de empresa, detección de activos ocultos, peritaje contable forense) puede requerir 30-45 días hábiles. En todos los casos, le damos un plazo estimado en la primera reunión.",
      },
      {
        question: "¿El peritaje económico sirve para un juicio?",
        answer:
          "Sí. Nuestros informes periciales están diseñados para ser presentados como prueba pericial en sede judicial. Al estar firmados por un profesional con triple formación —Abogado, Contador y Economista—, tienen mayor robustez que un informe elaborado exclusivamente por un contador, ya que integran el análisis financiero con la fundamentación jurídica correspondiente.",
      },
      {
        question: "¿Qué diferencia hay entre una tasación y un peritaje económico?",
        answer:
          "Una tasación determina el valor de mercado de un bien inmueble en un momento dado. Un peritaje económico es mucho más amplio: analiza el patrimonio de manera integral, considera activos y pasivos, evalúa flujos de ingresos futuros, detecta inconsistencias financieras y cuantifica daños económicos. Mientras una tasación es una foto, un peritaje económico es una radiografía completa del patrimonio.",
      },
      {
        question: "¿Pueden detectar activos ocultos o dinero no declarado?",
        answer:
          "Sí, es una de nuestras especialidades. A través del análisis de balances, movimientos bancarios, declaraciones impositivas y cruces de información patrimonial, podemos identificar inconsistencias que sugieren la existencia de activos omitidos o subvaluados. Este tipo de peritaje contable forense es particularmente útil en conflictos societarios y procesos de divorcio con patrimonio empresario.",
      },
      {
        question: "¿Cuánto cuesta un peritaje económico?",
        answer:
          "El costo depende del alcance y la complejidad. La primera consulta es gratuita, donde evaluamos su caso y le presentamos un presupuesto detallado. Nuestros honorarios son fijos y transparentes: no hay sorpresas ni costos adicionales. En general, el peritaje económico representa una inversión pequeña comparada con el valor de los activos en disputa, y frecuentemente marca la diferencia entre un acuerdo justo y uno perjudicial.",
      },
      {
        question: "¿El peritaje es confidencial?",
        answer:
          "Sí. El peritaje económico realizado en el marco de una mediación es confidencial por ley. Si se realiza para un proceso judicial, el informe se presenta como prueba pericial y deja de ser confidencial, pero la información recopilada durante la investigación se maneja con estricta reserva profesional.",
      },
      {
        question: "¿Trabajan con peritos de otras disciplinas?",
        answer:
          "Sí, frecuentemente coordinamos con ingenieros agrónomos (para valuación de campos), arquitectos (para inmuebles con particularidades constructivas), y otros especialistas según el caso. Nosotros lideramos la dirección del peritaje y coordinamos los aportes de cada especialista para producir un informe integrado y coherente.",
      },
    ],
  },

  // ============================================================
  // 3. /herencia-disputada
  // ============================================================
  {
    slug: "herencia-disputada",
    title: "Herencia Disputada en Argentina | EB Consulting",
    metaDescription:
      "Conflictos por herencia disputada. Resolvemos disputas entre herederos, aparición de herederos desconocidos, petición de herencia. Consulta gratuita.",
    targetKeyword: "herencia disputada abogado Argentina",
    h1: "Resolución de Herencias Disputadas",
    subtitle: "Cuando la herencia genera conflicto, no guerra",
    canonicalUrl: `${BASE_URL}/servicios/herencia-disputada`,
    openGraphImage: "/og-image.png",
    changeFrequency: "monthly",
    priority: 0.85,
    breadcrumbName: "Herencia Disputada",
    whatsappMessage:
      "Hola Eduardo, tengo un conflicto por una herencia disputada y necesito una consulta.",
    contentBlocks: [
      {
        heading: "Qué constituye una herencia disputada",
        body: "Una herencia disputada es aquella donde los herederos legítimos o testamentarios no logran ponerse de acuerdo sobre la distribución de los bienes del causante. Esto puede ocurrir por múltiples razones: desacuerdo sobre la valuación de los bienes, disputas sobre quién es heredero legítimo, impugnación del testamento, aparición de herederos desconocidos, o simplemente la imposibilidad de acordar quién se queda con qué. En Argentina, las herencias disputadas son particularmente complejas porque el Código Civil y Comercial establece la porción legítima —la porción de la herencia que el causante no puede disponer libremente— y cualquier acuerdo que la vulnere es nulo. Esto requiere un profesional que entienda tanto la dimensión emocional del conflicto familiar como la dimensión económica del patrimonio involucrado.",
      },
      {
        heading: "Tipos de conflictos en herencias disputadas",
        body: "Los conflictos hereditarios más frecuentes en nuestra práctica incluyen varios escenarios. Primero, la petición de herencia: cuando alguien reclama su calidad de heredero y los demás lo desconocen, ya sea por ser hijo extramatrimonial, por un segundo matrimonio del causante o por testamentos contradictorios. Segundo, la aparición de herederos desconocidos: cuando después de iniciada la sucesión aparece un heredero que no había sido mencionado, lo que puede redistribuir completamente la herencia. Tercero, la protección de la legítima: cuando el testamento o los acuerdos entre herederos vulneran la porción legítima de alguno de ellos. Cuarto, la impugnación de testamentos: cuando se sospecha que el testamento fue otorgado bajo coerción, influencia indebida o cuando el causante no tenía plena capacidad. Quinto, la desigualdad en la administración: cuando el albacea o uno de los herederos administra los bienes de la sucesión en beneficio propio. Cada uno de estos escenarios requiere un abordaje diferente, pero todos comparten la necesidad de resolver el conflicto sin destruir los vínculos familiares.",
      },
      {
        heading: "Cómo se resuelve una herencia disputada sin juicio",
        body: "La resolución extrajudicial de herencias disputadas es posible en la gran mayoría de los casos y es el enfoque que recomendamos siempre que es viable. El proceso comienza con una evaluación completa del patrimonio hereditario: qué bienes hay, cuánto valen, qué deudas pesan sobre ellos. Luego, identificamos a todos los herederos y sus porciones legítimas. A continuación, facilitamos la negociación entre las partes, proponiendo opciones de distribución que respeten la ley y los intereses de cada uno. Cuando hay desacuerdo sobre la valuación, realizamos un peritaje económico para establecer valores objetivos. Finalmente, documentamos el acuerdo en un convenio que se presenta al juez de la sucesión para su homologación. El proceso completo suele durar entre 60 y 120 días, una fracción del tiempo que insume un juicio de petición de herencia.",
      },
      {
        heading: "La dimensión emocional del conflicto hereditario",
        body: "Las disputas por herencia son particularmente dolorosas porque combinan la pérdida de un ser querido con la disputa por sus bienes. Las emociones —dolor, enojo, sensación de injusticia— pueden nublar el juicio y llevar a decisiones que nadie realmente quiere. Como mediador con más de 20 años de experiencia, sé que resolver un conflicto hereditario no es solo un ejercicio legal y económico: es también un proceso de acompañamiento emocional. Mi rol es ayudar a las partes a separar lo emocional de lo patrimonial, a entender que un acuerdo justo no significa que cada uno obtenga exactamente lo que quería, sino que nadie se sienta perjudicado. Este enfoque permite que las familias mantengan sus vínculos después de la herencia, algo que un juicio prácticamente imposibilita.",
      },
    ],
    faqs: [
      {
        question: "¿Cuánto tarda en resolverse una herencia disputada?",
        answer:
          "Si se resuelve por mediación, entre 60 y 120 días. Si se litiga, puede extenderse entre 2 y 5 años. Nuestra recomendación es siempre intentar la vía extrajudicial primero: más del 90% de nuestros casos de herencias disputadas se resuelven sin juicio.",
      },
      {
        question: "¿Qué es la porción legítima y por qué importa?",
        answer:
          "La porción legítima es la parte de la herencia que el causante no puede disponer libremente por testamento y que corresponde por ley a los herederos forzosos (hijos, cónyuge, padres). En Argentina, los descendientes tienen derecho a dos tercios de la herencia como legítima. Cualquier acuerdo o testamento que vulnere esta porción es nulo y puede ser impugnado. Es fundamental que cualquier acuerdo hereditario respete estos límites.",
      },
      {
        question: "¿Puede aparecer un heredero desconocido después de repartida la herencia?",
        answer:
          "Sí, y es una situación más frecuente de lo que se imagina. Si un heredero legítimo no fue citado al proceso sucesorio, puede reclamar su porción incluso después de la partición. Esto puede obligar a los herederos que ya recibieron sus partes a devolver bienes o pagar compensaciones. Por eso es crucial hacer una investigación hereditaria completa antes de cualquier acuerdo.",
      },
      {
        question: "¿Se puede impugnar un testamento?",
        answer:
          "Sí, un testamento puede impugnarse por varias causales: falta de capacidad del testador al momento de otorgarlo, vicios de la voluntad (dolo, violencia, intimidación), o cuando perjudica la legítima de los herederos forzosos. El plazo para impugnar es de 2 años desde el fallecimiento del causante. Si tiene dudas sobre la validez de un testamento, consulte cuanto antes.",
      },
      {
        question: "¿Qué pasa si un heredero no quiere participar en la sucesión?",
        answer:
          "Un heredero puede renunciar a la herencia, pero debe hacerlo expresamente y por escrito ante el juez de la sucesión. La renuncia no puede ser parcial: se renuncia a toda la herencia o a nada. Si un heredero simplemente no participa y no renuncia, la sucesión se paraliza y puede requerir intervención judicial para destrabarla. La mediación es una excelente herramienta para estos casos.",
      },
      {
        question: "¿Cuánto cuesta resolver una herencia disputada?",
        answer:
          "La primera consulta es gratuita. Durante esa reunión evaluamos la complejidad del caso y le presentamos un plan con costos predecibles. Los honorarios por mediación hereditaria son fijos y generalmente entre un 40% y un 60% menores que las costas de un juicio de petición de herencia. No cobramos porcentaje sobre el valor de la herencia.",
      },
      {
        question: "¿Puedo mediar si ya inicié un juicio?",
        answer:
          "Sí. En cualquier momento del proceso judicial las partes pueden acordar someter el conflicto a mediación. El juez generalmente aplaza el proceso judicial mientras dura la mediación. Muchos de nuestros casos más exitosos llegan después de meses de litigio, cuando las partes comprenden que el juicio no es la solución más eficiente.",
      },
    ],
  },

  // ============================================================
  // 4. /sucesiones — Highest search volume
  // ============================================================
  {
    slug: "sucesiones",
    title: "Abogado de Sucesiones en Buenos Aires | EB Consulting",
    metaDescription:
      "Tramitamos sucesiones en CABA y Provincia de Buenos Aires. Declaratoria de herederos, partición de bienes, sucesiones complejas. Consulta gratuita.",
    targetKeyword: "abogado sucesiones Buenos Aires",
    h1: "Sucesiones en Buenos Aires: Trámite y Resolución de Conflictos",
    subtitle: "Tramitamos sucesiones y resolvemos los conflictos que surgen en el camino",
    canonicalUrl: `${BASE_URL}/servicios/sucesiones`,
    openGraphImage: "/og-image.png",
    changeFrequency: "monthly",
    priority: 0.9,
    breadcrumbName: "Sucesiones",
    whatsappMessage:
      "Hola Eduardo, necesito una consulta sobre una sucesión.",
    contentBlocks: [
      {
        heading: "Qué es el proceso sucesorio",
        body: "El proceso sucesorio es el procedimiento legal mediante el cual se transmite el patrimonio de una persona fallecida a sus herederos. En Argentina, este proceso es judicial y obligatorio cuando existen inmuebles, vehículos o activos financieros a nombre del causante. El proceso incluye la declaratoria de herederos (que determina quiénes son los herederos legítimos), el inventario y valuación de bienes, y la partición (distribución de los bienes entre los herederos). Aunque el proceso sucesorio es judicial, la mayoría de los conflictos que surgen en su transcurso pueden resolverse extrajudicialmente a través de la mediación, lo que ahorra tiempo y dinero significativos.",
      },
      {
        heading: "Etapas del proceso sucesorio paso a paso",
        body: "El proceso sucesorio en Argentina se desarrolla en etapas definidas. Primera etapa: inicio de la sucesión, donde se presenta la solicitud de apertura ante el juez competente (último domicilio del causante) y se acredita el fallecimiento con la partida de defunción. Segunda etapa: declaratoria de herederos, donde el juez declara quiénes son los herederos legítimos según el Código Civil y Comercial, basándose en las partidas de nacimiento, matrimonio y demás documentación. Tercera etapa: inventario y valuación de bienes, donde se identifican y valúan todos los activos y pasivos del causante. Cuarta etapa: partición de bienes, donde los herederos acuerdan (o el juez determina) cómo se distribuyen los bienes. Quinta etapa: inscripción, donde los bienes se transfieren al nombre de los herederos en los registros correspondientes (Registro de la Propiedad, Registro del Automotor, etc.). El proceso completo, sin conflictos, suele durar entre 6 y 12 meses.",
      },
      {
        heading: "Sucesiones simples vs. complejas",
        body: "Una sucesión simple es aquella donde existe un solo grupo de herederos (por ejemplo, todos hijos del mismo matrimonio), los bienes están claramente identificados y documentados, y no hay conflictos entre los herederos. Estas sucesiones se tramitan de manera relativamente rápida. Una sucesión compleja, en cambio, presenta uno o más de estos elementos: múltiples grupos de herederos (hijos de diferentes matrimonios, por ejemplo), bienes en distintas jurisdicciones, activos de difícil valuación (empresas, participaciones societarias, bienes en el exterior), testamento impugnado, herederos que no pueden ser ubicados, o conflictos entre herederos sobre la distribución. En estos casos, la intervención de un profesional con formación interdisciplinaria —economía, contabilidad y derecho— es fundamental para resolver los conflictos que inevitablemente surgen y evitar que la sucesión se paralice durante años.",
      },
      {
        heading: "Cómo se resuelven conflictos entre herederos",
        body: "Los conflictos entre herederos son la principal causa de demora en las sucesiones. Las disputas más frecuentes son: desacuerdo sobre la valuación de bienes (uno quiere valuar alto, otro bajo), disputas sobre quién se queda con el inmueble familiar, desconfianza sobre la administración del albacea, y reclamos de herederos que se sienten perjudicados por la distribución propuesta. Nuestro enfoque combina la mediación —para facilitar acuerdos entre las partes— con el peritaje económico —para establecer valuaciones objetivas que eliminen la subjetividad de la negociación. Este enfoque dual permite resolver más del 90% de los conflictos hereditarios sin necesidad de litigio, acortando el proceso sucesorio de años a meses.",
      },
      {
        heading: "Costos y plazos estimados",
        body: "El costo de una sucesión depende de su complejidad y los bienes involucrados. Una sucesión simple sin conflictos puede tramitarse con honorarios moderados y tasas judiciales estándar. Una sucesión compleja con conflictos requiere una inversión mayor, pero siempre significativamente inferior a la que representaría un litigio prolongado. En todos los casos, la primera consulta es gratuita y le proporcionamos un presupuesto detallado antes de comenzar. Respecto a los plazos, una sucesión simple sin conflictos toma entre 6 y 12 meses; una sucesión compleja con mediación toma entre 8 y 18 meses; y una sucesión con litigio puede extenderse entre 3 y 7 años. La diferencia es clara: la mediación ahorra años de espera y miles de dólares en costas judiciales.",
      },
    ],
    faqs: [
      {
        question: "¿Cuánto tiempo tarda una sucesión en Buenos Aires?",
        answer:
          "Una sucesión simple sin conflictos tarda entre 6 y 12 meses en CABA y entre 8 y 18 meses en la Provincia de Buenos Aires, donde los juzgados tienen mayor carga de trabajo. Una sucesión compleja con mediación puede resolverse en 8-18 meses, mientras que una sucesión con litigio puede extenderse entre 3 y 7 años.",
      },
      {
        question: "¿Qué documentos necesito para iniciar una sucesión?",
        answer:
          "Los documentos esenciales son: partida de defunción del causante, partidas de nacimiento de los herederos, partida de matrimonio (si corresponde), testamento (si existe), títulos de propiedad de inmuebles y vehículos, y certificados de cuentas bancarias e inversiones. En la primera consulta le indicamos exactamente qué documentación necesita según su caso particular.",
      },
      {
        question: "¿Se puede vender un bien antes de terminar la sucesión?",
        answer:
          "Sí, es posible con la autorización del juez de la sucesión y el acuerdo de todos los herederos. Esto es frecuente cuando los herederos necesitan liquidez o cuando mantener el inmueble genera gastos (expensas, impuestos) que nadie quiere asumir. El proceso de autorización judicial suele demorar entre 30 y 60 días.",
      },
      {
        question: "¿Qué pasa si un heredero falleció antes que el causante?",
        answer:
          "Si un heredero premuerto tiene descendientes, estos heredan por representación (lo que se llama derecho de representación). Por ejemplo, si un hijo del causante falleció pero tiene hijos propios, estos nietos heredan la porción que correspondería a su padre. Si el premuerto no tiene descendientes, su porción se redistribuye entre los demás herederos según la ley.",
      },
      {
        question: "¿Las deudas del causante se heredan?",
        answer:
          "Los herederos heredan tanto los activos como las deudas del causante, pero solo hasta el límite del valor de los activos heredados. Es decir, si la herencia tiene más deudas que activos, los herederos no están obligados a pagar la diferencia con su patrimonio personal. Sin embargo, para esto es necesario hacer un inventario completo y formal de los bienes y deudas del causante.",
      },
      {
        question: "¿Cuánto cuesta una sucesión?",
        answer:
          "El costo varía según la complejidad. Una sucesión simple puede tramitarse con honorarios profesionales moderados más las tasas judiciales correspondientes. Una sucesión compleja con conflicto requiere mayor inversión, pero siempre inferior al costo de un litigio. La primera consulta es gratuita y le damos un presupuesto detallado antes de comenzar. No cobramos porcentaje sobre el valor de la herencia.",
      },
      {
        question: "¿Puedo tramitar la sucesión si vivo en el exterior?",
        answer:
          "Sí, es totalmente posible. Muchos de nuestros clientes residen en el exterior y tramitan la sucesión a través de poderes especiales otorgados ante el consulado argentino. Nosotros nos encargamos de todo el trámite judicial y administrativo en Buenos Aires, manteniéndolo informado en cada paso del proceso.",
      },
    ],
  },

  // ============================================================
  // 5. /planificacion-patrimonial — Zero-competition keyword
  // ============================================================
  {
    slug: "planificacion-patrimonial",
    title: "Planificación Patrimonial en Buenos Aires | EB Consulting",
    metaDescription:
      "Protegé tu patrimonio familiar. Planificación sucesoria, fideicomisos, protección de activos y empresa familiar. Consulta gratuita.",
    targetKeyword: "planificación patrimonial abogado CABA",
    h1: "Planificación Patrimonial: Protegé Tu Patrimonio Familiar",
    subtitle: "Anticipá los conflictos, no los sufras",
    canonicalUrl: `${BASE_URL}/servicios/planificacion-patrimonial`,
    openGraphImage: "/og-image.png",
    changeFrequency: "monthly",
    priority: 0.85,
    breadcrumbName: "Planificación Patrimonial",
    whatsappMessage:
      "Hola Eduardo, necesito una consulta sobre planificación patrimonial.",
    contentBlocks: [
      {
        heading: "Qué es la planificación patrimonial",
        body: "La planificación patrimonial es el proceso de organizar anticipadamente la distribución y protección de tus activos para garantizar que, cuando llegue el momento de la transmisión hereditaria, tus deseos se cumplan y tus seres queridos estén protegidos. A diferencia de lo que muchos creen, la planificación patrimonial no es solo para familias adineradas: cualquier persona con un inmueble, un vehículo, una cuenta bancaria o una empresa necesita planificar cómo se transferirán esos activos. En Argentina, la ausencia de planificación patrimonial genera conflictos que podrían evitarse fácilmente: sucesiones que tardan años, herederos que desconocían sus derechos, empresas que se paralizan por la muerte del fundador, y familias que se fracturan disputando bienes que podrían haberse distribuido de manera ordenada.",
      },
      {
        heading: "Por qué es necesaria la planificación patrimonial",
        body: "Sin planificación, la ley decide por vos. El Código Civil y Comercial argentino establece reglas de sucesión que pueden no coincidir con tus deseos. Por ejemplo, si tenés hijos de diferentes relaciones, sin planificación cada grupo de herederos recibe una porción fija que puede no reflejar tu voluntad. Si sos dueño de una empresa, sin planificación la muerte del fundador puede paralizar la actividad, generar conflictos entre herederos que no conocen el negocio, e incluso provocar la venta forzada de activos a precios de liquidación. Si tenés bienes en el exterior, sin planificación los herederos enfrentan doble tributación y trámites complejos en múltiples jurisdicciones. La planificación patrimonial anticipa estos escenarios y establece mecanismos para que la transmisión de tu patrimonio sea ordenada, eficiente y conforme a tu voluntad.",
      },
      {
        heading: "Herramientas de planificación patrimonial",
        body: "En Argentina contamos con varias herramientas legales para la planificación patrimonial. El testamento es la más conocida: permite disponer de la porción disponible de tu patrimonio (aquella que no está reservada a los herederos forzosos) y establecer disposiciones específicas como legados, albaceas y cláusulas de administración. El fideicomiso es una herramienta poderosa que permite transferir la titularidad de activos a un fiduciario que los administra según las instrucciones del fideicomitente, protegiéndolos de conflictos entre herederos y de eventuales acreedores. La donación en vida permite transferir bienes a los herederos antes del fallecimiento, con ventajas fiscales y la tranquilidad de ver cómo se distribuyen. La constitución de sociedades permite separar el patrimonio personal del empresario del patrimonio de la empresa, facilitando la continuidad del negocio y la distribución de participaciones entre herederos. Cada herramienta tiene ventajas y limitaciones que deben evaluarse en conjunto con un profesional que comprenda tanto la dimensión legal como la económica de tu patrimonio.",
      },
      {
        heading: "Protección de la empresa familiar",
        body: "La empresa familiar merece una mención especial porque presenta desafíos únicos. Cuando el fundador o dueño mayoritario fallece, la empresa entra en una zona de riesgo: los herederos pueden no tener la formación ni la voluntad para continuar el negocio, pueden surgir conflictos sobre quién administra, o los acreedores pueden exigir el pago de deudas que la empresa no puede asumir. La planificación patrimonial para empresas familiares incluye: protocolos familiares que establecen reglas de gobierno corporativo, fideicomisos de administración que aseguran la continuidad del negocio independientemente de los conflictos hereditarios, seguros de key-person que proporcionan liquidez en el momento de la transición, y acuerdos de accionistas o cuotapartistas que regulan la entrada y salida de herederos de la sociedad. Estas herramientas, combinadas con un testamento estratégico, permiten que la empresa sobreviva a la transición generacional sin traumatismos.",
      },
    ],
    faqs: [
      {
        question: "¿Cuándo debo empezar a planificar mi patrimonio?",
        answer:
          "Lo ideal es comenzar lo antes posible, especialmente si tenés hijos menores, una empresa, bienes en el exterior, o una estructura familiar compleja (segundas nupcias, hijastros, etc.). La planificación no es un trámite para mayores de 70: es una herramienta de protección que funciona mejor cuando se implementa con tiempo. Cuanto antes planifiques, más opciones tendrás disponibles.",
      },
      {
        question: "¿La planificación patrimonial es solo para personas ricas?",
        answer:
          "No. Cualquier persona con un inmueble, un vehículo, una cuenta bancaria o un emprendimiento necesita planificar la transmisión de sus activos. De hecho, las familias con patrimonio moderado son las más perjudicadas por la falta de planificación, porque no tienen los recursos para afrontar un litigio largo y las costas judiciales pueden consumir una parte significativa del patrimonio.",
      },
      {
        question: "¿Qué es un fideicomiso y para qué sirve?",
        answer:
          "Un fideicomiso es un contrato mediante el cual una persona (fideicomitente) transmite la titularidad de ciertos bienes a un fiduciario, quien se obliga a administrarlos y disponer de ellos según las instrucciones del fideicomitente, en beneficio de un beneficiario. En planificación patrimonial, el fideicomiso sirve para proteger activos de conflictos hereditarios, asegurar la administración profesional de los bienes, y garantizar que las instrucciones del causante se cumplan independientemente de los deseos de los herederos.",
      },
      {
        question: "¿Puedo cambiar mi planificación patrimonial después?",
        answer:
          "Sí, la planificación patrimonial es dinámica. Podés modificar tu testamento, actualizar los beneficiarios de un fideicomiso, reestructurar tus sociedades, o ajustar cualquier aspecto de tu plan a medida que cambian tus circunstancias familiares, económicas o personales. Recomendamos revisar la planificación cada 2-3 años o ante eventos significativos (matrimonio, nacimiento, divorcio, venta de empresa).",
      },
      {
        question: "¿Cuánto cuesta la planificación patrimonial?",
        answer:
          "La primera consulta es gratuita. El costo depende de la complejidad de tu patrimonio y las herramientas que necesites implementar. Un plan básico (testamento + directivas) es muy accesible. Un plan integral para una empresa familiar con fideicomisos, protocolos y seguros requiere mayor inversión, pero representa una fracción del costo que generaría un conflicto sucesorio no planificado. En todos los casos, le damos un presupuesto detallado antes de comenzar.",
      },
      {
        question: "¿La planificación patrimonial es confidencial?",
        answer:
          "Sí, el proceso de planificación es completamente confidencial. Tu testamento permanece en custodia del escribano o el registro hasta tu fallecimiento. Los fideicomisos son contratos privados que no se publican. La única información que eventualmente será pública es la que surge del proceso sucesorio al momento de la transmisión, pero para entonces, la planificación ya habrá hecho su trabajo.",
      },
      {
        question: "¿Qué diferencia hay entre testamento y planificación patrimonial?",
        answer:
          "El testamento es una de las herramientas de la planificación patrimonial, pero no la única. La planificación patrimonial es un enfoque integral que puede incluir testamento, fideicomisos, donaciones en vida, constitución de sociedades, seguros, protocolos familiares y directivas anticipadas. Mientras el testamento dispone cómo se distribuyen tus bienes después del fallecimiento, la planificación patrimonial organiza la protección y transmisión de tu patrimonio de manera completa, incluyendo escenarios de incapacidad y la continuidad de tu empresa.",
      },
    ],
  },

  // ============================================================
  // 6. /arbitraje-patrimonial
  // ============================================================
  {
    slug: "arbitraje-patrimonial",
    title: "Arbitraje Patrimonial en Argentina | EB Consulting",
    metaDescription:
      "Resolvé conflictos patrimoniales por arbitraje. Proceso confidencial, rápido y vinculante. Especialista en conflictos entre socios y empresariales.",
    targetKeyword: "arbitraje patrimonial abogado Argentina",
    h1: "Arbitraje Patrimonial: Resolución Rápida y Vinculante",
    subtitle: "Cuando la mediación no alcanza, el arbitraje resuelve",
    canonicalUrl: `${BASE_URL}/servicios/arbitraje-patrimonial`,
    openGraphImage: "/og-image.png",
    changeFrequency: "monthly",
    priority: 0.8,
    breadcrumbName: "Arbitraje Patrimonial",
    whatsappMessage:
      "Hola Eduardo, necesito una consulta sobre arbitraje patrimonial.",
    contentBlocks: [
      {
        heading: "Qué es el arbitraje patrimonial",
        body: "El arbitraje patrimonial es un mecanismo alternativo de resolución de conflictos en el que las partes delegan la decisión final a uno o más árbitros especializados, en lugar de un juez estatal. A diferencia de la mediación —donde las partes llegan a un acuerdo—, en el arbitraje un tercero imparcial emite un laudo (resolución) que es vinculante y ejecutable, con la misma fuerza que una sentencia judicial. El arbitraje es particularmente valioso en conflictos patrimoniales complejos donde las partes no logran ponerse de acuerdo en mediación pero tampoco quieren someterse a la incertidumbre y demora de un juicio ordinario. En Argentina, el arbitraje está regulado por el Código Civil y Comercial y es reconocido como una vía plenamente válida para resolver disputas patrimoniales.",
      },
      {
        heading: "Ventajas del arbitraje frente a mediación y litigio",
        body: "El arbitraje patrimonial ocupa un lugar intermedio entre la mediación y el litigio, combinando lo mejor de ambos mundos. Frente a la mediación, ofrece la ventaja de obtener una decisión vinculante cuando las partes no logran acuerdo: el árbitro decide por ellas. Frente al litigio judicial, ofrece confidencialidad absoluta (los laudos arbitrales no se publican), velocidad (un arbitraje se resuelve en meses, no en años), especialización (los árbitros son expertos en la materia, a diferencia de los jueces que atienden causas diversas), y flexibilidad procesal (las partes pueden acordar el procedimiento). Además, el arbitraje permite mantener la relación comercial entre las partes: el proceso es menos agresivo que un juicio y la confidencialidad protege la reputación de las empresas involucradas.",
      },
      {
        heading: "Tipos de arbitraje patrimonial",
        body: "Existen dos tipos principales de arbitraje en Argentina. El arbitraje ad hoc es aquel donde las partes acuerdan libremente el procedimiento, los árbitros y las reglas aplicables, sin intervención de una institución arbitral. Es más flexible pero requiere mayor coordinación entre las partes. El arbitraje institucional es administrado por una cámara de comercio o centro de arbitraje (como el Tribunal Arbitral de la Bolsa de Comercio de Buenos Aires) que proporciona reglas preestablecidas, administración del proceso y árbitros calificados. Es más estructurado pero ofrece mayor previsibilidad. Según el número de árbitros, puede ser unipersonal (un solo árbitro) o colegiado (tres árbitros, donde cada parte nombra uno y el tercero es designado por los dos primeros o por la institución). Según el procedimiento, puede ser de derecho (los árbitros deben fundar su laudo en la ley) o de equidad (los árbitros deciden según su leal saber y entender). La elección depende del tipo de conflicto y las preferencias de las partes.",
      },
      {
        heading: "Cuándo elegir arbitraje patrimonial",
        body: "El arbitraje patrimonial es la herramienta ideal en varias situaciones específicas. Primero, conflictos societarios entre socios o accionistas donde el contrato social o el estatuto incluye una cláusula compromisoria (acuerdo de arbitraje). Segundo, disputas empresariales donde las partes quieren mantener la confidencialidad y no exponer sus negocios en expedientes judiciales públicos. Tercero, conflictos sobre valuación de empresas o activos donde se necesita una decisión técnica de un experto, no la de un juez generalista. Cuarto, disputas contractuales complejas donde la velocidad de resolución es crítica para la continuidad del negocio. Quinto, conflictos internacionales donde las partes necesitan un mecanismo neutral y reconocido en múltiples jurisdicciones. En todos estos casos, el arbitraje ofrece ventajas concretas frente al litigio judicial ordinario.",
      },
      {
        heading: "El proceso de arbitraje paso a paso",
        body: "El proceso arbitral se desarrolla en etapas bien definidas. Primero, el acuerdo arbitral: las partes suscriben un compromiso arbitral donde definen la disputa, los árbitros, el procedimiento y el plazo para emitir el laudo. Segundo, la constitución del tribunal arbitral: si es unipersonal, se designa al árbitro; si es colegiado, cada parte nombra uno y estos eligen al tercero. Tercero, la etapa probatoria: las partes presentan sus posiciones, oferente pruebas documentales, testimoniales y periciales. El tribunal arbitral puede ordenar peritajes económicos, contables o de otro tipo. Cuarto, la audiencia: las partes exponen sus alegatos y el tribunal puede formular preguntas. Quinto, el laudo arbitral: el tribunal emite su decisión fundamentada, que es definitiva e inapelable (salvo causales muy limitadas de nulidad). El proceso completo suele durar entre 3 y 8 meses, una fracción del tiempo que insume un juicio ordinario.",
      },
    ],
    faqs: [
      {
        question: "¿El laudo arbitral es apelable?",
        answer:
          "En general, no. Los laudos arbitrales son definitivos e inapelables, salvo causales muy limitadas de nulidad (arbitro parcial, laudo fuera de los límites del compromiso, o violación manifiesta del debido proceso). Esta es una de las principales ventajas del arbitraje: la certidumbre de que el conflicto se resuelve en un plazo definido sin la posibilidad de apelaciones que alarguen el proceso durante años.",
      },
      {
        question: "¿Cuánto cuesta un arbitraje patrimonial?",
        answer:
          "El costo del arbitraje incluye los honorarios de los árbitros, los gastos administrativos (si es institucional) y los honorarios de los abogados de cada parte. Si bien el costo directo puede ser mayor que un proceso judicial (por los honorarios de los árbitros), el costo total es generalmente menor porque el proceso se resuelve en meses, no en años. La primera consulta es gratuita para evaluar si el arbitraje es la vía adecuada para su caso.",
      },
      {
        question: "¿Puedo obligar a la otra parte a ir a arbitraje?",
        answer:
          "Solo si existe un acuerdo previo (cláusula compromisoria) en el contrato que vincula a las partes. Sin acuerdo arbitral, ninguna parte puede ser obligada a someterse a arbitraje. Si hay cláusula compromisoria y una parte se niega, la otra puede solicitar al juez que designe al árbitro en su nombre. Por eso es importante incluir cláusulas de arbitraje en contratos societarios, acuerdos de accionistas y contratos comerciales complejos.",
      },
      {
        question: "¿Qué diferencia hay entre arbitraje y mediación?",
        answer:
          "En la mediación, el mediador facilita la comunicación entre las partes pero no impone una decisión: son las partes quienes acuerdan. En el arbitraje, el árbitro escucha a ambas partes y emite una decisión vinculante (laudo) que las partes deben cumplir. La mediación es ideal cuando hay voluntad de acuerdo; el arbitraje es ideal cuando las partes no logran acuerdo pero quieren evitar un juicio.",
      },
      {
        question: "¿El arbitraje es confidencial?",
        answer:
          "Sí, el arbitraje es confidencial por naturaleza. Las actuaciones, las pruebas presentadas y el laudo arbitral no son públicos. Solo las partes y sus abogados tienen acceso al expediente arbitral. Esto es fundamental para empresas que quieren proteger información sensible, estrategia comercial o la reputación de la marca.",
      },
      {
        question: "¿Puedo ser árbitro y abogado a la vez?",
        answer:
          "No en el mismo caso. Un profesional no puede actuar simultáneamente como árbitro y como abogado de una de las partes en el mismo arbitraje. Sin embargo, como abogado con formación en Economía y Contabilidad, puedo asesorarlo estratégicamente en un arbitraje, preparar la prueba pericial económica, y proponer candidatos a árbitros con el perfil técnico adecuado para su conflicto.",
      },
      {
        question: "¿Cuánto dura un arbitraje patrimonial?",
        answer:
          "Un arbitraje patrimonial se resuelve típicamente entre 3 y 8 meses, dependiendo de la complejidad del caso y la cantidad de pruebas a producir. Los arbitrajes simples pueden resolverse en 2-3 meses, mientras que los complejos (con peritajes económicos, múltiples testigos) pueden requerir hasta 10-12 meses. En todos los casos, es significativamente más rápido que un proceso judicial equivalente.",
      },
    ],
  },
];

/** Get a service by its slug */
export function getServiceBySlug(slug: string): ServiceData | undefined {
  return servicesData.find((s) => s.slug === slug);
}

/** Get all slugs for generateStaticParams */
export function getAllServiceSlugs(): string[] {
  return servicesData.map((s) => s.slug);
}
