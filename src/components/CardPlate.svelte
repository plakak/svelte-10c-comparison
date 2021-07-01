<style lang="scss">
  .card-plate {
    cursor: pointer;
    width: 8rem;
    height: 6rem;
    border: 1px solid gray;
    border-radius: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    img {
      width: 45%;
    }

    &.selected {
      border-color: white;
    }

    .checkmark {
      top: 0;
      right: 0.5rem;
      position: absolute;
      width: 1.2rem;
      height: 1.2rem;
    }
  }
</style>

<script type="ts">
  import check from '../assets/images/check.svg';
  export let src: string;
  export let selected = false;
</script>

<div class="card-plate" class:selected on:click>
  {#if selected}
    <div class="checkmark">
      {@html check}
    </div>
  {/if}
  <img {src} />
</div>
