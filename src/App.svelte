<script lang="ts">
  import "/node_modules/flag-icons/css/flag-icons.min.css";
  import "./app.scss";
  import { parse, format } from 'date-fns';
  import { getMatches, getPrediction, getTeams } from './api/client';
  import PredictionCard from "./components/PredictionCard/PredictionCard.svelte";
  import Mascot from './components/Mascot/Mascot.svelte';
  import { getCountryFlagCode } from './utils/getCountryFlagCode';
  const d = {
    "2022-11-29": [
        {
            "Date": "2022-11-29",
            "Time": "22:00:00",
            "Team_1": "Wales",
            "Team_2": "England",
            "Score": null,
            "winnerTeam": null,
            "probability": 0
        },
        {
            "Date": "2022-11-29",
            "Time": "22:00:00",
            "Team_1": "Iran",
            "Team_2": "United States",
            "Score": null,
            "winnerTeam": null,
            "probability": 0
        }
    ],
    "2022-11-22": [
        {
            "Date": "2022-11-22",
            "Time": "16:00:00",
            "Team_1": "Denmark",
            "Team_2": "Tunisia",
            "Score": "0:0",
            "winnerTeam": "Draw",
            "probability": [
                0.6333990153340511,
                0.3666009846659489
            ]
        },
        {
            "Date": "2022-11-22",
            "Time": "22:00:00",
            "Team_1": "France",
            "Team_2": "Australia",
            "Score": "4:1",
            "winnerTeam": "France",
            "probability": [
                0.6499395282476277,
                0.3500604717523723
            ]
        }
    ],
    "2022-11-26": [
        {
            "Date": "2022-11-26",
            "Time": "13:00:00",
            "Team_1": "Tunisia",
            "Team_2": "Australia",
            "Score": null,
            "winnerTeam": null,
            "probability": 0
        },
        {
            "Date": "2022-11-26",
            "Time": "19:00:00",
            "Team_1": "France",
            "Team_2": "Denmark",
            "Score": null,
            "winnerTeam": null,
            "probability": 0
        }
    ],
    "2022-11-30": [
        {
            "Date": "2022-11-30",
            "Time": "18:00:00",
            "Team_1": "Australia",
            "Team_2": "Denmark",
            "Score": null,
            "winnerTeam": null,
            "probability": 0
        },
        {
            "Date": "2022-11-30",
            "Time": "18:00:00",
            "Team_1": "Tunisia",
            "Team_2": "France",
            "Score": null,
            "winnerTeam": null,
            "probability": 0
        }
    ],
    "2022-11-23": [
        {
            "Date": "2022-11-23",
            "Time": "13:00:00",
            "Team_1": "Morocco",
            "Team_2": "Croatia",
            "Score": "0:0",
            "winnerTeam": "Draw",
            "probability": [
                0.42008367935433066,
                0.5799163206456693
            ]
        },
        {
            "Date": "2022-11-23",
            "Time": "22:00:00",
            "Team_1": "Belgium",
            "Team_2": "Canada",
            "Score": "1:0",
            "winnerTeam": "Belgium",
            "probability": [
                0.6712735625796881,
                0.32872643742031193
            ]
        }
    ],
    "2022-11-27": [
        {
            "Date": "2022-11-27",
            "Time": "16:00:00",
            "Team_1": "Belgium",
            "Team_2": "Morocco",
            "Score": null,
            "winnerTeam": null,
            "probability": 0
        },
        {
            "Date": "2022-11-27",
            "Time": "19:00:00",
            "Team_1": "Croatia",
            "Team_2": "Canada",
            "Score": null,
            "winnerTeam": null,
            "probability": 0
        }
    ],
    "2022-11-24": [
        {
            "Date": "2022-11-24",
            "Time": "16:00:00",
            "Team_1": "Uruguay",
            "Team_2": "South Korea",
            "Score": "0:0",
            "winnerTeam": "Draw",
            "probability": [
                0.6030381854357063,
                0.3969618145642936
            ]
        },
        {
            "Date": "2022-11-24",
            "Time": "19:00:00",
            "Team_1": "Portugal",
            "Team_2": "Ghana",
            "Score": "3:2",
            "winnerTeam": "Portugal",
            "probability": [
                0.7137601990641673,
                0.28623980093583273
            ]
        }
    ],
    "2022-11-28": [
        {
            "Date": "2022-11-28",
            "Time": "16:00:00",
            "Team_1": "South Korea",
            "Team_2": "Ghana",
            "Score": null,
            "winnerTeam": null,
            "probability": 0
        },
        {
            "Date": "2022-11-28",
            "Time": "22:00:00",
            "Team_1": "Portugal",
            "Team_2": "Uruguay",
            "Score": null,
            "winnerTeam": null,
            "probability": 0
        }
    ]
}
  const dateFormat = "yyyy-MM-dd";
  let matches = getMatches();
  let teamA = null;
  let teamB = null;
  let stadium = null;
  let matchDate = null;
  let winnerTeam: string | null = null;
  let prediction = null;
  let isLoading = false;
  let dates = Object.keys(d).sort((a, b) => {
      const dateA = parse(a, dateFormat, new Date());
      const dateB = parse(b, dateFormat, new Date());
      return dateB.getTime() - dateA.getTime();
    });;
    
  let data = getMatches();
  const setData = async () => {
    console.log(data);
    dates = Object.keys(dates).sort((a, b) => {
      const dateA = parse(a, dateFormat, new Date());
      const dateB = parse(b, dateFormat, new Date());
      return dateB.getTime() - dateA.getTime();
    });
  }
  console.log(data);
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
  {#if dates}
    <div class="grid">
      {#each dates as date}
        <div class="grid-item">
          <div>{format(parse(date, dateFormat, new Date()), 'eee, MMM d')}</div>
          <div class="grid-item-matches">
            {#each d[date] as item}
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <div class="match-item" on:click={() => setTeams(item.Team_1, item.Team_2)}>
                <div class="scorelist-item">
                  <span class="fi fi-{getCountryFlagCode(item.Team_1)}"></span>
                  {item.Team_1}
                </div>
                <div class="scorelist-item">
                  <span class="fi fi-{getCountryFlagCode(item.Team_2)}"></span>
                  {item.Team_2}
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  {/if}
</main>

<style lang="scss">
  @import "./colors.scss";
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