for dir in aws/layer/*; do
  (cd "$dir" && npm install && tsc ./*.ts)
done

for dir in aws/lambda/*; do
  (cd "$dir" && npm install && npx tsc ./index.ts)
done
