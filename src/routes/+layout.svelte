<script>
  import "virtual:uno.css";
  import "@unocss/reset/tailwind.css";
</script>

<slot />

<style>
  :global(body) {
    --uno: "font-general bg-black text-neutral-300";
  }
</style>