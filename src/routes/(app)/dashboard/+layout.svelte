<script lang="ts">
	import GUIDashboardLayout from '@gui/GUIDashboardLayout.svelte';

	export let data;
</script>

<GUIDashboardLayout currentUser={data.currentUser}>
	<slot />
</GUIDashboardLayout>
