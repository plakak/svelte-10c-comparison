<style lang="scss">
  $bg-color: #575cba;

  :global(input.invalid.dirty) {
    background-color: rgba(lightcoral, 0.4) !important;
  }

  .card {
    height: 100%;
    background-color: $bg-color;
    border-radius: 2rem;
    padding: 2rem 3rem;
    color: #fcfcff;

    .header {
      height: 6rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title {
        font-size: 1.8rem;
        font-weight: 600;
      }

      img {
        border-radius: 0.5rem;
      }
    }

    .type-selector {
      margin-top: 1rem;

      .card-title {
        font-size: 1rem;
        margin-bottom: 0.5rem;
      }
      .cards-list {
        display: flex;
        justify-content: space-between;
      }
    }
    .container {
      display: flex;
      height: calc(100% - 15rem);
      flex-direction: column;
      justify-content: space-between;

      .paypal-info {
        margin-top: 10rem;
        text-align: center;
      }

      .totals {
        margin-top: auto;
        margin-bottom: 2rem;
        border-top: 1px solid lighten($bg-color, 6%);
        font-size: 1.4rem;

        .amount {
          font-weight: 600;
        }

        > div {
          display: flex;
          justify-content: space-between;
          &:first-child {
            margin-top: 3rem;
          }
          &:not(:last-child) {
            margin-bottom: 1.5rem;
          }
        }
      }
    }

    .checkout-button {
      $button-color: #4ee0c1;
      background-color: $button-color;
      border: none;
      outline: none;
      height: 5.5rem;
      border-radius: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: white;
      font-size: 1.4rem;
      padding: 2rem;
      cursor: pointer;

      &:disabled {
        background-color: lightgray;
      }

      &:hover {
        background-color: darken($button-color, 10%);
      }

      .total {
        font-weight: 600;
        letter-spacing: 1px;
      }

      .text {
        display: flex;

        .checkout-icon {
          width: 2rem;
          height: 2rem;
          margin-left: 1rem;
          transform: rotate(180deg);
        }
      }
    }
  }
</style>

<script lang="ts">
  import { afterUpdate } from 'svelte';
  import { form } from 'svelte-forms';

  import arrow from '../assets/images/arrow-left.svg';
  import { price } from '../store/basket.js';
  import CardPlate from './CardPlate.svelte';
  import CardFrom from './CardFrom.svelte';

  enum CardType {
    Mastercard,
    Visa,
    AmericanExpress,
    Paypal
  }

  const cards: { type: CardType; image: string }[] = [
    { type: CardType.Mastercard, image: 'card-mc.png' },
    { type: CardType.Visa, image: 'card-visa.png' },
    { type: CardType.AmericanExpress, image: 'card-ae.png' },
    { type: CardType.Paypal, image: 'paypal.png' }
  ];

  let selectedCard = CardType.Mastercard;
  let validated = false;

  const selectCardHandler = (type: CardType) => {
    selectedCard = type;
  };

  $: totalWithShipping = Number($price) + 20;

  let name = '';
  let cardNum = '';
  let expDate = '';
  let cvv = '';

  const numberValidator = value => ({
    valid: /^[0-9]*$/.test(value),
    name: 'number'
  });

  const expValidator = value => ({
    valid: /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/.test(value),
    name: 'exp'
  });

  let cardForm = form(
    () => ({
      name: { value: name, validators: ['required'] },
      cardNum: { value: cardNum, validators: ['required', numberValidator] },
      expDate: { value: expDate, validators: ['required', expValidator] },
      cvv: { value: cvv, validators: ['required', numberValidator] }
    }),
    {
      validateOnChange: false
    }
  );

  afterUpdate(() => {
    if (validated) {
      cardForm.validate();
    }
  });

  function submitHandler() {
    cardForm.validate();
    validated = true;
  }
</script>

<div class="card">
  <div class="header">
    <div class="title">Card Details</div>
    <img src="assets/photo.png" />
  </div>

  <div class="type-selector">
    <div class="card-title">Card type</div>
    <div class="cards-list">
      {#each cards as card (card.type)}
        <CardPlate
          src={`assets/${card.image}`}
          selected={card.type === selectedCard}
          on:click={() => selectCardHandler(card.type)}
        />
      {/each}
    </div>
  </div>

  <div class="container">
    {#if selectedCard === CardType.Paypal}
      <div class="paypal-info">
        You will be redirected to the paypal checkout in the next step
      </div>
    {:else}
      <CardFrom {cardForm} bind:cvv bind:name bind:cardNum bind:expDate />
    {/if}
    <div class="totals">
      <div>
        <span>Subtotal</span>
        <span class="amount">${$price}</span>
      </div>
      <div>
        <span>Shipping</span> <span class="amount">$20</span>
      </div>
      <div>
        <span>Total</span> <span class="amount">${totalWithShipping}</span>
      </div>
    </div>

    <button class="checkout-button" on:click={submitHandler} disabled={!$price}>
      <div class="total">
        {#if $price > 0}
          <span>${totalWithShipping}</span>
        {/if}
      </div>
      <div class="text">
        Checkout
        <div class="checkout-icon">{@html arrow}</div>
      </div>
    </button>
  </div>
</div>
