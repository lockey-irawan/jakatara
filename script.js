// --- KONTROL CAROUSEL ---
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}
if (slides.length > 0) setInterval(nextSlide, 4500);

// --- DATA BASE GAME ---
const poiData = [
    { title: "Sumatera Barat", desc: "Terkenal dengan masakan Rendang yang mendunia dan rumah adat Gadang yang memiliki atap melengkung tajam seperti tanduk kerbau." },
    { title: "Jawa Tengah", desc: "Pusat dari budaya Jawa klasik. Terdapat mahakarya Candi Borobudur, seni membatik yang teliti, dan pertunjukan Wayang Kulit." },
    { title: "Bali", desc: "Pulau Dewata yang mempesona, terkenal dengan harmoni Tari Kecak yang epik dan upacara sakral pembakaran jenazah bernama Ngaben." },
    { title: "Sulawesi Selatan", desc: "Rumah bagi pelaut ulung suku Bugis pembuat Kapal Phinisi, serta suku Toraja dengan Rumah Tongkonan yang ikonik." },
    { title: "Papua", desc: "Sangat kaya akan keanekaragaman hayati. Terdapat Burung Cendrawasih yang cantik dan rumah adat tradisional bernama Honai." }
];

const quizData = [
    { question: "Makanan khas dari Sumatera Barat yang diakui sebagai salah satu makanan terenak di dunia adalah?", options: ["Sate Lilit", "Rendang", "Gudeg", "Papeda"], answer: 1 },
    { question: "Pertunjukan bayangan boneka tradisional yang berasal dari Jawa Tengah disebut?", options: ["Ludruk", "Ketoprak", "Wayang Kulit", "Reog"], answer: 2 },
    { question: "Tari tradisional Bali yang dimainkan oleh puluhan laki-laki yang duduk melingkar dan menyerukan kata 'cak' adalah tari?", options: ["Tari Pendet", "Tari Kecak", "Tari Saman", "Tari Piring"], answer: 1 },
    { question: "Apa nama kapal layar tradisional yang sangat gagah khas dari Sulawesi Selatan?", options: ["Kapal Phinisi", "Perahu Jong", "Kapal Selam", "Perahu Kora-kora"], answer: 0 },
    { question: "Rumah adat tradisional masyarakat Papua yang bentuknya melingkar dengan atap kerucut dari jerami disebut?", options: ["Gadang", "Joglo", "Tongkonan", "Honai"], answer: 3 }
];

// --- VARIABEL STATE ---
let currentQuestionIndex = 0;
let score = 0;
let poiVisited = 0;

// --- FUNGSI NAVIGASI LAYAR ---
function switchScreen(screenId) {
    // Sembunyikan semua layar
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    // Tampilkan layar yang dituju
    document.getElementById(screenId).classList.add('active');
}

document.getElementById('start-btn').addEventListener('click', () => {
    switchScreen('game-screen');
});

// --- FUNGSI PETA & ANIMASI MODAL (TAILWIND) ---
function showInfo(index) {
    const modal = document.getElementById('info-modal');
    const overlay = document.getElementById('modal-overlay');
    
    document.getElementById('info-title').innerText = poiData[index].title;
    document.getElementById('info-desc').innerText = poiData[index].desc;
    
    // Tampilkan Modal dengan efek transisi Tailwind
    overlay.classList.remove('opacity-0', 'invisible');
    modal.classList.remove('opacity-0', 'invisible', 'scale-75');
    modal.classList.add('opacity-100', 'visible', 'scale-100');
    
    poiVisited++;
    if (poiVisited >= 1) {
        document.getElementById('quiz-btn').classList.remove('hidden');
    }
}

function closeInfo() {
    const modal = document.getElementById('info-modal');
    const overlay = document.getElementById('modal-overlay');
    
    // Sembunyikan Modal
    overlay.classList.add('opacity-0', 'invisible');
    modal.classList.add('opacity-0', 'invisible', 'scale-75');
    modal.classList.remove('opacity-100', 'visible', 'scale-100');
}

// --- FUNGSI KUIS ---
function startQuiz() {
    switchScreen('quiz-screen');
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex >= quizData.length) {
        if (score === 5) {
            switchScreen('win-screen');
        } else {
            alert(`Kuis selesai! Anda mendapat skor ${score} dari 5. Mari coba lagi untuk mencapai skor sempurna!`);
            location.reload(); 
        }
        return;
    }

    const currentQ = quizData[currentQuestionIndex];
    document.getElementById('question-text').innerText = currentQ.question;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = ""; 

    currentQ.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        // Styling pilihan jawaban dengan Tailwind
        btn.className = 'w-full py-4 px-6 text-left rounded-xl border-2 border-sky-200 text-slate-700 font-semibold text-lg hover:bg-sky-500 hover:text-white hover:border-sky-500 hover:shadow-lg transition-all duration-200 group relative overflow-hidden';
        btn.innerHTML = `<span class="inline-block w-8 h-8 bg-sky-100 text-sky-600 rounded-full text-center leading-8 mr-3 group-hover:bg-white group-hover:text-sky-500 transition-colors">${String.fromCharCode(65 + index)}</span> ${opt}`;
        
        btn.onclick = () => checkAnswer(index, currentQ.answer);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selectedIndex, correctIndex) {
    if (selectedIndex === correctIndex) {
        score++;
        document.getElementById('score-display').innerText = score;
    } else {
        alert("Oops, jawaban kurang tepat! Tetap fokus ya.");
    }
    
    currentQuestionIndex++;
    loadQuestion();
}