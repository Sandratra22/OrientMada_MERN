// Mock data for OrientMada - Real universities and formations from Madagascar

export const universities = [
  {
    _id: "1",
    name: "Université d'Antananarivo",
    city: "Antananarivo",
    description: "L'Université d'Antananarivo est la plus ancienne et la plus prestigieuse université de Madagascar. Elle offre une large gamme de formations dans tous les domaines académiques.",
    website: "https://www.univ-antananarivo.mg",
    contacts: {
      email: "contact@univ-antananarivo.mg",
      phone: "+261 20 22 326 44"
    },
    logoUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=250&fit=crop",
    isVerified: true,
    ownerUserId: "university1"
  },
  {
    _id: "2",
    name: "École Supérieure Polytechnique d'Antananarivo (ESPA)",
    city: "Antananarivo",
    description: "L'ESPA est spécialisée dans l'enseignement supérieur technique et scientifique. Elle forme les ingénieurs et techniciens de demain.",
    website: "https://www.espa.mg",
    contacts: {
      email: "info@espa.mg",
      phone: "+261 20 22 627 11"
    },
    logoUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=400&h=250&fit=crop",
    isVerified: true,
    ownerUserId: "university2"
  },
  {
    _id: "3",
    name: "Université de Toamasina",
    city: "Toamasina",
    description: "Située sur la côte est, l'Université de Toamasina se concentre sur les sciences marines, l'agriculture et les sciences sociales.",
    website: "https://www.univ-toamasina.mg",
    contacts: {
      email: "rectorat@univ-toamasina.mg",
      phone: "+261 20 53 417 00"
    },
    logoUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=250&fit=crop",
    isVerified: true,
    ownerUserId: "university3"
  },
  {
    _id: "4",
    name: "Université de Fianarantsoa",
    city: "Fianarantsoa",
    description: "L'Université de Fianarantsoa est reconnue pour ses formations en agriculture, sciences de la vie et sciences humaines.",
    website: "https://www.univ-fianarantsoa.mg",
    contacts: {
      email: "contact@univ-fianarantsoa.mg",
      phone: "+261 20 75 517 00"
    },
    logoUrl: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=400&h=250&fit=crop",
    isVerified: true,
    ownerUserId: "university4"
  },
  {
    _id: "5",
    name: "Université de Mahajanga",
    city: "Mahajanga",
    description: "Spécialisée dans les sciences de la mer et l'environnement côtier, l'Université de Mahajanga forme les experts des zones côtières.",
    website: "https://www.univ-mahajanga.mg",
    contacts: {
      email: "info@univ-mahajanga.mg",
      phone: "+261 20 62 217 00"
    },
    logoUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
    isVerified: true,
    ownerUserId: "university5"
  },
  {
    _id: "6",
    name: "Université de Toliara",
    city: "Toliara",
    description: "L'Université de Toliara se concentre sur les sciences marines, la biologie et le développement durable dans le sud de Madagascar.",
    website: "https://www.univ-toliara.mg",
    contacts: {
      email: "rectorat@univ-toliara.mg",
      phone: "+261 20 94 417 00"
    },
    logoUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=250&fit=crop",
    isVerified: true,
    ownerUserId: "university6"
  },
  {
    _id: "7",
    name: "École Nationale d'Informatique (ENI)",
    city: "Antananarivo",
    description: "L'ENI est l'institution de référence pour la formation en informatique et technologies de l'information à Madagascar.",
    website: "https://www.eni.mg",
    contacts: {
      email: "contact@eni.mg",
      phone: "+261 20 22 425 25"
    },
    logoUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
    isVerified: true,
    ownerUserId: "university7"
  },
  {
    _id: "8",
    name: "Institut Supérieur de Technologie d'Antsiranana (IST)",
    city: "Antsiranana",
    description: "L'IST forme les techniciens supérieurs dans les domaines de l'informatique, de l'électronique et de la mécanique.",
    website: "https://www.ist-antsiranana.mg",
    contacts: {
      email: "info@ist-antsiranana.mg",
      phone: "+261 20 82 217 00"
    },
    logoUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop",
    isVerified: true,
    ownerUserId: "university8"
  }
];

export const formations = [
  // Université d'Antananarivo
  {
    _id: "1",
    universityId: "1",
    title: "Médecine Générale",
    domain: "Médecine",
    level: "Doctorat",
    duration: "7 ans",
    fees: 2500000,
    mode: "onsite" as const,
    prerequisites: [
      "Baccalauréat série C (Sciences)",
      "Examen d'entrée en médecine",
      "Certificat médical d'aptitude"
    ],
    sessions: [
      { startDate: "2024-09-01", endDate: "2031-06-30" }
    ],
    published: true
  },
  {
    _id: "2",
    universityId: "1",
    title: "Droit des Affaires",
    domain: "Droit",
    level: "Master",
    duration: "5 ans",
    fees: 1800000,
    mode: "onsite" as const,
    prerequisites: [
      "Baccalauréat toutes séries",
      "Test d'admission"
    ],
    sessions: [
      { startDate: "2024-09-01", endDate: "2029-06-30" }
    ],
    published: true
  },
  {
    _id: "3",
    universityId: "1",
    title: "Informatique de Gestion",
    domain: "Informatique",
    level: "Licence",
    duration: "3 ans",
    fees: 1200000,
    mode: "onsite" as const,
    prerequisites: [
      "Baccalauréat série D ou équivalent",
      "Mathématiques obligatoires"
    ],
    sessions: [
      { startDate: "2024-09-01", endDate: "2027-06-30" }
    ],
    published: true
  },

  // ESPA
  {
    _id: "4",
    universityId: "2",
    title: "Génie Civil",
    domain: "Ingénierie",
    level: "Master",
    duration: "5 ans",
    fees: 2200000,
    mode: "onsite" as const,
    prerequisites: [
      "Baccalauréat série D",
      "Mathématiques et Physique",
      "Concours d'entrée"
    ],
    sessions: [
      { startDate: "2024-09-01", endDate: "2029-06-30" }
    ],
    published: true
  },
  {
    _id: "5",
    universityId: "2",
    title: "Télécommunications",
    domain: "Ingénierie",
    level: "Licence",
    duration: "3 ans",
    fees: 1500000,
    mode: "onsite" as const,
    prerequisites: [
      "Baccalauréat série D",
      "Électronique et Mathématiques"
    ],
    sessions: [
      { startDate: "2024-09-01", endDate: "2027-06-30" }
    ],
    published: true
  },

  // Université de Toamasina
  {
    _id: "6",
    universityId: "3",
    title: "Sciences Marines",
    domain: "Sciences",
    level: "Master",
    duration: "5 ans",
    fees: 1900000,
    mode: "onsite" as const,
    prerequisites: [
      "Baccalauréat série D",
      "Biologie et Chimie",
      "Stage en milieu marin recommandé"
    ],
    sessions: [
      { startDate: "2024-09-01", endDate: "2029-06-30" }
    ],
    published: true
  },
  {
    _id: "7",
    universityId: "3",
    title: "Agriculture Durable",
    domain: "Agriculture",
    level: "Licence",
    duration: "3 ans",
    fees: 1100000,
    mode: "onsite" as const,
    prerequisites: [
      "Baccalauréat série C ou D",
      "Sciences de la vie"
    ],
    sessions: [
      { startDate: "2024-09-01", endDate: "2027-06-30" }
    ],
    published: true
  },

  // ENI
  {
    _id: "8",
    universityId: "7",
    title: "Développement Logiciel",
    domain: "Informatique",
    level: "Licence",
    duration: "3 ans",
    fees: 1400000,
    mode: "hybrid" as const,
    prerequisites: [
      "Baccalauréat série D",
      "Mathématiques et Logique",
      "Test de programmation"
    ],
    sessions: [
      { startDate: "2024-09-01", endDate: "2027-06-30" }
    ],
    published: true
  },
  {
    _id: "9",
    universityId: "7",
    title: "Cybersécurité",
    domain: "Informatique",
    level: "Master",
    duration: "2 ans",
    fees: 2000000,
    mode: "hybrid" as const,
    prerequisites: [
      "Licence en Informatique",
      "Connaissances en réseaux",
      "Entretien d'admission"
    ],
    sessions: [
      { startDate: "2024-09-01", endDate: "2026-06-30" }
    ],
    published: true
  },

  // IST Antsiranana
  {
    _id: "10",
    universityId: "8",
    title: "Électronique Industrielle",
    domain: "Ingénierie",
    level: "Licence",
    duration: "3 ans",
    fees: 1300000,
    mode: "onsite" as const,
    prerequisites: [
      "Baccalauréat série D",
      "Électronique et Électricité"
    ],
    sessions: [
      { startDate: "2024-09-01", endDate: "2027-06-30" }
    ],
    published: true
  }
];

export const users = [
  // Admin (1 seul)
  {
    _id: "admin1",
    email: "admin@orientmada.mg",
    password: "admin123", // En production, utiliser un hash
    role: "admin" as const,
    profile: {
      nom: "Ravelojaona",
      prenom: "Jean",
      telephone: "+261 34 12 345 67",
      ville: "Antananarivo"
    },
    createdAt: "2023-01-15T08:00:00.000Z"
  },

  // Universities (8)
  {
    _id: "university1",
    email: "contact@univ-antananarivo.mg",
    password: "univ123",
    role: "university" as const,
    profile: {
      nom: "Rakotoarimanana",
      prenom: "Marie",
      telephone: "+261 20 22 326 44",
      ville: "Antananarivo"
    },
    createdAt: "2023-02-01T08:00:00.000Z"
  },
  {
    _id: "university2",
    email: "info@espa.mg",
    password: "espa123",
    role: "university" as const,
    profile: {
      nom: "Andrianarivo",
      prenom: "Paul",
      telephone: "+261 20 22 627 11",
      ville: "Antananarivo"
    },
    createdAt: "2023-02-15T08:00:00.000Z"
  },
  {
    _id: "university3",
    email: "rectorat@univ-toamasina.mg",
    password: "toam123",
    role: "university" as const,
    profile: {
      nom: "Razafindrakoto",
      prenom: "Sophie",
      telephone: "+261 20 53 417 00",
      ville: "Toamasina"
    },
    createdAt: "2023-03-01T08:00:00.000Z"
  },
  {
    _id: "university4",
    email: "contact@univ-fianarantsoa.mg",
    password: "fian123",
    role: "university" as const,
    profile: {
      nom: "Ramanantsoa",
      prenom: "Michel",
      telephone: "+261 20 75 517 00",
      ville: "Fianarantsoa"
    },
    createdAt: "2023-03-15T08:00:00.000Z"
  },
  {
    _id: "university5",
    email: "info@univ-mahajanga.mg",
    password: "maha123",
    role: "university" as const,
    profile: {
      nom: "Randrianarisoa",
      prenom: "Alice",
      telephone: "+261 20 62 217 00",
      ville: "Mahajanga"
    },
    createdAt: "2023-04-01T08:00:00.000Z"
  },
  {
    _id: "university6",
    email: "rectorat@univ-toliara.mg",
    password: "toli123",
    role: "university" as const,
    profile: {
      nom: "Rakotomalala",
      prenom: "Jean-Claude",
      telephone: "+261 20 94 417 00",
      ville: "Toliara"
    },
    createdAt: "2023-04-15T08:00:00.000Z"
  },
  {
    _id: "university7",
    email: "contact@eni.mg",
    password: "eni123",
    role: "university" as const,
    profile: {
      nom: "Andriamanantena",
      prenom: "Nirina",
      telephone: "+261 20 22 425 25",
      ville: "Antananarivo"
    },
    createdAt: "2023-05-01T08:00:00.000Z"
  },
  {
    _id: "university8",
    email: "info@ist-antsiranana.mg",
    password: "ist123",
    role: "university" as const,
    profile: {
      nom: "Razafindrazaka",
      prenom: "Tovo",
      telephone: "+261 20 82 217 00",
      ville: "Antsiranana"
    },
    createdAt: "2023-05-15T08:00:00.000Z"
  },

  // Students (10 exemples)
  {
    _id: "student1",
    email: "rakoto@example.com",
    password: "student123",
    role: "student" as const,
    profile: {
      nom: "Rakoto",
      prenom: "Jean",
      telephone: "+261 34 11 111 11",
      ville: "Antananarivo"
    },
    createdAt: "2023-06-01T08:00:00.000Z"
  },
  {
    _id: "student2",
    email: "rasoa@example.com",
    password: "student123",
    role: "student" as const,
    profile: {
      nom: "Rasoamanana",
      prenom: "Marie",
      telephone: "+261 34 22 222 22",
      ville: "Fianarantsoa"
    },
    createdAt: "2023-06-15T08:00:00.000Z"
  },
  {
    _id: "student3",
    email: "andria@example.com",
    password: "student123",
    role: "student" as const,
    profile: {
      nom: "Andrianarivo",
      prenom: "Paul",
      telephone: "+261 34 33 333 33",
      ville: "Toamasina"
    },
    createdAt: "2023-07-01T08:00:00.000Z"
  },
  {
    _id: "student4",
    email: "rajao@example.com",
    password: "student123",
    role: "student" as const,
    profile: {
      nom: "Rajao",
      prenom: "Sophie",
      telephone: "+261 34 44 444 44",
      ville: "Mahajanga"
    },
    createdAt: "2023-07-15T08:00:00.000Z"
  },
  {
    _id: "student5",
    email: "rakotozafy@example.com",
    password: "student123",
    role: "student" as const,
    profile: {
      nom: "Rakotozafy",
      prenom: "Michel",
      telephone: "+261 34 55 555 55",
      ville: "Toliara"
    },
    createdAt: "2023-08-01T08:00:00.000Z"
  },
  {
    _id: "student6",
    email: "randria@example.com",
    password: "student123",
    role: "student" as const,
    profile: {
      nom: "Randrianasolo",
      prenom: "Alice",
      telephone: "+261 34 66 666 66",
      ville: "Antsiranana"
    },
    createdAt: "2023-08-15T08:00:00.000Z"
  },
  {
    _id: "student7",
    email: "rakotondrazaka@example.com",
    password: "student123",
    role: "student" as const,
    profile: {
      nom: "Rakotondrazaka",
      prenom: "Jean-Claude",
      telephone: "+261 34 77 777 77",
      ville: "Antananarivo"
    },
    createdAt: "2023-09-01T08:00:00.000Z"
  },
  {
    _id: "student8",
    email: "rasolofomanana@example.com",
    password: "student123",
    role: "student" as const,
    profile: {
      nom: "Rasolofomanana",
      prenom: "Nirina",
      telephone: "+261 34 88 888 88",
      ville: "Fianarantsoa"
    },
    createdAt: "2023-09-15T08:00:00.000Z"
  },
  {
    _id: "student9",
    email: "andriantsiferana@example.com",
    password: "student123",
    role: "student" as const,
    profile: {
      nom: "Andriantsiferana",
      prenom: "Tovo",
      telephone: "+261 34 99 999 99",
      ville: "Toamasina"
    },
    createdAt: "2023-10-01T08:00:00.000Z"
  },
  {
    _id: "student10",
    email: "rakotomavo@example.com",
    password: "student123",
    role: "student" as const,
    profile: {
      nom: "Rakotomavo",
      prenom: "Lalaina",
      telephone: "+261 34 10 101 01",
      ville: "Antananarivo"
    },
    createdAt: "2023-10-15T08:00:00.000Z"
  }
];

export const enrollments = [
  {
    _id: "1",
    formationId: "1",
    userId: "student1",
    status: "pending" as const,
    answers: {
      nom: "Rakoto",
      prenom: "Jean",
      motivation: "Je souhaite devenir médecin pour aider ma communauté"
    },
    createdAt: "2024-01-15T08:00:00.000Z",
    updatedAt: "2024-01-15T08:00:00.000Z"
  },
  {
    _id: "2",
    formationId: "3",
    userId: "student2",
    status: "approved" as const,
    answers: {
      nom: "Rasoamanana",
      prenom: "Marie",
      motivation: "Passionnée par l'informatique et le développement"
    },
    createdAt: "2024-01-10T08:00:00.000Z",
    updatedAt: "2024-01-10T08:00:00.000Z"
  },
  {
    _id: "3",
    formationId: "8",
    userId: "student3",
    status: "pending" as const,
    answers: {
      nom: "Andrianarivo",
      prenom: "Paul",
      motivation: "Intérêt pour le développement logiciel"
    },
    createdAt: "2024-01-05T08:00:00.000Z",
    updatedAt: "2024-01-05T08:00:00.000Z"
  }
];

export const cities = [
  "Antananarivo",
  "Toamasina",
  "Antsirabe",
  "Fianarantsoa",
  "Mahajanga",
  "Toliara",
  "Antsiranana",
  "Morondava",
  "Nosy Be",
  "Tamatave"
];

export const domains = [
  "Informatique",
  "Médecine",
  "Ingénierie",
  "Commerce",
  "Droit",
  "Sciences",
  "Arts",
  "Agriculture",
  "Tourisme",
  "Éducation",
  "Sciences Économiques",
  "Lettres",
  "Sciences Humaines"
];