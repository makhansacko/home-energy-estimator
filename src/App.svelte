<script>
  import Ampoule from "./components/Ampoule.svelte";
  import Refrigerateur from "./components/Refrigerateur.svelte";
  import Ventilateur from "./components/Ventilateur.svelte";
  import TV from "./components/TV.svelte";
  import Climatiseur from "./components/Climatiseur.svelte";
  import Humidificateur from "./components/Humidificateur.svelte";
  import MicroOnde from "./components/Micro-onde.svelte";
  import TotalConsumption from "./components/totalConsumption.svelte"; 

  function scrollToMainView() {
    document.getElementById('main-view').scrollIntoView();
  }

</script>
<!-- <div class="landing-page">
  <h1>Calculateur de consommation électrique</h1>
  <p>Calculer la consommation électrique de vos appareils électroménagers en specifiant le nombre d'unités
    et le nombre d'heures d'utilisation par jour.
  </p>
  <button on:click={scrollToMainView}>Calculer</button>
</div> -->
<main id="main-view">
  <h2>Estimez vos besoins energétiques journaliers</h2>
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
.landing-page{
  display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
}
  h1 {
    font-size: 2em;
    color: #333;
  }
  h2 {
    font-size:1.5em;
    color: #0a466b;
  }
  p {
    font-size: 1.2em;
    color: #333;
}
  
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1em;
  }
  
  .sidebar {
  height: 100%;
  width: 100px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  padding-top: 16px;
}

.sidebar a {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 18px;
  color: #818181;
  display: block;
}

.sidebar a:hover {
  color: #f1f1f1;
}

@media screen and (max-height: 450px) {
  .sidebar {padding-top: 15px;}
  .sidebar a {font-size: 18px;}
}
</style>