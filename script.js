

document.addEventListener('DOMContentLoaded', () => {
    // Récupération des éléments du DOM
    const loginSection = document.getElementById('login-section');
    const mainContent = document.getElementById('main-content');
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const passwordToggle = document.getElementById('password-toggle'); // Nouvel élément pour le toggle du mot de passe
    const loginError = document.getElementById('login-error');

    const welcomeMessage = document.getElementById('welcome-message');
    const videosSection = document.getElementById('videos-section');
    const quizSection = document.getElementById('quiz-section');

    const btnVideos = document.getElementById('btn-videos');
    const btnQuiz = document.getElementById('btn-quiz');

    const navHome = document.getElementById('nav-home');
    const navVideos = document.getElementById('nav-videos');
    const navQuiz = document.getElementById('nav-quiz');
    const navLogout = document.getElementById('nav-logout');

    const offcanvasNav = new bootstrap.Offcanvas(document.getElementById('offcanvasNav')); // Initialisation de l'Offcanvas Bootstrap

    // Éléments spécifiques au quiz
    const quizSelectionArea = document.getElementById('quiz-selection-area'); // Renommé pour être plus générique
    const selectionPrompt = document.getElementById('selection-prompt'); // Pour changer le texte de l'invite
    const selectionButtonsContainer = document.getElementById('selection-buttons-container');
    const quizQuestionsArea = document.getElementById('quiz-questions-area');
    const quizContainer = document.getElementById('quiz-container');
    const submitQuizButton = document.getElementById('submit-quiz');
    const newQuizButton = document.getElementById('new-quiz-button');
    const quizResults = document.getElementById('quiz-results');

    // Éléments du modal vidéo
    const videoModal = new bootstrap.Modal(document.getElementById('videoModal'));
    const videoPlayer = document.getElementById('videoPlayer');

    // --- Configuration des utilisateurs (à des fins de démonstration, en dur) ---
    // En production, cette partie devrait être gérée par un backend sécurisé.
    const users = {
        'formateur': 'password123',
        'candidat': 'concours2025'
    };

    // --- Données des questions du Quiz (organisées par thème et par série) ---
    const quizThemes = {
        "Microsoft Word": [
            {
                name: "Série 1 - Bases de Word",
                questions: [
                    { question: "Quelle est la touche de raccourci pour copier du texte dans Microsoft Word ?", choices: ["Ctrl + V", "Ctrl + X", "Ctrl + C", "Ctrl + P"], correct: 2, explanation: "La combinaison de touches Ctrl + C est utilisée pour copier le texte ou l'élément sélectionné dans Word.", videoExplanationUrl: "https://www.youtube.com/embed/word_copy_expl?rel=0&autoplay=1" },
                    { question: "Pour justifier un paragraphe dans Word, quelle option d'alignement utilisez-vous ?", choices: ["Aligner à gauche", "Centrer", "Aligner à droite", "Justifier"], correct: 3, explanation: "L'option 'Justifier' aligne le texte des deux côtés des marges, créant un bloc de texte uniforme.", videoExplanationUrl: "https://www.youtube.com/embed/word_justify_expl?rel=0&autoplay=1" },
                    { question: "Quel onglet de Word contient les options de mise en page (marges, orientation) ?", choices: ["Accueil", "Insertion", "Mise en page", "Révision"], correct: 2, explanation: "L'onglet 'Mise en page' (ou 'Disposition' selon les versions) contient les paramètres liés à la mise en forme globale du document.", videoExplanationUrl: "https://www.youtube.com/embed/word_layout_expl?rel=0&autoplay=1" },
                    { question: "Comment insérer un saut de page manuel dans Word ?", choices: ["Ctrl + S", "Ctrl + Entrée", "Ctrl + Z", "Ctrl + F"], correct: 1, explanation: "Ctrl + Entrée insère un saut de page, forçant le texte suivant à commencer sur une nouvelle page.", videoExplanationUrl: "https://www.youtube.com/embed/word_pagebreak_expl?rel=0&autoplay=1" }
                ]
            },
            {
                name: "Série 2 - Fonctions avancées de Word",
                questions: [
                    { question: "Quel outil de Word permet de créer une table des matières automatique ?", choices: ["Sommaire", "Index", "Références", "Mailing"], correct: 2, explanation: "L'onglet 'Références' contient l'option 'Table des matières' qui permet de générer automatiquement une table basée sur les titres.", videoExplanationUrl: "https://www.youtube.com/embed/word_toc_expl?rel=0&autoplay=1" },
                    { question: "Dans Word, comment s'appelle la fonctionnalité qui permet de fusionner des documents (par exemple, des lettres type avec une liste de destinataires) ?", choices: ["Macro", "Fusion et publipostage", "Modèle", "Style"], correct: 1, explanation: "La fonctionnalité de 'Fusion et publipostage' permet de créer des documents personnalisés en combinant un document principal avec une source de données.", videoExplanationUrl: "https://www.youtube.com/embed/word_mailmerge_expl?rel=0&autoplay=1" },
                    { question: "Quelle est l'utilité du 'Suivi des modifications' dans Word ?", choices: ["Vérifier l'orthographe", "Enregistrer les modifications apportées par plusieurs utilisateurs", "Convertir le document en PDF", "Créer un index"], correct: 1, explanation: "Le 'Suivi des modifications' est essentiel pour la collaboration, permettant de voir qui a modifié quoi dans un document.", videoExplanationUrl: "https://www.youtube.com/embed/word_trackchanges_expl?rel=0&autoplay=1" }
                ]
            }
        ],
        "Microsoft Excel": [
            {
                name: "Série 1 - Fonctions de base d'Excel",
                questions: [
                    { question: "Quelle fonction Excel permet de calculer la somme d'une plage de cellules ?", choices: ["MOYENNE()", "NB.SI()", "SOMME()", "MAX()"], correct: 2, explanation: "La fonction SOMME() est utilisée pour additionner toutes les valeurs numériques dans une plage de cellules spécifiée.", videoExplanationUrl: "https://www.youtube.com/embed/excel_sum_expl?rel=0&autoplay=1" },
                    { question: "Comment appelle-t-on l'intersection d'une ligne et d'une colonne dans Excel ?", choices: ["Une plage", "Un tableau", "Une cellule", "Une feuille"], correct: 2, explanation: "L'intersection d'une ligne et d'une colonne dans une feuille de calcul Excel est appelée une cellule.", videoExplanationUrl: "https://www.youtube.com/embed/excel_cell_expl?rel=0&autoplay=1" },
                    { question: "Quelle est la formule correcte pour multiplier les valeurs des cellules A1 et B1 ?", choices: ["=A1+B1", "=A1*B1", "=A1/B1", "=A1-B1"], correct: 1, explanation: "Le signe * (astérisque) est utilisé en Excel pour la multiplication.", videoExplanationUrl: "https://www.youtube.com/embed/excel_multiply_expl?rel=0&autoplay=1" },
                    { question: "Quel symbole doit précéder une formule dans une cellule Excel ?", choices: ["@", "#", "$", "="], correct: 3, explanation: "Toute formule dans Excel doit commencer par le signe égal (=).", videoExplanationUrl: "https://www.youtube.com/embed/excel_formula_expl?rel=0&autoplay=1" }
                ]
            },
            {
                name: "Série 2 - Fonctions avancées d'Excel",
                questions: [
                    { question: "Quelle fonction est utilisée pour rechercher une valeur dans la première colonne d'une table et renvoyer une valeur de la même ligne dans une colonne spécifiée ?", choices: ["SOMME.SI", "RECHERCHEV", "NB.SI", "INDEX"], correct: 1, explanation: "La fonction RECHERCHEV (VLOOKUP en anglais) est très couramment utilisée pour rechercher des données dans de grandes tables.", videoExplanationUrl: "https://www.youtube.com/embed/excel_vlookup_expl?rel=0&autoplay=1" },
                    { question: "Comment créer un graphique dans Excel ?", choices: ["Onglet 'Données' -> 'Graphiques'", "Onglet 'Insertion' -> 'Graphiques'", "Onglet 'Mise en page' -> 'Graphiques'", "Onglet 'Formules' -> 'Graphiques'"], correct: 1, explanation: "Les outils de création de graphiques se trouvent principalement sous l'onglet 'Insertion'.", videoExplanationUrl: "https://www.youtube.com/embed/excel_chart_expl?rel=0&autoplay=1" },
                    { question: "À quoi sert la 'Validation des données' dans Excel ?", choices: ["Protéger la feuille de calcul", "Vérifier la validité des données saisies", "Trier les données", "Filtrer les données"], correct: 1, explanation: "La validation des données permet de contrôler le type ou la plage de données que les utilisateurs peuvent saisir dans une cellule.", videoExplanationUrl: "https://www.youtube.com/embed/excel_validation_expl?rel=0&autoplay=1" }
                ]
            }
        ],
        "Microsoft PowerPoint": [
            {
                name: "Série 1 - Création de base",
                questions: [
                    { question: "Quel est le format de fichier par défaut pour une présentation PowerPoint ?", choices: [".doc", ".pdf", ".xlsx", ".pptx"], correct: 3, explanation: "Le format .pptx est le format de fichier par défaut pour les présentations créées avec Microsoft PowerPoint.", videoExplanationUrl: "https://www.youtube.com/embed/ppt_file_format_expl?rel=0&autoplay=1" },
                    { question: "Dans PowerPoint, quel est l'objectif d'une 'diapositive maîtresse' ?", choices: ["Créer des graphiques", "Appliquer un formatage cohérent à toutes les diapositives", "Insérer des vidéos", "Générer un rapport"], correct: 1, explanation: "La diapositive maîtresse (ou masque des diapositives) permet de définir le thème, le formatage, les arrière-plans et les polices pour toutes les diapositives de la présentation.", videoExplanationUrl: "https://www.youtube.com/embed/ppt_master_slide_expl?rel=0&autoplay=1" },
                    { question: "Comment ajoute-t-on une nouvelle diapositive à une présentation PowerPoint ?", choices: ["Ctrl + N", "Ctrl + M", "Ctrl + P", "Ctrl + S"], correct: 1, explanation: "La combinaison Ctrl + M est le raccourci pour insérer une nouvelle diapositive dans PowerPoint.", videoExplanationUrl: "https://www.youtube.com/embed/ppt_new_slide_expl?rel=0&autoplay=1" }
                ]
            },
            {
                name: "Série 2 - Animations et Transitions",
                questions: [
                    { question: "Dans PowerPoint, qu'est-ce qu'une 'transition' ?", choices: ["Un mouvement d'un objet sur une diapositive", "Le passage d'une diapositive à la suivante", "Un effet sonore", "Une modification de police"], correct: 1, explanation: "Une transition est l'effet visuel qui se produit lorsque vous passez d'une diapositive à l'autre pendant un diaporama.", videoExplanationUrl: "https://www.youtube.com/embed/ppt_transition_expl?rel=0&autoplay=1" },
                    { question: "Comment déclenche-t-on une animation sur un objet dans PowerPoint ?", choices: ["En cliquant sur l'objet", "Au démarrage de la diapositive", "Après l'animation précédente", "Toutes ces réponses"], correct: 3, explanation: "Les animations peuvent être déclenchées par un clic, automatiquement au début de la diapositive ou après un autre événement.", videoExplanationUrl: "https://www.youtube.com/embed/ppt_animation_expl?rel=0&autoplay=1" }
                ]
            }
        ]
    };

    let currentThemeName = ''; // Stocke le nom du thème sélectionné
    let currentQuizQuestions = []; // Stockera les questions de la série sélectionnée pour le quiz actuel

    // --- Fonction d'affichage des sections ---
    function showSection(sectionId) {
        offcanvasNav.hide(); // Ferme le menu Offcanvas immédiatement

        // Cache toutes les sections de contenu
        welcomeMessage.classList.add('d-none');
        videosSection.classList.add('d-none');
        quizSection.classList.add('d-none');
        quizResults.classList.add('d-none'); // Cacher les résultats du quiz si une autre section est affichée

        // Affiche la section demandée
        document.getElementById(sectionId).classList.remove('d-none');

        // Met à jour l'état "active" dans l'Offcanvas
        document.querySelectorAll('.offcanvas-body .nav-link').forEach(link => {
            link.classList.remove('active-nav-link');
            link.removeAttribute('aria-current');
        });

        // Active le lien de navigation correspondant
        if (sectionId === 'welcome-message') {
            navHome.classList.add('active-nav-link');
            navHome.setAttribute('aria-current', 'page');
        } else if (sectionId === 'videos-section') {
            navVideos.classList.add('active-nav-link');
            navVideos.setAttribute('aria-current', 'page');
        } else if (sectionId === 'quiz-section') {
            navQuiz.classList.add('active-nav-link');
            navQuiz.setAttribute('aria-current', 'page');
            showThemeSelection(); // Affiche la sélection de thème lorsque la section quiz est activée
        }
    }

    // --- Gestion du formulaire de Login ---
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        const username = usernameInput.value;
        const password = passwordInput.value;

        if (users[username] && users[username] === password) {
            loginSection.classList.add('d-none'); // Cache la section de login
            mainContent.classList.remove('d-none'); // Affiche le contenu principal
            loginError.classList.add('d-none'); // Cache le message d'erreur
            showSection('welcome-message'); // Affiche le message de bienvenue par défaut
        } else {
            loginError.classList.remove('d-none'); // Affiche le message d'erreur
        }
    });

    // --- Gestion du toggle afficher/masquer mot de passe ---
    passwordToggle.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        // Changer l'icône de l'œil
        passwordToggle.querySelector('i').classList.toggle('fa-eye');
        passwordToggle.querySelector('i').classList.toggle('fa-eye-slash');
    });

    // --- Gestion des clics sur les boutons et liens de navigation ---
    // Les appels à offcanvasNav.hide() sont déplacés ici pour une fermeture immédiate.
    navHome.addEventListener('click', (e) => { e.preventDefault(); showSection('welcome-message'); });
    navVideos.addEventListener('click', (e) => { e.preventDefault(); showSection('videos-section'); });
    navQuiz.addEventListener('click', (e) => { e.preventDefault(); showSection('quiz-section'); });

    navLogout.addEventListener('click', (e) => {
        e.preventDefault();
        offcanvasNav.hide(); // Ferme le menu coulissant immédiatement
        loginSection.classList.remove('d-none');
        mainContent.classList.add('d-none');
        loginForm.reset(); // Réinitialise le formulaire de login
        loginError.classList.add('d-none');
        quizResults.innerHTML = ''; // Nettoie les résultats du quiz
        quizContainer.innerHTML = ''; // Nettoie le quiz
        submitQuizButton.classList.add('d-none'); // Cache le bouton soumettre
        newQuizButton.classList.add('d-none'); // Cache le bouton Nouveau Quiz
    });

    // --- Correction: Gestion des clics sur les boutons d'accueil ---
    btnVideos.addEventListener('click', (e) => {
        e.preventDefault(); // Empêche le comportement par défaut
        showSection('videos-section');
    });

    btnQuiz.addEventListener('click', (e) => {
        e.preventDefault(); // Empêche le comportement par défaut
        showSection('quiz-section');
    });
    // --- Fin de correction ---

    // --- Gestion de l'affichage des vidéos dans le modal ---
    document.querySelectorAll('.video-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Empêche le comportement par défaut du lien
            const videoUrl = e.currentTarget.dataset.videoUrl; // Récupère l'URL de la vidéo depuis l'attribut data-
            videoPlayer.src = videoUrl; // Définit la source de l'iframe
            videoModal.show(); // Affiche le modal
        });
    });

    // Écouter l'événement de fermeture du modal vidéo pour arrêter la lecture
    document.getElementById('videoModal').addEventListener('hidden.bs.modal', () => {
        videoPlayer.src = ''; // Arrête la vidéo en vidant la source de l'iframe
    });


    // --- Fonctions du Quiz QCM ---

    function showThemeSelection() {
        quizSelectionArea.classList.remove('d-none');
        quizQuestionsArea.classList.add('d-none');
        submitQuizButton.classList.add('d-none');
        newQuizButton.classList.add('d-none');
        quizResults.classList.add('d-none');
        quizContainer.innerHTML = ''; // S'assurer que les questions précédentes sont nettoyées

        selectionPrompt.textContent = "Choisissez un thème pour commencer votre quiz :";
        selectionButtonsContainer.innerHTML = ''; // Nettoyer les boutons précédents

        for (const themeName in quizThemes) {
            const themeButton = document.createElement('button');
            themeButton.classList.add('btn', 'btn-outline-primary', 'btn-lg', 'rounded-pill', 'py-3', 'shadow-sm', 'theme-button', 'mb-3');
            themeButton.textContent = themeName;
            themeButton.dataset.theme = themeName; // Stocke le nom du thème
            selectionButtonsContainer.appendChild(themeButton);

            themeButton.addEventListener('click', (e) => {
                currentThemeName = e.target.dataset.theme; // Stocke le thème sélectionné
                showQuizSeriesSelection(currentThemeName);
            });
        }
    }

    function showQuizSeriesSelection(themeName) {
        selectionPrompt.textContent = `Choisissez une série de quiz pour le thème "${themeName}" :`;
        selectionButtonsContainer.innerHTML = ''; // Nettoyer les boutons de thème

        const seriesList = quizThemes[themeName];
        seriesList.forEach((series, index) => {
            const seriesButton = document.createElement('button');
            seriesButton.classList.add('btn', 'btn-outline-success', 'btn-lg', 'rounded-pill', 'py-3', 'shadow-sm', 'series-button', 'mb-3');
            seriesButton.textContent = series.name;
            seriesButton.dataset.seriesIndex = index; // Stocke l'index de la série
            selectionButtonsContainer.appendChild(seriesButton);

            seriesButton.addEventListener('click', (e) => {
                const seriesIndex = parseInt(e.target.dataset.seriesIndex);
                startQuiz(seriesIndex);
            });
        });

        // Optionnel: Ajouter un bouton pour revenir aux thèmes
        const backToThemesButton = document.createElement('button');
        backToThemesButton.classList.add('btn', 'btn-secondary', 'btn-sm', 'mt-4', 'rounded-pill');
        backToThemesButton.textContent = "Retour aux thèmes";
        selectionButtonsContainer.appendChild(backToThemesButton);
        backToThemesButton.addEventListener('click', showThemeSelection);
    }


    function startQuiz(seriesIndex) {
        currentQuizQuestions = quizThemes[currentThemeName][seriesIndex].questions;
        quizContainer.innerHTML = ''; // Nettoie le conteneur du quiz

        // Afficher la zone des questions et masquer la sélection de thème/série
        quizSelectionArea.classList.add('d-none');
        quizQuestionsArea.classList.remove('d-none');
        submitQuizButton.classList.remove('d-none');
        newQuizButton.classList.add('d-none');
        quizResults.classList.add('d-none');

        currentQuizQuestions.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('card', 'mb-4', 'quiz-question-card');
            questionDiv.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title text-dark-blue mb-3">Question ${index + 1}: ${q.question}</h5>
                    <div class="choices-container">
                        ${q.choices.map((choice, i) => `
                            <div class="form-check mb-2">
                                <input class="form-check-input" type="radio" name="question${index}" id="q${index}c${i}" value="${i}" required>
                                <label class="form-check-label" for="q${index}c${i}">
                                    ${choice}
                                </label>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            quizContainer.appendChild(questionDiv);
        });
    }

    submitQuizButton.addEventListener('click', (e) => { // Ajout de l'événement e
        e.preventDefault(); // Empêche le comportement par défaut du bouton

        let score = 0;
        let allAnswered = true;
        const userAnswers = [];

        currentQuizQuestions.forEach((q, index) => {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);

            if (selectedOption) {
                const userAnswerIndex = parseInt(selectedOption.value);
                const isCorrect = userAnswerIndex === q.correct;
                userAnswers.push({
                    questionIndex: index,
                    userChoiceIndex: userAnswerIndex,
                    isCorrect: isCorrect
                });
                if (isCorrect) {
                    score++;
                }
            } else {
                allAnswered = false;
            }
        });

        if (!allAnswered) {
            quizResults.innerHTML = '<div class="alert alert-warning text-center rounded-3">Veuillez répondre à toutes les questions avant de soumettre.</div>';
            quizResults.classList.remove('d-none');
            return;
        }

        // Cacher le conteneur des questions du quiz
        quizQuestionsArea.classList.add('d-none');
        submitQuizButton.classList.add('d-none'); // Cache le bouton Soumettre

        // --- Affichage des résultats et remarques ---
        let remark = '';
        const percentage = (score / currentQuizQuestions.length) * 100;

        if (percentage === 100) {
            remark = '<span class="remark-positive">Félicitations ! Vous avez un score parfait ! Excellent travail !</span>';
        } else if (percentage >= 75) {
            remark = '<span class="remark-positive">Très bon travail ! Vous avez une excellente maîtrise des concepts.</span>';
        } else if (percentage >= 50) {
            remark = '<span class="remark-neutral">Bon effort ! Continuez à réviser pour améliorer vos connaissances.</span>';
        } else {
            remark = '<span class="remark-negative">Vous avez besoin de plus de pratique. N\'hésitez pas à consulter les vidéos explicatives !</span>';
        }

        let resultsHtml = `
            <div class="text-center mb-4">
                <h4 class="text-dark-blue">Votre score: <span class="display-6 fw-bold text-primary">${score} / ${currentQuizQuestions.length}</span></h4>
                <p class="lead">${remark}</p>
            </div>
            <h5 class="text-dark-blue mb-3">Détail des réponses:</h5>
        `;

        userAnswers.forEach(answer => {
            const question = currentQuizQuestions[answer.questionIndex];
            const userAnswerText = question.choices[answer.userChoiceIndex];
            const correctAnswerText = question.choices[question.correct];
            const resultClass = answer.isCorrect ? 'quiz-result-correct' : 'quiz-result-incorrect';
            const icon = answer.isCorrect ? '<i class="fas fa-check-circle me-1"></i>' : '<i class="fas fa-times-circle me-1"></i>';

            // Le bouton d'explication est toujours généré
            let explanationButtonHtml = `
                <button class="btn btn-outline-info btn-sm mt-2 explanation-btn" data-explanation-id="explanation-result-${answer.questionIndex}">
                    <i class="fas fa-info-circle me-1"></i> Voir l'explication
                </button>
            `;
            let explanationSectionHtml = `
                <div class="explanation-section mt-3 d-none" id="explanation-result-${answer.questionIndex}">
                    <p class="mb-0 text-dark-blue-text">${question.explanation}</p>
                </div>
            `;

            // Le bouton d'explication vidéo est généré s'il y a un lien vidéo
            let videoExplanationButtonHtml = '';
            if (question.videoExplanationUrl) {
                videoExplanationButtonHtml = `
                    <button class="btn btn-outline-danger btn-sm mt-2 ms-2 video-explanation-btn" data-video-url="${question.videoExplanationUrl}" data-bs-toggle="modal" data-bs-target="#videoModal">
                        <i class="fas fa-video me-1"></i> Voir la vidéo d'explication
                    </button>
                `;
            }

            resultsHtml += `
                <div class="mb-3 p-3 border rounded-3 bg-white shadow-sm">
                    <p class="mb-1"><strong>Question ${answer.questionIndex + 1}:</strong> ${question.question}</p>
                    <p class="mb-1 ${resultClass}">Votre réponse: ${icon} ${userAnswerText}</p>
                    <p class="mb-0 text-success">Réponse correcte: <i class="fas fa-check-circle me-1"></i> ${correctAnswerText}</p>
                    <div> <!-- Conteneur pour les boutons d'explication -->
                        ${explanationButtonHtml}
                        ${videoExplanationButtonHtml} 
                    </div>
                    ${explanationSectionHtml}
                </div>
            `;
        });

        quizResults.innerHTML = resultsHtml;
        quizResults.classList.remove('d-none'); // Afficher les résultats
        newQuizButton.classList.remove('d-none'); // Affiche le bouton "Nouveau Quiz"

        // Attacher les écouteurs d'événements pour les boutons d'explication nouvellement créés dans les résultats
        document.querySelectorAll('.explanation-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const explanationId = e.target.dataset.explanationId;
                const explanationDiv = document.getElementById(explanationId);
                explanationDiv.classList.toggle('d-none');
            });
        });

        // Attacher les écouteurs d'événements pour les boutons d'explication vidéo
        document.querySelectorAll('.video-explanation-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const videoUrl = e.currentTarget.dataset.videoUrl;
                videoPlayer.src = videoUrl;
                // Le modal est déjà géré par data-bs-toggle et data-bs-target
            });
        });
    });

    // --- Gestion du bouton "Nouveau Quiz" ---
    newQuizButton.addEventListener('click', () => {
        showThemeSelection(); // Retourne à la sélection des thèmes
    });

    // Initialisation: Cacher le contenu principal au chargement
    mainContent.classList.add('d-none');
});
