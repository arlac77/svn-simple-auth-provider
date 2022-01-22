import test from "ava";
import { join } from "path";

import { SvnSimpleAuthProvider } from "svn-simple-auth-provider";

test("default realm Dir", t => {
  const authProvider = new SvnSimpleAuthProvider();

  t.is(
    authProvider.realmDirectory,
    join(process.env.HOME, ".subversion", "auth", "svn.simple")
  );
});

test("given realm Dir", t => {
  const authProvider = new SvnSimpleAuthProvider({ realmDirectory: "/tmp" });

  t.is(authProvider.realmDirectory, "/tmp");
});

test("has values", async t => {
  const authProvider = new SvnSimpleAuthProvider({
    realmDirectory: new URL("fixtures", import.meta.url).pathname
  });

  const credentials = await authProvider.provideCredentials({
    url: new URL(
      "https://subversion.assembla.com/svn/delivery_notes/!svn/rvr/1487/data/environments.json"
    ),
    Basic: { realm: "Assembla Restricted Area" }
  });

  t.is(credentials.user, "arlac77");
});
