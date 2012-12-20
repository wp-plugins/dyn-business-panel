jQuery(function(){
	jQuery("#dbp-create-client").submit(function(){
		var data = jQuery(this).serialize();
		var client_error = 0;
		
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
			else
			{
				return true;
			}
		
		});
		
				
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
		
	jQuery("#dbp_search_client").autocomplete({
		source: function( request, response ) {
			var matcher = new RegExp( jQuery.ui.autocomplete.escapeRegex( request.term ), "i" );
			response( jQuery.grep( clients, function( value ) {
				value = value.label || value.value || value;
				return matcher.test( value ) || matcher.test( normalize( value ) );
			}) );
		},
		select: function(event, ui){
			window.location.href=theUrl + ui.item.id;
		}
	});
});