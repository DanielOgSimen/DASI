<script>
    import '/src/styles/global.css';
</script>

<div class="imgOneClick">
    <img src="" alt="">
    <div class="OneClickText">
        <div class="input_wrap">
            <input type="text" required />
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label>Your Name</label>
        </div>
    </div>
</div>

<style>
    .input_wrap {
        margin-top: 20rem;
        width: auto;
        height: auto;
        position: relative;
    }

    .input_wrap input {
        width: 100%;
        padding: 14px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 4px;
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
        background: #ffffff;
        padding: 0 5px;
    }

    input:focus + label,
    input:valid + label {
        font-size: 12px;
        top: -5px;
        left: 10px;
        background: #ffffff;
        padding: 0 5px;
    }

    input[type="text"]:focus {
        outline: none;
    }
</style>