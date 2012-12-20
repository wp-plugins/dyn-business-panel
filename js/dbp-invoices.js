jQuery(function(){
	var dbp_view = jQuery("#dbp-invoice-insert-payment, #dbp-invoice-unpaiable");
	if(dbp_view.length > 0)
	{
		jQuery("#dbp-invoice-insert-payment, #dbp-invoice-unpaiable").hide();
		jQuery("#dbp_payment_date, #dbp_unpaiable_date").datepicker({ dateFormat: "yy-mm-dd", changeMonth: true });
		jQuery("a.add-payment-trigger, a.add-unpaiable-trigger").click(function(){ return false; });
		jQuery(".add-payment-trigger").click(function(){ jQuery("#dbp-invoice-insert-payment").slideToggle("slow"); });
		jQuery(".add-unpaiable-trigger").click(function(){ jQuery("#dbp-invoice-unpaiable").slideToggle("slow"); });
		jQuery("#dbp-payment-history-table tr:odd, #dbp-invoice-items-table tr:odd").addClass("tr-odd");
		jQuery(".left-blank").css({"background-color": "#fff", "border" : "none"});
		jQuery("#dbp-print-opener").click(function(){ window.print(); });
	}
	
	var accentMap = {
				"á": "a",
				"ö": "o"
			};
	var normalize = function( term ) {
		var ret = "";
		for ( var i = 0; i < term.length; i++ ) {
			ret += accentMap[ term.charAt(i) ] || term.charAt(i);
		}
		return ret;
	};
			
		jQuery("#client_username").autocomplete({
			source: function( request, response ) {
				var matcher = new RegExp( jQuery.ui.autocomplete.escapeRegex( request.term ), "i" );
				response( jQuery.grep( clients, function( value ) {
					value = value.label || value.value || value;
					return matcher.test( value ) || matcher.test( normalize( value ) );
				}) );
			},
			select: function(event, ui){
				jQuery("#client_id").val(ui.item.id);
				jQuery("#client_firstname").val(ui.item.first_name);
				jQuery("#client_lastname").val(ui.item.last_name);
				jQuery("#client_email").val(ui.item.email);
				jQuery("#client_address").val(ui.item.address);
				jQuery("#client_phone").val(ui.item.phone);
				jQuery("#client_company_name").val(ui.item.company_name);
			}
		});


			
		jQuery("#shopping_autocomplete").autocomplete({
			source: function( request, response ) {
				var matcher = new RegExp( jQuery.ui.autocomplete.escapeRegex( request.term ), "i" );
				response( jQuery.grep( products, function( value ) {
					value = value.label || value.value || value;
					return matcher.test( value ) || matcher.test( normalize( value ) );
				}) );
			},
			select: function(event, ui){
				if(ui.item.quantity > 0)
				{
					if(jQuery("#get-the-item-" + ui.item.id).length == 0)
					{
						var deletable = jQuery("#dbp-deletable");
						if(deletable.length > 0)
							deletable.remove();
						var item_holder = jQuery(".dbp-item-holder");
						var counter = item_holder.length;
						app = '<div id="get-the-item-' + ui.item.id + '" class="dbp-item-holder"><div class="left">' + ui.item.label + '</div>';
						app += '<div class="left first"><input id="get-the-q-' + ui.item.id + '" type="text" class="dbp_invoice_item" size="3" value="1" name="item[' + counter + '][quantity]" /></div>';
						app += '<div class="left second"><input type="checkbox" class="dbp_invoice_item" name="item[' + counter + '][tax]" value="true" checked="checked" /></div>';
						app += '<div class="right third"><a id="delete-item-' + counter + '" href="#">Borrar</a></div>';
						app += '<input type="hidden" name="item[' + counter + '][post_id]" value="' + ui.item.id + '" class="dbp_invoice_item" />';
						app += '<input type="hidden" name="item[' + counter + '][price]" value="' + ui.item.price + '" class="dbp_invoice_item" />';
						app += '<div class="clr"></div><hr /></div>';
						
						jQuery("#shopping_invoice_items").append(app);
						jQuery("#shopping_invoice_items, #shopping_invoice_items_header").show("fast");
						
						jQuery("#get-the-q-" + ui.item.id).keyup(function(){
							var the_q_val = jQuery(this).val();
							var the_q_max = ui.item.quantity;
							
							if(parseInt(the_q_val) > the_q_max) {
								jQuery(this).val(the_q_max);
								alert("No puede vender mas de la cantidad disponible");
								}
							});
						
						jQuery("#delete-item-" + counter).click(function(e){
							e.preventDefault();
							jQuery(this).parent().parent().remove();
							});
					}
					else
					{
						var re = jQuery("#get-the-q-" + ui.item.id).val();
						
						if(re == ui.item.quantity)
						{
							alert("No se puede vender mas " + ui.item.label);
						}
						else
						{
							var valor = 1;
							
							valor += parseInt(re);
							jQuery("#get-the-q-" + ui.item.id).val(valor.toFixed());
						}
					}
				}
				else
				{
					alert("No existe disponibilidad de este producto actualmente!");
				}
			}
		});
		
		jQuery("a.dbp-delete").each(function(){
		jQuery(this).click(function(e){
			e.preventDefault();
			if(confirm("Desea eliminar este producto de la factura guardada?"))
				jQuery(this).parent().parent().remove();
			});
		});
		
		jQuery("#dbp-create-invoice").submit(function(){
			var data = jQuery(this).serialize();
			var client_error = 0;
			var product_catcher = jQuery(".dbp_invoice_item");
			
				if(jQuery("#client_company_name").val() != "")
					jQuery("#client_firstname, #client_lastname").removeClass("required");
				else if(jQuery("#client_firstname, #client_lastname").val() != "")
					jQuery("#client_company_name").removeClass("required");
				else if(jQuery("#client_company_name, #client_firstname, #client_lastname").val() == "")
					jQuery("#client_company_name, #client_firstname, #client_lastname").addClass("required");
					
				jQuery(".required").each(function(){
					if(jQuery(this).val() == "") {
						jQuery(this).addClass("ui-state-error");
						client_error++;
						}
					});

				if(client_error > 0)
				{
					jQuery("#message").text("Los campos marcados en rojo son requeridos para el cliente").addClass("ui-state-error").show("fast");
					jQuery("input.ui-state-error").each(function(){
						jQuery(this).focus(function(){
							jQuery(this).removeClass("ui-state-error");
							jQuery("#message").removeClass("ui-state-error").hide("slow");
						});
					});
					return false;
				}
				else if(product_catcher.length < 3)
				{
					jQuery("#message").text("Debe agregar al menos un porducto para crear una factura").addClass("ui-state-error").show("fast");
					jQuery("#shopping_autocomplete").addClass("ui-state-error").focus(function(){
							jQuery(this).removeClass("ui-state-error");
							jQuery("#message").removeClass("ui-state-error").hide("slow");
						});
					return false;
				}
				else
				{
					return true;
				}
			
			});
});