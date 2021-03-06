jQuery.fn.labelset = function (labels,template) {
	var $=jQuery,$this = $(this);

	$.template(template,$(template));

	$this.addLabel = function (id,insert) {
		if (isNaN(id)) return;

		var ui = $.tmpl(template,{id:id,label:labels[id]}).hide(),
			deleteButton = ui.find('button.delete').hide().click(function () {
				if (confirm($sl.prompt)) ui.fadeOut('fast',function () { ui.remove(); });
			}),
			addButton = ui.find('button.add').click(function () {
				var id = $this.find('li').size();
				$this.addLabel(id,'#'+ui.attr('id')).slideDown();
			}),
			wrap = ui.hover(function() {
				if (id == 0) return;
				ui.addClass('nonum');
				deleteButton.show();
			}, function () {
				ui.removeClass('nonum');
				deleteButton.hide();
			});

		if (insert) ui.insertAfter(insert);
		else ui.appendTo($this);

		return ui;
	};

	for (var id in labels) {
		$this.addLabel(id);
	}
	$this.find('li').css({display:'list-item'});

	return $this;
};