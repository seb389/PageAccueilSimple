// Source-of-truth pour la date d'ouverture du sondage Lacet.
// Avant cette date → la page /sondage et /en/sondage affichent un teaser de capture courriel.
// À partir de cette date → le sondage complet est servi.
// La condition est évaluée côté serveur à chaque requête (prerender: false sur /sondage).

export const SURVEY_LAUNCH_DATE = new Date('2026-05-15T06:00:00-04:00'); // 6h00 heure de l'Est

export function isSurveyLaunched(now: Date = new Date()): boolean {
  return now.getTime() >= SURVEY_LAUNCH_DATE.getTime();
}

export function daysUntilLaunch(now: Date = new Date()): number {
  const ms = SURVEY_LAUNCH_DATE.getTime() - now.getTime();
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}
