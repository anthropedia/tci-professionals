deploy:
	ssh tci 'source ~/.profile && cd ~/tci/professionals && git reset --hard HEAD^ && git pull && npm update --no-save && npm run build'
