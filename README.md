# Portfolio de Rania El Bahri — version éditoriale

Révision du 2 octobre 2026. Site statique bilingue français / anglais.

## Ce qui change

- Accueil personnel, palette crème et bordeaux, portrait existant présenté dans un cadre photographique.
- Menu raccourci : À propos, Mon parcours, Ma formation, Échangeons.
- Expériences et missions réunies en trois récits, avec repères visuels et détails dépliables. Les ancres historiques restent disponibles.
- Compétences et logiciels intégrés à la pratique : usages Excel attestés par les CV ; autres logiciels mentionnés sans inventer de mission ou de niveau.
- Contact simplifié : email, copie de l’adresse, téléphone, LinkedIn et CV.

## Fichiers et fonctionnement

`index.html` et `en.html` contiennent les deux versions. `styles.css` porte la nouvelle présentation. `main.js` conserve les comportements existants : menu, clavier, liens de langue, suivi de section et copie email. Les deux PDF, le portrait, le favicon et les images sociales sont conservés sans modification.

Aucune dépendance, aucune installation et aucune compilation nécessaires pour le site. Aucun TypeScript, serveur applicatif ou base de données. Les outils de validation sont utilisés séparément, hors du site.

## Sources et fidélité

Base : archive fournie et ses deux CV. Les dates, les entreprises, les missions, les coordonnées, les logiciels et les langues ont été rapprochés des CV. Le Master 2, les zones et le rythme d’alternance sont repris de la version fournie. La certification AMF reste en préparation. Les résultats chiffrés des CV ne sont pas présentés comme des résultats vérifiés indépendamment. Aucun exemple de document client, témoignage, projet, loisir ou réalisation n’a été inventé.

La recherche de références a porté sur :

- https://brittanychiang.com/ — expérience lisible et rôle explicite.
- https://www.adhamdannaway.com/ — identité personnelle et présentation directe.
- https://vanschneider.com/ — récits accompagnant les réalisations.

Ces sites servent de références de structure et de ton. Aucun texte, code, portrait ou réalisation n’en a été copié.

## Utiliser l’archive

Extraire puis ouvrir `index.html`. Pour bénéficier de la copie d’adresse, utiliser HTTPS ou un serveur local ; un message de repli s’affiche si le navigateur refuse le presse-papiers.

Cette archive conserve les métadonnées et le chemin `/portfolio/` de l’hébergement GitHub Pages existant. Les fichiers sont à placer à la racine du dossier publié, sans dossier `assets/`. Aucun remplacement du site GitHub existant n’a été effectué dans cette intervention.

La copie préparée pour Sites dispose de ses propres URL et chemins de page 404. Elle est hébergée séparément avec un accès privé.

## Vérification et limites

Contrôles locaux : syntaxe JavaScript, formatage, validation HTML, références internes, intégrité des PDF et images, rendu FR/EN à 320, 390, 768, 1024 et 1440 px. Interactions testées : ouverture/fermeture du menu, Échap, focus après navigation, détails des missions, conservation de la section au changement de langue, téléchargement des deux CV, copie email réussie et refusée. Texte agrandi à 200 % et fonctionnement essentiel sans JavaScript contrôlés.

Les résultats détaillés sont dans `verification.json`, livré séparément de cette archive. Tests avec Chrome automatisé ; pas de validation sur téléphone physique, lecteur d’écran, Firefox ou Safari. Le contrôle axe automatisé ne constitue pas une certification WCAG. L’ouverture d’un logiciel de messagerie/téléphone dépend de l’appareil ; aucun message ni appel n’a été envoyé. L’accès réel au profil LinkedIn n’est pas vérifié.

Les images sociales sont celles de l’archive d’origine et conservent leur ancienne direction graphique. Le texte reste à relire par Rania pour confirmer qu’il correspond à sa manière de se présenter.
