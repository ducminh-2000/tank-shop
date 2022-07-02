"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loopback_1 = require("loopback");
const error_1 = require("../helpers/error");
module.exports = function (Account) {
    const validateEmail = async () => {
        Account.validatesUniquenessOf("email", { message: "Email is not unique" });
    };
    const setAccountRole = async (ctx, acc) => {
        try {
            const AccountToken = Account.app.models
                .AccountToken;
            const tokenId = (ctx.req.accessToken && ctx.req.accessToken.id) || "0";
            const token = await AccountToken.findById(tokenId, {});
            if (!token) {
                return new error_1.LoopbackError("Token invalid", 401, "AUTHORIZATION");
            }
            const Role = Account.app.models.Role;
            Role.getRoles(ctx, (error, roles) => {
                // console.log('User req role', roles);
                if (error) {
                    return new error_1.LoopbackError("Role invalid", 401, "AUTHORIZATION");
                }
                if (roles[0] !== "1" && roles[0] !== "2") {
                    return new error_1.LoopbackError("Permission error", 401, "AUTHORIZATION");
                }
            });
            const account = acc;
            // console.log('Account create', account);
            if (!account) {
                throw new Error("Account is empty");
            }
            const RoleModel = Account.app.models
                .Role;
            await loopback_1.RoleMapping.destroyAll({
                principalType: "USER",
                principalId: account.id,
            });
            const rolePartner = await RoleModel.findOne({
                where: {
                    name: account.kind === "SUPERADMIN"
                        ? "SUPERADMIN"
                        : account.kind === "ADMIN"
                            ? "ADMIN"
                            : account.kind === "MANAGER"
                                ? "MANAGER"
                                : "USER",
                },
            });
            await loopback_1.RoleMapping.create({
                principalType: "USER",
                principalId: account.id,
                roleId: rolePartner.id,
            });
        }
        catch (e) {
            console.log("Method Error", e);
            throw new Error("Method error");
        }
    };
    // remote method after hook
    Account.afterRemote("create", validateEmail);
    Account.afterRemote("create", setAccountRole);
    Account.afterRemote("prototype.patchAttributes", validateEmail);
    Account.afterRemote("prototype.patchAttributes", setAccountRole);
};
//# sourceMappingURL=account.js.map