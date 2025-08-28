Attempt 1 failed with status 500. Retrying with backoff... ApiError: {"error":{"message":"{\n  \"error\": {\n    \"code\": 500,\n    \"message\": \"An internal error has occurred. Please retry or report in https://developers.generativeai.google/guide/troubleshooting\",\n    \"status\": \"INTERNAL\"\n  }\n}\n","code":500,"status":"Internal Server Error"}}
    at throwErrorIfNotOK (file:///opt/hostedtoolcache/node/20.19.4/x64/lib/node_modules/@google/gemini-cli/node_modules/@google/genai/dist/node/index.mjs:13631:30)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async file:///opt/hostedtoolcache/node/20.19.4/x64/lib/node_modules/@google/gemini-cli/node_modules/@google/genai/dist/node/index.mjs:13422:13
    at async Models.generateContentStream (file:///opt/hostedtoolcache/node/20.19.4/x64/lib/node_modules/@google/gemini-cli/node_modules/@google/genai/dist/node/index.mjs:14763:24)
    at async LoggingContentGenerator.generateContentStream (file:///opt/hostedtoolcache/node/20.19.4/x64/lib/node_modules/@google/gemini-cli/node_modules/@google/gemini-cli-core/dist/src/core/loggingContentGenerator.js:57:22)
    at async retryWithBackoff (file:///opt/hostedtoolcache/node/20.19.4/x64/lib/node_modules/@google/gemini-cli/node_modules/@google/gemini-cli-core/dist/src/utils/retry.js:62:20)
    at async GeminiChat.sendMessageStream (file:///opt/hostedtoolcache/node/20.19.4/x64/lib/node_modules/@google/gemini-cli/node_modules/@google/gemini-cli-core/dist/src/core/geminiChat.js:281:36)
    at async Turn.run (file:///opt/hostedtoolcache/node/20.19.4/x64/lib/node_modules/@google/gemini-cli/node_modules/@google/gemini-cli-core/dist/src/core/turn.js:40:36)
    at async GeminiClient.sendMessageStream (file:///opt/hostedtoolcache/node/20.19.4/x64/lib/node_modules/@google/gemini-cli/node_modules/@google/gemini-cli-core/dist/src/core/client.js:382:26)
    at async runNonInteractive (file:///opt/hostedtoolcache/node/20.19.4/x64/lib/node_modules/@google/gemini-cli/dist/src/nonInteractiveCli.js:37:30) {
  status: 500
}
Attempt 2 failed with status 500. Retrying with backoff... ApiError: {"error":{"message":"{\n  \"error\": {\n    \"code\": 500,\n    \"message\": \"An internal error has occurred. Please retry or report in https://developers.generativeai.google/guide/troubleshooting\",\n    \"status\": \"INTERNAL\"\n  }\n}\n","code":500,"status":"Internal Server Error"}}
    at throwErrorIfNotOK (file:///opt/hostedtoolcache/node/20.19.4/x64/lib/node_modules/@google/gemini-cli/node_modules/@google/genai/dist/node/index.mjs:13631:30)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async file:///opt/hostedtoolcache/node/20.19.4/x64/lib/node_modules/@google/gemini-cli/node_modules/@google/genai/dist/node/index.mjs:13422:13
    at async Models.generateContentStream (file:///opt/hostedtoolcache/node/20.19.4/x64/lib/node_modules/@google/gemini-cli/node_modules/@google/genai/dist/node/index.mjs:14763:24)
    at async LoggingContentGenerator.generateContentStream (file:///opt/hostedtoolcache/node/20.19.4/x64/lib/node_modules/@google/gemini-cli/node_modules/@google/gemini-cli-core/dist/src/core/loggingContentGenerator.js:57:22)
    at async retryWithBackoff (file:///opt/hostedtoolcache/node/20.19.4/x64/lib/node_modules/@google/gemini-cli/node_modules/@google/gemini-cli-core/dist/src/utils/retry.js:62:20)
    at async GeminiChat.sendMessageStream (file:///opt/hostedtoolcache/node/20.19.4/x64/lib/node_modules/@google/gemini-cli/node_modules/@google/gemini-cli-core/dist/src/core/geminiChat.js:281:36)
    at async Turn.run (file:///opt/hostedtoolcache/node/20.19.4/x64/lib/node_modules/@google/gemini-cli/node_modules/@google/gemini-cli-core/dist/src/core/turn.js:40:36)
    at async GeminiClient.sendMessageStream (file:///opt/hostedtoolcache/node/20.19.4/x64/lib/node_modules/@google/gemini-cli/node_modules/@google/gemini-cli-core/dist/src/core/client.js:382:26)
    at async runNonInteractive (file:///opt/hostedtoolcache/node/20.19.4/x64/lib/node_modules/@google/gemini-cli/dist/src/nonInteractiveCli.js:37:30) {
  status: 500
}
Attempt 3 failed with status 500. Retrying with backoff... ApiError: {"error":{"message":"{\n  \"error\": {\n    \"code\": 500,\n    \"message\": \"An internal error has occurred. Please retry or report in https://developers.generativeai.google/guide/troubleshooting\",\n    \"status\": \"INTERNAL\"\n  }\n}\n","code":500,"status":"Internal Server Error"}}
    at throwErrorIfNotOK (file:///opt/hostedtoolcache/node/20.19.4/x64/lib/node_modules/@google/gemini-cli/node_modules/@google/genai/dist/node/index.mjs:13631:30)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async file:///opt/hostedtoolcache/node/20.19.4/x64/lib/node_modules/@google/gemini-cli/node_modules/@google/genai/dist/node/index.mjs:13422:13
    at async Models.generateContentStream (file:///opt/hostedtoolcache/node/20.19.4/x64/lib/node_modules/@google/gemini-cli/node_modules/@google/genai/dist/node/index.mjs:14763:24)
    at async LoggingContentGenerator.generateContentStream (file:///opt/hostedtoolcache/node/20.19.4/x64/lib/node_modules/@google/gemini-cli/node_modules/@google/gemini-cli-core/dist/src/core/loggingContentGenerator.js:57:22)
    at async retryWithBackoff (file:///opt/hostedtoolcache/node/20.19.4/x64/lib/node_modules/@google/gemini-cli/node_modules/@google/gemini-cli-core/dist/src/utils/retry.js:62:20)
    at async GeminiChat.sendMessageStream (file:///opt/hostedtoolcache/node/20.19.4/x64/lib/node_modules/@google/gemini-cli/node_modules/@google/gemini-cli-core/dist/src/core/geminiChat.js:281:36)
    at async Turn.run (file:///opt/hostedtoolcache/node/20.19.4/x64/lib/node_modules/@google/gemini-cli/node_modules/@google/gemini-cli-core/dist/src/core/turn.js:40:36)
    at async GeminiClient.sendMessageStream (file:///opt/hostedtoolcache/node/20.19.4/x64/lib/node_modules/@google/gemini-cli/node_modules/@google/gemini-cli-core/dist/src/core/client.js:382:26)
    at async runNonInteractive (file:///opt/hostedtoolcache/node/20.19.4/x64/lib/node_modules/@google/gemini-cli/dist/src/nonInteractiveCli.js:37:30) {
  status: 500
}
Attempt 4 failed with status 500. Retrying with backoff... ApiError: {"error":{"message":"{\n  \"error\": {\n    \"code\": 500,\n    \"message\": \"An internal error has occurred. Please retry or report in https://developers.generativeai.google/guide/troubleshooting\",\n    \"status\": \"INTERNAL\"\n  }\n}\n","code":500,"status":"Internal Server Error"}}
    at throwErrorIfNotOK (file:///opt/hostedtoolcache/node/20.19.4/x64/lib/node_modules/@google/gemini-cli/node_modules/@google/genai/dist/node/index.mjs:13631:30)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async file:///opt/hostedtoolcache/node/20.19.4/x64/lib/node_modules/@google/gemini-cli/node_modules/@google/genai/dist/node/index.mjs:13422:13
    at async Models.generateContentStream (file:///opt/hostedtoolcache/node/20.19.4/x64/lib/node_modules/@google/gemini-cli/node_modules/@google/genai/dist/node/index.mjs:14763:24)
    at async LoggingContentGenerator.generateContentStream (file:///opt/hostedtoolcache/node/20.19.4/x64/lib/node_modules/@google/gemini-cli/node_modules/@google/gemini-cli-core/dist/src/core/loggingContentGenerator.js:57:22)
    at async retryWithBackoff (file:///opt/hostedtoolcache/node/20.19.4/x64/lib/node_modules/@google/gemini-cli/node_modules/@google/gemini-cli-core/dist/src/utils/retry.js:62:20)
    at async GeminiChat.sendMessageStream (file:///opt/hostedtoolcache/node/20.19.4/x64/lib/node_modules/@google/gemini-cli/node_modules/@google/gemini-cli-core/dist/src/core/geminiChat.js:281:36)
    at async Turn.run (file:///opt/hostedtoolcache/node/20.19.4/x64/lib/node_modules/@google/gemini-cli/node_modules/@google/gemini-cli-core/dist/src/core/turn.js:40:36)
    at async GeminiClient.sendMessageStream (file:///opt/hostedtoolcache/node/20.19.4/x64/lib/node_modules/@google/gemini-cli/node_modules/@google/gemini-cli-core/dist/src/core/client.js:382:26)
    at async runNonInteractive (file:///opt/hostedtoolcache/node/20.19.4/x64/lib/node_modules/@google/gemini-cli/dist/src/nonInteractiveCli.js:37:30) {
  status: 500
}
Error when talking to Gemini API Full report available at: /tmp/gemini-client-error-Turn.run-sendMessageStream-2025-08-28T18-24-59-071Z.json
