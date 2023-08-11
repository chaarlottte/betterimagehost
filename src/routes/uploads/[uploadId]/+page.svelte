<script lang="ts">
    export let data: any;
</script>

<div style="text-align:center">
    <img src={data.imageUrl} />
    <p>Original file name: {data.uploadData.originalFilename}</p>
    <p>Uploaded by <strong>{data.uploadData.expand.uploader.name}</strong></p>
</div>
