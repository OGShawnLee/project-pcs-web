<script>
	import GUIRegisterAcademicModal from "@gui/GUIRegisterAcademicModal.svelte";

	export let data;
</script>

<svelte:head>
	<title>Registrar Académico - ProTrack</title>
</svelte:head>

<GUIRegisterAcademicModal data={data.form} />