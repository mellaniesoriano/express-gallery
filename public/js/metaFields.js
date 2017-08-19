/* jshint esversion: 6 */

(function(window) {
  const add_meta_field_button = document.getElementById(
    'add_meta_field_button'
  );
  const meta_fields = document.getElementById('meta_fields');

  add_meta_field_button.addEventListener('click', e => {
    // create the dom structure of the fields, dynamically
    let key_val_li = document.createElement('li');

    let meta_key_input = document.createElement('input');
    meta_key_input.className = 'meta_key';
    meta_key_input.type = 'text'; // no name=""
    meta_key_input.placeholder = 'Attribute';

    let meta_value_input = document.createElement('input');
    meta_value_input.className = 'meta_value';
    meta_value_input.type = 'text';
    meta_value_input.placeholder = 'Value';

    meta_key_input.addEventListener('change', e => {
      meta_value_input.name = `meta[${e.target.value}]`;
    });

    key_val_li.appendChild(meta_key_input);
    key_val_li.appendChild(meta_value_input);
    meta_fields.appendChild(key_val_li);
  });
  /*
            <li>
              <input class="meta_key" type="text" name="someKey" placeholder="Attribute">
              <input class="meta_value" type="text" name="meta[someKey]" placeholder="Attribute">
            </li>
  */
})(window);