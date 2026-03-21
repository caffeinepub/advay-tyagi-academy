# Advay Tyagi Academy

## Current State
The site has a working frontend admin panel calling `backendActor.grantPremium` and `backendActor.revokePremium`, but the deployed canister is missing these functions, causing a runtime error: "backendActor.grantPremium is not a function".

## Requested Changes (Diff)

### Add
- Nothing new

### Modify
- Regenerate backend to ensure `grantPremium`, `revokePremium`, `isCallerPremium`, `getAllPremiumUsers`, and `isCallerAdmin` are all correctly exported from the deployed canister.

### Remove
- Nothing

## Implementation Plan
1. Regenerate Motoko backend with all premium access and admin functions properly defined.
2. Ensure frontend bindings match.
3. Deploy.
