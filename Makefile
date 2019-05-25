deploy:
	ssh tci 'source ~/.profile && cd tci/professionals && git pull && /snap/bin/npm update --no-save && npm run build'
