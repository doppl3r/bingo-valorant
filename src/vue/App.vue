<script setup>
  import '../scss/styles.scss';
  import { Game } from '../js/Game.js';
  import { ref, onMounted } from 'vue';

  // Initialize game
  var version = ref('');
  var game = window.game = new Game();
  var background = ref({ loaded: false, url: '' });
  var card = ref({ key: 0, options: [] });
  var popup = ref({ active: false, options: [] })

  function loadOptions() {
    // Update refs from game values
    background.value.url = './img/' + game.getRandomBackground();
    background.value.loaded = false;
    card.value.options = game.getNewOptions();
    card.value.key++; // Force Vue refresh
    popup.value.options = game.getAllOptions();
  }

  function updateBackgroundStatus(e) {
    background.value.loaded = true;
  }

  onMounted(async function() {
    const response = await fetch("./manifest.json");
    const manifest = await response.json();
    version.value = 'v' + manifest.version;
    loadOptions();
	});

</script>

<template>
  <div class="background">
    <img :src="background.url" v-show="background.loaded" v-on:load="updateBackgroundStatus" />
  </div>
  <nav>
    <ul>
      <li class="logo">
        <div>
          <div class="title">
            Valorant Bingo <span class="version">{{ version }}</span>
          </div>
          <span><a href="https://dopplercreative.com" target="_blank">By Doppler Creative</a></span>
        </div>
      </li>
      <li class="options">
        <a class="popup-button" @click="popup.active = !popup.active">View options</a>
      </li>
      <li class="generate">
        <a class="button" @click="loadOptions">Generate new card</a>
      </li>
    </ul>
  </nav>
  <div class="card" :key="card.key">
    <label v-for="(option, index) of card.options" class="box" :style="{ animationDelay: (index * 25) + 'ms' }">
      <input type="checkbox" :checked="option == 'Freebie'">
      <span>{{ option }}</span>
    </label>
  </div>
  <div class="popup" :class="{ active: popup.active == true }">
    <div class="popup-background popup-close" @click="popup.active = !popup.active"></div>
    <div class="content">
      <h2>Card Options</h2>
      <ol class="list">
        <li v-for="(option, index) of popup.options" class="box">
          {{ option }}
        </li>
      </ol>
    </div>
  </div>
</template>