<script>
    export let label = "Ask a promt";
    export let color = "#242424";
    export let HideSvg = false;
</script>

<div class="input_wrap">
    <input style="background-color: {color};" type="text" required />
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label>{label}</label>
    <svg class:display={HideSvg} class=input_icon xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 41.621 41.621">
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
    left: 17rem; /* Position the SVG to the right */
    transform: translateY(-50%);
    pointer-events: none; /* Ensure the SVG does not interfere with input interactions */
}

  .input_wrap {
      width: auto;
      height: auto;
      position: relative;
  }

  .input_wrap input {
      width: 20rem;
      padding: 14px;
      font-size: 16px;
      border-radius: 10px;
      border: none;
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
      color: #B0B0B0;
      padding: 0 5px;
  }

  input:focus + label,
  input:valid + label {
      font-size: 12px;
      top: -5px;
      left: 10px;
      color: #E0E0E0;
      padding: 0 5px;
  }

  input[type="text"]:focus {
      outline: none;
  }

</style>