/*!
 * setup.js - General settings screen behaviors
 * Copyright © 2008-2010 by Ingenesis Limited
 * Licensed under the GPLv3 {@see license.txt}
 */

jQuery(document).ready(function ($) {
	var baseop = $('#base_operations'),
		baseopZone = $('#base_operations_zone');

	if (!baseop.val() || baseop.val() == '') baseopZone.hide();
	if (!baseopZone.val()) baseopZone.hide();

	baseop.change(function() {
		if (baseop.val() == '') {
			baseopZone.hide().attr('disabled',true);
			return true;
		}

		$.getJSON(zones_url+'&action=shopp_country_zones&country='+baseop.val(),
			function(data) {
				baseopZone.hide().empty().attr('disabled',true);
				if (!data) return true;

				$.each(data, function(value,label) {
					option = $('<option></option>').val(value).html(label).appendTo('#base_operations_zone');
				});
				baseopZone.show().removeAttr('disabled');

		});
	});

	$('#selectall_targetmarkets').change(function () {
		if ($(this).attr('checked')) $('#target_markets input').not(this).attr('checked',true);
		else $('#target_markets input').not(this).attr('checked',false);
	});

});
