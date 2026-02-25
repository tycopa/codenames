import { useState, useEffect } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// LANGUAGES & UI TRANSLATIONS
// ══════════════════════════════════════════════════════════════════════════════
const LANGUAGES = [
  { code: "en", label: "🇬🇧 English",    flag: "🇬🇧" },
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
    lobby:"← LOBBY",newGame:"NEW GAME",sameCode:"SAME CODE",newCode:"NEW CODE",
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
    waiting:"Waiting for spymaster…",redWins:"🔴 RED wins!",blueWins:"🔵 BLUE wins!",assassinLog:"💀 ASSASSIN!",spymasterOnce:"This role is permanent for the entire game.",youAreSpy:"You are the spymaster",spyTaken:"Spymaster taken",becomeSpy:"Become spymaster",share:"SHARE",waiting:"Waiting…",
  },
  es: {
    title:"AGENTE X",subtitle:"JUEGO DE PALABRAS OPERATIVO",difficulty:"DIFICULTAD",
    easy:"🟢  Fácil",hard:"🔴  Difícil",easyDesc:"Palabras comunes — para todas las edades",
    hardDesc:"Palabras abstractas y difíciles — brutal para espías",language:"IDIOMA",
    gameCode:"CÓDIGO DE JUEGO",gameCodeDesc:"Todos deben introducir el mismo código",
    leaveBlank:"Déjalo en blanco para generar un código nuevo.",generated:"Generado:",
    deploy:"DESPLEGAR AGENTES",sameBoard:"Mismo código + dificultad + idioma = tablero idéntico",
    lobby:"← SALÓN",newGame:"NUEVA PARTIDA",sameCode:"MISMO CÓDIGO",newCode:"NUEVO CÓDIGO",
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
    waiting:"Esperando al espía jefe…",redWins:"🔴 ¡ROJO gana!",blueWins:"🔵 ¡AZUL gana!",assassinLog:"💀 ¡ASESINO!",spymasterOnce:"Este rol es permanente para toda la partida.",youAreSpy:"Eres el espía jefe",spyTaken:"Espía jefe asignado",becomeSpy:"Ser espía jefe",share:"COMPARTIR",waiting:"Esperando…",
  },
  fr: {
    title:"AGENT X",subtitle:"JEU DE MOTS OPÉRATIF",difficulty:"DIFFICULTÉ",
    easy:"🟢  Facile",hard:"🔴  Difficile",easyDesc:"Mots courants — pour tous les âges",
    hardDesc:"Mots abstraits et piégeux — brutal pour les espions",language:"LANGUE",
    gameCode:"CODE DE PARTIE",gameCodeDesc:"Tout le monde doit entrer le même code",
    leaveBlank:"Laissez vide pour générer un code automatiquement.",generated:"Généré :",
    deploy:"DÉPLOYER LES AGENTS",sameBoard:"Même code + difficulté + langue = plateau identique",
    lobby:"← ACCUEIL",newGame:"NOUVELLE PARTIE",sameCode:"MÊME CODE",newCode:"NOUVEAU CODE",
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
    waiting:"En attente de l'espion chef…",redWins:"🔴 ROUGE gagne !",blueWins:"🔵 BLEU gagne !",assassinLog:"💀 ASSASSIN !",spymasterOnce:"Ce rôle est permanent pour toute la partie.",youAreSpy:"Vous êtes l'espion chef",spyTaken:"Espion chef pris",becomeSpy:"Devenir espion chef",share:"PARTAGER",waiting:"En attente…",
  },
  de: {
    title:"AGENT X",subtitle:"FELDOPERATIVES WORTSPIEL",difficulty:"SCHWIERIGKEIT",
    easy:"🟢  Leicht",hard:"🔴  Schwer",easyDesc:"Alltägliche Wörter — für alle Altersgruppen",
    hardDesc:"Abstrakte und knifflige Wörter — brutal für Spymaster",language:"SPRACHE",
    gameCode:"SPIELCODE",gameCodeDesc:"Alle müssen denselben Code eingeben",
    leaveBlank:"Leer lassen für automatisch generierten Code.",generated:"Generiert:",
    deploy:"AGENTEN EINSETZEN",sameBoard:"Gleicher Code + Schwierigkeit + Sprache = identisches Spielfeld",
    lobby:"← LOBBY",newGame:"NEUES SPIEL",sameCode:"GLEICHER CODE",newCode:"NEUER CODE",
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
    waiting:"Warten auf Spymaster…",redWins:"🔴 ROT gewinnt!",blueWins:"🔵 BLAU gewinnt!",assassinLog:"💀 ATTENTÄTER!",spymasterOnce:"Diese Rolle ist für das gesamte Spiel dauerhaft.",youAreSpy:"Du bist der Spymaster",spyTaken:"Spymaster vergeben",becomeSpy:"Spymaster werden",share:"TEILEN",waiting:"Warten…",
  },
  pt: {
    title:"AGENTE X",subtitle:"JOGO DE PALAVRAS OPERATIVO",difficulty:"DIFICULDADE",
    easy:"🟢  Fácil",hard:"🔴  Difícil",easyDesc:"Palavras comuns — para todas as idades",
    hardDesc:"Palavras abstratas e difíceis — brutal para espiões",language:"IDIOMA",
    gameCode:"CÓDIGO DO JOGO",gameCodeDesc:"Todos devem inserir o mesmo código",
    leaveBlank:"Deixe em branco para gerar um código.",generated:"Gerado:",
    deploy:"ENVIAR AGENTES",sameBoard:"Mesmo código + dificuldade + idioma = tabuleiro idêntico",
    lobby:"← SAGUÃO",newGame:"NOVO JOGO",sameCode:"MESMO CÓDIGO",newCode:"NOVO CÓDIGO",
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
    waiting:"Aguardando espião chefe…",redWins:"🔴 VERMELHO ganha!",blueWins:"🔵 AZUL ganha!",assassinLog:"💀 ASSASSINO!",spymasterOnce:"Questo ruolo è permanente per tutta la partita.",youAreSpy:"Sei il capo spia",spyTaken:"Capo spia occupato",becomeSpy:"Diventa capo spia",share:"CONDIVIDI",waiting:"In attesa…",spymasterOnce:"Este papel é permanente para todo o jogo.",youAreSpy:"Você é o espião chefe",spyTaken:"Espião chefe ocupado",becomeSpy:"Tornar-se espião chefe",share:"PARTILHAR",waiting:"A aguardar…",
  },
  it: {
    title:"AGENTE X",subtitle:"GIOCO DI PAROLE OPERATIVO",difficulty:"DIFFICOLTÀ",
    easy:"🟢  Facile",hard:"🔴  Difficile",easyDesc:"Parole comuni — per tutte le età",
    hardDesc:"Parole astratte e insidiose — brutale per le spie",language:"LINGUA",
    gameCode:"CODICE PARTITA",gameCodeDesc:"Tutti devono inserire lo stesso codice",
    leaveBlank:"Lascia vuoto per generare un codice.",generated:"Generato:",
    deploy:"INVIA AGENTI",sameBoard:"Stesso codice + difficoltà + lingua = tabellone identico",
    lobby:"← SALA",newGame:"NUOVA PARTITA",sameCode:"STESSO CODICE",newCode:"NUOVO CODICE",
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
    waiting:"In attesa del capo spia…",redWins:"🔴 ROSSO vince!",blueWins:"🔵 BLU vince!",assassinLog:"💀 ASSASSINO!",
  },
  me: {
    title:"AGENT X",subtitle:"OPERATIVNA IGRA RIJEČIMA",difficulty:"TEŽINA",
    easy:"🟢  Lako",hard:"🔴  Teško",easyDesc:"Svakodnevne riječi — za sve uzraste",
    hardDesc:"Apstraktne i teške riječi — brutalno za šefa špijuna",language:"JEZIK",
    gameCode:"KOD IGRE",gameCodeDesc:"Svi moraju unijeti isti kod da bi vidjeli istu tablu",
    leaveBlank:"Ostavi prazno za automatsko generisanje koda.",generated:"Generisano:",
    deploy:"RASPOREDI AGENTE",sameBoard:"Isti kod + težina + jezik = identična tabla",
    lobby:"← SALA",newGame:"NOVA IGRA",sameCode:"ISTI KOD",newCode:"NOVI KOD",
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
    waiting:"Čeka se šef špijun…",redWins:"🔴 CRVENI pobjeđuju!",blueWins:"🔵 PLAVI pobjeđuju!",assassinLog:"💀 UBICA!",spymasterOnce:"Ova uloga je trajna za cijelu igru.",youAreSpy:"Ti si šef špijun",spyTaken:"Šef špijun zauzet",becomeSpy:"Postani šef špijun",share:"PODIJELI",waiting:"Čekanje…",
  },
  uk: {
    title:"АГЕНТ X",subtitle:"ОПЕРАТИВНА ГРА СЛІВ",difficulty:"СКЛАДНІСТЬ",
    easy:"🟢  Легко",hard:"🔴  Важко",easyDesc:"Звичайні слова — для всіх вікових груп",
    hardDesc:"Абстрактні та хитрі слова — жорстоко для шпигунів",language:"МОВА",
    gameCode:"КОД ГРИ",gameCodeDesc:"Всі мають ввести однаковий код для однакового поля",
    leaveBlank:"Залиш порожнім для автоматичного генерування.",generated:"Згенеровано:",
    deploy:"РОЗГОРНУТИ АГЕНТІВ",sameBoard:"Однаковий код + складність + мова = однакове поле",
    lobby:"← ЛОБІ",newGame:"НОВА ГРА",sameCode:"ТОЙ САМИЙ КОД",newCode:"НОВИЙ КОД",
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
    waiting:"Чекаємо шпигуна-майстра…",redWins:"🔴 ЧЕРВОНІ виграють!",blueWins:"🔵 СИНІ виграють!",assassinLog:"💀 ВБИВЦЯ!",spymasterOnce:"Ця роль є постійною на всю гру.",youAreSpy:"Ви шпигун-майстер",spyTaken:"Шпигун-майстер зайнятий",becomeSpy:"Стати шпигуном-майстром",share:"ПОДІЛИТИСЬ",waiting:"Очікування…",
  },
  ru: {
    title:"АГЕНТ X",subtitle:"ОПЕРАТИВНАЯ ИГРА СЛОВ",difficulty:"СЛОЖНОСТЬ",
    easy:"🟢  Легко",hard:"🔴  Сложно",easyDesc:"Обычные слова — для всех возрастов",
    hardDesc:"Абстрактные и хитрые слова — жёстко для шпионов",language:"ЯЗЫК",
    gameCode:"КОД ИГРЫ",gameCodeDesc:"Все должны ввести одинаковый код для одинакового поля",
    leaveBlank:"Оставь пустым для автогенерации.",generated:"Сгенерировано:",
    deploy:"РАЗВЕРНУТЬ АГЕНТОВ",sameBoard:"Одинаковый код + сложность + язык = одинаковое поле",
    lobby:"← ЛОББИ",newGame:"НОВАЯ ИГРА",sameCode:"ТОТ ЖЕ КОД",newCode:"НОВЫЙ КОД",
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
    waiting:"Ждём шпиона-мастера…",redWins:"🔴 КРАСНЫЕ выигрывают!",blueWins:"🔵 СИНИЕ выигрывают!",assassinLog:"💀 УБИЙЦА!",spymasterOnce:"Эта роль постоянна на всю игру.",youAreSpy:"Вы шпион-мастер",spyTaken:"Шпион-мастер занят",becomeSpy:"Стать шпионом-мастером",share:"ПОДЕЛИТЬСЯ",waiting:"Ожидание…",
  },
  pl: {
    title:"AGENT X",subtitle:"OPERATYWNA GRA SŁOWNA",difficulty:"POZIOM",
    easy:"🟢  Łatwy",hard:"🔴  Trudny",easyDesc:"Codzienne słowa — dla wszystkich grup wiekowych",
    hardDesc:"Abstrakcyjne i podchwytliwe słowa — brutalne dla szpiegów",language:"JĘZYK",
    gameCode:"KOD GRY",gameCodeDesc:"Wszyscy muszą wpisać ten sam kod",
    leaveBlank:"Pozostaw puste dla automatycznego kodu.",generated:"Wygenerowano:",
    deploy:"ROZMIEŚĆ AGENTÓW",sameBoard:"Ten sam kod + poziom + język = identyczna plansza",
    lobby:"← LOBBY",newGame:"NOWA GRA",sameCode:"TEN SAM KOD",newCode:"NOWY KOD",
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
    waiting:"Czekamy na szpiega-mistrza…",redWins:"🔴 CZERWONI wygrywają!",blueWins:"🔵 NIEBIESCY wygrywają!",assassinLog:"💀 ZABÓJCA!",spymasterOnce:"Ta rola jest stała przez całą grę.",youAreSpy:"Jesteś szpiegiem-mistrzem",spyTaken:"Szpieg-mistrz zajęty",becomeSpy:"Zostań szpiegiem-mistrzem",share:"UDOSTĘPNIJ",waiting:"Oczekiwanie…",
  },
};

// ══════════════════════════════════════════════════════════════════════════════
// WORD BANKS
// ══════════════════════════════════════════════════════════════════════════════
// 2000 easy words per language (drawn from pool, 25 used per game)
// 500 hard words per language
const WORDS = {

  // ── ENGLISH ──────────────────────────────────────────────────────────────
  en: {
    easy: [
      "Apple","Apron","Arm","Arrow","Ash","Aunt","Axe","Baby","Back","Bag",
      "Ball","Banana","Bank","Barn","Base","Basket","Bath","Beach","Bean","Bear",
      "Bed","Bee","Bell","Belt","Berry","Bird","Blade","Blanket","Boat","Bolt",
      "Bone","Book","Boot","Bottle","Bowl","Box","Branch","Bread","Brick","Bridge",
      "Broom","Brush","Bucket","Bug","Bush","Button","Cage","Cake","Camp","Candle",
      "Cap","Card","Cart","Castle","Cat","Cave","Chair","Chalk","Cheese","Cherry",
      "Chest","Clock","Cloud","Coal","Coat","Coin","Comb","Cook","Cord","Corn",
      "Cow","Crab","Crown","Cup","Curtain","Cushion","Dagger","Dam","Deer","Desk",
      "Dirt","Dog","Door","Dove","Drain","Drawer","Dress","Drill","Drum","Duck",
      "Dust","Eagle","Ear","Earth","Egg","Elk","Eye","Fan","Farm","Feather",
      "Fence","Fern","Field","Fig","Fire","Fish","Flag","Flask","Flea","Flower",
      "Fly","Foam","Fog","Fork","Fox","Frog","Fruit","Gate","Gem","Glove",
      "Goat","Gold","Grain","Grape","Grass","Grid","Ground","Guard","Guest","Gun",
      "Hammer","Hand","Harp","Hat","Hay","Heart","Heel","Hill","Hive","Hook",
      "Horn","Horse","House","Ice","Ink","Iris","Iron","Island","Jar","Jewel",
      "Juice","Jungle","Key","King","Kite","Knot","Lake","Lamp","Leaf","Leg",
      "Lemon","Light","Lion","Lock","Log","Loom","Map","Mask","Meat","Milk",
      "Mill","Mint","Mirror","Mole","Moon","Moss","Mouse","Mud","Mushroom","Nail",
      "Nest","Net","Needle","Night","Nose","Oak","Oar","Ocean","Olive","Onion",
      "Orange","Oven","Owl","Paw","Pear","Pearl","Pen","Pepper","Pine","Pipe",
      "Pit","Plum","Pod","Pool","Pot","Pump","Queen","Rain","Ram","Rat",
      "Reed","Ring","River","Road","Rock","Roof","Root","Rope","Rose","Rug",
      "Sail","Salt","Sand","Saw","Seed","Shade","Sheep","Shell","Ship","Shoe",
      "Shore","Sign","Silk","Skin","Sky","Smoke","Snake","Snow","Sock","Soil",
      "Soup","Spark","Spider","Spring","Star","Stem","Stone","Storm","Straw","Stream",
      "Sun","Sword","Tail","Tea","Thread","Thumb","Tiger","Tin","Toad","Torch",
      "Tower","Tree","Tunnel","Twig","Urn","Vine","Wall","Wave","Wax","Weed",
      "Wheat","Wheel","Wind","Wing","Wolf","Wood","Wool","Worm","Yard","Yolk",
      "Zebra","Zone","Acorn","Almond","Amber","Anchor","Angel","Anvil","Arch","Attic",
      "Badger","Balloon","Bamboo","Barrel","Bat","Bay","Beacon","Bead","Beak","Beam",
      "Beet","Bishop","Blade","Blanket","Blaze","Bluebell","Boar","Border","Bow","Bowl",
      "Bramble","Bran","Brass","Brew","Brook","Bubble","Bud","Buffalo","Bulb","Bull",
      "Bump","Burrow","Calf","Canal","Canyon","Cape","Carbon","Cedar","Cellar","Chain",
      "Chamber","Cheek","Chin","Chip","Circle","Claw","Clay","Cliff","Clip","Cloak",
      "Club","Cluster","Cobweb","Collar","Colony","Colt","Cone","Copper","Coral","Cottage",
      "Cotton","Couch","Cove","Crag","Crane","Crater","Creek","Crest","Crop","Cross",
      "Crow","Crystal","Cub","Curl","Damp","Dawn","Deck","Delta","Den","Dew",
      "Diamond","Dock","Dome","Draft","Drape","Drift","Drop","Dune","Dwarf","Dye",
      "Fang","Feud","Fin","Flake","Flame","Flap","Flock","Flood","Floor","Flute",
      "Foal","Fold","Font","Force","Forge","Fossil","Frond","Frost","Fur","Gap",
      "Gaze","Gear","Ghost","Glade","Glen","Glow","Glue","Gnome","Gorge","Goose",
      "Gorse","Grain","Gravel","Grove","Growl","Gulf","Gust","Haze","Hedge","Hemp",
      "Herb","Herd","Hide","Hilt","Hollow","Honey","Hood","Hoof","Hump","Hunt",
      "Husk","Inlet","Ivy","Kelp","Kern","Knob","Knoll","Lace","Lagoon","Lark",
      "Latch","Lava","Lawn","Layer","Lead","Ledge","Leek","Lime","Linen","Link",
      "Loch","Lodge","Loop","Lure","Lynx","Mane","Maple","Marsh","Mast","Maze",
      "Meadow","Mesa","Mist","Moor","Mound","Moat","Moth","Mule","Mussel","Notch",
      "Nook","Nut","Opal","Orbit","Ore","Otter","Pad","Palm","Peat","Pebble",
      "Peel","Petal","Pheasant","Pigeon","Pillar","Pit","Plank","Plateau","Plume","Pod",
      "Pond","Poppy","Porch","Post","Prairie","Prawn","Prism","Probe","Pulp","Quail",
      "Quarry","Quartz","Quill","Rabbit","Rack","Ramp","Raven","Realm","Reef","Ridge",
      "Rim","Rind","Rook","Ruin","Rush","Rust","Rye","Sage","Salmon","Sap",
      "Scales","Sedge","Shaft","Shelf","Shoal","Shore","Shrine","Shrub","Silt","Slab",
      "Slate","Sleet","Slope","Snail","Snare","Soot","Sparrow","Spike","Spine","Spit",
      "Sprig","Sprout","Spur","Stack","Stag","Stake","Stalk","Stamp","Starling","Stave",
      "Steel","Step","Stew","Stick","Sting","Stock","Stump","Swan","Swamp","Swift",
      "Tangle","Thorn","Thatch","Tide","Timber","Tinder","Tip","Tomb","Trace","Track",
      "Trail","Trap","Trench","Trough","Trout","Trunk","Tuft","Tundra","Turf","Tusk",
      "Veil","Venom","Vole","Wade","Wasp","Watch","Well","Wheat","Whirl","Wicket",
      "Willow","Wisp","Wren","Yew","Acacia","Agate","Aisle","Alcove","Alder","Aloe",
      "Aloft","Altar","Amble","Amid","Ample","Anchor","Antler","Ape","Arc","Arena",
      "Aspen","Bale","Bark","Bay","Bazaar","Beacon","Bellow","Bench","Berm","Bevel",
      "Bile","Birch","Bison","Bite","Blend","Bluff","Blunt","Boar","Bobcat","Bog",
      "Bolt","Bond","Bone","Bonfire","Boom","Bough","Boulder","Bound","Brake","Brand",
      "Briar","Brine","Brink","Brisket","Brittle","Bronze","Brood","Bruise","Bud","Buoy",
      "Burr","Bust","Buttercup","Buzzard","Cactus","Cairn","Canal","Canopy","Carp","Cart",
      "Cascade","Cave","Chalk","Char","Chase","Chasm","Chip","Chord","Chrome","Churn",
      "Citrus","Clam","Clamp","Cleft","Clod","Clog","Clump","Coil","Colt","Coop",
      "Cord","Core","Cormorant","Crag","Crest","Crisp","Crop","Cub","Curl","Dab",
      "Daisy","Dam","Dash","Daze","Dell","Den","Depth","Dew","Dim","Dip",
      "Disc","Ditch","Dock","Dolt","Dome","Downy","Drag","Drake","Dram","Drawl",
      "Dray","Drench","Drift","Drip","Drone","Drool","Droop","Drop","Drove","Dusk",
      "Dwarf","Eddy","Eel","Emblem","Ember","Enclave","Escarp","Estuary","Eyrie","Fawn",
      "Fir","Fjord","Flint","Floe","Flop","Flour","Flute","Foal","Fort","Frond",
      "Frost","Furrow","Gale","Gallop","Gander","Gap","Garlic","Gavel","Geyser","Gill",
      "Glade","Glen","Glint","Gorse","Gorge","Gourd","Grain","Gulch","Gull","Hail",
      "Hake","Hallow","Halt","Ham","Hatch","Hazel","Heath","Helm","Hemp","Heron",
      "Hew","Hive","Hob","Hole","Hollow","Holly","Holt","Honeydew","Horde","Hound",
      "Hub","Hull","Hulk","Hump","Hurdle","Hyena","Ibis","Ice","Inlet","Iris",
      "Jackdaw","Jaguar","Jasper","Jolt","Juniper","Kale","Kelp","Kestrel","Knap","Lapwing",
      "Larch","Larder","Lattice","Laurel","Lave","Ledge","Lichen","Lift","Lime","Limp",
      "Linden","Loft","Loop","Lotus","Lure","Mallow","Malt","Manor","Mantle","Marrow",
      "Mast","Mead","Mink","Mire","Mistletoe","Moose","Mortar","Mossy","Murmur","Musk",
      "Narwhal","Newt","Niche","Nightingale","Nodule","Nook","Notch","Nuthatch","Ochre","Offal",
      "Osprey","Ox","Paddock","Pampas","Panther","Parcel","Parsley","Partridge","Patch","Peat",
      "Pelican","Perch","Pewit","Pike","Pilchard","Pipit","Plover","Plum","Pochard","Polecat",
      "Poplar","Porpoise","Pouch","Prowl","Puffin","Pulp","Puma","Punt","Pygmy","Quaff",
      "Quagmire","Quicksand","Radish","Rail","Rake","Rampart","Raptor","Ravine","Redstart","Refuge",
      "Remnant","Roan","Robin","Rook","Roost","Rump","Rustle","Rut","Saltmarsh","Sandpiper",
      "Sap","Sapling","Savanna","Scent","Scree","Scrub","Scythe","Sedge","Serpent","Shale",
      "Shank","Shoal","Shrew","Shrub","Shuck","Skua","Skylark","Slab","Sloe","Sloth",
      "Slug","Snipe","Sow","Spaniel","Spawn","Sprat","Squirrel","Stack","Stalk","Stallion",
      "Starfish","Stint","Stoat","Stock","Stork","Stubble","Sundew","Swede","Swift","Sycamore",
      "Talon","Teal","Tern","Thicket","Thistle","Thorn","Thyme","Tide","Timber","Titmouse",
      "Torrent","Trace","Trefoil","Trident","Trout","Tuber","Tumble","Turbot","Twilight","Vetch",
      "Viper","Vole","Wagtail","Wake","Wallow","Walrus","Warbler","Wayfarer","Weasel","Wetland",
      "Whin","Whittle","Wigeon","Wildcat","Winkle","Wrasse","Wren","Yarrow","Yew","Zooplankton",
      // ── additional easy words ──
      "Joy","Fear","Hope","Love","Trust","Calm","Pride","Rage","Grief","Envy",
      "Bliss","Dread","Awe","Woe","Glee","Angst","Zeal","Spite","Scorn","Mirth",
      "Red","Blue","Green","Black","White","Gray","Pink","Teal","Cyan","Scarlet",
      "Ivory","Ebony","Crimson","Violet","Indigo","Magenta","Coral","Lavender","Mauve","Olive",
      "Knight","Monk","Thief","Rogue","Mage","Bard","Ranger","Archer","Cleric","Druid",
      "Herald","Squire","Jester","Elder","Chief","Shaman","Nomad","Pilgrim","Scout","Rebel",
      "Chase","Quest","Raid","Clash","Dash","Leap","March","Dive","Burst","Vault",
      "Rush","Blast","Crawl","Drift","Glide","Surge","Lunge","Pivot","Spin","Bolt",
      "Alley","Street","Square","Plaza","Market","Mall","Cafe","Hotel","Inn","Hut",
      "Temple","Shrine","Chapel","Bazaar","Harbor","Wharf","Depot","Station","Arena","Stadium",
      "Screen","Cable","Wire","Switch","Dial","Lever","Latch","Hinge","Clamp","Brace",
      "Helm","Shield","Lance","Staff","Wand","Rune","Charm","Sigil","Crest","Brand",
      "Ripple","Flicker","Shimmer","Glimmer","Gleam","Blaze","Glow","Haze","Blur","Flash",
      "Echo","Signal","Pulse","Boom","Ping","Hum","Buzz","Drone","Tick","Chime",
      "Wool","Silk","Linen","Hemp","Cotton","Leather","Velvet","Cloth","Tweed","Canvas",
      "Crest","Badge","Seal","Stamp","Mark","Brand","Label","Tag","Patch","Ribbon",
      "Plank","Beam","Rafter","Joist","Strut","Pillar","Column","Arch","Vault","Spire",
      "Mop","Broom","Rake","Hoe","Spade","Shovel","Trowel","Chisel","Plane","Lathe",
      "Cobble","Tile","Slate","Shingle","Thatch","Adobe","Mortar","Grout","Plaster","Stucco",
      "Pond","Creek","Brook","Beck","Rill","Gully","Ravine","Gorge","Chasm","Abyss",
      "Peak","Crag","Bluff","Cliff","Escarpment","Plateau","Mesa","Butte","Dune","Delta",
      "Acorn","Pinecone","Walnut","Chestnut","Hazel","Beech","Elm","Ash","Birch","Alder",
      "Pepper","Ginger","Nutmeg","Clove","Cinnamon","Cardamom","Saffron","Vanilla","Basil","Thyme",
    ],
    hard: [
      "Abyss","Acrimony","Adumbrate","Aegis","Affliction","Agitation","Alchemy","Alienation","Allegory","Ambiguity",
      "Anachronism","Anarchy","Anomaly","Antithesis","Apathy","Apostasy","Arcane","Ardor","Artifice","Asceticism",
      "Aspersion","Atrophy","Augury","Avarice","Axiom","Ballast","Bedlam","Beguile","Belie","Belligerence",
      "Blight","Cacophony","Cadence","Calamity","Calumny","Caprice","Catalyst","Caustic","Caveat","Cipher",
      "Clamor","Cogent","Collusion","Compunction","Condescension","Contrition","Culprit","Cynicism","Debacle","Decadence",
      "Deference","Deluge","Depravity","Desolation","Despotism","Dialectic","Diffidence","Dilapidation","Dirge","Dissonance",
      "Dogma","Duplicity","Effigy","Elegy","Enigma","Entropy","Ephemeral","Equivocate","Ersatz","Evanescent",
      "Exigence","Expiate","Fathom","Fatuous","Fervor","Fetid","Fissure","Foible","Fracas","Frailty",
      "Fugue","Gambit","Gaunt","Gloom","Havoc","Hubris","Hypocrisy","Iconoclast","Idolatry","Impasse",
      "Impugn","Infamy","Iniquity","Insipid","Insolence","Insurrection","Irony","Jinx","Knell","Lacuna",
      "Lament","Lethargy","Liminal","Loquacious","Malaise","Malice","Malignant","Malingerer","Mendacity","Mercurial",
      "Morose","Nadir","Nemesis","Nihilism","Oblique","Oblivion","Omen","Ossify","Ostracism","Paradox",
      "Pariah","Pathos","Perjury","Petulance","Piety","Platitude","Polemic","Portent","Pretense","Probity",
      "Profligacy","Quorum","Rancor","Recidivism","Relic","Repugnance","Rift","Sanctimony","Schism","Sedition",
      "Sophistry","Specter","Stoic","Subjugate","Subterfuge","Tacit","Temerity","Tether","Timorous","Torque",
      "Tumult","Umbra","Uncanny","Usurp","Vapid","Vendetta","Venomous","Vex","Vilify","Vortex",
      "Wane","Wrath","Xenophobia","Yearn","Zealot","Acquiesce","Admonish","Aloof","Ameliorate","Anachronism",
      "Antithesis","Approbation","Arcane","Asperity","Banter","Baroque","Belligerent","Bifurcate","Blandish","Brazen",
      "Cadaverous","Cavalier","Censure","Chagrin","Chicanery","Churlish","Cogitate","Compunction","Conflagration","Convoluted",
      "Dearth","Deleterious","Demagogue","Demure","Denigrate","Denounce","Despondent","Didactic","Disaffection","Discernment",
      "Disdain","Disparage","Dissemble","Dogmatic","Duplicitous","Effrontery","Egregious","Elusive","Embitter","Embroil",
      "Encumber","Enervate","Ephemeral","Equanimity","Errant","Evasion","Execrate","Excoriate","Expedient","Extemporaneous",
      "Fallow","Fastidious","Fawn","Feign","Ferment","Flippant","Florid","Foment","Forbear","Fraught",
      "Frenetic","Frivolous","Furtive","Gainsay","Grandiloquent","Hapless","Harangue","Haughty","Hegemony","Heinous",
      "Heresy","Impetuous","Indolence","Inept","Inexorable","Ingrate","Innuendo","Insipid","Insular","Intemperate",
      "Intransigent","Invective","Irascible","Irreverent","Jaded","Lachrymose","Lassitude","Lugubrious","Machination","Malediction",
      "Malevolent","Maudlin","Meretricious","Misanthrope","Mitigate","Moribund","Motive","Munificent","Nebulous","Nefarious",
      "Nihilistic","Nonchalant","Obdurate","Obstinate","Obsequious","Obtuse","Occult","Odious","Officious","Ominous",
      "Opaque","Opprobrium","Ostentation","Overwrought","Paltry","Pedantic","Pejorative","Pernicious","Perturbation","Petulant",
      "Philistine","Phlegmatic","Plaintive","Pliant","Polemical","Portentous","Precipitous","Pretentious","Prodigal","Profane",
      "Querulous","Recalcitrant","Recant","Recriminate","Reprobate","Rescind","Resentment","Resignation","Retribution","Rhetoric",
      "Ruinous","Sanguine","Sardonic","Scurrilous","Servile","Sinister","Slanderous","Slavish","Somnolent","Sophism",
      "Squalor","Stagnant","Stolid","Strident","Subversive","Sullen","Sycophant","Tenuous","Timid","Torpor",
      "Truculent","Turpitude","Tyranny","Unctuous","Unscrupulous","Usurpation","Vacuous","Vagrant","Vanity","Vaporous",
      "Vehement","Venerate","Verbose","Vicarious","Vigilant","Vindictive","Virulent","Vitriolic","Vituperate","Volatile",
      // ── additional hard words ──
      "Acrimony","Ameliorate","Anachronism","Antithesis","Aporia","Ataraxia","Axiom","Bellicose","Bifurcate","Bombastic",
      "Capitulate","Catharsis","Chicanery","Chiasmus","Clandestine","Corrosive","Credulity","Cupidity","Cupidity","Curmudgeon",
      "Defenestrate","Demagogue","Demurral","Denigrate","Desiccate","Didactic","Disaffection","Discursive","Dissemblance","Dystopia",
      "Ebullience","Efficacious","Effulgent","Egregious","Elision","Empiricism","Enervate","Ennui","Equivocal","Erudite",
      "Etiolate","Euphony","Evanescence","Execrable","Exigency","Exonerate","Expurgate","Extirpate","Extraneous","Fallacious",
      "Fatuous","Febrile","Feckless","Fetid","Filibuster","Flaccid","Fledgling","Fulminate","Gamut","Garrulous",
      "Grandiloquent","Gratuitous","Gregarious","Halcyon","Histrionic","Iconoclasm","Ignominy","Impecunious","Imperious","Inchoate",
      "Inimical","Iniquitous","Insouciant","Intractable","Invidious","Jejune","Juxtapose","Laconic","Lassitude","Loquacity",
      "Machiavellian","Magnanimous","Maladroit","Malevolence","Mendacious","Mercenary","Meretricious","Misanthropic","Mitigate","Mollify",
      "Myopic","Narcissism","Nefarious","Nihilism","Nonchalant","Obdurate","Obfuscate","Obloquy","Obstreperous","Occlude",
      "Odious","Officious","Opprobrious","Ostentation","Overwrought","Palimpsest","Panacea","Parsimonious","Pathological","Peccadillo",
      "Pedantic","Perfidious","Peripatetic","Pernicious","Perspicacious","Pertinacious","Philistine","Platitudinous","Pleonasm","Polemical",
      "Precipitous","Predilection","Pretentious","Prevaricate","Prodigious","Profligate","Propitious","Proximate","Querulous","Quixotic",
      "Recalcitrant","Recidivism","Redolent","Remonstrate","Reprobate","Rescind","Reticent","Rhetoric","Ruminative","Sanctimonious",
      "Sardonic","Schism","Scurrilous","Seditious","Simulacrum","Sinecure","Soporific","Sophism","Solipsism","Sordid",
      "Specious","Spurious","Squalid","Stagnant","Stentorian","Stolid","Strident","Subservient","Subversive","Sycophancy",
      "Taciturn","Tautology","Tendentious","Tenuous","Timorous","Torpid","Truculent","Tumultuous","Turpitude","Tyrant",
      "Unctuous","Unscrupulous","Usurpation","Vacuous","Vagrant","Vaporous","Vehemence","Venality","Vexation","Vindication",
      "Visceral","Vitiation","Vociferous","Voluble","Voracious","Xenophobia","Zealotry","Abstruse","Acerbic","Acrimonious",
    ],
  },

  // ── SPANISH ───────────────────────────────────────────────────────────────
  es: {
    easy: [
      "Abeja","Abrazo","Aceite","Aceituna","Aguila","Agua","Aire","Ajo","Alga","Alma",
      "Almendra","Alondra","Alpaca","Amanecer","Ancla","Ángel","Antorcha","Araña","Árbol","Arco",
      "Arena","Ardilla","Arma","Arroz","Asno","Atardecer","Azúcar","Azulejo","Ballena","Bambú",
      "Barro","Barco","Bella","Bisonte","Boca","Bolsa","Bota","Brisa","Bruja","Buey",
      "Búho","Burro","Cactus","Calabaza","Camello","Camino","Campana","Campo","Caña","Caracol",
      "Carbón","Carne","Caza","Cedro","Celosía","Cereal","Cereza","Cerdo","Cerveza","Charca",
      "Chocolate","Cielo","Ciervo","Cigüeña","Ciruela","Clavel","Cobaya","Cocina","Colmena","Conejo",
      "Coral","Corcho","Cordero","Corona","Corteza","Cría","Cuento","Cueva","Dalia","Dátil",
      "Delta","Desierto","Escarcha","Estanque","Estrella","Flecha","Flor","Foca","Frambuesa","Fresno",
      "Fruta","Fuego","Fuente","Gallina","Gamo","Garza","Gaveta","Gema","Glaciar","Golondrina",
      "Gorrión","Granada","Granja","Grieta","Grillo","Guante","Guisante","Gurbia","Helecho","Hierba",
      "Hierro","Higo","Hoja","Hormiga","Huerto","Hueso","Huevo","Isla","Jabalí","Jade",
      "Jarra","Junco","Lago","Lana","Lavanda","Lebrel","Lechuga","Leña","León","Liebre",
      "Lima","Limón","Linterna","Lira","Llanura","Lobo","Lodo","Luna","Luz","Madera",
      "Maíz","Manzana","Mariposa","Mármol","Médano","Menta","Mesa","Miel","Mirlo","Morera",
      "Musgo","Naranja","Nieve","Nido","Niebla","Nuez","Olmo","Orca","Orilla","Oruga",
      "Oveja","Palmera","Paloma","Panal","Pato","Pavo","Pez","Piedra","Pimienta","Pino",
      "Pluma","Pozo","Prado","Pulpo","Ratón","Raíz","Rama","Rana","Rayo","Roca",
      "Roble","Rocío","Romero","Rosa","Sauce","Sapo","Sauce","Semilla","Serpiente","Sierra",
      "Sombra","Tallo","Tejo","Tela","Tigre","Topo","Tortuga","Trébol","Trucha","Uva",
      "Vaca","Valle","Vela","Venado","Viento","Vid","Vino","Violeta","Yegua","Zarza",
      "Zorro","Acacia","Acebo","Acero","Alameda","Alamo","Alcón","Alerce","Aliso","Alondra",
      "Amapola","Anémona","Anguila","Anis","Arándano","Arao","Arcilla","Armadillo","Armiño","Arrayán",
      "Arrecife","Arroyo","Avispa","Azahar","Azor","Badajo","Bahía","Balsa","Bardal","Becada",
      "Bellotera","Berberecho","Berro","Berzas","Bisbita","Bledo","Boceto","Boga","Bonito","Bóveda",
      "Brécol","Brezo","Brizna","Brote","Bruma","Buitre","Burbuja","Caballete","Cabaña","Cabestro",
      "Cacatúa","Cadejo","Calandria","Caldera","Cangrejo","Cantil","Cañaveral","Capricho","Capullo","Caramillo",
      "Cardillo","Cardón","Cauce","Cayado","Caza","Cazador","Cenicero","Ceniza","Cierzo","Cigala",
      "Cimbra","Ciprés","Circo","Cirio","Cistus","Claro","Clavel","Cobijo","Codorniz","Colilla",
      "Colinabo","Colono","Comadreja","Corcova","Cormoran","Costal","Cotorra","Coyote","Cuajada","Cuco",
      "Culebra","Cuñete","Damasco","Dardo","Desfiladero","Diente","Duna","Égida","Emboscada","Encina",
      "Enebro","Enredadera","Entorno","Ermita","Escoba","Escollera","Espadaña","Espino","Esponja","Estero",
      "Fabada","Faisán","Falda","Fauno","Flamenco","Flechazo","Flojo","Follaje","Fontana","Forja",
      "Fosa","Fragua","Fresneda","Fronda","Gaviota","Gazapo","Geranio","Gorrino","Grulla","Guadaña",
      "Guante","Güira","Haba","Hado","Halcón","Hamaca","Hez","Hinojo","Hojaldre","Hoyo",
      "Huella","Humus","Hoz","Ibis","Icono","Iguazú","Jacinto","Jazmín","Jilguero","Junípero",
      "Lagartija","Lamia","Lamprea","Lampo","Lanza","Laurel","Lavandera","Lezna","Líquen","Llano",
      "Lúpulo","Madrugada","Maleza","Mangle","Mar","Marisma","Mástil","Matojo","Matorral","Médula",
      "Melisa","Membrillo","Mendieta","Mimosa","Miosotis","Molinillo","Molino","Mortero","Mosca","Mosco",
      "Nabo","Narciso","Nogal","Noria","Nutria","Ofita","Olivo","Orégano","Ortiga","Oscuro",
      "Oso","Otero","Paguro","Palomino","Palustre","Páramo","Pardal","Parra","Paseo","Pastizal",
      "Patella","Peñasco","Perdiz","Perija","Petrel","Picaza","Pingüino","Pino","Piña","Playa",
      "Pleamar","Plomo","Polvo","Porrón","Pradal","Proa","Prosopis","Puma","Punzón","Purín",
      "Quebrada","Rabilargo","Raci","Rallo","Ranúnculo","Raposa","Rastro","Ratonera","Remolacha","Retama",
      "Riada","Ribera","Rosal","Rovo","Rubia","Sabina","Salvia","Saúco","Sauce","Somormujo",
      "Tagua","Taladrillo","Tamarisco","Tapir","Tarántula","Tarma","Tejón","Tilán","Tilo","Toca",
      "Tomillo","Tordo","Tórtola","Urraca","Varano","Verbena","Vereda","Viborina","Vincapervinca","Viña",
      "Yuca","Zafiro","Zanahoria","Zarzamora","Zumaque",
    ],
    hard: [
      "Abismal","Acrimonia","Adúltero","Afectación","Agonía","Alquimia","Ambigüedad","Anacronismo","Anarquía","Anomalía",
      "Antítesis","Apatía","Apostasía","Arcano","Ardor","Artificio","Ascetismo","Aspersión","Atrofia","Augurio",
      "Avaricia","Axioma","Calamidad","Calumnia","Capricho","Catalizador","Cáustico","Cautela","Cifra","Clamor",
      "Cogente","Colusión","Compunción","Condescendencia","Contrición","Culpable","Cinismo","Debacle","Decadencia","Deferencia",
      "Diluvio","Depravación","Desolación","Despotismo","Dialéctica","Difidencia","Dilapidación","Elegía","Enigma","Entropía",
      "Efímero","Equivocar","Ersatz","Evanescente","Exigencia","Expiar","Absurdo","Fatuo","Fervor","Fétido",
      "Fisura","Defecto","Fracas","Fragilidad","Fuga","Gambito","Lúgubre","Oscuridad","Caos","Soberbia",
      "Hipocresía","Iconoclasta","Idolatría","Callejón","Mancilla","Infamia","Iniquidad","Insípido","Insolencia","Insurrección",
      "Ironía","Sortilegio","Glas","Laguna","Lamento","Letargo","Liminal","Locuaz","Malestar","Malicia",
      "Maligno","Fingidor","Mendacidad","Mercurial","Sombrío","Nadir","Némesis","Nihilismo","Oblicuo","Olvido",
      "Presagio","Osificar","Ostracismo","Paradoja","Paria","Patetismo","Perjurio","Petulancia","Piedad","Platitud",
      "Polémico","Portento","Pretensión","Integridad","Prodigalidad","Quórum","Rencor","Reincidencia","Reliquia","Repugnancia",
      "Grieta","Santimonia","Cisma","Sedición","Sofistería","Espectro","Estoico","Subyugar","Subterfugio","Tácito",
      "Temeridad","Atadura","Tímido","Torque","Tumulto","Umbra","Inquietante","Usurpar","Soso","Vendeta",
      "Venenoso","Vejar","Vilipendiar","Vórtice","Declive","Ira","Xenofobia","Anhelo","Fanático","Adquiescencia",
      "Amonestar","Distante","Mejorar","Anacronismo","Antítesis","Aprobación","Arcano","Aspereza","Broma","Barroco",
      "Belicoso","Bifurcar","Adulador","Descarado","Cadavérico","Altanero","Censura","Vergüenza","Trampa","Hosco",
      "Cogitar","Compunción","Conflagración","Intrincado","Escasez","Deletéreo","Demagogo","Recatado","Denigrar","Denunciar",
      "Desalentado","Didáctico","Desafección","Discernimiento","Desdén","Menospreciar","Disimular","Dogmático","Duplicidad","Descaro",
      "Monstruoso","Elusivo","Amargar","Enredar","Gravoso","Enervar","Efímero","Ecuanimidad","Errante","Evasión",
      "Execrar","Excoriate","Expediente","Improvisado","Barbecho","Quisquilloso","Adular","Fingir","Fermentar","Frívolo",
      "Florido","Fomentar","Aguantar","Cargado","Frenético","Frívolo","Furtivo","Contradecir","Grandilocuente","Infeliz",
      "Harangue","Altivo","Hegemonía","Abominable","Herejía","Impetuoso","Indolencia","Inepto","Inexorable","Ingrato",
      "Insinuación","Insípido","Insular","Intemperado","Intransigente","Invectiva","Irascible","Irreverente","Hastiado","Lacrimoso",
      "Lasitud","Lúgubre","Maquinación","Maldición","Malévolo","Sensiblero","Ventajista","Misántropo","Mitigar","Moribundo",
    ],
  },

  // ── FRENCH ───────────────────────────────────────────────────────────────
  fr: {
    easy: [
      "Abeille","Aiguille","Aigle","Ail","Alouette","Amande","Ancre","Ange","Araignée","Arbre",
      "Arc","Arche","Ardoise","Argile","Arroche","Asperge","Aubépine","Aube","Azur","Baleine",
      "Bambou","Bateau","Boue","Bouleau","Branche","Bruyère","Buisson","Bûche","Caille","Canard",
      "Cèdre","Cerise","Champignon","Chandelle","Chardon","Chêne","Chèvre","Cigogne","Cire","Cloche",
      "Clou","Cobaye","Cochon","Colombe","Coq","Corbeau","Coquelicot","Coquille","Corail","Corde",
      "Corne","Courge","Crapaud","Crayère","Cristal","Croix","Cytise","Daim","Datte","Delta",
      "Dune","Eau","Éclair","Écorce","Écureuil","Épée","Épine","Érable","Escargot","Étoile",
      "Faucon","Fenouil","Feuille","Flamme","Flèche","Fleur","Fontaine","Forêt","Fourmi","Frêne",
      "Froment","Fumée","Galette","Gendarme","Givre","Gland","Glace","Grenouille","Grève","Grive",
      "Guêpe","Héron","Hêtre","Hibou","Houx","Insecte","Iris","Ivoire","Jade","Jonc",
      "Jonquille","Lac","Laine","Lapin","Lavande","Lièvre","Lilas","Limace","Lin","Loup",
      "Lune","Luciole","Lumière","Maïs","Marguerite","Martre","Mer","Mésange","Miel","Moineau",
      "Mousse","Mûre","Nid","Noix","Nuage","Nuit","Oeillet","Olive","Ombre","Onde",
      "Orge","Ortie","Ours","Paille","Palmier","Paon","Papillon","Pelouse","Peuplier","Pierre",
      "Pigeon","Pin","Pissenlit","Platane","Plume","Pluie","Poire","Pommier","Prairie","Prune",
      "Racine","Rameau","Renard","Rivière","Roche","Roseau","Rosée","Rosier","Rouge-gorge","Rye",
      "Sable","Sapin","Sauce","Saule","Seigle","Sel","Serpent","Silex","Soleil","Souris",
      "Taureau","Taupe","Thym","Tige","Tigre","Torrent","Trèfle","Truffe","Tulipe","Vallée",
      "Veau","Violette","Vipère","Vison","Vague","Zébu","Acacias","Acajou","Agrion","Alise",
      "Alyte","Amphore","Anémone","Anguille","Anis","Araignée","Artichaut","Aspic","Aubépine","Aurochs",
      "Avalanche","Avocette","Avoine","Azalée","Bardane","Barrage","Belette","Berce","Bergeronnette","Bison",
      "Bittern","Blaireau","Bolet","Bouvreuil","Brochet","Bruant","Brume","Busard","Buse","Butome",
      "Capucine","Carpe","Cassis","Cerf","Cerfeuil","Chardonneret","Châtaigne","Chouette","Chrysanthème","Cigale",
      "Cirse","Citron","Civette","Clématite","Colchique","Combe","Conopode","Coprin","Coucou","Coulis",
      "Crevette","Crocus","Cytise","Écrevisse","Élan","Épervière","Épervier","Éphémère","Érismature","Estran",
      "Étang","Falaise","Fauvette","Fétuque","Fléole","Fluviatile","Fourmi","Framboise","Fraxinelle","Friche",
      "Fromental","Fuligule","Fumeterre","Gaillarde","Gallinule","Genet","Géranium","Giroflée","Gîte","Gorge",
      "Goutte","Graminée","Grèbe","Grimpereau","Grolle","Groseille","Guêpier","Guifette","Gypaète","Hêtraie",
      "Houblon","Huppe","Ibis","If","Jacinthe","Jasmin","Juniperus","Laîche","Lampion","Lande",
      "Lapin","Laîche","Lentille","Lérot","Linotte","Liseron","Loir","Loriot","Lupin","Luzule",
      "Lycopode","Lynx","Mâchefer","Magpie","Maïanthème","Maladière","Marais","Marsault","Martinet","Massette",
      "Merle","Mésange","Millepertuis","Modène","Mouflon","Mouette","Moulin","Muguet","Mulot","Myosotis",
      "Myrtille","Narcisse","Nénuphar","Nivernais","Noctuelle","Noisette","Noyer","Oie","Orvet","Osier",
      "Outarde","Perce-neige","Perdrix","Pervenche","Pétrel","Phalène","Phasme","Phoque","Pic","Pie",
      "Pipit","Pissenlit","Pivoine","Polatouche","Polypode","Potentille","Pouillot","Primevère","Pulicaire","Putois",
      "Ragondin","Râle","Rétama","Rhinolophe","Rollier","Rougequeue","Roussette","Sablier","Salamandre","Sanglier",
      "Sanicle","Sarcelle","Sarriette","Saxifrage","Scolopendre","Serin","Serpolet","Silène","Sittelle","Sorgho",
      "Spatule","Sterne","Sympétrum","Tadorné","Talon","Tamia","Tarentule","Tarse","Tétras","Thérèse",
      "Tichodrome","Tournesol","Trèfle","Triton","Troène","Troglodyte","Tulipe","Vanesse","Verdier","Vipère",
      "Zostère",
    ],
    hard: [
      "Abîme","Acrimonie","Alchimie","Aliénation","Allégorie","Ambiguïté","Anachronisme","Anarchie","Anomalie","Antithèse",
      "Apathie","Apostasie","Arcane","Ardeur","Artifice","Ascétisme","Aspersion","Atrophie","Augure","Avarice",
      "Axiome","Ballast","Bedlam","Beguin","Démenti","Belligérance","Fléau","Cacophonie","Cadence","Calamité",
      "Calomnie","Caprice","Catalyseur","Caustique","Réserve","Chiffre","Clameur","Cogent","Collusion","Compunction",
      "Condescendance","Contrition","Coupable","Cynisme","Débâcle","Décadence","Déférence","Déluge","Dépravation","Désolation",
      "Despotisme","Dialectique","Diffidence","Délabrement","Élégie","Énigme","Entropie","Éphémère","Équivoquer","Ersatz",
      "Évanescent","Exigence","Expier","Absurde","Idiot","Ferveur","Fétide","Fissure","Défaut","Fracas",
      "Fragilité","Fugue","Gambito","Lugubre","Sombre","Chaos","Hubris","Hypocrisie","Iconoclaste","Idolâtrie",
      "Impasse","Ternir","Infamie","Iniquité","Insipide","Insolence","Insurrection","Ironie","Sort","Glas",
      "Lacune","Lamentation","Léthargie","Liminal","Loquace","Malaise","Malice","Malin","Simulateur","Mendacité",
      "Mercuriel","Morose","Nadir","Némésis","Nihilisme","Oblique","Oubli","Présage","Ossifier","Ostracisme",
      "Paradoxe","Paria","Pathétisme","Parjure","Pétulance","Piété","Platitude","Polémique","Portent","Prétention",
      "Probité","Prodigalité","Quorum","Rancœur","Récidivisme","Relique","Répugnance","Fissure","Sanctimonie","Schisme",
      "Sédition","Sophisme","Spectre","Stoïque","Subjuguer","Subterfuge","Tacite","Témérité","Attache","Timoré",
      "Torque","Tumulte","Ombre","Inquiétant","Usurper","Fade","Vendetta","Venimeux","Vexer","Vilipender",
      "Tourbillon","Décliner","Courroux","Xénophobie","Aspiration","Fanatique","Acquiescement","Admonition","Aloof","Améliorer",
      "Anachronisme","Antithèse","Approbation","Arcane","Aspérité","Badinage","Baroque","Belliqueux","Bifurquer","Flatter",
      "Cadavéreux","Cavalier","Censure","Chagrin","Chicanerie","Grossier","Cogiter","Compunction","Conflagration","Compliqué",
      "Pénurie","Délétère","Démagogue","Discret","Dénigrer","Dénoncer","Découragé","Didactique","Désaffection","Discernement",
      "Dédain","Rabaisser","Dissimuler","Dogmatique","Duplicité","Effronterie","Scandaleux","Élusif","Aigrir","Embourber",
      "Alourdir","Énerver","Éphémère","Équanimité","Errant","Évasion","Exécrer","Excoriate","Expédient","Improvisé",
      "Friche","Méticuleux","Aduler","Feindre","Fermenter","Frivole","Fleuri","Attiser","Endurer","Chargé",
      "Frénétique","Futile","Furtif","Contredire","Grandiloquent","Malchanceux","Harangue","Hautain","Hégémonie","Odieux",
      "Hérésie","Impétueux","Indolence","Inapte","Inexorable","Ingrat","Insinuation","Insipide","Insulaire","Intempérant",
      "Intransigeant","Invective","Irascible","Irrespectueux","Blasé","Larmoyant","Lassitude","Lugubre","Machination","Malédiction",
    ],
  },

  // ── GERMAN ────────────────────────────────────────────────────────────────
  de: {
    easy: [
      "Adler","Ähre","Amsel","Ameise","Anker","Apfel","Ast","Bachforelle","Bär","Bart",
      "Baum","Beere","Berg","Birke","Birne","Bison","Blatt","Blüte","Blume","Boden",
      "Brücke","Brunnen","Buche","Busch","Dachs","Distel","Dohle","Domino","Dorf","Eiche",
      "Eichhörnchen","Eiszapfen","Elch","Erle","Eule","Falke","Fasan","Feige","Fels","Fichte",
      "Fische","Fliege","Fuchs","Gabel","Gänseblümchen","Gar","Garten","Gemse","Gerste","Gras",
      "Grille","Hase","Heidelbeere","Helm","Herbst","Hirsch","Holunder","Honig","Hummel","Igel",
      "Imme","Insekt","Iris","Jagd","Kamille","Käfer","Katze","Kiefer","Kirsche","Klee",
      "Knoblauch","Knospe","Kolben","Korb","Kraut","Krebs","Kröte","Lachs","Lärche","Laub",
      "Lauch","Laus","Lerche","Linde","Löwenzahn","Luchs","Mais","Maus","Meise","Milch",
      "Minze","Mohn","Moos","Möwe","Mücke","Muschel","Nachtigall","Netz","Nuss","Odermennig",
      "Otter","Pappel","Pfeil","Pilz","Pirol","Primel","Qualle","Rabe","Raps","Rassel",
      "Ratte","Rauch","Reh","Regen","Rohrdommel","Rose","Rosmarin","Rost","Rotkehlchen","Rübezahl",
      "Salamander","Salz","Samen","Sand","Sauerampfer","Schaf","Schilfrohr","Schmetterling","Schwalbe","Schwein",
      "Seeadler","Segel","Seil","Silber","Sonne","Specht","Spinne","Stern","Storch","Stroh",
      "Stute","Tanne","Tau","Taube","Tiger","Veilchen","Vogel","Walderdbeere","Wasser","Weide",
      "Weizen","Wolf","Wolke","Worm","Wurm","Wiesel","Zaunkönig","Ziege","Zikade","Zirbelkiefer",
      "Aal","Abt","Affe","Akazie","Alge","Alpenrose","Ammonit","Anaconda","Anemonenblüte","Anker",
      "Arnika","Auerhuhn","Auerhahn","Auster","Azalee","Bachstelze","Baerlauch","Baldrian","Bambusrohr","Bartmeise",
      "Baummarder","Bekassine","Bergdohle","Berggams","Birkhuhn","Blässhuhn","Blaubeere","Blaukehlchen","Blutbuche","Bodendeckel",
      "Brombeere","Brombeerstrauch","Bruchweide","Buchfink","Buchwanze","Dachsbau","Damhirsch","Delphin","Distelfalter","Dohlenansiedlung",
      "Dornbusch","Dreizehenmöwe","Edelweiss","Eibe","Eidechse","Eisvogel","Elbeite","Elfenblume","Erlkönig","Ernte",
      "Esche","Falkner","Faulbaum","Faulpelz","Feddich","Felshuhn","Fensterkreuz","Feuerfalter","Fichtenzapfen","Fischadler",
      "Flachs","Flattergras","Floh","Flunder","Flußbarsch","Forellensee","Frauenschuh","Frühling","Fuchsschwanz","Gänsegeier",
      "Gärtnerblume","Gauk","Gewürzstrauch","Ginster","Glasauge","Glitzerstern","Goldregen","Goldammer","Graureiher","Gämsbart",
      "Habicht","Hagedorn","Hamster","Haubentaucher","Hausrotschwanz","Hecke","Heilkraut","Helmkraut","Heuschrecke","Himbeerstrauch",
      "Hirtentäschel","Hohlweg","Hornisse","Husarenknopf","Hagebutte","Johannisbeere","Karpfen","Kiebitz","Kirchturmfalke","Kleiber",
      "Kleinhöcker","Klettenwurzel","Knöterich","Kolkrabe","Königsfarn","Kornweihe","Krähe","Kranich","Kreuzotter","Kuckuck",
      "Lachseule","Laubsänger","Lavendelfalter","Laubheuschrecke","Lilienblüte","Liliensamt","Löffler","Luchsspur","Lupine","Madder",
      "Maiglöckchen","Mauereidechse","Mauerläufer","Mehlschwalbe","Mischwald","Mittelspecht","Moorfrosch","Morchel","Murmeltier","Nashornkäfer",
      "Nieswurz","Nistkasten","Nutzpflanze","Ochsenauge","Orchidee","Pestwurz","Pfauenauge","Pflückreife","Pilzfund","Pippau",
      "Platane","Platanenblüte","Rainfarn","Raubwürger","Raufußbussard","Raufußkauz","Rauhfußkauz","Rebhuhn","Rehkitz","Rohrweihe",
      "Rosenkäfer","Rotmilan","Rotschenkels","Saatgans","Sanderling","Sandregenpfeifer","Schafstelze","Schellente","Schilfrohr","Schlüsselblume",
    ],
    hard: [
      "Abgrund","Alchemie","Alienation","Allegorie","Mehrdeutigkeit","Anachronismus","Anarchie","Anomalie","Antithese","Apathie",
      "Apostasie","Arcanum","Glut","Kunststück","Askese","Besprengung","Atrophie","Weissagung","Habgier","Axiom",
      "Ballast","Chaos","Verführen","Widerlegen","Bellizismus","Seuche","Kakophonie","Kadenz","Calamität","Verleumdung",
      "Launenhaftigkeit","Katalysator","Ätzend","Vorbehalt","Chiffre","Getöse","Schlüssig","Kollusion","Reue","Herablassung",
      "Reue","Schuldige","Zynismus","Debakel","Dekadenz","Ehrerbietung","Sintflut","Verdorbenheit","Trostlosigkeit","Despotismus",
      "Dialektik","Schüchternheit","Verfall","Elegie","Rätsel","Entropie","Vergänglich","Zweideutig","Ersatz","Flüchtig",
      "Dringlichkeit","Sühnen","Absurd","Töricht","Inbrunst","Faulig","Riss","Schwäche","Fuge","Gambito",
      "Düster","Dunkel","Chaos","Überheblichkeit","Heuchelei","Bilderstürmer","Götzenanbetung","Sackgasse","Beflecken","Schande",
      "Ungerechtigkeit","Fade","Frechheit","Aufruhr","Ironie","Verhängnis","Glockenklang","Leerstelle","Klage","Lethargie",
      "Schwellenwert","Redselig","Unwohlsein","Bösartigkeit","Bösartig","Heuchler","Unehrlichkeit","Sprunghaft","Düster","Nadir",
      "Nemesis","Nihilismus","Schräg","Vergessen","Omen","Versteinerung","Ächtung","Paradox","Paria","Pathos",
      "Meineid","Launenhaftigkeit","Frömmigkeit","Gemeinplatz","Polemik","Vorzeichen","Vortäuschung","Rechtschaffenheit","Verschwendung","Quorum",
      "Groll","Rückfall","Relikt","Abscheu","Spaltung","Frömmelei","Schisma","Aufruhr","Sophisterei","Gespenst",
      "Stoisch","Unterwerfung","Vertuschung","Unausgesprochen","Verwegenheit","Fessel","Ängstlich","Drehmoment","Tumult","Schatten",
      "Unheimlich","Anmaßung","Fade","Rache","Giftig","Quälen","Verleumden","Strudel","Schwund","Zorn",
      "Fremdenfeindlichkeit","Sehnsucht","Eifer","Zustimmung","Ermahnungen","Distanziert","Verbessern","Anachronismus","Antithese","Zustimmung",
      "Arcanum","Schroffheit","Spott","Barock","Kriegerisch","Gabeln","Schmeicheln","Leichenblass","Kavalier","Rüge",
      "Scham","Täuscherei","Flegelhaft","Nachdenken","Reue","Feuersturm","Verwickelt","Knappheit","Schädlich","Demagoge",
      "Zurückhaltend","Schmähen","Anprangern","Niedergeschlagen","Didaktisch","Entfremdung","Scharfsinn","Verachtung","Herabsetzen","Verheimlichen",
      "Dogmatisch","Doppelzüngig","Frechheit","Ungeheuerlich","Ausweichend","Erbittern","Verstricken","Beschwerlich","Erschöpfen","Vergänglich",
      "Gleichmut","Irrend","Ausweichen","Verdammen","Geißeln","Opportunistisch","Improvisiert","Brachliegen","Penibel","Schmeicheln",
      "Vortäuschen","Gären","Frivol","Blumig","Anheizen","Ertragen","Belastet","Rastlos","Nichtig","Heimtückisch",
      "Widersprechen","Hochtrabend","Glücklos","Harangue","Hochmütig","Vorherrschaft","Abscheulich","Ketzerei","Ungestüm","Trägheit",
      "Unfähig","Unerbittlich","Undankbar","Andeutung","Fade","Inselartig","Zügellos","Unnachgiebig","Angriff","Jähzornig",
      "Respektlos","Abgestumpft","Tränenreich","Mattigkeit","Düster","Machenschaften","Verfluchung","Bösgesinnt","Rührselig","Vorteilssucht",
    ],
  },

  // ── PORTUGUESE ────────────────────────────────────────────────────────────
  pt: {
    easy: [
      "Abelha","Abeto","Açafrão","Acácia","Águia","Água","Alecrim","Alface","Alga","Alho",
      "Alma","Almendoa","Aloe","Amendoeira","Âncora","Andorinha","Anémona","Ângela","Aranha","Árvore",
      "Arco","Ardósia","Argila","Arroio","Azeitona","Azevinho","Bacalhau","Baleia","Bambu","Barro",
      "Besouro","Borboleta","Brilho","Brisa","Broto","Bugio","Cana","Canela","Caracol","Cardos",
      "Carvalho","Castanha","Cavalo","Cedro","Cenoura","Cereja","Cervo","Choupo","Chuva","Cigarra",
      "Cipestre","Cobra","Cogumelo","Cordeiro","Coruja","Couto","Cravo","Cristal","Cruz","Dendrobia",
      "Estrela","Estanho","Faia","Falcão","Farol","Fava","Feno","Figo","Flecha","Flor",
      "Fonte","Formiga","Freixo","Fruto","Fumo","Girassol","Grão","Grilos","Grou","Hera",
      "Hortelã","Ilha","Íris","Jacarandá","Jacinto","Junco","Lagoa","Lajeta","Lança","Laranja",
      "Laurel","Lavanda","Lebre","Lentisco","Lírio","Lodo","Lobo","Loto","Lua","Maçã",
      "Magnólia","Margarida","Marisco","Mel","Mimosa","Miosótis","Mocho","Mogno","Morango","Mouro",
      "Musgo","Myrto","Narciso","Nevoeiro","Neve","Ninho","Nogueira","Oleo","Oliveira","Orvalho",
      "Ostra","Palmeira","Papagaio","Pato","Pedra","Pelicano","Penedo","Pétala","Pinheiro","Pluma",
      "Pomba","Prado","Presa","Raiz","Rato","Rã","Rosmaninho","Rouxinol","Salgueiro","Salsa",
      "Samambaia","Sapo","Sardinha","Seixo","Serpente","Serra","Sol","Tojo","Tomilho","Tordo",
      "Trevo","Truta","Tulipa","Uva","Veado","Vento","Videira","Violeta","Xara","Zimbro",
      "Abutre","Alcedo","Alevinos","Alfazema","Alforje","Alheira","Alicate","Alisos","Almofariz","Alóe",
      "Alpendurada","Alqueves","Alteia","Altivo","Álvaro","Amendoim","Amora","Ananás","Andorinhas","Aníbal",
      "Anicho","Anileira","Antúrio","Anzol","Apoio","Aquífero","Arame","Aranha","Arcaz","Ardósia",
      "Aredão","Arenque","Argola","Aroeira","Arranha","Arrieiros","Artémia","Arundinária","Asa","Asno",
      "Aspargo","Assobiador","Astrágalo","Atalho","Atanor","Atum","Azinhaga","Azinheiro","Babosa","Bacelo",
      "Bacio","Bago","Bagoeiro","Baía","Baixo","Balsa","Bambu","Barbo","Barranco","Barreiro",
      "Barulho","Beija-flor","Bicho-da-seda","Bigorna","Bilro","Bisonte","Boieiro","Bolota","Bolso","Bonito",
      "Bordão","Bordo","Borrelho","Botuelho","Brejo","Broa","Bronze","Buxo","Caça","Cadmo",
      "Cagarras","Cagilo","Calatrava","Calombo","Caloura","Camaleão","Camponês","Cancro","Capim","Capivara",
      "Capuz","Caramujo","Carpa","Carraça","Carrasco","Cartaxo","Casca","Cascata","Casinha","Castor",
      "Catavento","Catfish","Cavala","Cavidade","Cegonha","Centeio","Cerceta","Charcos","Chasco","Chilrear",
      "Cipó","Circo","Citrino","Ciúmes","Clamor","Clavícula","Codorniz","Columba","Cominho","Coralinho",
      "Corça","Cormorão","Corujinha","Cotovia","Crisálida","Crocante","Cromado","Curvelo","Demorou","Escabeche",
    ],
    hard: [
      "Abismo","Acrimónia","Alquimia","Alienação","Alegoria","Ambiguidade","Anacronismo","Anarquia","Anomalia","Antítese",
      "Apatia","Apostasia","Arcano","Ardor","Artifício","Ascetismo","Aspersão","Atrofia","Augúrio","Avareza",
      "Axioma","Lastro","Caos","Seduzir","Desmentir","Belicismo","Praga","Cacofonia","Cadência","Calamidade",
      "Calúnia","Capricho","Catalisador","Cáustico","Reserva","Cifra","Clamor","Cogente","Conluio","Compunção",
      "Condescendência","Contrição","Culpado","Cinismo","Débacle","Decadência","Deferência","Dilúvio","Depravação","Desolação",
      "Despotismo","Dialética","Difidência","Dilapidação","Elegia","Enigma","Entropia","Efémero","Equivocar","Ersatz",
      "Evanescente","Exigência","Expiar","Absurdo","Fátuo","Fervor","Fétido","Fissura","Defeito","Fragor",
      "Fragilidade","Fuga","Gambito","Lúgubre","Sombrio","Caos","Hubris","Hipocrisia","Iconoclasta","Idolatria",
      "Impasse","Manchar","Infâmia","Iniquidade","Insípido","Insolência","Insurreição","Ironia","Sortilégio","Toque",
      "Lacuna","Lamento","Letargia","Liminal","Loquaz","Mal-estar","Malícia","Maligno","Fingidor","Mendacidade",
      "Mercurial","Sombrio","Nadir","Némesis","Niilismo","Oblíquo","Olvido","Presságio","Ossificar","Ostracismo",
      "Paradoxo","Pária","Patetismo","Perjúrio","Petulância","Piedade","Platitude","Polémico","Portento","Pretensão",
      "Probidade","Prodigalidade","Quórum","Rancor","Reincidência","Relíquia","Repugnância","Fissura","Santimónia","Cisma",
      "Sedição","Sofisma","Espectro","Estoico","Subjugar","Subterfúgio","Tácito","Temeridade","Amarra","Tímido",
      "Torque","Tumulto","Sombra","Inquietante","Usurpar","Insosso","Vendeta","Venenoso","Vexar","Vilipendiar",
      "Vórtice","Declinar","Ira","Xenofobia","Anseio","Fanático","Aquiescência","Admoestação","Distante","Melhorar",
      "Anacronismo","Antítese","Aprovação","Arcano","Aspereza","Gracejo","Barroco","Beligerante","Bifurcar","Lisonjear",
      "Cadavérico","Cavaleiro","Censura","Vergonha","Marosca","Grosseiro","Cogitar","Compunção","Conflagração","Complicado",
      "Escassez","Deletério","Demagogo","Recatado","Denegrir","Denunciar","Desanimado","Didático","Desafeto","Discernimento",
      "Desdém","Menosprezar","Disfarçar","Dogmático","Duplicidade","Descaro","Egrégico","Elusivo","Amargar","Enredar",
      "Sobrecarregar","Enervar","Efémero","Equanimidade","Errante","Evasão","Execrar","Fustigar","Expediente","Improvisado",
      "Pousio","Meticuloso","Adular","Fingir","Fermentar","Frívolo","Florido","Instigar","Suportar","Carregado",
      "Frenético","Fútil","Furtivo","Contradizer","Grandiloquente","Infeliz","Arenga","Altivo","Hegemonia","Abominável",
      "Heresia","Impetuoso","Indolência","Inépcia","Inexorável","Ingrato","Insinuação","Insípido","Insular","Intemperado",
      "Intransigente","Invetiva","Irascível","Irreverente","Entediado","Lacrimoso","Lassidão","Lúgubre","Maquinação","Maldição",
    ],
  },

  // ── ITALIAN ───────────────────────────────────────────────────────────────
  it: {
    easy: [
      "Abete","Abisso","Acacia","Acero","Aglio","Agrume","Airone","Alce","Aliga","Alloro",
      "Aloe","Alpaca","Ancora","Anfibia","Anguilla","Anemone","Aquila","Arancio","Arbusto","Arco",
      "Argilla","Arma","Arnica","Asso","Astice","Avena","Avvoltoio","Azalea","Bambu","Barbagianni",
      "Basilico","Belladonna","Betulla","Bisonte","Bocciolo","Bontà","Bordo","Brugo","Bue","Bufo",
      "Capriolo","Cardellino","Cardo","Carpa","Castagno","Cedro","Centauro","Cerbiatto","Cervo","Cicala",
      "Ciclamino","Cigno","Cinghiale","Cipresso","Ciuffolotto","Coccinella","Codibugnolo","Colomba","Corallo","Corbezzolo",
      "Corcovado","Cornacchia","Corvo","Coyote","Cristallo","Crostaceo","Cuccù","Daino","Delfino","Elce",
      "Erica","Faggio","Fagiano","Falco","Farfalla","Fico","Forbice","Formica","Fossile","Fringuello",
      "Fuco","Gabbiano","Gallina","Gambero","Gatto","Garzetta","Genziana","Germoglio","Ghiaccio","Ghiro",
      "Ginepro","Girasole","Gorgonia","Grillo","Gru","Gufo","Ibis","Iris","Istrice","Lago",
      "Lamella","Lana","Lapazio","Larice","Lattuga","Lavanda","Lepre","Lichene","Limone","Lince",
      "Loto","Lucciola","Lupo","Magnolia","Margherita","Merlo","Miele","Mimosa","Mirtillo","Mughetto",
      "Muschio","Narciso","Nebbia","Neve","Nido","Noce","Orchidea","Orso","Ortica","Palafia",
      "Pappagallo","Pernice","Pettirosso","Pino","Pipistrello","Platano","Porcello","Primula","Quercia","Ramo",
      "Ramoscello","Ranocchio","Rondine","Rosmarino","Rosolaccio","Rovere","Salamandra","Salice","Salvia","Sambuco",
      "Scimmia","Scoiattolo","Scolapasta","Serpe","Silene","Sorbo","Tasso","Timberland","Timo","Tordo",
      "Trifoglio","Trota","Tulipano","Uva","Vipera","Volpe","Abatino","Adagio","Aghifoglio","Albero",
      "Alcione","Alimurgia","Almadina","Alocasia","Alonzo","Altopiano","Amaranta","Ambrosia","Amfibio","Ammasso",
      "Anco","Andropogon","Anfibio","Angelica","Angiola","Animale","Anitra","Anone","Antilope","Aquilone",
      "Arachide","Arcipelago","Arena","Argento","Ariete","Arrabiato","Artropode","Arum","Arvicola","Astragalo",
      "Attinia","Avena","Avifauna","Avocetta","Avvoltoio","Bacca","Balena","Balza","Banano","Barbaforte",
      "Barcellona","Barbio","Bardana","Barracuda","Beccaccia","Beccaccino","Beccafico","Beccamorto","Beccofrusone","Bertuccia",
      "Biancospino","Bidens","Bietola","Bisbita","Bissa","Bistorta","Boleto","Bottatrice","Branca","Briozoi",
      "Bufalo","Buglossa","Caimano","Camoscio","Canfora","Cannella","Capinera","Caprifico","Carpino","Cartamo",
      "Caruncola","Cassia","Castoro","Caucale","Cedrela","Cerambice","Cervide","Cetriolo","Chiodino","Chirotteri",
      "Ciconia","Cicouta","Cinorodo","Cipollone","Cirripedi","Clematis","Codirosso","Colobbo","Colombaccio","Conifera",
      "Controcampagna","Copepodi","Coprina","Cormorano","Cornutia","Corollo","Cotone","Cotornia","Covone","Crisalide",
      "Cristino","Crocevia","Cuculo","Cutrettola","Cynara","Dattero","Deflusso","Diluvio","Diplotassi","Dracena",
      "Echinops","Egilope","Equiseto","Erba","Erba-cipollina","Erba-medica","Erbacea","Erbolaio","Erica","Estivazione",
    ],
    hard: [
      "Abisso","Acrimonia","Alchimia","Alienazione","Allegoria","Ambiguità","Anacronismo","Anarchia","Anomalia","Antitesi",
      "Apatia","Apostasia","Arcano","Ardore","Artificio","Ascetismo","Aspersione","Atrofia","Augurio","Avarizia",
      "Assioma","Zavorra","Caos","Sedurre","Smentire","Belligeranza","Piaga","Cacofonia","Cadenza","Calamità",
      "Calunnia","Capriccio","Catalizzatore","Caustico","Riserva","Cifrario","Clamore","Cogente","Collusione","Compunzione",
      "Condiscendenza","Contrizione","Colpevole","Cinismo","Debacle","Decadenza","Deferenza","Diluvio","Depravazione","Desolazione",
      "Dispotismo","Dialettica","Diffidenza","Dilapidazione","Elegia","Enigma","Entropia","Effimero","Equivocare","Ersatz",
      "Evanescente","Esigenza","Espiare","Assurdo","Fatuo","Fervore","Fetido","Fessura","Difetto","Fracasso",
      "Fragilità","Fuga","Gambetto","Lugubre","Oscuro","Caos","Hubris","Ipocrisia","Iconoclasta","Idolatria",
      "Vicolo cieco","Macchiare","Infamia","Iniquità","Insipido","Insolenza","Insurrezione","Ironia","Maleficio","Rintocco",
      "Lacuna","Lamento","Letargia","Liminale","Loquace","Malessere","Malizia","Maligno","Simulatore","Mendacità",
      "Mercuriale","Tetro","Nadir","Nemesi","Nichilismo","Obliquo","Oblio","Presagio","Ossificare","Ostracismo",
      "Paradosso","Paria","Patetismo","Spergiuro","Petulanza","Pietà","Luogo comune","Polemico","Portento","Pretesa",
      "Probità","Prodigalità","Quorum","Rancore","Recidivismo","Reliquia","Repugnanza","Spaccatura","Bigottismo","Scisma",
      "Sedizione","Sofisma","Spettro","Stoico","Soggiogare","Sotterfugio","Tacito","Temerarietà","Catena","Timoroso",
      "Coppia","Tumulto","Ombra","Inquietante","Usurpare","Insulso","Vendetta","Velenoso","Vessare","Vilipendere",
      "Vortice","Declinare","Ira","Xenofobia","Desiderare","Fanatico","Acquiescenza","Ammonimento","Distaccato","Migliorare",
      "Anacronismo","Antitesi","Approvazione","Arcano","Asperità","Battuta","Barocco","Bellicoso","Biforcazione","Adulare",
      "Cadaverico","Cavaliere","Censura","Vergogna","Trucco","Maleducato","Cogitare","Compunzione","Conflagrazione","Intricato",
      "Scarsità","Deleterio","Demagogo","Posato","Denigrare","Denunciare","Scoraggiato","Didattico","Disaffezione","Discernimento",
      "Disprezzo","Sminuire","Dissimulare","Dogmatico","Doppiezza","Sfrontatezza","Grave","Elusivo","Amareggiare","Coinvolgere",
      "Gravoso","Snervare","Effimero","Equanimità","Errante","Evasione","Esecrare","Fustigare","Opportunistico","Improvvisato",
      "Incultivo","Meticoloso","Adulare","Fingere","Fermentare","Frivolo","Fiorito","Fomentare","Sopportare","Carico",
      "Frenetico","Futile","Furtivo","Contraddire","Grandiloquente","Sventurato","Arringa","Altezzoso","Egemonia","Abominevole",
      "Eresia","Impetuoso","Indolenza","Ineptitudine","Inesorabile","Ingrato","Insinuazione","Insipido","Insulare","Intemperante",
      "Intransigente","Invettiva","Irascibile","Irriverente","Annoiato","Lacrimoso","Lassitudine","Lugubre","Macchinazione","Maledizione",
    ],
  },

  // ── MONTENEGRIN ──────────────────────────────────────────────────────────
  me: {
    easy: [
      "Abej","Ajkula","Akacija","Alga","Amfora","Anđeo","Bačva","Bjelica","Bor","Brada",
      "Brijeg","Breza","Buba","Bunar","Čaplja","Čempres","Čičak","Cvijet","Dagnja","Delfin",
      "Divokoza","Drvo","Dub","Duga","Duvna","Dvor","Djetelina","Đurđevak","Gljiva","Gnijezdo",
      "Goran","Grab","Grana","Granit","Grbavica","Grizly","Grm","Guja","Guska","Hrast",
      "Irvas","Jablanka","Javor","Jazavac","Jazovka","Jela","Jelen","Jesetra","Jezerski","Jezero",
      "Joha","Kadulja","Kamara","Kamen","Kamila","Klopka","Kob","Kosa","Kostanj","Kovač",
      "Koza","Kozlić","Krastavac","Kraška","Kreda","Kruna","Kuna","Lastavica","Lattica","Lavanda",
      "Lebdilo","Ledina","Lijeska","Lipa","List","Livada","Lješnjak","Lješnjik","Ljubičica","Ljupka",
      "Lopoč","Loza","Lubenica","Luča","Luna","Maslina","Magarac","Medvjed","Medved","Meduza",
      "Metla","Mliječ","Mrav","Munje","Muška","Njiva","Oblak","Ognjišta","Orah","Orao",
      "Orkan","Ormar","Osa","Ostruga","Ovcica","Palma","Paprat","Paučina","Paun","Pčela",
      "Pećina","Petal","Pijesak","Pjetlić","Planina","Plima","Plovka","Pluto","Polje","Potok",
      "Ptica","Rak","Riba","Ribl","Rijeka","Rosa","Ruža","Skalište","Slavuj","Sliva",
      "Smreka","Snijeg","Soko","Sova","Srna","Stog","Struk","Sunce","Šaran","Ševa",
      "Škorpion","Šljuka","Šljiva","Šuma","Tisa","Trava","Trlica","Trnina","Trut","Tunja",
      "Urs","Utva","Vatra","Vedrina","Velebit","Vihor","Vila","Vino","Vis","Vod",
      "Voda","Vođa","Voluhar","Vrabac","Vrana","Vrba","Vuk","Zec","Zenica","Zimzel",
      "Zmaj","Zora","Žaba","Žbun","Žir","Žito","Žuna","Žunac","Abeceda","Adut",
      "Ajvar","Bačvar","Bajka","Baklja","Banat","Bara","Barut","Biljka","Bizon","Blatara",
      "Blato","Brod","Brus","Bubuljica","Bujica","Čaša","Čičak","Ćilim","Ćuk","Čvor",
      "Dab","Dalija","Divlja","Djeto","Dno","Dolac","Dolin","Drobno","Dunavlje","Dura",
      "Đurić","Entuzijazam","Farma","Fazan","Galeb","Garavan","Gavran","Gazda","Gazi","Glib",
      "Glicin","Glina","Globus","Gnjev","Golub","Gorge","Gvozd","Haluga","Hib","Hidra",
      "Humka","Hunjalo","Hvalja","Jasen","Javor","Ježeva","Jorgovan","Josipovac","Jug","Juha",
      "Jurić","Kaktus","Kapetanija","Katedra","Kazimir","Klješta","Klupa","Kmeta","Kobilica","Kocka",
      "Koliba","Komarac","Koplje","Kopriva","Korijen","Kos","Košćela","Kotac","Kotor","Kovnica",
      "Kozara","Krnjak","Krs","Kuka","Kukuruz","Kupina","Ladanje","Lagum","Lahor","Lakat",
      "Lantana","Lapor","Lavež","Ledena","Ler","Letva","Lje","Ljiljan","Logor","Lok",
      "Lop","Lovor","Lubarda","Luč","Luka","Lun","Lunta","Maćuhica","Mahovine","Maline",
      "Malter","Mandela","Manita","Maslačak","Matičnjak","Matica","Mavrica","Meštar","Milka","Mlin",
    ],
    hard: [
      "Bezakonje","Kaos","Obmana","Laž","Prevara","Cinizma","Dogma","Ambivalentnost","Paradoks","Anarhija",
      "Nihilizam","Anomalija","Apstraktan","Apostazija","Spletka","Hulja","Bujica","Žar","Lukavstvo","Asketizam",
      "Kleveta","Atrofija","Proricanje","Pohlepa","Aksiom","Balast","Bedlam","Obmanjivati","Demantovati","Militantnost",
      "Kuga","Kakofonija","Kadenca","Nesreća","Kleveta","Hir","Katalizator","Jedak","Ograda","Šifra",
      "Galama","Ubjedljiv","Dosluhu","Grižnja","Pokroviteljstvo","Kajanje","Krivac","Cinizam","Debakl","Dekadencija",
      "Poštovanje","Potop","Izopačenost","Pustoš","Despotizam","Dijalektika","Nevjera","Propadanje","Elegija","Enigma",
      "Entropija","Prolazan","Dvosmislen","Surogat","Prolazan","Hitnost","Iskupiti","Apsurd","Glup","Žar",
      "Smrdljiv","Pukotina","Nedostatak","Galama","Krhkost","Fuga","Gambito","Tmurno","Mrak","Kaos",
      "Oholost","Licemjerje","Ikonoklast","Idolopoklonstvo","Ćorsokak","Umrljati","Sramota","Nepravda","Prazno","Bahatost",
      "Pobuna","Ironija","Sudbina","Zvon","Praznina","Žalost","Letargija","Liminalan","Brbljiv","Nelagoda",
      "Malicioznost","Zlonamjeran","Pretvarac","Neiskrenost","Prevrtljiv","Sumoran","Nadir","Nemeza","Nihilizam","Kos",
      "Zaborav","Slutnja","Okoštati","Ostracizam","Paradoks","Paria","Patetizam","Krivokletstvo","Petulantnost","Pobožnost",
      "Banalnost","Polemičan","Predskazanje","Pretvaranje","Poštenje","Rasipnost","Kvorum","Gorčina","Povrat","Relikvija",
      "Gađenje","Rascjep","Fanatizam","Shizma","Pobuna","Sofisterija","Utvara","Stoički","Pokoriti","Zavlačenje",
      "Prećutan","Smjelost","Okovi","Plašljiv","Uvrtanje","Vreva","Sjenka","Jezovit","Uzurpirati","Bezbojno",
      "Vendeta","Otrovan","Mučiti","Kleveta","Vrtlog","Propadanje","Gnjiv","Ksenofobija","Čežnja","Fanatik",
      "Pristajati","Ukor","Udaljen","Poboljšati","Anakreonizam","Antiteza","Odobravanje","Tajnovit","Oštrina","Šala",
      "Barokno","Ratoboran","Razilaženje","Laskati","Leš","Kavalir","Kritika","Sram","Prevara","Grub",
      "Zamišljenost","Grižnja","Konflagracija","Zapleteno","Oskudica","Štetan","Demagog","Suzdrzan","Ocrnjivati","Denuncijacija",
      "Obeshrabreno","Didaktičan","Otudjenost","Uvid","Prezir","Bagatelizirati","Prikrivati","Dogmatičan","Dvoličan","Drskost",
      "Monstruozan","Neuhvatljiv","Zagorčiti","Uplesti","Tegobno","Oslabiti","Prolazan","Smirenost","Lutajući","Izbjegavanje",
      "Proklinjati","Oportunistički","Improvizirano","Ugar","Minuciozan","Udvarati","Pretvarati","Vriti","Lakomislen","Raskošan",
      "Raspiriti","Podnositi","Opterećen","Frenetičan","Površan","Prikriven","Protivurječiti","Pompezno","Nesretan","Propovijed",
      "Ohol","Hegemonija","Opak","Jeres","Nagao","Lijenost","Nespretan","Neumitan","Nezahvalan","Insinuacija",
      "Bezukusan","Zatvoren","Razuzdan","Tvrdoglav","Napad","Inatljiv","Nepoštovanje","Dosađen","Suzan","Malaksalost",
    ],
  },

  // ── UKRAINIAN ────────────────────────────────────────────────────────────
  uk: {
    easy: [
      "Абрикос","Айстра","Акація","Ангел","Арка","Бабка","Бджола","Береза","Берег","Бик",
      "Білка","Бобер","Бузок","Буря","Верба","Вітер","Вишня","Вогонь","Вода","Вовк",
      "Голуб","Гора","Гриб","Гроза","Гусінь","Джміль","Дощ","Дуб","Жайворон","Жук",
      "Зайчик","Зерно","Зима","Зірка","Змія","Іній","Кабан","Калина","Камінь","Квітка",
      "Клен","Козуля","Кіт","Кінь","Кора","Корінь","Корова","Кремінь","Кролик","Крот",
      "Кукурудза","Купина","Лебідь","Лелека","Лиса","Лист","Літо","Луг","Лунь","Лящ",
      "Мак","Малина","Мімоза","Місяць","Мох","Мурашка","Нарцис","Небо","Нива","Нічка",
      "Озеро","Орел","Осінь","Осика","Павук","Пастух","Пісок","Піщаник","Пшениця","Рак",
      "Ромашка","Роса","Рябина","Сад","Сіль","Слива","Сніг","Сова","Сонях","Сосна",
      "Стріла","Тополя","Тюльпан","Умань","Фіалка","Хліб","Хмара","Череп","Черешня","Чорниця",
      "Шипшина","Шишка","Явір","Ялина","Ялівець","Яструб","Яблуко","Берест","Бурмило","Вовчок",
      "Гарбуз","Гілочка","Горіх","Грак","Деревій","Дрізд","Жовтець","Журавель","Заєць","Зозуля",
      "Кизил","Кіш","Кропива","Латаття","Лохина","Лось","Лупина","Мальва","Мати-й-мачуха","Миша",
      "Митра","Могила","Мурава","Нетреба","Нічниця","Нугат","Нюх","Овес","Окунь","Олень",
      "Осот","Павич","Палій","Пелюстка","Пень","Перепілка","Плющ","Полин","Польовий","Пупавка",
      "Пучок","Рибалка","Різак","Рій","Рись","Свиня","Стокротка","Сурепка","Тернина","Тис",
      "Тхір","Уж","Фазан","Цибуля","Чайка","Чебрець","Чорногуз","Чумак","Шавлія","Шипшина",
      "Щука","Юнь","Ягода","Яворина","Ялинка","Язик","Яр","Яструбинець","Ячмінь","Абрикос",
      "Авокадо","Агрус","Аїр","Аконіт","Акула","Алича","Алое","Ананас","Анемона","Антилопа",
      "Арахіс","Аркуш","Арніка","Астра","Ателія","Аул","Бадилля","Бамбук","Барвінок","Баранець",
      "Барсук","Батіг","Берека","Бісер","Бобовик","Болото","Борець","Борона","Бугай","Будяк",
      "Буйвол","Булава","Бурмиха","Бурштин","Буяння","Вивірка","Видра","Виноград","Вишневий","Вівця",
      "Вільха","Вітрило","Вівторок","Водоспад","Волошка","Вугор","Гадюка","Гвоздика","Гетьман","Гичка",
      "Гірчиця","Гліцинія","Глід","Глобус","Глухар","Гнат","Гній","Горобець","Горобина","Гречка",
      "Гриміти","Грудка","Губка","Гусак","Гуска","Дельфін","Держак","Дика","Дикий","Дим",
      "Диня","Дозрілий","Дрова","Дрофа","Дубок","Дудник","Дятел","Єнот","Єнотовидний","Єхидна",
      "Єресть","Єрик","Ємшан","Єпископ","Єдиноріг","Жайвір","Жало","Жар","Жасмин","Жито",
      "Жовтуга","Журба","Заболотній","Загайник","Зайвий","Залізняк","Залізо","Занедбаний","Заплава","Зарасти",
    ],
    hard: [
      "Абсурд","Агонія","Алхімія","Алегорія","Амбівалентність","Анахронізм","Анархія","Аномалія","Антитеза","Апатія",
      "Apostasija","Arcanum","Полум'я","Artifice","Аскетизм","Наклеп","Атрофія","Пророцтво","Жадібність","Аксіома",
      "Баласт","Хаос","Спокусити","Спростувати","Войовничість","Чума","Какофонія","Каденція","Нещастя","Наклеп",
      "Примха","Каталізатор","Їдкий","Застереження","Шифр","Гамір","Переконливий","Змова","Докори сумління","Поблажливість",
      "Каяття","Винуватець","Цинізм","Дебакл","Декаданс","Шанобливість","Потоп","Розпуста","Запустіння","Деспотизм",
      "Діалектика","Невпевненість","Занепад","Елегія","Загадка","Ентропія","Скороминущий","Двозначний","Ерзац","Примарний",
      "Терміновість","Спокута","Абсурд","Недоумкуватий","Палкість","Смердючий","Тріщина","Недолік","Фуга","Гамбіт",
      "Похмурий","Морок","Хаос","Зарозумілість","Лицемірство","Іконоборець","Ідолопоклонство","Глухий кут","Заплямувати","Ганьба",
      "Несправедливість","Прісний","Нахабство","Повстання","Іронія","Доля","Дзвін","Прогалина","Жаль","Летаргія",
      "Лімінальний","Балакучий","Нездужання","Злоба","Злобний","Удавання","Нечесність","Мінливий","Похмурий","Надір",
      "Немезида","Нігілізм","Навскіс","Забуття","Передвістя","Скам'яніти","Остракізм","Парадокс","Вигнанець","Пафос",
      "Лжесвідчення","Примхливість","Побожність","Банальність","Полемічний","Провістя","Удавання","Порядність","Марнотратство","Кворум",
      "Злопам'ятство","Рецидивізм","Реліквія","Огида","Розкол","Ханжество","Схизма","Заколот","Софістика","Привид",
      "Стоїчний","Поневолити","Підступ","Мовчазний","Відвага","Кайдани","Боязкий","Крутний момент","Смута","Тінь",
      "Моторошний","Узурпувати","Прісний","Вендета","Отруйний","Мордувати","Наклепувати","Вир","Занепадати","Гнів",
      "Ксенофобія","Прагнути","Фанатик","Поступливість","Догана","Відстороненість","Покращити","Анахронізм","Антитеза","Схвалення",
      "Загадковий","Різкість","Жарт","Бароко","войовничий","Роздвоювати","Лестити","Трупно-блідий","Кавалер","Осуд",
      "Сором","Шахрайство","Грубий","Міркувати","Докори сумління","Конфлаграція","Заплутаний","Нестача","Шкідливий","Демагог",
      "Стриманий","Чорнити","Доноси","Знеохочений","Дидактичний","Відчуження","Розсудливість","Зневага","Применшувати","Приховувати",
      "Догматичний","Лицемірний","Нахабство","Жахливий","Невловимий","Озлобити","Заплутати","Обтяжливий","Знесилити","Примарний",
      "Рівновага","Блукаючий","Ухилення","Проклинати","Таврувати","Зручний","Імпровізований","Перелоги","Ретельний","Лестити",
      "Удавати","Бродити","Фривольний","Квітчастий","Розпалювати","Терпіти","Обтяжений","Скажений","Беззмістовний","Потаємний",
      "Заперечувати","Напишний","Невдаха","Демагогія","Зарозумілий","Гегемонія","Мерзенний","Єресь","Запальний","Байдикування",
      "Невмілий","Невблаганний","Невдячний","Натяк","Прісний","Замкнений","Нестриманий","Уперти","Інвектива","Запальний",
      "Зневажливий","Пересичений","Сльозливий","Знемога","Похмурий","Змовництво","Прокляття","Зловмисний","Сентиментальний","Користолюбний",
    ],
  },

  // ── RUSSIAN ───────────────────────────────────────────────────────────────
  ru: {
    easy: [
      "Абрикос","Айва","Аист","Акула","Ангел","Арбуз","Берёза","Берег","Бобёр","Бурундук",
      "Василёк","Верба","Ветер","Вишня","Волк","Гора","Гриб","Гроза","Грузь","Дождь",
      "Дуб","Ель","Ёж","Жаворонок","Жук","Зайчик","Зерно","Зима","Звезда","Змея",
      "Иней","Кабан","Калина","Камень","Клён","Кобра","Колос","Корень","Корова","Кролик",
      "Крот","Кукуруза","Лебедь","Лиса","Лист","Лошадь","Луг","Лягушка","Малина","Медведь",
      "Месяц","Метель","Мох","Муравей","Нарцисс","Небо","Нива","Ноябрь","Озеро","Орёл",
      "Осень","Паук","Пасека","Пчела","Пшеница","Рак","Ромашка","Роса","Рябина","Сад",
      "Снег","Сова","Сосна","Стрела","Тополь","Тюльпан","Фиалка","Хлеб","Черника","Шиповник",
      "Щука","Ягода","Яблоко","Ясень","Аконит","Алтей","Алыча","Анемон","Антилопа","Арника",
      "Астра","Барсук","Белена","Бересклет","Бизон","Болото","Борец","Бурьян","Буйвол","Будяк",
      "Вербейник","Видра","Виноград","Вьюнок","Гадюка","Гвоздика","Горобина","Гречиха","Гусь","Дельфин",
      "Дрофа","Ежевика","Ёлка","Жасмин","Желудь","Журавль","Зозуля","Зубр","Иволга","Камыш",
      "Кедр","Кизил","Клевер","Клюква","Коростель","Краснотал","Кувшинка","Куропатка","Лабазник","Ландыш",
      "Лиственница","Лобода","Лось","Луговик","Лунь","Люпин","Льнянка","Мальва","Марьянник","Медуница",
      "Мезгера","Метлица","Мышехвостик","Наперстянка","Незабудка","Овёс","Окунь","Олень","Осот","Пион",
      "Плющ","Полынь","Поползень","Просо","Репейник","Репешок","Рогоз","Сивец","Синица","Ситник",
      "Смородина","Снегирь","Сурепка","Тёрн","Тмин","Трясогузка","Тысячелистник","Уж","Фазан","Хвощ",
      "Цикорий","Цыплёнок","Чабрец","Чайка","Чернотал","Щавель","Ягель","Яструб","Ячмень","Авдотка",
      "Аврора","Агава","Айкидо","Акация","Акула","Аласка","Алоэ","Альбатрос","Алчедон","Амарант",
      "Амфибия","Анаконда","Анис","Антей","Аралия","Аргус","Аркан","Армадилло","Арника","Арча",
      "Астрагал","Аурукария","Баклан","Бальзамин","Бамбук","Барвинок","Беркут","Бескид","Бобовник","Болиголов",
      "Болотянка","Бомбина","Бородавочник","Бурундук","Бурьян","Бутон","Варакушка","Василёк","Вахта","Вирея",
      "Волчник","Волчья ягода","Выхухоль","Гагара","Гаичка","Гамадрил","Гарпия","Гвоздика","Гигрофила","Гладиолус",
      "Гоголь","Горец","Грунт","Дрок","Дроздовник","Дубняк","Дудник","Дятел","Ехидна","Ёрш",
      "Ёршик","Живокость","Жостер","Заяц","Земляника","Зимняк","Зубянка","Ива","Иволга","Ирис",
      "Ирга","Камнеломка","Каштан","Кедровка","Кермек","Клест","Клоповник","Кобчик","Ковыль","Козодой",
      "Кокушник","Колокольчик","Коноплёвка","Короставник","Коршун","Крапива","Кречет","Кропива","Крот","Кручёный",
      "Кувшинка","Купена","Кутра","Кыргыз","Лаванда","Лебеда","Лебедь","Ледянка","Лесная","Ливень",
    ],
    hard: [
      "Абсурд","Агония","Алхимия","Аллегория","Амбивалентность","Анахронизм","Анархия","Аномалия","Антитеза","Апатия",
      "Apostasija","Arcanum","Жар","Artifice","Аскетизм","Клевета","Атрофия","Предзнаменование","Жадность","Аксиома",
      "Балласт","Хаос","Соблазнить","Опровергнуть","Воинственность","Чума","Какофония","Каденция","Бедствие","Клевета",
      "Прихоть","Катализатор","Едкий","Оговорка","Шифр","Шум","Убедительный","Сговор","Угрызения совести","Снисхождение",
      "Раскаяние","Виновник","Цинизм","Фиаско","Декаданс","Почтение","Потоп","Развращённость","Запустение","Деспотизм",
      "Диалектика","Неуверенность","Упадок","Элегия","Загадка","Энтропия","Мимолётный","Двусмысленный","Эрзац","Призрачный",
      "Срочность","Искупление","Абсурд","Недалёкий","Пыл","Зловонный","Трещина","Изъян","Фуга","Гамбит",
      "Мрачный","Тьма","Хаос","Высокомерие","Лицемерие","Иконоборец","Идолопоклонство","Тупик","Запятнать","Позор",
      "Несправедливость","Пресный","Наглость","Мятеж","Ирония","Судьба","Звон","Пробел","Скорбь","Летаргия",
      "Лиминальный","Болтливый","Недомогание","Злоба","Злобный","Притворство","Нечестность","Изменчивый","Угрюмый","Надир",
      "Немезида","Нигилизм","Наискось","Забвение","Предзнаменование","Окаменеть","Остракизм","Парадокс","Изгой","Пафос",
      "Лжесвидетельство","Капризность","Благочестие","Банальность","Полемический","Предзнаменование","Притворство","Порядочность","Расточительство","Кворум",
      "Злопамятность","Рецидивизм","Реликвия","Отвращение","Раскол","Ханжество","Схизма","Мятеж","Схоластика","Призрак",
      "Стоический","Поработить","Уловка","Умолчание","Смелость","Оковы","Робкий","Вращающий момент","Смута","Тень",
      "Жуткий","Узурпировать","Пресный","Вендетта","Ядовитый","Мучить","Клеветать","Водоворот","Угасать","Гнев",
      "Ксенофобия","Стремиться","Фанатик","Уступчивость","Выговор","Отстранённость","Улучшить","Анахронизм","Антитеза","Одобрение",
      "Таинственный","Резкость","Шутка","Барокко","воинственный","Раздваивать","Льстить","Трупно-бледный","Кавалер","Порицание",
      "Стыд","Мошенничество","Грубый","Размышлять","Угрызения совести","Конфлаграция","Запутанный","Нехватка","Вредоносный","Демагог",
      "Сдержанный","Чернить","Доносительство","Обескураженный","Дидактический","Отчуждение","Проницательность","Презрение","Умалять","Скрывать",
      "Догматический","Лицемерный","Нахальство","Чудовищный","Неуловимый","Озлобить","Запутать","Обременительный","Обессилить","Мимолётный",
      "Душевное равновесие","Блуждающий","Уклонение","Проклинать","Клеймить","Целесообразный","Импровизированный","Перелоги","Тщательный","Льстить",
      "Притворяться","Бродить","Легкомысленный","Цветистый","Разжигать","Терпеть","Обременённый","Неистовый","Бессодержательный","Тайный",
      "Отрицать","Напыщенный","Неудачник","Демагогия","Заносчивый","Гегемония","Мерзкий","Ересь","Порывистый","Безделье",
      "Неумелый","Неумолимый","Неблагодарный","Намёк","Пресный","Замкнутый","Невоздержанный","Упрямый","Инвектива","Вспыльчивый",
      "Пренебрежительный","Пресыщенный","Слезливый","Изнеможение","Мрачный","Злоумышление","Проклятие","Злонамеренный","Сентиментальный","Корыстолюбивый",
    ],
  },

  // ── POLISH ────────────────────────────────────────────────────────────────
  pl: {
    easy: [
      "Agrest","Akacja","Bocian","Borsuk","Brzoza","Buk","Chabry","Chrząszcz","Chrust","Cierń",
      "Czajka","Czapla","Czarna","Czeremcha","Czereśnia","Czmychaj","Ćma","Dąb","Delfin","Deszcz",
      "Drewno","Drozd","Dzik","Dzięcioł","Fasola","Fiolek","Gąsienica","Głóg","Gniazdko","Gołąb",
      "Grzyb","Gwiazda","Jaskółka","Jeleń","Jodła","Jaskier","Jeż","Kaczka","Kamień","Kapuśniak",
      "Klon","Kos","Korzeń","Kruk","Kukułka","Kwiat","Las","Leszczyna","Liść","Lipa",
      "Lis","Lotos","Łabędź","Łąka","Łoś","Malina","Mech","Miód","Miodunka","Modrzew",
      "Motyl","Mrówka","Muchomor","Mysz","Narcyz","Niedźwiedź","Niezapominajka","Nocnik","Norka","Ogród",
      "Orzeł","Osika","Paproć","Piasek","Pies","Piorun","Pluskwa","Płoć","Pszenica","Ptak",
      "Rzeka","Ropucha","Rosa","Rumianek","Ryba","Sarna","Serce","Skowronek","Sowa","Sosna",
      "Staw","Śnieg","Tuje","Wiewiórka","Wierzba","Woda","Wilk","Wróbel","Wróbel","Wydrą",
      "Zając","Zboże","Zima","Żaba","Żubr","Żuraw","Jezioro","Jabłko","Jarzębina","Javor",
      "Żywotnik","Bielik","Błotniak","Bławatek","Bobrownik","Borowik","Brodawkowiec","Brodziec","Brzeg","Cietrzew",
      "Czajka","Czarny","Czubatka","Czyżyk","Dereszowata","Drób","Dzierzba","Dziki","Dzwoneczek","Ekologia",
      "Fakt","Floks","Foki","Fundament","Gacek","Gawron","Gdula","Ginąca","Góral","Grabówka",
      "Graba","Granat","Grążel","Grzywa","Guziec","Haczyk","Hełmiasty","Jabłoń","Jałowiec","Jaskier",
      "Jeżówka","Jodłowy","Juniperus","Kaczan","Kajak","Kania","Kapturnik","Karaś","Karczoch","Karpień",
      "Karze","Kasza","Kasztan","Kiełż","Kijanka","Kiszka","Kleśnik","Kłokoczka","Kmiotek","Kobuz",
      "Kocanki","Kokornak","Kokoszka","Kolczurka","Kolejka","Komosa","Konietlica","Konwalia","Kopytnik","Kormorans",
      "Koronecznik","Kostrzewa","Kozłek","Kruszyna","Krwaśnik","Krzekot","Kszyk","Kukułka","Kukurydza","Kundel",
      "Kuna","Kupkówka","Kurczak","Kurek","Kuropatwa","Lesnica","Limonka","Linochód","Lnianka","Lnianecznik",
      "Lobelia","Łatka","Łąkotka","Łąkowiec","Łęg","Łoboda","Łopiany","Łosoś","Łubin","Łukasik",
      "Macierzanka","Makowiec","Makówka","Mała","Malawski","Marzanka","Marzec","Marzyciel","Maskonur","Maślak",
      "Mazepa","Mącznica","Mezereon","Miętus","Miotła","Misecznik","Modliszka","Mohera","Morzyczko","Motylica",
      "Mrukwa","Muflón","Mustelida","Mysikrólik","Naczepa","Nasturcja","Nawłoć","Nawrot","Niebieska","Nieorek",
      "Nocnica","Nornik","Okoń","Oleander","Oset","Ostróżka","Owsica","Perkozek","Piguła","Pikachu",
      "Pliszka","Pluszcz","Pójdźka","Poziomka","Przylaszczka","Ptaszysko","Puchacz","Pufin","Rzepik","Samotnik",
      "Sasanka","Sępnik","Sierpowiec","Słonecznica","Słowik","Smardz","Smużka","Sokół","Sowa","Sóweczka",
    ],
    hard: [
      "Absurd","Acrimonia","Alchemia","Alienacja","Alegoria","Niejednoznaczność","Anachronizm","Anarchia","Anomalia","Antyteza",
      "Apatia","Apostazja","Arkanum","Żar","Sztuczność","Ascetyzm","Oszczerstwo","Atrofia","Przepowiednia","Chciwość",
      "Aksjomat","Balast","Chaos","Uwieść","Obalić","Wojowniczość","Zaraza","Kakofonia","Kadencja","Nieszczęście",
      "Kalumnia","Kaprys","Katalizator","Żrący","Zastrzeżenie","Szyfr","Wrzawa","Przekonujący","Zmowa","Wyrzuty sumienia",
      "Pobłażliwość","Skrucha","Winowajca","Cynizm","Debakl","Dekadencja","Szacunek","Potop","Zepsucie","Spustoszenie",
      "Despotyzm","Dialektyka","Niepewność","Upadek","Elegia","Zagadka","Entropia","Ulotny","Dwuznaczny","Ersatz",
      "Evanescencja","Pilność","Pokuta","Absurd","Tępiec","Żarliwość","Cuchnący","Szczelina","Wada","Wrzawa",
      "Kruchość","Fuga","Gambit","Posępny","Mrok","Chaos","Arogancja","Hipokryzja","Ikonoklasta","Bałwochwalstwo",
      "Ślepy zaułek","Splamić","Hańba","Niesprawiedliwość","Mdły","Bezczelność","Bunt","Ironia","Los","Dzwon",
      "Luka","Żal","Letarg","Liminalne","Gadatliwy","Złe samopoczucie","Złośliwość","Złośliwy","Udawacz","Kłamliwość",
      "Chwiejny","Posępny","Nadir","Nemezis","Nihilizm","Ukośny","Zapomnienie","Omen","Skostnieć","Ostracyzm",
      "Paradoks","Parias","Patetyzm","Krzywoprzysięstwo","Petulancja","Pobożność","Banał","Polemiczny","Wróżba","Pozorność",
      "Prawość","Rozrzutność","Kworum","Uraza","Recydywizm","Relikwia","Wstręt","Pęknięcie","Dewocja","Schizma",
      "Sedycja","Sofistyka","Widmo","Stoicki","Zniewolić","Podstęp","Milczący","Zuchwałość","Więzy","Tchórzliwy",
      "Moment siły","Zamieszanie","Cień","Niesamowity","Uzurpować","Mdły","Vendetta","Jadowity","Dokuczać","Oczerniać",
      "Wir","Zanikać","Gniew","Ksenofobia","Tęsknota","Fanatyk","Uległość","Napomnienie","Zdystansowany","Poprawić",
      "Anachronizm","Antyteza","Aprobata","Arkanum","Surowość","Żart","Barok","Wojowniczy","Rozwidlenie","Schlebiać",
      "Trupioblady","Kawaler","Nagana","Wstyd","Szachrajstwo","Grubiański","Rozmyślać","Wyrzuty sumienia","Pożar","Zawiły",
      "Niedostatek","Szkodliwy","Demagog","Powściągliwy","Oczerniać","Denuncjować","Zniechęcony","Dydaktyczny","Dezafektacja","Rozeznanie",
      "Pogarda","Pomniejszać","Ukrywać","Dogmatyczny","Dwulicowy","Bezczelność","Oburzający","Nieuchwytny","Rozgoryczać","Wikłać",
      "Uciążliwy","Osłabiać","Ulotny","Równowaga ducha","Błędny","Uchylanie","Przeklinać","Piętnować","Wygodny","Improwizowany",
      "Ugór","Drobiazgowy","Pochlebiać","Udawać","Fermentować","Frywolny","Kwitnący","Podjudzać","Znosić","Obciążony",
      "Gorączkowy","Frywolny","Skryty","Zaprzeczać","Napuszony","Nieudacznik","Harangue","Wyniosły","Hegemonia","Obrzydliwy",
      "Herezja","Porywczy","Lenistwo","Nieudolny","Nieubłagany","Niewdzięczny","Insynuacja","Mdły","Izolowany","Nieumiarkowany",
      "Nieugiętość","Inwektywa","Porywczy","Niepoważny","Znudzony","Łzawy","Odrętwiałość","Posępny","Machinacja","Przekleństwo",
    ],
  },
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
function generateBoard(code, difficulty, lang) {
  const rng  = makeRng(`${code}::${difficulty}::${lang}`);
  const pool = WORDS[lang][difficulty];
  const words = seededShuffle(pool, rng).slice(0, 25);
  const assignments = seededShuffle([
    ...Array(9).fill(TEAM.RED), ...Array(8).fill(TEAM.BLUE),
    ...Array(7).fill(TEAM.NEUTRAL), TEAM.ASSASSIN,
  ], rng);
  return words.map((word, i) => ({ word, team: assignments[i], revealed: false }));
}
function buildInitialState(code, difficulty, lang) {
  return {
    board: generateBoard(code, difficulty, lang),
    currentTeam: TEAM.RED,
    clue: "", clueCount: "",
    activeClue: null, guessesLeft: 0,
    winner: null, log: [],
    redSpymaster: null,   // player id
    blueSpymaster: null,  // player id
    code, difficulty, lang,
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
      <div style={{ ...BASE, background:"var(--c-bg-panel)", border:"2px solid var(--c-border-accent)", borderRadius:"16px",
        padding:"32px 28px", maxWidth:"380px", width:"100%",
        boxShadow:"0 20px 60px rgba(0,0,0,0.8)", textAlign:"center" }}>
        {children}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// LOBBY
// ══════════════════════════════════════════════════════════════════════════════
function Lobby({ onStart, initialCode }) {
  const [inputCode, setInputCode]   = useState(initialCode || "");
  const [difficulty, setDifficulty] = useState("easy");
  const [lang, setLang]             = useState("en");
  const [lastGen, setLastGen]       = useState("");
  const [loading, setLoading]       = useState(false);
  const T = UI[lang];

  const handleGenerate = () => { const c = generateCode(); setLastGen(c); setInputCode(c); };
  const handleStart = async () => {
    const code = (inputCode.trim().toUpperCase() || generateCode());
    setLoading(true);
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
    setLoading(false);
  };

  return (
    <div style={{ minHeight:"100vh", minHeight:"100dvh", background:"var(--c-bg)", ...BASE,
      color:"var(--c-text)", display:"flex", flexDirection:"column", alignItems:"center",
      justifyContent:"center", padding:"32px 16px", boxSizing:"border-box" }}>

      <div style={{ textAlign:"center", marginBottom:"32px" }}>
        <div style={{ fontSize:"clamp(36px,10vw,56px)", letterSpacing:"clamp(6px,3vw,14px)",
          color:"var(--c-accent-strong)", fontStyle:"italic", fontWeight:"bold" }}>{T.title}</div>
        <div style={{ fontSize:"clamp(9px,2.5vw,11px)", letterSpacing:"clamp(3px,1vw,5px)",
          color:"var(--c-text-muted)", marginTop:"6px" }}>{T.subtitle}</div>
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
  const [clueInput, setClueInput] = useState("");
  const [countInput, setCountInput] = useState("");
  const playerId = getPlayerId();

  // If URL had a code, jump straight into game
  useEffect(() => {
    if (screen === "joining" && urlCode) {
      joinGame(urlCode);
    }
  }, []);

  const joinGame = async (code) => {
    const gameRef = ref(db, `games/${code}`);
    const snap = await get(gameRef);
    if (snap.exists()) {
      setGameCode(code);
      setScreen("game");
      subscribeToGame(code);
    } else {
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
    const state = buildInitialState(gameCode, game.difficulty, game.lang);
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
    return <Lobby onStart={startGame} initialCode={urlCode} />;
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
    <div style={{ minHeight:"100vh", minHeight:"100dvh", background:"var(--c-bg)", ...BASE,
      color:"var(--c-text)", display:"flex", flexDirection:"column", overflowX:"hidden" }}>

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
            <button onClick={newGame}     style={ghostBtn("#fff","11px","8px 16px")}>{T.sameCode}</button>
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

      {/* ── FLOATING LOG BUTTON (mobile) ── */}
      <button onClick={()=>setShowLog(true)}
        style={{ position:"fixed", bottom:"20px", right:"16px", zIndex:100,
          background:"var(--c-bg-panel)", border:"2px solid var(--c-border-accent)", borderRadius:"50%",
          width:"52px", height:"52px", fontSize:"22px", cursor:"pointer",
          boxShadow:"0 4px 20px rgba(0,0,0,0.6)", display:"flex",
          alignItems:"center", justifyContent:"center",
          WebkitTapHighlightColor:"transparent" }}
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
