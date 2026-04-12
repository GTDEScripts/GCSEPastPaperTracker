// Export/Import Utilities for GCSE Past Paper Tracker

// Escape special characters in CSV fields
function escapeCSVField(field) {
    if (field === null || field === undefined) return '';
    const str = String(field);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return '"' + str.replace(/"/g, '""') + '"';
    }
    return str;
}

// Export all data to CSV format
function exportToCSV() {
    const rows = ['Subject,Year,Period,Paper,Score,Max,Percentage,Difficulty,Notes'];

    subjects.forEach(subject => {
        const sessions = sessionsBySubject[subject];
        const paperCount = papersBySubject[subject];

        sessions.forEach(session => {
            for (let paper = 1; paper <= paperCount; paper++) {
                const data = getPaperData(subject, session.year, session.period, paper);

                const score = data.score !== null ? data.score : '';
                const percentage = data.score !== null ? Math.round((data.score / data.max) * 100) : '';

                const row = [
                    escapeCSVField(subject),
                    escapeCSVField(session.year),
                    escapeCSVField(session.period),
                    escapeCSVField(paper),
                    escapeCSVField(score),
                    escapeCSVField(data.max),
                    escapeCSVField(percentage),
                    escapeCSVField(data.difficulty || ''),
                    escapeCSVField(data.notes || '')
                ];

                rows.push(row.join(','));
            }
        });
    });

    downloadFile(rows.join('\n'), `GCSE_Tracker_Export_${new Date().toISOString().split('T')[0]}.csv`, 'text/csv');
}

// Export single subject to CSV
function exportSubjectToCSV(subject) {
    const rows = ['Subject,Year,Period,Paper,Score,Max,Percentage,Difficulty,Notes'];
    const sessions = sessionsBySubject[subject];
    const paperCount = papersBySubject[subject];

    sessions.forEach(session => {
        for (let paper = 1; paper <= paperCount; paper++) {
            const data = getPaperData(subject, session.year, session.period, paper);

            const score = data.score !== null ? data.score : '';
            const percentage = data.score !== null ? Math.round((data.score / data.max) * 100) : '';

            const row = [
                escapeCSVField(subject),
                escapeCSVField(session.year),
                escapeCSVField(session.period),
                escapeCSVField(paper),
                escapeCSVField(score),
                escapeCSVField(data.max),
                escapeCSVField(percentage),
                escapeCSVField(data.difficulty || ''),
                escapeCSVField(data.notes || '')
            ];

            rows.push(row.join(','));
        }
    });

    downloadFile(rows.join('\n'), `GCSE_${subject.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`, 'text/csv');
}

// Export all data to JSON format
function exportToJSON() {
    const data = {
        backup: {
            version: '1.0',
            createdAt: new Date().toISOString(),
            appVersion: '2.0'
        },
        theme: {
            accent: getComputedStyle(document.documentElement).getPropertyValue('--accent').trim(),
            accentDark: getComputedStyle(document.documentElement).getPropertyValue('--accent-dark').trim(),
            bgPrimary: getComputedStyle(document.documentElement).getPropertyValue('--bg-primary').trim(),
            bgSecondary: getComputedStyle(document.documentElement).getPropertyValue('--bg-secondary').trim(),
            textPrimary: getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim(),
            textSecondary: getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim()
        },
        darkMode: document.body.classList.contains('dark-mode'),
        papers: []
    };

    subjects.forEach(subject => {
        const sessions = sessionsBySubject[subject];
        const paperCount = papersBySubject[subject];

        sessions.forEach(session => {
            for (let paper = 1; paper <= paperCount; paper++) {
                const paperData = getPaperData(subject, session.year, session.period, paper);

                data.papers.push({
                    subject,
                    year: session.year,
                    period: session.period,
                    paper,
                    score: paperData.score,
                    max: paperData.max,
                    difficulty: paperData.difficulty || null,
                    notes: paperData.notes || '',
                    lastModified: new Date().toISOString()
                });
            }
        });
    });

    downloadFile(JSON.stringify(data, null, 2), `GCSE_Backup_${new Date().toISOString().split('T')[0]}.json`, 'application/json');
}

// Create full backup (alias for exportToJSON)
function createBackup() {
    exportToJSON();
}

// Download helper function
function downloadFile(content, filename, mimeType) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

// Validate imported data
function validateImportData(fileContent, format) {
    try {
        if (format === 'json') {
            const data = JSON.parse(fileContent);

            // Check if it's a valid backup or data export
            if (!data.papers && !Array.isArray(data)) {
                return { valid: false, error: 'Invalid JSON format. Expected papers array or backup object.' };
            }

            const papers = data.papers || data;

            // Validate each paper entry
            for (const paper of papers) {
                if (!paper.subject || !paper.year || !paper.period || paper.paper === undefined) {
                    return { valid: false, error: `Missing required fields in paper: ${JSON.stringify(paper)}` };
                }

                // Validate that the session exists
                const sessions = sessionsBySubject[paper.subject];
                if (!sessions) {
                    return { valid: false, error: `Unknown subject: ${paper.subject}` };
                }

                const sessionExists = sessions.some(s => s.year === paper.year && s.period === paper.period);
                if (!sessionExists) {
                    return { valid: false, error: `Unknown session for ${paper.subject}: ${paper.year} ${paper.period}` };
                }

                // Validate score if present
                if (paper.score !== null && paper.score !== undefined) {
                    if (isNaN(paper.score) || paper.score < 0) {
                        return { valid: false, error: `Invalid score: ${paper.score}` };
                    }
                    if (paper.max && paper.score > paper.max) {
                        return { valid: false, error: `Score ${paper.score} exceeds max ${paper.max}` };
                    }
                }
            }

            return { valid: true, papers, theme: data.theme, darkMode: data.darkMode };

        } else if (format === 'csv') {
            const lines = fileContent.split('\n').map(line => line.trim()).filter(line => line);
            if (lines.length < 2) {
                return { valid: false, error: 'CSV file is empty or has no data rows' };
            }

            const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
            const requiredHeaders = ['subject', 'year', 'period', 'paper', 'score', 'max'];

            for (const header of requiredHeaders) {
                if (!headers.includes(header)) {
                    return { valid: false, error: `Missing required column: ${header}` };
                }
            }

            const papers = [];
            for (let i = 1; i < lines.length; i++) {
                const values = parseCSVLine(lines[i]);
                if (values.length < 6) continue;

                const paper = {
                    subject: values[headers.indexOf('subject')],
                    year: values[headers.indexOf('year')],
                    period: values[headers.indexOf('period')],
                    paper: parseInt(values[headers.indexOf('paper')]),
                    score: values[headers.indexOf('score')] ? parseFloat(values[headers.indexOf('score')]) : null,
                    max: parseFloat(values[headers.indexOf('max')]),
                    difficulty: headers.includes('difficulty') ? values[headers.indexOf('difficulty')] : null,
                    notes: headers.includes('notes') ? values[headers.indexOf('notes')] : ''
                };

                // Validate
                if (!paper.subject || !paper.year || !paper.period || isNaN(paper.paper)) {
                    return { valid: false, error: `Invalid row ${i}: missing required fields` };
                }

                papers.push(paper);
            }

            return { valid: true, papers };
        }
    } catch (error) {
        return { valid: false, error: `Parse error: ${error.message}` };
    }
}

// Parse CSV line handling quoted fields
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let insideQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];

        if (char === '"') {
            if (insideQuotes && nextChar === '"') {
                current += '"';
                i++;
            } else {
                insideQuotes = !insideQuotes;
            }
        } else if (char === ',' && !insideQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }

    result.push(current.trim());
    return result;
}

// Show import modal with file preview
function openImportModal() {
    const modal = document.getElementById('importExportModal');
    if (modal) {
        modal.classList.add('active');
        document.getElementById('importExportTabs').innerHTML = `
            <div class="import-export-tabs">
                <button class="tab-btn active" data-tab="export">📤 Export</button>
                <button class="tab-btn" data-tab="import">📥 Import</button>
                <button class="tab-btn" data-tab="backup">💾 Backup & Restore</button>
            </div>
        `;
        setupImportExportUI();
    }
}

// Setup import/export UI
function setupImportExportUI() {
    const exportCSVBtn = document.getElementById('exportCSVBtn');
    const exportJSONBtn = document.getElementById('exportJSONBtn');
    const importFileInput = document.getElementById('importFile');
    const importBtn = document.getElementById('importBtn');
    const backupBtn = document.getElementById('backupBtn');
    const restoreBtn = document.getElementById('restoreBtn');

    if (exportCSVBtn) exportCSVBtn.addEventListener('click', exportToCSV);
    if (exportJSONBtn) exportJSONBtn.addEventListener('click', exportToJSON);
    if (importBtn) importBtn.addEventListener('click', handleImport);
    if (backupBtn) backupBtn.addEventListener('click', createBackup);
    if (restoreBtn) restoreBtn.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => handleRestore(e.target.files[0]);
        input.click();
    });
}

// Handle import process
function handleImport() {
    const fileInput = document.getElementById('importFile');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file to import');
        return;
    }

    const format = file.name.endsWith('.csv') ? 'csv' : 'json';
    const reader = new FileReader();

    reader.onload = (e) => {
        const content = e.target.result;
        const validation = validateImportData(content, format);

        if (!validation.valid) {
            alert('Import failed: ' + validation.error);
            return;
        }

        // Show conflict resolution dialog
        const conflictResolution = document.getElementById('conflictResolution').value;
        importData(validation.papers, conflictResolution);

        alert(`Successfully imported ${validation.papers.length} papers!`);
        document.getElementById('importExportModal').classList.remove('active');
        renderContent();
        renderDashboard();
    };

    reader.readAsText(file);
}

// Resolve import conflicts and store data
function importData(papers, strategy) {
    let conflictCount = 0;

    papers.forEach(paper => {
        const existing = getPaperData(paper.subject, paper.year, paper.period, paper.paper);

        // Check for conflict
        if (existing.score !== null) {
            conflictCount++;

            if (strategy === 'skip') return;
            if (strategy === 'merge' && existing.score !== null) return; // Keep existing
        }

        // Import the data
        if (paper.score !== null && paper.score !== undefined) {
            savePaperData(
                paper.subject,
                paper.year,
                paper.period,
                paper.paper,
                paper.score,
                paper.max || defaultMaxMarks[paper.subject][paper.paper - 1],
                paper.difficulty
            );

            // Save notes if present
            if (paper.notes) {
                const notesKey = getStorageKey(paper.subject, paper.year, paper.period, paper.paper, 'notes');
                localStorage.setItem(notesKey, paper.notes);
            }
        }
    });

    if (conflictCount > 0) {
        console.log(`Import: ${conflictCount} conflicts handled with strategy: ${strategy}`);
    }
}

// Handle restore from backup
function handleRestore(file) {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const backup = JSON.parse(e.target.result);

            if (!backup.backup || !Array.isArray(backup.papers)) {
                alert('Invalid backup file format');
                return;
            }

            if (!confirm(`This will restore ${backup.papers.length} papers. Your current data will be overwritten. Continue?`)) {
                return;
            }

            // Clear existing data
            const sessions = sessionsBySubject[currentSubject];
            const paperCount = papersBySubject[currentSubject];
            sessions.forEach(session => {
                for (let paper = 1; paper <= paperCount; paper++) {
                    ['score', 'max', 'difficulty', 'notes'].forEach(field => {
                        localStorage.removeItem(getStorageKey(currentSubject, session.year, session.period, paper, field));
                    });
                }
            });

            // Import backup data
            importData(backup.papers, 'overwrite');

            // Restore theme if present
            if (backup.theme) {
                Object.entries(backup.theme).forEach(([key, value]) => {
                    document.documentElement.style.setProperty(`--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`, value);
                });
            }

            // Restore dark mode
            if (backup.darkMode !== undefined) {
                if (backup.darkMode) {
                    document.body.classList.add('dark-mode');
                } else {
                    document.body.classList.remove('dark-mode');
                }
                localStorage.setItem('darkMode', backup.darkMode);
            }

            alert('Backup restored successfully!');
            location.reload();
        } catch (error) {
            alert('Failed to restore backup: ' + error.message);
        }
    };

    reader.readAsText(file);
}

// Close import modal
function closeImportExportModal() {
    const modal = document.getElementById('importExportModal');
    if (modal) {
        modal.classList.remove('active');
    }
}
