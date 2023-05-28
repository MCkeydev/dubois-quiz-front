module.exports = {
	'env': {
		'browser': true,
		'es2021': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended'
	],
	'overrides': [
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	'plugins': [
		'react',
		'@typescript-eslint'
	],
	'rules': {
		'indent': 0,
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single',
			{ 'avoidEscape': true }
		],
		'semi': [
			'error',
			'always'
		],
		"react/jsx-curly-brace-presence": ['error', { props: "never", children: "never", "propElementValues": "always" }],
		'newline-before-return': [1],
		'eol-last': ["error", "always"],
		"object-property-newline": 1,
	},
	'settings': {
		'react': {
			'version': 'detect',
		}
	}
};
