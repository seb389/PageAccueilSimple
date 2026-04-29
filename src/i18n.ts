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
    status:             'Printemps 2027',
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

    // Survey CTA (home page)
    survey_cta_label:   'Sondage',
    survey_cta_prompt:  'Aidez-nous à bâtir un service qui vous ressemble',
    survey_cta_button:  'Participer au sondage',
    survey_cta_href:    '/sondage',

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
    thanks_survey_title: 'Merci, vraiment.',
    thanks_survey_body:  'Chaque réponse au sondage nous aide à bâtir un service de location de vélos de route à la hauteur des cyclistes d\'ici. Le vôtre comptera dans les décisions qu\'on prendra dans les prochains mois.',
    thanks_survey_signoff: '— L\'équipe Lacet',
    thanks_survey_back:  '← Retour à l\'accueil',

    // Bloc concours
    thanks_contest_title: 'Vous êtes inscrit·e au tirage 🎯',
    thanks_contest_body:  'Vous courez la chance de gagner un',
    thanks_contest_prize: 'Garmin Varia RearVue 820',
    thanks_contest_value: 'd\'une valeur de 419,99 $.',
    thanks_contest_draw_label: 'Tirage : lundi 8 juin 2026.',
    thanks_contest_draw_body: 'Si vous êtes la personne sélectionnée, nous vous écrirons à l\'adresse courriel fournie dans les sept jours suivant le tirage.',
    thanks_contest_luck:  'Bonne chance — et bonnes routes d\'ici là.',
    thanks_contest_rules: 'Consulter le règlement complet',
    thanks_contest_rules_href: '/concours-reglement',

    // Bloc infolettre
    thanks_nl_title: 'Vous recevrez nos prochaines nouvelles 📬',
    thanks_nl_body:  'Vous serez parmi les premier·ère·s informé·e·s lors de l\'ouverture du service. Pas de spam, jamais — seulement les annonces qui comptent.',

    // Bloc partage
    thanks_share_title: 'Connaissez un·e ami·e cycliste ?',
    thanks_share_body:  'Plus on a de réponses, plus le service qu\'on bâtira sera juste. Partager le sondage prend dix secondes et fait une vraie différence.',
    thanks_share_facebook: 'Partager sur Facebook',
    thanks_share_sms:      'Partager par texto',
    thanks_share_email:    'Partager par courriel',
    thanks_share_url:      'https://www.lacet.ca/sondage',
    thanks_share_sms_body: 'Salut! Lacet prépare un service québécois de location de vélos de route haut de gamme. Ils sondent les cyclistes pour finaliser le projet — il y a un Garmin Varia 820 à gagner. Ça prend 3 minutes : https://www.lacet.ca/sondage',
    thanks_share_mail_subject: 'Sondage Lacet — vélos de route haut de gamme au Québec',
    thanks_share_mail_body: 'Salut!\n\nJe viens de répondre à un sondage pour Lacet, un projet québécois de location de vélos de route haut de gamme.\n\nIls cherchent à comprendre ce que les cyclistes d\'ici veulent vraiment d\'un service comme ça avant de lancer la première saison au printemps 2027. Ça prend 3 minutes et il y a un concours pour gagner un Garmin Varia RearVue 820 (419 $).\n\nVoici le lien : https://www.lacet.ca/sondage\n\nBonne route!',

    // Bloc suivre

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
    status:             'Spring 2027',
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

    // Survey CTA (home page)
    survey_cta_label:   'Survey',
    survey_cta_prompt:  'Help us build a service that fits you',
    survey_cta_button:  'Take the survey',
    survey_cta_href:    '/en/sondage',

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
    thanks_survey_title: 'Thank you, sincerely.',
    thanks_survey_body:  'Every response to the survey helps us build a road bike rental service that lives up to local cyclists\' expectations. Yours will count in the decisions we make over the coming months.',
    thanks_survey_signoff: '— The Lacet team',
    thanks_survey_back:  '← Back to home',

    // Contest block
    thanks_contest_title: 'You\'re entered in the draw 🎯',
    thanks_contest_body:  'You have a chance to win a',
    thanks_contest_prize: 'Garmin Varia RearVue 820',
    thanks_contest_value: 'with a retail value of $419.99.',
    thanks_contest_draw_label: 'Draw date: Monday, June 8, 2026.',
    thanks_contest_draw_body: 'If you\'re the selected person, we\'ll email you at the address you provided within seven days of the draw.',
    thanks_contest_luck:  'Good luck — and enjoy the rides until then.',
    thanks_contest_rules: 'Read the full rules',
    thanks_contest_rules_href: '/en/contest-rules',

    // Newsletter block
    thanks_nl_title: 'You\'ll hear from us 📬',
    thanks_nl_body:  'You\'ll be among the first to know when the service launches. No spam, ever — only the announcements that matter.',

    // Sharing block
    thanks_share_title: 'Know a fellow cyclist?',
    thanks_share_body:  'The more responses we get, the better the service will fit real needs. Sharing the survey takes ten seconds and makes a real difference.',
    thanks_share_facebook: 'Share on Facebook',
    thanks_share_sms:      'Share by text',
    thanks_share_email:    'Share by email',
    thanks_share_url:      'https://www.lacet.ca/en/sondage',
    thanks_share_sms_body: 'Hey! Lacet is building a Quebec-based premium road bike rental service. They\'re surveying cyclists to finalize the project — there\'s a Garmin Varia 820 to be won. Takes 3 minutes: https://www.lacet.ca/en/sondage',
    thanks_share_mail_subject: 'Lacet survey — premium road bikes in Quebec',
    thanks_share_mail_body: 'Hi!\n\nI just answered a survey for Lacet, a Quebec-based project for premium road bike rentals.\n\nThey\'re trying to understand what cyclists here actually want from a service like this before launching their first season in spring 2027. Takes 3 minutes and there\'s a contest to win a Garmin Varia RearVue 820 ($419).\n\nHere\'s the link: https://www.lacet.ca/en/sondage\n\nRide safe!',

    // Follow block

    // Privacy policy
    privacy_title:      'Privacy Policy',
    privacy_last_updated: 'Last updated: April 2026',
  },
} as const;

export function useTranslations(lang: Lang) {
  return ui[lang];
}
