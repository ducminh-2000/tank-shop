watch:
	tsc-watch --onSuccess "node server/server.js"

watch-debug:
	tsc-watch --onSuccess "node --inspect-brk server/server.js"

codegen: codegen-fetch codegen-angular

codegen-angular:
	# angular
	yes | ./node_modules/.bin/lb-sdk server/server.js codegen/api/angular
codegen-export:
	# def
	lb export-api-def -o codegen/def.yaml
	cd codegen && \
		patch < def.patch

codegen-fetch: codegen-export
	# fetch
	cd codegen && \
		java -jar swagger-codegen-cli-2.2.3.jar generate -i def.yaml -l typescript-fetch -o api/fetch
	sed -i~ -e 's/XAny/any/g' codegen/api/fetch/api.ts
	find codegen/api/fetch -not -name api.ts -delete || true

codegen-jquery: codegen-export
	# jquery
	cd codegen && \
		java -jar swagger-codegen-cli-2.4.12.jar generate -i def.yaml -l typescript-jquery -o api/fetch
	find codegen/api/fetch -not -path "*/model/*" -delete || true

codegen-ts-interface: codegen-export
	# interface
	cd codegen && \
		java -jar swagger-codegen-cli-2.4.12.jar generate -i def.yaml -l typescript-jquery -o api/fetch-interface
	find codegen/api/fetch-interface -not -path "*/model/*" -delete || true

deploy_pm2:
	tsc
	rsync -aP --no-o --no-g  -e 'ssh -Snone' --exclude=node_modules --exclude=.git ./ vfast@222.252.98.29:Documents/VFAST/api.chatbot/app
	ssh vfast@222.252.98.29 'cd ./Documents/VFAST/api.chatbot/app/ && npm i -f && cd .. && pm2 restart ecosystem.config.js --env production'
restart:
	ssh vfast@222.252.98.29 'cd ./Documents/VFAST/api.chatbot/app/ && pm2 restart ecosystem.config.js --env production && pm2 log 1'