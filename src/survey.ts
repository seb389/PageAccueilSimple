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
      "Ce sondage anonyme prend environ 7 à 9 minutes. Merci du temps que vous y consacrez — chaque réponse compte et nous aidera à bâtir un service qui vous ressemble.",
    ],
    signature: "— L'équipe LACET",
    timeEstimate: "7 à 9 minutes",
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
          label: "Dans quelle tranche d'âge vous situez-vous ?",
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
          label: "Dans quelle région du Québec habitez-vous principalement ?",
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
          label: "Comment qualifieriez-vous votre pratique du vélo ?",
          options: [
            { value: "occasional",      label: "Occasionnelle (quelques sorties par saison, surtout loisir)" },
            { value: "regular_leisure", label: "Régulière loisir (1 à 2 sorties par semaine)" },
            { value: "enthusiast",      label: "Enthousiaste (3 sorties ou plus par semaine, longues distances)" },
            { value: "sport",           label: "Sportive / performance (entraînement structuré, événements)" },
            { value: "competitive",     label: "Compétitive (courses, licence FQSC ou équivalent)" },
          ],
        },
        {
          key: "km_season", type: "radio", required: true,
          label: "Environ combien de kilomètres parcourez-vous par saison ?",
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
          label: "Quelle est la valeur approximative de votre vélo principal actuel ?",
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
          label: "Sur une échelle de 1 à 10, à quel point l'idée de louer un vélo haut de gamme vous intéresse-t-elle ?",
          min: 1, max: 10,
          minLabel: "Aucun intérêt",
          maxLabel: "Très fort intérêt",
        },
        {
          key: "rented_before", type: "radio", required: true,
          label: "Avez-vous déjà loué un vélo (haut de gamme ou non) dans le passé ?",
          options: [
            { value: "qc",      label: "Oui, au Québec" },
            { value: "abroad",  label: "Oui, en voyage à l'étranger" },
            { value: "both",    label: "Oui, au Québec et à l'étranger" },
            { value: "never",   label: "Non, jamais" },
          ],
        },
        {
          key: "past_experience", type: "radio", required: false,
          label: "Si vous avez déjà loué, quelle a été votre expérience globale ?",
          options: [
            { value: "very_satisfying",     label: "Très satisfaisante" },
            { value: "satisfying",          label: "Plutôt satisfaisante" },
            { value: "mixed",               label: "Mitigée" },
            { value: "disappointing",       label: "Décevante" },
            { value: "very_disappointing",  label: "Très décevante" },
            { value: "never_rented",        label: "N'a jamais loué" },
          ],
        },
        {
          key: "contexts", type: "checkbox", required: true,
          hint: "Cochez tout ce qui s'applique.",
          label: "Dans quel(s) contexte(s) utiliseriez-vous un service de location de vélo haut de gamme ?",
          options: [
            { value: "travel",           label: "En voyage ou en vacances (au Québec ou ailleurs)" },
            { value: "try_before_buy",   label: "Pour essayer un modèle avant de l'acheter" },
            { value: "replacement",      label: "Comme remplacement temporaire pendant que mon propre vélo est en réparation" },
            { value: "full_season",      label: "Pour une saison complète, sans avoir à acheter et entretenir mon propre vélo" },
            { value: "gift",             label: "Pour offrir l'expérience en cadeau à un proche passionné de vélo" },
            { value: "special_outings",  label: "Pour des sorties spéciales ou occasionnelles (camp d'entraînement, week-end spécial, etc.)" },
            { value: "none",             label: "Aucun contexte ne m'intéresse pour le moment" },
          ],
        },
      ],
    },
    {
      id: "s3",
      title: "Durée préférée de location",
      questions: [
        {
          key: "duration", type: "radio", required: true,
          label: "Quelle durée de location vous intéresserait le plus ?",
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
      intro: "Pour chacune des durées, indiquez la fourchette qui vous paraît juste pour louer un vélo haut de gamme (valeur de 8 000 à 15 000 $) incluant assistance de base et entretien.",
      questions: [
        {
          key: "price_week", type: "radio", required: true,
          label: "Pour une semaine complète ?",
          options: [
            { value: "under_500",       label: "Moins de 500 $" },
            { value: "500_900",         label: "500 à 900 $" },
            { value: "900_1400",        label: "900 à 1 400 $" },
            { value: "1400_2000",       label: "1 400 à 2 000 $" },
            { value: "over_2000",       label: "Plus de 2 000 $" },
            { value: "would_not_rent",  label: "Je ne louerais pas à la semaine" },
          ],
        },
        {
          key: "price_month", type: "radio", required: true,
          label: "Pour un mois complet ?",
          options: [
            { value: "under_1500",      label: "Moins de 1 500 $" },
            { value: "1500_2500",       label: "1 500 à 2 500 $" },
            { value: "2500_4000",       label: "2 500 à 4 000 $" },
            { value: "4000_6000",       label: "4 000 à 6 000 $" },
            { value: "over_6000",       label: "Plus de 6 000 $" },
            { value: "would_not_rent",  label: "Je ne louerais pas au mois" },
          ],
        },
        {
          key: "price_season", type: "radio", required: true,
          label: "Pour une saison complète (avril à octobre, environ 6 mois) ?",
          options: [
            { value: "under_3000",      label: "Moins de 3 000 $" },
            { value: "3000_5000",       label: "3 000 à 5 000 $" },
            { value: "5000_8000",       label: "5 000 à 8 000 $" },
            { value: "8000_12000",      label: "8 000 à 12 000 $" },
            { value: "over_12000",      label: "Plus de 12 000 $" },
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
          label: "Pour chacun des services suivants, indiquez à quel point il aurait de la valeur pour vous.",
          columns: [
            { value: "essential",      label: "Indispensable" },
            { value: "interesting",    label: "Intéressant" },
            { value: "low_priority",   label: "Peu important" },
            { value: "not_relevant",   label: "Pas pertinent" },
          ],
          rows: [
            { key: "val_delivery",     label: "Livraison et récupération du vélo à votre domicile" },
            { key: "val_bikefit",      label: "Ajustement personnalisé (bike fit) inclus" },
            { key: "val_maintenance",  label: "Entretien et réparations mineures à domicile pendant la location" },
            { key: "val_insurance",    label: "Assurance contre le vol et les bris incluse dans le prix" },
            { key: "val_exchange",     label: "Possibilité d'échanger de modèle durant la même location" },
            { key: "val_coaching",     label: "Conseils ou coaching par un ex-coureur ou spécialiste" },
            { key: "val_equipment",    label: "Équipement complémentaire inclus (casque, pédales, GPS, vêtements)" },
            { key: "val_purchase",     label: "Option d'achat du vélo loué avec crédit de la location" },
            { key: "val_storage",      label: "Entreposage sécurisé du vélo personnel pendant la location" },
            { key: "val_routes",       label: "Accès à des parcours suggérés, itinéraires GPS ou groupes de sortie" },
            { key: "val_breakdown",    label: "Prise en charge lors d'une crevaison ou bris en cours de sortie" },
          ],
        },
        {
          key: "top_service", type: "radio", required: true,
          label: "Parmi tous les services ci-dessus, lequel serait le plus déterminant dans votre choix d'utiliser ce service ?",
          options: [
            { value: "delivery",          label: "Livraison et récupération à domicile" },
            { value: "bikefit",           label: "Bike fit inclus" },
            { value: "maintenance",       label: "Entretien et réparations à domicile" },
            { value: "insurance",         label: "Assurance vol/bris incluse" },
            { value: "exchange",          label: "Échange de modèle durant la location" },
            { value: "coaching",          label: "Conseils ou coaching" },
            { value: "equipment",         label: "Équipement complémentaire inclus" },
            { value: "purchase_option",   label: "Option d'achat après location" },
            { value: "storage",           label: "Entreposage du vélo personnel" },
            { value: "routes",            label: "Parcours, itinéraires, groupes de sortie" },
            { value: "breakdown_help",    label: "Prise en charge en cas de bris en route" },
            { value: "other",             label: "Autre" },
          ],
        },
        {
          key: "delivery_price", type: "radio", required: true,
          label: "Combien seriez-vous prêt à payer en supplément pour la livraison et la récupération à domicile (aller-retour) dans un rayon de 30 km ?",
          options: [
            { value: "included",   label: "Cela devrait être inclus gratuitement" },
            { value: "under_25",   label: "Moins de 25 $" },
            { value: "25_50",      label: "25 $ à 50 $" },
            { value: "50_100",     label: "50 $ à 100 $" },
            { value: "over_100",   label: "Plus de 100 $" },
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
          label: "Quel serait votre principal frein à utiliser un tel service ?",
          options: [
            { value: "price",                label: "Le prix" },
            { value: "damage_loss",          label: "La crainte d'endommager ou de perdre le vélo" },
            { value: "prefer_own",           label: "Je préfère posséder mon propre vélo" },
            { value: "maintenance_quality",  label: "Je ne connais pas la qualité de l'entretien offert" },
            { value: "logistics",            label: "Les contraintes logistiques (prise en charge, retour)" },
            { value: "no_concern",           label: "Aucun frein particulier, je serais prêt à essayer" },
            { value: "other",                label: "Autre" },
          ],
        },
        {
          key: "comments", type: "textarea", required: false,
          label: "Avez-vous d'autres commentaires, suggestions ou préoccupations à propos de ce service ?",
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
      "This anonymous survey takes about 7 to 9 minutes. Thank you for your time — every answer matters and will help us build a service that fits you.",
    ],
    signature: "— The LACET team",
    timeEstimate: "7 to 9 minutes",
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
          label: "What age group do you belong to?",
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
          label: "Which region of Quebec do you mainly live in?",
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
          label: "How would you describe your cycling practice?",
          options: [
            { value: "occasional",      label: "Occasional (a few rides per season, mostly leisure)" },
            { value: "regular_leisure", label: "Regular leisure (1 to 2 rides per week)" },
            { value: "enthusiast",      label: "Enthusiast (3+ rides per week, long distances)" },
            { value: "sport",           label: "Sport / performance (structured training, events)" },
            { value: "competitive",     label: "Competitive (races, FQSC license or equivalent)" },
          ],
        },
        {
          key: "km_season", type: "radio", required: true,
          label: "Roughly how many kilometres do you ride per season?",
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
          label: "Approximate value of your current main bike?",
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
          label: "On a scale of 1 to 10, how interested are you in the idea of renting a premium bike?",
          min: 1, max: 10,
          minLabel: "Not interested",
          maxLabel: "Very interested",
        },
        {
          key: "rented_before", type: "radio", required: true,
          label: "Have you ever rented a bike (premium or not) in the past?",
          options: [
            { value: "qc",      label: "Yes, in Quebec" },
            { value: "abroad",  label: "Yes, while travelling abroad" },
            { value: "both",    label: "Yes, in Quebec and abroad" },
            { value: "never",   label: "No, never" },
          ],
        },
        {
          key: "past_experience", type: "radio", required: false,
          label: "If you have rented before, how was your overall experience?",
          options: [
            { value: "very_satisfying",     label: "Very satisfying" },
            { value: "satisfying",          label: "Somewhat satisfying" },
            { value: "mixed",               label: "Mixed" },
            { value: "disappointing",       label: "Disappointing" },
            { value: "very_disappointing",  label: "Very disappointing" },
            { value: "never_rented",        label: "Never rented" },
          ],
        },
        {
          key: "contexts", type: "checkbox", required: true,
          hint: "Check all that apply.",
          label: "In which situation(s) would you use a premium bike rental service?",
          options: [
            { value: "travel",           label: "On a trip or vacation (in Quebec or elsewhere)" },
            { value: "try_before_buy",   label: "To try a model before buying it" },
            { value: "replacement",      label: "As a temporary replacement while my own bike is being repaired" },
            { value: "full_season",      label: "For a full season, without buying and maintaining my own bike" },
            { value: "gift",             label: "To offer the experience as a gift to a cycling-passionate friend or family member" },
            { value: "special_outings",  label: "For special or occasional rides (training camp, special weekend, etc.)" },
            { value: "none",             label: "None of these apply right now" },
          ],
        },
      ],
    },
    {
      id: "s3",
      title: "Preferred rental duration",
      questions: [
        {
          key: "duration", type: "radio", required: true,
          label: "Which rental duration would interest you the most?",
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
      intro: "For each duration, indicate the range that feels fair for renting a premium bike (valued $8,000 to $15,000) including basic support and maintenance.",
      questions: [
        {
          key: "price_week", type: "radio", required: true,
          label: "For a full week?",
          options: [
            { value: "under_500",       label: "Less than $500" },
            { value: "500_900",         label: "$500 to $900" },
            { value: "900_1400",        label: "$900 to $1,400" },
            { value: "1400_2000",       label: "$1,400 to $2,000" },
            { value: "over_2000",       label: "More than $2,000" },
            { value: "would_not_rent",  label: "I would not rent by the week" },
          ],
        },
        {
          key: "price_month", type: "radio", required: true,
          label: "For a full month?",
          options: [
            { value: "under_1500",      label: "Less than $1,500" },
            { value: "1500_2500",       label: "$1,500 to $2,500" },
            { value: "2500_4000",       label: "$2,500 to $4,000" },
            { value: "4000_6000",       label: "$4,000 to $6,000" },
            { value: "over_6000",       label: "More than $6,000" },
            { value: "would_not_rent",  label: "I would not rent by the month" },
          ],
        },
        {
          key: "price_season", type: "radio", required: true,
          label: "For a full season (April to October, about 6 months)?",
          options: [
            { value: "under_3000",      label: "Less than $3,000" },
            { value: "3000_5000",       label: "$3,000 to $5,000" },
            { value: "5000_8000",       label: "$5,000 to $8,000" },
            { value: "8000_12000",      label: "$8,000 to $12,000" },
            { value: "over_12000",      label: "More than $12,000" },
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
          label: "For each service, indicate how valuable it would be for you.",
          columns: [
            { value: "essential",      label: "Essential" },
            { value: "interesting",    label: "Interesting" },
            { value: "low_priority",   label: "Low priority" },
            { value: "not_relevant",   label: "Not relevant" },
          ],
          rows: [
            { key: "val_delivery",     label: "Delivery and pickup at your home" },
            { key: "val_bikefit",      label: "Personalized fit (bike fit) included" },
            { key: "val_maintenance",  label: "On-site minor maintenance and repairs during rental" },
            { key: "val_insurance",    label: "Theft and damage insurance included in price" },
            { key: "val_exchange",     label: "Option to swap model during the same rental" },
            { key: "val_coaching",     label: "Advice or coaching by a former racer or specialist" },
            { key: "val_equipment",    label: "Complementary gear included (helmet, pedals, GPS, clothing)" },
            { key: "val_purchase",     label: "Option to buy the rented bike with credit from the rental" },
            { key: "val_storage",      label: "Secure storage of your personal bike during the rental" },
            { key: "val_routes",       label: "Access to suggested routes, GPS tracks or group rides" },
            { key: "val_breakdown",    label: "Pickup assistance during a flat or breakdown on a ride" },
          ],
        },
        {
          key: "top_service", type: "radio", required: true,
          label: "Of all the services above, which would be the most decisive in your choice to use this service?",
          options: [
            { value: "delivery",          label: "Home delivery and pickup" },
            { value: "bikefit",           label: "Bike fit included" },
            { value: "maintenance",       label: "On-site maintenance and repairs" },
            { value: "insurance",         label: "Theft/damage insurance included" },
            { value: "exchange",          label: "Model swap during rental" },
            { value: "coaching",          label: "Advice or coaching" },
            { value: "equipment",         label: "Complementary gear included" },
            { value: "purchase_option",   label: "Option to buy after rental" },
            { value: "storage",           label: "Storage of personal bike" },
            { value: "routes",            label: "Routes, tracks, group rides" },
            { value: "breakdown_help",    label: "Pickup help in case of breakdown" },
            { value: "other",             label: "Other" },
          ],
        },
        {
          key: "delivery_price", type: "radio", required: true,
          label: "How much would you be willing to pay extra for home delivery and pickup (round trip) within 30 km?",
          options: [
            { value: "included",   label: "It should be included for free" },
            { value: "under_25",   label: "Less than $25" },
            { value: "25_50",      label: "$25 to $50" },
            { value: "50_100",     label: "$50 to $100" },
            { value: "over_100",   label: "More than $100" },
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
          label: "What would be your main concern about using such a service?",
          options: [
            { value: "price",                label: "The price" },
            { value: "damage_loss",          label: "Fear of damaging or losing the bike" },
            { value: "prefer_own",           label: "I prefer to own my own bike" },
            { value: "maintenance_quality",  label: "I don't know the quality of maintenance offered" },
            { value: "logistics",            label: "Logistical constraints (pickup, return)" },
            { value: "no_concern",           label: "No particular concern, I'd be willing to try" },
            { value: "other",                label: "Other" },
          ],
        },
        {
          key: "comments", type: "textarea", required: false,
          label: "Any other comments, suggestions or concerns about this service?",
          placeholder: "Share anything you'd like…",
        },
      ],
    },
  ],
};

export const survey: Record<Lang, SurveyContent> = { fr: FR, en: EN };
