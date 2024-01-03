<script setup>
  import '../scss/style.scss';
  import { Game } from '../js/Game.js';
  import { ref } from 'vue';

  // Initialize game
  var game = window.game = new Game();
  var background = ref('');
  var options = ref([]);

  // Update refs from game values
  background.value = game.getRandomBackground();
  options.value = game.getNewOptions()
</script>

<template>
  <div class="background" :style="{ 'background-image': 'url(/img/' + background + ')' }">
    <nav>
      <ul>
        <li class="logo"><span>Valorant Bingo<a href="https://dopplercreative.com" target="_blank">By Doppler Creative</a></span></li>
        <li><a href="#" class="popup-button">View options</a></li>
        <li><a href="." class="button">Generate new card</a></li>
      </ul>
    </nav>
    <div class="card">
      <label v-for="(option, index) of options" class="box">
        <input type="checkbox" :checked="index == 12">
        <span>{{ index != 12 ? option : 'Freebie' }}</span>
      </label>
    </div>
    <div class="popup" style="display: none;"></div>
  </div>
</template>