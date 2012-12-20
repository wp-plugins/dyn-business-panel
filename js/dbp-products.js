jQuery("#product_init_promotion, #product_end_promotion, #product_date").datepicker({ dateFormat: "yy-mm-dd", changeMonth: true });
jQuery(".remove_image_button").click(function(){
	var empty_it = '';
	jQuery(this).prev().prev('input.dbp_long_input_text').val(empty_it);
	});