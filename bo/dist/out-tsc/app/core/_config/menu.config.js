var MenuConfig = /** @class */ (function () {
    function MenuConfig() {
        this.defaults = {
            aside: {
                self: {},
                items: [
                    {
                        title: 'Quản lý đơn hàng quốc tế',
                        root: true,
                        icon: 'fas fa-plane-departure',
                        page: '/foreign-bill',
                        translate: 'Quản lý tracking quốc tế',
                        bullet: 'dot',
                    },
                    {
                        title: 'Quản lý đơn hàng nội địa',
                        root: true,
                        icon: 'fas fa-file-invoice',
                        page: '/bill',
                        translate: 'Quản lý tracking nội địa',
                        bullet: 'dot',
                    },
                    {
                        title: 'Quản lý kho',
                        icon: 'fas fa-store',
                        translate: 'Quản lý kho',
                        bullet: 'dot',
                        page: '/store/list',
                        // submenu: [
                        //   {
                        //     title: 'Danh sách kho',
                        //     icon: '',
                        //     page: '/store/list',
                        //     translate: 'Danh sách kho',
                        //   },
                        //   {
                        //     title: 'Nhập kho',
                        //     icon: '',
                        //     page: '/store/import',
                        //     translate: 'Nhập kho',
                        //   },
                        //   {
                        //     title: 'Xuất kho',
                        //     icon: '',
                        //     page: '/store/export',
                        //     translate: 'Xuất kho',
                        //   },
                        // ],
                    },
                    {
                        title: 'Quản lý trạng thái',
                        root: true,
                        icon: 'fas fa-check',
                        page: '/status',
                        translate: 'Quản lý trạng thái',
                        bullet: 'dot',
                    },
                    {
                        title: 'Quản lý khách hàng',
                        root: true,
                        icon: 'fas fa-user',
                        page: '/user',
                        translate: 'Quản lý khách hàng',
                        bullet: 'dot',
                    },
                    {
                        title: 'Quản lý tên hãng ký gửi',
                        root: true,
                        icon: 'fas fa-truck',
                        page: '/ship-brand',
                        translate: 'Quản lý tên hãng ký gửi',
                        bullet: 'dot',
                    },
                    // {
                    //   title: 'Quản lý người gửi',
                    //   root: true,
                    //   icon: 'fas fa-dolly',
                    //   page: '/shipper',
                    //   translate: 'Quản lý người gửi',
                    //   bullet: 'dot',
                    // },
                    // {
                    //   title: 'Quản lý nhóm trạng thái',
                    //   root: true,
                    //   icon: 'fas fa-layer-group',
                    //   page: '/status-group',
                    //   translate: 'Quản lý nhóm trạng thái',
                    //   bullet: 'dot',
                    // },
                    {
                        title: 'Quản lý tài khoản',
                        root: true,
                        icon: 'fa fa-users',
                        page: '/account',
                        translate: 'Quản lý tài khoản',
                        bullet: 'dot',
                    },
                ],
            },
        };
    }
    Object.defineProperty(MenuConfig.prototype, "configs", {
        get: function () {
            return this.defaults;
        },
        enumerable: false,
        configurable: true
    });
    return MenuConfig;
}());
export { MenuConfig };
//# sourceMappingURL=menu.config.js.map