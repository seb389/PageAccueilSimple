// Hardcoded test data for the admin page.
// Used when ?mode=test is passed to /admin/survey.
// Patterns are skewed to feel realistic for premium road bike rental in Quebec.

export interface SurveyResponse {
  id: number;
  created_at: string;
  lang: 'fr' | 'en';
  ip_country: string | null;
  age: string;
  region: string;
  practice: string;
  km_season: string;
  bike_value: string;
  bike_size: string | null;
  gender: string | null;
  maintenance: string | null;
  maintenance_satisfaction: number | null;
  interest: number;
  rented_before: string;
  contexts: string;       // JSON-encoded array
  bike_type: string;      // JSON-encoded array
  // (note: main_concern below is also a JSON-encoded array — kept as string here to mirror DB shape)
  duration: string;
  rentals_per_season: string;
  price_week: string;
  price_month: string;
  price_season: string;
  val_delivery: string;
  val_bikefit: string;
  val_maintenance: string;
  val_insurance: string;
  val_exchange: string;
  val_coaching: string;
  val_equipment: string;
  val_purchase: string;
  val_routes: string;
  top_service: string;
  nps: number | null;
  main_concern: string;
  comments: string | null;
}

type RawResponse = Omit<SurveyResponse, 'id' | 'created_at' | 'contexts' | 'bike_type' | 'main_concern' | 'nps' | 'rentals_per_season' | 'gender' | 'bike_size' | 'maintenance' | 'maintenance_satisfaction'> & {
  contexts: string[];
  bike_type: string[];
  main_concern: string[];
  gender?: string;
  bike_size?: string;
  maintenance?: string;
  maintenance_satisfaction?: number;
};

const RAW: RawResponse[] = [
  // ── Enthusiast climbers, premium owners, very interested ──
  {
    lang: 'fr', ip_country: 'CA',
    age: '35_44', region: 'montreal', practice: 'enthusiast', km_season: '3000_5000', bike_value: '5000_8000',
    interest: 9, rented_before: 'both',
    contexts: ['travel', 'try_before_buy'],
    bike_type: ['climber', 'aero'],
    duration: 'one_week',
    price_week: '500_700', price_month: '1500_2000', price_season: '3500_5000',
    val_delivery: 'essential', val_bikefit: 'essential', val_maintenance: 'essential',
    val_insurance: 'interesting', val_exchange: 'interesting', val_coaching: 'low_priority',
    val_equipment: 'interesting', val_purchase: 'interesting', val_routes: 'low_priority',
    top_service: 'delivery', main_concern: ['damage_loss'],
    comments: 'Très intéressant pour les voyages cyclo en montagne.',
  },
  {
    lang: 'fr', ip_country: 'CA',
    age: '45_54', region: 'capitale_nationale', practice: 'sport', km_season: '5000_plus' as any, bike_value: '8000_12000',
    interest: 8, rented_before: 'abroad',
    contexts: ['travel', 'special_outings'],
    bike_type: ['climber'],
    duration: 'two_three_weeks',
    price_week: '500_700', price_month: '2000_3000', price_season: '5000_7500',
    val_delivery: 'interesting', val_bikefit: 'essential', val_maintenance: 'essential',
    val_insurance: 'essential', val_exchange: 'low_priority', val_coaching: 'not_relevant',
    val_equipment: 'interesting', val_purchase: 'low_priority', val_routes: 'low_priority',
    top_service: 'bikefit', main_concern: ['damage_loss'],
    comments: null,
  },
  {
    lang: 'fr', ip_country: 'CA',
    age: '55_64', region: 'laurentides', practice: 'enthusiast', km_season: '3000_5000', bike_value: '8000_12000',
    interest: 10, rented_before: 'qc',
    contexts: ['try_before_buy', 'special_outings'],
    bike_type: ['climber', 'endurance'],
    duration: 'one_week',
    price_week: '700_1000', price_month: '2000_3000', price_season: '5000_7500',
    val_delivery: 'essential', val_bikefit: 'essential', val_maintenance: 'interesting',
    val_insurance: 'essential', val_exchange: 'interesting', val_coaching: 'low_priority',
    val_equipment: 'low_priority', val_purchase: 'essential', val_routes: 'interesting',
    top_service: 'purchase_option', main_concern: [],
    comments: 'Idéal avant un achat de vélo de plus de 12 000 $.',
  },

  // ── Sport-rouleur, urban Quebecker ──
  {
    lang: 'fr', ip_country: 'CA',
    age: '35_44', region: 'montreal', practice: 'sport', km_season: '3000_5000', bike_value: '3000_5000',
    interest: 7, rented_before: 'never',
    contexts: ['try_before_buy', 'replacement'],
    bike_type: ['aero'],
    duration: 'one_week',
    price_week: '300_500', price_month: '1000_1500', price_season: '2500_3500',
    val_delivery: 'essential', val_bikefit: 'interesting', val_maintenance: 'essential',
    val_insurance: 'essential', val_exchange: 'interesting', val_coaching: 'low_priority',
    val_equipment: 'essential', val_purchase: 'interesting', val_routes: 'interesting',
    top_service: 'maintenance', main_concern: ['price'],
    comments: null,
  },
  {
    lang: 'fr', ip_country: 'CA',
    age: '25_34', region: 'montreal', practice: 'enthusiast', km_season: '1500_3000', bike_value: '3000_5000',
    interest: 8, rented_before: 'qc',
    contexts: ['try_before_buy'],
    bike_type: ['aero', 'climber'],
    duration: 'under_week',
    price_week: '300_500', price_month: '1000_1500', price_season: '2500_3500',
    val_delivery: 'essential', val_bikefit: 'essential', val_maintenance: 'interesting',
    val_insurance: 'interesting', val_exchange: 'essential', val_coaching: 'interesting',
    val_equipment: 'essential', val_purchase: 'essential', val_routes: 'interesting',
    top_service: 'exchange', main_concern: ['damage_loss'],
    comments: null,
  },
  {
    lang: 'fr', ip_country: 'CA',
    age: '35_44', region: 'monteregie', practice: 'sport', km_season: '3000_5000', bike_value: '5000_8000',
    interest: 6, rented_before: 'qc',
    contexts: ['replacement', 'special_outings'],
    bike_type: ['aero'],
    duration: 'one_week',
    price_week: '500_700', price_month: '1500_2000', price_season: '3500_5000',
    val_delivery: 'interesting', val_bikefit: 'low_priority', val_maintenance: 'essential',
    val_insurance: 'interesting', val_exchange: 'low_priority', val_coaching: 'not_relevant',
    val_equipment: 'interesting', val_purchase: 'low_priority', val_routes: 'low_priority',
    top_service: 'maintenance', main_concern: ['maintenance_quality'],
    comments: null,
  },

  // ── Competitive ──
  {
    lang: 'fr', ip_country: 'CA',
    age: '25_34', region: 'capitale_nationale', practice: 'competitive', km_season: '5000_plus' as any, bike_value: 'over_12000',
    interest: 7, rented_before: 'abroad',
    contexts: ['travel', 'special_outings'],
    bike_type: ['aero', 'climber', 'tt'],
    duration: 'two_three_weeks',
    price_week: '700_1000', price_month: '2000_3000', price_season: '5000_7500',
    val_delivery: 'essential', val_bikefit: 'essential', val_maintenance: 'essential',
    val_insurance: 'essential', val_exchange: 'interesting', val_coaching: 'interesting',
    val_equipment: 'low_priority', val_purchase: 'low_priority', val_routes: 'not_relevant',
    top_service: 'bikefit', main_concern: ['damage_loss'],
    comments: 'Voyage en Europe, intéressant si je peux avoir un Aethos.',
  },
  {
    lang: 'fr', ip_country: 'CA',
    age: '35_44', region: 'estrie', practice: 'competitive', km_season: '5000_plus' as any, bike_value: 'over_12000',
    interest: 5, rented_before: 'qc',
    contexts: ['try_before_buy'],
    bike_type: ['climber'],
    duration: 'under_week',
    price_week: '500_700', price_month: '1500_2000', price_season: 'would_not_rent',
    val_delivery: 'low_priority', val_bikefit: 'essential', val_maintenance: 'essential',
    val_insurance: 'essential', val_exchange: 'interesting', val_coaching: 'not_relevant',
    val_equipment: 'not_relevant', val_purchase: 'essential', val_routes: 'not_relevant',
    top_service: 'purchase_option', main_concern: ['prefer_own'],
    comments: null,
  },

  // ── Regular leisure ──
  {
    lang: 'fr', ip_country: 'CA',
    age: '45_54', region: 'lanaudiere', practice: 'regular_leisure', km_season: '1500_3000', bike_value: '1500_3000',
    interest: 5, rented_before: 'never',
    contexts: ['travel', 'try_before_buy'],
    bike_type: ['endurance', 'aero'],
    duration: 'one_week',
    price_week: '300_500', price_month: '1000_1500', price_season: '2500_3500',
    val_delivery: 'essential', val_bikefit: 'low_priority', val_maintenance: 'interesting',
    val_insurance: 'essential', val_exchange: 'low_priority', val_coaching: 'low_priority',
    val_equipment: 'interesting', val_purchase: 'interesting', val_routes: 'interesting',
    top_service: 'delivery', main_concern: ['price'],
    comments: 'Le prix est mon principal frein.',
  },
  {
    lang: 'fr', ip_country: 'CA',
    age: '35_44', region: 'laval', practice: 'regular_leisure', km_season: '500_1500', bike_value: '1500_3000',
    interest: 6, rented_before: 'never',
    contexts: ['try_before_buy', 'gift'],
    bike_type: ['endurance'],
    duration: 'under_week',
    price_week: '300_500', price_month: 'would_not_rent', price_season: 'would_not_rent',
    val_delivery: 'essential', val_bikefit: 'essential', val_maintenance: 'interesting',
    val_insurance: 'essential', val_exchange: 'low_priority', val_coaching: 'interesting',
    val_equipment: 'essential', val_purchase: 'low_priority', val_routes: 'essential',
    top_service: 'delivery', main_concern: ['logistics'],
    comments: null,
  },
  {
    lang: 'fr', ip_country: 'CA',
    age: '55_64', region: 'monteregie', practice: 'regular_leisure', km_season: '1500_3000', bike_value: '3000_5000',
    interest: 7, rented_before: 'abroad',
    contexts: ['travel'],
    bike_type: ['endurance'],
    duration: 'one_week',
    price_week: '500_700', price_month: '1000_1500', price_season: '2500_3500',
    val_delivery: 'essential', val_bikefit: 'interesting', val_maintenance: 'essential',
    val_insurance: 'essential', val_exchange: 'low_priority', val_coaching: 'low_priority',
    val_equipment: 'essential', val_purchase: 'low_priority', val_routes: 'essential',
    top_service: 'delivery', main_concern: ['damage_loss'],
    comments: 'Avoir le vélo livré simplifie tellement les choses.',
  },
  {
    lang: 'fr', ip_country: 'CA',
    age: '45_54', region: 'capitale_nationale', practice: 'regular_leisure', km_season: '500_1500', bike_value: 'none',
    interest: 4, rented_before: 'never',
    contexts: ['try_before_buy'],
    bike_type: ['endurance'],
    duration: 'under_week',
    price_week: 'under_300', price_month: 'would_not_rent', price_season: 'would_not_rent',
    val_delivery: 'interesting', val_bikefit: 'essential', val_maintenance: 'low_priority',
    val_insurance: 'essential', val_exchange: 'not_relevant', val_coaching: 'interesting',
    val_equipment: 'essential', val_purchase: 'essential', val_routes: 'interesting',
    top_service: 'purchase_option', main_concern: ['price'],
    comments: null,
  },

  // ── Occasional ──
  {
    lang: 'fr', ip_country: 'CA',
    age: '25_34', region: 'outaouais', practice: 'occasional', km_season: 'under_500', bike_value: 'none',
    interest: 6, rented_before: 'never',
    contexts: ['travel', 'gift'],
    bike_type: ['endurance'],
    duration: 'under_week',
    price_week: 'under_300', price_month: 'would_not_rent', price_season: 'would_not_rent',
    val_delivery: 'essential', val_bikefit: 'essential', val_maintenance: 'interesting',
    val_insurance: 'essential', val_exchange: 'not_relevant', val_coaching: 'essential',
    val_equipment: 'essential', val_purchase: 'low_priority', val_routes: 'essential',
    top_service: 'equipment', main_concern: ['logistics'],
    comments: null,
  },
  {
    lang: 'fr', ip_country: 'CA',
    age: '65_plus', region: 'monteregie', practice: 'occasional', km_season: 'under_500', bike_value: '1500_3000',
    interest: 3, rented_before: 'never',
    contexts: ['travel'],
    bike_type: ['endurance'],
    duration: 'under_week',
    price_week: 'under_300', price_month: 'would_not_rent', price_season: 'would_not_rent',
    val_delivery: 'essential', val_bikefit: 'low_priority', val_maintenance: 'essential',
    val_insurance: 'essential', val_exchange: 'not_relevant', val_coaching: 'low_priority',
    val_equipment: 'interesting', val_purchase: 'not_relevant', val_routes: 'interesting',
    top_service: 'delivery', main_concern: ['logistics'],
    comments: null,
  },
  {
    lang: 'fr', ip_country: 'CA',
    age: '35_44', region: 'other_qc', practice: 'occasional', km_season: '500_1500', bike_value: 'under_1500',
    interest: 2, rented_before: 'never',
    contexts: [],
    bike_type: ['endurance'],
    duration: 'under_week',
    price_week: 'would_not_rent', price_month: 'would_not_rent', price_season: 'would_not_rent',
    val_delivery: 'low_priority', val_bikefit: 'not_relevant', val_maintenance: 'low_priority',
    val_insurance: 'low_priority', val_exchange: 'not_relevant', val_coaching: 'not_relevant',
    val_equipment: 'low_priority', val_purchase: 'not_relevant', val_routes: 'not_relevant',
    top_service: 'other', main_concern: ['prefer_own'],
    comments: 'Je préfère mon propre vélo.',
  },

  // ── Triathletes / TT ──
  {
    lang: 'fr', ip_country: 'CA',
    age: '35_44', region: 'capitale_nationale', practice: 'sport', km_season: '3000_5000', bike_value: '5000_8000',
    interest: 8, rented_before: 'abroad',
    contexts: ['travel', 'special_outings'],
    bike_type: ['tt', 'aero'],
    duration: 'two_three_weeks',
    price_week: '700_1000', price_month: '2000_3000', price_season: '3500_5000',
    val_delivery: 'essential', val_bikefit: 'essential', val_maintenance: 'essential',
    val_insurance: 'essential', val_exchange: 'low_priority', val_coaching: 'interesting',
    val_equipment: 'essential', val_purchase: 'low_priority', val_routes: 'low_priority',
    top_service: 'bikefit', main_concern: ['damage_loss'],
    comments: 'Pour les courses Ironman 70.3, idéal.',
  },
  {
    lang: 'fr', ip_country: 'CA',
    age: '45_54', region: 'montreal', practice: 'sport', km_season: '3000_5000', bike_value: '8000_12000',
    interest: 7, rented_before: 'qc',
    contexts: ['travel'],
    bike_type: ['tt'],
    duration: 'one_week',
    price_week: '500_700', price_month: '1500_2000', price_season: 'would_not_rent',
    val_delivery: 'essential', val_bikefit: 'essential', val_maintenance: 'interesting',
    val_insurance: 'essential', val_exchange: 'low_priority', val_coaching: 'low_priority',
    val_equipment: 'low_priority', val_purchase: 'low_priority', val_routes: 'not_relevant',
    top_service: 'delivery', main_concern: ['maintenance_quality'],
    comments: null,
  },

  // ── Endurance / gravel-leaning ──
  {
    lang: 'fr', ip_country: 'CA',
    age: '35_44', region: 'estrie', practice: 'enthusiast', km_season: '1500_3000', bike_value: '5000_8000',
    interest: 8, rented_before: 'qc',
    contexts: ['travel', 'special_outings'],
    bike_type: ['endurance', 'climber'],
    duration: 'one_week',
    price_week: '500_700', price_month: '1500_2000', price_season: '3500_5000',
    val_delivery: 'essential', val_bikefit: 'interesting', val_maintenance: 'essential',
    val_insurance: 'essential', val_exchange: 'interesting', val_coaching: 'low_priority',
    val_equipment: 'interesting', val_purchase: 'interesting', val_routes: 'essential',
    top_service: 'routes', main_concern: ['damage_loss'],
    comments: 'Les itinéraires suggérés feraient une vraie différence.',
  },
  {
    lang: 'fr', ip_country: 'CA',
    age: '25_34', region: 'laurentides', practice: 'enthusiast', km_season: '1500_3000', bike_value: '3000_5000',
    interest: 9, rented_before: 'never',
    contexts: ['try_before_buy', 'special_outings'],
    bike_type: ['endurance', 'climber'],
    duration: 'one_month',
    price_week: '500_700', price_month: '1500_2000', price_season: '3500_5000',
    val_delivery: 'essential', val_bikefit: 'essential', val_maintenance: 'essential',
    val_insurance: 'essential', val_exchange: 'essential', val_coaching: 'interesting',
    val_equipment: 'essential', val_purchase: 'essential', val_routes: 'essential',
    top_service: 'purchase_option', main_concern: [],
    comments: null,
  },

  // ── Out-of-Quebec, mostly travelers ──
  {
    lang: 'en', ip_country: 'US',
    age: '45_54', region: 'outside_qc', practice: 'enthusiast', km_season: '3000_5000', bike_value: '8000_12000',
    interest: 9, rented_before: 'abroad',
    contexts: ['travel'],
    bike_type: ['climber', 'endurance'],
    duration: 'one_week',
    price_week: '700_1000', price_month: '2000_3000', price_season: 'would_not_rent',
    val_delivery: 'essential', val_bikefit: 'essential', val_maintenance: 'interesting',
    val_insurance: 'essential', val_exchange: 'interesting', val_coaching: 'low_priority',
    val_equipment: 'interesting', val_purchase: 'low_priority', val_routes: 'essential',
    top_service: 'delivery', main_concern: ['logistics'],
    comments: 'Travelling to Quebec for cycling — delivery is essential.',
  },
  {
    lang: 'en', ip_country: 'US',
    age: '35_44', region: 'outside_qc', practice: 'sport', km_season: '3000_5000', bike_value: 'over_12000',
    interest: 8, rented_before: 'both',
    contexts: ['travel', 'special_outings'],
    bike_type: ['aero', 'climber'],
    duration: 'one_week',
    price_week: '700_1000', price_month: '2000_3000', price_season: 'would_not_rent',
    val_delivery: 'essential', val_bikefit: 'essential', val_maintenance: 'essential',
    val_insurance: 'essential', val_exchange: 'low_priority', val_coaching: 'not_relevant',
    val_equipment: 'low_priority', val_purchase: 'low_priority', val_routes: 'interesting',
    top_service: 'bikefit', main_concern: ['damage_loss'],
    comments: null,
  },
  {
    lang: 'en', ip_country: 'FR',
    age: '55_64', region: 'outside_qc', practice: 'enthusiast', km_season: '3000_5000', bike_value: '5000_8000',
    interest: 7, rented_before: 'abroad',
    contexts: ['travel'],
    bike_type: ['climber'],
    duration: 'two_three_weeks',
    price_week: '500_700', price_month: '1500_2000', price_season: 'would_not_rent',
    val_delivery: 'essential', val_bikefit: 'interesting', val_maintenance: 'essential',
    val_insurance: 'essential', val_exchange: 'not_relevant', val_coaching: 'not_relevant',
    val_equipment: 'low_priority', val_purchase: 'not_relevant', val_routes: 'essential',
    top_service: 'routes', main_concern: ['logistics'],
    comments: null,
  },

  // ── Gift / cadeau ──
  {
    lang: 'fr', ip_country: 'CA',
    age: '45_54', region: 'montreal', practice: 'occasional', km_season: 'under_500', bike_value: 'under_1500',
    interest: 5, rented_before: 'never',
    contexts: ['gift'],
    bike_type: ['endurance'],
    duration: 'under_week',
    price_week: '300_500', price_month: 'would_not_rent', price_season: 'would_not_rent',
    val_delivery: 'essential', val_bikefit: 'low_priority', val_maintenance: 'low_priority',
    val_insurance: 'essential', val_exchange: 'not_relevant', val_coaching: 'not_relevant',
    val_equipment: 'essential', val_purchase: 'not_relevant', val_routes: 'low_priority',
    top_service: 'equipment', main_concern: ['logistics'],
    comments: 'Pour offrir à mon conjoint passionné.',
  },

  // ── Long-term lease aspirant ──
  {
    lang: 'fr', ip_country: 'CA',
    age: '35_44', region: 'montreal', practice: 'enthusiast', km_season: '3000_5000', bike_value: 'none',
    interest: 9, rented_before: 'never',
    contexts: ['full_season'],
    bike_type: ['aero', 'climber'],
    duration: 'full_season',
    price_week: '500_700', price_month: '1500_2000', price_season: '3500_5000',
    val_delivery: 'essential', val_bikefit: 'essential', val_maintenance: 'essential',
    val_insurance: 'essential', val_exchange: 'essential', val_coaching: 'interesting',
    val_equipment: 'interesting', val_purchase: 'essential', val_routes: 'low_priority',
    top_service: 'maintenance', main_concern: [],
    comments: 'Idéal pour ne pas avoir à acheter.',
  },
  {
    lang: 'fr', ip_country: 'CA',
    age: '25_34', region: 'montreal', practice: 'regular_leisure', km_season: '500_1500', bike_value: 'none',
    interest: 8, rented_before: 'never',
    contexts: ['full_season', 'try_before_buy'],
    bike_type: ['endurance', 'aero'],
    duration: 'half_season',
    price_week: '300_500', price_month: '1000_1500', price_season: '2500_3500',
    val_delivery: 'essential', val_bikefit: 'essential', val_maintenance: 'essential',
    val_insurance: 'essential', val_exchange: 'interesting', val_coaching: 'essential',
    val_equipment: 'essential', val_purchase: 'essential', val_routes: 'essential',
    top_service: 'maintenance', main_concern: ['price'],
    comments: null,
  },
];

// Generate created_at timestamps spread over recent days
const BASE = new Date('2026-04-15T10:00:00Z').getTime();
const HOUR = 60 * 60 * 1000;

// Bike value 'over_5000' was a real slug, but we sometimes use over_5000 too.
// Normalize 5000_plus -> over_5000 for km_season (it's actually 'over_5000').
// Also remap legacy 1-10 interest values to the current 1-5 scale (ceil(v/2)).
function normalize(r: RawResponse): RawResponse {
  const km = r.km_season as string;
  const interest = r.interest > 5 ? Math.ceil(r.interest / 2) : r.interest;
  return { ...r, km_season: km === '5000_plus' ? 'over_5000' : km, interest };
}

// Distribution plausible des modes d'entretien selon la valeur du vélo.
// Index déterministe (i % 4) pour reproductibilité; pondération biaisée selon la gamme.
const MAINTENANCE_BY_BIKE_VALUE: { [k: string]: string[] } = {
  under_1500:  ['mostly_self', 'shop',        'all_self',     'shop'],
  '1500_3000': ['mostly_self', 'shop',        'mostly_self',  'all_self'],
  '3000_5000': ['mostly_self', 'indep',       'shop',         'mostly_self'],
  '5000_8000': ['indep',       'mostly_self', 'all_self',     'mostly_self'],
  '8000_12000':['indep',       'all_self',    'mostly_self',  'indep'],
  over_12000:  ['all_self',    'indep',       'mostly_self',  'indep'],
};

// Satisfaction (1-5) plausible selon le mode d'entretien.
// DIY et atelier indépendant tendent à être plus satisfaits qu'une chaîne grand public.
const SATISFACTION_BY_MAINTENANCE: { [k: string]: number[] } = {
  all_self:    [5, 4, 5, 4],
  mostly_self: [4, 4, 5, 3],
  shop:        [3, 3, 4, 2],
  indep:       [5, 4, 4, 5],
};

// Mapping plausible entre durée choisie et nombre de locations envisagées par saison
const RENTALS_BY_DURATION: { [k: string]: string } = {
  under_week: 'over_six',
  one_week: 'four_six',
  two_three_weeks: 'two_three',
  one_month: 'two_three',
  half_season: 'one',
  full_season: 'continuous',
};

export const TEST_RESPONSES: SurveyResponse[] = RAW.map(normalize).map((r, i) => {
  const ts = new Date(BASE + i * 7 * HOUR);
  // NPS dérivé de l'intérêt avec petite variation déterministe pour diversité
  const npsBase = Math.max(0, r.interest - 1);
  const npsOffset = (i % 3) - 1; // -1, 0 ou 1
  const nps = Math.min(5, Math.max(0, npsBase + npsOffset));
  const rentals_per_season = RENTALS_BY_DURATION[r.duration] ?? 'one';
  const maintenance: string | null = r.maintenance
    ?? (r.bike_value === 'none' ? null : (MAINTENANCE_BY_BIKE_VALUE[r.bike_value]?.[i % 4] ?? 'mostly_self'));
  const maintenance_satisfaction: number | null = r.maintenance_satisfaction
    ?? (maintenance == null ? null : (SATISFACTION_BY_MAINTENANCE[maintenance]?.[i % 4] ?? 3));
  // Genre déterministe (~68 % homme, 24 % femme, 4 % nb_other, 4 % null)
  const genderRoll = i % 25;
  const gender: string | null = r.gender
    ?? (genderRoll < 17 ? 'man'
        : genderRoll < 23 ? 'woman'
        : genderRoll < 24 ? 'nb_other'
        : null);
  // Taille de cadre — distribution réaliste (M/L dominent, extrêmes plus rares),
  // null occasionnel pour simuler les non-réponses (question facultative).
  const bikeSizes = ['xxs', 'xs', 's', 'm', 'm', 'l', 'l', 'm', 's', 'xl', 'm', 'l', null] as const;
  const bike_size: string | null = r.bike_size ?? bikeSizes[i % bikeSizes.length] ?? null;
  return {
    id: i + 1,
    created_at: ts.toISOString().replace('T', ' ').slice(0, 19),
    lang: r.lang,
    ip_country: r.ip_country,
    age: r.age, region: r.region, practice: r.practice, km_season: r.km_season, bike_value: r.bike_value,
    gender,
    bike_size,
    maintenance,
    maintenance_satisfaction,
    interest: r.interest, rented_before: r.rented_before,
    contexts: JSON.stringify(r.contexts),
    bike_type: JSON.stringify(r.bike_type),
    duration: r.duration,
    rentals_per_season,
    price_week: r.price_week, price_month: r.price_month, price_season: r.price_season,
    val_delivery: r.val_delivery, val_bikefit: r.val_bikefit, val_maintenance: r.val_maintenance,
    val_insurance: r.val_insurance, val_exchange: r.val_exchange, val_coaching: r.val_coaching,
    val_equipment: r.val_equipment, val_purchase: r.val_purchase, val_routes: r.val_routes,
    top_service: r.top_service,
    nps,
    main_concern: JSON.stringify(r.main_concern),
    comments: r.comments,
  };
});
