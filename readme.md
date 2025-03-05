Si se quiere ejecutar la api en segundo plano se recomienda utilizar la biblioteca pm2
# npm
npm install -g pm2

```bash
pm2 startup
pm2 save --force
```

Para ver la api ejecutandose en segundo plano
```bash
pm2 list
```

Para detener la api
```bash
pm2 delete ServerAPI
```