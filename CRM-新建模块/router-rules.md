# CRM路由规格整理

```ts
'/detail/:id/:tabKey'
'/detail/:customerId',
'/detail/businessChance/:chanceId'
'/add/:id?'
'/form/:id?'
'/detail/:detailId/customer/:customerId'
'/detail/:id/:tab?'
'/detail/:type/:id'
```

新规则：新建不带参数用/add，带参数用查询字符串方式/add?
      编辑不带参数/edit/:id，带参数/edit/:id?
      跳转其他单据新建&编辑，遵循上面结构，需要区别使用相应查询字符传方式

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
        path: '/add?',
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

