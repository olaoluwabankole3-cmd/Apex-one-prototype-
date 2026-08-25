/**
 * APEX ONE — Cryptography & Security Primitives
 * 
 * Standardized security utilities for:
 * 1. Constant-time password hashing and verification using PBKDF2 with unique salts
 * 2. Cryptographically secure random token generation (crypto.randomBytes)
 * 3. Unique request correlation identifiers
 */

import crypto from "crypto";

const PBKDF2_ITERATIONS = 100000;
const PBKDF2_KEYLEN = 64;
const PBKDF2_DIGEST = "sha512";

export interface PasswordHashResult {
  hash: string;
  salt: string;
}

/**
 * Hash a plaintext password with a cryptographically secure random salt.
 */
export function hashPassword(password: string, existingSalt?: string): PasswordHashResult {
  const salt = existingSalt || crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.pbkdf2Sync(
    password,
    salt,
    PBKDF2_ITERATIONS,
    PBKDF2_KEYLEN,
    PBKDF2_DIGEST
  );
  return {
    hash: derivedKey.toString("hex"),
    salt,
  };
}

/**
 * Constant-time verification of a password against a stored salt and hash.
 * Prevents timing-attack side channels.
 */
export function verifyPassword(password: string, storedHash: string, storedSalt: string): boolean {
  if (!password || !storedHash || !storedSalt) {
    return false;
  }
  const computed = crypto.pbkdf2Sync(
    password,
    storedSalt,
    PBKDF2_ITERATIONS,
    PBKDF2_KEYLEN,
    PBKDF2_DIGEST
  );
  const storedBuffer = Buffer.from(storedHash, "hex");
  if (computed.length !== storedBuffer.length) {
    return false;
  }
  return crypto.timingSafeEqual(computed, storedBuffer);
}

/**
 * Generate a cryptographically secure random session token.
 */
export function generateSecureToken(prefix: string = "apex_tok"): string {
  const randomBytes = crypto.randomBytes(32).toString("base64url");
  return `${prefix}_${randomBytes}`;
}

/**
 * Generate a cryptographically secure request correlation ID.
 */
export function generateSecureRequestId(): string {
  return `req_${crypto.randomUUID()}`;
}
