/**
 * @file
 * Javascript to integrate the clipboard.js library with Drupal.
 */

window.ClipboardJS = window.ClipboardJS || Clipboard;

(function ($, Drupal, drupalSettings) {
    'use strict';

    Drupal.behaviors.clipboardjs = {
        attach: function (context, settings) {
            // Initialize clipboard.js.
            Drupal.clipboard = new ClipboardJS('a.clipboardjs-button, input.clipboardjs-button, button.clipboardjs-button');

            // Process successful copy.
            Drupal.clipboard.on('success', function (e) {
                var alertStyle = $(e.trigger).data('clipboardAlert');
                var alertText = $(e.trigger).data('clipboardAlertText');
                var target = $(e.trigger).data('clipboardTarget');

                // Display as alert.
                if (alertStyle === 'alert') {
                    alert(alertText);
                }

                // Display as tooltip.
                else if (alertStyle === 'tooltip') {
                    var $target = $(target);

                    // Add title to target div.
                    $target.prop('title', alertText);

                    // Show tooltip.
                    $target.tooltip({
                        position: { my: "center", at: "center" }
                    }).mouseover();

                    // Destroy tooltip after delay.
                    setTimeout(function () {
                        $target.tooltip('destroy');
                        $target.prop('title', '');
                    }, 1500);
                }
            });

            // Process unsuccessful copy.
            Drupal.clipboard.on('error', function (e) {
                var target = $(e.trigger).data('clipboardTarget');
                var $target = $(target);

                $target.prop('title', function (action) {
                    var actionMsg = '';
                    var actionKey = (action === 'cut' ? 'X' : 'C');

                    if (/iPhone|iPad/i.test(navigator.userAgent)) {
                        actionMsg = 'This device does not support HTML5 Clipboard Copying. Please copy manually.';
                    }
                    else {
                        if (/Mac/i.test(navigator.userAgent)) {
                            actionMsg = 'Press ⌘-' + actionKey + ' to ' + action;
                        }
                        else {
                            actionMsg = 'Press Ctrl-' + actionKey + ' to ' + action;
                        }
                    }

                    return actionMsg;
                }(e.action));

                // Show tooltip.
                $target.tooltip({
                    position: {my: "center", at: "center"}
                }).mouseover();

                // Destroy tooltip after delay.
                setTimeout(function () {
                    $target.tooltip('destroy');
                    $target.prop('title', '');
                }, 3000);
            });
        }
    };
})(jQuery, Drupal, drupalSettings);
