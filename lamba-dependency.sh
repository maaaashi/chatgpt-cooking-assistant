for dir in aws/layer/*; do
  (cd "$dir" && npm ci && tsc ./*.ts)
done

for dir in aws/lambda/*; do
  (cd "$dir" && npm ci && npx tsc ./index.ts)
done
