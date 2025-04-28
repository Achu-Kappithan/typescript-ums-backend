
import jwt from 'jsonwebtoken'

const JWT_SECRE = process.env.JWT_SECRE || 'AiBV54oimJOtm1HV'
const JWT_EXPIRES_IN = '1h'; 

export function generateToken(payload:object):string{
    return jwt.sign(payload, JWT_SECRE,{expiresIn: JWT_EXPIRES_IN})
}