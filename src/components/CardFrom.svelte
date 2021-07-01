<style lang="scss">
  .horizontal {
    display: flex;
    width: 100%;

    :global(*) {
      width: 100%;
    }

    :global(*:first-of-type) {
      margin-right: 2rem;
    }
  }

  .card-form {
    margin-top: 2rem;
  }
</style>

<script lang="ts">
  import { bindClass } from 'svelte-forms';
  import FormItem from './FormItem.svelte';

  export let cardForm;
  export let name;
  export let cardNum;
  export let expDate;
  export let cvv;

  $: isRequired = (field, validator) =>
    $cardForm.fields[field].errors.includes(validator) &&
    $cardForm.fields[field].dirty;
</script>

<form class="card-form">
  <FormItem
    label="Name on Card"
    name="name"
    validators={['required']}
    form={cardForm}
    bind:value={name}
  />
  <FormItem
    label="Card Number"
    name="cardNum"
    validators={['required', 'number']}
    form={cardForm}
    bind:value={cardNum}
  />
  <div class="horizontal">
    <FormItem
      label="Expiration date"
      name="expDate"
      validators={['required', 'exp']}
      form={cardForm}
      bind:value={expDate}
    />
    <FormItem
      label="CVV"
      name="cvv"
      validators={['required', 'number']}
      form={cardForm}
      bind:value={cvv}
    />
  </div>
</form>
