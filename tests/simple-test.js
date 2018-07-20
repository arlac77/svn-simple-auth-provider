import test from 'ava';
import { join } from 'path';
import { SvnSimpleAuthProvider } from '../src/svn-simple-auth-provider';
import { URL } from 'url';

test('has values', async t => {
  const authProvider = new SvnSimpleAuthProvider();

  const credentials = await authProvider.provideCredentials({
    url: new URL(
      'https://subversion.assembla.com/svn/delivery_notes/!svn/rvr/1487/data/environments.json'
    ),
    Basic: { realm: 'Assembla Restricted Area' }
  });

  t.is(credentials.user, 'arlac77');
});
