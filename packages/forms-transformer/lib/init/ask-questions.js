'use strict'

const prompt = require('../prompt-config.js')
const configExists = require('./questions/config-exists.js')
const whichAnswerspace = require('./questions/which-answerspace.js')
const whichFramework = require('./questions/which-framework.js')
const sourceFolder = require('./questions/source-folder.js')
const distFolder = require('./questions/dist-folder.js')
const templateLocation = require('./questions/template-folder.js')

const questions = [
  whichAnswerspace,
  sourceFolder,
  distFolder,
  templateLocation,
  whichFramework
]

function init () {
  return prompt.prompt(configExists)
                .catch((err) => err.code === 'ENOENT' ? Promise.resolve({overwrite: true}) : Promise.reject(err))
                .then((answers) => {
                  if (answers.overwrite === false) {
                    return Promise.reject(new Error('cancelled'))
                  }

                  return prompt.prompt(questions)
                })
}

module.exports = init