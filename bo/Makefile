deploy_pm2:
	ng build --prod --aot
	cp dist/LIHACO-BO/index.html dist/LIHACO-BO/404.html
	rsync -aP --no-o --no-g dist/LIHACO-BO/ vfast@222.252.98.29:Documents/VFAST/bo.chatbot/app
