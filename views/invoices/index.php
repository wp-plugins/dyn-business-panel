<?php wp_enqueue_style( 'dbp-printer' );
$invoice_table = new dbp_invoices();
$invoice_table->prepare_items();

dbp_header(array(
	'new-text'	=> 'Nueva factura'
	));?>
	<ul class="subsubsub">
		<li class="all"><a href="<?php echo admin_url("admin.php?page=dbp_invoices")?>"<?php echo ($_REQUEST["post_status"] == "") ? " class=\"current\"" : ""?>>Todos <span class="count"></span></a> |</li>
		<li class="publish"><a href="<?php echo admin_url("admin.php?page=dbp_invoices&post_status=paid")?>"<?php echo ($_REQUEST["post_status"] == "paid") ? " class=\"current\"" : ""?>>Pagadas <span class="count"></span></a> |</li>
		<li class="trash"><a href="<?php echo admin_url("admin.php?page=dbp_invoices&post_status=unpaid")?>"<?php echo ($_REQUEST["post_status"] == "unpaid") ? " class=\"current\"" : ""?>>Pendientes <span class="count"></span></a> |</li>
		<li class="pending"><a href="<?php echo admin_url("admin.php?page=dbp_invoices&post_status=unpaiable")?>"<?php echo ($_REQUEST["post_status"] == "unpaiable") ? " class=\"current\"" : ""?>>Incobrables <span class="count"></span></a></li>
	</ul>
	<form method="get">
		<?php $invoice_table->search_box( "Buscar factura", "dbp_search_invoice" );?>
		<input type="hidden" name="page" value="<?php echo $_REQUEST['page'] ?>" />
		<?php $invoice_table->display() ?>
	</form>
</div>