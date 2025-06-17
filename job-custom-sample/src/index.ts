import { blStartJob } from '@blaxel/core';
import { blaxelTelemetry } from '@blaxel/telemetry';
import step1 from './steps/step1';
import step2 from './steps/step2';
import step3 from './steps/step3';

type JobArguments = {
  name: string;
}

console.log(`MY_ENV_ONE: ${process.env.MY_ENV_ONE}`);
console.log(`MY_ENV_TWO: ${process.env.MY_ENV_TWO}`);
console.log(`MY_CUSTOM_MCP_ENV: ${process.env.MY_CUSTOM_MCP_ENV}`);

async function myJob({name}: JobArguments) {
  return blaxelTelemetry.tracer.startActiveSpan('myJob', {
    attributes: {
      'job.name': 'myJob',
      'job.argument.name': name,
    },
    root: true
  }, async (span) => {
    console.log(`Hello, world ${name}!`);
    await step1(name);
    await step2(name);
    await step3(name);
    span.end();
  });
}

blStartJob(myJob);