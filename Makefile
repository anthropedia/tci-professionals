deploy:
	ssh tci 'source ~/.profile && \
		cd ~/tci/professionals && \
		git fetch origin ${branch} && \
		git checkout master && \
		git reset --hard FETCH_HEAD && \
		npm i && \
		npm run build'
