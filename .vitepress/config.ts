import { defineConfig } from 'vitepress'

// https://vitepress.vuejs.org/reference/site-config
export default defineConfig({
  title: "VitePress blog",
  description: "A VitePress blog site",
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.vuejs.org/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '工作笔记', link: '/markdown-examples' },
      { text: '功能测试', link: '/team' }
    ],

    sidebar: [
      {
        text: '文档列表',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'CRM新建模块', link: './CRM-新建模块/新建模块组件设计' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/LXMKevince/vitepressCodeSpace' }
    ],

    algolia: {
      appId: '...',
      apiKey: '...',
      indexName: '...'
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present Xinmin L'
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    }
  }
})
