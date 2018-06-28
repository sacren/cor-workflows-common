/* Copyright © 2016 Kuali, Inc. - All Rights Reserved
 * You may use and modify this code under the terms of the Kuali, Inc.
 * Pre-Release License Agreement. You may not distribute it.
 *
 * You should have received a copy of the Kuali, Inc. Pre-Release License
 * Agreement with this file. If not, please write to license@kuali.co.
 */
import { filter } from 'lodash'
import Field from './field'
import { TEXT } from '../return-types'
import GlobalTextInput from '../global-inputs/text-input'

// TODO: this is hard-coded into formbot so it must be hardcoded here as well
export const LANGUAGES = [
  'Mandarin',
  'Spanish',
  'English',
  'Hindi',
  'Arabic',
  'Portuguese',
  'Bengali',
  'Russian',
  'Japanese',
  'Punjabi',
  'German',
  'Javanese',
  'Wu (inc. Shanghainese)',
  'Malay/Indonesian',
  'Telugu',
  'Vietnamese',
  'Korean',
  'French',
  'Marathi',
  'Tamil',
  'Urdu',
  'Turkish',
  'Italian',
  'Yue (Cantonese)',
  'Thai',
  'Gujarati',
  'Jin',
  'Southern Min',
  'Persian',
  'Polish',
  'Pashto',
  'Kannada',
  'Xiang (Hunnanese)',
  'Malayalam',
  'Sundanese',
  'Hausa',
  'Odia (Oriya)',
  'Burmese',
  'Hakka',
  'Ukrainian',
  'Bhojpuri',
  'Tagalog',
  'Yoruba',
  'Maithili',
  'Uzbek',
  'Sindhi',
  'Amharic',
  'Fula',
  'Romanian',
  'Oromo',
  'Igbo',
  'Azerbaijani',
  'Awadhi',
  'Gan Chinese',
  'Cebuano (Visayan)',
  'Dutch',
  'Kurdish',
  'Serbo-Croatian',
  'Malagasy',
  'Saraiki',
  'Nepali',
  'Sinhalese',
  'Chittagonian',
  'Zhuang',
  'Khmer',
  'Turkmen',
  'Assamese',
  'Madurese',
  'Somali',
  'Marwari',
  'Magahi',
  'Haryanvi',
  'Hungarian',
  'Chhattisgarhi',
  'Greek',
  'Chewa',
  'Deccan',
  'Akan',
  'Kazakh',
  'Northern Min',
  'Sylheti',
  'Zulu',
  'Czech',
  'Kinyarwanda',
  'Dhundhari',
  'Haitian Creole',
  'Eastern Min',
  'Ilocano',
  'Quechua',
  'Kirundi',
  'Swedish',
  'Hmong',
  'Shona',
  'Uyghur',
  'Hiligaynon',
  'Mossi',
  'Xhosa',
  'Belarusian',
  'Balochi',
  'Konkani'
]

export default class FieldLanguageDropDown extends Field {
  static typeLabel = 'LanguagesDropdown'
  static type = 'field-language-dropdown'
  static treatAsType = TEXT
  static returnTypes = [TEXT]
  static matchTypes = [TEXT]
  static preferredOperators = []
  static hasEnumerableValues = true

  getChildren = async match => {
    let languages = LANGUAGES
    if (match) {
      const regex = new RegExp(match, 'ig')
      languages = filter(LANGUAGES, language => !language.search(regex))
    }
    const children = languages.map(
      language =>
        new GlobalTextInput(this, this.returnTypes, language, this.ctx)
    )
    return children
  }

  isLeaf = () => false
}
