(function () {
  // Theme: apply a stored choice immediately (this script loads in <head>,
  // so this runs before first paint and avoids a flash of the wrong theme).
  // With no stored choice, CSS follows the system preference.
  var stored = null;
  try { stored = localStorage.getItem("theme"); } catch (e) {}
  if (stored === "dark" || stored === "light") {
    document.documentElement.setAttribute("data-theme", stored);
  }

  var translations = {
    "Home": "Accueil",
    "Research": "Recherche",
    "Publications": "Publications",
    "CV": "CV",
    "Personal": "Personnel",
    "CERTES": "CERTES",
    "Advisors & Collaborators": "Directeurs et collaborateurs",
    "Research Experience": "Expérience de recherche",
    "Grants & Funding": "Subventions et financements",
    "Research Directions": "Axes de recherche",
    "Current Team": "Équipe actuelle",
    "Experience": "Expérience",
    "Funding": "Financement",
    "Appointments": "Postes",
    "Education": "Formation",
    "Honors & Awards": "Distinctions et récompenses",
    "Technical Skills": "Compétences techniques",
    "Teaching experience": "Expérience d'enseignement",
    "Leadership & Outreach": "Leadership et engagement",
    "Languages": "Langues",
    "About me": "À propos",
    "Research interests": "Intérêts de recherche",
    "Recent news": "Actualités récentes",
    "Research output": "Production scientifique",
    "Journal articles": "Articles de revue",
    "Conference papers": "Articles de conférence",
    "Workshop papers": "Articles d'atelier",
    "Posters": "Posters",
    "What I work on": "Mes travaux",
    "Beyond the CV": "Au-delà du CV",
    "Movie Theatre": "Cinéma",
    "Books": "Livres",
    "Anime": "Anime",
    "Sports": "Sports",
    "Writing": "Écriture",
    "Download CV (PDF)": "Télécharger le CV (PDF)",
    "Google Scholar": "Google Scholar",
    "ResearchGate": "ResearchGate",
    "Full CV (PDF)": "CV complet (PDF)",
    "Read my Master 2 thesis": "Lire mon mémoire de Master 2",
    "Download CV": "Télécharger le CV",
    "Research overview": "Aperçu de la recherche",
    "Beyond the CV": "Au-delà du CV",
    "Personal": "Personnel",
    "Personal sections": "Sections personnelles",
    "Reading list": "Liste de lecture",
    "Other favorites": "Autres favoris",
    "Favorite movies": "Films préférés",
    "Personal favorites.": "Mes favoris personnels.",
    "Current interest": "Intérêt actuel",
    "Favorites": "Favoris",
    "Sports I enjoy following and participating in.": "Sports que j'aime suivre et pratiquer.",
    "Sport": "Sport",
    "Writing project details coming soon.": "Les détails du projet d'écriture seront bientôt disponibles.",
    "Coming soon": "Bientôt disponible",
    "More personal writing details will appear here later.": "Davantage de détails sur mes écrits personnels seront ajoutés ultérieurement.",
    "I try to catch new releases on the big screen most weeks.": "J'essaie de voir les nouveautés au cinéma presque chaque semaine.",
    "A small collection of screen favorites.": "Une petite sélection de favoris à l'écran.",
    "Books": "Livres",
    "Movie Theatre": "Cinéma",
    "Writing": "Écriture",
    "Curriculum vitae": "Curriculum vitae",
    "Full record on one page: appointments, education, honors, technical skills, teaching, leadership, and languages. Publications live on their own page.": "Le parcours complet sur une seule page : postes, formation, distinctions, compétences techniques, enseignement, engagement et langues. Les publications sont présentées sur leur propre page.",
    "PhD Researcher - AI and IoT for Smart Energy Efficiency Systems": "Chercheur doctorant - IA et IoT pour l'efficacité énergétique intelligente",
    "Visiting Doctoral Researcher (PhD International Mobility)": "Chercheur doctorant invité (mobilité internationale de doctorat)",
    "R&D Research Intern (Master 2 Thesis)": "Stagiaire de recherche R&D (mémoire de Master 2)",
    "Machine Learning Intern": "Stagiaire en apprentissage automatique",
    "Associate IT Security Professional": "Professionnel associé en sécurité informatique",
    "Research output": "Production scientifique",
    "Selected publications by": "Publications sélectionnées de",
    "Citations": "Citations",
    "h-index": "indice h",
    "i10-index": "indice i10",
    "Journal Articles": "Articles de revue",
    "Conference Papers": "Articles de conférence",
    "Workshop Papers": "Articles d'atelier",
    "Posters": "Posters",
    "No workshop papers are listed yet.": "Aucun article d'atelier n'est encore répertorié.",
    "Email": "E-mail",
    "Scholar": "Scholar",
    "Facebook": "Facebook",
    "Energy Optimization": "Optimisation énergétique",
    "Regulatory Compliance": "Conformité réglementaire",
    "Multi-Sensor Fusion": "Fusion multi-capteurs",
    "Time-Series Forecasting": "Prévision de séries temporelles",
    "Smart Sensors": "Capteurs intelligents",
    "Data Analytics": "Analyse des données",
    "Anomaly Detection": "Détection des anomalies",
    "Failure Prediction": "Prédiction des pannes",
    "Machine Learning": "Apprentissage automatique",
    "CERTES Laboratory": "Laboratoire CERTES",
    "Read more →": "En savoir plus →",
    "On this page": "Sur cette page"
  };

  var pageTranslations = [
    { selector: ".profile .role", en: "PhD Researcher | AI &amp; IoT for Smart Energy Efficiency Systems", fr: "Chercheur doctorant | IA et IoT pour l'efficacit&eacute; &eacute;nerg&eacute;tique intelligente" },
    { selector: ".profile .ul-text", en: "<a href=\"https://www.certes-upec.fr/\" target=\"_blank\" rel=\"noopener\">Universite Paris-Est Creteil (UPEC)</a><br> CERTES Laboratory", fr: "<a href=\"https://www.certes-upec.fr/\" target=\"_blank\" rel=\"noopener\">Universit&eacute; Paris-Est Cr&eacute;teil (UPEC)</a><br>Laboratoire CERTES" },
    { selector: ".profile .affil", en: "Creteil, Ile-de-France, France<br><span style=\"color:var(--ink-faint)\">Thesis director and Co-director:</span> Prof. Mahamadou Abdou Tankari, Prof. Gilles Lefebvre<br><span style=\"color:var(--ink-faint)\">PhD Researcher in AI and IoT for Smart Energy Efficiency Systems.</span>", fr: "Cr&eacute;teil, &Icirc;le-de-France, France<br><span style=\"color:var(--ink-faint)\">Directeur et co-directeur de th&egrave;se :</span> Prof. Mahamadou Abdou Tankari, Prof. Gilles Lefebvre<br><span style=\"color:var(--ink-faint)\">Chercheur doctorant en IA et IoT pour l'efficacit&eacute; &eacute;nerg&eacute;tique intelligente.</span>" },
    { selector: "#about .prose .lead", en: "I am Rakibul Hasan, a PhD Researcher at the <a href=\"https://www.certes-upec.fr/\" target=\"_blank\" rel=\"noopener\">CERTES Laboratory</a> at <a href=\"https://www.u-pec.fr/\" target=\"_blank\" rel=\"noopener\">Universite Paris-Est Creteil (UPEC)</a>. My academic work specializes in the development of AI- and IoT-based intelligent systems for energy efficiency and smart building management, under the supervision of <a href=\"https://www.certes-upec.fr/membres/jura-arkhangelski/\" target=\"_blank\" rel=\"noopener\">Dr. Jura Arkhangelski</a>.", fr: "Je suis Rakibul Hasan, chercheur doctorant au <a href=\"https://www.certes-upec.fr/\" target=\"_blank\" rel=\"noopener\">laboratoire CERTES</a> de l'<a href=\"https://www.u-pec.fr/\" target=\"_blank\" rel=\"noopener\">Universit&eacute; Paris-Est Cr&eacute;teil (UPEC)</a>. Mes travaux portent sur le d&eacute;veloppement de syst&egrave;mes intelligents fond&eacute;s sur l'IA et l'IoT pour l'efficacit&eacute; &eacute;nerg&eacute;tique et la gestion intelligente des b&acirc;timents, sous la direction de <a href=\"https://www.certes-upec.fr/membres/jura-arkhangelski/\" target=\"_blank\" rel=\"noopener\">Dr Jura Arkhangelski</a>." },
    { selector: "#about .prose p:nth-child(2)", en: "My research aims to support the energy transition through smart data-driven solutions that help optimize energy consumption, detect anomalies, and ensure regulatory compliance such as the Décret Tertiaire. Currently, I am developing hybrid deep learning models (LSTM + Interpolation) to handle irregular time-series data and analyze building load profiles to implement proactive <strong>Peak Shaving</strong> strategies. During my international mobility in Italy, I worked at the <a href=\"https://www.unibz.it/en/faculties/engineering/academic-staff/person/41903-antonio-liotta\" target=\"_blank\" rel=\"noopener\">Free University of Bozen-Bolzano</a> under <a href=\"https://www.unibz.it/en/faculties/engineering/academic-staff/person/41903-antonio-liotta\" target=\"_blank\" rel=\"noopener\">Prof. Antonio Liotta</a> on Edge-Cloud AI architectures for smart building energy management. I completed the <a href=\"https://www.international-master-biometrics-intelligent-vision.org/\" target=\"_blank\" rel=\"noopener\">International Master of Biometrics and Intelligent Vision</a> under the academic supervision of <a href=\"https://www.amine-nait-ali.org/\" target=\"_blank\" rel=\"noopener\">Prof. Amine Nait-Ali</a>, with a focus on Artificial Intelligence, Computer Vision, and Data Science. I am also collaborating with <a href=\"https://sites.google.com/view/ssirg2mm/home\" target=\"_blank\" rel=\"noopener\">Prof. Majdi Mansori</a> at <a href=\"https://www.squ.edu.om/\" target=\"_blank\" rel=\"noopener\">Sultan Qaboos University</a>, Muscat, Oman, on Artificial Intelligence, Computer Vision, Data Science, and especially anomaly detection and diagnosis.", fr: "Mes recherches visent &agrave; accompagner la transition &eacute;nerg&eacute;tique gr&acirc;ce &agrave; des solutions intelligentes fond&eacute;es sur les donn&eacute;es pour optimiser la consommation d'&eacute;nergie, d&eacute;tecter les anomalies et assurer la conformit&eacute; r&eacute;glementaire, notamment au D&eacute;cret Tertiaire. Je d&eacute;veloppe actuellement des mod&egrave;les hybrides d'apprentissage profond (LSTM + interpolation) capables de traiter des s&eacute;ries temporelles irr&eacute;guli&egrave;res et d'analyser les profils de charge des b&acirc;timents afin de mettre en place des strat&eacute;gies proactives de <strong>Peak Shaving</strong>. Lors de ma mobilit&eacute; internationale en Italie, j'ai travaill&eacute; &agrave; la <a href=\"https://www.unibz.it/en/faculties/engineering/academic-staff/person/41903-antonio-liotta\" target=\"_blank\" rel=\"noopener\">Free University of Bozen-Bolzano</a> avec <a href=\"https://www.unibz.it/en/faculties/engineering/academic-staff/person/41903-antonio-liotta\" target=\"_blank\" rel=\"noopener\">Prof. Antonio Liotta</a> sur des architectures d'IA Edge-Cloud pour la gestion &eacute;nerg&eacute;tique intelligente des b&acirc;timents. J'ai obtenu l'<a href=\"https://www.international-master-biometrics-intelligent-vision.org/\" target=\"_blank\" rel=\"noopener\">International Master of Biometrics and Intelligent Vision</a> sous la supervision acad&eacute;mique de <a href=\"https://www.amine-nait-ali.org/\" target=\"_blank\" rel=\"noopener\">Prof. Amine Nait-Ali</a>, avec une sp&eacute;cialisation en intelligence artificielle, vision par ordinateur et science des donn&eacute;es. Je collabore &eacute;galement avec <a href=\"https://sites.google.com/view/ssirg2mm/home\" target=\"_blank\" rel=\"noopener\">Prof. Majdi Mansori</a> &agrave; la <a href=\"https://www.squ.edu.om/\" target=\"_blank\" rel=\"noopener\">Sultan Qaboos University</a>, &agrave; Mascate, sur l'intelligence artificielle, la vision par ordinateur, la science des donn&eacute;es et plus particuli&egrave;rement la d&eacute;tection et le diagnostic des anomalies." },
    { selector: "#interests .interest:nth-child(1) h3", en: "Smart Building Efficiency", fr: "Efficacit&eacute; &eacute;nerg&eacute;tique des b&acirc;timents" },
    { selector: "#interests .interest:nth-child(1) p", en: "Designing proactive energy management systems using IoT sensors and AI. Analyzing building load profiles supports Peak Shaving strategies and compliance with the Décret Tertiaire.", fr: "Conception de syst&egrave;mes proactifs de gestion de l'&eacute;nergie avec des capteurs IoT et l'IA. L'analyse des profils de charge soutient les strat&eacute;gies de Peak Shaving et la conformit&eacute; au D&eacute;cret Tertiaire." },
    { selector: "#interests .interest:nth-child(2) h3", en: "Hybrid Deep Learning &amp; Time-Series", fr: "Apprentissage profond hybride et s&eacute;ries temporelles" },
    { selector: "#interests .interest:nth-child(2) p", en: "Developing hybrid deep learning models such as LSTM combined with Akima Spline Interpolation to handle irregular time-series data and forecast energy consumption.", fr: "D&eacute;veloppement de mod&egrave;les hybrides d'apprentissage profond, comme les LSTM combin&eacute;s &agrave; l'interpolation par spline d'Akima, pour traiter les s&eacute;ries temporelles irr&eacute;guli&egrave;res et pr&eacute;voir la consommation d'&eacute;nergie." },
    { selector: "#interests .interest:nth-child(3) h3", en: "IoT Sensor Networks &amp; Edge-Cloud AI", fr: "R&eacute;seaux de capteurs IoT et IA Edge-Cloud" },
    { selector: "#interests .interest:nth-child(3) p", en: "Developing Edge-Cloud AI architectures for smart building energy management to improve the latency and bandwidth efficiency of connected IoT platforms.", fr: "D&eacute;veloppement d'architectures d'IA Edge-Cloud pour la gestion &eacute;nerg&eacute;tique intelligente des b&acirc;timents et l'am&eacute;lioration de la latence et de l'efficacit&eacute; de la bande passante des plateformes IoT connect&eacute;es." },
    { selector: "#interests .interest:nth-child(4) h3", en: "Anomaly Detection &amp; System Monitoring", fr: "D&eacute;tection des anomalies et surveillance des syst&egrave;mes" },
    { selector: "#interests .interest:nth-child(4) p", en: "Implementing AI models for failure prediction and reliability assessment in connected building infrastructure using sensor and network data.", fr: "Mise en œuvre de mod&egrave;les d'IA pour pr&eacute;dire les pannes et &eacute;valuer la fiabilit&eacute; des infrastructures de b&acirc;timents connect&eacute;s &agrave; partir de donn&eacute;es de capteurs et de r&eacute;seaux." },
    { selector: "#news .news-item:nth-child(1) .n-text", en: "Published <b>Interpretable Multi-Sensor Fusion for Short-Term Energy Consumption Forecasting</b> in <i>Energies</i>.", fr: "Publication de <b>Interpretable Multi-Sensor Fusion for Short-Term Energy Consumption Forecasting</b> dans <i>Energies</i>." },
    { selector: "#news .news-item:nth-child(2) .n-text", en: "Started a Visiting Doctoral Researcher position at the <a href=\"https://www.unibz.it/\" target=\"_blank\" rel=\"noopener\">Free University of Bozen-Bolzano</a>, Italy.", fr: "D&eacute;but d'un s&eacute;jour de chercheur doctorant invit&eacute; &agrave; la <a href=\"https://www.unibz.it/\" target=\"_blank\" rel=\"noopener\">Free University of Bozen-Bolzano</a>, en Italie." },
    { selector: "#news .news-item:nth-child(3) .n-text", en: "Co-authored <b>Benchmarking Deep Learning Architectures for 24-Hour Energy Forecasting in Smart Buildings Using Real-World IoT Data</b>.", fr: "Co-auteur de <b>Benchmarking Deep Learning Architectures for 24-Hour Energy Forecasting in Smart Buildings Using Real-World IoT Data</b>." },
    { selector: "#news .news-item:nth-child(4) .n-text", en: "Began my <b>PhD Researcher</b> position at CERTES Laboratory, Université Paris-Est Créteil (UPEC).", fr: "D&eacute;but de mon poste de <b>chercheur doctorant</b> au laboratoire CERTES de l'Universit&eacute; Paris-Est Cr&eacute;teil (UPEC)." },
    { selector: "#news .news-item:nth-child(5) .n-text", en: "Graduated with an International Master in Optics, Image, Vision, Multimedia from UPEC.", fr: "Obtention d'un master international en optique, image, vision et multim&eacute;dia &agrave; l'UPEC." },
    { selector: "#news .news-item:nth-child(6) .n-text", en: "Presented my research at the 13th International Conference on Smart Grid in Glasgow, UK.", fr: "Pr&eacute;sentation de mes recherches lors de la 13e Conf&eacute;rence internationale sur les r&eacute;seaux intelligents &agrave; Glasgow, au Royaume-Uni." },
    { selector: "#news .news-item:nth-child(7) .n-text", en: "Developing AI- and IoT-based intelligent systems for smart energy efficiency and building management.", fr: "D&eacute;veloppement de syst&egrave;mes intelligents fond&eacute;s sur l'IA et l'IoT pour l'efficacit&eacute; &eacute;nerg&eacute;tique et la gestion des b&acirc;timents." },
    { selector: "#news .news-item:nth-child(8) .n-text", en: "Hybrid deep learning, time-series forecasting, anomaly detection, and Edge-Cloud AI.", fr: "Apprentissage profond hybride, pr&eacute;vision de s&eacute;ries temporelles, d&eacute;tection des anomalies et IA Edge-Cloud." },
    { selector: "#diss-modal .m-eyebrow", en: "In progress", fr: "En cours" },
    { selector: "#diss-modal h3", en: "Development of an Intelligent Energy Efficiency Tool for Buildings using Artificial Intelligence &amp; IoT", fr: "D&eacute;veloppement d'un outil intelligent d'efficacit&eacute; &eacute;nerg&eacute;tique pour les b&acirc;timents utilisant l'intelligence artificielle et l'IoT" },
    { selector: "#diss-modal p", en: "This is my Master 2 thesis. Please <a href=\"mailto:rakibul.hasan@u-pec.fr\">email me</a> if you would like a copy.", fr: "Il s'agit de mon m&eacute;moire de Master 2. Veuillez m'<a href=\"mailto:rakibul.hasan@u-pec.fr\">envoyer un e-mail</a> si vous souhaitez en recevoir une copie." }
  ];

  pageTranslations.push(
    { selector: "#personal-head > p", en: "Beyond research, I enjoy reading, cinema, photography, travel, sports, technology, open-source work, volunteering, and conferences.", fr: "Au-del&agrave; de la recherche, j'aime la lecture, le cin&eacute;ma, la photographie, les voyages, le sport, la technologie, les projets open source, le b&eacute;n&eacute;volat et les conf&eacute;rences." },
    { selector: "#panel-books .lead-sub", en: "Reading is one of my favorite ways to learn, reflect, and explore different worlds.", fr: "La lecture est l'une de mes fa&ccedil;ons pr&eacute;f&eacute;r&eacute;es d'apprendre, de r&eacute;fl&eacute;chir et d'explorer diff&eacute;rents univers." },
    { selector: "#panel-anime .lead-sub", en: "A small collection of screen favorites.", fr: "Une petite s&eacute;lection de favoris &agrave; l'&eacute;cran." },
    { selector: "#panel-sports .lead-sub", en: "Sports I enjoy following and participating in.", fr: "Sports que j'aime suivre et pratiquer." },
    { selector: "#panel-writing .lead-sub", en: "Writing project details coming soon.", fr: "Les d&eacute;tails du projet d'&eacute;criture seront bient&ocirc;t disponibles." },
    { selector: "#panel-writing .pgroup p", en: "More personal writing details will appear here later.", fr: "Davantage de d&eacute;tails sur mes &eacute;crits personnels seront ajout&eacute;s ult&eacute;rieurement." },
    { selector: "#panel-movies .lead-sub", en: "I try to catch new releases on the big screen most weeks.", fr: "J'essaie de voir les nouveaut&eacute;s au cin&eacute;ma presque chaque semaine." }
  );

  pageTranslations.push(
    { selector: "#cv-head > p", en: "The full record on one page: appointments, education, honors, technical skills, teaching, leadership, and languages. Publications live on <a href=\"publications.html\">their own page</a>.", fr: "Le parcours complet sur une seule page : postes, formation, distinctions, comp&eacute;tences techniques, enseignement, engagement et langues. Les publications sont pr&eacute;sent&eacute;es sur <a href=\"publications.html\">leur propre page</a>." },
    { selector: "#research-head > p", en: "My work focuses on AI- and IoT-based intelligent systems for energy efficiency, smart building management, hybrid deep learning, time-series forecasting, and anomaly detection and diagnosis.", fr: "Mes travaux portent sur des syst&egrave;mes intelligents fond&eacute;s sur l'IA et l'IoT pour l'efficacit&eacute; &eacute;nerg&eacute;tique, la gestion intelligente des b&acirc;timents, l'apprentissage profond hybride, la pr&eacute;vision de s&eacute;ries temporelles et la d&eacute;tection et le diagnostic des anomalies." },
    { selector: "#publications-head > p", en: "Selected publications by <strong>Rakibul Hasan</strong> on AI and IoT for smart building energy efficiency, time-series forecasting, and intelligent energy management.", fr: "Publications s&eacute;lectionn&eacute;es de <strong>Rakibul Hasan</strong> sur l'IA et l'IoT pour l'efficacit&eacute; &eacute;nerg&eacute;tique des b&acirc;timents intelligents, la pr&eacute;vision de s&eacute;ries temporelles et la gestion intelligente de l'&eacute;nergie." },
    { selector: "#team .prose p", en: "My research is conducted at the <a href=\"https://www.certes-upec.fr/\" target=\"_blank\" rel=\"noopener\"><strong>CERTES Laboratory</strong></a> at <a href=\"https://www.u-pec.fr/\" target=\"_blank\" rel=\"noopener\">Universite Paris-Est Creteil (UPEC)</a>, in collaboration with supervisors and research partners working across AI, IoT, computer vision, and smart energy systems.", fr: "Mes recherches sont men&eacute;es au <a href=\"https://www.certes-upec.fr/\" target=\"_blank\" rel=\"noopener\"><strong>laboratoire CERTES</strong></a> de l'<a href=\"https://www.u-pec.fr/\" target=\"_blank\" rel=\"noopener\">Universit&eacute; Paris-Est Cr&eacute;teil (UPEC)</a>, en collaboration avec des encadrants et des partenaires de recherche dans les domaines de l'IA, de l'IoT, de la vision par ordinateur et des syst&egrave;mes &eacute;nerg&eacute;tiques intelligents." },
    { selector: "#energy-efficiency .prose p", en: "Designing proactive energy management systems using IoT sensors and AI to optimize building load profiles. This includes implementing Peak Shaving strategies and supporting data auditing for Décret Tertiaire compliance.", fr: "Conception de syst&egrave;mes proactifs de gestion de l'&eacute;nergie avec des capteurs IoT et l'IA afin d'optimiser les profils de charge des b&acirc;timents. Cela comprend la mise en œuvre de strat&eacute;gies de Peak Shaving et l'audit des donn&eacute;es pour assurer la conformit&eacute; au D&eacute;cret Tertiaire." },
    { selector: "#deep-learning .prose p", en: "Developing hybrid models that combine Akima Spline Interpolation with LSTM networks to handle irregular time-series data from smart sensors. These architectures improve short-term energy forecasting accuracy over traditional methods.", fr: "D&eacute;veloppement de mod&egrave;les hybrides combinant l'interpolation par spline d'Akima et des r&eacute;seaux LSTM pour traiter les s&eacute;ries temporelles irr&eacute;guli&egrave;res issues de capteurs intelligents. Ces architectures am&eacute;liorent la pr&eacute;cision des pr&eacute;visions &eacute;nerg&eacute;tiques &agrave; court terme par rapport aux m&eacute;thodes traditionnelles." },
    { selector: "#iot-networks .prose p", en: "Designing distributed Edge-Cloud AI architectures to address the latency and bandwidth inefficiencies of centralized cloud platforms. This enables faster, localized decision-making for smart building energy management.", fr: "Conception d'architectures d'IA Edge-Cloud distribu&eacute;es pour r&eacute;pondre aux probl&egrave;mes de latence et d'efficacit&eacute; de la bande passante des plateformes cloud centralis&eacute;es. Cette approche permet une prise de d&eacute;cision plus rapide et locale pour la gestion &eacute;nerg&eacute;tique intelligente des b&acirc;timents." },
    { selector: "#anomaly-detection .prose p", en: "Processing real-time IoT sensor data to monitor system reliability and detect anomalies. Machine learning models identify irregular patterns and support proactive failure prediction in connected infrastructures.", fr: "Traitement en temps r&eacute;el des donn&eacute;es de capteurs IoT pour surveiller la fiabilit&eacute; des syst&egrave;mes et d&eacute;tecter les anomalies. Des mod&egrave;les d'apprentissage automatique identifient les sch&eacute;mas irr&eacute;guliers et facilitent la pr&eacute;diction proactive des pannes dans les infrastructures connect&eacute;es." },
    { selector: "#computer-vision-data-science .prose p", en: "Applying intelligent vision, pattern recognition, and biometrics to extract meaningful representations from data. This background supports advanced data visualization, signal processing, and spatiotemporal data analytics.", fr: "Application de la vision intelligente, de la reconnaissance des formes et de la biom&eacute;trie pour extraire des repr&eacute;sentations pertinentes des donn&eacute;es. Cette exp&eacute;rience soutient la visualisation avanc&eacute;e des donn&eacute;es, le traitement du signal et l'analyse spatio-temporelle." },
    { selector: "#workshops .prose p", en: "No workshop papers are listed yet.", fr: "Aucun article d'atelier n'est encore r&eacute;pertori&eacute;." }
  );

  function applyPageTranslations(language) {
    pageTranslations.forEach(function (item) {
      document.querySelectorAll(item.selector).forEach(function (element) {
        element.innerHTML = language === "fr" ? item.fr : item.en;
      });
    });
  }

  function applyLanguage(language) {
    document.documentElement.lang = language;
    document.querySelectorAll("[data-lang]").forEach(function (button) {
      button.classList.toggle("active", button.getAttribute("data-lang") === language);
    });
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    var textNode;
    while ((textNode = walker.nextNode())) {
      var value = textNode.nodeValue.trim();
      if (!value) continue;
      var english = translations[value] ? value : Object.keys(translations).find(function (key) {
        return translations[key] === value;
      });
      if (!english) continue;
      var translated = language === "fr" ? translations[english] : english;
      textNode.nodeValue = textNode.nodeValue.replace(value, translated);
    }
    applyPageTranslations(language);
    try { localStorage.setItem("language", language); } catch (e) {}
  }

  // Book covers: try the local file first, then Open Library, then a
  // styled placeholder built from the data-title / data-author attributes.
  window.__cover = function (img) {
    var next = img.getAttribute("data-alt");
    if (next) {
      img.removeAttribute("data-alt");
      img.src = next;
      return;
    }
    var box = img.closest ? img.closest(".bcov") : null;
    if (!box) return;
    box.classList.add("placeholder");
    while (box.firstChild) box.removeChild(box.firstChild);
    var t = document.createElement("span");
    t.className = "ph-title";
    t.textContent = box.getAttribute("data-title") || "";
    var a = document.createElement("span");
    a.className = "ph-author";
    a.textContent = box.getAttribute("data-author") || "";
    box.appendChild(t);
    box.appendChild(a);
  };

  document.addEventListener("DOMContentLoaded", function () {
    // Theme toggle button.
    var toggle = document.querySelector(".theme-toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        var attr = document.documentElement.getAttribute("data-theme");
        var systemDark = window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches;
        var isDark = attr ? attr === "dark" : systemDark;
        var next = isDark ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        try { localStorage.setItem("theme", next); } catch (e) {}
      });
    }

    // Language toggle.
    var languageToggle = document.querySelector(".language-toggle");
    if (languageToggle) {
      var savedLanguage = "en";
      try { savedLanguage = localStorage.getItem("language") || "en"; } catch (e) {}
      applyLanguage(savedLanguage);
      languageToggle.querySelectorAll("[data-lang]").forEach(function (button) {
        button.addEventListener("click", function () {
          applyLanguage(button.getAttribute("data-lang"));
        });
      });
    }

    // Mobile menu.
    var burger = document.querySelector(".nav-burger");
    var nav = document.querySelector(".nav");
    if (burger && nav) {
      burger.addEventListener("click", function () {
        nav.classList.toggle("open");
      });
      nav.querySelectorAll(".nav-links a").forEach(function (a) {
        a.addEventListener("click", function () { nav.classList.remove("open"); });
      });
    }

    // Dissertation modal ("In progress" until the ProQuest link is live).
    var modal = document.getElementById("diss-modal");
    if (modal) {
      var open = function () { modal.classList.add("open"); };
      var close = function () { modal.classList.remove("open"); };
      document.querySelectorAll(".js-diss").forEach(function (b) {
        b.addEventListener("click", function (e) { e.preventDefault(); open(); });
      });
      modal.addEventListener("click", function (e) {
        if (e.target === modal) close();
      });
      var x = modal.querySelector(".modal-close");
      if (x) x.addEventListener("click", close);
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") close();
      });
    }

    // Section side navigation (research, publications, cv): highlight the
    // section currently in view as the page scrolls.
    var spy = document.querySelector(".sidenav[data-spy]");
    if (spy) {
      var pairs = [];
      spy.querySelectorAll("a[href^='#']").forEach(function (link) {
        var sec = document.getElementById(link.getAttribute("href").slice(1));
        if (sec) pairs.push({ sec: sec, link: link });
      });
      var setActive = function () {
        if (!pairs.length) return;
        var y = window.scrollY + 120;
        var current = pairs[0];
        pairs.forEach(function (p) {
          if (p.sec.offsetTop <= y) current = p;
        });
        // At the very bottom, light up the last section.
        if (window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 2) {
          current = pairs[pairs.length - 1];
        }
        pairs.forEach(function (p) {
          p.link.classList.toggle("active", p === current);
        });
      };
      window.addEventListener("scroll", setActive, { passive: true });
      window.addEventListener("resize", setActive);
      setActive();
    }

    // Personal page: left sub-nav switches panels, syncs to URL hash.
    var ptabs = document.querySelectorAll(".ptab-btn");
    if (ptabs.length) {
      var show = function (id) {
        document.querySelectorAll(".ppanel").forEach(function (p) {
          p.classList.toggle("active", p.id === "panel-" + id);
        });
        ptabs.forEach(function (b) {
          b.classList.toggle("active", b.getAttribute("data-tab") === id);
        });
      };
      ptabs.forEach(function (b) {
        b.addEventListener("click", function () {
          var id = b.getAttribute("data-tab");
          show(id);
          if (history.replaceState) {
            history.replaceState(null, "", "#" + id);
          } else {
            location.hash = id;
          }
        });
      });
      var initial = (location.hash || "").replace("#", "");
      var valid = Array.prototype.some.call(ptabs, function (b) {
        return b.getAttribute("data-tab") === initial;
      });
      show(valid ? initial : ptabs[0].getAttribute("data-tab"));
      window.addEventListener("hashchange", function () {
        var h = (location.hash || "").replace("#", "");
        if (h) { show(h); }
      });
    }
  });
})();
