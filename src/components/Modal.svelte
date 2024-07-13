<script>
    export let showModal = false;
    export let close;

    function handleClose() {
        close();
    }
</script>

{#if showModal}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="modal-overlay" on:click={handleClose}>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="modal-content" on:click|stopPropagation>
            <button class="close-button" on:click={handleClose}>×</button>
            <slot></slot>
        </div>
    </div>
{/if}

<style>
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .modal-content {
        background: white;
        padding: 2em;
        border-radius: 10px;
        max-width: 90%;
        max-height: 90%;
        overflow-y: auto;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
        .modal-content {
            padding: 1.5em; /* Adjust padding for smaller screens */
        }
    }

    @media (max-width: 480px) {
        .modal-content {
            padding: 1em; /* Adjust padding for very small screens */
        }
    }

    @media (max-width: 430px) {
        .modal-content {
            padding: 0.5em; /* Minimize padding for very narrow screens */
        }
    }
</style>
