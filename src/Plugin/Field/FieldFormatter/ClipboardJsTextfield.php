<?php

namespace Drupal\clipboardjs\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FieldItemListInterface;

/**
 * Plugin implementation of the 'clipboard' formatter.
 *
 * @FieldFormatter(
 *   id = "clipboard_textfield",
 *   label = @Translation("Clipboard.js Textfield"),
 *   field_types = {
 *     "email",
 *     "link",
 *     "string",
 *     "string_long"
 *   }
 * )
 */
class ClipboardJsTextfield extends ClipboardJsBase {

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    $elements = [];
    foreach ($items as $delta => $item) {
      $elements[$delta] = [
        '#theme' => 'clipboardjs_textfield',
        '#value' => $this->viewValue($item),
      ];
    }
    return $elements;
  }

}
