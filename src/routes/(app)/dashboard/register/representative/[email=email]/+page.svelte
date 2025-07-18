<script>
	import GUIRegisterRepresentativeModal from '@gui/GUIRegisterRepresentativeModal.svelte';

	export let data;
</script>

<svelte:head>
	<title>Registrar Representante - ProTrack</title>
</svelte:head>

<GUIRegisterRepresentativeModal data={data.form} organization={data.organization} />
