<script>
  import { spring } from 'svelte/motion';
import { totalConsumption } from './store.js';

  let units = 0;
  let startTime = 0;
  let endTime = 0;
  let hours = 0;
  const consumptionPerUnit = { min: 0.75, max: 1.5 };
  let consumption = { min: 0, max: 0 }; 
  let previousConsumption = { min: 0, max: 0 };
  const displayed_units = spring(0);
  

  $: displayed_units.set(units);

  $: combined = { units, hours };

  $: if (combined) {
      consumption.min = units * hours * consumptionPerUnit.min;
      consumption.max = units * hours * consumptionPerUnit.max;
      totalConsumption.update(total => {
        return {
          min: total.min - previousConsumption.min + consumption.min,
          max: total.max - previousConsumption.max + consumption.max
        };
      });
      previousConsumption = { ...consumption };
  }

  $: offset = modulo($displayed_units, 1);

  // Calculate hours only if endTime is greater than startTime
  $: hours = (endTime > startTime) ? endTime - startTime : 0;

  /**
   * @param {number} n
   * @param {number} m
   */
  function modulo(n, m) {
      // handle negative numbers
      return ((n % m) + m) % m;
  }

  function handleAddUnit() {
      units += 1;
      displayed_units.set(units);
  }

  function handleRemoveUnit() {
      if (units > 0) {
          units -= 1;
          displayed_units.set(units);
      }
  }
</script>

<div class="appliance">
 <h2>Micro-onde</h2>
   <img src="/images/microwave.svg"alt="microwave icon"/>
 <div class="counter">
   <button on:click={handleRemoveUnit} aria-label="Decrease the counter by one">
       <svg aria-hidden="true" viewBox="0 0 1 1">
           <path d="M0,0.5 L1,0.5" />
       </svg>
   </button>

   <div class="counter-viewport">
       <div class="counter-digits" style="transform: translate(0, {100 * offset}%)">
           <strong class="hidden" aria-hidden="true">{Math.floor($displayed_units + 1)}</strong>
           <strong>{Math.floor($displayed_units)}</strong>
       </div>
   </div>

   <button on:click={handleAddUnit} aria-label="Increase the counter by one">
       <svg aria-hidden="true" viewBox="0 0 1 1">
           <path d="M0,0.5 L1,0.5 M0.5,0 L0.5,1" />
       </svg>
   </button>
</div>
 
<div class="slider-container">
  <p>Nombre d'heures d'utilisation: {hours}h</p>
  <label for="start-time">Heure de début: {startTime}h</label>
  <input type="range" id="start-time" min="0" max="24" bind:value={startTime} />
  <label for="end-time">Heure de fin: {endTime}h</label>
  <input type="range" id="end-time" min="0" max="24" bind:value={endTime} />
</div>
</div>

<style>
 .appliance {
      color: #0a466b;
      transition: box-shadow 0s ease;
      border: 1px solid #000000;
      border-radius: 5px;
  }

  .appliance:hover {
    box-shadow: 0 0 5px rgb(0, 0, 0);
  }

  .counter {
		display: flex;
		border-top: 1px solid rgb(0, 0, 0);
		border-bottom: 1px solid rgb(0, 0, 0);
		margin: 1rem 0;
	}

	.counter button {
		width: 2em;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 0;
		background-color: transparent;
		touch-action: manipulation;
		font-size: 2rem;
    border-radius: 0;
	}

	.counter button:hover {
		background-color:#cea282;
	}

  .counter button:focus {
    outline: none;
}

	svg {
		width: 25%;
		height: 25%;
	}

	path {
		vector-effect: non-scaling-stroke;
		stroke-width: 2px;
		stroke: #000000;

;
	}

	.counter-viewport {
		width: 12em;
		height: 4em;
		overflow: hidden;
		text-align: center;
		position: relative;
	}

	.counter-viewport strong {
		position: absolute;
		display: flex;
		width: 100%;
		height: 100%;
		font-weight: 400;
		color: var(--color-theme-1);
		font-size: 3rem;
		align-items: center;
		justify-content: center;
	}

	.counter-digits {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.hidden {
		top: -100%;
		user-select: none;
	}

  .slider-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0;
  }

  .slider-container p {
    font-size: 1.2rem;
    color: #000000;
    margin-bottom: 10px;
  }

  .slider-container input[type="range"] {
    width: 75%;
    height: 15px;
    background: #0a466b;
    outline: none;
    -webkit-appearance: none;
    appearance: none;
  }

  .slider-container input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: #cea282
;
    cursor: pointer;
  }

  .slider-container input[type="range"]::-moz-range-thumb {
    width: 25px;
    height: 25px;
    background: #ffffff;
    cursor: pointer;
  }
</style>