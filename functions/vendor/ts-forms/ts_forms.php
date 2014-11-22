<?php

/***********************************************************************************************************/
// Class TS forms
/***********************************************************************************************************/
class TS_Forms {
	private $form;
	private $fields;

    function __construct($form = array()) {
		$this->form = self::normalize($form);
		$this->fields = $this->form['fields'];

	}

    public function validate($post) {
		$error = false;

		if (isset($post['email'])) {
			$envoi = 1;
			$error = false;
			$msg = array();

			if (!empty($post['email'])) {
				die(header('location:http://www.google.fr'));
			}

			// prepare for checkbox
			foreach ($this->fields as $k => $lst) {
				if ($lst['type'] == 'checkbox') {
					$this->fields[$k]['default'] = false;
					$this->fields[$k]['static'] = false;
				}
			}

			foreach ($post as $k => $lst) {
				// if this is a supplementary field
				if (!array_key_exists($k, $this->fields)) {
					continue;
				}

				if (!is_array($lst))
					$lst = stripslashes(htmlspecialchars($lst));

				// if this is not a textfield
				if (isset($this->fields[$k]['type']) && ($this->fields[$k]['type'] == 'hidden' || $this->fields[$k]['type'] == 'select' || $this->fields[$k]['type'] == 'checkbox' || $this->fields[$k]['type'] == 'file')) {
					$this->fields[$k]['default'] = $lst;

					continue;
				}
				
				if ($this->fields[$k]['validation']) {
					if ((empty($lst) || $lst == $this->fields[$k]['default'] || $lst == $this->fields[$k]['message']) && $this->fields[$k]['validation_method'] != 'function_only') {
						$this->fields[$k]['error'] = true;
						$error = true;
					}
					else if (!empty($this->fields[$k]['functions'])) {
						if (($lst == $this->fields[$k]['default'] || empty($lst)) && $this->fields[$k]['validation_method'] == 'function_only') {
							// we don't have to validate since it means this field is validated only if the field is filled with some info
						}
						else {
							foreach ($this->fields[$k]['functions'] as $func) {
								$sortie = call_user_func($func, trim($lst));
								if (!$sortie) {
									$this->fields[$k]['error'] = true;
									$error = true;
								}
							}
						}

						if (!$this->fields[$k]['error']) 
							$this->fields[$k]['default'] = $lst;
					}
					else {
						$this->fields[$k]['default'] = $lst;
					}
				}
				else {
					$this->fields[$k]['default'] = $lst;
				}
			}

			if (!$error) {
				$this->fields['reussite'] = 'reussite';
				return $this->fields;
			}
			else {
				return $this->fields;
			}
		}
    }

    public function success_mail($dest, $object, $name_from, $email_from, $cc = '', $bcc = '') {
		$html = '';
		foreach ($this->fields as $k => $lst) {
			if (!isset($lst["default"]) || !isset($lst["static"]) || !isset($lst["show"]))
				continue;

			if ($lst["default"] != $lst["static"] || $lst['show'] == 2) {
				if ($lst['show'] == 1 || $lst['show'] == 2) {
					$send = $lst["default"];

					// in case this is an array
					if (is_array($send))
						$send = implode(',', $send);

					if ($lst['type'] == 'file' && !empty($send)) {
						$uploads = wp_upload_dir();
						$send = $uploads['baseurl'] . '/' . $send;
					}

					$html .= "<br>" . ucwords(str_replace('_', ' ', $k)) . " : <b>" . html_entity_decode($send) . "</b>";
				}
			}
		}

		st_send_mail($html, $dest, $object, $name_from, $email_from, $cc, $bcc);
    }

    public function save_in_db($table, $side, $add_to_default = array()) {
    	global $wpdb;
    	$table = $wpdb->prefix . $table;

    	// create table if not exists
		if ($wpdb->get_var("SHOW TABLES LIKE '$table'") != $table) {
			$sql = "CREATE TABLE `".$table."` (";
			$sql.= "`id` INT NOT NULL AUTO_INCREMENT ,";
			$sql.= "`side` VARCHAR( 255 ) NOT NULL ,";
			$sql.= "PRIMARY KEY ( `id` )";
			$sql.="	) ".$charset." ;";  

			$wpdb->query($sql);
		}
		
    	// get name of the columns
		$sql = "SHOW COLUMNS FROM " . $table;
		$columns_pre = $wpdb->get_results($sql, 'ARRAY_N');

		$columns = array();
		foreach ($columns_pre as $col) {
			$columns[] = $col[0];
		}

		// prepare query
		$to_insert = array('side' => $side, 'added' => date('Y-m-d G:i:s'));

		// add to default
		foreach ($add_to_default as $key => $lst) {
			$to_insert[$key] = $lst;
		}

		// check if ths column exists for extra fields
		foreach ($to_insert as $key => $lst) {
			if (!in_array($key, $columns)) {
				$wpdb->query("ALTER TABLE `". $table . "` ADD COLUMN `" . $key . "` VARCHAR(255)");
			}
		}

		// cast field to string
		foreach ($this->fields as $k => &$lst) {
			// in case this is an array
			if (is_array($lst['default']))
				$lst['default'] = implode(',', $lst['default']);
			else
				$lst['default'] = (string)$lst['default'];
		}

		foreach ($this->fields as $k => $lst) {
			if (($lst["default"] != $lst["static"] || $lst['show'] == 2) && $k != "reussite") {
				if ($lst['show'] == 1 || $lst['show'] == 2) {

					// add column if it doesn't exist					
					if (!in_array($k, $columns)) {
						$wpdb->query("ALTER TABLE `". $table . "` ADD COLUMN `" . $k . "` VARCHAR(255)");
					}

					$to_insert[$k] = $send;
				}
			}
		}

		// prepare insert
		if (count($to_insert) != 1) {
			$formats = array();
			foreach ($to_insert as $lst) {
				$formats[] = '%s';
			}

			 $sql = $wpdb->insert($table, $to_insert, $formats);
			 return($wpdb->insert_id);

		}
    }

	/**************************************************************************************************/
    // Simple Helper
    /**************************************************************************************************/
    static public function get_form_field($fields, $name) {
		if ($fields[$name]['type'] == 'text') {
			$val = ($fields[$name]['error']) ? $fields[$name]['message'] : $fields[$name]['default'];
			$err = ($fields[$name]['error']) ? 'style="color: red;"' : '';
		
			$value = '<input type="text" name="'.$name.'" value="'. $val . '" default="'. $val . '" '.$err.' />';
		}
		else if ($fields[$name]['type'] == 'hidden') {
			$value = '<input type="hidden" name="'.$name.'" value="'. $fields[$name]['default'] . '" id="'.$name.'Hidden" />';
		}
		else if ($fields[$name]['type'] == 'textarea') {
			$value = '<textarea name="'.$name.'" default="'. $fields[$name]['default'] . '">'. $fields[$name]['default'] . '</textarea>';
		}
		else if ($fields[$name]['type'] == 'checkbox') {
			$checked = ($fields[$name]['default']) ? ' checked="checked"' : '';
			$value = '<input type="checkbox" name="'.$name.'"' . $checked . ' value="1" />' . $fields[$name]['after'];
		}
		else if ($fields[$name]['type'] == 'select') {
			$value = '<select name="'.$name.'">'.PHP_EOL;
			foreach ($fields[$name]['options'] as $key => $lst) {
				$disabled = ($key == "disabled")  ? ' disabled="disabled"' : '';
				$checked = ($fields[$name]['default'] == $key) ? ' selected="selected"' : '';
				$value .= '<option value="'.$key.'"' . $checked . $disabled . '>' . $lst . '</option>'.PHP_EOL;
			}
			$value .= '</select>'.PHP_EOL;
		}
		else if ($fields[$name]['type'] == 'checkbox_list') {
			$value = '';

			$tpl = '<label class="checkboxList"><input type="checkbox" name="%s[]" value="%s"%s> %s</label>';

			foreach ($fields[$name]['options'] as $key => $lst) {
				$value .= sprintf(
					$tpl,
					$name,
					$key,
					checked( in_array( $key, $fields[$name]['default'] ), 1, false ),
					$lst
				);
				$value .= '<br />' . PHP_EOL;
			}
		}
		else if ($fields[$name]['type'] == 'file') {
			$value = '<div class="file-field-wrapper">';
			$value .= '<div class="file-field" ';
			if (isset($fields[$name]['sizeLimit']))
				$value .= 'data-sizeLimit="' . $fields[$name]['sizeLimit'] . '" ' . PHP_EOL;
			if (isset($fields[$name]['allowedExtensions']))
				$value .= 'data-allowedExtensions="' . implode( ',', $fields[$name]['allowedExtensions'] ) . '" ' . PHP_EOL;
			$value .= 'data-text="' . $fields[$name]['static']  . '" ' . PHP_EOL;
			$value .= '>' . PHP_EOL;
			$value .= '</div>' . PHP_EOL;
			$value .= '<input type="hidden" class="file-field-input" name="'.$name.'" />' . PHP_EOL;

			$d = ($fields[$name]['default'] != $fields[$name]['static']) ? $fields[$name]['default'] : $fields[$name]['description'];
			$value .= '<p class="description">' . $d . '</p>' . PHP_EOL;
			$value .= '</div>' . PHP_EOL;
		}

		return $value;
	}

	static public function get_hidden_field($form) {
		$html = '<input type="hidden" name="type_form" value="' . $form['id'] . '" />' . PHP_EOL;
	    $html .= '<div class="hide">' . PHP_EOL;
	    $html .= '<input type="text" name="email" value="" />' . PHP_EOL;
	    $html .= '</div>' . PHP_EOL;
	    return $html;
	}


    /**************************************************************************************************/
    // Normalization
    /**************************************************************************************************/
    static public function normalize($form) {
		// Set default values for meta box
		$form = wp_parse_args($form, array(
			'id' => uniqid(),
			'description' => 'Ce formulaire n\'a pas de description',
			'fields' => array()
		));

		// Set default values for fields
		$form['fields'] = self::normalize_fields($form['fields']);

		return $form;
	}


    static private function normalize_fields($fields) {
		foreach ($fields as &$field) {
			$field = wp_parse_args( $field, 
				array(
					'type' 				=> 'text',
					'default' 			=> (isset($field['type']) && $field['type'] == 'checkbox_list') ? array() : '',
					'show' 				=> true,
					'validation'       	=> false,
					'error'       		=> false,
					'show'       		=> 1,
					'before'       		=> '',
					'after'       		=> '',
					'static' 			=> (isset($field['default'])) ? $field['default'] : '',
					'validation_method'	=> 'all'
				) 
			);
		}

		return $fields;
	}

	/**************************************************************************************************/
    // load script
    /**************************************************************************************************/
    static public function load_script() {
    	// add script (only for wordpress)
		if (function_exists('wp_enqueue_script')):
			wp_enqueue_style( 'fileuploader',  get_template_directory_uri() . '/functions/vendor/ts-forms/css/fileuploader.css', array(), '1.0.0', false );

			wp_enqueue_script( 'fileuploader',  get_template_directory_uri() . '/functions/vendor/ts-forms/js/fileuploader.js', array(), '1.0.0', false );
  			wp_enqueue_script( 'ts-forms',  get_template_directory_uri() . '/functions/vendor/ts-forms/js/main.js', array('jquery', 'fileuploader'), '1.0.0', false );
    	endif;

    }
}
?>