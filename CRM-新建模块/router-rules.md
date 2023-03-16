# CRM路由规格整理

## 单页面

```ts
{
  path: '/a',
  component: lazy( () => import( '@/pages/a' ) )  // 路由懒加载
},

```

## 有子页面的情况

```ts
{
    path: '/b',
    exatc: false, // 有子路由的情况下需要设置为false
    children: [
      {
        path: '/',
        component: lazy( () => import( '@/pages/b' ) )
      },
      // 详情
      {
        path: '/detail:id',
        component: lazy( () => import( '@/pages/b/detail' ) )
      },
      // 新建
      {
        path: '/add/:id?',
        component: lazy( () => import( '@/pages/b/add' ) )
      },
      // 编辑
       {
        path: '/edit/:id?',
        component: lazy( () => import( '@/pages/b/add' ) )
      },
    ]
  }

```

