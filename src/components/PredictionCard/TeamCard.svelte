<script lang="ts">
  import { getCountryFlagCode } from '../../utils/getCountryFlagCode';
  export let team: string;
</script>
<div class="team-card">
  <div>{team}</div>
  <div class="country-flag fib fi-{getCountryFlagCode(team)}"></div>
</div>
<style lang="scss">
  .team-card {
    width: 120px;
    text-align: center;
    .country-flag {
      height: 120px;
    }
  }
</style>