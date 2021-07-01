<style lang="scss">
  @import '../styles/variables';

  .hr {
    border-bottom: 1px solid gray;
    opacity: 0.2;
    margin: 1rem auto;
  }

  .back-button {
    display: flex;
    align-items: center;
    font-weight: 600;
    color: $text-color;
    cursor: pointer;

    .icon {
      width: 2rem;
      height: 2rem;
      margin-right: 1rem;
    }
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 3rem;
    color: $text-color;

    .title {
      font-weight: 700;
      letter-spacing: 0.2px;
    }

    .cart-information {
      font-size: 1.3rem;
      margin-top: 0.5rem;
      font-weight: 500;
    }

    .sorting {
      font-size: 1.3rem;
      cursor: pointer;
    }
  }

  main {
    margin-top: 4rem;
  }
</style>

<script lang="ts">
  import { slide } from 'svelte/transition';
  import { sineOut } from 'svelte/easing';

  import ArrowLeft from '../assets/images/arrow-left.svg';
  import {
    items,
    deleteBasketItem,
    updateBasketItemCount
  } from '../store/basket';
  import BasketItem from './BasketItem.svelte';
  import { resetBasket } from '../store/basket';

  let sortByPrice = false;

  function onDelete(event: CustomEvent<{ id: number }>) {
    deleteBasketItem(event.detail.id);
  }

  function onUpdateCount(event: CustomEvent<{ id: number; count: number }>) {
    updateBasketItemCount(event.detail);
  }

  $: sortedItems = sortByPrice
    ? [...$items].sort((a, b) => (a.price > b.price ? -1 : 1))
    : $items;
</script>

<div>
  <div class="back-button" on:click={resetBasket}>
    <div class="icon">{@html ArrowLeft}</div>
    <div class="text">Continue Shopping</div>
  </div>

  <div class="hr" />

  <header>
    <div class="description">
      <div class="title">Shopping Cart</div>
      <div class="cart-information">
        You have {$items && $items.length} in your cart
      </div>
    </div>
    <div class="sorting" on:click={() => (sortByPrice = !sortByPrice)}>
      Sort by: Price
    </div>
  </header>

  <main>
    {#each sortedItems as basketItem (basketItem.name)}
      <div transition:slide|local={{ easing: sineOut }}>
        <BasketItem
          {...basketItem}
          on:delete={onDelete}
          on:updateCount={onUpdateCount}
        />
      </div>
    {/each}
  </main>
</div>
