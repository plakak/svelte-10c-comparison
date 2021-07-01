<style lang="scss">
  .card-form {
    margin-top: 2rem;

    .form-input {
      margin-top: 1.5rem;

      input {
        background-color: #6368c6;
        width: 100%;
        border: none;
        outline: none;
        color: #eaeaea;
        font-size: 1rem;
        padding: 1.2rem;
        border-radius: 0.5rem;
      }

      label {
        font-size: 1rem;
        margin-bottom: 0.6rem;
        color: #eaeaea;
      }
    }

    .horizontal {
      display: flex;
      width: 100%;
      > * {
        width: 100%;
      }

      > *:first-of-type {
        margin-right: 2rem;
      }
    }
  }
</style>

<script lang="ts">
  import { bindClass } from 'svelte-forms';

  export let cardForm;
  export let name;
  export let cardNum;
  export let expDate;
  export let cvv;
</script>

<form class="card-form">
  <div class="form-input">
    <label>Name on Card</label>
    <input
      type="text"
      name="name"
      bind:value={name}
      use:bindClass={{ form: cardForm }}
    />
  </div>
  <div class="form-input">
    <label>Card Number</label>
    <input
      type="text"
      name="cardNum"
      bind:value={cardNum}
      use:bindClass={{ form: cardForm }}
    />
  </div>
  <div class="horizontal">
    <div class="form-input">
      <label>Expiration date</label>
      <input
        type="text"
        name="expDate"
        bind:value={expDate}
        use:bindClass={{ form: cardForm }}
      />
    </div>
    <div class="form-input">
      <label>CVV</label>
      <input
        type="text"
        name="cvv"
        bind:value={cvv}
        use:bindClass={{ form: cardForm }}
      />
    </div>
  </div>
</form>
