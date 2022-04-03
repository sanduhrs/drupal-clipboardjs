<?php

namespace Drupal\clipboardjs\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FieldItemListInterface;

/**
 * Plugin implementation of the 'clipboard' formatter.
 *
 * @FieldFormatter(
 *   id = "clipboard_textarea",
 *   label = @Translation("Clipboard.js Textarea"),
 *   field_types = {
 *     "email",
 *     "link",
 *     "string",
 *     "string_long"
 *   }
 * )
 */
class ClipboardJsTextarea extends ClipboardJsBase {

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    $elements = [];
    foreach ($items as $delta => $item) {
      $elements[$delta] = [
        '#theme' => 'clipboardjs_textarea',
        '#value' => $this->viewValue($item),
      ];
    }
    return $elements;
  }

}
