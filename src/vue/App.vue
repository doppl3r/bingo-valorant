<script setup>
  import '../scss/style.scss';
  import { Game } from '../js/Game.js';
  import { ref } from 'vue';

  // Initialize game
  var game = window.game = new Game();
  var background = ref('');
  var options = ref([]);
  var popup = ref({
    active: false,
    options: []
  })

  function loadOptions() {
    // Update refs from game values
    background.value = game.getRandomBackground();
    options.value = game.getNewOptions()
    popup.value.options = game.getAllOptions();
  }

  loadOptions();
</script>

<template>
  <div class="background" :style="{ 'background-image': 'url(/img/' + background + ')' }">
    <nav>
      <ul>
        <li class="logo"><span>Valorant Bingo<a href="https://dopplercreative.com" target="_blank">By Doppler Creative</a></span></li>
        <li><a class="popup-button" @click="popup.active = !popup.active">View options</a></li>
        <li><a class="button" @click="loadOptions">Generate new card</a></li>
      </ul>
    </nav>
    <div class="card">
      <label v-for="(option, index) of options" class="box">
        <input type="checkbox" :checked="option == 'Freebie'">
        <span>{{ option }}</span>
      </label>
    </div>
    <div class="popup" v-if="popup.active == true">
      <div class="popup-background popup-close" @click="popup.active = !popup.active"></div>
      <ul class="list">
        <li v-for="(option, index) of popup.options" class="box">
          {{ option }}
        </li>
      </ul>
    </div>
  </div>
</template>