export type SyllabusEntry = {
  subject: string;
  code: string;
  unit: string;
  name: string;
  notes: string;
};

const subjectBlocks: Array<{ subject: string; code: string; unit: string; names: Array<[string, string]> }> = [
  {
    subject: "Mathematics",
    code: "041",
    unit: "Mathematics Standard — Class X",
    names: [
      ["REAL NUMBERS", "Fundamental Theorem of Arithmetic; irrationality of √2, √3 and √5."],
      ["POLYNOMIALS", "Zeros of a polynomial and the relationship between zeros and coefficients."],
      ["PAIR OF LINEAR EQUATIONS IN TWO VARIABLES", "Graphical and algebraic solutions, consistency and situational problems."],
      ["QUADRATIC EQUATIONS", "Factorisation, quadratic formula, discriminant and situational problems."],
      ["ARITHMETIC PROGRESSIONS", "nth term, sum of the first n terms and applications."],
      ["Coordinate Geometry", "Distance formula, section formula and internal division."],
      ["TRIANGLES", "Similarity, Basic Proportionality Theorem and similarity criteria."],
      ["CIRCLES", "Tangents, radius at the point of contact and equal tangents from an external point."],
      ["INTRODUCTION TO TRIGONOMETRY", "Trigonometric ratios, standard angles and relationships between ratios."],
      ["TRIGONOMETRIC IDENTITIES", "sin² A + cos² A = 1 and simple identities."],
      ["HEIGHTS AND DISTANCES: Angle of elevation, Angle of Depression.", "Problems using angles of elevation and depression restricted to 30°, 45° and 60°."],
      ["AREAS RELATED TO CIRCLES", "Areas of sectors and segments and related perimeter problems."],
      ["SURFACE AREAS AND VOLUMES", "Combinations of cubes, cuboids, spheres, hemispheres, cylinders and cones."],
      ["STATISTICS", "Mean, median and mode of grouped data."],
      ["PROBABILITY", "Classical definition of probability and simple event problems."],
    ],
  },
  {
    subject: "Science",
    code: "086",
    unit: "Science — Class X",
    names: [
      ["Chemical Reactions and Equations", "Chemical equations, reaction types, oxidation, reduction, exothermic and endothermic reactions."],
      ["Periodic Classification of Elements", "Periodic classification, Mendeleev’s table and the Modern Periodic Table."],
      ["Acids, Bases and Salts", "Indicators, chemical properties, pH, neutralisation and common salts."],
      ["Metals and Non-metals", "Properties, reactivity series, ionic compounds, metallurgy and corrosion."],
      ["Carbon and its Compounds", "Covalent bonds, hydrocarbons, homologous series, functional groups, reactions, soaps and detergents."],
      ["Life processes", "Nutrition, respiration, transport and excretion in plants and animals."],
      ["Control and co-ordination in animals and plants", "Plant movements and hormones, nervous system, reflex action and animal hormones."],
      ["Reproduction", "Asexual and sexual reproduction, reproductive health and family planning."],
      ["Heredity", "Mendel’s contribution, inheritance of traits and sex determination."],
      ["Evolution", "Acquired and inherited traits, speciation, fossils and human evolution."],
      ["Reflection of light by curved surfaces", "Spherical mirrors, mirror formula and magnification."],
      ["Refraction", "Laws of refraction and refractive index."],
      ["Refraction of light by spherical lens", "Lens formula, magnification and power of a lens."],
      ["Functioning of a lens in human eye, defects of vision and their corrections, applications of spherical mirrors and lenses", "Human eye, vision defects, corrections and applications."],
      ["Refraction of light through a prism, dispersion of light, scattering of light, applications in daily life", "Prism, dispersion, scattering and daily-life applications."],
      ["Electric current, potential difference and electric current", "Ohm’s law, resistance, combinations, heating effect, power and domestic applications."],
      ["Magnetic effects of current", "Magnetic fields, force on conductors, Fleming’s rule, AC/DC and domestic circuits."],
      ["Motor, Electromagnetic Induction, Electric Generator", "Motor, electromagnetic induction and generator concepts."],
      ["Our environment", "Ecosystems, environmental problems, ozone depletion and biodegradable substances."],
    ],
  },
  {
    subject: "Social Science",
    code: "087",
    unit: "History — India and the Contemporary World-II",
    names: [
      ["The Rise of Nationalism in Europe", "Nationalism and the formation of nation-states in Europe."],
      ["Nationalism in India", "Indian nationalism, movements, leaders, events and map work."],
      ["The Making of a Global World", "The pre-modern world, nineteenth-century economy and the inter-war economy."],
      ["The Age of Industrialisation", "Industrialisation and its effects; assessed through periodic assessment."],
      ["Print Culture and the Modern World", "Print, culture, public opinion and social change."],
    ],
  },
  {
    subject: "Social Science",
    code: "087",
    unit: "Geography — Contemporary India-II",
    names: [
      ["Resources and Development", "Resources, development planning, land resources and soils."],
      ["Forest and Wildlife Resources", "Biodiversity, conservation and community participation."],
      ["Water Resources", "Water conservation, multipurpose projects and rainwater harvesting."],
      ["Agriculture", "Types of farming, major crops, technological reforms and food security."],
      ["Minerals and energy Resources", "Mineral resources, conventional and non-conventional energy."],
      ["Manufacturing Industries", "Industrial location, industrial pollution and selected industries."],
      ["Lifelines of National Economy", "Transport, communication, trade, tourism and map work."],
    ],
  },
  {
    subject: "Social Science",
    code: "087",
    unit: "Political Science — Democratic Politics-II",
    names: [
      ["Power-sharing", "Forms and importance of power sharing in a democracy."],
      ["Federalism", "Federal features, power sharing and Indian federalism."],
      ["Gender, Religion and Caste", "Social differences, inequality and democratic politics."],
      ["Political Parties", "Functions, challenges and reforms of political parties."],
      ["Outcomes of Democracy", "Accountable, responsive and legitimate government."],
    ],
  },
  {
    subject: "Social Science",
    code: "087",
    unit: "Economics — Understanding Economic Development",
    names: [
      ["Development", "Income, other criteria, national development and sustainability."],
      ["Sectors of the Indian Economy", "Primary, secondary and tertiary sectors, employment and organised/unorganised work."],
      ["Money and Credit", "Money, formal and informal credit and self-help groups."],
      ["Globalisation and the Indian Economy", "Globalisation, production across countries, WTO and fair globalisation."],
      ["Consumer Rights", "Consumer awareness, protection and redressal; project work."],
    ],
  },
  {
    subject: "English Language and Literature",
    code: "184",
    unit: "English — Language, Grammar and Writing",
    names: [
      ["Discursive passage of 400–450 words", "Reading comprehension, inference, analysis, evaluation and vocabulary."],
      ["Case-based factual passage with visual input", "A factual passage with statistical data, chart or other visual input."],
      ["Determiners", "Contextual grammar through gap filling, editing and transformation."],
      ["Tenses", "Contextual use of tenses."],
      ["Modals", "Contextual use of modals."],
      ["Subject–verb concord", "Contextual agreement between subject and verb."],
      ["Reported speech: Commands and requests", "Reported commands and requests."],
      ["Reported speech: Statements", "Reported statements."],
      ["Reported speech: Questions", "Reported questions."],
      ["Writing a Formal Letter", "Formal letter writing in 100–120 words."],
      ["Writing an Analytical Paragraph", "Analytical paragraph from a map, chart, graph or cues."],
    ],
  },
  {
    subject: "English Language and Literature",
    code: "184",
    unit: "English — FIRST FLIGHT",
    names: [
      ["A Letter to God", "Prescribed NCERT prose text."],
      ["Nelson Mandela - Long Walk to Freedom", "Prescribed NCERT prose text."],
      ["Stories About Flying", "Official umbrella title for the prescribed flight-related prose texts."],
      ["From the Diary of Anne Frank", "Prescribed NCERT prose text."],
      ["Glimpses of India", "Official umbrella title for the prescribed India-related prose texts."],
      ["Mijbil the Otter", "Prescribed NCERT prose text."],
      ["Madam Rides the Bus", "Prescribed NCERT prose text."],
      ["The Sermon at Benares", "Prescribed NCERT prose text."],
      ["The Proposal (Play)", "Prescribed NCERT play."],
      ["Dust of Snow", "Prescribed NCERT poem."],
      ["Fire and Ice", "Prescribed NCERT poem."],
      ["A Tiger in the Zoo", "Prescribed NCERT poem."],
      ["How to Tell Wild Animals", "Prescribed NCERT poem."],
      ["The Ball Poem", "Prescribed NCERT poem."],
      ["Amanda!", "Prescribed NCERT poem."],
      ["The Trees", "Prescribed NCERT poem."],
      ["Fog", "Prescribed NCERT poem."],
      ["The Tale of Custard the Dragon", "Prescribed NCERT poem."],
      ["For Anne Gregory", "Prescribed NCERT poem."],
    ],
  },
  {
    subject: "English Language and Literature",
    code: "184",
    unit: "English — FOOTPRINTS WITHOUT FEET",
    names: [
      ["A Triumph of Surgery", "Prescribed NCERT supplementary-reader text."],
      ["The Thief's Story", "Prescribed NCERT supplementary-reader text."],
      ["The Midnight Visitor", "Prescribed NCERT supplementary-reader text."],
      ["A Question of Trust", "Prescribed NCERT supplementary-reader text."],
      ["Footprints Without Feet", "Prescribed NCERT supplementary-reader text."],
      ["The Making of a Scientist", "Prescribed NCERT supplementary-reader text."],
      ["The Necklace", "Prescribed NCERT supplementary-reader text."],
      ["Bholi", "Prescribed NCERT supplementary-reader text."],
      ["The Book that Saved the Earth", "Prescribed NCERT supplementary-reader text."],
    ],
  },
  {
    subject: "English Language and Literature",
    code: "184",
    unit: "English — WORDS AND EXPRESSIONS–II",
    names: [
      ["Unit 1", "Prescribed workbook unit."],
      ["Unit 2", "Prescribed workbook unit."],
      ["Unit 3", "Prescribed workbook unit."],
      ["Unit 4", "Prescribed workbook unit."],
      ["Unit 7", "Prescribed workbook unit."],
      ["Unit 8", "Prescribed workbook unit."],
      ["Unit 9", "Prescribed workbook unit."],
      ["Unit 10", "Prescribed workbook unit."],
      ["Unit 11", "Prescribed workbook unit."],
    ],
  },
  {
    subject: "Hindi Course A",
    code: "002",
    unit: "हिंदी — क्षितिज भाग 2 — काव्य खंड",
    names: [
      ["सूरदास — पद", "क्षितिज भाग 2 का निर्धारित काव्य-पाठ।"],
      ["तुलसीदास — राम-लक्ष्मण-परशुराम संवाद", "क्षितिज भाग 2 का निर्धारित काव्य-पाठ।"],
      ["जयशंकर प्रसाद — आत्मकथ्य", "क्षितिज भाग 2 का निर्धारित काव्य-पाठ।"],
      ["सूर्यकांत त्रिपाठी ‘निराला’ — उत्साह; अट नहीं रही है", "NCERT विषय-सूची में एक क्रमांक के अंतर्गत दो कविताएँ।"],
      ["नागार्जुन — यह दंतुरित मुस्कान; फसल", "NCERT विषय-सूची में एक क्रमांक के अंतर्गत दो कविताएँ।"],
      ["मंगलेश डबराल — संगतकार", "क्षितिज भाग 2 का निर्धारित काव्य-पाठ।"],
    ],
  },
  {
    subject: "Hindi Course A",
    code: "002",
    unit: "हिंदी — क्षितिज भाग 2 — गद्य खंड",
    names: [
      ["स्वयं प्रकाश — नेताजी का चश्मा", "क्षितिज भाग 2 का निर्धारित गद्य-पाठ।"],
      ["रामवृक्ष बेनीपुरी — बालगोबिन भगत", "क्षितिज भाग 2 का निर्धारित गद्य-पाठ।"],
      ["यशपाल — लखनवी अंदाज़", "क्षितिज भाग 2 का निर्धारित गद्य-पाठ।"],
      ["मन्नू भंडारी — एक कहानी यह भी", "क्षितिज भाग 2 का निर्धारित गद्य-पाठ।"],
      ["यतीन्द्र मिश्र — नौबतखाने में इबादत", "क्षितिज भाग 2 का निर्धारित गद्य-पाठ।"],
      ["भदंत आनंद कौसल्यायन — संस्कृति", "क्षितिज भाग 2 का निर्धारित गद्य-पाठ।"],
    ],
  },
  {
    subject: "Hindi Course A",
    code: "002",
    unit: "हिंदी — कृतिका भाग 2",
    names: [
      ["शिवपूजन सहाय — माता का अँचल", "कृतिका भाग 2 का निर्धारित पाठ।"],
      ["मधु कांकरिया — साना-साना हाथ जोड़ि...", "कृतिका भाग 2 का निर्धारित पाठ।"],
      ["अज्ञेय — मैं क्यों लिखता हूँ?", "कृतिका भाग 2 का निर्धारित पाठ।"],
    ],
  },
  {
    subject: "Hindi Course A",
    code: "002",
    unit: "हिंदी — भाषा और रचनात्मक लेखन",
    names: [
      ["अपठित गद्यांश", "लगभग 250 शब्दों का अपठित गद्यांश।"],
      ["अपठित काव्यांश", "लगभग 120 शब्दों का अपठित काव्यांश।"],
      ["रचना के आधार पर वाक्य भेद", "वाक्य-रचना के आधार पर वाक्य-भेद।"],
      ["वाच्य", "व्यावहारिक व्याकरण का निर्धारित भाग।"],
      ["पद परिचय", "व्यावहारिक व्याकरण का निर्धारित भाग।"],
      ["अलंकार — अर्थालंकार", "उपमा, रूपक, उत्प्रेक्षा, अतिशयोक्ति और मानवीकरण।"],
      ["अनुच्छेद लेखन", "समसामयिक और व्यावहारिक जीवन से जुड़े विषयों पर।"],
      ["पत्र लेखन", "औपचारिक अथवा अनौपचारिक विषय पर।"],
      ["स्ववृत्त लेखन अथवा ई-मेल लेखन", "रोजगार-संबंधित स्ववृत्त अथवा ई-मेल।"],
      ["विज्ञापन लेखन अथवा संदेश लेखन", "विज्ञापन अथवा शुभकामना, पर्व-त्योहार एवं विशेष अवसरों के संदेश।"],
    ],
  },
  {
    subject: "Information Technology",
    code: "402",
    unit: "Information Technology — Employability Skills-II",
    names: [
      ["Communication Skills–II", "Communication methods, feedback, barriers, 7 Cs, grammar and paragraph writing."],
      ["Self-Management Skills–II", "Stress management, self-awareness, self-motivation, self-regulation and independent work."],
      ["Information and Communication Technology Skills–II", "Operating systems, files, folders, computer care, maintenance and virus protection."],
      ["Entrepreneurial Skills–II", "Entrepreneurship, qualities, functions, myths and career options."],
      ["Green Skills–II", "Sustainable development, environmental citizenship and conservation."],
    ],
  },
  {
    subject: "Information Technology",
    code: "402",
    unit: "Information Technology — Digital Documentation (Advanced)",
    names: [
      ["Introduction To Styles", "Writer styles, Styles and Formatting, Fill Format, creating and updating styles."],
      ["Working with Images", "Inserting, modifying, positioning and grouping images and drawing objects."],
      ["Advanced Features of Writer", "Table of contents, templates, Track Changes, comments and document comparison."],
    ],
  },
  {
    subject: "Information Technology",
    code: "402",
    unit: "Information Technology — Electronic Spreadsheet (Advanced)",
    names: [
      ["Analyse data using scenarios and goal seek", "Consolidation, groups, subtotals, What-If Scenarios, Goal Seek and Solver."],
      ["Using Macros in Spreadsheet", "Recording, creating, running and using macros as functions."],
      ["Linking Spreadsheet Data", "Multiple sheets, references, hyperlinks, external data and registered data sources."],
      ["Share and Review a Spreadsheet", "Sharing, tracking changes, comments, merging and comparing spreadsheets."],
    ],
  },
  {
    subject: "Information Technology",
    code: "402",
    unit: "Information Technology — Database Management System",
    names: [
      ["Introduction to Database Management System", "Data, information, databases, DBMS, data models, RDBMS terminology and objects."],
      ["Starting with LibreOffice Base", "Data types, tables, primary keys, data entry, editing, deleting and sorting."],
      ["Working with Multiple Tables", "Relationships, one-to-one, one-to-many, many-to-many and referential integrity."],
      ["Queries in Base", "Queries using wizard and design view, criteria, wildcards and calculations."],
      ["Forms and Reports", "Forms, controls, records, Report Wizard, titles, headings, date and time."],
    ],
  },
  {
    subject: "Information Technology",
    code: "402",
    unit: "Information Technology — Maintain Healthy, Safe and Secure Working Environment",
    names: [
      ["Health, Safety and Security at Workplace", "Workplace hazards, computer safety, stress, hazard control and safety checklists."],
      ["Workplace Quality Measures", "Air and water quality, cleanliness, ergonomics, computer health and workplace safety."],
      ["Prevent Accidents and Emergencies", "Accident prevention, first aid, electrical safety, fire hazards and evacuation procedures."],
    ],
  },
];

const makeId = (subject: string, code: string, index: number) => `${code}-${subject.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${String(index + 1).padStart(3, "0")}`;

export const syllabusEntries: SyllabusEntry[] = subjectBlocks.flatMap((block) =>
  block.names.map(([name, notes]) => ({ subject: block.subject, code: block.code, unit: block.unit, name, notes }))
);

export const syllabusTasks = syllabusEntries.map((entry, index) => {
  const day = Math.min(15, Math.floor((index / syllabusEntries.length) * 15) + 1);
  const owner: "Tejas" | "Crystal" = index % 2 === 0 ? "Tejas" : "Crystal";
  return {
    id: makeId(entry.subject, entry.code, index),
    subject: entry.subject,
    number: String(index + 1).padStart(2, "0"),
    name: entry.name,
    owner,
    target: day === 1 ? "Today" : day === 2 ? "Tomorrow" : `Day ${day}`,
    day,
    status: "Pending" as const,
    tejas: false,
    crystal: false,
    note: `${entry.unit}. ${entry.notes}`,
  };
});

export const syllabusSourceSummary = "CBSE Academic Curriculum 2026–27: Mathematics 041, Science 086, Social Science 087, English Language and Literature 184, Hindi Course A 002, and Information Technology 402.";
