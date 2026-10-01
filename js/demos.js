/* ==========================================================================
   Project Interactive Live Demos Simulation
   Reguri Karthikchandh Portfolio
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initRakshaDemo();
  initAmazonDemo();
  initMLChartDemo();
});

/* --------------------------------------------------------------------------
   1. Raksha - AI Emergency Road Safety Platform Simulator
   -------------------------------------------------------------------------- */
function initRakshaDemo() {
  const rakshaModalBtn = document.getElementById('open-raksha-demo');
  const rakshaModal = document.getElementById('raksha-modal');
  if (!rakshaModalBtn || !rakshaModal) return;

  rakshaModalBtn.addEventListener('click', () => {
    rakshaModal.classList.add('active');
  });

  const sosBtn = document.getElementById('trigger-sos-sim');
  const statusLog = document.getElementById('raksha-status-log');
  const mapCoords = document.getElementById('raksha-coords');

  if (!sosBtn) return;

  let sosActive = false;

  sosBtn.addEventListener('click', () => {
    if (sosActive) return;
    sosActive = true;
    sosBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Dispatching Emergency SOS...`;
    sosBtn.style.background = '#ef4444';

    statusLog.innerHTML = `
      <div style="color: #ef4444; font-weight: bold;">🚨 [CRITICAL ALERT] Emergency SOS Triggered!</div>
      <div style="color: #38bdf8;">📍 Fetching real-time GPS position...</div>
    `;

    setTimeout(() => {
      mapCoords.textContent = "Lat: 22.3039° N, Long: 70.8022° E (Rajkot, GJ)";
      statusLog.innerHTML += `
        <div style="color: #34d399;">✅ GPS Acquired: 22.3039° N, 70.8022° E</div>
        <div style="color: #fbbf24;">⚡ AI Incident Classifier: Traffic Collision Detected (Confidence: 96.8%)</div>
        <div style="color: #a78bfa;">📡 Transmitting broadcast to nearest Ambulance & Traffic Patrol unit...</div>
      `;
    }, 1200);

    setTimeout(() => {
      statusLog.innerHTML += `
        <div style="color: #10b981; font-weight: bold; font-size: 1.05rem;">🟢 EMERGENCY RESPONDERS DISPATCHED! Estimated Arrival: 3.4 mins</div>
      `;
      sosBtn.innerHTML = `<i class="fa-solid fa-check-circle"></i> SOS Dispatched (Reset Sim)`;
      sosBtn.style.background = '#10b981';
      
      setTimeout(() => {
        sosActive = false;
        sosBtn.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Simulate Instant Emergency SOS`;
        sosBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
      }, 5000);
    }, 2800);
  });
}

/* --------------------------------------------------------------------------
   2. Amazon Clone Shopping Cart Simulator
   -------------------------------------------------------------------------- */
function initAmazonDemo() {
  const amazonModalBtn = document.getElementById('open-amazon-demo');
  const amazonModal = document.getElementById('amazon-modal');
  if (!amazonModalBtn || !amazonModal) return;

  amazonModalBtn.addEventListener('click', () => {
    amazonModal.classList.add('active');
  });

  const cartCountEl = document.getElementById('amazon-cart-count');
  const cartTotalEl = document.getElementById('amazon-cart-total');
  const addBtns = document.querySelectorAll('.amazon-add-btn');

  let cartCount = 0;
  let cartTotal = 0;

  addBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const price = parseFloat(btn.getAttribute('data-price'));
      cartCount++;
      cartTotal += price;

      cartCountEl.textContent = cartCount;
      cartTotalEl.textContent = `$${cartTotal.toFixed(2)}`;

      btn.innerHTML = `<i class="fa-solid fa-check"></i> Added!`;
      btn.style.background = '#10b981';

      setTimeout(() => {
        btn.innerHTML = `<i class="fa-solid fa-cart-plus"></i> Add to Cart`;
        btn.style.background = '';
      }, 1500);
    });
  });
}

/* --------------------------------------------------------------------------
   3. Data Science & ML Chart Visualizer Demo
   -------------------------------------------------------------------------- */
function initMLChartDemo() {
  const mlModalBtn = document.getElementById('open-ml-demo');
  const mlModal = document.getElementById('ml-modal');
  if (!mlModalBtn || !mlModal) return;

  let chartInstance = null;

  mlModalBtn.addEventListener('click', () => {
    mlModal.classList.add('active');
    setTimeout(renderChart, 100);
  });

  function renderChart() {
    const ctx = document.getElementById('ml-accuracy-chart');
    if (!ctx) return;

    if (chartInstance) {
      chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Logistic Regression', 'Random Forest', 'SVM', 'Decision Tree', 'Neural Network'],
        datasets: [{
          label: 'Model Accuracy (%)',
          data: [84.2, 94.8, 89.5, 81.0, 96.2],
          backgroundColor: [
            'rgba(139, 92, 246, 0.7)',
            'rgba(6, 182, 212, 0.7)',
            'rgba(16, 185, 129, 0.7)',
            'rgba(245, 158, 11, 0.7)',
            'rgba(236, 72, 153, 0.7)'
          ],
          borderColor: [
            '#8b5cf6',
            '#06b6d4',
            '#10b981',
            '#f59e0b',
            '#ec4899'
          ],
          borderWidth: 2,
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: '#94a3b8', font: { family: 'Plus Jakarta Sans' } } },
          tooltip: {
            callbacks: {
              label: (context) => ` Accuracy: ${context.parsed.y}%`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { color: '#94a3b8' }
          },
          x: {
            grid: { display: false },
            ticks: { color: '#94a3b8' }
          }
        }
      }
    });
  }
}
