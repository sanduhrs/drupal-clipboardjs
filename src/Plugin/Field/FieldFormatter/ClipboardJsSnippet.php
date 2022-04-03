<?php

namespace Drupal\clipboardjs\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FieldItemListInterface;

/**
 * Plugin implementation of the 'clipboard' formatter.
 *
 * @FieldFormatter(
 *   id = "clipboard_snippet",
 *   label = @Translation("Clipboard.js Snippet"),
 *   field_types = {
 *     "email",
 *     "link",
 *     "string",
 *     "string_long"
 *   }
 * )
 */
class ClipboardJsSnippet extends ClipboardJsBase {

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    $elements = [];
    foreach ($items as $delta => $item) {
      $elements[$delta] = [
        '#theme' => 'clipboardjs_snippet',
        '#value' => $this->viewValue($item),
      ];
    }
    return $elements;
  }

}
