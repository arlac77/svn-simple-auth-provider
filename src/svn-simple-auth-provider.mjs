import { join } from 'path';
import { createReadStream } from 'fs';
import { reader } from 'kv-reader';

/**
 */
export SvnSimpleAuthProvider {

  async provideCredentials(realm)
  {
    const fileForReam = '77f89936954f5731001c65472f2488b7';

    const fileName = join(process.env.HOME,'.subversion','auth','svn.simple',fileForRealm);

    const kv = await reader(
      createReadStream(fileName,{encoding: 'utf-8'})
    );

    const passtype = kv.get('passtype');
    switch(passtype) {
      default:
      case 'keychain':
        console.log(`Unsupported passtype ${passtype}`);
        return undefined;
      break;
    }

    return {
      user: kv.get('username'),
    }
  }
}
