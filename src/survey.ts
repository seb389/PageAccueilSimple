import type { Lang } from './i18n';

export type Option = { value: string; label: string };

export type Question =
  | { key: string; type: 'radio'; label: string; required: boolean; options: Option[] }
  | { key: string; type: 'checkbox'; label: string; required: boolean; options: Option[]; hint?: string }
  | { key: string; type: 'scale'; label: string; required: boolean; min: number; max: number; minLabel: string; maxLabel: string }
  | { key: string; type: 'textarea'; label: string; required: boolean; placeholder?: string }
  | { key: string; type: 'matrix'; label: string; required: boolean; intro?: string; rows: { key: string; label: string }[]; columns: Option[] };

export type Section = {
  id: string;
  title: string;
  intro?: string;
  questions: Question[];
};

export type SurveyContent = {
  intro: { heading: string; paragraphs: string[]; signature: string; timeEstimate: string };
  sections: Section[];
  submit: string;
  submitting: string;
  requiredNote: string;
  errors: { required: string; network: string; default: string; invalid_email: string; consent_required: string };
  newsletterOptIn: {
    title: string;
    hint: string;
    enableLabel: string;
    emailPlaceholder: string;
    consentBefore: string;
    consentLink: string;
    consentAfter: string;
    privacyHref: string;
  };
};

const FR: SurveyContent = {
  intro: {
    heading: "Repensons la location de vélo de route au Québec",
    paragraphs: [
      "Nous explorons la mise sur pied d'un service québécois de location de vélos de route haut de gamme, avec livraison et entretien inclus. Avant de concrétiser le projet, nous souhaitons bien comprendre les besoins et les attentes des cyclistes d'ici.",
      "Ce sondage prend environ 3 à 5 minutes. Merci du temps que vous y consacrez — chaque réponse compte et nous aidera à bâtir un service qui vous ressemble.",
    ],
    signature: "— L'équipe LACET",
    timeEstimate: "3 à 5 minutes",
  },
  submit: "Envoyer mes réponses",
  submitting: "Envoi…",
  requiredNote: "Les questions marquées d'un astérisque sont obligatoires.",
  errors: {
    required: "Merci de répondre à toutes les questions obligatoires.",
    network: "Problème de connexion. Vérifiez votre réseau et réessayez.",
    default: "Une erreur est survenue. Réessayez.",
    invalid_email: "Courriel invalide.",
    consent_required: "Veuillez cocher le consentement à la politique de confidentialité.",
  },
  newsletterOptIn: {
    title: "Infolettre (optionnel)",
    hint: "Si vous souhaitez être avisé·e de l'ouverture du service, laissez-nous votre courriel. Votre réponse au sondage reste anonyme — le courriel est conservé séparément.",
    enableLabel: "Oui, je veux recevoir l'infolettre",
    emailPlaceholder: "votre@courriel.ca",
    consentBefore: "J'accepte la",
    consentLink: "politique de confidentialité",
    consentAfter: ".",
    privacyHref: "/confidentialite",
  },
  sections: [
    {
      id: "s1",
      title: "Votre profil de cycliste",
      intro: "Quelques questions générales pour mieux comprendre qui vous êtes.",
      questions: [
        {
          key: "age", type: "radio", required: true,
          label: "Votre tranche d'âge ?",
          options: [
            { value: "under_25", label: "Moins de 25 ans" },
            { value: "25_34",    label: "25 à 34 ans" },
            { value: "35_44",    label: "35 à 44 ans" },
            { value: "45_54",    label: "45 à 54 ans" },
            { value: "55_64",    label: "55 à 64 ans" },
            { value: "65_plus",  label: "65 ans et plus" },
          ],
        },
        {
          key: "region", type: "radio", required: true,
          label: "Votre région au Québec ?",
          options: [
            { value: "montreal",           label: "Montréal" },
            { value: "laval",              label: "Laval" },
            { value: "monteregie",         label: "Montérégie" },
            { value: "laurentides",        label: "Laurentides" },
            { value: "lanaudiere",         label: "Lanaudière" },
            { value: "estrie",             label: "Estrie / Cantons-de-l'Est" },
            { value: "capitale_nationale", label: "Capitale-Nationale (Québec et environs)" },
            { value: "outaouais",          label: "Outaouais" },
            { value: "other_qc",           label: "Autre région du Québec" },
            { value: "outside_qc",         label: "Hors Québec" },
          ],
        },
        {
          key: "practice", type: "radio", required: true,
          label: "Votre pratique du vélo ?",
          options: [
            { value: "occasional",      label: "Occasionnelle — loisir, quelques sorties/saison" },
            { value: "regular_leisure", label: "Régulière — 1 à 2 sorties/semaine" },
            { value: "enthusiast",      label: "Enthousiaste — 3 sorties+/semaine, longues distances" },
            { value: "sport",           label: "Sportive — entraînement structuré, événements" },
            { value: "competitive",     label: "Compétitive — courses, licence FQSC" },
          ],
        },
        {
          key: "km_season", type: "radio", required: true,
          label: "Kilométrage typique par saison ?",
          options: [
            { value: "under_500",  label: "Moins de 500 km" },
            { value: "500_1500",   label: "500 à 1 500 km" },
            { value: "1500_3000",  label: "1 500 à 3 000 km" },
            { value: "3000_5000",  label: "3 000 à 5 000 km" },
            { value: "over_5000",  label: "Plus de 5 000 km" },
          ],
        },
        {
          key: "bike_value", type: "radio", required: true,
          label: "Valeur approximative de votre vélo actuel ?",
          options: [
            { value: "none",          label: "Je n'ai pas de vélo en ce moment" },
            { value: "under_1500",    label: "Moins de 1 500 $" },
            { value: "1500_3000",     label: "1 500 à 3 000 $" },
            { value: "3000_5000",     label: "3 000 à 5 000 $" },
            { value: "5000_8000",     label: "5 000 à 8 000 $" },
            { value: "8000_12000",    label: "8 000 à 12 000 $" },
            { value: "over_12000",    label: "Plus de 12 000 $" },
          ],
        },
      ],
    },
    {
      id: "s2",
      title: "Intérêt et contexte d'utilisation",
      intro: "Comprendre dans quels moments un tel service pourrait vous être utile.",
      questions: [
        {
          key: "interest", type: "scale", required: true,
          label: "À quel point louer un vélo haut de gamme vous intéresse ? (1-10)",
          min: 1, max: 10,
          minLabel: "Aucun intérêt",
          maxLabel: "Très fort intérêt",
        },
        {
          key: "rented_before", type: "radio", required: true,
          label: "Avez-vous déjà loué un vélo ?",
          options: [
            { value: "qc",      label: "Oui, au Québec" },
            { value: "abroad",  label: "Oui, en voyage à l'étranger" },
            { value: "both",    label: "Oui, au Québec et à l'étranger" },
            { value: "never",   label: "Non, jamais" },
          ],
        },
        {
          key: "contexts", type: "checkbox", required: true,
          hint: "Cochez tout ce qui s'applique.",
          label: "Dans quel(s) contexte(s) utiliseriez-vous ce service ?",
          options: [
            { value: "travel",           label: "En voyage ou en vacances" },
            { value: "try_before_buy",   label: "Pour essayer avant d'acheter" },
            { value: "replacement",      label: "Remplacement pendant réparation du mien" },
            { value: "full_season",      label: "Saison complète, sans posséder de vélo" },
            { value: "gift",             label: "En cadeau à un·e proche cycliste" },
            { value: "special_outings",  label: "Sorties spéciales (camp, week-end, etc.)" },
            { value: "none",             label: "Aucun pour le moment" },
          ],
        },
        {
          key: "bike_type", type: "checkbox", required: true,
          hint: "Cochez tout ce qui s'applique.",
          label: "Quel type de vélo seriez-vous intéressé à louer ?",
          options: [
            { value: "climber",   label: "Vélo léger — Colnago V5Rs, S-Works Aethos, Cervélo R5" },
            { value: "aero",      label: "Vélo aéro — S-Works Tarmac SL8, Cervélo S5, Colnago Y1Rs" },
            { value: "endurance", label: "Vélo endurance — S-Works Roubaix, Trek Domane SLR, BMC Roadmachine 01" },
            { value: "tt",        label: "Vélo TT — Cervélo P5, Trek Speed Concept, Argon 18 E-119 Tri+" },
          ],
        },
        {
          key: "duration", type: "radio", required: true,
          label: "Durée de location qui vous intéresse le plus ?",
          options: [
            { value: "under_week",        label: "Moins d'une semaine" },
            { value: "one_week",          label: "Une semaine" },
            { value: "two_three_weeks",   label: "Deux à trois semaines" },
            { value: "one_month",         label: "Un mois" },
            { value: "half_season",       label: "Une demi-saison (2 à 3 mois)" },
            { value: "full_season",       label: "Une saison complète (avril à octobre)" },
          ],
        },
      ],
    },
    {
      id: "s4",
      title: "Prix que vous jugeriez raisonnables",
      intro: "Pour chacune des durées, quelle fourchette vous paraît juste pour <strong>un vélo haut de gamme (valeur 12 000 à 16 000 $)</strong> avec livraison et entretien inclus ?",
      questions: [
        {
          key: "price_week", type: "radio", required: true,
          label: "Pour une semaine complète ?",
          options: [
            { value: "under_300",       label: "Moins de 300 $" },
            { value: "300_500",         label: "300 à 500 $" },
            { value: "500_700",         label: "500 à 700 $" },
            { value: "700_1000",        label: "700 à 1 000 $" },
            { value: "over_1000",       label: "Plus de 1 000 $" },
            { value: "would_not_rent",  label: "Je ne louerais pas à la semaine" },
          ],
        },
        {
          key: "price_month", type: "radio", required: true,
          label: "Pour un mois complet ?",
          options: [
            { value: "under_1000",      label: "Moins de 1 000 $" },
            { value: "1000_1500",       label: "1 000 à 1 500 $" },
            { value: "1500_2000",       label: "1 500 à 2 000 $" },
            { value: "2000_3000",       label: "2 000 à 3 000 $" },
            { value: "over_3000",       label: "Plus de 3 000 $" },
            { value: "would_not_rent",  label: "Je ne louerais pas au mois" },
          ],
        },
        {
          key: "price_season", type: "radio", required: true,
          label: "Pour une saison (avril à octobre, ~6 mois) ?",
          options: [
            { value: "under_2500",      label: "Moins de 2 500 $" },
            { value: "2500_3500",       label: "2 500 à 3 500 $" },
            { value: "3500_5000",       label: "3 500 à 5 000 $" },
            { value: "5000_7500",       label: "5 000 à 7 500 $" },
            { value: "over_7500",       label: "Plus de 7 500 $" },
            { value: "would_not_rent",  label: "Je ne louerais pas à la saison" },
          ],
        },
      ],
    },
    {
      id: "s5",
      title: "Services premium accompagnant la location",
      intro: "Au-delà du vélo lui-même, quels services feraient une vraie différence ?",
      questions: [
        {
          key: "services_grid", type: "matrix", required: true,
          label: "Évaluez l'importance de chaque service pour vous.",
          columns: [
            { value: "essential",      label: "Indispensable" },
            { value: "interesting",    label: "Intéressant" },
            { value: "low_priority",   label: "Peu important" },
            { value: "not_relevant",   label: "Pas pertinent" },
          ],
          rows: [
            { key: "val_delivery",     label: "Livraison et récupération à domicile" },
            { key: "val_bikefit",      label: "Ajustement (bike fit) inclus" },
            { key: "val_maintenance",  label: "Entretien et réparations à domicile" },
            { key: "val_insurance",    label: "Assurance vol et bris incluse" },
            { key: "val_exchange",     label: "Échange de modèle durant la location" },
            { key: "val_coaching",     label: "Conseils / coaching par un·e spécialiste" },
            { key: "val_equipment",    label: "Équipement inclus (casque, pédales, GPS, vêtements)" },
            { key: "val_purchase",     label: "Option d'achat avec crédit location" },
            { key: "val_routes",       label: "Parcours, GPS, groupes de sortie" },
          ],
        },
        {
          key: "top_service", type: "radio", required: true,
          label: "Parmi ces services, lequel serait le plus déterminant pour vous ?",
          options: [
            { value: "delivery",          label: "Livraison et récupération à domicile" },
            { value: "bikefit",           label: "Bike fit inclus" },
            { value: "maintenance",       label: "Entretien et réparations à domicile" },
            { value: "insurance",         label: "Assurance vol/bris incluse" },
            { value: "exchange",          label: "Échange de modèle durant la location" },
            { value: "coaching",          label: "Conseils ou coaching" },
            { value: "equipment",         label: "Équipement complémentaire inclus" },
            { value: "purchase_option",   label: "Option d'achat après location" },
            { value: "routes",            label: "Parcours, itinéraires, groupes de sortie" },
            { value: "other",             label: "Autre" },
          ],
        },
      ],
    },
    {
      id: "s6",
      title: "Freins et commentaires",
      questions: [
        {
          key: "main_concern", type: "radio", required: true,
          label: "Votre principal frein à utiliser ce service ?",
          options: [
            { value: "price",                label: "Le prix" },
            { value: "damage_loss",          label: "Peur d'endommager ou perdre le vélo" },
            { value: "prefer_own",           label: "Je préfère posséder le mien" },
            { value: "maintenance_quality",  label: "Qualité d'entretien inconnue" },
            { value: "logistics",            label: "Logistique (prise en charge, retour)" },
            { value: "no_concern",           label: "Aucun, je serais prêt·e à essayer" },
            { value: "other",                label: "Autre" },
          ],
        },
        {
          key: "comments", type: "textarea", required: false,
          label: "Autres commentaires, suggestions ou préoccupations ?",
          placeholder: "Partagez ce que vous voulez…",
        },
      ],
    },
  ],
};

const EN: SurveyContent = {
  intro: {
    heading: "Rethinking road bike rental in Quebec",
    paragraphs: [
      "We are exploring the launch of a Quebec-based premium road bike rental service, with delivery and maintenance included. Before making it a reality, we want to understand the needs and expectations of cyclists here.",
      "This survey takes about 3 to 5 minutes. Thank you for your time — every answer matters and will help us build a service that fits you.",
    ],
    signature: "— The LACET team",
    timeEstimate: "3 to 5 minutes",
  },
  submit: "Submit my answers",
  submitting: "Sending…",
  requiredNote: "Questions marked with an asterisk are required.",
  errors: {
    required: "Please answer all required questions.",
    network: "Connection issue. Please check your network and try again.",
    default: "An error occurred. Please try again.",
    invalid_email: "Invalid email address.",
    consent_required: "Please check the privacy policy consent.",
  },
  newsletterOptIn: {
    title: "Newsletter (optional)",
    hint: "If you'd like to be notified when the service opens, leave us your email. Your survey answers remain anonymous — the email is kept separately.",
    enableLabel: "Yes, I'd like to receive the newsletter",
    emailPlaceholder: "your@email.com",
    consentBefore: "I agree to the",
    consentLink: "privacy policy",
    consentAfter: ".",
    privacyHref: "/en/privacy",
  },
  sections: [
    {
      id: "s1",
      title: "Your cyclist profile",
      intro: "A few general questions to better understand who you are.",
      questions: [
        {
          key: "age", type: "radio", required: true,
          label: "Your age group?",
          options: [
            { value: "under_25", label: "Under 25" },
            { value: "25_34",    label: "25 to 34" },
            { value: "35_44",    label: "35 to 44" },
            { value: "45_54",    label: "45 to 54" },
            { value: "55_64",    label: "55 to 64" },
            { value: "65_plus",  label: "65 and over" },
          ],
        },
        {
          key: "region", type: "radio", required: true,
          label: "Your region in Quebec?",
          options: [
            { value: "montreal",           label: "Montreal" },
            { value: "laval",              label: "Laval" },
            { value: "monteregie",         label: "Montérégie" },
            { value: "laurentides",        label: "Laurentides" },
            { value: "lanaudiere",         label: "Lanaudière" },
            { value: "estrie",             label: "Estrie / Eastern Townships" },
            { value: "capitale_nationale", label: "Capitale-Nationale (Quebec City area)" },
            { value: "outaouais",          label: "Outaouais" },
            { value: "other_qc",           label: "Other region of Quebec" },
            { value: "outside_qc",         label: "Outside Quebec" },
          ],
        },
        {
          key: "practice", type: "radio", required: true,
          label: "Your cycling practice?",
          options: [
            { value: "occasional",      label: "Occasional — leisure, a few rides per season" },
            { value: "regular_leisure", label: "Regular — 1 to 2 rides/week" },
            { value: "enthusiast",      label: "Enthusiast — 3+ rides/week, long distances" },
            { value: "sport",           label: "Sport — structured training, events" },
            { value: "competitive",     label: "Competitive — races, FQSC license" },
          ],
        },
        {
          key: "km_season", type: "radio", required: true,
          label: "Typical mileage per season?",
          options: [
            { value: "under_500",  label: "Less than 500 km" },
            { value: "500_1500",   label: "500 to 1,500 km" },
            { value: "1500_3000",  label: "1,500 to 3,000 km" },
            { value: "3000_5000",  label: "3,000 to 5,000 km" },
            { value: "over_5000",  label: "More than 5,000 km" },
          ],
        },
        {
          key: "bike_value", type: "radio", required: true,
          label: "Approximate value of your current bike?",
          options: [
            { value: "none",          label: "I don't own a bike at the moment" },
            { value: "under_1500",    label: "Less than $1,500" },
            { value: "1500_3000",     label: "$1,500 to $3,000" },
            { value: "3000_5000",     label: "$3,000 to $5,000" },
            { value: "5000_8000",     label: "$5,000 to $8,000" },
            { value: "8000_12000",    label: "$8,000 to $12,000" },
            { value: "over_12000",    label: "More than $12,000" },
          ],
        },
      ],
    },
    {
      id: "s2",
      title: "Interest and use case",
      intro: "Understanding when such a service would be useful to you.",
      questions: [
        {
          key: "interest", type: "scale", required: true,
          label: "How interested are you in renting a premium bike? (1-10)",
          min: 1, max: 10,
          minLabel: "Not interested",
          maxLabel: "Very interested",
        },
        {
          key: "rented_before", type: "radio", required: true,
          label: "Have you ever rented a bike?",
          options: [
            { value: "qc",      label: "Yes, in Quebec" },
            { value: "abroad",  label: "Yes, while travelling abroad" },
            { value: "both",    label: "Yes, in Quebec and abroad" },
            { value: "never",   label: "No, never" },
          ],
        },
        {
          key: "contexts", type: "checkbox", required: true,
          hint: "Check all that apply.",
          label: "In which situation(s) would you use this service?",
          options: [
            { value: "travel",           label: "On a trip or vacation" },
            { value: "try_before_buy",   label: "To try before buying" },
            { value: "replacement",      label: "Replacement while mine is in repair" },
            { value: "full_season",      label: "Full season, without owning a bike" },
            { value: "gift",             label: "As a gift to a cyclist friend" },
            { value: "special_outings",  label: "Special rides (training camp, weekend, etc.)" },
            { value: "none",             label: "None for the moment" },
          ],
        },
        {
          key: "bike_type", type: "checkbox", required: true,
          hint: "Check all that apply.",
          label: "Which type of bike would you be interested in renting?",
          options: [
            { value: "climber",   label: "Lightweight — Colnago V5Rs, S-Works Aethos, Cervélo R5" },
            { value: "aero",      label: "Aero — S-Works Tarmac SL8, Cervélo S5, Colnago Y1Rs" },
            { value: "endurance", label: "Endurance — S-Works Roubaix, Trek Domane SLR, BMC Roadmachine 01" },
            { value: "tt",        label: "TT — Cervélo P5, Trek Speed Concept, Argon 18 E-119 Tri+" },
          ],
        },
        {
          key: "duration", type: "radio", required: true,
          label: "Rental duration that interests you most?",
          options: [
            { value: "under_week",        label: "Less than a week" },
            { value: "one_week",          label: "One week" },
            { value: "two_three_weeks",   label: "Two to three weeks" },
            { value: "one_month",         label: "One month" },
            { value: "half_season",       label: "Half a season (2 to 3 months)" },
            { value: "full_season",       label: "A full season (April to October)" },
          ],
        },
      ],
    },
    {
      id: "s4",
      title: "Prices you would consider reasonable",
      intro: "For each duration, what range feels fair for <strong>a premium bike (valued $12,000 to $16,000)</strong> with delivery and maintenance included?",
      questions: [
        {
          key: "price_week", type: "radio", required: true,
          label: "For a full week?",
          options: [
            { value: "under_300",       label: "Less than $300" },
            { value: "300_500",         label: "$300 to $500" },
            { value: "500_700",         label: "$500 to $700" },
            { value: "700_1000",        label: "$700 to $1,000" },
            { value: "over_1000",       label: "More than $1,000" },
            { value: "would_not_rent",  label: "I would not rent by the week" },
          ],
        },
        {
          key: "price_month", type: "radio", required: true,
          label: "For a full month?",
          options: [
            { value: "under_1000",      label: "Less than $1,000" },
            { value: "1000_1500",       label: "$1,000 to $1,500" },
            { value: "1500_2000",       label: "$1,500 to $2,000" },
            { value: "2000_3000",       label: "$2,000 to $3,000" },
            { value: "over_3000",       label: "More than $3,000" },
            { value: "would_not_rent",  label: "I would not rent by the month" },
          ],
        },
        {
          key: "price_season", type: "radio", required: true,
          label: "For a season (April to October, ~6 months)?",
          options: [
            { value: "under_2500",      label: "Less than $2,500" },
            { value: "2500_3500",       label: "$2,500 to $3,500" },
            { value: "3500_5000",       label: "$3,500 to $5,000" },
            { value: "5000_7500",       label: "$5,000 to $7,500" },
            { value: "over_7500",       label: "More than $7,500" },
            { value: "would_not_rent",  label: "I would not rent by the season" },
          ],
        },
      ],
    },
    {
      id: "s5",
      title: "Premium services with the rental",
      intro: "Beyond the bike itself, which services would truly make a difference?",
      questions: [
        {
          key: "services_grid", type: "matrix", required: true,
          label: "Rate how important each service is for you.",
          columns: [
            { value: "essential",      label: "Essential" },
            { value: "interesting",    label: "Interesting" },
            { value: "low_priority",   label: "Low priority" },
            { value: "not_relevant",   label: "Not relevant" },
          ],
          rows: [
            { key: "val_delivery",     label: "Home delivery and pickup" },
            { key: "val_bikefit",      label: "Bike fit included" },
            { key: "val_maintenance",  label: "On-site maintenance and repairs" },
            { key: "val_insurance",    label: "Theft and damage insurance included" },
            { key: "val_exchange",     label: "Model swap during rental" },
            { key: "val_coaching",     label: "Advice / coaching by a specialist" },
            { key: "val_equipment",    label: "Gear included (helmet, pedals, GPS, clothing)" },
            { key: "val_purchase",     label: "Purchase option with rental credit" },
            { key: "val_routes",       label: "Routes, GPS, group rides" },
          ],
        },
        {
          key: "top_service", type: "radio", required: true,
          label: "Of these services, which would be the most decisive for you?",
          options: [
            { value: "delivery",          label: "Home delivery and pickup" },
            { value: "bikefit",           label: "Bike fit included" },
            { value: "maintenance",       label: "On-site maintenance and repairs" },
            { value: "insurance",         label: "Theft/damage insurance included" },
            { value: "exchange",          label: "Model swap during rental" },
            { value: "coaching",          label: "Advice or coaching" },
            { value: "equipment",         label: "Complementary gear included" },
            { value: "purchase_option",   label: "Option to buy after rental" },
            { value: "routes",            label: "Routes, tracks, group rides" },
            { value: "other",             label: "Other" },
          ],
        },
      ],
    },
    {
      id: "s6",
      title: "Concerns and comments",
      questions: [
        {
          key: "main_concern", type: "radio", required: true,
          label: "Your main concern about using this service?",
          options: [
            { value: "price",                label: "The price" },
            { value: "damage_loss",          label: "Fear of damaging or losing the bike" },
            { value: "prefer_own",           label: "I prefer to own my own" },
            { value: "maintenance_quality",  label: "Unknown maintenance quality" },
            { value: "logistics",            label: "Logistics (pickup, return)" },
            { value: "no_concern",           label: "None, I'd be willing to try" },
            { value: "other",                label: "Other" },
          ],
        },
        {
          key: "comments", type: "textarea", required: false,
          label: "Other comments, suggestions or concerns?",
          placeholder: "Share anything you'd like…",
        },
      ],
    },
  ],
};

export const survey: Record<Lang, SurveyContent> = { fr: FR, en: EN };
