const hexCodeEl = document.getElementById('hex-code');
const colorGridEl = document.getElementById('color-grid');
const messageEl = document.getElementById('message');
const difficultySelectorEl = document.getElementById('difficulty-selector');

const difficultyLevels = [3, 4, 5, 6, 9, 12, 16, 25];
let currentDifficulty = 6;
let correctAnswer = '';
let isGameActive = true;

// --- Game Logic ---

function generateRandomHex() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
}

function startGame(difficulty) {
    isGameActive = true;
    currentDifficulty = difficulty;
    colorGridEl.innerHTML = ''; // Clear previous circles
    messageEl.textContent = 'GUESS THE COLOR';
    messageEl.className = '';

    // Generate correct answer and other colors
    correctAnswer = generateRandomHex();
    const colors = new Set([correctAnswer]);
    while (colors.size < difficulty) {
        colors.add(generateRandomHex());
    }

    // Shuffle colors and create circles
    const shuffledColors = Array.from(colors).sort(() => Math.random() - 0.5);

    shuffledColors.forEach(color => {
        const circle = document.createElement('div');
        circle.classList.add('color-circle');
        circle.style.backgroundColor = color;
        circle.dataset.color = color;
        circle.addEventListener('click', handleGuess);
        colorGridEl.appendChild(circle);
    });

    hexCodeEl.textContent = correctAnswer;
    updateActiveDifficulty();
}

function handleGuess(event) {
    if (!isGameActive) return; // Prevent multiple clicks after a guess

    const guessedColor = event.target.dataset.color;

    if (guessedColor === correctAnswer) {
        messageEl.textContent = 'CORRECT!';
        messageEl.classList.add('message-correct');
        isGameActive = false;
        setTimeout(() => startGame(currentDifficulty), 1500); // Start next round
    } else {
        messageEl.innerHTML = `TRY AGAIN. THAT COLOR WAS <span style="color:${guessedColor};-webkit-text-stroke: 1px rgba(0,0,0,0.1);">${guessedColor}</span>`;
        messageEl.classList.add('message-incorrect');
        isGameActive = false;

        // Briefly reveal the correct answer visually
        const correctCircle = document.querySelector(`[data-color="${correctAnswer}"]`);
        correctCircle.style.transform = 'scale(1.15)';
        correctCircle.style.boxShadow = `0 0 20px 5px ${correctAnswer}`;


        setTimeout(() => startGame(currentDifficulty), 2500); // Start next round after showing feedback
    }
}

// --- UI Setup ---

function setupDifficultySelector() {
    difficultyLevels.forEach(level => {
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = level;
        link.classList.add('difficulty-level');
        link.dataset.level = level;
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const newDifficulty = parseInt(e.target.dataset.level);
            startGame(newDifficulty);
        });
        difficultySelectorEl.appendChild(link);
    });
}

function updateActiveDifficulty() {
    document.querySelectorAll('.difficulty-level').forEach(link => {
        if(parseInt(link.dataset.level) === currentDifficulty) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// --- Initial Load ---
setupDifficultySelector();
startGame(currentDifficulty); // Start the game with default difficulty