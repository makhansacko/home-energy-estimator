<script>
    import { totalConsumption } from './store.js';
    import Modal from './Modal.svelte';
    let recommendationContent = '';
    let showModal = false;
    let peakSunHours = 5; // Default value
    let panelWattage = 300; // Default value
  
    function getRecommendation() {
        const consumptionMin = Math.round($totalConsumption.min);
        const consumptionMax = Math.round($totalConsumption.max);
  
        // Calculating Battery Capacity
        const batteryMin = Math.ceil(consumptionMin / 5) * 5; // kWh, rounding up to the nearest 5
        const batteryMax = Math.ceil(consumptionMax / 5) * 5; // kWh, rounding up to the nearest 5
  
        // Calculating Inverter Size
        const inverterMin = Math.ceil(consumptionMin / 4); // kW
        const inverterMax = Math.ceil(consumptionMax / 4); // kW
  
        // Calculating Solar Panel Array
        const solarPanelMin = Math.ceil(consumptionMin / peakSunHours); // kW
        const solarPanelMax = Math.ceil(consumptionMax / peakSunHours); // kW
  
        // Number of Panels (based on user input wattage)
        const numPanelsMin = Math.ceil((solarPanelMin * 1000) / panelWattage);
        const numPanelsMax = Math.ceil((solarPanelMax * 1000) / panelWattage);
  
        recommendationContent = `
    Capacité de la batterie: ${batteryMin} - ${batteryMax} kWh\n
    Taille du convertisseur: ${inverterMin} - ${inverterMax} kW\n
    Puissance des panneaux solaires: ${solarPanelMin} - ${solarPanelMax} kW\n
    Nombre de panneaux: ${numPanelsMin} - ${numPanelsMax} (basé sur ${panelWattage}W par panneau)
        `;
  
        showModal = true;
    }
  
    function closeModal() {
        showModal = false;
    }
  </script>
  
  <div class="totalConso">
    <h2>Consommation Journalière</h2>
    <img src="/images/solar.svg" alt="solar panel icon" class="solar-icon"/>
    <p>{Math.round($totalConsumption.min)} - {Math.round($totalConsumption.max)} kWh</p>
  
    <div class="input-container">
      <label for="peak-sun-hours">Nombre d'heures de soleil par jour:</label>
      <input type="number" id="peak-sun-hours" bind:value={peakSunHours} min="1" max="24" step="1" />
    </div>
    
    <div class="input-container">
      <label for="panel-wattage">Puissance des panneaux solaires (W):</label>
      <input type="number" id="panel-wattage" bind:value={panelWattage} min="100" max="1000" step="50"/>
    </div>
  
    <button on:click={getRecommendation}>Recevoir recommandation d'un système solaire</button>
  
    {#if showModal}
    <Modal {showModal} on:close={closeModal} close={closeModal}>
      <div class="modal-content">
        <h2>Recommendations Système Solaire</h2>
        <pre>{recommendationContent}</pre>
        <button on:click={closeModal}>Fermer</button>
      </div>
    </Modal>
    {/if}
  </div>
  
  <style>
    .totalConso {
      color: #0a466b;
      border: 1px solid grey;
      padding: 1em;
      border-radius: 5px;
      text-align: center;
    }
  
    .solar-icon {
      width: 55px;
    }
  
    .input-container {
      margin: 1em 0;
      text-align: left;
      max-width: 300px; /* Set a max-width for narrower input containers */
      margin-left: auto;
      margin-right: auto;
    }
  
    label {
      display: block;
      margin-bottom: 0.5em;
    }
  
    input {
      width: 100%;
      padding: 0.5em;
      font-size: 1em;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
  
    button {
      padding: .375rem .75rem;
      font-size: 1rem;
      color: #fff;
      background-color: #0a466b;
      border: none;
      border-radius: .25rem;
      cursor: pointer;
      transition: background-color .15s ease-in-out;
    }
  
    button:hover {
      background-color: #cea282;
    }
  
    p {
      margin: 1em 0;
    }
  
    .modal-content {
      background: white;
      padding: 2em;
      border-radius: 10px;
      text-align: left;
    }
  
    .modal-content h2 {
      margin-top: 0;
    }
  
    .modal-content button {
      margin-top: 1em;
      padding: .375rem .75rem;
      font-size: 1rem;
      color: #fff;
      background-color: #0a466b;
      border: none;
      border-radius: .25rem;
      cursor: pointer;
      transition: background-color .15s ease-in-out;
    }
  
    .modal-content button:hover {
      background-color: #cea282;
    }
  
    /* Responsive adjustments */
    @media (max-width: 768px) {
      .modal-content {
        padding: 1.5em;
      }
    }
  
    @media (max-width: 480px) {
      .modal-content {
        padding: 1em;
      }
    }
  
    @media (max-width: 430px) {
      .modal-content {
        padding: 0.5em;
      }
    }
  </style>
  