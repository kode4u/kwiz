# Fix: npm ci Error - Missing package-lock.json

## Problem

Error: `The npm ci command can only install with an existing package-lock.json`

The `npm ci` command requires a `package-lock.json` file for reproducible builds.

## Solution ✅

The `package-lock.json` file has been generated and the Dockerfile has been updated.

## What Was Fixed

1. ✅ Generated `package-lock.json` by running `npm install` locally
2. ✅ Updated Dockerfile to use `npm ci --omit=dev` (now that lock file exists)
3. ✅ The lock file should be committed to the repository

## If You Encounter This Again

If the error occurs again, it means `package-lock.json` is missing. To fix:

```powershell
cd websocket-server
npm install
```

This will generate the `package-lock.json` file.

## Alternative: Use npm install

If you prefer not to use `npm ci`, you can change the Dockerfile to:

```dockerfile
RUN npm install --omit=dev
```

However, `npm ci` is recommended for production builds because:
- Faster installation
- More reliable (fails if package.json and lock file don't match)
- Reproducible builds

## Verifying Fix

Check that `package-lock.json` exists:
```powershell
Test-Path websocket-server/package-lock.json
```

Should return: `True`

## Next Steps

1. **Commit the lock file** (if using git):
   ```powershell
   git add websocket-server/package-lock.json
   git commit -m "Add package-lock.json for websocket-server"
   ```

2. **Rebuild the Docker image**:
   ```powershell
   docker-compose build websocket-server
   docker-compose up -d
   ```

---

**Status**: ✅ Fixed - package-lock.json generated and Dockerfile updated

