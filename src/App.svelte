<script>
  import Ampoule from "./components/Ampoule.svelte";
  import Refrigerateur from "./components/Refrigerateur.svelte";
  import Ventilateur from "./components/Ventilateur.svelte";
  import TV from "./components/TV.svelte";
  import Climatiseur from "./components/Climatiseur.svelte";
  import Humidificateur from "./components/Humidificateur.svelte";
  import MicroOnde from "./components/Micro-onde.svelte";
  import TotalConsumption from "./components/TotalConsumption.svelte"; 

</script>
<!-- <div class="landing-page">
  <h1>Calculateur de consommation électrique</h1>
  <p>Calculer la consommation électrique de vos appareils électroménagers en specifiant le nombre d'unités
    et le nombre d'heures d'utilisation par jour.
  </p>
  <button on:click={scrollToMainView}>Calculer</button>
</div> -->
<main id="main-view">
  <h3>Estimez vos besoins energétiques journaliers et recevez des recommendations de système solaire</h3>
  <!--
  <div class="sidebar">
  <a href="#home"> Mesurer</a>
  <a href="#services">Groupes</a>
  <a href="#clients">Solaire</a>
  </div>-->
  <div class="grid">
    <Ampoule />
    <Refrigerateur />
    <Ventilateur />
    <TV />
    <Climatiseur />
    <Humidificateur />
    <MicroOnde />
    <TotalConsumption/>
  </div>
</main>

<style>

  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1em;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .grid {
      grid-template-columns: repeat(2, 1fr); /* Adjust grid for smaller screens */
      gap: 0.5em; /* Reduce gap */
    }
  }

  @media (max-width: 480px) {
    .grid {
      grid-template-columns: 1fr; /* Single column layout for very small screens */
      gap: 0.5em; /* Further reduce gap */
    }
    
  }

  @media (max-width: 430px) {
    .grid {
      gap: 0.25em; /* Minimize gap for very narrow screens */
    }

    /* Optionally, adjust component sizes or padding here if necessary */
  }
</style>