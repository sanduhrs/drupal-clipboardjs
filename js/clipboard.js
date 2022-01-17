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
      Drupal.clipboard = new ClipboardJS(elements);

      const tooltipClass = 'clipboardjs-tooltip';

      // Process successful copy.
      Drupal.clipboard.on('success', function (e) {
        let alertStyle = $(e.trigger).data('clipboardAlert');
        let alertText = $(e.trigger).data('clipboardAlertText');
        let target = $(e.trigger).data('clipboardTarget');

        // Display as alert.
        if (alertStyle === 'alert') {
          alert(alertText);
        }

        // Display as tooltip.
        else if (alertStyle === 'tooltip') {
          let $target = $(target);

          // Show custom tooltip.
          if ($(`.${tooltipClass}`, $target.parent()).length === 0) {
            $target.parent().append(`<div class="${tooltipClass}">${alertText}</div>`);

            // Remove tooltip after delay.
            setTimeout(function () {
              $target.parent().find(`.${tooltipClass}`).remove();
            }, 1500);
          }
        }
      });

      // Process unsuccessful copy.
      Drupal.clipboard.on('error', function (e) {
        let target = $(e.trigger).data('clipboardTarget');
        let $target = $(target);
        let actionMsg = '';
        let actionKey = (e.action === 'cut' ? 'X' : 'C');

        if (/iPhone|iPad/i.test(navigator.userAgent)) {
          actionMsg = 'This device does not support HTML5 Clipboard Copying. Please copy manually.';
        }
        else {
          if (/Mac/i.test(navigator.userAgent)) {
            actionMsg = 'Press ⌘-' + actionKey + ' to ' + e.action;
          }
          else {
            actionMsg = 'Press Ctrl-' + actionKey + ' to ' + e.action;
          }
        }

        // Show custom tooltip.
        if ($(`.${tooltipClass}`, $target.parent()).length === 0) {
          $target.parent().append(`<div class="${tooltipClass}">${actionMsg}</div>`);

          // Destroy tooltip after delay.
          setTimeout(function () {
            $target.parent().find(`.${tooltipClass}`).remove();
          }, 3000);
        }
      });

    }
  };
})(jQuery, Drupal, drupalSettings);
