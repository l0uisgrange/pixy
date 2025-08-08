<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";
    import type { Snippet } from "svelte";

    let { children, ...rest } : { children: Snippet } & Partial<Omit<HTMLAttributes<SVGElement>, "class"> & { class: string; }> = $props();
</script>

<svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" {...rest} fill="none">
    {@render children()}
</svg>

<style>
    svg * {
        stroke: inherit;
    }
</style>