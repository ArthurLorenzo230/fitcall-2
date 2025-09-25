// Sample trainers data
const trainers = [
    { id: 1, name: "Carlos Silva", specialty: "Basquete", rating: 4.9, price: 80, avatar: "CS", reviews: 128, color: "#E91E63" },
    { id: 2, name: "Ana Costa", specialty: "Musculação", rating: 4.8, price: 90, avatar: "AC", reviews: 95, color: "#2196F3" },
    { id: 3, name: "Ricardo Lima", specialty: "Yoga", rating: 5.0, price: 70, avatar: "RL", reviews: 64, color: "#4CAF50" },
    { id: 4, name: "Fernanda Oliveira", specialty: "Corrida", rating: 4.7, price: 60, avatar: "FO", reviews: 87, color: "#FF9800" },
    { id: 5, name: "Bruno Santos", specialty: "Futebol", rating: 4.6, price: 75, avatar: "BS", reviews: 112, color: "#9C27B0" },
    { id: 6, name: "Juliana Pereira", specialty: "Natação", rating: 4.9, price: 85, avatar: "JP", reviews: 73, color: "#00BCD4" },
    { id: 7, name: "Marcos Rocha", specialty: "Artes Marciais", rating: 4.8, price: 95, avatar: "MR", reviews: 58, color: "#F44336" },
    { id: 8, name: "Patrícia Alves", specialty: "Pilates", rating: 4.9, price: 65, avatar: "PA", reviews: 81, color: "#673AB7" }
];

let currentTrainer = null;

// Initialize the app
function initApp() {
    loadTrainers();
    
    // Form submissions
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        login();
    });

    document.getElementById('userForm').addEventListener('submit', function(e) {
        e.preventDefault();
        registerUser();
    });

    document.getElementById('trainerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        registerTrainer();
    });
}

// Load trainers into the grid
function loadTrainers() {
    const grid = document.getElementById('trainersGrid');
    grid.innerHTML = '';

    trainers.forEach(trainer => {
        const stars = '⭐'.repeat(Math.floor(trainer.rating)) + '☆'.repeat(5 - Math.floor(trainer.rating));
        
        const card = document.createElement('div');
        card.className = 'trainer-card';
        card.innerHTML = `
            <div class="trainer-header">
                <div class="trainer-avatar" style="background: ${trainer.color}">${trainer.avatar}</div>
                <div>
                    <h3>${trainer.name}</h3>
                    <div class="trainer-rating">${stars} ${trainer.rating}</div>
                    <small>${trainer.reviews} avaliações</small>
                </div>
            </div>
            <div class="trainer-specialty">${trainer.specialty}</div>
            <p>Personal trainer especializado em ${trainer.specialty.toLowerCase()} com ${trainer.reviews}+ avaliações positivas.</p>
            <div class="trainer-price">R$ ${trainer.price}/hora</div>
            <button class="btn-book" onclick="bookTrainer(${trainer.id})">Agendar Treino</button>
        `;
        grid.appendChild(card);
    });
}

// Login function
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email.includes('@') || password.length < 6) {
        alert('Por favor, insira um email válido e senha com pelo menos 6 caracteres.');
        return;
    }

    showLoading();
    
    setTimeout(() => {
        hideLoading();
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('appScreen').style.display = 'block';
    }, 2000);
}

// Logout function
function logout() {
    document.getElementById('appScreen').style.display = 'none';
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
}

// Show modal
function showModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Show loading
function showLoading() {
    document.getElementById('loadingScreen').style.display = 'block';
}

// Hide loading
function hideLoading() {
    document.getElementById('loadingScreen').style.display = 'none';
}

// Recover password
function recoverPassword() {
    alert('Instruções de recuperação enviadas para seu email!');
    closeModal('forgotModal');
}

// Register user
function registerUser() {
    alert('Cadastro realizado com sucesso! Você já pode fazer login.');
    closeModal('registerUserModal');
}

// Register trainer
function registerTrainer() {
    alert('Cadastro de personal trainer realizado! Aguarde a validação.');
    closeModal('registerTrainerModal');
}

// Book trainer
function bookTrainer(trainerId) {
    currentTrainer = trainers.find(t => t.id === trainerId);
    document.getElementById('bookingTitle').textContent = `Agendar com ${currentTrainer.name}`;
    showModal('bookingModal');
}

// Confirm booking
function confirmBooking() {
    const date = document.getElementById('bookingDate').value;
    const time = document.getElementById('bookingTime').value;
    
    if (!date) {
        alert('Por favor, selecione uma data.');
        return;
    }

    alert(`Treino agendado com ${currentTrainer.name} para ${date} às ${time}!`);
    closeModal('bookingModal');
}

// Initialize when page loads
window.onload = initApp;

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}