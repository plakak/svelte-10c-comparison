<style lang="scss">
  :global {
    @import 'styles/normalize';
  }

  :global(html) {
    font-size: 62.5%;
  }

  :global(body) {
    font-size: 1.6rem;
    background: #f1f3f4;
    font-family: 'Open Sans', sans-serif;
  }
  main {
    background-color: #fefefe;
    width: 110rem;
    height: 77rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 4rem;

    .container {
      .basket {
        flex: 1.5;
        padding-right: 1rem;
      }

      .card {
        flex: 1;
        padding-left: 1rem;
      }

      display: flex;
      padding: 4rem;
      height: 100%;
    }
  }
</style>

<script lang="ts">
  import Basket from './components/Basket.svelte';
  import Card from './components/Card.svelte';
</script>

<svelte:head>
  <style>
    @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,500,600,700&display=swap');
  </style>
</svelte:head>

<main>
  <div class="container">
    <div class="basket">
      <Basket />
    </div>
    <div class="card">
      <Card />
    </div>
  </div>
</main>
