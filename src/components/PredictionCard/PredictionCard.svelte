<script lang="ts">
  import { format } from 'date-fns';
  import PredictionBar from './PredictionBar.svelte';
  import TeamCard from './TeamCard.svelte';

  export let homeTeam: string;
  export let visitorTeam: string;
  export let matchDate: Date;
  export let stadium: string;
  export let prediction: any;
  export let onPredict: () => void;
</script>
{#if homeTeam && visitorTeam}
  <div class="prediction-card">
    <div class="prediction-body">
      <TeamCard team={homeTeam} />
      <div class="match-info">
        {#if matchDate}
          {format(matchDate, 'MMM d, hh:mma')}
        {/if}
        {#if stadium}
          <div>{stadium}</div>
        {/if}
      </div>
      <TeamCard team={visitorTeam} />
    </div>
    {#if prediction}
      <PredictionBar draw={0} teamA={Math.round(prediction.team1Prediction * 100)} teamB={Math.round(prediction.team2Prediction * 100)} />
    {:else}
      <button type="button" on:click={onPredict}>Predict match</button>
    {/if}
  </div>
{/if}
<style lang="scss">
  .prediction {
    &-card {
      // width: 480px;
      width: 100%;
      margin: auto;
      text-align: center;
      // padding: 20px;
      // box-shadow: 0px 4px 20px rgb(0 37 77 / 8%);
      // border-radius: 4px;
    }
    &-body {
      display: flex;
      justify-content: space-between;
      .match-info {
        gap: 6px;
        margin: auto;
        display: flex;
        flex-direction: column;
      }
    }
  }
</style>
