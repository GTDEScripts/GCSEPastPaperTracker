const subjects = ['Mathematics', 'English Language', 'English Literature', 'Biology', 'Chemistry', 'Physics', 'History', 'Geography', 'Computer Science', 'Business'];

        const sessionsBySubject = {
            'Mathematics': [
                { year: '2017', period: 'June/May' }, { year: '2017', period: 'October/November' },
                { year: '2018', period: 'June/May' }, { year: '2018', period: 'October/November' },
                { year: '2019', period: 'June/May' }, { year: '2019', period: 'October/November' },
                { year: '2020', period: 'Lockdown' },
                { year: '2021', period: 'October/November' },
                { year: '2022', period: 'June/May' }, { year: '2022', period: 'October/November' },
                { year: '2023', period: 'June/May' }, { year: '2023', period: 'October/November' },
                { year: '2024', period: 'June/May' }, { year: '2024', period: 'October/November' }
            ],
            'English Language': [
                { year: '2017', period: 'June/May' }, { year: '2017', period: 'October/November' },
                { year: '2018', period: 'June/May' }, { year: '2018', period: 'October/November' },
                { year: '2019', period: 'June/May' }, { year: '2019', period: 'October/November' },
                { year: '2020', period: 'Lockdown' },
                { year: '2021', period: 'October/November' },
                { year: '2022', period: 'June/May' }, { year: '2022', period: 'October/November' },
                { year: '2023', period: 'June/May' }, { year: '2023', period: 'October/November' },
                { year: '2024', period: 'June/May' }, { year: '2024', period: 'October/November' }
            ],
            'English Literature': [
                { year: '2017', period: 'June/May' },
                { year: '2018', period: 'June/May' },
                { year: '2019', period: 'June/May' },
                { year: '2020', period: 'Lockdown' },
                { year: '2021', period: 'June/May' },
                { year: '2022', period: 'June/May' },
                { year: '2023', period: 'June/May' },
                { year: '2024', period: 'June/May' }
            ],
            'Biology': [
                { year: '2017', period: 'June/May' }, { year: '2018', period: 'June/May' },
                { year: '2019', period: 'June/May' }, { year: '2020', period: 'Lockdown' },
                { year: '2021', period: 'June/May' }, { year: '2022', period: 'June/May' },
                { year: '2023', period: 'June/May' }, { year: '2024', period: 'June/May' }
            ],
            'Chemistry': [
                { year: '2017', period: 'June/May' }, { year: '2018', period: 'June/May' },
                { year: '2019', period: 'June/May' }, { year: '2020', period: 'Lockdown' },
                { year: '2021', period: 'June/May' }, { year: '2022', period: 'June/May' },
                { year: '2023', period: 'June/May' }, { year: '2024', period: 'June/May' }
            ],
            'Physics': [
                { year: '2017', period: 'June/May' }, { year: '2018', period: 'June/May' },
                { year: '2019', period: 'June/May' }, { year: '2020', period: 'Lockdown' },
                { year: '2021', period: 'June/May' }, { year: '2022', period: 'June/May' },
                { year: '2023', period: 'June/May' }, { year: '2024', period: 'June/May' }
            ],
            'History': [
                { year: '2017', period: 'June/May' }, { year: '2018', period: 'June/May' },
                { year: '2019', period: 'June/May' }, { year: '2020', period: 'Lockdown' },
                { year: '2021', period: 'June/May' }, { year: '2022', period: 'June/May' },
                { year: '2023', period: 'June/May' }, { year: '2024', period: 'June/May' }
            ],
            'Geography': [
                { year: '2017', period: 'June/May' }, { year: '2018', period: 'June/May' },
                { year: '2019', period: 'June/May' }, { year: '2020', period: 'Lockdown' },
                { year: '2021', period: 'June/May' }, { year: '2022', period: 'June/May' },
                { year: '2023', period: 'June/May' }, { year: '2024', period: 'June/May' }
            ],
            'Computer Science': [
                { year: '2017', period: 'June/May' }, { year: '2018', period: 'June/May' },
                { year: '2019', period: 'June/May' }, { year: '2020', period: 'Lockdown' },
                { year: '2021', period: 'June/May' }, { year: '2022', period: 'June/May' },
                { year: '2023', period: 'June/May' }, { year: '2024', period: 'June/May' }
            ],
            'Business': [
                { year: '2017', period: 'June/May' }, { year: '2018', period: 'June/May' },
                { year: '2019', period: 'June/May' }, { year: '2020', period: 'Lockdown' },
                { year: '2021', period: 'June/May' }, { year: '2022', period: 'June/May' },
                { year: '2023', period: 'June/May' }, { year: '2024', period: 'June/May' }
            ]
        };

        const papersBySubject = {
            'Mathematics': 3, 'English Language': 2, 'English Literature': 2,
            'Biology': 2, 'Chemistry': 2, 'Physics': 2, 'History': 3,
            'Geography': 3, 'Computer Science': 2, 'Business': 2
        };

        const defaultMaxMarks = {
            'Mathematics': [80, 80, 80],
            'English Language': [80, 80],
            'English Literature': [64, 96],
            'Biology': [100, 100],
            'Chemistry': [100, 100],
            'Physics': [100, 100],
            'History': [96, 96, 96],
            'Geography': [88, 88, 76],
            'Computer Science': [80, 80],
            'Business': [80, 80]
        };

        let currentSubject = 'Mathematics';
        let currentNoteKey = null;
        let progressChart = null;
        let comparisonChart = null;

        // Theme presets
        const themePresets = {
            default: {
                name: 'Indigo',
                accent: '#6366f1',
                accentDark: '#4f46e5',
                bgPrimary: '#ffffff',
                headerStart: '#6366f1',
                headerEnd: '#d946ef'
            },
            purple: {
                name: 'Purple Haze',
                accent: '#a855f7',
                accentDark: '#7c3aed',
                bgPrimary: '#ffffff',
                headerStart: '#a855f7',
                headerEnd: '#f472b6'
            },
            green: {
                name: 'Emerald',
                accent: '#10b981',
                accentDark: '#059669',
                bgPrimary: '#ffffff',
                headerStart: '#10b981',
                headerEnd: '#06b6d4'
            },
            red: {
                name: 'Crimson',
                accent: '#dc2626',
                accentDark: '#991b1b',
                bgPrimary: '#ffffff',
                headerStart: '#dc2626',
                headerEnd: '#f97316'
            },
            orange: {
                name: 'Sunset',
                accent: '#f97316',
                accentDark: '#ea580c',
                bgPrimary: '#ffffff',
                headerStart: '#f97316',
                headerEnd: '#ec4899'
            },
            pink: {
                name: 'Rose',
                accent: '#ec4899',
                accentDark: '#be185d',
                bgPrimary: '#ffffff',
                headerStart: '#ec4899',
                headerEnd: '#a855f7'
            }
        };

        function setTheme(accent, accentDark, bgPrimary = null, headerStart = null, headerEnd = null) {
            document.documentElement.style.setProperty('--accent', accent);
            document.documentElement.style.setProperty('--accent-dark', accentDark);
            if (bgPrimary) {
                document.documentElement.style.setProperty('--bg-primary', bgPrimary);
            }
            if (headerStart) {
                document.documentElement.style.setProperty('--header-start', headerStart);
            }
            if (headerEnd) {
                document.documentElement.style.setProperty('--header-end', headerEnd);
            }
            localStorage.setItem('userTheme', JSON.stringify({ accent, accentDark, bgPrimary, headerStart, headerEnd }));
        }

        function loadTheme() {
            const saved = localStorage.getItem('userTheme');
            if (saved) {
                const theme = JSON.parse(saved);
                setTheme(theme.accent, theme.accentDark, theme.bgPrimary, theme.headerStart, theme.headerEnd);
                document.getElementById('accentColor').value = theme.accent;
                document.getElementById('accentDarkColor').value = theme.accentDark;
                if (theme.bgPrimary) document.getElementById('bgPrimary').value = theme.bgPrimary;
                if (theme.headerStart) {
                    const headerStartInput = document.getElementById('headerStartColor');
                    if (headerStartInput) headerStartInput.value = theme.headerStart;
                }
                if (theme.headerEnd) {
                    const headerEndInput = document.getElementById('headerEndColor');
                    if (headerEndInput) headerEndInput.value = theme.headerEnd;
                }
            }
        }

        function openThemeEditor() {
            document.getElementById('themeEditorModal').classList.add('active');
            initPresetThemes();
        }

        function closeThemeEditor() {
            document.getElementById('themeEditorModal').classList.remove('active');
        }

        function initPresetThemes() {
            const container = document.getElementById('presetThemes');
            container.innerHTML = '';
            Object.entries(themePresets).forEach(([key, theme]) => {
                const btn = document.createElement('button');
                btn.className = 'preset-btn';
                btn.textContent = theme.name;
                btn.onclick = () => {
                    setTheme(theme.accent, theme.accentDark, theme.bgPrimary, theme.headerStart, theme.headerEnd);
                    document.getElementById('accentColor').value = theme.accent;
                    document.getElementById('accentDarkColor').value = theme.accentDark;
                    document.getElementById('bgPrimary').value = theme.bgPrimary;
                    const headerStartInput = document.getElementById('headerStartColor');
                    const headerEndInput = document.getElementById('headerEndColor');
                    if (headerStartInput) headerStartInput.value = theme.headerStart;
                    if (headerEndInput) headerEndInput.value = theme.headerEnd;
                    document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                };
                container.appendChild(btn);
            });
        }

        function resetTheme() {
            const defaultTheme = themePresets.default;
            setTheme(defaultTheme.accent, defaultTheme.accentDark, defaultTheme.bgPrimary, defaultTheme.headerStart, defaultTheme.headerEnd);
            document.getElementById('accentColor').value = defaultTheme.accent;
            document.getElementById('accentDarkColor').value = defaultTheme.accentDark;
            document.getElementById('bgPrimary').value = defaultTheme.bgPrimary;
            const headerStartInput = document.getElementById('headerStartColor');
            const headerEndInput = document.getElementById('headerEndColor');
            if (headerStartInput) headerStartInput.value = defaultTheme.headerStart;
            if (headerEndInput) headerEndInput.value = defaultTheme.headerEnd;
        }

        // Grid View Toggle
        let isGridView = false;

        function toggleGridView() {
            isGridView = !isGridView;
            const sessionsContainer = document.getElementById('sessionsContainer');
            const papersGridContainer = document.getElementById('papersGridContainer');
            const viewToggleBtn = document.getElementById('viewToggleBtn');

            if (isGridView) {
                sessionsContainer.style.display = 'none';
                papersGridContainer.style.display = 'grid';
                viewToggleBtn.textContent = '📋 Sessions View';
                renderPapersGrid();
            } else {
                sessionsContainer.style.display = 'block';
                papersGridContainer.style.display = 'none';
                viewToggleBtn.textContent = '📋 Grid View';
            }
        }

        function renderPapersGrid() {
            const container = document.getElementById('papersGridContainer');
            container.innerHTML = '';

            const sessions = sessionsBySubject[currentSubject];
            const paperCount = papersBySubject[currentSubject];

            // Create session blocks
            sessions.forEach(session => {
                const sessionBlock = document.createElement('div');
                sessionBlock.className = 'session-block';

                // Header with year and period
                const header = document.createElement('div');
                header.className = 'session-header';
                header.textContent = `${currentSubject} ${session.year} ${session.period}`;
                sessionBlock.appendChild(header);

                // Papers container
                const papersContainer = document.createElement('div');
                papersContainer.className = 'session-papers';

                // Create paper columns
                for (let paper = 1; paper <= paperCount; paper++) {
                    const data = getPaperData(currentSubject, session.year, session.period, paper);
                    const percentage = data.score !== null ? Math.round((data.score / data.max) * 100) : null;
                    let percentageClass = 'empty';
                    if (percentage !== null) {
                        if (percentage >= 80) percentageClass = 'excellent';
                        else if (percentage >= 70) percentageClass = 'good';
                        else if (percentage >= 60) percentageClass = 'average';
                        else percentageClass = 'poor';
                    }

                    const difficultyEmoji = data.difficulty ? getDifficultyEmoji(data.difficulty) : '❓';
                    const scoreText = data.score !== null ? `${data.score}/${data.max}` : '-';
                    const percentageText = percentage !== null ? `${percentage}%` : '-';

                    const paperCol = document.createElement('div');
                    paperCol.className = 'paper-column';
                    paperCol.innerHTML = `
                        <div class="paper-label">P${paper}</div>
                        <div class="paper-score">${scoreText}</div>
                        <div class="paper-percentage ${percentageClass}">${percentageText}</div>
                        <div class="paper-emoji">${difficultyEmoji}</div>
                    `;

                    paperCol.addEventListener('click', () => {
                        isGridView = false;
                        sessionsContainer.style.display = 'block';
                        papersGridContainer.style.display = 'none';
                        viewToggleBtn.textContent = '📋 Grid View';
                    });

                    papersContainer.appendChild(paperCol);
                }

                sessionBlock.appendChild(papersContainer);
                container.appendChild(sessionBlock);
            });
        }

        function getDifficultyEmoji(difficulty) {
            const difficultyMap = {
                'very easy': '😄',
                'easy': '🙂',
                'medium': '😐',
                'hard': '😕',
                'very hard': '😭'
            };
            return difficultyMap[difficulty.toLowerCase()] || '❓';
        }

        // Color picker listeners
        setTimeout(() => {
            const getHeaderColors = () => {
                const headerStartInput = document.getElementById('headerStartColor');
                const headerEndInput = document.getElementById('headerEndColor');
                return {
                    headerStart: headerStartInput ? headerStartInput.value : null,
                    headerEnd: headerEndInput ? headerEndInput.value : null
                };
            };

            document.getElementById('accentColor').addEventListener('input', (e) => {
                const { headerStart, headerEnd } = getHeaderColors();
                setTheme(e.target.value, document.getElementById('accentDarkColor').value, document.getElementById('bgPrimary').value, headerStart, headerEnd);
            });
            document.getElementById('accentDarkColor').addEventListener('input', (e) => {
                const { headerStart, headerEnd } = getHeaderColors();
                setTheme(document.getElementById('accentColor').value, e.target.value, document.getElementById('bgPrimary').value, headerStart, headerEnd);
            });
            document.getElementById('bgPrimary').addEventListener('input', (e) => {
                const { headerStart, headerEnd } = getHeaderColors();
                setTheme(document.getElementById('accentColor').value, document.getElementById('accentDarkColor').value, e.target.value, headerStart, headerEnd);
            });

            // Header color listeners
            const headerStartInput = document.getElementById('headerStartColor');
            const headerEndInput = document.getElementById('headerEndColor');
            if (headerStartInput) {
                headerStartInput.addEventListener('input', (e) => {
                    setTheme(
                        document.getElementById('accentColor').value,
                        document.getElementById('accentDarkColor').value,
                        document.getElementById('bgPrimary').value,
                        e.target.value,
                        headerEndInput ? headerEndInput.value : null
                    );
                });
            }
            if (headerEndInput) {
                headerEndInput.addEventListener('input', (e) => {
                    setTheme(
                        document.getElementById('accentColor').value,
                        document.getElementById('accentDarkColor').value,
                        document.getElementById('bgPrimary').value,
                        headerStartInput ? headerStartInput.value : null,
                        e.target.value
                    );
                });
            }
        }, 100);

        function getStorageKey(subject, year, period, paper, field) {
            return `gcse_${subject}_${year}_${period}_paper${paper}_${field}`;
        }

        function getPaperData(subject, year, period, paper) {
            const scoreKey = getStorageKey(subject, year, period, paper, 'score');
            const maxKey = getStorageKey(subject, year, period, paper, 'max');
            const diffKey = getStorageKey(subject, year, period, paper, 'difficulty');
            const notesKey = getStorageKey(subject, year, period, paper, 'notes');
            const defaultMax = defaultMaxMarks[subject][paper - 1];

            const scoreValue = localStorage.getItem(scoreKey);
            const score = scoreValue ? parseInt(scoreValue) : null;

            return {
                score: score,
                max: localStorage.getItem(maxKey) ? parseInt(localStorage.getItem(maxKey)) : defaultMax,
                difficulty: localStorage.getItem(diffKey) || 'medium',
                notes: localStorage.getItem(notesKey) || '',
                completed: scoreValue !== null && scoreValue !== ''
            };
        }

        function savePaperData(subject, year, period, paper, score, max, difficulty) {
            const scoreKey = getStorageKey(subject, year, period, paper, 'score');
            const maxKey = getStorageKey(subject, year, period, paper, 'max');
            const diffKey = getStorageKey(subject, year, period, paper, 'difficulty');

            if (score !== null && score !== '') {
                localStorage.setItem(scoreKey, score);
            } else {
                localStorage.removeItem(scoreKey);
            }
            localStorage.setItem(maxKey, max);
            localStorage.setItem(diffKey, difficulty);
        }

        function openNotesModal(subject, year, period, paper) {
            currentNoteKey = { subject, year, period, paper };
            const data = getPaperData(subject, year, period, paper);
            document.getElementById('notesTitle').textContent = `Notes - ${subject} ${year} ${period} Paper ${paper}`;
            document.getElementById('notesText').value = data.notes;
            document.getElementById('notesModal').classList.add('active');
        }

        function closeNotesModal() {
            document.getElementById('notesModal').classList.remove('active');
        }

        function saveNotes() {
            const notesText = document.getElementById('notesText').value;
            const { subject, year, period, paper } = currentNoteKey;
            const notesKey = getStorageKey(subject, year, period, paper, 'notes');
            localStorage.setItem(notesKey, notesText);
            closeNotesModal();
            renderContent();
        }

        function initializeSidebar() {
            const subjectList = document.getElementById('subjectList');
            subjects.forEach(subject => {
                const btn = document.createElement('button');
                btn.className = 'subject-btn' + (subject === currentSubject ? ' active' : '');
                btn.textContent = subject;
                btn.onclick = () => selectSubject(subject);
                subjectList.appendChild(btn);
            });
        }

        function selectSubject(subject) {
            currentSubject = subject;
            document.querySelectorAll('.subject-btn').forEach(btn => {
                btn.classList.toggle('active', btn.textContent === subject);
            });
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
            document.getElementById('tracker-tab').classList.add('active');
            document.querySelector('[data-tab="tracker"]').classList.add('active');
            renderContent();
        }

        function renderContent() {
            document.getElementById('subjectTitle').textContent = currentSubject;
            const container = document.getElementById('sessionsContainer');
            container.innerHTML = '';

            const sessions = sessionsBySubject[currentSubject];
            const paperCount = papersBySubject[currentSubject];

            sessions.forEach(session => {
                const sessionDiv = document.createElement('div');
                sessionDiv.className = 'session';

                const sessionHeader = document.createElement('div');
                sessionHeader.className = 'session-header';

                const titleDiv = document.createElement('div');
                titleDiv.className = 'session-title';
                titleDiv.textContent = `${session.year} ${session.period}`;

                const totalDiv = document.createElement('div');
                totalDiv.className = 'session-total';
                totalDiv.id = `total_${session.year}_${session.period}`;
                totalDiv.textContent = '0 / 0';

                sessionHeader.appendChild(titleDiv);
                sessionHeader.appendChild(totalDiv);
                sessionDiv.appendChild(sessionHeader);

                const papersDiv = document.createElement('div');
                papersDiv.className = 'papers';

                for (let paper = 1; paper <= paperCount; paper++) {
                    const paperData = getPaperData(currentSubject, session.year, session.period, paper);

                    const paperDiv = document.createElement('div');
                    paperDiv.className = 'paper';

                    const labelDiv = document.createElement('div');
                    labelDiv.className = 'paper-label';
                    labelDiv.textContent = `Paper ${paper}`;

                    const scoreInputDiv = document.createElement('div');
                    scoreInputDiv.className = 'paper-input';

                    const scoreInput = document.createElement('input');
                    scoreInput.type = 'number';
                    scoreInput.placeholder = '0';
                    scoreInput.value = paperData.score !== null ? paperData.score : '';
                    scoreInput.min = '0';

                    const maxInput = document.createElement('input');
                    maxInput.type = 'number';
                    maxInput.value = paperData.max;
                    maxInput.min = '1';
                    maxInput.style.width = '60px';

                    scoreInput.addEventListener('input', (e) => {
                        savePaperData(currentSubject, session.year, session.period, paper, e.target.value || null, maxInput.value, paperData.difficulty);
                        updateSessionTotal(session.year, session.period);
                        updateProgress();
                    });

                    maxInput.addEventListener('input', (e) => {
                        savePaperData(currentSubject, session.year, session.period, paper, scoreInput.value || null, e.target.value, paperData.difficulty);
                        updateSessionTotal(session.year, session.period);
                        updateProgress();
                    });

                    scoreInputDiv.appendChild(scoreInput);
                    scoreInputDiv.appendChild(document.createTextNode(' / '));
                    scoreInputDiv.appendChild(maxInput);

                    const percentDiv = document.createElement('div');
                    percentDiv.className = 'percentage';
                    percentDiv.id = `percent_${session.year}_${session.period}_${paper}`;

                    if (paperData.score !== null) {
                        const percent = Math.round((paperData.score / paperData.max) * 100);
                        percentDiv.textContent = percent + '%';
                    } else {
                        percentDiv.textContent = '-';
                    }

                    const diffContainer = document.createElement('div');
                    diffContainer.className = 'emoji-rating';

                    const difficulties = [
                        { emoji: '😭', label: 'Very Hard', value: 'veryhard' },
                        { emoji: '😕', label: 'Hard', value: 'hard' },
                        { emoji: '😐', label: 'Medium', value: 'medium' },
                        { emoji: '🙂', label: 'Easy', value: 'easy' },
                        { emoji: '😄', label: 'Very Easy', value: 'veryeasy' }
                    ];

                    difficulties.forEach(diff => {
                        const btn = document.createElement('button');
                        btn.className = 'emoji-btn' + (paperData.difficulty === diff.value ? ' selected' : '');
                        btn.innerHTML = `${diff.emoji}<span class="emoji-label">${diff.label}</span>`;
                        btn.title = `How did you find this paper? ${diff.label}`;
                        btn.onclick = (e) => {
                            e.preventDefault();
                            document.querySelectorAll(`.emoji-btn[data-session="${session.year}_${session.period}_${paper}"]`).forEach(b => b.classList.remove('selected'));
                            btn.classList.add('selected');
                            savePaperData(currentSubject, session.year, session.period, paper, scoreInput.value || null, maxInput.value, diff.value);
                        };
                        btn.setAttribute('data-session', `${session.year}_${session.period}_${paper}`);
                        diffContainer.appendChild(btn);
                    });

                    const noteBtn = document.createElement('button');
                    noteBtn.className = 'note-btn';
                    noteBtn.innerHTML = '📝 <span>Notes</span>';
                    noteBtn.title = 'Add or view notes for this paper';
                    noteBtn.onclick = () => openNotesModal(currentSubject, session.year, session.period, paper);

                    paperDiv.appendChild(labelDiv);
                    paperDiv.appendChild(scoreInputDiv);
                    paperDiv.appendChild(percentDiv);
                    paperDiv.appendChild(diffContainer);
                    paperDiv.appendChild(noteBtn);
                    papersDiv.appendChild(paperDiv);
                }

                sessionDiv.appendChild(papersDiv);
                container.appendChild(sessionDiv);
            });

            updateProgress();
            sessions.forEach(session => {
                updateSessionTotal(session.year, session.period);
            });
        }

        function updateSessionTotal(year, period) {
            const sessions = sessionsBySubject[currentSubject];
            const paperCount = papersBySubject[currentSubject];

            let totalScore = 0, totalMax = 0, maxPossible = 0;

            for (let paper = 1; paper <= paperCount; paper++) {
                const data = getPaperData(currentSubject, year, period, paper);
                const percentDiv = document.getElementById(`percent_${year}_${period}_${paper}`);

                // Always add to maxPossible to show total marks available
                maxPossible += data.max;

                if (data.score !== null && data.score !== '') {
                    totalScore += data.score;
                    totalMax += data.max;
                    const percent = Math.round((data.score / data.max) * 100);
                    percentDiv.textContent = percent + '%';
                } else {
                    percentDiv.textContent = '-';
                }
            }

            const totalDiv = document.getElementById(`total_${year}_${period}`);
            if (totalMax > 0) {
                const totalPercent = Math.round((totalScore / totalMax) * 100);
                totalDiv.textContent = `${totalScore} / ${totalMax} (${totalPercent}%)`;
            } else {
                totalDiv.textContent = `0 / ${maxPossible}`;
            }
        }

        function updateProgress() {
            const sessions = sessionsBySubject[currentSubject];
            const paperCount = papersBySubject[currentSubject];

            let completedCount = 0, totalCount = 0, totalScore = 0, totalMax = 0, bestPercent = 0, bestSession = '-';

            sessions.forEach(session => {
                let sessionScore = 0, sessionMax = 0;

                for (let paper = 1; paper <= paperCount; paper++) {
                    totalCount++;
                    const data = getPaperData(currentSubject, session.year, session.period, paper);
                    if (data.score !== null) {
                        completedCount++;
                        totalScore += data.score;
                        totalMax += data.max;
                        sessionScore += data.score;
                        sessionMax += data.max;
                    }
                }

                if (sessionMax > 0) {
                    const sessionPercent = Math.round((sessionScore / sessionMax) * 100);
                    if (sessionPercent > bestPercent) {
                        bestPercent = sessionPercent;
                        bestSession = `${session.year} ${session.period}`;
                    }
                }
            });

            const avgPercent = totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : '-';

            document.getElementById('completedCount').textContent = completedCount;
            document.getElementById('totalCount').textContent = totalCount;
            document.getElementById('avgScore').textContent = totalMax > 0 ? avgPercent + '%' : '-';
            document.getElementById('bestSession').textContent = bestSession;
        }

        function renderDashboard() {
            const statsGrid = document.getElementById('statsGrid');
            const heatmapContainer = document.getElementById('heatmapContainer');
            const subjectGrid = document.getElementById('subjectGrid');
            const weakAreasContainer = document.getElementById('weakAreasContainer');

            statsGrid.innerHTML = '';
            heatmapContainer.innerHTML = '';
            subjectGrid.innerHTML = '';
            weakAreasContainer.innerHTML = '';

            // Calculate Statistics
            let totalPapers = 0, completedPapers = 0, totalScore = 0, totalMax = 0;
            let bestSubject = '', bestScore = 0, worstSubject = '', worstScore = 100;
            const subjectData = {};
            let allProgress = [];
            let weakAreas = [];

            subjects.forEach(subject => {
                const sessions = sessionsBySubject[subject];
                const paperCount = papersBySubject[subject];
                let totalScore = 0, totalMax = 0, completedPapers = 0;

                sessions.forEach(session => {
                    for (let paper = 1; paper <= paperCount; paper++) {
                        const data = getPaperData(subject, session.year, session.period, paper);
                        if (data.score !== null) {
                            totalScore += data.score;
                            totalMax += data.max;
                            completedPapers++;
                            const percent = Math.round((data.score / data.max) * 100);
                            allProgress.push({ subject, year: session.year, percent });

                            if (percent < 70) {
                                weakAreas.push({ subject, session: `${session.year} ${session.period}`, paper, percent });
                            }
                        }
                    }
                });

                const avgPercent = totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : 0;
                subjectData[subject] = { avgPercent, completedPapers, totalPapers: sessions.length * paperCount, totalScore, totalMax };

                // Track best/worst subjects
                if (avgPercent > bestScore && avgPercent > 0) {
                    bestScore = avgPercent;
                    bestSubject = subject;
                }
                if (avgPercent > 0 && avgPercent < worstScore) {
                    worstScore = avgPercent;
                    worstSubject = subject;
                }

                totalPapers += sessions.length * paperCount;
                completedPapers += subjectData[subject].completedPapers;
                totalScore += subjectData[subject].totalScore;
                totalMax += subjectData[subject].totalMax;

                const card = document.createElement('div');
                card.className = 'subject-card';
                card.innerHTML = `
                    <h3>${subject}</h3>
                    <div class="subject-stats">
                        <div class="stat-row">
                            <span>Average Score:</span>
                            <span class="stat-value">${avgPercent}%</span>
                        </div>
                        <div class="stat-row">
                            <span>Papers Done:</span>
                            <span class="stat-value">${completedPapers}</span>
                        </div>
                        <div class="stat-row">
                            <span>Total Papers:</span>
                            <span class="stat-value">${subjectData[subject].totalPapers}</span>
                        </div>
                    </div>
                `;
                subjectGrid.appendChild(card);
            });

            // Progress Chart
            if (progressChart) progressChart.destroy();
            const progressCtx = document.getElementById('progressChart').getContext('2d');
            const progressYears = [...new Set(allProgress.map(p => p.year))].sort();
            const progressDatasets = subjects.map(subject => ({
                label: subject,
                data: progressYears.map(year => {
                    const dataPoints = allProgress.filter(p => p.subject === subject && p.year === year);
                    return dataPoints.length > 0 ? Math.round(dataPoints.reduce((a, b) => a + b.percent, 0) / dataPoints.length) : null;
                }),
                borderWidth: 2,
                tension: 0.4
            }));

            progressChart = new Chart(progressCtx, {
                type: 'line',
                data: { labels: progressYears, datasets: progressDatasets },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { position: 'bottom' } },
                    scales: { y: { beginAtZero: true, max: 100 } }
                }
            });

            // Comparison Chart
            if (comparisonChart) comparisonChart.destroy();
            const comparisonCtx = document.getElementById('comparisonChart').getContext('2d');
            const comparisonChart_new = new Chart(comparisonCtx, {
                type: 'bar',
                data: {
                    labels: subjects,
                    datasets: [{
                        label: 'Average Score %',
                        data: subjects.map(s => subjectData[s].avgPercent),
                        backgroundColor: '#667eea',
                        borderColor: '#1F4E78',
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: { y: { beginAtZero: true, max: 100 } },
                    plugins: { legend: { display: false } }
                }
            });
            comparisonChart = comparisonChart_new;

            // Render Statistics Cards
            const overallPercent = totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : 0;
            const improvementRate = totalMax > 0 ? ((totalScore / totalMax) * 100).toFixed(1) : 0;

            const statsCards = [
                { label: 'Overall Average', value: overallPercent + '%', sub: 'across all subjects' },
                { label: 'Papers Completed', value: completedPapers, sub: `of ${totalPapers} papers` },
                { label: 'Best Subject', value: bestSubject || '-', sub: bestScore + '%' },
                { label: 'Total Score', value: totalScore, sub: `out of ${totalMax}` }
            ];

            statsCards.forEach((stat, idx) => {
                const card = document.createElement('div');
                card.className = 'stat-card';
                card.style.animationDelay = (idx * 0.1) + 's';
                card.innerHTML = `
                    <h4>${stat.label}</h4>
                    <div class="big-number">${stat.value}</div>
                    <div class="sub-text">${stat.sub}</div>
                `;
                statsGrid.appendChild(card);
            });

            // Render Heatmap
            let heatmapHTML = '<h3>Performance by Subject & Year</h3><table class="heatmap-table"><thead><tr><th>Subject</th>';

            // Get all unique years
            const allYears = new Set();
            subjects.forEach(subject => {
                sessionsBySubject[subject].forEach(session => allYears.add(session.year));
            });
            const yearsArray = Array.from(allYears).sort();

            yearsArray.forEach(year => {
                heatmapHTML += `<th>${year}</th>`;
            });
            heatmapHTML += '</tr></thead><tbody>';

            subjects.forEach(subject => {
                heatmapHTML += `<tr><td class="heatmap-subject-label">${subject}</td>`;

                yearsArray.forEach(year => {
                    let yearScore = null;
                    let yearMax = 0;
                    const sessions = sessionsBySubject[subject];
                    const paperCount = papersBySubject[subject];

                    sessions.forEach(session => {
                        if (session.year === year) {
                            for (let p = 1; p <= paperCount; p++) {
                                const data = getPaperData(subject, session.year, session.period, p);
                                if (data.score !== null && data.score !== '') {
                                    if (yearScore === null) yearScore = 0;
                                    yearScore += data.score;
                                    yearMax += data.max;
                                }
                            }
                        }
                    });

                    let cellHTML = '';
                    if (yearScore === null) {
                        cellHTML = '<td><span class="heatmap-cell not-done">-</span></td>';
                    } else {
                        const percent = Math.round((yearScore / yearMax) * 100);
                        let cellClass = 'not-done';
                        if (percent >= 80) cellClass = 'excellent';
                        else if (percent >= 70) cellClass = 'good';
                        else if (percent >= 50) cellClass = 'fair';
                        else cellClass = 'poor';
                        cellHTML = `<td><span class="heatmap-cell ${cellClass}">${percent}%</span></td>`;
                    }
                    heatmapHTML += cellHTML;
                });

                heatmapHTML += '</tr>';
            });

            heatmapHTML += '</tbody></table>';
            heatmapHTML += `
                <div class="heatmap-legend">
                    <div class="legend-item"><div class="legend-color" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);"></div> <span>80%+ Excellent</span></div>
                    <div class="legend-item"><div class="legend-color" style="background: linear-gradient(135deg, #84cc16 0%, #65a30d 100%);"></div> <span>70-79% Good</span></div>
                    <div class="legend-item"><div class="legend-color" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);"></div> <span>50-69% Fair</span></div>
                    <div class="legend-item"><div class="legend-color" style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);"></div> <span>Below 50% Poor</span></div>
                    <div class="legend-item"><div class="legend-color" style="background: var(--bg-tertiary);"></div> <span>Not Done</span></div>
                </div>
            `;

            heatmapContainer.innerHTML = heatmapHTML;

            // Weak Areas
            if (weakAreas.length === 0) {
                weakAreasContainer.innerHTML = '<p style="color: var(--text-secondary);">Great job! No weak areas identified. 🎉</p>';
            } else {
                weakAreas.sort((a, b) => a.percent - b.percent);
                let html = '<table style="width: 100%; text-align: left;">';
                html += '<tr style="border-bottom: 2px solid var(--border-color); padding: 10px 0;"><th>Subject</th><th>Session</th><th>Paper</th><th>Score</th></tr>';
                weakAreas.slice(0, 10).forEach(item => {
                    html += `<tr style="border-bottom: 1px solid var(--border-color); padding: 10px 0;">
                        <td>${item.subject}</td>
                        <td>${item.session}</td>
                        <td>${item.paper}</td>
                        <td><strong style="color: #dc3545;">${item.percent}%</strong></td>
                    </tr>`;
                });
                html += '</table>';
                weakAreasContainer.innerHTML = html;
            }
            // Render Subject Trends
            renderSubjectTrends();

            // Render Problem Papers
            renderProblemPapers();
        }

        // Render subject trends section
        function renderSubjectTrends() {
            const container = document.getElementById('subjectTrendsContainer');
            if (!container) return;

            container.innerHTML = '';

            subjects.forEach(subject => {
                const trendAnalysis = getSubjectTrendAnalysis(subject);
                const trends = trendAnalysis.trends;

                if (trends.length === 0) return;

                const card = document.createElement('div');
                card.className = 'trend-card';

                const firstPercent = trends[0].percentage;
                const lastPercent = trends[trends.length - 1].percentage;
                const change = lastPercent - firstPercent;

                let directionClass = 'stable';
                if (change > 5) directionClass = 'improving';
                else if (change < -5) directionClass = 'declining';

                card.innerHTML = `
                    <h4>${subject}</h4>
                    <div style="font-size: 1.1em; margin-bottom: 8px;">
                        <span class="trend-direction ${directionClass}">${trendAnalysis.direction}</span>
                        <span style="margin-left: 8px; color: var(--text-secondary);">
                            ${firstPercent}% → ${lastPercent}%
                        </span>
                    </div>
                    <div style="font-size: 0.85em; color: var(--text-secondary);">
                        ${trendAnalysis.status}
                    </div>
                `;

                container.appendChild(card);
            });
        }

        // Render problem papers section
        function renderProblemPapers() {
            const container = document.getElementById('problemPapersContainer');
            if (!container) return;

            container.innerHTML = '';

            const allProblems = [];

            subjects.forEach(subject => {
                const problems = findProblemPapers(subject, 70);
                problems.forEach(problem => {
                    allProblems.push({ subject, ...problem });
                });
            });

            if (allProblems.length === 0) {
                container.innerHTML = '<p style="color: var(--text-secondary);">No problem papers identified. Great job! 🎉</p>';
                return;
            }

            // Sort by low score count
            allProblems.sort((a, b) => b.lowScoreCount - a.lowScoreCount);

            let html = '<table><thead><tr><th>Subject</th><th>Paper</th><th>Avg Score</th><th>Low Scores</th><th>Range</th></tr></thead><tbody>';

            allProblems.forEach(problem => {
                const rowClass = problem.lowScoreCount >= 3 ? 'style="background: rgba(239, 68, 68, 0.05)"' : '';
                html += `<tr ${rowClass}>
                    <td><strong>${problem.subject}</strong></td>
                    <td>Paper ${problem.paper}</td>
                    <td>${problem.avgScore}%</td>
                    <td><span class="problem-badge">${problem.lowScoreCount}/${problem.attempts}</span></td>
                    <td>${problem.worstScore}% - ${problem.bestScore}%</td>
                </tr>`;
            });

            html += '</tbody></table>';
            container.innerHTML = html;
        }

        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tabName = e.target.dataset.tab;
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                document.getElementById(`${tabName}-tab`).classList.add('active');
                if (tabName === 'dashboard') renderDashboard();
            });
        });

        // Dark Mode
        document.getElementById('themeToggle').addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
            document.getElementById('themeToggle').textContent = document.body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';
        });

        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
            document.getElementById('themeToggle').textContent = '☀️ Light Mode';
        }

        // Clear all
        document.getElementById('viewToggleBtn').addEventListener('click', toggleGridView);

        document.getElementById('clearBtn').addEventListener('click', () => {
            if (confirm(`Clear all data for ${currentSubject}?`)) {
                const sessions = sessionsBySubject[currentSubject];
                const paperCount = papersBySubject[currentSubject];
                sessions.forEach(session => {
                    for (let paper = 1; paper <= paperCount; paper++) {
                        ['score', 'max', 'difficulty', 'notes'].forEach(field => {
                            localStorage.removeItem(getStorageKey(currentSubject, session.year, session.period, paper, field));
                        });
                    }
                });
                renderContent();
                renderDashboard();
            }
        });

        // Export PDF
        document.getElementById('exportBtn').addEventListener('click', () => {
            const element = document.getElementById('tracker-tab');
            const opt = { margin: 10, filename: `GCSE_${currentSubject.replace(/\s+/g, '_')}.pdf`, image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2 }, jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' } };
            html2pdf().set(opt).from(element).save();
        });

        document.getElementById('exportDashboardBtn').addEventListener('click', () => {
            const element = document.getElementById('dashboard-tab');
            const opt = { margin: 10, filename: 'GCSE_Dashboard.pdf', image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2 }, jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' } };
            html2pdf().set(opt).from(element).save();
        });

        document.getElementById('dashboardExportCSVBtn').addEventListener('click', exportToCSV);
        document.getElementById('dashboardBackupBtn').addEventListener('click', createBackup);

        // Paper analysis button
        const paperAnalysisBtn = document.getElementById('paperAnalysisBtn');
        if (paperAnalysisBtn) {
            paperAnalysisBtn.addEventListener('click', openPaperAnalysisModal);
        }

        // Theme editor button
        document.getElementById('themeEditorBtn').addEventListener('click', openThemeEditor);

        // Import/Export button
        document.getElementById('importExportBtn').addEventListener('click', openImportModal);

        // Close modal on outside click
        document.getElementById('themeEditorModal').addEventListener('click', (e) => {
            if (e.target.id === 'themeEditorModal') closeThemeEditor();
        });

        document.getElementById('importExportModal').addEventListener('click', (e) => {
            if (e.target.id === 'importExportModal') closeImportExportModal();
        });

        const paperAnalysisModal = document.getElementById('paperAnalysisModal');
        if (paperAnalysisModal) {
            paperAnalysisModal.addEventListener('click', (e) => {
                if (e.target.id === 'paperAnalysisModal') closePaperAnalysisModal();
            });
        }

        // Initialize
        loadTheme();
        initializeSidebar();
        renderContent();
        setupImportExportUI();
        setupPaperAnalysisUI();