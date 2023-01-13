# Eat this

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

- `pnpm dev`
