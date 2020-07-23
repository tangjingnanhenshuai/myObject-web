#!/usr/bin/env bash

# 删除旧的node_modules
rm -rf node_modules
# 根据package.json重新好安装node_modules
yarn install

echo '====rm======'
rm -rf dist.zip

zip dist.zip -r ../sanya-website/* -x "../sanya-website/node_modules/*"
echo 'upload...'
scp -r dist.zip sanyaWebsite@115.29.214.59:/home/sanyaWebsite/

echo 'upload success...'
