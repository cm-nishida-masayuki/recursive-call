import * as cdk from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import * as sfn from "aws-cdk-lib/aws-stepfunctions";
import * as tasks from "aws-cdk-lib/aws-stepfunctions-tasks";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class RecursiveCallScheduleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambda_policy = new iam.ManagedPolicy(this, "IamPolicy", {
      managedPolicyName: "custom-runtime-lambda-policy",
      description: "Lambda basic execution policy",
      statements: [
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: [
            "logs:CreateLogGroup",
            "logs:CreateLogStream",
            "logs:PutLogEvents",
          ],
          resources: ["arn:*:logs:*:*:*"],
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: ["events:*"],
          resources: ["*"],
        }),
      ],
    });
    const iam_role = new iam.Role(this, "IamRole", {
      roleName: "custom-runtime-lambda-role",
      assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
    });
    iam_role.addManagedPolicy(lambda_policy);

    const lambda = new cdk.aws_lambda_nodejs.NodejsFunction(
      this,
      "RecursiveScheduleLambda",
      {
        runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
        entry: "lambda/schedule-handler.ts",
        role: iam_role,
      }
    );

    new cdk.aws_events.Rule(this, "RecursiveSchedule", {
      schedule: cdk.aws_events.Schedule.cron({
        minute: "15",
        hour: "7",
      }),
      targets: [new cdk.aws_events_targets.LambdaFunction(lambda)],
    });

    const scheduleExt = new cdk.aws_events.Rule(this, "RecursiveScheduleExt", {
      schedule: cdk.aws_events.Schedule.rate(cdk.Duration.minutes(1)),
      targets: [new cdk.aws_events_targets.LambdaFunction(lambda)],
      enabled: false,
    });
  }
}
