import { join } from "path";
import { createReadStream } from "fs";
import { createHash } from "crypto";
import { reader } from "kv-reader";

/**
 * @param {Object} options
 * @param {string} options.realmDirectory defaults to HOME/.subversion/auth/simple.auth
 *
 * @property {string} realmDirectory
 */
export class SvnSimpleAuthProvider {
  constructor(options = {}) {
    Object.defineProperties(this, {
      realmDirectory: {
        value:
          options.realmDirectory ||
          join(process.env.HOME, ".subversion", "auth", "svn.simple")
      }
    });
  }

  async provideCredentials(realm) {
    const fileName = join(
      this.realmDirectory,
      createHash("md5")
        .update(`<${realm.url.origin}:443> ${realm.Basic.realm}`)
        .digest("hex")
    );

    const kv = {};

    await reader(
      createReadStream(fileName, { encoding: "utf-8" }),
      (key, value) => (kv[key] = value)
    );

    const passtype = kv.passtype;
    switch (passtype) {
      default:
      case "keychain":
        console.log(`Unsupported passtype ${passtype}`);
        break;
    }

    return {
      user: kv.username
    };
  }
}
