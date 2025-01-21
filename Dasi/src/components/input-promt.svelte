<script lang="ts">
    import { goto } from '$app/navigation';
    export let label = "Ask a promt";
    export let color = "var(--secondary-border-divider)";
    export let HideSvg = false;
    export let height = "3rem";
    export let Width = "20rem";
    export let external = false;
    export let onEnter: () => void; // Tar inn en funksjon som kjøres når man trykker enter

    let inputElement: HTMLInputElement;

    export function getPrompt() {
        return inputElement.value;
    }
    // Funksjonen som sjekker om man trykker enter
    async function handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            onEnter();
            if (external) {
                await goto(`/chat?message=${encodeURIComponent(inputElement.value)}`);
            }
            inputElement.value = "";
        }
    }
</script>

<div class="input_wrap">
    <input bind:this={inputElement} style="background-color: {color}; height: {height}; width:{Width};" type="text" id="input" required on:keydown={handleKeyDown} />
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label>{label}</label>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <svg class:display={HideSvg} class=input_icon xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 41.621 41.621" on:click={onEnter}>
        <path id="Icon_feather-send" data-name="Icon feather-send" d="M41,3,20.1,23.9M41,3,27.7,41,20.1,23.9,3,16.3Z" transform="translate(-1.5 -0.879)" fill="none" stroke="#00b8d4" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
      </svg>    
</div>

<style>
    .display {
        display: none;
    }

    .input_wrap .input_icon {
    position: absolute;
    top: 50%;
    float: right; 
    right: 15px;
    transform: translateY(-50%);
    pointer-events: none; /* Ensure the SVG does not interfere with input interactions */
    cursor: pointer; /* Add cursor pointer to indicate it's clickable */
}

  .input_wrap {
      width: auto;
      height: auto;
      position: relative;
  }

  .input_wrap input {
      padding: 14px 50px 14px 14px;
      font-size: 16px;
      border-radius: 10px;
      border: none;
      color: var(--secondary-text);
  }

  .input_wrap label {
      font-family: arial;
      font-size: 16px;
      position: absolute;
      top: 50%;
      left: 14px;
      transform: translateY(-50%);
      transition: 0.2s ease all;
      pointer-events: none;
      color: var(--secondary-text);
      padding: 0 5px;
  }

  input:focus + label,
  input:valid + label {
      font-size: 12px;
      top: -5px;
      left: 10px;
      color: var(--primary-text);
      padding: 0 5px;
  }

  input[type="text"]:focus {
      outline: none;
  }

</style>