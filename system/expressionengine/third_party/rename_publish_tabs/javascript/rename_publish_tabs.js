
(function ($, window, undefined){
	"use strict";
	
	// Hide accessory tab in CP footer
	$(".rename_publish_tabs").parent().hide();
	
	// Event binding
	$("#showToolbarLink a").mousedown(function(){
		if($('#tools:hidden').length > 0)
		{
			$('#tab_menu_tabs > li.content_tab').bind('dblclick', renameTabBegin);

		}else
		{
			$('#tab_menu_tabs > li.content_tab').unbind('dblclick', renameTabBegin);

		}
	});

	function renameTabBegin(evt)
	{

		// cache the tab element we're working with and some properties
		var editing_tab = $(evt.target);
		var orig_id = editing_tab.parent().attr('id').replace('menu_', '');
		var orig_val = editing_tab.text();

		// disable dragging while we edit
		$(".tab_menu").sortable({ disabled: true });

		// remove disabled state applied by UI draggable
		editing_tab.removeClass("ui-state-disabled");

		// add a class to enable our styling
		editing_tab.addClass("rename_publish_tabs_active");

		// allow editing of text
		editing_tab.attr('contenteditable',true).focus().select();

		// stop editing after pressing return
		editing_tab.keypress(function (e){
			if((e.keyCode ? e.keyCode : e.which) == 13) {
				editing_tab.trigger("blur");
			}
		});

		// We want to allow text selection using the cursor
		// so we need to disable the mousedown event added by jquery ui
		// but we want to revert the behavior later, so we cache the function
		var prev_mousedown = editing_tab.mousedown;
		editing_tab.unbind('mousedown');

		// do validation and update elements after user stops editing
		editing_tab.blur(function(){

			// disable editing
			editing_tab.attr('contenteditable',false);

			// cache the new entered value
			var new_val = $.trim(editing_tab.text());

			if(validateTabName(orig_val, new_val))
			{

				var new_id = normalizeId(new_val);

				// rename tab elements
				editing_tab.attr('title','menu_'+new_id);
				editing_tab.removeClass("menu_"+orig_id).addClass("menu_"+new_id);
				editing_tab.parent().attr({
					id : 'menu_'+new_id,
					title : new_val
				});

				// update the tab's holder element
				$("#holder #" + orig_id).attr('id', new_id);

				// update the corresponding tab element in the "remove_tab" list in the toolbar
				$("#remove_tab_"+orig_id).attr('id', 'remove_tab_'+new_id).find('.menu_focus').attr('title','menu_'+new_id).text(new_val);
				$("a.delete_tab[href='#"+orig_id+"']").attr('href','#'+new_id);

			}
			else
			{
				// if not valid return name to default
				editing_tab.text(orig_val);
			}

			// Re-enable Dragging
			$(".tab_menu").sortable({ disabled: false });

			// Stop listening for events
			editing_tab.unbind("blur keypress");

			// Remove our class
			editing_tab.removeClass("rename_publish_tabs_active");

			// restore mousedown event function
			editing_tab.mousedown = prev_mousedown;

		});

	}

	/*
	 * Makes sure string is not the same, empty, or contains illegal characters
	 */
	function validateTabName(o,n)
	{
		if(o == n) return false;

		if(n == "") {
			$.ee_notice(EE.lang.tab_name_required, {open:true});
			return false;
		}

		// contains valid characters
		if(/^[a-zA-Z0-9 _-]+$/.test(n) == false) {
			$.ee_notice(EE.lang.illegal_characters, {open:true});
			return false;
		}

		// is a duplicate label
		if($("#tab_menu_tabs").find("#menu_"+normalizeId(n)).length > 0)
		{
			$.ee_notice(EE.lang.duplicate_tab_name, {open:true})
			return false;
		}

		// all good
		return true;
	}

	/*
	 * Converts spaces to underscores for element ids
	 */
	function normalizeId(id_str)
	{
		return id_str.replace(/ /g,"_").toLowerCase();
	}

})(jQuery, window, undefined);
