PuMuKIT Tiny plugin for Moodle
==============================

This plugin allows PuMuKIT (version 4.0 or higher) integration on Tiny editor.

If you want to develop for this plugin see [DEVELOP DOC](https://github.com/teltek/moodle-tiny_pumukitmedia/blob/master/DEVELOPER.md) 

[IMPORTANT] Before install this plugin installs [PuMuKIT Filter](https://github.com/teltek/moodle-filter_pumukitmedia/)

## How to install

### Step 1: Clone the latest code version from GitHub
```
git clone https://github.com/teltek/moodle-tiny_pumukitmedia pumukitmedia
```

### Step 2: Create .zip to install

In the same folder where you do the last step execute the following command.
```
zip -r moodle-tiny_pumukitmedia.zip pumukitmedia -x "pumukitmedia/.git/*" -x "pumukitmedia/.github/*" -x "pumukitmedia/.gitignore" -x "pumukitmedia/node_modules/*"
```

### Step 3: Upload and configure

Access to moodle as Administrator and go to "Site administration" -> "Plugins" -> "Install plugins"

Upload moodle-tiny_pumukitmedia.zip package and click in "Install plugin from the ZIP file".

Follow the moodle instructions in the next sections until the configuration section.

Configure the plugin with your [PuMuKIT data password and PuMuKIT domain](https://github.com/teltek/PumukitLmsBundle/blob/master/Resources/doc/Configuration.md)


### Step 4: Activate plugin on Tiny Editor

The plugin is automatically activated when you install it. You can see this by entering a course and adding content.
