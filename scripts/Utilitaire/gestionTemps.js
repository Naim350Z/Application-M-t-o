const joursSemaine = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];
let ajd = new Date();
let options = { weekday: "long" };
let jourActuel = ajd.toLocaleString("fr-FR", options);
// console.log(jourActuel, ajd);

jourActuel = jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1);
let tabJoursEnOrdre = joursSemaine
  .slice(joursSemaine.indexOf(jourActuel))
  //commence à jour actuel
  .concat(joursSemaine.slice(0, joursSemaine.indexOf(jourActuel)));
// concatene le jour actuel à la fin du tableau
console.log(tabJoursEnOrdre);

export default tabJoursEnOrdre;
