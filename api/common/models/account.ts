import { PersistedModel, RoleMapping } from "loopback";
import { LoopbackError } from "../helpers/error";
import { HttpContext, PersistedModelStatic } from "../helpers/loopback";
import { Account, AccountToken } from "../../codegen/api/fetch/api";

module.exports = function (Account: any) {
  const validateEmail = async () => {
    Account.validatesUniquenessOf("email", { message: "Email is not unique" });
  };

  const setAccountRole = async (ctx: HttpContext<Account>, acc: any) => {
    try {
      const AccountToken = Account.app.models
        .AccountToken as PersistedModelStatic<AccountToken>;
      const tokenId = (ctx.req.accessToken && ctx.req.accessToken.id) || "0";
      const token = await AccountToken.findById(tokenId as any, {});

      if (!token) {
        return new LoopbackError("Token invalid", 401, "AUTHORIZATION");
      }
      const Role = Account.app.models.Role;
      Role.getRoles(ctx, (error: any, roles: string[]) => {
        // console.log('User req role', roles);
        if (error) {
          return new LoopbackError("Role invalid", 401, "AUTHORIZATION");
        }
        if (roles[0] !== "1" && roles[0] !== "2") {
          return new LoopbackError("Permission error", 401, "AUTHORIZATION");
        }
      });

      const account: any = acc;
      // console.log('Account create', account);
      if (!account) {
        throw new Error("Account is empty");
      }
      const RoleModel = (Account as any).app.models
        .Role as typeof PersistedModel;

      await RoleMapping.destroyAll({
        principalType: "USER",
        principalId: account.id,
      });
      const rolePartner = await RoleModel.findOne({
        where: {
          name:
            account.kind === "SUPERADMIN"
              ? "SUPERADMIN"
              : account.kind === "ADMIN"
              ? "ADMIN"
              : account.kind === "MANAGER"
              ? "MANAGER"
              : "USER",
        },
      });

      await RoleMapping.create({
        principalType: "USER",
        principalId: account.id,
        roleId: rolePartner.id,
      });
    } catch (e) {
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
