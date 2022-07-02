"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (app) {
    const withoutId = (it) => Object.assign({}, it, { id: undefined });
    const automigrate = (dataSource) => (model) => {
        return new Promise((resolve, reject) => {
            app.dataSources[dataSource].automigrate(model, function (err) {
                if (err) {
                    return reject(err);
                }
                resolve(app.models[model]);
            });
        });
    };
    const autoupdate = (dataSource) => (model) => {
        return new Promise((resolve, reject) => {
            app.dataSources[dataSource].autoupdate(model, function (err) {
                if (err) {
                    return reject(err);
                }
                resolve(app.models[model]);
            });
        });
    };
    (async () => {
        const [ACL, RoleMapping, Role, Account] = await Promise.all([
            "ACL",
            "RoleMapping",
            "Role",
            "Account",
            "Tank",
            "FlowOut"
        ]
            //     .map(
            //       process.env.NODE_ENV === "production"
            //         ? autoupdate("mysql")
            //         : automigrate("mysql")
            //     )
            // );
            .map(autoupdate("mysql")));
        const [AccountToken] = await Promise.all(["AccountToken"].map(autoupdate("mysql")));
        if (process.env.NODE_ENV === "production") {
            return;
        }
        console.log("Seeding start...");
        // const allRoles: Role[] = [];
        // const roles: Role[] = [
        //   { id: 1, name: "SUPERADMIN", description: "" },
        //   { id: 2, name: "ADMIN", description: "" },
        //   { id: 3, name: "MANAGER", description: "" },
        //   { id: 4, name: "USER", description: "" },
        // ];
        // for (const role of roles) {
        //   allRoles.push(await Role.create(withoutId(role)));
        // }
        // const accounts: (Account & { password: string } & any)[] = [];
        // (() => {
        //   accounts.push({
        //     name: "SYSADMIN",
        //     username: `super-admin`,
        //     email: "superadmin@gmail.com",
        //     sex: true,
        //     password: "h8ba_FYQ(q%$[]zK",
        //     phoneNumber: "0972734861",
        //     address: "Ha Noi",
        //     kind: "SUPERADMIN",
        //   });
        //   accounts.push({
        //     name: "ADMIN",
        //     username: `admin`,
        //     email: "admin@gmail.com",
        //     sex: true,
        //     password: "Q5]v!J\\T>?[d4X[6",
        //     phoneNumber: "0972734861",
        //     address: "Ha Noi",
        //     kind: "ADMIN",
        //   });
        // })();
        // for (let account of accounts) {
        //   const item = await Account.create(account);
        //   const roleId = (() => {
        //     switch (item.kind) {
        //       case "SUPERADMIN":
        //         return allRoles[0].id;
        //       case "ADMIN":
        //         return allRoles[1].id;
        //       case "MANAGER":
        //         return allRoles[3].id;
        //       default:
        //         return 5;
        //     }
        //   })();
        //   const roleMappings: RoleMapping = {
        //     principalId: item.id,
        //     principalType: "USER",
        //     roleId: roleId,
        //   };
        //   await RoleMapping.create(roleMappings);
        // }
        console.log("Seeding done !");
    })();
};
//# sourceMappingURL=seed.js.map