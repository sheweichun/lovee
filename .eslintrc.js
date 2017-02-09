/* eslint quotes: false*/
module.exports = {
  "settings": {
    //用于支持webpack定义的别名 (需要安装 eslint-plugin-import 和 eslint-import-resolver-webpack 插件)
    "import/resolver": "webpack"
  },
  "env": {
    "browser": true,
    "node": false,
    "es6": true,
    "mocha": false,
    "jest": false,
    "commonjs": true,
    "amd": true,
  },
  "plugins": [
    "react", // 插件地址 https://github.com/yannickcr/eslint-plugin-react
    "import" // 插件地址 https://github.com/benmosher/eslint-plugin-import
  ],
  "parserOptions": { // 基于 eslint@2.x
    "sourceType": "module",
    "ecmaVersion": 6,
    "ecmaFeatures": {
      "jsx": true // 迁移说明: http://eslint.org/docs/user-guide/migrating-to-2.0.0
    }
  },
  "parser": "babel-eslint",
  "ecmaFeatures": {
    "arrowFunctions": true, // 是否支持箭头函数
    "blockBindings": true, // 是否支持 let 和 const
    "classes": true, // 是否支持 class
    "defaultParams": true, // 是否支持
    "destructuring": true, // 是否支持对象析构
    "forOf": true, // 是否支持 for-of 语法
    "objectLiteralComputedProperties": true, // 是否支持 计算属性名称 var lastName = "last name"; person[lastName] = "Zakas";
    "objectLiteralShorthandMethods": true, // 是否支持缩短方法名 sayName: function() { => sayName() {
    "objectLiteralShorthandProperties": true, // 是否支持缩短对象名 name: name, => name,
    "spread": true, // 是否支持 spread
    "superInFunctions": true, // 是否支持函数里调用 super
    "templateStrings": true // 是否支持 ES6 模板语法
  },
  "globals": {
    "Lovee": true,
    "LoveeCanvas": true,
    "LoveeImage": true,
    "LoveeSvg": true,
    "__webpack_public_path__": true,
    "CFG": true, // VM配置全局变量
    "_": true, // lodash 全局变量
    "KISSY": false,
    "__dirname": true,
    "process": true,
    "TB": false,
    "JSTracker": false,
    "JSTracker2": false,
    "$": false, // Kimi 全局变量
    "goldlog": true, // 黄金令箭
    "WindVane": false, // 手淘环境
  },
  "rules": {
    // ES6 规则
    // http://gitlab.alibaba-inc.com/specs/style-guide/issues/50#96
    "prefer-const": 0,
    "no-const-assign": 2,
    "no-class-assign": 2,
    "no-dupe-class-members": 2,
    "rest-spread-spacing": 2,
    "no-duplicate-imports": 2,
    "no-useless-rename": 2,
    "arrow-spacing": 2,
    "no-useless-computed-key": 2,
    "template-curly-spacing": 2,
    "generator-star-spacing": [1, {"before": false, "after": true}],
    "yield-star-spacing": [1, {"before": false, "after": true}],
    /**
     * 最佳实践
     */
    "strict": [0, "global"],
    "global-strict": [0, "always"], // deprecated rule, 忽略，采用上面规则限制
    "no-extra-strict": 0,
    "no-shadow": 1, // 局部变量和外层变量重名
    "no-unused-vars": [1, { // 局部变量未使用
      "vars": "local",
      "args": "after-used",
      "varsIgnorePattern": "createElement"
    }],
    "no-undef": 2, // 未定义的变量
    "no-unused-expressions": 1, // 未使用的表达式
    "no-use-before-define": 0, // 允许定义前使用
    "yoda": 0,
    "eqeqeq": 0,
    "no-new": 0, // 允许 new 创建的对象没有被引用
    "consistent-return": 0, // 允许没有 return
    "dot-notation": [2, { // 操作对象属性时，优先使用 . 操作
      "allowKeywords": true
    }],
    "no-extend-native": 2, // 禁止通过 prototype 给原生对象增加额外方法。
    "no-native-reassign": 2, // 阻止复写内置类型
    "no-return-assign": 2, // 是否允许 return 返回表达式
    "no-constant-condition": [2, {
      "checkLoops": false
    }], // 提示拒绝使用已经明确意义的判断条件 if (true)
    "max-len": [
      1,
      100,
      2, {
        "ignoreComments": true,
        "ignoreUrls": true
      }
    ],

    "no-caller": 2,
    "no-loop-func": 1,

    // nodejs 环境规则
    //"no-console": 1, // 代码禁止出现 console
    "no-catch-shadow": 2, // try catch 捕获的变量名禁止重名定义
    "no-new-require": 0, // require 前面是否能添加 new
    "no-mixed-requires": [0, false], // 是否合并 var requires
    "no-path-concat": 0, // 是否可以自行拼接 path 还是必须要引用 path 模块
    "handle-callback-err": 0, // 代码里面是否有处理 err 的逻辑？

    /**
     * 代码风格
     */
    "no-empty": 0, // 允许空 block 语句
    "indent": [2, 2, { // 缩进
      "SwitchCase": 1
    }],
    "camelcase": [1, { // 驼峰，同时检查属性名
      "properties": "always"
    }],
    "quotes": [2, "single", "avoid-escape"], // 引号，强制使用单引号
    "brace-style": [2, "1tbs", {
      "allowSingleLine": false
    }],
    "comma-spacing": [2, { // 逗号空格
      "before": false,
      "after": true
    }],
    "comma-style": [2, "last"], // 逗号风格
    "eol-last": 0, // 最后留一行空行
    "func-names": 0, // 是否所有函数必须命名
    "new-cap": [1, { // 类名首字母大写
      "newIsCap": true
    }],
    "key-spacing": [2, { // object 的 key value ：的前后空格
      "beforeColon": false,
      "afterColon": true
    }],
    "no-multi-spaces": 2, // 表达式中是否允许多个空格
    "no-multiple-empty-lines": 0, // 是否允许多行空格
    "no-nested-ternary": 0, // 是否禁止三目运算
    "no-new-object": 2, // 禁止 new Object()
    "no-spaced-func": 2, // 函数与括号的空格
    "no-trailing-spaces": 0, // 是否允许末尾有空格
    "no-extra-parens": [1, "functions"], // "no-wrap-func": 1, 禁止额外的括号 允许括号内是方法
    "no-underscore-dangle": 0, // 允许任意使用下划线
    "one-var": [1, "never"], // 定义变量一行一个
    "padded-blocks": [0, "never"], // 块代码上下不能留空行
    "semi": 2, // 校验分号
    "semi-spacing": 2, // 分号后面留空
    "keyword-spacing": 2, // 关键词后面加空格
    "space-before-blocks": 2, // 块级代码加空格
    "space-before-function-paren": [2, "never"], // 函数名与括弧之间空格
    "space-infix-ops": 2, // 操作符之间的空格
    "spaced-comment": [1, "always", {
      "line": {
        "markers": ["/"],
        "exceptions": ["-", "+"]
      },
      "block": {
        "markers": ["!"],
        "exceptions": ["*"],
        "balanced": true
      }
    }], // 注释斜线后面是否需要空格

    /**
     * React JSX 规范
     */
    "react/display-name": 0, // 是否显示 Component 名称
    "react/jsx-boolean-value": [0, "always"], // 传递布尔值时是否明确支持
    "jsx-quotes": [2, "prefer-double"], // jsx 属性值用双引号
    "react/jsx-no-undef": 2, // 判断 jsx 是否已经定义
    "react/jsx-sort-props": 0, // 是否排序 props
    "react/jsx-sort-prop-types": 0, // 是否排序 prop types
    "react/jsx-uses-react": 2, // 组件中中是否用了 react
    "react/jsx-uses-vars": 2, // 定义了 jsx component 没有使用
    "react/no-did-mount-set-state": 0, // 不要在 componentDidMount 里面设置 state
    "react/no-did-update-set-state": 0, // 同上
    "react/no-multi-comp": 0, // 一个文件里面禁止声明多个 component
    "react/no-unknown-property": 2, // 检查 class、for 属性是否转义
    "react/prop-types": 0, // 不强制设置 proptypes
    "react/react-in-jsx-scope": 1, // 查看 jsx 是否引入 react
    "react/self-closing-comp": 2, // 检查是否有没有 children 的非子闭合标签
    "react/jsx-wrap-multilines": 1, // 不强制 return 的时候，结构的格式
    "react/sort-comp": [0, { // 不强制 createClass 属性的排序
      "order": [
        "lifecycle",
        "/^on.+$/",
        "/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/",
        "everything-else",
        "/^render.+$/",
        "render"
      ]
    }]
  }
};
