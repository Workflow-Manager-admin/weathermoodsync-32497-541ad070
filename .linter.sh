#!/bin/bash
cd /home/kavia/workspace/code-generation/weathermoodsync-32497-541ad070/weather_mood_sync
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

