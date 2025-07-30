<script lang="ts">
    let {  } : SVGElement = $props();
</script>

<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    class={classes}
    {...rest}
>
    <path d={path} />
</svg>