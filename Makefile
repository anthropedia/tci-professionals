deploy:
	ssh athens 'source ~/.profile && cd tci/professionals && git pull && npm update --no-save && npm run build'
