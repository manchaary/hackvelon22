<script lang="ts">
  import "/node_modules/flag-icons/css/flag-icons.min.css";
  import "./app.scss";
  import { parse, format, isToday } from 'date-fns';
  import Carousel from 'svelte-carousel'

  import { getMatches, getPrediction, getTeams } from './api/client';
  import PredictionCard from "./components/PredictionCard/PredictionCard.svelte";
  import Mascot from './components/Mascot/Mascot.svelte';
  import { getCountryFlagCode } from './utils/getCountryFlagCode';

  const dateFormat = "yyyy-MM-dd";
  let matches = getMatches();
  let teamA = null;
  let teamB = null;
  let stadium = null;
  let matchDate = null;
  let winnerTeam: string | null = null;
  let prediction = null;
  let isLoading = false;
  let dataPromise = getMatches();

  const getDates = (data) => {
    const dates = Object.keys(data).sort((a, b) => {
      const dateA = parse(a, dateFormat, new Date());
      const dateB = parse(b, dateFormat, new Date());
      return dateA.getTime() - dateB.getTime();
    });
    const todayIndex = dates.findIndex((value) => value === format(new Date(), 'yyyy-MM-dd'));
    const end = todayIndex + 7;
    const start = todayIndex - 2;
    return dates.slice(start, end);
  }

  const getPrediciton = async () => {
    isLoading = true;
    prediction = await getPrediction(`${teamA},${teamB}`);
    const { team1Prediction, team2Prediction, team1Name, team2Name } = prediction[0];
    winnerTeam = team1Prediction > team2Prediction ? team1Name : team2Name;
    isLoading = false;
  };
  const setTeams = (team1, team2) => {
    teamA = team1;
    teamB = team2;
    prediction = null;
    winnerTeam = null;
  }
</script>

<main>
  <div class="text-bubble">
    {#if !teamA && !teamB}
      <div class="select-text">Select Match to Predict a winner</div>
    {/if}
    <PredictionCard
      homeTeam={teamA}
      visitorTeam={teamB}
      matchDate={matchDate}
      stadium={stadium}
      prediction={prediction?.[0]}
      onPredict={getPrediciton}
    />
  </div>
  <Mascot winnerCountry={winnerTeam} isLoading={isLoading} />
  {#await dataPromise}
    <div class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  {:then data}
  <div class="grid">
    <Carousel initialPageIndex={2}>
        {#each getDates(data) as date}
          <div class="grid-item">
            <div>{format(parse(date, dateFormat, new Date()), 'eee, MMM d')}</div>
            <div class="grid-item-matches">
              {#each data[date] as item}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class="match-item" on:click={() => setTeams(item.Team_1, item.Team_2)}>
                  <div>
                    <div class="scorelist-item">
                      <div>
                        <span class="fi fi-{getCountryFlagCode(item.Team_1)}"></span>
                        {item.Team_1}
                      </div>
                    </div>
                    <div class="scorelist-item">
                      <span class="fi fi-{getCountryFlagCode(item.Team_2)}"></span>
                      {item.Team_2}
                    </div>
                  </div>
                  {#if item.Score}
                    <div class="match-score">{item.Score}</div>
                  {/if}
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </Carousel>
    </div>
  {/await}
</main>

<style lang="scss">
  @import "./colors.scss";

  main {
    max-width: 520px;
    margin: 0 auto;
  }
  .select-text {
    width: 100%;
    text-align: center;
    text-transform: uppercase;
  }
  .scorelist-item {
    gap: 10px;
    display: flex;
    padding: 10px;
  }
  .main {
    padding: 20px;
  }
  .space {
    position: relative;
    max-width: 520px;
    margin: 0 auto;
  }
  .mascot {
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    height: 100%;
    bottom: -20px;
    position: relative;
    img {
      width: 40%;
      animation: float 5s ease-in-out infinite;
    }
  }
  .text-bubble {
    background-color: #fff;
    border-radius: 10px;
    border: 1px solid $primary;
    padding: 20px;
    min-height: 215px;
    box-sizing: border-box;
    align-items: center;
    display: flex;
  }
  .grid {
    &-item {
      margin-bottom: 15px;
      gap: 5px;
      display: flex;
      flex-direction: column;
      &-matches {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        border: 1px solid $primary;
        border-radius: 10px;
        .match-score {
          padding-right: 10px;
        }
        .match-item {
          flex-basis: 50%;
          box-sizing: border-box;
          transition: all .4s ease;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          display: flex;
          &:hover {
            background-color: $secondary;
          }
          &:active {
            background-color: $primary;
          }
          &:nth-child(n + 3) {
            border-top: 1px solid $primary;
          }
          &:nth-child(odd) {
            border-right: 1px solid $primary;
          }
        }
      }
    }
  }
  @keyframes float {
    0% {
      transform: translatey(0px);
    }
    50% {
      transform: translatey(-20px);
    }
    100% {
      transform: translatey(0px);
    }
  }
  @keyframes float2 {
    0% {
      line-height: 30px;
      transform: translatey(0px);
    }
    55% {
      transform: translatey(-20px);
    }
    60% {
      line-height: 10px;
    }
    100% {
      line-height: 30px;
      transform: translatey(0px);
    }
  }
.lds-grid {
  margin-top: 40px;
  display: block;
  margin: 0 auto;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-grid div {
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: $primary;
  animation: lds-grid 1.2s linear infinite;
}
.lds-grid div:nth-child(1) {
  top: 8px;
  left: 8px;
  animation-delay: 0s;
}
.lds-grid div:nth-child(2) {
  top: 8px;
  left: 32px;
  animation-delay: -0.4s;
}
.lds-grid div:nth-child(3) {
  top: 8px;
  left: 56px;
  animation-delay: -0.8s;
}
.lds-grid div:nth-child(4) {
  top: 32px;
  left: 8px;
  animation-delay: -0.4s;
}
.lds-grid div:nth-child(5) {
  top: 32px;
  left: 32px;
  animation-delay: -0.8s;
}
.lds-grid div:nth-child(6) {
  top: 32px;
  left: 56px;
  animation-delay: -1.2s;
}
.lds-grid div:nth-child(7) {
  top: 56px;
  left: 8px;
  animation-delay: -0.8s;
}
.lds-grid div:nth-child(8) {
  top: 56px;
  left: 32px;
  animation-delay: -1.2s;
}
.lds-grid div:nth-child(9) {
  top: 56px;
  left: 56px;
  animation-delay: -1.6s;
}
@keyframes lds-grid {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}


</style>