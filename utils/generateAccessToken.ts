import crypto from 'crypto';

function base64ToBase64Url(base64: any) {
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function generateAccessToken() {
    const token = crypto.randomBytes(32).toString('base64');
    const sha256Hash = crypto
        .createHash('sha256')
        .update(token)
        .digest('base64');
    return base64ToBase64Url(sha256Hash);
}
