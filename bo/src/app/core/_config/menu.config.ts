export class MenuConfig {
  public defaults: any = {
    aside: {
      self: {},
      items: [
        {
          title: 'Quản lý tài khoản',
          root: true,
          icon: 'fa fa-users',
          page: '/account',
          translate: 'Quản lý tài khoản',
          bullet: 'dot',
        },
        {
          title: 'Quản lý dữ liệu bể xăng',
          root: true,
          icon: 'fa fa-database',
          page: '/tank',
          translate: 'Quản lý dữ liệu bể xăng',
          bullet: 'dot',
        },
        {
          title: 'Quản lý hóa đơn xuất xăng',
          root: true,
          icon: 'fa fa-pencil-square-o',
          page: '/flowout',
          translate: 'Quản lý hóa đơn xuất xăng',
          bullet: 'dot',
        },
        
      ],
    },
  };

  public get configs(): any {
    return this.defaults;
  }
}
