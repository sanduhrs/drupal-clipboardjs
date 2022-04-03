<?php

namespace Drupal\clipboardjs\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FieldItemListInterface;

/**
 * Plugin implementation of the 'clipboard' formatter.
 *
 * @deprecated in clipboardjs:2.0.2 and is removed from clipboardjs:2.1.0. Instead, use one of the other available formatters of this project.
 * // phpcs:ignore
 * @see https://git.drupalcode.org/project/clipboardjs/-/tree/2.0.x/src/Plugin/Field/FieldFormatter
 *
 * @FieldFormatter(
 *   id = "clipboard",
 *   label = @Translation("Clipboard"),
 *   field_types = {
 *     "email",
 *     "link",
 *     "string",
 *     "string_long"
 *   }
 * )
 */
class ClipboardJs extends ClipboardJsBase {

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    // phpcs:ignore
    @trigger_error('ClipboardJs formatter is deprecated in clipboardjs:2.0.2 and is removed from clipboardjs:2.1.0. Instead, use one of the other available formatters of this project. See https://git.drupalcode.org/project/clipboardjs/-/tree/2.0.x/src/Plugin/Field/FieldFormatter', E_USER_DEPRECATED);
    $elements = [];
    foreach ($items as $delta => $item) {
      $elements[$delta] = [
        '#theme' => 'clipboardjs',
        '#value' => $this->viewValue($item),
      ];
    }
    return $elements;
  }

}
