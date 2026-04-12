const subjects = ['Mathematics', 'English Language', 'English Literature', 'Biology', 'Chemistry', 'Physics', 'History', 'Geography', 'Computer Science'];

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
                { year: '2017', period: 'June/May' }, { year: '2017', period: 'October/November' },
                { year: '2018', period: 'June/May' }, { year: '2018', period: 'October/November' },
                { year: '2019', period: 'June/May' }, { year: '2019', period: 'October/November' },
                { year: '2020', period: 'Lockdown' },
                { year: '2021', period: 'October/November' },
                { year: '2022', period: 'June/May' }, { year: '2022', period: 'October/November' },
                { year: '2023', period: 'June/May' }, { year: '2023', period: 'October/November' },
                { year: '2024', period: 'June/May' }, { year: '2024', period: 'October/November' }
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
            ]
        };

        const papersBySubject = {
            'Mathematics': 3, 'English Language': 2, 'English Literature': 2,
            'Biology': 2, 'Chemistry': 2, 'Physics': 2, 'History': 3,
            'Geography': 3, 'Computer Science': 2
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
            'Computer Science': [80, 80]
        };

        let currentSubject = 'Mathematics';
        let currentNoteKey = null;
        let progressChart = null;
        let comparisonChart = null;

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
                    scoreInput.value = paperData.score || '';
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
            const subjectGrid = document.getElementById('subjectGrid');
            const weakAreasContainer = document.getElementById('weakAreasContainer');

            subjectGrid.innerHTML = '';
            weakAreasContainer.innerHTML = '';

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
                subjectData[subject] = { avgPercent, completedPapers, totalPapers: sessions.length * paperCount };

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

        // Initialize
        initializeSidebar();
        renderContent();