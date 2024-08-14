document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('play-button');
    const titleContainer = document.getElementById('title-container');

    let incorrectCounter = 0;
    let level = 1; // Track the current level
    let totalImages = 2000; // Total number of images available
    let score = 0; // Track the score

    const footerText = document.createElement('div');
    footerText.textContent = 'Created with love by AviBenza';
    footerText.style.position = 'absolute';
    footerText.style.bottom = '10px';
    footerText.style.width = '100%';
    footerText.style.textAlign = 'center';
    footerText.style.fontSize = '0.8em';
    footerText.style.color = '#fff';

    document.body.appendChild(footerText);

    const allCountries = [
        "Fiji", "Tanzania", "W. Sahara", "Canada", "United States of America", "Kazakhstan", 
        "Uzbekistan", "Papua New Guinea", "Indonesia", "Argentina", "Chile", "Dem. Rep. Congo", 
        "Somalia", "Kenya", "Sudan", "Chad", "Haiti", "Dominican Rep.", "Russia", "Bahamas", 
        "Falkland Is.", "Norway", "Greenland", "Fr. S. Antarctic Lands", "Timor-Leste", "South Africa", 
        "Lesotho", "Mexico", "Uruguay", "Brazil", "Bolivia", "Peru", "Colombia", "Panama", 
        "Costa Rica", "Nicaragua", "Honduras", "El Salvador", "Guatemala", "Belize", "Venezuela", 
        "Guyana", "Suriname", "France", "Ecuador", "Puerto Rico", "Jamaica", "Cuba", "Zimbabwe", 
        "Botswana", "Namibia", "Senegal", "Mali", "Mauritania", "Benin", "Niger", "Nigeria", 
        "Cameroon", "Togo", "Ghana", "Côte d'Ivoire", "Guinea", "Guinea-Bissau", "Liberia", 
        "Sierra Leone", "Burkina Faso", "Central African Rep.", "Congo", "Gabon", "Eq. Guinea", 
        "Zambia", "Malawi", "Mozambique", "eSwatini", "Angola", "Burundi", "Israel", "Lebanon", 
        "Madagascar", "Palestine", "Gambia", "Tunisia", "Algeria", "Jordan", "United Arab Emirates", 
        "Qatar", "Kuwait", "Iraq", "Oman", "Vanuatu", "Cambodia", "Thailand", "Laos", "Myanmar", 
        "Vietnam", "North Korea", "South Korea", "Mongolia", "India", "Bangladesh", "Bhutan", 
        "Nepal", "Pakistan", "Afghanistan", "Tajikistan", "Kyrgyzstan", "Turkmenistan", "Iran", 
        "Syria", "Armenia", "Sweden", "Belarus", "Ukraine", "Poland", "Austria", "Hungary", 
        "Moldova", "Romania", "Lithuania", "Latvia", "Estonia", "Germany", "Bulgaria", "Greece", 
        "Turkey", "Albania", "Croatia", "Switzerland", "Luxembourg", "Belgium", "Netherlands", 
        "Portugal", "Spain", "Ireland", "New Caledonia", "Solomon Is.", "New Zealand", "Australia", 
        "Sri Lanka", "China", "Taiwan", "Italy", "Denmark", "United Kingdom", "Iceland", 
        "Azerbaijan", "Georgia", "Philippines", "Malaysia", "Brunei", "Slovenia", "Finland", 
        "Slovakia", "Czechia", "Eritrea", "Japan", "Paraguay", "Yemen", "Saudi Arabia", "Antarctica", 
        "N. Cyprus", "Cyprus", "Morocco", "Egypt", "Libya", "Ethiopia", "Djibouti", "Somaliland", 
        "Uganda", "Rwanda", "Bosnia and Herz.", "North Macedonia", "Serbia", "Montenegro", 
        "Kosovo", "Trinidad and Tobago", "S. Sudan"
    ];

    playButton.addEventListener('click', () => {
        console.log('Game started!');
        startGame();
    });

    function startGame() {
        titleContainer.innerHTML = '';
        document.body.style.backgroundColor = 'rgb(51, 129, 228)';
        incorrectCounter = 0;
        score = 0;
        loadNextLevel(); // Start the first level
    }

    function loadNextLevel() {
        // Clear the current content to display the new level
        titleContainer.innerHTML = '';

        // Randomly select an image and corresponding text file from the borders folder
        const randomImageIndex = Math.floor(Math.random() * totalImages) + 1;
        const imagePath = `borders/border_${randomImageIndex}.jpg`;
        const textPath = `borders/border_${randomImageIndex}.txt`;

        // Create an image element for the selected border
        const borderImage = document.createElement('img');
        borderImage.src = imagePath;
        borderImage.alt = `Border ${randomImageIndex}`;
        borderImage.id = 'border-image';

        // Create a container for the list of input fields
        const countriesListContainer = document.createElement('div');
        countriesListContainer.id = 'countries-list-container';
        countriesListContainer.style.marginTop = '10px';
        countriesListContainer.style.display = 'flex';
        countriesListContainer.style.flexDirection = 'column';
        countriesListContainer.style.alignItems = 'center';

        fetch(textPath)
            .then(response => response.text())
            .then(data => {
                const correctCountries = data.split('\n').map(country => ({
                    name: country.trim().toLowerCase(),
                    matched: false,
                })).filter(country => country.name);

                correctCountries.forEach(() => {
                    const inputContainer = document.createElement('div');
                    inputContainer.className = 'input-container';
                    inputContainer.style.position = 'relative';
                    inputContainer.style.width = '80%';
                    inputContainer.style.maxWidth = '400px';
                    inputContainer.style.marginTop = '5px';

                    const countryInput = document.createElement('input');
                    countryInput.className = 'country-input';
                    countryInput.type = 'text';
                    countryInput.style.padding = '10px';
                    countryInput.style.width = '100%';
                    countryInput.style.borderRadius = '5px';
                    countryInput.style.border = '1px solid #ccc';
                    countryInput.style.textAlign = 'center';
                    countryInput.placeholder = 'Type country name...';

                    const dropdown = document.createElement('div');
                    dropdown.className = 'dropdown';
                    dropdown.style.position = 'absolute';
                    dropdown.style.top = '100%';
                    dropdown.style.left = '0';
                    dropdown.style.width = '100%';
                    dropdown.style.border = '1px solid #ccc';
                    dropdown.style.borderTop = 'none';
                    dropdown.style.backgroundColor = '#fff';
                    dropdown.style.zIndex = '1000';
                    dropdown.style.display = 'none';
                    dropdown.style.maxHeight = '150px';
                    dropdown.style.overflowY = 'auto';
                    dropdown.style.borderRadius = '0 0 5px 5px';

                    let selectedIndex = -1;

                    countryInput.addEventListener('input', () => {
                        const value = countryInput.value.trim().toLowerCase();
                        dropdown.innerHTML = '';
                        selectedIndex = -1;
                        if (value) {
                            const suggestions = allCountries.filter(country => country.toLowerCase().startsWith(value));
                            suggestions.forEach((suggestion, index) => {
                                const suggestionItem = document.createElement('div');
                                suggestionItem.className = 'suggestion-item';
                                suggestionItem.style.padding = '10px';
                                suggestionItem.style.cursor = 'pointer';
                                suggestionItem.textContent = suggestion;
                                suggestionItem.addEventListener('click', () => {
                                    countryInput.value = suggestionItem.textContent;
                                    dropdown.innerHTML = '';
                                    dropdown.style.display = 'none';
                                    checkAnswer(countryInput, correctCountries);
                                });
                                dropdown.appendChild(suggestionItem);

                                if (index === selectedIndex) {
                                    suggestionItem.style.backgroundColor = '#d4edda';
                                }
                            });
                            dropdown.style.display = suggestions.length ? 'block' : 'none';
                        } else {
                            dropdown.style.display = 'none';
                        }
                    });

                    countryInput.addEventListener('keydown', (event) => {
                        const suggestionItems = dropdown.querySelectorAll('.suggestion-item');
                        if (event.key === 'ArrowDown') {
                            selectedIndex = (selectedIndex + 1) % suggestionItems.length;
                            updateDropdownSelection(suggestionItems, selectedIndex);
                        } else if (event.key === 'ArrowUp') {
                            selectedIndex = (selectedIndex - 1 + suggestionItems.length) % suggestionItems.length;
                            updateDropdownSelection(suggestionItems, selectedIndex);
                        } else if (event.key === 'Enter') {
                            event.preventDefault();
                            if (selectedIndex >= 0 && suggestionItems.length > 0) {
                                countryInput.value = suggestionItems[selectedIndex].textContent;
                            }
                            checkAnswer(countryInput, correctCountries);
                            dropdown.innerHTML = '';
                            dropdown.style.display = 'none';
                        }
                    });

                    inputContainer.appendChild(countryInput);
                    inputContainer.appendChild(dropdown);
                    countriesListContainer.appendChild(inputContainer);
                });
            })
            .catch(error => {
                console.error('Error fetching the country names:', error);
                const errorContainer = document.createElement('div');
                errorContainer.className = 'country-input';
                errorContainer.style.marginTop = '5px';
                errorContainer.style.padding = '10px';
                errorContainer.style.width = '80%';
                errorContainer.style.maxWidth = '400px';
                errorContainer.style.borderRadius = '5px';
                errorContainer.style.border = '1px solid #ccc';
                errorContainer.style.textAlign = 'center';
                errorContainer.textContent = 'Unable to load country names.';
                countriesListContainer.appendChild(errorContainer);
            });

        const gameScreen = document.createElement('div');
        gameScreen.id = 'game-screen';
        gameScreen.style.width = '100%';
        gameScreen.style.height = '100%';
        gameScreen.style.display = 'flex';
        gameScreen.style.flexDirection = 'column';
        gameScreen.style.justifyContent = 'center';
        gameScreen.style.alignItems = 'center';

        // Update the counter element
        let counterElement = document.getElementById('incorrect-counter');
        if (!counterElement) {
            counterElement = document.createElement('div');
            counterElement.id = 'incorrect-counter';
            counterElement.style.position = 'absolute';
            counterElement.style.top = '150px'; // Adjust this value to move the box up or down
            counterElement.style.left = '43%';
            counterElement.style.transform = 'translateX(-50%)'; // Center the counter horizontally
            counterElement.style.textAlign = 'center';
            counterElement.style.padding = '5px';
            counterElement.style.border = '1px solid #ccc';
            counterElement.style.borderRadius = '5px';
            counterElement.style.backgroundColor = '#ADD8E6';
            counterElement.style.width = '100px';
            document.body.appendChild(counterElement);
        }
        counterElement.textContent = `Incorrect: ${incorrectCounter} / 5`;

        // Append the image and input fields container to the game screen
        gameScreen.appendChild(borderImage);
        gameScreen.appendChild(countriesListContainer);

        titleContainer.appendChild(gameScreen);
    }

    function updateDropdownSelection(items, selectedIndex) {
        items.forEach((item, index) => {
            if (index === selectedIndex) {
                item.style.backgroundColor = '#d4edda';
            } else {
                item.style.backgroundColor = '';
            }
        });
    }

    function checkAnswer(inputElement, correctCountries) {
        const userAnswer = inputElement.value.trim().toLowerCase();
        const matchedCountry = correctCountries.find(country => country.name === userAnswer && !country.matched);

        if (matchedCountry) {
            inputElement.style.backgroundColor = '#d4edda';
            inputElement.style.color = '#155724';
            inputElement.disabled = true;
            matchedCountry.matched = true;
        } else {
            inputElement.style.backgroundColor = '#f8d7da';
            inputElement.style.color = '#721c24';
            inputElement.value = '';
            incorrectCounter++;
            document.getElementById('incorrect-counter').textContent = `Incorrect: ${incorrectCounter} / 5`;
            
            if (incorrectCounter >= 5) {
                showGameOverPopup();
            }
        }

        // Check if all countries have been matched
        if (correctCountries.every(country => country.matched)) {
            score++; // Increment the score for a correct round
            showNextRoundButton(); // Show the next round button
        }
    }

    function showNextRoundButton() {
        // Create the "Next Round" button
        const nextRoundButton = document.createElement('button');
        nextRoundButton.textContent = 'Next Round';
        nextRoundButton.style.marginTop = '20px';
        nextRoundButton.style.padding = '10px 20px';
        nextRoundButton.style.fontSize = '1em';
        nextRoundButton.style.color = '#fff';
        nextRoundButton.style.backgroundColor = '#6dbf4e';
        nextRoundButton.style.border = 'none';
        nextRoundButton.style.borderRadius = '5px';
        nextRoundButton.style.cursor = 'pointer';
    
        // Center the button horizontally below the border image
        nextRoundButton.style.position = 'relative';
        nextRoundButton.style.left = '39%';
        nextRoundButton.style.transform = 'translateX(-50%)';
    
        // Add click event to load the next level
        nextRoundButton.addEventListener('click', () => {
            loadNextLevel(); // Load the next level when the button is clicked
        });
    
        // Add event listener for the "Enter" key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' && document.activeElement === nextRoundButton) {
                nextRoundButton.click(); // Trigger the click event on the button if it is focused
            }
        });
    
        // Append the button below the input fields
        const countriesListContainer = document.getElementById('countries-list-container');
        countriesListContainer.appendChild(nextRoundButton);
    
        // Optionally, set focus on the button when it's added to the DOM
        nextRoundButton.focus();
    }
    
    
    
    function showGameOverPopup() {
        // Create the overlay
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.zIndex = '1000';

        // Create the game over box
        const gameOverBox = document.createElement('div');
        gameOverBox.style.backgroundColor = '#ADD8E6';
        gameOverBox.style.padding = '20px';
        gameOverBox.style.borderRadius = '10px';
        gameOverBox.style.textAlign = 'center';

        // Create the game over message
        const gameOverMessage = document.createElement('p');
        gameOverMessage.style.fontSize = '1.5em';
        gameOverMessage.style.color = '#000';
        gameOverMessage.textContent = `Game Over!\nYour score: ${score}`;

        // Create the return button
        const returnButton = document.createElement('button');
        returnButton.textContent = 'Return to Home';
        returnButton.style.marginTop = '20px';
        returnButton.style.padding = '10px 20px';
        returnButton.style.fontSize = '1em';
        returnButton.style.color = '#fff';
        returnButton.style.backgroundColor = '#6dbf4e';
        returnButton.style.border = 'none';
        returnButton.style.borderRadius = '5px';
        returnButton.style.cursor = 'pointer';

        // Add click event to return to the home page
        returnButton.addEventListener('click', () => {
            document.body.removeChild(overlay);
            titleContainer.innerHTML = '';  // Clear the current game content
            document.body.style.backgroundColor = 'rgb(51, 129, 228)';  // Reset background color
            location.reload();  // Reload the page to return to the home screen
        });

        // Append the message and button to the game over box
        gameOverBox.appendChild(gameOverMessage);
        gameOverBox.appendChild(returnButton);

        // Append the game over box to the overlay
        overlay.appendChild(gameOverBox);

        // Append the overlay to the body
        document.body.appendChild(overlay);
    }
});