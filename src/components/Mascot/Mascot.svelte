<script lang="ts">
  import { getCountryFlagCode } from '../../utils/getCountryFlagCode';
  export let isLoading: boolean = false;
  export let winnerCountry: string;

  function generateRandomInteger(min, max) {
    return Math.floor(min + Math.random()*(max - min + 1))
  }
  const imageBase = import.meta.env.VITE_IMAGE_BASE_URL;
  const imageSrc = [
    "static/images/mascot/Vadim_ball_happy.png",
    "static/images/mascot/Vadim_ball_cheering.png",
  ];
  let predictedImage = `${imageBase}${imageSrc[generateRandomInteger(0,1)]}`;
</script>

<div class="mascot">
  <div class="mascot-body">
    <div class="mascot-bubble">
      {#if winnerCountry}
        <div class="country-flag fi fi-{getCountryFlagCode(winnerCountry)}"></div>
        <span class="mascot-bubble-text predicted">Will be a winner!</span>
      {:else if isLoading}
        <span class="mascot-bubble-text loading">Wait for it...</span>
      {:else}
        <span class="mascot-bubble-text">Let's predict a winner!</span>
      {/if}
      <img class="mascot-bubble-img" src={`${imageBase}static/images/mascot/Buble.png`} alt="Mascot" />
    </div>
    {#if winnerCountry && !isLoading}
      <img class="mascot-img predicted" src={predictedImage} alt="Mascot" />
    {:else}
      <img class="mascot-img" src={`${imageBase}static/images/mascot/Vadim_ball.png`} alt="Mascot" />
    {/if}
  </div>
</div>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Crafty+Girls&display=swap');

  .mascot {
    display: flex;
    justify-content: center;
    &-body {
      position: relative;
    }
    &-bubble {
      font-family: 'Crafty Girls', cursive;
      width: 200px;
      position: absolute;
      .country-flag {
        z-index: 2;
        position: relative;
        top: 30px;
        left: 40px;
        border: 1px solid #f6f6f6;
        font-size: 48px;
      }
      &-text {
        z-index: 2;
        position: relative;
        font-weight: bold;
        width: 80%;
        display: block;
        top: 43px;
        left: 34px;
        &.predicted {
          top: 30px;
          left: 40px;
        }
        &.loading {
          top: 58px;
          left: 50px;
        }
      }
      &-img {
        z-index: 1;
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
      }
    }
    &-img {
      width: 320px;
      margin-left: 120px;
    }
  }
</style>
