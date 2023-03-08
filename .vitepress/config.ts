import { defineConfig } from 'vitepress'

// https://vitepress.vuejs.org/reference/site-config
export default defineConfig({
  title: "小民哥的博客",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.vuejs.org/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '工作笔记', link: '/markdown-examples' },
      { text: '前端', link: '/markdown-examples1' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/LXMKevince/vitepressCodeSpace' }
    ]
  }
})
