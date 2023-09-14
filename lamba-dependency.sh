for dir in aws/layer/*; do
  (cd "$dir/nodejs" && npm ci && tsc ./*.ts -p ../../../tsconfig.json)
done

for dir in aws/lambda/*; do
  (cd "$dir" && npm ci && npx tsc ./index.ts -p ../../tsconfig.json)
done
