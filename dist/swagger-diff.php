<?php
	$document = DOMDocument::loadHTML("./index.php");
	$html = $document->saveXML();
?>
<script>
	doc = <?php echo json_encode($html); ?>;
	doc.getElementbyId("operations-tag-pet").innerHTML("<h1>toto</h1>");
</script>
