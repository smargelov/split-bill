import globals from 'globals'
import js from '@eslint/js'
import ts from 'typescript-eslint'
import vue from 'eslint-plugin-vue'
import prettier from 'eslint-plugin-prettier/recommended'

export default [
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
	},

	// js
	js.configs.recommended,
	{
		rules: {
			'no-unused-vars': 'off',
			'no-undef': 'off',
			'no-console': 'warn',
			'no-irregular-whitespace': 'off',
		},
	},

	// ts
	...ts.configs.recommended,
	{
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_',
				},
			],
			'@typescript-eslint/no-explicit-any': 'error',
			'@typescript-eslint/ban-types': 'error',
			'@typescript-eslint/consistent-indexed-object-style': 'error',
			'@typescript-eslint/consistent-type-imports': [
				'error',
				{ fixStyle: 'separate-type-imports' },
			],
			'@typescript-eslint/func-call-spacing': 'error',
			'@typescript-eslint/no-inferrable-types': 'error',
			'@typescript-eslint/no-non-null-assertion': 'error',
			'@typescript-eslint/array-type': 'error',
		},
	},

	// vue
	...vue.configs['flat/recommended'],
	{
		files: ['*.vue', '**/*.vue'],
		languageOptions: {
			parserOptions: {
				parser: ts.parser,
			},
		},
	},
	{
		rules: {
			'vue/no-unused-vars': 'error',
			'vue/html-indent': ['error', 'tab'],
			'vue/multi-word-component-names': 'off',
			'vue/component-api-style': ['error', ['script-setup', 'composition']],
			'vue/singleline-html-element-content-newline': 'off',
			'vue/max-attributes-per-line': [
				'error',
				{
					singleline: {
						max: 3,
					},
				},
			],
			'vue/component-name-in-template-casing': [
				'error',
				'kebab-case',
				{
					registeredComponentsOnly: false,
					ignores: [],
				},
			],
			'vue/attributes-order': [
				'error',
				{
					order: [
						'DEFINITION',
						'LIST_RENDERING',
						'CONDITIONALS',
						'RENDER_MODIFIERS',
						'GLOBAL',
						['UNIQUE', 'SLOT'],
						'TWO_WAY_BINDING',
						'OTHER_DIRECTIVES',
						'ATTR_DYNAMIC',
						'ATTR_STATIC',
						'ATTR_SHORTHAND_BOOL',
						'EVENTS',
						'CONTENT',
					],
					alphabetical: false,
				},
			],

			'vue/attribute-hyphenation': ['error', 'always'],
			'vue/v-on-event-hyphenation': ['error', 'always', { autofix: true }],
			'vue/no-v-html': 'off',

			'vue/block-lang': ['error', { script: { lang: 'ts' } }],
			'vue/block-order': ['error', { order: ['template', 'script[setup]', 'style[scoped]'] }],
			'vue/custom-event-name-casing': ['error', 'kebab-case'],
			'vue/define-emits-declaration': 'error',
			'vue/define-macros-order': [
				'error',
				{
					order: [
						'defineOptions',
						'defineModel',
						'defineProps',
						'defineEmits',
						'defineSlots',
					],
					defineExposeLast: true,
				},
			],
			'vue/enforce-style-attribute': ['error', { allow: ['scoped'] }],
			'vue/define-props-declaration': 'error',
			'vue/html-button-has-type': 'error',
			'vue/no-multiple-objects-in-class': 'warn',
			'vue/no-root-v-if': 'error',
			'vue/no-template-target-blank': 'error',
			'vue/no-undef-components': 'off',
			'vue/no-undef-properties': 'warn',
			'vue/no-unused-refs': 'warn',
			'vue/no-use-v-else-with-v-for': 'error',
			'vue/no-useless-mustaches': 'warn',
			'vue/no-useless-v-bind': 'warn',
			'vue/no-v-text': 'error',
			'vue/padding-line-between-blocks': 'warn',
			'vue/prefer-define-options': 'error',
			'vue/prefer-separate-static-class': 'warn',
			'vue/prefer-true-attribute-shorthand': 'warn',
			'vue/require-macro-variable-name': 'error',
			'vue/require-typed-ref': 'warn',
			'vue/v-for-delimiter-style': 'error',
			'vue/valid-define-options': 'error',
		},
	},

	// prettier
	prettier,
	{
		rules: {
			'prettier/prettier': 'warn',
		},
	},

	// Overrides for specific files
	{
		files: ['src/App.vue'],
		rules: {
			'vue/enforce-style-attribute': 'off',
		},
	},
]
