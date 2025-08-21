<script lang="ts">
    import * as Icons from '@pixy/svelte';

    const icons = Object.values(Icons);
</script>

<svelte:head>
	<title>Pixy – Open-source stunning icons collection</title>
</svelte:head>

<div class="border-x border-gray-200 mx-auto max-w-7xl h-69">
    <div>defe</div>
    <div class="min-h-screen --[calc(100dvh-9rem)] text-6xl tracking-tight font-medium flex items-center justify-center px-5 md:px-10">
        Coming soon
    </div>
    <div class="grid grid-cols-12 divide-x divide-y divide-gray-200">
        {#each icons as IconComponent}
            <a class="p-1" href="#">
                <div class="p-2 flex items-center justify-center rounded hover:bg-gray-100 transition duration-75">
                    <IconComponent class="stroke-1 stroke-gray-700 size-10" />
                </div>
            </a>
        {/each}
    </div>
</div>