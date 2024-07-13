<script>
  import { totalConsumption } from './store.js';
  import Modal from './Modal.svelte';
  let recommendationContent = '';
  let showModal = false;

  function getRecommendation() {
      const consumptionMin = $totalConsumption.min;
      const consumptionMax = $totalConsumption.max;

      console.log('Getting recommendations...');
      console.log('Total Consumption Min:', consumptionMin);
      console.log('Total Consumption Max:', consumptionMax);

      // Calculating Battery Capacity
      const batteryMin = Math.ceil(consumptionMin / 5) * 5; // kWh, rounding up to the nearest 5
      const batteryMax = Math.ceil(consumptionMax / 5) * 5; // kWh, rounding up to the nearest 5

      // Calculating Inverter Size
      const inverterMin = Math.ceil(consumptionMin / 4); // kW
      const inverterMax = Math.ceil(consumptionMax / 4); // kW

      // Calculating Solar Panel Array (assuming 5 peak sun hours per day)
      const solarPanelMin = Math.ceil(consumptionMin / 5); // kW
      const solarPanelMax = Math.ceil(consumptionMax / 5); // kW

      // Number of Panels (assuming each panel is 300W)
      const panelWattage = 300;
      const numPanelsMin = Math.ceil((solarPanelMin * 1000) / panelWattage);
      const numPanelsMax = Math.ceil((solarPanelMax * 1000) / panelWattage);

      recommendationContent = `
          Capacité de la batterie: ${batteryMin} - ${batteryMax} kWh\n
          Taille du convertisseur: ${inverterMin} - ${inverterMax} kW\n
          Puissance des panneaux solaires: ${solarPanelMin} - ${solarPanelMax} kW\n
          Nombre de panneaux: ${numPanelsMin} - ${numPanelsMax}
      `;

      console.log('Recommendation Content:', recommendationContent);
      showModal = true;
  }

  function closeModal() {
      showModal = false;
  }
</script>

<div class="totalConso">
  <h2>Consommation Journalière</h2>
  <img src="/images/solar.svg" alt="solar panel icon" class="solar-icon"/>
  <p>{$totalConsumption.min} - {$totalConsumption.max} kWh</p>

  <button on:click={getRecommendation}>Recevoir recommendation d'un système solaire</button>

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

  .recommendation {
      margin-top: 1em;
      text-align: left;
      white-space: pre-wrap;
      background: #f9f9f9;
      border: 1px solid #ddd;
      padding: 1em;
      border-radius: 5px;
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
</style>
