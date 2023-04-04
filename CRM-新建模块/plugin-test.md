# 插件测试

在这个例子中，我们使用 `Object.entries(config)` 方法遍历传入的配置对象，然后使用 `attributes.some()` 方法检查 JSX 元素中是否有指定的属性。如果有，我们就使用 `t.jSXAttribute()` 方法创建一个新的 `data-testid` 属性，将属性值设置为配置对象中对应 `key` 的 `value`。

```ts
const { types: t } = require("@babel/core");

module.exports = function ({ types }) {
  return {
    visitor: {
      JSXOpeningElement(path, state) {
        const { node } = path;
        const { attributes } = node;
        const config = state.opts.config || {};
        Object.entries(config).forEach(([key, value]) => {
          if (attributes.some(({ name }) => name && name.name === key)) {
            node.attributes.push(
              t.jSXAttribute(t.jSXIdentifier("data-testid"), t.stringLiteral(value))
            );
          }
        });
      },
    },
  };
};
```

这个插件会在 Vite Dev 模式下对指定的 JSX 文件进行转换，将符合条件的元素加上 data-testid 属性。插件中使用了 Babel 的 transformSync 方法来进行转换，使用了先前编写的 Babel 插件 babelPlugin，并将插件的选项传递给它。

在该插件中增加了 options.config 参数，它是一个对象，包含了需要判断的 key 和对应的 value。同时增加了 options.include 参数，它是一个数组，包含了需要转换的指定 JSX 文件。

```ts
import { Plugin } from 'vite';
import { transformSync } from "@babel/core";
import babelPlugin from "./babelPlugin.js";

interface PluginOptions {
  include?: RegExp[];
  config: Record<string, string>;
}

export default function dataTestPlugin(options: PluginOptions = {}): Plugin {
  const include = options.include || [/\.jsx?$/];
  const { config } = options;

  return {
    name: "data-test-plugin",
    async transform(code, id) {
      if (include.some(reg => reg.test(id))) {
        const result = await transformSync(code, {
          plugins: [[babelPlugin, { config }]]
        });
        return { code: result.code };
      }
    }
  };
}
```

在这个例子中，我们将配置对象 { "data-test": "my-component-title", "data-foo": "bar" } 和指定的 JSX 文件 MyComponent.jsx 传递给插件。如果在 JSX 元素中包含了这些属性，插件就会将 data-testid 属性添加到该元素上，属性值为配置对象中对应的 value。

需要注意的是，为了让插件生效，你需要在 Vite 的配置文件中将它添加到插件列表中。

```ts
// vite.config.js
import dataTestPlugin from "./dataTestPlugin.js";

export default {
  plugins: [
    dataTestPlugin({
      include: ["MyComponent.jsx"],
      config: {
        "data-test": "my-component-title",
        "data-foo": "bar"
      }
    })
  ]
};

```

```ts
// vite-plugin-add-data-test.js

const fs = require('fs');
const { resolve } = require('path');

function readConfigFile(configFile) {
  const configFilePath = resolve(process.cwd(), configFile);
  const config = fs.readFileSync(configFilePath, 'utf-8');
  return JSON.parse(config);
}

function addDataTestPlugin(configFile, fileNames) {
  // console.log('configFile, fileNames', configFile, fileNames);
  let config = {};
  let configContent = {}

  return {
    name: 'add-data-test',
    configResolved(resolvedConfig) {
      // 获取用户指定的配置文件和处理文件名称数组
      config = readConfigFile(configFile);
    },
    async transform(code, id) {
      // 判断当前处理文件是否在处理文件名称数组中
      if (fileNames.includes(id)) {
        // 读取配置文件内容，并存储在插件的上下文中
        configContent = config;
      }
      return code;
    },
    transformIndexHtml(html) {
      console.log('html', html);
      // 判断是否需要添加 data-test 属性
      // const keys = Object.keys(configContent);
      // if (keys.some((key) => html.includes(key))) {
      //   // 遍历所有包含配置文件 key 的标签，为它们添加 data-test 属性
      //   const regex = new RegExp(`(${keys.join('|')})="([^"]+)"`, 'g');
      //   html = html.replace(regex, (match, key, value) => {
      //     return `${match} data-test="${value}"`;
      //   });
      // }
      // console.log('html', html);
      // return html;
      const $ = cheerio.load(html);
      Object.entries(config).forEach(([key, value]) => {
        const selector = `[${key}]`;
        const elements = $(selector);
        if (elements.length === 0) {
          console.warn(`No element matches the selector: ${selector}`);
        } else {
          elements.attr('data-test', value);
        }
      });
      return $.html();
    },
  };
}

module.exports = addDataTestPlugin;

```