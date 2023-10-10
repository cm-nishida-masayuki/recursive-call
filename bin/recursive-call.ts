#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { RecursiveCallScheduleStack } from "../lib/recursive-call-schedule";
import { RecursiveSfnCallStack } from "../lib/recursive-call-sfn";

const app = new cdk.App();

new RecursiveCallScheduleStack(app, "RecursiveCallScheduleStack", {});
new RecursiveSfnCallStack(app, "RecursiveCallSfnStack", {});
