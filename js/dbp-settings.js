jQuery(function(){
	jQuery(".dbp_form_settings_panel").hide("fast");

	jQuery("#select-all").click(function(){
		if(jQuery(this).attr("checked")=="checked") {
			jQuery(".dbp-settings-ol input:checkbox").attr("checked","checked");
			}else{
			jQuery(".dbp-settings-ol input:checkbox").removeAttr("checked");
			}
		});

	jQuery("#tab1").fadeIn();
	jQuery("a[href=#tab1]").parent("li").addClass("ui-tabs-selected, ui-state-active");

	jQuery(".dbp-ui-nav").click(function(){
		var show = jQuery(this).attr("href");
		jQuery(".dbp_form_settings_panel").hide();
		jQuery(".ui-tabs-selected, .ui-state-active").removeClass("ui-tabs-selected, ui-state-active");
		jQuery("a[href=" + show + "]").parent("li").addClass("ui-tabs-selected, ui-state-active");
		jQuery(show).fadeIn();
		return false;
		});

	jQuery(".remove_image_button").click(function(){
		var empty_it = '';
		jQuery(this).prev().prev('input.dbp_long_input_text').val(empty_it);
		});
});