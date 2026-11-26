import { execSync } from "node:child_process";
const command="aws dynamodb create-table \
  --table-name AiSkinCareDB \
  --attribute-definitions \
    AttributeName=PK,AttributeType=S \
    AttributeName=SK,AttributeType=S \
  --key-schema \
    AttributeName=PK,KeyType=HASH \
    AttributeName=SK,KeyType=RANGE \
  --billing-mode PAY_PER_REQUEST \
  --endpoint-url http://localhost:8000 \
  --region ap-south-1"

const log=execSync(command,{ encoding: 'utf-8' })

console.log(log)