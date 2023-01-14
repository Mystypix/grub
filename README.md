# Eat this

This project have two purposes. It serves as a project which should mimic real flow in tech product company as form of mentoring and preparing for future carier of @karfous (and hopefully easier entrance to the development world). Second puprouse is to use the application in real life to ease the decision making what to cook and eat.

## Repository setup

- `npm install -g pnpm`

Note: you can add alias to the terminal config (`.bashrc`, `.zshrc...`) like `alias pn=pnpm` in order to type less...

- `pnpm install`

### Mac os

- `brew install gnupg`
- `brew install dopplerhq/cli/doppler`
- `doppler login` (Ask admin to add you to the project)
- `doppler setup` (Y)

### Windows

- `mkdir -p $HOME/bin`
- `curl -Ls --tlsv1.2 --proto "=https" --retry 3 https://cli.doppler.com/install.sh | sh -s -- --install-path $HOME/bin`
- `winpty doppler login` (Ask admin to add you to the project)
- `doppler setup` (Y)

## How to run dev

- `pnpm run dev`

## Development workflow

Development should be happening on the `develop` branch. `main` branch serves as production and is forbiden to push there directly except hotfixes

- `git checkout develop`
- `git checkout -b 'name-of-your-branch'`
- make your changes
- create commit(s)
- make a pull request

Note: There are automatic end 2 end tests running, when the PR is created or updated

Once the PR is approved and all tests are passing, you can merge it.

## Realease to production

Currently we have CI/CD enabled. Once PR is merged to the develop, it will be merged to the main branch. In case of incident, it will be disabled until issue is resolved and commit which cause the issue should be reverted.
