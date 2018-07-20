import { join } from 'path';
import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { reader } from 'kv-reader';

/**
 */
export class SvnSimpleAuthProvider {
  async provideCredentials(realm) {
    const fileName = join(
      process.env.HOME,
      '.subversion',
      'auth',
      'svn.simple',
      createHash('md5')
        .update(`<${realm.url.origin}:443> ${realm.Basic.realm}`)
        .digest('hex')
    );

    const kv = await reader(createReadStream(fileName, { encoding: 'utf-8' }));

    console.log(kv);
    //console.log(kv instanceof Map);

    const passtype = kv.passtype;
    switch (passtype) {
      default:
      case 'keychain':
        console.log(`Unsupported passtype ${passtype}`);
        break;
    }

    return {
      user: kv.username
    };
  }
}
