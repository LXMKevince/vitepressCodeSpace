import { defineConfig } from 'vitepress'

// https://vitepress.vuejs.org/reference/site-config
export default defineConfig({
  title: "VitePress blog",
  description: "A VitePress blog site",
  lastUpdated: true,
  themeConfig: {
    outlineTitle: '大纲',
    // https://vitepress.vuejs.org/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '工作笔记', link: '/CRM-新建模块/markdown-examples' },
      { text: '功能测试', link: '/test/team' }
    ],

    sidebar: {
      '/CRM-新建模块': [
        {
          text: '文档列表',
          items: [
            { text: 'Markdown Examples', link: '/CRM-新建模块/markdown-examples' },
            { text: 'CRM新建模块', link: '/CRM-新建模块/新建模块组件设计' },
            { text: '路由配置', link: '/CRM-新建模块/router-rules' },
            { text: '插件测试', link: '/CRM-新建模块/plugin-test'}
          ]
        }
      ],
      '/test': [
        {
          text: '测试列表',
          items: [
            { text: 'team', link: '/test/team' },
            { text: 'team1', link: '/test/team2' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/LXMKevince/vitepressCodeSpace' }
    ],

    algolia: {
      appId: '...',
      apiKey: '...',
      indexName: '...'
    },

    carbonAds: {
      code: 'your-carbon-code',
      placement: 'your-carbon-placement'
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
