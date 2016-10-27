  function {{moduleName}}AddController ($scope, {{moduleName}}Model) {
    // the form model
    this.model = {{moduleName}}Model || {}

    // lifecycle functions
    this.$onInit = () => true
    this.$onChanges = (changesObj) => true
    this.$doCheck = () => true
    this.$onDestroy = () => true
    this.$postLink = () => true

    this.save = (model) => console.log('i am saving ', model)

    const textboxContainsShow = () => ($scope.simple_form_add.textbox.$modelValue || '').indexOf('show') > -1

    this.textboxContainsShow_choiceIsChoice1_checkboxIsChecked = function () {
      const result = textboxContainsShow()
      return result
    }
  }

  angular.module('{{moduleName}}').component('{{moduleName}}Add', {
    templateUrl: '../templates/{{name}}_add.html',
    controller: {{moduleName}}AddController,
    bindings: {
      model: '=?'
    }
  })
