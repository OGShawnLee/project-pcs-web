<script>
	import GUIRegisterOrganizationModal from "@gui/GUIRegisterOrganizationModal.svelte";

	export let data;
</script>

<svelte:head>
	<title>Registrar Organización - ProTrack</title>
</svelte:head>

<GUIRegisterOrganizationModal data={data.form} />