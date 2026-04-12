// Comparison & Analysis Utilities for GCSE Past Paper Tracker

// Get all scores for a specific paper across all years
function getPaperHistory(subject, paper) {
    const sessions = sessionsBySubject[subject];
    const history = [];

    sessions.forEach(session => {
        const data = getPaperData(subject, session.year, session.period, paper);
        if (data.score !== null) {
            const percentage = Math.round((data.score / data.max) * 100);
            history.push({
                year: session.year,
                period: session.period,
                score: data.score,
                max: data.max,
                percentage,
                difficulty: data.difficulty
            });
        }
    });

    return history.sort((a, b) => a.year - b.year || sessionOrder(a.period, b.period));
}

// Helper: Order sessions chronologically
function sessionOrder(period1, period2) {
    const order = { 'June/May': 0, 'October/November': 1, 'Lockdown': 2 };
    return (order[period1] || 99) - (order[period2] || 99);
}

// Calculate trend for a paper across years
function calculatePaperTrend(subject, paper) {
    const history = getPaperHistory(subject, paper);
    if (history.length < 2) {
        return { direction: '-', trend: 'insufficient data' };
    }

    const first = history[0].percentage;
    const last = history[history.length - 1].percentage;
    const change = last - first;
    const percentChange = ((change / first) * 100).toFixed(1);

    if (change > 5) {
        return { direction: '↑', trend: `Improving (+${change.toFixed(1)}%, +${percentChange}%)` };
    } else if (change < -5) {
        return { direction: '↓', trend: `Declining (${change.toFixed(1)}%, ${percentChange}%)` };
    } else {
        return { direction: '→', trend: `Flat (${change.toFixed(1)}%)` };
    }
}

// Calculate improvement between consecutive sessions
function calculateSessionImprovement(subject) {
    const sessions = sessionsBySubject[subject];
    const paperCount = papersBySubject[subject];
    const improvements = [];

    for (let i = 1; i < sessions.length; i++) {
        const prevSession = sessions[i - 1];
        const currSession = sessions[i];

        let prevTotal = 0, prevMax = 0, currTotal = 0, currMax = 0;
        let prevCount = 0, currCount = 0;

        for (let paper = 1; paper <= paperCount; paper++) {
            const prevData = getPaperData(subject, prevSession.year, prevSession.period, paper);
            const currData = getPaperData(subject, currSession.year, currSession.period, paper);

            if (prevData.score !== null) {
                prevTotal += prevData.score;
                prevMax += prevData.max;
                prevCount++;
            }

            if (currData.score !== null) {
                currTotal += currData.score;
                currMax += currData.max;
                currCount++;
            }
        }

        if (prevCount > 0 && currCount > 0) {
            const prevPercent = Math.round((prevTotal / prevMax) * 100);
            const currPercent = Math.round((currTotal / currMax) * 100);
            const improvement = currPercent - prevPercent;

            improvements.push({
                from: `${prevSession.year} ${prevSession.period}`,
                to: `${currSession.year} ${currSession.period}`,
                fromPercent: prevPercent,
                toPercent: currPercent,
                change: improvement,
                papers: currCount
            });
        }
    }

    return improvements;
}

// Find papers with consistently low scores
function findProblemPapers(subject, threshold = 70) {
    const sessions = sessionsBySubject[subject];
    const paperCount = papersBySubject[subject];
    const problemPapers = [];

    for (let paper = 1; paper <= paperCount; paper++) {
        let lowCount = 0;
        let totalCount = 0;
        let totalScore = 0;
        let scores = [];

        sessions.forEach(session => {
            const data = getPaperData(subject, session.year, session.period, paper);
            if (data.score !== null) {
                const percentage = Math.round((data.score / data.max) * 100);
                scores.push(percentage);
                totalCount++;
                totalScore += percentage;

                if (percentage < threshold) {
                    lowCount++;
                }
            }
        });

        if (lowCount >= 2 && totalCount >= 2) {
            const avgScore = Math.round(totalScore / totalCount);
            problemPapers.push({
                paper,
                avgScore,
                attempts: totalCount,
                lowScoreCount: lowCount,
                worstScore: Math.min(...scores),
                bestScore: Math.max(...scores)
            });
        }
    }

    return problemPapers.sort((a, b) => b.lowScoreCount - a.lowScoreCount);
}

// Get overall trend analysis for a subject
function getSubjectTrendAnalysis(subject) {
    const sessions = sessionsBySubject[subject];
    const paperCount = papersBySubject[subject];
    const trends = [];

    // Calculate average for each session
    for (let i = Math.max(0, sessions.length - 5); i < sessions.length; i++) {
        const session = sessions[i];
        let totalScore = 0, totalMax = 0, count = 0;

        for (let paper = 1; paper <= paperCount; paper++) {
            const data = getPaperData(subject, session.year, session.period, paper);
            if (data.score !== null) {
                totalScore += data.score;
                totalMax += data.max;
                count++;
            }
        }

        if (count > 0) {
            const percentage = Math.round((totalScore / totalMax) * 100);
            trends.push({
                session: `${session.year} ${session.period}`,
                percentage,
                papersAttempted: count
            });
        }
    }

    // Determine trend direction
    if (trends.length < 2) {
        return { trends, direction: '-', status: 'insufficient data' };
    }

    const first = trends[0].percentage;
    const last = trends[trends.length - 1].percentage;
    const change = last - first;

    if (change > 10) {
        return { trends, direction: '↑', status: `Improving (+${change}%)` };
    } else if (change < -10) {
        return { trends, direction: '↓', status: `Declining (${change}%)` };
    } else {
        return { trends, direction: '→', status: `Stable (${change}%)` };
    }
}

// Compare two specific sessions
function compareSessions(subject, sessionIndex1, sessionIndex2) {
    const sessions = sessionsBySubject[subject];
    const paperCount = papersBySubject[subject];

    if (sessionIndex1 < 0 || sessionIndex1 >= sessions.length ||
        sessionIndex2 < 0 || sessionIndex2 >= sessions.length) {
        return null;
    }

    const session1 = sessions[sessionIndex1];
    const session2 = sessions[sessionIndex2];
    const comparison = [];

    let total1 = 0, max1 = 0, count1 = 0;
    let total2 = 0, max2 = 0, count2 = 0;

    for (let paper = 1; paper <= paperCount; paper++) {
        const data1 = getPaperData(subject, session1.year, session1.period, paper);
        const data2 = getPaperData(subject, session2.year, session2.period, paper);

        let percent1 = null, percent2 = null;

        if (data1.score !== null) {
            percent1 = Math.round((data1.score / data1.max) * 100);
            total1 += data1.score;
            max1 += data1.max;
            count1++;
        }

        if (data2.score !== null) {
            percent2 = Math.round((data2.score / data2.max) * 100);
            total2 += data2.score;
            max2 += data2.max;
            count2++;
        }

        if (percent1 !== null || percent2 !== null) {
            const change = percent1 && percent2 ? percent2 - percent1 : null;
            comparison.push({
                paper,
                score1: percent1,
                score2: percent2,
                change
            });
        }
    }

    const overallPercent1 = count1 > 0 ? Math.round((total1 / max1) * 100) : null;
    const overallPercent2 = count2 > 0 ? Math.round((total2 / max2) * 100) : null;
    const overallChange = overallPercent1 && overallPercent2 ? overallPercent2 - overallPercent1 : null;

    return {
        session1: `${session1.year} ${session1.period}`,
        session2: `${session2.year} ${session2.period}`,
        papers: comparison,
        overallPercent1,
        overallPercent2,
        overallChange
    };
}

// Get top improvements
function getTopImprovements(subject, lastNSessions = 5) {
    const improvements = calculateSessionImprovement(subject);
    return improvements.slice(-lastNSessions).reverse();
}

// Open paper analysis modal
function openPaperAnalysisModal() {
    const modal = document.getElementById('paperAnalysisModal');
    if (modal) {
        modal.classList.add('active');
        populatePaperSelectors();
    }
}

// Close paper analysis modal
function closePaperAnalysisModal() {
    const modal = document.getElementById('paperAnalysisModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Populate subject and paper selectors
function populatePaperSelectors() {
    const subjectSelect = document.getElementById('paperAnalysisSubject');
    const paperSelect = document.getElementById('paperAnalysisPaper');

    if (!subjectSelect || !paperSelect) return;

    // Populate subjects
    subjectSelect.innerHTML = '';
    subjects.forEach(subject => {
        const option = document.createElement('option');
        option.value = subject;
        option.textContent = subject;
        subjectSelect.appendChild(option);
    });

    // Populate papers
    updatePaperSelectOptions();

    // Update papers when subject changes
    subjectSelect.addEventListener('change', updatePaperSelectOptions);
}

// Update paper selector based on selected subject
function updatePaperSelectOptions() {
    const subjectSelect = document.getElementById('paperAnalysisSubject');
    const paperSelect = document.getElementById('paperAnalysisPaper');

    if (!subjectSelect || !paperSelect) return;

    const subject = subjectSelect.value;
    const paperCount = papersBySubject[subject] || 2;

    paperSelect.innerHTML = '';
    for (let i = 1; i <= paperCount; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Paper ${i}`;
        paperSelect.appendChild(option);
    }
}

// Display paper analysis chart
function displayPaperAnalysis() {
    const subjectSelect = document.getElementById('paperAnalysisSubject');
    const paperSelect = document.getElementById('paperAnalysisPaper');

    if (!subjectSelect || !paperSelect) return;

    const subject = subjectSelect.value;
    const paper = parseInt(paperSelect.value);
    const history = getPaperHistory(subject, paper);
    const trend = calculatePaperTrend(subject, paper);

    if (history.length === 0) {
        alert('No data found for this paper');
        return;
    }

    // Destroy existing chart if present
    if (window.paperAnalysisChart) {
        window.paperAnalysisChart.destroy();
    }

    // Create chart
    const ctx = document.getElementById('paperAnalysisChart');
    if (!ctx) return;

    window.paperAnalysisChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: history.map(h => `${h.year} ${h.period}`),
            datasets: [{
                label: `${subject} - Paper ${paper}`,
                data: history.map(h => h.percentage),
                borderColor: '#6366f1',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointRadius: 6,
                pointBackgroundColor: '#6366f1',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true, max: 100, ticks: { stepSize: 10 } }
            }
        }
    });

    // Update stats
    const best = Math.max(...history.map(h => h.percentage));
    const worst = Math.min(...history.map(h => h.percentage));

    const statsDiv = document.getElementById('paperAnalysisStats');
    if (statsDiv) {
        statsDiv.innerHTML = `
            <div class="stat-item">
                <span>Best Score:</span>
                <strong>${best}%</strong>
            </div>
            <div class="stat-item">
                <span>Worst Score:</span>
                <strong>${worst}%</strong>
            </div>
            <div class="stat-item">
                <span>Trend:</span>
                <strong>${trend.direction} ${trend.trend}</strong>
            </div>
        `;
    }
}

// Setup paper analysis UI
function setupPaperAnalysisUI() {
    const subjectSelect = document.getElementById('paperAnalysisSubject');
    const paperSelect = document.getElementById('paperAnalysisPaper');
    const analysisBtn = document.getElementById('analyzePaperBtn');

    if (subjectSelect) subjectSelect.addEventListener('change', updatePaperSelectOptions);
    if (paperSelect) paperSelect.addEventListener('change', displayPaperAnalysis);
    if (analysisBtn) analysisBtn.addEventListener('click', displayPaperAnalysis);

    // Initial population
    populatePaperSelectors();
}
