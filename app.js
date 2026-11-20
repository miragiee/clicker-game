document.addEventListener("DOMContentLoaded", () => {
	const DEFAULT_CLICK_STRENGTH = 1;
	const DEFAULT_AUTOCLICKER_STRENGTH = 0;
	const DEFAULT_SCORE = 0;
	const STRENGTH_UPGRADE_MULTIPLIER = 10;
	const AUTOCLICK_UPGRADE_MULTIPLIER = 20;

	const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

	let mainButton = document.querySelector(".clicker-btn");
	let upgradeStrengthButton = document.querySelector(".upgrade-strength");
	let upgradeAutoclickerButton = document.querySelector(
		".upgrade-autoclicker",
	);
	let maxScoreText = document.querySelector(".maxScore");
	let totalScoreText = document.querySelector(".totalScore");
	let totalClicksText = document.querySelector(".totalClicks");
	let totalUpgradesText = document.querySelector(".totalUpgrades");
	let available = document.querySelector(".alert");
    let scorePerSecond = document.querySelector(".perSec")

	let clickStrength = DEFAULT_CLICK_STRENGTH;
	let autoclickerStrength = DEFAULT_AUTOCLICKER_STRENGTH;
	let score = DEFAULT_SCORE;
	let strengthLevel = 1;
	let autoclickerLevel = 1;
	let strengthCost = 10;
	let autoclickerCost = 20;

	let totalScore = 0;
	let maxScore = 0;
	let totalClicks = 0;
	let totalUpgrades = 0;

	let isUpgradeAvailable = false;

	if (upgradeStrengthButton) console.log("Кнопка силы загрузилась");
	if (upgradeAutoclickerButton) console.log("Кнопка автокликера загрузилась");

	function handleClick() {
		console.log(`Сила нажатия: ${clickStrength}`);
		score += clickStrength;
		totalScore += clickStrength;
		totalClicks++;
		mainButton.innerHTML = score;
	}

	async function isEnoughScore() {
		while (true) {
			const canUpgradeStrength = score >= strengthCost;
			const canUpgradeAutoclicker = score >= autoclickerCost;

			upgradeStrengthButton.disabled = !canUpgradeStrength;
			upgradeAutoclickerButton.disabled = !canUpgradeAutoclicker;

			isUpgradeAvailable = canUpgradeStrength || canUpgradeAutoclicker;

			await sleep(100);
		}
	}

	async function handleStatsUpdate() {
		while (true) {
			if (score > maxScore) maxScore = score;

			maxScoreText.innerHTML = `<strong>Максимальный счёт:</strong> ${maxScore}`;
			totalScoreText.innerHTML = `<strong>Общий счёт:</strong> ${totalScore}`;
			totalClicksText.innerHTML = `<strong>Всего кликов:</strong>: ${totalClicks}`;
			totalUpgradesText.innerHTML = `<strong>Всего улучшений:</strong>: ${totalUpgrades}`;
            scorePerSecond.innerHTML = `<strong>Очков в секунду:</strong> ${autoclickerStrength}`;

			if (isUpgradeAvailable) available.innerHTML = "Доступен апгрейд!";
			else available.innerHTML = "Кликай!";

			await sleep(100);
		}
	}

	function handleStrengthUpgrade() {
		totalUpgrades++;
		strengthLevel++;
		clickStrength++;

		score -= strengthCost;
		strengthCost = strengthLevel * STRENGTH_UPGRADE_MULTIPLIER;
		mainButton.innerHTML = score;

		upgradeStrengthButton.innerHTML = `УЛУЧШИТЬ СИЛУ: ${strengthCost}`;
		console.log(`Уровень силы: ${strengthLevel}`);
	}

	function handleAutoclickUpgrade() {
		totalUpgrades++;
		autoclickerLevel++;
		autoclickerStrength++;

		score -= autoclickerCost;
		autoclickerCost = autoclickerLevel * AUTOCLICK_UPGRADE_MULTIPLIER;
		mainButton.innerHTML = score;

		upgradeAutoclickerButton.innerHTML = `УЛУЧШИТЬ АВТОКЛИК: ${autoclickerCost}`;
		console.log(`Уровень автокликера: ${autoclickerLevel}`);

		if (autoclickerLevel === 2) {
			handleAutoclick();
		}
	}

	async function handleAutoclick() {
		while (true) {
			totalClicks++;
			score += autoclickerStrength;
			totalScore += autoclickerStrength;
			mainButton.innerHTML = score;

			console.log(`Автоклик/ Сила нажатия: ${autoclickerStrength}`);
			await sleep(1000);
		}
	}

	isEnoughScore();
	handleStatsUpdate();
	mainButton.onclick = handleClick;
	upgradeStrengthButton.onclick = handleStrengthUpgrade;
	upgradeAutoclickerButton.onclick = handleAutoclickUpgrade;
});
