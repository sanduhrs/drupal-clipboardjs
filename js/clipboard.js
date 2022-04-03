/**
 * @file
 * Javascript to integrate the clipboard.js library with Drupal.
 */

window.ClipboardJS = window.ClipboardJS || Clipboard;

(function ($, Drupal, drupalSettings) {

  'use strict';

  Drupal.behaviors.clipboardjs = {
    attach: function (context, settings) {
      let elements = context.querySelectorAll('a.clipboardjs-button, input.clipboardjs-button, button.clipboardjs-button');

      $(elements).click(function(event){
        event.preventDefault();
      });

      Drupal.clipboard = new ClipboardJS(elements);

      // Process successful copy.
      Drupal.clipboard.on('success', function (e) {
        let alertStyle = e.trigger.dataset.clipboardAlert;
        let alertText = e.trigger.dataset.clipboardAlertText;
        alertText = alertText ? alertText : Drupal.t('Copied.')

        // Display as alert.
        if (alertStyle === 'alert') {
          alert(alertText);
        }
        // Display as tooltip.
        else if (alertStyle === 'tooltip') {
          let $tooltip = $('.tooltip', e.trigger);

          // Show custom tooltip.
          $('.tooltiptext', $tooltip).text(alertText);
          $('.tooltiptext', $tooltip).css('visibility', 'visible');
          // Remove tooltip after delay.
          setTimeout(function () {
            $('.tooltiptext', $tooltip).css('visibility', 'hidden');
          }, 1500);
        }
      });

      // Process unsuccessful copy.
      Drupal.clipboard.on('error', function (e) {
        let actionMsg = '';
        let actionKey = (e.action === 'cut' ? 'X' : 'C');

        if (/iPhone|iPad/i.test(navigator.userAgent)) {
          actionMsg = Drupal.t('This device does not support HTML5 Clipboard Copying. Please copy manually.');
        }
        else {
          if (/Mac/i.test(navigator.userAgent)) {
            actionMsg = Drupal.t('Press ⌘-@key to @action', {'@key': actionKey, '@action': e.action});
          }
          else {
            actionMsg = Drupal.t('Press Ctrl-@key to @action', {'@key': actionKey, '@action': e.action});
          }
        }

        let $tooltip = $('.tooltip', e.trigger);

        // Show custom tooltip.
        $('.tooltiptext', $tooltip).text(actionMsg);
        $('.tooltiptext', $tooltip).css('visibility', 'visible');
        // Remove tooltip after delay.
        setTimeout(function () {
          $('.tooltiptext', $tooltip).css('visibility', 'hidden');
        }, 1500);
      });

    }
  };
})(jQuery, Drupal, drupalSettings);
