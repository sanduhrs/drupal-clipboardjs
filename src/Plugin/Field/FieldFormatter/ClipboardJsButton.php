<?php

namespace Drupal\clipboardjs\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FieldItemListInterface;

/**
 * Plugin implementation of the 'clipboard' formatter.
 *
 * @FieldFormatter(
 *   id = "clipboard_button",
 *   label = @Translation("Clipboard.js Button"),
 *   field_types = {
 *     "email",
 *     "link",
 *     "string",
 *   }
 * )
 */
class ClipboardJsButton extends ClipboardJsBase {

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    $elements = [];
    foreach ($items as $delta => $item) {
      $elements[$delta] = [
        '#theme' => 'clipboardjs_button',
        '#value' => $this->viewValue($item),
      ];
    }
    return $elements;
  }

}
