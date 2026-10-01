/* ==========================================================================
   Karthik Shell v1.0 - Recruiter CLI Terminal Emulator
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const terminalScreen = document.getElementById('terminal-screen');
  const terminalInput = document.getElementById('terminal-input');
  const chipBtns = document.querySelectorAll('.chip-btn');

  if (!terminalInput || !terminalScreen) return;

  const commandHistory = [];
  let historyIdx = -1;

  const commands = {
    'help': () => `
<div class="terminal-output-line highlight">Available Terminal Commands:</div>
<div>  <span class="command">skills</span>     - Technical stack & proficiency breakdown</div>
<div>  <span class="command">projects</span>   - Detailed breakdown of key engineering projects</div>
<div>  <span class="command">education</span>  - Academic background & CGPA stats</div>
<div>  <span class="command">certs</span>      - Verified industry certifications (Oracle, Springboard)</div>
<div>  <span class="command">contact</span>    - Direct contact & profile links</div>
<div>  <span class="command">hire</span>       - Executive summary on why to hire Karthik</div>
<div>  <span class="command">clear</span>      - Clear terminal screen</div>
`,
    'skills': () => `
<div class="terminal-output-line success">=== TECHNICAL SKILLS MATRIX ===</div>
<div>  ⚡ <span class="highlight">Languages:</span>      Python (Advanced), JavaScript (ES6+), Java, C++</div>
<div>  🎨 <span class="highlight">Frontend:</span>       React, HTML5, CSS3, Modern UI/UX, Responsive Architecture</div>
<div>  ⚙️ <span class="highlight">Backend & DB:</span>   Flask, Django, MySQL, Database Design, REST APIs</div>
<div>  🧠 <span class="highlight">AI & Data:</span>      NumPy, Pandas, Matplotlib, Scikit-Learn, TensorFlow</div>
`,
    'projects': () => `
<div class="terminal-output-line success">=== FEATURED PROJECTS ===</div>
<div>1. <span class="highlight">Raksha - AI Emergency Road Safety Platform</span></div>
<div>   • Instant SOS alerts, real-time geolocation tracking & emergency routing</div>
<div>   • Stack: Python, Flask, AI Mapping, MySQL</div>
<div>2. <span class="highlight">Amazon Clone</span></div>
<div>   • Full-stack e-commerce web app with cart management & product listings</div>
<div>   • Stack: React, Flask, MySQL, REST API</div>
<div>3. <span class="highlight">Data Science & ML Pipeline Demos</span></div>
<div>   • Predictive data modeling and statistical visualization suite</div>
<div>   • Stack: NumPy, Pandas, Scikit-Learn, Matplotlib</div>
`,
    'education': () => `
<div class="terminal-output-line success">=== ACADEMIC BACKGROUND ===</div>
<div>🎓 <span class="highlight">B.Tech in Artificial Intelligence & Machine Learning</span></div>
<div>   Marwadi University, Rajkot, Gujarat (2024 - 2028 | 5th Semester)</div>
<div>   ⭐ <span class="success">CGPA: 8.85</span></div>
<div>🏫 <span class="highlight">Class 12 Intermediate</span> | Narayana Junior College (2024) - <span class="success">94.6%</span></div>
<div>🏫 <span class="highlight">SSC Class 10</span> | Wisdom High School (2022) - <span class="success">GPA: 8.7</span></div>
`,
    'certs': () => `
<div class="terminal-output-line success">=== VERIFIED CERTIFICATIONS ===</div>
<div>📜 <span class="highlight">Oracle Certified:</span> Database Management Systems (DBMS) & Java Programming</div>
<div>📜 <span class="highlight">Springboard Certified:</span> HTML, CSS, JavaScript Frontend Engineering</div>
`,
    'contact': () => `
<div class="terminal-output-line success">=== DIRECT CONTACT INFO ===</div>
<div>📧 Email:    <a href="mailto:karthikreguri14@gmail.com" style="color:#38bdf8">karthikreguri14@gmail.com</a></div>
<div>📞 Phone:    +91-8019177683</div>
<div>🔗 LinkedIn: <a href="https://linkedin.com/in/karthik-reguri-010983330" target="_blank" style="color:#38bdf8">karthik-reguri-010983330</a></div>
<div>💻 GitHub:   <a href="https://github.com/karthikreguri14-commits" target="_blank" style="color:#38bdf8">karthikreguri14-commits</a></div>
`,
    'hire': () => `
<div class="terminal-output-line highlight">=== WHY HIRE REGURI KARTHIKCHANDH? ===</div>
<div>1. Strong blend of Python Full-Stack & Machine Learning / Data Science core.</div>
<div>2. High academic discipline (CGPA 8.85 in AI/ML, 94.6% Intermediate).</div>
<div>3. Practical impact experience: Built real-world systems like emergency safety platforms & full-stack web apps.</div>
<div>4. Adaptable, detail-oriented, & ready to deliver clean production code from day one.</div>
`,
    'clear': () => {
      terminalScreen.innerHTML = '<div class="terminal-output-line system">Terminal reset. Type <span class="command">help</span> for commands.</div>';
      return null;
    }
  };

  function executeCommand(cmdStr) {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    // Append user input line
    const userLine = document.createElement('div');
    userLine.className = 'terminal-output-line';
    userLine.innerHTML = `<span class="terminal-prompt">recruiter@karthik-shell:~$</span> <span class="command">${trimmed}</span>`;
    terminalScreen.appendChild(userLine);

    if (commands[trimmed]) {
      const output = commands[trimmed]();
      if (output) {
        const outDiv = document.createElement('div');
        outDiv.innerHTML = output;
        terminalScreen.appendChild(outDiv);
      }
    } else {
      const errDiv = document.createElement('div');
      errDiv.className = 'terminal-output-line system';
      errDiv.innerHTML = `Command not found: '${trimmed}'. Type <span class="command">help</span> for valid commands.`;
      terminalScreen.appendChild(errDiv);
    }

    terminalScreen.scrollTop = terminalScreen.scrollHeight;
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = terminalInput.value;
      if (val.trim()) {
        commandHistory.push(val);
        historyIdx = commandHistory.length;
        executeCommand(val);
        terminalInput.value = '';
      }
    } else if (e.key === 'ArrowUp') {
      if (historyIdx > 0) {
        historyIdx--;
        terminalInput.value = commandHistory[historyIdx];
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIdx < commandHistory.length - 1) {
        historyIdx++;
        terminalInput.value = commandHistory[historyIdx];
      } else {
        historyIdx = commandHistory.length;
        terminalInput.value = '';
      }
    }
  });

  chipBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      if (cmd) {
        executeCommand(cmd);
      }
    });
  });
});
