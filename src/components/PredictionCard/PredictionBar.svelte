<script lang="ts">
  export let draw: number;
  export let teamA: number;
  export let teamB: number;
</script>
<div class="progress">
  <div class="progress-bar teamA" style="width: {teamA}%"><span>{`${teamA}% Win`}</span></div>
  {#if draw}
    <div class="progress-bar draw" style="width: {draw}%"><span>{`${draw}% Draw`}</span></div>
  {/if}
  <div class="progress-bar teamB" style="width: {teamB}%"><span>{`${teamB}% Win`}</span></div>
</div>
<style lang="scss">
  @import "../../colors.scss";

  .progress {
    width: 100%;
    height: 34px;
    border-radius: 4px;
    &-bar {
      float: left;
      height: 14px;
      & > span {
        line-height: 48px;
        white-space: nowrap;
      }
      &.teamA {
        text-align: left;
        background-color: $primary;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }
      &.draw {
        background-color: $dark;
      }
      &.teamB {
        text-align: right;
        background-color: $orange-light;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    }
  }
</style>