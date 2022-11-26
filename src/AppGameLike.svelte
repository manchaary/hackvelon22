<script lang="ts">
  import "/node_modules/flag-icons/css/flag-icons.min.css";
  import "./app.scss";
  import { parse, format } from 'date-fns';
  import { getPrediction } from './api/client';
  import PredictionCard from "./components/PredictionCard/PredictionCard.svelte";
  import Mascot from './components/Mascot/Mascot.svelte';
  import { getCountryFlagCode } from './utils/getCountryFlagCode';
  const d = {
    "2022-11-20": [
      {
        "Date": "2022-11-20",
        "Time": "19:00:00",
        "Team_1": "Qatar",
        "Team_2": "Ecuador",
        "Score": "0:2",
        "winnerTeam": "Qatar",
        "probability": [
          0.40057951016496657,
          0.5994204898350335
        ]
      }
    ],
    "2022-11-21": [
      {
        "Date": "2022-11-21",
        "Time": "16:00:00",
        "Team_1": "England",
        "Team_2": "Iran",
        "Score": "6:2",
        "winnerTeam": "England",
        "probability": [
          0.5995235034676869,
          0.4004764965323131
        ]
      },
      {
        "Date": "2022-11-21",
        "Time": "22:00:00",
        "Team_1": "United States",
        "Team_2": "Wales",
        "Score": "1:1",
        "winnerTeam": "United States",
        "probability": [
          0.49439575031852245,
          0.5056042496814775
        ]
      }
    ],
    "2022-11-25": [
      {
        "Date": "2022-11-25",
        "Time": "13:00:00",
        "Team_1": "Wales",
        "Team_2": "Iran",
        "Score": "0:2",
        "winnerTeam": "Wales",
        "probability": [
          0.5351567084447584,
          0.46484329155524157
        ]
      },
      {
        "Date": "2022-11-25",
        "Time": "22:00:00",
        "Team_1": "England",
        "Team_2": "United States",
        "Score": null,
        "winnerTeam": null,
        "probability": 0
      }
    ],
  }
  const dateFormat = "yyyy-MM-dd";
  let teamA = null;
  let teamB = null;
  let stadium = null;
  let matchDate = null;
  let winnerTeam: string | null = null;
  let prediction = null;
  let isLoading = false;
  const dates = Object.keys(d).sort((a, b) => {
    const dateA = parse(a, dateFormat, new Date());
    const dateB = parse(b, dateFormat, new Date());
    return dateB.getTime() - dateA.getTime();
  });
  const getPrediciton = async () => {
    isLoading = true;
    prediction = await getPrediction(`${teamA},${teamB}`);
    winnerTeam = prediction[0].team1Name;
    isLoading = false;
  };
  const setTeams = (team1, team2) => {
    teamA = team1;
    teamB = team2;
    prediction = null;
  }
</script>

<main class="main">
  <!-- <div class="space">
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
    <div class="mascot">
      <img src="/static/images/Freddie.png" alt="mascot waving" />
    </div>
  </div> -->
  <div class="grid">
    {#each dates as date}
      <div class="grid-item">
        <div>{format(parse(date, dateFormat, new Date()), 'eee, MMM d')}</div>
        <div class="grid-item-matches">
          {#each d[date] as item}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="match-item" on:click={() => setTeams(item.Team_1, item.Team_2)}>
              <div class="scorelist-item" style="--winPercent: {item.probability[0]}">
                <div class="scorelist-item-country">
                  <span class="fi fi-{getCountryFlagCode(item.Team_1)}"></span>
                  {item.Team_1}
                </div>
              </div>
              <div class="scorelist-item" style="--winPercent: {item.probability[1]}">
                <div class="scorelist-item-country">
                  <span class="fi fi-{getCountryFlagCode(item.Team_2)}"></span>
                  {item.Team_2}
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</main>

<style lang="scss">
  @import "./colors.scss";
  main {
    width: 100%;
  }
  .select-text {
    width: 100%;
    text-align: center;
    text-transform: uppercase;
  }
  .match-item {
    border: 1px solid $primary;
    border-radius: 10px;
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
    max-width: 520px;
    margin: 0 auto;
    &-item {
      margin-bottom: 15px;
      gap: 5px;
      display: flex;
      flex-direction: column;
      &-matches {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .match-item {
          flex-basis: 50%;
          box-sizing: border-box;
          transition: all .4s ease;
          cursor: pointer;
          &:hover {
            background-color: $secondary;
          }
          &:active {
            background-color: $primary;
          }
          &:not(:last-child) {
            border-right: 0;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
          &:not(:first-child) {
            border-left: 0;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }
          .scorelist-item {
            position: relative;
            &:after {
              content: " ";
              background-color: red;
              display: block;
              height: 20px;
              width: calc(50% * 1);
              position: absolute;
              right: 0;
              z-index: 1;
            }
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

</style>