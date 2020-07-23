#!/usr/bin/env bash
echo '====rm======'
rm -rf dist.zip

zip dist.zip -r ../sanya-website/* -x "../sanya-website/node_modules/*"
echo 'upload...'
scp -r dist.zip sanyaWebsite@115.29.214.59:/home/sanyaWebsite/

echo 'upload success...'
