<script>
  import { totalConsumption } from './store.js';
  let showRecommendation = false;
  let recommendation = '';

  function getRecommendation() {
      const minKW = $totalConsumption.min / 24;
      const maxKW = $totalConsumption.max / 24;
      const powerFactor = 0.8;
      const minKVA = (minKW / powerFactor).toFixed(2);
      const maxKVA = (maxKW / powerFactor).toFixed(2);
      recommendation = `${minKVA} - ${maxKVA} KVA`;
      showRecommendation = true;
  }
</script>

<div class="totalConso">
  <h2>Total daily electricity consumption</h2>
  <img src="/images/generator.svg" alt="generator icon" class="generateur"/>
  <p>{$totalConsumption.min} - {$totalConsumption.max} kWh</p>

  <button on:click={getRecommendation}>Recevoir Recommendation</button>
  {#if showRecommendation}
      <p>{recommendation}</p>
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

  .generateur {
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
</style>
