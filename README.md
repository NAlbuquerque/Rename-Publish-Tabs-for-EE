#Rename Publish Tabs#
Author: [Nuno Albuquerque](http://www.nainteractive.com)

##For ExpressionEngine 2.x##

###Version 1.0.3###
* Requires: ExpressionEngine 2.4.x

###Description###

By default, EE does not support renaming of tabs in the publish entry screen. This is an issue if you have complicated publish layouts since you'd have to essentially reproduce your efforts every time you needed to change a tab name.

This little accessory finally allows renaming of tabs in publish entry screens! Simply double click the tab name while editing your publish layout and the label becomes editable.

###Installation###
1. Move the rename_publish_tabs folder to your ./system/expressionengine/third_party/ folder.
2. Enable the accessory from the Add-ons > Accessories menu.
3. (Optional) Enable the accessory only in the Content page by editing the accessory settings. Even though the accessory will only run on the content publish screens by default, this extra step will prevent EE from even acknowledging it on other pages.

### Usage ###
1. Go to any publish entry page and click 'Show Toolbar' to edit your publish layout.
3. Double click the Tab label to enter edit mode.
4. Press enter or click anywhere on the screen to exit edit mode.
5. Save your Publish Layout.


###Release Notes###
1.0.3	(2014-03-04)
- Improved user error notices when invalid tab names are entered

1.0.2	(2013-07-01)
- Improved uri class name detection
- Moved JS to footer
- Improved performance, now only adds js to publish page