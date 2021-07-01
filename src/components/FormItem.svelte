<style lang="scss">
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

    .error {
      font-size: 10px;
      color: lighten(tomato, 10%);
    }
  }
</style>

<script lang="ts">
  import { bindClass } from 'svelte-forms';

  type AvailableValidators = 'required' | 'num' | 'exp';

  export let label: string;
  export let name: string;
  export let form;
  export let value: string;
  export let validators: AvailableValidators[] = [];

  $: isInvalid = (field, validator) =>
    $form.fields[field].errors.includes(validator) && $form.fields[field].dirty;

  const validatorsLabels = {
    required: 'This field is required',
    number: 'This field has to be number',
    exp: 'Example: 12/2012'
  };
</script>

<div class="form-input">
  <label>{label}</label>
  <input type="text" {name} bind:value use:bindClass={{ form: form }} />
  {#each validators as validator}
    {#if isInvalid(name, validator)}
      <p class="error">{validatorsLabels[validator]}</p>
    {/if}
  {/each}
</div>
