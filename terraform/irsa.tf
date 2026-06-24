resource "aws_iam_policy" "backend_dynamodb_policy" {
  name = "todo-backend-dynamodb-policy"

  policy = jsonencode({
    Version = "2012-10-17"

    Statement = [
      {
        Effect = "Allow"

        Action = [
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:Scan",
          "dynamodb:Query"
        ]

        Resource = "arn:aws:dynamodb:ap-south-1:632321138060:table/todos"
      }
    ]
  })
}

resource "aws_iam_role" "backend_irsa_role" {
  name = "todo-backend-irsa-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"

    Statement = [
      {
        Effect = "Allow"

        Principal = {
          Federated = "arn:aws:iam::632321138060:oidc-provider/oidc.eks.ap-south-1.amazonaws.com/id/22545E22DDF5B7D7AC389D8F3E2752CE"
        }

        Action = "sts:AssumeRoleWithWebIdentity"

        Condition = {
          StringEquals = {
            "oidc.eks.ap-south-1.amazonaws.com/id/22545E22DDF5B7D7AC389D8F3E2752CE:sub" = "system:serviceaccount:todo-app:backend-sa"
          }
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "backend_attachment" {
  role       = aws_iam_role.backend_irsa_role.name
  policy_arn = aws_iam_policy.backend_dynamodb_policy.arn
}