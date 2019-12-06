module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
		"no-alert": 0,//禁止使用alert confirm prompt
		"no-else-return": 2,//如果if语句里面有return,后面不能跟else语句
		"no-eq-null": 2,//禁止对null使用==或!=运算符
		"arrow-parens": 0,//箭头函数用小括号括起来
		"generator-star-spacing": 0,//生成器函数*的前后空格
		"indent": [2, 2],//缩进风格
		"eqeqeq": 2,//必须使用全等
		'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
		
		"linebreak-style": [0, "windows"],//换行风格
		"no-multi-spaces": 1,//不能用多余的空格
		"no-multiple-empty-lines": [1, {"max": 2}],//空行最多不能超过2行
		"no-undef": 0,//不能有未定义的变量
		"no-undef-init": 2,//变量初始化时不能直接给它赋值为undefined
		"no-throw-literal": 2,//禁止抛出字面量错误 throw "error";
		"no-trailing-spaces": 1,//一行结束后面不要有空格
		"no-unused-vars": [2, {"vars": "all", "args": "after-used"}],//不能有声明后未被使用的变量或参数
		"no-use-before-define": 2,//未定义前不能使用
    }
};