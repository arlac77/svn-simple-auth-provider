import test from 'ava';
import { join } from 'path';
import { SvnSimpleAuthProvider } from '../src/svn-simple-auth-provider';

test('has values', async t => {
  const authProvider = new SvnSimpleAuthProvider();

  const credentials = await authProvider.provideCredentials({ realm: 'xxx' });

  t.is(credentials.user, 'xxxx');
});
