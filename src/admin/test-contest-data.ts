// Hardcoded test data for the admin draw page.
// Used when ?mode=test is passed to /admin/draw.
// Names are plausible Quebec-style; emails point to example.com to avoid any real address collision.

export interface TestContestEntry {
  id: number;
  name: string;
  email: string;
  lang: 'fr' | 'en';
}

export const TEST_CONTEST_ENTRIES: TestContestEntry[] = [
  { id: 1,  name: 'Marie Tremblay',         email: 'marie.tremblay@example.com',          lang: 'fr' },
  { id: 2,  name: 'Jean-François Bouchard', email: 'jf.bouchard@example.com',             lang: 'fr' },
  { id: 3,  name: 'Catherine Lavoie',       email: 'catherine.lavoie@example.com',        lang: 'fr' },
  { id: 4,  name: 'Pierre Gagnon',          email: 'pierre.gagnon@example.com',           lang: 'fr' },
  { id: 5,  name: 'Émilie Côté',            email: 'emilie.cote@example.com',             lang: 'fr' },
  { id: 6,  name: 'Antoine Lefebvre',       email: 'antoine.lefebvre@example.com',        lang: 'fr' },
  { id: 7,  name: 'Sophie Roy',             email: 'sophie.roy@example.com',              lang: 'fr' },
  { id: 8,  name: 'Maxime Bélanger',        email: 'maxime.belanger@example.com',         lang: 'fr' },
  { id: 9,  name: 'Geneviève Pelletier',    email: 'genevieve.pelletier@example.com',     lang: 'fr' },
  { id: 10, name: 'David Lévesque',         email: 'david.levesque@example.com',          lang: 'fr' },
  { id: 11, name: 'Annie Morin',            email: 'annie.morin@example.com',             lang: 'fr' },
  { id: 12, name: 'Sébastien Mercier',      email: 'sebastien.mercier@example.com',       lang: 'fr' },
  { id: 13, name: 'Caroline Dubois',        email: 'caroline.dubois@example.com',         lang: 'fr' },
  { id: 14, name: 'Marc-André Beaulieu',    email: 'marc-andre.beaulieu@example.com',     lang: 'fr' },
  { id: 15, name: 'Julie Caron',            email: 'julie.caron@example.com',             lang: 'fr' },
  { id: 16, name: 'François Therrien',      email: 'francois.therrien@example.com',       lang: 'fr' },
  { id: 17, name: 'Élodie Fortin',          email: 'elodie.fortin@example.com',           lang: 'fr' },
  { id: 18, name: 'Patrick Demers',         email: 'patrick.demers@example.com',          lang: 'fr' },
  { id: 19, name: 'Stéphanie Bernier',      email: 'stephanie.bernier@example.com',       lang: 'fr' },
  { id: 20, name: 'Alexandre Gauthier',     email: 'alexandre.gauthier@example.com',      lang: 'fr' },
  { id: 21, name: 'Lauren MacDonald',       email: 'lauren.macdonald@example.com',        lang: 'en' },
  { id: 22, name: 'Michael Smith',          email: 'michael.smith@example.com',           lang: 'en' },
  { id: 23, name: 'Sarah Johnson',          email: 'sarah.johnson@example.com',           lang: 'en' },
  { id: 24, name: "James O'Brien",          email: 'james.obrien@example.com',            lang: 'en' },
  { id: 25, name: 'Emma Patel',             email: 'emma.patel@example.com',              lang: 'en' },
];
