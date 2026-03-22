import { useState, useEffect, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// LANGUAGES & UI TRANSLATIONS
// ══════════════════════════════════════════════════════════════════════════════
const LANGUAGES = [
  { code: "en", label: "🇺🇸 English",    flag: "🇺🇸" },
  { code: "es", label: "🇪🇸 Español",    flag: "🇪🇸" },
  { code: "fr", label: "🇫🇷 Français",   flag: "🇫🇷" },
  { code: "de", label: "🇩🇪 Deutsch",    flag: "🇩🇪" },
  { code: "pt", label: "🇵🇹 Português",  flag: "🇵🇹" },
  { code: "it", label: "🇮🇹 Italiano",   flag: "🇮🇹" },
  { code: "me", label: "🇲🇪 Crnogorski", flag: "🇲🇪" },
  { code: "uk", label: "🇺🇦 Українська", flag: "🇺🇦" },
  { code: "ru", label: "🇷🇺 Русский",    flag: "🇷🇺" },
  { code: "pl", label: "🇵🇱 Polski",     flag: "🇵🇱" },
];

const UI = {
  en: {
    title:"AGENT X",subtitle:"FIELD OPERATIVE WORD GAME",difficulty:"DIFFICULTY",
    easy:"🟢  Easy",hard:"🔴  Hard",easyDesc:"Common everyday words — great for all ages",
    hardDesc:"Abstract & tricky words — brutal for spymasters",language:"LANGUAGE",
    gameCode:"GAME CODE",gameCodeDesc:"Everyone must enter the same code to see the same board",
    leaveBlank:"Leave blank to auto-generate a fresh code.",generated:"Generated:",
    deploy:"DEPLOY AGENTS",sameBoard:"Same code + difficulty + language = identical board",
    lobby:"← LOBBY",newGame:"NEW GAME",sameCode:"SAME CODE",newCode:"NEW CODE",playAgain:"PLAY AGAIN",
    shareCode:"share with all players",redTeam:"RED TEAM",blueTeam:"BLUE TEAM",
    cluePlaceholder:"Clue word...",countPlaceholder:"#",giveClue:"GIVE CLUE",
    spymaster:"SPYMASTER",endTurn:"END TURN",clueLabel:"Clue:",guessesLeft:"Guesses left:",
    confirmGuess:"CONFIRM GUESS",revealQ:"Reveal this card? This cannot be undone.",
    cancel:"CANCEL",revealIt:"REVEAL IT",spymasterMode:"SPYMASTER MODE",
    spymasterWarn:"This will reveal all card colors.",
    spymasterWarn2:"Only the spymaster should look at this screen. Make sure operatives look away!",
    iAmSpy:"I'M THE SPYMASTER",wins:"TEAM WINS!",assassin:"ASSASSIN",
    footerSpy:"🕵️ Spymaster gives word + number clue",footerOp:"🔍 Tap a card then confirm to reveal",
    footerAvoid:"☠️ Avoid the assassin",footerWin:"🏆 Reveal all your team's cards to win",
    gameLog:"GAME LOG",noMoves:"No moves yet...",spymasterLog:"Spymaster:",
    wrongTurn:"Wrong! Turn →",outOfGuesses:"Out of guesses. Turn →",endedTurn:"ended their turn.",
    waiting:"Waiting for spymaster…",redWins:"🔴 RED wins!",blueWins:"🔵 BLUE wins!",assassinLog:"💀 ASSASSIN!",spymasterOnce:"This role is permanent for the entire game.",youAreSpy:"You are the spymaster",spyTaken:"Spymaster taken",becomeSpy:"Become spymaster",share:"SHARE",waiting:"Waiting…",howToPlay:"HOW TO PLAY",
  },
  es: {
    title:"AGENTE X",subtitle:"JUEGO DE PALABRAS OPERATIVO",difficulty:"DIFICULTAD",
    easy:"🟢  Fácil",hard:"🔴  Difícil",easyDesc:"Palabras comunes — para todas las edades",
    hardDesc:"Palabras abstractas y difíciles — brutal para espías",language:"IDIOMA",
    gameCode:"CÓDIGO DE JUEGO",gameCodeDesc:"Todos deben introducir el mismo código",
    leaveBlank:"Déjalo en blanco para generar un código nuevo.",generated:"Generado:",
    deploy:"DESPLEGAR AGENTES",sameBoard:"Mismo código + dificultad + idioma = tablero idéntico",
    lobby:"← SALÓN",newGame:"NUEVA PARTIDA",sameCode:"MISMO CÓDIGO",newCode:"NUEVO CÓDIGO",playAgain:"JUGAR DE NUEVO",
    shareCode:"comparte con todos los jugadores",redTeam:"EQUIPO ROJO",blueTeam:"EQUIPO AZUL",
    cluePlaceholder:"Palabra clave...",countPlaceholder:"#",giveClue:"DAR PISTA",
    spymaster:"ESPÍA JEFE",endTurn:"PASAR TURNO",clueLabel:"Pista:",guessesLeft:"Intentos restantes:",
    confirmGuess:"CONFIRMAR TURNO",revealQ:"¿Revelar esta carta? No se puede deshacer.",
    cancel:"CANCELAR",revealIt:"REVELAR",spymasterMode:"MODO ESPÍA JEFE",
    spymasterWarn:"Esto revelará todos los colores del tablero.",
    spymasterWarn2:"¡Solo el espía jefe debe mirar esta pantalla!",
    iAmSpy:"SOY EL ESPÍA JEFE",wins:"¡EQUIPO GANA!",assassin:"ASESINO",
    footerSpy:"🕵️ El espía jefe da una palabra + número",footerOp:"🔍 Toca una carta y confirma",
    footerAvoid:"☠️ Evita al asesino",footerWin:"🏆 Revela todas tus cartas para ganar",
    gameLog:"REGISTRO",noMoves:"Sin movimientos aún...",spymasterLog:"Espía:",
    wrongTurn:"¡Incorrecto! Turno →",outOfGuesses:"Sin intentos. Turno →",endedTurn:"terminó su turno.",
    waiting:"Esperando al espía jefe…",redWins:"🔴 ¡ROJO gana!",blueWins:"🔵 ¡AZUL gana!",assassinLog:"💀 ¡ASESINO!",spymasterOnce:"Este rol es permanente para toda la partida.",youAreSpy:"Eres el espía jefe",spyTaken:"Espía jefe asignado",becomeSpy:"Ser espía jefe",share:"COMPARTIR",waiting:"Esperando…",howToPlay:"CÓMO JUGAR",
  },
  fr: {
    title:"AGENT X",subtitle:"JEU DE MOTS OPÉRATIF",difficulty:"DIFFICULTÉ",
    easy:"🟢  Facile",hard:"🔴  Difficile",easyDesc:"Mots courants — pour tous les âges",
    hardDesc:"Mots abstraits et piégeux — brutal pour les espions",language:"LANGUE",
    gameCode:"CODE DE PARTIE",gameCodeDesc:"Tout le monde doit entrer le même code",
    leaveBlank:"Laissez vide pour générer un code automatiquement.",generated:"Généré :",
    deploy:"DÉPLOYER LES AGENTS",sameBoard:"Même code + difficulté + langue = plateau identique",
    lobby:"← ACCUEIL",newGame:"NOUVELLE PARTIE",sameCode:"MÊME CODE",newCode:"NOUVEAU CODE",playAgain:"REJOUER",
    shareCode:"partagez avec tous les joueurs",redTeam:"ÉQUIPE ROUGE",blueTeam:"ÉQUIPE BLEUE",
    cluePlaceholder:"Mot indice...",countPlaceholder:"#",giveClue:"DONNER L'INDICE",
    spymaster:"ESPION CHEF",endTurn:"FIN DE TOUR",clueLabel:"Indice :",guessesLeft:"Tentatives :",
    confirmGuess:"CONFIRMER",revealQ:"Révéler cette carte ? Impossible d'annuler.",
    cancel:"ANNULER",revealIt:"RÉVÉLER",spymasterMode:"MODE ESPION CHEF",
    spymasterWarn:"Cela révélera toutes les couleurs du plateau.",
    spymasterWarn2:"Seul l'espion chef doit regarder cet écran !",
    iAmSpy:"JE SUIS L'ESPION CHEF",wins:"ÉQUIPE GAGNE !",assassin:"ASSASSIN",
    footerSpy:"🕵️ L'espion chef donne un mot + un nombre",footerOp:"🔍 Tapez une carte puis confirmez",
    footerAvoid:"☠️ Évitez l'assassin",footerWin:"🏆 Révélez toutes vos cartes pour gagner",
    gameLog:"JOURNAL",noMoves:"Aucun mouvement encore...",spymasterLog:"Espion :",
    wrongTurn:"Faux ! Tour →",outOfGuesses:"Plus de tentatives. Tour →",endedTurn:"a terminé son tour.",
    waiting:"En attente de l'espion chef…",redWins:"🔴 ROUGE gagne !",blueWins:"🔵 BLEU gagne !",assassinLog:"💀 ASSASSIN !",spymasterOnce:"Ce rôle est permanent pour toute la partie.",youAreSpy:"Vous êtes l'espion chef",spyTaken:"Espion chef pris",becomeSpy:"Devenir espion chef",share:"PARTAGER",waiting:"En attente…",howToPlay:"COMMENT JOUER",
  },
  de: {
    title:"AGENT X",subtitle:"FELDOPERATIVES WORTSPIEL",difficulty:"SCHWIERIGKEIT",
    easy:"🟢  Leicht",hard:"🔴  Schwer",easyDesc:"Alltägliche Wörter — für alle Altersgruppen",
    hardDesc:"Abstrakte und knifflige Wörter — brutal für Spymaster",language:"SPRACHE",
    gameCode:"SPIELCODE",gameCodeDesc:"Alle müssen denselben Code eingeben",
    leaveBlank:"Leer lassen für automatisch generierten Code.",generated:"Generiert:",
    deploy:"AGENTEN EINSETZEN",sameBoard:"Gleicher Code + Schwierigkeit + Sprache = identisches Spielfeld",
    lobby:"← LOBBY",newGame:"NEUES SPIEL",sameCode:"GLEICHER CODE",newCode:"NEUER CODE",playAgain:"NOCHMAL SPIELEN",
    shareCode:"mit allen Spielern teilen",redTeam:"ROTES TEAM",blueTeam:"BLAUES TEAM",
    cluePlaceholder:"Hinweiswort...",countPlaceholder:"#",giveClue:"HINWEIS GEBEN",
    spymaster:"SPYMASTER",endTurn:"ZUG BEENDEN",clueLabel:"Hinweis:",guessesLeft:"Versuche:",
    confirmGuess:"BESTÄTIGEN",revealQ:"Diese Karte aufdecken? Nicht rückgängig zu machen.",
    cancel:"ABBRECHEN",revealIt:"AUFDECKEN",spymasterMode:"SPYMASTER-MODUS",
    spymasterWarn:"Dies zeigt alle Kartenfarben.",
    spymasterWarn2:"Nur der Spymaster darf auf diesen Bildschirm schauen!",
    iAmSpy:"ICH BIN DER SPYMASTER",wins:"TEAM GEWINNT!",assassin:"ATTENTÄTER",
    footerSpy:"🕵️ Spymaster gibt Wort + Zahl",footerOp:"🔍 Karte tippen dann bestätigen",
    footerAvoid:"☠️ Den Attentäter vermeiden",footerWin:"🏆 Alle eigenen Karten aufdecken",
    gameLog:"SPIELPROTOKOLL",noMoves:"Noch keine Züge...",spymasterLog:"Spymaster:",
    wrongTurn:"Falsch! Zug →",outOfGuesses:"Keine Versuche mehr. Zug →",endedTurn:"beendete seinen Zug.",
    waiting:"Warten auf Spymaster…",redWins:"🔴 ROT gewinnt!",blueWins:"🔵 BLAU gewinnt!",assassinLog:"💀 ATTENTÄTER!",spymasterOnce:"Diese Rolle ist für das gesamte Spiel dauerhaft.",youAreSpy:"Du bist der Spymaster",spyTaken:"Spymaster vergeben",becomeSpy:"Spymaster werden",share:"TEILEN",waiting:"Warten…",howToPlay:"ANLEITUNG",
  },
  pt: {
    title:"AGENTE X",subtitle:"JOGO DE PALAVRAS OPERATIVO",difficulty:"DIFICULDADE",
    easy:"🟢  Fácil",hard:"🔴  Difícil",easyDesc:"Palavras comuns — para todas as idades",
    hardDesc:"Palavras abstratas e difíceis — brutal para espiões",language:"IDIOMA",
    gameCode:"CÓDIGO DO JOGO",gameCodeDesc:"Todos devem inserir o mesmo código",
    leaveBlank:"Deixe em branco para gerar um código.",generated:"Gerado:",
    deploy:"ENVIAR AGENTES",sameBoard:"Mesmo código + dificuldade + idioma = tabuleiro idêntico",
    lobby:"← SAGUÃO",newGame:"NOVO JOGO",sameCode:"MESMO CÓDIGO",newCode:"NOVO CÓDIGO",playAgain:"JOGAR NOVAMENTE",
    shareCode:"compartilhe com todos os jogadores",redTeam:"EQUIPA VERMELHA",blueTeam:"EQUIPA AZUL",
    cluePlaceholder:"Palavra-pista...",countPlaceholder:"#",giveClue:"DAR PISTA",
    spymaster:"ESPIÃO CHEFE",endTurn:"PASSAR VEZ",clueLabel:"Pista:",guessesLeft:"Tentativas:",
    confirmGuess:"CONFIRMAR",revealQ:"Revelar esta carta? Não pode ser desfeito.",
    cancel:"CANCELAR",revealIt:"REVELAR",spymasterMode:"MODO ESPIÃO CHEFE",
    spymasterWarn:"Isso revelará todas as cores do tabuleiro.",
    spymasterWarn2:"Apenas o espião chefe deve olhar para este ecrã!",
    iAmSpy:"SOU O ESPIÃO CHEFE",wins:"EQUIPA GANHA!",assassin:"ASSASSINO",
    footerSpy:"🕵️ Espião chefe dá palavra + número",footerOp:"🔍 Toque numa carta e confirme",
    footerAvoid:"☠️ Evite o assassino",footerWin:"🏆 Revele todas as suas cartas para ganhar",
    gameLog:"REGISTO",noMoves:"Sem movimentos ainda...",spymasterLog:"Espião:",
    wrongTurn:"Errado! Vez →",outOfGuesses:"Sem tentativas. Vez →",endedTurn:"terminou a sua vez.",
    waiting:"Aguardando espião chefe…",redWins:"🔴 VERMELHO ganha!",blueWins:"🔵 AZUL ganha!",assassinLog:"💀 ASSASSINO!",spymasterOnce:"Este papel é permanente para todo o jogo.",youAreSpy:"Você é o espião chefe",spyTaken:"Espião chefe ocupado",becomeSpy:"Tornar-se espião chefe",share:"PARTILHAR",waiting:"A aguardar…",howToPlay:"COMO JOGAR",
  },
  it: {
    title:"AGENTE X",subtitle:"GIOCO DI PAROLE OPERATIVO",difficulty:"DIFFICOLTÀ",
    easy:"🟢  Facile",hard:"🔴  Difficile",easyDesc:"Parole comuni — per tutte le età",
    hardDesc:"Parole astratte e insidiose — brutale per le spie",language:"LINGUA",
    gameCode:"CODICE PARTITA",gameCodeDesc:"Tutti devono inserire lo stesso codice",
    leaveBlank:"Lascia vuoto per generare un codice.",generated:"Generato:",
    deploy:"INVIA AGENTI",sameBoard:"Stesso codice + difficoltà + lingua = tabellone identico",
    lobby:"← SALA",newGame:"NUOVA PARTITA",sameCode:"STESSO CODICE",newCode:"NUOVO CODICE",playAgain:"GIOCA DI NUOVO",
    shareCode:"condividi con tutti i giocatori",redTeam:"SQUADRA ROSSA",blueTeam:"SQUADRA BLU",
    cluePlaceholder:"Parola indizio...",countPlaceholder:"#",giveClue:"DAI L'INDIZIO",
    spymaster:"CAPO SPIA",endTurn:"FINE TURNO",clueLabel:"Indizio:",guessesLeft:"Tentativi:",
    confirmGuess:"CONFERMA",revealQ:"Rivelare questa carta? Non si può annullare.",
    cancel:"ANNULLA",revealIt:"RIVELA",spymasterMode:"MODALITÀ CAPO SPIA",
    spymasterWarn:"Questo rivelerà tutti i colori del tabellone.",
    spymasterWarn2:"Solo il capo spia deve guardare questo schermo!",
    iAmSpy:"SONO IL CAPO SPIA",wins:"SQUADRA VINCE!",assassin:"ASSASSINO",
    footerSpy:"🕵️ Il capo spia dà una parola + numero",footerOp:"🔍 Tocca una carta e conferma",
    footerAvoid:"☠️ Evita l'assassino",footerWin:"🏆 Rivela tutte le tue carte per vincere",
    gameLog:"REGISTRO",noMoves:"Nessuna mossa ancora...",spymasterLog:"Spia:",
    wrongTurn:"Sbagliato! Turno →",outOfGuesses:"Nessun tentativo. Turno →",endedTurn:"ha terminato il turno.",
    waiting:"In attesa del capo spia…",redWins:"🔴 ROSSO vince!",blueWins:"🔵 BLU vince!",assassinLog:"💀 ASSASSINO!",spymasterOnce:"Questo ruolo è permanente per tutta la partita.",youAreSpy:"Sei il capo spia",spyTaken:"Capo spia occupato",becomeSpy:"Diventa capo spia",share:"CONDIVIDI",waiting:"In attesa…",howToPlay:"COME GIOCARE",
  },
  me: {
    title:"AGENT X",subtitle:"OPERATIVNA IGRA RIJEČIMA",difficulty:"TEŽINA",
    easy:"🟢  Lako",hard:"🔴  Teško",easyDesc:"Svakodnevne riječi — za sve uzraste",
    hardDesc:"Apstraktne i teške riječi — brutalno za šefa špijuna",language:"JEZIK",
    gameCode:"KOD IGRE",gameCodeDesc:"Svi moraju unijeti isti kod da bi vidjeli istu tablu",
    leaveBlank:"Ostavi prazno za automatsko generisanje koda.",generated:"Generisano:",
    deploy:"RASPOREDI AGENTE",sameBoard:"Isti kod + težina + jezik = identična tabla",
    lobby:"← SALA",newGame:"NOVA IGRA",sameCode:"ISTI KOD",newCode:"NOVI KOD",playAgain:"IGRAJ PONOVO",
    shareCode:"podijeli sa svim igračima",redTeam:"CRVENI TIM",blueTeam:"PLAVI TIM",
    cluePlaceholder:"Ključna riječ...",countPlaceholder:"#",giveClue:"DAJ NAGOVJJEŠTAJ",
    spymaster:"ŠEF ŠPIJUN",endTurn:"ZAVRŠI POTEZ",clueLabel:"Nagovjještaj:",guessesLeft:"Pokušaji:",
    confirmGuess:"POTVRDI",revealQ:"Otkriti ovu kartu? Ne može se poništiti.",
    cancel:"OTKAŽI",revealIt:"OTKRIJ",spymasterMode:"REŽIM ŠEFA ŠPIJUNA",
    spymasterWarn:"Ovo će otkriti sve boje karata.",
    spymasterWarn2:"Samo šef špijun smije gledati u ovaj ekran!",
    iAmSpy:"JA SAM ŠEF ŠPIJUN",wins:"TIM POBJEĐUJE!",assassin:"UBICA",
    footerSpy:"🕵️ Šef špijun daje riječ + broj",footerOp:"🔍 Tapni kartu, pa potvrdi",
    footerAvoid:"☠️ Izbjegni ubicu",footerWin:"🏆 Otkrij sve svoje karte da pobijediš",
    gameLog:"DNEVNIK IGRE",noMoves:"Još nema poteza...",spymasterLog:"Šef:",
    wrongTurn:"Pogrešno! Potez →",outOfGuesses:"Nema pokušaja. Potez →",endedTurn:"završio je potez.",
    waiting:"Čeka se šef špijun…",redWins:"🔴 CRVENI pobjeđuju!",blueWins:"🔵 PLAVI pobjeđuju!",assassinLog:"💀 UBICA!",spymasterOnce:"Ova uloga je trajna za cijelu igru.",youAreSpy:"Ti si šef špijun",spyTaken:"Šef špijun zauzet",becomeSpy:"Postani šef špijun",share:"PODIJELI",waiting:"Čekanje…",howToPlay:"KAKO SE IGRA",
  },
  uk: {
    title:"АГЕНТ X",subtitle:"ОПЕРАТИВНА ГРА СЛІВ",difficulty:"СКЛАДНІСТЬ",
    easy:"🟢  Легко",hard:"🔴  Важко",easyDesc:"Звичайні слова — для всіх вікових груп",
    hardDesc:"Абстрактні та хитрі слова — жорстоко для шпигунів",language:"МОВА",
    gameCode:"КОД ГРИ",gameCodeDesc:"Всі мають ввести однаковий код для однакового поля",
    leaveBlank:"Залиш порожнім для автоматичного генерування.",generated:"Згенеровано:",
    deploy:"РОЗГОРНУТИ АГЕНТІВ",sameBoard:"Однаковий код + складність + мова = однакове поле",
    lobby:"← ЛОБІ",newGame:"НОВА ГРА",sameCode:"ТОЙ САМИЙ КОД",newCode:"НОВИЙ КОД",playAgain:"ГРАТИ ЗНОВУ",
    shareCode:"поділіться з усіма гравцями",redTeam:"ЧЕРВОНА КОМАНДА",blueTeam:"СИНЯ КОМАНДА",
    cluePlaceholder:"Ключове слово...",countPlaceholder:"#",giveClue:"ДАТИ ПІДКАЗКУ",
    spymaster:"ШПИГУН-МАЙСТЕР",endTurn:"ЗАВЕРШИТИ ХІД",clueLabel:"Підказка:",guessesLeft:"Спроби:",
    confirmGuess:"ПІДТВЕРДИТИ",revealQ:"Відкрити цю карту? Це не можна скасувати.",
    cancel:"СКАСУВАТИ",revealIt:"ВІДКРИТИ",spymasterMode:"РЕЖИМ ШПИГУН-МАЙСТЕРА",
    spymasterWarn:"Це відкриє всі кольори карт.",
    spymasterWarn2:"Лише шпигун-майстер повинен дивитися на цей екран!",
    iAmSpy:"Я ШПИГУН-МАЙСТЕР",wins:"КОМАНДА ПЕРЕМАГАЄ!",assassin:"ВБИВЦЯ",
    footerSpy:"🕵️ Шпигун-майстер дає слово + число",footerOp:"🔍 Торкніться карти та підтвердіть",
    footerAvoid:"☠️ Уникайте вбивці",footerWin:"🏆 Відкрийте всі свої карти щоб виграти",
    gameLog:"ЖУРНАЛ ГРИ",noMoves:"Ще немає ходів...",spymasterLog:"Шпигун:",
    wrongTurn:"Неправильно! Хід →",outOfGuesses:"Немає спроб. Хід →",endedTurn:"завершив хід.",
    waiting:"Чекаємо шпигуна-майстра…",redWins:"🔴 ЧЕРВОНІ виграють!",blueWins:"🔵 СИНІ виграють!",assassinLog:"💀 ВБИВЦЯ!",spymasterOnce:"Ця роль є постійною на всю гру.",youAreSpy:"Ви шпигун-майстер",spyTaken:"Шпигун-майстер зайнятий",becomeSpy:"Стати шпигуном-майстром",share:"ПОДІЛИТИСЬ",waiting:"Очікування…",howToPlay:"ЯК ГРАТИ",
  },
  ru: {
    title:"АГЕНТ X",subtitle:"ОПЕРАТИВНАЯ ИГРА СЛОВ",difficulty:"СЛОЖНОСТЬ",
    easy:"🟢  Легко",hard:"🔴  Сложно",easyDesc:"Обычные слова — для всех возрастов",
    hardDesc:"Абстрактные и хитрые слова — жёстко для шпионов",language:"ЯЗЫК",
    gameCode:"КОД ИГРЫ",gameCodeDesc:"Все должны ввести одинаковый код для одинакового поля",
    leaveBlank:"Оставь пустым для автогенерации.",generated:"Сгенерировано:",
    deploy:"РАЗВЕРНУТЬ АГЕНТОВ",sameBoard:"Одинаковый код + сложность + язык = одинаковое поле",
    lobby:"← ЛОББИ",newGame:"НОВАЯ ИГРА",sameCode:"ТОТ ЖЕ КОД",newCode:"НОВЫЙ КОД",playAgain:"ИГРАТЬ СНОВА",
    shareCode:"поделитесь со всеми игроками",redTeam:"КРАСНАЯ КОМАНДА",blueTeam:"СИНЯЯ КОМАНДА",
    cluePlaceholder:"Ключевое слово...",countPlaceholder:"#",giveClue:"ДАТЬ ПОДСКАЗКУ",
    spymaster:"ШПИОН-МАСТЕР",endTurn:"ЗАВЕРШИТЬ ХОД",clueLabel:"Подсказка:",guessesLeft:"Попытки:",
    confirmGuess:"ПОДТВЕРДИТЬ",revealQ:"Открыть эту карту? Это нельзя отменить.",
    cancel:"ОТМЕНА",revealIt:"ОТКРЫТЬ",spymasterMode:"РЕЖИМ ШПИОН-МАСТЕРА",
    spymasterWarn:"Это откроет все цвета карт.",
    spymasterWarn2:"Только шпион-мастер должен смотреть на этот экран!",
    iAmSpy:"Я ШПИОН-МАСТЕР",wins:"КОМАНДА ПОБЕЖДАЕТ!",assassin:"УБИЙЦА",
    footerSpy:"🕵️ Шпион-мастер даёт слово + число",footerOp:"🔍 Нажмите на карту и подтвердите",
    footerAvoid:"☠️ Избегайте убийцы",footerWin:"🏆 Откройте все свои карты чтобы выиграть",
    gameLog:"ЖУРНАЛ ИГРЫ",noMoves:"Ходов ещё нет...",spymasterLog:"Шпион:",
    wrongTurn:"Неверно! Ход →",outOfGuesses:"Нет попыток. Ход →",endedTurn:"завершил ход.",
    waiting:"Ждём шпиона-мастера…",redWins:"🔴 КРАСНЫЕ выигрывают!",blueWins:"🔵 СИНИЕ выигрывают!",assassinLog:"💀 УБИЙЦА!",spymasterOnce:"Эта роль постоянна на всю игру.",youAreSpy:"Вы шпион-мастер",spyTaken:"Шпион-мастер занят",becomeSpy:"Стать шпионом-мастером",share:"ПОДЕЛИТЬСЯ",waiting:"Ожидание…",howToPlay:"КАК ИГРАТЬ",
  },
  pl: {
    title:"AGENT X",subtitle:"OPERATYWNA GRA SŁOWNA",difficulty:"POZIOM",
    easy:"🟢  Łatwy",hard:"🔴  Trudny",easyDesc:"Codzienne słowa — dla wszystkich grup wiekowych",
    hardDesc:"Abstrakcyjne i podchwytliwe słowa — brutalne dla szpiegów",language:"JĘZYK",
    gameCode:"KOD GRY",gameCodeDesc:"Wszyscy muszą wpisać ten sam kod",
    leaveBlank:"Pozostaw puste dla automatycznego kodu.",generated:"Wygenerowano:",
    deploy:"ROZMIEŚĆ AGENTÓW",sameBoard:"Ten sam kod + poziom + język = identyczna plansza",
    lobby:"← LOBBY",newGame:"NOWA GRA",sameCode:"TEN SAM KOD",newCode:"NOWY KOD",playAgain:"ZAGRAJ PONOWNIE",
    shareCode:"udostępnij wszystkim graczom",redTeam:"CZERWONA DRUŻYNA",blueTeam:"NIEBIESKA DRUŻYNA",
    cluePlaceholder:"Słowo wskazówka...",countPlaceholder:"#",giveClue:"DAJ WSKAZÓWKĘ",
    spymaster:"SZPIEG-MISTRZ",endTurn:"ZAKOŃCZ TURĘ",clueLabel:"Wskazówka:",guessesLeft:"Próby:",
    confirmGuess:"POTWIERDŹ",revealQ:"Odkryć tę kartę? Tego nie można cofnąć.",
    cancel:"ANULUJ",revealIt:"ODKRYJ",spymasterMode:"TRYB SZPIEGA-MISTRZA",
    spymasterWarn:"To ujawni wszystkie kolory kart.",
    spymasterWarn2:"Tylko szpieg-mistrz powinien patrzeć na ten ekran!",
    iAmSpy:"JESTEM SZPIEGIEM-MISTRZEM",wins:"DRUŻYNA WYGRYWA!",assassin:"ZABÓJCA",
    footerSpy:"🕵️ Szpieg-mistrz daje słowo + liczbę",footerOp:"🔍 Dotknij karty i potwierdź",
    footerAvoid:"☠️ Unikaj zabójcy",footerWin:"🏆 Odkryj wszystkie swoje karty by wygrać",
    gameLog:"DZIENNIK GRY",noMoves:"Jeszcze żadnych ruchów...",spymasterLog:"Szpieg:",
    wrongTurn:"Błąd! Tura →",outOfGuesses:"Brak prób. Tura →",endedTurn:"zakończył turę.",
    waiting:"Czekamy na szpiega-mistrza…",redWins:"🔴 CZERWONI wygrywają!",blueWins:"🔵 NIEBIESCY wygrywają!",assassinLog:"💀 ZABÓJCA!",spymasterOnce:"Ta rola jest stała przez całą grę.",youAreSpy:"Jesteś szpiegiem-mistrzem",spyTaken:"Szpieg-mistrz zajęty",becomeSpy:"Zostań szpiegiem-mistrzem",share:"UDOSTĘPNIJ",waiting:"Oczekiwanie…",howToPlay:"JAK GRAĆ",
  },
};

// ══════════════════════════════════════════════════════════════════════════════
// HOW TO PLAY — step-by-step rules in every supported language
// ══════════════════════════════════════════════════════════════════════════════
const HTP = {
  en: {
    title: "HOW TO PLAY",
    close: "GOT IT!",
    steps: [
      { icon:"🃏", h:"The Setup",       b:"25 word cards are placed on the board. Red Team and Blue Team each have a set of secret agents to uncover. One card is the deadly Assassin — avoid it at all costs!" },
      { icon:"🕵️", h:"Become Spymaster", b:"One player per team taps 'Become Spymaster'. The Spymaster sees ALL card colors and must keep that secret. Operatives look away while the Spymaster claims the role." },
      { icon:"💬", h:"Give a Clue",     b:"The active Spymaster says ONE word + a number (e.g. 'Ocean 3'). The word must relate to exactly that many of your team's cards. No pointing, gesturing, or extra hints!" },
      { icon:"🔍", h:"Guess",           b:"Operatives discuss, then tap a card and confirm to reveal it. Reveal a team card = keep guessing (up to clue number + 1 total guesses). Reveal the wrong color = turn ends immediately." },
      { icon:"⬜", h:"Neutral Cards",   b:"Gray neutral cards belong to neither team. Revealing one ends your turn right away — no harm done, but you've wasted a guess." },
      { icon:"☠️", h:"The Assassin",    b:"Reveal the black Assassin card and your team LOSES the game instantly. Tread very carefully with risky guesses!" },
      { icon:"🏆", h:"Victory",         b:"The first team to reveal ALL of their color cards wins! Red needs to find 9, Blue needs to find 8 (or vice versa — the starting team always has one more)." },
    ],
  },
  es: {
    title: "CÓMO JUGAR",
    close: "¡ENTENDIDO!",
    steps: [
      { icon:"🃏", h:"Preparación",       b:"25 cartas de palabras se colocan en el tablero. El Equipo Rojo y el Equipo Azul tienen cada uno agentes secretos que descubrir. Una carta es el peligroso Asesino — ¡evítala a toda costa!" },
      { icon:"🕵️", h:"Ser Espía Jefe",   b:"Un jugador por equipo pulsa 'Ser espía jefe'. El Espía Jefe ve TODOS los colores y debe guardar el secreto. Los operativos apartan la vista mientras el Espía Jefe toma su rol." },
      { icon:"💬", h:"Dar una Pista",     b:"El Espía Jefe activo dice UNA palabra + un número (ej. 'Océano 3'). La palabra debe relacionarse con ese número de cartas de tu equipo. ¡Nada de señalar ni pistas extra!" },
      { icon:"🔍", h:"Adivinar",          b:"Los operativos debaten, luego tocan una carta y confirman para revelarla. Carta correcta = seguir adivinando (hasta número + 1 adivinanzas). Color incorrecto = el turno termina." },
      { icon:"⬜", h:"Cartas Neutrales",  b:"Las cartas grises neutras no pertenecen a ningún equipo. Revelar una acaba el turno — sin daño grave, pero pierdes una adivinanza." },
      { icon:"☠️", h:"El Asesino",        b:"¡Revela la carta negra del Asesino y tu equipo PIERDE al instante! Ten mucho cuidado con las adivinanzas arriesgadas." },
      { icon:"🏆", h:"Victoria",          b:"¡El primer equipo en revelar TODAS sus cartas de color gana! El equipo que empieza tiene una carta más para encontrar." },
    ],
  },
  fr: {
    title: "COMMENT JOUER",
    close: "COMPRIS !",
    steps: [
      { icon:"🃏", h:"Mise en place",     b:"25 cartes sont placées sur le plateau. Les équipes Rouge et Bleue ont chacune des agents secrets à découvrir. Une carte est le redoutable Assassin — évitez-le à tout prix !" },
      { icon:"🕵️", h:"Devenir Espion Chef", b:"Un joueur par équipe appuie sur 'Devenir espion chef'. L'Espion Chef voit TOUTES les couleurs et doit garder le secret. Les opérateurs regardent ailleurs pendant qu'il prend son rôle." },
      { icon:"💬", h:"Donner un indice",  b:"L'Espion Chef actif dit UN mot + un nombre (ex. 'Océan 3'). Le mot doit relier exactement ce nombre de cartes de votre équipe. Pas de pointage ni d'autres indices !" },
      { icon:"🔍", h:"Deviner",           b:"Les opérateurs discutent, puis tapent une carte et confirment pour la révéler. Bonne carte = continuer (jusqu'à nombre + 1 devinettes). Mauvaise couleur = fin du tour." },
      { icon:"⬜", h:"Cartes neutres",    b:"Les cartes grises neutres n'appartiennent à personne. En révéler une termine immédiatement votre tour sans autre conséquence." },
      { icon:"☠️", h:"L'Assassin",        b:"Révélez la carte noire de l'Assassin et votre équipe PERD instantanément ! Méfiez-vous des suppositions risquées." },
      { icon:"🏆", h:"Victoire",          b:"La première équipe à révéler TOUTES ses cartes de couleur gagne ! L'équipe qui commence a toujours une carte de plus à trouver." },
    ],
  },
  de: {
    title: "ANLEITUNG",
    close: "VERSTANDEN!",
    steps: [
      { icon:"🃏", h:"Aufbau",            b:"25 Wortkarten werden auf das Spielfeld gelegt. Das Rote und das Blaue Team haben jeweils geheime Agenten aufzudecken. Eine Karte ist der tödliche Attentäter — vermeide sie unbedingt!" },
      { icon:"🕵️", h:"Spymaster werden", b:"Ein Spieler pro Team tippt auf 'Spymaster werden'. Der Spymaster sieht ALLE Farben und muss das geheim halten. Operatoren schauen weg, während der Spymaster seine Rolle übernimmt." },
      { icon:"💬", h:"Hinweis geben",     b:"Der aktive Spymaster sagt EIN Wort + eine Zahl (z.B. 'Ozean 3'). Das Wort muss genau so viele Karten deines Teams verbinden. Kein Zeigen oder zusätzliche Hinweise!" },
      { icon:"🔍", h:"Raten",             b:"Operatoren beraten sich, tippen eine Karte und bestätigen zum Aufdecken. Richtige Karte = weitermachen (bis Zahl + 1 Versuche). Falsche Farbe = Zug endet sofort." },
      { icon:"⬜", h:"Neutrale Karten",   b:"Graue neutrale Karten gehören keinem Team. Eine aufzudecken beendet deinen Zug sofort — kein großer Schaden, aber ein Versuch verschwendet." },
      { icon:"☠️", h:"Der Attentäter",    b:"Deckt ihr die schwarze Attentäter-Karte auf, verliert euer Team SOFORT! Seid sehr vorsichtig bei riskanten Tipp-Versuchen." },
      { icon:"🏆", h:"Sieg",              b:"Das erste Team, das ALLE seine Farbkarten aufdeckt, gewinnt! Das beginnende Team hat immer eine Karte mehr zu finden." },
    ],
  },
  pt: {
    title: "COMO JOGAR",
    close: "PERCEBI!",
    steps: [
      { icon:"🃏", h:"Preparação",        b:"25 cartas de palavras são colocadas no tabuleiro. As equipas Vermelha e Azul têm cada uma agentes secretos a descobrir. Uma carta é o perigoso Assassino — evita-o a todo o custo!" },
      { icon:"🕵️", h:"Ser Espião Chefe", b:"Um jogador por equipa toca em 'Tornar-se espião chefe'. O Espião Chefe vê TODAS as cores e deve guardar segredo. Os operativos desviam o olhar enquanto o Espião Chefe assume o papel." },
      { icon:"💬", h:"Dar uma Pista",     b:"O Espião Chefe ativo diz UMA palavra + um número (ex. 'Oceano 3'). A palavra deve relacionar-se com exatamente esse número de cartas da tua equipa. Sem apontar nem pistas extra!" },
      { icon:"🔍", h:"Adivinhar",         b:"Os operativos debatem, depois tocam numa carta e confirmam para revelar. Carta certa = continuar (até número + 1 tentativas). Cor errada = fim da vez." },
      { icon:"⬜", h:"Cartas Neutras",    b:"As cartas cinzentas neutras não pertencem a nenhuma equipa. Revelar uma termina imediatamente a vez — sem grande dano, mas perdeste uma tentativa." },
      { icon:"☠️", h:"O Assassino",       b:"Revela a carta preta do Assassino e a tua equipa PERDE instantaneamente! Cuidado redobrado com tentativas arriscadas." },
      { icon:"🏆", h:"Vitória",           b:"A primeira equipa a revelar TODAS as suas cartas coloridas ganha! A equipa que começa tem sempre uma carta a mais para encontrar." },
    ],
  },
  it: {
    title: "COME GIOCARE",
    close: "CAPITO!",
    steps: [
      { icon:"🃏", h:"Preparazione",      b:"25 carte di parole vengono posizionate sul tabellone. La Squadra Rossa e la Squadra Blu hanno ciascuna degli agenti segreti da scoprire. Una carta è il pericoloso Assassino — evitala a tutti i costi!" },
      { icon:"🕵️", h:"Diventare Capo Spia", b:"Un giocatore per squadra tocca 'Diventa capo spia'. Il Capo Spia vede TUTTI i colori e deve mantenere il segreto. Gli operativi guardano altrove mentre il Capo Spia prende il ruolo." },
      { icon:"💬", h:"Dare un Indizio",   b:"Il Capo Spia attivo dice UNA parola + un numero (es. 'Oceano 3'). La parola deve collegare esattamente quel numero di carte della tua squadra. Niente indicazioni o indizi extra!" },
      { icon:"🔍", h:"Indovinare",        b:"Gli operativi discutono, poi toccano una carta e confermano per rivelarla. Carta giusta = continuare (fino a numero + 1 tentativi). Colore sbagliato = fine del turno." },
      { icon:"⬜", h:"Carte Neutre",      b:"Le carte grigie neutre non appartengono a nessuna squadra. Rivelarne una termina immediatamente il turno — nessun danno grave, ma un tentativo sprecato." },
      { icon:"☠️", h:"L'Assassino",       b:"Rivela la carta nera dell'Assassino e la tua squadra PERDE istantaneamente! Attenzione con le ipotesi rischiose." },
      { icon:"🏆", h:"Vittoria",          b:"La prima squadra a rivelare TUTTE le proprie carte colorite vince! La squadra che inizia ha sempre una carta in più da trovare." },
    ],
  },
  me: {
    title: "KAKO SE IGRA",
    close: "SHVATIO SAM!",
    steps: [
      { icon:"🃏", h:"Postavljanje",      b:"25 karata s riječima se postavlja na tablu. Crveni i Plavi tim imaju tajne agente koje treba otkriti. Jedna karta je opasni Ubica — izbjegni ga po svaku cijenu!" },
      { icon:"🕵️", h:"Postani Šef Špijun", b:"Jedan igrač po timu tapne 'Postani šef špijun'. Šef Špijun vidi SVE boje karata i mora čuvati tajnu. Operativci gledaju na drugu stranu dok Šef Špijun preuzima ulogu." },
      { icon:"💬", h:"Daj Nagovjještaj", b:"Aktivni Šef Špijun kaže JEDNU riječ + broj (npr. 'Okean 3'). Riječ mora odgovarati tačno toliko karata tvog tima. Bez pokazivanja ili dodatnih nagovjještaja!" },
      { icon:"🔍", h:"Pogodi",            b:"Operativci se dogovaraju, pa tapnu kartu i potvrde za otkrivanje. Ispravna karta = nastavi (do broj + 1 pokušaja). Pogrešna boja = potez se odmah završava." },
      { icon:"⬜", h:"Neutralne Karte",   b:"Sive neutralne karte ne pripadaju ni jednom timu. Otkriti jednu odmah završava potez — bez velike štete, ali gubiš pokušaj." },
      { icon:"☠️", h:"Ubica",             b:"Otkrij crnu kartu Ubice i tvoj tim GUBI odmah! Budi jako oprezan s rizičnim pogađanjima." },
      { icon:"🏆", h:"Pobjeda",           b:"Prvi tim koji otkrije SVE karte svoje boje pobjeđuje! Tim koji počinje uvijek ima jednu kartu više za pronaći." },
    ],
  },
  uk: {
    title: "ЯК ГРАТИ",
    close: "ЗРОЗУМІЛО!",
    steps: [
      { icon:"🃏", h:"Підготовка",        b:"25 карток зі словами розкладаються на полі. Червона та Синя команди мають знайти своїх таємних агентів. Одна картка — смертоносний Вбивця — уникай її за будь-яку ціну!" },
      { icon:"🕵️", h:"Стати Шпигуном-Майстром", b:"Один гравець від команди натискає 'Стати шпигуном-майстром'. Шпигун-Майстер бачить УСІ кольори та мусить зберігати таємницю. Оперативники відвертаються, поки він бере роль." },
      { icon:"💬", h:"Дати Підказку",     b:"Активний Шпигун-Майстер говорить ОДНЕ слово + число (напр. 'Океан 3'). Слово має відповідати рівно стільки карткам твоєї команди. Без жестів та додаткових підказок!" },
      { icon:"🔍", h:"Вгадувати",         b:"Оперативники обговорюють, потім торкаються картки та підтверджують для розкриття. Правильна картка = продовжуй (до числа + 1 спроб). Неправильний колір = хід одразу закінчується." },
      { icon:"⬜", h:"Нейтральні Картки", b:"Сірі нейтральні картки не належать жодній команді. Відкриття такої одразу завершує хід — без великої шкоди, але ти втрачаєш спробу." },
      { icon:"☠️", h:"Вбивця",            b:"Відкрий чорну картку Вбивці — і твоя команда ПРОГРАЄ миттєво! Дуже обережно з ризикованими здогадками." },
      { icon:"🏆", h:"Перемога",          b:"Перша команда, яка відкриє ВСІ свої кольорові картки, перемагає! Команда, що починає, завжди має на одну картку більше." },
    ],
  },
  ru: {
    title: "КАК ИГРАТЬ",
    close: "ПОНЯЛ!",
    steps: [
      { icon:"🃏", h:"Подготовка",        b:"25 карточек со словами раскладываются на поле. У Красной и Синей команд есть тайные агенты, которых нужно найти. Одна карточка — смертоносный Убийца — избегайте его любой ценой!" },
      { icon:"🕵️", h:"Стать Шпионом-Мастером", b:"Один игрок от команды нажимает 'Стать шпионом-мастером'. Шпион-Мастер видит ВСЕ цвета и должен хранить тайну. Оперативники отворачиваются, пока он берёт роль." },
      { icon:"💬", h:"Дать Подсказку",    b:"Активный Шпион-Мастер говорит ОДНО слово + число (напр. 'Океан 3'). Слово должно соответствовать ровно столькому числу карточек твоей команды. Без жестов и дополнительных подсказок!" },
      { icon:"🔍", h:"Угадывать",         b:"Оперативники обсуждают, затем нажимают на карточку и подтверждают для раскрытия. Правильная карточка = продолжать (до числа + 1 попыток). Неверный цвет = ход заканчивается немедленно." },
      { icon:"⬜", h:"Нейтральные Карточки", b:"Серые нейтральные карточки не принадлежат ни одной команде. Открыть такую — сразу конец хода, без большого вреда, но попытка потрачена." },
      { icon:"☠️", h:"Убийца",            b:"Открой чёрную карточку Убийцы — и твоя команда ПРОИГРЫВАЕТ мгновенно! Будь очень осторожен с рискованными угадываниями." },
      { icon:"🏆", h:"Победа",            b:"Первая команда, раскрывшая ВСЕ свои цветные карточки, побеждает! У начинающей команды всегда на одну карточку больше." },
    ],
  },
  pl: {
    title: "JAK GRAĆ",
    close: "ROZUMIEM!",
    steps: [
      { icon:"🃏", h:"Przygotowanie",     b:"25 kart ze słowami jest rozłożonych na planszy. Czerwona i Niebieska drużyna mają każda tajnych agentów do odnalezienia. Jedna karta to niebezpieczny Zabójca — unikaj go za wszelką cenę!" },
      { icon:"🕵️", h:"Zostać Szpiegiem-Mistrzem", b:"Jeden gracz w drużynie naciska 'Zostań szpiegiem-mistrzem'. Szpieg-Mistrz widzi WSZYSTKIE kolory i musi zachować to w tajemnicy. Operatywni odwracają wzrok, gdy przejmuje rolę." },
      { icon:"💬", h:"Dać Wskazówkę",     b:"Aktywny Szpieg-Mistrz podaje JEDNO słowo + liczbę (np. 'Ocean 3'). Słowo musi pasować dokładnie do tylu kart swojej drużyny. Bez wskazywania ani dodatkowych podpowiedzi!" },
      { icon:"🔍", h:"Zgadywać",          b:"Operatywni dyskutują, dotykają karty i potwierdzają, by ją odkryć. Poprawna karta = kontynuuj (do liczby + 1 prób). Zły kolor = tura kończy się natychmiast." },
      { icon:"⬜", h:"Karty Neutralne",   b:"Szare neutralne karty nie należą do żadnej drużyny. Odkrycie takiej natychmiast kończy turę — bez wielkiej szkody, ale tracisz próbę." },
      { icon:"☠️", h:"Zabójca",           b:"Odkryj czarną kartę Zabójcy — a twoja drużyna PRZEGRYWA natychmiast! Bądź bardzo ostrożny z ryzykownymi zgadywaniami." },
      { icon:"🏆", h:"Wygrana",           b:"Pierwsza drużyna, która odkryje WSZYSTKIE swoje kolorowe karty, wygrywa! Drużyna zaczynająca zawsze ma jedną kartę więcej do znalezienia." },
    ],
  },
};

// ══════════════════════════════════════════════════════════════════════════════
// WORD BANKS
// ══════════════════════════════════════════════════════════════════════════════
// 2000 easy words per language (drawn from pool, 25 used per game)
// 500 hard words per language
import enWords from './words/en.json';
import esWords from './words/es.json';
import frWords from './words/fr.json';
import deWords from './words/de.json';
import ptWords from './words/pt.json';
import itWords from './words/it.json';
import meWords from './words/me.json';
import ukWords from './words/uk.json';
import ruWords from './words/ru.json';
import plWords from './words/pl.json';

const WORDS = {
  en: enWords,
  es: esWords,
  fr: frWords,
  de: deWords,
  pt: ptWords,
  it: itWords,
  me: meWords,
  uk: ukWords,
  ru: ruWords,
  pl: plWords,
};



// ══════════════════════════════════════════════════════════════════════════════
// SEEDED RNG + BOARD GENERATION
// ══════════════════════════════════════════════════════════════════════════════
function hashCode(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  return h >>> 0;
}
function makeRng(seed) {
  let s = hashCode(String(seed));
  return () => {
    s += 0x6D2B79F5;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function seededShuffle(arr, rng) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const ADJS  = ["AMBER","BRASS","COBALT","DUSK","EMBER","FROST","GRIM","HOLLOW","IRON","JADE",
               "KEEN","LUNAR","MOSS","NOIR","ONYX","PALE","QUIET","RUST","STEEL","THORN",
               "ULTRA","VELVET","WILD","XENON","YELLOW","ZINC","ARCTIC","BOLD","CRISP","DARK"];
const NOUNS = ["ARROW","BADGE","CRANE","DAGGER","ECHO","FORGE","GHOST","HAVEN","IRIS","JUNIPER",
               "KNELL","LANCE","MARSH","NEXUS","ORBIT","PRISM","QUILL","RAVEN","SPHINX","TORCH",
               "UMBRA","VAPOR","WRAITH","XRAY","YONDER","ZENITH","ANCHOR","BASIN","CIPHER","DELTA"];
function generateCode() {
  const rng = makeRng(Date.now() + Math.random() * 1e9);
  return `${ADJS[Math.floor(rng()*ADJS.length)]}-${NOUNS[Math.floor(rng()*NOUNS.length)]}-${Math.floor(rng()*900)+100}`;
}
const TEAM = { RED:"red", BLUE:"blue", NEUTRAL:"neutral", ASSASSIN:"assassin" };
function generateBoard(code, difficulty, lang, round = 0) {
  const pool = WORDS[lang][difficulty];
  // How many non-overlapping 25-word games fit in the pool before recycling
  const gamesPerCycle = Math.floor(pool.length / 25);
  const cycle = Math.floor(round / gamesPerCycle);
  const posInCycle = round % gamesPerCycle;
  // Shuffle the full pool once per cycle so every game in a cycle uses unique words
  const poolRng = makeRng(`${code}::${difficulty}::${lang}::cycle${cycle}`);
  const shuffledPool = seededShuffle(pool, poolRng);
  const words = shuffledPool.slice(posInCycle * 25, (posInCycle + 1) * 25);
  // Randomise card colour assignments independently each round
  const assignRng = makeRng(`${code}::${difficulty}::${lang}::assign${round}`);
  const assignments = seededShuffle([
    ...Array(9).fill(TEAM.RED), ...Array(8).fill(TEAM.BLUE),
    ...Array(7).fill(TEAM.NEUTRAL), TEAM.ASSASSIN,
  ], assignRng);
  return words.map((word, i) => ({ word, team: assignments[i], revealed: false }));
}
function buildInitialState(code, difficulty, lang, round = 0) {
  return {
    board: generateBoard(code, difficulty, lang, round),
    currentTeam: TEAM.RED,
    clue: "", clueCount: "",
    activeClue: null, guessesLeft: 0,
    winner: null, log: [],
    redSpymaster: null,   // player id
    blueSpymaster: null,  // player id
    code, difficulty, lang, round,
  };
}

// ══════════════════════════════════════════════════════════════════════════════
// FIREBASE
// ══════════════════════════════════════════════════════════════════════════════
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, update, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBLkNtbUbMEv4J6qorVgey-phWHlimcBg8",
  authDomain: "codenames-54c07.firebaseapp.com",
  databaseURL: "https://codenames-54c07-default-rtdb.firebaseio.com",
  projectId: "codenames-54c07",
  storageBucket: "codenames-54c07.firebasestorage.app",
  messagingSenderId: "992070819317",
  appId: "1:992070819317:web:1b6a24109a5bf5efc114bc"
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);

// stable per-browser player id
function getPlayerId() {
  let id = sessionStorage.getItem("agentx_pid");
  if (!id) { id = Math.random().toString(36).slice(2,10); sessionStorage.setItem("agentx_pid", id); }
  return id;
}

// ══════════════════════════════════════════════════════════════════════════════
// STYLES
// ══════════════════════════════════════════════════════════════════════════════
const COLORS = {
  red:      { bg:"#b83232", text:"#fff",    border:"#7a1f1f" },
  blue:     { bg:"#1f5fa6", text:"#fff",    border:"#133d6e" },
  neutral:  { bg:"var(--c-neutral-bg)", text:"var(--c-neutral-text)", border:"var(--c-neutral-border)" },
  assassin: { bg:"#111827", text:"#e0e0e0", border:"#000"    },
};
const CARD_IDLE    = { bg:"var(--c-card-idle-bg)",    text:"var(--c-card-idle-text)",    border:"var(--c-card-idle-border)" };
const CARD_PENDING = { bg:"var(--c-card-pending-bg)", text:"var(--c-card-pending-text)", border:"var(--c-card-pending-border)" };
const BASE = { fontFamily:"Georgia, serif" };

function ghostBtn(color, fontSize="11px", pad="8px 16px") {
  return { ...BASE, background:"transparent", border:`1px solid ${color}`, borderRadius:"6px",
    color, padding:pad, fontSize, letterSpacing:"2px", cursor:"pointer",
    textTransform:"uppercase", transition:"all 0.15s", WebkitTapHighlightColor:"transparent" };
}
const inputSt = {
  ...BASE, background:"var(--c-input-bg)", border:"1px solid var(--c-border-input)", borderRadius:"6px",
  color:"var(--c-text)", padding:"10px 12px", fontSize:"15px", outline:"none",
  letterSpacing:"1px", WebkitAppearance:"none",
};

// ══════════════════════════════════════════════════════════════════════════════
// MODAL
// ══════════════════════════════════════════════════════════════════════════════
function Modal({ children }) {
  return (
    <div style={{ position:"fixed", inset:0, zIndex:200, background:"rgba(0,0,0,0.8)",
      display:"flex", alignItems:"center", justifyContent:"center", padding:"20px" }}>
      <div style={{ ...BASE, background:"var(--c-modal-bg)", border:"2px solid var(--c-border-accent)", borderRadius:"16px",
        padding:"32px 28px", maxWidth:"380px", width:"100%",
        boxShadow:"0 20px 60px rgba(0,0,0,0.8)", textAlign:"center" }}>
        {children}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// HOW TO PLAY MODAL
// ══════════════════════════════════════════════════════════════════════════════
function HowToPlayModal({ lang, onClose }) {
  const htp = HTP[lang] || HTP.en;
  return (
    <div style={{ position:"fixed", inset:0, zIndex:300, background:"rgba(0,0,0,0.85)",
      display:"flex", alignItems:"center", justifyContent:"center", padding:"16px" }}
      onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{ ...BASE,
        background:"var(--c-modal-bg)", border:"2px solid var(--c-border-accent)",
        borderRadius:"16px", padding:"24px 20px", maxWidth:"480px", width:"100%",
        maxHeight:"88vh", display:"flex", flexDirection:"column",
        boxShadow:"0 24px 80px rgba(0,0,0,0.9)" }}>

        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"18px" }}>
          <div style={{ fontSize:"11px", letterSpacing:"4px", color:"var(--c-accent-strong)", fontWeight:"bold" }}>
            {htp.title}
          </div>
          <button onClick={onClose} style={{ ...ghostBtn("var(--c-accent)","13px","4px 10px"), letterSpacing:0 }}>✕</button>
        </div>

        {/* Steps — scrollable */}
        <div style={{ overflowY:"auto", display:"flex", flexDirection:"column", gap:"10px", flex:1 }}>
          {htp.steps.map((s, i) => (
            <div key={i} style={{ display:"flex", gap:"12px", alignItems:"flex-start",
              padding:"12px 14px", borderRadius:"10px",
              background:"var(--c-bg-panel)", border:"1px solid var(--c-border-accent)" }}>
              <div style={{ fontSize:"22px", flexShrink:0, lineHeight:"1" }}>{s.icon}</div>
              <div>
                <div style={{ fontSize:"11px", letterSpacing:"2px", fontWeight:"bold",
                  color:"var(--c-accent-strong)", marginBottom:"4px", textTransform:"uppercase" }}>
                  {s.h}
                </div>
                <div style={{ fontSize:"12px", color:"var(--c-text)", lineHeight:"1.6" }}>{s.b}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Close button */}
        <button onClick={onClose} style={{ ...BASE, marginTop:"18px",
          background:"var(--c-deploy-btn)", color:"var(--c-deploy-btn-text)",
          border:"none", borderRadius:"8px", padding:"12px", fontSize:"12px",
          letterSpacing:"3px", fontWeight:"bold", cursor:"pointer", textTransform:"uppercase",
          WebkitTapHighlightColor:"transparent" }}>
          {htp.close}
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// LOBBY
// ══════════════════════════════════════════════════════════════════════════════
function Lobby({ onStart, initialCode, darkMode, onToggleDark }) {
  const [inputCode, setInputCode]   = useState(initialCode || "");
  const [difficulty, setDifficulty] = useState("easy");
  const [lang, setLang]             = useState("en");
  const [lastGen, setLastGen]       = useState("");
  const [loading, setLoading]       = useState(false);
  const [showHTP, setShowHTP]       = useState(false);
  const T = UI[lang];

  const handleGenerate = () => { const c = generateCode(); setLastGen(c); setInputCode(c); };
  const handleStart = async () => {
    const code = (inputCode.trim().toUpperCase() || generateCode());
    setLoading(true);
    try {
      const gameRef = ref(db, `games/${code}`);
      const snap = await get(gameRef);
      if (snap.exists()) {
        // join existing game, use its settings
        const existing = snap.val();
        onStart(code, existing.difficulty, existing.lang, false);
      } else {
        // create new game
        const state = buildInitialState(code, difficulty, lang);
        await set(gameRef, state);
        onStart(code, difficulty, lang, true);
      }
    } catch (err) {
      console.error("Failed to start game:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight:"100vh", minHeight:"100dvh", background:"var(--c-bg)", ...BASE,
      color:"var(--c-text)", display:"flex", flexDirection:"column", alignItems:"center",
      justifyContent:"center", padding:"32px 16px", boxSizing:"border-box" }}>

      {showHTP && <HowToPlayModal lang={lang} onClose={()=>setShowHTP(false)} />}

      <div style={{ textAlign:"center", marginBottom:"32px" }}>
        <div style={{ fontSize:"clamp(36px,10vw,56px)", letterSpacing:"clamp(6px,3vw,14px)",
          color:"var(--c-accent-strong)", fontStyle:"italic", fontWeight:"bold" }}>{T.title}</div>
        <div style={{ fontSize:"clamp(9px,2.5vw,11px)", letterSpacing:"clamp(3px,1vw,5px)",
          color:"var(--c-text-muted)", marginTop:"6px" }}>{T.subtitle}</div>
        <button onClick={()=>setShowHTP(true)} style={{ ...BASE, marginTop:"14px",
          background:"transparent", border:"1px solid var(--c-border)", borderRadius:"20px",
          color:"var(--c-text-muted)", padding:"6px 18px", fontSize:"10px",
          letterSpacing:"2px", cursor:"pointer", textTransform:"uppercase",
          WebkitTapHighlightColor:"transparent" }}>
          ❓ {T.howToPlay}
        </button>
      </div>

      <div style={{ background:"var(--c-bg-panel)", border:"1px solid var(--c-border)", borderRadius:"16px",
        padding:"clamp(20px,5vw,36px)", width:"100%", maxWidth:"520px",
        boxShadow:"0 12px 40px rgba(0,0,0,0.6)", display:"flex", flexDirection:"column",
        gap:"22px", boxSizing:"border-box" }}>

        {/* Language */}
        <div>
          <div style={{ fontSize:"10px", letterSpacing:"3px", color:"var(--c-text-muted)", marginBottom:"10px" }}>{T.language}</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:"6px" }}>
            {LANGUAGES.map(l => (
              <button key={l.code} onClick={() => setLang(l.code)} style={{
                padding:"8px 2px", fontSize:"10px", border:"1px solid",
                borderColor: lang===l.code ? "var(--c-accent)" : "var(--c-border)",
                borderRadius:"8px", cursor:"pointer", ...BASE,
                background: lang===l.code ? "var(--c-lang-active-bg)" : "var(--c-bg)",
                color: lang===l.code ? "var(--c-accent)" : "var(--c-text-muted)",
                fontWeight: lang===l.code ? "bold" : "normal",
                WebkitTapHighlightColor:"transparent",
              }}>{l.label}</button>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div>
          <div style={{ fontSize:"10px", letterSpacing:"3px", color:"var(--c-text-muted)", marginBottom:"10px" }}>{T.difficulty}</div>
          <div style={{ display:"flex", border:"1px solid var(--c-border)", borderRadius:"8px", overflow:"hidden" }}>
            {["easy","hard"].map(d => (
              <button key={d} onClick={() => setDifficulty(d)} style={{
                flex:1, padding:"12px 8px", fontSize:"13px", letterSpacing:"2px",
                textTransform:"uppercase", border:"none", cursor:"pointer", ...BASE,
                background: difficulty===d ? (d==="easy" ? "#2e6b3e" : "#7a1f1f") : "var(--c-bg)",
                color: difficulty===d ? "#fff" : "var(--c-text-muted)",
                fontWeight: difficulty===d ? "bold" : "normal",
                WebkitTapHighlightColor:"transparent",
              }}>{d==="easy" ? T.easy : T.hard}</button>
            ))}
          </div>
          <div style={{ fontSize:"11px", color:"var(--c-text-dim)", marginTop:"6px" }}>{difficulty==="easy" ? T.easyDesc : T.hardDesc}</div>
        </div>

        {/* Code */}
        <div>
          <div style={{ fontSize:"10px", letterSpacing:"3px", color:"var(--c-text-muted)", marginBottom:"4px" }}>{T.gameCode}</div>
          <div style={{ fontSize:"11px", color:"var(--c-text-dim)", marginBottom:"10px", fontStyle:"italic" }}>{T.gameCodeDesc}</div>
          <div style={{ display:"flex", gap:"8px" }}>
            <input value={inputCode} onChange={e=>setInputCode(e.target.value.toUpperCase())}
              onKeyDown={e=>e.key==="Enter"&&handleStart()} placeholder="e.g.  AMBER-RAVEN-247"
              style={{ ...inputSt, flex:1 }} />
            <button onClick={handleGenerate}
              style={{ ...ghostBtn("var(--c-text-muted)","20px","10px 14px"), letterSpacing:0, flexShrink:0 }}>🎲</button>
          </div>
          {lastGen && <div style={{ fontSize:"11px", color:"var(--c-text-muted)", marginTop:"6px", fontStyle:"italic" }}>
            {T.generated} <strong style={{ color:"var(--c-accent)", letterSpacing:"2px" }}>{lastGen}</strong></div>}
          <div style={{ fontSize:"10px", color:"var(--c-text-dim)", marginTop:"6px" }}>{T.leaveBlank}</div>
        </div>

        <button onClick={handleStart} disabled={loading} style={{
          ...BASE, background: loading ? "var(--c-deploy-loading)" : "var(--c-deploy-btn)", border:"none", borderRadius:"10px",
          color:"var(--c-deploy-btn-text)", padding:"16px", fontSize:"14px", letterSpacing:"4px", cursor: loading ? "default" : "pointer",
          textTransform:"uppercase", fontWeight:"bold", WebkitTapHighlightColor:"transparent",
        }}>{loading ? "..." : T.deploy}</button>
      </div>

      <div style={{ marginTop:"16px", fontSize:"10px", color:"var(--c-text-dim)", letterSpacing:"1px", textAlign:"center", padding:"0 16px" }}>
        {T.sameBoard}
      </div>

      {/* ── Dark / Light toggle ── */}
      <button onClick={onToggleDark} style={{ ...BASE, marginTop:"24px",
        background:"transparent", border:"1px solid var(--c-border)", borderRadius:"20px",
        color:"var(--c-text-muted)", padding:"7px 20px", fontSize:"10px",
        letterSpacing:"2px", cursor:"pointer", textTransform:"uppercase",
        WebkitTapHighlightColor:"transparent" }}>
        {darkMode ? "☀️  Light Mode" : "🌙  Dark Mode"}
      </button>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SCORE BOX
// ══════════════════════════════════════════════════════════════════════════════
function ScoreBox({ team, left, active }) {
  return (
    <div style={{ textAlign:"center", padding:"5px 12px", borderRadius:"6px",
      background:active?(team==="RED"?"rgba(176,34,34,0.2)":"rgba(30,90,160,0.2)"):"transparent",
      border:`1px solid ${active?(team==="RED"?"#b03030":"#1e5aa0"):"var(--c-border)"}`,
      transition:"all 0.3s", minWidth:"44px" }}>
      <div style={{ fontSize:"clamp(16px,5vw,22px)", fontWeight:"bold",
        color:team==="RED"?"#e05050":"#4a9edd" }}>{left}</div>
      <div style={{ fontSize:"9px", letterSpacing:"2px", color:"var(--c-text-muted)" }}>{team}</div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// GAME LOG POPUP
// ══════════════════════════════════════════════════════════════════════════════
function LogPopup({ log, onClose, T }) {
  return (
    <div style={{ position:"fixed", inset:0, zIndex:150, background:"rgba(0,0,0,0.7)",
      display:"flex", alignItems:"flex-end", justifyContent:"flex-end", padding:"20px" }}
      onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{
        ...BASE, background:"var(--c-bg-log)", border:"1px solid var(--c-border)", borderRadius:"12px",
        padding:"20px", width:"min(340px, 92vw)", maxHeight:"70vh",
        boxShadow:"0 8px 40px rgba(0,0,0,0.7)", display:"flex", flexDirection:"column", gap:"0",
      }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"14px" }}>
          <div style={{ fontSize:"10px", letterSpacing:"3px", color:"var(--c-text-muted)" }}>{T.gameLog}</div>
          <button onClick={onClose} style={{ ...ghostBtn("var(--c-text-muted)","14px","4px 10px"), letterSpacing:0 }}>✕</button>
        </div>
        <div style={{ overflowY:"auto", display:"flex", flexDirection:"column", gap:"6px" }}>
          {log.length===0 && <div style={{ fontSize:"11px", color:"var(--c-text-dim)", fontStyle:"italic" }}>{T.noMoves}</div>}
          {log.map((entry,i)=>(
            <div key={i} style={{ fontSize:"11px", lineHeight:"1.5",
              color:i===0?"var(--c-text)":"var(--c-text-muted)", padding:"6px 10px", borderRadius:"6px",
              background:i===0?"var(--c-bg-entry)":"var(--c-bg-entry-alt)",
              borderLeft:i===0?"3px solid var(--c-accent)":"3px solid var(--c-border-dim)" }}>{entry}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN GAME
// ══════════════════════════════════════════════════════════════════════════════
export default function AgentX() {
  // Read code from URL ?code=XXX
  const urlParams  = new URLSearchParams(window.location.search);
  const urlCode    = urlParams.get("code") || "";

  const [screen, setScreen]       = useState(urlCode ? "joining" : "lobby");
  const [gameCode, setGameCode]   = useState(urlCode);
  const [game, setGame]           = useState(null);
  const [confirm, setConfirm]     = useState(null);
  const [showLog, setShowLog]     = useState(false);
  const [logBtnPos, setLogBtnPos] = useState(null); // null = default bottom-right
  const logBtnDragRef             = useRef({});
  const [clueInput, setClueInput] = useState("");
  const [countInput, setCountInput] = useState("");
  const playerId = getPlayerId();

  // ── Dark / light mode toggle ──
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("agentx_theme");
    const isDark = saved === "dark" ? true
                 : saved === "light" ? false
                 : !window.matchMedia("(prefers-color-scheme: light)").matches;
    // Set synchronously so CSS sees it before first paint
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    return isDark;
  });
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    localStorage.setItem("agentx_theme", darkMode ? "dark" : "light");
  }, [darkMode]);
  const toggleDark = () => setDarkMode(v => !v);

  // If URL had a code, jump straight into game
  useEffect(() => {
    if (screen === "joining" && urlCode) {
      joinGame(urlCode);
    }
  }, []);

  const joinGame = async (code) => {
    try {
      const gameRef = ref(db, `games/${code}`);
      const snap = await get(gameRef);
      if (snap.exists()) {
        setGameCode(code);
        setScreen("game");
        subscribeToGame(code);
      } else {
        setScreen("lobby");
      }
    } catch (err) {
      console.error("Failed to join game:", err);
      setScreen("lobby");
    }
  };

  const subscribeToGame = (code) => {
    const gameRef = ref(db, `games/${code}`);
    onValue(gameRef, snap => {
      if (snap.exists()) setGame(snap.val());
    });
  };

  const startGame = (code, diff, lang, isNew) => {
    setGameCode(code);
    setScreen("game");
    subscribeToGame(code);
    // update URL for sharing
    const url = new URL(window.location);
    url.searchParams.set("code", code);
    window.history.pushState({}, "", url);
  };

  const newGame = async () => {
    if (!game) return;
    const state = buildInitialState(gameCode, game.difficulty, game.lang, game.round || 0);
    await set(ref(db, `games/${gameCode}`), state);
    setClueInput(""); setCountInput(""); setConfirm(null);
  };

  const playAgain = async () => {
    if (!game) return;
    const nextRound = (game.round || 0) + 1;
    const state = buildInitialState(gameCode, game.difficulty, game.lang, nextRound);
    await set(ref(db, `games/${gameCode}`), state);
    setClueInput(""); setCountInput(""); setConfirm(null);
  };

  const backToLobby = () => {
    setScreen("lobby"); setGame(null); setConfirm(null);
    setClueInput(""); setCountInput("");
    const url = new URL(window.location);
    url.searchParams.delete("code");
    window.history.pushState({}, "", url);
  };

  // ── derived state ──
  if (screen === "lobby" || screen === "joining") {
    return <Lobby onStart={startGame} initialCode={urlCode} darkMode={darkMode} onToggleDark={toggleDark} />;
  }
  if (!game) {
    return (
      <div style={{ minHeight:"100vh", background:"var(--c-bg)", ...BASE, color:"var(--c-accent-strong)",
        display:"flex", alignItems:"center", justifyContent:"center", fontSize:"18px", letterSpacing:"4px" }}>
        LOADING...
      </div>
    );
  }

  const T = UI[game.lang] || UI.en;
  const board = game.board || [];
  const redLeft  = board.filter(c=>c.team===TEAM.RED  &&!c.revealed).length;
  const blueLeft = board.filter(c=>c.team===TEAM.BLUE &&!c.revealed).length;
  const currentLabel = game.currentTeam===TEAM.RED ? T.redTeam : T.blueTeam;
  const log = game.log || [];

  const iAmRedSpy  = game.redSpymaster  === playerId;
  const iAmBlueSpy = game.blueSpymaster === playerId;
  const iAmAnySpy  = iAmRedSpy || iAmBlueSpy;
  const redSpyLocked  = !!game.redSpymaster;
  const blueSpyLocked = !!game.blueSpymaster;

  // What colors can I see?
  // Spymasters always see all colors. Operatives see only revealed.
  const showAllColors = iAmAnySpy;

  const shareUrl = `${window.location.origin}${window.location.pathname}?code=${gameCode}`;

  // ── firebase actions ──
  const dbUpdate = (patch) => update(ref(db, `games/${gameCode}`), patch);

  const claimSpymaster = async (team) => {
    if (team === TEAM.RED && redSpyLocked)  return;
    if (team === TEAM.BLUE && blueSpyLocked) return;
    setConfirm({ type:"spymaster", team });
  };

  const confirmSpymaster = async () => {
    const team = confirm.team;
    setConfirm(null);
    if (team === TEAM.RED)  await dbUpdate({ redSpymaster:  playerId });
    if (team === TEAM.BLUE) await dbUpdate({ blueSpymaster: playerId });
  };

  const submitClue = async () => {
    if (!clueInput.trim() || !countInput) return;
    const n = parseInt(countInput);
    const word = clueInput.trim().toUpperCase();
    const newLog = [`${currentLabel} ${T.spymasterLog} "${word}" — ${n}`, ...log].slice(0,30);
    await dbUpdate({ activeClue:{word,count:n}, guessesLeft:n+1, clue:"", clueCount:"", log:newLog });
    setClueInput(""); setCountInput("");
  };

  const endTurn = async () => {
    if (game.winner || !game.activeClue) return;
    const next = game.currentTeam===TEAM.RED ? TEAM.BLUE : TEAM.RED;
    const nextLabel = next===TEAM.RED ? T.redTeam : T.blueTeam;
    const newLog = [`${currentLabel} ${T.endedTurn}`, ...log].slice(0,30);
    await dbUpdate({ currentTeam:next, activeClue:null, guessesLeft:0, log:newLog });
  };

  const handleCardClick = (idx) => {
    if (game.winner || iAmAnySpy || !game.activeClue || game.guessesLeft===0) return;
    if (board[idx].revealed) return;
    setConfirm({ type:"card", idx });
  };

  const confirmReveal = async () => {
    const idx  = confirm.idx;
    const card = board[idx];
    setConfirm(null);
    const newBoard = board.map((c,i) => i===idx ? {...c,revealed:true} : c);
    const newRed   = newBoard.filter(c=>c.team===TEAM.RED  &&!c.revealed).length;
    const newBlue  = newBoard.filter(c=>c.team===TEAM.BLUE &&!c.revealed).length;
    const logMsg   = `${currentLabel}: "${card.word}" → ${card.team.toUpperCase()}`;
    let patch = { board: newBoard };

    if (card.team===TEAM.ASSASSIN) {
      const w = game.currentTeam===TEAM.RED ? TEAM.BLUE : TEAM.RED;
      const wLabel = w===TEAM.RED ? T.redTeam : T.blueTeam;
      patch = { ...patch, winner:w, log:[`${T.assassinLog} ${wLabel} ${T.wins}`, logMsg, ...log].slice(0,30) };
    } else if (newRed===0) {
      patch = { ...patch, winner:TEAM.RED,  log:[T.redWins,  logMsg,...log].slice(0,30) };
    } else if (newBlue===0) {
      patch = { ...patch, winner:TEAM.BLUE, log:[T.blueWins, logMsg,...log].slice(0,30) };
    } else if (card.team!==game.currentTeam) {
      const next = game.currentTeam===TEAM.RED ? TEAM.BLUE : TEAM.RED;
      const nextLabel = next===TEAM.RED ? T.redTeam : T.blueTeam;
      patch = { ...patch, currentTeam:next, activeClue:null, guessesLeft:0,
        log:[`${T.wrongTurn} ${nextLabel}`, logMsg,...log].slice(0,30) };
    } else {
      const rem = game.guessesLeft - 1;
      if (rem===0) {
        const next = game.currentTeam===TEAM.RED ? TEAM.BLUE : TEAM.RED;
        const nextLabel = next===TEAM.RED ? T.redTeam : T.blueTeam;
        patch = { ...patch, currentTeam:next, activeClue:null, guessesLeft:0,
          log:[`${T.outOfGuesses} ${nextLabel}`, logMsg,...log].slice(0,30) };
      } else {
        patch = { ...patch, guessesLeft:rem, log:[logMsg,...log].slice(0,30) };
      }
    }
    await dbUpdate(patch);
  };

  const pendingIdx = confirm?.type==="card" ? confirm.idx : null;

  // ── RENDER ──
  return (
    <div style={{ height:"100vh", height:"100dvh", background:"var(--c-bg)", ...BASE,
      color:"var(--c-text)", display:"flex", flexDirection:"column", overflow:"hidden" }}>

      {/* ── MODALS ── */}
      {confirm?.type==="card" && (
        <Modal>
          <div style={{ fontSize:"11px", letterSpacing:"3px", color:"var(--c-text-muted)", marginBottom:"16px" }}>{T.confirmGuess}</div>
          <div style={{ fontSize:"clamp(20px,6vw,28px)", fontWeight:"bold", color:"var(--c-text)", marginBottom:"8px" }}>
            {board[confirm.idx]?.word.toUpperCase()}
          </div>
          <div style={{ fontSize:"13px", color:"var(--c-text-amber)", marginBottom:"28px" }}>{T.revealQ}</div>
          <div style={{ display:"flex", gap:"12px", justifyContent:"center" }}>
            <button onClick={()=>setConfirm(null)} style={ghostBtn("var(--c-text-muted)","13px","12px 24px")}>{T.cancel}</button>
            <button onClick={confirmReveal} style={{ ...BASE,
              background:game.currentTeam===TEAM.RED?"#b83232":"#1f5fa6",
              border:"none", borderRadius:"6px", color:"#fff", padding:"12px 24px",
              fontSize:"13px", letterSpacing:"3px", cursor:"pointer",
              textTransform:"uppercase", fontWeight:"bold" }}>{T.revealIt}</button>
          </div>
        </Modal>
      )}

      {confirm?.type==="spymaster" && (
        <Modal>
          <div style={{ fontSize:"36px", marginBottom:"12px" }}>🕵️</div>
          <div style={{ fontSize:"11px", letterSpacing:"3px", color:"var(--c-text-muted)", marginBottom:"12px" }}>{T.spymasterMode}</div>
          <div style={{ fontSize:"14px", color:"var(--c-text)", marginBottom:"8px", lineHeight:"1.6" }}>{T.spymasterWarn}</div>
          <div style={{ fontSize:"12px", color:"var(--c-text-amber)", marginBottom:"4px", lineHeight:"1.6" }}>{T.spymasterWarn2}</div>
          <div style={{ fontSize:"11px", color:"var(--c-accent)", marginBottom:"24px" }}>⚠️ {T.spymasterOnce}</div>
          <div style={{ display:"flex", gap:"12px", justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={()=>setConfirm(null)} style={ghostBtn("var(--c-text-muted)","13px","12px 20px")}>{T.cancel}</button>
            <button onClick={confirmSpymaster} style={{ ...BASE,
              background:"var(--c-spy-btn-bg)", border:"1px solid var(--c-accent)", borderRadius:"6px",
              color:"var(--c-text)", padding:"12px 20px", fontSize:"12px", letterSpacing:"1px",
              cursor:"pointer", textTransform:"uppercase", fontWeight:"bold" }}>{T.iAmSpy}</button>
          </div>
        </Modal>
      )}

      {/* ── LOG POPUP ── */}
      {showLog && <LogPopup log={log} onClose={()=>setShowLog(false)} T={T} />}

      {/* ── HEADER ── */}
      <header style={{ background:"var(--c-header-gradient)",
        borderBottom:"2px solid var(--c-border-accent)", padding:"10px 14px",
        display:"flex", alignItems:"center", justifyContent:"space-between", gap:"10px", flexWrap:"wrap" }}>

        <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
          <button onClick={backToLobby} style={ghostBtn("var(--c-text-muted)","10px","6px 10px")}>←</button>
          <div>
            <div style={{ fontSize:"clamp(15px,5vw,22px)", letterSpacing:"clamp(4px,2vw,8px)",
              color:"var(--c-accent-strong)", fontStyle:"italic", fontWeight:"bold" }}>{T.title}</div>
            <div style={{ fontSize:"9px", color:"var(--c-text-muted)", letterSpacing:"1px" }}>
              {LANGUAGES.find(l=>l.code===game.lang)?.flag} {game.difficulty==="easy"?T.easy:T.hard}
            </div>
          </div>
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:"8px", flexWrap:"wrap" }}>
          <ScoreBox team="RED"  left={redLeft}  active={game.currentTeam===TEAM.RED &&!game.winner} />
          <div style={{ background:"var(--c-bg-panel)", border:"1px solid var(--c-border)", borderRadius:"6px",
            padding:"4px 10px", textAlign:"center" }}>
            <div style={{ fontSize:"8px", letterSpacing:"2px", color:"var(--c-text-muted)" }}>{T.gameCode}</div>
            <div style={{ fontSize:"clamp(10px,3vw,13px)", letterSpacing:"2px", color:"var(--c-accent)",
              fontWeight:"bold", marginTop:"1px" }}>{gameCode}</div>
          </div>
          <ScoreBox team="BLUE" left={blueLeft} active={game.currentTeam===TEAM.BLUE&&!game.winner} />
        </div>

        <div style={{ display:"flex", gap:"8px", alignItems:"center" }}>
          {/* Share button */}
          <button onClick={()=>{ navigator.clipboard?.writeText(shareUrl); alert("Link copied! 📋"); }}
            style={ghostBtn("#5a8060","10px","6px 10px")} title="Copy share link">🔗 {T.share||"SHARE"}</button>
          <button onClick={newGame} style={ghostBtn("var(--c-accent)","10px","6px 12px")}>{T.newGame}</button>
        </div>
      </header>

      {/* ── WINNER ── */}
      {game.winner && (
        <div style={{ background:game.winner===TEAM.RED?"#8b1a1a":"#1a3d6e",
          padding:"14px", textAlign:"center",
          fontSize:"clamp(14px,4vw,20px)", fontWeight:"bold", letterSpacing:"3px",
          borderBottom:`2px solid ${game.winner===TEAM.RED?"#c0392b":"#2471a3"}` }}>
          🎉 {game.winner===TEAM.RED?T.redTeam:T.blueTeam} {T.wins} 🎉
          <div style={{ marginTop:"10px", display:"flex", gap:"8px", justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={playAgain}   style={ghostBtn("#fff","11px","8px 16px")}>{T.playAgain}</button>
            <button onClick={backToLobby} style={ghostBtn("#aaa","11px","8px 16px")}>{T.newCode}</button>
          </div>
        </div>
      )}

      {/* ── SPYMASTER PANELS ── */}
      {!game.winner && (
        <div style={{ display:"flex", borderBottom:"1px solid var(--c-border)" }}>

          {/* RED panel */}
          <div style={{ flex:1, padding:"10px 12px", boxSizing:"border-box",
            background:game.currentTeam===TEAM.RED?"rgba(184,50,50,0.08)":"transparent",
            borderRight:"1px solid var(--c-border)" }}>

            <div style={{ fontSize:"10px", letterSpacing:"2px", marginBottom:"6px", fontWeight:"bold",
              color:game.currentTeam===TEAM.RED?"#e05050":"#5a3030" }}>{T.redTeam}</div>

            {/* Spymaster claim or badge */}
            {iAmRedSpy ? (
              <div style={{ fontSize:"10px", color:"var(--c-accent)", marginBottom:"6px" }}>🕵️ {T.youAreSpy}</div>
            ) : redSpyLocked ? (
              <div style={{ fontSize:"10px", color:"#5a3030", marginBottom:"6px" }}>🔒 {T.spyTaken}</div>
            ) : (
              <button onClick={()=>claimSpymaster(TEAM.RED)}
                style={{ ...ghostBtn("#6a3030","10px","5px 10px"), marginBottom:"6px" }}>
                🕵️ {T.becomeSpy}
              </button>
            )}

            {/* Clue input — only active team's spymaster when no clue active */}
            {game.currentTeam===TEAM.RED && iAmRedSpy && !game.activeClue && (
              <div style={{ display:"flex", flexDirection:"column", gap:"6px", marginTop:"4px" }}>
                <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
                  <input placeholder={T.cluePlaceholder} value={clueInput}
                    onChange={e=>setClueInput(e.target.value)}
                    onKeyDown={e=>e.key==="Enter"&&submitClue()}
                    style={{ ...inputSt, flex:1, minWidth:"80px", fontSize:"13px", padding:"8px 10px" }} />
                  <input placeholder={T.countPlaceholder} value={countInput}
                    onChange={e=>setCountInput(e.target.value.replace(/\D/,""))}
                    onKeyDown={e=>e.key==="Enter"&&submitClue()}
                    style={{ ...inputSt, width:"44px", textAlign:"center", fontSize:"13px", padding:"8px 6px" }} />
                </div>
                <button onClick={submitClue}
                  style={{ ...ghostBtn("#e05050","11px","7px 12px"), alignSelf:"flex-start" }}>{T.giveClue}</button>
              </div>
            )}

            {/* Active clue display */}
            {game.activeClue && game.currentTeam===TEAM.RED && (
              <div style={{ marginTop:"4px" }}>
                <div style={{ fontSize:"clamp(12px,3vw,15px)", marginBottom:"4px" }}>
                  {T.clueLabel} <strong style={{ color:"var(--c-accent)" }}>{game.activeClue.word}</strong>
                  &ensp;—&ensp;<strong style={{ color:"var(--c-accent)" }}>{game.activeClue.count}</strong>
                </div>
                <div style={{ fontSize:"11px", color:"var(--c-text-amber)", marginBottom:"4px" }}>
                  {T.guessesLeft} <strong style={{ color:"var(--c-text)" }}>{game.guessesLeft}</strong>
                </div>
                {iAmRedSpy && (
                  <button onClick={endTurn} style={ghostBtn("var(--c-text-amber)","10px","6px 12px")}>{T.endTurn}</button>
                )}
              </div>
            )}

            {/* Waiting message for inactive team */}
            {game.currentTeam===TEAM.BLUE && !game.activeClue && (
              <div style={{ fontSize:"11px", color:"var(--c-text-dim)", fontStyle:"italic" }}>{T.waiting}</div>
            )}
          </div>

          {/* BLUE panel */}
          <div style={{ flex:1, padding:"10px 12px", boxSizing:"border-box",
            background:game.currentTeam===TEAM.BLUE?"rgba(31,95,166,0.08)":"transparent" }}>

            <div style={{ fontSize:"10px", letterSpacing:"2px", marginBottom:"6px", fontWeight:"bold",
              color:game.currentTeam===TEAM.BLUE?"#4a9edd":"#1a3a5a" }}>{T.blueTeam}</div>

            {iAmBlueSpy ? (
              <div style={{ fontSize:"10px", color:"var(--c-accent)", marginBottom:"6px" }}>🕵️ {T.youAreSpy}</div>
            ) : blueSpyLocked ? (
              <div style={{ fontSize:"10px", color:"#1a3a5a", marginBottom:"6px" }}>🔒 {T.spyTaken}</div>
            ) : (
              <button onClick={()=>claimSpymaster(TEAM.BLUE)}
                style={{ ...ghostBtn("#1a3a6a","10px","5px 10px"), marginBottom:"6px" }}>
                🕵️ {T.becomeSpy}
              </button>
            )}

            {game.currentTeam===TEAM.BLUE && iAmBlueSpy && !game.activeClue && (
              <div style={{ display:"flex", flexDirection:"column", gap:"6px", marginTop:"4px" }}>
                <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
                  <input placeholder={T.cluePlaceholder} value={clueInput}
                    onChange={e=>setClueInput(e.target.value)}
                    onKeyDown={e=>e.key==="Enter"&&submitClue()}
                    style={{ ...inputSt, flex:1, minWidth:"80px", fontSize:"13px", padding:"8px 10px" }} />
                  <input placeholder={T.countPlaceholder} value={countInput}
                    onChange={e=>setCountInput(e.target.value.replace(/\D/,""))}
                    onKeyDown={e=>e.key==="Enter"&&submitClue()}
                    style={{ ...inputSt, width:"44px", textAlign:"center", fontSize:"13px", padding:"8px 6px" }} />
                </div>
                <button onClick={submitClue}
                  style={{ ...ghostBtn("#4a9edd","11px","7px 12px"), alignSelf:"flex-start" }}>{T.giveClue}</button>
              </div>
            )}

            {game.activeClue && game.currentTeam===TEAM.BLUE && (
              <div style={{ marginTop:"4px" }}>
                <div style={{ fontSize:"clamp(12px,3vw,15px)", marginBottom:"4px" }}>
                  {T.clueLabel} <strong style={{ color:"var(--c-accent)" }}>{game.activeClue.word}</strong>
                  &ensp;—&ensp;<strong style={{ color:"var(--c-accent)" }}>{game.activeClue.count}</strong>
                </div>
                <div style={{ fontSize:"11px", color:"var(--c-text-amber)", marginBottom:"4px" }}>
                  {T.guessesLeft} <strong style={{ color:"var(--c-text)" }}>{game.guessesLeft}</strong>
                </div>
                {iAmBlueSpy && (
                  <button onClick={endTurn} style={ghostBtn("var(--c-text-amber)","10px","6px 12px")}>{T.endTurn}</button>
                )}
              </div>
            )}

            {game.currentTeam===TEAM.RED && !game.activeClue && (
              <div style={{ fontSize:"11px", color:"var(--c-text-dim)", fontStyle:"italic" }}>{T.waiting}</div>
            )}
          </div>
        </div>
      )}

      {/* ── MAIN AREA: grid + desktop log ── */}
      <div style={{ flex:1, display:"flex", overflow:"hidden" }}>

        {/* GRID */}
        <div style={{ flex:1, padding:"12px", boxSizing:"border-box", overflowY:"auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)",
            gap:"clamp(5px,1.5vw,10px)", maxWidth:"700px", margin:"0 auto" }}>
            {board.map((card,idx) => {
              const isRevealed=card.revealed, isPending=pendingIdx===idx;
              const showColor=isRevealed||showAllColors;
              const col=isPending?CARD_PENDING:showColor?COLORS[card.team]:CARD_IDLE;
              const canClick=!isRevealed&&game.activeClue&&!game.winner&&!iAmAnySpy&&game.guessesLeft>0;
              return (
                <div key={idx} onClick={()=>handleCardClick(idx)}
                  style={{ background:col.bg,
                    border:`2px solid ${isPending?"#d4a820":col.border}`,
                    borderRadius:"clamp(5px,1.5vw,8px)",
                    padding:"clamp(8px,2.5vw,14px) 4px",
                    textAlign:"center", cursor:canClick?"pointer":"default",
                    transition:"all 0.13s",
                    transform:isPending?"scale(1.04)":"scale(1)",
                    boxShadow:isPending?"0 0 0 3px rgba(212,168,32,0.4)":
                      isRevealed?"inset 0 2px 6px rgba(0,0,0,0.3)":"0 2px 6px rgba(0,0,0,0.25)",
                    opacity:isRevealed&&!showAllColors?0.55:1,
                    position:"relative",
                    minHeight:"clamp(44px,10vw,70px)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    WebkitTapHighlightColor:"transparent", userSelect:"none" }}>
                  {isRevealed&&<div style={{ position:"absolute", inset:0,
                    background:"rgba(0,0,0,0.18)", borderRadius:"6px" }}/>}
                  <span style={{ fontSize:"clamp(9px,2.5vw,13px)", fontWeight:"bold",
                    letterSpacing:"clamp(0.5px,0.5vw,1.5px)", textTransform:"uppercase",
                    color:col.text, position:"relative", zIndex:1, lineHeight:"1.2",
                    wordBreak:"break-word", padding:"0 2px",
                    textShadow:showColor?"0 1px 3px rgba(0,0,0,0.5)":"none" }}>{card.word}</span>
                  {showAllColors&&!isRevealed&&(
                    <div style={{ position:"absolute", top:"3px", right:"4px",
                      width:"6px", height:"6px", borderRadius:"50%",
                      background:COLORS[card.team].bg, border:"1px solid rgba(255,255,255,0.4)" }}/>
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div style={{ display:"flex", gap:"14px", marginTop:"10px", justifyContent:"center",
            flexWrap:"wrap", maxWidth:"700px", margin:"10px auto 0" }}>
            {Object.entries(COLORS).map(([t,c])=>(
              <div key={t} style={{ display:"flex", alignItems:"center", gap:"5px",
                fontSize:"10px", letterSpacing:"1px", color:"var(--c-text-muted)" }}>
                <div style={{ width:"10px", height:"10px", borderRadius:"2px",
                  background:c.bg, border:`1px solid ${c.border}`, flexShrink:0 }}/>
                {t==="assassin"?T.assassin.toUpperCase():t.toUpperCase()}
              </div>
            ))}
          </div>
        </div>

        {/* DESKTOP LOG — hidden on mobile via media query simulation */}
        <div className="desktop-log" style={{ width:"210px", background:"var(--c-bg-log)",
          borderLeft:"1px solid var(--c-border)", padding:"14px", overflowY:"auto",
          display:"flex", flexDirection:"column", gap:"6px",
          // hide on small screens via inline trick — we'll use the floating button instead
        }}>
          <div style={{ fontSize:"10px", letterSpacing:"3px", color:"var(--c-text-muted)", marginBottom:"6px" }}>{T.gameLog}</div>
          {log.length===0 && <div style={{ fontSize:"11px", color:"var(--c-text-dim)", fontStyle:"italic" }}>{T.noMoves}</div>}
          {log.map((entry,i)=>(
            <div key={i} style={{ fontSize:"10px", lineHeight:"1.5",
              color:i===0?"var(--c-text)":"var(--c-text-muted)", padding:"5px 8px", borderRadius:"4px",
              background:i===0?"var(--c-bg-entry)":"transparent",
              borderLeft:i===0?"2px solid var(--c-accent)":"2px solid transparent" }}>{entry}</div>
          ))}
        </div>
      </div>

      {/* ── FLOATING LOG BUTTON (mobile, draggable) ── */}
      <button
        onPointerDown={e => {
          e.currentTarget.setPointerCapture(e.pointerId);
          const rect = e.currentTarget.getBoundingClientRect();
          logBtnDragRef.current = { startX: e.clientX, startY: e.clientY, initLeft: rect.left, initTop: rect.top, moved: false };
        }}
        onPointerMove={e => {
          const d = logBtnDragRef.current;
          if (!d.startX && d.startX !== 0) return;
          const dx = e.clientX - d.startX;
          const dy = e.clientY - d.startY;
          if (!d.moved && Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
          d.moved = true;
          const left = Math.max(0, Math.min(window.innerWidth  - 52, d.initLeft + dx));
          const top  = Math.max(0, Math.min(window.innerHeight - 52, d.initTop  + dy));
          setLogBtnPos({ left, top });
        }}
        onPointerUp={() => {
          if (!logBtnDragRef.current.moved) setShowLog(true);
          logBtnDragRef.current = {};
        }}
        style={{ position:"fixed",
          ...(logBtnPos ? { left: logBtnPos.left, top: logBtnPos.top } : { bottom:"20px", right:"16px" }),
          zIndex:100, background:"var(--c-bg-panel)", border:"2px solid var(--c-border-accent)", borderRadius:"50%",
          width:"52px", height:"52px", fontSize:"22px", cursor:"grab",
          boxShadow:"0 4px 20px rgba(0,0,0,0.6)", display:"flex",
          alignItems:"center", justifyContent:"center",
          WebkitTapHighlightColor:"transparent", touchAction:"none" }}
        title={T.gameLog}>
        📜
        {log.length>0 && (
          <div style={{ position:"absolute", top:"0px", right:"0px",
            background:"var(--c-accent)", borderRadius:"50%", width:"16px", height:"16px",
            fontSize:"9px", color:"var(--c-bg)", fontWeight:"bold", ...BASE,
            display:"flex", alignItems:"center", justifyContent:"center" }}>
            {log.length > 9 ? "9+" : log.length}
          </div>
        )}
      </button>

      {/* ── FOOTER ── */}
      <div style={{ borderTop:"1px solid var(--c-border-dim)", padding:"8px 14px 28px", fontSize:"10px",
        color:"var(--c-text-dim)", letterSpacing:"1px", display:"flex", gap:"12px",
        flexWrap:"wrap", justifyContent:"center", textAlign:"center" }}>
        <span>{T.footerSpy}</span>
        <span>{T.footerOp}</span>
        <span>{T.footerAvoid}</span>
        <span>{T.footerWin}</span>
      </div>

      {/* Responsive: hide desktop log on small screens */}
      <style>{`
        @media (max-width: 640px) { .desktop-log { display: none !important; } }
        * { box-sizing: border-box; }
        body { margin: 0; }
      `}</style>
    </div>
  );
}
