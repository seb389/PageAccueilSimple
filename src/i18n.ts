export type Lang = 'fr' | 'en';

export const ui = {
  fr: {
    title_home:     'LACET · Québec',
    title_sondage:  'LACET · Sondage',
    region:         'Québec',
    tagline_left:   'Location',
    tagline_right:  'Vélo',
    status:         'Prochainement',
    contact_label:  'Pour information',
    footer_copy:    '© 2026 Lacet',
    footer_domain:  'lacet.ca',
    sondage_heading:'Sondage',
    back:           '← Accueil',
    back_href:      '/',
    form_link:      'Ouvrir le formulaire dans un nouvel onglet',
    lang_self:      'FR',
    lang_other:     'EN',
    alt_home:       '/en/',
    alt_sondage:    '/en/sondage',
  },
  en: {
    title_home:     'LACET · Québec',
    title_sondage:  'LACET · Survey',
    region:         'Québec',
    tagline_left:   'Rental',
    tagline_right:  'Bike',
    status:         'Coming Soon',
    contact_label:  'For information',
    footer_copy:    '© 2026 Lacet',
    footer_domain:  'lacet.ca',
    sondage_heading:'Survey',
    back:           '← Home',
    back_href:      '/en/',
    form_link:      'Open the form in a new tab',
    lang_self:      'EN',
    lang_other:     'FR',
    alt_home:       '/',
    alt_sondage:    '/sondage',
  },
} as const;

export function useTranslations(lang: Lang) {
  return ui[lang];
}
