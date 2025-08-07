<script lang="ts">
    let { src, size = 24, ...rest }  = $props();
</script>

<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...rest}>
    {@html src}
</svg>

<style>
    .icon :global(svg) {
        width: 100%;
        height: 100%;
        fill: currentColor;
        stroke: currentColor;
        stroke-width: 0;
    }
</style>