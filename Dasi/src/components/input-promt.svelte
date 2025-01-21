<script lang="ts">
    import { goto } from '$app/navigation';
  interface Props {
    label?: string;
    color?: string;
    HideSvg?: boolean;
    height?: string;
    Width?: string;
    external?: boolean;
    onEnter: () => void; // Tar inn en funksjon som kjøres når man trykker enter
  }

  let {
    label = "Ask a promt",
    color = "var(--secondary-border-divider)",
    HideSvg = false,
    height = "3rem",
    Width = "20rem",
    external = false,
    onEnter
  }: Props = $props();

    let inputElement: HTMLInputElement = $state();

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
    <input bind:this={inputElement} style="background-color: {color}; height: {height}; width:{Width};" type="text" id="input" required onkeydown={handleKeyDown} />
    <!-- svelte-ignore a11y_label_has_associated_control -->
    <label>{label}</label>
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <svg class:display={HideSvg} class=input_icon xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 41.621 41.621" onclick={onEnter}>
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