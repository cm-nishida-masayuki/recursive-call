import * as cdk from "aws-cdk-lib";
import * as sfn from "aws-cdk-lib/aws-stepfunctions";
import * as tasks from "aws-cdk-lib/aws-stepfunctions-tasks";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class RecursiveSfnCallStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambda = new cdk.aws_lambda_nodejs.NodejsFunction(
      this,
      "RecursiveSfnLambda",
      {
        runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
        entry: "lambda/sfn-handler.ts",
      }
    );

    const wait = new sfn.Wait(this, "Wait", {
      time: sfn.WaitTime.duration(cdk.Duration.seconds(5)),
    });

    const callLambda = new tasks.LambdaInvoke(this, "SfnLambdaInvoke", {
      lambdaFunction: lambda,
      payloadResponseOnly: true,
    });

    const jobSucceed = new sfn.Succeed(this, "Succeed", {
      comment: "Succeed",
    });

    const jobProgress = new sfn.Succeed(this, "Progress", {
      comment: "Progress",
    });

    const jobFailed = new sfn.Fail(this, "Failed", {
      cause: "Failed",
      error: "Failed error",
    });

    const jobOther = new sfn.Fail(this, "Other", {
      cause: "Failed Other",
      error: "Failed error Other",
    });

    const choice = new sfn.Choice(this, "Check Status")
      .when(sfn.Condition.stringEquals("$.status", "FAILED"), jobFailed)
      .when(sfn.Condition.stringEquals("$.status", "SUCCESS"), jobSucceed)
      .when(sfn.Condition.stringEquals("$.status", "PROGRESS"), jobProgress)
      .otherwise(wait);

    const definition = wait.next(callLambda).next(choice);

    new sfn.StateMachine(this, "StateMachine", {
      definitionBody: sfn.DefinitionBody.fromChainable(definition),
      timeout: cdk.Duration.minutes(5),
      comment: "a super cool state machine",
    });
  }
}
