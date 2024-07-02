import { writable } from 'svelte/store';

export const totalConsumption = writable({
  min: 0,
  max: 0
});