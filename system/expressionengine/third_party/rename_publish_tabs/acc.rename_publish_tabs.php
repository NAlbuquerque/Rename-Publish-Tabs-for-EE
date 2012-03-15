<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * ExpressionEngine Rename Publish Tabs Accessory
 *
 * @package		Rename Publish Tabs
 * @category	Accessory
 * @description	Enables renaming of tabs in publish entry screens.
 * @author		Nuno Albuquerque
 * @link		http://www.nainteractive.com/notebook/rename_publish_tabs_for_expressionengine
 */
 

class Rename_publish_tabs_acc {

	var $name		= 'Rename Publish Tabs';
	var $id			= 'rename_publish_tabs';
	var $version		= '1.0';
	var $description	= 'Enables renaming of tabs in publish entry screens.';
	var $sections		= array();
	
	/**
	 * Constructor
	 */
	function __construct()
	{
		$this->EE =& get_instance();
	}
	
	/**
	 * Set Sections
	 *
	 * Set content for the accessory
	 *
	 * @access	public
	 * @return	void
	 */
	function set_sections()
	{
		$this->EE->load->library('javascript');
	  
		$this->EE->javascript->output('$(".rename_publish_tabs").parent().hide();');

		if($_GET['C'] == 'content_publish')
		{
			$this->EE->cp->add_to_head('<style>	#mainContent .tab_menu li a.rename_publish_tabs_active{color: #E11842;outline: 1px dotted #E11842; -moz-user-select: text;
            -webkit-user-select: text; user-select: text;}</style>');
			$this->EE->load->library('javascript');
			$this->EE->cp->load_package_js('rename_publish_tabs');
		}
	}
	
}
// END CLASS