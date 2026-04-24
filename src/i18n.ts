export type Lang = 'fr' | 'en';

export const ui = {
  fr: {
    title_home:         'LACET · Québec',
    title_sondage:      'LACET · Sondage',
    title_thanks:       'LACET · Merci',
    title_privacy:      'LACET · Confidentialité',
    region:             'Québec',
    tagline_left:       'Location',
    tagline_right:      'Vélo',
    status:             'Prochainement',
    contact_label:      'Pour information',
    footer_copy:        '© 2026 Lacet',
    footer_domain:      'lacet.ca',
    footer_privacy:     'Confidentialité',
    sondage_heading:    'Sondage',
    back:               '← Accueil',
    back_href:          '/',
    form_link:          'Ouvrir le formulaire dans un nouvel onglet',
    lang_self:          'FR',
    lang_other:         'EN',
    alt_home:           '/en/',
    alt_sondage:        '/en/sondage',
    alt_thanks:         '/en/thanks',
    alt_privacy:        '/en/privacy',

    // Newsletter
    nl_label:           'Infolettre',
    nl_prompt:          'Soyez avisé·e de notre ouverture',
    nl_placeholder:     'votre@courriel.ca',
    nl_submit:          "S'abonner",
    nl_submit_aria:     "S'abonner à l'infolettre",
    nl_consent:         "J'accepte de recevoir l'infolettre et j'ai lu la",
    nl_privacy_link:    'politique de confidentialité',
    nl_privacy_href:    '/confidentialite',
    nl_success_title:   'Presque !',
    nl_success_body:    'Vérifiez votre boîte courriel et cliquez sur le lien de confirmation pour finaliser votre inscription.',
    nl_err_invalid:     'Courriel invalide.',
    nl_err_consent:     'Veuillez cocher la case de consentement.',
    nl_err_service:     "Service temporairement indisponible. Réessayez plus tard.",
    nl_err_network:     'Problème de connexion. Vérifiez votre réseau.',
    nl_err_default:     "Une erreur est survenue. Réessayez.",
    nl_loading:         '…',

    // Page merci
    thanks_title:       'Merci !',
    thanks_body:        'Votre inscription à l\'infolettre est confirmée. Vous recevrez des nouvelles dès l\'ouverture de l\'atelier.',
    thanks_back:        '← Retour à l\'accueil',

    // Page merci sondage
    thanks_survey_title: 'Merci !',
    thanks_survey_body:  'Votre contribution nous aide à construire un service pensé pour les cyclistes d\'ici. Nous publierons les grandes tendances du sondage dans les prochains mois.',
    thanks_survey_back:  '← Retour à l\'accueil',

    // Politique de confidentialité
    privacy_title:      'Politique de confidentialité',
    privacy_last_updated: 'Dernière mise à jour : avril 2026',
  },
  en: {
    title_home:         'LACET · Québec',
    title_sondage:      'LACET · Survey',
    title_thanks:       'LACET · Thank you',
    title_privacy:      'LACET · Privacy',
    region:             'Québec',
    tagline_left:       'Rental',
    tagline_right:      'Bike',
    status:             'Coming Soon',
    contact_label:      'For information',
    footer_copy:        '© 2026 Lacet',
    footer_domain:      'lacet.ca',
    footer_privacy:     'Privacy',
    sondage_heading:    'Survey',
    back:               '← Home',
    back_href:          '/en/',
    form_link:          'Open the form in a new tab',
    lang_self:          'EN',
    lang_other:         'FR',
    alt_home:           '/',
    alt_sondage:        '/sondage',
    alt_thanks:         '/merci',
    alt_privacy:        '/confidentialite',

    // Newsletter
    nl_label:           'Newsletter',
    nl_prompt:          'Get notified when we open',
    nl_placeholder:     'your@email.com',
    nl_submit:          'Subscribe',
    nl_submit_aria:     'Subscribe to the newsletter',
    nl_consent:         'I agree to receive the newsletter and I have read the',
    nl_privacy_link:    'privacy policy',
    nl_privacy_href:    '/en/privacy',
    nl_success_title:   'Almost there!',
    nl_success_body:    'Check your inbox and click the confirmation link to finalize your subscription.',
    nl_err_invalid:     'Invalid email.',
    nl_err_consent:     'Please check the consent box.',
    nl_err_service:     'Service temporarily unavailable. Please try again later.',
    nl_err_network:     'Connection issue. Please check your network.',
    nl_err_default:     'An error occurred. Please try again.',
    nl_loading:         '…',

    // Thanks page
    thanks_title:       'Thank you!',
    thanks_body:        'Your subscription to the newsletter is confirmed. You will hear from us as soon as the shop opens.',
    thanks_back:        '← Back to home',

    // Survey thanks page
    thanks_survey_title: 'Thank you!',
    thanks_survey_body:  'Your input helps us build a service made for cyclists here. We will publish the main findings of the survey in the coming months.',
    thanks_survey_back:  '← Back to home',

    // Privacy policy
    privacy_title:      'Privacy Policy',
    privacy_last_updated: 'Last updated: April 2026',
  },
} as const;

export function useTranslations(lang: Lang) {
  return ui[lang];
}
