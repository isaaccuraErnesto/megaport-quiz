module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  globals: {
    browser: 'readonly',
    assert: 'readonly',
    jest: 'readonly',
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended'],
  rules: {
    /**
     * Bad code that we want to know about
     */
    'block-scoped-var': 'error', // Using a variable outside its declaring block
    'no-param-reassign': 'error', // Don't allow reassignment of function parameters
    'no-return-assign': 'error', // Don't allow assignment in a return statement
    'require-await': 'error', // If it's declared async, then it must have await
    'no-shadow': 'warn', // Warn of variables that are redeclared in enclosed scope (SonarQube treats these as errors) - we will want to tighten this up later
    'no-console': [ // Warn about console.log, console.trace etc.
      'warn',
      { allow: ['info', 'warn', 'error'] },
    ],
    'no-empty': 'error', // No empty block statements
    // 'no-unused-vars': ['error'], // Disallow unused variables
    // 'no-undef': ['error'], // Can't use variables that aren't defined

    /**
     * Usually bad code that we don't want to be warned about
     */
    'no-irregular-whitespace': 'off', // Do not tell us about non-breaking spaces etc (these are included in translations)

    /**
     * Things that will be auto-fixed. These are set up as warnings since they will be fixed on save anyway.
     */
    'space-infix-ops': 'warn', // Ensure spaces around operators (e.g. = signs)
    eqeqeq: 'warn', // Ensure use of === and !==
    'array-bracket-newline': ['warn', { multiline: true }], // Consistent bracket handling, single and multi-line
    'array-bracket-spacing': ['warn', 'never'], // No spaces in array brackets
    'array-element-newline': ['warn', 'consistent'], // Be consistent about multi-line arrays
    'block-spacing': 'warn', // Have spaces in single line code blocks
    'brace-style': ['warn', '1tbs', { allowSingleLine: true }], // One true brace style for multi-line blocks
    'comma-spacing': 'warn', // Put commas immediately after statements
    'comma-style': 'warn', // Make sure commas are on the same line as the element they refer to
    'computed-property-spacing': 'warn', // No spaces inside computed property brackets
    'func-call-spacing': 'warn', // No space before function call parentheses
    'function-call-argument-newline': ['warn', 'consistent'], // Be consistent about newlines for multiple args
    'function-paren-newline': ['warn', 'multiline'], // If you're doing multiline args then parens follow
    'implicit-arrow-linebreak': 'warn', // Arrow functions start on the line the arrow is on
    'arrow-spacing': 'warn', // Space before and after arrow for arrow functions
    'key-spacing': 'warn', // No spacing before : and spacing after : in object keys
    'keyword-spacing': 'warn', // Space before and after keywords
    'new-parens': 'warn', // Constructors with no args still require parens
    'no-lonely-if': 'warn', // No orphan if inside an else block (turned into else if)
    'object-curly-newline': ['warn', { consistent: true }], // Consistent line breaks in object braces
    'object-curly-spacing': ['warn', 'always'], // Spaces in object braces
    'rest-spread-spacing': 'warn', // Make sure the rest spread operator is beside the thing it's spreading
    'no-confusing-arrow': 'warn', // Don't allow code where it's not clear whether it's a function or a comparison
    'no-multi-spaces': 'warn', // Clean up multiple spaces
    'no-var': 'warn', // Use const or let instead of var
    'no-whitespace-before-property': 'warn', // Get rid of whitespace before properties e.g. "foo. bar"
    'prefer-template': 'warn', // Replace concatenation of strings with template literals
    'template-curly-spacing': 'warn', // No spaces inside braces for template literals
    'quote-props': ['warn', 'as-needed'], // Only use quoted property names when required
    quotes: [
      'warn', 'single', { // Single quotes
        avoidEscape: true, // Allow double quotes if single quote would have required escaping
        allowTemplateLiterals: true, // Template literals are also OK
      },
    ],
    'arrow-parens': ['warn', 'as-needed'], // Only use parentheses where required for arrow functions
    indent: [ // Indenting by 2 spaces
      'warn',
      2,
      {
        SwitchCase: 1, // Indent case statements
        ignoredNodes: ['CallExpression > ObjectExpression', 'TemplateLiteral'],
      },
    ],
    semi: ['warn', 'never'], // No semicolons
    'comma-dangle': [ // Commas at the end of lines
      'warn',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    'generator-star-spacing': 'warn', // Space before * in generator functions
    'eol-last': 'warn', // Files end with a newline

    /**
     * Tidy up from the Vue rules
     */
    'vue/first-attribute-linebreak': [
      'error', {
        singleline: 'beside',
        multiline: 'beside',
      },
    ],
    'vue/html-indent': [
      'error', 2, {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: false,
        ignores: [],
      },
    ],
    'vue/html-closing-bracket-newline': [
      'error', {
        singleline: 'never',
        multiline: 'never',
      },
    ],
  },
}
