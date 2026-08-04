function kayitOL() {
    const servicesSection = document.querySelector('.services');
    if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function calculateCalories() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const activity = parseFloat(document.getElementById('activity').value);

    if (!weight || !height || !age) {
        alert('Lütfen tüm alanları eksiksiz doldurun!');
        return;
    }

    // Mifflin-St Jeor Denklemi
    let bmr;
    if (gender === 'male') {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    const tdee = Math.round(bmr * activity);

    const resultArea = document.getElementById('resultArea');
    const calorieResult = document.getElementById('calorieResult');

    calorieResult.innerHTML = `
        <span style="font-size: 2rem; color: #dc2626; font-weight: bold;">${tdee} kcal</span><br><br>
        <span style="font-size: 0.95rem; color: #4b5563;">
            📉 Kilo Vermek İçin (Defisit): <strong>${tdee - 500} kcal</strong><br>
            📈 Kilo Almak İçin (Surplus): <strong>${tdee + 500} kcal</strong>
        </span>
    `;
    resultArea.style.display = 'block';
}