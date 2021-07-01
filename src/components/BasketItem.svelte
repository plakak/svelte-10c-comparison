<style lang="scss">
  @import '../styles/variables';

  .basket-item {
    border-radius: 2rem;
    background: #fff;
    box-shadow: 0 10px 20px 3px rgba(0, 0, 0, 0.1);
    min-height: 7rem;
    padding: 2rem;
    display: flex;
    align-items: center;

    .image {
      width: 6rem;
      height: 6rem;
      background: $brand-green;
      border-radius: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .description {
      flex: 3;
      margin-left: 1rem;

      .name {
        font-weight: 700;
      }

      .specs {
        margin-top: 0.5rem;
        word-spacing: 3px;
        letter-spacing: 0.3px;
        font-weight: 600;
        font-size: 1rem;
        color: lighten(gray, 20%);
      }
    }

    .counter {
      flex: 2;
      display: flex;
      align-items: center;

      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      .plus,
      .minus {
        width: 2rem;
        height: 2rem;
        cursor: pointer;

        &:hover {
          color: #575cba;
        }
      }

      input[type='number'] {
        -moz-appearance: textfield;
      }

      input {
        border-radius: 0.5rem;
        width: 3rem;
        margin: 0 1rem;
        text-align: center;
      }
    }

    .price {
      flex: 1;
      font-weight: 700;
    }

    .actions {
      flex: 0.5;

      &:hover {
        color: red;
        cursor: pointer;
      }

      > div {
        margin-left: auto;
        width: 2rem;
        height: 2rem;
      }
    }
  }
</style>

<script lang="ts">
  import plus from '../assets/images/plus.svg';
  import minus from '../assets/images/minus.svg';
  import trash from '../assets/images/trash-2.svg';
  import { createEventDispatcher } from 'svelte';

  export let id: number;
  export let name: string;
  export let description: string;
  export let photoUrl: string;
  export let count: number;
  export let price: number;

  $: totalPrice = price * count;

  const dispatch = createEventDispatcher();

  function removeItem() {
    dispatch('delete', { id });
  }

  const checkResult = (value: number): number => {
    if (value > 9) return 9;
    if (value < 1) return 1;
    return value;
  };

  function countChange(value: number | Event) {
    if (typeof value === 'number') {
      dispatch('updateCount', { id, count: checkResult(count + value) });
    } else {
      dispatch('updateCount', { id, count });
    }
  }

  function onInput(event: Event) {
    dispatch('updateCount', {
      id,
      count: checkResult(Number((<HTMLInputElement>event.target).value))
    });
  }
</script>

<div class="basket-item">
  <div class="image">
    <img alt="phone" src={photoUrl} />
  </div>
  <div class="description">
    <div class="name">{name}</div>
    <div class="specs">{description}</div>
  </div>

  <div class="counter">
    <div class="plus" on:click={() => countChange(1)}>{@html plus}</div>
    <input
      type="number"
      bind:value={count}
      on:change={countChange}
      on:input={onInput}
    />
    <div class="minus" on:click={() => countChange(-1)}>{@html minus}</div>
  </div>

  <div class="price">${totalPrice}</div>

  <div class="actions" on:click={removeItem}>
    <div>{@html trash}</div>
  </div>
</div>
