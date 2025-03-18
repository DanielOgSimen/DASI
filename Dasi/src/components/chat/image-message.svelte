<script>
    import ImageLoader from "./image-loader.svelte";
    let { url = "https://easimages.basnop.com/default-image_600.png", alt = "Image not found", width, height, loading = true } = $props();

</script>
<div class="body">
    {#if loading}
        <ImageLoader />
        loading...
    {:else}
        <div class="imageContainer">
            <img src={url} alt={alt} width={width} height={height} />
        </div>
        done
    {/if}
</div>