import { jwtVerify, SignJWT } from 'jose';

const KEY = new TextEncoder().encode(process.env.ENCRYPTION_KEY);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30 min from now')
    .sign(KEY);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, KEY, {
    algorithms: ['HS256'],
  });

  return payload;
}
