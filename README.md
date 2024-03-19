# Pact-Demo

Working example of pact.io contract testing using nodejs

# Install dependencies

For both /consumer and /provider run `npm install`

# Generate the contract (consumer)

From the project root, run: `npm run test:pact --prefix consumer`
Contract will get created in /consumer/pacts

# Valiate contract (provider)

From the project root, run: `npm run test:pact --prefix provider`
