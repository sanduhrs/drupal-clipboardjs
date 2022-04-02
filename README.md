INTRODUCTION
------------
Integrates the Clipboard.js library with Drupal.

REQUIREMENTS
------------
 * clipboard.js library - https://github.com/zenorocha/clipboard.js/archive/master.zip

INSTALLATION
------------
1. Download and extract the clipboard.js plugin, rename extracted folder to
   "clipboard" and copy it into "sites/all/libraries". The plugin should
   now be located at "sites/all/libraries/clipboard.js/dist/clipboard.js". You can
   also just use 'drush cbdl' to automatically download the library.

USAGE
-----
The Clipboard.js can be added to any text field by visiting the manage display
page for the entity and and choosing Clipboard.js as the field formatter.

Custom text fields can also use clipboard.js using the form api or in a render
array using the theme function to display the element:

    public function buildForm(array $form, FormStateInterface $form_state) {
      $form['clipboardjs'] = [
        '#type' => 'textfield',
        '#theme' => 'clipboardjs',
        '#text' => 'The text to copy to clipboard',
        '#alert_text' => $this->t('Copy was successful!'),
        '#alert_style' => 'tooltip',
        '#label' => $this->t('Click to Copy'),
        '#attached' => [
          'library' => [
            'clipboardjs/drupal'
          ],
        ]
      ];
      return $form;
    }


CREDITS
-------
* Norman Kerr - [kenianbei](https://drupal.org/user/778980)
