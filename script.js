document.getElementById('generate-button').addEventListener('click', function () {
    const selectedDays = Array.from(document.querySelectorAll('#days-selection input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.nextElementSibling.innerText);
    
    const selectedPuzzles = Array.from(document.querySelectorAll('#puzzle-selection input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.id);
    
    const playerRating = document.getElementById('player-rating').value;
    const hours = parseFloat(document.getElementById('training-hours').value);
    const trainingPlan = document.getElementById('training-plan');
    trainingPlan.innerHTML = ''; // Limpa o plano anterior

    if (selectedDays.length > 0 && playerRating && hours) {
        selectedDays.forEach(day => {
            const table = document.createElement('table');
            table.classList.add('training-table');
            const header = document.createElement('tr');
            header.innerHTML = `<th>Atividade</th><th>Tempo</th>`;
            table.appendChild(header);
            
            let timeAvailable = hours * 60; // Tempo total disponível em minutos

            // Atividades baseadas nos pontos fracos
            const activities = {
                'iniciantes': {
                    'checkmate': [
                        ['Xeque-mate básico', '15 min'],
                        ['Xeque-mate em uma jogada', '10 min'],
                    ],
                    'discovered-attack': [
                        ['Ataque descoberto simples', '15 min'],
                        ['Exercícios de ataque descoberto', '20 min'],
                    ],
                    'king-side': [
                        ['Ataques na ala do rei', '20 min'],
                        ['Estratégias de ataque na ala do rei', '25 min'],
                    ],
                    'attraction': [
                        ['Uso da atração em partidas', '20 min'],
                        ['Exercícios de atração', '25 min'],
                    ],
                    'pinned': [
                        ['Conceitos de peças cravadas', '20 min'],
                        ['Exercícios com peças cravadas', '25 min'],
                    ],
                    'endgames': [
                        ['Finais simples', '20 min'],
                        ['Finais de torre', '25 min'],
                    ],
                    'fork': [
                        ['Garfo básico', '15 min'],
                        ['Exercícios de garfo', '20 min'],
                    ],
                    'middle-game': [
                        ['Estratégias de meio-jogo', '25 min'],
                        ['Táticas de meio-jogo', '20 min'],
                    ],
                    'sacrifice': [
                        ['Sacrifícios simples', '15 min'],
                        ['Sacrifícios táticos', '20 min'],
                    ]
                },
                '1000': {
                    'checkmate': [
                        ['Xeque-mate em duas jogadas', '20 min'],
                        ['Xeque-mate com dama', '30 min'],
                    ],
                    'discovered-attack': [
                        ['Ataques descobertos intermediários', '25 min'],
                        ['Ataques descobertos com peças maiores', '30 min'],
                    ],
                    'king-side': [
                        ['Estratégias na ala do rei', '25 min'],
                        ['Ataques na ala do rei com peões', '30 min'],
                    ],
                    'attraction': [
                        ['Atração em partidas', '25 min'],
                        ['Táticas de atração', '30 min'],
                    ],
                    'pinned': [
                        ['Exercícios de cravada', '20 min'],
                        ['Táticas de cravada', '30 min'],
                    ],
                    'endgames': [
                        ['Finais avançados', '30 min'],
                        ['Finais de peão', '25 min'],
                    ],
                    'fork': [
                        ['Garfo em jogos', '20 min'],
                        ['Exercícios de garfo', '30 min'],
                    ],
                    'middle-game': [
                        ['Estratégias de meio-jogo avançadas', '30 min'],
                        ['Táticas de meio-jogo', '25 min'],
                    ],
                    'sacrifice': [
                        ['Sacrifícios em finais', '20 min'],
                        ['Sacrifícios táticos em partidas', '30 min'],
                    ]
                },
                '1200': {
                    'checkmate': [
                        ['Xeque-mate em três jogadas', '25 min'],
                        ['Xeque-mate com bispos', '30 min'],
                    ],
                    'discovered-attack': [
                        ['Ataques descobertos avançados', '30 min'],
                        ['Prática de ataques descobertos', '25 min'],
                    ],
                    'king-side': [
                        ['Ataques na ala do rei com estratégias', '30 min'],
                        ['Jogadas de ataque na ala do rei', '25 min'],
                    ],
                    'attraction': [
                        ['Atração em situações complexas', '30 min'],
                        ['Táticas de atração avançadas', '25 min'],
                    ],
                    'pinned': [
                        ['Estratégias de cravada avançadas', '30 min'],
                        ['Cravadas em finais', '25 min'],
                    ],
                    'endgames': [
                        ['Finais complexos', '30 min'],
                        ['Finais de torre e peões', '25 min'],
                    ],
                    'fork': [
                        ['Garfo em situações complexas', '30 min'],
                        ['Exercícios de garfo avançados', '25 min'],
                    ],
                    'middle-game': [
                        ['Estratégias de meio-jogo complexas', '30 min'],
                        ['Jogadas de meio-jogo avançadas', '25 min'],
                    ],
                    'sacrifice': [
                        ['Sacrifícios em finais complexos', '30 min'],
                        ['Estratégias de sacrifício', '25 min'],
                    ]
                },
                '1400': {
                    // Adicione mais atividades para o rating 1400
                },
                '1600': {
                    // Adicione mais atividades para o rating 1600
                },
                '1800': {
                    // Adicione mais atividades para o rating 1800
                },
            };

            selectedPuzzles.forEach(puzzle => {
                const puzzleActivities = activities[playerRating][puzzle] || [];
                let activitiesCount = 0;

                // Seleciona duas atividades para cada ponto fraco
                puzzleActivities.forEach(activity => {
                    const timeInMinutes = parseInt(activity[1].split(' ')[0]);
                    if (timeAvailable >= timeInMinutes && activitiesCount < 2) {
                        const row = document.createElement('tr');
                        row.innerHTML = `<td>${activity[0]}</td><td>${activity[1]}</td>`;
                        table.appendChild(row);
                        timeAvailable -= timeInMinutes;
                        activitiesCount++;
                    }
                });
            });

            // Adiciona atividades gerais
            const generalActivities = {
                'iniciantes': [
                    ['Partida jogada (exemplo: 1.e4 e5)', '30 min'],
                    ['Blitz (5 min por partida)', '10 min'],
                ],
                '1000': [
                    ['Análise de partida (exemplo: partida de Magnus Carlsen)', '20 min'],
                ],
                '1200': [
                    ['Estudo de finais', '25 min'],
                    ['Estudo de aberturas', '30 min'],
                ],
                '1400': [
                    ['Análise de partidas de mestres', '30 min'],
                    ['Estudo de estratégias', '30 min'],
                ],
                '1600': [
                    ['Análise de finais avançados', '30 min'],
                    ['Estudo de táticas complexas', '30 min'],
                ],
                '1800': [
                    ['Estudo de grandes mestres', '30 min'],
                    ['Prática intensiva', '30 min'],
                ],
            };

            const shuffledGeneralActivities = generalActivities[playerRating].sort(() => 0.5 - Math.random());
            const numberOfActivities = Math.floor(Math.random() * 3) + 2; // De 2 a 4 atividades
            let activitiesCount = 0;

            // Adiciona atividades gerais
            shuffledGeneralActivities.forEach(activity => {
                if (activitiesCount < numberOfActivities) {
                    const timeInMinutes = parseInt(activity[1].split(' ')[0]);
                    if (timeAvailable >= timeInMinutes) {
                        const row = document.createElement('tr');
                        row.innerHTML = `<td>${activity[0]}</td><td>${activity[1]}</td>`;
                        table.appendChild(row);
                        timeAvailable -= timeInMinutes;
                        activitiesCount++;
                    }
                }
            });

            // Adiciona a tabela ao plano de treino
            const dayHeader = document.createElement('h3');
            dayHeader.innerText = `Treinamento para ${day}`;
            trainingPlan.appendChild(dayHeader);
            trainingPlan.appendChild(table);
        });
    } else {
        trainingPlan.innerHTML = '<p>Por favor, selecione pelo menos um dia para treinar e preencha todas as informações.</p>';
    }
});
